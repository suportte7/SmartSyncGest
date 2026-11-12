// =========================================================================
// SmartSyncGest - SERVICE WORKER (CACHE OFFLINE PWA)
// =========================================================================

const CACHE_NAME = 'smartsyncgest-pwa-v6';
const ASSETS_LOCAIS = [
  './',
  './index.html',
  './config.js',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return Promise.allSettled(
        ASSETS_LOCAIS.map((url) => cache.add(url).catch(() => null))
      );
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;

  // Ignora chamadas POST ou requisições diretas à API do Google Apps Script
  if (req.method !== 'GET' || req.url.includes('script.google.com') || req.url.includes('script.googleusercontent.com')) {
    return;
  }

  // Estratégia Network-First com fallback instantâneo para o Cache Local
  event.respondWith(
    fetch(req)
      .then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(req, responseClone);
          });
        }
        return networkResponse;
      })
      .catch(() => {
        return caches.match(req).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          if (req.mode === 'navigate') {
            return caches.match('./index.html');
          }
        });
      })
  );
});
