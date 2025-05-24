/**
 * Tools.js - Common UI Components and Utility Functions
 * Shared functionality for all tools in the website
 */

// Common UI Components
const ToolsUI = {
  /**
   * Create a tool card element
   * @param {Object} options - Card configuration
   * @param {string} options.title - Card title
   * @param {string} options.description - Card description
   * @param {string} options.icon - SVG icon markup
   * @param {string} options.link - Card link URL
   * @returns {HTMLElement} Tool card element
   */
  createToolCard({ title, description, icon, link }) {
    const card = document.createElement('a');
    card.href = link;
    card.className = 'tool-card';
    
    card.innerHTML = `
      <div class="tool-icon">
        ${icon}
      </div>
      <h2 class="tool-title">${title}</h2>
      <p class="tool-description">${description}</p>
    `;
    
    return card;
  },

  /**
   * Create a back to tools link
   * @returns {HTMLElement} Back link element
   */
  createBackLink() {
    const link = document.createElement('a');
    link.href = '/tools/';
    link.className = 'back-to-tools';
    link.innerHTML = '← Back to Tools';
    return link;
  },

  /**
   * Create a tool header section
   * @param {Object} options - Header configuration
   * @param {string} options.title - Header title
   * @param {string} options.description - Header description
   * @returns {HTMLElement} Header element
   */
  createToolHeader({ title, description }) {
    const header = document.createElement('div');
    header.className = 'tool-header';
    
    header.innerHTML = `
      <h1>${title}</h1>
      <p class="tool-description">${description}</p>
    `;
    
    header.appendChild(this.createBackLink());
    return header;
  },

  /**
   * Create an action button
   * @param {Object} options - Button configuration
   * @param {string} options.text - Button text
   * @param {Function} options.onClick - Click handler
   * @returns {HTMLElement} Button element
   */
  createActionButton({ text, onClick }) {
    const button = document.createElement('button');
    button.className = 'action-button';
    button.textContent = text;
    if (onClick) {
      button.addEventListener('click', onClick);
    }
    return button;
  }
};

// Utility Functions
const ToolsUtils = {
  /**
   * Format a number with commas
   * @param {number} num - Number to format
   * @returns {string} Formatted number
   */
  formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  },

  /**
   * Generate a random ID
   * @returns {string} Random ID
   */
  generateId() {
    return Math.random().toString(36).substr(2, 9);
  },

  /**
   * Show a toast notification
   * @param {string} message - Message to display
   * @param {number} duration - Duration in milliseconds
   */
  showToast(message, duration = 3000) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    // Trigger animation
    setTimeout(() => toast.classList.add('show'), 100);
    
    // Remove after duration
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, duration);
  },

  /**
   * Debounce a function
   * @param {Function} func - Function to debounce
   * @param {number} wait - Wait time in milliseconds
   * @returns {Function} Debounced function
   */
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  /**
   * Copy text to clipboard
   * @param {string} text - Text to copy
   * @returns {Promise} Promise that resolves when text is copied
   */
  async copyToClipboard(text) {
    try {
      await navigator.clipboard.writeText(text);
      this.showToast('Copied to clipboard!');
      return true;
    } catch (err) {
      console.error('Failed to copy text:', err);
      this.showToast('Failed to copy text');
      return false;
    }
  },

  /**
   * Download a file
   * @param {string} data - File data
   * @param {string} filename - File name
   * @param {string} type - File MIME type
   */
  downloadFile(data, filename, type) {
    const blob = new Blob([data], { type });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  },

  /**
   * Escape HTML
   * @param {string} text - Text to escape
   * @returns {string} Escaped text
   */
  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
};

