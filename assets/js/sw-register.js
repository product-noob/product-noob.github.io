// Register Service Worker for better performance and offline capability
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js', {
      scope: '/'
    })
    .then(registration => {
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
      
      // Handle updates
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            // New content is available, refresh the page
            window.location.reload();
          }
        });
      });
    })
    .catch(error => {
      console.error('ServiceWorker registration failed:', error);
    });
  });
}
