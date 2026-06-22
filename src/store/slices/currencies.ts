import type { StateCreator } from 'zustand';

import { BigNum } from '@/lib/bignum';
import type { RootStore } from '@/store/index';

// ---------------------------------------------------------------------------
// State
// ---------------------------------------------------------------------------

export interface CurrenciesState {
  bolt: BigNum;
  alloy: BigNum;
}

// ---------------------------------------------------------------------------
// Actions
// ---------------------------------------------------------------------------

export interface CurrenciesActions {
  addBolt: (amount: BigNum) => void;
  /** 残高不足の場合 false を返し、state は変えない */
  spendBolt: (amount: BigNum) => boolean;
  addAlloy: (amount: BigNum) => void;
  /** 残高不足の場合 false を返し、state は変えない */
  spendAlloy: (amount: BigNum) => boolean;
  resetCurrencies: () => void;
}

export type CurrenciesSlice = CurrenciesState & CurrenciesActions;

// ---------------------------------------------------------------------------
// Default state
// ---------------------------------------------------------------------------

export const defaultCurrenciesState: CurrenciesState = {
  bolt: BigNum.ZERO,
  alloy: BigNum.ZERO,
};

// ---------------------------------------------------------------------------
// Factory
// ---------------------------------------------------------------------------

export const createCurrenciesSlice: StateCreator<RootStore, [], [], CurrenciesSlice> = (
  set,
  get
) => ({
  ...defaultCurrenciesState,

  addBolt: (amount) => set((s) => ({ bolt: s.bolt.add(amount) })),

  spendBolt: (amount) => {
    const cur = get().bolt;
    if (cur.lt(amount)) return false;
    set({ bolt: cur.sub(amount) });
    return true;
  },

  addAlloy: (amount) => set((s) => ({ alloy: s.alloy.add(amount) })),

  spendAlloy: (amount) => {
    const cur = get().alloy;
    if (cur.lt(amount)) return false;
    set({ alloy: cur.sub(amount) });
    return true;
  },

  resetCurrencies: () => set({ bolt: BigNum.ZERO, alloy: BigNum.ZERO }),
});
