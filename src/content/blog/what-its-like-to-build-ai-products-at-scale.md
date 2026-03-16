---
pubDate: '2026-03-17'
title: "What It’s Like to Build AI Products at Scale"
description: "What actually happens after you spin up your first agent in 15 minutes. The trade-offs, decisions, and hard-won lessons from building a conversational AI product at Flipkart scale : 10M+ users, real cost pressure, real latency constraints."
tags: ['AI', 'Product', 'Engineering']
featured: true
---

I've been building AI products for over two and a half years now: before "AI PM" was a LinkedIn badge and before every product roadmap suddenly had the word agentic sprinkled across it. In that time, I've watched the public discourse around building AI products reduce into a oversimplified playbook: spin up an agent, connect some tools, write a prompt, ship it.

I've had more conversations than I can count with people who genuinely believe you can go from zero to production AI product in an afternoon. Some of them are now writing the guides that others follow. Infact someone just yesterday asked me what do I do for so long building Agents and agentic implementation when he spun up his first agent in 15 mins (partially what triggered me to write this post)

I [vibe-code for fun on weekends](https://princejain.me). I also professionally build an AI product at Flipkart scale (currently building [SLAP](https://play.google.com/store/apps/details?id=com.slap.android)): think **10 million-plus potential users**, thousands of concurrent conversations, real business metrics on the line. These are not the same activity. Not even close. This post is about the gap between the "build an agent in 15 minutes" crowd and what actually happens when you ship an AI product that real people use, at real scale, with real business constraints.

*Disclaimer: As with most things I write and discuss publicly, a lot of internal data and specific decisions have been omitted for obvious reasons. What I'm sharing here are my personal learnings and patterns: not a deep dive on how we actually did it ;).*

## TL;DR
1. **The "why is this so hard" answer** - Shipping AI at scale feels 10x harder than the prototypes and vibe coding demos: because every choice is a three-way trade-off between cost, latency, and performance. You can win on two. Winning on all three is the actual job.
2. **Vibe is a real thing** - While we have created pretty robust eval frameworks to measure objective and subjective aspects; even after two-plus years, I still can't fully formalise what makes one AI response feel better than another when the metrics say they're equal. AI quality has more dimensions than you expect — and the hardest ones to measure matter the most. (we call it Vibe-check!)
3. **Cost at scale is a real thing to worry about** - At prototype scale, cost is a rounding error. At 10M+ users, every extra context, extra tool call and every retry compounds into actual meaningful business problems. And the difficulty of cost reducing is all about trade-off, there is no magic bullet.
4. **Evals are a living system, not a one-time setup.** Golden sets decay, ground truth requires product judgment, and "vibe" is a real quality dimension you can't escape.
5. **The prototype teaches you what to build. Production teaches you what you didn't know.** Almost nothing in the current discourse prepares you for that transition.

---

## The Easy Part

The LinkedIn gurus actually get the building blocks right: choose an orchestration framework, pick a model, write prompts, connect tools, set up evals.

That sentence took four seconds to read. Each of those decisions, done properly at scale, takes weeks of iteration. The building blocks are simple. The engineering of how they compose under real-world constraints is where the entire difficulty lies. And every single one of those decisions sits on a three-way trade-off that defines the entire craft of building production scale AI systems.

---

## Solving the Trilemma: Cost × Latency × Performance

Every production AI system ends up running into the same three-way tradeoff:

> **Cost × Latency × Performance**

- **Pick one** — Easy. Want the best quality? Use the most powerful model, give it unlimited context, let it reason as long as it needs.
- **Pick two** — Achievable with careful engineering. Want high quality at low cost? Run a strong open-source model and accept higher latency. Want low latency and high quality? Pay heavily for provisioned throughput on a frontier model.
- **Pick all three** — That's where things get hard (sometimes really hard).

Users expect relevant results (performance), immediately (latency), and your CFO expects you to do it as cheaply as possible (cost). And when you're competing with mature experiences like the Flipkart native app flow, or with products built by frontier model providers like ChatGPT or Gemini, you don't get to choose two. The bar is high across all three.

Let me walk through each axis, and then the kinds of decisions that sit at their intersections so that the answer to what do I do is easier :)

---

## What Does "Good" Even Mean?

