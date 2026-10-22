/**
 * Third Eye Service Worker - Bandwidth-Optimized Static Cache Engine
 * - Serves immutable hashed assets instantly from cache with 0 background fetches.
 * - Caches audio on first play so subsequent plays consume 0 network bandwidth.
 * - Bypasses backend API endpoints completely.
 */

const CACHE_NAME = 'thirdeye-v4-static';

const CACHEABLE_EXTENSIONS = [
  '.webp',
  '.png',
  '.jpg',
  '.jpeg',
  '.svg',
  '.mp3',
  '.wav',
  '.woff',
  '.woff2',
  '.ttf',
  '.js',
  '.css'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
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
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  // 1. Never intercept backend API calls or uploads
  if (url.pathname.startsWith('/api') || url.pathname.startsWith('/uploads')) {
    return;
  }

  // 2. HTML navigation requests: Network-first to always detect fresh deployments
  if (request.mode === 'navigate' || url.pathname === '/' || url.pathname.endsWith('.html')) {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const clone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          }
          return networkResponse;
        })
        .catch(() => caches.match(request))
    );
    return;
  }

  // 3. Static assets, hashed chunks, fonts, and audio: Pure Cache-First (NO background re-fetch!)
  const isCacheable =
    CACHEABLE_EXTENSIONS.some((ext) => url.pathname.endsWith(ext)) ||
    url.hostname.includes('fonts.googleapis.com') ||
    url.hostname.includes('fonts.gstatic.com') ||
    url.hostname.includes('api.fontshare.com') ||
    url.pathname.includes('/assets/') ||
    url.pathname.includes('/audio/');

  if (isCacheable) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) {
          // Zero network request if already cached!
          return cachedResponse;
        }

        // Fetch once, store permanently in cache
        return fetch(request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const clone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          }
          return networkResponse;
        });
      })
    );
  }
});
