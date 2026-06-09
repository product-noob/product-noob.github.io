/**
 * UI Vibes — the 8 aesthetic systems shipped with the site.
 *
 * Each vibe has:
 *  - metadata for display (name, use case, real-world references)
 *  - preview tokens used to render a mini sample card
 *  - a hand-written `<design_system>` block that gets wrapped into a full
 *    copy-pasteable prompt via `buildFullPrompt()`.
 *
 * Used by:
 *  - /vibes page (full reference grid + copy buttons)
 *  - /vibes-prompts.json endpoint (consumed by the blog's vibe-switcher widget)
 */

export interface VibeDef {
  id: string;
  name: string;
  useFor: string;
  references: string[];
  /** One-line summary surfaced on the /vibes card */
  blurb: string;
  /** The vibe-specific design_system XML block */
  designSystem: string;
}

const commonPromptHeader = `# [Your project name here]

## What you're building
[Replace this with 1-2 sentences describing your project.]

## Stack
[Pick one:
- Claude.ai artifact → React + Tailwind (single file), lucide-react for icons, recharts if charts needed
- Claude Code → Next.js 14 (App Router) + TypeScript + Tailwind + shadcn/ui, lucide-react for icons]
`;

const commonPromptFooter = `
<layout>

[Pick the UI shape that matches your project:
- Dashboard → sidebar nav (240px) + main grid (12-col), header with breadcrumbs
- Single-screen tool → centred canvas, max-width 1200px, focused interaction area
- Form/wizard → centred 480-640px column, vertical flow, progress at top, sticky CTA
- List/feed → centred 720-960px column, card or row items, filter bar sticky at top
- Reading/content → centred 640-720px column, generous vertical rhythm
- Landing page → full-width sections (hero, features, CTA, footer), 1200px content max]

</layout>

<responsive_behaviour>

Mobile-first. Build for mobile, then enhance for larger screens.

**Breakpoints to design for:**
- 375px (mobile — primary target, iPhone-class)
- 768px (tablet)
- 1280px (desktop — primary target)

**Touch targets:** All tappable elements minimum 44×44px on mobile.

**Typography on mobile:** Scale heading sizes down by ~30% on mobile (e.g. desktop 48px hero → mobile 32-36px). Body text stays the same.

**No horizontal scroll. Ever.** Test by checking all content fits at 375px width.

**Per UI shape:**
- Dashboard → sidebar collapses to hamburger drawer below 768px; cards stack single-column below 768px, 2-col at tablet, full grid at desktop
- Single-screen tool → canvas takes full width below 768px with 16px padding; controls may need bottom-sheet pattern on mobile
- Form/wizard → full-width inputs below 768px with 16px horizontal padding; sticky CTA at bottom on mobile
- List/feed → full-width items below 768px; filter bar collapses to a filter button opening a drawer on mobile
- Reading/content → 16-20px horizontal padding on mobile, content column scales to viewport; larger line-height holds
- Landing page → single column below 768px, all heroes stack vertically, CTAs become full-width buttons on mobile

</responsive_behaviour>

<interactions>

Every interactive element must have:
- **Hover state** — subtle background or border shift, not just colour (desktop only)
- **Active/pressed state** — slight scale-down (0.97-0.98) or darker background
- **Focus state** — visible focus ring (2px, accent colour, with 2px offset), always
- **Disabled state** — reduced opacity (0.5), no pointer events, no hover
- **Loading state** — skeleton shimmer (not spinners) for content; inline spinner only for button actions
- **Empty state** — every list, feed, or data view has a designed empty state with an icon and one sentence of guidance
- **Error state** — inline, near the input or action that caused it, not a top-of-screen toast

</interactions>

<icons>

- Use lucide-react for all icons
- 16px or 20px sizes only, never larger inline
- Stroke width 2 (default)
- Never mix icon libraries

</icons>

<non_negotiables>

1. **Light mode by default.** Use dark mode only if the design system above specifies "Mode: Dark".
2. **Use the typography spec above.** Do not fall back to system-ui or default Tailwind fonts.
3. **Use the spacing grid above.** No arbitrary pixel values like \`mt-[7px]\` or \`p-[13px]\`.
4. **Motion is purposeful.** Every transition uses the duration and easing above. No bouncy springs unless this vibe spec calls for them.
5. **Icons from lucide-react only.** No emoji in the UI. No mixed icon libraries.
6. **No generic SaaS gradients** (purple-to-pink, blue-to-purple, etc.). If gradients are used, they must be subtle and vibe-appropriate.
7. **Use real, plausible content.** Not "Lorem ipsum", not "John Doe", not "user@example.com". Write content that fits the actual product.
8. **All interactive elements have hover, active, focus, and disabled states defined.**
9. **Mobile-first responsive.** Every layout must work at 375px, 768px, and 1280px. No horizontal scroll. Touch targets minimum 44px.

</non_negotiables>

<anti_patterns>

Do not do these:

- Dark mode when the design system says light (and vice versa)
- Centre-aligning everything
- Using shadow-lg on every card (use shadow sparingly, prefer borders)
- Generic stock photography or AI-generated hero images
- Marketing copy with hedges and superlatives ("revolutionary", "game-changing", "the best")
- Adding decorative emoji to headings or buttons
- Using \`<details>\` or HTML accordions when a real disclosure component is needed
- Tailwind colour names everywhere (\`bg-blue-500\`) — use the design system tokens above
- Building desktop-first then adding \`md:\` overrides — start mobile, enhance up
- Fixed widths in pixels for layout containers — use max-widths with full-width fallback

</anti_patterns>
`;

