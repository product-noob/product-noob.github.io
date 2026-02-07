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
    title: 'AutoParse',
    description:
      'Paste any text — JSON, YAML, XML, CSV, Base64, and more. Auto-detects the format and pretty-prints it instantly.',
    icon: '/icons/autoparse.png',
    link: '/tools/autoparse',
    tags: ['DevTool', 'Formatter'],
  },
  {
    title: 'Self-Hosted N8N',
    description: 'My private automation server running on Google Cloud.',
    icon: '⚡',
    link: 'https://n8n.princejain.me',
    tags: ['Automation', 'Self-Hosted'],
  },
];
