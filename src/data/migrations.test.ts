// @vitest-environment node
import 'fake-indexeddb/auto';

import { IDBFactory } from 'fake-indexeddb';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { resetDbInstance, openDatabase } from '@/data/db';
import { migrations, runMigrations } from '@/data/migrations';
import { STORES } from '@/data/schema';

beforeEach(() => {
  globalThis.indexedDB = new IDBFactory();
  resetDbInstance();
});

afterEach(() => {
  resetDbInstance();
});

describe('runMigrations', () => {
  it('未登録バージョン（v3）が範囲に含まれるときエラーを投げる', () => {
    // v2 → v3 を要求: v3 は未登録
    const fakeDb = {} as IDBDatabase;
    const fakeTx = {} as IDBTransaction;
    expect(() => runMigrations(fakeDb, fakeTx, 2, 3)).toThrow(
      'No migration registered for version 3'
    );
  });

  it('oldVersion === newVersion のとき何もしない（範囲空）', () => {
    const fakeDb = {} as IDBDatabase;
    const fakeTx = {} as IDBTransaction;
    // v2 → v2 はループが回らないためエラーにならない
    expect(() => runMigrations(fakeDb, fakeTx, 2, 2)).not.toThrow();
  });
});

describe('v2 マイグレーション (settings.muted フィールド追加)', () => {
  it('openDatabase() で settings レコードに muted=false が入る', async () => {
    const db = await openDatabase();
    const tx = db.transaction(STORES.settings, 'readonly');
    const record = await tx.store.get('singleton');
    expect(record).toBeDefined();
    expect(record.muted).toBe(false);
    db.close();
  });

  it('migrations[2]: settings レコードが存在しない場合も throw せず resolve する', async () => {
    // fake-indexeddb で settings ストアだけを手動で作り、レコードなしで migration[2] を呼ぶ
    const db = await new Promise<IDBDatabase>((resolve, reject) => {
      const req = globalThis.indexedDB.open('test-v2-empty', 1);
      req.onupgradeneeded = () => {
        req.result.createObjectStore(STORES.settings, { keyPath: 'id' });
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });

    const tx = db.transaction(STORES.settings, 'readwrite');
    await expect(migrations[2](db, tx as unknown as IDBTransaction)).resolves.toBeUndefined();
    db.close();
  });

  it('migrations[2]: settings レコードに muted フィールドが既にある場合は上書きしない (muted=true が保持される)', async () => {
    // fake-indexeddb でストアを作成し、muted=true の既存レコードを挿入してから migration[2] を呼ぶ
    const db = await new Promise<IDBDatabase>((resolve, reject) => {
      const req = globalThis.indexedDB.open('test-v2-existing', 1);
      req.onupgradeneeded = () => {
        req.result.createObjectStore(STORES.settings, { keyPath: 'id' });
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });

    // muted=true のレコードを先に入れておく
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORES.settings, 'readwrite');
      const req = tx
        .objectStore(STORES.settings)
        .put({
          id: 'singleton',
          bgmVolume: 0.5,
          seVolume: 0.5,
          vibrationEnabled: true,
          muted: true,
        });
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });

    // migration[2] を実行
    const tx = db.transaction(STORES.settings, 'readwrite');
    await migrations[2](db, tx as unknown as IDBTransaction);

    // muted=true が保持されていることを確認
    const result = await new Promise<{ muted: boolean } | undefined>((resolve, reject) => {
      const rtx = db.transaction(STORES.settings, 'readonly');
      const req = rtx.objectStore(STORES.settings).get('singleton');
      req.onsuccess = () => resolve(req.result as { muted: boolean } | undefined);
      req.onerror = () => reject(req.error);
    });

    expect(result?.muted).toBe(true);
    db.close();
  });
});

describe('v1 マイグレーション（openDatabase 経由）', () => {
  it('7 つのオブジェクトストアが作成される', async () => {
    const db = await openDatabase();
    const storeNames = Array.from(db.objectStoreNames).sort();
    const expected = Object.values(STORES).sort();
    expect(storeNames).toEqual(expected);
    db.close();
  });

  it('patches ストアに byName インデックスが存在する', async () => {
    const db = await openDatabase();
    const tx = db.transaction(STORES.patches, 'readonly');
    const store = tx.store;
    expect(store.indexNames).toContain('byName');
    db.close();
  });

  it('patches の主キーパスが [name, tier] の複合キー', async () => {
    const db = await openDatabase();
    const tx = db.transaction(STORES.patches, 'readonly');
    expect(tx.store.keyPath).toEqual(['name', 'tier']);
    db.close();
  });

  it('profile のキーパスが id', async () => {
    const db = await openDatabase();
    const tx = db.transaction(STORES.profile, 'readonly');
    expect(tx.store.keyPath).toBe('id');
    db.close();
  });

  it('machine のキーパスが key', async () => {
    const db = await openDatabase();
    const tx = db.transaction(STORES.machine, 'readonly');
    expect(tx.store.keyPath).toBe('key');
    db.close();
  });

  it('equippedPatches のキーパスが slotIndex', async () => {
    const db = await openDatabase();
    const tx = db.transaction(STORES.equippedPatches, 'readonly');
    expect(tx.store.keyPath).toBe('slotIndex');
    db.close();
  });
});
