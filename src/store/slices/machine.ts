import type { StateCreator } from 'zustand';

import type { MachineUpgradeKey } from '@/data/schema';
import { MACHINE_UPGRADE_KEYS } from '@/data/schema';
import type { RootStore } from '@/store/index';

// ---------------------------------------------------------------------------
// State
// ---------------------------------------------------------------------------

export type MachineLevels = Record<MachineUpgradeKey, number>;

export interface MachineState {
  machineLevels: MachineLevels;
}

// ---------------------------------------------------------------------------
// Actions
// ---------------------------------------------------------------------------

export interface MachineActions {
  /** 指定キーの Lv を 1 上げる */
  incrementMachineLv: (key: MachineUpgradeKey) => void;
  /** 指定キーの Lv を直接セットする（load 時に使用） */
  setMachineLv: (key: MachineUpgradeKey, lv: number) => void;
  resetMachine: () => void;
}

export type MachineSlice = MachineState & MachineActions;

// ---------------------------------------------------------------------------
// Default state
// ---------------------------------------------------------------------------

function buildDefaultMachineLevels(): MachineLevels {
  return Object.fromEntries(MACHINE_UPGRADE_KEYS.map((k) => [k, 0])) as MachineLevels;
}

export const defaultMachineState: MachineState = {
  machineLevels: buildDefaultMachineLevels(),
};

// ---------------------------------------------------------------------------
// Factory
// ---------------------------------------------------------------------------

export const createMachineSlice: StateCreator<RootStore, [], [], MachineSlice> = (set) => ({
  ...defaultMachineState,

  incrementMachineLv: (key) =>
    set((s) => ({
      machineLevels: {
        ...s.machineLevels,
        [key]: s.machineLevels[key] + 1,
      },
    })),

  setMachineLv: (key, lv) =>
    set((s) => ({
      machineLevels: {
        ...s.machineLevels,
        [key]: lv,
      },
    })),

  resetMachine: () => set({ machineLevels: buildDefaultMachineLevels() }),
});
