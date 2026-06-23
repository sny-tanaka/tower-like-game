import type { StateCreator } from 'zustand';

import type { RootStore } from '@/store/index';

// ---------------------------------------------------------------------------
// State
// ---------------------------------------------------------------------------

export interface SettingsState {
  bgmVolume: number; // 0.0 〜 1.0
  seVolume: number; // 0.0 〜 1.0
  vibrationEnabled: boolean;
}

// ---------------------------------------------------------------------------
// Actions
// ---------------------------------------------------------------------------

export interface SettingsActions {
  setBgmVolume: (volume: number) => void;
  setSeVolume: (volume: number) => void;
  setVibrationEnabled: (enabled: boolean) => void;
  resetSettings: () => void;
}

export type SettingsSlice = SettingsState & SettingsActions;

// ---------------------------------------------------------------------------
// Default state
// ---------------------------------------------------------------------------

export const defaultSettingsState: SettingsState = {
  bgmVolume: 0.8,
  seVolume: 0.8,
  vibrationEnabled: true,
};

// ---------------------------------------------------------------------------
// Factory
// ---------------------------------------------------------------------------

export const createSettingsSlice: StateCreator<RootStore, [], [], SettingsSlice> = (set) => ({
  ...defaultSettingsState,

  setBgmVolume: (volume) => set({ bgmVolume: Math.max(0, Math.min(1, volume)) }),

  setSeVolume: (volume) => set({ seVolume: Math.max(0, Math.min(1, volume)) }),

  setVibrationEnabled: (enabled) => set({ vibrationEnabled: enabled }),

  resetSettings: () => set(defaultSettingsState),
});
