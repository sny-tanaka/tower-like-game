import { create } from 'zustand';

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
import { createSettingsSlice } from '@/store/slices/settings';
import type { SettingsSlice } from '@/store/slices/settings';
import { createWeaponsSlice } from '@/store/slices/weapons';
import type { WeaponsSlice } from '@/store/slices/weapons';

// ---------------------------------------------------------------------------
// RootStore
// ---------------------------------------------------------------------------

export type RootStore = ProfileSlice &
  CurrenciesSlice &
  MachineSlice &
  WeaponsSlice &
  PatchesSlice &
  EquippedPatchesSlice &
  SettingsSlice &
  BattleSlice;

// ---------------------------------------------------------------------------
// useStore
// ---------------------------------------------------------------------------

export const useStore = create<RootStore>()((...a) => ({
  ...createProfileSlice(...a),
  ...createCurrenciesSlice(...a),
  ...createMachineSlice(...a),
  ...createWeaponsSlice(...a),
  ...createPatchesSlice(...a),
  ...createEquippedPatchesSlice(...a),
  ...createSettingsSlice(...a),
  ...createBattleSlice(...a),
}));
