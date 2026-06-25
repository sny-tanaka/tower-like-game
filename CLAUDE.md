# CLAUDE.md

このファイルは、本リポジトリで作業する際に Claude Code に提供するガイダンスです。

## 使用言語 — 全作業に適用

- 本リポジトリでのユーザーとのやり取り（応答・説明・進捗報告・質問・コミットメッセージ・PR 本文など）は
  **すべて日本語で行うこと**。英語で返さない。
- コード中のコメントや識別子は既存の慣習に従う（無理に翻訳しない）。

## ユーザーへの質問は AskUserQuestion を使う（例外なし）

ユーザーへ何かを尋ねるときは、**常に `AskUserQuestion` ツール（選択 UI）を使う**。
グローバル CLAUDE.md と異なり、本リポジトリでは**自由記述が必要な場合も例外としない**。
自由記述させたい場合は、推測案を 1〜2 個 option として提示し、ユーザーが "Other" から
自由入力できる UI に任せる。テキストで「〜を教えてください」と聞いて返信を待つのは禁止。

## UI 実装は Atomic Design でコンポーネント単位に構築する

画面を「1 枚ずつ静的に」作るのは禁止。すべての UI は **再利用可能なコンポーネント** に分解し、
合成して画面を作る。デザインも実装も同じコンポーネント階層で整理する。

### 階層（Atomic Design）

- **Atom** (`src/components/atoms/`): UI Primitive。Button / Icon / Text / NumericDisplay / ProgressBar / Tab など。状態を持たない、props だけで制御。
- **Molecule** (`src/components/molecules/`): 複数 Atom の組合せ。UpgradeCard / PatchCard / WeaponSlotIcon など。状態は基本外から渡す。
- **Organism** (`src/components/organisms/`): 機能単位の塊。MachineUpgradeTabs / BattleHUD / RunWorkshopBottomSheet など。store からデータを引いてよい。
- **Page** (`src/pages/<screen>/`): 画面 1 枚。Organism を配置するだけ。状態は Organism に委ねる。

### ルール

- **新規 UI を実装する前に既存 Atom / Molecule で組めないか必ず確認**。なければ最小単位を Atom として切り出してから合成。
- **画面ファイルに直接 div / span / button をベタ書きしない**。レイアウト用の `<div>` 以外は必ずコンポーネント経由。
- **Storybook ストーリーは Atom / Molecule で必ず書く**。Organism は主要状態のみ。
- **デザイントークンはコード内に値を直書きしない**。色・余白・タイポは SCSS 変数 / CSS カスタムプロパティ経由。
- 詳細仕様は [`design-docs/tower-like-game/10-component-architecture.md`](./design-docs/tower-like-game/10-component-architecture.md) を参照。

### トンマナ

UI のトンマナ（配色 / モチーフ / 質感）は **既に用意済みのアイコン画像に準拠する**。

- 参照元: [`icon-large.png`](./icon-large.png)（本体）/ [`public/icon-512.png`](./public/icon-512.png) / [`public/icon-192.png`](./public/icon-192.png)
- 観察される特徴: ダーク基調 + ネオンシアン/紫グラデ + ジオメトリックなタワーモチーフ（サイバーフューチャー調）
- claude design はこのアイコンから具体的なカラーパレット・タイポ・グロー強度を抽出して設計する

## アニメーション・演出・エフェクトは Fx コンポーネントに閉じ込める

CSS アニメーション・トランジション・パーティクル・画面振動などのすべての演出は、
**Fx コンポーネント (`src/components/fx/<FxName>/`)** に閉じ込めて実装する。

### 絶対ルール

- **CSS アニメーション (`@keyframes` / `animation:`) は Fx 内にだけ書く**。他のコンポーネントには絶対に書かない。
- 同じ演出を複数箇所で書くのは禁止。**重複を見つけたら共通 Fx に統合する**。
- **マウント = 再生開始、アンマウント = 停止**。Fx 内に「再生中フラグ」は持たない（親が条件付きレンダリングで制御）。
- 再生し直したい場合は `key` を変えて **再マウント** する。
- 完了通知が必要なら `onAnimationEnd` / `onTransitionEnd` を `onDone` props として親に伝える。
- 命名は末尾 `Fx`（`DamagePopFx`, `LevelUpFx`, `ScreenShakeFx`）。
- `prefers-reduced-motion` 対応として、Fx 内で motion 削減モードを考慮する。

### Fx を作る前のチェック

1. すでに同種の Fx が `src/components/fx/` にないか確認する
2. 既存 Fx を **props で再利用**できないか検討する（色違い・サイズ違いは props で吸収）
3. 新規作成する場合のみ追加。**重複は厳禁**

詳細・既存 Fx 一覧は [`design-docs/tower-like-game/10-component-architecture.md`](./design-docs/tower-like-game/10-component-architecture.md) の Fx セクション参照。

## 作業体制（エージェントの役割分担）— 全作業に適用

本リポジトリの作業は、原則として以下の体制で進めること。

### メインエージェント＝ディレクター

- メインエージェント（あなた）は**ディレクター**として振る舞う。担うのは、仕様策定・タスク分解・
  サブエージェントへの**詳細な実装指示書の作成**・成果のレビュー・統合（マージ）・最終検証。
