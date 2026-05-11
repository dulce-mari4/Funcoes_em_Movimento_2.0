const cacheName = 'funcoes-v1';
const staticAssets = [
  './',
  './inicio.html',
  './grafico1.js',
  './manifest.json',
  './abaco.png',
  'https://cdn.jsdelivr.net/npm/chart.js'
];

self.addEventListener('install', async el => {
  const cache = await caches.open(cacheName);
  await cache.addAll(staticAssets);
});

self.addEventListener('fetch', el => {
  const req = el.request;
  el.respondWith(cacheFirst(req));
});

async function cacheFirst(req) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(req);
  return cached || fetch(req);
}