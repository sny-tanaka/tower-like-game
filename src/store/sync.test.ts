// @vitest-environment node
import 'fake-indexeddb/auto';

import { IDBFactory } from 'fake-indexeddb';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { openDatabase, resetDbInstance } from '@/data/db';
import { BigNum } from '@/lib/bignum';
import { useStore } from '@/store/index';
import {
  flushAfterRun,
  hydrateStore,
  syncCurrencies,
  syncEquippedPatches,
  syncMachine,
  syncPatches,
  syncSettings,
  syncWeapons,
} from '@/store/sync';

// ---------------------------------------------------------------------------
// Setup: テストごとに IndexedDB と store を完全リセット
// ---------------------------------------------------------------------------

beforeEach(async () => {
  // fake-indexeddb を新しいインスタンスに差し替えてクリーン状態を保証
  globalThis.indexedDB = new IDBFactory();
  resetDbInstance();

  // store もリセット
  useStore.setState({
    highestTier: 0,
    highestWave: 0,
    totalPlayTimeSec: 0,
    totalRuns: 0,
    totalEnemiesKilled: 0,
    createdAt: 0,
    lastPlayedAt: 0,
    bolt: BigNum.ZERO,
    alloy: BigNum.ZERO,
    machineLevels: {
      maxHp: 0,
      hpRegen: 0,
      damageReduction: 0,
      defense: 0,
      baseAttack: 0,
      attackSpeed: 0,
      range: 0,
      critRate: 0,
      critMultiplier: 0,
      activePower: 0,
      activeCdReduction: 0,
      screwGain: 0,
      boltGain: 0,
      alloyGain: 0,
      patchDropRate: 0,
      patchSlots: 0,
    },
    weaponLv: 0,
    initialWeapon: 'laser',
    patches: new Map(),
    equippedPatches: new Map(),
    bgmVolume: 0.8,
    seVolume: 0.8,
    muted: false,
    targetFps: 60,
  });

  // DB を開いてシードデータを投入
  await openDatabase();
});

afterEach(() => {
  resetDbInstance();
});

// ---------------------------------------------------------------------------
// syncCurrencies + hydrateStore の round-trip
// ---------------------------------------------------------------------------

describe('sync: currencies round-trip', () => {
  it('bolt / alloy を書いて読み直すと同じ値になる', async () => {
    const store = useStore.getState();
    store.addBolt(BigNum.fromNumber(12345));
    store.addAlloy(BigNum.fromNumber(6789));

    await syncCurrencies();

    // store をリセットして再 hydrate
    useStore.setState({ bolt: BigNum.ZERO, alloy: BigNum.ZERO });
    await hydrateStore();

    expect(useStore.getState().bolt.toString()).toBe('12345');
    expect(useStore.getState().alloy.toString()).toBe('6789');
  });
});

// ---------------------------------------------------------------------------
// syncMachine + hydrateStore の round-trip
// ---------------------------------------------------------------------------

describe('sync: machine round-trip', () => {
  it('machineLv を書いて読み直すと同じ値になる', async () => {
    useStore.getState().incrementMachineLv('maxHp');
    useStore.getState().incrementMachineLv('maxHp');
    useStore.getState().setMachineLv('defense', 5);

    await syncMachine();

    useStore.setState({
      machineLevels: {
        maxHp: 0,
        hpRegen: 0,
        damageReduction: 0,
        defense: 0,
        baseAttack: 0,
        attackSpeed: 0,
        range: 0,
        critRate: 0,
        critMultiplier: 0,
        activePower: 0,
        activeCdReduction: 0,
        screwGain: 0,
        boltGain: 0,
        alloyGain: 0,
        patchDropRate: 0,
        patchSlots: 0,
      },
    });
    await hydrateStore();

    expect(useStore.getState().machineLevels.maxHp).toBe(2);
    expect(useStore.getState().machineLevels.defense).toBe(5);
    expect(useStore.getState().machineLevels.critRate).toBe(0);
  });
});

// ---------------------------------------------------------------------------
// syncWeapons + hydrateStore の round-trip
// ---------------------------------------------------------------------------

describe('sync: weapons round-trip', () => {
  it('weaponLv と initialWeapon を書いて読み直すと同じ値になる', async () => {
    useStore.getState().setWeaponLv(7);
    useStore.getState().setInitialWeapon('cutter');

    await syncWeapons();

    useStore.setState({ weaponLv: 0, initialWeapon: 'laser' });
    await hydrateStore();

    expect(useStore.getState().weaponLv).toBe(7);
    expect(useStore.getState().initialWeapon).toBe('cutter');
  });
});

// ---------------------------------------------------------------------------
// syncSettings + hydrateStore の round-trip
// ---------------------------------------------------------------------------

