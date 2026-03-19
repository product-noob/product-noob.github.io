# Landing Page Visual Review

**Reviewed:** 2026-03-19
**Reviewer:** Claude Code
**Method:** Live screenshots (desktop 1440px, mobile 390px) of local dev build

---

## Summary

The site has a solid foundation — clear personal brand, distinctive typography (Fraunces serif headlines + DM Sans body), and a well-structured section flow. The orange/pink accent system is cohesive. The main opportunities are in social proof density, whitespace discipline, and a few components that don't land visually as well as the code suggests they should.

---

## Hero Section

**What works:** Bold headline with gradient accent on "AI Products." is eye-catching. Clean 2-column layout. CTA buttons are clear.

### Issue 1 — "Currently at / previously at" logo row is too small and unclear (HIGH)
The company logos render tiny — Flipkart/Paytm/Oracle are nearly unrecognizable at the size they appear. This is prime social proof and it's buried in a cramped, low-contrast strip.

**Suggestion:** Use larger logo chips (40–48px tall) with explicit company names alongside each logo, or replace with a simple text line like **"GPM @ Flipkart · Previously Paytm, Oracle"** in a slightly larger, bolder weight.

---

### Issue 2 — Side project bubbles are invisible (HIGH)
The floating project cards (PM Vault, Whisprflow, etc.) described in the code are barely visible in the hero's right column. This clever UI element isn't landing — it reads as empty space next to the photo.

**Suggestion:** Either make the floating project cards larger and more visually distinct (real app icon + name label, not just icon), or replace with a clean 2×2 app grid if the overlapping card layout isn't rendering clearly.

---

### Issue 3 — Mobile hero photo is cut off (HIGH)
On the 390px mobile viewport, the profile photo appears as a sliver at the very bottom of the screen — looks unintentional rather than a deliberate reveal.

**Suggestion:** On mobile, either show the photo as a properly-sized square/circle above or below the headline text, or hide it entirely. The current half-visible state signals a layout bug.

---

### Issue 4 — No social proof numbers in the hero (MEDIUM)
"I build cool AI Products" is a confident statement but it's vague. Impressive metrics exist in the Selected Work section (3M+ MAU, ₹100Cr+ saved annually) but are buried below the fold.

**Suggestion:** Add 2–3 key numbers to the hero subtext or as a small stat row below the CTAs. Example: `3M+ MAU · ₹100Cr+ saved · 7+ years building product`

---

## Selected Work

**What works:** Vertical timeline with color-coded role icons is distinctive. Date badges add nice context.

### Issue 5 — Excessive vertical whitespace between entries (MEDIUM)
Each work entry has enormous padding. Items feel lost on the page and the user must scroll a long distance between entries.

**Suggestion:** Reduce the vertical gap between timeline entries by ~30–40%. The content is good — let it breathe a little less so the timeline reads as a connected narrative rather than isolated islands.

---

### Issue 6 — Two-column split creates confusing hierarchy (LOW)
The role title ("Group Product Manager") is on the LEFT, but the product/company name ("SLAP (Flipkart)") is on the RIGHT in a larger, heavier heading. This makes the product name more visually dominant than the role — which may be intentional, but it creates a disconnect between the two columns.

**Suggestion:** Either unify into one column per entry (role + company + description together), or make the visual relationship between the left and right columns clearer with a horizontal connector or shared background.

---

## Digital Garden — Quote

### Issue 7 — "AI will not replace you..." quote is visually stranded (LOW)
The typographic quote is a strong moment, but it floats in a large empty zone between the Selected Work section and the Projects grid with no visual anchoring.

**Suggestion:** Add a subtle background treatment (a faint gradient or the `--glass-bg` token), tighten the vertical padding around it, or add a small context label ("What I believe →") above the quote to frame it.

---

## Personal Projects Grid

**What works:** Clean white cards on light gray background. Tech tags work well as quick scannable context.

### Issue 8 — All cards look identical regardless of project maturity (MEDIUM)
PM Vault (flagship project) looks the same as "LocalLedger (WIP)". The WIP status is text-only in the title and easy to miss. There's no visual differentiation for project importance or completeness.

**Suggestion:** Apply a subtle `opacity: 0.7` + "In Progress" overlay badge to WIP cards. For flagship projects, consider a slightly larger card (spanning both columns) or a featured ribbon.

---

