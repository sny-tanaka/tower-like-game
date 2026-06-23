import type { IDBPDatabase } from 'idb';

import { loadSaveState } from '@/data/repository';
import type { SaveState } from '@/data/schema';
import { DB_VERSION, STORES } from '@/data/schema';

// --- ExportFile 型 ---

export type ExportFile = {
  formatVersion: 1;
  dbVersion: number;
  exportedAt: number; // unix ms
  data: SaveState;
};

const BACKUP_STORAGE_KEY = 'tower-like-game:import-backups';
const MAX_BACKUPS = 3;

// --- バックアップ管理 ---

type BackupEntry = {
  savedAt: number;
  data: ExportFile;
};

function loadBackups(): BackupEntry[] {
  try {
    const raw = localStorage.getItem(BACKUP_STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as BackupEntry[];
  } catch {
    return [];
  }
}

function saveBackups(backups: BackupEntry[]): void {
  try {
    localStorage.setItem(BACKUP_STORAGE_KEY, JSON.stringify(backups));
  } catch (err) {
    console.warn('[DB] Failed to save backup to localStorage:', err);
  }
}

function pushBackup(exportFile: ExportFile): void {
  const backups = loadBackups();
  backups.unshift({ savedAt: Date.now(), data: exportFile });
  // 最大 MAX_BACKUPS 世代まで保持
  const trimmed = backups.slice(0, MAX_BACKUPS);
  saveBackups(trimmed);
}

// --- エクスポート ---

export async function exportSave(db: IDBPDatabase): Promise<ExportFile> {
  const state = await loadSaveState(db);
  return {
    formatVersion: 1,
    dbVersion: DB_VERSION,
    exportedAt: Date.now(),
    data: state,
  };
}

// --- インポート ---

/**
 * ExportFile をバリデーションして全ストアを置換する。
 * インポート前に現在のデータを localStorage に自動バックアップする（最大 3 世代）。
 */
export async function importSave(db: IDBPDatabase, file: ExportFile): Promise<void> {
  if (file.formatVersion !== 1) {
    throw new Error(`Unsupported formatVersion: ${file.formatVersion}`);
  }

  // インポート前に現在のデータをバックアップ
  try {
    const current = await exportSave(db);
    pushBackup(current);
  } catch (err) {
    console.warn('[DB] Pre-import backup failed (proceeding anyway):', err);
  }

  const { data } = file;

  // 全ストアを 1 トランザクションで置換
  const tx = db.transaction(
    [
      STORES.profile,
      STORES.currencies,
      STORES.machine,
      STORES.weapons,
      STORES.patches,
      STORES.equippedPatches,
      STORES.settings,
    ],
    'readwrite'
  );

  // 各ストアをクリアしてから put
  await Promise.all([
    tx.objectStore(STORES.profile).clear(),
    tx.objectStore(STORES.currencies).clear(),
    tx.objectStore(STORES.machine).clear(),
    tx.objectStore(STORES.weapons).clear(),
    tx.objectStore(STORES.patches).clear(),
    tx.objectStore(STORES.equippedPatches).clear(),
    tx.objectStore(STORES.settings).clear(),
  ]);

  const putOps: Promise<unknown>[] = [
    tx.objectStore(STORES.profile).put(data.profile),
    tx.objectStore(STORES.currencies).put(data.currencies),
    tx.objectStore(STORES.weapons).put(data.weapons),
    tx.objectStore(STORES.settings).put(data.settings),
    ...data.machine.map((r) => tx.objectStore(STORES.machine).put(r)),
    ...data.patches.map((r) => tx.objectStore(STORES.patches).put(r)),
    ...data.equippedPatches.map((r) => tx.objectStore(STORES.equippedPatches).put(r)),
  ];

  await Promise.all(putOps);
  await tx.done;
}

/**
 * テスト / デバッグ用: localStorage に保存済みのバックアップ一覧を取得する。
 */
export function listBackups(): BackupEntry[] {
  return loadBackups();
}
