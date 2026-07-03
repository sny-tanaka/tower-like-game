import type { StateCreator } from 'zustand';

import { TARGET_FPS_OPTIONS, type TargetFps } from '@/data/schema';
import type { RootStore } from '@/store/index';

// ---------------------------------------------------------------------------
// State
// ---------------------------------------------------------------------------

export interface SettingsState {
  bgmVolume: number; // 0.0 〜 1.0
  seVolume: number; // 0.0 〜 1.0
  muted: boolean;
  /** 描画 fps の上限。 30 / 45 / 60 から選択 (発熱対策) */
  targetFps: TargetFps;
  /**
   * 診断モード (v1.4.8)。 ON で戦闘中に DiagnosticsOverlay (FPS / 敵数 / Fx イベント数 /
   * DOM ノード数 / JS ヒープ) を表示する。 デフォルト false。
   * クラッシュ検知・スナップショット記録自体はこのフラグに関わらず常時動作する。
   */
  diagnosticsEnabled: boolean;
}

// ---------------------------------------------------------------------------
// Actions
// ---------------------------------------------------------------------------

export interface SettingsActions {
  setBgmVolume: (volume: number) => void;
  setSeVolume: (volume: number) => void;
  setMuted: (muted: boolean) => void;
  setTargetFps: (fps: TargetFps) => void;
  setDiagnosticsEnabled: (enabled: boolean) => void;
  resetSettings: () => void;
}

export type SettingsSlice = SettingsState & SettingsActions;

// ---------------------------------------------------------------------------
// Default state
// ---------------------------------------------------------------------------

export const defaultSettingsState: SettingsState = {
  bgmVolume: 0.8,
  seVolume: 0.8,
  muted: false,
  targetFps: 60,
  diagnosticsEnabled: false,
};

// ---------------------------------------------------------------------------
// Factory
// ---------------------------------------------------------------------------

export const createSettingsSlice: StateCreator<RootStore, [], [], SettingsSlice> = (set) => ({
  ...defaultSettingsState,

  setBgmVolume: (volume) => set({ bgmVolume: Math.max(0, Math.min(1, volume)) }),

  setSeVolume: (volume) => set({ seVolume: Math.max(0, Math.min(1, volume)) }),

  setMuted: (muted) => set({ muted }),

  setTargetFps: (fps) => {
    // 想定外の値が来た場合は無視 (型ガード)
    if (!TARGET_FPS_OPTIONS.includes(fps)) return;
    set({ targetFps: fps });
  },

  setDiagnosticsEnabled: (enabled) => set({ diagnosticsEnabled: enabled }),

  resetSettings: () => set(defaultSettingsState),
});
