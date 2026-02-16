/**
 * Custom XML sitemap with full metadata — lastmod, changefreq, priority.
 *
 * Replaces the @astrojs/sitemap auto-generated version so we can:
 *  1. Include real pubDate / updatedDate from blog frontmatter as <lastmod>.
 *  2. Set per-page <priority> to guide crawler attention.
 *  3. Set <changefreq> based on how often each page type changes.
 *
 * Consumed by: search engine crawlers, Google Search Console, robots.txt.
 */
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

/** ISO date string truncated to YYYY-MM-DD (W3C Datetime format). */
function toW3CDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

interface SitemapEntry {
  loc: string;
  lastmod: string;
  changefreq: string;
  priority: number;
}

export async function GET(context: APIContext) {
  const site = context.site!.toString().replace(/\/$/, '');

  // ── Static pages ────────────────────────────────────────────────
  const now = toW3CDate(new Date());

  const staticPages: SitemapEntry[] = [
    {
      loc: `${site}/`,
      lastmod: now,
      changefreq: 'weekly',
      priority: 1.0,
    },
    {
      loc: `${site}/blogs/`,
      lastmod: now,
      changefreq: 'weekly',
      priority: 0.9,
    },
    {
      loc: `${site}/work/`,
      lastmod: now,
      changefreq: 'monthly',
      priority: 0.8,
    },
    {
      loc: `${site}/about/`,
      lastmod: now,
      changefreq: 'monthly',
      priority: 0.7,
    },
    {
      loc: `${site}/links/`,
      lastmod: now,
      changefreq: 'monthly',
      priority: 0.5,
    },
    {
      loc: `${site}/tools/`,
      lastmod: now,
      changefreq: 'monthly',
      priority: 0.6,
    },
    {
      loc: `${site}/tools/json-formatter/`,
      lastmod: now,
      changefreq: 'monthly',
      priority: 0.6,
    },
    {
      loc: `${site}/tools/google-meet-summariser/`,
      lastmod: now,
      changefreq: 'monthly',
      priority: 0.6,
    },
    {
      loc: `${site}/tools/autoparse/`,
      lastmod: now,
      changefreq: 'monthly',
      priority: 0.6,
    },
    {
      loc: `${site}/privacy-policy/`,
      lastmod: now,
      changefreq: 'yearly',
      priority: 0.3,
    },
  ];

  // ── Blog posts (with real dates from frontmatter) ───────────────
  const posts = await getCollection('blog');

  const blogEntries: SitemapEntry[] = posts
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
    .map((post) => ({
      loc: `${site}/blogs/${post.slug}/`,
      lastmod: toW3CDate(post.data.updatedDate ?? post.data.pubDate),
      changefreq: 'yearly' as const,
      priority: 0.7,
    }));

  // ── Combine & render XML ────────────────────────────────────────
  const allEntries = [...staticPages, ...blogEntries];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
    http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
>
${allEntries
  .map(
    (entry) => `  <url>
    <loc>${entry.loc}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority.toFixed(1)}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
