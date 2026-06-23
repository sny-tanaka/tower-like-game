# NEON SPIRE

サイバーフューチャー調のタワーディフェンス PWA。マシン本体 + 武器 + パッチの 3 層装備カスタマイズで Tier 無限を攻略するアイドル系。

> ※ リポジトリ名は `tower-like-game` のまま（仮称由来）。表示名 / package 名は NEON SPIRE。

GitHub Pages で公開する SPA / PWA。

- **Vite 6** + **React 19** + **TypeScript 5**
- **screen state による擬似ルーティング**（NavigationProvider）— URL を増やさずアプリ内 state で画面遷移
- **vite-plugin-pwa** でマニフェスト + Service Worker（Workbox）を自動生成
- ビルド成果物を `docs/` に出力 → GitHub Pages の `Deploy from a branch / docs` をそのまま使う
- ESLint v9 (flat config) + Prettier + Husky v9 + lint-staged
- **Vitest** + Testing Library
- **Storybook**（pages / common component の見た目確認）

## セットアップ

```bash
yarn install
```

`preinstall` フックで `.node-version` (`22.11.0`) と一致するか確認します。一致しない場合は `nodenv` / `volta` などで合わせてください。

## 開発

```bash
yarn dev
```

http://localhost:5173 で起動します。スマホからも確認したいときは `yarn dev --host 0.0.0.0` で公開し、`http://<private IP>:5173/tower-like-game/` を開いてください。

> Service Worker は **本番ビルドのみ有効**です（`vite.config.ts` の `devOptions.enabled: false`）。dev で SW をテストしたい場合は `true` に変更し、確認後は必ず元に戻すこと。

## テスト・Lint

```bash
yarn test           # Vitest（一回実行）
yarn test:watch     # Vitest watch モード
yarn lint           # ESLint チェック
yarn fix            # ESLint 自動修正
yarn format         # Prettier 適用
yarn format:check   # Prettier チェックのみ
```

`pre-commit` フックで `yarn fix` と `yarn lint-staged` が走ります（Husky v9）。

## ビルド & GitHub Pages デプロイ

```bash
yarn build           # 初回 / PR 1 回目（バージョンを patch bump する）
yarn build:nobump    # 2 回目以降（同一 PR 内で再ビルドする場合）
```

`docs/` にビルド成果物 + Service Worker (`sw.js`) + `manifest.webmanifest` が出力されます。`docs/` も含めてコミットして push すれば、GitHub の Settings → Pages で `Deploy from a branch` / `main` / `/docs` を選んでおくだけで公開されます。

公開 URL は `https://<user>.github.io/tower-like-game/` を想定しています（`vite.config.ts` の `BASE` がこのサブパスと一致します）。

## Storybook

```bash
yarn storybook
```

http://localhost:6006 で起動します。新しいページ・コンポーネントを追加したら対応する `.stories.tsx` も追加してください。

## ルーティング方針

- **URL を増やさない**: ブラウザ履歴 / リロード位置を気にせず、画面遷移はアプリ内の state で完結。
- 新しい画面は `src/store/navigation.tsx` の `Screen` union と `src/App.tsx` の `switch` を増やすだけ。
- react-router は使わない。

## ディレクトリ構成

```
.
├── .husky/                  # Git hooks (pre-commit で fix + lint-staged)
├── .storybook/              # Storybook 設定
├── .github/
│   └── pull_request_template.md
├── dev-docs/                # 開発ドキュメント（スクリーンショット手順など）
├── public/                  # アイコン類・robots.txt
├── scripts/
│   └── bump-patch-version.mjs  # yarn build の前段で patch を 1 上げる
├── src/
│   ├── __stories__/         # Storybook 用 decorator・共通 mock
│   ├── main.tsx             # エントリポイント (NavigationProvider)
│   ├── App.tsx              # 画面の出し分け（Screen union の switch）
│   ├── index.scss           # グローバルスタイルのエントリポイント
│   ├── _variables.scss      # SCSS 変数とブレークポイント mixin
│   ├── store/
│   │   └── navigation.tsx   # Screen 型 + NavigationProvider + useNavigation
│   ├── pages/
│   │   ├── home/
│   │   └── not-found/
│   ├── setupTests.ts        # Vitest 用セットアップ (jest-dom)
│   └── vite-env.d.ts
├── index.html
├── vite.config.ts
├── eslint.config.js
├── CLAUDE.md
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
└── check-node-version.sh
```

## SCSS の import について

Vite の `css.preprocessorOptions.scss.loadPaths` に `src/` を入れているので、変数モジュールは下記のように **prefix なし**で参照できます：

```scss
@use 'variables' as var;

.foo {
  color: var.$primary;
}
```

別ファイルを参照する場合は通常通り相対パス or `@/...` 形式（後者は `src/` 直下からの絶対パス的に解決）を使ってください。

## 開発フロー

ディレクター + サブエージェント分担、1 PR = 1 bump、`yarn build:nobump` 等のルールは `CLAUDE.md` に集約しています。Claude Code を使うときは自動で読まれます。
