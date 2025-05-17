// Service Worker for princejain.me
const CACHE_NAME = 'princejain-cache-v1';
const urlsToCache = [
  '/', // root
  `${self.location.origin}/css/style.css`,
  `${self.location.origin}/images/site-icon.webp`,
  `${self.location.origin}/scrollbar.js`,
  `${self.location.origin}/assets/js/lazy-load.js`,
  `${self.location.origin}/offline.html` // optional offline fallback
];

// Install event - pre-cache important assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Opened cache');
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting(); // Activate SW immediately
});

// Fetch event - stale-while-revalidate strategy
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.open(CACHE_NAME).then(cache =>
      cache.match(event.request).then(cachedResponse => {
        const fetchPromise = fetch(event.request)
          .then(networkResponse => {
            if (
              networkResponse &&
              networkResponse.status === 200 &&
              networkResponse.type === 'basic' &&
              ['script', 'style', 'image'].includes(event.request.destination)
            ) {
              cache.put(event.request, networkResponse.clone());
            }
            return networkResponse;
          })
          .catch(() => {
            // Offline fallback
            if (event.request.mode === 'navigate') {
              return caches.match(`${self.location.origin}/offline.html`);
            }
            return cachedResponse;
          });

        return cachedResponse || fetchPromise;
      })
    )
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => 
      Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
  self.clients.claim(); // Take control of uncontrolled clients
});

// // Service Worker for princejain.me
// const CACHE_NAME = 'princejain-cache-v1';
// const urlsToCache = [
//   '/',
//   '/css/style.css',
//   '/images/site-icon.webp',
//   '/scrollbar.js',
//   '/assets/js/lazy-load.js'
// ];

// // Install event - cache core assets
// self.addEventListener('install', event => {
//   event.waitUntil(
//     caches.open(CACHE_NAME)
//       .then(cache => {
//         console.log('Opened cache');
//         return cache.addAll(urlsToCache);
//       })
//   );
// });

// // Fetch event - serve from cache, fall back to network
// self.addEventListener('fetch', event => {
//   event.respondWith(
//     caches.match(event.request)
//       .then(response => {
//         // Cache hit - return response
//         if (response) {
//           return response;
//         }
        
//         // Clone the request because it's a one-time use stream
//         const fetchRequest = event.request.clone();

//         return fetch(fetchRequest).then(response => {
//           // Check if valid response
//           if (!response || response.status !== 200 || response.type !== 'basic') {
//             return response;
//           }

//           // Clone the response because it's a one-time use stream
//           const responseToCache = response.clone();

//           // Cache any valid responses
//           if (event.request.url.match(/\.(js|css|png|jpg|jpeg|webp|svg|ico)$/)) {
//             caches.open(CACHE_NAME)
//               .then(cache => {
//                 cache.put(event.request, responseToCache);
//               });
//           }

//           return response;
//         });
//       })
//   );
// });

// // Activate event - clean up old caches
// self.addEventListener('activate', event => {
//   const cacheWhitelist = [CACHE_NAME];
  
//   event.waitUntil(
//     caches.keys().then(cacheNames => {
//       return Promise.all(
//         cacheNames.map(cacheName => {
//           if (cacheWhitelist.indexOf(cacheName) === -1) {
//             return caches.delete(cacheName);
//           }
//         })
//       );
//     })
//   );
// });
