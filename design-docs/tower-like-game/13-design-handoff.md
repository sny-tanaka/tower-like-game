# 13. デザインハンドオフ / 実装規約

claude design で完成したデザインシステム（`28197d6b-f745-4ddd-be23-addb5e0ebd05`）からのハンドオフ資料。
本章は **実装者向けの参照規約** であり、[10-component-architecture.md](./10-component-architecture.md) の役割定義を補完する。

## 1. デザインシステムの構成

| 階層 | 数 | 配置 (claude design 側) |
|---|---|---|
| Atom | 14 (+ Toggle) | `atoms/<Name>/` |
| Molecule | 11 | `molecules/<Name>/` |
| Organism | 26 | `organisms/<Name>/` |
| Page | 7 | `pages/<Name>Screen/` |
| Fx | 17 (Phase 5 で 21 まで拡充予定) | `fx/<Name>Fx/` |

各コンポーネントは `<Name>.jsx` / `<Name>.d.ts` / `<Name>.html` (@dsCard プレビュー) の 3 ファイル構成。
全 110 トークンは `styles.css` (CSS Custom Properties) で定義済み。

> `styles.css` / `_ds_bundle.js` / 各 `<Name>.html` プレビューは claude design 側で管理される **正本**。本リポジトリでの実装はこれらを参照しながら React + TypeScript + SCSS Modules で書き起こす。

## 2. Layout: fixed / scroll の分離

### AppShell の構造

```
AppShell (height: 100vh; max-height: 100vh)
├── header (固定、backdrop-filter: blur)
│     PageHeader + (TabBar)
├── main (flex: 1; overflow: auto; display: flex; flex-direction: column)
│     各 Tab / Organism の本体（スクロール対象）
└── footer (固定)
      BottomNav (5 画面) / LaunchButton + BottomNav (PreparationScreen)
```

### Safe-area インセット

- 全方向: `max(env(safe-area-inset-*), 12px)` を使い、実機 / プレビュー両対応
- ノッチ / ホームインジケータの裏に固定要素が隠れないよう必ず padding に加算

### BattleScreen の特例

- `noScroll=true` で全画面固定
- `BattleField` が `flex: 1` で残領域を埋める
- `BottomNav` は配置しない（バトル中は他画面に遷移しない）

### TitleScreen の特例

- ヒーローレイアウト（大型タワー紋章）+ `TitleActions`
- `BottomNav` は配置しない（初期セッション動線）

## 3. CSS Custom Properties / トークン参照

### 原則

- **値の直書き禁止**: `color: #00d9ff` ではなく `color: var(--c-primary)`
- 全 110 トークンは `styles.css` で定義済み、コンポーネント実装側では参照のみ
- 新しい色 / 余白 / 半径が必要になった場合は **トークンとして styles.css に追加してから** 使う

### z-index 階層

| token | 値 | 用途 |
|---|---|---|
| `--z-base` | 0 | 通常レイヤ |
| `--z-fx-field` | 50 | フィールド演出 (DamagePop / EnemyHit / Blast / Beam / Vignette / HealFlash) |
| `--z-hud` | 80 | HUD |
| `--z-sheet` | 100 | ボトムシート |
| `--z-dialog` | 200 | ダイアログ |
| `--z-overlay` | 300 | オーバーレイ |
| `--z-toast` | (separate) | トースト |
| `--z-screen-saver` | (separate) | スクリーンセーバー |

### よく使うトークン早見表

| カテゴリ | 抜粋 |
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

## 4. 数値表記 (NumericDisplay)

### 表記ルール

- `raw < 1,000` → そのまま整数
- それ以上 → 仮数 × 10³ⁿ をアルファベット表記:
  - `1,000` → `1.00A`
  - `1,234,567` → `1.23B`
  - `10⁹` → `1.00C`
  - … Z (10⁷⁸) の次は `AA` → `AB` → … と無限ループ

### 動的色 (accentColor='scale')

既定で **桁数 (A → Z → AA) ごとに cyan→purple グラデ** が自動付与される。
A = H195 (cyan) → Z = H295 (purple) を oklch で線形補間。
プレイヤーが Tier 進行を「色の変化」で直感する設計。

個別固定色を使いたい場合は `accentColor='primary' | 'secondary' | 'danger'` を指定。
外部 `style` prop は merge される（`color` / `fontSize` / `textShadow` 等を override 可）。

### 表示上限

- 表示文字数の最大長は **10 桁 (例: `150.5B`)** を想定
- UpgradeCard 等のコンパクトレイアウトはこの長さに収まるよう設計済み
- 内部表現は [11-bignum.md](./11-bignum.md) の `BigNum` クラスで無限桁を保持

## 5. アイコン体系

| 種類 | 実装 | 配置 |
|---|---|---|
| Currency (`screw` / `bolt` / `alloy`) | 画像生成 AI 製の SVG | `assets/icons/*.svg`、`Icon.jsx` 内で `inline-svg` kind として `dangerouslySetInnerHTML` 埋め込み |
| Weapon (`laser` / `cannon` / `thunder` / `cutter`) | 同上の SVG | 同上 |
| UI / Game (`close` / `menu` / `settings` / `tower` / `shield` / `heart` / `flame` / `ice` / `lightning` / `skull` / `spark` / `target` 等) | JSX 内のジオメトリック合成（三角・六角・菱形・円・線のみ） | `Icon.jsx` 内に直接 |

### 差し替え方

- SVG: `assets/icons/<name>.svg` を上書きするか、`ICON_PATHS` テーブルのエントリを更新
- ジオメトリック: `Icon.jsx` 内の該当 case を修正

### スクリーンセーバーアイコン

