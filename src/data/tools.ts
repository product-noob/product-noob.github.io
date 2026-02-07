/**
 * Web-based tools listed on /tools.
 */

export interface ToolEntry {
  title: string;
  description: string;
  icon: string;
  link: string;
  tags: string[];
}

export const tools: ToolEntry[] = [
  {
    title: 'JSON Formatter',
    description:
      'Format, validate, and beautify your JSON. Syntax highlighting included.',
    icon: '🔧',
    link: '/tools/json-formatter',
    tags: ['DevTool', 'JSON'],
  },
  {
    title: 'Self-Hosted N8N',
    description: 'My private automation server running on Google Cloud.',
    icon: '⚡',
    link: 'https://n8n.princejain.me',
    tags: ['Automation', 'Self-Hosted'],
  },
];
