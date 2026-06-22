// @vitest-environment node
import 'fake-indexeddb/auto';

import { IDBFactory } from 'fake-indexeddb';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { resetDbInstance, openDatabase } from '@/data/db';
import { loadSaveState } from '@/data/repository';
import { MACHINE_UPGRADE_KEYS, STORES } from '@/data/schema';

// テストごとに IDBFactory をリセットして独立した DB 環境を作る
beforeEach(() => {
  globalThis.indexedDB = new IDBFactory();
  resetDbInstance();
});

afterEach(() => {
  resetDbInstance();
});

describe('openDatabase', () => {
  it('DB が正常に開ける', async () => {
    const db = await openDatabase();
    expect(db).toBeDefined();
    db.close();
  });

  it('初回 open で profile singleton が投入される', async () => {
    const db = await openDatabase();
    const profile = await db.get(STORES.profile, 'singleton');
    expect(profile).toBeDefined();
    expect(profile?.id).toBe('singleton');
    expect(profile?.highestTier).toBe(0);
    db.close();
  });

  it('初回 open で currencies singleton が投入される', async () => {
    const db = await openDatabase();
    const currencies = await db.get(STORES.currencies, 'singleton');
    expect(currencies).toBeDefined();
    expect(currencies?.bolt).toEqual([]);
    expect(currencies?.alloy).toEqual([]);
    db.close();
  });

  it('初回 open で 16 件のマシンレコードが投入される（全て lv=0）', async () => {
    const db = await openDatabase();
    const all = await db.getAll(STORES.machine);
    expect(all).toHaveLength(16);
    for (const record of all) {
      expect(record.lv).toBe(0);
    }
    db.close();
  });

  it('マシンレコードのキーが MACHINE_UPGRADE_KEYS と一致する', async () => {
    const db = await openDatabase();
    const all = await db.getAll(STORES.machine);
    const keys = all.map((r: { key: string }) => r.key).sort();
    expect(keys).toEqual([...MACHINE_UPGRADE_KEYS].sort());
    db.close();
  });

  it('初回 open で weapons singleton が投入される', async () => {
    const db = await openDatabase();
    const weapons = await db.get(STORES.weapons, 'singleton');
    expect(weapons).toBeDefined();
    expect(weapons?.weaponLv).toBe(0);
    expect(weapons?.initialWeapon).toBe('laser');
    db.close();
  });

  it('初回 open で settings singleton が投入される', async () => {
    const db = await openDatabase();
    const settings = await db.get(STORES.settings, 'singleton');
    expect(settings).toBeDefined();
    expect(settings?.defaultGameSpeed).toBe(1);
    db.close();
  });

  it('2 回 openDatabase() を呼んでも同一インスタンスを返す', async () => {
    const db1 = await openDatabase();
    const db2 = await openDatabase();
    expect(db1).toBe(db2);
    db1.close();
  });

  it('再 open 後に loadSaveState が成功する', async () => {
    const db = await openDatabase();
    const state = await loadSaveState(db);
    expect(state.profile).toBeDefined();
    expect(state.currencies).toBeDefined();
    expect(state.machine).toHaveLength(16);
    expect(state.weapons).toBeDefined();
    expect(state.settings).toBeDefined();
    db.close();
  });
});
