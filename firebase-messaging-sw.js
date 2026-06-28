/* Wylie Parks — background push handler.
   This file MUST sit at the site root next to index.html. Do not rename it. */
var __fcmError = null;
try {
  importScripts('/firebase-app-compat.js');
  importScripts('/firebase-messaging-compat.js');
  firebase.initializeApp({
    apiKey: "AIzaSyBQmVm-VFtPIFYN4S2vhB6cvvDW7GwBq5o",
    authDomain: "wylie-parks.firebaseapp.com",
    projectId: "wylie-parks",
    storageBucket: "wylie-parks.firebasestorage.app",
    messagingSenderId: "224560721652",
    appId: "1:224560721652:web:fc887bd8962adab43af8a1"
  });
  var messaging = firebase.messaging();
  messaging.onBackgroundMessage(function (payload) {
    var n = (payload && payload.notification) || {};
    var data = (payload && payload.data) || {};
    self.registration.showNotification(n.title || 'Wylie Parks', {
      body: n.body || 'New work order assigned.',
      icon: '/icon-192.png',
      badge: '/icon-192.png',
      tag: data.orderId || 'wylie-order',
      renotify: true,
      data: data
    });
  });
} catch (e) {
  __fcmError = String((e && e.message) || e);
}

/* Raw push fallback — shows a notification even if the Firebase handler above
   didn't initialize, so a ping is never silently dropped. */
self.addEventListener('push', function (e) {
  if (typeof messaging !== 'undefined' && messaging) return; /* Firebase handler is active; let it handle */
  var payload = {};
  try { payload = e.data ? e.data.json() : {}; } catch (_) {
    try { payload = { notification: { body: e.data && e.data.text() } }; } catch (__) {}
  }
  var n = payload.notification || (payload.data || {}) || {};
  var data = payload.data || {};
  e.waitUntil(self.registration.showNotification(n.title || 'Wylie Parks', {
    body: n.body || 'New work order assigned.',
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    tag: data.orderId || 'wylie-order',
    renotify: true,
    data: data
  }));
});

self.addEventListener('message', function (e) {
  if (e.data && e.data.q === 'fcmStatus' && e.ports && e.ports[0]) {
    e.ports[0].postMessage(__fcmError || 'ok');
  }
});

self.addEventListener('notificationclick', function (e) {
  e.notification.close();
  e.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function (list) {
      for (var i = 0; i < list.length; i++) { if ('focus' in list[i]) return list[i].focus(); }
      if (clients.openWindow) return clients.openWindow('/');
    })
  );
});
