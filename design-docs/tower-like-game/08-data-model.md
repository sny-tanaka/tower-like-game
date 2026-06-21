# 08. データモデル / 永続化

## 概要

本作は **PWA（サーバなし）** であり、ユーザーデータはすべて端末ローカルに保存する。保存先は **IndexedDB** を採用する。

### 選定理由

- **容量**: localStorage の 5MB 制限に比べ、IndexedDB は実質数百MB〜（ブラウザ依存）
- **非同期 API**: Promise でラップしやすく、メインスレッドを止めない
- **構造化データ**: オブジェクト単位で put/get でき、JSON シリアライズの往復が不要
- **PWA との親和性**: Service Worker 経由でのバックグラウンド処理にも対応

### 設計思想

- **書き込みは差分単位** で行う（マシン Lv が 1 上がったら `machine` ストアの 1 レコードだけ put）
- **読み込みはアプリ起動時に全件ロード** → メモリ上の Zustand ストアに同期し、以後 IndexedDB は書き戻し専用
- **ラン中の書き込みは間引く**（10 秒ごとのオートセーブ + ライフサイクルイベントで強制 flush）

## DB 全体図

```
IndexedDB:
  database: "tower-like-game"
  version:  N

  Object Stores:
  ├── profile           (key: "singleton")    プレイヤー情報
  ├── currencies        (key: "singleton")    ボルト / 超合金 残高
  ├── machine           (key: key string)     マシン強化 Lv（16 項目）
  ├── weapons           (key: id string)      武器 Lv
  ├── patches           (key: [name, tier])   パッチ所持数
  ├── equippedPatches   (key: slotIndex)      装着中パッチ
  ├── settings          (key: "singleton")    ゲーム設定
  └── runSnapshot       (key: "singleton")    ラン中断時のスナップショット（任意）
```

## ストア詳細

### `profile`

プレイヤープロファイル。シングルトン。

```ts
type ProfileRecord = {
  id: 'singleton';
  highestTier: number;          // 到達最高 Tier
  highestWave: number;          // 到達最高ウェーブ（Tier 内）
  totalPlayTimeSec: number;     // 累計プレイ時間（秒）
  totalRuns: number;            // 累計ラン数
  totalEnemiesKilled: number;   // 累計撃破数
  createdAt: number;            // unix ms（初回プレイ時刻）
  lastPlayedAt: number;         // unix ms
  schemaVersion: number;        // この値は DB バージョンとは別、レコード単位のマイグレーションキー
};
```

### `currencies`

通貨残高。シングルトン（ラン中通貨「ネジ」は永続化しないので含めない）。

```ts
type CurrenciesRecord = {
  id: 'singleton';
  bolt: number;    // 永続通貨ボルト
  alloy: number;   // 武器強化専用通貨 超合金
};
```

### `machine`

マシン強化 16 項目の Lv。`key` 単位で 1 レコード。

```ts
type MachineUpgradeKey =
  | 'maxHp'
  | 'hpRegen'
  | 'attack'
  | 'attackSpeed'
  | 'critRate'
  | 'critDamage'
  | 'range'
  | 'projectileSpeed'
  | 'screwGain'
  | 'boltGain'
  | 'alloyGain'
  | 'patchSlots'
  | 'patchDropRate'
  | 'reviveCount'
  | 'damageReduction'
  | 'startingScrew';
  // TBD: 16 項目の最終リスト（上記は暫定 16 項目）

type MachineRecord = {
  key: MachineUpgradeKey;
  lv: number;
};
```

- 16 項目を **16 レコード** で保持
- 未取得（lv=0）の項目もレコードとして持つかは TBD（持たない場合は read 時に欠落を 0 補完）

### `weapons`

武器ごとの Lv。武器追加で行が増える。

```ts
type WeaponRecord = {
  id: string;     // e.g. 'bow', 'cannon', 'laser'
  lv: number;
  unlocked: boolean;
  // TBD: 武器固有のサブパラメータ（弾速倍率、追加効果のフラグなど）
};
```

### `patches`

