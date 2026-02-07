---
pubDate: '2025-04-21'
title: "PMing in the era of AI | How I use AI to supercharge my work"
description: "My thoughts on how AI is changing PMing"
tags: ['AI', 'Product']
---
I took a presentation for Flipkart PMs on **"How PMing is changing in the era of AI"** and thought I'll add a similar version of my thoughts here: 

## TL;DR | How AI is (and isn't) Changing Product Management — My Take

1. **AI isn't replacing PMs anytime soon.**  
   It's clearing out the grunt work (reducing dependency on design, dev & DS) so we can double-down on the meaningful bits (i.e. strategy decks, storytelling workshops, and—of course—endless stakeholder alignment 😅). 

2. **LLMs + no-code = days → hours.**  
   Prototyping, research, data crunching, classification, copywriting — all way faster now. All you really need is an idea, a problem or an itch you want to solve and AI will co-solve that with you.

3. **Think of AI as your co-pilot, not your replacement.**  
    It's here to help you think faster and execute smarter — not to do your job *for* you. Great prompts in = great output out. But always review, refine, and make it your own.

4. **Speed + responsibility = real success.**  
   As AI tools speed things up, PMs are also on the hook for ensuring privacy, security, and fairness. It's part of the job now.

5. **Hold on to your product intuition.**  
    AI can accelerate the *how*, but it can't replace the *why*. Your empathy, curiosity, and product taste are irreplaceable—keep sharpening them. Your instincts, empathy, and critical thinking still matter — maybe more than ever.

*AGI may change the game entirely… but until then, let's stay sharp.* 🔥

---
Here's the longer version of those who likes learning the nitty gritties: 

## 👋 Welcome to the AI-Augmented PM Era
> "Product Management is dead."  
> *Not so fast.*

Every few years, someone rings the alarm: PM is over.  
- In 2010, it was all about being *design-led*.  
- By 2015, we were *growth-led*.  
- 2020? *Data-led.*  
- And now in 2024, the buzzword of choice? You guessed it — **AI-led**.

*Every wave rewrites the rules. The smart PMs grab the pen.*   If you're still hand-writing SQL or waiting a week for hi-fi mocks, you're not just falling behind — you're missing a massive opportunity to level up.


## 🆚 Traditional vs AI-Powered Product Management

AI isn't changing *what* PMs do — it's transforming *how fast and smartly* we can do it.  
Here's a look at how my core workflows have evolved — a before vs after snapshot:


### 🔍 Research (Competitor / Feature)

**Traditional:**  
Took weeks (sometimes months) to manually dig through competitor websites, product docs, user reviews, and best practices. A slow and often fragmented process.

**AI-Powered:**  
With a single prompt into ChatGPT, I now trigger a **deep research** query that returns a detailed synthesis — competitor feature sets, pros/cons, pitfalls, best practices, and even comparison tables — all in under 15 minutes.


### 📝 Product Notes (PRDs)

**Traditional:**  
Writing PRDs used to mean juggling meetings, aligning with stakeholders, capturing edge cases, and endless rounds of iteration. Getting one finalized often took weeks.

**AI-Powered:**  
Now I brain-dump rough notes into an LLM, generate a scaffolded PRD in minutes, and iterate quickly. I also use AI to rewrite, critique, summarize, or expand my existing product docs — faster collaboration, sharper output.


### 🎨 UI/UX Prototyping

**Traditional:**  
Started with sketching UX flows on paper or in tools like Excalidraw. Then came the wait for design bandwidth. Figma prototypes were often too rigid for realistic feedback, and working engineering builds came way too late for meaningful user testing.

**AI-Powered:**  
I now use AI code editors to build interactive, demo-worthy prototypes in just a few hours. It's possible to go from idea → testable UI within the same day — a game-changer for speed and iteration.


### 📊 Data Analysis & Ops Labelling

**Traditional:**  
By far the most mundane part of PMing — remembering table names, writing SQL queries from scratch, or waiting for analytics support. Ops labelling (manual annotation, classification models, clustering) was painfully slow and resource-heavy.

