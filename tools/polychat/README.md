# PolyChat API Key Setup Guide

This document explains how to securely set up API keys for the PolyChat tool using GitHub Secrets.

## GitHub Secrets Setup

PolyChat requires API keys from three providers: OpenAI, Groq, and Google. Follow these steps to set them up securely:

1. Go to your GitHub repository settings
2. Navigate to "Settings" → "Secrets and variables" → "Actions"
3. Add the following secrets:
   - `OPENAI_API_KEY`: Your OpenAI API key
   - `GROQ_API_KEY`: Your Groq API key
   - `GOOGLE_API_KEY`: Your Google API key (for Gemini)

## How It Works

When your site is built via GitHub Actions:

1. The workflow automatically creates an `api-config.js` file with your API keys from GitHub Secrets
2. This file is not committed to the repository (it's in .gitignore)
3. The keys are injected only during the build process

## Local Development

For local development:

1. Create a local copy of the API configuration file:
   ```
   cp assets/js/api-config.js.example assets/js/api-config.js
   ```
2. Edit `api-config.js` and add your personal API keys
3. Don't worry about accidentally committing these keys - the file is in `.gitignore`

## Supported Models

PolyChat supports multiple models from different providers:

### OpenAI (ChatGPT)
- gpt-4o-mini
- gpt-4o

### Groq
- llama-3.1-8b-instant
- llama-3.1-70b-versatile
- deepseek-r1-distill-llama-70b
- mixtral-8x7b-32768

### Google (Gemini)
- gemini-1.5-flash
- gemini-2.0-flash-thinking-exp-01-21
- gemini-2.0-pro-exp-02-05

## Security Considerations

While this approach is more secure than hardcoding API keys in your repository, please note:
- API keys will still be visible in your compiled JavaScript on the client side
- Consider implementing rate limiting or using backend proxies for production use
