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
      cache: true,
      plugins: [],
      linkSelector: 'a[href^="' + window.location.origin + '"]:not([target="_blank"]):not([href^="' + window.location.origin + '/tools/calculator"])',
      skipPopStateHandling: function(event) {
        return event.state === null;
      }
    });
    
    // Handle page transitions
    swup.on('contentReplaced', function() {
      // Re-initialize any page-specific functionality
      if (typeof initCalculator === 'function') {
        initCalculator();
      }
      
      // Update any other page elements that need refreshing
      document.querySelectorAll('img[data-src]').forEach(img => {
        if (typeof lazyLoad === 'function') {
          lazyLoad(img);
        }
      });
    });
    
    // Handle navigation start
    swup.on('visitStart', function() {
      // Show loading indicator if needed
      const progressBar = document.getElementById('progress-bar');
      if (progressBar) {
        progressBar.style.width = '0%';
        progressBar.style.opacity = '1';
      }
    });
    
    // Handle navigation end
    swup.on('visitEnd', function() {
      // Hide loading indicator
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
