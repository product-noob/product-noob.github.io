---
pubDate: '2026-02-20'
title: "I Build AI Products for a Living. Here's the Full Tools Landscape as I Actually See It."
description: "A practitioner's map of the AI tools landscape — from ChatGPT basics to the protocol wars reshaping commerce. Written from the inside by someone who built Flipkart's 3M+ MAU conversational AI, delivered ₹100Cr+ in LLM cost savings, and is now building agentic commerce."
tags: ['AI', 'Product']
featured: true
---

For the last few years, building AI products has been my actual day job — not a side project, not a newsletter angle, my actual job.

I was the PM for Flippi, Flipkart's conversational AI assistant that grew to **3M+ monthly active users**. Along the way, my team figured out how to engineer **₹100 Crore+ in LLM infrastructure cost savings** — through careful, sometimes painful systems thinking about how cost, accuracy, and latency interact with each other. I now build SLAP, Flipkart's agentic commerce platform — the bet that in a few years, users won't browse product pages; their AI agents will shop on their behalf.

I've also written about [how AI is changing PMing](/blogs/pming-in-the-era-of-ai/) and put together an [AI Glossary for PMs](/blogs/ai-glossary-every-pm-needs/). But those were frameworks. This post is the map.

Between the production builds, the weekend vibe-coding sessions, the homelab experiments, and the general rabbit-holing that comes with this territory — I've put together a fairly complete mental model of the AI tools landscape. Not from reading about it. From actually using, shipping, debugging, and sometimes fighting with every layer of it.

This is that map. A progression from "I've never used ChatGPT" to "I understand why everyone's fighting over AI protocols" — written from someone inside the building, not observing from outside.

Let's go.

---

## TL;DR | The 5-Level AI Starter Path

1. **Start chatting** — Replace one daily Google search with ChatGPT, Gemini, or Perplexity
2. **Build something without code** — Use Lovable, v0, or Replit to go from idea to working app
3. **Level up with AI-native dev tools** — Cursor, Anti-Gravity, Claude Code for serious building
4. **Understand the plumbing** — Orchestration, memory, image generation, RAG
5. **Follow the protocol wars** — MCP, ACP, UCP and why they'll reshape the internet

*Each level builds on the last. Stop wherever you're comfortable — there's no quiz at the end.*

---

## 💬 Level 0: Replace Your Google Search

This is the easiest win, and honestly, if you do nothing else from this post, just do this.

Pick **one** tool and swap out a daily Google search for it. That's it. You'll be shocked how quickly your habits change.

Here's what I use and when:

- **ChatGPT** — My default thinking partner. Great for brainstorming, drafting, rewriting, and rubber-ducking product problems. I use the o3 reasoning model when I need it to actually _think through_ something complex.
- **Gemini** — Tightly integrated with Google's ecosystem. If you live in Google Docs/Sheets/Gmail, Gemini fits in naturally. The Deep Research feature is genuinely impressive for market analysis.
- **Perplexity AI** — My go-to for factual research. It cites sources inline, which means you can actually verify what it's telling you _(revolutionary concept in the AI world, I know)_.
- **NotebookLM** — The sleeper hit nobody talks about. Upload a bunch of PDFs, meeting transcripts, or research papers and have a conversation with them. I've used it to prep for strategy reviews by uploading competitor annual reports. It even generates podcast-style audio summaries — wild.

The key mental shift here is: **stop thinking of AI as a search engine and start thinking of it as a thinking partner**. You don't type keywords — you describe what you're trying to accomplish, give it context, and iterate on the output.

> **Homework:** Pick ONE tool from above. Use it every single day for a week. Not for fun — for actual work tasks. Research, drafting, analysis, whatever. After 7 days, you won't go back.

---

## 🏗️ Level 1: Build Something ("Vibe Coding" Is Real)

This is where it gets fun.

There's a whole new category of tools that let you describe an idea in plain English and get a **working application** back. Not a mockup. Not a wireframe. A functional, deployable app. The industry's calling it "vibe coding" and honestly, the name is cringe but the experience is magical.

Here's my take on the big three:

