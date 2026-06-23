import type { StateCreator } from 'zustand';

import type { RootStore } from '@/store/index';

// ---------------------------------------------------------------------------
// State
// ---------------------------------------------------------------------------

export type WeaponType = 'laser' | 'cannon' | 'thunder' | 'cutter';

export interface WeaponsState {
  weaponLv: number;
  initialWeapon: WeaponType;
}

// ---------------------------------------------------------------------------
// Actions
// ---------------------------------------------------------------------------

export interface WeaponsActions {
  incrementWeaponLv: () => void;
  setWeaponLv: (lv: number) => void;
  setInitialWeapon: (weapon: WeaponType) => void;
  resetWeapons: () => void;
}

export type WeaponsSlice = WeaponsState & WeaponsActions;

// ---------------------------------------------------------------------------
// Default state
// ---------------------------------------------------------------------------

export const defaultWeaponsState: WeaponsState = {
  weaponLv: 0,
  initialWeapon: 'laser',
};

// ---------------------------------------------------------------------------
// Factory
// ---------------------------------------------------------------------------

export const createWeaponsSlice: StateCreator<RootStore, [], [], WeaponsSlice> = (set) => ({
  ...defaultWeaponsState,

  incrementWeaponLv: () => set((s) => ({ weaponLv: s.weaponLv + 1 })),

  setWeaponLv: (lv) => set({ weaponLv: lv }),

  setInitialWeapon: (weapon) => set({ initialWeapon: weapon }),

  resetWeapons: () => set(defaultWeaponsState),
});
