# 10. コンポーネント設計（Atomic Design）

本作のデザイン・実装はいずれも **再利用可能なコンポーネント単位** で組み立てる。
画面を 1 枚ずつ静的に作るのではなく、Atom → Molecule → Organism → Page の階層で合成する。

**デザイン（色・タイポ・余白・アニメ秒数）は claude design に委譲**。本章はコンポーネントの**役割と入出力**を定義する。

## Atomic Design の階層

| 階層 | 役割 | 例 |
|---|---|---|
| **Atom** | これ以上分解しない最小単位。UI Primitive | Button, Icon, Text, Bar, Tab |
| **Molecule** | 複数 Atom の組合せ。1 機能だが状態は外から渡される | UpgradeCard, PatchCard, WeaponSlotIcon |
| **Organism** | 複数 Molecule の塊。1 つのドメイン機能を担う | RunWorkshopBottomSheet, MachineUpgradeList, BattleHudBottom |
| **Page** | 画面 1 枚に対応。Organism を配置し、状態（store / props）を流し込む | BattleScreen, MachineScreen, TitleScreen |

### コンポーネントの責務ルール

- **Atom は状態を持たない**: 見た目だけ、すべて props で制御
- **Molecule も基本は持たない**: 一時的な開閉などはローカル state でよい
- **Organism は store からデータを引く**: Zustand などのグローバルストアにアクセス可
- **Page はレイアウト責務のみ**: 状態は Organism に委ねる
- **Fx はアニメ・演出を 1 つだけ閉じ込める**: マウントで再生開始、アンマウントで停止

## 共通 Atom 一覧

### 表示系

| Atom | props | 用途 |
|---|---|---|
| `Button` | label, variant (primary/secondary/danger/ghost), size, disabled, onClick | 全ボタン共通 |
| `IconButton` | icon, label (aria), size, disabled, onClick | アイコンのみのタップターゲット |
| `Icon` | name, size, color | SVG アイコン |
| `Text` | variant (heading/body/caption/label), children | 文字列 |
| `NumericDisplay` | value, size, accentColor (`scale` 既定 / `primary` / `secondary` / `danger`), glow, style | 数値表示（A→B→…→Z→AA アルファベット表記）。既定 `accentColor='scale'` で桁ごとに動的色（A=cyan H195 → Z=purple H295 を oklch 線形補間）。表示上限は **10 桁 (例: `150.5B`)** を最大長として、UpgradeCard 等のコンパクトレイアウトはこの長さに収まるよう設計 |
| `CurrencyAmount` | currency (screw/bolt/alloy), value, size, delta | 通貨アイコン + 値 |
| `ProgressBar` | value, max, color (hp/cd/wave/etc) | バー |
| `CircularProgress` | value, max, size | クールタイム用円弧 |
| `Badge` | text, color | エリート/ボス/Tier 表示 |
| `Tab` | label, active, onClick | タブ 1 つ |
| `Divider` | orientation | 区切り |

### 入力系

| Atom | props | 用途 |
|---|---|---|
| `Stepper` | value, min, max, step, onChange | パッチ合成 Tier 上限指定 |
| `Slider` | value, min, max, onChange | 音量 |
| `Toggle` | checked, onChange | ON/OFF (バイブ、アクティブ手動/自動) |
| `SegmentedControl` | options, value, onChange | 一般的な複数選択肢の切替（v0.2.0 でゲームスピード切替の用途は廃止） |
| `FileInput` | accept, onChange | インポート JSON |

### コンテナ系

| Atom | props | 用途 |
|---|---|---|
| `Card` | children | 一般的なカード枠 |
| `Sheet` | children | ボトムシート / オーバーレイの素地。**スライドインの `@keyframes` は本コンポーネント内に持つ**（Fx 化しない） |
| `Overlay` | onClose, children | 全画面ディムバックドロップ（背景タップで close）。**フェードの `@keyframes` は本コンポーネント内**。「閉じる × ボタン」は Overlay の責務ではなく内側の Dialog の責務 |

## Molecule 一覧

