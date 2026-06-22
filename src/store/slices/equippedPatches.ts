import type { StateCreator } from 'zustand';

import type { PatchName } from '@/data/schema';
import type { RootStore } from '@/store/index';

// ---------------------------------------------------------------------------
// State
// ---------------------------------------------------------------------------

export const MAX_PATCH_SLOTS = 6;

export interface EquippedPatchEntry {
  name: PatchName;
  tier: number;
}

export interface EquippedPatchesState {
  /** key: slotIndex (0〜5), value: { name, tier } */
  equippedPatches: Map<number, EquippedPatchEntry>;
}

// ---------------------------------------------------------------------------
// Actions
// ---------------------------------------------------------------------------

export interface EquippedPatchesActions {
  /**
   * 指定スロットにパッチを装着する。
   * 同名パッチが既に別スロットに装着されている場合は false を返す。
   */
  equipPatch: (slotIndex: number, name: PatchName, tier: number) => boolean;
  /** 指定スロットのパッチを外す */
  unequipPatch: (slotIndex: number) => void;
  /** 全スロットを空にする */
  clearEquippedPatches: () => void;
}

export type EquippedPatchesSlice = EquippedPatchesState & EquippedPatchesActions;

// ---------------------------------------------------------------------------
// Default state
// ---------------------------------------------------------------------------

export const defaultEquippedPatchesState: EquippedPatchesState = {
  equippedPatches: new Map(),
};

// ---------------------------------------------------------------------------
// Factory
// ---------------------------------------------------------------------------

export const createEquippedPatchesSlice: StateCreator<RootStore, [], [], EquippedPatchesSlice> = (
  set,
  get
) => ({
  ...defaultEquippedPatchesState,

  equipPatch: (slotIndex, name, tier) => {
    const current = get().equippedPatches;
    // 同名パッチが別スロットに既に装着されていないか確認
    for (const [idx, entry] of current) {
      if (entry.name === name && idx !== slotIndex) return false;
    }
    set((s) => {
      const next = new Map(s.equippedPatches);
      next.set(slotIndex, { name, tier });
      return { equippedPatches: next };
    });
    return true;
  },

  unequipPatch: (slotIndex) => {
    set((s) => {
      const next = new Map(s.equippedPatches);
      next.delete(slotIndex);
      return { equippedPatches: next };
    });
  },

  clearEquippedPatches: () => set({ equippedPatches: new Map() }),
});
