const CACHE_NAME = "jeopardy-cache-v1";
const FILES_TO_CACHE = [
  "index.html",
  "domanda.html",
  "risposta.html",
  "style.css",
  "script.js",
  "manifest.json",
  "icons/icon-192.png",
  "icons/icon-512.png"
  // aggiungi qui anche audio o immagini se vuoi che siano disponibili offline
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
