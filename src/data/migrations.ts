import { STORES } from '@/data/schema';

/**
 * Migration コールバック。
 *
 * 設計判断 (Issue #82): **migration は同期実装に統一する** ことを推奨する。
 *
 * 理由: `idb` ライブラリの `upgrade` コールバックは Promise を返しても **await されない** 仕様。
 * そのため `async migration` を書いても呼び出し元 (db.ts:openDatabase) はその完了を待たず、
 * upgrade transaction の oncomplete が先に発火する可能性がある。
 *
 * 戻り値型に `Promise<void>` を残しているのは互換のためのみ。 既存 v2 は IndexedDB の
 * event queue に依存して同期チェイン (req.onsuccess → store.put) で完了するため実害なし。
 *
 * 新規 migration を追加する際は `(db, tx) => void` シグネチャで書くこと。
 * 真に非同期処理が必要になった場合は idb 制約を回避する別アーキテクチャ
 * (例: openDB の `blocked` / `terminated` / `blocking` を活用、 別の seed ステップで処理)
 * を検討する。
 */
type Migration = (db: IDBDatabase, tx: IDBTransaction) => void | Promise<void>;

export const migrations: Record<number, Migration> = {
  1: (db) => {
    db.createObjectStore(STORES.profile, { keyPath: 'id' });
    db.createObjectStore(STORES.currencies, { keyPath: 'id' });
    db.createObjectStore(STORES.machine, { keyPath: 'key' });
    db.createObjectStore(STORES.weapons, { keyPath: 'id' });
    const patches = db.createObjectStore(STORES.patches, {
      keyPath: ['name', 'tier'],
    });
    patches.createIndex('byName', 'name', { unique: false });
    db.createObjectStore(STORES.equippedPatches, { keyPath: 'slotIndex' });
    db.createObjectStore(STORES.settings, { keyPath: 'id' });
  },
  2: async (_db, tx) => {
    const store = tx.objectStore(STORES.settings);
    await new Promise<void>((resolve, reject) => {
      const req = store.get('singleton');
      req.onsuccess = () => {
        const record = req.result;
        if (record && record.muted === undefined) {
          record.muted = false;
          const putReq = store.put(record);
          putReq.onsuccess = () => resolve();
          putReq.onerror = () => reject(putReq.error);
        } else {
          resolve();
        }
      };
      req.onerror = () => reject(req.error);
    });
  },
};

export function runMigrations(
  db: IDBDatabase,
  tx: IDBTransaction,
  oldVersion: number,
  newVersion: number
): void {
  for (let v = oldVersion + 1; v <= newVersion; v++) {
    const migration = migrations[v];
    if (!migration) throw new Error(`No migration registered for version ${v}`);
    migration(db, tx);
  }
}
