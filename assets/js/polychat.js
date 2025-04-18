/**
 * PolyChat - LLM Chat Interface
 * 
 * A versatile chatbot interface that allows interaction with various LLM providers
 * such as OpenAI's ChatGPT, Groq, and Google's Gemini.
 */

// Get API keys from PolyChatConfig (config.js)
let apiKeys = PolyChatConfig.getApiKeys();

// Function to check if API key is available
function hasValidApiKey(provider) {
  // Simpler validation - just check if key exists and has reasonable length
  return apiKeys[provider] && apiKeys[provider].length > 8;
}

// API key configuration
const config = {
  openaiApiKey: apiKeys.openai || '',
  groqApiKey: apiKeys.groq || '',
  googleApiKey: apiKeys.google || ''
};

// Function to update API key in both memory and localStorage
function updateApiKey(provider, key) {
  // Update in memory
  apiKeys[provider] = key;
  config[`${provider}ApiKey`] = key;
  
  // Save to localStorage
  PolyChatConfig.saveApiKey(provider, key);
  
  // Update UI
  updateApiKeyStatus();
}

// Default System Prompts
const defaultSystemPrompts = {
  "Helpful AI": "You are a helpful AI assistant. Provide useful, precise, and correct answers to user queries.",
  "Proofreader": `You are a meticulous proofreader and editor with an exceptional command of the English language. Your task is to carefully review the provided draft text and suggest improvements to enhance clarity, flow, grammar, and overall impact—without altering the original intent.

        Editing Process:
        - Understand the Context – Read through the entire draft to grasp its overall message, structure, and tone before making any edits.
        - Line-by-Line Edits – Review the text in detail, focusing on:
            - Spelling, grammar, and punctuation errors
            - Awkward phrasing or unclear sentence structures
            - Redundant or unnecessary words
            - Inconsistent or incorrect formatting
            - Replacing complex words with simpler alternatives that a 5th grader can understand
        - Enhance Readability – Use appropriate transition words and phrases to improve the logical flow between ideas.
        - Provide Feedback – Suggest refinements to strengthen the draft's clarity, impact, and persuasiveness.

        Editing Constraints:
        - Maintain the original author's voice and intent.
        - DO NOT delete any sentences.
        - DO NOT add new sentences.`,
  "Instructor": "You are an instructor who explains topics succinctly and systematically."
};

// Custom system prompts storage
let customSystemPrompts = {};

// Load custom prompts from localStorage if available
function loadCustomPrompts() {
  const savedPrompts = localStorage.getItem('polychat_custom_prompts');
  if (savedPrompts) {
    try {
      customSystemPrompts = JSON.parse(savedPrompts);
    } catch (e) {
      console.error('Error loading custom prompts:', e);
    }
  }
}

// Update API key status indicators in the UI
function updateApiKeyStatus() {
  const providers = ['openai', 'groq', 'google'];
  
  providers.forEach(provider => {
    const statusElement = document.getElementById(`${provider}-key-status`);
    if (!statusElement) return;
    
    if (hasValidApiKey(provider)) {
      statusElement.textContent = 'Key Set';
      statusElement.className = 'key-status key-status-valid';
      
      // Auto-fill the input field with a placeholder to show it's set
      const inputElement = document.getElementById(`${provider}-key-input`);
      if (inputElement && !inputElement.value) {
        inputElement.placeholder = '••••••••••••••••••••••••••';
      }
    } else {
      if (provider === 'groq' && DEFAULT_GROQ_API_KEY) {
        statusElement.textContent = 'Default Key';
        statusElement.className = 'key-status';
      } else {
        statusElement.textContent = 'Not Set';
        statusElement.className = 'key-status key-status-invalid';
      }
    }
  });
  
  // Update provider selector based on available keys
  const providerSelect = document.getElementById('provider-select');
  if (providerSelect) {
    // First verify if the current selected provider has a valid key
    const currentProvider = providerSelect.value.toLowerCase();
    const currentProviderKey = currentProvider === 'chatgpt' ? 'openai' : currentProvider;
    
    if (!hasValidApiKey(currentProviderKey)) {
      // If current provider doesn't have a valid key, switch to Groq (which has default key)
      providerSelect.value = 'Groq';
      // Trigger the change event to update models
      providerSelect.dispatchEvent(new Event('change'));
    }
  }
}