パッチごとの所持数。**同名・同 Tier ごとに 1 レコード**。

```ts
type PatchInventoryRecord = {
  name: string;   // パッチ名（e.g. 'sharp_gear'）
  tier: number;   // 1 〜 ∞
  count: number;  // 所持数（合成で 2 → 1 に減って T+1 行に +1 される）
};
```

- インデックス: `[name, tier]` を複合主キーに
- `count = 0` のレコードは削除する（クエリで「種類数」を数えやすくするため）
- 補助インデックス: `byName` (`name` での絞り込み用)

### `equippedPatches`

装着中のパッチ。スロットインデックスをキーに 6 件まで。

```ts
type EquippedPatchRecord = {
  slotIndex: number;  // 0 〜 5
  name: string;       // 装着しているパッチ名
  tier: number;       // 装着している Tier
};
```

- スロット未開放 / 未装着のスロットはレコード自体を持たない
- 同名重複装着の禁止チェックは書き込み側（永続化レイヤ）でも assert する

### `settings`

ゲーム設定。シングルトン。

```ts
type SettingsRecord = {
  id: 'singleton';
  activeWeaponControl: 'manual' | 'auto'; // アクティブ武器の手動/自動切替
  defaultGameSpeed: 1 | 2 | 3;            // 初期速度倍率
  autoMergePatches: boolean;              // パッチ自動合成
  bgmVolume: number;                      // 0.0 〜 1.0
  seVolume: number;                       // 0.0 〜 1.0
  // TBD: その他 (バイブ ON/OFF, 操作系オプション 等)
};
```

### `runSnapshot`

**任意ストア**: ラン中断時に再開機能を入れる場合のみ使用。再開機能を入れない方針なら省略可。

```ts
type RunSnapshotRecord = {
  id: 'singleton';
  tier: number;
  wave: number;
  elapsedInWaveSec: number;
  machineHp: number;
  screw: number;
  pendingBolt: number;     // ラン中に獲得し、まだ確定していないボルト
  pendingAlloy: number;    // 同上
  equippedPatchesSnapshot: EquippedPatchRecord[];
  // TBD: 敵の生存状態まで保存するかは別途検討（最初はウェーブ開始時のみスナップ）
  savedAt: number;
};
```

- TBD: 再開機能を入れるかどうか（推奨: v1 では入れず、ラン途中でブラウザを閉じたらラン放棄）

## TypeScript 型定義サンプル

```ts
// src/data/schema.ts
export const DB_NAME = 'tower-like-game';
export const DB_VERSION = 1;

export const STORES = {
  profile: 'profile',
  currencies: 'currencies',
  machine: 'machine',
  weapons: 'weapons',
  patches: 'patches',
  equippedPatches: 'equippedPatches',
  settings: 'settings',
  runSnapshot: 'runSnapshot',
} as const;

export type StoreName = typeof STORES[keyof typeof STORES];

// 各レコード型は上記セクション参照

export type SaveState = {
  profile: ProfileRecord;
  currencies: CurrenciesRecord;
  machine: MachineRecord[];
  weapons: WeaponRecord[];
  patches: PatchInventoryRecord[];
  equippedPatches: EquippedPatchRecord[];
  settings: SettingsRecord;
  runSnapshot?: RunSnapshotRecord;
};
```

## バージョン管理とマイグレーション

### 基本方針

- **DB バージョン** は `DB_VERSION` 定数で管理。スキーマ変更時に整数で +1
- IndexedDB の `onupgradeneeded` で旧 → 新の差分マイグレーションを実行

### マイグレーションの形

