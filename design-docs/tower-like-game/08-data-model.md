# 08. データモデル / 永続化

## 概要

本作は **PWA（サーバなし）** であり、ユーザーデータはすべて端末ローカルに保存する。保存先は **IndexedDB**。

### 選定理由

- **容量**: localStorage の 5MB 制限に比べ、IndexedDB は実質数百MB〜（ブラウザ依存）
- **非同期 API**: Promise でラップしやすく、メインスレッドを止めない
- **構造化データ**: オブジェクト単位で put/get でき、JSON シリアライズの往復が不要
- **PWA との親和性**: Service Worker 経由でのバックグラウンド処理にも対応

### 設計思想

- **書き込みは差分単位** で行う（マシン Lv が 1 上がったら `machine` ストアの 1 レコードだけ put）
- **読み込みはアプリ起動時に全件ロード** → メモリ上の Zustand ストアに同期し、以後 IndexedDB は書き戻し専用
- **ラン中の書き込みは間引く**（ラン中はメモリ上のみ、ラン終了時に永続化）
- **PWA 単一タブ起動を前提**（複数タブ起動時の競合解決はしない）

## DB 全体図

```
IndexedDB:
  database: "tower-like-game"
  version:  N

  Object Stores:
  ├── profile           (key: "singleton")    プレイヤー情報
  ├── currencies        (key: "singleton")    ボルト / 超合金 残高
  ├── machine           (key: key string)     マシン強化 Lv（16 項目）
  ├── weapons           (key: "singleton")    武器強化 Lv（全武器共通の 1 個）
  ├── patches           (key: [name, tier])   パッチ所持数
  ├── equippedPatches   (key: slotIndex)      装着中パッチ
  └── settings          (key: "singleton")    ゲーム設定
```

> v1 ではラン中断・再開機能（runSnapshot）は実装しない。ブラウザを閉じたらラン放棄。

## ストア詳細

### `profile`

```ts
type ProfileRecord = {
  id: 'singleton';
  highestTier: number;          // 到達最高 Tier
  highestWave: number;          // 到達最高ウェーブ（Tier 内）
  totalPlayTimeSec: number;     // 累計プレイ時間（秒）
  totalRuns: number;            // 累計ラン数
  totalEnemiesKilled: number;   // 累計撃破数
  createdAt: number;            // unix ms
  lastPlayedAt: number;         // unix ms
  schemaVersion: number;        // レコード単位のマイグレーションキー
};
```

### `currencies`

ラン中通貨「ネジ」は永続化しないので含めない。

```ts
type CurrenciesRecord = {
  id: 'singleton';
  bolt: number;    // ボルト
  alloy: number;   // 超合金
};
```

### `machine`

マシン強化 16 項目の Lv。1 項目 1 レコード。

```ts
type MachineUpgradeKey =
  // Defensive
  | 'maxHp'
  | 'hpRegen'
  | 'damageReduction'
  | 'defense'
  // Offensive
  | 'baseAttack'
  | 'attackSpeed'
  | 'range'
  | 'critRate'
  | 'critMultiplier'
  // Active
  | 'activePower'
  | 'activeCdReduction'
  // Economic
  | 'screwGain'
  | 'boltGain'
  | 'alloyGain'
  | 'patchDropRate'
  // Slot
  | 'patchSlots';

type MachineRecord = {
  key: MachineUpgradeKey;
  lv: number;     // 上限なし（patchSlots のみ 5 でハードキャップ）
};
```

- 16 項目すべてを 16 レコードとして初期投入（lv=0 で）
- 未強化項目も read 時に必ず取れるようにする

### `weapons`

**全武器共通の武器強化 Lv 1 個**を保持する。個別の Lv は持たない。

```ts
type WeaponsRecord = {
  id: 'singleton';
  weaponLv: number;                                          // 全武器共通の強化 Lv
  initialWeapon: 'laser' | 'cannon' | 'thunder' | 'cutter';  // ラン開始時の初期装備
};
```

- `initialWeapon` は **ラン開始時の装備武器**（出撃準備画面で選択した値）
- ラン中の武器切替はメモリ上のみで保持し、永続化しない（次ラン開始は `initialWeapon` から）

### `patches`

パッチの所持数。**同名・同 Tier ごとに 1 レコード**。

```ts
type PatchName =
  | 'instantKill' | 'bossKiller' | 'doubleShot'         // Offensive
  | 'damageImmune' | 'killHeal' | 'shieldRegen'         // Defensive
  | 'bonusDrop' | 'boltCast'                            // Economic
  | 'freezeHit' | 'burnHit';                            // Utility

type PatchInventoryRecord = {
  name: PatchName;
  tier: number;     // 1 〜 ∞
  count: number;    // 所持数（合成で 2 → 1、上位 Tier +1）
};
```

