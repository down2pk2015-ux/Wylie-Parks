/* Wylie Parks — background push handler.
   This file MUST sit at the site root next to index.html. Do not rename it. */
importScripts('https://www.gstatic.com/firebasejs/10.12.5/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.5/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyBQmVm-VFtPIFYN4S2vhB6cvvDW7GwBq5o",
  authDomain: "wylie-parks.firebaseapp.com",
  projectId: "wylie-parks",
  storageBucket: "wylie-parks.firebasestorage.app",
  messagingSenderId: "224560721652",
  appId: "1:224560721652:web:fc887bd8962adab43af8a1"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  const n = (payload && payload.notification) || {};
  const data = (payload && payload.data) || {};
  self.registration.showNotification(n.title || 'Wylie Parks', {
    body: n.body || 'New work order assigned.',
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    tag: data.orderId || 'wylie-order',
    renotify: true,
    data: data
  });
});

self.addEventListener('notificationclick', function (e) {
  e.notification.close();
  e.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function (list) {
      for (const c of list) { if ('focus' in c) return c.focus(); }
      if (clients.openWindow) return clients.openWindow('/');
    })
  );
});
