const CACHE_NAME = 'smartsyncgest-v1.0.0';
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './config.js',
    './manifest.json'
];

// Instala o Service Worker e armazena os arquivos no cache
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
});

// Ativa e limpa caches antigos
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.filter(name => name !== CACHE_NAME)
                          .map(name => caches.delete(name))
            );
        })
    );
});

// Intercepta as requisições (Ignora a API do Google para não travar os envios)
self.addEventListener('fetch', event => {
    if (event.request.url.includes('script.google.com')) {
        return; // Deixa as requisições de banco de dados passarem direto
    }
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});