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
  }
};

// Export the modules
window.ToolsUI = ToolsUI;
window.ToolsUtils = ToolsUtils; 