// Database Tool Functions
const DatabaseTool = {
  // API endpoints
  STORE_API: 'https://store-user-data-942186759114.europe-west1.run.app',
  FETCH_API: 'https://workspace-user-data-942186759114.europe-west1.run.app',

  /**
   * Initialize database tool
   */
  init() {
    // Get DOM elements
    this.userNameInput = document.getElementById('user-name');
    this.userEmailInput = document.getElementById('user-email');
    this.searchNameInput = document.getElementById('search-name');
    this.storeBtn = document.getElementById('store-btn');
    this.fetchBtn = document.getElementById('fetch-btn');
    this.clearStoreBtn = document.getElementById('clear-store-form');
    this.clearSearchBtn = document.getElementById('clear-search-form');
    this.clearResultsBtn = document.getElementById('clear-results');
    this.resultsSection = document.getElementById('results-section');
    this.resultsContainer = document.getElementById('results-container');

    // Add event listeners
    if (this.storeBtn) this.storeBtn.addEventListener('click', () => this.storeUserData());
    if (this.fetchBtn) this.fetchBtn.addEventListener('click', () => this.fetchUserData());
    if (this.clearStoreBtn) this.clearStoreBtn.addEventListener('click', () => this.clearStoreForm());
    if (this.clearSearchBtn) this.clearSearchBtn.addEventListener('click', () => this.clearSearchForm());
    if (this.clearResultsBtn) this.clearResultsBtn.addEventListener('click', () => this.clearResults());

    // Add keyboard shortcuts
    document.addEventListener('keydown', (event) => {
      // Enter key in store form
      if ((this.userNameInput === document.activeElement || this.userEmailInput === document.activeElement) && event.key === 'Enter') {
        this.storeUserData();
      }
      // Enter key in search form
      if (this.searchNameInput === document.activeElement && event.key === 'Enter') {
        this.fetchUserData();
      }
    });
  },

  /**
   * Store user data
   */
  async storeUserData() {
    const name = this.userNameInput.value.trim();
    const email = this.userEmailInput.value.trim();

    if (!name || !email) {
      ToolsUtils.showToast('Please enter both name and email');
      return;
    }

    try {
      // Disable button during request
      this.storeBtn.disabled = true;
      this.storeBtn.textContent = 'Storing...';

      const response = await fetch(this.STORE_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email })
      });

      if (response.ok) {
        ToolsUtils.showToast('Data stored successfully!');
        this.clearStoreForm();
        this.showSuccessResult('Data Stored', `Successfully stored data for ${name} (${email})`);
      } else {
        throw new Error(`HTTP ${response.status}: Failed to store data`);
      }
    } catch (error) {
      console.error('Store error:', error);
      ToolsUtils.showToast('Error storing data: ' + error.message);
      this.showErrorResult('Store Error', error.message);
    } finally {
      // Re-enable button
      this.storeBtn.disabled = false;
      this.storeBtn.textContent = 'Store Data';
    }
  },

  /**
   * Fetch user data
   */
  async fetchUserData() {
    const searchName = this.searchNameInput.value.trim();

    if (!searchName) {
      ToolsUtils.showToast('Please enter a name to search');
      return;
    }

    try {
      // Disable button during request
      this.fetchBtn.disabled = true;
      this.fetchBtn.textContent = 'Fetching...';

      const response = await fetch(this.FETCH_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: searchName })
      });
      
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          ToolsUtils.showToast('Data fetched successfully!');
          this.showUserData(data);
        } else {
          ToolsUtils.showToast('No users found with that name');
          this.showErrorResult('No Results', 'No users found with that name');
        }
      } else if (response.status === 404) {
        throw new Error('User not found');
      } else {
        throw new Error(`HTTP ${response.status}: Failed to fetch data`);
      }
    } catch (error) {
      console.error('Fetch error:', error);
      ToolsUtils.showToast('Error fetching data: ' + error.message);
      this.showErrorResult('Fetch Error', error.message);
    } finally {
      // Re-enable button
      this.fetchBtn.disabled = false;
      this.fetchBtn.textContent = 'Fetch Data';
    }
  },

  /**
   * Show user data in results
   */
  showUserData(dataArray) {
    let resultHtml = '<div class="user-data-result">';
    
    if (dataArray.length === 1) {
      resultHtml += '<h4>User Details</h4>';
    } else {
      resultHtml += `<h4>Found ${dataArray.length} Users</h4>`;
    }
    
    dataArray.forEach((user, index) => {
      if (dataArray.length > 1) {
        resultHtml += `<div class="user-entry"><h5>User ${index + 1}</h5>`;
      } else {
        resultHtml += '<div class="user-entry">';
      }
      
      resultHtml += `
        <div class="data-row">
          <span class="data-label">Name:</span>
          <span class="data-value">${ToolsUtils.escapeHtml(user.name)}</span>
        </div>
        <div class="data-row">
          <span class="data-label">Email:</span>
          <span class="data-value">${ToolsUtils.escapeHtml(user.email)}</span>
        </div>
        <div class="data-row">
          <span class="data-label">ID:</span>
          <span class="data-value">${ToolsUtils.escapeHtml(user.id)}</span>
        </div>
        <div class="data-row">
          <span class="data-label">Created:</span>
          <span class="data-value">${ToolsUtils.escapeHtml(new Date(user.createdAt).toLocaleString())}</span>
        </div>
      </div>`;
    });
    
    resultHtml += '</div>';
    this.resultsContainer.innerHTML = resultHtml;
    this.resultsSection.style.display = 'block';
  },

  /**
   * Show success result
   */
  showSuccessResult(title, message) {
    this.resultsContainer.innerHTML = `
      <div class="success-result">
        <h4>${ToolsUtils.escapeHtml(title)}</h4>
        <p>${ToolsUtils.escapeHtml(message)}</p>
      </div>
    `;
    this.resultsSection.style.display = 'block';
  },

  /**
   * Show error result
   */
  showErrorResult(title, message) {
    this.resultsContainer.innerHTML = `
      <div class="error-result">
        <h4>${ToolsUtils.escapeHtml(title)}</h4>
        <p>${ToolsUtils.escapeHtml(message)}</p>
      </div>
    `;
    this.resultsSection.style.display = 'block';
  },

  /**
   * Clear store form
   */
  clearStoreForm() {
    this.userNameInput.value = '';
    this.userEmailInput.value = '';
    this.userNameInput.focus();
  },

  /**
   * Clear search form
   */
  clearSearchForm() {
    this.searchNameInput.value = '';
    this.searchNameInput.focus();
  },

  /**
   * Clear results
   */
  clearResults() {
    this.resultsContainer.innerHTML = '';
    this.resultsSection.style.display = 'none';
  }
};