describe('sync: settings round-trip', () => {
  it('settings を書いて読み直すと同じ値になる', async () => {
    useStore.getState().setBgmVolume(0.5);
    useStore.getState().setSeVolume(0.3);

    await syncSettings();

    useStore.setState({ bgmVolume: 0.8, seVolume: 0.8 });
    await hydrateStore();

    expect(useStore.getState().bgmVolume).toBe(0.5);
    expect(useStore.getState().seVolume).toBe(0.3);
  });

  it('settings の muted を書いて読み直すと同じ値になる', async () => {
    useStore.getState().setMuted(true);

    await syncSettings();

    useStore.setState({ muted: false });
    await hydrateStore();

    expect(useStore.getState().muted).toBe(true);
  });

  it('settings の muted=false を書いて読み直すと false が保持される', async () => {
    // 一度 true にして sync してから false に戻して再 sync → hydrate で false になることを確認
    useStore.getState().setMuted(true);
    await syncSettings();

    useStore.getState().setMuted(false);
    await syncSettings();

    useStore.setState({ muted: true }); // store を true に戻してから hydrate
    await hydrateStore();

    expect(useStore.getState().muted).toBe(false);
  });

  it('settings の targetFps を書いて読み直すと同じ値になる', async () => {
    useStore.getState().setTargetFps(30);
    await syncSettings();

    useStore.setState({ targetFps: 60 });
    await hydrateStore();

    expect(useStore.getState().targetFps).toBe(30);
  });

  // ---- v1.4.4: AUTO 状態のセッション跨ぎ永続化 ----

  it('settings の isAutoActive を書いて読み直すと同じ値になる', async () => {
    useStore.getState().setAutoActive(true);
    await syncSettings();

    useStore.setState({ isAutoActive: false });
    await hydrateStore();

    expect(useStore.getState().isAutoActive).toBe(true);
  });

  it('settings の runWorkshopAutoEnabled を書いて読み直すと同じ値になる', async () => {
    useStore.getState().setRunWorkshopAuto('attackMul', true);
    useStore.getState().setRunWorkshopAuto('hpMul', true);
    await syncSettings();

    useStore.setState({
      runWorkshopAutoEnabled: {
        attackMul: false,
        attackSpeedMul: false,
        hpMul: false,
        screwGainMul: false,
      },
    });
    await hydrateStore();

    expect(useStore.getState().runWorkshopAutoEnabled).toEqual({
      attackMul: true,
      attackSpeedMul: false,
      hpMul: true,
      screwGainMul: false,
    });
  });
});

// ---------------------------------------------------------------------------
// syncPatches + hydrateStore の round-trip
// ---------------------------------------------------------------------------

describe('sync: patches round-trip', () => {
  it('addPatch / consumePatch 後の在庫が hydrate 後も一致する', async () => {
    const store = useStore.getState();
    store.addPatch('boltCast', 1, 4);
    store.addPatch('instantKill', 2, 1);

    await syncPatches();

    useStore.setState({ patches: new Map() });
    await hydrateStore();

    const patches = useStore.getState().patches;
    expect(patches.get('boltCast#1')?.count).toBe(4);
    expect(patches.get('instantKill#2')?.count).toBe(1);
    expect(patches.size).toBe(2);
  });

  it('consumePatch で消えたエントリは hydrate 後も復活しない (合成バグ回帰)', async () => {
    // boltCast#1 × 4 を put して IDB に書き込む
    const store = useStore.getState();
    store.addPatch('boltCast', 1, 4);
    await syncPatches();

    // 合成で boltCast#1 をすべて消費し、 boltCast#3 を 1 個追加 (合成結果を模擬)
    expect(store.consumePatch('boltCast', 1, 4)).toBe(true);
    store.addPatch('boltCast', 3, 1);
    await syncPatches();

    // IDB から読み直したとき、 boltCast#1 が復活していないこと
    useStore.setState({ patches: new Map() });
    await hydrateStore();

    const patches = useStore.getState().patches;
    expect(patches.has('boltCast#1')).toBe(false);
    expect(patches.get('boltCast#3')?.count).toBe(1);
    expect(patches.size).toBe(1);
  });
});

// ---------------------------------------------------------------------------
// syncEquippedPatches + hydrateStore の round-trip
// ---------------------------------------------------------------------------

describe('sync: equippedPatches round-trip', () => {
  it('unequip 後のスロット空きが hydrate 後も維持される', async () => {
    const store = useStore.getState();
    store.addPatch('boltCast', 1, 1);
    store.addPatch('instantKill', 1, 1);
    expect(store.equipPatch(0, 'boltCast', 1)).toBe(true);
    expect(store.equipPatch(1, 'instantKill', 1)).toBe(true);
    await syncEquippedPatches();

    // スロット 0 を外す
    store.unequipPatch(0);
    await syncEquippedPatches();

    useStore.setState({ equippedPatches: new Map() });
    await hydrateStore();

    const equipped = useStore.getState().equippedPatches;
    expect(equipped.has(0)).toBe(false);
    expect(equipped.get(1)?.name).toBe('instantKill');
    expect(equipped.size).toBe(1);
  });
});

// ---------------------------------------------------------------------------
// flushAfterRun + hydrateStore の round-trip
// ---------------------------------------------------------------------------

describe('sync: flushAfterRun round-trip', () => {
  it('currencies と profile が一括書き戻しされる', async () => {
    const store = useStore.getState();
    store.addBolt(BigNum.fromNumber(9999));
    store.addEnemiesKilled(50);
    store.incrementRuns();

    await flushAfterRun();

    // store をリセットして hydrate
    useStore.setState({
      bolt: BigNum.ZERO,
      totalEnemiesKilled: 0,
      totalRuns: 0,
    });
    await hydrateStore();

    expect(useStore.getState().bolt.toString()).toBe('9999');
    expect(useStore.getState().totalEnemiesKilled).toBe(50);
    expect(useStore.getState().totalRuns).toBe(1);
  });
});
