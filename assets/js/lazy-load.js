// Add loading="lazy" to all images that don't already have it
document.addEventListener('DOMContentLoaded', function() {
  const images = document.querySelectorAll('img:not([loading])');
  images.forEach(img => {
    img.setAttribute('loading', 'lazy');
    
    // Also add decoding="async" for additional performance
    if (!img.hasAttribute('decoding')) {
      img.setAttribute('decoding', 'async');
    }
  });
});