- **Lovable** — The most polished experience for non-technical builders. Describe your app, it generates a full-stack React application with a clean UI. I've seen PMs at Flipkart use this to build internal dashboards in a single afternoon. Best for: prototypes you want to _show_ people.

- **v0 by Vercel** — More developer-oriented but incredible for UI generation. Give it a description or even a screenshot, and it produces production-quality React components. Best for: when you know roughly what you want the UI to look like.

- **Replit Agent** — The most "hands-off" option. It sets up the full environment, installs dependencies, writes code, and deploys — all from a conversation. Best for: when you want to go from zero to deployed with minimal friction.

**What you can realistically build in a weekend:** a personal portfolio site, an internal tool for tracking something at work, a simple API that connects two services, a Chrome extension that solves a specific annoyance. I've written about building [your first API with a database for free](/blogs/creating-your-first-api-with-database-for-free/) and [hosting your own n8n automation server](/blogs/hosting-your-free-local-n8n/) — both are great weekend project starting points.

Now, the honest limitation: these tools are **brilliant for prototypes** but hit walls at production scale. The moment you need authentication, complex state management, or integration with real APIs, you'll feel the constraints. Which brings us to Level 2.

---

## ⚡ Level 2: AI-Native Development

If Level 1 is "AI builds for you," Level 2 is "you build WITH AI." The difference is massive.

### Agentic IDEs

These are code editors that have AI baked into every interaction — not as an afterthought, but as the core experience.

- **Cursor** — The one that kicked off the agentic IDE wave. It's a VS Code fork with deeply integrated AI that can edit across multiple files, understand your entire codebase, and execute multi-step tasks. The "Composer" feature is particularly powerful — describe a change in natural language and watch it modify the right files. Most developers I know who've tried it haven't gone back.

- **Windsurf** — Similar to Cursor but with its own take on the "AI flow" paradigm. Worth trying if Cursor's style doesn't click with you.

- **Google Anti-Gravity** — This is the new kid, and it's doing something fundamentally different. Instead of retrofitting AI into an existing editor, Anti-Gravity is built agent-first. The standout feature is the **Agent Manager** view — you can spin up multiple AI agents working in parallel on different parts of your codebase. Think of it as having a team of junior developers you can delegate to simultaneously. It's early, but the paradigm shift from "one cursor, one agent" to "orchestrate many agents" feels like a glimpse of the future.

### CLI Copilots

For when you want AI power without leaving your terminal:

- **Claude Code** — Anthropic's CLI tool. I use it for this very blog _(meta, I know)_. It can read your entire project, make edits across files, run commands, and even create git commits. It's like pair-programming with someone who's read every file in your repo.

- **Gemini CLI** — Google's answer. Great integration with Google Cloud if that's your ecosystem.

- **OpenAI Codex** — OpenAI's CLI agent. Strong at multi-step coding tasks with its sandbox approach.

**The PM angle:** This level is where AI goes from "cool toy" to "career accelerant." I can go from a rough PRD to a working demo in a day at Flipkart. Not because I'm a great developer _(blame my rusty coding skills)_ — but because these tools close the gap between "knowing what to build" and "actually building it." For PMs, that's a superpower.

---

## 🧠 Level 3: Understanding the Plumbing

This is the transition from "using AI tools" to "understanding AI systems." You don't _need_ this level to be productive, but it'll make you 10x more effective at evaluating what's possible, what's hype, and what's worth building.

### 🎨 Image Generation

AI image generation has gotten absurdly good, absurdly fast.

- **Nano Banana** — The fun name for Google's Gemini 2.5 Flash image generation. It produces high-quality images from text prompts and is free to use through the Gemini app. The meme generation capabilities alone are worth the detour.
- **Flux / ComfyUI** — For the more adventurous. Flux is the current state-of-the-art in open-source image models, and ComfyUI gives you a node-based workflow to chain image generation steps together. Steeper learning curve, but incredibly powerful for custom workflows.
- **GPT-4o Image Generation** — OpenAI's native image gen built right into ChatGPT. Particularly strong for consistent character generation and text-in-image tasks.

### 🔗 Orchestration Frameworks

When you want multiple AI models or steps working together:

