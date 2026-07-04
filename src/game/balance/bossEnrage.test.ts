import { describe, expect, test } from 'vitest';

import {
  BOSS_ENRAGE_GRACE_SEC,
  BOSS_ENRAGE_STEP_MUL,
  BOSS_ENRAGE_STEP_SEC,
  applyBossEnrageToAtk,
  bossEnrageMultiplier,
  bossEnrageStage,
} from '@/game/balance/bossEnrage';
import { BigNum } from '@/lib/bignum';

describe('定数', () => {
  test('猶予 60 秒 / 段階間隔 30 秒 / 倍率基数 1.4', () => {
    expect(BOSS_ENRAGE_GRACE_SEC).toBe(60);
    expect(BOSS_ENRAGE_STEP_SEC).toBe(30);
    expect(BOSS_ENRAGE_STEP_MUL).toBe(1.4);
  });
});

describe('bossEnrageStage', () => {
  test('0 秒 → stage 0 (未発動)', () => {
    expect(bossEnrageStage(0)).toBe(0);
  });

  test('59.9 秒 → stage 0 (猶予内)', () => {
    expect(bossEnrageStage(59.9)).toBe(0);
  });

  test('60 秒 → stage 0 (猶予ちょうど、まだ発動しない)', () => {
    expect(bossEnrageStage(60)).toBe(0);
  });

  test('89.9 秒 → stage 0 (次段階の 30 秒未満)', () => {
    expect(bossEnrageStage(89.9)).toBe(0);
  });

  test('90 秒 → stage 1 (最初のエンレイジ発動)', () => {
    expect(bossEnrageStage(90)).toBe(1);
  });

  test('119.9 秒 → stage 1', () => {
    expect(bossEnrageStage(119.9)).toBe(1);
  });

  test('120 秒 → stage 2', () => {
    expect(bossEnrageStage(120)).toBe(2);
  });

  test('300 秒 → stage 8', () => {
    expect(bossEnrageStage(300)).toBe(8);
  });

  test('負の経過秒は 0 にクランプされる', () => {
    expect(bossEnrageStage(-10)).toBe(0);
  });
});

describe('bossEnrageMultiplier', () => {
  test('0〜59.9 秒 → ×1.0', () => {
    expect(bossEnrageMultiplier(0)).toBeCloseTo(1.0);
    expect(bossEnrageMultiplier(59.9)).toBeCloseTo(1.0);
  });

  test('90 秒 → ×1.4', () => {
    expect(bossEnrageMultiplier(90)).toBeCloseTo(1.4);
  });

  test('120 秒 → ×1.96', () => {
    expect(bossEnrageMultiplier(120)).toBeCloseTo(1.96);
  });

  test('180 秒 → ×3.84 (stage 4)', () => {
    expect(bossEnrageMultiplier(180)).toBeCloseTo(3.8416, 3);
  });

  test('300 秒 → ×14.76 (stage 8)', () => {
    expect(bossEnrageMultiplier(300)).toBeCloseTo(14.7579, 2);
  });
});

describe('applyBossEnrageToAtk', () => {
  test('猶予中 (0 秒) は ATK が変化しない', () => {
    const atk = BigNum.fromNumber(1000);
    const result = applyBossEnrageToAtk(atk, 0);
    expect(parseFloat(result.toString())).toBeCloseTo(1000);
  });

  test('90 秒経過で ATK が ×1.4 になる', () => {
    const atk = BigNum.fromNumber(1000);
    const result = applyBossEnrageToAtk(atk, 90);
    expect(parseFloat(result.toString())).toBeCloseTo(1400);
  });

  test('300 秒経過で ATK が ×14.76 になる (stage 8)', () => {
    const atk = BigNum.fromNumber(1000);
    const result = applyBossEnrageToAtk(atk, 300);
    expect(parseFloat(result.toString())).toBeCloseTo(14758, 0);
  });

  test('元の atk (BigNum) は mutate されない (読み取り時のみの乗算)', () => {
    const atk = BigNum.fromNumber(1000);
    applyBossEnrageToAtk(atk, 300);
    expect(parseFloat(atk.toString())).toBeCloseTo(1000);
  });
});
