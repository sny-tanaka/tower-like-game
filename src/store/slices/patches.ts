import type { StateCreator } from 'zustand';

import type { PatchName } from '@/data/schema';
import type { RootStore } from '@/store/index';

// ---------------------------------------------------------------------------
// Internal key helper
// ---------------------------------------------------------------------------

/** patches Map のキー: `${name}#${tier}` */
export function patchKey(name: PatchName, tier: number): string {
  return `${name}#${tier}`;
}

// ---------------------------------------------------------------------------
// State
// ---------------------------------------------------------------------------

export interface PatchEntry {
  name: PatchName;
  tier: number;
  count: number;
}

export interface PatchesState {
  /** key: `${name}#${tier}`, value: { name, tier, count } */
  patches: Map<string, PatchEntry>;
}

// ---------------------------------------------------------------------------
// Actions
// ---------------------------------------------------------------------------

export interface PatchesActions {
  /** 指定パッチを count 分追加する */
  addPatch: (name: PatchName, tier: number, count?: number) => void;
  /**
   * 指定パッチを count 分消費する。
   * 在庫不足の場合は false を返し、state は変えない。
   */
  consumePatch: (name: PatchName, tier: number, count?: number) => boolean;
  /** 在庫 0 のエントリを削除して整理する */
  pruneEmptyPatches: () => void;
  /** 全パッチを初期化 */
  resetPatches: () => void;
}

export type PatchesSlice = PatchesState & PatchesActions;

// ---------------------------------------------------------------------------
// Default state
// ---------------------------------------------------------------------------

export const defaultPatchesState: PatchesState = {
  patches: new Map(),
};

// ---------------------------------------------------------------------------
// Factory
// ---------------------------------------------------------------------------

export const createPatchesSlice: StateCreator<RootStore, [], [], PatchesSlice> = (set, get) => ({
  ...defaultPatchesState,

  addPatch: (name, tier, count = 1) => {
    const key = patchKey(name, tier);
    set((s) => {
      const next = new Map(s.patches);
      const existing = next.get(key);
      if (existing) {
        next.set(key, { ...existing, count: existing.count + count });
      } else {
        next.set(key, { name, tier, count });
      }
      return { patches: next };
    });
  },

  consumePatch: (name, tier, count = 1) => {
    const key = patchKey(name, tier);
    const existing = get().patches.get(key);
    if (!existing || existing.count < count) return false;
    set((s) => {
      const next = new Map(s.patches);
      const entry = next.get(key);
      if (!entry) return {};
      const newCount = entry.count - count;
      if (newCount <= 0) {
        next.delete(key);
      } else {
        next.set(key, { ...entry, count: newCount });
      }
      return { patches: next };
    });
    return true;
  },

  pruneEmptyPatches: () => {
    set((s) => {
      const next = new Map(s.patches);
      for (const [key, entry] of next) {
        if (entry.count <= 0) next.delete(key);
      }
      return { patches: next };
    });
  },

  resetPatches: () => set({ patches: new Map() }),
});
