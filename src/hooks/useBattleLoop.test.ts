import { describe, expect, test } from 'vitest';

import { MAX_FRAME_GAME_SEC, calcFrameGameSec } from './useBattleLoop';

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
