/**
 * UI Vibes data and prompt builders.
 *
 * Used by /vibes, /vibes-prompts.json, and the blog's interactive preview.
 */
import type {
  ScreenTypeDef,
  VibeDef,
  VibePromptOptions,
  VibeStackOption,
} from '../types';

export type {
  ScreenTypeDef,
  VibeDef,
  VibePromptOptions,
  VibeStackOption,
} from '../types';

export const screenTypes: ScreenTypeDef[] = [
  {
    id: 'dashboard',
    name: 'Dashboard',
    description: 'Overview-first, with navigation, metrics, filters, and multiple data regions.',
    useFor: 'Analytics, admin panels, internal tools',
    prompt:
      'Use an overview-first dashboard layout. Include clear navigation, a compact page header, a responsive metric grid, and scannable data regions. Collapse navigation below 768px and stack cards without losing priority.',
  },
  {
    id: 'single-screen',
    name: 'Single-screen tool',
    description: 'One focused canvas built around a single action or interaction.',
    useFor: 'Calculators, chat tools, converters, editors',
    prompt:
      'Use one focused screen with a clear primary task. Keep the main interaction above the fold, minimise navigation, and place supporting controls close to the work area. On mobile, use the full width with reachable controls.',
  },
  {
    id: 'form-wizard',
    name: 'Form / wizard',
    description: 'A guided vertical flow with progressive disclosure and clear completion.',
    useFor: 'Onboarding, checkout, setup, applications',
    prompt:
      'Use a guided form or wizard layout with one clear step at a time, visible progress, concise validation, and a persistent primary action. Keep the form column narrow on desktop and full-width on mobile.',
  },
  {
    id: 'list-feed',
    name: 'List / feed',
    description: 'Repeatable rows or cards with search, filtering, sorting, and states.',
    useFor: 'Inboxes, search results, catalogues, feeds',
    prompt:
      'Use a list or feed layout with strong row hierarchy, a compact filter and search region, and designed empty, loading, and error states. Keep repeated items easy to scan and controls usable on mobile.',
  },
  {
    id: 'reading',
    name: 'Reading page',
    description: 'A calm content column where typography and rhythm carry the experience.',
    useFor: 'Blogs, documentation, reports, essays',
    prompt:
      'Use a reading-first layout with a 640-720px content column, excellent typography, generous vertical rhythm, and restrained supporting navigation. Preserve comfortable line length and padding on mobile.',
  },
  {
    id: 'landing',
    name: 'Landing page',
    description: 'A persuasive sequence from promise to proof to action.',
    useFor: 'Products, launches, portfolios, campaigns',
    prompt:
      'Use a landing-page flow: focused hero, proof or trust signal, benefits, product demonstration, and one clear final CTA. Avoid repetitive card grids and keep each section advancing the argument.',
  },
];

export const stackOptions: VibeStackOption[] = [
  {
    id: 'existing',
    name: 'Use my existing stack',
    prompt: 'Work inside the existing project stack and follow its established component and styling patterns.',
  },
  {
    id: 'react-tailwind',
    name: 'React + Tailwind',
    prompt: 'React + TypeScript + Tailwind CSS. Use lucide-react for icons.',
  },
  {
    id: 'next-shadcn',
    name: 'Next.js + shadcn/ui',
    prompt:
      'Next.js App Router + TypeScript + Tailwind CSS + shadcn/ui. Use lucide-react for icons.',
  },
  {
    id: 'astro',
    name: 'Astro',
    prompt:
      'Astro with scoped component styles and minimal client-side JavaScript. Use static rendering unless interaction requires otherwise.',
  },
  {
    id: 'html-css',
    name: 'HTML + CSS + JS',
    prompt: 'Semantic HTML, modern CSS, and minimal vanilla JavaScript. Do not use a framework.',
  },
];

