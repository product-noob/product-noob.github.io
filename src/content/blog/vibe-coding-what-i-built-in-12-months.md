---
pubDate: '2026-03-19'
title: "What I Built in 12 Months of Vibe Coding as a PM"
description: "13+ AI-built tools and prototypes, from weekend ideas to product-shaping POCs."
tags: ['AI', 'Product', 'Engineering']
featured: false
---

Over the last 12 months, I've built **13+ tools, POCs, and prototypes** using AI-assisted development. Some were weekend itch-scratchers. Some ended up influencing product strategy at Flipkart. A couple have crossed into production-adjacent territory. None of them would have existed without Cursor, Claude Code, and a willingness to just start building.

I'm a PM, not an engineer _(though I did start my career writing code for a couple of years before the product side took over)_. This isn't a tutorial or a tools listicle. It's a real log of what I built, what it changed, and what it taught me.

_Disclaimer: Some of these projects are internal to Flipkart. I've kept descriptions at a level that shares patterns without exposing specifics. The usual caveat applies - a lot of internal data and decisions have been omitted for obvious reasons._

---

## TL;DR

1. **I built 13+ tools and prototypes in 12 months using AI-assisted development.** Ranging from personal productivity scripts to strategic POCs that shaped product direction at Flipkart.

2. **The biggest unlock isn't the code. It's the speed of learning.** When you can build a working version of an idea in a day, you develop product intuition 10x faster than reading docs or attending design reviews.

3. **POCs that took a day ended up influencing months of product direction.** The SLAP demo, the conversational commerce POC, and the self-serve data tool all started as one-day builds and became alignment artifacts.

4. **Building gives you a different kind of credibility.** Engineers, data scientists, and leadership engage with you differently when you've built something yourself. It changes the quality of every conversation.

5. **The PM who can't build anything is becoming a liability.** Not because you need to write production code. But because the floor of what's expected is rising fast, and the PMs who can go from idea to working prototype in a day are operating at a different speed.

---

## Part 1: Solving My Own Problems

---

### G-Meet Summariser

**The problem:** After every product discussion, I was spending 15-20 minutes writing up notes and action items. Every single time. It felt like admin that existed only because the tooling hadn't caught up yet.

