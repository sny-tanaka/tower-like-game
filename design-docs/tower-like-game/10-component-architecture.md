# 10. コンポーネント設計（Atomic Design）

本作のデザイン・実装はいずれも **再利用可能なコンポーネント単位** で組み立てる。
画面を 1 枚ずつ静的に作るのではなく、Atom → Molecule → Organism → Page の階層で合成する。

**デザイン（色・タイポ・余白・アニメ秒数）は claude design に委譲**。本章はコンポーネントの**役割と入出力**を定義する。

## Atomic Design の階層

| 階層 | 役割 | 例 |
|---|---|---|
| **Atom** | これ以上分解しない最小単位。UI Primitive | Button, Icon, Text, Bar, Tab |
| **Molecule** | 複数 Atom の組合せ。1 機能だが状態は外から渡される | UpgradeCard, PatchCard, WeaponSlotIcon |
| **Organism** | 複数 Molecule の塊。1 つのドメイン機能を担う | RunWorkshopBottomSheet, MachineUpgradeTabs, BattleHUD |
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
| `NumericDisplay` | value, unit (アルファベット表記対応), decimals | 数値（K/M/B ではなく A/B/C... 表記） |
| `CurrencyAmount` | currency (screw/bolt/alloy), value | 通貨 + 値（アイコン込み） |
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
| `SegmentedControl` | options, value, onChange | 速度倍率切替、初期速度設定 |
| `FileInput` | accept, onChange | インポート JSON |

### コンテナ系

| Atom | props | 用途 |
|---|---|---|
| `Card` | children | 一般的なカード枠 |
| `Sheet` | children | ボトムシート / オーバーレイの素地 |
| `Overlay` | onClose, children | 全画面オーバーレイ（背景タップで close） |

## Molecule 一覧

| Molecule | 構成 | 用途 |
|---|---|---|
| `UpgradeCard` | Text + NumericDisplay + Button×3(+1/+5/Max) + CurrencyAmount | マシン強化項目 1 つ、武器強化 1 つ、ラン中 WS 項目 1 つ |
| `PatchCard` | Icon + Text + Badge(Tier) + NumericDisplay(count) | パッチ 1 種 |
| `WeaponSlotIcon` | Icon + Badge(現装備) + CircularProgress(CD) | バトル下 HUD の武器切替アイコン 1 つ |
| `WeaponPreview` | Icon + Text + NumericDisplay×複数 | 出撃準備の武器選択タブ、武器庫の武器詳細タブ |
| `PatchSlot` | Card + PatchCard or 空表示 | 装着スロット 1 個 |
| `EnemyHpBar` | Text + ProgressBar | エリート/ボスの HP バー |
| `WaveProgressBar` | ProgressBar + Badge(milestone) | ウェーブ残り秒数 |
| `TabBar` | Tab × N | 画面内タブ |
| `ConfirmDialog` | Text + Button×2 (yes/no) | 撤退確認・リセット確認 |
| `Toast` | Text + Icon (info/error) | 一時通知 |
| `BottomSheetHandle` | Icon | ボトムシートのドラッグハンドル |

## Organism 一覧

### 共通

| Organism | 役割 |
|---|---|
| `AppShell` | 全画面のスケルトン（背景 / safe-area / 共通ヘッダ） |
| `PageHeader` | 画面タイトル + 戻る + 通貨表示（その画面で使うもののみ） |
| `MainNav` | 出撃準備画面からマシン強化 / 武器庫 / パッチ庫 / 設定 / タイトルへの導線 |

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
| `MachineUpgradeTabs` | 防御 / 攻撃 / アクティブ / 経済 / スロットの 5 タブ |
| `MachineUpgradeList` | 該当タブの UpgradeCard リスト |

### 武器庫画面 (`ArmoryScreen`)

