# pwa-template

GitHub Pages で公開する SPA / PWA のテンプレートです。

- **Vite 6** + **React 19** + **TypeScript 5**
- **screen state による擬似ルーティング**（NavigationProvider）— URL を増やさずアプリ内 state で画面遷移
- **vite-plugin-pwa** でマニフェスト + Service Worker（Workbox）を自動生成
- ビルド成果物を `docs/` に出力 → GitHub Pages の `Deploy from a branch / docs` をそのまま使う前提
- ESLint v9 (flat config) + Prettier + Husky v9 + lint-staged
- **Vitest** + Testing Library
- **Storybook**（pages / common component の見た目確認）

## 使い方

このリポジトリを **テンプレートとして clone** して、`__APP_NAME__` などのプレースホルダを書き換えてください。

### 1. リポジトリを作る

GitHub の `Use this template` で新規リポジトリを作るか、`git clone` 後に `git remote set-url origin` で差し替えてください。

### 2. プレースホルダを置換する

以下のプレースホルダがソース全体に埋め込んであります。**必ず全て置換してから push してください**。

| プレースホルダ | 用途 | 例 |
| --- | --- | --- |
| `__APP_NAME__` | `package.json` の `name`、`<title>`、PWA の `name`、トップページの見出し | `My PWA App` |
| `__APP_SHORT_NAME__` | PWA の `short_name`（ホーム画面のアイコン下に出る短い名前。12 文字以内推奨） | `MyPWA` |
| `__APP_DESCRIPTION__` | `<meta description>` と PWA の `description` | `自分用のメモ PWA` |
| `__REPO_NAME__` | GitHub のリポジトリ名。Vite の `base`、PWA の `start_url` / `scope` に使用。**GitHub Pages のサブパス（`https://<user>.github.io/<repo>/`）と一致させること** | `my-pwa` |

ワンライナーで置換する場合（macOS の `sed`）：

```bash
APP_NAME="My PWA App"
APP_SHORT_NAME="MyPWA"
APP_DESCRIPTION="自分用のメモ PWA"
REPO_NAME="my-pwa"

grep -rl '__APP_NAME__' . --exclude-dir=node_modules --exclude-dir=.git \
  | xargs sed -i '' "s|__APP_NAME__|${APP_NAME}|g"
grep -rl '__APP_SHORT_NAME__' . --exclude-dir=node_modules --exclude-dir=.git \
  | xargs sed -i '' "s|__APP_SHORT_NAME__|${APP_SHORT_NAME}|g"
grep -rl '__APP_DESCRIPTION__' . --exclude-dir=node_modules --exclude-dir=.git \
  | xargs sed -i '' "s|__APP_DESCRIPTION__|${APP_DESCRIPTION}|g"
grep -rl '__REPO_NAME__' . --exclude-dir=node_modules --exclude-dir=.git \
  | xargs sed -i '' "s|__REPO_NAME__|${REPO_NAME}|g"
```

`package.json` の `name` には英小文字 + ハイフンしか使えないので、`__APP_NAME__` を表示用名称（日本語可）にしたい場合は手で個別に書き分けてください。

### 3. アイコン画像を差し替える

`public/` に以下のファイルを置く必要があります（テンプレートには含まれていません）：

- `favicon.ico`（マルチサイズ: 16 / 24 / 32 / 64）
- `icon-192.png`（192×192）
- `icon-512.png`（512×512、PWA splash 用 / maskable 兼用）

ファイル名やパスを変える場合は `vite.config.ts` の `manifest.icons` と `includeAssets` も合わせて変更してください。

### 4. インストール

```bash
yarn install
```

`preinstall` フックで `.node-version` (`22.11.0`) と一致するか確認します。一致しない場合は `nodenv` / `volta` などで合わせてください。

### 5. 開発

```bash
yarn dev
```

http://localhost:5173 で起動します。

