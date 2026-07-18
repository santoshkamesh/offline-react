const CACHE_NAME = "offline-v1";

const APP_SHELL = ["/", "/offline.html"];

self.addEventListener("install", (event) => {
  console.log("Installing...");

  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Caching app shell...");
      return cache.addAll(APP_SHELL);
    }),
  );

  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  console.log("Activated");

  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
  const url = event.request.url;
  if (
    url.includes("@vite") ||
    url.includes("@react-refresh") ||
    url.includes("/src/") ||
    url.includes("/node_modules/") ||
    url.includes(".tsx") ||
    url.includes(".ts") ||
    url.includes("sockjs")
  ) {
    return;
  }

  // Runtime cache for built assets so they work offline after first load
  if (url.includes("/assets/")) {
    event.respondWith(
      caches.match(event.request).then((cached) => {
        if (cached) {
          console.log("Asset cache hit:", event.request.url);
          return cached;
        }

        return fetch(event.request)
          .then((response) => {
            // Only cache successful responses
            if (response && response.status === 200) {
              const copy = response.clone();
              caches
                .open(CACHE_NAME)
                .then((cache) => cache.put(event.request, copy));
            }
            return response;
          })
          .catch((err) => {
            console.warn("Asset fetch failed, offline.", err);
            return new Response("Offline", {
              status: 503,
              headers: { "Content-Type": "text/plain" },
            });
          });
      }),
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) {
        console.log("Cache hit:", event.request.url);
        return cached;
      }

      console.log("Network:", event.request.url);
      return fetch(event.request)
        .then((response) => {
          return response;
        })
        .catch((err) => {
          console.warn("Fetch failed, returning fallback.", err);

          // If this is a navigation request, return the offline page
          if (event.request.mode === "navigate") {
            return (
              caches.match("/offline.html") ||
              new Response("<h1>Offline</h1>", {
                status: 503,
                headers: { "Content-Type": "text/html" },
              })
            );
          }

          // For other requests, return a safe plain-text 503 response to avoid MIME errors
          return new Response("Offline", {
            status: 503,
            statusText: "Offline",
            headers: { "Content-Type": "text/plain" },
          });
        });
    }),
  );
});
