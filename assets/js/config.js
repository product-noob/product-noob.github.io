/**
 * PolyChat Configuration
 * API Keys for LLM providers
 */

// DO NOT store actual API keys in the repository code
// Keys should be entered by users through the interface
window.openaiApiKey = "";
window.googleApiKey = "";
window.groqApiKey = "";

// Load from localStorage if available
try {
  if (localStorage.getItem('polychat_openai_key')) {
    window.openaiApiKey = localStorage.getItem('polychat_openai_key');
  }
  if (localStorage.getItem('polychat_google_key')) {
    window.googleApiKey = localStorage.getItem('polychat_google_key');
  }
  if (localStorage.getItem('polychat_groq_key')) {
    window.groqApiKey = localStorage.getItem('polychat_groq_key');
  }
} catch (e) {
  console.warn('Failed to load API keys from localStorage:', e);
}
