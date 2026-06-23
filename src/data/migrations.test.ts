// @vitest-environment node
import 'fake-indexeddb/auto';

import { IDBFactory } from 'fake-indexeddb';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { resetDbInstance, openDatabase } from '@/data/db';
import { runMigrations } from '@/data/migrations';
import { STORES } from '@/data/schema';

beforeEach(() => {
  globalThis.indexedDB = new IDBFactory();
  resetDbInstance();
});

afterEach(() => {
  resetDbInstance();
});

describe('runMigrations', () => {
  it('未登録バージョン（v2）が範囲に含まれるときエラーを投げる', () => {
    // v1 → v2 を要求: v2 は未登録
    const fakeDb = {} as IDBDatabase;
    const fakeTx = {} as IDBTransaction;
    expect(() => runMigrations(fakeDb, fakeTx, 1, 2)).toThrow(
      'No migration registered for version 2'
    );
  });

  it('oldVersion === newVersion のとき何もしない（範囲空）', () => {
    const fakeDb = {} as IDBDatabase;
    const fakeTx = {} as IDBTransaction;
    // v1 → v1 はループが回らないためエラーにならない
    expect(() => runMigrations(fakeDb, fakeTx, 1, 1)).not.toThrow();
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
