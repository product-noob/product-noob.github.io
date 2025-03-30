// Simple Sticky Header Implementation
document.addEventListener('DOMContentLoaded', function() {
  // Basic sticky header implementation that works everywhere
  const header = document.querySelector('.wrapper-masthead');
  const spacer = document.getElementById('header-spacer');
  
  if (!header) return;
  
  // Store original header height
  let headerHeight = header.offsetHeight;
  
  // Set spacer height
  if (spacer) {
    spacer.style.height = headerHeight + 'px';
  }
  
  // Handle sticky header on scroll
  function handleScroll() {
    // Very simple check - is the page scrolled at all?
    if (window.pageYOffset > 10) {
      header.classList.add('sticky');
      document.body.classList.add('has-sticky-header');
      if (spacer) spacer.style.display = 'block';
    } else {
      header.classList.remove('sticky');
      document.body.classList.remove('has-sticky-header');
      if (spacer) spacer.style.display = 'none';
    }
  }
  
  // Add scroll event listener
  window.addEventListener('scroll', handleScroll, false);
  
  // Check on page load
  handleScroll();
  
  // Add resize handler
  window.addEventListener('resize', function() {
    // Recalculate header height if resized
    if (!header.classList.contains('sticky')) {
      headerHeight = header.offsetHeight;
      if (spacer) spacer.style.height = headerHeight + 'px';
    }
    handleScroll();
  }, false);
  
  // Mobile touch support
  if ('ontouchstart' in window) {
    document.addEventListener('touchmove', handleScroll, false);
  }
});

// Make sure sticky header works after page transitions
if (typeof document.addEventListener === 'function') {
  document.addEventListener('DOMContentLoaded', function() {
    if (typeof window.swup !== 'undefined') {
      // Re-initialize sticky header after Swup page transitions
      window.swup.hooks.on('content:replace', function() {
        setTimeout(function() {
          // Re-trigger the DOM content loaded event handler
          const event = document.createEvent('HTMLEvents');
          event.initEvent('DOMContentLoaded', true, false);
          document.dispatchEvent(event);
        }, 10);
      });
    }
  });
}