| Molecule | 構成 | 用途 |
|---|---|---|
| `UpgradeCard` | Text + NumericDisplay + Button×3(+1/+5/Max) + コスト数値 | マシン強化項目 1 つ、武器強化 1 つ、ラン中 WS 項目 1 つ。**ボタン下のコスト表示に通貨アイコンは付けない**（カード単位で通貨が固定のため。セクション見出しまたは accent 色で通貨が分かる前提） |
| `PatchCard` | Icon + Text + Badge(Tier) + NumericDisplay(count) | パッチ 1 種 |
| `WeaponSlotIcon` | Icon + Badge(現装備) + CircularProgress(CD) | バトル下 HUD の武器切替アイコン 1 つ |
| `WeaponPreview` | Icon + Text + NumericDisplay×複数 | 出撃準備の武器選択、武器庫の武器詳細表示。**`locked` 状態は持たない（武器は全解放仕様）** |
| `PatchSlot` | Card + PatchCard or 空表示 | 装着スロット 1 個 |
| `EnemyHpBar` | Text + ProgressBar | エリート/ボスの HP バー |
| `WaveProgressBar` | ProgressBar + Badge(milestone) | ウェーブ残り秒数 |
| `TabBar` | Tab × N | 画面内タブ |
| `ConfirmDialog` | Text + Button×2 (yes/no) | 撤退確認・リセット確認。`variant='danger'` 時は赤発光 |
| `Toast` | Text + Icon (info/error) | 一時通知 |
| `BottomSheetHandle` | Icon | ボトムシートのドラッグハンドル |

## Organism 一覧

### 共通

| Organism | 役割 |
|---|---|
| `AppShell` | 全画面のスケルトン（背景 / safe-area / `header` / `main` (scrollable) / `footer` のスロット）。`height: 100vh` で画面高さ固定、`<main>` は flex column + `overflow: auto`、フッタに `BottomNav` を集約 |
| `PageHeader` | 画面タイトル + 戻る + 通貨表示（その画面で使うもののみ）。TabBar とまとめて backdrop-filter blur で半透明固定 |
| `BottomNav` | **標準モバイル風 5 タブ**（出撃準備 / マシン / 武器庫 / パッチ / 設定）。BattleScreen / TitleScreen 以外の全画面で `AppShell.footer` に固定 |

### 出撃準備画面 (`PreparationScreen`)

| Organism | 役割 |
|---|---|
| `TierSelectTab` | Tier 一覧 + 選択状態 |
| `InitialWeaponTab` | 4 武器の WeaponPreview + 選択 |
| `EquippedPatchesTab` | 装着スロット一覧（読み取り専用） |
| `LaunchButton` | 「出撃」ボタン（タブ共通フッタ） |

### マシン強化画面 (`MachineScreen`)

| Organism | 役割 |
|---|---|
| `MachineUpgradeList` | **全 16 項目混在の 2 列リスト**（カテゴリタブで分けず、スクロールで一覧）。`UpgradeCard` を配置 |

> 仕様書初版では「防御 / 攻撃 / アクティブ / 経済 / スロット」の 5 タブ構成だったが、カテゴリ毎に項目数が偏るためタブ分けは冗長と判断し、デザイン段階で**タブを廃止**。全項目を 1 画面に混在表示。

### 武器庫画面 (`ArmoryScreen`)

| Organism | 役割 |
|---|---|
| `WeaponDetailsTab` | **4 武器の WeaponPreview を縦並びで全部表示**（武器ごとの情報量が少ないためタブ内タブを廃止、スクロールで OK） |
| `WeaponLevelUpgradeTab` | 共通武器強化 Lv の UpgradeCard |

### パッチ庫画面 (`PatchScreen`)

| Organism | 役割 |
|---|---|
| `PatchEquipTab` | PatchSlot × N（マシン強化「パッチスロット数」依存）。**空きスロットタップで内蔵の「装着候補ダイアログ」 (`Overlay` + `Card` + `PatchCard` リスト) を開き、 在庫から重複装着不可ルールでフィルタした候補を選んで `equipPatch`**。装着済みスロットタップは従来通り `unequipPatch`。候補 0 件時は空状態メッセージを表示。汎用ピッカー Organism は切り出さず本タブ内に閉じる |
| `PatchInventoryTab` | PatchCard リスト（同名同 Tier 集約） |
| `PatchMergeTab` | Stepper + Button（一括合成） |

### 設定画面 (`SettingsScreen`)

