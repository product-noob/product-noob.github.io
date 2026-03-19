/**
 * Speaking & Events — data for the homepage carousel.
 *
 * To add modal photos for an event:
 *   1. Drop images into public/ai-events/ (we renamed the folder to be URL-safe)
 *   2. Add the path (e.g. '/ai-events/my_photo.webp') to the event's modal.photos array
 *   3. Up to 4 photos are displayed in the modal gallery
 */

import type { EventData } from '../types';
export type { EventData };

export const events: EventData[] = [
    {
        id: 'openai-dev-day',
        title: 'OpenAI Dev Day',
        tagline: 'OpenAI\'s first dev-day event in India - front-row seat to see how AI agents and multi-modal models are changing the future of AI.',
        date: 'Nov 2025',
        status: 'attended',
        accentColor: '#10a37f',
        thumbnail: '/ai-events/OpenAI-DevDay-landing.webp',
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
                '/ai-events/openai_dev_day_001.webp',
                '/ai-events/openai_dev_day_002.webp',
                '/ai-events/OpenAI-DevDay-2025_2.webp',
            ],
        },
    },
    {
        id: 'cursor-cafe',
        title: 'Cursor Café',
        tagline: 'An intimate gathering of builders shipping with AI-first tools. How AI-native tools are changing the future of software development.',
        date: 'Dec 2025',
        status: 'attended',
        accentColor: '#6366f1',
        thumbnail: '/ai-events/cafe_cursor_landing.webp',
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
                '/ai-events/cafe_cursor_004.webp',
                '/ai-events/cafe_cursor_002.webp',
                '/ai-events/cafe_cursor_003.webp',
                '/ai-events/cafe_cursor_001.webp',

            ],
        },
    },
    {
        id: 'microsoft-ai-tour',
        title: 'Microsoft AI Tour',
        tagline: 'Deep dives into Latent updates in Enterprise AI solutions including Copilot Studio, Azure AI, and enterprise LLM adoption.',
        date: 'Dec 2025',
        status: 'attended',
        accentColor: '#0078d4',
        thumbnail: '/ai-events/Microsoft_AI_Tour_landing.webp',
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
                '/ai-events/ms_ai_tour_001.webp',
                '/ai-events/ms_ai_tour_002.webp',
                '/ai-events/ms_ai_tour_003.webp',
            ],
        },
    },
    {
        "id": "replit-razorpay",
        "title": "Replit × Razorpay",
        "tagline": "Where AI-native developers meet fintech innovation. How LLM-powered coding and payments infrastructure converged at the AI Impact Summit.",
        "date": "Feb 2026",
        "status": "attended",
        "accentColor": "#f26522",
        "thumbnail": "/ai-events/Replit_Razorpay_landing.webp",
        "modal": {
            "description": "Unveiled at the AI Impact Summit, the Replit × Razorpay partnership showcased the convergence of 'vibe coding' and fintech. By combining Replit's agentic software creation with Razorpay's payment infrastructure, builders can now move from a natural language prompt to a fully monetized, production-ready app accepting UPI and cards in minutes.",
            "takeaways": [
                "The Razorpay MCP server gives Replit Agent direct access to payment APIs — meaning developers can integrate checkouts, payment links, and subscriptions through natural language prompts.",
                "Monetization is the missing piece of vibe coding: embedding payment infrastructure directly into the AI creation flow bridges the gap between prototype and revenue.",
                "Localizing the global AI ecosystem: enabling UPI and native INR payments completely removes forex friction for Indian builders upgrading to AI dev tools.",
                "Compliance and cross-border settlements run seamlessly in the background, allowing global SaaS platforms to scale locally without setting up regional entities."
            ],
            "photos": [
                "/ai-events/replit_razorpay_001.jpg",
                "/ai-events/replit_razorpay_002.jpg"
            ]
        }
    },
    {
        id: 'openclaw-showcase',
        title: 'OpenClaw Showcase',
        tagline: 'An exclusive evening of live demos by builders shipping with OpenClaw — hosted by OpenAI, Razorpay & Peak XV, powered by GrowthX.',
        date: 'Mar 2026',
        status: 'attended',
        accentColor: '#e63946',
        thumbnail: '/ai-events/openclaw-razorpay.jpg',
        modal: {
            description:
                'The OpenClaw Showcase brought together 100 curated builders in Bangalore for an evening of live demos, intense conversations, and hands-on exploration of what\'s possible when you give developers local-first AI agents. Kicked off by Razorpay CEO Harshil Mathur, the top 5 builder projects each got a live demo slot — and the energy in the room was electric.',
            takeaways: [
                'Someone loaded "Picoclaw" into a sub-$100 Android phone and controlled the entire device using voice commands — a genuine glimpse of how personal computing devices of the future will work.',
                'The builder density was remarkable — high-signal conversations with the right amount of enthusiasm, no fluff.',
                'Harshil Mathur demo-ed his own setup but didn\'t enter the contest in fairness — still an insane showcase of what\'s possible.',
                'OpenClaw is a user group, not a workshop — the focus is on developers running agents locally or in the cloud, tackling security, configuration, and agent safety challenges.',
            ],
            photos: [
                '/ai-events/openclaw-razorpay_001.jpg',
            ],
        },
    },
];