// Base64 Tool Functions
const Base64Tool = {
  /**
   * Initialize base64 tool
   */
  init() {
    // Get DOM elements
    this.inputText = document.getElementById('input-text');
    this.outputText = document.getElementById('output-text');
    this.encodeBtn = document.getElementById('encode-btn');
    this.decodeBtn = document.getElementById('decode-btn');
    this.clearInputBtn = document.getElementById('clear-input');
    this.clearOutputBtn = document.getElementById('clear-output');
    this.copyInputBtn = document.getElementById('copy-input');
    this.copyOutputBtn = document.getElementById('copy-output');

    // Add event listeners
    if (this.encodeBtn) this.encodeBtn.addEventListener('click', () => this.encodeBase64());
    if (this.decodeBtn) this.decodeBtn.addEventListener('click', () => this.decodeBase64());
    if (this.clearInputBtn) this.clearInputBtn.addEventListener('click', () => this.clearInput());
    if (this.clearOutputBtn) this.clearOutputBtn.addEventListener('click', () => this.clearOutput());
    if (this.copyInputBtn) this.copyInputBtn.addEventListener('click', () => this.copyInput());
    if (this.copyOutputBtn) this.copyOutputBtn.addEventListener('click', () => this.copyOutput());

    // Add keyboard shortcuts
    document.addEventListener('keydown', (event) => {
      // Ctrl/Cmd + Enter to encode
      if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
        this.encodeBase64();
      }
      // Ctrl/Cmd + Shift + Enter to decode
      if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key === 'Enter') {
        this.decodeBase64();
      }
    });
  },

  /**
   * Encode text to Base64
   */
  encodeBase64() {
    try {
      const text = this.inputText.value;
      if (!text) {
        ToolsUtils.showToast('Please enter text to encode');
        return;
      }
      const encoded = btoa(unescape(encodeURIComponent(text)));
      this.outputText.value = encoded;
      ToolsUtils.showToast('Text encoded successfully');
    } catch (error) {
      ToolsUtils.showToast('Error encoding text');
      console.error('Encoding error:', error);
    }
  },

  /**
   * Decode Base64 to text
   */
  decodeBase64() {
    try {
      const text = this.inputText.value;
      if (!text) {
        ToolsUtils.showToast('Please enter text to decode');
        return;
      }
      const decoded = decodeURIComponent(escape(atob(text)));
      this.outputText.value = decoded;
      ToolsUtils.showToast('Text decoded successfully');
    } catch (error) {
      ToolsUtils.showToast('Error decoding text. Make sure the input is valid Base64');
      console.error('Decoding error:', error);
    }
  },

  /**
   * Clear input
   */
  clearInput() {
    this.inputText.value = '';
    this.inputText.focus();
  },

  /**
   * Clear output
   */
  clearOutput() {
    this.outputText.value = '';
  },

  /**
   * Copy input to clipboard
   */
  async copyInput() {
    if (!this.inputText.value) {
      ToolsUtils.showToast('Nothing to copy');
      return;
    }
    await ToolsUtils.copyToClipboard(this.inputText.value);
  },

  /**
   * Copy output to clipboard
   */
  async copyOutput() {
    if (!this.outputText.value) {
      ToolsUtils.showToast('Nothing to copy');
      return;
    }
    await ToolsUtils.copyToClipboard(this.outputText.value);
  }
};