| Organism | 役割 |
|---|---|
| `SoundSettingsTab` | Slider × 2 (BGM / SE) |
| `GameSettingsTab` | Toggle + SegmentedControl |
| `DataSettingsTab` | Button (エクスポート / インポート / リセット) |

### バトル画面 (`BattleScreen`)

| Organism | 役割 |
|---|---|
| `BattleField` | マシン + 敵 + 攻撃エフェクト + 索敵円の描画レイヤ |
| `BattleHudTop` | HP バー + Tier + Wave + WaveProgressBar |
| `BattleHudBottom` | **通貨エリア (ネジ `size=lg` + ラン獲得ボルト累計 `size=md` を並列表示。 `earnedBolt` prop で受け取り、 値はリザルトの `earnedBolt` と完全一致)** + WeaponSlotIcon×4 + ActiveSkillButton（**直下に「アクティブ手動/自動」トグル**、ゲージは「発動 = 0 → 時計回りで満タンに溜まる」、ラン開始時は CD 満タンスタート） + 一時停止ボタン（**押下で pause + `BattleMenuOverlay` 開閉を同時に行う**） + スクリーンセーバー（アイコンは `ice`）。v0.2.0 で「メニュー専用ボタン」 と速度切替ボタンは廃止。これに伴い `onOpenMenu` prop は廃止し、pause トグル 1 本に統合 |
| `RunWorkshopBottomSheet` | 4 つの UpgradeCard |
| `BattleMenuOverlay` | 撤退 / 簡易音量（**手動/自動 切替はここから移動、BattleHudBottom 内に常駐**）。**表示状態は pause と完全同期**: 親（BattleScreen）が `paused` を真にした時だけマウントされ、本オーバーレイの close ハンドラは `setPaused(false)` を呼ぶ。バックグラウンド遷移時（`document.hidden`）にもラン中であれば自動で開く |
| `ResultDialog` | ヘッダ + 統計 + 獲得 + **「出撃準備へ」ボタン 1 つ**（タイトル戻りは BottomNav 経由） |
| `ScreenSaverDialog` | フルスクリーンアニメ + タップ復帰 |

### タイトル画面 (`TitleScreen`)

| Organism | 役割 |
|---|---|
| `TitleHeader` | ロゴ |
| `TitleActions` | 「続きから」「新規開始」「設定」 |

## Fx コンポーネント

アニメーション・演出・エフェクトのうち、**「再利用可能な演出のみ」を Fx コンポーネント** として独立した単位に閉じ込める。

### Fx として実装するもの / しないもの

| 種類 | 例 | 配置 |
|---|---|---|
| **Fx として実装** | 戦闘演出 (DamagePop / EnemyDeath / Blast / Beam / MachineHit) / 出現 (WaveStart / AppearanceBanner) / 獲得 (Pickup) / クリア (TierClear) | `src/components/fx/<Name>Fx/` |
| **コンポーネント固有アニメ** | ボトムシートのスライドイン / ダイアログのフェード / オーバーレイのフェード / タブ切替 / トーストのスライド / 画面遷移 | 当該コンポーネント内に `@keyframes` を持つ |

「複数のコンポーネント / 複数の局面で再利用される演出のみ Fx 化」が判断基準。**ボトムシートのスライドイン**のようにそのコンポーネント固有のアニメは、Fx ではなく当該コンポーネント内に閉じる（Sheet / ConfirmDialog / Overlay / TabBar / Toast / AppShell など）。

### 設計原則

- **1 Fx = 1 演出**: 1 つのアニメーション / トランジション / 視覚効果だけを持つ
- **マウント = 再生開始 / アンマウント = 停止**: 親が条件付きレンダリングで Fx を出し入れすることで演出を制御
  - 「再生中フラグ」を Fx 内に持たない（store / 親の state で管理）
  - 同じ Fx を再度マウントすれば再生し直される
- **再利用可能な演出の `@keyframes` は Fx 内にだけ書く**。同じ演出を複数コンポーネントで重複定義するのは禁止。コンポーネント固有のアニメは当該コンポーネント内に閉じてよい
- **`prefers-reduced-motion` 対応**: `@media (prefers-reduced-motion: reduce)` で全アニメ無効化
- **タイマー・トランジション完了の検知**: `onAnimationEnd` / `onTransitionEnd` でアンマウント要求を親へ伝える（`onDone` props）

### Fx の API 規約

