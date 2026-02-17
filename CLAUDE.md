# Project: princejain.me

Astro 5 static portfolio + blog. Deployed to GitHub Pages via `master` branch.

## Commands

```bash
npm run dev        # Local dev server
npm run build      # Production build (outputs to dist/)
npm run preview    # Preview production build
```

Build requires Node 20+. On this machine, prepend `export PATH="/c/Program Files/nodejs:$PATH"` before `npx` commands if node isn't found.

## Architecture Decisions

- **`inlineStylesheets: 'always'`** (astro.config.mjs): ALL imported CSS is inlined into every page's HTML. This means adding CSS to global files (tokens/reset/global/components.css) bloats EVERY page. Prefer scoped `<style>` blocks in components — they only ship to pages that use them.
- **Self-hosted fonts** in `public/fonts/` with `font-display: swap` and `<link rel="preload">`. Never use Google Fonts CDN.
- **Two-tier images**: `src/assets/` for Astro `<Image>` optimization (static imports), `public/` for dynamic URL references. New static images go in `src/assets/`.
- **Static output only** — no SSR, no server endpoints.

## CSS: Design Tokens First

All styling must use design tokens from `src/styles/tokens.css`. Never hardcode colors, spacing, font sizes, shadows, or radii.

```
Colors:     --color-accent, --gray-50 to --gray-950
Typography: --text-2xs to --text-hero, --font-body/display/mono
Spacing:    --space-1 (4px) to --space-32 (128px)
Shadows:    --shadow-sm to --shadow-xl
Radii:      --radius-sm to --radius-full
Transitions: --transition-fast/base/slow
Glass:      --glass-bg, --glass-border
```

### CSS file roles (all globally inlined — keep them lean)

| File | Purpose | Add here? |
|------|---------|-----------|
| `tokens.css` | Design token variables | Only new tokens |
| `reset.css` | Browser normalization, body bg | Rarely |
| `global.css` | Utilities (.container, .prose, animations) | Shared utilities only |
| `components.css` | Shared component classes (.btn, .card, .tag) | Only truly global components |

**Default: put styles in scoped `<style>` blocks** inside the component that uses them. This is critical for performance given the inline stylesheets config.

### Naming convention

BEM-like: `.component__element--modifier` (e.g., `.blog-card__title--featured`).

## Components

- Located in `src/components/` (reusable) and `src/components/home/` (homepage sections)
- Each component owns its markup + scoped styles + client scripts
- Use TypeScript frontmatter with typed props (import from `src/types.ts`)
- Homepage is a thin orchestrator — all logic lives in section components

## Data & Types

- **`src/types.ts`** — central hub for all shared TypeScript interfaces
- **`src/data/*.ts`** — data files import types from `types.ts` and re-export them
- When adding a new data type: define in `types.ts`, import in the data file, re-export

## Content (Blog)

- Astro Content Collections with Zod schema in `src/content/config.ts`
- Posts are `.md` files in `src/content/blog/`
- Frontmatter: title, description, pubDate, tags (1-4), optional heroImage/updatedDate/featured
- Reading time calculated at build via `src/utils/readingTime.ts`
- Blog images go in `public/images/`

## SEO

`src/layouts/BaseLayout.astro` handles all SEO. Every page should pass:
- `title` and `description` (required)
- `breadcrumbs` array for BreadcrumbList schema
- `ogImage` for social sharing (defaults to profile photo)
- `extraSchema` for page-specific JSON-LD (e.g., BlogPosting, SoftwareApplication)

Structured data already present site-wide: Person, WebSite, BreadcrumbList.

## Adding a New Page

1. Create `src/pages/your-page.astro`
2. Use `<BaseLayout>` with title, description, breadcrumbs
3. Styles go in a scoped `<style>` block (not in global CSS files)
4. Add to nav in BaseLayout if needed

## Adding a New Blog Post

1. Create `src/content/blog/your-slug.md` with required frontmatter
2. Add images to `public/images/`
3. Build to verify — schema validation catches frontmatter errors at build time

## Git & Deployment

- Push to `master` triggers GitHub Actions build + deploy to GitHub Pages
- Always run `npm run build` before pushing to catch errors
- Site URL: https://princejain.me

## Responsive Breakpoints

- Desktop: > 1024px (max-width: 1100px container)
- Tablet: 768px–1024px
- Mobile: < 768px
- Small mobile: < 480px

---

## Writing Style Guide (for blog posts)

When writing blog posts as Prince, follow these patterns derived from his 13 existing posts.

### Voice & Tone

