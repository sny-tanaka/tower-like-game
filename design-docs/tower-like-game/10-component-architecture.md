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

具体的な値は **claude design に委譲**。本章では存在する変数の **カテゴリだけ** 定める。

| カテゴリ | 例 |
|---|---|
| Color | bg / surface / primary / danger / hp / cd / tier-badge / patch-tier (T 別) |
| Typography | heading-1 / heading-2 / body / caption / numeric (等幅) |
| Spacing | xs / s / m / l / xl (4/8/12/16/24 px ベース等) |
| Radius | s / m / l |
| Shadow | low / mid / high |
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
