const staticDevFax = "dev-fax-site-v1";
const assets = [
  "src/assets/menu.svg",
  "src/assets/message-send.svg",
  "src/assets/reload.svg",
  "src/assets/user-circle.svg",
  "src/App.jsx",
  "src/redux/store.js",
  "src/components/Header.jsx",
  "src/components/Input.jsx",
  "src/components/Message.jsx",
  "src/components/MessageContainer.jsx",
  "src/components/PendingStateComponent.jsx",
  "src/components/SideBar.jsx",
  "src/index.css",
  "/",
];

self.addEventListener("install", (installEvent) => {
  installEvent.waitUntil(
    caches.open(staticDevFax).then((cache) => {
      cache.addAll(assets);
    }),
  );
});

self.addEventListener("fetch", (fetchEvent) => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then((res) => {
      return res || fetch(fetchEvent.request);
    }),
  );
});
