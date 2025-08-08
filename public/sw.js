
const CACHE = 'clipcrop-v5.1'
const CORE = ['/', '/index.html', '/manifest.webmanifest']

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)))
})

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))))
})

self.addEventListener('fetch', e => {
  const req = e.request
  if (req.mode === 'navigate') {
    e.respondWith(fetch(req).catch(_ => caches.match('/index.html')))
    return
  }
  // Stale-While-Revalidate for same-origin GET
  if (req.method === 'GET' && new URL(req.url).origin === self.location.origin) {
    e.respondWith((async () => {
      const cache = await caches.open(CACHE)
      const cached = await cache.match(req)
      const fetchPromise = fetch(req).then(res => {
        cache.put(req, res.clone())
        return res
      }).catch(_ => cached)
      return cached || fetchPromise
    })())
  }
})