// JSON Formatter Tool Functions
const JSONFormatterTool = {
  /**
   * Initialize JSON formatter tool
   */
  init() {
    // Get DOM elements
    this.inputText = document.getElementById('input-text');
    this.outputText = document.getElementById('output-text');
    this.errorMessage = document.getElementById('error-message');
    this.formatBtn = document.getElementById('format-btn');
    this.minifyBtn = document.getElementById('minify-btn');
    this.clearInputBtn = document.getElementById('clear-input');
    this.clearOutputBtn = document.getElementById('clear-output');
    this.copyInputBtn = document.getElementById('copy-input');
    this.copyOutputBtn = document.getElementById('copy-output');

    // Add event listeners
    if (this.formatBtn) this.formatBtn.addEventListener('click', () => this.formatJSON());
    if (this.minifyBtn) this.minifyBtn.addEventListener('click', () => this.minifyJSON());
    if (this.clearInputBtn) this.clearInputBtn.addEventListener('click', () => this.clearInput());
    if (this.clearOutputBtn) this.clearOutputBtn.addEventListener('click', () => this.clearOutput());
    if (this.copyInputBtn) this.copyInputBtn.addEventListener('click', () => this.copyInput());
    if (this.copyOutputBtn) this.copyOutputBtn.addEventListener('click', () => this.copyOutput());

    // Add keyboard shortcuts
    document.addEventListener('keydown', (event) => {
      // Ctrl/Cmd + Enter to format
      if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
        this.formatJSON();
      }
    });
  },

  /**
   * Format JSON with proper indentation
   */
  formatJSON() {
    try {
      const input = this.inputText.value.trim();
      if (!input) {
        ToolsUtils.showToast('Please enter JSON to format');
        return;
      }

      // Parse and stringify with indentation
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, 2);
      
      // Update output with syntax highlighting
      this.outputText.textContent = formatted;
      if (typeof hljs !== 'undefined') {
        hljs.highlightElement(this.outputText);
      }
      
      // Clear any previous error
      if (this.errorMessage) {
        this.errorMessage.textContent = '';
        this.errorMessage.style.display = 'none';
      }
      
      ToolsUtils.showToast('JSON formatted successfully');
    } catch (error) {
      // Show error message
      if (this.errorMessage) {
        this.errorMessage.textContent = `Error: ${error.message}`;
        this.errorMessage.style.display = 'block';
      }
      this.outputText.textContent = '';
      ToolsUtils.showToast('Invalid JSON');
    }
  },

  /**
   * Minify JSON
   */
  minifyJSON() {
    try {
      const input = this.inputText.value.trim();
      if (!input) {
        ToolsUtils.showToast('Please enter JSON to minify');
        return;
      }

      // Parse and stringify without spaces
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      
      // Update input with minified version
      this.inputText.value = minified;
      
      // Clear any previous error
      if (this.errorMessage) {
        this.errorMessage.textContent = '';
        this.errorMessage.style.display = 'none';
      }
      
      ToolsUtils.showToast('JSON minified successfully');
    } catch (error) {
      if (this.errorMessage) {
        this.errorMessage.textContent = `Error: ${error.message}`;
        this.errorMessage.style.display = 'block';
      }
      ToolsUtils.showToast('Invalid JSON');
    }
  },

  /**
   * Clear input
   */
  clearInput() {
    this.inputText.value = '';
    this.inputText.focus();
  },

  /**
   * Clear output
   */
  clearOutput() {
    this.outputText.textContent = '';
    if (this.errorMessage) {
      this.errorMessage.textContent = '';
      this.errorMessage.style.display = 'none';
    }
  },

  /**
   * Copy input to clipboard
   */
  async copyInput() {
    if (!this.inputText.value) {
      ToolsUtils.showToast('Nothing to copy');
      return;
    }
    await ToolsUtils.copyToClipboard(this.inputText.value);
  },

  /**
   * Copy output to clipboard
   */
  async copyOutput() {
    if (!this.outputText.textContent) {
      ToolsUtils.showToast('Nothing to copy');
      return;
    }
    await ToolsUtils.copyToClipboard(this.outputText.textContent);
  }
};

