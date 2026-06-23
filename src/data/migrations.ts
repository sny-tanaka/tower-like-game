import { STORES } from '@/data/schema';

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