If you're coming from traditional product development, your instinct is to think of quality as binary: the output matches the spec, or it doesn't. In AI products, that mental model breaks on day one.

LLMs are probabilistic systems. The same input can produce different outputs depending on sampling, temperature, model version, or — and this is the fun part — factors you genuinely cannot fully predict. You're not verifying logic anymore. You're measuring behaviour distributions. Traditional QA doesn't have a framework for this; you have to build your own.

**One response. Twelve ways it can be wrong.** When we started building evals for SLAP, we thought relevance was one thing. It isn't. We quickly found at least three distinct dimensions: *product relevance* (is each individual item shown actually relevant to what the user asked?), *slate relevance* (does the overall result set feel right as a collection — and no, you can't derive this by averaging individual product scores, it's a perceptual metric), and *response relevance* (is the generated text actually answering the question, or is it generic filler that sounds plausible?).

And then it keeps going: tonality, verbosity calibration across different query types (a factual question needs a short answer; a comparison question needs structure), hallucination detection, factual accuracy against your actual catalog data. Each of these is its own eval dimension with its own measurement challenges.

**The control-intelligence trade-off.** This one took me a while to internalise. If you heavily constrain the LLM — rigid instructions, strict templates, heavy guardrails — variance goes down, but so does flexibility. At some point the system starts resembling a rule-based pipeline and you genuinely start wondering why you needed an LLM at all. Loosen the constraints, and user experience gets better, but error rates climb and hallucination risk rises. You're constantly deciding how much intelligence you want versus how much control you need. There's no right answer — just a dial you keep adjusting based on what production traffic is telling you.

**And then there's vibe.** I've saved this for here because after two-plus years of building eval frameworks, this is the one dimension I still can't fully formalise. We've built pretty robust quantitative evals across all the dimensions above. But there's always a residual — a subjective quality where one version of a prompt just *feels* better to interact with, even when the scores are comparable. Users prefer it. Internal testers prefer it. The eval framework can't explain why.

Our approach: quantitative framework for objective measurement, plus a panel of high-taste testers (internal teams and a few external folks) doing blind preference testing between versions. We literally call it the "vibe-check." The quant eval gets you to the right neighbourhood. The human vibe-check gets you to the right house. Not elegant, doesn't scale infinitely, but pretending quantitative evals fully capture quality is a lie that leads you to ship worse products.

---

## The ₹ Per Conversation Problem

At prototype scale, LLM cost is a rounding error. At production scale, it's a P&L line item your finance team reviews quarterly — or you as a program lead worry about every day, sometimes more than building itself.

The simple math is: **active users × tokens per interaction × model price per token.** But the visible cost is just the start. Hidden multipliers compound fast: multi-step agent flows (each step is another LLM call), retrieval pipelines, guardrail revalidation, fallback models, retry logic, safety checks, logging and observability overhead, and dedicated GPU/TPU capacity if you need SLA guarantees. In early-stage products, VC subsidisation hides all of this. At scale, margin becomes the real constraint — and every extra tool call, every retry, every unnecessary token of context adds up into meaningful business problems.

