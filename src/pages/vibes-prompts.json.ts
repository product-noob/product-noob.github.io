/**
 * Static JSON endpoint exposing the full pasteable prompts for each vibe.
 * Consumed by the vibe-switcher widget on the picking-the-right-ui blog post,
 * so the markdown doesn't need to inline ~25KB of prompt text.
 */
import type { APIRoute } from 'astro';
import { vibes, buildFullPrompt } from '../data/vibes';

export const GET: APIRoute = () => {
  const payload = Object.fromEntries(
    vibes.map((v) => [v.id, buildFullPrompt(v)])
  );

  return new Response(JSON.stringify(payload, null, 2), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
