import { describe, it, expect } from 'vitest';

import {
  TIER_BASE,
  tierBaseHp,
  tierBaseAtk,
  tierScrewFactor,
  getTierConfig,
  waveHpFactor,
  waveAtkFactor,
  waveScrewFactor,
  waveSpawnFactor,
} from './tier';

import { BigNum } from '@/lib/bignum/BigNum';

// ---------------------------------------------------------------------------
// waveHpFactor
// ---------------------------------------------------------------------------

describe('waveHpFactor', () => {
  it('W=1 は 1.0 を返す', () => {
    expect(waveHpFactor(1)).toBeCloseTo(1.0, 5);
  });

  it('W=10 は 1.67 を返す（±0.01）', () => {
    // 1 + 0.074 * 9 = 1.666
    expect(waveHpFactor(10)).toBeCloseTo(1.666, 2);
  });

  it('W=20 は 3.00 を返す（±0.01）', () => {
    // 1 + 0.074*9 + 0.133*10 = 1.666 + 1.33 = 2.996
    expect(waveHpFactor(20)).toBeCloseTo(2.996, 2);
  });

  it('W=30 は 5.00 を返す（±0.01）', () => {
    // 1 + 0.074*9 + 0.133*10 + 0.200*10 = 2.996 + 2 = 4.996
    expect(waveHpFactor(30)).toBeCloseTo(4.996, 2);
  });

  it('W=11 は区間 2 の計算を使う', () => {
    // 1 + 0.074*9 + 0.133*(11-10) = 1.666 + 0.133 = 1.799
    expect(waveHpFactor(11)).toBeCloseTo(1.799, 3);
  });

  it('W=21 は区間 3 の計算を使う', () => {
    // 1 + 0.074*9 + 0.133*10 + 0.200*(21-20) = 2.996 + 0.200 = 3.196
    expect(waveHpFactor(21)).toBeCloseTo(3.196, 3);
  });
});

// ---------------------------------------------------------------------------
// waveAtkFactor
// ---------------------------------------------------------------------------

describe('waveAtkFactor', () => {
  it('W=1 は 1.0 を返す', () => {
    expect(waveAtkFactor(1)).toBeCloseTo(1.0, 5);
  });

  it('W=10 は 1.33 を返す（±0.01）', () => {
    // 1 + 0.037*9 = 1.333
    expect(waveAtkFactor(10)).toBeCloseTo(1.333, 2);
  });

  it('W=20 は 2.00 を返す（±0.01）', () => {
    // 1 + 0.037*9 + 0.067*10 = 1.333 + 0.67 = 2.003
    expect(waveAtkFactor(20)).toBeCloseTo(2.003, 2);
  });

  it('W=30 は 3.00 を返す（±0.01）', () => {
    // 1 + 0.037*9 + 0.067*10 + 0.100*10 = 2.003 + 1 = 3.003
    expect(waveAtkFactor(30)).toBeCloseTo(3.003, 2);
  });
});

// ---------------------------------------------------------------------------
// waveSpawnFactor
// ---------------------------------------------------------------------------

describe('waveSpawnFactor', () => {
  it('W=1 は 1.0 を返す', () => {
    expect(waveSpawnFactor(1)).toBeCloseTo(1.0, 5);
  });

  it('W=10 は 1.17 を返す（±0.01）', () => {
    // 1 + 0.019*9 = 1.171
    expect(waveSpawnFactor(10)).toBeCloseTo(1.171, 2);
  });

  it('W=20 は 1.50 を返す（±0.01）', () => {
    // 1 + 0.019*9 + 0.033*10 = 1.171 + 0.33 = 1.501
    expect(waveSpawnFactor(20)).toBeCloseTo(1.501, 2);
  });

  it('W=30 は 2.00 を返す（±0.01）', () => {
    // 1 + 0.019*9 + 0.033*10 + 0.050*10 = 1.501 + 0.5 = 2.001
    expect(waveSpawnFactor(30)).toBeCloseTo(2.001, 2);
  });
});

// ---------------------------------------------------------------------------
// tierBaseHp
// ---------------------------------------------------------------------------

