import type { StateCreator } from 'zustand';

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
  /** マシン最大 HP (ラン開始時に計算して注入) */
  machineMaxHp: number;
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
}

// ---------------------------------------------------------------------------
// Actions
// ---------------------------------------------------------------------------

export interface BattleActions {
  startRun: (opts: {
    initialWeapon: WeaponType;
    machineMaxHp: number;
    gameSpeed: 1 | 2 | 3;
  }) => void;
  endRun: () => void;
  addScrew: (amount: BigNum) => void;
  spendScrew: (amount: BigNum) => boolean;
  setMachineHp: (hp: number) => void;
  damageHp: (amount: number) => void;
  advanceWave: () => void;
  advanceTier: () => void;
  switchWeapon: (weapon: WeaponType) => void;
  setWeaponSwitchCd: (sec: number) => void;
  setActiveCd: (sec: number) => void;
  setAutoActive: (auto: boolean) => void;
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
  currentTier: 1,
  currentWave: 1,
  currentWeapon: 'laser',
  weaponSwitchCdSec: 0,
  activeCdSec: 0,
  isAutoActive: false,
  gameSpeed: 1,
};

// ---------------------------------------------------------------------------
// Factory
// ---------------------------------------------------------------------------

export const createBattleSlice: StateCreator<RootStore, [], [], BattleSlice> = (set, get) => ({
  ...defaultBattleState,

  startRun: ({ initialWeapon, machineMaxHp, gameSpeed }) =>
    set({
      isRunActive: true,
      screw: BigNum.ZERO,
      machineHp: machineMaxHp,
      machineMaxHp,
      currentTier: 1,
      currentWave: 1,
      currentWeapon: initialWeapon,
      weaponSwitchCdSec: 0,
      activeCdSec: 0,
      isAutoActive: false,
      gameSpeed,
    }),

  endRun: () => set(defaultBattleState),

  addScrew: (amount) => set((s) => ({ screw: s.screw.add(amount) })),

  spendScrew: (amount) => {
    const cur = get().screw;
    if (cur.lt(amount)) return false;
    set({ screw: cur.sub(amount) });
    return true;
  },

  setMachineHp: (hp) => set((s) => ({ machineHp: Math.max(0, Math.min(hp, s.machineMaxHp)) })),

  damageHp: (amount) => set((s) => ({ machineHp: Math.max(0, s.machineHp - amount) })),

  advanceWave: () => set((s) => ({ currentWave: s.currentWave + 1 })),

  advanceTier: () => set((s) => ({ currentTier: s.currentTier + 1, currentWave: 1 })),

  switchWeapon: (weapon) => set({ currentWeapon: weapon }),

  setWeaponSwitchCd: (sec) => set({ weaponSwitchCdSec: Math.max(0, sec) }),

  setActiveCd: (sec) => set({ activeCdSec: Math.max(0, sec) }),

  setAutoActive: (auto) => set({ isAutoActive: auto }),

  tickCooldowns: (deltaSecGameTime) =>
    set((s) => ({
      weaponSwitchCdSec: Math.max(0, s.weaponSwitchCdSec - deltaSecGameTime),
      activeCdSec: Math.max(0, s.activeCdSec - deltaSecGameTime),
    })),
});