すべての Fx に共通:

- バトル系: `position: absolute` + 親内パーセント座標 `(x, y)`
- 画面演出系: `position: absolute; inset: 0`
- `duration` ms と `onDone()` を受ける（アニメ終了通知 → 親で unmount）
- `@keyframes` 名は `useMemo` で生成した unique id でスコープ
- `@media (prefers-reduced-motion: reduce)` で全アニメ無効化

### ディレクトリと命名

- 配置: `src/components/fx/<FxName>/index.tsx` + `style.module.scss`
- 命名: 末尾を `Fx` で揃える（`DamagePopFx`, `MachineHitFx`, `TierClearFx`）
- Atom / Molecule / Organism からは `import` で参照、CSS の重複定義は禁止

### 共通 Fx 一覧

#### 戦闘演出 (Fx)

| Fx | 起点 | 内容 |
|---|---|---|
| `DamagePopFx` | 敵がダメージを受けた瞬間 | 数値が上方向にポップしてフェードアウト。**`crit` prop でクリ表現**（旧 `CritDamagePopFx` は統合） |
| `EnemyHitFx` | 敵被弾位置 | フラッシュ + 小爆発 |
| `EnemyDeathFx` | 敵撃破位置 | パーティクル発散 + アイコン消滅 |
| `BlastFx` | Cannon 着弾点 | 範囲ダメの円形爆発 |
| `LaserBeamFx` | Laser 発射 | 細い線が一瞬伸びる |
| `ChainBoltFx` | Thunder Plasma Discharge | ジグザグ電撃が連鎖 |
| `OverdriveAuraFx` | Cutter Overdrive 発動中 | マシン周囲の残像オーラ |
| `MegaBeamFx` | Laser Mega Beam | 太いビームが画面端まで伸びる |
| `MachineHitFx` | マシン本体被ダメ | マシン中心に局所の赤フラッシュ（旧 `DamageVignetteFx` の全画面ビネットはチカチカで鬱陶しかったため v0.3.0 で局所版に置換） |

#### 画面演出 (Fx)

| Fx | 起点 | 内容 |
|---|---|---|
| `WaveStartFx` | ウェーブ開始 | 上 HUD にウェーブ番号がスライドイン |
| `AppearanceBannerFx` | エリート / ミニボス / Tier ボス出現、ラン開始 | フラッシュ + 名前バナー。**`kind: 'elite' \| 'mini-boss' \| 'boss' \| 'battle-start'` で表現分岐**（旧 `EliteAppearanceFx` / `BossAppearanceFx` は統合）。`battle-start` は `isRunActive` が false → true に遷移したフレームのみ発火（再マウントでは出さない） |
| `TierClearFx` | Tier クリア (`currentTier` 増加で再マウント発火) | 画面全体のフィナーレ演出 |
| `ScreenSaverFx` | スクリーンセーバー起動 | フルスクリーンの軽量アニメ |

#### 獲得・強化演出 (Fx)

| Fx | 起点 | 内容 |
|---|---|---|
| `PickupFx` | 通貨 / アイテム獲得 | HUD に吸い込まれる演出。**`icon` + `color` props で 通貨 3 種（screw / bolt / alloy）を吸収**（旧 `CoinPickupFx` / `BoltPickupFx` / `AlloyPickupFx` は統合） |

> ※ `MergeSuccessFx`（パッチ合成成功）/ `PatchDropFx`（パッチドロップ）は専用 Fx を**未実装**。`PickupFx` で代用可能（必要になった段階で追加判断）。

#### v0.3.0 で廃止した Fx

実機 UX 動作確認の結果、 以下は過剰演出・鬱陶しさ・発熱の原因と判断して **削除**:

| 旧 Fx 名 (廃止) | 廃止理由 |
|---|---|
| `DamageVignetteFx` | 全画面赤ビネットがチカチカで鬱陶しい → `MachineHitFx` (マシン本体局所赤フラッシュ) に置換 |
| `HealFlashFx` | HP リジェネが毎秒走るため緑フェードが鬱陶しい → 仕様削除 |
| `BurnFx` / `FreezeFx` | 状態異常 Fx は敵数倍増で GPU 負荷 → 過剰演出と判断、 削除 |
| `InstantKillFx` | 即死フラッシュは演出過剰 → 削除 |
| `LevelUpFx` | 強化購入時のキラキラは SE で十分 → 削除 |
| `ScreenShakeFx` | 画面揺れは UX 阻害 → 削除 |
| `VolleyFx` | Cannon Volley は弾道アニメ + Blast の組合せで表現済み → 単独 Fx は不要、 削除 |