document.addEventListener('DOMContentLoaded', function() {
  // Load custom prompts from localStorage
  loadCustomPrompts();
  
  // Initialize API key status UI
  updateApiKeyStatus();
  
  // Set up API key button event handlers
  setupApiKeyHandlers();
  
  // Set up collapsible sections
  setupCollapsibleSections();
  
  // Mobile menu functionality
  const toggleMenuBtn = document.getElementById('toggle-menu');
  const closeSidebarBtn = document.getElementById('close-sidebar');
  const sidebar = document.querySelector('.polychat-sidebar');
  const chatArea = document.querySelector('.polychat-chat');
  
  // Function to show the sidebar/configuration panel
  function showSidebar() {
    sidebar.classList.add('active');
    // If we're on mobile, hide the chat area for a full-screen sidebar effect
    if (window.innerWidth <= 768) {
      chatArea.style.display = 'none';
    }
  }
  
  // Function to hide the sidebar and show the chat area
  function hideSidebar() {
    sidebar.classList.remove('active');
    chatArea.style.display = 'flex';
  }
  
  // Event listeners for mobile menu toggle
  if (toggleMenuBtn) {
    toggleMenuBtn.addEventListener('click', showSidebar);
  }
  
  // Function to set up API key button handlers
  // Function to handle collapsible sections
  function setupCollapsibleSections() {
    const apiKeysHeader = document.getElementById('api-keys-header');
    const apiKeysContent = document.getElementById('api-keys-content');
    
    if (apiKeysHeader && apiKeysContent) {
      const toggleButton = apiKeysHeader.querySelector('.toggle-section');
      
      // Initialize the dropdown (closed by default)
      toggleButton.setAttribute('aria-expanded', 'false');
      apiKeysContent.style.display = 'none';
      
      apiKeysHeader.addEventListener('click', function(e) {
        e.preventDefault();
        const expanded = toggleButton.getAttribute('aria-expanded') === 'true';
        toggleButton.setAttribute('aria-expanded', !expanded);
        
        if (expanded) {
          apiKeysContent.style.display = 'none';
        } else {
          apiKeysContent.style.display = 'flex';
        }
        
        console.log('API Keys dropdown toggled:', !expanded ? 'open' : 'closed');
      });
    }
  }
  
  function setupApiKeyHandlers() {
    // OpenAI/ChatGPT key
    const saveOpenAIBtn = document.getElementById('save-openai-key');
    if (saveOpenAIBtn) {
      saveOpenAIBtn.addEventListener('click', function() {
        const keyInput = document.getElementById('openai-key-input');
        if (keyInput && keyInput.value) {
          updateApiKey('openai', keyInput.value);
          showToast('OpenAI API key saved');
          keyInput.value = '';
        } else {
          showToast('Please enter an API key');
        }
      });
    }
    
    // Groq key
    const saveGroqBtn = document.getElementById('save-groq-key');
    if (saveGroqBtn) {
      saveGroqBtn.addEventListener('click', function() {
        const keyInput = document.getElementById('groq-key-input');
        if (keyInput && keyInput.value) {
          updateApiKey('groq', keyInput.value);
          showToast('Groq API key saved');
          keyInput.value = '';
        } else {
          showToast('Please enter an API key');
        }
      });
    }
    
    // Reset Groq key to default
    const resetGroqBtn = document.getElementById('reset-groq-key');
    if (resetGroqBtn) {
      resetGroqBtn.addEventListener('click', function() {
        const defaultKey = PolyChatConfig.resetApiKey('groq');
        updateApiKey('groq', defaultKey);
        showToast('Groq API key reset to default');
      });
    }
    
    // Google key
    const saveGoogleBtn = document.getElementById('save-google-key');
    if (saveGoogleBtn) {
      saveGoogleBtn.addEventListener('click', function() {
        const keyInput = document.getElementById('google-key-input');
        if (keyInput && keyInput.value) {
          updateApiKey('google', keyInput.value);
          showToast('Google API key saved');
          keyInput.value = '';
        } else {
          showToast('Please enter an API key');
        }
      });
    }
    
    // Allow pressing Enter to save API keys
    const keyInputs = document.querySelectorAll('.api-key-input');
    keyInputs.forEach(input => {
      input.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
          const providerId = input.id.split('-')[0];
          document.getElementById(`save-${providerId}-key`).click();
        }
      });
    });
  }
  
  if (closeSidebarBtn) {
    closeSidebarBtn.addEventListener('click', hideSidebar);
  }
  
  // Initialize mobile view - hide sidebar by default on small screens
  function initMobileView() {
    if (window.innerWidth <= 768) {
      // Start with sidebar hidden on mobile
      hideSidebar();
    } else {
      // On desktop, ensure both are visible and properly laid out
      sidebar.classList.remove('active');
      chatArea.style.display = 'flex';
    }
  }
  
  // Run on page load
  initMobileView();
  
  // Also handle window resize
  window.addEventListener('resize', initMobileView);
  
  // DOM elements
  const providerSelect = document.getElementById('provider-select');
  const modelSelect = document.getElementById('model-select');
  const promptSelect = document.getElementById('prompt-select');
  const newPromptArea = document.getElementById('new-prompt-area');
  const newPromptNameInput = document.getElementById('new-prompt-name');
  const newPromptTextInput = document.getElementById('new-prompt-text');
  const savePromptButton = document.getElementById('save-prompt-button');
  const temperatureSlider = document.getElementById('temperature-slider');
  const temperatureValueSpan = document.getElementById('temperature-value');
  const maxTokensSlider = document.getElementById('max-tokens-slider');
  const maxTokensValueSpan = document.getElementById('max-tokens-value');
  // We no longer need resetButton since we removed it from sidebar
  // const resetButton = document.getElementById('reset-button');
  const userInput = document.getElementById('user-input');
  const sendButton = document.getElementById('send-button');
  const chatWindow = document.getElementById('chat-window');
  
  // Current system prompt text and conversation history
  let systemPromptText = defaultSystemPrompts["Helpful AI"];
  let conversationMessages = [];
  
  // If there are custom prompts, add them to the prompt select
  for (const promptName in customSystemPrompts) {
    addPromptOption(promptName);
  }
  
  // Function to add a new prompt option to the select dropdown
  function addPromptOption(promptName) {
    const newOption = document.createElement('option');
    newOption.value = promptName;
    newOption.textContent = promptName;
    // Insert before 'Add New System Prompt' option
    promptSelect.insertBefore(newOption, promptSelect.lastElementChild);
  }
  
  // Function to update model options based on provider
  function updateModelOptions() {
    const selectedProvider = providerSelect.value;
    const modelOptions = modelSelect.querySelectorAll('optgroup');
    modelOptions.forEach(optgroup => {
      if (optgroup.dataset.provider === selectedProvider) {
        optgroup.style.display = 'block';
      } else {
        optgroup.style.display = 'none';
      }
    });
    
    // Update model select to the first option in the selected provider group
    const availableOptions = modelSelect.querySelector(`optgroup[data-provider="${selectedProvider}"] option`);
    if (availableOptions) {
      modelSelect.value = availableOptions.value;
    }
  }
  
  // Initialize model options
  updateModelOptions();
  
  // Event listeners for configuration elements
  providerSelect.addEventListener('change', updateModelOptions);
  
  // Modal elements
  const promptModal = document.getElementById('prompt-modal');
  const closeModalBtn = document.querySelector('.close-modal');
  const cancelPromptBtn = document.getElementById('cancel-prompt-button');

  // Function to open the modal
  function openPromptModal() {
    promptModal.style.display = 'flex';
    document.getElementById('new-prompt-name').value = '';
    document.getElementById('new-prompt-text').value = '';
    document.getElementById('new-prompt-name').focus();
  }

  // Function to close the modal
  function closePromptModal() {
    promptModal.style.display = 'none';
    // Reset the prompt select to the previously selected value
    if (promptSelect.value === 'add-new-prompt') {
      // If no previous selection, set to default
      promptSelect.value = 'Helpful AI';
    }
  }

  // Handle prompt selection
  promptSelect.addEventListener('change', () => {
    if (promptSelect.value === 'add-new-prompt') {
      // Open the modal instead of showing inline form
      openPromptModal();
    } else {
      if (defaultSystemPrompts[promptSelect.value]) {
        systemPromptText = defaultSystemPrompts[promptSelect.value];
      } else if (customSystemPrompts[promptSelect.value]) {
        systemPromptText = customSystemPrompts[promptSelect.value];
      }
    }
  });

  // Close modal when clicking the X
  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closePromptModal);
  }

  // Close modal when clicking cancel
  if (cancelPromptBtn) {
    cancelPromptBtn.addEventListener('click', closePromptModal);
  }

  // Close modal when clicking outside
  window.addEventListener('click', (e) => {
    if (e.target === promptModal) {
      closePromptModal();
    }
  });
  
  // Handle new prompt saving
  savePromptButton.addEventListener('click', () => {
    const newName = newPromptNameInput.value.trim();
    const newText = newPromptTextInput.value.trim();
    if (newName && newText) {
      customSystemPrompts[newName] = newText;
      
      // Save custom prompts to localStorage
      localStorage.setItem('polychat_custom_prompts', JSON.stringify(customSystemPrompts));
      
      // Add new option to prompt select
      addPromptOption(newName);
      
      // Select the new prompt
      promptSelect.value = newName;
      systemPromptText = newText;
      
      // Close the modal
      closePromptModal();
      
      // Show success message
      showToast(`Custom prompt "${newName}" saved and selected.`);
    } else {
      showToast('Please enter both prompt name and text.', 3000);
    }
  });
  
  // Update temperature and max tokens display
  temperatureSlider.addEventListener('input', () => {
    temperatureValueSpan.textContent = temperatureSlider.value;
  });
  
  maxTokensSlider.addEventListener('input', () => {
    maxTokensValueSpan.textContent = maxTokensSlider.value;
  });
  
  // Function to show toast notification
  function showToast(message, duration = 2000) {
    const toastContainer = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    
    toastContainer.appendChild(toast);
    
    // Trigger reflow and add show class for animation
    setTimeout(() => {
      toast.classList.add('show');
    }, 10);
    
    // Remove toast after duration
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        toastContainer.removeChild(toast);
      }, 300); // Wait for fade out animation
    }, duration);
  }
  
  // Function to reset conversation context
  function resetConversation() {
    conversationMessages = [];
    chatWindow.innerHTML = ''; // Clear chat window
    // Add a default assistant message after reset
    addMessageToChat('assistant', "Hello! How can I assist you today?");
    // Show toast notification
    showToast("Context Reset");
  }
  
  // We don't need to add event listener for sidebar reset button anymore
  // as it has been removed from the UI
  
  // Mobile reset button in header
  const mobileResetButton = document.getElementById('mobile-reset');
  if (mobileResetButton) {
    mobileResetButton.addEventListener('click', resetConversation);
  }
  
  // Send message function
  // Make sendMessage available globally
  window.sendMessage = function() {
    console.log('Send message function called');
    const messageText = userInput.value.trim();
    if (!messageText) return;
    
    // Add user message to chat
    addMessageToChat('user', messageText);
    
    // Clear input
    userInput.value = '';
    
    // Get the selected provider and model
    const selectedProvider = providerSelect.value;
    const selectedModel = modelSelect.value;
    const temperature = parseFloat(temperatureSlider.value);
    const maxTokens = parseInt(maxTokensSlider.value);
    
    // Save the message to conversation history
    conversationMessages.push({ role: 'user', content: messageText });
    
    // Add thinking message
    addThinkingMessage();
    
    // Call the appropriate API based on the selected provider
    let apiResponsePromise;
    
    if (selectedProvider === 'ChatGPT') {
      apiResponsePromise = callOpenAIApi(systemPromptText, conversationMessages, selectedModel, temperature, maxTokens);
    } else if (selectedProvider === 'Groq') {
      apiResponsePromise = callGroqApi(systemPromptText, conversationMessages, selectedModel, temperature, maxTokens);
    } else if (selectedProvider === 'Google') {
      apiResponsePromise = callGoogleApi(systemPromptText, conversationMessages, selectedModel, temperature, maxTokens);
    }
    
    apiResponsePromise.then(response => {
      removeThinkingMessage();
      if (response) {
        addMessageToChat('assistant', response);
        conversationMessages.push({ role: 'assistant', content: response });
      } else {
        addMessageToChat('assistant', "Sorry, I encountered an error processing your request.");
      }
    }).catch(error => {
      removeThinkingMessage();
      console.error("API call failed:", error);
      addMessageToChat('assistant', `Sorry, I encountered an error connecting to the service: ${error.message}`);
    });
  }
  
  // Add message to chat display
  function addMessageToChat(role, content) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', `${role}-message`);
    const messageContentDiv = document.createElement('div');
    messageContentDiv.classList.add('message-content');

    if (role === 'assistant') {
      // Use marked.js for markdown parsing if available
      if (typeof marked !== 'undefined') {
        messageContentDiv.innerHTML = marked.parse(content);
      } else {
        // Basic handling for code blocks and line breaks
        const formattedText = content
          .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
          .replace(/\n/g, '<br>');
        messageContentDiv.innerHTML = formattedText;
      }
    } else {
      messageContentDiv.textContent = content;
    }

    messageDiv.appendChild(messageContentDiv);
    chatWindow.appendChild(messageDiv);
    chatWindow.scrollTop = chatWindow.scrollHeight; // Scroll to bottom
  }
  
  // Thinking message element and functions
  let thinkingMessageElement = null;

  function addThinkingMessage() {
    thinkingMessageElement = document.createElement('div');
    thinkingMessageElement.classList.add('message', 'assistant-message', 'thinking-message');
    thinkingMessageElement.innerHTML = '<div class="message-content">Thinking... <div class="spinner"></div></div>';
    chatWindow.appendChild(thinkingMessageElement);
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }

  function removeThinkingMessage() {
    if (thinkingMessageElement && thinkingMessageElement.parentNode === chatWindow) {
      chatWindow.removeChild(thinkingMessageElement);
      thinkingMessageElement = null;
    }
  }
  

  
  // API Call Functions
  async function callOpenAIApi(systemPrompt, messages, model, temperature, maxTokens) {
    if (!hasValidApiKey('openai')) {
      return "⚠️ OpenAI API key not configured. Please add your API key in GitHub Secrets.";
    }
    
    const apiUrl = "https://api.openai.com/v1/chat/completions";
    
    // Format messages according to the curl example
    const apiMessages = [
      { role: "system", content: systemPrompt } // Use 'developer' role for system prompt
    ];
    
    // Add the user messages
    messages.forEach(msg => {
      apiMessages.push(msg);
    });
    
    // Prepare the request payload
    const data = {
      model: model,
      messages: apiMessages,
      temperature: temperature,
      max_tokens: maxTokens
    };

    console.log('OpenAI request:', JSON.stringify(data, null, 2)); // Log for debugging

    try {
      // Create headers object without any default headers
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', `Bearer ${config.openaiApiKey}`);
      
      console.log('Request headers:', [...headers.entries()]); // Log headers for debugging
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('OpenAI API error response:', errorText);
        throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
      }
      
      const completion = await response.json();
      console.log('OpenAI response:', completion); // Log for debugging
      return completion.choices[0].message.content;
    } catch (error) {
      console.error("Error calling OpenAI API:", error);
      throw new Error(`Error calling OpenAI API: ${error.message}`);
    }
  }

  async function callGroqApi(systemPrompt, messages, model, temperature, maxTokens) {
    if (!hasValidApiKey('groq')) {
      return "⚠️ Groq API key not configured. Please add your API key in GitHub Secrets.";
    }
    
    const apiUrl = "https://api.groq.com/openai/v1/chat/completions";
    const apiMessages = [{ role: "system", content: systemPrompt }, ...messages];
    const data = {
      model: model,
      messages: apiMessages,
      temperature: temperature,
      max_tokens: maxTokens
    };

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${config.groqApiKey}`
        },
        body: JSON.stringify(data)
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const completion = await response.json();
      return completion.choices[0].message.content;
    } catch (error) {
      console.error("Error calling Groq API:", error);
      throw new Error(`Error calling Groq API: ${error.message}`);
    }
  }
  
  async function callGoogleApi(systemPrompt, messages, model, temperature, maxTokens) {
    if (!hasValidApiKey('google')) {
      return "⚠️ Google API key not configured. Please add your API key in GitHub Secrets.";
    }
    
    // Updated endpoint and model naming for Gemini API
    // Gemini API uses a different endpoint structure
    const apiVersion = "v1";
    // Use the exact model name from the dropdown
    const endpoint = `https://generativelanguage.googleapis.com/${apiVersion}/models/${model}:generateContent?key=${config.googleApiKey}`;

    // Prepare conversation context
    // Include system prompt and previous messages in a way Gemini can understand
    let conversationContext = systemPrompt ? systemPrompt + "\n\n" : "";
    
    // Include previous conversation context (limited to last few messages to avoid token limits)
    const relevantMessages = messages.slice(-5); // Get last 5 messages max
    for (const msg of relevantMessages) {
      conversationContext += `${msg.role === 'user' ? 'User: ' : 'Assistant: '}${msg.content}\n\n`;
    }

    // Get the user's current message
    const latestUserMessage = messages.filter(msg => msg.role === 'user').pop();
    const userText = latestUserMessage ? latestUserMessage.content : "";

    // Prepare the request payload following Gemini API format
    const payload = {
      "contents": [
        {
          "role": "user",
          "parts": [
            {"text": conversationContext + userText.trim()}
          ]
        }
      ],
      "generationConfig": {
        "temperature": temperature,
        "maxOutputTokens": maxTokens,
        "topP": 0.9,
        "topK": 40
      }
    };

    try {
      console.log("Calling Gemini API with endpoint:", endpoint);
      console.log("Payload:", JSON.stringify(payload, null, 2));
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      
      if (!response.ok) {
        let errorMessage = `HTTP error! status: ${response.status} - ${response.statusText}`;
        try {
          const errorDetails = await response.json();
          console.error("Google API Error Response:", errorDetails);
          if (errorDetails.error) {
            errorMessage += ` - ${errorDetails.error.message || 'Unknown error'}`;
          }
        } catch (e) {
          console.error("Could not parse error response:", e);
        }
        throw new Error(errorMessage);
      }
      
      const reply = await response.json();
      console.log("Gemini API response:", reply);
      
      // Extract the response text from the API response
      if (reply.candidates && reply.candidates[0] && 
          reply.candidates[0].content && 
          reply.candidates[0].content.parts && 
          reply.candidates[0].content.parts[0].text) {
        return reply.candidates[0].content.parts[0].text;
      } else if (reply.promptFeedback && reply.promptFeedback.blockReason) {
        // Handle content filtering
        return `The request was blocked by Gemini's content filter. Reason: ${reply.promptFeedback.blockReason}`;
      } else {
        console.error("Unexpected API response format from Google:", reply);
        throw new Error("Unexpected API response format from Google.");
      }
    } catch (error) {
      console.error("Error calling Google API:", error);
      throw new Error(`Error calling Google API: ${error.message}`);
    }
  }
  
  // Add CSS for spinner
  const style = document.createElement('style');
  style.textContent = `
    .spinner {
      display: inline-block;
      width: 16px;
      height: 16px;
      border: 2px solid rgba(0, 0, 0, 0.1);
      border-left-color: #4183c4;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin-right: 8px;
    }
    
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(style);
  

  
  // Event listeners for chat
  if (sendButton) {
    console.log('Setting up send button event listener');
    sendButton.addEventListener('click', function() {
      console.log('Send button clicked');
      sendMessage();
    });
  } else {
    console.warn('Send button not found in DOM');
  }
  
  if (userInput) {
    userInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        console.log('Enter key pressed');
        sendMessage();
      }
    });
  } else {
    console.warn('User input not found in DOM');
  }

});