- **LangChain** — The OG orchestration framework. It's how most AI applications chain together prompts, tools, and data retrieval. Has a huge ecosystem but can be over-engineered for simple use-cases.
- **Microsoft AutoGen** — Focuses on multi-agent conversations where different AI agents collaborate to solve problems.
- **Google ADK (Agent Development Kit)** — Google's framework for building AI agents that can use tools, maintain memory, and work together. Tightly integrated with Gemini models.

### 💾 Memory

One of the biggest limitations of AI is that it forgets everything between sessions. These tools fix that:

- **Supermemory** — Lets your AI remember across conversations and tools. Think of it as giving your AI a persistent notebook.
- **Mem0** — A memory layer for AI applications. It stores, retrieves, and manages memories so your AI gets better the more you use it.

**Practical advice if you're building:** Start with RAG _(Retrieval Augmented Generation)_, not fine-tuning. RAG means giving your AI access to your own data at query time — like attaching a cheat sheet to every prompt. Fine-tuning means retraining the model itself, which is expensive, slow, and often unnecessary. For 90% of use-cases, RAG is the right starting point.

> If any of the terminology here feels unfamiliar, I've got you covered — check out my [AI Glossary for PMs](/blogs/ai-glossary-every-pm-needs/) where I break down every term in plain English with PM-centric takes.

---

## 🌐 Level 4: The Protocol Wars

This is the bleeding edge. If Levels 0–3 were about using and building with AI, Level 4 is about understanding **how AI agents will transact and interact across the internet**. This stuff is moving so fast that half of what I write here might be outdated by next month — but the underlying trends are real.

### What even are AI protocols?

Right now, every AI tool is its own island. Your ChatGPT can't talk to your Cursor which can't talk to your shopping agent. Protocols are the standardised bridges between these islands — they define how AI agents discover each other, communicate, and transact.

Think of it this way: the early internet had websites but no standard way to pay online. Then payment protocols (SSL, PCI, eventually UPI in India) standardised how money moves. We're at that same inflection point for AI — the models are smart enough, but they need standard protocols to actually _do things_ in the real world.

### 🔌 MCP (Model Context Protocol)

Started by **Anthropic** and now donated to the **Linux Foundation** — which tells you the industry is taking this seriously.

The best analogy: **MCP is USB-C for AI.** Just like USB-C gives you one standard port that works with any device, MCP gives AI models one standard way to connect with external tools and data sources. Before MCP, every integration was custom-built. With MCP, you build a connector once and any AI model can use it.

If you've used Claude Code or Cursor and seen them pull in external data, run searches, or interact with APIs — that's MCP at work under the hood. It's rapidly becoming the default standard for tool connectivity.

### 🛒 ACP (Agentic Commerce Protocol)

This is where it gets really interesting for product folks. **ACP** is being pushed by **OpenAI in partnership with Stripe** and others, and it's designed for one specific thing: **enabling AI agents to make purchases on behalf of users.**

Picture this: you tell your AI assistant "book me a table for two at an Italian restaurant near Koramangala tonight." The agent searches restaurants, checks availability, compares prices, and completes the booking — including payment — without you ever opening a browser. ACP is the protocol that makes the payment and identity verification part of that flow work securely.

The implications for e-commerce, travel, food delivery, and basically any transactional industry are massive.

### 🌐 UCP (Universal Commerce Protocol)

**Google's answer**, developed with **Shopify, Flipkart, and others**. Where ACP focuses narrowly on the payment/transaction layer, UCP is more ambitious — it wants to standardise the entire commerce interaction: product discovery, negotiation, fulfilment, and post-purchase.

Think of UCP as trying to build the "HTTP of commerce" — a universal language that any merchant, any platform, and any AI agent can speak. If ACP is the payment rail, UCP wants to be the entire railway system.

### 🎨 Novel UX

Protocols alone aren't enough — we also need new ways for humans to interact with AI agents. A few emerging concepts:

- **MCP UI / Thesys** — Frameworks for rendering rich, interactive UI inside AI conversations. Instead of plain text responses, imagine your AI showing you an interactive product comparison table or a booking calendar right in the chat.
- **Skills** — The idea that AI agents can dynamically learn and invoke new capabilities without retraining. An agent "learns" how to use a new service by reading its MCP specification.
- **Tools as APIs** — The convergence of traditional APIs and AI-native tool specifications, where every service is both human-callable and agent-callable.

