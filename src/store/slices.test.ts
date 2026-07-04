import { describe, expect, it } from 'vitest';
import { create } from 'zustand';

import { BigNum } from '@/lib/bignum';
import { createBattleSlice } from '@/store/slices/battle';
import type { BattleSlice } from '@/store/slices/battle';
import { createCurrenciesSlice } from '@/store/slices/currencies';
import type { CurrenciesSlice } from '@/store/slices/currencies';
import { createEquippedPatchesSlice } from '@/store/slices/equippedPatches';
import type { EquippedPatchesSlice } from '@/store/slices/equippedPatches';
import { createMachineSlice } from '@/store/slices/machine';
import type { MachineSlice } from '@/store/slices/machine';
import { createPatchesSlice } from '@/store/slices/patches';
import type { PatchesSlice } from '@/store/slices/patches';
import { createProfileSlice } from '@/store/slices/profile';
import type { ProfileSlice } from '@/store/slices/profile';
import { createRunWorkshopSlice } from '@/store/slices/runWorkshop';
import type { RunWorkshopSlice } from '@/store/slices/runWorkshop';
import { createSettingsSlice } from '@/store/slices/settings';
import type { SettingsSlice } from '@/store/slices/settings';
import { createWeaponsSlice } from '@/store/slices/weapons';
import type { WeaponsSlice } from '@/store/slices/weapons';

// ---------------------------------------------------------------------------
// Helper: per-test isolated store creation
// ---------------------------------------------------------------------------

type TestStore = ProfileSlice &
  CurrenciesSlice &
  MachineSlice &
  WeaponsSlice &
  PatchesSlice &
  EquippedPatchesSlice &
  SettingsSlice &
  BattleSlice &
  RunWorkshopSlice;

function makeStore() {
  return create<TestStore>()((...a) => ({
    ...createProfileSlice(...a),
    ...createCurrenciesSlice(...a),
    ...createMachineSlice(...a),
    ...createWeaponsSlice(...a),
    ...createPatchesSlice(...a),
    ...createEquippedPatchesSlice(...a),
    ...createSettingsSlice(...a),
    ...createBattleSlice(...a),
    ...createRunWorkshopSlice(...a),
  }));
}

// ---------------------------------------------------------------------------
// profile slice
// ---------------------------------------------------------------------------

describe('profile slice', () => {
  it('初期値はすべて 0', () => {
    const s = makeStore().getState();
    expect(s.highestTier).toBe(0);
    expect(s.highestWave).toBe(0);
    expect(s.totalPlayTimeSec).toBe(0);
    expect(s.totalRuns).toBe(0);
    expect(s.totalEnemiesKilled).toBe(0);
    expect(s.createdAt).toBe(0);
    expect(s.lastPlayedAt).toBe(0);
  });

  it('updateHighest: より高い Tier で更新される', () => {
    const store = makeStore();
    store.getState().updateHighest(3, 5);
    expect(store.getState().highestTier).toBe(3);
    expect(store.getState().highestWave).toBe(5);
  });

  it('updateHighest: 同 Tier でより高い Wave のみ更新', () => {
    const store = makeStore();
    store.getState().updateHighest(2, 3);
    store.getState().updateHighest(2, 7);
    expect(store.getState().highestTier).toBe(2);
    expect(store.getState().highestWave).toBe(7);
  });

  it('updateHighest: 低い Tier では上書きしない', () => {
    const store = makeStore();
    store.getState().updateHighest(5, 10);
    store.getState().updateHighest(3, 99);
    expect(store.getState().highestTier).toBe(5);
    expect(store.getState().highestWave).toBe(10);
  });

  // --- unlockNextTier (Tier クリア時の次 Tier 解放) ---
  describe('unlockNextTier', () => {
    it('Tier 1 クリア → highestTier=2 になる (初期値 0 から)', () => {
      const store = makeStore();
      store.getState().unlockNextTier(1);
      expect(store.getState().highestTier).toBe(2);
    });

    it('Tier 3 クリア → highestTier=4 になる', () => {
      const store = makeStore();
      store.getState().unlockNextTier(3);
      expect(store.getState().highestTier).toBe(4);
    });

    it('既に Tier 5 まで解放済み + Tier 2 クリア → highestTier は 5 のまま (下げない)', () => {
      const store = makeStore();
      store.getState().updateHighest(5, 10);
      store.getState().unlockNextTier(2);
      expect(store.getState().highestTier).toBe(5);
    });

    it('Tier N クリア + 既に highestTier=N+1 → 変化なし', () => {
      const store = makeStore();
      store.getState().updateHighest(3, 10); // highestTier=3
      store.getState().unlockNextTier(2); // 2+1=3 → 既に到達済み、 変化なし
      expect(store.getState().highestTier).toBe(3);
    });

    it('highestWave は触らない (Tier N+1 の wave 0 到達とは扱わない)', () => {
      const store = makeStore();
      store.getState().updateHighest(1, 25); // highestTier=1, highestWave=25
      store.getState().unlockNextTier(1);
      expect(store.getState().highestTier).toBe(2);
      expect(store.getState().highestWave).toBe(25); // 触らない
    });

    it('同 Tier を 2 度クリア (アイドル) → 1 度目で解放、 2 度目は no-op', () => {
      const store = makeStore();
      store.getState().unlockNextTier(2);
      expect(store.getState().highestTier).toBe(3);
      store.getState().unlockNextTier(2);
      expect(store.getState().highestTier).toBe(3);
    });
  });

  it('addPlayTimeSec: 累積される', () => {
    const store = makeStore();
    store.getState().addPlayTimeSec(100);
    store.getState().addPlayTimeSec(50);
    expect(store.getState().totalPlayTimeSec).toBe(150);
  });

  it('incrementRuns: 1 ずつ増加', () => {
    const store = makeStore();
    store.getState().incrementRuns();
    store.getState().incrementRuns();
    expect(store.getState().totalRuns).toBe(2);
  });

  it('addEnemiesKilled: 累積される', () => {
    const store = makeStore();
    store.getState().addEnemiesKilled(10);
    store.getState().addEnemiesKilled(5);
    expect(store.getState().totalEnemiesKilled).toBe(15);
  });

  it('resetProfile: 全フィールドが初期化される', () => {
    const store = makeStore();
    store.getState().updateHighest(5, 10);
    store.getState().incrementRuns();
    store.getState().resetProfile(9999);
    const s = store.getState();
    expect(s.highestTier).toBe(0);
    expect(s.totalRuns).toBe(0);
    expect(s.createdAt).toBe(9999);
    expect(s.lastPlayedAt).toBe(9999);
  });
});