const compactQualityBar = `<quality_bar>
- Build mobile-first for 375px, 768px, and 1280px. No horizontal scroll; touch targets are at least 44px.
- Use real product-specific content. No lorem ipsum, decorative emoji, or generic marketing copy.
- Define hover, active, focus, disabled, loading, empty, and error states where relevant.
- Use one icon library only. Prefer lucide. Keep motion and visual effects consistent with the chosen direction.
- Do not invent extra features, dark mode, gradients, or dashboard cards unless the brief requires them.
</quality_bar>`;

const extendedQualityBar = `<implementation_rules>
- Preserve semantic HTML, keyboard access, visible focus, labels, and sufficient contrast.
- Use a consistent spacing scale and named design tokens instead of arbitrary one-off values.
- Prefer borders and hierarchy over heavy shadows. Do not centre-align every section.
- Keep responsive behaviour intentional: collapse layouts, preserve the primary action, and avoid clipped controls.
- Use skeletons for content loading and inline progress only for action buttons.
- Place errors beside the action or field that caused them. Give empty states one useful next step.
- Use plausible names, values, and labels that fit the actual product.
</implementation_rules>`;

export const vibes: VibeDef[] = [
  {
    id: 'editorial',
    name: 'Editorial',
    useFor: 'Blogs, portfolios, reading apps, essay-style products',
    references: ['Vox', 'NYT Magazine', 'Pitchfork', 'Robin Sloan'],
    categories: ['Content'],
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
    categories: ['Internal tools', 'B2B'],
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
    categories: ['Consumer'],
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
    categories: ['B2B'],
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
    categories: ['B2B', 'Experimental'],
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
    categories: ['Consumer', 'Experimental'],
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
    categories: ['Content', 'Experimental'],
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
    categories: ['Consumer', 'Experimental'],
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

function resolvePromptOptions(options: VibePromptOptions) {
  const screenType = options.screenTypeId
    ? screenTypes.find((item) => item.id === options.screenTypeId)
    : undefined;
  const stack =
    stackOptions.find((item) => item.id === options.stackId) ?? stackOptions[0];

  return {
    projectName: options.projectName?.trim() || '[Project name]',
    description:
      options.description?.trim() ||
      '[Describe what you are building, who it is for, and the primary action in 1-2 sentences.]',
    screenType,
    stack,
  };
}

function buildPromptHeader(options: VibePromptOptions): string {
  const resolved = resolvePromptOptions(options);
  const screenSection = resolved.screenType
    ? `<screen_type name="${resolved.screenType.name}">
${resolved.screenType.prompt}
</screen_type>`
    : `<screen_type>
[Describe the screen shape: dashboard, single-screen tool, form/wizard, list/feed, reading page, or landing page.]
</screen_type>`;

  return `# ${resolved.projectName}

<product_brief>
${resolved.description}
</product_brief>

<implementation>
${resolved.stack.prompt}
Build a polished, working interface rather than a static mockup.
</implementation>

${screenSection}`;
}

/** The visual direction only, useful inside an existing project prompt. */
export function buildVibePrompt(vibe: VibeDef): string {
  return vibe.designSystem;
}

/** A shorter default prompt designed to preserve context and tokens. */
export function buildCompactPrompt(
  vibe: VibeDef,
  options: VibePromptOptions = {}
): string {
  return [
    buildPromptHeader(options),
    vibe.designSystem,
    compactQualityBar,
  ].join('\n\n');
}

/** A fuller prompt with implementation and accessibility guardrails. */
export function buildFullPrompt(
  vibe: VibeDef,
  options: VibePromptOptions = {}
): string {
  return [
    buildPromptHeader(options),
    vibe.designSystem,
    compactQualityBar,
    extendedQualityBar,
  ].join('\n\n');
}

export function getVibe(id: string): VibeDef | undefined {
  return vibes.find((v) => v.id === id);
}

export function getScreenType(id: string): ScreenTypeDef | undefined {
  return screenTypes.find((screenType) => screenType.id === id);
}
