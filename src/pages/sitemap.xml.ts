/**
 * Custom XML sitemap with explicit crawl metadata.
 *
 * Keep this in sync with public, indexable routes in src/pages. Do not include
 * utility JSON endpoints, 404 pages, or private/reference files from public/.
 */
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

type ChangeFrequency =
  | 'always'
  | 'hourly'
  | 'daily'
  | 'weekly'
  | 'monthly'
  | 'yearly'
  | 'never';

interface SitemapEntry {
  loc: string;
  lastmod: string;
  changefreq: ChangeFrequency;
  priority: number;
}

function toDateOnly(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function latestDate(dates: Date[]): Date {
  return new Date(Math.max(...dates.map((date) => date.valueOf())));
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET(context: APIContext) {
  const site = context.site?.toString().replace(/\/$/, '') ?? 'https://princejain.me';
  const posts = await getCollection('blog');

  const latestPostDate = latestDate(
    posts.map((post) => post.data.updatedDate ?? post.data.pubDate)
  );
  const latestPostLastmod = toDateOnly(latestPostDate);

  const staticPages: SitemapEntry[] = [
    {
      loc: `${site}/`,
      lastmod: latestPostLastmod,
      changefreq: 'weekly',
      priority: 1.0,
    },
    {
      loc: `${site}/blogs/`,
      lastmod: latestPostLastmod,
      changefreq: 'weekly',
      priority: 0.9,
    },
    {
      loc: `${site}/work/`,
      lastmod: '2026-06-09',
      changefreq: 'monthly',
      priority: 0.8,
    },
    {
      loc: `${site}/about/`,
      lastmod: '2026-06-09',
      changefreq: 'monthly',
      priority: 0.8,
    },
    {
      loc: `${site}/vibes/`,
      lastmod: '2026-06-09',
      changefreq: 'monthly',
      priority: 0.7,
    },
    {
      loc: `${site}/homelab/`,
      lastmod: '2026-06-09',
      changefreq: 'monthly',
      priority: 0.7,
    },
    {
      loc: `${site}/tools/`,
      lastmod: '2026-06-09',
      changefreq: 'monthly',
      priority: 0.6,
    },
    {
      loc: `${site}/tools/json-formatter/`,
      lastmod: '2026-06-09',
      changefreq: 'monthly',
      priority: 0.6,
    },
    {
      loc: `${site}/tools/google-meet-summariser/`,
      lastmod: '2026-06-09',
      changefreq: 'monthly',
      priority: 0.6,
    },
    {
      loc: `${site}/tools/autoparse/`,
      lastmod: '2026-06-09',
      changefreq: 'monthly',
      priority: 0.6,
    },
    {
      loc: `${site}/links/`,
      lastmod: '2026-06-09',
      changefreq: 'monthly',
      priority: 0.5,
    },
    {
      loc: `${site}/privacy-policy/`,
      lastmod: '2026-06-09',
      changefreq: 'yearly',
      priority: 0.2,
    },
  ];

  const blogEntries: SitemapEntry[] = posts
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
    .map((post) => ({
      loc: `${site}/blogs/${post.id}/`,
      lastmod: toDateOnly(post.data.updatedDate ?? post.data.pubDate),
      changefreq: 'yearly',
      priority: post.data.featured ? 0.8 : 0.7,
    }));

  const allEntries = [...staticPages, ...blogEntries];
  const urls = allEntries
    .map(
      (entry) => `  <url>
    <loc>${escapeXml(entry.loc)}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority.toFixed(1)}</priority>
  </url>`
    )
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
