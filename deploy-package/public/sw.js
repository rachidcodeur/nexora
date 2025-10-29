const CACHE_NAME = 'nexora-v1'
const urlsToCache = [
  '/',
  '/offres',
  '/contact',
  '/realisations',
  '/manifest.json',
  '/_next/static/css/',
  '/_next/static/js/',
]

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache)
      })
  )
})

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response
        }
        return fetch(event.request)
      }
    )
  )
})