// Calculator Tool Functions
const CalculatorTool = {
  displayValue: '0',
  firstOperand: null,
  operator: null,
  waitingForSecondOperand: false,
  calculationHistory: '',
  historyDisplay: null,
  inputDisplay: null,

  /**
   * Initialize calculator tool
   */
  init() {
    // Get DOM elements
    this.historyDisplay = document.getElementById('history');
    this.inputDisplay = document.getElementById('input');
    
    if (!this.historyDisplay || !this.inputDisplay) {
      return;
    }
    
    // Reset calculator state
    this.resetCalculator();
    
    // Remove any existing event listeners
    const oldKeypad = document.querySelector('.calculator-keypad');
    if (oldKeypad) {
      const newKeypad = oldKeypad.cloneNode(true);
      oldKeypad.parentNode.replaceChild(newKeypad, oldKeypad);
    }
    
    // Set up click handlers on all buttons
    const keys = document.querySelectorAll('.calculator-key');
    keys.forEach(key => {
      key.addEventListener('click', (event) => this.handleButtonClick(event));
      key.addEventListener('touchstart', (event) => this.handleButtonClick(event));
    });
    
    // Add keyboard support
    document.addEventListener('keydown', (event) => this.handleKeyPress(event));
    
    // Initialize the display
    this.updateDisplay();
  },

  /**
   * Reset calculator state
   */
  resetCalculator() {
    this.displayValue = '0';
    this.firstOperand = null;
    this.operator = null;
    this.waitingForSecondOperand = false;
    this.calculationHistory = '';
    this.updateDisplay();
  },

  /**
   * Update the calculator display
   */
  updateDisplay() {
    if (this.inputDisplay) this.inputDisplay.textContent = this.displayValue;
    if (this.historyDisplay) this.historyDisplay.textContent = this.calculationHistory;
  },

  /**
   * Handle button clicks
   */
  handleButtonClick(event) {
    // Only prevent default for touch events
    if (event.type === 'touchstart') {
      event.preventDefault();
    }
    
    const key = event.currentTarget;
    
    // Number buttons
    if (key.classList.contains('number')) {
      if (key.dataset.digit === '.') {
        this.inputDecimal();
      } else {
        this.inputDigit(key.dataset.digit);
      }
      this.updateDisplay();
      return;
    }
    
    // Operator buttons
    if (key.classList.contains('operator')) {
      this.handleOperator(key.dataset.action);
      this.updateDisplay();
      return;
    }
    
    // Function buttons
    switch (key.dataset.action) {
      case 'calculate':
        if (this.operator && this.firstOperand !== null) {
          this.performCalculation();
        }
        break;
      case 'clear':
        this.resetCalculator();
        break;
      case 'negative':
        this.toggleNegative();
        break;
      case 'percentage':
        this.calculatePercentage();
        break;
      case 'backspace':
        this.handleBackspace();
        break;
    }
    this.updateDisplay();
  },

  /**
   * Input a digit
   */
  inputDigit(digit) {
    if (this.waitingForSecondOperand) {
      this.displayValue = digit;
      this.waitingForSecondOperand = false;
    } else {
      this.displayValue = this.displayValue === '0' ? digit : this.displayValue + digit;
    }
  },

  /**
   * Input a decimal point
   */
  inputDecimal() {
    if (this.waitingForSecondOperand) {
      this.displayValue = '0.';
      this.waitingForSecondOperand = false;
      return;
    }

    if (!this.displayValue.includes('.')) {
      this.displayValue += '.';
    }
  },

  /**
   * Handle operator input
   */
  handleOperator(nextOperator) {
    const inputValue = parseFloat(this.displayValue);

    if (this.firstOperand === null) {
      this.firstOperand = inputValue;
    } else if (this.operator) {
      const result = this.calculate();

      this.displayValue = `${parseFloat(result.toFixed(7))}`;
      this.firstOperand = result;
    }

    this.waitingForSecondOperand = true;
    this.operator = nextOperator;
  },

  /**
   * Calculate result
   */
  calculate() {
    const prev = this.firstOperand;
    const next = parseFloat(this.displayValue);

    if (prev === null || next === null) return next;

    switch (this.operator) {
      case 'add':
        return prev + next;
      case 'subtract':
        return prev - next;
      case 'multiply':
        return prev * next;
      case 'divide':
        return next !== 0 ? prev / next : 0;
      default:
        return next;
    }
  },

  /**
   * Perform calculation and update history
   */
  performCalculation() {
    const result = this.calculate();
    const operatorSymbols = {
      'add': '+',
      'subtract': '−',
      'multiply': '×',
      'divide': '÷'
    };
    
    this.calculationHistory = `${this.firstOperand} ${operatorSymbols[this.operator]} ${this.displayValue} =`;
    this.displayValue = `${parseFloat(result.toFixed(7))}`;
    this.firstOperand = null;
    this.operator = null;
    this.waitingForSecondOperand = true;
  },

  /**
   * Toggle negative
   */
  toggleNegative() {
    if (this.displayValue === '0') return;
    
    if (this.displayValue.charAt(0) === '-') {
      this.displayValue = this.displayValue.slice(1);
    } else {
      this.displayValue = '-' + this.displayValue;
    }
  },

  /**
   * Calculate percentage
   */
  calculatePercentage() {
    const value = parseFloat(this.displayValue);
    this.displayValue = `${value / 100}`;
  },

  /**
   * Handle backspace
   */
  handleBackspace() {
    if (this.displayValue.length > 1) {
      this.displayValue = this.displayValue.slice(0, -1);
    } else {
      this.displayValue = '0';
    }
  },

  /**
   * Handle keyboard input
   */
  handleKeyPress(event) {
    const key = event.key;
    
    if ('0123456789'.includes(key)) {
      this.inputDigit(key);
      this.updateDisplay();
    } else if (key === '.') {
      this.inputDecimal();
      this.updateDisplay();
    } else if (key === 'Enter' || key === '=') {
      if (this.operator && this.firstOperand !== null) {
        this.performCalculation();
        this.updateDisplay();
      }
    } else if (key === 'Escape' || key.toLowerCase() === 'c') {
      this.resetCalculator();
    } else if (key === 'Backspace') {
      this.handleBackspace();
      this.updateDisplay();
    } else if (key === '+') {
      this.handleOperator('add');
      this.updateDisplay();
    } else if (key === '-') {
      this.handleOperator('subtract');
      this.updateDisplay();
    } else if (key === '*') {
      this.handleOperator('multiply');
      this.updateDisplay();
    } else if (key === '/') {
      event.preventDefault();
      this.handleOperator('divide');
      this.updateDisplay();
    } else if (key === '%') {
      this.calculatePercentage();
      this.updateDisplay();
    }
  }
};

