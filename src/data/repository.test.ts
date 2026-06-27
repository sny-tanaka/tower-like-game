// @vitest-environment node
import 'fake-indexeddb/auto';

import { IDBFactory } from 'fake-indexeddb';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { resetDbInstance, openDatabase } from '@/data/db';
import type { IDBPDatabase } from '@/data/db';
import {
  deleteEquippedPatch,
  deletePatch,
  getAllEquippedPatches,
  getAllMachine,
  getAllPatches,
  getCurrencies,
  getEquippedPatch,
  getMachine,
  getPatch,
  getPatchesByName,
  getProfile,
  getSettings,
  getWeapons,
  loadSaveState,
  putCurrencies,
  putEquippedPatch,
  putMachine,
  putPatch,
  putProfile,
  putSettings,
  putWeapons,
} from '@/data/repository';

let db: IDBPDatabase;

beforeEach(async () => {
  globalThis.indexedDB = new IDBFactory();
  resetDbInstance();
  db = await openDatabase();
});

afterEach(() => {
  db.close();
  resetDbInstance();
});

describe('profile リポジトリ', () => {
  it('getProfile: singleton を取得できる', async () => {
    const profile = await getProfile(db);
    expect(profile?.id).toBe('singleton');
  });

  it('putProfile → getProfile ラウンドトリップ', async () => {
    const profile = await getProfile(db);
    expect(profile).toBeDefined();
    const updated = { ...profile!, highestTier: 5, totalRuns: 10 };
    await putProfile(db, updated);
    const result = await getProfile(db);
    expect(result?.highestTier).toBe(5);
    expect(result?.totalRuns).toBe(10);
  });
});

describe('currencies リポジトリ', () => {
  it('getCurrencies: singleton を取得できる', async () => {
    const c = await getCurrencies(db);
    expect(c?.id).toBe('singleton');
    expect(c?.bolt).toEqual([]);
  });

  it('putCurrencies → getCurrencies ラウンドトリップ', async () => {
    const updated = { id: 'singleton' as const, bolt: [100, 200], alloy: [50] };
    await putCurrencies(db, updated);
    const result = await getCurrencies(db);
    expect(result?.bolt).toEqual([100, 200]);
    expect(result?.alloy).toEqual([50]);
  });
});

describe('machine リポジトリ', () => {
  it('getAllMachine: 16 件取得できる', async () => {
    const all = await getAllMachine(db);
    expect(all).toHaveLength(16);
  });

  it('getMachine: 特定キーを取得できる', async () => {
    const record = await getMachine(db, 'maxHp');
    expect(record?.key).toBe('maxHp');
    expect(record?.lv).toBe(0);
  });

  it('putMachine → getMachine ラウンドトリップ', async () => {
    await putMachine(db, { key: 'maxHp', lv: 3 });
    const result = await getMachine(db, 'maxHp');
    expect(result?.lv).toBe(3);
  });
});

describe('weapons リポジトリ', () => {
  it('getWeapons: singleton を取得できる', async () => {
    const w = await getWeapons(db);
    expect(w?.id).toBe('singleton');
    expect(w?.weaponLv).toBe(0);
  });

  it('putWeapons → getWeapons ラウンドトリップ', async () => {
    const updated = {
      id: 'singleton' as const,
      weaponLv: 5,
      initialWeapon: 'cannon' as const,
    };
    await putWeapons(db, updated);
    const result = await getWeapons(db);
    expect(result?.weaponLv).toBe(5);
    expect(result?.initialWeapon).toBe('cannon');
  });
});

