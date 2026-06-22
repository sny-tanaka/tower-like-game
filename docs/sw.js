if (!self.define) {
  let e,
    i = {};
  const c = (c, n) => (
    (c = new URL(c + '.js', n).href),
    i[c] ||
      new Promise((i) => {
        if ('document' in self) {
          const e = document.createElement('script');
          ((e.src = c), (e.onload = i), document.head.appendChild(e));
        } else ((e = c), importScripts(c), i());
      }).then(() => {
        let e = i[c];
        if (!e) throw new Error(`Module ${c} didn’t register its module`);
        return e;
      })
  );
  self.define = (n, r) => {
    const s = e || ('document' in self ? document.currentScript.src : '') || location.href;
    if (i[s]) return;
    let d = {};
    const o = (e) => c(e, s),
      f = { module: { uri: s }, exports: d, require: o };
    i[s] = Promise.all(n.map((e) => f[e] || o(e))).then((e) => (r(...e), d));
  };
}
define(['./workbox-8c29f6e4'], function (e) {
  'use strict';
  (self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        { url: 'registerSW.js', revision: '810786f0a72d79372ff50293c13b9108' },
        { url: 'index.html', revision: '3d3d4f8d9d99aa71dc9910371ccb2c88' },
        { url: 'icon-512.png', revision: '318032293ba71f818b57decedb9afadf' },
        { url: 'icon-192.png', revision: '755ecad9c3cf1a68cdc525ce5d7eb299' },
        { url: 'favicon.ico', revision: 'fd32cce62c8da11c49d9a6f0c9ada784' },
        { url: 'assets/index-DdgIYGL1.js', revision: null },
        { url: 'assets/index-70_u5VX_.css', revision: null },
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