At **Flipkart**, I'm building conversational AI surfaces that sit right at the intersection of these protocols. This isn't theoretical for me — it's my day job. When I think about how users will shop in 2027, I see a world where your AI agent negotiates deals, compares products across platforms, and handles the entire transaction — and these protocols are the infrastructure that makes it possible.

> "The true scale of Agentic AI won't come from smarter models, but from standardised protocols that allow agents to transact securely across the web."

---

## 🔬 What Building AI at Production Scale Actually Taught Me

Most AI posts end at Level 4. With the tools, the levels, the excitement. But there's a side to building AI that nobody really writes about until you're in the middle of it — the part where the magic runs headfirst into engineering reality.

At Flippi's scale — 3M+ monthly active users, thousands of concurrent conversations, real user expectations on the line — we ran into every one of these walls. The ₹100Cr+ in LLM cost savings my team delivered? Almost all of it came from deeply understanding and solving the tradeoffs outlined below.

Here's what production AI actually looks like from the inside.

---

### The Core Trilemma: Cost × Accuracy × Latency

At a high level, every production AI system is constrained by a three-dimensional optimisation problem:

> **Cost × Accuracy × Latency**

You can usually optimise one easily.
You can optimise two with careful engineering.
Optimising all three simultaneously requires deep systems thinking, infrastructure maturity, and continuous iteration.

Shipping a real AI product is not about writing a clever prompt. It is about building a probabilistic system that behaves reliably under load, within budget, and at user-acceptable response times.

---

### 📊 Accuracy

Accuracy in AI systems is fundamentally different from traditional deterministic products. LLMs are by design probabilistic systems.

#### Why it is hard

- **Non-determinism** — The same input can produce different outputs depending on sampling, temperature, model version, or factors you can't fully predict.

- **Evaluation ambiguity** — What you can't measure confidently you can't improve easily. For LLM responses there is rarely a single correct answer. You move from binary correctness (True/False) to spectrum-based grading (it depends). Solving this requires building: human evaluation pipelines, LLM-as-judge setups, golden query sets, eval frameworks, and offline + online A/B testing.

- **Prompt sensitivity** — Small changes in phrasing can shift behaviour significantly. A prompt that works in testing can fail in unexpected ways on real user inputs.

- **Distribution drift** — Real user inputs rarely resemble your curated test datasets. And they keep changing.

- **Long-tail failures** — AI systems fail in rare but high-impact ways that traditional QA never prepared you for.

This breaks traditional QA assumptions entirely. Instead of verifying logic, you are measuring behaviour distributions.

#### The constraint problem

If you heavily constrain the LLM with rigid instructions, templates, and guardrails:

- Variance decreases
- But creativity and flexibility decrease with it
- The system starts resembling a rule-based pipeline — which makes you wonder why you needed an LLM at all

If you loosen constraints:

- User experience improves
- Error rates increase
- Hallucination risk rises

You are constantly deciding how much intelligence you want versus how much control you need. There's no right answer — just a dial you keep adjusting.

---

### 💰 Cost

LLMs are computationally expensive. Every token generated has a price.

Cost drivers include:

- Model size
- Input context length
- Output length
- Number of calls per user request
- Tool calls and retries
- Safety checks and moderation layers

In production, costs scale with:

> Active users × tokens per interaction × model price

#### Hidden cost multipliers

- Multi-step agent flows
- Retrieval pipelines
- Guardrail revalidation
- Fallback models
- Logging and observability
- Dedicated GPU capacity for SLAs

In early stages, VC subsidisation hides the cost curve. At scale, margins become the real constraint. Every additional second of generation, every extra tool call, every retry compounds.

---

### ⚡ Latency

Latency directly affects user trust. AI systems are inherently slower than traditional APIs because:

- Autoregressive token generation is sequential
- Larger models have higher inference time
- Tool orchestration adds round trips
- Retrieval adds vector search overhead

Users tolerate roughly:

- 200ms for search suggestions
- 1 second for answers
- 3 seconds max before perceived slowness

