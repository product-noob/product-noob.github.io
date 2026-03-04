---
pubDate: '2026-03-01'
title: "What Happens When You Give a PM Superpowers"
description: "A log of everything I've built with AI as a PM — internal tools, leadership demos, POCs, and production-adjacent experiments. Not a tutorial. A real record of what changed when the line between PM and builder started dissolving."
tags: ['AI', 'Product']
featured: false
---

There's a question I've been asked a lot lately by PMs curious about AI: _"Should I learn to code?"_

I think that's the wrong question. The right question is: **should you learn to build?** And the answer, unambiguously, is yes.

I'm a PM. I've never been hired as an engineer, and I still can't write a production-grade distributed system from scratch. But over the last couple of years, I've shipped a growing collection of internal tools, POCs, and prototypes — entirely using AI-assisted development. Some are scrappy utilities. Some became actual alignment pivots for product strategy. One or two have crossed the threshold into production-adjacent territory.

This post is a record of that experiment.

Not a tutorial. Not "10 AI tools every PM should know." A real log of what I built, what was hard, and what surprised me — because the meta-story here is more interesting than any individual tool.

The meta-story: **the line between PM and builder is dissolving.** And if you're a PM who ignores this, you're going to feel it in your next performance review.

---

## How This Works

For each item, I'll share:

- **The problem** that triggered it
- **What I built**
- **The interesting bit** — what was actually hard, surprising, or revealing
- **The outcome** — even anecdotal evidence counts

I've loosely grouped these into three acts: small itch-scratchers, bigger POCs that changed how my team thought about something, and the frontier stuff I'm doing now.

---

## Act 1: Scratching My Own Itch

These started as annoyances. A recurring meeting overhead, a manual task I was doing 10x a day, a workflow where I kept thinking "there has to be a better way."

---

### 📹 G-Meet Summariser

**The problem:** After every product discussion, I was spending 15–20 minutes writing up notes and action items. It felt like admin that existed only because the tooling hadn't caught up yet.

**What I built:** A tool that ingests a Google Meet transcript and produces a structured summary — decisions made, open questions, action items with owners. One prompt, about 30 seconds.

**The interesting bit:** I built this before Google added native AI summaries to Meet. That timing taught me a pattern — if you can identify the workflow that doesn't have an AI layer yet, you can be first. Gave me roughly 6 months of ahead-of-the-curve advantage before the feature shipped natively, and more importantly, made me realise how much of PM overhead is just latent tooling debt.

**Outcome:** Saved ~20 minutes per meeting on notes. More importantly, made me much more likely to _actually_ write up notes — which compounded as an alignment improvement over time.

---

### 💬 G-Chat Auto-Read

**The problem:** I was in 40+ chat spaces. The cognitive load of triaging which conversations needed my attention was genuinely exhausting — not the content, just the act of deciding what to look at.

**What I built:** A script that skims new messages across my most active Google Chat spaces and surfaces the ones that probably need my attention — based on mentions, keywords, and message importance heuristics.

**The interesting bit:** Deceptively simple, but it taught me something important about LLM-based triaging: the model is much better at understanding _intent_ ("is this blocking someone?") than parsing explicit triggers. A rule-based filter would have missed roughly half the actually important messages.

**Outcome:** Reduced my "keep up with chat" time by 30–40%. Stopped important asks from slipping through during high context-switch days.

---

### 🎫 JIRA ↔ Claude

**The problem:** Most PM JIRA management is terrible. Searching tickets, updating fields, writing descriptions from meeting notes — context-switching overhead that shouldn't exist.

**What I built:** A Claude integration that lets me manage JIRA via natural language. "Create a bug for the search ranking issue we discussed" becomes a ticket with the right fields filled. "Find all open P1s in the current sprint" surfaces them without me opening JIRA.

**The interesting bit:** The most surprising insight was how much JIRA state I was keeping in my head that I could now offload entirely. I didn't realise how much cognitive load "remembering to update the ticket" was consuming until I stopped doing it.