```ts
// src/data/migrations.ts
type Migration = (db: IDBDatabase, tx: IDBTransaction) => void | Promise<void>;

export const migrations: Record<number, Migration> = {
  1: (db) => {
    db.createObjectStore(STORES.profile, { keyPath: 'id' });
    db.createObjectStore(STORES.currencies, { keyPath: 'id' });
    db.createObjectStore(STORES.machine, { keyPath: 'key' });
    db.createObjectStore(STORES.weapons, { keyPath: 'id' });
    const patches = db.createObjectStore(STORES.patches, { keyPath: ['name', 'tier'] });
    patches.createIndex('byName', 'name', { unique: false });
    db.createObjectStore(STORES.equippedPatches, { keyPath: 'slotIndex' });
    db.createObjectStore(STORES.settings, { keyPath: 'id' });
    db.createObjectStore(STORES.runSnapshot, { keyPath: 'id' });
  },
  // 2: (db, tx) => { ... 将来のマイグレーション ... },
};

export function runMigrations(db: IDBDatabase, tx: IDBTransaction, oldVersion: number, newVersion: number) {
  for (let v = oldVersion + 1; v <= newVersion; v++) {
    const migration = migrations[v];
    if (!migration) throw new Error(`No migration registered for version ${v}`);
    migration(db, tx);
  }
}
```

### マイグレーションの原則

- **破壊的変更は避ける**（フィールド追加は新規プロパティ追加で対応、削除はしばらく無視）
- **forward-only**: ダウングレードはサポートしない
- **idempotent**: 同じバージョンへのマイグレーションを 2 回実行しても壊れない
- TBD: マイグレーション失敗時のロールバック方針（最悪エクスポートを促してリセット）

## エクスポート / インポート

ユーザー向けに **JSON でのバックアップ機能**を提供する。

### エクスポート

- 全ストアの内容を 1 つの JSON にまとめてダウンロード

```ts
type ExportFile = {
  formatVersion: 1;
  dbVersion: number;
  exportedAt: number;
  data: SaveState;
};
```

- ファイル名: `tower-like-game-save-{yyyyMMdd-HHmmss}.json`
- 設定画面の「エクスポート」ボタンから実行

### インポート

- ファイル選択 → JSON パース → `formatVersion` チェック → 全ストアを置換
- インポート前に **現在のデータの自動バックアップ** を取り、ローカルに残す（最大 3 世代）
- TBD: インポート時のマイグレーション（旧 dbVersion の JSON を入れたときに `runMigrations` 相当を走らせる）

## リセット機能

- 設定画面に **「永続データ全消去」** ボタンを置く
- 押下時に確認ダイアログ（2 段階確認）
- 実行内容: IndexedDB を `deleteDatabase` → 初期化処理を再実行
- TBD: リセット直前に自動でエクスポート JSON を生成して提示するか

## 書き込み戦略

### ライフサイクル

| タイミング | 書き込み内容 |
|---|---|
| 拠点での強化購入 | 即時書き込み（マシン / 武器 / パッチ装着） |
| ラン開始時 | `runSnapshot` を作成（任意機能の場合のみ） |
| ラン中 | 10 秒ごとに `runSnapshot` を更新（任意機能） |
| ラン中の通貨獲得 | メモリ上のみで保持。永続化はラン終了時 |
| ラン終了時（成功 / 撤退 / 全滅） | `currencies` / `patches` / `profile` を書き戻し |
| visibilitychange (hidden) | 強制 flush |
| beforeunload | 強制 flush（ただし IndexedDB は async なので保証なし） |

### 書き込み単位

- レコード単位 で put する（差分書き込み）
- 1 トランザクションに複数ストアを含む場合は readwrite で開く

## セキュリティ / プライバシー

- **暗号化なし**（個人開発・サーバなし PWA、改ざんは自己責任）
- TBD: 改ざん検知（チェックサム埋め込み）の有無
- ブラウザのプライベートモードでは IndexedDB が揮発する旨を UI に注意書き

## 未確定事項（TBD まとめ）

- 16 項目のマシン強化キーの最終リスト
- 武器固有サブパラメータ
- `runSnapshot` を v1 で入れるか
- マイグレーション失敗時のロールバック方針
- インポート時の旧バージョン JSON 対応範囲
- リセット時の自動バックアップ提示
- 改ざん検知の有無
- 設定項目の最終リスト（バイブ・操作系等）
- 衝突解決（複数タブで同時起動された場合の挙動 — 単一タブ強制 or 最終書き勝ち）
