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
        name: 'NEON SPIRE',
        short_name: 'NEON SPIRE',
        description: 'NEON SPIRE — サイバーフューチャー調のタワーディフェンス PWA',
        theme_color: '#04060d',
        background_color: '#04060d',
        // Android Chrome PWA でステータスバー/ナビバーを完全に隠す (Issue #78 焼き付き対策)。
        // iOS は manifest を読まないため index.html の apple-mobile-web-app-* meta で対応。
        display: 'fullscreen',
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
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version ?? '0.0.0'),
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    dedupe: ['react', 'react-dom'],
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
    // 並列実装中の他 agent 用 worktree を走査対象から除外（自分のリポでの test/lint 二重スキャンを防止）
    exclude: ['node_modules', 'dist', 'docs', '.claude/worktrees/**'],
    server: {
      deps: {
        // worktree に部分的な node_modules が存在する場合に React 重複を防止するため
        // react / react-dom / zustand を vite のモジュールグラフでバンドルする
        inline: ['react', 'react-dom', 'zustand'],
      },
    },
  },
});
