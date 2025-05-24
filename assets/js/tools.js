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

// Export the modules
window.ToolsUI = ToolsUI;
window.ToolsUtils = ToolsUtils;
window.DatabaseTool = DatabaseTool; 