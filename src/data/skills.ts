/**
 * Tech stack shown on homepage and skills shown on /about.
 */

import type { StackItem } from '../types';
export type { StackItem };

/** Compact tech stack chips for the homepage Digital Garden */
export const stack: StackItem[] = [
  { name: 'Cursor', icon: '⚡' },
  { name: 'Claude 3.5', icon: '🧠' },
  { name: 'Linear', icon: '📝' },
  { name: 'Figma', icon: '🎨' },
  { name: 'Astro', icon: '🚀' },
  { name: 'Tailwind', icon: '💅' },
];

/** Professional skills for the /about page — grouped pairs */
export const skills: string[] = [
  'Product Strategy & Zero-to-One',
  'Generative AI & Agentic Workflows',
  'Growth Hacking & Data Analysis',
  'UX Design & Stakeholder Management',
];