**Outcome:** Most of my JIRA management is now prompt-driven. Rough estimate: 45 minutes a day reclaimed.

---

## Act 2: POCs That Changed Thinking

These weren't about saving my own time. They were about answering a strategic question or creating alignment — fast enough that the answer actually mattered.

---

### 🚀 SLAP Day 0 Demo

**The problem:** At the start of SLAP (Flipkart's agentic commerce platform), I needed to create alignment on what we were actually building. A deck felt insufficient — too abstract. Leadership needed to _feel_ the product, not read about it.

**What I built:** A working demo of an agentic commerce interaction — a user conversing with an AI that could search, compare, and simulate purchasing — before we had a single line of production code. Built in a day using Claude + a lightweight orchestration wrapper.

**The interesting bit:** The demo created more strategic clarity in 20 minutes than weeks of PRD review would have. Once people could interact with the product hypothesis, conversations shifted from "is this the right thing to build?" to "here's what we need to make this actually work." That's a different — and far more productive — conversation to be in.

**Outcome:** Used as the internal alignment artifact for SLAP's initial investment decision. Became the north star reference point for months.

---

### 📊 QueryGPT / Uber GPT

**The problem:** I was deeply dependent on data analysts for every ad-hoc question. Want to know how query reformulation affects conversion? Write a request, wait 3 days, get a table.

**What I built:** A natural language interface to internal data — type a question, get a query, get a result. Self-serve data access without needing to know SQL or the exact table structure underneath.

**The interesting bit:** The biggest unlock wasn't speed — it was _question quality_. When you can ask follow-ups instantly, you ask much better questions. My data investigation went from "here's the one question I waited 3 days for" to "here are the 15 questions I asked this morning and the conclusion I reached." That compounding is significant.

**Outcome:** Effectively gave myself self-serve data superpowers. Stopped being blocked by analyst queue for exploratory analysis.

---

### 🛒 Commerce Minutes POC

**The problem:** The hypothesis underlying quick commerce is "fast = better." But what if the interface itself was the bottleneck, not the delivery time?

**What I built:** A POC for commerce as a pure conversation — describe what you need, get options, confirm, done. No browsing, no categories, no scrolling. Just a natural language transaction.

**The interesting bit:** The POC revealed something unexpected: the conversational interface surfaced a very different intent profile than browse-and-search. Users asked for things they would never have searched for. "What should I order for a low-effort dinner for two?" is a question no search box has ever answered well — but a conversational agent handles it naturally.

**Outcome:** Became the seed of the product vision for conversational commerce at Flipkart. One day of building, months of product direction.

---

### 🔍 ADK Log Tracer, Debugger & Annotation Tools

**The problem:** _(Screenshots and details coming — Prince to share ADK Log Tracer visuals)_

**What I built:** Three connected tools built on Google's Agent Development Kit (ADK):

1. **Log Tracer** — _(to be filled after screenshots)_
2. **Debugger** — _(to be filled after screenshots)_
3. **Annotation Tool** — _(to be filled after screenshots)_

**The interesting bit:** This was the most technically sophisticated thing in this list. Building on ADK meant working with agent orchestration primitives directly — not just calling an API, but reasoning about agent state, tool invocations, and execution traces in ways that most PM-built tools never get close to.

**Outcome:** _(to be filled)_ — but notably: this gave internal developer credibility. Engineers who saw this stopped treating me as "the PM who asks questions about the system" and started treating me as someone who understood it from the inside. That's a different kind of influence.

---

## Act 3: The Frontier

These are experiments I'm running right now. Some are stable tools. Some are still evolving. All of them are pushing at the boundary of what I thought was possible without a formal engineering role.

---

### 🎙️ Whispr Flow (My Version)

**The problem:** I wanted a voice-to-structured-text workflow — record a thought while walking, get it formatted and filed. The best tool for this got blocked by IT.

**What I built:** My own version. Record audio → transcribe with Whisper API → structure and tag with Claude → file to the right place. Works for meeting notes, thought dumps, and async communication drafts.

**The interesting bit:** Building this forced me to understand the actual pipeline behind "voice AI" tools. The transcription quality gap between Whisper and alternatives is significant. And the structuring step — turning raw transcript into formatted notes — is where 90% of the value actually comes from. The transcription is the easy part.

**Outcome:** My own Whispr that IT can't block 😄. Genuinely changed how I capture ideas on the go.

---

### 💻 Production Coding via LLMs

**The problem:** The usual PM-to-code pathway ends at "prototype." I wanted to test whether AI-assisted coding could get me meaningfully closer to production-quality contributions.

**What I built:** An ongoing experiment — taking specific, well-scoped engineering tasks (performance fixes, test coverage, config changes) and attempting to ship them via AI pair-programming with Claude Code and Cursor.

**The interesting bit:** The bottleneck is almost never the code generation. It's context and judgment — understanding the system well enough to verify that what was generated is safe to ship. The AI writes the code. I provide the product context and the sanity check. That's a division of labour that actually works.

**Outcome:** Still in progress. But the early signal is that the constraint on PM-as-builder is no longer "can I write the code?" — it's "do I understand the system well enough to be accountable for the change?" That's a fundamentally different skill to develop.

---

### 🧪 Mini Prototypes: The Ongoing Lab

Beyond the named projects above, I maintain a running set of mini-prototypes — small experiments that test a hypothesis or explore a capability. Recent examples:

- **Feed Refresh POC** — personalised content ranking experiments with LLM-based relevance scoring
- **Image Gen Evals** — a lightweight framework for evaluating AI-generated image quality across different prompts and models
- **Moderation Sandbox** — testing content moderation classifiers against edge cases before production use
- **Personalisation Experiments** — LLM-based approaches to user preference modelling

Most of these don't become products. They become intuitions — a deep understanding of what's actually possible that makes every product decision sharper.

---

## The PM Eval Framework

_[More detail to come — but here's the skeleton of what I built and why it matters.]_

One pattern that emerged across almost all of these projects: I needed a way to evaluate AI output quality. Not just "does this look right" — a structured, repeatable framework that I could use across different use-cases.

At Flippi, my team built this from scratch. A scoring system for LLM outputs that handled the fundamental problem: there's no binary right/wrong answer for a conversational AI response. The framework covered:

- **Relevance** — did the response address what was actually asked?
- **Accuracy** — is the factual content correct?
- **Helpfulness** — did it help the user accomplish their actual goal?
- **Safety** — does it stay within guardrails?
- **Tone** — does it match the product's voice and register?

What makes a PM eval framework interesting (and rare) is that it forces you to define, precisely, what "good" looks like for your specific use-case — _before_ you can measure it. Most teams skip this step and wonder why their "improvements" keep regressing. The teams that don't skip it are the ones who can actually iterate with confidence.

I'll write this up in detail in a future post. But if you're building an AI product and you don't have an eval framework yet — this should be your next project.

---

## The Meta Story

Looking across everything above, a few things stand out.

**Speed changes the question you can ask.** When a POC takes a day instead of a sprint, you can test 5 hypotheses instead of 1. The bottleneck shifts from "can we build it?" to "what's worth building?" — which is actually the PM's job.

**Building makes you a better PM.** Every tool I've built has given me mental models that sharpen product decisions. When you've debugged a latency issue in an agent pipeline yourself, you ask very different questions in design reviews.

**The PM-engineer boundary is dissolving.** This isn't a threat to engineers — the hard distributed systems work isn't going anywhere. But the "PM who can't build anything" is becoming a liability. The floor is rising fast.

**Accountability matters more than code.** The constraint on a PM building isn't technical ability anymore — it's the judgment and context to be accountable for what ships. That's developable. And it's the thing worth investing in.

I started this as a personal experiment. It's become how I think about the job.

If you're a PM reading this and you haven't shipped a single thing with AI yet — start small. Build the thing that would make your own day 10% better. The skills compound surprisingly fast.

And if you want to compare notes, I'm on [LinkedIn](https://www.linkedin.com/in/prince-jain/) 😊
