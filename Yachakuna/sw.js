const CACHE_NAME = 'yachakuna-v2';
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './css/variables.css',
    './css/base.css',
    './css/layout.css',
    './css/components.css',
    './css/dictionary.css',
    './css/path.css',
    './css/stories.css',
    './css/ruway.css',
    './js/state.js',
    './js/app.js',
    './js/dictionary.js',
    './js/path.js',
    './js/stories.js',
    './js/achievements.js',
    './js/guide.js',
    './js/forum.js',
    './js/ruway.js',
    './data/Unidades_1_a_11.json',
    './data/Historia_Atoj_Alqo_5_partes.json'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});
