/**
 * PolyChat Configuration
 * API Keys for LLM providers
 * 
 * This file contains the default Groq API key.
 * OpenAI and Google API keys will be provided by users through the UI.
 */

// Default Groq API key - enables the tool to work out of the box
const DEFAULT_GROQ_API_KEY = "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";

// API Key settings namespace
const PolyChatConfig = {
  // Get API keys - either from localStorage or defaults
  getApiKeys: function() {
    return {
      groq: localStorage.getItem('polychat_groq_key') || DEFAULT_GROQ_API_KEY,
      openai: localStorage.getItem('polychat_openai_key') || '',
      google: localStorage.getItem('polychat_google_key') || ''
    };
  },
  
  // Save API key to localStorage
  saveApiKey: function(provider, key) {
    localStorage.setItem(`polychat_${provider}_key`, key);
  },
  
  // Reset API key to default (only applicable for Groq)
  resetApiKey: function(provider) {
    if (provider === 'groq') {
      localStorage.setItem('polychat_groq_key', DEFAULT_GROQ_API_KEY);
      return DEFAULT_GROQ_API_KEY;
    } else {
      localStorage.removeItem(`polychat_${provider}_key`);
      return '';
    }
  }
};
