---
layout: post
title: "The AI Glossary Every PM Needs"
description: "A field-tested cheat-sheet to decode AI jargon when you're building the next ML-powered feature."
date: 2025-05-23
categories: [product-management, artificial-intelligence]
tags: [AI, machine-learning, LLM, glossary, product-management]
---

> _If you've sat in a meeting where the data-science team casually drops phrases like "LoRA adapters" or "beam search" and you're secretly Googling under the table – this one's for you._

I've pulled together **the AI glossary I wish I'd had** when I first started shipping LLM features. It's bite-sized (2–6 lines each), grouped by theme, and peppered with **PM-centric takes** so you know _why_ the term matters, not just what it means.

---

## 1. Anatomy of a Model

| Term | TL;DR |
|------|-------|
| **Token** | Smallest chunk of text a model understands (≈ ¾ of a word in English). Budgets matter – OpenAI, Anthropic, and friends bill you _per token_. |
| **Parameter** | A learned weight inside the network. More parameters ≠ always better, but it _usually_ means fatter compute bills. |
| **Embedding** | High-dimensional vector that captures meaning. Think of it as GPS coordinates for concepts – closer vectors = similar ideas. |
| **Latent Space** | The abstract "map" where embeddings live. Nearest-neighbour ops (cosine similarity) are the GPS look-ups. |
| **Attention / Self-Attention** | The mechanism letting transformers look at every word when predicting the next one – the secret sauce behind GPT, BERT, Llama. |
| **Context Window** | Model's short-term memory measured in tokens (4k → 128k these days). Exceed it and the oldest tokens fall off a cliff. |
| **Knowledge Cut-off** | The latest date contained in the pre-training data. Anything newer requires retrieval or post-training updates. |

## 2. Training & Tuning Soup

| Term | Why It Matters to PMs |
|------|-----------------------|
| **Pre-training** | Massive unsupervised crawl that teaches raw language patterns. Costs millions → you'll rent, not build. |
| **Fine-tuning** | Teach the base model your domain. Faster/cheaper (thousands) but risks "forgetting" original knowledge if done poorly. |
| **SFT (Supervised Fine-Tuning)** | Feed prompt-response pairs you _want_. First step in most commercial stacks. |
| **RLHF** | Reinforcement Learning from Human Feedback – humans rank answers, the model optimises for helpfulness. How ChatGPT got polite. |
| **RLAIF / RLCF** | Same idea but rewards come from AI feedback (AIF) or automated rules/content filters (CF). Cuts human cost, adds risk. |
| **LoRA / Adapters** | Lightweight matrices you bolt on the side of a model to tweak behaviour _without_ touching core weights – cheap, reversible. |
| **Mixture of Experts (MoE)** | Crowd of specialist subnetworks. A router picks which "experts" to use per token → big capacity, lower inference cost. |
| **Quantisation** | Shrink weights from 16-bit to 4-bit so the model fits on consumer GPUs / edge devices. Expect some accuracy loss. |
| **Distillation** | Train a smaller "student" to mimic a big "teacher". Great for mobile or on-device privacy sells. |

## 3. Prompt Craft & In-Context Tricks

| Term | Field Note |
|------|-----------|
| **Prompt Engineering** | Crafting inputs for reliable output. Still 80% art, 20% science (and lots of copy-paste experiments). |
| **System / User / Assistant Roles** | Three message types in OpenAI-style chats; system sets the stage, user asks, assistant answers. |
| **Zero-Shot / Few-Shot / Many-Shot** | How many examples you stuff into the prompt. More shots → better quality → larger token bill. |
| **In-Context Learning (ICL)** | Model "learns" from examples in the prompt _on the fly_ – no weight updates. Powerful but context-window hungry. |
| **Chain-of-Thought (CoT)** | Ask model to reason step-by-step ("Let's think"). Boosts accuracy on maths/logic, increases token count. |
| **Tree-of-Thought / Graph-of-Thought** | CoT's nerdy cousins exploring multiple reasoning paths before picking the best answer. Slower, smarter. |
| **ReAct** | Combine reasoning (_R_) + acting (_Act_) – model decides, calls tools/APIs, and explains itself. Backbone of autonomous agents. |
| **Temperature** | Randomness knob (0 = deterministic, 1 = creative). Pair with **Top-p** (nucleus sampling) for flavour control. |
| **Top-k / Top-p** | Filters candidate tokens before sampling. Lower values → safer, higher → more diverse. |
| **Stop Sequences** | Tokens that tell the model "time's up". Prevents it from babbling or leaking internal instructions. |

