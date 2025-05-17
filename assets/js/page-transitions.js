/**
 * Page Transitions and Navigation
 * Combines Swup page transitions with custom navigation handling
 */

// Initialize page transitions and navigation
document.addEventListener('DOMContentLoaded', function() {
  // Add Swup CDN scripts
  const swupScript = document.createElement('script');
  swupScript.src = 'https://unpkg.com/swup@3.0.6/dist/swup.umd.js';
  swupScript.async = true;
  
  // Initialize Swup once loaded
  swupScript.onload = function() {
    initSwup();
  };
  
  document.body.appendChild(swupScript);
  
  // Add the page loader element
  const loader = document.createElement('div');
  loader.className = 'page-loader';
  document.body.appendChild(loader);

  // Initialize scroll progress
  initScrollProgress();

  // Initialize any page-specific functionality
  initializePageComponents();
});

// Initialize scroll progress bar
function initScrollProgress() {
  const progressBar = document.getElementById('progress-bar');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progressBar.style.width = scrolled + '%';
  });
}

function initSwup() {
  if (typeof Swup !== 'undefined') {
    const swup = new Swup({
      containers: ['#main'],
      cache: true,
      plugins: [],
      linkSelector: 'a[href^="' + window.location.origin + '"]:not([target="_blank"]):not([href^="' + window.location.origin + '/tools/calculator"])',
      skipPopStateHandling: function(event) {
        return event.state === null;
      }
    });
    
    // Handle page transitions
    swup.on('contentReplaced', function() {
      initializePageComponents();
      updateActiveNavItem();
    });
    
    // Handle navigation start
    swup.on('willReplaceContent', function() {
      const progressBar = document.getElementById('progress-bar');
      if (progressBar) {
        progressBar.style.width = '0%';
        progressBar.style.opacity = '1';
      }
    });
    
    // Handle navigation end
    swup.on('contentReplaced', function() {
      const progressBar = document.getElementById('progress-bar');
      if (progressBar) {
        progressBar.style.width = '100%';
        setTimeout(() => {
          progressBar.style.opacity = '0';
        }, 200);
      }
    });
    
    // Store swup instance globally
    window.swup = swup;
  }
}

// Initialize all page components
function initializePageComponents() {
  // Initialize calculator if present
  const calculator = document.querySelector('.calculator');
  if (calculator && typeof initCalculator === 'function') {
    initCalculator();
  }

  // Re-run lazy loading
  if (typeof initLazyLoad === 'function') {
    initLazyLoad();
  }
  
  // Re-initialize scroll progress
  initScrollProgress();
  
  // Reapply syntax highlighting if needed
  if (document.querySelectorAll('pre code').length > 0 && typeof hljs !== 'undefined') {
    document.querySelectorAll('pre code').forEach((block) => {
      hljs.highlightBlock(block);
    });
  }
  
  // Track page view if Google Analytics is present
  if (typeof ga !== 'undefined') {
    ga('set', 'page', window.location.pathname);
    ga('send', 'pageview');
  }
}

// Update active navigation item based on current URL
function updateActiveNavItem() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('nav a');
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    
    const linkPath = link.getAttribute('href').replace(/\/$/, '');
    if (currentPath === linkPath || currentPath === linkPath + '/' || 
        (linkPath !== '/' && currentPath.startsWith(linkPath))) {
      link.classList.add('active');
    }
    
    // Special case for home
    if (linkPath === '/' && (currentPath === '/' || currentPath === '')) {
      link.classList.add('active');
    }
  });
}

// Handle browser back/forward navigation
window.addEventListener('popstate', () => {
  initializePageComponents();
}); 