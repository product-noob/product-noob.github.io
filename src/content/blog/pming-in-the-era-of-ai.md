---
pubDate: '2025-04-21'
updatedDate: '2026-03-18'
title: "PMing in the Era of AI | How AI Has Rewired How I Work"
description: "How AI has changed my day-to-day as a PM. Real workflows, real trade-offs, and why the job is shifting upwards, not disappearing"
tags: ['AI', 'Product']
featured: false
---

I took a presentation for Flipkart PMs on **"How PMing is changing in the era of AI"** a while back and thought I'd turn a version of my thoughts into a post. But as I started writing, I realised the generic "AI is changing everything!" take is already everywhere. What's harder to find is someone showing _how_ it actually changes the daily work. The real workflows, the time saved, the new failure modes, and the parts that still need a human in the loop.

So that's what this is. Not a prediction piece. Not a framework deck. Just an honest account of how AI has rewired how I work as a PM, what tools I actually use, and where I think this is all heading.

_A note: I've since written a much deeper dive on [what it's like to build AI products at scale](https://princejain.me/blogs/what-its-like-to-build-ai-products-at-scale). Think of this post as the "how I use AI as a PM" side, and that one as the "how I build AI products" side. Different angles, same world._

---

## TL;DR

1. **AI isn't replacing PMs. It's compressing the boring parts.** Research that took weeks now takes hours. Prototyping that needed design bandwidth now needs an idea and a prompt. The time you get back is real.

2. **The biggest shift is in what you can do _alone_.** I've built working prototypes, automated classification pipelines, and internal tools. Things that used to require a cross-functional team just to get started. The dependency model has fundamentally changed.

3. **Prompting is a real skill, not a meme.** The difference between a vague prompt and a well-structured one is the difference between "meh, I could've Googled this" and genuinely useful output. It's the new version of writing a good brief.

4. **Speed creates new responsibilities.** When you can ship faster, the guardrails around _what_ you ship matter more. Privacy, bias, hallucination risk. These aren't someone else's problems anymore.

5. **The PM role is shifting upwards, not sideways.** Less time on ticket-tetris and formatting decks. More time on strategy, judgment calls, and the kind of product thinking that AI can't do for you.

---

## Every Wave Rewrites the Rules

Every few years, someone declares PM is over. It's been happening since before I started my career.

- **2010:** We were told to be _design-led_. If you couldn't sketch a wireframe, you were obsolete.
- **2015:** The narrative shifted to _growth-led_. Experiment velocity was everything.
- **2020:** _Data-led_ became the mandate. If you weren't writing SQL or running cohort analyses, you were falling behind.
- **2025:** And now, predictably, it's **AI-led**. If you're not using LLMs in your workflow, you're apparently a dinosaur.

Here's the pattern I've noticed: each wave doesn't replace the previous skills, it _stacks on top of them_. The PMs who thrived through each shift weren't the ones who abandoned what they knew. They were the ones who grabbed the new tool and added it to their existing toolkit. Design sense didn't stop mattering when growth became the thing. Data fluency didn't become irrelevant when AI arrived.

The smart PMs don't panic. They grab the pen.

If you're still hand-writing SQL queries from scratch, waiting a week for hi-fi mocks, or manually tagging support tickets... you're not just falling behind. You're missing the chance to redirect that time into work that actually needs a human brain.

---

## How My Actual Workflows Have Changed

I want to be specific here, because the before-and-after framing only works if the "after" is grounded in real work. These aren't hypothetical. This is what my weeks actually look like now versus two years ago.

### Research: From Weeks to Hours

**Before:** Competitor research meant manually digging through product websites, app stores, user reviews, analyst reports, and best-practice documentation. A thorough competitive analysis could take weeks, sometimes stretching across sprints before it was actionable. And it was always fragmented. One person's notes in a doc, another's in a spreadsheet, the analyst report buried in someone's email.

**Now:** I start most research tasks with a **deep research query**: a single, well-structured prompt that synthesises competitor feature sets, pricing models, user sentiment patterns, common pitfalls, and comparison tables. The first pass takes **under 30 minutes**. It's not perfect. I still need to verify claims, check for hallucinated data points, and layer in proprietary knowledge the model doesn't have. But the delta in time-to-first-draft is massive.

The key insight: AI didn't replace the research. It replaced the **gathering** phase. The synthesis and judgment ("what does this mean for _our_ product?") is still entirely mine. And honestly, because I'm spending less time on mechanical collection, I have more energy for the analysis that actually matters.

### PRDs and Product Notes: The Brain-Dump Pipeline

**Before:** Writing a PRD was a multi-week affair. Stakeholder alignment meetings, edge-case discovery sessions, iteration after iteration on scope and requirements. The writing itself was the easy part. It was the _thinking_ that took time, and much of that thinking happened _while_ writing, which made the process slow and non-linear.

**Now:** I brain-dump rough notes, meeting transcripts, and half-formed thoughts into an LLM and ask it to scaffold a structured PRD. The output isn't ship-ready (it never is) but it gives me a skeleton in minutes that would've taken me a day to structure from scratch. More importantly, I use it as a **thinking tool**: I ask the model to critique my PRD, identify missing edge cases, suggest failure modes I haven't considered, or rewrite sections for different audiences _(try asking it to explain your technical spec to a non-technical stakeholder, the output is genuinely useful)_.

The document still needs my product judgment. The model doesn't know our users, our constraints, our strategy. But the mechanical parts: formatting, structuring, ensuring completeness against a template... that's where AI saves me 5+ hours per week.

### Prototyping: From Design Queue to Same-Day Testable

**Before:** The prototyping pipeline used to look like this: sketch UX flows on paper or Excalidraw, wait for design bandwidth, get Figma mocks, wait for engineering bandwidth, get a working build you could actually test with users. The total cycle from idea to testable prototype was often **3-4 weeks** at minimum, and that's if nothing got deprioritised.

**Now:** I use AI code editors like **Cursor** and **Claude** to build interactive, demo-worthy prototypes in a few hours. Not wireframes. Not clickable Figma mocks. Actual working interfaces with real logic, connected to dummy data, that I can put in front of users and stakeholders the same day.

This has fundamentally changed how I de-risk product bets. Instead of writing a long spec, getting alignment, waiting for a build, and _then_ learning from user feedback... I can test the core hypothesis before I've even written the spec. The feedback loop went from weeks to hours. That's not an incremental improvement. It's a structural change in how I make product decisions.

_(Full disclosure: the code I write is not production-ready. It's held together with duct tape and optimism. But for testing whether an idea resonates? It's more than enough.)_

### Data Analysis: The End of "Can You Pull This For Me?"

**Before:** This was, by far, the most mundane and dependency-heavy part of my job. Remembering table names, writing SQL queries from scratch, waiting for analytics support when you needed something non-standard. Ops labelling (manually annotating data, building classification models, running clustering) was painfully slow and resource-heavy.

**Now:** I built a custom **agentic SQL generator** _(inspired by [Uber's QueryGPT](https://www.uber.com/en-IN/blog/query-gpt/))_ that converts plain English into accurate SQL queries against our data warehouse. I describe what I want in natural language, it generates the query, I review it, run it, and have my answer. What used to be a half-day dependency on an analyst is now a 10-minute self-serve task.

For classification and labelling tasks, LLMs have been transformative. What used to require building a custom ML model (data collection, labelling, training, evaluation, deployment) can now often be handled with a well-designed prompt and a structured output schema. The quality isn't always production-grade, but for exploratory analysis and rapid categorisation, it's dramatically faster and cheaper.

### General Productivity: The Compound Effect

The individual workflow improvements are meaningful on their own. But the compound effect is where it really hits.

I [built a custom JS script](https://princejain.me/blogs/Auto-Reading-Google-Chat-Messages) to auto-read Google Chat messages _(because yes, that was annoying me enough to solve it)_. I built a [Chrome extension](https://chromewebstore.google.com/detail/chatgpt-google-meet-summa/kofkiemddfpekcadmaeheonbbkhnclhj?pli=1) for summarising Google Meet recordings into structured notes. I built a CSV generator that bulk-creates Jira tickets from natural language descriptions. None of these are products. They're small, personal automations that each save me 10-30 mins per week.

Added up, these micro-automations mean I spend dramatically less time on mechanical work and more time on the parts of the job that actually require product judgment. Deciding _what_ to build, _why_ to build it, and _how_ to sequence it.

---

## My Actual AI Toolkit (2025)

I get asked about my toolkit a lot, so here's the real list. Not a sponsored recommendations page, just what I actually open every week:

- **Chat & Research:** Gemini _(my daily driver for most things)_, ChatGPT _(especially with deep research mode)_, AI Studio _(for rapid model testing)_, Perplexity _(for search-grounded research)_, Claude _(for code and long-form writing)_
- **APIs:** OpenAI and Gemini APIs, for embedding LLM capabilities into prototypes and internal tools
- **AI IDEs:** Cursor _(primary)_, Claude Code, for shipping proof-of-concepts fast without needing engineering support
- **Design & Visuals:** V0.dev, Lovable, Leonardo.AI, for UI mocks, hero images, and visual concepts for decks

The toolkit evolves fast. Half of what I used a year ago has been replaced or deprecated. The meta-skill isn't mastering any single tool. It's staying fluent enough across the ecosystem that you can pick up the best tool for each task.

If you're just getting started, I wrote an [AI Starter Kit for PMs](https://princejain.me/blogs/ai-starter-kit-for-pms) that walks through the progression from zero to comfortably using AI in your daily work. And if you keep running into jargon you don't recognise, the [AI Glossary](https://princejain.me/blogs/AI-Glossary-Every-PM-Needs) might help.

---

## What Actually Makes AI Work For You: Real Prompt Patterns

I'm going to skip the generic "be specific with your prompts" advice _(you've seen that in every AI article already)_ and instead share the actual patterns I've found most useful in real PM work.

### The Structured Brief Pattern

The single biggest upgrade to my AI output was treating prompts like product briefs. Not "write me a PRD", that gives you garbage. Instead:

> **Context** (who you are, what you're working on) + **Input** (the raw material: notes, data, constraints) + **Output spec** (exact format, length, audience, tone) + **Examples** (what good looks like)

When I scaffold a PRD, my prompt includes the problem statement from our team's discussions, 3-4 bullet points of constraints the model doesn't know, the PRD template we use internally, and an example section from a previous PRD I liked. The output quality difference between this and a bare "write a PRD about X" is night and day.

### The Critique Loop

I rarely use AI output as-is. Instead, I generate a first pass, then ask the model to critique it:

- _"What edge cases am I missing in this spec?"_
- _"If you were a senior engineer reviewing this, what questions would you ask?"_
- _"Rewrite this from the perspective of a user who's frustrated with our current experience."_

This is where the model becomes a thinking partner rather than a content generator. The critiques surface blind spots I genuinely hadn't considered. Not always, but often enough to make it a default step in my process.

### The Classification Prompt

For ops work like tagging support tickets, categorising user feedback, or bucketing feature requests, I use a structured classification prompt.

The trick is to define the categories upfront _(with descriptions and example items for each)_, provide the input data, specify the output format _(usually JSON with a confidence score)_, and include a "none of the above" category so the model doesn't force-fit everything.

This pattern alone has replaced what used to be days of manual labelling work for exploratory analysis. The accuracy isn't perfect, roughly 85% on our internal benchmarks, but for a first pass that you then review and correct, it's dramatically faster than starting from scratch.


### The SQL Generation Pattern

For my internal SQL tool, the prompt includes the database schema _(table names, key columns, relationships)_, a few example queries with their natural-language descriptions, and explicit instructions about our naming conventions and common joins. The model generates the SQL, I review it before running, and over time the prompt has gotten better as I've added more edge cases from queries that initially failed.

_The lesson across all of these: the quality of AI output is directly proportional to the quality of the structure you give it. "Garbage in, garbage out" has never been more true. The skill isn't "prompting" in some abstract sense. It's knowing your domain well enough to write a good brief._

---

## The Traps: Where AI Makes You Worse If You're Not Careful

AI in the PM workflow isn't all upside. There are real failure modes I've hit, and they're worth being explicit about.

### Hallucination Risk in Research

LLMs can be _wildly confident_ about things that are completely wrong. I've caught fabricated competitor features, invented statistics, and citations to papers that don't exist. This matters **a lot** when you're using AI-generated research to inform product decisions or present to leadership.

My rule: anything that's going into a deck, a spec, or a decision-making conversation gets fact-checked against primary sources. AI does the first draft of research. I do the verification. Skipping verification because "it sounds right" is a trap that will burn you exactly once before you learn the lesson.

### The Outsourced Thinking Problem

This is the subtler risk. When AI gives you fast, articulate answers, it's tempting to stop thinking as deeply yourself. I've noticed it in my own work: there are weeks where I catch myself accepting the model's framing of a problem instead of developing my own point of view first.

The best PMs I work with use AI to _stress-test_ their thinking, not to _replace_ it. They come to the model with a hypothesis and ask it to poke holes, not with a blank page asking it what to think. The distinction matters more than it sounds.

### Security and Privacy: Your Problem Now

As PMs start feeding more data into AI tools (meeting transcripts, user feedback, internal documents, product specs) the question of what data goes where becomes a real concern. Most public LLM tools don't guarantee data privacy in the way your company's security team would want.

Some non-negotiable rules I follow:
- **Never feed sensitive data** _(customer PII, internal financials, unreleased product details)_ into public LLMs unless explicitly approved by your security team
- **Use enterprise-grade tools** with proper access controls when working with internal data
- **Always assume the model could surface your input** in some form to other users. If that thought makes you uncomfortable, don't input it

And increasingly, if you're a PM building AI-powered features: bias, explainability, and transparency are product requirements, not afterthoughts. Users deserve to know when they're interacting with AI, and you need to understand how your model arrives at its outputs. This isn't a "nice to have" section in your PRD. It's a core part of the product spec.

---

## So... Is the PM Role Actually Changing?

Yes. **Upwards.**

The mechanical, dependency-heavy parts of the job (writing boilerplate docs, waiting in design queues, manually pulling data, formatting decks) are getting compressed. Some of them are disappearing entirely.

What's left is the stuff that was always the hardest and most valuable: **figuring out what to build and why**. Understanding users at a level that can't be automated. Making judgment calls in the face of ambiguity. Storytelling that gets a room of stakeholders aligned. Sequencing decisions that balance short-term wins with long-term strategy.

If anything, AI raises the bar on what's expected of PMs. When everyone has access to the same tools, the differentiator isn't "can you use ChatGPT?" It's the quality of your product thinking, the clarity of your judgment, and how fast you can translate insight into action.

The PMs who treat AI as a replacement for thinking will produce mediocre work, faster. The PMs who treat it as a _multiplier_ for their existing skills will operate at a level that wasn't possible two years ago.

Every PM is going to be an "AI PM" sooner than they think. Not because the title changes, but because the baseline expectations of the role will include AI fluency. Just like data fluency became table stakes a few years ago.

---

The tools are evolving fast. What I'm using today will probably look dated in six months. But the underlying shift, from PMs as coordinators of other people's output to PMs as builders who can prototype, analyse, and iterate independently, that's structural. And it's not going back.

If you're a PM who hasn't started integrating AI into your workflow yet, here's my honest advice: stop reading and go use it. Open ChatGPT, or Claude, or Gemini, and take a real work problem to it. Not a toy example. A real one. The learning curve is surprisingly short, and the "aha" moment when you save three hours on something that used to take a full day... that's when it clicks.

*If you're navigating this shift and want to swap notes, find me on [Twitter](https://twitter.com/princejain) or [LinkedIn](https://linkedin.com/in/princejain). Always up for it.*
