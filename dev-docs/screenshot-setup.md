# スクリーンショットの撮影環境構築について

Claude Code のクラウド実行環境（リモート実行環境）やローカル macOS で、ヘッドレス Chrome を使って
画面のスクリーンショットを撮るための手順をまとめる。`CLAUDE.md` の実装方針
（「見た目はヘッドレス Chrome 等でスクリーンショットを撮り、セッション上でユーザーに共有する」）
を満たすための実務メモ。

> **撮影した画像（PNG 等）は git リポジトリ内に保存しない**（`CLAUDE.md` の方針）。
> 出力先は `/tmp` 等のリポジトリ外にする。このドキュメント（手順書）は記録として残してよい。

---

## 重要な前提（クラウド環境の事情）

- クラウド環境には **Playwright のブラウザがプリインストール済み**で、環境変数
  `PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers` が設定されている。
  - 例: `/opt/pw-browsers/chromium-1194/chrome-linux/chrome`（フル Chromium）
  - 例: `/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell`
- **`npx playwright install`（ブラウザのダウンロード）はネットワークポリシーでブロックされる**
  ことがある。新規ダウンロードに頼らず、**プリインストール済みバイナリを直接使う**こと。
- `npm`/`yarn` のパッケージ取得（`playwright-core` 等）は通る。

## ハマりどころ

1. **リビジョンの off-by-one**: インストールした `playwright-core` が要求する
   ブラウザのリビジョン（例: headless_shell `1193`）と、プリインストール済みの
   リビジョン（例: `1194`）が1つズレることがある。
   → `chromium.launch({ executablePath })` で **バイナリを直接指定**してレジストリ照合を回避する。
2. **`playwright-core` は CommonJS**: ESM の `import { chromium }` は失敗する。
   - `.mjs` で `import pkg from 'playwright-core'; const { chromium } = pkg;` のスタイルを使う。
3. **モジュール解決**: スクリプトをリポジトリ外（`/tmp`）に置くと `node_modules` を解決できない。
   - 撮影スクリプトはリポジトリ配下（`scripts/screenshot.mjs` 想定）に置くこと。
4. **Web フォント（Noto Sans JP 等）がフォールバックになる**: 本環境は HTTPS を独自証明書で
   傍受しており、Google Fonts CDN（`fonts.googleapis.com` / `fonts.gstatic.com`）への接続が
   `net::ERR_CERT_AUTHORITY_INVALID` で失敗する。その結果、スクショだけ Noto Sans JP ではなく
   システムのフォールバックフォントで写ってしまう（**本番=実ブラウザでは正しく Noto になる**）。
   - **対策（必須）**: 撮影時は必ず以下の2点を行う。
     1. `browser.newContext({ ignoreHTTPSErrors: true })` で証明書エラーを無視し CDN を通す。
     2. スクショ前に `await page.evaluate(() => document.fonts.ready)` で **Web フォントの
        ロード完了を待つ**（`display=swap` のフォールバック→フォント差し替えを待たないと混ざる）。

---

## 手順

### 1. ローカル初回セットアップ（macOS / Linux ローカル開発者）

`playwright-core` を devDependencies に追加し、`yarn install` で入れる。

```bash
yarn add -D playwright-core
npx playwright install chromium   # ブラウザバイナリをインストール
```

> クラウド環境では `/opt/pw-browsers` にプリインストール済みのため不要。

### 2. Storybook を起動する

```bash
yarn storybook   # http://localhost:6006 で起動（別ターミナル推奨）
# スマホ / 別端末から見るには --host 0.0.0.0 を付ける
yarn storybook --host 0.0.0.0
```

### 3. 撮影スクリプトの最小例

`scripts/screenshot.mjs` として以下のひな形を参考に実装する（本リポジトリには同梱していない）。

```js
import pkg from 'playwright-core';
const { chromium } = pkg;
import { existsSync, readdirSync } from 'node:fs';

// クラウド環境: /opt/pw-browsers からバイナリを自動検出
function findPreinstalledChromium() {
  const base = process.env.PLAYWRIGHT_BROWSERS_PATH ?? '/opt/pw-browsers';
  if (!existsSync(base)) return null;
  for (const dir of readdirSync(base)) {
    const candidates = [
      `${base}/${dir}/chrome-linux/chrome`,
      `${base}/${dir}/chrome-linux/headless_shell`,
    ];
    for (const c of candidates) {
      if (existsSync(c)) return c;
    }
  }
  return null;
}

const executablePath = findPreinstalledChromium() ?? undefined;
const browser = await chromium.launch({ executablePath, headless: true });
const ctx = await browser.newContext({
  ignoreHTTPSErrors: true,           // ハマりどころ 4 対策
  viewport: { width: 390, height: 844 },  // iPhone 12
});
const page = await ctx.newPage();

// Storybook のストーリーを撮る例
const storyId = 'pages-home--default';
await page.goto(`http://localhost:6006/iframe.html?id=${storyId}&viewMode=story`);
await page.evaluate(() => document.fonts.ready);  // ハマりどころ 4 対策
await page.screenshot({ path: '/tmp/home.png' });

await browser.close();
console.log('撮影完了: /tmp/home.png');
```

### 4. 特定 URL を撮る（dev server 経由等）

```js
await page.goto(`http://localhost:5173/tower-like-game/`);
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: '/tmp/app.png' });
```

---

## スマホ向け確認 URL の組み立て

```bash
ipconfig getifaddr en0   # Wi-Fi 経由のプライベート IP（例: 192.168.11.7）
```

- Storybook: `http://<private IP>:6006/?path=/story/<story-id>`
- 実ゲーム / dev: `http://<private IP>:5173/tower-like-game/`