**Provisioned throughput vs. pay-as-you-go** — this is one of those decisions that sounds like a boring infrastructure call but has massive product implications. Provisioned capacity (PTUs in the OpenAI world, GSUs in Google's) gives you discounted per-token costs, guaranteed availability, and predictable latency. All of these are critical when you're building for millions of users and a rate-limit error or latency spike during peak hours is not an acceptable outcome. Pay-as-you-go is more flexible and cheaper at low volumes, but at scale it's pricier, and — here's the part people miss — your request might be served from a Mumbai deployment or routed to Singapore depending on load. That routing difference alone can add hundreds of milliseconds. For a user-facing conversational product, that's the difference between feeling snappy and feeling sluggish.

What we found works best is a hybrid: provisioned throughput sized to your average load, pay-as-you-go as overflow for peaks and bursts. You minimise waste from over-provisioning while keeping your baseline experience reliable. `[PRINCE: if you can share a rough split — "provisioned for ~X% of peak" or "hybrid saved ~Y% vs. pure PAYG" — it becomes a concrete reference point]`

**The vendor lock-in trap.** Provisioned throughput means commitment, and commitment means lock-in. Which is dangerous when the state of the art changes every quarter. We experienced this firsthand: we'd committed to a specific model for an image-understanding use case, and then Google I/O happened and two new models instantly outperformed what we were locked into. The commitment became an anchor, not an asset.

The lesson I took away: optimise for optionality, not just unit economics. Shorter contract terms, abstraction layers between your app logic and model APIs, and — critically — maintaining the ability to run evals across multiple providers without needing a rewrite. The cheapest model today might be the wrong model next quarter. `[PRINCE: comfortable naming the specific image use case — "visual search" / "virtual try-on"? Adds specificity]`

---

## 4 Extra Seconds for 15% Better Quality. Worth It?

Latency is the axis that kills you quietly. Users don't complain about latency in feedback forms — they just leave.

AI systems are inherently slower than traditional APIs. Autoregressive token generation is sequential. Larger models have higher inference time. Tool orchestration adds round trips. Retrieval adds vector search overhead. And the kicker: every "smarter" feature you add — reflection loops, re-ranking, multi-agent chains, safety re-checks — is also a latency cost.

The rough thresholds we've observed: ~200ms for search suggestions, ~1 second for direct answers, ~3 seconds before users start perceiving the system as slow. Beyond that, drop-off increases sharply. And that's for simple queries. For agentic flows where you're calling multiple tools sequentially, you're already fighting physics before you've even thought about the response generation step.

The question you end up asking yourself constantly: *is this interaction worth x extra seconds for a y% quality gain?* Sometimes yes. Often no. And those calls are product decisions, not engineering decisions — which is why I think the PM role on AI products is fundamentally different from traditional PM work (but that's a whole separate post). Most of the decisions I have to take lately are around these choices.

---

## What I Actually Do All Day

The trilemma isn't just a conceptual framework — it's the lens through which every real architectural decision gets made. Let me walk through some of the big ones which don't matter a lot when you build prototypes but do when you build scaled production AI systems.

### Orchestration: Choosing a Framework (and Why It Matters More Than You Think)

The agent ecosystem is evolving extremely fast. Today the market includes frameworks like **Google ADK, Microsoft AutoGen, LangChain, LangGraph, CrewAI,** and probably ten others that launched since I started writing this post. You can also build your own — and for many production systems, that may end up being the right call.

In our context we spent a full week with senior-most product and engineering folks in a room, brainstorming and laying down our requirements (current and future), evaluating frameworks even before writing a single line of product code just to decide our preferred mode of orchestrating this agentic workflow. The choices are plenty and each have their pros and cons. Ultimately the decision comes down to what fits your needs best today while still leaving room for future evolution.

We looked at the problem across multiple dimensions: **capabilities on offer, ease of adding new capabilities later, developer experience (and the expertise our team already has), vendor lock-in risks, deployment and scaling complexity**, and the flexibility of orchestration patterns supported. For example: can it support **reactive agents, deterministic workflows when needed, and parallel agents when tasks can be decomposed?** Can agents call tools easily? Does it support **MCP, A2A protocols, or custom LLM integrations**?

Equally important were production considerations. How does the framework handle **context management, memory and state persistence, guardrails and safety**, and debugging when something inevitably goes wrong? Can you **trace a single user request across multiple agents, tool calls, and reasoning steps**? Does it support **parallelisation, remote agents, or multi-deployment setups** if the system needs to scale to millions of users?

The things that actually matter in evaluation, and that most "framework comparison" posts never cover, show up only when you think about production systems. Can it handle **partial failures in multi-agent flows**? What is the **observability story**? And crucially, what is the **token overhead**?

Every framework injects system context into the prompt: agent descriptions, tool schemas, routing instructions, execution traces. At small scale this looks negligible. But at millions of requests per day, a framework that adds **500 tokens per request versus one that adds 2,000** becomes a very real infrastructure cost difference.

Hope you get the jist and we haven't even started yet!

### Single Agent vs. Multi-Agent: The Context-Control Trade-off

A single agent gives you maximum context coherence: one entity that sees everything, no handoff overhead, no routing errors. The downside is obvious — as complexity grows, you're stuffing more tools, more instructions, more context into a single prompt. Cost goes up, latency goes up, and eventually performance degrades as the model struggles to attend to everything at once. As with many others building in this space, we went through the same journey: we started feeling our Agent become less "smart" as we progressed.

Multi-agent distributes responsibility but creates coordination overhead and adds complexity on multiple things you need to manage. Here's a reference example from building SLAP: A user asks: "What's the battery life of the iPhone 15?" In a multi-agent setup, you might have a search agent and a product specialist agent. If the query lands at the search agent first (which it might — "battery life of iPhone 15" pattern-matches to a search query), it'll try answering using its search tool. That produces a generic web-style result instead of structured product data. Wasted tool call, wasted inference, added latency, worse answer. The obvious fix: hand off to the agent which handles product queries. But now you've added a full agent hop — another LLM call just for routing, plus the specialist needs to re-process the query and make its own tool call. You've traded one wasted call for two additional calls.

The subtler optimisation — the one you arrive at after watching user query patterns — is realising ~30% of search queries eventually need product specs. So you give the search agent a lightweight product tool covering the most commonly asked specs (battery, display, processor, price), while the deep specialist handles narrow queries about warranty, delivery, compatibility. This isn't designed on a whiteboard. It's discovered through observability data and iterated toward.

### Model Selection: Not One Decision But Five

Which provider? Which tier? Single model or a mix across your pipeline? And the thing nobody warns you about: **prompts are not portable across models.** A prompt optimised for Gemini 2.5 Flash will behave differently on Claude Sonnet, even with identical instructions. Different default behaviours, different sensitivity to formatting, different interpretations of ambiguity. Model migration is never a config change — it's a prompt rewrite and a full eval cycle and then some trade-offs.

Many production systems end up using **model cascading**: cheap/fast model for the first pass, frontier model as a fallback for edge cases, with confidence-based routing between them. Powerful pattern, but the routing logic itself needs evaluation — and misrouted queries compound errors in fun and exciting ways.

### Prompt Engineering: Science, Art, and a Lot of Pain

Getting to 80% quality with a prompt is straightforward. The remaining 20% follows a power-law of diminishing returns, and it's where you'll spend the majority of your prompt engineering effort.

The core tension: **specificity improves compliance but degrades general intelligence.** Write extremely specific rules for every edge case, and you end up with a prompt that's thousands of tokens long. That costs more per request, adds latency, and — here's the counterintuitive part — actually makes the model *worse* because its finite attention gets spread too thin. Adding a rule for edge case X can cause silent regression on previously-handled case Y.

But keep the prompt generic, and the LLM exercises too much of its own judgment. Models are opinionated — they have default behaviours and biases that emerge when instructions are vague. "Be helpful" means wildly different things to different models, and none of them will default to exactly the behaviour your product needs.

I've been telling my team lately: prompt writing is as much a science as an art. The science part is getting more documented. The art part — knowing what to include, what to leave out, and how much room to leave for the model's own intelligence — is still very much being figured out and is very contextual to what you are building.

One more thing: in production, prompt changes are deployments. They need version control, peer review, and automated regression testing against your golden set. A prompt change that improves comparison queries can silently degrade factual queries, and without comprehensive golden set coverage across query types, you won't catch it until users complain. One such wild instance: we asked the LLM to respond to comparison queries in a tabular format, and it completely lost the plot — started informing the user of all internal actions: "I am now hitting Search tool, now I am transferring to Product Agent..." We never could figure out the why!

---

## Evals: Harder Than Building the Product, Sometimes

Every AI guide says evals are important. "What you can't measure, you can't improve." True. Also completely insufficient as guidance for actually building one.

### It's Never a One-Shot Build

You will not sit down, design an eval framework, build it, and move on. Evals are a living system that evolves with your product. Ours has gone through at least 4 major iterations and we're still improving it. The process starts by getting every stakeholder you can — business, product, engineering, data science, and ideally actual users together and interrogating what "good" means for the current version. Not good in the abstract. Good for the thing you just shipped, rough edges and all.

### The Golden Set Problem

This is one of the hardest parts and almost nobody talks about it properly. You need a static, curated set of queries — a "golden set" — that you benchmark every pipeline change against. New model? Run the golden set. Prompt change? Run the golden set. Tool contract update? Run the golden set. Without it, you're evaluating in the dark.

Building a good one is deceptively hard. Few whys:
- **Representativeness**: your users can type anything — the input space is infinite. A random sample over-represents head queries and misses the long tail, which is exactly where your system breaks.
- **Ground truth**: for each query you need an ideal response, and generating those requires senior product judgment, not just annotation teams — because the calls about what constitutes "ideal" are product decisions.
- **Maintenance**: your product evolves, your catalog changes, your response format changes and even your understanding and hence the requirement changes. Ground truths decay over time. Keeping the golden set current requires active, ongoing investment that most teams underestimate.

---

## The Debugging Dashboard I Wish Someone Had Told Me to Build on Day One

Before building AI products, I had mentally filed "observability" as a concern for infra and platform teams. I cared about product analytics — DAU, conversion funnels, session metrics. Observability was someone else's problem.

In AI products, observability becomes a core product capability. Here's why: LLMs are non-deterministic. The same request hit twice won't give you the same response. If a user reports a bad response and you didn't capture the full trace at the time it happened, that information is gone forever. You cannot reproduce the bug by replaying the request.

What production-grade observability actually looks like: full request tracing (the raw input through every agent decision, every tool call with exact I/O, every LLM call with the full prompt and response, all timestamped for latency analysis), conversation-level debugging across multi-turn sessions, and automated and on-demand anomaly flagging for hallucinations, agent routing loops, and tool failures that the model quietly confabulates around instead of surfacing.

One of the first tools I vibe-coded internally was a debugging dashboard: enter a conversation ID, see the complete trace — every agent decision, every tool input/output, latency per step. Being able to identify faulty cases and push them into a pipeline that feeds back into our eval set has been one of the highest-leverage investments we made. Evals improve way faster when they're fed by real production failures instead of synthetic test cases.

`{Add Screenshot/GIF of the SLAP Debug Tool}`

---

## Making It Cheaper Without Making It Worse

This is where a lot of the day-to-day grind lives. The trilemma means you can't just "reduce cost" — every cost lever pulls on latency or performance or both. But there are patterns that, done carefully, let you move the needle on cost without giving back too much on the other two axes. Here are the ones that have been most impactful for us.

### Context Engineering

This might be the single highest-leverage cost lever that most teams under-invest in. Every token you send to the LLM costs money and adds latency. At scale, the question isn't just "what context does the agent need?" — it's "what is the *minimum* context the agent needs to do its job well?"

In a multi-agent setup, this means being very deliberate about what each agent sees. The search agent doesn't need the full conversation history — it needs the current query and maybe the last clarification turn. The product specialist doesn't need the search results the user already rejected. Every agent should receive a tailored context window: enough to do its job, nothing more.

This extends to retrieval too. If you're pulling context from a knowledge base or product catalog, the naive approach is to stuff everything the retriever returns into the prompt. The smarter approach is to compress and filter retrieved context before it hits the LLM — summarise long product descriptions, strip irrelevant metadata, rank chunks by relevance and only pass the top-k. The cost and latency savings from this alone can be dramatic, especially on queries where the retriever returns 10+ chunks and the LLM only actually needs 2-3 to answer well.

`[PRINCE: if you can share a rough before/after — "trimming agent context reduced tokens per request by ~X%" or "retrieval compression cut cost on retrieval-heavy queries by ~Y%" — it would hit hard here]`

### Moving Tasks to Fine-Tuned SLMs

This is the big one. Not every task in your pipeline needs a frontier model. Intent classification, entity extraction, query reformulation, language detection, simple slot-filling — these are tasks where a fine-tuned small language model (SLM) can match or beat a general-purpose frontier model, at a fraction of the cost and latency.

The economics are stark: a well-tuned 7B or 8B parameter model running on your own infrastructure can be 10-20x cheaper per request than a frontier API call, with latency often measured in tens of milliseconds rather than seconds. And because it's your model on your infra, you get predictable latency, no rate limits, and no vendor dependency.

The catch — and it's a real one — is the investment required. You need training data (which usually means labelling, which means time and product judgment), infrastructure for training and serving, and an ongoing eval pipeline to make sure the SLM doesn't drift or degrade as your product evolves. It's not a weekend project. But for high-volume, well-defined tasks, the ROI is hard to beat.

The pattern we've seen work: start with a frontier model for everything, use production traffic and your observability pipeline to identify tasks that are high-volume and low-complexity, collect labelled examples from production, fine-tune an SLM, and A/B test it against the frontier model on that specific task. When it matches on quality and wins on cost and latency, swap it in. `[PRINCE: comfortable sharing which task(s) you moved to SLMs first — intent classification? entity extraction? Even naming the category helps]`

### Caching: More Layers Than You'd Think

Caching in AI systems isn't one thing — it's at least four distinct strategies, each targeting a different part of the pipeline.

**Implicit caching (provider-level):** Most major model providers now offer some form of prompt caching — if a large portion of your prompt (system instructions, tool schemas) is identical across requests, the provider caches the KV computations and charges you less for the repeated prefix. This is essentially free money if your prompts have a stable prefix, which in production they almost always do. The savings can be significant: Google's context caching, for instance, charges cached input tokens at a fraction of the standard rate.

**Explicit response caching:** For queries that recur frequently with near-identical context — think "what's the return policy" or "track my order" — you can cache the full LLM response and serve it directly without hitting the model at all. The key is defining your cache key carefully: it needs to be specific enough that you're not serving stale or wrong answers, but broad enough that you actually get cache hits. Query normalisation (lowercasing, synonym mapping, stripping filler words) helps here.

**Semantic caching:** A step beyond exact-match caching. You embed incoming queries and check similarity against a cache of recent query-response pairs. If a new query is semantically close enough to a cached one (above a tuned similarity threshold), you serve the cached response. This catches paraphrases and minor variations that explicit caching misses. The trade-off is precision — set the similarity threshold too low and you serve wrong answers; set it too high and you get very few cache hits. This needs careful tuning and ongoing monitoring.

**Tool response caching:** Often overlooked but high-impact. Many tool calls return data that doesn't change frequently — product specs, pricing, inventory status (at a reasonable staleness tolerance), policy documents. Caching these tool responses means the agent can access the data without a fresh API call, saving both latency and cost. The challenge is staleness management: you need TTLs that are appropriate for each data type (product specs can be cached for hours; price and stock might need minutes).

The compounding effect of layering these is real. Provider-level caching reduces your per-request cost floor. Explicit and semantic caching eliminate entire LLM calls for common queries. Tool caching cuts latency and cost within the calls that do hit the model. Together they can meaningfully shift your cost curve without touching model quality at all.

### Streaming and Parallelisation

Two patterns that are less about cost reduction and more about making the same cost feel faster — which, in a user-facing product, is functionally the same thing.

**Streaming** partial responses to the user is table stakes at this point. It doesn't reduce actual time-to-complete, but it dramatically changes perceived responsiveness. If you're not doing it already, start.

**Parallelisation** is about identifying steps in your pipeline that don't depend on each other and running them concurrently. Intent classification and retrieval can often run in parallel. Multiple tool calls that are independent of each other can be fired simultaneously. In agentic flows where the orchestration is sequential by default, auditing for parallelisation opportunities can be a good optimisation lever, sometimes shaving full seconds off end-to-end response time. In our implementation the first thing we parallelised is Search tool calls.

### Token Budgeting

Simple idea, surprisingly effective. Cap output length based on task type. A factual answer ("What's the battery capacity of iPhone 15?") doesn't need 500 tokens. A comparison response might need 300. Setting max_tokens intentionally per query type — rather than using a single generous default — saves more money than you'd expect, and it often improves response quality too because the model is forced to be concise rather than padding.

## So What's the Actual Job?

Building AI products at scale is not a harder version of building demo AI products. It's a fundamentally different activity (atleast I think so!)

You're not just designing prompts. You're deciding which agent gets what context, how to fail when the LLM confidently makes things up, how to keep your per-conversation cost from spiraling, how to shave 2 seconds off a response without losing quality — and doing all of that simultaneously, while the ground keeps shifting under you.

The real craft is finding the equilibrium where performance is good enough, latency feels responsive, and cost scales sustainably. That point shifts constantly: with every model update, every product change, every new class of user query you didn't anticipate. The rebalancing never stops. That's not a phase of building the product. That is the product.

Nobody's weekend project prepared them for this. The prototype taught you what to build. Production taught you everything you didn't know you didn't know. If you're in the middle of it, you know exactly what I'm talking about. If you're about to start : well, now you know what's coming :)

*I build AI products at Flipkart and vibe-code for fun at [princejain.me](https://princejain.me). If you're navigating these trade-offs at scale and want to swap notes, I'm always up for it.*
