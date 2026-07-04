import { describe, expect, test } from 'vitest';

import {
  DAMAGE_EVENT_MAX_AGE_MS,
  DAMAGE_EVENT_MAX_COUNT,
  KNOCKBACK_DISTANCE_PCT,
  MACHINE_CENTER_X,
  MACHINE_CENTER_Y,
  MAX_FRAME_GAME_SEC,
  MAX_RENDERED_ENEMIES,
  NORMAL_BOLT_DROP_CHANCE,
  admitEventsWithCap,
  applyBurnToEnemy,
  applyFreezeToEnemy,
  applyKnockback,
  calcFrameGameSec,
  calcIntervalTicks,
  decideTransitionReset,
  decideWaveAdvance,
  distanceFromMachine,
  frameIntervalMs,
  getEffectiveEnemyAtk,
  selectVisibleEnemyIds,
  shouldDrawFrame,
  sweepExpiredEvents,
} from './useBattleLoop';

import { scaledReward } from '@/game/enemies';
import { BattleEntityStore } from '@/game/store/BattleEntityStore';
import { MutableEnemy } from '@/game/types';
import type { SpawnedEnemyInit } from '@/game/types';
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

describe('frameIntervalMs / shouldDrawFrame (FPS キャップ)', () => {
  test('frameIntervalMs: 30/45/60 → 1000/fps', () => {
    expect(frameIntervalMs(30)).toBeCloseTo(1000 / 30);
    expect(frameIntervalMs(45)).toBeCloseTo(1000 / 45);
    expect(frameIntervalMs(60)).toBeCloseTo(1000 / 60);
  });

  test('targetFps=30: 閾値 (~33.33ms) を境にスキップ/描画', () => {
    expect(shouldDrawFrame(0, 30)).toBe(false);
    expect(shouldDrawFrame(16, 30)).toBe(false); // 60Hz 1 フレーム相当: スキップ
    expect(shouldDrawFrame(33.3, 30)).toBe(false);
    expect(shouldDrawFrame(33.34, 30)).toBe(true);
    expect(shouldDrawFrame(100, 30)).toBe(true);
  });

  test('targetFps=45: 閾値 (~22.22ms) を境にスキップ/描画', () => {
    expect(shouldDrawFrame(16, 45)).toBe(false); // 60Hz 1 フレーム: スキップ (45fps なので 22ms 待つ)
    expect(shouldDrawFrame(22.2, 45)).toBe(false);
    expect(shouldDrawFrame(22.3, 45)).toBe(true);
    expect(shouldDrawFrame(33.4, 45)).toBe(true);
  });

  test('targetFps=60: 閾値 (~16.67ms) を境にスキップ/描画', () => {
    expect(shouldDrawFrame(0, 60)).toBe(false);
    expect(shouldDrawFrame(16, 60)).toBe(false);
    expect(shouldDrawFrame(16.67, 60)).toBe(true);
    expect(shouldDrawFrame(33.4, 60)).toBe(true);
  });

  test('タブ復帰直後のような巨大 elapsedMs はどの fps でも描画する (= 即 catch-up)', () => {
    // この後 calcFrameGameSec が MAX_FRAME_GAME_SEC でクランプして暴走を防ぐ
    expect(shouldDrawFrame(60_000, 30)).toBe(true);
    expect(shouldDrawFrame(60_000, 45)).toBe(true);
    expect(shouldDrawFrame(60_000, 60)).toBe(true);
  });
});

