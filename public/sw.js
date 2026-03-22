// Service Worker: Caché de Assets 3D de Spline (Stale-While-Revalidate / Cache-First)
const CACHE_NAME = "spline-cache-v2";

// Interceptar todos los dominios que Spline usa para cargar:
// 1. Scene file, 2. WASM files, 3. Draco decoders, 4. Google Fonts
const CACHE_ORIGINS = [
  "https://prod.spline.design",
  "https://unpkg.com/@splinetool",
  "https://www.gstatic.com/draco",
  "https://fonts.gstatic.com"
];

self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME && key.startsWith("spline-cache"))
          .map((key) => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  const isCacheableAsset = CACHE_ORIGINS.some((origin) =>
    event.request.url.startsWith(origin)
  );

  if (!isCacheableAsset) return;

  event.respondWith(
    caches.open(CACHE_NAME).then((cache) =>
      cache.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return fetch(event.request).then((networkResponse) => {
          if (networkResponse.ok || networkResponse.type === "opaque") {
            cache.put(event.request, networkResponse.clone());
          }
          return networkResponse;
        }).catch(() => {
          // Ignore network errors completely for cached assets
        });
      })
    )
  );
});
