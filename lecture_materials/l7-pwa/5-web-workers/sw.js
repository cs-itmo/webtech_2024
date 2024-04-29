self.addEventListener('install', event => {
    console.log('installing Collect some cats');

    caches.open(`cats-storage`).then(cache =>
        fetch("https://cataas.com/cat").then(response => response.blob()).then(imageBlob => {
            cache.put("cat", new Response(imageBlob));
        }));
});

self.addEventListener('activate', event => {
    clients.claim();
    console.log('activated');
});

self.addEventListener('fetch', event => {
    const url = new URL(event.request.url);
    console.log(`Handled url: ${event.request.url}`);
    if (url.origin == location.origin && url.pathname.startsWith('/cat/')) {
        event.respondWith(
            caches.match(url.pathname).then(cachedResponse => {
                if (cachedResponse) {
                    return cachedResponse;
                }
                return caches.open(`cats-storage`).then(cache => {
                    return fetch("https://cataas.com/cat").then(response => {
                        return cache.put(url.pathname, response.clone()).then(() => {
                            return response;
                        });
                    });
                });
            })
        );
    }
});