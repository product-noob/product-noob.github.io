// Performance-optimized Sticky Header Implementation
document.addEventListener('DOMContentLoaded', function() {
  // Get DOM elements
  const header = document.querySelector('header');
  const headerSpacer = document.getElementById('header-spacer');
  const progressBar = document.getElementById('progress-bar');
  
  if (!header || !headerSpacer) return;
  
  // Store original header height
  let headerHeight = header.offsetHeight;
  let lastScrollTop = 0;
  let ticking = false;
  let isSticky = false;
  
  // Set spacer height
  headerSpacer.style.height = headerHeight + 'px';
  headerSpacer.style.display = 'none';
  
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

    // Handle header visibility
    if (scrollTop > lastScrollTop && scrollTop > header.offsetHeight) {
      // Scrolling down
      header.classList.add('header-hidden');
    } else {
      // Scrolling up
      header.classList.remove('header-hidden');
    }

    // Update header background
    if (scrollTop > 50) {
      header.classList.add('header-scrolled');
    } else {
      header.classList.remove('header-scrolled');
    }

    lastScrollTop = scrollTop;
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
    if (lastScrollTop > 10) {
      if (!isSticky) {
        header.classList.add('sticky');
        document.body.classList.add('has-sticky-header');
        if (headerSpacer) headerSpacer.style.display = 'block';
        isSticky = true;
      }
    } else {
      if (isSticky) {
        header.classList.remove('sticky');
        document.body.classList.remove('has-sticky-header');
        if (headerSpacer) headerSpacer.style.display = 'none';
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
        if (headerSpacer) headerSpacer.style.height = headerHeight + 'px';
      }
      updateStickyState();
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