**What I built:** A [Chrome extension](https://chromewebstore.google.com/detail/chatgpt-google-meet-summa/kofkiemddfpekcadmaeheonbbkhnclhj) that ingests a Google Meet transcript and produces a structured summary: decisions made, open questions, action items with owners. One prompt, about 30 seconds of processing.

Here's a quick demo of how it works:

<div class="videoWrapper">
<center>
  <iframe 
    width="320" 
    height="180" 
    src="https://www.youtube.com/embed/8aTsvNZB7b0" 
    title="G-Meet Summariser Demo" 
    frameborder="0" 
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
    allowfullscreen>
  </iframe>
</center>
</div>

**The interesting bit:** I built this well before Google and Gemini added native AI summaries to Meet. We're talking early days, when meeting summarisation wasn't a feature anyone was shipping yet. That timing taught me a pattern that keeps repeating: if you can spot the workflow that doesn't have an AI layer yet, you can be first. I had a long runway of ahead-of-the-curve advantage before the feature shipped natively.

But the bigger lesson was about behaviour change. When note-taking was a 20-minute chore, I'd skip it for "smaller" meetings. When it became 30 seconds, I started summarising everything. Decisions that used to get lost in verbal agreements started getting documented consistently. The compound effect on team alignment was surprisingly significant.

**What it changed:** Saved ~20 minutes per meeting. More importantly, made me much more likely to _actually_ write up notes, which compounded into better alignment across my team over months.

---

### G-Chat Auto-Read

**The problem:** I was in 40+ chat spaces. The cognitive load of triaging which conversations needed my attention was genuinely exhausting. Not the content itself, just the act of deciding what to look at.

**What I built:** A [custom script](https://princejain.me/blogs/auto-reading-google-chat-messages/) that automatically marks messages as read across my Google Chat spaces. The core idea is simple: it bulk-processes unread messages so I don't have to manually open and dismiss every conversation just to clear the noise.

**The interesting bit:** The tool itself is straightforward. But the lesson it taught me was interesting: sometimes the most valuable automation isn't the smartest one. It's the one that removes a specific, recurring friction point. I wasn't building an AI-powered triage system. I was solving the much simpler problem of "I have 200 unread indicators and 190 of them don't need my attention, but the cognitive cost of checking each one is real." The script handles the bulk clearing. My actual attention goes only to the conversations that genuinely need it.

It also made me think differently about how chat tools are designed. The default assumption in most messaging products is that every message deserves equal attention from the recipient. At 40+ spaces, that assumption breaks completely. The tool was a workaround for a design problem.

**What it changed:** The daily "clear my chat" overhead went from a draining background task to something that just happens. Small win, but the kind that compounds when you're doing it every single day.

---

### JIRA via Natural Language

**The problem:** Most PM JIRA management is terrible. Searching tickets, updating fields, writing descriptions from meeting notes. Constant context-switching that shouldn't exist.

**What I built:** A Claude integration that lets me manage JIRA via natural language. "Create a bug for the search ranking issue we discussed" becomes a ticket with the right fields. "Find all open P1s in the current sprint" surfaces them without opening JIRA.

**The interesting bit:** The most surprising insight was how much JIRA state I was keeping in my head that I could now offload entirely. I didn't realise how much cognitive load "remembering to update the ticket" was consuming until I stopped doing it manually. It's like the first time you use a password manager and realise you were spending actual brain cycles remembering credentials. Same feeling, applied to project management.

Second insight: natural language interfaces expose how poorly structured most JIRA projects actually are. When the model needs to create a ticket, it needs to know which project, which epic, which sprint, which labels. If your JIRA hygiene is bad, the tool struggles. Fixing the interface forced me to fix the underlying data, which was its own win.

![JIRA via Natural Language - Claude integration for ticket management](/images/vibe-coding-jira.jpeg)

**What it changed:** Most of my JIRA management is now prompt-driven. Rough estimate: 45 minutes a day reclaimed.

---

### Whispr Flow (My Version)

**The problem:** I wanted a voice-to-structured-text workflow. Record a thought while walking, get it formatted and filed. The best tool for this got blocked by IT policy. So naturally, I built my own.

**What I built:** Record audio, transcribe with Whisper API, structure and tag with Claude, file to the right place. Works for meeting notes, thought dumps, and async communication drafts. Runs locally so no IT policy issues.

![Whispr Flow - voice-to-structured-text app](/images/vibe-coding-whispr.png)

**The interesting bit:** Building this forced me to understand the actual pipeline behind "voice AI" tools. The transcription step (Whisper) is the easy part. The structuring step, turning raw speech into formatted notes with headers, action items, and tagged topics, is where 90% of the value comes from. And that step is entirely a prompting problem.

I also learned that voice-to-text workflows expose how _differently_ people think verbally versus in writing. My spoken thoughts are messier, more associative, and often more honest than what I'd type. The AI structuring step acts as a translator between how I think and how I need to communicate.

**What it changed:** Genuinely changed how I capture ideas on the go. I now have a running backlog of structured thought-dumps that I mine for blog post ideas, product hypotheses, and meeting prep.

---

### princejain.me

**The problem:** I wanted a personal website that was genuinely mine. Not a template with my name on it. Something I could iterate on quickly and use as a playground for trying new things.

**What I built:** My entire portfolio and blog at [princejain.me](https://princejain.me). Built from scratch with Astro 5, self-hosted fonts, custom design tokens, and a content pipeline for blog posts. The site you're reading this on right now.

**The interesting bit:** This is the project where AI-assisted development felt most natural. The loop of "I want the blog cards to look like this" into Cursor, seeing the result, tweaking, and shipping felt like a conversation with a very fast junior developer. I'm not a frontend engineer. But with AI pair-programming I was able to build something responsive, fast, and accessible, designed the way I wanted it.

What it also taught me: when you own the whole stack (even a simple one), you develop opinions about design and performance that are grounded in real trade-offs. Not abstract preferences, but "I chose this because the alternative added 200ms to page load." That kind of grounded thinking carries over into every product conversation.

**What it changed:** A portfolio I maintain and iterate on myself. No dependency on anyone else.

---

## Part 2: POCs That Changed Product Direction

_Every one of these took a day or less to build. Every one of them influenced weeks or months of product direction._

---

### SLAP Day 0 Demo

**The problem:** At the start of [SLAP](https://play.google.com/store/apps/details?id=com.slap.android) _(Flipkart's agentic commerce platform)_, I needed to create alignment on what we were actually building. A deck felt insufficient. Too abstract. Leadership needed to _feel_ the product, not read about it.

**What I built:** A working demo of an agentic commerce interaction. A user conversing with an AI that could search products, compare options, and simulate a purchase flow. Built in a single day using Claude and a lightweight orchestration wrapper. No production code. No backend. Just enough to make it feel real.

<div style="max-width: 300px; margin: 1.5rem auto;">

![SLAP Day 0 Demo - agentic commerce prototype](/images/vibe-coding-slap-demo.gif)

</div>

**The interesting bit:** This demo created more strategic clarity in 20 minutes than weeks of PRD review would have. Once people could interact with the product hypothesis, conversations shifted from "is this the right thing to build?" to "here's what we need to make this actually work." That's a fundamentally different conversation. The first is about conviction. The second is about execution. And the speed at which we moved from one to the other wouldn't have been possible without the ability to prototype this fast.

I've since started doing this for almost every major product bet. Before writing the spec, build the demo. It takes a day. The alignment it creates takes weeks off the planning phase.

**What it changed:** Used as the internal alignment artifact for SLAP's initial investment decision. Became the north star reference point for months of development. As I wrote in my [AI at Scale post](https://princejain.me/blogs/what-its-like-to-build-ai-products-at-scale), the gap between a prototype and production is enormous. But the prototype told us _what_ to build.

---

### QueryGPT: Self-Serve Data Access

**The problem:** I was deeply dependent on data analysts for every ad-hoc question. Want to know how query reformulation affects conversion? Write a request, wait 2-3 days, get a table. Want a follow-up? Start the cycle again.

**What I built:** A natural language interface to internal data _(inspired by [Uber's QueryGPT](https://www.uber.com/en-IN/blog/query-gpt/))_. Type a question in plain English, get a SQL query, get a result. Self-serve data access without needing to know the exact table structure. 

Here is a Gemini generated mock-up of how roughly the tool looks. (AI generated since it required a lot of masking of actual business data)

![QueryGPT - natural language to SQL interface](/images/vibe-coding-querygpt.png)

**The interesting bit:** The biggest unlock wasn't speed. It was _question quality_. When getting an answer takes 3 days, you optimise for asking one really good question. When it takes 30 seconds, you can follow threads. "What's the conversion rate for search queries?" leads to "break that down by query type" leads to "show me the long-tail queries specifically" leads to "what's the average response time for those?" In 15 minutes, I'd done an investigation that would have taken a week of back-and-forth.

My product intuition improved noticeably once I could interrogate data in real-time. Not because I'm smarter. Because the friction between "I wonder if..." and "here's the answer" dropped to almost zero.

**What it changed:** Self-serve data superpowers. Stopped being blocked by analyst queues for exploratory analysis. The pattern has since been adopted by other PMs on the team.

---

### Commerce in Minutes: Conversational Shopping POC

**The problem:** The hypothesis underlying quick commerce is "fast = better." But what if the interface itself was the bottleneck, not the delivery time?

**What I built:** A POC for commerce as a pure conversation. Describe what you need, get options, confirm, done. No browsing, no categories, no scrolling. Just a natural language transaction from intent to purchase.

**The interesting bit:** Two things surprised me.

First, the conversational interface surfaced a completely different _type_ of shopping intent. In a traditional app, you search for a product you already know you want. In a conversation, people asked for things they would never have typed into a search box. "What should I order for a low-effort dinner for two?" or "I'm hosting 8 people this weekend, help me plan snacks under 2000 rupees." These are _goal-oriented_ requests, not _product-oriented_ searches. No search box handles these well. A conversational agent handles them naturally.

Second, and this was the real "aha": stripping away the browse-and-scroll interface didn't make people feel like they had _fewer_ options. It made them feel like they had _better_ options. When the AI curates 3-4 relevant choices instead of showing you 200 results, the decision feels easier, not constrained. That was counterintuitive to everything I'd assumed about catalogue-rich commerce.

We started with the hypothesis "can we make shopping faster?" and ended up asking "can we unlock shopping intents that current interfaces can't even express?" That's a much bigger product question.

**What it changed:** Became the seed of the product vision for conversational commerce at Flipkart. One day of building, months of product direction. This is probably the clearest example in this list of why a PM who can build a POC quickly has a structurally different impact than one who writes a spec and waits.

---

### SLAP Agentic Session Tracer and Debug Dashboard

**The problem:** When you're building AI products at scale, the hardest part isn't getting the model to work. It's figuring out _why_ it didn't work the way you expected. LLMs are non-deterministic. The same request hit twice won't give the same response. If a user reports a bad answer and you didn't capture the full trace at the time, that information is gone forever. You can't reproduce the bug by replaying the request.

**What I built:** Three connected tools built on Google's Agent Development Kit (ADK):

1. **Log Tracer**: Enter a conversation ID, see the complete trace. Every agent decision, every tool input/output, every LLM call with the full prompt and response, all timestamped for latency analysis.

2. **Debugger**: A layer on top of the tracer that flags anomalies automatically. Agent routing loops, hallucinated tool responses, latency spikes, cases where the model quietly worked around a tool failure instead of surfacing the error.

3. **Annotation Tool**: A workflow for taking faulty production cases from the debugger and pushing them into our evaluation pipeline. Real production failures feeding back into the golden set, not synthetic test cases.

![SLAP Debug Dashboard - conversation trace and debugging tools](/images/vibe-coding-slap-debug.png)

**The interesting bit:** This was the most technically sophisticated thing on this list. Building on ADK meant working with agent orchestration primitives directly. Not just calling an API, but reasoning about agent state, tool invocations, and execution traces in ways most PM-built tools never get close to.

And here's the part I didn't expect: this gave me a different kind of credibility internally. Engineers who saw these tools stopped treating me as "the PM who asks questions about the system" and started treating me as someone who understood it from the inside. That changed the quality of conversations I could have about trade-offs, system design, and cost optimisation. A different kind of influence.

**What it changed:** These tools became core to how we debug and improve SLAP's AI pipeline. The annotation tool in particular has been one of the highest-leverage investments we made. As I described in my [AI at Scale post](https://princejain.me/blogs/what-its-like-to-build-ai-products-at-scale), evals improve dramatically faster when they're fed by real production failures.

---

## Part 3: The Frontier

These are experiments I'm running right now. Some are stable tools. Some are still evolving. All of them are pushing at the boundary of what I thought was possible without a formal engineering role.

---

### Production Coding via LLMs

**The problem:** The usual PM-to-code pathway ends at "prototype." I wanted to test whether AI-assisted coding could push that boundary further. Not replacing engineers. But could I make specific, well-scoped production contributions that don't need to wait for an engineering sprint?

**What I'm doing:** This is an experiment that's actively underway. I'm taking specific, well-scoped engineering tasks (performance fixes, test coverage, config changes, small feature adjustments) and attempting to ship them via AI pair-programming with Claude Code and Cursor.

**The interesting bit:** The early signs are very promising. On well-scoped tasks, the AI writes code that's often better than what I'd produce myself. The bottleneck is almost never the code generation. It's context and judgment: understanding the system well enough to verify that what was generated is correct and safe to ship. The AI writes the code. I provide the product context and the sanity check.

That division of labour actually works, but with a clear boundary. It works when I understand the codebase well enough to catch the model's mistakes. It breaks down when the scope is too broad or the change touches too many parts of the system for me to verify confidently. Knowing where that boundary is, and staying on the right side of it, is the skill I'm actively developing.

**Where this is heading:** It's too early to call this a proven pattern. But the question it's raising is interesting: maybe the constraint on PM-as-builder was never "can I write the code?" Maybe it's always been "do I understand the system well enough to be accountable for the change?" AI just made the first constraint disappear, and now we're left with the second one. That's a much more interesting problem to solve.

---

### Mini Prototypes: The Ongoing Lab

Beyond the named projects above, I maintain a running set of mini-prototypes. Small experiments that test a hypothesis or explore a capability:

- **Feed Refresh POC**: Personalised content ranking with LLM-based relevance scoring. Tested whether a model could re-rank a product feed based on conversational context better than the existing heuristic. _(Short answer: yes, but the latency cost is steep.)_
- **Image Gen Evals**: A lightweight framework for evaluating AI-generated image quality across different prompts and models. Built because I needed to make a vendor decision and "eyeballing it" wasn't going to cut it in a review.
- **Moderation Sandbox**: Content moderation classifiers tested against edge cases before production use. The edge cases are where all the interesting product decisions live.
- **Personalisation Experiments**: LLM-based approaches to user preference modelling. Can a model infer preferences from conversation history better than collaborative filtering? Still figuring this one out.

Most of these don't become products. They become **intuitions**. A hands-on understanding of what's actually possible, what's expensive, what's fast, what breaks. When someone proposes an LLM-based feature in a design review, I can respond with "that'll add ~2 seconds of latency and cost roughly X per request" instead of "sounds cool, let's try it." The former is the kind of input that actually shapes product direction.

---

## What Building Taught Me About the PM Role

Looking across everything above, a few patterns stand out.

**Speed changes the question you can ask.** When a POC takes a day instead of a sprint, you can test 5 hypotheses instead of 1. The bottleneck shifts from "can we build it?" to "what's worth building?" That second question is the actual PM job.

**Building gives you intuition that reading can't.** Every tool I've built has given me mental models that sharpen product decisions. When you've debugged a latency issue in an agent pipeline yourself, you ask very different questions in design reviews. When you've hit a caching problem firsthand, you understand the trade-off at a gut level, not just an intellectual one.

**The credibility effect is real and underrated.** This isn't about proving yourself to engineers. It's about changing the _quality_ of the conversations you can have. When people know you've built things yourself, they engage with you differently. The questions get more precise. The pushback gets more honest. The collaboration gets better.

**The PM-engineer boundary is dissolving, and that's fine.** This isn't a threat to engineers. The hard distributed systems work, the infrastructure, the production reliability, none of that is going anywhere. But the "PM who can't build anything" is becoming a liability. The floor is rising.

**Accountability matters more than code.** The real constraint on a PM building isn't technical ability anymore. It's the judgment and context to be accountable for what ships. That's a different skill than writing code. And it's the one worth investing in.

---

This started as scratching itches on weekends. It's become how I think about the job.

*If you want to compare notes on any of these, I'm on [Twitter](https://twitter.com/princejain) and [LinkedIn](https://www.linkedin.com/in/prince-jain/). Always happy to chat.*
