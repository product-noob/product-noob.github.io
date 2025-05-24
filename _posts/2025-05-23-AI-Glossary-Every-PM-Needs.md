---
layout: post
title: "The AI Glossary Every PM Needs"
description: "A field-tested cheat-sheet to decode AI jargon when you're building the next ML-powered feature."
date: 2025-05-23
---

> _If you've sat in a meeting where the data-science team casually drops phrases like "LoRA adapters" or "Multi-modal vector search" and you're secretly Googling under the table – this one's for you._

So, I pulled together **the AI glossary I wish I’d had** when I first started shipping LLM features. It’s bite-sized, grouped by themes, and packed with PM-centric takes — not just what a term means, but *why* it matters and where you’ll run into it.


### Anatomy of a Model

- **Token**: The smallest unit of text a model processes — roughly three-quarters of a word in English. Tokens drive costs (you’re billed per token) and shape context limits, so knowing how they work is critical for budgeting and prompt design. Try GPT Tokeniser [here](https://platform.openai.com/tokenizer).

- **Embedding**: A high-dimensional vector that captures the “meaning” of a word, sentence, or document. Think of it as a GPS point for concepts — closer embeddings mean more similar meanings. Used everywhere: search, recommendations, retrieval.

- **Attention / Self-Attention**: The mechanism that lets transformers (like GPT, BERT) “look” at every word in a sentence to figure out which ones matter most. This is what gives LLMs their power to understand complex patterns and relationships.

- **Context Window**: The short-term memory of a model, measured in tokens. Go past the window (e.g., 4k, 16k, 128k tokens) and older inputs get dropped — which matters a lot when crafting long prompts or multi-turn conversations.

- **Inference**  
  This refers to the process of *running* a trained model to generate predictions or outputs. While training happens once (and is compute-heavy), inference happens every time you prompt the model — and directly affects latency, cost, and scale.

- **Prompt Injection**  
  A security attack where malicious users manipulate the prompt (often hidden inside user input) to make the model behave in unintended ways, like leaking internal instructions or bypassing safeguards. Important for any PM shipping LLM features.


### Training & Tuning

- **Pre-training**: The massive, unsupervised process where a model learns general language patterns from huge data dumps. This is why base models cost millions to train — most teams rent, not build.

- **Fine-tuning**: Adding domain-specific knowledge by training the base model further on your data. Faster and cheaper than pre-training, but tricky — overdo it, and the model “forgets” what it knew before.

- **LoRA (Low-Rank Adaptation)**: Lightweight adapters that let you tweak a model’s behavior without touching its core weights. Cheap, reversible, and increasingly popular for domain-specific tasks.

- **Quantisation**: Compressing model weights (from, say, 16-bit to 4-bit) to make models run on smaller, cheaper hardware like edge devices. Expect some trade-off in accuracy.


### Prompt Craft & In-Context Tricks

- **Prompt Engineering**: The art (and emerging science) of writing effective prompts to guide AI output. Great prompting can double your model’s usefulness — and yes, you’ll probably spend hours testing variations.

- **Chain-of-Thought (CoT)**: Asking the model to explain its reasoning step by step. This improves accuracy on logical and math tasks but comes with a higher token cost.

- **ReAct (Reasoning + Acting)**: A hybrid prompting approach where the model thinks *and* calls tools/APIs, making decisions as it goes. This is the backbone of many autonomous agents.

- **Temperature**: A setting that controls randomness in model outputs. Lower (e.g., 0) means deterministic, reliable responses; higher (e.g., 1) increases creativity but risks going off-script.


### Retrieval & Memory

- **RAG (Retrieval-Augmented Generation)**: Combines a model’s generative ability with a live search over external documents or databases. This reduces hallucinations and keeps outputs up to date — key for anything where accuracy matters.

- **Vector Database**: A specialized database (like Pinecone, Weaviate) that stores embeddings and supports similarity search. This powers semantic search, recommendations, and RAG pipelines.

- **Hybrid Search**: A combo of traditional keyword (BM25) and vector search. Helps balance exact matches with meaning-based recall, improving the relevance of search results.


### Safety, Ethics & Guardrails

- **Hallucination**: When the model confidently outputs false or made-up information. This is your legal and trust nightmare — fact-check anything user-facing or mission-critical.

- **Guardrails / Content Filters**: Systems that block or flag harmful or inappropriate prompts and outputs. These should be baked into your product from the start, not bolted on at the end.

- **Red Teaming**: Intentionally testing your system for failures, exploits, or unsafe behavior before launch. Yes, you need to do this.

- **Alignment**: The research effort to make sure AI outputs align with human values and intent. Still an unsolved challenge, but one you should be aware of when working with cutting-edge systems.


### Practical PM Advice

Never, ever feed sensitive company data, PII, or confidential documents into public LLMs unless you have explicit approval. These models don’t “forget,” and once data is in, you can’t pull it back.  

Use strong access controls, enforce MFA, and limit tool scopes when integrating AI into your workflows. Just because you *can* connect a Slackbot to an LLM doesn’t mean you should — think about where the data flows and who can see it.

Remember, AI is here to **amplify** your work, not replace your judgment. You bring the empathy, creativity, and product taste — the model brings the speed and scale. Keep that partnership clear, and you’ll stay in control.


Like any good buzzword bingo card, this glossary will keep evolving. Bookmark it, steal from it, and the next time someone brags about their “sparse MoE with speculative decoding,” you’ll be ready. 😉

_Have a term I missed? Ping me — I’ll keep the list growing!_