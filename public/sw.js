const PRECACHE = "kaizen-precache-v5";
const RUNTIME = "kaizen-runtime-v5";

const WARM_ASSETS = [
  "/logo_white.svg",
  "/UAEflag.webp",
  "/dubai.webp",
  "/hero-50s.mp4",
  "/rolls1.webp",
  "/rolls2.webp",
  "/moto.webp",
  "/concord.webp",
  "/yacht.webp",
  "/home.webp",
  "/questionmark.webp",
  "/keizenCAR.webp",
  "/keizenCARar.webp",
  "/tireBack.webp",
  "/tireBackar.webp",
  "/tireFront.webp",
  "/tireFrontar.webp",
  "/crown3d.webp",
  "/diamond3d.webp",
  "/cam3d.webp",
  "/order3d.webp",
  "/shield3d.webp"
];

async function warmCache(cacheName = PRECACHE) {
  const cache = await caches.open(cacheName);
  await Promise.all(
    WARM_ASSETS.map(async (asset) => {
      try {
        await cache.add(asset);
      } catch (_error) {
        // Ignore individual asset failures to keep SW stable.
      }
    })
  );
}

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      await warmCache(PRECACHE);
      await self.skipWaiting();
    })()
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys
          .filter((key) => key.startsWith("kaizen-") && key !== PRECACHE && key !== RUNTIME)
          .map((key) => caches.delete(key))
      );
      await self.clients.claim();
    })()
  );
});

self.addEventListener("message", (event) => {
  if (event.data?.type === "WARM_CACHE") {
    event.waitUntil(warmCache(PRECACHE));
  }
});

async function networkFirst(request) {
  const cache = await caches.open(RUNTIME);
  try {
    const response = await fetch(request);
    if (response && response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (_error) {
    const cached = await cache.match(request);
    if (cached) return cached;
    return fetch(request);
  }
}

async function cacheFirst(request) {
  const pre = await caches.open(PRECACHE);
  const preCached = await pre.match(request);
  if (preCached) return preCached;

  const run = await caches.open(RUNTIME);
  const cached = await run.match(request);
  if (cached) return cached;

  const response = await fetch(request);
  if (response && response.ok) {
    run.put(request, response.clone());
  }
  return response;
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;
  if (request.headers.has("range")) return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  if (url.hostname === "localhost" || url.hostname === "127.0.0.1") return;

  if (
    url.pathname.startsWith("/src/") ||
    url.pathname.startsWith("/@vite") ||
    url.pathname.startsWith("/node_modules/") ||
    url.search.includes("direct") ||
    url.search.includes("import")
  ) {
    return;
  }

  if (request.mode === "navigate") {
    event.respondWith(networkFirst(request));
    return;
  }

  const destination = request.destination;
  const staticDestinations = new Set(["script", "style", "image", "font", "video"]);
  if (staticDestinations.has(destination)) {
    event.respondWith(cacheFirst(request));
  }
});
