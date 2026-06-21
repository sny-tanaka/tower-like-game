import path from 'node:path';

import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vitest/config';

// GitHub Pages のサブパス公開に合わせる。リポジトリ名と一致させること。
// 例: https://<user>.github.io/tower-like-game/
const BASE = '/tower-like-game/';

export default defineConfig({
  base: BASE,
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      includeAssets: ['favicon.ico', 'robots.txt', 'icon-192.png', 'icon-512.png'],
      manifest: {
        name: 'Tower Like Game',
        short_name: 'Tower',
        description: 'タワーを育てるゲーム',
        theme_color: '#000000',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: BASE,
        scope: BASE,
        icons: [
          {
            src: 'icon-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'icon-512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,woff2}'],
      },
      // 開発中も PWA を有効にしたい場合は devOptions.enabled: true にする。
      // 通常は古い SW がキャッシュを返して "変更が反映されない" 事故になりがちなので無効にしておく。
      devOptions: {
        enabled: false,
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        // src を SCSS の load path に追加。`@use 'variables' as var;` のように書ける。
        loadPaths: [path.resolve(__dirname, './src')],
      },
    },
  },
  build: {
    // GitHub Pages の "Deploy from a branch / docs" で公開するため docs/ に出力する
    outDir: 'docs',
    emptyOutDir: true,
    sourcemap: false,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    css: true,
  },
});
