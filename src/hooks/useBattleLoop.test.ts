import { describe, expect, test } from 'vitest';

import {
  MAX_FRAME_GAME_SEC,
  calcFrameGameSec,
  decideWaveAdvance,
  distanceFromMachine,
} from './useBattleLoop';

describe('calcFrameGameSec', () => {
  test('isPaused=true なら常に 0', () => {
    expect(calcFrameGameSec(16, 1, true)).toBe(0);
    expect(calcFrameGameSec(100, 3, true)).toBe(0);
  });

  test('gameSpeed=1: elapsedMs を秒に変換', () => {
    expect(calcFrameGameSec(1000, 1, false)).toBe(1);
    expect(calcFrameGameSec(16, 1, false)).toBeCloseTo(0.016);
  });

  test('gameSpeed=2 / 3 で deltaSec が倍化', () => {
    expect(calcFrameGameSec(100, 2, false)).toBeCloseTo(0.2);
    expect(calcFrameGameSec(100, 3, false)).toBeCloseTo(0.3);
  });

  test('elapsedMs が過大 (タブ復帰直後) でも MAX_FRAME_GAME_SEC でクランプ', () => {
    expect(calcFrameGameSec(60_000, 1, false)).toBe(MAX_FRAME_GAME_SEC);
    expect(calcFrameGameSec(10_000, 3, false)).toBe(MAX_FRAME_GAME_SEC);
  });

  test('elapsedMs が負 (異常値) なら 0 にクランプ', () => {
    expect(calcFrameGameSec(-100, 1, false)).toBe(0);
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