describe('patches リポジトリ', () => {
  it('初期状態では空', async () => {
    const all = await getAllPatches(db);
    expect(all).toHaveLength(0);
  });

  it('putPatch → getPatch ラウンドトリップ（複合キー [name, tier]）', async () => {
    await putPatch(db, { name: 'instantKill', tier: 1, count: 2 });
    const result = await getPatch(db, 'instantKill', 1);
    expect(result?.name).toBe('instantKill');
    expect(result?.tier).toBe(1);
    expect(result?.count).toBe(2);
  });

  it('複合キーが異なれば別レコードとして扱われる', async () => {
    await putPatch(db, { name: 'instantKill', tier: 1, count: 1 });
    await putPatch(db, { name: 'instantKill', tier: 2, count: 3 });
    const all = await getAllPatches(db);
    expect(all).toHaveLength(2);
  });

  it('deletePatch で特定レコードを削除できる', async () => {
    await putPatch(db, { name: 'instantKill', tier: 1, count: 2 });
    await deletePatch(db, 'instantKill', 1);
    const result = await getPatch(db, 'instantKill', 1);
    expect(result).toBeUndefined();
  });

  it('getPatchesByName: byName インデックスで同名パッチを全取得できる', async () => {
    await putPatch(db, { name: 'bossKiller', tier: 1, count: 1 });
    await putPatch(db, { name: 'bossKiller', tier: 2, count: 2 });
    await putPatch(db, { name: 'doubleShot', tier: 1, count: 1 });
    const results = await getPatchesByName(db, 'bossKiller');
    expect(results).toHaveLength(2);
    for (const r of results) {
      expect(r.name).toBe('bossKiller');
    }
  });
});

describe('equippedPatches リポジトリ', () => {
  it('初期状態では空', async () => {
    const all = await getAllEquippedPatches(db);
    expect(all).toHaveLength(0);
  });

  it('putEquippedPatch → getEquippedPatch ラウンドトリップ', async () => {
    await putEquippedPatch(db, { slotIndex: 0, name: 'freezeHit', tier: 1 });
    const result = await getEquippedPatch(db, 0);
    expect(result?.slotIndex).toBe(0);
    expect(result?.name).toBe('freezeHit');
  });

  it('deleteEquippedPatch でスロットを解除できる', async () => {
    await putEquippedPatch(db, { slotIndex: 1, name: 'burnHit', tier: 2 });
    await deleteEquippedPatch(db, 1);
    const result = await getEquippedPatch(db, 1);
    expect(result).toBeUndefined();
  });

  it('同名パッチを別スロットに装着しようとするとエラー', async () => {
    await putEquippedPatch(db, { slotIndex: 0, name: 'killHeal', tier: 1 });
    await expect(putEquippedPatch(db, { slotIndex: 1, name: 'killHeal', tier: 1 })).rejects.toThrow(
      'killHeal'
    );
  });

  it('同名でも Tier が違っても重複装着は禁止', async () => {
    await putEquippedPatch(db, { slotIndex: 0, name: 'killHeal', tier: 1 });
    await expect(putEquippedPatch(db, { slotIndex: 2, name: 'killHeal', tier: 2 })).rejects.toThrow(
      'killHeal'
    );
  });
});

describe('settings リポジトリ', () => {
  it('getSettings: singleton を取得できる', async () => {
    const s = await getSettings(db);
    expect(s?.id).toBe('singleton');
    expect(s?.bgmVolume).toBe(0.8);
  });

  it('putSettings → getSettings ラウンドトリップ', async () => {
    const updated = {
      id: 'singleton' as const,
      bgmVolume: 0.5,
      seVolume: 0.3,
      muted: true,
    };
    await putSettings(db, updated);
    const result = await getSettings(db);
    expect(result?.bgmVolume).toBe(0.5);
    expect(result?.seVolume).toBe(0.3);
    expect(result?.muted).toBe(true);
  });
});

describe('loadSaveState', () => {
  it('全ストアを 1 トランザクションで取得できる', async () => {
    const state = await loadSaveState(db);
    expect(state.profile).toBeDefined();
    expect(state.currencies).toBeDefined();
    expect(state.machine).toHaveLength(16);
    expect(state.weapons).toBeDefined();
    expect(state.patches).toHaveLength(0);
    expect(state.equippedPatches).toHaveLength(0);
    expect(state.settings).toBeDefined();
  });

  it('データ変更後に loadSaveState が最新値を返す', async () => {
    await putMachine(db, { key: 'defense', lv: 7 });
    const state = await loadSaveState(db);
    const defense = state.machine.find((r) => r.key === 'defense');
    expect(defense?.lv).toBe(7);
  });
});