`tower` (本作のマシンと紛らわしい) → **`ice`** に変更。差別化のため。

## 6. Fx の API 規約

詳細は [10-component-architecture.md](./10-component-architecture.md) の Fx 節を参照。本節は実装時の必須項目のまとめ。

### 共通 props

| prop | 必須 | 内容 |
|---|---|---|
| `x` / `y` | 戦闘系: 必須 | 親内の **パーセント座標** (0–100) |
| `duration` | 任意 | アニメ時間 ms（既定値は Fx ごとに）|
| `onDone` | 任意 | アニメ完了時に親へ通知（`onAnimationEnd` で発火） → 親が unmount 制御 |

### 配置

- 戦闘系: `position: absolute` で親 (BattleField) 内に絶対配置
- 画面演出系: `position: absolute; inset: 0` で AppShell or BattleScreen ルートに

### `@keyframes` の名前衝突防止

- `useMemo` で生成した unique id をスコープに付ける
- 例: `keyframes--damage-pop-${useId()}`

### prefers-reduced-motion

```scss
@media (prefers-reduced-motion: reduce) {
  animation: none !important;
  transition: none !important;
}
```

すべての Fx で必須対応。

### 発火パターン

```tsx
// イベント配列を map で出し分け
{damageEvents.map((ev) => (
  <DamagePopFx
    key={ev.id}
    x={ev.x} y={ev.y}
    value={ev.value}
    crit={ev.crit}
    onDone={() => removeDamage(ev.id)}
  />
))}

// 単発フラッシュ (key 変化で再マウント発火)
{machineHitKey > 0 && (
  <MachineHitFx key={machineHitKey} cx={machineX} cy={machineY} />
)}

// Tier クリア時のフィナーレ
{tierClearKey > 0 && (
  <TierClearFx key={tierClearKey} onDone={() => setTierClearKey(0)} />
)}
```

## 7. 画面 × Organism マッピング

| Page | header | main (scrollable) | footer |
|---|---|---|---|
| `TitleScreen` | `TitleHeader` | hero（大型タワー紋章） | `TitleActions` |
| `PreparationScreen` | `PageHeader` + `TabBar` | `TierSelectTab` / `InitialWeaponTab` / `EquippedPatchesTab` | `LaunchButton` + `BottomNav` |
| `MachineScreen` | `PageHeader` | `MachineUpgradeList`（2 列、全 16 項目混在） | `BottomNav` |
| `ArmoryScreen` | `PageHeader` + `TabBar`（詳細 / 強化） | `WeaponDetailsTab` / `WeaponLevelUpgradeTab` | `BottomNav` |
| `PatchScreen` | `PageHeader` + `TabBar`（装着 / 所持 / 合成） | `PatchEquipTab` / `PatchInventoryTab` / `PatchMergeTab` | `BottomNav` |
| `SettingsScreen` | `PageHeader` + `TabBar`（音 / ゲーム / データ） | `SoundSettingsTab` / `GameSettingsTab` / `DataSettingsTab` | `BottomNav` |
| `BattleScreen` | `BattleHudTop` | `BattleField` | `BattleHudBottom` |

`BattleScreen` には overlay layer として: `RunWorkshopBottomSheet` / `BattleMenuOverlay` / `ResultDialog` / `ScreenSaverDialog`。

## 8. 通貨表示ルール（再掲）

各画面で **使う通貨のみ** 表示:

| 画面 | 表示する通貨 |
|---|---|
| 出撃準備 | screw + bolt + alloy |
| マシン強化 | bolt |
| 武器庫 | bolt + alloy |
| パッチ庫 | — |
| 設定 | — |
| バトル | screw のみ（HUD） |

### UpgradeCard 内のコスト表示

- 各ボタン (+1 / +5 / Max) 下のコスト表示から **通貨アイコンを省略**
- カード単位で通貨は固定なので、アイコンを 3 回繰り返す必要がない
- セクション見出し or accent 色で通貨が分かる前提

## 9. ダイアログの構造

- **Overlay**（ディムバックドロップ + dismissible） + その中の **Dialog 本体** の 2 層構成
- 「閉じる × ボタン」は Overlay の責務ではなく、内側の Dialog の責務
- `ConfirmDialog` の `variant='danger'` 時は赤発光（撤退 / リセット時）

## 10. 実装着手チェックリスト

実装に入る前に確認:

- [ ] `styles.css` を import / link して全 token を読み込む
- [ ] 各 Atom / Molecule / Organism の React 実装は claude design 側の `<Name>.html` プレビューを **実装の正** として参照
- [ ] state は Zustand 等のグローバルストアに集約（Page は props 経由で受ける）
- [ ] バトル中の演出は Fx 一覧の組合せで実現 — **新規 Fx を作る前に既存 Fx を props で再利用できないか必ず確認**
- [ ] アイコン差し替え: `assets/icons/*.svg` を上書きするか、`ICON_PATHS` のエントリを更新
- [ ] **値の直書き禁止**: 色・余白・タイポはすべて `var(--*)` 経由
- [ ] CSS アニメは Fx または当該コンポーネント内（重複定義禁止）

## 11. 未確定事項（TBD、実装段階で詰める）

- 各 Fx の最終秒数 / イージング微調整（実装段階で計測）
- 60fps 達成の最終確認（デバイス性能依存）
- 低スペック端末向けの描画品質モード（`prefers-reduced-motion` だけで足りるか）
- v0.3.2 で `PickupFx` (通貨吸い込み演出) を廃止 (リザルト画面でまとめて確認する仕様に変更)。 `MergeSuccessFx` (パッチ合成成功) / `PatchDropFx` (パッチドロップ) も同方針で **新規追加しない**
