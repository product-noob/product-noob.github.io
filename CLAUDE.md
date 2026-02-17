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
