const CACHE_NAME = "cloneit-pwa-v5";
const APP_SHELL = ["/", "/index.html", "/src/app.js", "/src/styles.css", "/src/library.js", "/src/sharing.js", "/src/game-rules.js", "/manifest.webmanifest", "/icon.svg", "/icon-192.png", "/icon-512.png", "/apple-touch-icon.png"];
const CARD_FILES = Array.from({ length: 26 }, (_, index) => `/cards/scene-${String(index + 1).padStart(2, "0")}.png`);

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll([...APP_SHELL, ...CARD_FILES])).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))).then(() => self.clients.claim()));
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET" || new URL(event.request.url).origin !== self.location.origin) return;
  if (new URL(event.request.url).pathname.startsWith("/api/")) return;
  event.respondWith(caches.match(event.request).then((cached) => cached || fetch(event.request).then((response) => {
    if (response.ok) caches.open(CACHE_NAME).then((cache) => cache.put(event.request, response.clone()));
    return response;
  })));
});
