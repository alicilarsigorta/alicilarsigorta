const CACHE_NAME = 'alicilar-admin-v1';
const STATIC_ASSETS = [
  '/admin',
  '/admin/teklifler',
  '/admin/icerik',
  '/admin/gorunum',
  '/admin/ayarlar',
  '/manifest.json',
  '/logo-dark.png',
];

// Install — cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS).catch(() => {
        // Some assets may fail on first install, that's okay
      });
    })
  );
  self.skipWaiting();
});

// Activate — clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

// Fetch — network-first strategy for admin pages
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') return;

  // Only cache admin routes and static assets
  const url = new URL(event.request.url);
  const isAdminRoute = url.pathname.startsWith('/admin');
  const isStaticAsset = url.pathname.match(/\.(js|css|png|jpg|svg|woff2?)$/);

  if (isAdminRoute || isStaticAsset) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // Cache successful responses
          if (response.status === 200) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseClone);
            });
          }
          return response;
        })
        .catch(() => {
          // Offline fallback — serve from cache
          return caches.match(event.request);
        })
    );
  }
});

// Listen for notification click
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  const url = event.notification.data?.url || '/admin/teklifler';

  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clients) => {
      // Focus existing window or open new one
      for (const client of clients) {
        if (client.url.includes('/admin') && 'focus' in client) {
          return client.focus();
        }
      }
      return self.clients.openWindow(url);
    })
  );
});

// Push notification handler (for future server-push support)
self.addEventListener('push', (event) => {
  const data = event.data?.json() || {};
  const title = data.title || 'Yeni Teklif Başvurusu';
  const options = {
    body: data.body || 'Yeni bir teklif başvurusu alındı.',
    icon: '/icons/icon-192.png',
    badge: '/icons/icon-192.png',
    vibrate: [200, 100, 200],
    tag: 'new-offer',
    renotify: true,
    data: { url: data.url || '/admin/teklifler' },
  };
  event.waitUntil(self.registration.showNotification(title, options));
});
