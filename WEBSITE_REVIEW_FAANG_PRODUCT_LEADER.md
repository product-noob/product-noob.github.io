# Website Review Update — FAANG Product Leader Positioning

Date: 2026-05-24

This is an updated version based on your comments.

## Part 1) Tech Implementation (updated scope)

Per your guidance, I focused only on the two implementation items below and skipped the rest of Part 1 for now.

### 1) Hero image rotation (keep rotation, add pause + reduced motion)
What we changed:
- Kept the image rotation behavior.
- Added pause on hover and focus.
- Added support for `prefers-reduced-motion` (rotation won’t auto-run for those users).

Why this is the right balance:
- Preserves your dynamic visual personality.
- Improves accessibility and readability for users sensitive to motion.
- Avoids unnecessary complexity for a personal site.

### 2) Standardize external links
What we changed:
- Added a tiny reusable `ExternalLink` Astro component that enforces:
  - `target="_blank"`
  - `rel="noopener noreferrer"`
- Started using it in the homepage hero side-project links.

Why this is a good choice (for a personal portfolio):
- Lightweight and maintainable.
- Prevents inconsistent link behavior over time.
- No need for heavy lint/config overhead right now.

### Minimal, good technical upgrades worth doing next (optional)
Keeping this practical for a personal portfolio site, I’d do only these:
1. Add a **broken-link check** script in CI/pre-deploy.
2. Add a **single Lighthouse run** for homepage (performance/accessibility sanity check).
3. Add one tiny analytics funnel:
   - Resume CTA click
   - Contact click
   - Work page click from hero

That’s enough discipline without overengineering.

---

## Part 2) Content & UX (updated as requested)

## A) Leadership signal: explicit suggestions (with your note on direct reports)
You mentioned direct reports start in your GPM role — that’s perfectly fine. We should show leadership depth in **two phases**.

### Pre-GPM roles (no direct reports): show leadership without authority
Use language like:
- "Led through influence across PM, Eng, Design, Data Science, and Business stakeholders."
- "Owned product direction, prioritization tradeoffs, and execution cadence across X teams."
- "Created mechanisms: experimentation reviews, model quality checks, post-launch metric governance."
- "Drove alignment with senior leaders on strategy and ROI decisions."

This communicates seniority even without line-management.

### GPM role: add line-management + org leadership proof
Add a compact block for current role:
- Team owned: number of PMs and cross-functional pod structure.
- Operating cadence: weekly business/product review mechanism.
- Talent: hiring, mentoring, promotions, succession.
- Org influence: cross-org dependencies resolved; strategic decisions led.

### Recommended “Leadership Proof” format per major role
For each top role (SLAP / Flippi / Growth Hack), add:
1. **Scope** — team/org surface area.
2. **Decision quality** — one hard tradeoff and why.
3. **Mechanism** — how you made results repeatable.
4. **Outcome** — business and customer metrics.

This is exactly what hiring panels look for.

## B) Hero line
Your suggested direction is strong. Recommended primary variant:

**"I lead AI-native products from 0→1 to scale."**

Alternative variants:
- "I build and lead AI-native products from idea to impact at scale."
- "Product leader building AI-native products from zero to one, then to scale."

I agree with you: removing "commerce" makes positioning broader for FAANG opportunities.

## C) Voice consistency — what to change
Goal voice: **confident, specific, low-hype, high-credibility**.

### What to reduce
- Hype terms like "bold", "cool", "massive" unless followed by concrete proof.
- Long sentences with stacked clauses.
- Casual phrasing that sounds indie-creator when aiming for senior leadership roles.

### What to increase
- Clear verbs: "led", "scaled", "aligned", "launched", "improved", "institutionalized".
- Evidence-first claims: metric in the same sentence.
- Structured snippets (Scope → Action → Result).

### Quick copy example
Current style: "I build cool AI products."
Refined style: "I lead AI-native products from 0→1 to measurable business impact at scale."

---

## Landing page trim: Homelab is too heavy
I agree. Since you already have a dedicated `/homelab` page, the landing page should only tease it.

### What to keep on homepage
- One compact card: "I run a personal AI/home infrastructure lab."
- 2–3 logos max (e.g., Docker, n8n, Immich).
- One CTA: **"Explore my homelab"** → `/homelab`.

### What to remove from homepage
- Detailed service lists, port references, infra specifics.
- Too many cards/icons that compete with your product-leadership story.

### Why
Homepage should optimize for recruiter/hiring-manager signal:
- leadership,
- impact,
- strategic product outcomes.
Homelab detail is valuable, but as supporting depth — not the main first-screen narrative.

---

## Quote recommendation
Your quote:
> "AI will not replace you, a person using AI will."

Verdict: recognizable but overused and slightly generic for a senior PM brand.

### Better options for your positioning
1. **"AI doesn’t replace product judgment; it raises the bar for it."**
2. **"In the AI era, speed matters—but judgment is still the moat."**
3. **"The future belongs to teams that pair AI leverage with customer obsession."**
4. **"AI-native products win when experimentation speed meets product taste."**

My top pick for you:
**"AI doesn’t replace product judgment; it raises the bar for it."**

It sounds like a product leader (strategic + grounded), not a social-media slogan.

---

## Bottom line (updated)
You already have strong proof of impact. The next unlock is **signal clarity**:
- keep the dynamic personality,
- tighten leadership storytelling,
- reduce homepage noise,
- and use precise, executive-level language.

That combination will make you read much more like a FAANG-caliber product leader.
