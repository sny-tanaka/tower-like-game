if (!self.define) {
  let e,
    i = {};
  const n = (n, c) => (
    (n = new URL(n + '.js', c).href),
    i[n] ||
      new Promise((i) => {
        if ('document' in self) {
          const e = document.createElement('script');
          ((e.src = n), (e.onload = i), document.head.appendChild(e));
        } else ((e = n), importScripts(n), i());
      }).then(() => {
        let e = i[n];
        if (!e) throw new Error(`Module ${n} didn’t register its module`);
        return e;
      })
  );
  self.define = (c, r) => {
    const s = e || ('document' in self ? document.currentScript.src : '') || location.href;
    if (i[s]) return;
    let o = {};
    const d = (e) => n(e, s),
      a = { module: { uri: s }, exports: o, require: d };
    i[s] = Promise.all(c.map((e) => a[e] || d(e))).then((e) => (r(...e), o));
  };
}
define(['./workbox-8c29f6e4'], function (e) {
  'use strict';
  (self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        { url: 'registerSW.js', revision: '810786f0a72d79372ff50293c13b9108' },
        { url: 'index.html', revision: '0055291e5b463ad333096e8a26976e3c' },
        { url: 'icon-512.png', revision: '318032293ba71f818b57decedb9afadf' },
        { url: 'icon-192.png', revision: '755ecad9c3cf1a68cdc525ce5d7eb299' },
        { url: 'favicon.ico', revision: 'fd32cce62c8da11c49d9a6f0c9ada784' },
        { url: 'assets/index-BYIn8JLG.js', revision: null },
        { url: 'assets/index-BUIBaW_9.css', revision: null },
        { url: 'favicon.ico', revision: 'fd32cce62c8da11c49d9a6f0c9ada784' },
        { url: 'icon-192.png', revision: '755ecad9c3cf1a68cdc525ce5d7eb299' },
        { url: 'icon-512.png', revision: '318032293ba71f818b57decedb9afadf' },
        { url: 'robots.txt', revision: 'fa1ded1ed7c11438a9b0385b1e112850' },
        { url: 'manifest.webmanifest', revision: '011a4a780afe300f8cf8233aa7a758f9' },
      ],
      {}
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL('index.html'))));
});