- **小規模な変更（数ファイル以内）は直接実装してよい**。規模が大きい場合はサブエージェントに委譲する。
- サブエージェントへの指示には必ず次を含める:
  - **「自分で Edit/Write/Bash を使って実装すること。さらにサブエージェント（Agent/Task）を spawn しないこと」**
  - **触ってよいファイル／触ってはいけないファイルの明示**（並列時の衝突防止）
  - 完了時に**コミットして commit SHA を報告**（push はしない）
- 並列可能な作業は、**ファイル所有を分離**して複数の sonnet を**並列起動**（`isolation: "worktree"`）し、
  ディレクターが各ブランチをマージ・統合する。

### worktree でサブエージェントに作業させるときのルール

`isolation: "worktree"` でサブエージェントを起動するとき、**どのブランチ（commit）から worktree を切るかを必ず明示する**。
過去に明示せずに走らせた結果、サブエージェントが意図と違うベース（古い develop など）から作業し、
ディレクターのブランチに積んだ直前の commit が反映されずマージ時に**上書き衝突**を起こした実害がある。

ディレクター側の手順:

1. **委譲直前に `git rev-parse HEAD`（または `git log -1 --oneline`）で現ブランチの HEAD SHA を確認する**
2. サブエージェントへのプロンプト冒頭に次を明記:
   - **「あなたは `<branch-name>` (`<SHA>`) から切られた worktree で作業しています。このベースに、これまでの WB-XX / 仕様書 / 修正 commit がすべて積まれている前提で実装してください」**
   - 想定ベースに含まれているはずの主要 commit を 3〜5 個列挙する（サブエージェントが `git log` で実際のベースを照合できるようにする）
3. **サブエージェントの最初のステップとして `git log --oneline -10` で実際のベースを確認させ、想定と違ったら即座に中断して報告するよう指示する**
4. 取り込み時は `git cherry-pick` でフォアグラウンドに合流させ、コンフリクトが出たら必ずディレクター側で内容確認してから解決する（雑に `--theirs` で潰さない）。

`isolation: "worktree"` がディレクターの**現在チェックアウト中のブランチ HEAD** から worktree を作る前提に依存しないこと
（実際には develop など別ブランチから切られる場合がある）。**プロンプトで base を明示するのが唯一の防衛線**。

### 検証ゲート（必須・マージ後／完了前に必ず緑にする）

- `yarn test`（vitest）／ `yarn lint`（eslint）／ **`tsc -b`（型チェック。`yarn build:nobump` でも可）** の**3点すべて**。
- **vitest と eslint は型エラーを検出しない**。`tsc`（または `yarn build:nobump`）を必ず回すこと。

### 単体テストで検証する（必須）

- **新しく実装・修正したロジックの正しさは、原則として単体テスト (vitest) で検証する**。
- 単体テスト化が必須のもの:
  - 純粋関数（helper、計算ロジック、リデューサ）
  - state 遷移（フラグ ON/OFF、永続化の load/save）
  - 条件分岐（特定条件で表示/非表示、特定値で disable）
  - バグ修正（修正前に **fail する再現テスト** を書いてから直す）
- 単体テスト化を省略してよいもの:
  - SCSS / レイアウトのみの調整（display, padding, color など）
  - アニメーション・配置の見た目調整
  - ビルド設定・依存追加など、ロジックが介在しない変更
- 上記の境界が曖昧な場合は **テストを書く側に倒す**。

### ビルド成果物（`docs/`）

- **本リポジトリのビルド出力 `docs/` はリポジトリにコミットする成果物**（GitHub Pages の公開ディレクトリ）。
- `yarn build` は `scripts/bump-patch-version.mjs`（パッチバージョン更新）→ `tsc -b` → `vite build`（`docs/` 出力）を実行する。
- **成果物に影響するもの（`src/`・`public/`・依存・アセット等）を変更したら、PR作成前に必ず `yarn build` を実行**し、
  更新後の `docs/`（と `package.json` のバージョン）をコミットに含めること。

### 1 PR でバージョンは 1 回しか上げない

- 1 PR 内で複数回ビルドが必要になったとき、2 回目以降は **`yarn build:nobump`** を使う（`tsc -b && vite build` のみ）。
- 1 回目のビルドだけ `yarn build`（bump あり）で OK。

## スマホからの動作確認

ユーザーはスマホからセッションを操作していることがある。スマホからも動作確認できるように、
ローカル開発サーバは**プライベート IP で公開してその URL を案内すること**。

### 起動コマンド（必ず `--host 0.0.0.0` を付ける）

| 用途 | コマンド | デフォルトポート |
|---|---|---|
| Storybook | `yarn storybook --host 0.0.0.0` | 6006 |
| 実アプリ dev | `yarn dev --host 0.0.0.0` | 5173 |

### スマホ向け URL の組み立て

```bash
ipconfig getifaddr en0   # Wi-Fi 経由のプライベート IP（例: 192.168.11.7）
```

- Storybook 個別ストーリー: `http://<private IP>:6006/?path=/story/<story-id>`
- 実アプリ: `http://<private IP>:5173/tower-like-game/`

## スクリーンショット

- ヘッドレス Chrome でスクリーンショットを撮る詳細手順は [dev-docs/screenshot-setup.md](./dev-docs/screenshot-setup.md) を参照。
- **撮影した画像（PNG 等）は git リポジトリ内に保存しない**（出力先は `/tmp` 等のリポジトリ外）。
- 特定状態の画面を撮影したいときは、**Storybook のストーリーを使う**（Playwright で実アプリをフル操作するのは非効率）。
