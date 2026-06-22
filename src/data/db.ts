import { type IDBPDatabase, openDB } from 'idb';

import { runMigrations } from '@/data/migrations';
import {
  DB_NAME,
  DB_VERSION,
  DEFAULT_CURRENCIES,
  DEFAULT_PROFILE,
  DEFAULT_SETTINGS,
  DEFAULT_WEAPONS,
  MACHINE_UPGRADE_KEYS,
  STORES,
} from '@/data/schema';

export type { IDBPDatabase };

let dbInstance: IDBPDatabase | null = null;

/**
 * IndexedDB を開き、必要に応じてマイグレーションと初期データ投入を行う。
 * 2回目以降は同一インスタンスを返す（シングルトン）。
 */
export async function openDatabase(): Promise<IDBPDatabase> {
  if (dbInstance) return dbInstance;

  dbInstance = await openDB(DB_NAME, DB_VERSION, {
    upgrade(db, oldVersion, newVersion, tx) {
      try {
        runMigrations(
          db as unknown as IDBDatabase,
          tx as unknown as IDBTransaction,
          oldVersion,
          newVersion ?? DB_VERSION
        );
      } catch (err) {
        console.error('[DB] Migration failed:', err);
        throw err;
      }
    },
  });

  await seedInitialData(dbInstance);

  return dbInstance;
}

/**
 * 初回 open 時（各 singleton が存在しない場合）に初期データを投入する。
 * 冪等（既存データは上書きしない）。
 */
async function seedInitialData(db: IDBPDatabase): Promise<void> {
  const tx = db.transaction(
    [STORES.profile, STORES.currencies, STORES.machine, STORES.weapons, STORES.settings],
    'readwrite'
  );

  const [existingProfile, existingCurrencies, existingWeapons, existingSettings] =
    await Promise.all([
      tx.objectStore(STORES.profile).get('singleton'),
      tx.objectStore(STORES.currencies).get('singleton'),
      tx.objectStore(STORES.weapons).get('singleton'),
      tx.objectStore(STORES.settings).get('singleton'),
    ]);

  const now = Date.now();
  const ops: Promise<unknown>[] = [];

  if (!existingProfile) {
    ops.push(
      tx.objectStore(STORES.profile).put({
        ...DEFAULT_PROFILE,
        createdAt: now,
        lastPlayedAt: now,
      })
    );
  }

  if (!existingCurrencies) {
    ops.push(tx.objectStore(STORES.currencies).put(DEFAULT_CURRENCIES));
  }

  if (!existingWeapons) {
    ops.push(tx.objectStore(STORES.weapons).put(DEFAULT_WEAPONS));
  }

  if (!existingSettings) {
    ops.push(tx.objectStore(STORES.settings).put(DEFAULT_SETTINGS));
  }

  // 16 マシン項目を lv=0 で初期投入（未存在のもののみ）
  const machineStore = tx.objectStore(STORES.machine);
  const existingKeys = await machineStore.getAllKeys();
  const existingKeySet = new Set(existingKeys as string[]);

  for (const key of MACHINE_UPGRADE_KEYS) {
    if (!existingKeySet.has(key)) {
      ops.push(machineStore.put({ key, lv: 0 }));
    }
  }

  await Promise.all(ops);
  await tx.done;
}

/**
 * テスト等でシングルトンをリセットするためのユーティリティ。
 * プロダクションコードでは使用しないこと。
 */
export function resetDbInstance(): void {
  dbInstance = null;
}
