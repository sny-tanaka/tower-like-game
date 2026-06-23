import type { StateCreator } from 'zustand';

import {
  RUN_WORKSHOP_ITEMS,
  calcRunWorkshopMaxLv,
  calcRunWorkshopMultiLvCost,
} from '@/components/organisms/RunWorkshopBottomSheet/items';
import type {
  RunWorkshopKey,
  RunWorkshopLevels,
} from '@/components/organisms/RunWorkshopBottomSheet/items';
import { BigNum } from '@/lib/bignum';
import type { RootStore } from '@/store/index';

// ---------------------------------------------------------------------------
// State
// ---------------------------------------------------------------------------

export interface RunWorkshopState {
  /** ラン中ワークショップ 4 項目の現在 Lv */
  runWorkshopLevels: RunWorkshopLevels;
}

// ---------------------------------------------------------------------------
// Actions
// ---------------------------------------------------------------------------

export interface RunWorkshopActions {
  /**
   * 指定項目を delta 段階強化する。ネジを消費 (battle slice の spendScrew を経由)。
   * 戻り値:
   *   - true: 強化成功 (ネジ消費 + Lv 加算済み)
   *   - false: ネジ不足 / 未知の key / 'max' で買える Lv がない場合
   */
  upgradeRunWorkshop: (key: RunWorkshopKey, delta: 1 | 5 | 'max') => boolean;
  /** ラン開始 / 終了時に全 Lv を 0 に戻す */
  resetRunWorkshop: () => void;
}

export type RunWorkshopSlice = RunWorkshopState & RunWorkshopActions;

// ---------------------------------------------------------------------------
// Default state
// ---------------------------------------------------------------------------

export const defaultRunWorkshopLevels: RunWorkshopLevels = {
  attackMul: 0,
  attackSpeedMul: 0,
  hpMul: 0,
  screwGainMul: 0,
};

export const defaultRunWorkshopState: RunWorkshopState = {
  runWorkshopLevels: defaultRunWorkshopLevels,
};

// ---------------------------------------------------------------------------
// Factory
// ---------------------------------------------------------------------------

export const createRunWorkshopSlice: StateCreator<RootStore, [], [], RunWorkshopSlice> = (
  set,
  get
) => ({
  ...defaultRunWorkshopState,

  upgradeRunWorkshop: (key, delta) => {
    const item = RUN_WORKSHOP_ITEMS.find((i) => i.key === key);
    if (item == null) return false;

    const currentLv = get().runWorkshopLevels[key];

    // delta を実数 + 合計コストに解決
    let lvDelta: number;
    let totalCost: BigNum;
    if (delta === 'max') {
      const r = calcRunWorkshopMaxLv(item, currentLv, get().screw);
      if (r.lvDelta === 0) return false;
      lvDelta = r.lvDelta;
      totalCost = r.totalCost;
    } else {
      lvDelta = delta;
      totalCost = BigNum.fromNumber(calcRunWorkshopMultiLvCost(item, currentLv, delta));
    }

    // ネジ消費は battle slice の spendScrew に委譲 (残高チェック込み)
    const spent = get().spendScrew(totalCost);
    if (!spent) return false;

    set((s) => ({
      runWorkshopLevels: {
        ...s.runWorkshopLevels,
        [key]: currentLv + lvDelta,
      },
    }));
    return true;
  },

  resetRunWorkshop: () => set({ runWorkshopLevels: defaultRunWorkshopLevels }),
});