| Organism | 役割 |
|---|---|
| `WeaponDetailsTab` | 4 武器の WeaponPreview を切替 |
| `WeaponLevelUpgradeTab` | 共通武器強化 Lv の UpgradeCard |

### パッチ庫画面 (`PatchScreen`)

| Organism | 役割 |
|---|---|
| `PatchEquipTab` | PatchSlot × N（マシン強化「パッチスロット数」依存） |
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
| `BattleHudBottom` | ネジ + WeaponSlotIcon×4 + ActiveSkillButton + 速度 + 一時停止 + メニュー + スクリーンセーバー |
| `RunWorkshopBottomSheet` | 4 つの UpgradeCard |
| `BattleMenuOverlay` | 撤退 / 手動・自動切替 / 簡易音量 |
| `ResultDialog` | ヘッダ + 統計 + 獲得 + Button×2 |
| `ScreenSaverDialog` | フルスクリーンアニメ + タップ復帰 |

### タイトル画面 (`TitleScreen`)

| Organism | 役割 |
|---|---|
| `TitleHeader` | ロゴ |
| `TitleActions` | 「続きから」「新規開始」「設定」 |

## Fx コンポーネント

アニメーション・演出・エフェクトは **すべて Fx コンポーネント** として独立した単位に閉じ込める。
**CSS アニメーション（`@keyframes` / `animation:` プロパティ）を画面・Atom・Molecule・Organism 内に直接書かない**。Fx を介して使う。

### 設計原則

- **1 Fx = 1 演出**: 1 つのアニメーション / トランジション / 視覚効果だけを持つ
- **マウント = 再生開始 / アンマウント = 停止**: 親が条件付きレンダリングで Fx を出し入れすることで演出を制御
  - 「再生中フラグ」を Fx 内に持たない（store / 親の state で管理）
  - 同じ Fx を再度マウントすれば再生し直される
- **CSS アニメーションは Fx 内にだけ書く**: `@keyframes` は Fx の `style.module.scss` に閉じる。他のコンポーネントが Fx と同じアニメを書くのは禁止（重複防止）
- **`prefers-reduced-motion` 対応**: ユーザーが motion 削減を望む場合、Fx は no-op に切り替えるか、トランスフォームのみで動かす
- **タイマー・トランジション完了の検知**: `onAnimationEnd` / `onTransitionEnd` でアンマウント要求を親へ伝える（コールバック props）

### ディレクトリと命名

- 配置: `src/components/fx/<FxName>/index.tsx` + `style.module.scss`
- 命名: 末尾を `Fx` で揃える（`DamagePopFx`, `ScreenShakeFx`, `LevelUpFx`）
- Atom / Molecule / Organism からは `import` で参照、CSS の重複定義は禁止

### 共通 Fx 一覧

#### 戦闘演出 (Fx)

| Fx | 起点 | 内容 |
|---|---|---|
| `DamagePopFx` | 敵がダメージを受けた瞬間 | 数値が上方向にポップしてフェードアウト |
| `CritDamagePopFx` | クリ発動 | 通常より大きい・色違いのポップ |
| `EnemyHitFx` | 敵被弾位置 | フラッシュ + 小爆発 |
| `EnemyDeathFx` | 敵撃破位置 | パーティクル発散 + アイコン消滅 |
| `BlastFx` | Cannon 着弾点 | 範囲ダメの円形爆発 |
| `LaserBeamFx` | Laser 発射 | 細い線が一瞬伸びる |
| `ChainBoltFx` | Thunder Plasma Discharge | ジグザグ電撃が連鎖 |
| `OverdriveAuraFx` | Cutter Overdrive 発動中 | マシン周囲の残像オーラ |
| `MegaBeamFx` | Laser Mega Beam | 太いビームが画面端まで伸びる |
| `VolleyFx` | Cannon Volley | 5 発放射状に飛ぶ |
| `FreezeFx` | 凍結発動 | 敵に氷晶が貼り付く |
| `BurnFx` | 燃焼発動 | 敵から炎が立ち上がる |
| `InstantKillFx` | インスタントキル発動 | 即死フラッシュ |

