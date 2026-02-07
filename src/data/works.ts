/**
 * Work history data — single source of truth.
 *
 * `works` is the full-detail list used on /work.
 * `workHighlights` is a derived compact view used on the homepage timeline.
 */

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

export const works: WorkEntry[] = [
  {
    company: 'Flipkart',
    role: 'Group Product Manager (SLAP)',
    period: 'July 2025 - Present',
    description:
      'Leading the Conversational Commerce & AI charter. Building a bold 0→1 bet at the intersection of shopping and AI, rethinking how users discover and shop.',
    achievements: [
      'Spearheading the vision for agentic commerce and AI-first shopping experiences.',
      'Developing novel interaction paradigms for LLM-powered commerce.',
      'Orchestrating a massive cross-functional effort to redefine the future of Flipkart.',
    ],
    tags: ['AI', 'Strategy', '0→1'],
    accentColor: 'hsl(28, 100%, 50%)',
    icon: '/icons/slap.webp',
    link: '/work',
    externalLink: {
      url: 'https://play.google.com/store/apps/details?id=com.slap.android',
      label: 'View on Play Store',
    },
  },
  {
    company: 'Flipkart',
    role: 'Senior Product Manager (Flippi)',
    period: 'Jan 2024 - June 2025',
    description:
      "Led the end-to-end development of Flippi, Flipkart's AI-powered conversational assistant, scaling it to millions of users.",
    achievements: [
      'Drove 3M+ MAUs and 1% assisted conversions through intelligent discovery.',
      'Built an advanced RAG platform and in-house fine-tuned LLMs saving ₹100 Cr+ annually.',
      'Established the central LLM platform for all GenAI use-cases across the organization.',
    ],
    tags: ['Generative AI', 'LLMs', 'Scale'],
    accentColor: 'hsl(250, 90%, 60%)',
    icon: '/icons/flippi.svg',
    link: '/work',
    externalLink: {
      url: 'https://economictimes.indiatimes.com/tech/artificial-intelligence/flipkart-to-launch-slap-its-conversational-ai-shopping-assistant/articleshow/126548296.cms',
      label: 'Featured Coverage',
    },
  },
  {
    company: 'Flipkart',
    role: 'Product Manager (Growth Hack)',
    period: 'March 2022 - Dec 2023',
    description:
      'Drove non-incentivized GMV and Monthly Active Customer growth through rapid, hypothesis-led experimentation across the shopping funnel.',
    achievements: [
      'Led 70+ A/B experiments across the funnel, resulting in a 1.7% total GMV uplift.',
      'Awarded the "Business Excellence" award (top product team in org) for outsized impact.',
      'Optimized ad conversion rates and launched new formats contributing ₹100 Cr+ bottom-line.',
    ],
    tags: ['Growth', 'A/B Testing', 'Retention'],
    accentColor: 'hsl(340, 80%, 55%)',
    icon: '/icons/flipkart.svg',
    link: '/work',
  },
  {
    company: 'Paytm Health',
    role: 'Senior Product Manager (Founding Team)',
    period: 'Aug 2021 - March 2022',
    description:
      "Launched the Paytm Health vertical as a one-stop-shop for healthcare, integrated with India's National Health Stack.",
    achievements: [
      'Envisioned and launched the first PHR (Public Health Records) app on the national stack.',
      'Integrated e-Raktkosh for blood bank discovery and donated blood services.',
      'Built a dedicated Health storefront to enable discovery of all medical services for 300M+ users.',
    ],
    tags: ['Healthtech', 'Impact', 'Government'],
    accentColor: 'hsl(150, 80%, 40%)',
    icon: '/icons/paytm.svg',
    externalLink: {
      url: 'https://paytm.com/blog/investor-relations/paytm-launches-abha-health-locker-to-safely-store-and-access-all-health-documents/',
      label: 'Announcement Blog Post',
    },
  },
  {
    company: 'Vaccine Finder',
    role: 'Product Lead (Viral Side Project)',
    period: 'May 2021 - Aug 2021',
    description:
      "Built a viral tool during the COVID crisis that scaled to become India's largest private vaccine booking platform.",
    achievements: [
      'Enabled over 3 Million vaccine slot bookings during the peak of the pandemic.',
      'Featured globally as a high-impact solution solving critical distribution friction.',
      'Integrated seamlessly as an in-house tool within the Paytm ecosystem.',
    ],
    tags: ['Product-Led', 'Viral', 'Social Change'],
    accentColor: 'hsl(180, 70%, 45%)',
    icon: '/icons/paytm-vaccine-finder.svg',
    link: '/blogs/Building%20Vaccine%20Slot%20Finder',
    externalLink: {
      url: 'https://paytm.com/blog/engineering/journey-to-build-the-vaccine-slot-finder-tool-on-paytm/',
      label: 'Read on Paytm Blog',
    },
  },
  {
    company: 'Paytm Mini Apps',
    role: 'Product Manager',
    period: 'May 2019 - Aug 2021',
    description:
      "Architected and launched the Mini App ecosystem to help achieve Paytm's Super-App ambition.",
    achievements: [
      'Grew the platform from ideation to 10M+ MAUs with 600+ merchant partners.',
      'Built the developer SDK, documentation, and DIY onboarding flows from scratch.',
      "Launched strategic partnerships with major apps like Ola, Domino's, and Zomato.",
    ],
    tags: ['Super-App', 'Ecosystem', 'SDK'],
    accentColor: 'hsl(200, 100%, 45%)',
    icon: '/icons/paytm-miniapps.svg',
    externalLink: {
      url: 'https://www.youtube.com/live/nuK7Ct59Vyk?si=zlLejx8j5zpcXTBK&t=3161',
      label: 'Watch Presentation',
    },
  },
  {
    company: 'Oracle (OFSAA)',
    icon: '/icons/oracle.svg',
    role: 'Application Developer',
    period: 'Aug 2015 - May 2017',
    description:
      'Built enterprise-grade data governance tools for the financial services industry, helping global banks maintain data integrity and stay ahead of evolving regulatory mandates.',
    achievements: [
      'Engineered core modules of the Data Governance Studio (DGS), enabling banking clients to automate data quality checks across 50+ regulatory dimensions.',
      'Designed a custom data generation and validation utility that cut manual testing effort by 20%, accelerating release cycles for the entire team.',
      'Recognized as a Top 10% performer in FY 2016-17 for consistent contributions to product development and cross-team collaboration.',
    ],
    tags: ['Enterprise', 'Data Quality', 'FinTech'],
    accentColor: 'hsl(0, 85%, 50%)',
  },
];

