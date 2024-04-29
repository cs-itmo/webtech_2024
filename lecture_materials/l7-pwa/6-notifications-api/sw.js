self.addEventListener('install', event => {
    console.log('installed');
});

self.addEventListener('activate', event => {
    clients.claim();
    console.log('activated');
});
