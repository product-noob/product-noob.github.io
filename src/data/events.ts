/**
 * Speaking & Events — data for the homepage carousel.
 * 
 * To add modal photos for an event:
 *   1. Drop images into public/ai-events/ (we renamed the folder to be URL-safe)
 *   2. Add the path (e.g. '/ai-events/my_photo.webp') to the event's modal.photos array
 *   3. Up to 4 photos are displayed in the modal gallery
 */

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

export const events: EventData[] = [
    {
        id: 'openai-dev-day',
        title: 'OpenAI Dev Day',
        tagline: 'Front-row seat to the future of AI agents and multi-modal models.',
        date: 'Mar 2025',
        status: 'attended',
        accentColor: '#10a37f',
        thumbnail: '/AI events/OpenAI-DevDay-landing.webp',
        modal: {
            description:
                'OpenAI Dev Day in Bangalore brought together developers and product builders to explore the cutting edge of AI — from function calling and Assistants API to GPT-4 Vision and the rapidly evolving agent ecosystem.',
            takeaways: [
                'Function calling is the bridge between LLMs and real-world actions — it turns chat into workflow.',
                'Multi-modal models (vision + text) unlock entirely new product surfaces beyond text-in, text-out.',
                'The "Assistants API" pattern — persistent threads, retrieval, code interpreter — is the foundation for AI-native SaaS.',
                'Prompt engineering is becoming prompt architecture: structured, versioned, and tested like code.',
            ],
            photos: [
                '/AI events/openai_dev_day_001.webp',
                '/AI events/openai_dev_day_002.webp',
                '/AI events/OpenAI-DevDay-2025_2.webp',
            ],
        },
    },
    {
        id: 'cursor-cafe',
        title: 'Cursor Café',
        tagline: 'An intimate gathering of builders shipping with AI-first dev tools.',
        date: 'Jun 2025',
        status: 'attended',
        accentColor: '#6366f1',
        thumbnail: '/AI events/cafe_cursor_landing.webp',
        modal: {
            description:
                'Cursor Café was an intimate, high-signal meetup of engineers and product people building with AI-native development tools — a space to trade craft on prompt engineering, agentic coding workflows, and the future of the IDE.',
            takeaways: [
                'AI-first IDEs are not just autocomplete — they are pair-programming agents that reason about your entire codebase.',
                'The best prompt engineers treat prompts like product specs: clear intent, constraints, and success criteria.',
                'Composability matters: chaining small, focused AI steps beats a single massive prompt every time.',
                'Developer experience (DX) is the new moat — the tool that feels invisible wins.',
            ],
            photos: [
                '/AI events/cafe_cursor_002.webp',
            ],
        },
    },
    {
        id: 'microsoft-ai-tour',
        title: 'Microsoft AI Tour',
        tagline: 'Deep dives into Copilot Studio, Azure AI, and enterprise LLM adoption.',
        date: 'Dec 2025',
        status: 'attended',
        accentColor: '#0078d4',
        thumbnail: '/AI events/Microsoft_AI_Tour_landing.webp',
        modal: {
            description:
                'The Microsoft AI Tour showcased how large enterprises are weaving LLMs into production workflows — from Copilot Studio\'s low-code agent builder to Azure AI\'s managed inference and responsible AI guardrails.',
            takeaways: [
                'Enterprise AI adoption is a distribution problem, not a model problem — integration into existing workflows is everything.',
                'Copilot Studio democratizes agent building: product managers can prototype AI agents without writing code.',
                'Responsible AI guardrails (content filters, grounding, citations) are table-stakes for enterprise deployment.',
                'RAG (Retrieval-Augmented Generation) on proprietary data is where the real enterprise value lives.',
            ],
            photos: [
                '/AI events/ms_ai_tour_001.webp',
                '/AI events/ms_ai_tour_002.webp',
                '/AI events/ms_ai_tour_003.webp',
            ],
        },
    },
    {
        id: 'replit-razorpay',
        title: 'Replit × Razorpay',
        tagline: 'Where AI-native developers meet fintech innovation. Excited to explore what\'s next.',
        date: 'Apr 2026',
        status: 'upcoming',
        accentColor: '#f26522',
        thumbnail: '/AI events/Replit_Razorpay_landing.webp',
        modal: {
            description:
                'An upcoming collaboration between Replit and Razorpay exploring the intersection of AI-native development and fintech — how LLM-powered coding and payments infrastructure are converging to accelerate builder velocity.',
            takeaways: [],
            photos: [],
        },
    },
];