// QR Code Generator Tool Functions
const QRCodeTool = {
  qr: null,

  /**
   * Initialize QR code generator tool
   */
  init() {
    // Check if QRious library is loaded
    if (typeof QRious === 'undefined') {
      console.error('QRious library not loaded!');
      ToolsUtils.showToast('QR Code library failed to load. Please refresh the page.', 5000);
      return;
    }
    console.log('QRious library loaded successfully!');

    // Create action buttons using common component
    const generateButton = ToolsUI.createActionButton({
      text: 'Generate QR',
      onClick: () => this.generateQR()
    });
    
    const downloadButton = ToolsUI.createActionButton({
      text: 'Download QR Code',
      onClick: () => this.downloadQR()
    });
    downloadButton.style.display = 'none';
    downloadButton.id = 'download-qr';

    const actionButtons = document.getElementById('action-buttons');
    if (actionButtons) {
      actionButtons.appendChild(generateButton);
      actionButtons.appendChild(downloadButton);
    }

    // Add keyboard shortcut for generating QR
    document.addEventListener('keydown', (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
        this.generateQR();
      }
    });
  },

  /**
   * Generate QR code
   */
  generateQR() {
    const text = document.getElementById('qr-input').value;
    if (!text) {
      ToolsUtils.showToast('Please enter some text or URL');
      return;
    }
    
    // Check if QRious library is available
    if (typeof QRious === 'undefined') {
      console.error('QRious library not loaded!');
      ToolsUtils.showToast('QR Code library is not available. Please refresh the page.', 5000);
      return;
    }
    
    const qrOutput = document.getElementById('qr-output');
    if (!qrOutput) return;
    
    qrOutput.innerHTML = '';
    
    try {
      // Create a canvas element for the QR code
      const canvas = document.createElement('canvas');
      canvas.id = 'qr-canvas';
      qrOutput.appendChild(canvas);
      
      // Generate QR code using QRious
      this.qr = new QRious({
        element: canvas,
        value: text,
        size: 256,
        background: '#ffffff',
        foreground: '#000000',
        level: 'H' // Error correction level
      });
      
      const downloadBtn = document.getElementById('download-qr');
      if (downloadBtn) {
        downloadBtn.style.display = 'block';
      }

      ToolsUtils.showToast('QR code generated successfully');
    } catch (error) {
      console.error('Error generating QR code:', error);
      ToolsUtils.showToast('Error generating QR code: ' + error.message);
    }
  },

  /**
   * Download QR code
   */
  downloadQR() {
    if (!this.qr) {
      ToolsUtils.showToast('No QR code to download');
      return;
    }
    
    try {
      ToolsUtils.downloadFile(
        this.qr.toDataURL('image/png'),
        'qrcode.png',
        'image/png'
      );
    } catch (error) {
      console.error('Error downloading QR code:', error);
      ToolsUtils.showToast('Error downloading QR code: ' + error.message);
    }
  }
};

// Export the modules
window.ToolsUI = ToolsUI;
window.ToolsUtils = ToolsUtils;
window.DatabaseTool = DatabaseTool;
window.Base64Tool = Base64Tool;
window.JSONFormatterTool = JSONFormatterTool;
window.CalculatorTool = CalculatorTool;
window.QRCodeTool = QRCodeTool; 