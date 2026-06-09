# CLAUDE.md - Global Rules

This file applies to all my projects. Project-level `CLAUDE.md` files extend or override anything here.

---

## How to Work With Me

### Default Behaviour

- **Explain your plan before acting - unless it's trivial.** For anything that touches multiple files, changes architecture, or involves a design decision: give me 2-3 lines on what you'll do, what files you'll touch, and any tradeoffs. Then wait for confirmation. For trivial tasks (bug fixes, UI tweaks, typos, copy changes, single-line fixes) - just do it. Don't turn a one-shot fix into a multi-turn conversation.
- **Match the scope of your work to what was asked.** If I asked for a bug fix, fix the bug. Don't bundle in a refactor, a rename, or a "while I'm here" cleanup. If you spot something worth doing, mention it at the end - don't do it.
- **When in doubt, ask. Never assume.** If a requirement is ambiguous, a design choice has multiple valid paths, or you're unsure what I want - stop and clarify. The only exception is truly obvious decisions (naming a variable, choosing between two equivalent imports).
- **Reuse before creating.** Before writing a new component, utility, or helper, check if one already exists. If something similar exists, extend it. Do not create duplicates.
- **For large tasks, work incrementally.** Don't read every file upfront or write all the code before verifying anything. Implement one logical unit, build/run to confirm it works, then move to the next. Each step should leave the project in a runnable state. Front-loading all reading wastes context; front-loading all writing wastes effort when early assumptions are wrong.
- **Verify every fix after writing it.** After editing code, re-read the changed lines in context and mentally trace execution to confirm your fix actually does what you intended. Don't mark a change as done until you've verified it. A fix that looks right in isolation can be wrong because of surrounding scope, closure, or control flow.
- **Test what you write - proportionally:**
  - **Always test:** Anything touching data, database queries, API endpoints, parsers, or business logic. Run the code, check the output.
  - **Quick check:** UI changes that affect layout or interactivity. Verify the dev server runs and the page renders.
  - **Trust the code:** Trivial fixes (typos, copy, single-line CSS, import reordering). Don't burn tokens confirming a padding change works.
- **When you don't understand something, read the code - don't guess from names.** Variable and function names lie. If behavior is surprising, open the file and trace it. Do not pattern-match from what the name suggests.
- **When project infrastructure changes, update `CLAUDE.md` in the same pass.** If you add dependencies, change the build process, or alter architecture, update the project `CLAUDE.md` before moving on. Stale docs cause stale builds.

### Communication Style

- Be direct. No filler, no preamble. No "Great question!" or "Sure, I'd be happy to help!"
- When something is broken, say what's broken and why. Don't soften it.
- If I'm making a bad decision, tell me. Explain why and suggest the better path.
- Keep explanations concrete. Use code snippets, file paths, and specific examples - not abstract descriptions.
- End-of-turn: one or two sentences. What changed and what's next. Don't recap the diff - I can read it.

### Safety

- **Don't run destructive actions without asking.** `rm -rf`, `git reset --hard`, force-push, dropping tables, deleting branches, killing processes - confirm first.
- **Never skip hooks or bypass safety checks** (`--no-verify`, `--no-gpg-sign`) unless I explicitly ask.
- **Never modify `.env`, `.gitignore`, or config files** without telling me first.
- **Don't hand-edit auto-generated files** (lock files, build outputs, generated types). Use the appropriate CLI tool.
- **Trust internal code; only validate at boundaries.** Don't add defensive `try/except` or null checks for situations that can't happen inside our own code. Validate at the edges (user input, external APIs).

---

## Tech Stack & Defaults

Defaults for new projects. Project-level `CLAUDE.md` overrides these.

### Backend (Python)

- Python 3.11+
- **FastAPI** for APIs. Always use async endpoints. Bind to `127.0.0.1`, not `0.0.0.0`.
- **SQLite** for all databases. No Postgres, no ORMs. Use raw SQL via `sqlite3` or `aiosqlite`. Set `sqlite3.Row` as the row factory. Map rows to Pydantic models via `Model.model_validate(dict(row))` - never write manual tuple-index mapping.
- **Pydantic** for request/response validation.
- Virtual environments via `python -m venv venv`. Never use conda or poetry.
- Prefer standard library over third-party packages when the effort difference is small.

### Frontend (TypeScript)

- **Next.js** (App Router) with **strict TypeScript**. No `any` unless absolutely unavoidable, and commented with why.
- **Tailwind CSS** for styling. In existing projects, use whatever CSS approach the project already uses.
- **npm** as the package manager. Not yarn, pnpm, or bun.
- Use `"use client"` only when necessary (state, effects, event handlers). Default to server components.
- Prefer named exports over default exports.

### General

- **Indie hacker style, not enterprise (for side projects).** My side projects are single-user tools, not multi-service systems. Keep code readable, flat, and functional. No Clean Architecture, Hexagonal Architecture, repository patterns, service layers, dependency injection, or abstract factory patterns unless I explicitly ask. A flat module with functions is almost always the right call. If it's unclear whether something is a side project or a work project, ask.
- No Docker or containerisation unless I explicitly ask.
- No CI/CD pipelines. I deploy manually or via simple scripts.
- `.env` for secrets. Always `.gitignore` it. Always provide `.env.example`.
- Commit messages: short and descriptive, no format enforced. Just get it done.

