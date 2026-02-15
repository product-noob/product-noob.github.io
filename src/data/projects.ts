/**
 * Side projects for the Digital Garden section on the homepage.
 */

export interface SideProject {
  title: string;
  description: string;
  icon: string;
  tags: string[];
  link: string;
}

export const sideProjects: SideProject[] = [
  {
    title: 'PM Vault',
    description: 'PM interview prep frameworks.',
    icon: '📚',
    tags: ['Career'],
    link: 'https://pm-vault.princejain.me',
  },
  {
    title: 'Meet Summarizer',
    description: 'Chrome extension for AI summaries.',
    icon: '🧩',
    tags: ['AI', 'Extension'],
    link: 'https://chromewebstore.google.com/detail/chatgpt-google-meet-summa/kofkiemddfpekcadmaeheonbbkhnclhj',
  },
  {
    title: 'Whispr Flow',
    description: 'Speech to Text Transcription.',
    icon: '✨',
    tags: ['DevTool'],
    link: 'https://whispr.princejain.me/',
  },
  {
    title: 'Immich',
    description: 'Self-hosted photo backup.',
    icon: '📸',
    tags: ['Self-Hosted'],
    link: 'https://immich.princejain.me',
  },
  {
    title: 'n8n',
    description: 'Workflow automation.',
    icon: '🔄',
    tags: ['Automation'],
    link: 'https://n8n.princejain.me',
  },
  {
    title: 'Vaultwarden',
    description: 'Password manager.',
    icon: '🔐',
    tags: ['Security'],
    link: 'https://vault.princejain.me',
  },
];
