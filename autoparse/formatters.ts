/**
 * AutoParse Formatter Registry
 *
 * Each formatter provides detection and formatting for a specific text
 * format. The detection engine runs every formatter's `detect()` method
 * in parallel and picks the highest-confidence result.
 *
 * Consumed by: src/scripts/autoparse/detectEngine.ts
 */
import yaml from 'js-yaml';

/* ===================================================================
   Shared Types
   =================================================================== */

/** Result of a detection attempt for a single format. */
export interface DetectionResult {
  formatId: string;
  success: boolean;
  confidence: number;
  errors: string[];
}

/** A pluggable formatter that can detect and transform a text format. */
export interface Formatter {
  id: string;
  label: string;
  icon: string;
  detect: (input: string) => DetectionResult;
  format: (input: string) => string;
  minify?: (input: string) => string;
  highlightLang: string;
}

/* ===================================================================
   1. JSON
   =================================================================== */

const jsonFormatter: Formatter = {
  id: 'json',
  label: 'JSON',
  icon: '{ }',
  highlightLang: 'json',

  detect(input) {
    const t = input.trim();
    if (!/^\s*[{[]/.test(t)) {
      return fail('json', 'Does not start with { or [');
    }
    try {
      JSON.parse(t);
      return ok('json', 1);
    } catch (e: any) {
      return { formatId: 'json', success: false, confidence: 0.1, errors: [e.message] };
    }
  },

  format(input) {
    return JSON.stringify(JSON.parse(input.trim()), null, 2);
  },

  minify(input) {
    return JSON.stringify(JSON.parse(input.trim()));
  },
};

/* ===================================================================
   2. Escaped JSON
   =================================================================== */

const escapedJsonFormatter: Formatter = {
  id: 'escaped-json',
  label: 'Escaped JSON',
  icon: '" {}"',
  highlightLang: 'json',

  detect(input) {
    const t = input.trim();
    if (!/\\["\\/bfnrt]|\\u[\dA-Fa-f]{4}/.test(t)) {
      return fail('escaped-json', 'No escape sequences');
    }
    try {
      JSON.parse(unescapeJson(t));
      return ok('escaped-json', 0.9);
    } catch {
      return fail('escaped-json', 'Parse failed after unescape');
    }
  },

  format(input) {
    return JSON.stringify(JSON.parse(unescapeJson(input.trim())), null, 2);
  },
};

/** Strip outer quotes and resolve common escape sequences. */
function unescapeJson(raw: string): string {
  let s = raw;
  if (
    (s.startsWith('"') && s.endsWith('"')) ||
    (s.startsWith("'") && s.endsWith("'"))
  ) {
    s = s.slice(1, -1);
  }
  return s
    .replace(/\\"/g, '"')
    .replace(/\\\\/g, '\\')
    .replace(/\\n/g, '\n')
    .replace(/\\t/g, '\t')
    .replace(/\\r/g, '\r');
}

/* ===================================================================
   3. XML / HTML
   =================================================================== */

const xmlFormatter: Formatter = {
  id: 'xml',
  label: 'XML / HTML',
  icon: '</>',
  highlightLang: 'xml',

  detect(input) {
    const t = input.trim();
    if (!/^\s*<[?!a-zA-Z]/.test(t)) {
      return fail('xml', 'Does not start with <');
    }
    try {
      const doc = new DOMParser().parseFromString(t, 'application/xml');
      if (doc.querySelectorAll('parsererror').length === 0) {
        return ok('xml', 0.95);
      }
      /* Fall back to HTML parsing */
      const html = new DOMParser().parseFromString(t, 'text/html');
      if (html.body && html.body.children.length > 0) {
        return ok('xml', 0.8);
      }
      return { formatId: 'xml', success: false, confidence: 0.3, errors: ['Parse errors'] };
    } catch {
      return fail('xml', 'DOMParser failed');
    }
  },

  format(input) {
    return indentXml(input.trim());
  },
};

/** Lightweight XML/HTML indenter. */
function indentXml(xml: string): string {
  const TAB = '  ';
  let out = '';
  let depth = 0;
  const norm = xml.replace(/>\s+</g, '><').trim();
  const parts = norm.split(/(<[^>]+>)/g).filter(Boolean);

  for (const p of parts) {
    if (p.startsWith('</')) {
      depth = Math.max(0, depth - 1);
      out += TAB.repeat(depth) + p + '\n';
    } else if (p.endsWith('/>') || p.startsWith('<?') || p.startsWith('<!')) {
      out += TAB.repeat(depth) + p + '\n';
    } else if (p.startsWith('<')) {
      out += TAB.repeat(depth) + p + '\n';
      depth++;
    } else {
      const text = p.trim();
      if (text) out += TAB.repeat(depth) + text + '\n';
    }
  }
  return out.trimEnd();
}

/* ===================================================================
   4. YAML
   =================================================================== */

const yamlFormatter: Formatter = {
  id: 'yaml',
  label: 'YAML',
  icon: '---',
  highlightLang: 'yaml',

  detect(input) {
    const t = input.trim();
    /* If it's valid JSON, prefer the JSON formatter. */
    try { JSON.parse(t); return fail('yaml', 'Valid JSON'); } catch { /* continue */ }

    const hasKV = /^\s*[\w.-]+\s*:\s/m.test(t);
    const hasFrontmatter = /^---\s*$/m.test(t);
    const hasList = /^\s*-\s+\S/m.test(t);

    if (!hasKV && !hasFrontmatter && !hasList) {
      return fail('yaml', 'No YAML structures');
    }
    try {
      const res = yaml.load(t);
      if (res === null || res === undefined || typeof res === 'string') {
        return { formatId: 'yaml', success: false, confidence: 0.1, errors: ['Parsed as scalar'] };
      }
      return ok('yaml', 0.85);
    } catch (e: any) {
      return { formatId: 'yaml', success: false, confidence: 0, errors: [e.message] };
    }
  },

  format(input) {
    const parsed = yaml.load(input.trim());
    return yaml.dump(parsed, { indent: 2, lineWidth: 80, noRefs: true });
  },
};

/* ===================================================================
   5. CSV / TSV
   =================================================================== */

const csvFormatter: Formatter = {
  id: 'csv',
  label: 'CSV / TSV',
  icon: '📊',
  highlightLang: 'plaintext',

  detect(input) {
    const lines = input.trim().split('\n').filter((l) => l.trim());
    if (lines.length < 2) return fail('csv', 'Need ≥ 2 lines');

    const { score } = bestDelimiter(lines);
    if (score < 0.6) return fail('csv', 'Inconsistent columns');
    return ok('csv', score * 0.85);
  },

  format(input) {
    const lines = input.trim().split('\n').filter((l) => l.trim());
    const { delim } = bestDelimiter(lines);
    const rows = lines.map((l) => l.split(delim).map((c) => c.trim()));
    const colCount = Math.max(...rows.map((r) => r.length));
    const widths: number[] = Array.from({ length: colCount }, () => 0);

    for (const row of rows) {
      for (let i = 0; i < row.length; i++) {
        widths[i] = Math.max(widths[i], (row[i] || '').length);
      }
    }

    return rows
      .map((row, idx) => {
        const padded = row.map((c, i) => c.padEnd(widths[i]));
        const line = padded.join('  │  ');
        if (idx === 0) {
          return line + '\n' + widths.map((w) => '─'.repeat(w)).join('──┼──');
        }
        return line;
      })
      .join('\n');
  },
};

/** Determine the best delimiter for a set of lines. */
function bestDelimiter(lines: string[]) {
  const candidates = [',', '\t', '|', ';'] as const;
  let bestDelim: string = ',';
  let bestScore = 0;

  for (const d of candidates) {
    const counts = lines.map((l) => l.split(d).length);
    const first = counts[0];
    if (first < 2) continue;
    const consistent = counts.filter((c) => c === first).length;
    const score = consistent / lines.length;
    if (score > bestScore) {
      bestScore = score;
      bestDelim = d;
    }
  }
  return { delim: bestDelim, score: bestScore };
}

/* ===================================================================
   6. URL-Encoded
   =================================================================== */

const urlEncodedFormatter: Formatter = {
  id: 'url-encoded',
  label: 'URL Encoded',
  icon: '%',
  highlightLang: 'plaintext',

  detect(input) {
    const t = input.trim();
    const pct = (t.match(/%[\dA-Fa-f]{2}/g) || []).length;
    if (pct < 1) return fail('url-encoded', 'No %-sequences');

    const hasParams = /[^&=]+=[^&=]*/g.test(t);
    const density = (pct * 3) / t.length;

    let confidence = 0;
    if (hasParams && density > 0.05) confidence = 0.9;
    else if (hasParams) confidence = 0.7;
    else if (density > 0.1) confidence = 0.8;
    else confidence = 0.3;

    try {
      decodeURIComponent(t.replace(/\+/g, ' '));
      return ok('url-encoded', confidence);
    } catch {
      return { formatId: 'url-encoded', success: false, confidence: 0.1, errors: ['Decode failed'] };
    }
  },

  format(input) {
    const t = input.trim();
    const clean = t.startsWith('?') ? t.slice(1) : t;

    if (/[^&=]+=[^&=]*/g.test(clean)) {
      const pairs = clean.split('&');
      const decoded = pairs.map((p) => {
        const eq = p.indexOf('=');
        if (eq > 0) {
          return {
            key: decodeURIComponent(p.slice(0, eq).replace(/\+/g, ' ')),
            val: decodeURIComponent(p.slice(eq + 1).replace(/\+/g, ' ')),
          };
        }
        return { key: decodeURIComponent(p.replace(/\+/g, ' ')), val: '' };
      });
      const maxKey = Math.max(...decoded.map((d) => d.key.length));
      return decoded
        .map((d) =>
          d.val
            ? `${d.key.padEnd(maxKey)}  =  ${d.val}`
            : d.key,
        )
        .join('\n');
    }

    return decodeURIComponent(clean.replace(/\+/g, ' '));
  },
};

/* ===================================================================
   7. Base64
   =================================================================== */

const base64Formatter: Formatter = {
  id: 'base64',
  label: 'Base64',
  icon: '🔐',
  highlightLang: 'plaintext',

  detect(input) {
    const t = input.trim();
    if (t.length < 8) return fail('base64', 'Too short');
    if (!/^[A-Za-z0-9+/\n\r]+=*$/.test(t)) {
      return fail('base64', 'Invalid base64 chars');
    }
    const stripped = t.replace(/\s/g, '');
    if (stripped.length % 4 !== 0) {
      return { formatId: 'base64', success: false, confidence: 0.2, errors: ['Length % 4 ≠ 0'] };
    }
    try {
      const decoded = atob(stripped);
      const printable = [...decoded].filter((c) => {
        const code = c.charCodeAt(0);
        return (code >= 32 && code <= 126) || code === 10 || code === 13 || code === 9;
      }).length;
      const ratio = printable / decoded.length;
      if (ratio > 0.9) return ok('base64', 0.85);
      if (ratio > 0.5) return ok('base64', 0.5);
      return { formatId: 'base64', success: true, confidence: 0.3, errors: ['Likely binary'] };
    } catch {
      return fail('base64', 'atob failed');
    }
  },

  format(input) {
    const decoded = atob(input.trim().replace(/\s/g, ''));
    try {
      const parsed = JSON.parse(decoded);
      return `[Base64 → JSON]\n\n${JSON.stringify(parsed, null, 2)}`;
    } catch {
      return `[Base64 → Text]\n\n${decoded}`;
    }
  },
};

/* ===================================================================
   8. Minified CSS
   =================================================================== */

const minifiedCssFormatter: Formatter = {
  id: 'minified-css',
  label: 'Minified CSS',
  icon: '🎨',
  highlightLang: 'css',

  detect(input) {
    const t = input.trim();
    const lines = t.split('\n');
    const avg = t.length / lines.length;
    const hasBraces = /\{[^}]+\}/.test(t);
    const hasProps = /[\w-]+\s*:\s*[^;]+;/.test(t);
    const hasSel = /[.#@[\w-][\w-]*\s*\{/.test(t);
    const semis = (t.match(/;/g) || []).length;
    const semisPerLine = semis / lines.length;

    if (!hasBraces || !hasProps) return fail('minified-css', 'No CSS structures');
    if (avg > 120 && hasSel) return ok('minified-css', 0.85);
    if (avg > 60 && semisPerLine > 3 && hasSel) return ok('minified-css', 0.8);
    if (hasSel && hasProps && avg > 60) {
      return { formatId: 'minified-css', success: true, confidence: 0.5, errors: [] };
    }
    return fail('minified-css', 'Not minified');
  },

  format(input) {
    return beautifyCss(input.trim());
  },
};

/** Lightweight CSS beautifier. */
function beautifyCss(css: string): string {
  const TAB = '  ';
  let out = '';
  let depth = 0;
  let inStr = false;
  let strCh = '';

  for (let i = 0; i < css.length; i++) {
    const ch = css[i];

    /* Strings */
    if (inStr) {
      out += ch;
      if (ch === strCh && css[i - 1] !== '\\') inStr = false;
      continue;
    }
    if (ch === '"' || ch === "'") {
      inStr = true;
      strCh = ch;
      out += ch;
      continue;
    }

    /* Block comments */
    if (ch === '/' && css[i + 1] === '*') {
      const end = css.indexOf('*/', i + 2);
      const comment = end < 0 ? css.slice(i) : css.slice(i, end + 2);
      out += '\n' + TAB.repeat(depth) + comment + '\n';
      i = end < 0 ? css.length - 1 : end + 1;
      continue;
    }

    if (ch === '{') {
      out = out.trimEnd() + ' {\n';
      depth++;
      out += TAB.repeat(depth);
      while (i + 1 < css.length && /\s/.test(css[i + 1])) i++;
      continue;
    }

    if (ch === '}') {
      depth = Math.max(0, depth - 1);
      out = out.trimEnd() + '\n' + TAB.repeat(depth) + '}\n\n';
      while (i + 1 < css.length && /\s/.test(css[i + 1])) i++;
      continue;
    }

    if (ch === ';') {
      out += ';\n' + TAB.repeat(depth);
      while (i + 1 < css.length && /\s/.test(css[i + 1])) i++;
      continue;
    }

    out += ch;
  }

  return out.replace(/\n{3,}/g, '\n\n').trim();
}

/* ===================================================================
   9. Minified JS
   =================================================================== */

const minifiedJsFormatter: Formatter = {
  id: 'minified-js',
  label: 'Minified JS',
  icon: '⚡',
  highlightLang: 'javascript',

  detect(input) {
    const t = input.trim();
    const lines = t.split('\n');
    const avg = t.length / lines.length;
    const hasKw = /\b(function|var|let|const|return|if|else|for|while|class|=>)\b/.test(t);
    const semis = (t.match(/;/g) || []).length;
    const braces = (t.match(/[{}()]/g) || []).length;
    const hasIife = /^[!~+-]?(?:\(function|\(?function)/.test(t);
    const newlineRatio = lines.length / t.length;

    if (!hasKw && semis < 3) return fail('minified-js', 'No JS patterns');

    /*
     * "Minified" means lots of code on very few lines.
     * We check multiple signals:
     * - Long avg line length (> 80 chars)
     * - High semicolon density (many ;'s per line)
     * - IIFE wrappers (!function, (function)
     * - Low newline ratio (< 1 newline per 40 chars)
     */
    const semisPerLine = semis / lines.length;
    const isCompact = newlineRatio < 0.025;

    if (avg > 120 && hasKw) return ok('minified-js', 0.85);
    if (hasIife && isCompact) return ok('minified-js', 0.85);
    if (avg > 60 && semisPerLine > 3 && hasKw) return ok('minified-js', 0.8);
    if (avg > 60 && isCompact && braces > 4 && hasKw) return ok('minified-js', 0.75);
    if (avg > 150 && semis > 4) {
      return { formatId: 'minified-js', success: true, confidence: 0.6, errors: [] };
    }
    return fail('minified-js', 'Not minified');
  },

  format(input) {
    return beautifyJs(input.trim());
  },
};

/** Lightweight JS beautifier. */
function beautifyJs(js: string): string {
  const TAB = '  ';
  let out = '';
  let depth = 0;
  let inStr = false;
  let strCh = '';
  let inTpl = false;

  for (let i = 0; i < js.length; i++) {
    const ch = js[i];
    const prev = i > 0 ? js[i - 1] : '';

    /* Template literals */
    if (ch === '`' && prev !== '\\') {
      inTpl = !inTpl;
      out += ch;
      continue;
    }
    if (inTpl) { out += ch; continue; }

    /* Strings */
    if (inStr) {
      out += ch;
      if (ch === strCh && prev !== '\\') inStr = false;
      continue;
    }
    if (ch === '"' || ch === "'") {
      inStr = true;
      strCh = ch;
      out += ch;
      continue;
    }

    /* Line comments */
    if (ch === '/' && js[i + 1] === '/') {
      const end = js.indexOf('\n', i);
      out += js.slice(i, end < 0 ? js.length : end);
      i = end < 0 ? js.length - 1 : end - 1;
      continue;
    }

    /* Block comments */
    if (ch === '/' && js[i + 1] === '*') {
      const end = js.indexOf('*/', i + 2);
      out += js.slice(i, end < 0 ? js.length : end + 2);
      i = end < 0 ? js.length - 1 : end + 1;
      continue;
    }

    if (ch === '{') {
      out = out.trimEnd() + ' {\n' + TAB.repeat(depth + 1);
      depth++;
      while (i + 1 < js.length && /\s/.test(js[i + 1])) i++;
      continue;
    }

    if (ch === '}') {
      depth = Math.max(0, depth - 1);
      out = out.trimEnd() + '\n' + TAB.repeat(depth) + '}';
      const ahead = js.slice(i + 1, i + 15).trimStart();
      if (/^(else|catch|finally)/.test(ahead)) {
        out += ' ';
      } else {
        out += '\n' + TAB.repeat(depth);
      }
      while (i + 1 < js.length && /\s/.test(js[i + 1])) i++;
      continue;
    }

    if (ch === ';') {
      out += ';\n' + TAB.repeat(depth);
      while (i + 1 < js.length && /\s/.test(js[i + 1])) i++;
      continue;
    }

    out += ch;
  }

  return out.replace(/\n{3,}/g, '\n\n').replace(/[ \t]+$/gm, '').trim();
}

/* ===================================================================
   Helpers
   =================================================================== */

function ok(formatId: string, confidence: number): DetectionResult {
  return { formatId, success: true, confidence, errors: [] };
}

function fail(formatId: string, reason: string): DetectionResult {
  return { formatId, success: false, confidence: 0, errors: [reason] };
}

/* ===================================================================
   Registry (ordered by detection priority)
   =================================================================== */

export const formatters: Formatter[] = [
  jsonFormatter,
  escapedJsonFormatter,
  xmlFormatter,
  yamlFormatter,
  csvFormatter,
  urlEncodedFormatter,
  base64Formatter,
  minifiedCssFormatter,
  minifiedJsFormatter,
];