**AI-Powered:**  
I now use a custom agentic SQL generator I created (inspired by [Uber's QueryGPT](https://www.uber.com/en-IN/blog/query-gpt/)) to convert plain English into accurate SQL queries. For ops labelling, clustering, and classification — LLMs do the heavy lifting, improving speed, cost-efficiency, and quality.

### ⚙️ General Productivity

**Traditional:**  
Lots of manual busywork — digging through Slack for doc links, watching entire recordings to find action items, keeping live meeting notes, or writing Jira tickets from scratch (Initiative → Epic → Story → Task).

**AI-Powered:**  
I use LLMs creatively to automate and speed up everything.  
- Built a [custom JS script](https://princejain.me/2025/05/19/Auto-Reading-Google-Chat-Messages.html) to auto-read Google Chat messages 
- Created a [Chrome extension](https://chromewebstore.google.com/detail/chatgpt-google-meet-summa/kofkiemddfpekcadmaeheonbbkhnclhj?pli=1) for meeting notes
- Built a CSV generator to bulk-create Jira tickets from natural language  

🧠 *With AI in my toolkit, I spend less time grinding and more time thinking, building, and shipping.*

---
## The 2025 AI-PM Toolkit I Recommend / Use

Here's a breakdown of the AI tools I use regularly and how they supercharge different parts of the product workflow — all in bullet format for mobile-friendliness:

- **💬 Chat & Research**  
  *Tools I ❤️:*  Gemini, ChatGPT, AI Studio (for rapid testing), Perplexity(for Search), Claude (for Code)  
  *Use case:* Deep dives, prompt-assisted ideation

- **🔌 APIs**  
  *Tools I ❤️:* OpenAI, Gemini  
  *Use case:* Embedding LLM magic into prototypes & user-facing features

- **💻 AI IDEs / No-Code Platforms**  
  *Tools I ❤️:* Cursor, Replit, Windsurf  
  *Use case:* Shipping proof-of-concepts lightning fast without heavy engineering lift

- **🎨 Design & Visuals**  
  *Tools I ❤️:* V0.dev, Lovable, Leonardo.AI  
  *Use case:* Creating UI mocks, hero images, visual concepts for decks or A/B tests

## 🧠 Mastering the Prompt: How to Talk to AI (So It Talks Back Smart)

The old saying "garbage in, garbage out" has never been more relevant. With AI, your **input is everything** — the quality of your prompt directly shapes the quality of the output. Prompting is fast becoming a **core PM skill**, right up there with writing crisp user stories or crystal-clear PRDs.

Think of prompts as the new user interface — it's how we talk to powerful models and get them to think, ideate, analyze, or build *with* us. Weak prompts = wasted time, meh results, and unnecessary frustration. Great prompts? That's your secret weapon for speed, clarity, and impact.

Here's how I've learned to get the best out of AI tools — a playbook for writing prompts that actually work:


### ✅ Best Practices for Better Prompts (What I've Learned)

- **Be Specific**  
  Set clear context. Mention exactly what you want: format (e.g., list, report, markdown), tone, length, level of detail, audience. The more precise, the better the output.

- **Show, Don't Just Tell**  
  Share example outputs. If you're asking for something creative or nuanced, include a few sample styles so the model has something to mirror.

- **Ground it with Data**  
  Feeding in actual data (CSV samples, raw feedback, product info) helps the AI respond with sharper relevance.

- **Define Output Structure**  
  Want bullet points? Subheadings? A table? Say it. You'll save yourself a ton of reformatting later.

- **Assign a Role**  
  Start with "Act as a..." — e.g., "Act as a product strategist" or "Write like a UX writer for Gen Z". This frames the tone and focus instantly.

- **Use Chain-of-Thought Reasoning**  
  For complex asks, prompt the AI to "think step by step" or "explain its reasoning". You'll get more robust and transparent responses.

- **Break Big into Small**  
  Don't overload the model. Split big problems into manageable chunks — especially helpful when writing specs, summaries, or multi-part analysis.

- **Tell It What To Do (Not What *Not* to Do)**  
  Positive instructions work better. Say "Write a concise summary" instead of "Don't be too wordy."

- **Build a Prompt Library**  
  Keep a running list of great prompts that worked for you — categorized by task (PRD writing, insight synthesis, SQL gen, etc.). Saves time and builds consistency.

---
## ⚠️ Pitfalls to Keep in Mind

Working with AI can feel magical — until it isn't. These are the key traps to watch out for, and how I keep myself grounded while using LLMs in day-to-day PM work.

- #### 🍰 Prompt Craft 101  
A good prompt isn't just a question — it's a **brief**. The golden formula:  
**Specific context + examples + desired format = chef's-kiss output.**  
Want a crisp summary? Say so. Want markdown bullets? Specify that. Want Gen Z tone? Add a style reference.  
Also: keep a running prompt library. Seriously. It'll save you time, bring consistency, and *future you will high-five past you*.

- #### 🧯 Hallucination Hazards  
LLMs can be *wildly confident* — even when they're flat-out wrong. This matters **a lot** when you're dealing with data, user research, or anything business-critical.  
Always fact-check, especially if you're using AI for analysis, summaries, or external-facing content. When in doubt, **add grounding** — tools with retrieval-augmented generation (RAG) can help bring source-based answers into the loop.

- #### 👫 Human Intuition > Algorithm  
AI can crunch, scale, and generate at warp speed — but it doesn't know your customer, your business nuance, or your gut feel. Empathy, creativity, and product taste still live with *you*. Think of AI as a co-pilot, not a replacement. You're the one with the map. 
Also, don't outsource your intuition to AI—stay in the driver's seat with AI as your co-pilot.
It's not just a tech problem — **you own the guardrails**. Use responsibly, document decisions, and keep your team (and users) protected.

- #### 🔐 Security & Ethics – Non-Negotiable  
Just because it's fast doesn't mean it's safe. As PMs, we can't treat LLMs like a black box playground — we're responsible for what goes in, and what comes out. Keep these in mind:

    - 🚫 **Don't feed in sensitive data** – Never share internal documents, customer PII, or confidential business info with public LLMs unless explicitly approved. When in doubt, redact or use dummy data.
    - ✅ **Use access controls** – Make sure tools (especially AI copilots or Slackbots) are behind MFA and scoped to the right users.
    - ⚖️ **Check for bias & explainability** – Always question how the model arrived at an answer — especially if it informs decisions or affects users.
    - 🛑 **Know your failure modes** – AI can go off the rails. Define clear fallbacks and escalation paths before deploying anything user-facing.
    - 📢 **Be transparent with users** – If you're using AI in your product, let users know. Clear disclosures build trust.

---

## So… is the PM role really changing?

Absolutely – **upwards**. Less ticket-tetris, more strategy & storytelling. Every PM will be an "AI PM" sooner than later. 


**So, What are *You* Building Next? 🚀🚀**