## 4. Retrieval & Memory

| Term | Use-Case |
|------|---------|
| **RAG (Retrieval-Augmented Generation)** | Fetch relevant docs via embeddings, feed them into the prompt – kills hallucinations, keeps models fresh. |
| **Vector Database** | Special DB (Pinecone, Weaviate, Qdrant) that indexes embeddings for fast similarity search. |
| **Hybrid Search** | Combine lexical (BM25) + vector search → balances exact keyword matches with semantic recall. |
| **Memory / Long-Term Memory** | Storing past chats or embeddings so the agent "remembers" previous user context across sessions. |

## 5. Decoding & Inference

| Term | Cheat Sheet |
|------|-------------|
| **Greedy Decoding** | Always pick highest-prob token – fast, factual, can be dull or repetitive. |
| **Beam Search** | Explore several high-prob token paths, pick best overall – higher quality, slower, risk of blandness. |
| **Sampling** | Pick tokens stochastically using temperature/top-p – adds creativity. |
| **Latency** | Time from request to first byte. Directly impacts user satisfaction; optimise with caching, streaming, smaller models. |
| **Throughput** | Requests per second your stack can handle. Key for pricing and SLAs. |

## 6. Safety, Ethics & Ops

| Term | Quick Take |
|------|-----------|
| **Hallucination** | See above – your legal team's nightmare. Mitigate with RAG or human review. |
| **Guardrails / Content Filters** | Rule-based or ML layers gating prompts & outputs (ex: profanity, PII, jailbreak attempts). |
| **Jailbreak** | Crafty prompt that makes the model ignore its safety rules ("DAN" anyone?). Constant cat-and-mouse game. |
| **Red Teaming** | Intentionally probing models for failures or unsafe behaviour before launch. Do this early. |
| **Alignment** | Ensuring outputs match human values & intent. An evolving research field that isn't solved yet. |
| **Constitutional AI** | Train with a written "constitution" of principles instead of (or in addition to) RLHF. Fewer humans, more transparency. |
| **Content Moderation** | Classify and filter user-generated content. Can run pre-prompt, post-response, or both. |

## 7. Emerging Buzzwords You'll Hear This Quarter

| Term | What to Know |
|------|--------------|
| **Function Calling / Tool Calling** | Models output JSON that maps to your backend functions – lets ChatGPT book flights or run SQL safely. |
| **Agents** | Autonomous loops that plan, call tools, and iterate until a goal is met. Amazing demos, still flaky in prod. |
| **Multimodal LLM** | Handles text **and** images (and soon video, audio). Unlocks features like screenshot Q&A or product-image tagging. |
| **Sparse Expert Models** | Fancy name for MoE with routing sparsity >90%. Better efficiency on GPU inference. |
| **Compute-Time Scaling** | Let the model "think" longer (more inference steps) to boost quality without retraining. |
| **Speculative Decoding** | Draft with a small model, verify with a big one – cuts latency ~2× while preserving quality. |
| **Retriever Mix** | Blend multiple retrieval strategies (keyword, vector, graph) for robust RAG pipelines. |

---

### Final Thought

Like any buzzword bingo card, this glossary will evolve faster than my weekend side-projects. **Bookmark it, steal it, share it** – and the next time someone brags about their "sparse MoE with speculative decoding," you'll have the receipts. 😉

_Have a term I missed?_ Drop me a note and I'll keep the list growing. 