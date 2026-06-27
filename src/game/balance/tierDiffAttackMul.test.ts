import { describe, expect, test } from 'vitest';

import { TIER_DIFF_ATTACK_MUL_BASE, calcTierDiffAttackMul } from './tierDiffAttackMul';

describe('TIER_DIFF_ATTACK_MUL_BASE', () => {
  test('基数は 1.2 (= 差 1 あたり +20% 累積)', () => {
    expect(TIER_DIFF_ATTACK_MUL_BASE).toBe(1.2);
  });
});

describe('calcTierDiffAttackMul', () => {
  test('currentTier === highestTier → 倍率 1.0 (バフなし)', () => {
    expect(calcTierDiffAttackMul(5, 5)).toBeCloseTo(1.0);
    expect(calcTierDiffAttackMul(0, 0)).toBeCloseTo(1.0);
  });

  test('currentTier > highestTier → 倍率 1.0 にクランプ (負の差は無効)', () => {
    expect(calcTierDiffAttackMul(3, 5)).toBeCloseTo(1.0);
    expect(calcTierDiffAttackMul(0, 10)).toBeCloseTo(1.0);
  });

  test('highestTier=5、 currentTier=4 → ×1.2 (差 1)', () => {
    expect(calcTierDiffAttackMul(5, 4)).toBeCloseTo(1.2);
  });

  test('highestTier=5、 currentTier=3 → ×1.44 (差 2 = 1.2²)', () => {
    expect(calcTierDiffAttackMul(5, 3)).toBeCloseTo(1.44);
  });

  test('highestTier=5、 currentTier=1 → ×2.0736 (差 4 = 1.2⁴)', () => {
    expect(calcTierDiffAttackMul(5, 1)).toBeCloseTo(2.0736);
  });

  test('highestTier=20、 currentTier=5 → 差 15 で約 ×15.4', () => {
    const mul = calcTierDiffAttackMul(20, 5);
    expect(mul).toBeGreaterThan(15);
    expect(mul).toBeLessThan(16);
  });

  test('小数値の Tier も floor される (堅牢性)', () => {
    expect(calcTierDiffAttackMul(5.9, 1.1)).toBeCloseTo(2.0736); // floor(5.9)=5, floor(1.1)=1
  });
});
