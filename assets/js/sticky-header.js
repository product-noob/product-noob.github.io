// Performance-optimized Sticky Header Implementation
document.addEventListener('DOMContentLoaded', function() {
  // Get DOM elements
  const header = document.querySelector('.wrapper-masthead');
  const headerSpacer = document.getElementById('header-spacer');
  const progressBar = document.getElementById('progress-bar');
  
  if (!header || !headerSpacer) return;
  
  // Store original header height
  let headerHeight = header.offsetHeight;
  let lastScrollTop = 0;
  let scrollThreshold = 100; // Adjust this value to control when header collapses
  
  // Set spacer height and make it visible
  headerSpacer.style.height = headerHeight + 'px';
  headerSpacer.style.display = 'block';
  
  // Add sticky header class to body
  document.body.classList.add('has-sticky-header');
  
  // Performance-optimized scroll handler
  function handleScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Update progress bar
    if (progressBar) {
      const winHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      const scrollPercent = (scrollTop / (docHeight - winHeight)) * 100;
      progressBar.style.width = scrollPercent + '%';
    }

    // Handle header collapsing
    if (scrollTop > scrollThreshold) {
      header.classList.add('header-collapsed');
      header.classList.add('header-scrolled');
    } else {
      header.classList.remove('header-collapsed');
      if (scrollTop > 50) {
        header.classList.add('header-scrolled');
      } else {
        header.classList.remove('header-scrolled');
      }
    }

    lastScrollTop = scrollTop;
  }
  
  // Add passive scroll listeners for better performance
  window.addEventListener('scroll', handleScroll, { passive: true });
  
  // Optimized resize handler
  let resizeTimeout;
  window.addEventListener('resize', function() {
    // Debounce resize operations
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function() {
      headerHeight = header.offsetHeight;
      headerSpacer.style.height = headerHeight + 'px';
    }, 100);
  }, { passive: true });
  
  // Optimized touch handling for mobile
  if ('ontouchstart' in window) {
    document.addEventListener('touchmove', handleScroll, { passive: true });
  }

  // Handle Swup page transitions
  if (typeof window.swup !== 'undefined') {
    window.swup.on('contentReplaced', function() {
      // Update header height after page transition
      headerSpacer.style.height = header.offsetHeight + 'px';
      
      // Reset scroll position
      window.scrollTo(0, 0);
    });
  }
});

// Optimize reinitialization after page transitions
if (typeof document.addEventListener === 'function') {
  document.addEventListener('DOMContentLoaded', function() {
    if (typeof window.swup !== 'undefined') {
      // Use more efficient hook timing
      window.swup.hooks.on('content:replace', function() {
        // Allow browser to finish rendering before reinitializing
        requestAnimationFrame(function() {
          // Re-trigger the DOM content loaded event handler
          const event = document.createEvent('HTMLEvents');
          event.initEvent('DOMContentLoaded', true, false);
          document.dispatchEvent(event);
        });
      });
    }
  });
}
