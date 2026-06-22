import type { StateCreator } from 'zustand';

import type { RootStore } from '@/store/index';

// ---------------------------------------------------------------------------
// State
// ---------------------------------------------------------------------------

export interface ProfileState {
  highestTier: number;
  highestWave: number;
  totalPlayTimeSec: number;
  totalRuns: number;
  totalEnemiesKilled: number;
  createdAt: number; // unix ms
  lastPlayedAt: number; // unix ms
}

// ---------------------------------------------------------------------------
// Actions
// ---------------------------------------------------------------------------

export interface ProfileActions {
  updateHighest: (tier: number, wave: number) => void;
  addPlayTimeSec: (sec: number) => void;
  incrementRuns: () => void;
  addEnemiesKilled: (count: number) => void;
  setLastPlayedAt: (ts: number) => void;
  resetProfile: (now: number) => void;
}

export type ProfileSlice = ProfileState & ProfileActions;

// ---------------------------------------------------------------------------
// Default state
// ---------------------------------------------------------------------------

export const defaultProfileState: ProfileState = {
  highestTier: 0,
  highestWave: 0,
  totalPlayTimeSec: 0,
  totalRuns: 0,
  totalEnemiesKilled: 0,
  createdAt: 0,
  lastPlayedAt: 0,
};

// ---------------------------------------------------------------------------
// Factory
// ---------------------------------------------------------------------------

export const createProfileSlice: StateCreator<RootStore, [], [], ProfileSlice> = (set) => ({
  ...defaultProfileState,

  updateHighest: (tier, wave) =>
    set((s) => {
      if (tier > s.highestTier) {
        return { highestTier: tier, highestWave: wave };
      }
      if (tier === s.highestTier) {
        return { highestWave: Math.max(s.highestWave, wave) };
      }
      // tier < s.highestTier: 更新しない
      return {};
    }),

  addPlayTimeSec: (sec) => set((s) => ({ totalPlayTimeSec: s.totalPlayTimeSec + sec })),

  incrementRuns: () => set((s) => ({ totalRuns: s.totalRuns + 1 })),

  addEnemiesKilled: (count) => set((s) => ({ totalEnemiesKilled: s.totalEnemiesKilled + count })),

  setLastPlayedAt: (ts) => set({ lastPlayedAt: ts }),

  resetProfile: (now) =>
    set({
      ...defaultProfileState,
      createdAt: now,
      lastPlayedAt: now,
    }),
});
