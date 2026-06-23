import { describe, expect, test } from 'vitest';

import {
  MAX_FRAME_GAME_SEC,
  calcFrameGameSec,
  decideTransitionReset,
  decideWaveAdvance,
  distanceFromMachine,
} from './useBattleLoop';

describe('calcFrameGameSec', () => {
  test('isPaused=true なら常に 0', () => {
    expect(calcFrameGameSec(16, true)).toBe(0);
    expect(calcFrameGameSec(100, true)).toBe(0);
  });

  test('elapsedMs を秒に変換', () => {
    expect(calcFrameGameSec(1000, false)).toBe(1);
    expect(calcFrameGameSec(16, false)).toBeCloseTo(0.016);
  });

  test('elapsedMs が過大 (タブ復帰直後) でも MAX_FRAME_GAME_SEC でクランプ', () => {
    expect(calcFrameGameSec(60_000, false)).toBe(MAX_FRAME_GAME_SEC);
    expect(calcFrameGameSec(10_000, false)).toBe(MAX_FRAME_GAME_SEC);
  });

  test('elapsedMs が負 (異常値) なら 0 にクランプ', () => {
    expect(calcFrameGameSec(-100, false)).toBe(0);
  });
});

describe('decideWaveAdvance', () => {
  test('Wave 経過時間 < durationSec → continue', () => {
    expect(decideWaveAdvance(10_000, 26, 5, 30)).toBe('continue');
  });

  test('Wave 経過時間 = durationSec → advanceWave (Tier 途中)', () => {
    expect(decideWaveAdvance(26_000, 26, 5, 30)).toBe('advanceWave');
  });

  test('Wave 経過時間 > durationSec → advanceWave (Tier 途中)', () => {
    expect(decideWaveAdvance(27_000, 26, 5, 30)).toBe('advanceWave');
  });

  test('Tier 最終 Wave (30) 終了で advanceTier', () => {
    expect(decideWaveAdvance(26_000, 26, 30, 30)).toBe('advanceTier');
  });

  test('境界: 最終 Wave 進行中は continue', () => {
    expect(decideWaveAdvance(25_999, 26, 30, 30)).toBe('continue');
  });
});

describe('decideTransitionReset', () => {
  test('変化なし: 何もリセットしない', () => {
    expect(decideTransitionReset(1, 1, 5, 5)).toEqual({
      resetElapsed: false,
      resetEnemies: false,
    });
  });

  test('Wave 切替 (同 Tier 内): 経過時間のみリセット、敵は残す', () => {
    expect(decideTransitionReset(1, 1, 5, 6)).toEqual({
      resetElapsed: true,
      resetEnemies: false,
    });
  });

  test('Tier 切替: 経過時間 + 敵リストの両方をリセット', () => {
    expect(decideTransitionReset(1, 2, 1, 1)).toEqual({
      resetElapsed: true,
      resetEnemies: true,
    });
  });

  test('Tier 切替時に Wave も同時に変わる (30→1) ケース: 両方リセット', () => {
    expect(decideTransitionReset(1, 2, 30, 1)).toEqual({
      resetElapsed: true,
      resetEnemies: true,
    });
  });
});

describe('distanceFromMachine', () => {
  test('マシン中心 (50, 50) からの距離が 0', () => {
    expect(distanceFromMachine({ x: 50, y: 50 })).toBe(0);
  });

  test('水平 40 ずれで距離 40', () => {
    expect(distanceFromMachine({ x: 90, y: 50 })).toBeCloseTo(40);
    expect(distanceFromMachine({ x: 10, y: 50 })).toBeCloseTo(40);
  });

  test('斜め (3-4-5 三角形)', () => {
    expect(distanceFromMachine({ x: 53, y: 54 })).toBeCloseTo(5);
  });
});
