# princejain.me — Site Implementation Reference

Personal website of Prince Jain, built with [Astro](https://astro.build).
Static site (no server), deployed to GitHub Pages at `https://princejain.me`.

---

## Quick Start

```bash
npm install        # Install dependencies
npm run dev        # Dev server → localhost:4321
npm run build      # Production build → ./dist/
npm run preview    # Preview the production build locally
```

---

## Deployment Playbook

The site is developed on a local Mac, zipped, transferred offline to an Ubuntu server (already SSH/keygen authenticated to GitHub), and pushed from there. GitHub Actions builds and deploys to GitHub Pages. Cloudflare sits in front as the CDN.

### Step 1 — Zip on Mac (exclude heavy/unnecessary directories)

```bash
cd "/Users/prince.jain/Personal Website"
zip -r product-noob.github.io.zip product-noob.github.io/ \
  -x "product-noob.github.io/node_modules/*" \
  -x "product-noob.github.io/dist/*" \
  -x "product-noob.github.io/.astro/*" \
  -x "product-noob.github.io/.cursor/*" \
  -x "product-noob.github.io/.DS_Store" \
  -x "product-noob.github.io/**/.DS_Store" \
  -x "product-noob.github.io/*.pdf"
```

Transfer the zip to the Ubuntu server (SCP, USB, etc.).

### Step 2 — On Ubuntu: clean slate, unzip, push

```bash
# Clean up any previous version
cd ~
rm -rf product-noob.github.io
rm -f product-noob.github.io.zip

# ... transfer zip file here ...

# Unzip and enter the directory
unzip product-noob.github.io.zip
cd product-noob.github.io

# Initialize git and push
git init
git branch -M master
git add .
git commit -m "feat(seo): comprehensive SEO overhaul for Lighthouse 100

- Fix descriptive link text (Read More → Explore {company})
- Add valid robots.txt with sitemap reference
- Create custom 404 page
- Add BlogPosting JSON-LD structured data for all blog posts
- Add WebSite + BreadcrumbList JSON-LD schemas
- Add article:* OG meta tags for blog posts
- Dynamic OG images per page (heroImage support)
- Add og:locale, og:image:alt, twitter:image:alt
- Add theme-color + apple-touch-icon meta tags
- Add fetchpriority=high to LCP hero image
- Preload hero image on homepage
- Add unique meta descriptions to tools pages
- Custom sitemap.xml with lastmod, priority, changefreq
- Inline all CSS to eliminate render-blocking requests
- Compress profile images (47 KiB savings)
- Resize whisprflow.webp 960→184px (87% smaller)"
git remote add origin git@github.com:product-noob/product-noob.github.io.git
git push --force origin master
```

> **Note:** If the remote already exists from a previous push, replace
> `git remote add` with `git remote set-url`:
>
> ```bash
> git remote set-url origin git@github.com:product-noob/product-noob.github.io.git
> ```

### Step 3 — Wait for GitHub Actions

Go to the **Actions** tab on GitHub → wait for the green checkmark.
The workflow at `.github/workflows/deploy.yml` runs `npm ci` + `npm run build`
and deploys `dist/` to GitHub Pages.

### Step 4 — Purge Cloudflare Cache (MANDATORY after every deploy)

Without this step, Cloudflare may serve stale 404 responses for assets
that were requested before the deploy finished.

1. Log into [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Select **princejain.me**
3. **Caching** → **Configuration** → **Purge Everything**

### Step 5 — Verify Deployment

After cache purge, verify:
- Homepage loads: `https://princejain.me`
- Sitemap works: `https://princejain.me/sitemap.xml`
- robots.txt works: `https://princejain.me/robots.txt`
- 404 page works: `https://princejain.me/nonexistent-page`
- Blog post structured data: Run [Google Rich Results Test](https://search.google.com/test/rich-results)

### One-time GitHub Setup

- **Settings** → **Pages** → **Source**: select **GitHub Actions**
- **Custom domain**: `princejain.me`
- **Enforce HTTPS**: checked

### DNS (already configured)

- `CNAME` record: `www` → `product-noob.github.io`
- Four `A` records: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`

---

## Tech Stack

| Layer        | Choice                        | Why                                      |
|:-------------|:------------------------------|:-----------------------------------------|
| Framework    | Astro 5.x                     | Static site gen, zero JS by default      |
| Language     | TypeScript (strict mode)      | Type safety across data and components   |
| Styling      | Vanilla CSS + custom tokens   | No framework overhead, full control      |
| Syntax HL    | highlight.js                  | Code block highlighting (blog + tools)   |
| Content      | Markdown + Content Collections| Type-safe blog posts with Zod validation |
| Module       | ESM (`"type": "module"`)      | Modern JS module system                  |

Only **two production dependencies**: `astro` and `highlight.js`. Intentionally minimal.

---

## Project Structure

```
product-noob.github.io/
├── .github/workflows/
│   └── deploy.yml               # GitHub Actions: build + deploy to Pages
├── astro.config.mjs             # Site URL, output mode (static), build config
├── tsconfig.json                # Extends astro/strict
├── package.json                 # Scripts, deps
├── .gitignore                   # Excludes node_modules, dist, .astro, .DS_Store
│
├── public/                      # Static assets (served as-is, no processing)
│   ├── assets/                  # Blog hero images
│   ├── icons/                   # SVG/PNG icons (companies, topics)
│   ├── images/                  # Blog post images (30+ files)
│   └── profile-photo-*.png      # Profile photos for hero section
│
└── src/
    ├── components/              # Reusable Astro components
    │   ├── home/                # Homepage-specific (HeroSection, SelectedWork, DigitalGarden, Inspirations)
    │   ├── BlogCard.astro       # Blog post card (featured + default variants)
    │   ├── BentoGrid.astro      # Dense grid container
    │   ├── Chip.astro           # Inline badge/tag
    │   └── ProjectCard.astro    # Side project card
    │
    ├── content/                 # Content collections
    │   ├── config.ts            # Zod schema for blog frontmatter
    │   └── blog/                # 13 markdown blog posts
    │
    ├── data/                    # Typed data modules (single source of truth)
    │   ├── works.ts             # Work history + homepage highlights
    │   ├── projects.ts          # Side projects
    │   ├── skills.ts            # Tech stack + professional skills
    │   ├── links.ts             # Social/contact links
    │   └── tools.ts             # Tools listing
    │
    ├── layouts/
    │   └── BaseLayout.astro     # Shared shell: header, nav, footer, meta tags, fonts
    │
    ├── pages/                   # File-based routing (each file = a route)
    │   ├── index.astro          # Homepage
    │   ├── 404.astro            # Custom 404 error page
    │   ├── work.astro           # Work portfolio
    │   ├── about.astro          # About page
    │   ├── links.astro          # Social/contact links
    │   ├── blogs/
    │   │   ├── index.astro      # Blog listing
    │   │   └── [...slug].astro  # Dynamic blog post pages
    │   ├── tools/
    │   │   ├── index.astro      # Tools listing
    │   │   └── json-formatter.astro  # JSON formatter tool
    │   ├── rss.xml.ts           # RSS feed
    │   └── sitemap.xml.ts       # Custom XML sitemap with lastmod/priority
    │
    ├── scripts/                 # Client-side TypeScript
    │   ├── copyCode.ts          # Copy-to-clipboard on code blocks
    │   ├── mobileMenu.ts        # Hamburger menu toggle
    │   └── readingProgress.ts   # Reading progress bar
    │
    ├── styles/                  # CSS architecture
    │   ├── tokens.css           # Design tokens (colors, spacing, typography, shadows)
    │   ├── reset.css            # Modern CSS reset + background gradient
    │   ├── global.css           # Typography, utilities, animations
    │   └── components.css       # Buttons, cards, tags, chips, nav styles
    │
    └── utils/
        └── readingTime.ts       # Markdown → word count → minutes (200 WPM)
```

---

## Architecture — How Things Connect

### The Mental Model

```
                     ┌─────────────┐
                     │ BaseLayout  │  ← Every page wraps in this
                     │ (header,    │     (nav, footer, meta, fonts)
                     │  footer,    │
                     │  global CSS)│
                     └──────┬──────┘
                            │
              ┌─────────────┼─────────────┐
              │             │             │
         ┌────▼───┐   ┌────▼───┐   ┌────▼───┐
         │ Pages  │   │ Pages  │   │ Pages  │   ← Thin orchestrators
         │ (home) │   │ (blog) │   │ (work) │      Import data + components
         └────┬───┘   └────┬───┘   └────┬───┘      Contain zero logic
              │             │             │
         ┌────▼───┐   ┌────▼───┐   ┌────▼───┐
         │Comps   │   │Content │   │ Data   │   ← Where the real work lives
         │(Hero,  │   │Collect.│   │(works, │
         │ Work,  │   │(blog/) │   │ skills)│
         │Garden) │   └────────┘   └────────┘
         └────────┘

Styling: tokens.css → reset.css → global.css → components.css → component <style>
Scripts: Imported in BaseLayout or individual pages, run client-side
```

### Key Architectural Rules

1. **Pages are thin orchestrators** — they import data and components, never contain business logic
2. **Single source of truth** — all shared data lives in `src/data/*.ts` with TypeScript interfaces
3. **Components own their logic** — each `.astro` component contains its markup, styles, and scripts
4. **Design tokens drive everything** — colors, spacing, shadows, radii all come from `tokens.css`
5. **No CDN JavaScript** — all scripts are local, typed, and tree-shakeable

---

## Routes & Pages

| Route                    | File                               | What it does                            |
|:-------------------------|:-----------------------------------|:----------------------------------------|
| `/`                      | `pages/index.astro`                | Homepage: hero, work timeline, projects |
| `/blogs`                 | `pages/blogs/index.astro`          | Blog listing with featured post         |
| `/blogs/[slug]`          | `pages/blogs/[...slug].astro`      | Individual blog post                    |
| `/work`                  | `pages/work.astro`                 | Full work portfolio                     |
| `/about`                 | `pages/about.astro`                | About page with skills and bio          |
| `/links`                 | `pages/links.astro`                | Social/contact links                    |
| `/tools`                 | `pages/tools/index.astro`          | Tools listing                           |
| `/tools/json-formatter`  | `pages/tools/json-formatter.astro` | JSON formatter/validator tool           |
| `/rss.xml`               | `pages/rss.xml.ts`                 | RSS feed                                |
| `/sitemap.xml`           | `pages/sitemap.xml.ts`             | XML sitemap with lastmod/priority       |
| `/404`                   | `pages/404.astro`                  | Custom 404 error page                   |

Astro uses **file-based routing** — every `.astro` file in `pages/` becomes a URL.
The `[...slug].astro` file is a **catch-all dynamic route** that generates one page per blog post at build time.

---

## Content System (Blog)

Blog posts live as Markdown files in `src/content/blog/`.

### Frontmatter Schema (enforced by Zod)

```yaml
title: "Your Post Title"           # Required, min 1 char
description: "A brief summary"     # Required, min 10 chars
pubDate: 2025-01-15                # Required, auto-coerced to Date
updatedDate: 2025-02-01            # Optional
heroImage: "/images/my-image.png"  # Optional
tags: ["PM", "AI"]                 # Required, 1–4 tags
featured: true                     # Optional, defaults to false
```

Schema is defined in `src/content/config.ts`. If a post violates the schema, **the build fails** — this is intentional.

### How Blog Posts Render

1. `getStaticPaths()` in `[...slug].astro` fetches all blog posts at build time
2. Each post generates a static HTML page at `/blogs/[slug]`
3. Markdown is rendered to HTML by Astro's built-in pipeline
4. Reading time is calculated by stripping markdown syntax and counting words (200 WPM)
5. **Related posts** are scored by counting shared tags with the current post, top 3 shown

### Adding a New Blog Post

Create a new `.md` file in `src/content/blog/` with valid frontmatter. That's it.
The blog listing and individual post pages generate automatically at build time.

---

## Styling Architecture

### Layer Hierarchy (loaded in this order)

| Layer             | File              | Purpose                                   |
|:------------------|:------------------|:------------------------------------------|
| **1. Tokens**     | `tokens.css`      | CSS custom properties (the design system) |
| **2. Reset**      | `reset.css`       | Browser normalization + background        |
| **3. Global**     | `global.css`      | Typography, utilities, animations         |
| **4. Components** | `components.css`  | Buttons, cards, chips, nav styles         |
| **5. Scoped**     | `<style>` in `.astro` | Component-specific overrides          |

### Design Tokens (the important ones)

- **Accent color**: Warm orange `hsl(28, 100%, 50%)` — used across CTAs, highlights, active states
- **Secondary accent**: Pink/magenta — gradients, hover effects
- **Font families**: Fraunces (display), DM Sans (body), JetBrains Mono (code)
- **Font sizes**: Scale from `--text-xs` (0.8125rem) to `--text-hero` (6.5rem)
- **Spacing**: Scale from `--space-1` (4px) to `--space-32` (128px)
- **Responsive breakpoints**: 1024px, 768px, 480px (tokens adjust automatically)
- **Naming**: BEM convention — `.block__element--modifier`

### Visual Effects

- **Glassmorphism**: `backdrop-filter: blur()` on cards and chips
- **Gradient glow**: Hover effects on blog cards and project cards
- **Staggered animations**: Fade-up with incremental delays on lists
- **Respects `prefers-reduced-motion`** — animations disabled for users who prefer it

---

## Client-Side Scripts

Astro ships **zero JavaScript by default**. These scripts are explicitly opted-in where needed.

| Script                | Loaded Where        | What It Does                                |
|:----------------------|:--------------------|:--------------------------------------------|
| `copyCode.ts`        | BaseLayout          | Adds "Copy" button to all code blocks       |
| `mobileMenu.ts`      | BaseLayout          | Hamburger menu toggle, scroll lock          |
| `readingProgress.ts` | Blog post pages     | Progress bar based on scroll position       |
| Inline (JSON tool)   | json-formatter page | Format, minify, copy JSON, syntax highlight |

All scripts are TypeScript, imported as modules, and initialized on page load.

---

## Components Reference

### Layout

| Component          | Props                                          | Notes                                       |
|:-------------------|:-----------------------------------------------|:--------------------------------------------|
| `BaseLayout`       | `title`, `description?`, `ogImage?`, `ogType?`, `breadcrumbs?`, `extraSchema?`, etc. | Wraps every page. SEO meta, structured data, nav, footer |

### Homepage

| Component          | Props                      | Notes                                       |
|:-------------------|:---------------------------|:--------------------------------------------|
| `HeroSection`      | None                       | Rotating profile images (4 photos, 1.5s cycle)|
| `SelectedWork`     | `items: WorkHighlight[]`   | Timeline with scroll-triggered reveal       |
| `DigitalGarden`    | `projects`, `stack`        | Bento grid of side projects + tech stack    |
| `Inspirations`     | None                       | People Who Inspire Me card grid             |

### Shared

| Component          | Props                              | Notes                                |
|:-------------------|:-----------------------------------|:-------------------------------------|
| `BlogCard`         | `title`, `pubDate`, `slug`, etc.   | `variant="featured"` for hero card   |
| `ProjectCard`      | `title`, `description`, `tags`, etc.| Glassmorphism, hover glow           |
| `BentoGrid`        | `class?`                           | Auto-fill grid, supports `span-2`   |
| `Chip`             | `text?`, `icon?`, `href?`          | Badge/tag, renders as `<a>` or `<span>` |

---

## Data Layer

All structured data lives in `src/data/` as typed TypeScript modules.

| File          | Exports                          | Used By                     |
|:--------------|:---------------------------------|:----------------------------|
| `works.ts`    | `works`, `workHighlights`        | `/work`, homepage timeline  |
| `projects.ts` | `sideProjects`                   | Homepage digital garden     |
| `skills.ts`   | `stack`, `skills`                | Homepage tech stack, about  |
| `links.ts`    | `links`                          | `/links` page               |
| `tools.ts`    | `tools`                          | `/tools` listing            |

### Important Pattern

`workHighlights` is **derived from** `works` (references accent colors from the full entries). This keeps the homepage highlights and the full work page in sync — single source of truth.

---

## Navigation

- **Desktop**: Horizontal nav links in the sticky header
- **Mobile**: Hamburger menu that slides in, locks background scroll
- **Active state**: Determined by checking `Astro.url.pathname` against each route
- **Links**: Blog, Work, Links, About

Footer includes: Twitter, LinkedIn, GitHub, Email links + dynamic copyright year.

---

## Key Implementation Details

### Static Site Generation (SSG)

The entire site is pre-rendered at build time. No server, no API calls at runtime.
Blog posts are generated via `getStaticPaths()` — Astro creates one HTML file per post.

### Related Posts Algorithm

Simple tag-overlap scoring:
1. For each other post, count how many tags it shares with the current post
2. Sort by score (highest first)
3. Take top 3

No ML, no external service — just array operations.

### Reading Time

1. Strip all markdown syntax (code blocks, links, images, headings, HTML tags)
2. Split into words, count them
3. Divide by 200 WPM, round up, minimum 1 minute

### JSON Formatter Tool

Fully client-side — no data leaves the browser:
- Parse → `JSON.stringify` with 2-space indent → highlight.js for syntax coloring
- Minify: `JSON.stringify` with no indent
- Keyboard shortcut: `Ctrl/Cmd + Enter` to format
- Toast notifications for copy/error feedback

### Scroll Animations

Homepage uses `IntersectionObserver` (not scroll events) for performance:
- Timeline items reveal when they enter the viewport
- Staggered delays create a cascade effect
- Fully CSS-driven transitions, JS just toggles a class

---

## Build & Deploy

```bash
npm run build    # Outputs to ./dist/
```

- **Output**: Static HTML/CSS/JS in `./dist/`
- **Assets**: Hashed filenames in `./dist/assets/` for cache busting
- **Deploy target**: GitHub Pages via Actions (`.github/workflows/deploy.yml`)
- **CDN**: Cloudflare (DNS proxy for `princejain.me`)
- **Site URL config**: `https://princejain.me` in `astro.config.mjs`

---

## Adding New Content

### New Blog Post
1. Create `src/content/blog/Your-Post-Title.md`
2. Add valid frontmatter (see schema above)
3. Write in Markdown — images go in `public/images/`
4. Set `featured: true` to make it the hero on the blog listing

### New Work Entry
1. Edit `src/data/works.ts`
2. Add a `WorkEntry` object to the `works` array
3. Add a matching `WorkHighlight` to `workHighlights`
4. Assign a unique `accentColor` (HSL value)

### New Side Project
1. Edit `src/data/projects.ts`
2. Add a `SideProject` object to the `sideProjects` array

### New Tool
1. Add entry to `src/data/tools.ts`
2. If it needs its own page, create `src/pages/tools/your-tool.astro`
3. Use `BaseLayout` as the wrapper

---

## Conventions to Follow

- **No hardcoded colors/spacing** — always use tokens from `tokens.css`
- **No logic in page files** — keep them as thin importers
- **No `any` types** — everything is typed
- **No inline scripts** beyond minimal init calls
- **BEM naming** for all CSS classes (`.block__element--modifier`)
- **Mobile-first** responsive design
- **Accessibility**: Semantic HTML, ARIA attributes, `prefers-reduced-motion` support

Full coding standards are documented in `CURSOR_RULES_DOCUMENTATION.md` and `.cursorrules`.