#### コンポーネント固有アニメ（Fx ではなく当該コンポーネント内）

仕様書初版では Fx として挙げていたが、デザイン段階で **当該コンポーネント内に閉じる方針** に変更:

| 旧 Fx 名（廃止） | 配置先 |
|---|---|
| `BottomSheetSlideFx` | `Sheet` 内に `@keyframes` |
| `DialogFadeFx` | `ConfirmDialog` 内 |
| `OverlayFadeFx` | `Overlay` 内 |
| `TabSwitchFx` | `TabBar` 内 |
| `ToastSlideFx` | `Toast` 内 |
| `ScreenTransitionFx` | `AppShell` 内 |

### 使い方の例（コード方針）

```tsx
// 親が key を変えて再マウント（連続発動時 / 同じ被ダメイベントごとに）
{machineHitKey > 0 && (
  <MachineHitFx key={machineHitKey} cx={machineX} cy={machineY} />
)}
{damageEvents.map((ev) => (
  <DamagePopFx key={ev.id} x={ev.x} y={ev.y} value={ev.value} />
))}
```

### Fx を作る前のチェック

1. すでに同種の Fx が `src/components/fx/` にないか確認
2. 既存 Fx を props で再利用できないか検討（色違い・サイズ違いは props で）
3. 新規作成する場合のみ追加。重複は厳禁

## Page 一覧

| Page | パス想定 |
|---|---|
| `TitleScreen` | screen state: `title` |
| `PreparationScreen` | screen state: `preparation` |
| `MachineScreen` | screen state: `machine` |
| `ArmoryScreen` | screen state: `armory` |
| `PatchScreen` | screen state: `patches` |
| `SettingsScreen` | screen state: `settings` |
| `BattleScreen` | screen state: `battle` |

> URL ルーティングは使わず、screen state で擬似遷移（`src/store/navigation.tsx`）

## デザイントークン

### トンマナの参照元

**トンマナは既に用意済みのアイコン画像に準拠する**。具体値は claude design がアイコンから抽出する。

| ファイル | 用途 |
|---|---|
| [`icon-large.png`](../../icon-large.png) | **トンマナ参照の本体**（6.5MB の高解像度版）。色・モチーフ・グロー強度の抽出元 |
| [`public/icon-512.png`](../../public/icon-512.png) | PWA アイコン（中解像度） |
| [`public/icon-192.png`](../../public/icon-192.png) | PWA アイコン（小解像度） |
| [`public/favicon.ico`](../../public/favicon.ico) | favicon |

### アイコン画像から読み取れる特徴（観察ベース、claude design の判断材料）

- **基調色**: ダーク（黒〜濃紺の背景）
- **アクセント色**: ネオンシアン（#00D9FF 系） / ネオン紫 (#A855F7 系) のグラデーション
- **モチーフ**: ジオメトリックなタワー（多面体・ピラミッド・三角形・六角形）、グリッド線、ホログラム的な背景パターン
- **質感**: グロー / 発光ライン / 微細なパーティクル
- **スタイル**: サイバーフューチャー / テックグロー
- **エモーション**: クール、緊張感、無限スケールの神秘性

UI 全体・Fx・アイコン・タイポ選定すべてこのトンマナに合わせる。

### トークンのカテゴリ

具体値はアイコンを抽出元として claude design が決め、CSS Custom Properties として `styles.css` に **110 トークン** が定義済み。実装時は **値を直書きせず、必ず `var(--*)` でトークン名を参照** する。
詳細な参照ガイド・z-index 階層・実装規約は [13-design-handoff.md](./13-design-handoff.md) を参照。

