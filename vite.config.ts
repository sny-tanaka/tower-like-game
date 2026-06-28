import { appendFileSync, mkdirSync } from 'node:fs';
import { readFileSync } from 'node:fs';
import path from 'node:path';

import react from '@vitejs/plugin-react';
import { type Plugin } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vitest/config';

// GitHub Pages のサブパス公開に合わせる。リポジトリ名と一致させること。
// 例: https://<user>.github.io/tower-like-game/
const BASE = '/tower-like-game/';

// package.json を直接読んで version を取得する。
// 過去は `process.env.npm_package_version` を使っていたが、 これは yarn/npm が
// **スクリプト開始時にキャプチャ**する値で、 `yarn build` 内の bump-patch-version.mjs が
// 走ってから vite build までの間に package.json が書き換わっても反映されない。
// 結果、 bundle に古い version が埋め込まれる pre-existing バグになっていた
// (v0.3.5 → 1.0.0 → 1.0.1 全て同じ症状)。 ファイル直読みで根治。
const pkgJson = JSON.parse(readFileSync(path.resolve(__dirname, './package.json'), 'utf8')) as {
  version?: string;
};
const APP_VERSION = pkgJson.version ?? '0.0.0';

// ---------------------------------------------------------------------------
// perfLogCollector — dev サーバ専用の発熱計測ログ収集 middleware
// ---------------------------------------------------------------------------
//
// PerfOverlay (dev のみ) が `navigator.sendBeacon('/__perf', JSON)` で送信した
// 計測スナップショットを受け取り、 リポジトリ直下の dev-perf-log.jsonl に追記する。
//
// `apply: 'serve'` で dev サーバ起動時のみ register され、 `vite build` の出力には
// 一切混入しない (production には絶対影響なし)。
//
// 旧来は Chrome DevTools の Performance タブで手動取得していたが、 スマホ実機計測では
// USB デバッグが面倒。 dev サーバを Wi-Fi 経由でスマホから叩く運用に合わせ、
// 端末 → 開発機 への経路に集約することで「スマホで battle 回すだけ」 で計測可能になる。
//
// ファイルは Mac 上で生成され、 解析側 (Claude Code) が直接 Read する想定。
// ---------------------------------------------------------------------------

const PERF_LOG_PATH = path.resolve(__dirname, 'dev-perf-log.jsonl');

function perfLogCollector(): Plugin {
  return {
    name: 'perf-log-collector',
    apply: 'serve',
    configureServer(server) {
      // 初回起動時にディレクトリ存在保証 (リポジトリ直下なので普通は存在するが、 念のため)
      mkdirSync(path.dirname(PERF_LOG_PATH), { recursive: true });
      server.middlewares.use('/__perf', (req, res, next) => {
        if (req.method !== 'POST') {
          next();
          return;
        }
        const chunks: Buffer[] = [];
        req.on('data', (c: Buffer) => chunks.push(c));
        req.on('end', () => {
          try {
            const body = Buffer.concat(chunks).toString('utf8');
            // 1 行 1 JSON でファイル末尾に追記 (JSONL 形式)。 先頭に dev サーバ受信時刻を付与
            // しておくとログ解析時に「サーバ受信ラグ」 込みのタイムラインが組める。
            const serverTs = new Date().toISOString();
            appendFileSync(PERF_LOG_PATH, `${serverTs} ${body}\n`);
            res.statusCode = 204;
            res.end();
          } catch (e) {
            // 計測ログの失敗で dev サーバを落とさない
            console.error('[perf-log-collector] failed to append:', e);
            res.statusCode = 500;
            res.end();
          }
        });
      });
    },
  };
}

export default defineConfig({
  base: BASE,
  plugins: [
    react(),
    perfLogCollector(),
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
  define: {
    __APP_VERSION__: JSON.stringify(APP_VERSION),
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
