cd ~/yhub-apps/public
cat > sw.js << 'SWEOF'
// ============================================
// Service Worker — Y-Hub App
// ============================================
const CACHE_NAME = 'yhub-app-v1.0.19';

const ASSETS = [
  './',
  './index.html',
  './home.html',
  './auth-guard.js',
  './app.js',
  './manifest.json',
  'https://cdn.tailwindcss.com',
  'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap'
];

// Install
self.addEventListener('install', event => {
  console.log('[SW] Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => Promise.all(
        ASSETS.map(url => cache.add(url).catch(err => console.warn('[SW] Gagal cache:', url)))
      ))
      .then(() => {
        console.log('[SW] Install complete');
        return self.skipWaiting();
      })
  );
});

// Activate — hapus cache lama
self.addEventListener('activate', event => {
  console.log('[SW] Activating...');
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(key => key !== CACHE_NAME).map(key => {
        console.log('[SW] Hapus cache lama:', key);
        return caches.delete(key);
      })
    )).then(() => self.clients.claim())
  );
});

// Fetch — hanya cache GET, skip POST/Firebase/Google API
self.addEventListener('fetch', event => {
  const url = event.request.url;
  const method = event.request.method;

  // ⚠️ HANYA cache request GET. Skip POST, PUT, DELETE, dll.
  if (method !== 'GET') {
    return;
  }

  // Skip chrome-extension, firebase, google API
  if (url.startsWith('chrome-extension://') ||
      url.includes('firestore.googleapis.com') ||
      url.includes('firebaseio.com') ||
      url.includes('identitytoolkit.googleapis.com') ||
      url.includes('script.google.com') ||
      url.includes('script.googleusercontent.com') ||
      url.includes('docs.google.com')) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      if (cachedResponse) {
        // Background refresh
        fetch(event.request).then(networkResponse => {
          if (networkResponse && networkResponse.status === 200) {
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, networkResponse.clone()));
          }
        }).catch(() => {});
        return cachedResponse;
      }
      
      return fetch(event.request).then(networkResponse => {
        if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, responseClone));
        }
        return networkResponse;
      }).catch(() => {
        if (event.request.mode === 'navigate') {
          return caches.match('./index.html');
        }
      });
    })
  );
});

self.addEventListener('message', event => {
  if (event.data === 'SKIP_WAITING') self.skipWaiting();
});
SWEOF

# Verifikasi
grep "CACHE_NAME" sw.js
grep -c "method !== 'GET'" sw.js