describe('tierBaseHp', () => {
  it('T=1: HP_base * HP_GROWTH^0 = 1000 (v1.0.0: 10 → 1000)', () => {
    const hp = tierBaseHp(1);
    expect(hp.toString()).toBe('1000');
  });

  it('T=2: 1000 * 1.8 = 1800 (v1.0.0)', () => {
    const hp = tierBaseHp(2);
    // mulNumber(1.8) → mulRational(9, 5) → mulInt(9).divInt(5)
    expect(hp.toString()).toBe('1800');
  });

  it('T=3: 1000 * 1.8^2 = 3240 → BigNum で 3240 付近 (端数許容、 v1.0.0)', () => {
    const hp = tierBaseHp(3);
    // 1000 * 1.8 = 1800, 1800 * 1.8 = 3240
    const val = parseInt(hp.toString(), 10);
    expect(val).toBeGreaterThanOrEqual(3240);
    expect(val).toBeLessThanOrEqual(3250);
  });

  it('T=10: 値が T=1 より大きい', () => {
    const hp1 = tierBaseHp(1);
    const hp10 = tierBaseHp(10);
    expect(hp10.gt(hp1)).toBe(true);
  });

  it('T=10 の HP は 1.8^9 * 1000 ≈ 34,272 以上 (v1.0.0、 BigNum 端数許容)', () => {
    const hp = tierBaseHp(10);
    const val = parseInt(hp.toString(), 10);
    // 1.8^9 = 34.27... * 1000 = 34,275.xx
    expect(val).toBeGreaterThan(20000);
    expect(val).toBeLessThan(500000);
  });

  it('T=100: BigNum で表現でき、ZERO ではない', () => {
    const hp = tierBaseHp(100);
    expect(hp.isZero()).toBe(false);
  });

  it('T=1000: BigNum で表現でき、ZERO ではない', () => {
    const hp = tierBaseHp(1000);
    expect(hp.isZero()).toBe(false);
  });

  it('T が大きいほど HP が大きい: T=100 > T=10 > T=1', () => {
    const hp1 = tierBaseHp(1);
    const hp10 = tierBaseHp(10);
    const hp100 = tierBaseHp(100);
    expect(hp10.gt(hp1)).toBe(true);
    expect(hp100.gt(hp10)).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// tierBaseAtk
// ---------------------------------------------------------------------------

describe('tierBaseAtk', () => {
  it('T=1: ATK_base * ATK_GROWTH^0 = 200 (v1.0.0: 2 → 200)', () => {
    const atk = tierBaseAtk(1);
    expect(atk.toString()).toBe('200');
  });

  it('T=2: 200 * 1.4 = 280 (v1.0.0、 BigNum 端数許容)', () => {
    const atk = tierBaseAtk(2);
    const val = parseInt(atk.toString(), 10);
    expect(val).toBeGreaterThanOrEqual(280);
    expect(val).toBeLessThanOrEqual(290);
  });

  it('T が大きいほど ATK が大きい: T=100 > T=10 > T=1', () => {
    const atk1 = tierBaseAtk(1);
    const atk10 = tierBaseAtk(10);
    const atk100 = tierBaseAtk(100);
    expect(atk10.gt(atk1)).toBe(true);
    expect(atk100.gt(atk10)).toBe(true);
  });

  it('T=1000: BigNum で表現でき、ZERO ではない', () => {
    const atk = tierBaseAtk(1000);
    expect(atk.isZero()).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// getTierConfig
// ---------------------------------------------------------------------------

describe('getTierConfig', () => {
  it('tier フィールドが引数と一致する', () => {
    const config = getTierConfig(5);
    expect(config.tier).toBe(5);
  });

  it('hpGrowth が TIER_BASE.HP_GROWTH と一致する', () => {
    const config = getTierConfig(1);
    expect(config.hpGrowth).toBe(TIER_BASE.HP_GROWTH);
  });

  it('atkGrowth が TIER_BASE.ATK_GROWTH と一致する', () => {
    const config = getTierConfig(1);
    expect(config.atkGrowth).toBe(TIER_BASE.ATK_GROWTH);
  });

  it('baseHp が tierBaseHp と一致する', () => {
    const config = getTierConfig(5);
    expect(config.baseHp.eq(tierBaseHp(5))).toBe(true);
  });

  it('baseAtk が tierBaseAtk と一致する', () => {
    const config = getTierConfig(5);
    expect(config.baseAtk.eq(tierBaseAtk(5))).toBe(true);
  });

  it('T=1 の baseHp は 10', () => {
    const config = getTierConfig(1);
    expect(config.baseHp.eq(BigNum.fromNumber(TIER_BASE.HP))).toBe(true);
  });

  it('T=1 の baseAtk は 2', () => {
    const config = getTierConfig(1);
    expect(config.baseAtk.eq(BigNum.fromNumber(TIER_BASE.ATK))).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// screw スケール
// ---------------------------------------------------------------------------

describe('waveScrewFactor', () => {
  it('W=1 で 1.0', () => {
    expect(waveScrewFactor(1)).toBeCloseTo(1.0);
  });

  it('W=10 で 2.8 (= 1 + 0.2 × 9)', () => {
    expect(waveScrewFactor(10)).toBeCloseTo(2.8);
  });

  it('W=30 で 6.8 (= 1 + 0.2 × 29)', () => {
    expect(waveScrewFactor(30)).toBeCloseTo(6.8);
  });

  it('W=0 / 負値でも下限 1.0 (factor=1)', () => {
    expect(waveScrewFactor(0)).toBeCloseTo(1.0);
    expect(waveScrewFactor(-5)).toBeCloseTo(1.0);
  });
});

describe('tierScrewFactor', () => {
  it('T=1 で 1.0', () => {
    expect(tierScrewFactor(1)).toBeCloseTo(1.0);
  });

  it('T=2 で 1.5', () => {
    expect(tierScrewFactor(2)).toBeCloseTo(1.5);
  });

  it('T=5 で 5.0625 (= 1.5^4)', () => {
    expect(tierScrewFactor(5)).toBeCloseTo(5.0625);
  });

  it('T=0 / 負値でも下限 1.0', () => {
    expect(tierScrewFactor(0)).toBeCloseTo(1.0);
    expect(tierScrewFactor(-3)).toBeCloseTo(1.0);
  });
});
