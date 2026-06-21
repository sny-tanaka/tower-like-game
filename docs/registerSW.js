if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/tower-like-game/sw.js', { scope: '/tower-like-game/' });
  });
}