#### 画面演出 (Fx)

| Fx | 起点 | 内容 |
|---|---|---|
| `ScreenShakeFx` | 大ダメ・大爆発・ボス出現 | 画面全体の揺れ |
| `DamageVignetteFx` | マシン被ダメ | 画面端に赤ビネット |
| `HealFlashFx` | HP リジェネ・回復パッチ発動 | HP バーが緑にフェード |
| `WaveStartFx` | ウェーブ開始 | 上 HUD にウェーブ番号がスライドイン |
| `EliteAppearanceFx` | エリート出現 | フラッシュ + 名前バナー |
| `BossAppearanceFx` | Tier ボス出現 | 大型フラッシュ + 名前バナー + 効果音 |
| `TierClearFx` | Tier クリア | 画面全体のフィナーレ演出 |

#### 獲得・強化演出 (Fx)

| Fx | 起点 | 内容 |
|---|---|---|
| `CoinPickupFx` | ネジ獲得 | 数値が下 HUD に吸い込まれる |
| `BoltPickupFx` | ボルト獲得 | 上 HUD に吸い込まれる |
| `AlloyPickupFx` | 超合金獲得 | 上 HUD に吸い込まれる |
| `PatchDropFx` | パッチドロップ | 特殊な落下アイテム演出 |
| `LevelUpFx` | 強化購入時 | カードにキラキラ |
| `MergeSuccessFx` | パッチ合成成功 | 2 枚が 1 枚に合体する演出 |

#### 状態・トランジション (Fx)

| Fx | 起点 | 内容 |
|---|---|---|
| `BottomSheetSlideFx` | ボトムシート開閉 | 下からスライド |
| `DialogFadeFx` | ダイアログ開閉 | フェード + スケール |
| `OverlayFadeFx` | オーバーレイ開閉 | 背景フェード |
| `TabSwitchFx` | タブ切替 | コンテンツのクロスフェード |
| `ScreenTransitionFx` | 画面遷移 | スクリーン間のスライド or フェード |
| `ScreenSaverFx` | スクリーンセーバー起動 | フルスクリーンの軽量アニメ |
| `ToastSlideFx` | トースト出現 | 画面端からスライド |

### 使い方の例（コード方針）

```tsx
// 親 (Organism) で条件付きマウント
{isDamaged && <DamageVignetteFx onDone={() => setIsDamaged(false)} />}

// 親が key を変えて再マウント（連続発動時）
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

具体値はアイコンを抽出元として claude design が決める。本章では存在する変数の **カテゴリのみ** 定義する。

| カテゴリ | 例 |
|---|---|
| Color | bg (dark) / surface / primary (cyan) / secondary (purple) / danger / hp / cd / tier-badge / patch-tier (T 別) |
| Typography | heading-1 / heading-2 / body / caption / numeric (等幅、テック調) |
| Spacing | xs / s / m / l / xl (4/8/12/16/24 px ベース等) |
| Radius | s / m / l |
| Shadow | low / mid / high / **glow-cyan / glow-purple**（ネオングロー専用） |
| Motion | fast / mid / slow / easing-default |
| Layer (z-index) | base / sheet / dialog / overlay / toast / screen-saver |

これらは SCSS 変数 or CSS カスタムプロパティで定義し、コンポーネントは値ではなくトークン名で参照する。

## ディレクトリ構造（案）

```
src/
├── components/
│   ├── atoms/          # Button, Icon, Text, NumericDisplay, etc
│   ├── molecules/      # UpgradeCard, PatchCard, WeaponSlotIcon, etc
│   ├── organisms/      # MachineUpgradeTabs, BattleHUD, ResultDialog, etc
│   ├── fx/             # DamagePopFx, ScreenShakeFx, LevelUpFx, etc（CSS animation はここのみ）
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