// ---------------------------------------------------------------------------
// currencies slice
// ---------------------------------------------------------------------------

describe('currencies slice', () => {
  it('初期値は ZERO', () => {
    const s = makeStore().getState();
    expect(s.bolt.isZero()).toBe(true);
    expect(s.alloy.isZero()).toBe(true);
  });

  it('addBolt: 追加される', () => {
    const store = makeStore();
    store.getState().addBolt(BigNum.fromNumber(500));
    store.getState().addBolt(BigNum.fromNumber(300));
    expect(store.getState().bolt.toString()).toBe('800');
  });

  it('spendBolt: 残高が減る', () => {
    const store = makeStore();
    store.getState().addBolt(BigNum.fromNumber(1000));
    const ok = store.getState().spendBolt(BigNum.fromNumber(300));
    expect(ok).toBe(true);
    expect(store.getState().bolt.toString()).toBe('700');
  });

  it('spendBolt: 残高不足で false を返し state は変わらない', () => {
    const store = makeStore();
    store.getState().addBolt(BigNum.fromNumber(100));
    const ok = store.getState().spendBolt(BigNum.fromNumber(200));
    expect(ok).toBe(false);
    expect(store.getState().bolt.toString()).toBe('100');
  });

  it('spendBolt: ちょうど残高と同額なら成功', () => {
    const store = makeStore();
    store.getState().addBolt(BigNum.fromNumber(500));
    const ok = store.getState().spendBolt(BigNum.fromNumber(500));
    expect(ok).toBe(true);
    expect(store.getState().bolt.isZero()).toBe(true);
  });

  it('addAlloy / spendAlloy: bolt と独立して動作', () => {
    const store = makeStore();
    store.getState().addAlloy(BigNum.fromNumber(200));
    const ok = store.getState().spendAlloy(BigNum.fromNumber(200));
    expect(ok).toBe(true);
    expect(store.getState().alloy.isZero()).toBe(true);
    expect(store.getState().bolt.isZero()).toBe(true);
  });

  it('resetCurrencies: 両通貨が ZERO になる', () => {
    const store = makeStore();
    store.getState().addBolt(BigNum.fromNumber(100));
    store.getState().addAlloy(BigNum.fromNumber(200));
    store.getState().resetCurrencies();
    expect(store.getState().bolt.isZero()).toBe(true);
    expect(store.getState().alloy.isZero()).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// machine slice
// ---------------------------------------------------------------------------

describe('machine slice', () => {
  it('初期値: 全キーが lv=0', () => {
    const s = makeStore().getState();
    expect(s.machineLevels.maxHp).toBe(0);
    expect(s.machineLevels.patchSlots).toBe(0);
    expect(Object.keys(s.machineLevels).length).toBe(16);
  });

  it('incrementMachineLv: 指定キーの Lv が 1 上がる', () => {
    const store = makeStore();
    store.getState().incrementMachineLv('maxHp');
    store.getState().incrementMachineLv('maxHp');
    expect(store.getState().machineLevels.maxHp).toBe(2);
    expect(store.getState().machineLevels.defense).toBe(0);
  });

  it('setMachineLv: 直接セットできる', () => {
    const store = makeStore();
    store.getState().setMachineLv('critRate', 7);
    expect(store.getState().machineLevels.critRate).toBe(7);
  });

  it('resetMachine: 全 Lv が 0 に戻る', () => {
    const store = makeStore();
    store.getState().incrementMachineLv('maxHp');
    store.getState().setMachineLv('defense', 5);
    store.getState().resetMachine();
    expect(store.getState().machineLevels.maxHp).toBe(0);
    expect(store.getState().machineLevels.defense).toBe(0);
  });
});

// ---------------------------------------------------------------------------
// weapons slice
// ---------------------------------------------------------------------------

describe('weapons slice', () => {
  it('初期値: weaponLv=0, initialWeapon=laser', () => {
    const s = makeStore().getState();
    expect(s.weaponLv).toBe(0);
    expect(s.initialWeapon).toBe('laser');
  });

  it('incrementWeaponLv: 1 ずつ増加', () => {
    const store = makeStore();
    store.getState().incrementWeaponLv();
    store.getState().incrementWeaponLv();
    expect(store.getState().weaponLv).toBe(2);
  });

  it('setWeaponLv: 直接セットできる', () => {
    const store = makeStore();
    store.getState().setWeaponLv(10);
    expect(store.getState().weaponLv).toBe(10);
  });

  it('setInitialWeapon: 変更できる', () => {
    const store = makeStore();
    store.getState().setInitialWeapon('cannon');
    expect(store.getState().initialWeapon).toBe('cannon');
  });

  it('resetWeapons: 初期値に戻る', () => {
    const store = makeStore();
    store.getState().setWeaponLv(5);
    store.getState().setInitialWeapon('thunder');
    store.getState().resetWeapons();
    expect(store.getState().weaponLv).toBe(0);
    expect(store.getState().initialWeapon).toBe('laser');
  });
});

// ---------------------------------------------------------------------------
// patches slice
// ---------------------------------------------------------------------------

describe('patches slice', () => {
  it('初期値: 空 Map', () => {
    const s = makeStore().getState();
    expect(s.patches.size).toBe(0);
  });

  it('addPatch: エントリが追加される', () => {
    const store = makeStore();
    store.getState().addPatch('instantKill', 1);
    expect(store.getState().patches.size).toBe(1);
    expect(store.getState().patches.get('instantKill#1')?.count).toBe(1);
  });

  it('addPatch: 同一キーは count が累積される', () => {
    const store = makeStore();
    store.getState().addPatch('instantKill', 1, 2);
    store.getState().addPatch('instantKill', 1, 3);
    expect(store.getState().patches.get('instantKill#1')?.count).toBe(5);
  });

  it('consumePatch: count が減る', () => {
    const store = makeStore();
    store.getState().addPatch('bossKiller', 2, 5);
    const ok = store.getState().consumePatch('bossKiller', 2, 2);
    expect(ok).toBe(true);
    expect(store.getState().patches.get('bossKiller#2')?.count).toBe(3);
  });

  it('consumePatch: count が 0 になったらエントリ削除', () => {
    const store = makeStore();
    store.getState().addPatch('doubleShot', 1, 1);
    store.getState().consumePatch('doubleShot', 1, 1);
    expect(store.getState().patches.has('doubleShot#1')).toBe(false);
  });

  it('consumePatch: 在庫不足で false, state 変わらず', () => {
    const store = makeStore();
    store.getState().addPatch('burnHit', 1, 2);
    const ok = store.getState().consumePatch('burnHit', 1, 3);
    expect(ok).toBe(false);
    expect(store.getState().patches.get('burnHit#1')?.count).toBe(2);
  });

  it('consumePatch: 存在しないパッチで false', () => {
    const store = makeStore();
    const ok = store.getState().consumePatch('freezeHit', 1, 1);
    expect(ok).toBe(false);
  });

  it('resetPatches: 全エントリが消える', () => {
    const store = makeStore();
    store.getState().addPatch('boltCast', 1);
    store.getState().addPatch('bonusDrop', 2);
    store.getState().resetPatches();
    expect(store.getState().patches.size).toBe(0);
  });
});

// ---------------------------------------------------------------------------
// equippedPatches slice
// ---------------------------------------------------------------------------

describe('equippedPatches slice', () => {
  it('初期値: 空 Map', () => {
    const s = makeStore().getState();
    expect(s.equippedPatches.size).toBe(0);
  });

  it('equipPatch: スロットにパッチが装着される', () => {
    const store = makeStore();
    const ok = store.getState().equipPatch(0, 'instantKill', 1);
    expect(ok).toBe(true);
    expect(store.getState().equippedPatches.get(0)?.name).toBe('instantKill');
  });

  it('equipPatch: 同名パッチを別スロットに装着しようとすると false', () => {
    const store = makeStore();
    store.getState().equipPatch(0, 'bossKiller', 1);
    const ok = store.getState().equipPatch(1, 'bossKiller', 2);
    expect(ok).toBe(false);
    expect(store.getState().equippedPatches.size).toBe(1);
  });

  it('equipPatch: 同スロット上書きは同名でも OK', () => {
    const store = makeStore();
    store.getState().equipPatch(0, 'bossKiller', 1);
    const ok = store.getState().equipPatch(0, 'bossKiller', 2);
    expect(ok).toBe(true);
    expect(store.getState().equippedPatches.get(0)?.tier).toBe(2);
  });

  it('unequipPatch: スロットが空になる', () => {
    const store = makeStore();
    store.getState().equipPatch(2, 'doubleShot', 1);
    store.getState().unequipPatch(2);
    expect(store.getState().equippedPatches.has(2)).toBe(false);
  });

  it('clearEquippedPatches: 全スロットが空になる', () => {
    const store = makeStore();
    store.getState().equipPatch(0, 'instantKill', 1);
    store.getState().equipPatch(1, 'doubleShot', 1);
    store.getState().clearEquippedPatches();
    expect(store.getState().equippedPatches.size).toBe(0);
  });
});

// ---------------------------------------------------------------------------
// settings slice
// ---------------------------------------------------------------------------

describe('settings slice', () => {
  it('初期値: bgmVolume=0.8, seVolume=0.8, muted=false, targetFps=60', () => {
    const s = makeStore().getState();
    expect(s.bgmVolume).toBe(0.8);
    expect(s.seVolume).toBe(0.8);
    expect(s.muted).toBe(false);
    expect(s.targetFps).toBe(60);
  });

  it('setTargetFps: 30/45/60 のいずれにも切り替えられる', () => {
    const store = makeStore();
    store.getState().setTargetFps(30);
    expect(store.getState().targetFps).toBe(30);
    store.getState().setTargetFps(45);
    expect(store.getState().targetFps).toBe(45);
    store.getState().setTargetFps(60);
    expect(store.getState().targetFps).toBe(60);
  });

  it('setTargetFps: 想定外の値は無視 (型ガード)', () => {
    const store = makeStore();
    store.getState().setTargetFps(45);
    // @ts-expect-error 型外の値を渡す
    store.getState().setTargetFps(120);
    expect(store.getState().targetFps).toBe(45);
  });

  it('setBgmVolume: 0〜1 にクランプされる', () => {
    const store = makeStore();
    store.getState().setBgmVolume(1.5);
    expect(store.getState().bgmVolume).toBe(1);
    store.getState().setBgmVolume(-0.5);
    expect(store.getState().bgmVolume).toBe(0);
  });

  it('setSeVolume: 0〜1 にクランプされる', () => {
    const store = makeStore();
    store.getState().setSeVolume(0.5);
    expect(store.getState().seVolume).toBe(0.5);
  });

  it('setMuted: true/false で切り替えられる', () => {
    const store = makeStore();
    expect(store.getState().muted).toBe(false);
    store.getState().setMuted(true);
    expect(store.getState().muted).toBe(true);
    store.getState().setMuted(false);
    expect(store.getState().muted).toBe(false);
  });

  it('resetSettings: muted も false にリセットされる', () => {
    const store = makeStore();
    store.getState().setMuted(true);
    store.getState().resetSettings();
    expect(store.getState().muted).toBe(false);
  });

  it('resetSettings: デフォルト値に戻る', () => {
    const store = makeStore();
    store.getState().setBgmVolume(0.3);
    store.getState().setSeVolume(0.1);
    store.getState().resetSettings();
    expect(store.getState().bgmVolume).toBe(0.8);
    expect(store.getState().seVolume).toBe(0.8);
  });

  it('setMuted: true→true の連続呼び出しでも true のまま', () => {
    const store = makeStore();
    store.getState().setMuted(true);
    store.getState().setMuted(true);
    expect(store.getState().muted).toBe(true);
  });

  it('setMuted: false→false の連続呼び出しでも false のまま', () => {
    const store = makeStore();
    store.getState().setMuted(false);
    store.getState().setMuted(false);
    expect(store.getState().muted).toBe(false);
  });

  it('resetSettings: muted リセット後も bgmVolume / seVolume / targetFps がデフォルト値になる', () => {
    const store = makeStore();
    store.getState().setMuted(true);
    store.getState().setBgmVolume(0.1);
    store.getState().setSeVolume(0.2);
    store.getState().setTargetFps(30);
    store.getState().resetSettings();
    expect(store.getState().muted).toBe(false);
    expect(store.getState().bgmVolume).toBe(0.8);
    expect(store.getState().seVolume).toBe(0.8);
    expect(store.getState().targetFps).toBe(60);
  });

  // ---- v1.4.8: 診断モード ----

  it('初期値: diagnosticsEnabled=false', () => {
    const s = makeStore().getState();
    expect(s.diagnosticsEnabled).toBe(false);
  });

  it('setDiagnosticsEnabled: true/false で切り替えられる', () => {
    const store = makeStore();
    store.getState().setDiagnosticsEnabled(true);
    expect(store.getState().diagnosticsEnabled).toBe(true);
    store.getState().setDiagnosticsEnabled(false);
    expect(store.getState().diagnosticsEnabled).toBe(false);
  });

  it('resetSettings: diagnosticsEnabled も false にリセットされる', () => {
    const store = makeStore();
    store.getState().setDiagnosticsEnabled(true);
    store.getState().resetSettings();
    expect(store.getState().diagnosticsEnabled).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// battle slice
// ---------------------------------------------------------------------------

describe('battle slice', () => {
  it('初期値: isRunActive=false, screw=ZERO', () => {
    const s = makeStore().getState();
    expect(s.isRunActive).toBe(false);
    expect(s.screw.isZero()).toBe(true);
    expect(s.machineHp.isZero()).toBe(true);
  });

  it('startRun: ラン中状態に遷移する + activeCdSec が満タン (= ゲージ 0 開始)', () => {
    const store = makeStore();
    store.getState().startRun({
      initialWeapon: 'cannon',
      baseMachineMaxHp: BigNum.fromNumber(1000),
    });
    const s = store.getState();
    expect(s.isRunActive).toBe(true);
    expect(s.machineHp.eq(BigNum.fromNumber(1000))).toBe(true);
    expect(s.machineMaxHp.eq(BigNum.fromNumber(1000))).toBe(true);
    expect(s.currentWeapon).toBe('cannon');
    expect(s.currentTier).toBe(1);
    expect(s.currentWave).toBe(1);
    // 仕様: ラン開始時はアクティブゲージ 0 (= CD 満タン) でスタート、
    // activeCdReduction=0 (= マシン強化なし) なら DEFAULT_ACTIVE_MAX_SEC のまま
    expect(s.activeCdSec).toBe(60);
  });

  it('startRun: activeCdReduction=0.25 のとき初回ゲージ充填は 60×(1-0.25) = 45s に短縮される', () => {
    const store = makeStore();
    store.getState().startRun({
      initialWeapon: 'cannon',
      baseMachineMaxHp: BigNum.fromNumber(1000),
      activeCdReduction: 0.25,
    });
    expect(store.getState().activeCdSec).toBe(45);
  });

  it('startRun: activeCdReduction=0.5 (上限) で初回充填が 30s に短縮される', () => {
    const store = makeStore();
    store.getState().startRun({
      initialWeapon: 'cannon',
      baseMachineMaxHp: BigNum.fromNumber(1000),
      activeCdReduction: 0.5,
    });
    expect(store.getState().activeCdSec).toBe(30);
  });

  it('startRun: activeCdReduction が範囲外 (負値) でも 0 にクランプして 60s で初期化', () => {
    const store = makeStore();
    store.getState().startRun({
      initialWeapon: 'cannon',
      baseMachineMaxHp: BigNum.fromNumber(1000),
      activeCdReduction: -0.3,
    });
    expect(store.getState().activeCdSec).toBe(60);
  });

  it('startRun: initialTier=1 を明示指定すると currentTier が 1 になる', () => {
    const store = makeStore();
    store.getState().startRun({
      initialWeapon: 'laser',
      baseMachineMaxHp: BigNum.fromNumber(100),
      initialTier: 1,
    });
    expect(store.getState().currentTier).toBe(1);
  });

  it('startRun: initialTier=3 を渡すと currentTier が 3 になる', () => {
    const store = makeStore();
    store.getState().startRun({
      initialWeapon: 'laser',
      baseMachineMaxHp: BigNum.fromNumber(100),
      initialTier: 3,
    });
    expect(store.getState().currentTier).toBe(3);
  });

  it('startRun: initialTier=10 (大きい値) でも currentTier がそのまま 10 になる', () => {
    // 仕様: startRun 側はクランプしない。UI 層 (TierSelectTab / highestTier) でガード済み
    const store = makeStore();
    store.getState().startRun({
      initialWeapon: 'laser',
      baseMachineMaxHp: BigNum.fromNumber(100),
      initialTier: 10,
    });
    expect(store.getState().currentTier).toBe(10);
  });

  it('startRun: initialTier=100 (大きい値) でも currentTier がそのまま 100 になる', () => {
    // 仕様: startRun 側はクランプしない。UI 層 (TierSelectTab / highestTier) でガード済み
    const store = makeStore();
    store.getState().startRun({
      initialWeapon: 'laser',
      baseMachineMaxHp: BigNum.fromNumber(100),
      initialTier: 100,
    });
    expect(store.getState().currentTier).toBe(100);
  });

  it('startRun: initialTier 省略 (undefined) のとき currentTier が 1 になる', () => {
    const store = makeStore();
    store.getState().startRun({
      initialWeapon: 'laser',
      baseMachineMaxHp: BigNum.fromNumber(100),
    });
    expect(store.getState().currentTier).toBe(1);
  });

  // --- initialWave (DEV 限定デバッグ出撃用、 v0.3.5) ---
  it('startRun: initialWave 省略 (undefined) のとき currentWave が 1 になる', () => {
    const store = makeStore();
    store.getState().startRun({
      initialWeapon: 'laser',
      baseMachineMaxHp: BigNum.fromNumber(100),
    });
    expect(store.getState().currentWave).toBe(1);
  });

  it('startRun: initialWave=28 を渡すと currentWave が 28 になる (DEV デバッグ出撃)', () => {
    const store = makeStore();
    store.getState().startRun({
      initialWeapon: 'laser',
      baseMachineMaxHp: BigNum.fromNumber(100),
      initialWave: 28,
    });
    expect(store.getState().currentWave).toBe(28);
  });

  it('startRun: initialWave=30 (ボス wave) を渡しても currentWave が 30 になる', () => {
    const store = makeStore();
    store.getState().startRun({
      initialWeapon: 'laser',
      baseMachineMaxHp: BigNum.fromNumber(100),
      initialWave: 30,
    });
    expect(store.getState().currentWave).toBe(30);
  });

  it('startRun: initialTier + initialWave を組み合わせて指定できる (Tier 3 W28 から開始)', () => {
    const store = makeStore();
    store.getState().startRun({
      initialWeapon: 'laser',
      baseMachineMaxHp: BigNum.fromNumber(100),
      initialTier: 3,
      initialWave: 28,
    });
    const s = store.getState();
    expect(s.currentTier).toBe(3);
    expect(s.currentWave).toBe(28);
  });

  it('endRun: デフォルト状態に戻る', () => {
    const store = makeStore();
    store.getState().startRun({ initialWeapon: 'laser', baseMachineMaxHp: BigNum.fromNumber(500) });
    store.getState().addScrew(BigNum.fromNumber(100));
    store.getState().endRun();
    expect(store.getState().isRunActive).toBe(false);
    expect(store.getState().screw.isZero()).toBe(true);
  });

  it('addScrew / spendScrew: ネジの増減', () => {
    const store = makeStore();
    store.getState().startRun({ initialWeapon: 'laser', baseMachineMaxHp: BigNum.fromNumber(100) });
    store.getState().addScrew(BigNum.fromNumber(500));
    const ok = store.getState().spendScrew(BigNum.fromNumber(200));
    expect(ok).toBe(true);
    expect(store.getState().screw.toString()).toBe('300');
  });

  it('spendScrew: 不足で false', () => {
    const store = makeStore();
    store.getState().startRun({ initialWeapon: 'laser', baseMachineMaxHp: BigNum.fromNumber(100) });
    const ok = store.getState().spendScrew(BigNum.fromNumber(1));
    expect(ok).toBe(false);
  });

  it('damageHp: HP が減り、0 未満にはならない', () => {
    const store = makeStore();
    store.getState().startRun({ initialWeapon: 'laser', baseMachineMaxHp: BigNum.fromNumber(100) });
    store.getState().damageHp(BigNum.fromNumber(30));
    expect(store.getState().machineHp.eq(BigNum.fromNumber(70))).toBe(true);
    store.getState().damageHp(BigNum.fromNumber(200));
    expect(store.getState().machineHp.isZero()).toBe(true);
  });

  describe('addMachineHp', () => {
    it('delta を加算する', () => {
      const store = makeStore();
      store
        .getState()
        .startRun({ initialWeapon: 'laser', baseMachineMaxHp: BigNum.fromNumber(100) });
      store.getState().damageHp(BigNum.fromNumber(40)); // HP=60
      store.getState().addMachineHp(BigNum.fromNumber(20));
      expect(store.getState().machineHp.eq(BigNum.fromNumber(80))).toBe(true);
    });

    it('maxHp 超過はクランプされる', () => {
      const store = makeStore();
      store
        .getState()
        .startRun({ initialWeapon: 'laser', baseMachineMaxHp: BigNum.fromNumber(100) });
      store.getState().damageHp(BigNum.fromNumber(10)); // HP=90
      store.getState().addMachineHp(BigNum.fromNumber(50));
      expect(store.getState().machineHp.eq(BigNum.fromNumber(100))).toBe(true);
    });

    it('damageHp と addMachineHp が連続して呼ばれても両方反映される (atomicity)', () => {
      // 旧バグ: useBattleLoop で setMachineHp(stale.machineHp.add(regen)) を使うと
      // 同 tick 内の damageHp が上書きされて消えていた。 addMachineHp は delta だけを
      // store の最新値に対して atomic に加算するので、 順番に呼んでも両方反映される
      const store = makeStore();
      store
        .getState()
        .startRun({ initialWeapon: 'laser', baseMachineMaxHp: BigNum.fromNumber(100) });
      // HP=100 から: damage 30 → 70、 regen +5 → 75
      store.getState().damageHp(BigNum.fromNumber(30));
      store.getState().addMachineHp(BigNum.fromNumber(5));
      expect(store.getState().machineHp.eq(BigNum.fromNumber(75))).toBe(true);
    });

    it('regen が damage より大きくても damage 分は消えない (累積)', () => {
      const store = makeStore();
      store
        .getState()
        .startRun({ initialWeapon: 'laser', baseMachineMaxHp: BigNum.fromNumber(100) });
      // damage 20 → 80、 regen +5 → 85 (= 80 + 5、 加算 regen が damage を打ち消さない)
      store.getState().damageHp(BigNum.fromNumber(20));
      store.getState().addMachineHp(BigNum.fromNumber(5));
      expect(store.getState().machineHp.eq(BigNum.fromNumber(85))).toBe(true);
    });

    it('delta=0 のときは HP が変わらない', () => {
      const store = makeStore();
      store
        .getState()
        .startRun({ initialWeapon: 'laser', baseMachineMaxHp: BigNum.fromNumber(100) });
      store.getState().damageHp(BigNum.fromNumber(30)); // HP=70
      store.getState().addMachineHp(BigNum.ZERO);
      expect(store.getState().machineHp.eq(BigNum.fromNumber(70))).toBe(true);
    });

    it('ちょうど maxHp のときは maxHp を超えない (境界クランプ)', () => {
      const store = makeStore();
      store
        .getState()
        .startRun({ initialWeapon: 'laser', baseMachineMaxHp: BigNum.fromNumber(100) });
      // HP=100 (満タン) に +10 → maxHp=100 にクランプ
      store.getState().addMachineHp(BigNum.fromNumber(10));
      expect(store.getState().machineHp.eq(BigNum.fromNumber(100))).toBe(true);
    });

    it('machineHp=0 に addMachineHp を呼ぶと加算される (呼び出し側ガード責務)', () => {
      // addMachineHp 自体はゲームオーバーガードを持たない。
      // ガードは useBattleLoop 側 (useStore.getState().machineHp.isZero() チェック) で行う。
      // このテストはその仕様を明文化する。
      const store = makeStore();
      store
        .getState()
        .startRun({ initialWeapon: 'laser', baseMachineMaxHp: BigNum.fromNumber(100) });
      store.getState().damageHp(BigNum.fromNumber(999)); // HP=0 (ゲームオーバー)
      store.getState().addMachineHp(BigNum.fromNumber(10));
      // addMachineHp は delta を足す → HP=10 になる (呼び側がガードしなければ蘇生してしまう)
      expect(store.getState().machineHp.eq(BigNum.fromNumber(10))).toBe(true);
    });

    it('複数 damageHp と addMachineHp が交互に呼ばれても全部正しく積み重なる (integration)', () => {
      const store = makeStore();
      store
        .getState()
        .startRun({ initialWeapon: 'laser', baseMachineMaxHp: BigNum.fromNumber(200) });
      // 初期 HP=200
      // damage 50 → 150
      store.getState().damageHp(BigNum.fromNumber(50));
      // regen +10 → 160
      store.getState().addMachineHp(BigNum.fromNumber(10));
      // damage 30 → 130
      store.getState().damageHp(BigNum.fromNumber(30));
      // regen +5 → 135
      store.getState().addMachineHp(BigNum.fromNumber(5));
      expect(store.getState().machineHp.eq(BigNum.fromNumber(135))).toBe(true);
    });

    it('addMachineHp のみ複数回呼ぶと maxHp で上限クランプされる', () => {
      const store = makeStore();
      store
        .getState()
        .startRun({ initialWeapon: 'laser', baseMachineMaxHp: BigNum.fromNumber(100) });
      store.getState().damageHp(BigNum.fromNumber(50)); // HP=50
      // 3 回 regen を積む: +20 → 70、 +20 → 90、 +20 → 100 (クランプ)
      store.getState().addMachineHp(BigNum.fromNumber(20));
      store.getState().addMachineHp(BigNum.fromNumber(20));
      store.getState().addMachineHp(BigNum.fromNumber(20));
      expect(store.getState().machineHp.eq(BigNum.fromNumber(100))).toBe(true);
    });
  });

  it('advanceWave / advanceTier: Wave と Tier が増加する', () => {
    const store = makeStore();
    store.getState().startRun({ initialWeapon: 'laser', baseMachineMaxHp: BigNum.fromNumber(100) });
    store.getState().advanceWave();
    store.getState().advanceWave();
    expect(store.getState().currentWave).toBe(3);
    store.getState().advanceTier();
    expect(store.getState().currentTier).toBe(2);
    expect(store.getState().currentWave).toBe(1);
  });

  it('switchWeapon: 武器が変わる + CD 3 秒がセットされる', () => {
    const store = makeStore();
    store.getState().startRun({ initialWeapon: 'laser', baseMachineMaxHp: BigNum.fromNumber(100) });
    store.getState().switchWeapon('thunder');
    expect(store.getState().currentWeapon).toBe('thunder');
    expect(store.getState().weaponSwitchCdSec).toBe(3);
  });

  it('switchWeapon: CD 中は無視される', () => {
    const store = makeStore();
    store.getState().startRun({ initialWeapon: 'laser', baseMachineMaxHp: BigNum.fromNumber(100) });
    store.getState().switchWeapon('thunder'); // CD=3
    store.getState().switchWeapon('cannon'); // CD 中なので無視
    expect(store.getState().currentWeapon).toBe('thunder');
  });

  it('switchWeapon: 同じ武器への切替は CD をセットしない', () => {
    const store = makeStore();
    store.getState().startRun({ initialWeapon: 'laser', baseMachineMaxHp: BigNum.fromNumber(100) });
    store.getState().switchWeapon('laser'); // 同武器
    expect(store.getState().weaponSwitchCdSec).toBe(0);
  });

  it('tickCooldowns: CD が deltaSecGameTime 分減少し 0 未満にならない', () => {
    const store = makeStore();
    store.getState().setWeaponSwitchCd(5);
    store.getState().setActiveCd(3);
    store.getState().tickCooldowns(2);
    expect(store.getState().weaponSwitchCdSec).toBe(3);
    expect(store.getState().activeCdSec).toBe(1);
    store.getState().tickCooldowns(10);
    expect(store.getState().weaponSwitchCdSec).toBe(0);
    expect(store.getState().activeCdSec).toBe(0);
  });

  it('isPaused: 初期値 false → setPaused で切替', () => {
    const store = makeStore();
    expect(store.getState().isPaused).toBe(false);
    store.getState().setPaused(true);
    expect(store.getState().isPaused).toBe(true);
    store.getState().setPaused(false);
    expect(store.getState().isPaused).toBe(false);
  });

  it('isAutoActive: 初期値 false → setAutoActive で切替', () => {
    const store = makeStore();
    expect(store.getState().isAutoActive).toBe(false);
    store.getState().setAutoActive(true);
    expect(store.getState().isAutoActive).toBe(true);
    store.getState().setAutoActive(false);
    expect(store.getState().isAutoActive).toBe(false);
  });

  it('isAutoActive: v1.4.4 で startRun 後も保持される (セッション跨ぎ永続化)', () => {
    const store = makeStore();
    store.getState().setAutoActive(true);
    store.getState().startRun({ initialWeapon: 'laser', baseMachineMaxHp: BigNum.fromNumber(100) });
    expect(store.getState().isAutoActive).toBe(true);
  });

  it('isAutoActive: v1.4.4 で endRun 後も保持される (セッション跨ぎ永続化)', () => {
    const store = makeStore();
    store.getState().setAutoActive(true);
    store.getState().startRun({ initialWeapon: 'laser', baseMachineMaxHp: BigNum.fromNumber(100) });
    store.getState().endRun();
    expect(store.getState().isAutoActive).toBe(true);
    // ラン状態そのものはリセット
    expect(store.getState().isRunActive).toBe(false);
  });

  it('startRun: baseMachineMaxHp が保存され、 hpMul Lv 0 では machineMaxHp = base', () => {
    const store = makeStore();
    store.getState().startRun({ initialWeapon: 'laser', baseMachineMaxHp: BigNum.fromNumber(800) });
    expect(store.getState().baseMachineMaxHp.eq(BigNum.fromNumber(800))).toBe(true);
    expect(store.getState().machineMaxHp.eq(BigNum.fromNumber(800))).toBe(true);
    expect(store.getState().machineHp.eq(BigNum.fromNumber(800))).toBe(true);
  });

  it('recalcMachineMaxHpFromHpMul: 減量を維持 (new_current = new_max - damage_taken)', () => {
    const store = makeStore();
    store.getState().startRun({ initialWeapon: 'laser', baseMachineMaxHp: BigNum.fromNumber(100) });
    // 50 damage を受けた状態: 50/100
    store.getState().damageHp(BigNum.fromNumber(50));
    expect(store.getState().machineHp.eq(BigNum.fromNumber(50))).toBe(true);
    expect(store.getState().machineMaxHp.eq(BigNum.fromNumber(100))).toBe(true);
    // hpMul Lv 5 (×1.5) に上げる → new_max=150, damage_taken=50, new_current=100
    store.getState().recalcMachineMaxHpFromHpMul(5);
    expect(store.getState().machineMaxHp.eq(BigNum.fromNumber(150))).toBe(true);
    expect(store.getState().machineHp.eq(BigNum.fromNumber(100))).toBe(true);
  });

  it('triggerActive: CD 0 で発動成功 + activeCdSec が maxSec にセット', () => {
    const store = makeStore();
    expect(store.getState().activeCdSec).toBe(0);
    const ok = store.getState().triggerActive(30);
    expect(ok).toBe(true);
    expect(store.getState().activeCdSec).toBe(30);
  });

  it('triggerActive: CD 中なら false / activeCdSec 据え置き', () => {
    const store = makeStore();
    store.getState().setActiveCd(15);
    const ok = store.getState().triggerActive(30);
    expect(ok).toBe(false);
    expect(store.getState().activeCdSec).toBe(15);
  });

  it('upgradeRunWorkshop("hpMul", 1): ネジ消費 + machineMaxHp 動的更新', () => {
    const store = makeStore();
    store.getState().startRun({ initialWeapon: 'laser', baseMachineMaxHp: BigNum.fromNumber(100) });
    store.getState().addScrew(BigNum.fromNumber(10));
    const ok = store.getState().upgradeRunWorkshop('hpMul', 1);
    expect(ok).toBe(true);
    expect(store.getState().runWorkshopLevels.hpMul).toBe(1);
    // hpMul Lv 1 (×1.1) → machineMaxHp = 100 × 1.1 = 110 (BigNum 整数化)
    expect(store.getState().machineMaxHp.eq(BigNum.fromNumber(110))).toBe(true);
    // 開戦直後はダメージ受けてない → machineHp = 110 (満タンも 110 に追従)
    expect(store.getState().machineHp.eq(BigNum.fromNumber(110))).toBe(true);
  });

  describe('bossEnrageStage (v1.5.0 §2.1)', () => {
    it('初期値は 0', () => {
      expect(makeStore().getState().bossEnrageStage).toBe(0);
    });

    it('setBossEnrageStage: 値を更新する', () => {
      const store = makeStore();
      store.getState().setBossEnrageStage(3);
      expect(store.getState().bossEnrageStage).toBe(3);
    });

    it('setBossEnrageStage: 負値は 0 にクランプされる', () => {
      const store = makeStore();
      store.getState().setBossEnrageStage(-2);
      expect(store.getState().bossEnrageStage).toBe(0);
    });

    it('startRun: bossEnrageStage が 0 にリセットされる', () => {
      const store = makeStore();
      store.getState().setBossEnrageStage(5);
      store
        .getState()
        .startRun({ initialWeapon: 'laser', baseMachineMaxHp: BigNum.fromNumber(100) });
      expect(store.getState().bossEnrageStage).toBe(0);
    });

    it('advanceWave: bossEnrageStage が 0 にリセットされる (wave 進行のたび解除)', () => {
      const store = makeStore();
      store
        .getState()
        .startRun({ initialWeapon: 'laser', baseMachineMaxHp: BigNum.fromNumber(100) });
      store.getState().setBossEnrageStage(2);
      store.getState().advanceWave();
      expect(store.getState().bossEnrageStage).toBe(0);
      expect(store.getState().currentWave).toBe(2);
    });

    it('advanceTier: bossEnrageStage が 0 にリセットされる', () => {
      const store = makeStore();
      store
        .getState()
        .startRun({ initialWeapon: 'laser', baseMachineMaxHp: BigNum.fromNumber(100) });
      store.getState().setBossEnrageStage(4);
      store.getState().advanceTier();
      expect(store.getState().bossEnrageStage).toBe(0);
      expect(store.getState().currentTier).toBe(2);
      expect(store.getState().currentWave).toBe(1);
    });
  });
});
