/**
 * Centralized TypeScript interfaces — single source of truth.
 *
 * Data files re-export the types they use so existing imports
 * (e.g. `import { WorkEntry } from '../data/works'`) keep working.
 */

// ─── Works ──────────────────────────────────────────────────────────────────

/** External reference link shown on a work card (top-right). */
export interface ExternalLink {
  url: string;
  label: string;
}

export interface WorkEntry {
  company: string;
  role: string;
  period: string;
  description: string;
  achievements: string[];
  tags: string[];
  accentColor: string;
  icon?: string;
  link?: string;
  externalLink?: ExternalLink;
}

export interface WorkHighlight {
  title: string;
  company: string;
  workIcon?: string;
  role: string;
  highlight: string;
  link: string;
  accentColor: string;
}

// ─── Events ─────────────────────────────────────────────────────────────────

export interface EventData {
  id: string;
  title: string;
  tagline: string;
  date: string;
  status: 'attended' | 'upcoming';
  accentColor: string;
  /** Path to the landing/card thumbnail image in /public */
  thumbnail: string;
  modal: {
    description: string;
    takeaways: string[];
    /** Up to 4 photos shown in the modal gallery */
    photos: string[];
  };
}

// ─── Projects ───────────────────────────────────────────────────────────────

export interface WorkshopProject {
  title: string;
  description: string;
  icon: string;
  tags: string[];
  link?: string;
}

export interface HomelabService {
  title: string;
  description: string;
  icon: string;
  link?: string;
  live?: boolean;
  tags?: string[];
}

// ─── Links ──────────────────────────────────────────────────────────────────

export interface LinkEntry {
  name: string;
  url: string;
  icon: string;
  description: string;
}

// ─── Tools ──────────────────────────────────────────────────────────────────

export interface ToolEntry {
  title: string;
  description: string;
  icon: string;
  link: string;
  tags: string[];
}

// ─── Skills ─────────────────────────────────────────────────────────────────

export interface StackItem {
  name: string;
  icon: string;
}

// ─── Component Props ────────────────────────────────────────────────────────

export interface BlogCardProps {
  title: string;
  description?: string;
  pubDate: Date;
  slug: string;
  readingTime: number;
  tags?: string[];
  variant?: 'featured' | 'default';
}

export interface ProjectCardProps {
  title: string;
  description: string;
  icon?: string;
  link?: string;
  tags?: string[];
  variant?: 'default' | 'compact';
}

// ─── Inspirations ───────────────────────────────────────────────────────────

export interface PersonInspiration {
  name: string;
  description: string;
  url: string;
  image: string;
}
