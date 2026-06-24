import { describe, expect, test } from 'vitest';

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

import { scaledReward } from '@/game/enemies';
import { BigNum } from '@/lib/bignum';

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

  // ケース 5: 60fps (16ms × 62 フレーム) の累積端数シミュレーション
  // 16ms × 62 = 992ms → 未発火、63 枚目 = 1008ms → 1 回発火
  test('16ms × 62 フレームでは未発火、63 枚目で 1 回発火', () => {
    const frameSec = 16 / 1000; // 0.016 秒
    let acc = 0;
    let totalTicks = 0;
    for (let i = 0; i < 62; i++) {
      const r = calcIntervalTicks(acc, frameSec);
      totalTicks += r.ticks;
      acc = r.nextAccumulatorMs;
    }
    expect(totalTicks).toBe(0);
    // 63 枚目で閾値超え
    const r63 = calcIntervalTicks(acc, frameSec);
    totalTicks += r63.ticks;
    expect(totalTicks).toBe(1);
    // 残余は 63 * 16 - 1000 = 8ms
    expect(r63.nextAccumulatorMs).toBeCloseTo(63 * 16 - 1000, 5);
  });

  // ケース 6: カスタム thresholdMs — 500ms 間隔で 3 回発火
  test('thresholdMs=500 で 1700ms 経過 → ticks=3、残余 200ms', () => {
    const result = calcIntervalTicks(0, 1.7, 500);
    expect(result.ticks).toBe(3);
    expect(result.nextAccumulatorMs).toBeCloseTo(200);
  });

  // ケース 7: 3 フレームにわたる連続シミュレーション
  // f1: 400ms → acc=400, ticks=0
  // f2: 400ms → acc=800, ticks=0
  // f3: 400ms → 合計 1200ms → ticks=1, 残余 200ms
  test('連続 3 フレーム (各 400ms) で合計 1200ms → ticks=1、残余 200ms', () => {
    let acc = 0;
    let totalTicks = 0;
    for (let i = 0; i < 3; i++) {
      const r = calcIntervalTicks(acc, 0.4);
      totalTicks += r.ticks;
      acc = r.nextAccumulatorMs;
    }
    expect(totalTicks).toBe(1);
    expect(acc).toBeCloseTo(200);
  });

  // ケース 8: 境界値 — accumulator=999ms + 1ms で ticks=1、残余 0ms
  test('accumulator=999 + deltaSec=0.001 (1ms) → ticks=1、残余 0ms', () => {
    const result = calcIntervalTicks(999, 0.001);
    expect(result.ticks).toBe(1);
    expect(result.nextAccumulatorMs).toBeCloseTo(0);
  });

  // ケース 9: MAX_FRAME_GAME_SEC=1.0 クランプ後の最大 deltaSec で ticks=1
  // accumulator=0 から deltaSec=1.0 → ticks=1（複数発火は起きない）
  test('deltaSec=1.0 (最大クランプ後) + acc=0 → ticks=1', () => {
    const result = calcIntervalTicks(0, 1.0);
    expect(result.ticks).toBe(1);
  });
});

// ---------------------------------------------------------------------------
// HP リジェネ天井丸めバグ回帰防止 (BigNum × deltaSec で 60FPS で +60 倍暴走)
//
// commit 38ea50b 以前のバグ: hpRegen(1).mulNumber(0.0167) = 1 (BigNum 天井丸め)
//   → 60FPS で毎フレーム +1 = +60HP/秒の暴走リジェネ
// 修正: calcIntervalTicks 方式で 1 秒境界を検出し、 hpRegen.mulInt(ticks) で加算
//   → 60 フレーム経過で 1 回発火 = +1HP/秒 (仕様通り)
//
// useBattleLoop の rAF 統合テストは複雑なので、 同じ累積パターンで totalHpRegen を
// 数値計算して「60 倍にならず仕様通りの値になる」 ことを担保する。
// ---------------------------------------------------------------------------

describe('HP リジェネ天井丸めバグ 回帰防止', () => {
  test('旧バグ反証: BigNum(1).mulNumber(1/60) は天井丸めで 1 になる (使ってはいけない)', () => {
    // この特性により旧実装 hpRegen.mulNumber(deltaSec) は毎フレーム +1 で暴走する。
    // 本テストは「mulNumber × deltaSec パターン」 がコードに復活したら気付くための明示的アサーション。
    expect(
      BigNum.fromNumber(1)
        .mulNumber(1 / 60)
        .toString()
    ).toBe('1');
  });

  test('旧バグ再現: 60 フレーム mulNumber(deltaSec) 加算は +60 HP の暴走になる (仕様の 60 倍)', () => {
    const hpRegen = BigNum.fromNumber(1);
    let acc = BigNum.ZERO;
    for (let i = 0; i < 60; i++) {
      acc = acc.add(hpRegen.mulNumber(1 / 60)); // ← 旧バグの計算式
    }
    expect(acc.toString()).toBe('60'); // 仕様は +1 HP/秒のはずが +60 になる
  });

  test('新実装: calcIntervalTicks + mulInt(ticks) で 60 フレームでは ticks=0 → +0 HP (1 秒未到達)', () => {
    // 16.67ms × 60 = 999.99ms (< 1000ms) なので 1 秒境界に未到達、 加算は 0
    const hpRegen = BigNum.fromNumber(1);
    let accMs = 0;
    let totalRegen = BigNum.ZERO;
    for (let i = 0; i < 60; i++) {
      const r = calcIntervalTicks(accMs, 1 / 60);
      accMs = r.nextAccumulatorMs;
      if (r.ticks > 0) totalRegen = totalRegen.add(hpRegen.mulInt(r.ticks));
    }
    expect(totalRegen.toString()).toBe('0');
  });

  test('新実装: 61 フレーム (≈ 1.017 秒) で 1 秒到達 → +1 HP (仕様通り)', () => {
    const hpRegen = BigNum.fromNumber(1);
    let accMs = 0;
    let totalRegen = BigNum.ZERO;
    for (let i = 0; i < 61; i++) {
      const r = calcIntervalTicks(accMs, 1 / 60);
      accMs = r.nextAccumulatorMs;
      if (r.ticks > 0) totalRegen = totalRegen.add(hpRegen.mulInt(r.ticks));
    }
    expect(totalRegen.toString()).toBe('1');
  });

  test('新実装: hpRegen=5 で 1 秒経過 (deltaSec=1.0 一発) → +5 HP', () => {
    const hpRegen = BigNum.fromNumber(5);
    const { ticks } = calcIntervalTicks(0, 1.0);
    expect(hpRegen.mulInt(ticks).toString()).toBe('5');
  });

  test('新実装: 2 秒分 deltaSec=1 を 2 回 → +2 HP 累積 (累積 accumulator が正常動作)', () => {
    const hpRegen = BigNum.fromNumber(1);
    let accMs = 0;
    let totalRegen = BigNum.ZERO;
    for (let i = 0; i < 2; i++) {
      const r = calcIntervalTicks(accMs, 1.0);
      accMs = r.nextAccumulatorMs;
      if (r.ticks > 0) totalRegen = totalRegen.add(hpRegen.mulInt(r.ticks));
    }
    expect(totalRegen.toString()).toBe('2');
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
