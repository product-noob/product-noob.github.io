// CDN versions of Swup and its plugins for smooth page transitions
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
});

function initSwup() {
  if (typeof Swup !== 'undefined') {
    const swup = new Swup({
      containers: ['#main'],
      animateHistoryBrowsing: true,
      animationSelector: '[class*="transition-"]',
      cache: true,
      plugins: []
    });
    
    // Show loader on page transition start
    swup.hooks.on('content:replace', function() {
      document.querySelector('.page-loader').classList.remove('is-active');
      
      // Reinitialize scripts
      reinitializeScripts();
    });
    
    // Show loader on page transition start
    swup.hooks.on('visit:start', function() {
      document.querySelector('.page-loader').classList.add('is-active');
      
      // Scroll to top on page change
      window.scrollTo({
        top: 0,
        behavior: 'auto'
      });
    });
    
    // Set active nav item
    updateActiveNavItem();
    swup.hooks.on('content:replace', updateActiveNavItem);
  }
}

// This function will run whenever a page transition occurs to reinitialize any scripts
function reinitializeScripts() {
  // Re-run lazy loading
  if (typeof initLazyLoad === 'function') {
    initLazyLoad();
  }
  
  // Re-initialize other scripts if needed
  if (document.querySelector('#progress-bar')) {
    initScrollProgress();
  }
  
  // Reapply syntax highlighting if needed for code blocks
  if (document.querySelectorAll('pre code').length > 0 && typeof hljs !== 'undefined') {
    document.querySelectorAll('pre code').forEach((block) => {
      hljs.highlightBlock(block);
    });
  }
  
  // If Google Analytics is present, track page view
  if (typeof ga !== 'undefined') {
    ga('set', 'page', window.location.pathname);
    ga('send', 'pageview');
  }
}

// Add active class to current nav item based on the URL
function updateActiveNavItem() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('nav a');
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    
    // Check if the current URL matches the nav link
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
