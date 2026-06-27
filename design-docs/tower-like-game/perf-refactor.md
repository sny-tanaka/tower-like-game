# v1.3.7 バトル描画中の発熱対策 大規模リファクタリング設計

専門家エージェントによる精緻調査 (v1.3.6 マージ後) で特定された通常プレイ中の発熱主犯
を解消するための **target architecture** と段階的移行プラン。 実装は phase 単位で
独立 PR で進める。

## 1. 発熱主犯 (調査結果)

| # | 主犯 | 規模 |
|---|---|---|
| 1 | `enemiesRef.current.map(e => ({...e, ...}))` を 1 tick 内で **5 段** | 35 体 × 60fps = 約 175 オブジェクト/フレーム → minor GC + reconciliation |
| 2 | BattleField の敵位置を JS で毎フレーム `style.left/top` 文字列更新 | 35 体 × 60fps の inline style write → layout/paint |
| 3 | Page の Hub 化 + 20+ useStore selector で **60fps subscriber** | machineHp / activeCdSec / enemies / screw / bolt / waveElapsedSec が 60fps trigger |
| 4 | Cannon DamagePopFx スパイク + Cutter/Overdrive 常時 infinite GPU 演出 | drop-shadow / box-shadow / backdrop-filter / mix-blend-mode の同時並走 |
| 5 | BGM scheduler / SE 連打で AudioNode 大量生成 | createNoiseBuffer 毎発 new、 SE 270 node/秒 |

## 2. Target Architecture (4 本柱)

### 2-1. `BattleEntityStore` (新 class)

- `Map<id, MutableEnemy>` で **in-place mutation** を許可
- `MutableEnemy` は class、 position / hp / 状態異常 / thunderStacks 等をパブリックフィールドで保持
- 変更は直接 mutation だが、 helper を呼んで version を進める (`store.markEnemyMoved(id)` 等)
- 全体購読用に `getSnapshot(): number` (= version) を提供
- 個別 sprite 用に `subscribeEnemy(id, kind, cb)` (kind: position / status / hp の 3 種)

### 2-2. BattleField を Page から分離 + `useSyncExternalStore` で直接購読

- BattleField は **EnemyLayer / FxLayer / ProjectileLayer** の三層に分割
- 各 layer は **version number だけ** subscribe (配列ではない → tearing 防止)
- 個別 EnemySprite は自身の id だけ subscribe

### 2-3. 敵位置は CSS 変数 + `transform: translate3d`

- `transform` + `--x` / `--y` の CSS 変数で位置を表現
- EnemySprite mount 時に raw subscribe → callback で `el.style.setProperty('--x', String(enemy.position.x))` (imperative)
- React reconciliation を完全に通さない (commit phase ゼロ)
- HP / status は uSES 経由で React に乗せて OK (頻度低)

### 2-4. Page は useStore を 0〜2 個に縮小、 HUD 個別 subscribe + React.memo

- Page の 20+ useStore selector を各 HUD / overlay に分散
- `BattleHudTop` は machineHp / activeCdSec / currentTier / 等を個別 subscribe
- `BattleHudBottom` は screw / bolt / weaponCds / 等
- 各 HUD を `React.memo`

## 3. 段階的移行プラン

### Phase 0 — 計測ハーネス (v1.3.7-phase0、 機能変更ゼロ)

- `?debug=perf` で fps / heap / 敵 sprite 数を表示 (`PerfOverlay` atom)
- BattleField の敵 div に `data-enemy-id` 属性
- 詳細手順: [dev-docs/perf-bench.md](../../dev-docs/perf-bench.md)

### Phase 1 — `BattleEntityStore` 導入 (中身はまだ immutable)

- 新規 `src/game/store/BattleEntityStore.ts` (class)
- `useBattleLoop` の `setEnemies` を `store.setEnemies + store.notifyFrame` に
- `Page` / `BattleField` の interface は当面互換維持
- 内部 spread mutation はまだ変えない

### Phase 2 — BattleField が store を直接購読、 Page から enemies props 廃止

- BattleField を 3 layer 分割 (`EnemyLayer` / `FxLayer` / `ProjectileLayer`)
- 各 layer が `useSyncExternalStore` で個別購読
- Page の `enemies / damageEvents / deathEvents / projectileEvents` props 廃止
- 既存テストは TestProvider で store 注入

### Phase 3 — enemies の mutable 化 + CSS 変数 + transform (本丸)

- `SpawnedEnemy` を `MutableEnemy` class に
- useBattleLoop tick 内の 5 段 spread → in-place mutation
- 敵位置を `style.left/top` → CSS 変数 `--x` / `--y` + `transform: translate3d`
- EnemySprite に分離、 position subscribe は imperative DOM 書換え

### Phase 4 — Page useStore 分散

- Page の 20+ useStore を 0〜2 個に
- 各 HUD / overlay が個別 subscribe
- React.memo 化

### Phase 5 — 量子化と仕上げ

- `waveElapsedSec`: 100ms ごと
- `activeCdSec`: 100ms or CSS animation 化
- `BigNum 表示` (CurrencyAmount): 200ms ごと

## 4. 主要な設計判断

| 判断 | 理由 |
|---|---|
| `getSnapshot` は **version number** (配列ではない) | tearing 防止、 `Object.is` で安定判定 |
| **mutation は rAF callback 内のみ** (useEffect ボディ禁止) | StrictMode の double-invoke を回避 |
| BigNum は immutable のまま保持 | `addMachineHp` 等の既存 API が壊れない |
| EnemySprite の position は `useSyncExternalStore` に乗せず raw subscribe + imperative | React commit phase をゼロにして layout/paint を回避 |
| EnemySprite の HP / status は uSES で OK | 頻度が低い (撃破時 / 状態異常変化時のみ) |

## 5. 想定される罠と対策

| # | 罠 | 対策 |
|---|---|---|
| 1 | StrictMode double-invoke で store が 2 個 | `useMemo` + Context で Provider 1 個に集約 |
| 2 | React 19 concurrent rendering の tearing | `useSyncExternalStore` 必須 + getSnapshot を version number に限定 |
| 3 | zustand v5 `Object.is` で shallow object 返却が破綻 | shallow object selector 禁止 (個別 selector に分割) |
| 4 | ScreenSaverDialog 開閉時の sync 漏れ (v1.3.5 既往) | suspendRendering ガードを EntityStore 側に移植 |
| 5 | 既存 1693 件テストの破壊 | mutation API ラッパーで互換性確保、 局所修正で済ませる |
| 6 | 撃破タイミングのずれ | tick 順序を厳密に保つ + deterministic な回帰テスト追加 |
| 7 | CSS `transform: translate(%, %)` の基準 | Phase 3 で実機計測しながら方式選択 (CSS 変数 left/top か、 cqmin 換算 transform か) |
| 8 | DamagePop / DeathFx の position が消えた敵を参照 | event 側に `{x, y}` を**値コピー**で持つ (現状仕様維持) |

## 6. 関連ドキュメント

- [dev-docs/perf-bench.md](../../dev-docs/perf-bench.md) — 計測手順
- [10-component-architecture.md](./10-component-architecture.md) — UI コンポーネント階層
- [01-battle-screen.md](./01-battle-screen.md) — バトル画面仕様