Beyond that, drop-off increases sharply. And that's for simple queries. For agentic flows where multiple tools are called, you're already fighting physics.

Latency amplifiers:

- Multi-agent chains
- Reflection loops
- Re-ranking
- Streaming tokens with long responses
- Safety re-checks

The more intelligence you layer in, the slower the system becomes. Every "smarter" feature you add is also a latency cost.

---

## Common Tradeoffs in Production

### Cost vs Accuracy

- Use frontier models → High accuracy, high cost
- Use smaller models → Lower cost, lower reasoning quality

Many systems adopt: small model for first pass → large model fallback for edge cases → cascading confidence-based routing. This introduces routing complexity and evaluation challenges of its own.

### Cost vs Latency

- Dedicated GPU/TPU capacity → Lower latency, high fixed cost
- Shared serverless inference → Higher latency variability, lower upfront cost

To guarantee uptime and SLAs, enterprises often reserve capacity — which increases burn significantly.

### Accuracy vs Latency

- Longer context improves grounding but increases latency
- More tool calls improve reasoning but increase delay
- Reflection improves output quality but can double inference time

The question you're constantly asking: is this interaction worth 4 seconds for a 5% quality gain?

### Cost vs Time to Market

- Custom fine-tuned models reduce long-term cost — but require data collection, labelling, infrastructure, and iteration cycles
- API-first: fast launch, dependency risk, pricing volatility exposure

---

## The Real Complexity: Systems Thinking

AI products are not single prompts. They are layered systems:

- Retrieval
- Memory
- Tool orchestration
- Guardrails
- Fallbacks
- Observability
- Evals
- Feedback loops

Each layer introduces additional cost, additional latency, and additional failure modes.

You are constantly balancing:

- Determinism vs creativity
- Control vs autonomy
- Speed vs reasoning depth
- Margin vs quality

---

## Practical Optimisation Patterns

### 1. Model Cascading

Route easy queries to cheaper models and hard ones to stronger models.

### 2. Confidence Scoring

Use scoring to decide whether to escalate or accept output.

### 3. Token Budgeting

Cap output length intelligently based on task type.

### 4. Retrieval Compression

Summarise retrieved context before sending to large models.

### 5. Parallelisation

Run retrieval and intent classification concurrently.

### 6. Streaming UX

Hide latency perception through streaming partial responses.

---

## A More Honest Framing

Building AI products is closer to:

> Operating a probabilistic distributed system under economic constraints.

You are not just designing prompts. You are designing:

- Behaviour envelopes
- Failure containment systems
- Cost control architectures
- Latency-aware pipelines
- Evaluation flywheels

The real craft lies in finding the equilibrium point where accuracy is sufficient, latency feels responsive, and cost scales sustainably. That equilibrium shifts as user expectations rise, models improve, infrastructure costs fall, and competition evolves.

And that constant rebalancing is the actual complexity of building AI products.

---

## 🚀 Where to Start Right Now

Let me make this dead simple:

- **Level 0:** Replace one Google search a day with ChatGPT or Perplexity. Takes 5 minutes.
- **Level 1:** Pick a weekend project and build it with Lovable or Replit. Takes a few hours.
- **Level 2:** Try Cursor or Claude Code on your next real coding task. Game-changing once it clicks.
- **Level 3:** Read about RAG and orchestration when you're curious about how things work under the hood.
- **Level 4:** Follow the protocol wars when you want to understand where the entire industry is heading.

**If you're just starting, Level 0 is all you need. Seriously.** Don't let the depth of this post overwhelm you. I went through these levels over two years — there's zero rush.

Looking back at my own journey — from building [superapps at Paytm](/blogs/apps-and-superapps/) to working on [mini apps at Flipkart](/blogs/building-mini-apps/) to now building conversational AI — the common thread has always been meeting users where they are. AI is the biggest platform shift since mobile, and the builders who start learning now _(even casually)_ will have a massive head start.

Now stop reading and go chat with an AI. That's Step 1. And if you want to go deeper on any of the above — from the tools to the tradeoffs — I'm usually on [LinkedIn](https://www.linkedin.com/in/prince-jain/) 😉
