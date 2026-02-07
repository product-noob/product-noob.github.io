# Cursor Rules Documentation

## 1. Primary Objective

Your goal is to:
- Produce **correct, maintainable, and build-safe code**
- Preserve **architectural integrity**
- Avoid reintroducing **known anti-patterns**
- Ask before guessing

You are not optimizing for speed. You are optimizing for correctness.

---

## 2. Global Constraints (Non-Negotiable)

- Do not hardcode visual values if tokens exist
- Do not duplicate data across files
- Do not add logic to page files
- Do not introduce inline JavaScript beyond trivial bootstrapping
- Do not weaken TypeScript strictness
- Do not bypass the build system
- Do not invent structure when patterns already exist

If unsure, stop and ask.

---

## 3. Architecture Rules

- Page files are **thin orchestrators only**
- Business logic belongs in components or scripts
- Components must be cohesive and focused
- Files exceeding ~500 lines must be decomposed
- New pages must follow existing directory patterns

---

## 4. Styling Rules

- All colors, spacing, shadows, and radii come from `tokens.css`
- If a needed value does not exist, add a token first
- BEM naming is mandatory for all CSS classes
- No cross-component styling assumptions
- Responsive changes must be isolated to media queries

---

## 5. Data Rules

- All shared data lives in `src/data/`
- Data modules must be typed
- Pages import data, never redefine it
- `any` is forbidden

---

## 6. Client-Side JavaScript Rules

- No CDN-loaded JavaScript
- No inline scripts beyond minimal initialization
- All logic lives in `src/scripts/`
- Scripts must be TypeScript and reusable
- Prefer tree-shaken imports

---

## 7. Blog Content Rules

Frontmatter requirements are strict.

Required:
- title
- description
- pubDate
- tags

Forbidden:
- layout
- date
- categories
- legacy fields

If validation fails, fix the content before proceeding.

---

## 8. Git and Documentation Rules

- Every change must have a reason
- Commit messages explain intent
- Public APIs require JSDoc
- Token additions require inline explanation
- Breaking changes must be explicit

---

## 9. Deprecated Patterns

If a pattern is listed as deprecated:
- Do not use it
- Do not reintroduce it
- Replace it with the documented alternative

Deprecated means banned.

---

## 10. Decision-Making Protocol

Follow this sequence for every task:

```
READ
- Scan relevant files
- Identify existing patterns
- Check tokens and data layers

PLAN
- Define minimal compliant change
- Identify risks
- Ask clarifying questions if ambiguous

ACT
- Implement using existing patterns
- Keep changes atomic

VERIFY
- Run npm run build
- Confirm zero errors and warnings
- Re-check for hardcoded values or duplication
```

Skipping steps is a failure.

---

## 11. When to Ask Before Acting

Ask explicitly before:
- Creating new directories or file categories
- Modifying tokens, layouts, or configuration
- Making changes with multiple valid interpretations
- Touching code that looks unconventional but intentional

---

## 12. Priority Order

When rules conflict, follow this order:
1. Build correctness
2. Architectural integrity
3. This document
4. `.cursorrules`
5. Existing code patterns
6. User instruction

---

## 13. Final Instruction

If you are uncertain:
- Stop
- Ask a precise question
- Do not guess

Correctness is the only acceptable outcome.

---

*This document is designed for machine adherence, not narrative explanation.*