---

## Code Style

### Python

- Type hints on all function signatures.
- `snake_case` for functions/variables, `PascalCase` for classes.
- Keep files focused - one module, one responsibility. But don't over-split; a 200-line file of related functions is fine.
- Use `logging`, not `print()`, for anything that isn't a quick debug.
- Async by default for I/O.
- Catch specific exceptions. Never bare `except:`.

### TypeScript / React

- Functional components only. No class components.
- `interface` over `type` for object shapes, unless you need unions.
- Colocate related code - a component's types, hooks, and helpers live in the same file unless reused elsewhere.
- If you're writing similar JSX twice, extract a shared component.
- `const` arrow functions: `const Button = () => { ... }`
- Destructure props in the function signature.

### Both Languages

- **No commented-out code.** Delete it. That's what git is for.
- **No over-commenting.** Comments explain *why*, not *what*. If code needs a comment to explain what it does, the code is too clever. Never reference the current task, ticket, or caller in a comment - that belongs in the PR description.
- **Keep functions small.** If a function is over 40 lines, it probably does too much.
- **Naming: descriptive but not verbose.** `getUserTransactions` is good. `fetchAndReturnAllUserTransactionRecordsFromDatabase` is not.
- **No TODO/FIXME** without flagging it to me explicitly.

---

## UI & Design

- **UI consistency is non-negotiable.** Before writing or modifying any view, identify the most polished existing view in the project and match its design language - colors, typography, spacing, card patterns, button styles. Do not invent a new visual vocabulary for a new surface. Adapt the existing one.
- **Match UI density to the surface's purpose.** A quick-glance surface (popover, widget, menu bar dropdown) should be scannable - stats, status, navigation only. A full window can afford CTAs, forms, and detailed content. Don't put full-window UX into a popover.
- **Design tokens live in one file.** No hardcoded colors, spacing, or font sizes scattered across views.
- **Reuse visual patterns as helpers** (`metricCard()`, `sectionHeader()`) - don't copy-paste card styling across views.
- **When adapting a design system to a smaller surface, scale down proportionally** (smaller font sizes, tighter padding) but keep the same vocabulary - same colors, same radii, same section headers.
- **Prefer platform-native patterns.** A macOS popover should feel like a macOS popover. A web dashboard should use standard responsive patterns.

---

## Project Structure

- Follow the structure already established. Don't reorganise without asking.
- For new full-stack projects, see the `fullstack-scaffold` skill for the default layout.
- API routes: one file per resource. Database queries separate from route handlers.
- Reusable React components in `components/`. Page-specific components stay in the page file until they're reused.

---

## Testing

Not every change needs a test. Write tests for:

- Data parsing logic (parsers, transformers)
- API endpoints touching money or sensitive data
- Complex business logic with edge cases

**pytest** for Python. **vitest** for TypeScript. Test files live next to the code: `parser.py` -> `test_parser.py`.

---

## Tool Usage

- Prefer dedicated tools over Bash: `Read` for files, `Edit`/`Write` for changes. Reserve Bash for shell operations.
- Don't use `cat`, `head`, `tail`, `sed`, `awk`, or `echo` to read or modify files - use `Read`/`Edit`/`Write`.
- Run independent commands in parallel. Chain sequential commands with `&&`.
- For broad codebase exploration, spawn a sub-agent. For a single known file or symbol, just read or grep directly.

---

## Session Memory

At the end of every conversation - when work wraps up - **proactively update the project summary memory file** before exiting. Don't wait to be asked.

Each project has ONE evolving `project_summary.md` in the memory directory. Do NOT create per-session files. Instead:

- Read the existing project summary
- Update it with what was done in this session - new features, decisions, fixes, current state
- Remove anything that's now stale or superseded
- Keep it concise (1-2 pages max)
- Convert relative dates to absolute when saving ("Thursday" -> "2026-03-05")

The goal: the next Claude instance reads one file and has complete, current context. No archaeology through 20 session logs.

---

## Things to Never Do

- Never install a dependency without telling me what it is and why it's needed.
- Never use `var` in TypeScript/JavaScript.
- Never use ORMs. Write SQL.
- Never use `0.0.0.0` for local development servers.
- Never create a new utility/component when a similar one exists.
- Never leave `TODO` or `FIXME` comments without flagging them.
- Never use `console.log` in production code.
- Never modify `.env`, `.gitignore`, or config files without telling me.
- Never hand-edit auto-generated files (lock files, build outputs, generated types).
- Never assume a requirement - ask.
- Never run destructive git or shell commands (`reset --hard`, force-push, `rm -rf`) without asking.
- Never skip hooks (`--no-verify`) or bypass signing without my explicit OK.
- Never add fallbacks, defensive checks, or error handling for situations that can't happen inside our own code.

---

## Skill Files

The following skill files extend this root for specific contexts:

- **Blog Writing Style** - Voice and structure for blog posts on princejain.me.
- **Work Documentation Style** - Voice and argumentation rules for memos, PRDs, leadership docs.
- **CTO Technical Reviewer** - Activate when asked to review or pressure-test a technical plan.
- **Full-Stack Scaffold** - Default layout for new FastAPI + Next.js projects.
