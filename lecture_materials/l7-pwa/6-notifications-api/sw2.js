self.addEventListener('install', event => {
    console.log('installed');
});

self.addEventListener('activate', event => {
    clients.claim();
    console.log('activated');
    setInterval(function () {
        self.registration.showNotification("Hello!!!!", {
            body: "Wake up!",
            icon: "bell.png",
            vibrate: [200, 100, 200, 100, 200, 100, 200]
        });
    }, 1000);
});