/**
 * Compact view for the homepage timeline.
 * Derived from `works` so the two can never drift.
 */
export interface WorkHighlight {
  title: string;
  company: string;
  workIcon?: string;
  role: string;
  highlight: string;
  link: string;
  accentColor: string;
}

export const workHighlights: WorkHighlight[] = [
  {
    title: '2025 - Present',
    company: 'SLAP (Flipkart)',
    workIcon: '/icons/slap.webp',
    role: 'Group Product Manager',
    highlight:
      'Building the future of agentic commerce. Leading a 0→1 AI-first app to rethink discovery and shopping paradigms.',
    link: '/work',
    accentColor: works[0].accentColor,
  },
  {
    title: '2024 - 2025',
    company: 'Flippi (Flipkart)',
    workIcon: '/icons/flippi.svg',
    role: 'Senior Product Manager',
    highlight:
      "Led Flipkart's AI assistant to 3M+ MAU. Built in-house LLMs and RAG platform, saving ₹100 Cr+ annually.",
    link: '/work',
    accentColor: works[1].accentColor,
  },
  {
    title: '2022 - 2023',
    company: 'Growth Hack (Flipkart)',
    workIcon: '/icons/growth.svg',
    role: 'Product Manager',
    highlight:
      'Drove 1.7% GMV uplift through 70+ A/B experiments. Awarded "Business Excellence" for outsized impact.',
    link: '/work',
    accentColor: works[2].accentColor,
  },
  {
    title: '2021',
    company: 'Vaccine Finder',
    workIcon: '/icons/vaccine.svg',
    role: 'Product Lead',
    highlight:
      "Scaled India's largest private vaccine booking tool during the crisis, enabling 3M+ slot bookings.",
    link: '/blogs/Building%20Vaccine%20Slot%20Finder',
    accentColor: works[4].accentColor,
  },
];
