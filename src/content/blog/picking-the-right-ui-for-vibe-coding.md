---
pubDate: '2026-06-09'
title: "How I Pick the UI Before Writing a Single Prompt"
description: "Why your vibe-coded prototype looks generic, and the two questions trick that fixes it before you write a single prompt."
tags: ['AI', 'Vibe Coding', 'Design']
featured: true
---

Last week, three different people sent me their vibe-coded prototypes for feedback. Different products, different problem spaces. All three looked _exactly_ the same: system-ui font, a purple-to-pink gradient somewhere, decorative emoji in the headings, an unrequested dark mode, and not a single focus ring in sight.

That's not Claude's fault _(or v0's, or Lovable's, or Cursor's)_. The model picked the average of every UI it has ever seen, because nobody told it what "good" looked like. Average of everything = generic. That's the entire game.

I [vibe-code almost every day](https://princejain.me/blogs/vibe-coding-what-i-built-in-12-months) — internal tools at work, weekend prototypes, this site you're reading on. After enough builds, I worked out that 30 seconds of upfront thinking saves me roughly three rounds of "no, less purple, more rounded, the buttons feel off." This post is the 30 seconds.

_A note: I'm a PM, not a designer. What follows isn't a design system manifesto. It's the cheat sheet I keep going back to so that what I ship doesn't look like everyone else's first prompt._

<aside class="skip-ahead">
  <p class="skip-ahead__eyebrow">SKIP AHEAD</p>
  <p class="skip-ahead__body">Want to just play? <a href="/ui-vibes-reference.html" target="_blank" rel="noopener noreferrer">Open the live HTML reference ↗</a> — all 8 vibes rendered as full pages with 10+ components each, and a floating button to copy each vibe's prompt straight to your clipboard.</p>
</aside>

---

## TL;DR

1. **The model averages unless you constrain it.** Ask for "a habit tracker" and you'll get the average of every habit tracker on the internet. Concrete tokens (hex codes, font, spacing scale) stop the averaging.

2. **Two questions before the prompt: what's the vibe, and what's the shape.** Vibe is how it _feels_. Shape is how it's _organised_. Thirty seconds here, five rounds of iteration saved later.

3. **Eight vibes cover almost every project I've built.** Editorial, Utility, Warm Consumer, Sharp Product, Soft SaaS, Playful, Brutalist, Glass / Spatial. Pick one, commit hard, bake its tokens into the prompt.

4. **Six shapes cover almost every screen.** Dashboard, single-screen tool, form/wizard, list/feed, reading column, landing page. Most products are one shape; a few stitch two together.

5. **Bake it into the prompt as concrete tokens, not adjectives.** "Make it warm and friendly" produces generic. "Background #FFFAF3, DM Sans, 12px corner radius, terracotta accent for primary only" produces something you'd actually screenshot.

---

## Why Most Vibe-Coded UIs Look the Same

If you've prompted any of these tools recently, you already know the shape of the output. System font. Cards with the same shadow. Buttons that lean indigo. A linear-gradient header somewhere. Emoji sprinkled into headings _(why does every AI-generated UI think a 🚀 belongs next to "Get Started"?)._

It's not a bug. The model is doing exactly what you asked: produce the most likely UI given the prompt "build me an X." The most likely UI is the average of every X it saw during training. The average of a million SaaS landing pages is, predictably, a SaaS landing page that looks like every other SaaS landing page.

The fix is not "become a better designer." The fix is to **stop letting the model average**. Give it constraints specific enough that the most likely output is the one you actually want.

Two constraints do almost all the work: vibe and shape.

---

## The Two Questions I Ask Before Any Prompt

1. **What's the vibe?** How should this thing _feel_ to use? Calm and editorial? Dense and utilitarian? Playful? Premium B2B?
2. **What's the shape?** How is the screen organised? A dashboard with a sidebar? A single focused canvas? A reading column? A landing page?

That's it. Thirty seconds. The rest of the prompt is project-specific (what the feature does, what data it shows), but vibe + shape is the part that decides whether the output looks considered or generic.

---

## The Eight Vibes

After enough prototypes, almost every project I've built falls into one of eight aesthetic buckets. Pick one, commit to it, and bake its tokens — background, accent, font, radius, spacing scale, motion — into your prompt.

- **Editorial** — Magazine-like. Calm, text-first, generous spacing. Serif headings on warm white. _For: blogs, portfolios, essay-style products. This site sits here._
- **Utility** — Dense, fast, professional. Linear or Notion. Information-first. _For: dashboards, internal tools, dev tools. Most of what I build at work lives here._
- **Warm Consumer** — Soft, friendly, rounded. Headspace or Apple Health. Terracotta or sage on cream. _For: personal apps, finance, health, wellness._
- **Sharp Product** — Premium B2B. Stripe or Vercel. Tight typography, precise spacing, one deliberate brand accent. **Flat — no atmospheric effects.** _For: SaaS landing pages, B2B tools._
- **Soft SaaS** — The "Lovable" aesthetic. White background with oversized blurred colour blobs in the corners, indigo/violet accents. **Atmospheric — floats in space.** _For: AI products, dev tools, agent UIs._
- **Playful** — Bold, colourful, expressive. Duolingo. Huge display type, paired bold colours, bouncy motion. _For: consumer fun apps, learning tools, side projects with personality._
- **Brutalist** — Hard edges, mono font for labels, no shadow, no radius, one off-colour accent. Vercel-blog, GitHub Primer, Are.na. _For: dev portfolios, indie tools, raw blogs._
- **Glass / Spatial** — Frosted-blur surfaces with depth via translucency. Vision OS, iOS Settings. Sage or icy accents, ambient. _For: spatial / ambient interfaces, meditative tools._

When in doubt choose from Editorial, Utility, Warm Consumer, and Soft SaaS. Sharp Product, Playful, Brutalist, and Glass punish a half-committed execution _(if you go Brutalist and then quietly add a soft shadow on one card, the whole thing falls apart)._

### Play with each vibe

Same component, eight skins. Tap a name to swap. Each redraws the card with the right colours, type, radius, and motion for that vibe. When you find one you like, copy its full prompt block straight to your clipboard.

<div class="vibe-switcher" data-vibe="editorial">
  <div class="vibe-switcher__pills" role="tablist" aria-label="Choose a UI vibe">
    <button type="button" data-set-vibe="editorial" class="vibe-pill is-active" role="tab" aria-selected="true">Editorial</button>
    <button type="button" data-set-vibe="utility" class="vibe-pill" role="tab" aria-selected="false">Utility</button>
    <button type="button" data-set-vibe="warm-consumer" class="vibe-pill" role="tab" aria-selected="false">Warm Consumer</button>
    <button type="button" data-set-vibe="sharp-product" class="vibe-pill" role="tab" aria-selected="false">Sharp Product</button>
    <button type="button" data-set-vibe="soft-saas" class="vibe-pill" role="tab" aria-selected="false">Soft SaaS</button>
    <button type="button" data-set-vibe="playful" class="vibe-pill" role="tab" aria-selected="false">Playful</button>
    <button type="button" data-set-vibe="brutalist" class="vibe-pill" role="tab" aria-selected="false">Brutalist</button>
    <button type="button" data-set-vibe="glass-spatial" class="vibe-pill" role="tab" aria-selected="false">Glass / Spatial</button>
  </div>

  <div class="vibe-stage">
    <div class="vibe-sample">
      <div class="vibe-sample__tag">DAILY HABIT</div>
      <h3 class="vibe-sample__title">Read 30 minutes</h3>
      <p class="vibe-sample__body">Streak 12 days · Last completed yesterday</p>
      <button class="vibe-sample__cta" type="button">Mark done</button>
    </div>
  </div>

  <div class="vibe-switcher__actions">
    <button class="vibe-copy" type="button" data-action="copy-active-vibe">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
      <span class="vibe-copy__label">Copy this vibe's prompt</span>
    </button>
    <p class="vibe-switcher__caption">
      Want all 8 side-by-side? <a href="/vibes/">Browse the full library →</a>
    </p>
  </div>
</div>

---

## The Six Shapes

Vibe is how it _feels_. Shape is how it's _organised_. Six options cover almost every screen I've ever built:

- **Dashboard** — Sidebar nav + grid of cards. Multiple views, overview-first.
- **Single-screen tool** — One focused canvas, one main task. A calculator, a converter, a chat UI.
- **Form / wizard** — Vertical flow, progressive disclosure. One column, sticky CTA.
- **List / feed** — Repeating items with filters. Inbox, search results, feed.
- **Reading / content** — Centred column 640–720px, generous vertical rhythm. The page _is_ the product.
- **Landing page** — Hero → features → CTA → footer. Full-width sections.

Most products are one shape. A few are two stitched together — a landing page that opens into a dashboard, for example. Pick the dominant one for the screen you're prompting for.

---

## The Pairing Matrix

The shortcut: vibe × shape gives you most of the design decision in one line. Some pairings I keep coming back to:

| Project | Vibe | Shape |
|---|---|---|
| Internal PM tool | Utility | Dashboard |
| Personal finance tracker | Warm Consumer | Dashboard |
| SaaS marketing site | Sharp Product | Landing page |
| AI agent / chat UI | Soft SaaS | Single-screen |
| Personal blog or portfolio | Editorial | Reading |
| Habit tracker for friends | Playful | Single-screen |
| Onboarding wizard | Sharp Product | Form / wizard |
| Reading list app | Editorial | List / feed |
| Dev portfolio / link-in-bio | Brutalist | Landing page |
| Ambient meditation app | Glass / Spatial | Single-screen |

A few examples from things I've actually shipped: the [SLAP debug dashboard](https://princejain.me/blogs/vibe-coding-what-i-built-in-12-months#slap-debug-dashboard) was Utility + Dashboard. [Whispr Flow](https://whispr.princejain.me/) was Sharp Product + Single-screen. This site is Editorial + Reading. The quiet thing those three have in common: I picked the vibe and shape before writing the first prompt, and each came out close to what I wanted on the first attempt.

Don't overthink the matrix. Wrong on the first pass is fine — you'll feel it within five minutes of looking at the output, and swapping vibes is one prompt away.

---

## Bake It Into the Prompt

Here's the actual lever. Most "build me an X" prompts look like this:

```text
Build me a habit tracker. I want to track 5 habits a day,
see a calendar view, and get a streak count.
```

You'll get a working habit tracker. It will also be generic.

Here's the same prompt with vibe + shape pre-loaded:

```text
Build me a habit tracker. Track 5 habits a day, calendar view,
streak count.

Design system: Warm Consumer
- Background: #FFFAF3 (cream)
- Text: #2D2620 (warm dark brown), secondary #6B5D54
- Accent: #D97757 (terracotta) for primary actions only
- Font: DM Sans throughout; body 16px, headings 24/32
- Corner radius 12px on cards, 9999px pill on primary CTAs
- 8pt spacing scale; card padding 24px; section spacing 48px
- Motion: 250-350ms ease-out; subtle scale-down (0.97) on tap

Shape: Single-screen tool
- Centred canvas, max-width 720px
- 5 habit rows stacked vertically, each with a circular check
- Calendar strip sticky at top, streak counter top-right
- Mobile: full width with 16px horizontal padding

Non-negotiables:
- Light mode. No dark variant.
- Real habit names like "Read 30 min", "Walk 8k steps". No lorem.
- Hover, active, focus, and disabled states on every interactive element.
- Touch targets ≥ 44px on mobile. No horizontal scroll at 375px.
- Icons from lucide-react only. No emoji in the UI.
```

Same project. Two different worlds. The second prompt produces something you'd actually screenshot.

You don't need to write this block from scratch every time. I've pre-built the design-system block for all eight vibes on the [vibes reference page](/vibes/) — copy, paste, fill in the project context, ship.

---

## The Non-Negotiables I Paste Into Every Prompt

Some rules are vibe-independent. I keep these at the bottom of every build prompt because each one is something I had to learn the hard way:

- **Light mode by default.** Dark only if the vibe explicitly calls for it _and_ I asked. Default-dark from the model is almost always wrong.
- **Real content, not Lorem ipsum.** Real habit names, real product titles, real user names. The output reads completely differently — and you can actually demo it.
- **Every interactive element gets hover, active, focus, and disabled states.** The focus ring is a 2px accent-coloured ring with 2px offset. Skip this and you'll ship something inaccessible without realising it.
- **Mobile-first.** Build for 375px, then enhance to 768px and 1280px. Test no horizontal scroll at the smallest size.
- **Icons from one library only.** I use lucide-react. 16px or 20px inline, never larger. Mixing icon libraries is the fastest tell that a UI was glued together by a model.
- **No emoji in the UI.** Decorative emoji in headings is the single fastest tell of an AI-default UI.
- **No generic SaaS gradients.** Purple-to-pink, blue-to-purple. If gradients are used, they have to fit the vibe (Soft SaaS earns one; Editorial does not).

That's roughly 80% of the gap between a default-looking output and one that feels considered. The other 20% is just commitment to the vibe — not flinching halfway through and softening a Brutalist build because the model suggested it.

---

## What Still Trips Me Up

This isn't a clean playbook. A few things still go wrong:

- **Vibe drift across screens.** I pick Sharp Product for the landing page, then on screen three the model quietly drifts to Soft SaaS because that's its default. Fix: paste the vibe tokens into _every_ prompt in the session, not just the first one.
- **Hybrid shapes confuse the model.** A landing page that opens into a dashboard is two shapes. Prompt for both at once and you get something that's neither. I now build them as separate prompts and stitch them.
- **The matrix is a starting point, not gospel.** A couple of times I picked Editorial + Reading for what should have been Utility + Dashboard, and spent an hour wondering why the data felt cramped before realising the vibe was the problem, not the layout.
- **Some products genuinely need a custom vibe.** The eight cover ~90% of what I build. For the other 10%, I steal tokens from a real product I admire — open the site, inspect colours, copy hex values into the prompt. Don't try to invent a vibe from scratch in a vibe-coding session; that's not what the model is good at.

---

## The Actual Point

Vibe-coding well isn't about being a designer. It's about being _specific_. The model is trained on every UI ever published; if you don't constrain it, it averages. If you hand it concrete tokens — hex codes, font families, spacing scale, motion timings — it stops averaging and starts executing.

Thirty seconds of "Warm Consumer + Single-screen tool" beats thirty minutes of "no, more rounded, less purple, can the buttons be softer."

The thing I've internalised is that this isn't really a design skill. It's a product skill. Knowing _which_ vibe fits _which_ product is a judgment call about who the user is and what they expect to feel. That's the same call a PM makes every day, just compressed into a single prompt.

---

_This is the first post in a short series on getting more out of Claude Code and vibe-coding tools. Next up: writing prompts the model actually follows — XML structure, anti-patterns, and why specificity beats verbosity. After that: choosing a stack, iterating without burning context, and shipping a vibe-coded prototype past the demo._

_If you're vibe-coding and want to compare notes on any of this, find me on [Twitter](https://twitter.com/princejain) or [LinkedIn](https://www.linkedin.com/in/prince-jain/). Always up for it. Or subscribe to the [RSS feed](/rss.xml) for the rest of the series._

<style>
  /* ============================================================
     Skip-ahead callout (top of post)
     ============================================================ */
  .skip-ahead {
    margin: 1.75rem 0 0;
    padding: 16px 20px;
    background: linear-gradient(180deg, #FFF7EE 0%, #FFFAF3 100%);
    border: 1px solid #F0E0C5;
    border-left: 3px solid var(--color-accent, #FF6B00);
    border-radius: 8px;
  }
  .skip-ahead__eyebrow {
    font-size: 10px;
    letter-spacing: 0.14em;
    font-weight: 700;
    color: var(--color-accent, #FF6B00);
    margin: 0 0 4px;
  }
  .skip-ahead__body {
    margin: 0;
    font-size: 14px;
    line-height: 1.55;
    color: var(--gray-700);
  }
  .skip-ahead__body a {
    color: var(--gray-900);
    font-weight: 600;
    text-decoration: underline;
    text-underline-offset: 3px;
  }
  .skip-ahead__body a:hover { color: var(--color-accent, #FF6B00); }

  /* ============================================================
     Vibe switcher — inline interactive widget
     ============================================================ */
  .vibe-switcher {
    margin: 2.5rem 0;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .vibe-switcher__pills {
    display: flex;
    gap: 0.5rem;
    overflow-x: auto;
    padding: 4px;
    margin: -4px;
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .vibe-switcher__pills::-webkit-scrollbar { display: none; }

  .vibe-pill {
    appearance: none;
    background: white;
    border: 1px solid var(--gray-300);
    color: var(--gray-700);
    padding: 7px 14px;
    border-radius: 999px;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    white-space: nowrap;
    flex-shrink: 0;
    transition: background 120ms ease, border-color 120ms ease, color 120ms ease;
  }
  .vibe-pill:hover { border-color: var(--gray-500); color: var(--gray-900); }
  .vibe-pill:focus { outline: none; }
  .vibe-pill:focus-visible {
    outline: 2px solid var(--color-accent, #FF6B00);
    outline-offset: 2px;
  }
  .vibe-pill.is-active {
    background: var(--gray-900);
    border-color: var(--gray-900);
    color: white;
  }

  .vibe-stage {
    border-radius: 12px;
    overflow: hidden;
    position: relative;
    min-height: 240px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 32px 24px;
    isolation: isolate;
    border: 1px solid var(--gray-200);
  }

  .vibe-sample { max-width: 380px; width: 100%; }

  .vibe-switcher__actions {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    margin-top: 4px;
  }
  .vibe-copy {
    appearance: none;
    border: 1px solid var(--gray-900);
    background: var(--gray-900);
    color: white;
    padding: 10px 18px;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: transform 120ms ease, background 120ms ease;
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }
  .vibe-copy svg { opacity: 0.85; }
  .vibe-copy:hover { background: black; }
  .vibe-copy:active { transform: scale(0.98); }
  .vibe-copy.is-copied {
    background: var(--color-accent, #FF6B00);
    border-color: var(--color-accent, #FF6B00);
  }
  .vibe-switcher__caption {
    font-size: 12px;
    color: var(--gray-500);
    margin: 0;
    line-height: 1.4;
  }
  .vibe-switcher__caption a {
    color: var(--gray-700);
    text-decoration: underline;
    text-underline-offset: 3px;
    font-weight: 500;
  }
  .vibe-switcher__caption a:hover { color: var(--color-accent, #FF6B00); }

  /* ============================================================
     Per-vibe token scopes — the only place the look changes
     ============================================================ */
  .vibe-switcher[data-vibe="editorial"] .vibe-stage { background: #FAFAF7; }
  .vibe-switcher[data-vibe="editorial"] .vibe-sample {
    background: #FFFFFF; border: 1px solid #E8E5DC; border-radius: 4px;
    padding: 28px; font-family: 'Inter', system-ui, sans-serif;
  }
  .vibe-switcher[data-vibe="editorial"] .vibe-sample__tag { font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: #0B1F3A; font-weight: 600; margin-bottom: 12px; }
  .vibe-switcher[data-vibe="editorial"] .vibe-sample__title { font-family: 'Fraunces','Source Serif Pro',Georgia,serif; font-size: 26px; font-weight: 600; color: #1A1A1A; line-height: 1.15; letter-spacing: -0.01em; margin-bottom: 8px; }
  .vibe-switcher[data-vibe="editorial"] .vibe-sample__body { font-size: 15px; color: #555; line-height: 1.6; margin-bottom: 20px; }
  .vibe-switcher[data-vibe="editorial"] .vibe-sample__cta { background: #0B1F3A; color: white; border: 0; border-radius: 4px; padding: 10px 20px; font-size: 14px; font-weight: 500; cursor: pointer; }

  .vibe-switcher[data-vibe="utility"] .vibe-stage { background: #FAFAFA; }
  .vibe-switcher[data-vibe="utility"] .vibe-sample {
    background: #FFFFFF; border: 1px solid #E5E5E5; border-radius: 6px;
    padding: 18px; font-family: 'Inter', system-ui, sans-serif;
  }
  .vibe-switcher[data-vibe="utility"] .vibe-sample__tag { font-size: 11px; letter-spacing: 0.06em; text-transform: uppercase; color: #666; font-weight: 500; margin-bottom: 8px; }
  .vibe-switcher[data-vibe="utility"] .vibe-sample__title { font-size: 18px; font-weight: 600; color: #0A0A0A; margin-bottom: 4px; }
  .vibe-switcher[data-vibe="utility"] .vibe-sample__body { font-size: 13px; color: #666; line-height: 1.45; margin-bottom: 14px; }
  .vibe-switcher[data-vibe="utility"] .vibe-sample__cta { background: #3B82F6; color: white; border: 0; border-radius: 6px; padding: 7px 14px; font-size: 13px; font-weight: 500; cursor: pointer; }

  .vibe-switcher[data-vibe="warm-consumer"] .vibe-stage { background: #FFFAF3; }
  .vibe-switcher[data-vibe="warm-consumer"] .vibe-sample {
    background: #FFFFFF; border: 1px solid #EDE4D8; border-radius: 14px;
    padding: 24px; font-family: 'DM Sans','Inter',sans-serif;
  }
  .vibe-switcher[data-vibe="warm-consumer"] .vibe-sample__tag { font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase; color: #D97757; font-weight: 600; margin-bottom: 10px; }
  .vibe-switcher[data-vibe="warm-consumer"] .vibe-sample__title { font-size: 22px; font-weight: 600; color: #2D2620; margin-bottom: 6px; letter-spacing: -0.01em; }
  .vibe-switcher[data-vibe="warm-consumer"] .vibe-sample__body { font-size: 15px; color: #6B5D54; line-height: 1.55; margin-bottom: 20px; }
  .vibe-switcher[data-vibe="warm-consumer"] .vibe-sample__cta { background: #D97757; color: white; border: 0; border-radius: 9999px; padding: 11px 22px; font-size: 14px; font-weight: 600; cursor: pointer; }

  .vibe-switcher[data-vibe="sharp-product"] .vibe-stage { background: #FAFAFA; }
  .vibe-switcher[data-vibe="sharp-product"] .vibe-sample {
    background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 8px;
    padding: 22px; font-family: 'Inter', system-ui, sans-serif;
  }
  .vibe-switcher[data-vibe="sharp-product"] .vibe-sample__tag { font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase; color: #4F46E5; font-weight: 600; margin-bottom: 10px; }
  .vibe-switcher[data-vibe="sharp-product"] .vibe-sample__title { font-size: 22px; font-weight: 700; color: #0F172A; letter-spacing: -0.02em; margin-bottom: 6px; }
  .vibe-switcher[data-vibe="sharp-product"] .vibe-sample__body { font-size: 14px; color: #475569; line-height: 1.5; margin-bottom: 18px; }
  .vibe-switcher[data-vibe="sharp-product"] .vibe-sample__cta { background: #4F46E5; color: white; border: 0; border-radius: 6px; padding: 9px 18px; font-size: 14px; font-weight: 500; cursor: pointer; }

  .vibe-switcher[data-vibe="soft-saas"] .vibe-stage { background: #FFFFFF; }
  .vibe-switcher[data-vibe="soft-saas"] .vibe-stage::before,
  .vibe-switcher[data-vibe="soft-saas"] .vibe-stage::after {
    content: ''; position: absolute; width: 320px; height: 320px;
    border-radius: 50%; filter: blur(80px); pointer-events: none; z-index: 0;
  }
  .vibe-switcher[data-vibe="soft-saas"] .vibe-stage::before { background: #8B5CF6; opacity: 0.22; top: -140px; right: -100px; }
  .vibe-switcher[data-vibe="soft-saas"] .vibe-stage::after { background: #0EA5E9; opacity: 0.2; bottom: -140px; left: -100px; }
  .vibe-switcher[data-vibe="soft-saas"] .vibe-sample {
    background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 14px;
    padding: 22px; font-family: 'Inter', system-ui, sans-serif;
    box-shadow: 0 2px 10px -3px rgba(99,102,241,0.15);
    position: relative; z-index: 1;
  }
  .vibe-switcher[data-vibe="soft-saas"] .vibe-sample__tag { font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: #6366F1; font-weight: 600; margin-bottom: 10px; }
  .vibe-switcher[data-vibe="soft-saas"] .vibe-sample__title { font-size: 20px; font-weight: 600; color: #0F172A; letter-spacing: -0.02em; margin-bottom: 6px; }
  .vibe-switcher[data-vibe="soft-saas"] .vibe-sample__body { font-size: 14px; color: #64748B; line-height: 1.5; margin-bottom: 18px; }
  .vibe-switcher[data-vibe="soft-saas"] .vibe-sample__cta { background: linear-gradient(135deg, #6366F1, #8B5CF6); color: white; border: 0; border-radius: 9px; padding: 10px 18px; font-size: 14px; font-weight: 500; cursor: pointer; box-shadow: 0 4px 12px -2px rgba(99,102,241,0.4); }

  .vibe-switcher[data-vibe="playful"] .vibe-stage { background: #FFF8E7; }
  .vibe-switcher[data-vibe="playful"] .vibe-sample {
    background: #FFFFFF; border: 0; border-radius: 20px;
    padding: 24px; font-family: 'Outfit','DM Sans',sans-serif;
    box-shadow: 0 6px 0 #FFD93D, 0 6px 0 1px rgba(0,0,0,0.05);
  }
  .vibe-switcher[data-vibe="playful"] .vibe-sample__tag { font-size: 12px; letter-spacing: 0.06em; text-transform: uppercase; color: #6A4C93; font-weight: 700; margin-bottom: 10px; }
  .vibe-switcher[data-vibe="playful"] .vibe-sample__title { font-size: 28px; font-weight: 800; color: #2C2C2E; line-height: 1.05; margin-bottom: 8px; }
  .vibe-switcher[data-vibe="playful"] .vibe-sample__body { font-size: 15px; color: #6B6B70; line-height: 1.5; margin-bottom: 20px; font-weight: 500; }
  .vibe-switcher[data-vibe="playful"] .vibe-sample__cta { background: #FF6B6B; color: white; border: 0; border-radius: 9999px; padding: 12px 24px; font-size: 14px; font-weight: 700; cursor: pointer; box-shadow: 0 4px 0 #C44545; }

  .vibe-switcher[data-vibe="brutalist"] .vibe-stage { background: #F4F4F4; }
  .vibe-switcher[data-vibe="brutalist"] .vibe-sample {
    background: #FFFFFF; border: 2px solid #000000; border-radius: 0;
    padding: 22px; font-family: 'Inter', sans-serif;
  }
  .vibe-switcher[data-vibe="brutalist"] .vibe-sample__tag {
    font-family: 'JetBrains Mono','Geist Mono',monospace;
    font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase;
    color: #000; font-weight: 700; margin-bottom: 12px;
    background: #FFFF00; display: inline-block; padding: 3px 7px;
  }
  .vibe-switcher[data-vibe="brutalist"] .vibe-sample__title { font-size: 24px; font-weight: 700; color: #000; letter-spacing: -0.01em; margin-bottom: 6px; }
  .vibe-switcher[data-vibe="brutalist"] .vibe-sample__body {
    font-family: 'JetBrains Mono','Geist Mono',monospace;
    font-size: 13px; color: #000; opacity: 0.7; line-height: 1.5; margin-bottom: 18px;
  }
  .vibe-switcher[data-vibe="brutalist"] .vibe-sample__cta { background: #000; color: #FFFF00; border: 0; border-radius: 0; padding: 10px 20px; font-size: 13px; font-weight: 700; cursor: pointer; text-transform: uppercase; letter-spacing: 0.08em; }

  .vibe-switcher[data-vibe="glass-spatial"] .vibe-stage {
    background: linear-gradient(175deg, #EDF0F6 0%, #F1ECF8 35%, #F8F4FB 65%, #FFFFFF 100%);
    position: relative;
  }
  .vibe-switcher[data-vibe="glass-spatial"] .vibe-stage::before,
  .vibe-switcher[data-vibe="glass-spatial"] .vibe-stage::after {
    content: ''; position: absolute; border-radius: 50%; filter: blur(80px); pointer-events: none; z-index: 0;
  }
  .vibe-switcher[data-vibe="glass-spatial"] .vibe-stage::before { background: #5E5CE6; opacity: 0.2; width: 280px; height: 280px; top: -120px; right: -80px; }
  .vibe-switcher[data-vibe="glass-spatial"] .vibe-stage::after { background: #FF80B0; opacity: 0.18; width: 240px; height: 240px; bottom: -100px; left: -60px; }
  .vibe-switcher[data-vibe="glass-spatial"] .vibe-sample {
    background: rgba(255,255,255,0.62);
    backdrop-filter: blur(26px) saturate(180%);
    -webkit-backdrop-filter: blur(26px) saturate(180%);
    border: 1px solid rgba(255,255,255,0.7);
    border-radius: 18px;
    padding: 24px;
    font-family: 'Inter', system-ui, sans-serif;
    box-shadow: 0 1px 0 0 rgba(255,255,255,0.85) inset, 0 8px 32px -8px rgba(60,70,100,0.18);
    position: relative; z-index: 1;
  }
  .vibe-switcher[data-vibe="glass-spatial"] .vibe-sample__tag { font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: #6E6E73; font-weight: 600; margin-bottom: 10px; }
  .vibe-switcher[data-vibe="glass-spatial"] .vibe-sample__title { font-size: 21px; font-weight: 600; color: #1D1D1F; letter-spacing: -0.01em; margin-bottom: 6px; }
  .vibe-switcher[data-vibe="glass-spatial"] .vibe-sample__body { font-size: 14px; color: #6E6E73; line-height: 1.55; margin-bottom: 18px; }
  .vibe-switcher[data-vibe="glass-spatial"] .vibe-sample__cta {
    background: rgba(94,92,230,0.92);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    color: white;
    border: 1px solid rgba(255,255,255,0.3);
    border-radius: 12px;
    padding: 10px 20px; font-size: 14px; font-weight: 500; cursor: pointer;
    box-shadow: 0 6px 18px -4px rgba(94,92,230,0.45), inset 0 1px 0 rgba(255,255,255,0.35);
  }

  @media (max-width: 768px) {
    .vibe-stage { min-height: 220px; padding: 24px 16px; }
    .vibe-sample { max-width: 100%; }
  }
</style>

<script>
  (function () {
    const switcher = document.querySelector('.vibe-switcher');
    if (!switcher) return;

    const pills = switcher.querySelectorAll('[data-set-vibe]');
    const copyBtn = switcher.querySelector('[data-action="copy-active-vibe"]');
    const copyLabel = copyBtn?.querySelector('.vibe-copy__label');

    pills.forEach((pill) => {
      pill.addEventListener('click', () => {
        const vibe = pill.getAttribute('data-set-vibe');
        if (!vibe) return;
        switcher.setAttribute('data-vibe', vibe);
        pills.forEach((p) => {
          const isActive = p === pill;
          p.classList.toggle('is-active', isActive);
          p.setAttribute('aria-selected', String(isActive));
        });
        window.gtag?.('event', 'vibe_previewed', { vibe_id: vibe });
      });
    });

    let promptsCache = null;
    async function loadPrompts() {
      if (promptsCache) return promptsCache;
      const res = await fetch('/vibes-prompts.json');
      if (!res.ok) throw new Error('Failed to load prompts');
      promptsCache = await res.json();
      return promptsCache;
    }

    copyBtn?.addEventListener('click', async () => {
      const activeVibe = switcher.getAttribute('data-vibe');
      if (!activeVibe) return;
      try {
        const prompts = await loadPrompts();
        const text = prompts[activeVibe];
        if (!text) return;
        await navigator.clipboard.writeText(text);

        const original = copyLabel?.textContent ?? 'Copy this vibe’s full prompt';
        if (copyLabel) copyLabel.textContent = 'Copied ✓ paste into Claude';
        copyBtn.classList.add('is-copied');
        window.gtag?.('event', 'vibe_prompt_copied', { vibe_id: activeVibe, source: 'blog_switcher' });

        setTimeout(() => {
          if (copyLabel) copyLabel.textContent = original;
          copyBtn.classList.remove('is-copied');
        }, 1800);
      } catch (err) {
        console.error('Copy failed', err);
      }
    });
  })();
</script>