### Issue 9 — Project icons are generic and inconsistent (LOW)
At card size, the emoji/small image icons add visual noise more than character. Styles vary across cards.

**Suggestion:** Use a consistent icon treatment — either all monochrome SVG icons on a colored circle background (matching the role icons in the timeline), or drop the icons and lean into the project name typography instead.

---

## Vibe Coding / AI Stack

### Issue 10 — Dark terminal block is visually jarring (MEDIUM)
A near-black `gray-900` block appears suddenly in the middle of the light gray Digital Garden section, then the page returns to light. It reads like an embedded code snippet rather than intentional design.

**Suggestion:** Either (a) give it a full section with a proper header and more breathing room so the context switch feels deliberate, or (b) style it as a rounded card within the light background rather than a full-bleed dark band. If it stays full-bleed, add a clear section heading like "How I Build" above it with the same treatment as other section titles.

---

## Speaking Events Carousel

### Issue 11 — Carousel is hard to browse and quantity is unclear (MEDIUM)
The auto-scroll carousel cuts event cards at the edges behind scroll masks, making it hard to know how many events there are or that the section is interactive.

**Suggestion:** Add a visible event counter ("Showing 5 of 9 events"), pause auto-scroll on first user hover interaction, and ensure the first card is always fully visible without the fade mask obscuring it. Consider adding prev/next arrow buttons for accessibility.

---

## People Who Inspire Me

### Issue 12 — Emoji avatars look unpolished (MEDIUM)
The circular avatar bubbles use emoji/placeholder images. For a senior product leader's portfolio, this reads as an unfinished component.

**Suggestion:** Use real profile photos of the people listed (small, circular, consistent size) or a consistent illustrated avatar style. A monochrome portrait silhouette with a colored background would be far more polished than emoji.

---

### Issue 13 — Section styling is inconsistent with the rest of the page (LOW)
"People Who Inspire Me" uses plain heading styling — no emoji prefix, no orange underline accent, no descriptive subheading — while every other section has all three.

**Suggestion:** Apply the same `.section__title` treatment with an orange underline accent and add a one-line subtitle (e.g., "Thinkers and builders who shaped how I think about product.").

---

## Footer

### Issue 14 — Footer is too sparse (HIGH)
Four social icons and a copyright line. Users who scroll to the bottom with intent (contact, blog, work samples) have zero navigation options without scrolling back to the top.

**Suggestion:** Add a minimal footer nav row: `Blog · Work · Links · Lab · About` and your email address (`princemnit@gmail.com`). Optionally a one-liner tagline. This is especially important for users arriving via direct links to blog posts.

---

## Global / Cross-Section Issues

### Issue 15 — Section background rhythm feels arbitrary (LOW)
The page cycles through: cream hero → cream work → white/gray digital garden → dark carousel → white inspirations → cream footer. There's no clear logic to the alternation.

**Suggestion:** Use a purposeful 2-background system (e.g., `--gray-50` warm cream vs. `--gray-100` light gray) that alternates predictably. Reserve the dark background only for the stack/coding section as a deliberate accent. This creates a visual rhythm users can anticipate.

---

### Issue 16 — No active nav state visible on homepage (LOW)
From the screenshots, none of the navigation links appear visually active when on the homepage.

**Suggestion:** Add a visible active state to "Home" in the nav (or the logo/wordmark) so users always know where they are. Even a subtle dot or underline on the active item helps.

---

## Priority Summary

| # | Issue | Priority |
|---|-------|----------|
| 1 | Hero logo row too small/illegible | **HIGH** |
| 2 | Side project bubbles invisible in hero | **HIGH** |
| 3 | Mobile hero photo cut off | **HIGH** |
| 14 | Footer missing navigation | **HIGH** |
| 4 | No social proof numbers in hero | MEDIUM |
| 5 | Excessive timeline whitespace | MEDIUM |
| 8 | Project cards all look identical | MEDIUM |
| 10 | Dark stack block visually jarring | MEDIUM |
| 11 | Carousel hard to browse | MEDIUM |
| 12 | Emoji avatars unpolished | MEDIUM |
| 6 | Two-column timeline hierarchy | LOW |
| 7 | Quote visually stranded | LOW |
| 9 | Inconsistent project icons | LOW |
| 13 | Inspirations section styling inconsistent | LOW |
| 15 | Section background rhythm arbitrary | LOW |
| 16 | No active nav state | LOW |