| カテゴリ | 主要 token（抜粋） |
|---|---|
| Background | `--c-bg-deep` / `--c-bg-base` / `--c-bg-elev` / `--c-surface` |
| Text | `--c-text` / `--c-text-mid` / `--c-text-dim` / `--c-text-disabled` |
| Primary (cyan) | `--c-primary` / `--c-primary-hi` / `--c-primary-deep` / `--c-primary-bg` |
| Secondary (purple) | `--c-secondary` / `--c-secondary-hi` / `--c-secondary-deep` / `--c-secondary-bg` |
| Semantic | `--c-danger` / `--c-success` / `--c-warning` |
| Bar | `--c-hp` / `--c-hp-low` / `--c-cd` / `--c-wave` / `--c-shield` |
| Currency | `--c-screw` / `--c-bolt` / `--c-alloy` |
| Tier | `--c-tier-1` … `--c-tier-10`, `--c-patch-t1` … `--c-patch-t5` |
| Font | `--ff-display` (Chakra Petch) / `--ff-body` (Inter) / `--ff-numeric` (JetBrains Mono) |
| Spacing | `--sp-xxs` … `--sp-xxl` (2 / 4 / 8 / 12 / 16 / 24 / 32 px) |
| Radius | `--r-xs` / `-s` / `-m` / `-l` / `-pill` |
| Shadow | `--sh-low` / `-mid` / `-high` |
| Glow | `--glow-cyan-sm` / `-md` / `-lg`、`--glow-purple-sm` / `-md` / `-lg` |
| Motion | `--mo-fast` / `-mid` / `-slow` / `-pulse` + `--ease-default` / `-in` / `-out` / `-back` |
| z-index | `--z-base` / `-fx-field` / `-hud` / `-sheet` / `-dialog` / `-overlay` / `-toast` / `-screen-saver` |

### アイコン体系

| 種類 | 実装 | 配置 |
|---|---|---|
| Currency (`screw` / `bolt` / `alloy`) | 画像生成 AI 製の SVG | `assets/icons/*.svg` を `Icon.jsx` 内で `inline-svg` kind として `dangerouslySetInnerHTML` 埋め込み |
| Weapon (`laser` / `cannon` / `thunder` / `cutter`) | 同上の SVG | 同上。差し替えは `ICON_PATHS` テーブル更新 |
| UI / Game (`close` / `menu` / `settings` / `tower` / `shield` / `heart` / `flame` / `ice` / `lightning` / `skull` / `spark` / `target` 等) | 本体 JSX 内のジオメトリック合成（三角・六角・菱形・円・線のみ） | `Icon.jsx` 内に直接 |

**「複雑な SVG は禁止」**: UI/Game アイコンは三角・六角・菱形・円・線まで。
**画面焼き付き防止（スクリーンセーバー）のアイコン**: `tower` だと本作のマシンと紛らわしいため、`ice` を採用。

## ディレクトリ構造（案）

```
src/
├── components/
│   ├── atoms/          # Button, Icon, Text, NumericDisplay, etc
│   ├── molecules/      # UpgradeCard, PatchCard, WeaponSlotIcon, etc
│   ├── organisms/      # MachineUpgradeTabs, BattleHUD, ResultDialog, etc
│   ├── fx/             # DamagePopFx, MachineHitFx, TierClearFx, etc（CSS animation はここのみ）
│   └── shell/          # AppShell, PageHeader, MainNav
├── pages/              # 旧 page、現状は Screen と呼ぶ
│   ├── title/
│   ├── preparation/
│   ├── machine/
│   ├── armory/
│   ├── patches/
│   ├── settings/
│   └── battle/
├── store/              # Zustand store
├── game/               # ゲームロジック（戦闘・敵・武器計算）
├── data/               # IndexedDB アクセス層
└── styles/             # トークン変数、グローバル SCSS
```

## 命名規則

- コンポーネント: **PascalCase**（`UpgradeCard`, `BattleHudBottom`）
- props 型: コンポーネント名 + `Props`（`UpgradeCardProps`）
- ファイル名: コンポーネントと同名（`UpgradeCard.tsx`）
- スタイル: 同階層に `style.module.scss`
- ストーリー: `UpgradeCard.stories.tsx`（任意、Storybook 用）

## Storybook 活用

- すべての Atom / Molecule は **Storybook ストーリーを書く**（バリアント網羅）
- Organism は主要な状態のみ書く
- Page は Storybook 化しない（実アプリで確認）

## 未確定事項（TBD）

- 具体的なデザイントークン値（claude design に委譲）
- 各 Organism の Zustand store スライス分け方針
- アクセシビリティ（aria 属性 / フォーカス制御）の細則