- **Conversational and direct.** Write like you're explaining to a smart friend over coffee. Use "I", "you", "we" freely. Never stiff or academic.
- **Self-aware and humble.** Acknowledge limitations openly: "blame my rusty coding skills", "this took me way longer than I care to admit", "I had the same stance until I had to understand it".
- **Enthusiastic without being salesy.** Genuine excitement about building things. Use phrases like "this is pretty incredible when you think about it" or "the response was phenomenal".
- **Opinionated but balanced.** Take clear stances ("Start with RAG, not fine-tuning") while acknowledging nuance and counterarguments.

### Structural Patterns

- **Start with personal context.** Almost every post opens with a personal hook — why this topic matters to Prince personally, what triggered the post, or a relatable problem statement. Never jump straight into a tutorial.
- **TL;DR or summary near the top** for longer posts (numbered list, 3-5 points). Longer deep-dive follows below.
- **Use `##` for major sections, `###` for subsections, `####` sparingly.** Headers are conversational, not dry ("How we actually built it", "The CORS Headache (And How I Fixed It)", "So… is the PM role really changing?").
- **Frequent horizontal rules (`---`)** to separate major topic shifts.
- **End with a wrap-up or call to action.** Common closers: personal reflection on the journey, invitation to reach out, teaser for next post, or a motivational sign-off.

### Formatting Habits

- **Bold for emphasis** on key phrases, product names, and important concepts. Used heavily and consistently.
- **Italics for asides, disclaimers, and softening.** Often used in parenthetical thoughts: _"(blame WFH!)"_, _"(Yes, you can book Ola cabs from Paytm!)"_.
- **Emoji usage: moderate.** Uses emoji in headers (🔍, 📝, 🎨, ⚙️, 🧠) and as occasional punctuation (🔥, 😅, 😉, ✌️, 🚀). Never excessive — roughly 5-10 per long post, zero in shorter analytical posts.
- **Blockquotes** for impactful stats, quotes from external sources, or to highlight key takeaways.
- **Bullet lists** are the default for enumerating points. Uses `-` not `*` for unordered lists. Numbered lists for sequential steps or ranked items.
- **Inline parenthetical commentary** is a signature style — adds personality and context: "(which effectively meant reaching almost 70-80% of the entire user base instantly on launch!)", "(blame Covid!)".
- **Code blocks** with language hints when sharing technical implementations. Always explains what the code does before and after the block.

### Content Patterns

- **Problem → Context → Solution → Reflection** is the core narrative arc for building/technical posts.
- **"Why → How → What" framework** explicitly used when describing product decisions. Answers "why should we do this?" before "how did we build it?".
- **Real numbers and stats** wherever possible: "15 million users", "1 billion alerts", "2000+ apps", "launched within 48 hours". Prince loves concrete evidence.
- **Hyperlinks to related posts, tools, and external references.** Cross-links between his own posts frequently. Links to tweets, tools, and official sources.
- **Embedded tweets** in narrative posts to show social proof and user reactions.
- **Figures with captions** using `<figure>` + `<figcaption>` for diagrams and screenshots.
- **Disclaimers** are common — honest about what he can/can't share: "a lot of internal data and decisions omitted for obvious reasons", "these are just some of my personal notes".

### Language Quirks

- Uses "in-fact" (hyphenated), "use-cases" (hyphenated), "a lot" (never "alot").
- Mixes British/Indian spelling naturally: "optimise", "standardise", "organisations".
- Exclamation marks used genuinely for excitement, not clickbait. Roughly 1-3 per section.
- Rhetorical questions to engage the reader: "So the next logical question coming out of all this you may ask is…", "Have you also felt uncomfortable sharing these?"
- Colloquial Indian English phrases occasionally: "blame my privilege", "to each his own", "literally the list seems to be endless".
- Technical terms explained in plain language first, then the jargon: "a vector of numbers that represents the 'meaning' of a word" before "Embedding".

### What NOT to do

- Don't write in a generic AI-assistant voice. No "In this comprehensive guide, we will explore…" or "Let's delve into…".
- Don't over-polish. Prince's posts have a natural flow with occasional run-on sentences, which gives them authenticity. Don't make it robotic-perfect.
- Don't skip the personal angle. Every post connects back to Prince's real experience at Paytm/Flipkart or a personal project.
- Don't use corporate-speak. No "leveraging synergies", "driving alignment", or "holistic approach" — Prince writes plainly even about complex topics.
- Don't forget the "why it matters" angle. Especially for technical concepts — always tie it back to practical PM/builder relevance.
