/**
 * Side Quests data — Projects, HomeLab services, and Vibe Coding config.
 */

import type { WorkshopProject, HomelabService } from '../types';
export type { WorkshopProject, HomelabService };

// ─── Projects (Side builds) ─────────────────────────────────────────────────

export const workshopProjects: WorkshopProject[] = [
  {
    title: 'PM Vault',
    description: 'The ultimate PM interview database.',
    icon: '/icons/pm-vault.svg',
    tags: ['Web', 'Content'],
    link: 'https://pm-vault.princejain.me',
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
  {
    title: 'Fusion Bill Uploader',
    description: 'Automated reimbursement filing for my Mobile/Internet bills using browser agents.',
    icon: '🧾',
    tags: ['Playwright', 'Python'],
    link: 'https://www.linkedin.com/posts/princejain17_spend-5-hours-to-save-5-minutes-every-activity-7375487951251628032-4x6J/',
  },
];

// ─── The Home Lab (Self-hosted infrastructure) ───────────────────────────────

export const homelabServices: HomelabService[] = [
  {
    title: 'OpenClaw (formerly Clawdbot)',
    description: 'My Personal AI Assistant: I named him Clawdius',
    icon: '/icons/openclaw.jpg',
    live: true,
  },
  {
    title: 'n8n',
    description: 'Tool I use to run daily automation workflows',
    icon: '/icons/n8n.svg',
    link: 'https://n8n.princejain.me',
    live: true,
  },
  {
    title: 'Immich',
    description: 'Self-hosted TB-scale photo & video library.',
    icon: '/icons/immich.png',
    link: 'https://immich.princejain.me',
    live: true,
  },
  {
    title: 'Vaultwarden',
    description: 'Self-hosted Bitwarden for my passwords and creds.',
    icon: '/icons/vaultwarden.png',
    link: 'https://vault.princejain.me',
    live: true,
  },
  {
    title: 'Adguard',
    description: 'Network-wide privacy and ad-blocking at my home lab.',
    icon: '/icons/adguard.svg',
    live: true,
  },
];

// ─── Vibe Coding Stack ───────────────────────────────────────────────────────

export const vibeCodingStack = {
  cursorMdUrl: 'https://github.com/product-noob/product-noob.github.io/blob/main/.cursorrules',
};
