// Performance-optimized Sticky Header Implementation
document.addEventListener('DOMContentLoaded', function() {
  // Get DOM elements
  const header = document.querySelector('.wrapper-masthead');
  const spacer = document.getElementById('header-spacer');
  
  if (!header) return;
  
  // Store original header height
  let headerHeight = header.offsetHeight;
  let lastScrollY = 0;
  let ticking = false;
  let isSticky = false;
  
  // Set spacer height
  if (spacer) {
    spacer.style.height = headerHeight + 'px';
    spacer.style.display = 'none';
  }
  
  // Performance-optimized scroll handler
  function handleScroll() {
    lastScrollY = window.pageYOffset;
    requestTick();
  }
  
  // Use requestAnimationFrame for better performance
  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(updateStickyState);
      ticking = true;
    }
  }
  
  // Update sticky header state
  function updateStickyState() {
    // Check if scroll position requires sticky state change
    if (lastScrollY > 10) {
      if (!isSticky) {
        header.classList.add('sticky');
        document.body.classList.add('has-sticky-header');
        if (spacer) spacer.style.display = 'block';
        isSticky = true;
      }
    } else {
      if (isSticky) {
        header.classList.remove('sticky');
        document.body.classList.remove('has-sticky-header');
        if (spacer) spacer.style.display = 'none';
        isSticky = false;
      }
    }
    
    ticking = false;
  }
  
  // Add passive scroll listeners for better performance
  window.addEventListener('scroll', handleScroll, { passive: true });
  
  // Check initial state on page load
  updateStickyState();
  
  // Optimized resize handler
  let resizeTimeout;
  window.addEventListener('resize', function() {
    // Debounce resize operations
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function() {
      // Only recalculate if not in sticky state
      if (!isSticky) {
        headerHeight = header.offsetHeight;
        if (spacer) spacer.style.height = headerHeight + 'px';
      }
      updateStickyState();
    }, 100);
  }, { passive: true });
  
  // Optimized touch handling for mobile
  if ('ontouchstart' in window) {
    document.addEventListener('touchmove', handleScroll, { passive: true });
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
