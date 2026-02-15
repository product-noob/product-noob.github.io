/**
 * Side Quests data — Projects, HomeLab services, and Vibe Coding config.
 */

// ─── Projects (Side builds) ─────────────────────────────────────────────────

export interface WorkshopProject {
  title: string;
  description: string;
  icon: string;
  tags: string[];
  link?: string;
}

export const workshopProjects: WorkshopProject[] = [
  {
    title: 'PM Vault',
    description: 'The ultimate PM interview database.',
    icon: '/icons/pm-vault.svg',
    tags: ['Web', 'Content'],
    link: 'https://pm-vault.princejain.me',
  },
  {
    title: 'Fusion Bill Uploader',
    description: 'Automated expense filing using browser agents.',
    icon: '🧾',
    tags: ['Playwright', 'Python'],
  },
  {
    title: 'Whispr',
    description: 'High-fidelity voice-to-text transcription.',
    icon: '/icons/whisprflow.webp',
    tags: ['Whisper', 'Audio Processing'],
    link: 'https://whispr.princejain.me/',
  },
  {
    title: 'Micro-Tools',
    description: 'G-Meet Summariser, Auto-read G-Chat, Local Gmail Cleanup.',
    icon: '/icons/gmeet-summariser.svg',
    tags: ['Chrome Ext', 'Python'],
  },
];

// ─── The Home Lab (Self-hosted infrastructure) ───────────────────────────────

export interface HomelabService {
  title: string;
  description: string;
  icon: string;
  link?: string;
  live?: boolean;
  tags?: string[];
}

export const homelabServices: HomelabService[] = [
  {
    title: 'Clawdbot',
    description: 'Open-source local AI agent gateway.',
    icon: '🤖',
    tags: ['Python', 'LLM Orchestration'],
    live: true,
  },
  {
    title: 'n8n',
    description: 'The automation brain — 50+ workflows (expense parsing, calendar briefings).',
    icon: '🔄',
    link: 'https://n8n.princejain.me',
    live: true,
  },
  {
    title: 'Immich',
    description: 'Self-hosted TB-scale photo & video library.',
    icon: '📸',
    link: 'https://immich.princejain.me',
    live: true,
  },
  {
    title: 'Vaultwarden',
    description: 'Self-hosted Bitwarden for zero-knowledge security.',
    icon: '🔐',
    link: 'https://vault.princejain.me',
    live: true,
  },
  {
    title: 'Adguard',
    description: 'Network-wide privacy and ad-blocking.',
    icon: '🛡️',
    live: true,
  },
];

// ─── Vibe Coding Stack ───────────────────────────────────────────────────────

export const vibeCodingStack = {
  cursorMdUrl: 'https://github.com/product-noob/product-noob.github.io/blob/main/.cursorrules',
};
