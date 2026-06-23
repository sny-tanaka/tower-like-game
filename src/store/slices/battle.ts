import type { StateCreator } from 'zustand';

import { calcRunWorkshopMultiplier } from '@/components/organisms/RunWorkshopBottomSheet/items';
import { BigNum } from '@/lib/bignum';
import type { RootStore } from '@/store/index';
import type { WeaponType } from '@/store/slices/weapons';

// ---------------------------------------------------------------------------
// State
// ---------------------------------------------------------------------------

export interface BattleState {
  /** ラン中かどうか */
  isRunActive: boolean;
  /** ラン中通貨: ネジ */
  screw: BigNum;
  /** マシン現在 HP */
  machineHp: number;
  /** マシン最大 HP (base × RunWorkshop hpMul) — RunWorkshop hpMul の変化で動的に再計算される */
  machineMaxHp: number;
  /**
   * マシン最大 HP の base 値 (永続強化 / 装着パッチ込み)。
   * ラン中ワークショップの hpMul を適用する前の値で、 startRun 時に固定される。
   * hpMul が上がっても base は変わらず、 machineMaxHp = baseMachineMaxHp × multiplier で再計算する。
   */
  baseMachineMaxHp: number;
  /** 現在 Tier */
  currentTier: number;
  /** 現在 Wave (Tier 内) */
  currentWave: number;
  /** 現在の武器 */
  currentWeapon: WeaponType;
  /** 武器切替クールダウン残り秒 (0 = 切替可能) */
  weaponSwitchCdSec: number;
  /** アクティブスキルクールダウン残り秒 (0 = 使用可能) */
  activeCdSec: number;
  /** アクティブスキル: 手動(false) / 自動(true) */
  isAutoActive: boolean;
  /** ゲームスピード (1 / 2 / 3) */
  gameSpeed: 1 | 2 | 3;
  /** 一時停止中か */
  isPaused: boolean;
}

// ---------------------------------------------------------------------------
// Actions
// ---------------------------------------------------------------------------

export interface BattleActions {
  startRun: (opts: {
    initialWeapon: WeaponType;
    /** マシン本体最大 HP の base 値 (永続強化込み / RunWorkshop hpMul は含まない) */
    baseMachineMaxHp: number;
    gameSpeed: 1 | 2 | 3;
  }) => void;
  endRun: () => void;
  addScrew: (amount: BigNum) => void;
  spendScrew: (amount: BigNum) => boolean;
  setMachineHp: (hp: number) => void;
  damageHp: (amount: number) => void;
  /**
   * RunWorkshop hpMul 変化時に、 baseMachineMaxHp と新しい hpMul Lv から
   * machineMaxHp を再計算する。 現在 HP は「減量を維持」で更新:
   *   damage_taken = old_max - old_current
   *   new_current  = new_max - damage_taken
   * design-docs/04-run-workshop.md L28-44 参照。
   */
  recalcMachineMaxHpFromHpMul: (newHpMulLv: number) => void;
  advanceWave: () => void;
  advanceTier: () => void;
  switchWeapon: (weapon: WeaponType) => void;
  setWeaponSwitchCd: (sec: number) => void;
  setActiveCd: (sec: number) => void;
  setAutoActive: (auto: boolean) => void;
  setPaused: (paused: boolean) => void;
  setGameSpeed: (speed: 1 | 2 | 3) => void;
  tickCooldowns: (deltaSecGameTime: number) => void;
}

export type BattleSlice = BattleState & BattleActions;

// ---------------------------------------------------------------------------
// Default state
// ---------------------------------------------------------------------------

export const defaultBattleState: BattleState = {
  isRunActive: false,
  screw: BigNum.ZERO,
  machineHp: 0,
  machineMaxHp: 0,
  baseMachineMaxHp: 0,
  currentTier: 1,
  currentWave: 1,
  currentWeapon: 'laser',
  weaponSwitchCdSec: 0,
  activeCdSec: 0,
  isAutoActive: false,
  gameSpeed: 1,
  isPaused: false,
};

// ---------------------------------------------------------------------------
// Factory
// ---------------------------------------------------------------------------

export const createBattleSlice: StateCreator<RootStore, [], [], BattleSlice> = (set, get) => ({
  ...defaultBattleState,

  startRun: ({ initialWeapon, baseMachineMaxHp, gameSpeed }) => {
    // ラン開始時の hpMul は Lv 0 (×1.0) になる前提 (RunWorkshop もリセットされる) だが、
    // 明示的に倍率を計算しておく。
    const hpMulLv = get().runWorkshopLevels.hpMul;
    const multiplier = calcRunWorkshopMultiplier(hpMulLv);
    const machineMaxHp = baseMachineMaxHp * multiplier;
    set({
      isRunActive: true,
      screw: BigNum.ZERO,
      machineHp: machineMaxHp,
      machineMaxHp,
      baseMachineMaxHp,
      currentTier: 1,
      currentWave: 1,
      currentWeapon: initialWeapon,
      weaponSwitchCdSec: 0,
      activeCdSec: 0,
      isAutoActive: false,
      gameSpeed,
      isPaused: false,
    });
    // ラン跨ぎで RunWorkshop の Lv をリセット
    get().resetRunWorkshop();
  },

  endRun: () => {
    set(defaultBattleState);
    get().resetRunWorkshop();
  },

  addScrew: (amount) => set((s) => ({ screw: s.screw.add(amount) })),

  spendScrew: (amount) => {
    const cur = get().screw;
    if (cur.lt(amount)) return false;
    set({ screw: cur.sub(amount) });
    return true;
  },

  setMachineHp: (hp) => set((s) => ({ machineHp: Math.max(0, Math.min(hp, s.machineMaxHp)) })),

  damageHp: (amount) => set((s) => ({ machineHp: Math.max(0, s.machineHp - amount) })),

  recalcMachineMaxHpFromHpMul: (newHpMulLv) => {
    const s = get();
    const oldMax = s.machineMaxHp;
    const oldCurrent = s.machineHp;
    const damageTaken = Math.max(0, oldMax - oldCurrent);
    const newMax = s.baseMachineMaxHp * calcRunWorkshopMultiplier(newHpMulLv);
    const newCurrent = Math.max(0, newMax - damageTaken);
    set({ machineMaxHp: newMax, machineHp: newCurrent });
  },

  advanceWave: () => set((s) => ({ currentWave: s.currentWave + 1 })),

  advanceTier: () => set((s) => ({ currentTier: s.currentTier + 1, currentWave: 1 })),

  switchWeapon: (weapon) => set({ currentWeapon: weapon }),

  setWeaponSwitchCd: (sec) => set({ weaponSwitchCdSec: Math.max(0, sec) }),

  setActiveCd: (sec) => set({ activeCdSec: Math.max(0, sec) }),

  setAutoActive: (auto) => set({ isAutoActive: auto }),

  setPaused: (paused) => set({ isPaused: paused }),

  setGameSpeed: (speed) => set({ gameSpeed: speed }),

  tickCooldowns: (deltaSecGameTime) =>
    set((s) => ({
      weaponSwitchCdSec: Math.max(0, s.weaponSwitchCdSec - deltaSecGameTime),
      activeCdSec: Math.max(0, s.activeCdSec - deltaSecGameTime),
    })),
});
