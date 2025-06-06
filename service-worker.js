const CACHE_NAME = 'ceviri-app-cache-v1';
const urlsToCache = [
  '.',
  'index.html',
  'icon-192.png',
  'icon-512.png'
];

// Install event - cache dosyaları yükle
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting())
  );
});

// Activate event - eski cache'leri temizle
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => 
      Promise.all(
        cacheNames.filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      )
    )
  );
});

// Fetch event - önce cache, sonra ağdan yükle
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => 
      response || fetch(event.request)
    )
  );
});
