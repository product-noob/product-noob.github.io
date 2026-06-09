import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = await getCollection('blog');

  return rss({
    title: 'Prince Jain — Blog',
    description:
      'Thoughts on Product Management, AI, and Building.',
    site: context.site!,
    items: posts
      .sort(
        (a, b) =>
          b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
      )
      .map((post) => ({
        title: post.data.title,
        pubDate: post.data.pubDate,
        description: post.data.description,
        link: `/blogs/${post.id}/`,
        content: post.data.description,
      })),
    customData: '<language>en-us</language>',
  });
}
