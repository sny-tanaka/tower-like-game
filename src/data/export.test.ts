// @vitest-environment node
import 'fake-indexeddb/auto';

import { IDBFactory } from 'fake-indexeddb';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { resetDbInstance, openDatabase } from '@/data/db';
import type { IDBPDatabase } from '@/data/db';
import { exportSave, importSave, listBackups } from '@/data/export';
import { putMachine, putPatch } from '@/data/repository';

// Node 環境では localStorage が存在しないため簡易ポリフィルを用意
const localStorageMock = (() => {
  const store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    clear: () => {
      Object.keys(store).forEach((k) => delete store[k]);
    },
    removeItem: (key: string) => {
      delete store[key];
    },
  };
})();

// @ts-expect-error -- Node 環境で localStorage をポリフィル
globalThis.localStorage = localStorageMock;

let db: IDBPDatabase;

beforeEach(async () => {
  globalThis.indexedDB = new IDBFactory();
  localStorageMock.clear();
  resetDbInstance();
  db = await openDatabase();
});

afterEach(() => {
  db.close();
  resetDbInstance();
});

describe('exportSave', () => {
  it('ExportFile が正しい構造を持つ', async () => {
    const file = await exportSave(db);
    expect(file.formatVersion).toBe(1);
    expect(file.dbVersion).toBe(2);
    expect(typeof file.exportedAt).toBe('number');
    expect(file.data).toBeDefined();
  });

  it('data.machine が 16 件を含む', async () => {
    const file = await exportSave(db);
    expect(file.data.machine).toHaveLength(16);
  });

  it('put されたデータがエクスポートに反映される', async () => {
    await putMachine(db, { key: 'range', lv: 9 });
    const file = await exportSave(db);
    const range = file.data.machine.find((r) => r.key === 'range');
    expect(range?.lv).toBe(9);
  });
});

describe('importSave', () => {
  it('exportSave → importSave ラウンドトリップ', async () => {
    // データを変更してエクスポート
    await putMachine(db, { key: 'critRate', lv: 4 });
    await putPatch(db, { name: 'boltCast', tier: 2, count: 3 });
    const exported = await exportSave(db);

    // DB をリセットして新規 DB にインポート
    db.close();
    globalThis.indexedDB = new IDBFactory();
    resetDbInstance();
    db = await openDatabase();

    await importSave(db, exported);

    const reimported = await exportSave(db);
    const critRate = reimported.data.machine.find((r) => r.key === 'critRate');
    expect(critRate?.lv).toBe(4);
    expect(reimported.data.patches).toHaveLength(1);
    expect(reimported.data.patches[0].name).toBe('boltCast');
    expect(reimported.data.patches[0].count).toBe(3);
  });

  it('formatVersion が 1 以外のとき TypeError を投げる', async () => {
    const file = await exportSave(db);
    const invalid = { ...file, formatVersion: 2 } as unknown as Parameters<typeof importSave>[1];
    await expect(importSave(db, invalid)).rejects.toThrow('Unsupported formatVersion: 2');
  });

  it('インポート前に自動バックアップが作成される', async () => {
    const file = await exportSave(db);
    await importSave(db, file);
    const backups = listBackups();
    expect(backups).toHaveLength(1);
    expect(backups[0].data.formatVersion).toBe(1);
  });

  it('インポートを複数回繰り返してもバックアップは最大 3 世代', async () => {
    for (let i = 0; i < 5; i++) {
      const file = await exportSave(db);
      await importSave(db, file);
    }
    const backups = listBackups();
    expect(backups.length).toBeLessThanOrEqual(3);
  });
});

describe('listBackups', () => {
  it('初期状態では空配列', () => {
    expect(listBackups()).toHaveLength(0);
  });
});