export const vibes: VibeDef[] = [
  {
    id: 'editorial',
    name: 'Editorial',
    useFor: 'Blogs, portfolios, reading apps, essay-style products',
    references: ['Vox', 'NYT Magazine', 'Pitchfork', 'Robin Sloan'],
    blurb:
      'Magazine-like. Serif headlines, warm white, generous space. Text is the hero.',
    designSystem: `<design_system name="Editorial">

**Mode:** Light

**Colours**
- Background: #FAFAF7 (warm white)
- Surface (cards/panels): #FFFFFF
- Text primary: #1A1A1A (near-black)
- Text secondary: #555555
- Accent: #0B1F3A (deep navy) — used sparingly, primary actions and links only
- Border: #E8E5DC (warm light grey)
- Success: #1F3A2E / Error: #5A1A1A / Warning: #8B6914

**Typography**
- Headings: Fraunces, Source Serif, or Newsreader (serif). 600-700 weight.
- Body: Inter, Söhne, or system-ui sans.
- Scale: 14 caption / 17 body / 22 lead / 32 small head / 48 section / 64-72 hero
- Line-height: 1.6 on body, 1.15 on headings
- Tracking: -0.02em on hero sizes; normal elsewhere

**Spacing**
- Base unit: 8pt scale
- Content max-width: 680px (reading column)
- Card padding: 24-32px
- Section spacing: 96-128px (very generous)

**Radii**
- Cards: 4px (minimal)
- Buttons: 4px
- Inputs: 4px

**Motion**
- Duration: 400-600ms (slow, considered)
- Easing: ease-out
- What gets animated: fade-ins on scroll, page transitions. Nothing bouncy.

</design_system>`,
  },
  {
    id: 'utility',
    name: 'Utility',
    useFor: 'Dashboards, internal tools, dev tools, admin panels',
    references: ['Linear', 'Notion', 'Stripe Dashboard', 'Plausible'],
    blurb:
      'Dense, fast, professional. Linear or Notion. Information-first, zero decoration.',
    designSystem: `<design_system name="Utility">

**Mode:** Light

**Colours**
- Background: #FAFAFA (very light grey)
- Surface (cards/panels): #FFFFFF
- Text primary: #0A0A0A
- Text secondary: #666666
- Accent: #3B82F6 (sharp blue) — primary actions and active states
- Border: #E5E5E5
- Success: #10B981 / Error: #EF4444 / Warning: #F59E0B

**Typography**
- Font: Inter or Geist Sans throughout (no serif).
- Scale: 12 / 14 / 16 / 20 / 24 / 32 (tight)
- Weight: 400 body, 500 emphasis, 600 headings
- Line-height: 1.4-1.5 (tight but readable)

**Spacing**
- Base unit: 4pt scale
- Card padding: 16-24px
- Section spacing: 32-48px
- Dense but breathable

**Radii**
- Cards: 6px
- Buttons: 6px
- Inputs: 4px

**Motion**
- Duration: 150-200ms ease-out
- Only for state changes (open/close, hover/active). Never decorative.

</design_system>`,
  },
  {
    id: 'warm-consumer',
    name: 'Warm Consumer',
    useFor: 'Personal apps, finance, health, wellness, non-technical users',
    references: ['Headspace', 'Apple Health', 'Calm', 'Tinybird marketing'],
    blurb:
      'Soft, friendly, rounded. Cream backgrounds, warm dark text, terracotta or sage accent.',
    designSystem: `<design_system name="Warm Consumer">

**Mode:** Light

**Colours**
- Background: #FFFAF3 (cream / off-white)
- Surface (cards/panels): #FFFFFF
- Text primary: #2D2620 (warm dark brown, never pure black)
- Text secondary: #6B5D54
- Accent: #D97757 (terracotta) — or sage #7C9070, dusty blue #6B8CAE
- Border: #EDE4D8 (warm light)
- Success: #7C9070 / Error: #C0594A / Warning: #E0A553

**Typography**
- Font: DM Sans, Geist Sans, or Inter (rounded-friendly sans).
- Scale: 13 / 16-18 / 20 / 26 / 36 / 48 (slightly larger body for warmth)
- Weight: 400 body, 500 emphasis, 600 headings
- Line-height: 1.6 (comfortable)

**Spacing**
- Base unit: 8pt scale
- Card padding: 20-32px
- Section spacing: 64-80px
- Generous, rounded feel

**Radii**
- Cards: 12-16px
- Buttons: 9999px (pill) for primary CTAs, 12px secondary
- Inputs: 10px

**Motion**
- Duration: 250-350ms ease-out
- Subtle scale-down (0.97) on tap. Soft springs okay.
- Friendly, never stiff.

</design_system>`,
  },
  {
    id: 'sharp-product',
    name: 'Sharp Product',
    useFor: 'SaaS landing pages, B2B products, premium-feeling tools',
    references: ['Stripe', 'Vercel', 'Linear marketing', 'Resend'],
    blurb:
      'Flat, precise, premium B2B. Pure white, one surgical brand colour. NO atmospheric effects.',
    designSystem: `<design_system name="Sharp Product">

**Mode:** Light

**Colours**
- Background: #FFFFFF (pure white) with subtle #FAFAFA section bands
- Surface (cards/panels): #FFFFFF
- Text primary: #0F172A (near-black)
- Text secondary: #475569
- Accent: **One** deliberate brand colour. Use #4F46E5 (indigo) unless the project has a specific brand hex. Do NOT layer in a second accent (no emerald, no teal, no rose) — Sharp Product is single-accent by definition.
- Border: #E2E8F0 (precise grey)
- Status (use semantic role, not as decorative accents): Success #10B981 / Error #DC2626 / Warning #F59E0B / Muted-error for danger zones #8B1F1F on #FBF3F3

**Typography**
- Font: Inter, Geist Sans, or Söhne.
- Scale: 14 body / 16 medium emphasis / 24 small head / 36 section / 48-56 hero
- Weight: 400 body, 500 emphasis, 600-700 headings
- Tracking: -0.02em on large sizes (24+)
- Line-height: 1.5 body, 1.1 hero

**Spacing**
- Base unit: 4pt scale (precise)
- Card padding: 24-32px
- Section spacing: 64-96px

**Radii**
- Cards: 8px
- Buttons: 6px
- Inputs: 6px

**Motion**
- Duration: 200ms ease-out for hovers, 300ms cubic-bezier for transitions
- Subtle, refined, never bouncy

**Critical:** This vibe is FLAT. No background blobs. No glow shadows. No gradients beyond a single subtle section band. The product feels grounded on a precise grid, not floating in space.

</design_system>`,
  },
  {
    id: 'soft-saas',
    name: 'Soft SaaS',
    useFor: 'AI products, dev tools, agent / LLM-powered apps, modern B2B',
    references: ['Lovable', 'Cursor', 'v0.dev', 'Anthropic marketing'],
    blurb:
      'Atmospheric, ethereal. White with blurred colour blobs, indigo/violet accents. Floating-in-space feel.',
    designSystem: `<design_system name="Soft SaaS">

**Mode:** Light

**Colours**
- Background: #FFFFFF — with **atmospheric blobs**: 600px circle of #8B5CF6 at 10% opacity in top-right with blur(120px), second 600px blob #0EA5E9 at 8% opacity in bottom-left. Blobs sit behind all content, pointer-events: none.
- Surface (cards/panels): pure white with 1px borders #E2E8F0
- Text primary: #0F172A (slate)
- Text secondary: #64748B (muted gray)
- Text tertiary / metadata: #94A3B8
- Accent: #6366F1 (indigo) — primary. Optional second #8B5CF6 (violet) for CTA gradients only.
- Border: #E2E8F0

**Typography**
- Font: Geist Sans or Inter throughout.
- Scale: 13 caption / 14 body / 16 emphasis / 20 small head / 32 section / 48-56 hero
- Tracking: -0.02em on hero sizes
- Frequent uppercase badges: text-xs tracking-wider uppercase for section labels and metadata
- Weight: 400 body, 500 emphasis, 600 headings

**Spacing**
- Base unit: 4pt scale (precise, breathable)
- Card padding: 20-28px
- Section spacing: 64-96px

**Radii**
- Cards: 12-16px
- Buttons: 8-10px
- Inputs: 8px
- Badges / chips: 9999px (pill)

**Shadows**
- Resting cards: shadow-sm (very subtle)
- Emphasis cards: soft glow — \`0 2px 10px -3px rgba(99,102,241,0.1)\`
- Never shadow-lg.

**Motion**
- Duration: 200ms ease-in-out
- Hover states use shadow expansion or soft glow (\`0 0 20px rgba(99,102,241,0.15)\`) rather than background colour changes
- Buttons lift 1-2px on hover
- Ultra-smooth, never bouncy

**Critical:** This vibe is ATMOSPHERIC. The blobs are non-negotiable — they're what gives the floating-in-space feel that distinguishes Soft SaaS from Sharp Product.

</design_system>`,
  },
  {
    id: 'playful',
    name: 'Playful',
    useFor: 'Consumer fun apps, learning tools, games, social, side projects',
    references: ['Duolingo', 'Mercury', 'Linear bento sections', 'Arc browser'],
    blurb:
      'Bold, colourful, expressive. Pastel/cream backgrounds, paired bold accents, bouncy motion.',
    designSystem: `<design_system name="Playful">

**Mode:** Light

**Colours**
- Background: cream or pastel — #FFF8E7, #F0EBFF, or #E8F5E9 (avoid pure white)
- Surface (cards/panels): #FFFFFF
- Text primary: #2C2C2E (dark but not black)
- Text secondary: #6B6B70
- Accent: paired bold colours — #FF6B6B + #4ECDC4, or #FFD93D + #6A4C93. Use boldly.
- Border: #EDE0F0 (matches bg family)

**Typography**
- Font: Outfit, DM Sans, or Cabinet Grotesk. Bold weights.
- Scale: 14 body / 18 emphasis / 24 small head / 40 section / 60-96 display
- Weight: 400 body, 600 emphasis, 700-800 headings
- Huge display sizes paired with chunky 16-18px body.

**Spacing**
- Base unit: 8pt scale
- Card padding: 20-32px
- Section spacing: generous and asymmetric, 80-120px

**Radii**
- Cards: 16-24px (large)
- Buttons: 9999px (pill)
- Inputs: 16px

**Motion**
- Duration: 300-500ms
- Bouncy springs okay. Cubic-bezier with overshoot fine.
- Scale-on-tap 0.92 (more pronounced)
- Playful, expressive transitions

</design_system>`,
  },
  {
    id: 'brutalist',
    name: 'Brutalist',
    useFor: 'Dev portfolios, indie tools, raw blogs, GitHub-style interfaces',
    references: ['Vercel blog', 'GitHub Primer', 'Are.na', 'Pirate Wires'],
    blurb:
      'Hard edges, no shadow, no radius, one off-colour accent. Raw and deliberate.',
    designSystem: `<design_system name="Brutalist">

**Mode:** Light

**Colours**
- Background: #FFFFFF (or #F4F4F4 for sections)
- Surface (cards/panels): #FFFFFF with 1-2px BLACK borders (#000000)
- Text primary: #000000 (true black)
- Text secondary: #000000 at 60% opacity, never a separate grey
- Accent: one off-colour — electric blue #0000FF, hot pink #FF00FF, lime #00FF00, or pure yellow #FFFF00
- Border: #000000 (1-2px solid, always black)

**Typography**
- Mono for accents and labels: JetBrains Mono, Geist Mono, or IBM Plex Mono
- Sans for body: Inter or Geist Sans. OR full mono if the project leans that way.
- Scale: 14 body / 18 emphasis / 32 head / 56-72 hero (heavy hierarchy)
- ALL CAPS labels with letter-spacing 0.05em
- Sharp tracking on all sizes, no humanist softening
- Weight: 400 or 700, nothing in between

**Spacing**
- Base unit: 4pt scale
- Card padding: 16-24px
- Section spacing: 48-64px (dense)

**Radii**
- **Cards: 0px**
- **Buttons: 0px**
- **Inputs: 0px**
- Everything has sharp 90-degree corners. No exceptions.

**Shadows**
- None. Ever. Borders do the work.

**Motion**
- Duration: 0-100ms (snap, or instant)
- Easing: linear or none
- Hover: invert colours (black bg → white text) or flip border colour. No animation beyond the colour swap.
- No transitions on transforms.

**Critical:** No rounded corners anywhere. No shadows. No gradients. Aesthetic is deliberately raw.

</design_system>`,
  },
  {
    id: 'glass-spatial',
    name: 'Glass / Spatial',
    useFor: 'Spatial computing, Vision OS-style apps, ambient interfaces, meditative tools',
    references: ['Apple Vision OS', 'iOS Settings', 'Raycast', 'Arc browser'],
    blurb:
      'Frosted-glass surfaces with depth via translucency. Sage or icy accents, ambient and weightless.',
    designSystem: `<design_system name="Glass / Spatial">

**Mode:** Light (Apple Liquid Glass / Vision OS palette)

**Colours**
- Background: ambient gradient with subtle Apple pearl tint — \`linear-gradient(175deg, #EDF0F6 0%, #F1ECF8 35%, #F8F4FB 65%, #FFFFFF 100%)\`. Cool, neutral, never green-tinged.
- Atmospheric orbs (behind content, \`pointer-events: none\`): one #5E5CE6 (Apple indigo) blob at 18% opacity top-right, one #0A84FF (Apple blue) blob at 14% opacity bottom-left, one optional #FF80B0 (Apple pink) at 16% for pearl shimmer. All with \`filter: blur(110-130px)\`.
- Surface (cards/panels): translucent glass — \`rgba(255, 255, 255, 0.62)\` with \`backdrop-filter: blur(26px) saturate(180%)\`, 1px border \`rgba(255, 255, 255, 0.7)\`, and a top-edge inset highlight \`inset 0 1px 0 rgba(255,255,255,0.85)\`.
- Text primary: **#1D1D1F** (Apple system label)
- Text secondary: **#6E6E73** (Apple secondary label)
- Text tertiary / metadata: **#8E8E93** (Apple tertiary label)
- Accent: **Apple indigo #5E5CE6 as primary; Apple blue #0A84FF for secondary highlight.** Optional accent for celebratory or "pearl" moments: Apple pink #FF80B0 or Apple violet #BF5AF2. Avoid sage/teal/green tints in the chrome — those are semantic-only (success).
- Toggle "on" colour: **#30D158** (Apple system green — iOS toggle standard).
- Status (semantic only): Success #30D158 / Error #FF453A / Warning #FF9F0A

**Typography**
- Font: Inter, Geist Sans, or SF Pro (system fallback acceptable here).
- Scale: 13 caption / 15 body / 17 emphasis / 22 small head / 32 section / 48 hero
- Weight: 400 body, 500 emphasis, 600 headings
- Line-height: 1.55 body
- Tracking: -0.01em on large sizes

**Spacing**
- Base unit: 8pt scale (generous, breathable)
- Card padding: 24-32px
- Section spacing: 64-96px

**Radii**
- Cards: 16-20px (slightly organic)
- Buttons: 12px
- Inputs: 12px
- Chips / badges: 9999px (pill)

**Shadows**
- Outer: \`0 8px 32px rgba(120, 150, 160, 0.12)\` (depth glow)
- Inner highlight: 1px top edge \`rgba(255,255,255,0.6)\` for inset light feel

**Motion**
- Duration: 350-500ms ease-in-out
- Gentle springs okay
- Depth-layered transitions: cards translate-z slightly on hover (or scale 1.01 + shadow expansion)
- Ambient, never snappy

**Critical:** This vibe relies on backdrop-filter blur. Test that it renders correctly. If it doesn't (older browsers, contrast issues), the vibe falls apart.

</design_system>`,
  },
];

/** Build the full copy-pasteable prompt for a given vibe. */
export function buildFullPrompt(vibe: VibeDef): string {
  return [commonPromptHeader, '', vibe.designSystem, commonPromptFooter].join('\n');
}

/** Lookup by id for convenience. */
export function getVibe(id: string): VibeDef | undefined {
  return vibes.find((v) => v.id === id);
}
