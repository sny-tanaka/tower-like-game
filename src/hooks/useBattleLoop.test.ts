import { describe, expect, test } from 'vitest';

import { scaledReward } from '@/game/enemies';

import {
  KNOCKBACK_DISTANCE_PCT,
  MAX_FRAME_GAME_SEC,
  NORMAL_BOLT_DROP_CHANCE,
  applyKnockback,
  calcFrameGameSec,
  calcIntervalTicks,
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
  // 通常 wave (1〜29) は時間で advance、 最終 wave (30) はボス撃破で advance。
  // 最後の引数 enemiesCount は最終 wave で意味を持つ (通常 wave では無視)。

  test('通常 wave: 経過時間 < durationSec → continue', () => {
    expect(decideWaveAdvance(10_000, 26, 5, 30, 0)).toBe('continue');
  });

  test('通常 wave: 経過時間 = durationSec → advanceWave', () => {
    expect(decideWaveAdvance(26_000, 26, 5, 30, 0)).toBe('advanceWave');
  });

  test('通常 wave: 経過時間 > durationSec → advanceWave (残敵がいても時間で進む)', () => {
    expect(decideWaveAdvance(27_000, 26, 5, 30, 5)).toBe('advanceWave');
  });

  test('最終 wave: 時間経過 (26 秒) だけでは advanceTier しない (敵が残ってる)', () => {
    expect(decideWaveAdvance(26_000, 26, 30, 30, 1)).toBe('continue');
  });

  test('最終 wave: 経過時間 1 分でも敵 (boss) が残ってるなら continue', () => {
    expect(decideWaveAdvance(60_000, 26, 30, 30, 1)).toBe('continue');
  });

  test('最終 wave: ボススポーン時刻 (25s) 前は敵 0 でも continue (ボス未登場)', () => {
    expect(decideWaveAdvance(20_000, 26, 30, 30, 0)).toBe('continue');
  });

  test('最終 wave: ボススポーン (25s) 後で敵 0 → advanceTier', () => {
    expect(decideWaveAdvance(25_500, 26, 30, 30, 0)).toBe('advanceTier');
  });

  test('最終 wave: ボス撃破まで時間が長引いても advanceTier', () => {
    expect(decideWaveAdvance(120_000, 26, 30, 30, 0)).toBe('advanceTier');
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

describe('applyKnockback', () => {
  const center = { x: 50, y: 50 };

  test('真右 (x>50) の敵は +x 方向にノックバックする', () => {
    const next = applyKnockback({ x: 55, y: 50 }, center, 10);
    expect(next.x).toBeCloseTo(65);
    expect(next.y).toBeCloseTo(50);
  });

  test('真左 (x<50) の敵は -x 方向にノックバックする', () => {
    const next = applyKnockback({ x: 45, y: 50 }, center, 10);
    expect(next.x).toBeCloseTo(35);
    expect(next.y).toBeCloseTo(50);
  });

  test('真下 (y>50) の敵は +y 方向にノックバックする', () => {
    const next = applyKnockback({ x: 50, y: 55 }, center, 10);
    expect(next.x).toBeCloseTo(50);
    expect(next.y).toBeCloseTo(65);
  });

  test('斜め (3-4-5) の敵は単位ベクトル方向に押し戻される', () => {
    // (53, 54) は中心から (3, 4)、距離 5 → 単位 (0.6, 0.8)、 distancePct=5 で (+3, +4)
    const next = applyKnockback({ x: 53, y: 54 }, center, 5);
    expect(next.x).toBeCloseTo(56);
    expect(next.y).toBeCloseTo(58);
  });

  test('中心と完全一致の場合は右方向 (dx=1) にフォールバック', () => {
    const next = applyKnockback({ x: 50, y: 50 }, center, 5);
    expect(next.x).toBeCloseTo(55);
    expect(next.y).toBeCloseTo(50);
  });

  test('境界 (画面外への押し戻し) は 0-100 でクランプ', () => {
    const next = applyKnockback({ x: 98, y: 50 }, center, 10);
    expect(next.x).toBe(100);
    const back = applyKnockback({ x: 2, y: 50 }, center, 10);
    expect(back.x).toBe(0);
  });

  test('KNOCKBACK_DISTANCE_PCT のデフォルト = 5 で 20px 相当 (短辺 ~400px 想定)', () => {
    expect(KNOCKBACK_DISTANCE_PCT).toBe(5);
  });
});

describe('calcIntervalTicks', () => {
  // ケース 1: 1 秒未満では interval 未発火
  test('500ms 経過では ticks=0、accumulator が 500ms に増える', () => {
    const result = calcIntervalTicks(0, 0.5);
    expect(result.ticks).toBe(0);
    expect(result.nextAccumulatorMs).toBeCloseTo(500);
  });

  // ケース 2: 1 秒経過で interval が 1 回発火
  test('1000ms 経過では ticks=1、accumulator が 0ms にリセットされる', () => {
    const result = calcIntervalTicks(0, 1.0);
    expect(result.ticks).toBe(1);
    expect(result.nextAccumulatorMs).toBeCloseTo(0);
  });

  // ケース 3: 2500ms 経過で 2 回発火（端数は次フレームへ持越し）
  test('2500ms 経過では ticks=2、余り 500ms が次フレームへ持ち越される', () => {
    const result = calcIntervalTicks(0, 2.5);
    expect(result.ticks).toBe(2);
    expect(result.nextAccumulatorMs).toBeCloseTo(500);
  });

  // ケース 3 補足: 前フレームの残余 500ms + 600ms = 1100ms → 1 回発火、残余 100ms
  test('前フレームの残余 500ms + 600ms → ticks=1、残余 100ms が次フレームへ', () => {
    const result = calcIntervalTicks(500, 0.6);
    expect(result.ticks).toBe(1);
    expect(result.nextAccumulatorMs).toBeCloseTo(100);
  });

  // ケース 4: pause 中は deltaSec=0 → accumulator が増えない
  test('deltaSec=0 (pause 中) では ticks=0、accumulator が変化しない', () => {
    const result = calcIntervalTicks(500, 0);
    expect(result.ticks).toBe(0);
    expect(result.nextAccumulatorMs).toBeCloseTo(500);
  });
});

// ---------------------------------------------------------------------------
// #61: scaledReward × gainMul × dropMul の結合テスト (Refs #61)
// useBattleLoop では baseBolt × T² × boltGainMul × dropMul の順で計算する。
// 純粋関数 scaledReward を使った数値検証でドロップ計算ロジックを保護する。
// ---------------------------------------------------------------------------

describe('ボルト/超合金ドロップ計算 (scaledReward Refs #61)', () => {
  // 仕様: base × T² × gainMul × dropMul
  // calcBoltDrop のような専用エクスポートはないため、式を直接テストする。

  test('T=1 baseBolt=1 gainMul=1.0 dropMul=1 → 1（T=1 で変化なし）', () => {
    const baseBolt = 1;
    const tier = 1;
    const boltGainMul = 1.0;
    const dropMul = 1;
    const earned = scaledReward(baseBolt, tier) * boltGainMul * dropMul;
    expect(earned).toBe(1);
  });

  test('T=2 baseBolt=1 gainMul=1.0 dropMul=1 → 4（T² = 4）', () => {
    expect(scaledReward(1, 2) * 1.0 * 1).toBe(4);
  });

  test('T=5 baseBolt=2 gainMul=1.06 dropMul=1 → 2 × 25 × 1.06 = 53', () => {
    // Lv=2 時の boltGainMul = 1.0 + 0.03*2 = 1.06
    const result = scaledReward(2, 5) * 1.06 * 1;
    expect(result).toBeCloseTo(53);
  });

  test('T=10 baseBolt=10 gainMul=1.0 dropMul=2 → 10 × 100 × 1.0 × 2 = 2000', () => {
    expect(scaledReward(10, 10) * 1.0 * 2).toBe(2000);
  });

  test('T=100 boss.bolt=250 gainMul=1.0 dropMul=1 → 250 × 10000 = 2500000', () => {
    expect(scaledReward(250, 100) * 1.0 * 1).toBe(2_500_000);
  });

  test('超合金: T=3 alloyAmount=1 gainMul=1.09 dropMul=1 → 9 × 1.09 ≒ 9.81', () => {
    // alloyGainMul Lv=3: 1.0 + 0.03*3 = 1.09
    const result = scaledReward(1, 3) * 1.09 * 1;
    expect(result).toBeCloseTo(9.81);
  });

  test('超合金: boss alloyAmount=5 T=10 gainMul=1.0 dropMul=1 → 5 × 100 = 500', () => {
    expect(scaledReward(5, 10) * 1.0 * 1).toBe(500);
  });

  test('NORMAL_BOLT_DROP_CHANCE は 0.5 (通常敵は 50% 確率)', () => {
    expect(NORMAL_BOLT_DROP_CHANCE).toBe(0.5);
  });

  test('screw に scaledReward を使うと tier² スケールになるが、実装ではならない', () => {
    // screw ドロップは waveScrewFactor × tierScrewFactor を使い T² とは異なる。
    // T=2 の tierScrewFactor = 1.5^1 = 1.5 (T² = 4 とは違う)。
    // このテストはその乖離を確認するドキュメンテーションテスト。
    const tierScrewFactor = Math.pow(1.5, 2 - 1); // = 1.5
    const waveScrewFactor = 1.0;
    const baseScrew = 1;
    const screwDropT2 = Math.round(baseScrew * tierScrewFactor * waveScrewFactor);
    const boltDropT2 = scaledReward(baseScrew, 2); // = 4 (T²)
    // screw の倍率 (1.5) と T² bolt の倍率 (4) は異なる
    expect(screwDropT2).not.toBe(boltDropT2);
    expect(screwDropT2).toBe(2);
    expect(boltDropT2).toBe(4);
  });
});