> Service Worker は **本番ビルドのみ有効**です（`vite.config.ts` の `devOptions.enabled: false`）。dev で SW をテストしたい場合は `true` に変更し、確認後は必ず元に戻すこと。古いキャッシュが返って "変更が反映されない" 事故になります。

### 6. テスト・Lint

```bash
yarn test           # Vitest（一回実行）
yarn test:watch     # Vitest watch モード
yarn lint           # ESLint チェック
yarn fix            # ESLint 自動修正
yarn format         # Prettier 適用
yarn format:check   # Prettier チェックのみ
```

`pre-commit` フックで `yarn fix` と `yarn lint-staged` が走ります（Husky v9）。

### 7. ビルド & GitHub Pages デプロイ

```bash
yarn build
```

`docs/` にビルド成果物 + Service Worker (`sw.js`) + `manifest.webmanifest` が出力されます。`docs/` も含めてコミットして push すれば、GitHub の Settings → Pages で `Deploy from a branch` / `main` / `/docs` を選んでおくだけで公開されます。

> **Tip**: `vite.config.ts` の `BASE` と PWA の `start_url`/`scope` がリポジトリ名（サブパス）と一致しないと、JS / CSS / 画像 / SW スコープが全て壊れます。先に GitHub にリポジトリを作って名前を確定させてから `__REPO_NAME__` を置換するのが安全です。

2 回目以降のビルド（追加修正・レビュー指摘の反映など）はバージョンを上げずに行う：

```bash
yarn build:nobump
```

### 8. Storybook

```bash
yarn storybook
```

http://localhost:6006 で起動します。新しいページ・コンポーネントを追加したら対応する `.stories.tsx` も追加してください。

## ルーティング方針

このテンプレートはゲーム / 単一画面ツール向けの SPA を前提としています。

- **URL を増やさない**: ブラウザ履歴 / リロード位置を気にせず、画面遷移はアプリ内の state で完結させる方が単純。
- 新しい画面は `src/store/navigation.tsx` の `Screen` union と `src/App.tsx` の `switch` を増やすだけ。
- react-router は使わない（依存なし）。

## コード雛形生成

Claude Code 等の生成 AI で雛形を作る方針（plop は使わない）。

## ディレクトリ構成

```
.
├── .husky/                  # Git hooks (pre-commit で fix + lint-staged)
├── .storybook/              # Storybook 設定 (main.ts / preview.tsx)
├── .github/
│   └── pull_request_template.md
├── dev-docs/                # 開発ドキュメント（スクリーンショット手順など）
├── public/
│   └── robots.txt           # アイコン類はここに置く
├── scripts/
│   └── bump-patch-version.mjs  # yarn build の前段で patch を 1 上げる
├── src/
│   ├── __stories__/         # Storybook 用 decorator・共通 mock
│   │   └── decorators.tsx
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
├── index.html               # Vite のエントリ HTML（ルート直下）
├── vite.config.ts           # Vite + PWA + Vitest 設定
├── eslint.config.js         # ESLint v9 flat config
├── CLAUDE.md                # Claude Code 向けガイドライン
├── tsconfig.json            # 親（references のみ）
├── tsconfig.app.json        # アプリ用（src/）
├── tsconfig.node.json       # vite.config.ts 用
└── check-node-version.sh    # preinstall で実行
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

## 開発フロー（CLAUDE.md）

ディレクター + サブエージェント分担、1 PR = 1 bump、`yarn build:nobump` 等のルールは `CLAUDE.md` に集約しています。Claude Code を使うときは自動で読まれます。

## TODO

テンプレ利用者が必要に応じて追加する機能：

- [ ] CI（GitHub Actions）：`yarn lint` / `yarn test` / `yarn build` をプルリクで自動実行
- [ ] PWA インストールプロンプト UI：`vite-plugin-pwa` の `useRegisterSW` フックを使って "新しいバージョンが利用可能" のトーストを出すなど
