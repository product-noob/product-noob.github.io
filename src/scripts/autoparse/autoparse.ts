/**
 * AutoParse — DOM orchestrator
 *
 * Wires up the AutoParse UI: listens for paste / input events,
 * runs the detection engine, renders the formatted output with
 * syntax highlighting, and handles copy / clear / format-switching.
 *
 * Loaded by: src/pages/tools/autoparse.astro
 */
import hljs from 'highlight.js/lib/core';
import jsonLang from 'highlight.js/lib/languages/json';
import xmlLang from 'highlight.js/lib/languages/xml';
import yamlLang from 'highlight.js/lib/languages/yaml';
import cssLang from 'highlight.js/lib/languages/css';
import jsLang from 'highlight.js/lib/languages/javascript';
import { detect, type Candidate } from './detectEngine';
import { formatters } from './formatters';

/* Register highlight.js languages */
hljs.registerLanguage('json', jsonLang);
hljs.registerLanguage('xml', xmlLang);
hljs.registerLanguage('yaml', yamlLang);
hljs.registerLanguage('css', cssLang);
hljs.registerLanguage('javascript', jsLang);

/* ===================================================================
   Constants
   =================================================================== */

const DEBOUNCE_MS = 250;

/* ===================================================================
   Initialise
   =================================================================== */

export function init(): void {
  const input = document.getElementById('ap-input') as HTMLTextAreaElement | null;
  const outputEl = document.getElementById('ap-output') as HTMLElement | null;
  const pillsEl = document.getElementById('ap-pills') as HTMLElement | null;
  const badgeEl = document.getElementById('ap-badge') as HTMLElement | null;
  const copyBtn = document.getElementById('ap-copy') as HTMLElement | null;
  const clearBtn = document.getElementById('ap-clear') as HTMLElement | null;
  const rawBtn = document.getElementById('ap-raw') as HTMLElement | null;
  const emptyState = document.getElementById('ap-empty') as HTMLElement | null;
  const outputWrap = document.getElementById('ap-output-wrap') as HTMLElement | null;

  if (!input || !outputEl || !pillsEl || !badgeEl) return;

  let candidates: Candidate[] = [];
  let activeIdx = 0;
  let showRaw = false;
  let timer: ReturnType<typeof setTimeout> | null = null;

  /* ── Core pipeline ─────────────────────────────────────── */

  function run(): void {
    const raw = input!.value;
    if (!raw.trim()) {
      reset();
      return;
    }

    candidates = detect(raw);
    activeIdx = 0;
    showRaw = false;
    renderPills();
    renderOutput();
  }

  function reset(): void {
    candidates = [];
    activeIdx = 0;
    showRaw = false;
    outputEl!.textContent = '';
    pillsEl!.innerHTML = '';
    badgeEl!.textContent = '';
    badgeEl!.style.display = 'none';
    if (emptyState) emptyState.style.display = 'flex';
    if (outputWrap) outputWrap.style.display = 'none';
    rawBtn?.classList.remove('active');
  }

  /* ── Render helpers ────────────────────────────────────── */

  function renderPills(): void {
    pillsEl!.innerHTML = '';

    if (candidates.length === 0) {
      badgeEl!.textContent = 'Unknown format';
      badgeEl!.style.display = 'inline-flex';
      if (emptyState) emptyState.style.display = 'none';
      if (outputWrap) outputWrap.style.display = 'block';
      outputEl!.textContent = input!.value;
      outputEl!.className = '';
      return;
    }

    candidates.forEach((c, idx) => {
      const pill = document.createElement('button');
      pill.className = 'ap-pill' + (idx === activeIdx ? ' ap-pill--active' : '');
      pill.textContent = `${c.formatter.icon}  ${c.formatter.label}`;
      pill.addEventListener('click', () => {
        activeIdx = idx;
        showRaw = false;
        rawBtn?.classList.remove('active');
        renderPills();
        renderOutput();
      });
      pillsEl!.appendChild(pill);
    });

    const best = candidates[activeIdx];
    const pct = Math.round(best.result.confidence * 100);
    badgeEl!.textContent = `Detected: ${best.formatter.label} (${pct}%)`;
    badgeEl!.style.display = 'inline-flex';
  }

  function renderOutput(): void {
    if (emptyState) emptyState.style.display = 'none';
    if (outputWrap) outputWrap.style.display = 'block';

    if (candidates.length === 0 || showRaw) {
      outputEl!.textContent = input!.value;
      outputEl!.className = '';
      return;
    }

    const best = candidates[activeIdx];
    try {
      const formatted = best.formatter.format(input!.value);
      outputEl!.textContent = formatted;
      outputEl!.className = `language-${best.formatter.highlightLang}`;
      if (best.formatter.highlightLang !== 'plaintext') {
        hljs.highlightElement(outputEl!);
      }
    } catch {
      outputEl!.textContent = input!.value;
      outputEl!.className = '';
    }
  }

  /* ── Toast ─────────────────────────────────────────────── */

  function toast(msg: string): void {
    let el = document.querySelector('.ap-toast') as HTMLElement | null;
    if (!el) {
      el = document.createElement('div');
      el.className = 'ap-toast';
      document.body.appendChild(el);
    }
    el.textContent = msg;
    el.classList.add('show');
    setTimeout(() => el!.classList.remove('show'), 2500);
  }

  /* ── Event listeners ───────────────────────────────────── */

  /** Debounced input handler for typing; instant on paste. */
  input.addEventListener('input', () => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(run, DEBOUNCE_MS);
  });

  input.addEventListener('paste', () => {
    /* Run on next tick so the pasted value is in the textarea. */
    setTimeout(run, 0);
  });

  clearBtn?.addEventListener('click', () => {
    input!.value = '';
    reset();
    input!.focus();
  });

  copyBtn?.addEventListener('click', async () => {
    const text = outputEl!.textContent || '';
    if (!text) { toast('Nothing to copy'); return; }
    try {
      await navigator.clipboard.writeText(text);
      toast('Copied to clipboard');
    } catch {
      toast('Copy failed');
    }
  });

  rawBtn?.addEventListener('click', () => {
    showRaw = !showRaw;
    rawBtn!.classList.toggle('active', showRaw);
    renderOutput();
  });

  /* Ctrl/Cmd + V in page should focus the textarea if not focused */
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'v') {
      if (document.activeElement !== input) {
        input!.focus();
      }
    }
  });
}