describe('decideWaveAdvance', () => {
  // 通常 wave (1〜29) は時間で advance、 最終 wave (30) はボス撃破で advance。
  // 最後の引数 bossAlive は最終 wave で意味を持つ (通常 wave では無視)。
  // 通常敵の生存有無は判定に関与しない (仕様: ボス撃破で Victory)。

  test('通常 wave: 経過時間 < durationSec → continue', () => {
    expect(decideWaveAdvance(10_000, 26, 5, 30, false)).toBe('continue');
  });

  test('通常 wave: 経過時間 = durationSec → advanceWave', () => {
    expect(decideWaveAdvance(26_000, 26, 5, 30, false)).toBe('advanceWave');
  });

  test('通常 wave: 経過時間 > durationSec → advanceWave (敵が残っていても時間で進む)', () => {
    expect(decideWaveAdvance(27_000, 26, 5, 30, true)).toBe('advanceWave');
  });

  test('最終 wave: 時間経過 (26 秒) だけでは advanceTier しない (ボス生存)', () => {
    expect(decideWaveAdvance(26_000, 26, 30, 30, true)).toBe('continue');
  });

  test('最終 wave: 経過時間 1 分でもボスが残ってるなら continue', () => {
    expect(decideWaveAdvance(60_000, 26, 30, 30, true)).toBe('continue');
  });

  test('最終 wave: ボススポーン時刻 (25s) 前は bossAlive=false でも continue (まだ未登場)', () => {
    expect(decideWaveAdvance(20_000, 26, 30, 30, false)).toBe('continue');
  });

  test('最終 wave: ボススポーン (25s) 後でボス不在 → advanceTier', () => {
    expect(decideWaveAdvance(25_500, 26, 30, 30, false)).toBe('advanceTier');
  });

  test('最終 wave: ボス撃破まで時間が長引いても advanceTier', () => {
    expect(decideWaveAdvance(120_000, 26, 30, 30, false)).toBe('advanceTier');
  });

  // BUG-W30-1 regression:
  // 通常敵が残っていてもボス撃破で advanceTier に進むこと。 旧実装は enemiesCount===0
  // 必須だったため、 通常敵がスポーン後撃破前であってもクリアにならなかった。
  test('最終 wave: 通常敵が残っていてもボス不在なら advanceTier', () => {
    // bossAlive=false で advanceTier。 通常敵の生存有無は引数で表現されない (= 関与しない)
    expect(decideWaveAdvance(30_000, 26, 30, 30, false)).toBe('advanceTier');
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

  // Refs #81 補強: 2.5 秒経過 (1 発) で 2 ticks + 500ms 持越し
  test('新実装: deltaSec=2.5 一発で ticks=2 + accumulator=500ms 持越し', () => {
    const result = calcIntervalTicks(0, 2.5);
    expect(result.ticks).toBe(2);
    expect(result.nextAccumulatorMs).toBe(500);
  });

  // Refs #81 補強: 0.5 秒経過 (1 発) では加算されない
  test('新実装: deltaSec=0.5 (1 発) では加算されない (1 秒未到達)', () => {
    const result = calcIntervalTicks(0, 0.5);
    expect(result.ticks).toBe(0);
    expect(result.nextAccumulatorMs).toBe(500);
  });

  // Refs #81 補強: 持越しと次フレーム加算で「持越し + deltaSec ≥ 1000ms」 → 発火
  test('新実装: 500ms 持越し + 0.5 秒 deltaSec → ticks=1 + accumulator=0 (持越しが効く)', () => {
    const result = calcIntervalTicks(500, 0.5);
    expect(result.ticks).toBe(1);
    expect(result.nextAccumulatorMs).toBe(0);
  });
});

// ---------------------------------------------------------------------------
// #61: scaledReward × gainMul × dropMul の結合テスト (Refs #61)
// useBattleLoop では baseBolt × scaledReward × boltGainMul × dropMul の順で計算する。
// 純粋関数 scaledReward を使った数値検証でドロップ計算ロジックを保護する。
// スケール式は hybrid (T ≤ 3: T², T ≥ 4: 9 × 2.25^(T-3))。
// ---------------------------------------------------------------------------

describe('ボルト/超合金ドロップ計算 (scaledReward Refs #61)', () => {
  // 仕様: base × scaledReward(T) × gainMul × dropMul
  // calcBoltDrop のような専用エクスポートはないため、式を直接テストする。

  test('T=1 baseBolt=1 gainMul=1.0 dropMul=1 → 1（T=1 で変化なし）', () => {
    const baseBolt = 1;
    const tier = 1;
    const boltGainMul = 1.0;
    const dropMul = 1;
    const earned = scaledReward(baseBolt, tier) * boltGainMul * dropMul;
    expect(earned).toBe(1);
  });

  test('T=2 baseBolt=1 gainMul=1.0 dropMul=1 → 4（T² ブランチ）', () => {
    expect(scaledReward(1, 2) * 1.0 * 1).toBe(4);
  });

  test('T=5 baseBolt=2 gainMul=1.06 dropMul=1 → 2 × 45.5625 × 1.06 ≒ 96.59', () => {
    // Lv=2 時の boltGainMul = 1.0 + 0.03*2 = 1.06
    // T=5 は指数ブランチ: 9 × 2.25^2 = 45.5625
    const result = scaledReward(2, 5) * 1.06 * 1;
    expect(result).toBeCloseTo(2 * 45.5625 * 1.06);
  });

  test('T=10 baseBolt=10 gainMul=1.0 dropMul=2 → 10 × (9 × 2.25^7) × 2', () => {
    const expected = 10 * 9 * Math.pow(2.25, 7) * 2;
    expect(scaledReward(10, 10) * 1.0 * 2).toBeCloseTo(expected, 4);
  });

  test('T=20 boss.bolt=250 gainMul=1.0 dropMul=1 → 250 × (9 × 2.25^17)', () => {
    // 実プレイで届きうる高 Tier の代表値 (T=100 は非現実的なので T=20 に変更)。
    const expected = 250 * 9 * Math.pow(2.25, 17);
    expect(scaledReward(250, 20) * 1.0 * 1).toBeCloseTo(expected, 0);
  });

  test('超合金: T=3 alloyAmount=1 gainMul=1.09 dropMul=1 → 9 × 1.09 ≒ 9.81', () => {
    // alloyGainMul Lv=3: 1.0 + 0.03*3 = 1.09
    // T=3 は T² ブランチで変化なし。
    const result = scaledReward(1, 3) * 1.09 * 1;
    expect(result).toBeCloseTo(9.81);
  });

  test('超合金: boss alloyAmount=5 T=10 gainMul=1.0 dropMul=1 → 5 × (9 × 2.25^7)', () => {
    const expected = 5 * 9 * Math.pow(2.25, 7);
    expect(scaledReward(5, 10) * 1.0 * 1).toBeCloseTo(expected, 6);
  });

  test('NORMAL_BOLT_DROP_CHANCE は 0.5 (通常敵は 50% 確率)', () => {
    expect(NORMAL_BOLT_DROP_CHANCE).toBe(0.5);
  });

  test('screw に scaledReward を使うと bolt スケールになるが、実装ではならない', () => {
    // screw ドロップは waveScrewFactor × tierScrewFactor を使い bolt/alloy とは異なる。
    // T=2 の tierScrewFactor = 1.5^1 = 1.5 (bolt の T²=4 とは違う)。
    // このテストはその乖離を確認するドキュメンテーションテスト。
    const tierScrewFactor = Math.pow(1.5, 2 - 1); // = 1.5
    const waveScrewFactor = 1.0;
    const baseScrew = 1;
    const screwDropT2 = Math.round(baseScrew * tierScrewFactor * waveScrewFactor);
    const boltDropT2 = scaledReward(baseScrew, 2); // = 4 (T² ブランチ)
    expect(screwDropT2).not.toBe(boltDropT2);
    expect(screwDropT2).toBe(2);
    expect(boltDropT2).toBe(4);
  });
});

// ---------------------------------------------------------------------------
// v1.3.7 (Phase 3-C フォローアップ): useBattleLoop の tick が 1 frame で行う一連の状態
// 遷移 (敵 spawn → 移動 mark → 撃破時 removeEnemy → notifyFrame) を、 hook の外側
// (renderHook 不要の純粋シナリオ) で組み立てて、 BattleEntityStore とローカル enemiesRef 風
// 配列の最終状態を assert する統合テスト。
//
// 専門家 Phase 3-B レビューで指摘された「数 tick 回して entityStore の最終状態を assert する
// integration test を 1 件追加」 への対応。 hook 本体には useStore (zustand) や rAF が絡んで
// いて renderHook で囲うと依存が多すぎるため、 tick の **状態遷移のみ** をシナリオ化した
// 機能テストにとどめる。
// ---------------------------------------------------------------------------

function makeEnemyInit(id: string, hp: number, x = 50, y = 50): SpawnedEnemyInit {
  return {
    id,
    kind: 'normal',
    subtype: 'standard',
    speed: 1,
    reward: { screw: 1, bolt: 0, alloyChance: 0, alloyAmount: 0 },
    hitRadius: 1.03,
    spawnedAtMs: 0,
    hp: BigNum.fromNumber(hp),
    maxHp: BigNum.fromNumber(hp),
    atk: BigNum.fromNumber(10),
    position: { x, y },
  };
}

describe('useBattleLoop tick シナリオ (entityStore 統合 — Phase 3-C フォローアップ)', () => {
  test('addEnemy → 数 tick 移動 mark → 1 体撃破で removeEnemy → 最終 enemiesRef と entityStore が一致', () => {
    const entityStore = new BattleEntityStore();
    // ローカル enemiesRef 風 (useBattleLoop の enemiesRef.current 相当)
    const enemiesRef: MutableEnemy[] = [];

    // ---- tick 1: 3 体 spawn (= addEnemy + push) ----
    for (const id of ['e-1', 'e-2', 'e-3']) {
      const enemy = new MutableEnemy(makeEnemyInit(id, 100));
      enemiesRef.push(enemy);
      entityStore.addEnemy(enemy);
    }
    expect(entityStore.getEnemies()).toHaveLength(3);
    expect(entityStore.getEnemyListVersion()).toBe(3); // addEnemy ×3
    // notifyFrame は tick 末尾に 1 度。
    entityStore.notifyFrame();
    expect(entityStore.getSnapshot()).toBe(1);

    // ---- tick 2: 各敵を mutateEnemyPosition 相当で移動 + markEnemyMoved ----
    for (const enemy of enemiesRef) {
      enemy.position.x += 1;
      enemy.position.y += 1;
      entityStore.markEnemyMoved(enemy.id);
    }
    entityStore.notifyFrame();
    expect(entityStore.getSnapshot()).toBe(2);
    // mark Set は notifyFrame で空になっている。
    entityStore.markEnemyMoved('e-1');
    entityStore.notifyFrame();
    expect(entityStore.getSnapshot()).toBe(3);

    // ---- tick 3: e-2 のみ撃破 (= HP 0 + removeEnemy + survivors 詰め替え) ----
    enemiesRef[1].hp = BigNum.ZERO;
    const survivors: MutableEnemy[] = [];
    for (const enemy of enemiesRef) {
      if (enemy.hp.lte(BigNum.ZERO)) {
        entityStore.removeEnemy(enemy.id);
      } else {
        survivors.push(enemy);
      }
    }
    // enemiesRef 詰め替え (= useBattleLoop の `enemiesRef.current = survivors`)
    enemiesRef.length = 0;
    enemiesRef.push(...survivors);

    expect(enemiesRef.map((e) => e.id)).toEqual(['e-1', 'e-3']);
    expect(entityStore.getEnemies().map((e) => e.id)).toEqual(['e-1', 'e-3']);
    expect(entityStore.getEnemyById('e-2')).toBeUndefined();
    // enemyListVersion は addEnemy ×3 + removeEnemy ×1 = +4
    expect(entityStore.getEnemyListVersion()).toBe(4);
    entityStore.notifyFrame();
    expect(entityStore.getSnapshot()).toBe(4);
  });
});

// ---------------------------------------------------------------------------
// v1.4.5: iOS Safari の onAnimationEnd 未発火で events が無限成長し WKWebView が
// メモリ枯渇 → 強制リロード (プレイヤーには「戦闘中に真っ白 → タイトルに戻る」 と
// 見える) 問題への対策として時間ベース GC を追加。 本 describe はその sweep 挙動を
// 単体で検証する (Fx 完了通知に頼らず古い event が確実に消えることを保証)。
// ---------------------------------------------------------------------------
describe('sweepExpiredEvents (v1.4.5 iOS メモリ枯渇クラッシュ対策)', () => {
  type E = { id: string; x: number };

  test('全 event が maxAge 以内なら events / map どちらも変化しない', () => {
    const events: E[] = [
      { id: 'a', x: 0 },
      { id: 'b', x: 1 },
    ];
    const map = new Map([
      ['a', 900],
      ['b', 950],
    ]);
    const now = 1000;
    const maxAge = 500;
    const next = sweepExpiredEvents(events, map, now, maxAge);
    // 期限切れゼロなら参照そのまま (呼出側の React 再 render を発生させない)
    expect(next).toBe(events);
    expect(map.size).toBe(2);
  });

  test('期限切れの event は events からも map からも消える', () => {
    const events: E[] = [
      { id: 'old', x: 0 },
      { id: 'fresh', x: 1 },
    ];
    const map = new Map([
      ['old', 100], // 900ms 前 (> maxAge 500)
      ['fresh', 800], // 200ms 前 (< maxAge 500)
    ]);
    const now = 1000;
    const maxAge = 500;
    const next = sweepExpiredEvents(events, map, now, maxAge);
    expect(next.map((e) => e.id)).toEqual(['fresh']);
    expect(map.has('old')).toBe(false);
    expect(map.has('fresh')).toBe(true);
  });

  test('map に無い event (createdAt 未登録) は削除しない — 明示的期限切れのみ落とす', () => {
    // 万が一 push サイトで stamp が漏れても、 sweep は「expired と判定した ID」
    // のみを落とすため巻き添えにしない。 stamp 忘れの event は最終的に
    // onAnimationEnd → queueRemoval のパスで消える。
    const events: E[] = [
      { id: 'expired', x: 0 },
      { id: 'stamped-fresh', x: 1 },
      { id: 'unstamped', x: 2 },
    ];
    const map = new Map([
      ['expired', 0], // 1000ms 前 — 期限切れ
      ['stamped-fresh', 900], // 100ms 前 — 期限内
      // 'unstamped' は map になし
    ]);
    const now = 1000;
    const maxAge = 500;
    const next = sweepExpiredEvents(events, map, now, maxAge);
    // expired だけ落ち、 unstamped は無関係に残る
    expect(next.map((e) => e.id)).toEqual(['stamped-fresh', 'unstamped']);
    expect(map.has('expired')).toBe(false);
    expect(map.has('stamped-fresh')).toBe(true);
  });

  test('境界値: createdAt == cutoff (= now - maxAge) は残す (< 比較)', () => {
    const events: E[] = [{ id: 'boundary', x: 0 }];
    const map = new Map([['boundary', 500]]); // cutoff = 1000 - 500 = 500
    const next = sweepExpiredEvents(events, map, 1000, 500);
    expect(next).toBe(events);
    expect(map.has('boundary')).toBe(true);
  });

  test('DAMAGE_EVENT_MAX_AGE_MS (800 + 500) は 1 tick 中の damage を消さない', () => {
    // DamagePopFx の default duration=800ms より短命の想定シナリオ:
    // 生成直後の event は onAnimationEnd が正常発火するはるか前 (< 1300ms) に
    // sweep が走っても消えないことを保証。
    const events: E[] = [{ id: 'newborn', x: 0 }];
    const map = new Map([['newborn', 0]]);
    // 800ms 経過 (onAnimationEnd 期待時刻ぴったり) → まだ maxAge 内
    const next = sweepExpiredEvents(events, map, 800, DAMAGE_EVENT_MAX_AGE_MS);
    expect(next).toBe(events);
    // 1300ms 経過 (アニメ + 500ms 猶予) → まだ maxAge 境界 (== はセーフ)
    const next2 = sweepExpiredEvents(events, map, 1300, DAMAGE_EVENT_MAX_AGE_MS);
    expect(next2).toBe(events);
    // 1301ms 経過 → 期限超過で消える
    const next3 = sweepExpiredEvents(events, map, 1301, DAMAGE_EVENT_MAX_AGE_MS);
    expect(next3).toEqual([]);
  });

  test('大量の期限切れ event を一括削除できる (T5W30 相当のスパイクシナリオ)', () => {
    const events: E[] = [];
    const map = new Map<string, number>();
    // 500 個の 「期限切れ event」 (onAnimationEnd 未発火で滞留した状況)
    for (let i = 0; i < 500; i++) {
      events.push({ id: `stale-${i}`, x: i });
      map.set(`stale-${i}`, 0);
    }
    // 10 個の 「フレッシュ event」
    for (let i = 0; i < 10; i++) {
      events.push({ id: `fresh-${i}`, x: i });
      map.set(`fresh-${i}`, 5000);
    }
    const next = sweepExpiredEvents(events, map, 5100, 500);
    expect(next.length).toBe(10);
    expect(next.every((e) => e.id.startsWith('fresh-'))).toBe(true);
    expect(map.size).toBe(10);
  });
});

// ---------------------------------------------------------------------------
// v1.4.6: Fx イベント数のハードキャップ (バックプレッシャ)。 sweep GC の時間軸対策と
// 相補的に、 瞬間ピークで events 配列が肥大化するのを止める。 iOS Safari には信頼できる
// メモリ API がないため events の「見えている」 長さそのものに上限を設ける方針。
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// v1.4.8: 敵スプライトの描画キャップ (iOS メモリ枯渇対策)
// ---------------------------------------------------------------------------
describe('selectVisibleEnemyIds (v1.4.8 敵スプライト描画キャップ)', () => {
  const center = { x: MACHINE_CENTER_X, y: MACHINE_CENTER_Y };

  function makeKindedEnemy(
    id: string,
    kind: 'normal' | 'elite' | 'miniboss' | 'boss',
    x: number,
    y: number
  ): MutableEnemy {
    const init = makeEnemyInit(id, 100, x, y);
    init.kind = kind;
    return new MutableEnemy(init);
  }

  test('同時敵数が maxCount 以下なら null を返す (fast path、 全員可視)', () => {
    const enemies = Array.from({ length: MAX_RENDERED_ENEMIES }, (_, i) =>
      makeKindedEnemy(`e-${i}`, 'normal', 50, 50)
    );
    expect(selectVisibleEnemyIds(enemies, center, MAX_RENDERED_ENEMIES)).toBeNull();
  });

  test('境界値: ちょうど maxCount 体なら null (fast path)', () => {
    const enemies = Array.from({ length: 60 }, (_, i) =>
      makeKindedEnemy(`e-${i}`, 'normal', 50, 50)
    );
    expect(selectVisibleEnemyIds(enemies, center, 60)).toBeNull();
  });

  test('maxCount+1 体になった瞬間からキャップが発動する', () => {
    const enemies = Array.from({ length: 61 }, (_, i) =>
      makeKindedEnemy(`e-${i}`, 'normal', 50, 50)
    );
    const visible = selectVisibleEnemyIds(enemies, center, 60);
    expect(visible).not.toBeNull();
    expect(visible!.size).toBe(60);
  });

  test('上位敵 (elite/miniboss/boss) は距離に関わらず必ず含まれる', () => {
    const enemies: MutableEnemy[] = [
      makeKindedEnemy('boss-1', 'boss', 99, 99), // マシンから最も遠い
      makeKindedEnemy('elite-1', 'elite', 95, 95),
      makeKindedEnemy('miniboss-1', 'miniboss', 90, 90),
      ...Array.from({ length: 60 }, (_, i) => makeKindedEnemy(`normal-${i}`, 'normal', 51, 51)),
    ];
    const visible = selectVisibleEnemyIds(enemies, center, 60);
    expect(visible).not.toBeNull();
    expect(visible!.has('boss-1')).toBe(true);
    expect(visible!.has('elite-1')).toBe(true);
    expect(visible!.has('miniboss-1')).toBe(true);
    // 合計 63 体中、上位敵 3 体は必ず含まれ、残り枠 57 体を normal で埋める
    expect(visible!.size).toBe(60);
  });

  test('残り枠は center に近い順 (二乗距離) の normal 敵で埋まる', () => {
    const enemies: MutableEnemy[] = [
      makeKindedEnemy('boss-1', 'boss', 99, 99),
      // near は center に近い、 far は遠い。 near だけが残り枠に入るよう体数を調整。
      ...Array.from({ length: 3 }, (_, i) => makeKindedEnemy(`near-${i}`, 'normal', 51, 51)),
      ...Array.from({ length: 3 }, (_, i) => makeKindedEnemy(`far-${i}`, 'normal', 90, 90)),
    ];
    // maxCount=4: boss (1) + normal 残り枠 3 → near 3 体のみ採用、 far は落ちる
    const visible = selectVisibleEnemyIds(enemies, center, 4);
    expect(visible).not.toBeNull();
    expect(visible!.size).toBe(4);
    expect(visible!.has('boss-1')).toBe(true);
    expect(visible!.has('near-0')).toBe(true);
    expect(visible!.has('near-1')).toBe(true);
    expect(visible!.has('near-2')).toBe(true);
    expect(visible!.has('far-0')).toBe(false);
    expect(visible!.has('far-1')).toBe(false);
    expect(visible!.has('far-2')).toBe(false);
  });

  test('境界: 上位敵だけで maxCount を超える場合、 上位敵は全員含まれ normal は 0 体', () => {
    const enemies: MutableEnemy[] = [
      ...Array.from({ length: 5 }, (_, i) => makeKindedEnemy(`boss-${i}`, 'boss', 60, 60)),
      ...Array.from({ length: 10 }, (_, i) => makeKindedEnemy(`normal-${i}`, 'normal', 51, 51)),
    ];
    const visible = selectVisibleEnemyIds(enemies, center, 3);
    expect(visible).not.toBeNull();
    // 上位敵 5 体は maxCount(3) を超えていても全員含む
    expect(visible!.size).toBe(5);
    for (let i = 0; i < 5; i++) {
      expect(visible!.has(`boss-${i}`)).toBe(true);
    }
    for (let i = 0; i < 10; i++) {
      expect(visible!.has(`normal-${i}`)).toBe(false);
    }
  });

  test('ボス戦中にボスが非表示になることは絶対にない (大量 normal + 単一 boss)', () => {
    const enemies: MutableEnemy[] = [
      makeKindedEnemy('the-boss', 'boss', 50, 95), // やや遠い位置
      ...Array.from({ length: 200 }, (_, i) => makeKindedEnemy(`normal-${i}`, 'normal', 51, 51)),
    ];
    const visible = selectVisibleEnemyIds(enemies, center, 60);
    expect(visible).not.toBeNull();
    expect(visible!.has('the-boss')).toBe(true);
  });

  test('元の enemies 配列 / enemy オブジェクトを変更しない (副作用フリー)', () => {
    const enemies = Array.from({ length: 65 }, (_, i) =>
      makeKindedEnemy(`e-${i}`, 'normal', 50, 50)
    );
    const snapshot = enemies.map((e) => ({ x: e.position.x, y: e.position.y }));
    selectVisibleEnemyIds(enemies, center, 60);
    enemies.forEach((e, i) => {
      expect(e.position.x).toBe(snapshot[i].x);
      expect(e.position.y).toBe(snapshot[i].y);
    });
    expect(enemies).toHaveLength(65);
  });
});

describe('admitEventsWithCap (v1.4.6 Fx バックプレッシャ)', () => {
  type E = { id: string; x: number };

  test('空 incoming は既存参照をそのまま返す (no-op)', () => {
    const existing: E[] = [{ id: 'a', x: 0 }];
    const map = new Map<string, number>();
    const next = admitEventsWithCap(existing, [], map, 1000, 10);
    expect(next).toBe(existing);
    expect(map.size).toBe(0);
  });

  test('余裕十分なら全 event を admit + stamp する', () => {
    const existing: E[] = [{ id: 'a', x: 0 }];
    const incoming: E[] = [
      { id: 'b', x: 1 },
      { id: 'c', x: 2 },
    ];
    const map = new Map<string, number>();
    const next = admitEventsWithCap(existing, incoming, map, 1234, 10);
    expect(next.map((e) => e.id)).toEqual(['a', 'b', 'c']);
    expect(map.get('b')).toBe(1234);
    expect(map.get('c')).toBe(1234);
    // 既存 event は stamp しない (呼出側が push サイトで stamp 済み)
    expect(map.has('a')).toBe(false);
  });

  test('残スロット未満だけ admit、 溢れた分は捨てる', () => {
    const existing: E[] = new Array(148).fill(null).map((_, i) => ({ id: `old-${i}`, x: 0 }));
    const incoming: E[] = [
      { id: 'new-1', x: 0 },
      { id: 'new-2', x: 0 },
      { id: 'new-3', x: 0 }, // 溢れる分 (150 上限 - 148 = 2 slot、 3 個目は捨て)
      { id: 'new-4', x: 0 },
    ];
    const map = new Map<string, number>();
    const next = admitEventsWithCap(existing, incoming, map, 100, 150);
    expect(next.length).toBe(150);
    expect(next[148]!.id).toBe('new-1');
    expect(next[149]!.id).toBe('new-2');
    // 溢れた分は map にも入れない
    expect(map.has('new-3')).toBe(false);
    expect(map.has('new-4')).toBe(false);
  });

  test('既存が既に満杯なら既存参照をそのまま返す (割り込み無効)', () => {
    const existing: E[] = new Array(150).fill(null).map((_, i) => ({ id: `x-${i}`, x: 0 }));
    const incoming: E[] = [{ id: 'blocked', x: 0 }];
    const map = new Map<string, number>();
    const next = admitEventsWithCap(existing, incoming, map, 100, 150);
    expect(next).toBe(existing);
    expect(map.size).toBe(0);
  });

  test('DAMAGE_EVENT_MAX_COUNT (150) は Fx が溢れた瞬間に新規を止める', () => {
    // T5W30 相当のシナリオ: 60fps × 800ms アニメで理論最大 48 個。
    // クリティカル + アクティブスキル同時発動で瞬間ピークが跳ねても 150 未満に
    // 収まるのが正常プレイ。 これを超えたら onAnimationEnd が落ちている合図なので
    // 新規を止めて配列が無限成長 → メモリ枯渇 → タイトル復帰、 を防ぐ。
    const existing: E[] = new Array(DAMAGE_EVENT_MAX_COUNT)
      .fill(null)
      .map((_, i) => ({ id: `stuck-${i}`, x: 0 }));
    const incoming: E[] = [{ id: 'newHit', x: 0 }];
    const map = new Map<string, number>();
    const next = admitEventsWithCap(existing, incoming, map, 100, DAMAGE_EVENT_MAX_COUNT);
    expect(next.length).toBe(DAMAGE_EVENT_MAX_COUNT);
    expect(map.has('newHit')).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// v1.5.0: applyFreezeToEnemy / applyBurnToEnemy (敵オブジェクトへの状態異常付与)
// ---------------------------------------------------------------------------

describe('applyFreezeToEnemy (design-docs/15-balance-v1.5.0.md §2.2 凍結耐性)', () => {
  test('免疫なしの敵に凍結を付与 → frozenUntilMs / freezeImmuneUntilMs が設定される', () => {
    const enemy = new MutableEnemy(makeEnemyInit('e1', 100));
    applyFreezeToEnemy(enemy, 2, 0);
    expect(enemy.frozenUntilMs).toBe(2000);
    expect(enemy.freezeImmuneUntilMs).toBe(2000 + 2 * 2 * 1000);
  });

  test('免疫中の敵には付与されない (frozenUntilMs は変化しない)', () => {
    const enemy = new MutableEnemy(makeEnemyInit('e1', 100));
    enemy.freezeImmuneUntilMs = 5000;
    applyFreezeToEnemy(enemy, 2, 1000); // nowGameMs=1000 < 5000 → 免疫中
    expect(enemy.frozenUntilMs).toBeUndefined();
  });

  test('上位敵 (elite/miniboss/boss) は凍結時間が半減する', () => {
    const bossInit = { ...makeEnemyInit('boss1', 1000), kind: 'boss' as const, subtype: undefined };
    const boss = new MutableEnemy(bossInit);
    applyFreezeToEnemy(boss, 2, 0);
    expect(boss.frozenUntilMs).toBe(1000); // 2*0.5*1000
  });

  test('凍結の重ねがけ不可: 既存の frozenUntilMs より短くても新規上書きされる', () => {
    const enemy = new MutableEnemy(makeEnemyInit('e1', 100));
    enemy.frozenUntilMs = 99999; // 旧仕様なら Math.max で維持されていた高い値
    applyFreezeToEnemy(enemy, 1, 0);
    // 新規上書きなので 99999 ではなく 1000 になる
    expect(enemy.frozenUntilMs).toBe(1000);
  });

  test('免疫期限ちょうど経過後は再度付与できる', () => {
    const enemy = new MutableEnemy(makeEnemyInit('e1', 100));
    enemy.freezeImmuneUntilMs = 1000;
    applyFreezeToEnemy(enemy, 2, 1000); // nowGameMs === freezeImmuneUntilMs → 免疫終了
    expect(enemy.frozenUntilMs).toBe(1000 + 2000);
  });
});

describe('applyBurnToEnemy', () => {
  test('未燃焼の敵に燃焼を付与 → burnUntilMs / burnPerSec / burnAccumulatorMs=0', () => {
    const enemy = new MutableEnemy(makeEnemyInit('e1', 100));
    applyBurnToEnemy(enemy, 2, 0.3, BigNum.fromNumber(100), 0);
    expect(enemy.burnUntilMs).toBe(2000);
    expect(enemy.burnPerSec?.toString()).toBe('30');
    expect(enemy.burnAccumulatorMs).toBe(0);
  });

  test('既に燃焼中: 期限は長い方を採用', () => {
    const enemy = new MutableEnemy(makeEnemyInit('e1', 100));
    enemy.burnUntilMs = 5000;
    enemy.burnPerSec = BigNum.fromNumber(10);
    applyBurnToEnemy(enemy, 1, 0.3, BigNum.fromNumber(100), 0); // newBurnUntil=1000 < 5000
    expect(enemy.burnUntilMs).toBe(5000);
  });

  test('既に燃焼中: burnPerSec は強い方を採用', () => {
    const enemy = new MutableEnemy(makeEnemyInit('e1', 100));
    enemy.burnUntilMs = 500;
    enemy.burnPerSec = BigNum.fromNumber(50);
    applyBurnToEnemy(enemy, 5, 0.3, BigNum.fromNumber(100), 0); // newBurnPerSec=30 < 50
    expect(enemy.burnPerSec?.toString()).toBe('50');
  });

  test('新規燃焼開始時のみ burnAccumulatorMs を 0 リセット (継続中は触らない)', () => {
    const enemy = new MutableEnemy(makeEnemyInit('e1', 100));
    enemy.burnUntilMs = 5000;
    enemy.burnPerSec = BigNum.fromNumber(10);
    enemy.burnAccumulatorMs = 500;
    applyBurnToEnemy(enemy, 1, 0.3, BigNum.fromNumber(100), 0);
    expect(enemy.burnAccumulatorMs).toBe(500);
  });

  test('burnDotFraction が新仕様の係数 (30+3×T)% を反映する', () => {
    const enemy = new MutableEnemy(makeEnemyInit('e1', 100));
    // T10 相当: burnDotFraction = 0.30 + 0.03*10 = 0.6
    applyBurnToEnemy(enemy, 3, 0.6, BigNum.fromNumber(1000), 0);
    expect(enemy.burnPerSec?.toString()).toBe('600');
  });
});

describe('getEffectiveEnemyAtk (design-docs/15-balance-v1.5.0.md §2.1 ボスソフトエンレイジ)', () => {
  test('boss 以外 (normal/elite/miniboss) は経過時間に関わらず atk がそのまま返る', () => {
    for (const kind of ['normal', 'elite', 'miniboss'] as const) {
      const init = { ...makeEnemyInit('e1', 100), kind, subtype: undefined };
      const enemy = new MutableEnemy(init);
      // wave 経過 300 秒 (= boss なら大幅エンレイジする時間) でも変化しない
      const effective = getEffectiveEnemyAtk(enemy, 300_000);
      expect(effective.toString()).toBe(enemy.atk.toString());
    }
  });

  test('boss かつ猶予中 (spawn から 60 秒未満) は atk がそのまま返る', () => {
    const init = { ...makeEnemyInit('boss1', 1000), kind: 'boss' as const, subtype: undefined };
    const boss = new MutableEnemy(init); // spawnedAtMs = 0
    const effective = getEffectiveEnemyAtk(boss, 59_000); // wave 経過 59 秒
    expect(effective.toString()).toBe(boss.atk.toString());
  });

  test('boss かつ spawn から 90 秒経過で atk が ×1.4 になる', () => {
    const init = { ...makeEnemyInit('boss1', 1000), kind: 'boss' as const, subtype: undefined };
    const boss = new MutableEnemy(init); // spawnedAtMs = 0
    const effective = getEffectiveEnemyAtk(boss, 90_000);
    expect(parseFloat(effective.toString())).toBeCloseTo(14); // atk=10 × 1.4
  });

  test('spawnedAtMs を起点に経過時間を計算する (wave 内で途中スポーンしたケース)', () => {
    const init = { ...makeEnemyInit('boss1', 1000), kind: 'boss' as const, subtype: undefined };
    const boss = new MutableEnemy({ ...init, spawnedAtMs: 25_000 }); // W30 は 25 秒時点で boss 出現
    // wave 経過 115 秒 = spawn から 90 秒 → stage 1 (×1.4)
    const effective = getEffectiveEnemyAtk(boss, 115_000);
    expect(parseFloat(effective.toString())).toBeCloseTo(14);
  });

  test('元の enemy.atk は mutate されない (読み取り時のみの乗算)', () => {
    const init = { ...makeEnemyInit('boss1', 1000), kind: 'boss' as const, subtype: undefined };
    const boss = new MutableEnemy(init);
    getEffectiveEnemyAtk(boss, 300_000);
    expect(boss.atk.toString()).toBe('10');
  });
});
