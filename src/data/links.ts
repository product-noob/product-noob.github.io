/**
 * Social / contact links shown on /links.
 */

export interface LinkEntry {
  name: string;
  url: string;
  icon: string;
  description: string;
}

export const links: LinkEntry[] = [
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/princejain17',
    icon: '💼',
    description: "Let's connect professionally.",
  },
  {
    name: 'Twitter / X',
    url: 'https://twitter.com/Prince_Jain17',
    icon: '🐦',
    description: 'I post about AI and Product.',
  },
  {
    name: 'GitHub',
    url: 'https://github.com/product-noob',
    icon: '💻',
    description: 'My code and experiments.',
  },
  {
    name: 'Email',
    url: 'mailto:princemnit@gmail.com',
    icon: '✉️',
    description: 'Direct way to reach me.',
  },
  {
    name: 'Blog',
    url: '/blogs',
    icon: '✍️',
    description: 'Long-form thoughts.',
  },
];
