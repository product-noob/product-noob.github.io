// Handle page transitions
document.addEventListener('DOMContentLoaded', () => {
  // Initialize any page-specific functionality
  const calculator = document.querySelector('.calculator');
  if (calculator) {
    // Re-initialize calculator if it exists on the page
    if (typeof initCalculator === 'function') {
      initCalculator();
    }
  }
});

// Handle navigation events
window.addEventListener('popstate', () => {
  // Re-initialize page-specific functionality
  const calculator = document.querySelector('.calculator');
  if (calculator) {
    if (typeof initCalculator === 'function') {
      initCalculator();
    }
  }
}); 