- 主キー: `[name, tier]`
- `count = 0` は削除（種類数を数えやすくするため）
- 補助インデックス: `byName`（同名の全 Tier をまとめて取りたいとき用）

### `equippedPatches`

装着中パッチ。スロットインデックスをキー、最大 6 件。

```ts
type EquippedPatchRecord = {
  slotIndex: number;  // 0 〜 5
  name: PatchName;
  tier: number;
};
```

- スロット未開放 / 未装着のスロットはレコードを持たない
- 同名重複装着の禁止は永続化レイヤでも assert

### `settings`

ゲーム設定。

```ts
type SettingsRecord = {
  id: 'singleton';
  defaultGameSpeed: 1 | 2 | 3;            // ラン開始時の速度倍率
  bgmVolume: number;                      // 0.0 〜 1.0
  seVolume: number;                       // 0.0 〜 1.0
  vibrationEnabled: boolean;              // スマホのバイブレーション
};
```

> アクティブスキルの手動/自動切替は **ラン中のバトル画面でのみ切替** （ラン開始時は手動固定）なので、永続設定には含めない（[05-weapons.md](./05-weapons.md) と整合）。
> パッチ自動合成は合成画面のみで操作するので永続設定には含めない（[06-patches.md](./06-patches.md) と整合）。

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
} as const;

export type StoreName = typeof STORES[keyof typeof STORES];

export type SaveState = {
  profile: ProfileRecord;
  currencies: CurrenciesRecord;
  machine: MachineRecord[];
  weapons: WeaponsRecord;
  patches: PatchInventoryRecord[];
  equippedPatches: EquippedPatchRecord[];
  settings: SettingsRecord;
};
```

## バージョン管理とマイグレーション

### 基本方針

- **DB バージョン** は `DB_VERSION` 定数で管理。スキーマ変更時に整数で +1
- IndexedDB の `onupgradeneeded` で旧 → 新の差分マイグレーションを実行

### マイグレーション実装

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
  },
  // 2: (db, tx) => { ... 将来のマイグレーション ... },
};

export function runMigrations(
  db: IDBDatabase,
  tx: IDBTransaction,
  oldVersion: number,
  newVersion: number
) {
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
- マイグレーション失敗時は **エラーログを出してデータをそのまま残す**（ロールバックしない、新規プレイのみ可能にする）

## エクスポート / インポート

ユーザー向けに **JSON でのバックアップ機能** を提供する。

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
- 旧 `dbVersion` の JSON を入れたときは `runMigrations` 相当を走らせて最新スキーマに変換

## リセット機能

- 設定画面に **「永続データ全消去」** ボタンを置く
- 押下時に **2 段階確認ダイアログ**
- 実行内容: IndexedDB を `deleteDatabase` → 初期化処理を再実行
- **自動エクスポートは提示しない**（データ引き継ぎ機能は別途、消去は確認の上で実行）

## 書き込み戦略

### ライフサイクル

| タイミング | 書き込み内容 |
|---|---|
| 拠点での強化購入 | 即時書き込み（マシン / 武器 / パッチ装着） |
| ラン中の通貨獲得 | メモリ上のみで保持 |
| ラン中の敵撃破 | メモリ上のみ |
| ラン中のパッチドロップ | メモリ上のみ（インベントリ反映はラン終了時） |
| ラン終了時（成功 / 撤退 / 全滅） | `currencies` / `patches` / `profile` を書き戻し |
| visibilitychange (hidden) | 強制 flush |
| beforeunload | 強制 flush（IndexedDB は async なので保証なし、ベストエフォート） |

> ラン中の途中ブラウザクラッシュ時は、その時点までに獲得した報酬は **失われる**（runSnapshot を持たないため）。

### 書き込み単位

- レコード単位で put（差分書き込み）
- 1 トランザクションに複数ストアを含む場合は readwrite で開く

## セキュリティ / プライバシー

- **暗号化なし**（個人開発・サーバなし PWA、改ざんは自己責任）
- **改ざん検知なし**（チェックサム埋め込み等は v1 でやらない）
- ブラウザのプライベートモードでは IndexedDB が揮発する旨を UI に注意書き

## 未確定事項（TBD）

- 設定項目の追加候補（バイブ強度、アクセシビリティオプション、振動の細分など）
- インポート時のスキーマ違いに対するユーザー通知の文言
- Zustand ストアの構造（メモリ表現と IndexedDB 表現の橋渡し）
- IndexedDB クライアントライブラリの選定（idb / dexie / 自前 wrapper）
