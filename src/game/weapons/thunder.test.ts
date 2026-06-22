import { describe, expect, it } from 'vitest';

import type { MachineStats } from '@/game/damage.types';
import type { SpawnedEnemy } from '@/game/types';
import { BigNum } from '@/lib/bignum/BigNum';

import { thunderNormalAttack, thunderPlasmaDischarge, thunderStats } from './thunder';

// ---------------------------------------------------------------------------
// テスト用ファクトリ
// ---------------------------------------------------------------------------

function makeMachine(overrides: Partial<MachineStats> = {}): MachineStats {
  return {
    baseAttack: BigNum.fromNumber(100),
    defense: BigNum.ZERO,
    damageReduction: 0,
    critRate: 0,
    critMultiplier: 1.5,
    maxHp: BigNum.fromNumber(1000),
    hpRegen: BigNum.fromNumber(1),
    ...overrides,
  };
}

function makeEnemy(id: string, x = 50, y = 50): SpawnedEnemy {
  return {
    id,
    kind: 'normal',
    subtype: 'standard',
    hp: BigNum.fromNumber(500),
    atk: BigNum.fromNumber(10),
    speed: 1,
    reward: { screw: 1, bolt: 0, alloyChance: 0, alloyAmount: 0 },
    spawnedAtMs: 0,
    position: { x, y },
  };
}

/** 常に一定値を返す rng（クリ判定を固定化するため） */
const rngNoCrit = (): number => 1; // critRate < 1 なら false
const rngAlwaysCrit = (): number => 0; // critRate > 0 なら true

// ---------------------------------------------------------------------------
// thunderStats — Lv スケール
// ---------------------------------------------------------------------------

describe('thunderStats', () => {
  it('Lv0 の基本値が仕様通り', () => {
    const stats = thunderStats(0);
    expect(stats.attackPerSec).toBeCloseTo(0.7);
    expect(stats.chainCount).toBe(3);
    expect(stats.chainFalloff).toBe(0.9);
    expect(stats.damageMul).toBeCloseTo(1.0);
    expect(stats.plasmaCdSec).toBe(30);
    // Lv0: plasmaDamageMul = 15 × (1 + 0) = 15
    expect(stats.plasmaDamageMul).toBeCloseTo(15);
  });

  it('Lv10: damageMul ≈ 1.22 (1.02^10)', () => {
    const stats = thunderStats(10);
    expect(stats.damageMul).toBeCloseTo(Math.pow(1.02, 10), 5);
  });

  it('Lv10: attackPerSec ≈ 0.7 × 1.3 = 0.91', () => {
    const stats = thunderStats(10);
    expect(stats.attackPerSec).toBeCloseTo(0.7 * 1.3, 5);
  });

  it('Lv10: plasmaDamageMul = 15 × 1.5 = 22.5', () => {
    const stats = thunderStats(10);
    expect(stats.plasmaDamageMul).toBeCloseTo(22.5);
  });

  it('高 Lv でも attackPerSec は 10 を超えない', () => {
    const stats = thunderStats(1000);
    expect(stats.attackPerSec).toBeLessThanOrEqual(10);
  });

  it('負 Lv は 0 として扱う', () => {
    const stats0 = thunderStats(0);
    const statsNeg = thunderStats(-5);
    expect(statsNeg.damageMul).toBeCloseTo(stats0.damageMul);
    expect(statsNeg.attackPerSec).toBeCloseTo(stats0.attackPerSec);
  });
});

// ---------------------------------------------------------------------------
// thunderNormalAttack — 通常攻撃 連鎖
// ---------------------------------------------------------------------------

describe('thunderNormalAttack', () => {
  it('敵が 0 体のとき hits/path は空', () => {
    const machine = makeMachine();
    const stats = thunderStats(0);
    const result = thunderNormalAttack(machine, stats, [], rngNoCrit);
    expect(result.hits).toHaveLength(0);
    expect(result.path).toHaveLength(0);
  });

  it('敵 1 体だけなら連鎖なし（hits が 1 件）', () => {
    const machine = makeMachine();
    const stats = thunderStats(0);
    const enemies = [makeEnemy('e1', 10, 10)];
    const result = thunderNormalAttack(machine, stats, enemies, rngNoCrit);
    expect(result.hits).toHaveLength(1);
    expect(result.hits[0]!.enemyId).toBe('e1');
    expect(result.path).toHaveLength(1);
  });

  it('chainCount=3 のとき最大 3 体まで連鎖', () => {
    const machine = makeMachine();
    const stats = thunderStats(0); // chainCount=3
    const enemies = [
      makeEnemy('e1', 10, 10),
      makeEnemy('e2', 20, 20),
      makeEnemy('e3', 30, 30),
      makeEnemy('e4', 40, 40), // 4体目は連鎖に入らない
    ];
    const result = thunderNormalAttack(machine, stats, enemies, rngNoCrit);
    expect(result.hits).toHaveLength(3);
    expect(result.hits.map((h) => h.enemyId)).toEqual(['e1', 'e2', 'e3']);
  });

  it('連鎖先でダメージが chainFalloff で減衰する', () => {
    const machine = makeMachine({ baseAttack: BigNum.fromNumber(1000) });
    const stats = thunderStats(0); // damageMul=1.0, chainFalloff=0.9
    const enemies = [makeEnemy('e1'), makeEnemy('e2'), makeEnemy('e3')];
    const result = thunderNormalAttack(machine, stats, enemies, rngNoCrit);

    // e1: 1000 × 1.0 = 1000
    // e2: 1000 × 0.9 = 900
    // e3: 1000 × 0.81 = 810
    expect(result.hits[0]!.damage.toString()).toBe('1000');
    const dmg2 = parseInt(result.hits[1]!.damage.toString(), 10);
    const dmg3 = parseInt(result.hits[2]!.damage.toString(), 10);
    expect(dmg2).toBeGreaterThanOrEqual(900);
    expect(dmg2).toBeLessThanOrEqual(901);
    expect(dmg3).toBeGreaterThanOrEqual(810);
    expect(dmg3).toBeLessThanOrEqual(811);
  });

  it('クリ判定が反映される（rng=0 で常にクリ）', () => {
    const machine = makeMachine({ critRate: 0.5, critMultiplier: 2.0 });
    const stats = thunderStats(0);
    const enemies = [makeEnemy('e1')];
    const result = thunderNormalAttack(machine, stats, enemies, rngAlwaysCrit);
    expect(result.hits[0]!.crit).toBe(true);
    // 100 × 1.0 × 2.0 = 200
    expect(result.hits[0]!.damage.toString()).toBe('200');
  });

  it('path が各敵の position を順番通り含む', () => {
    const machine = makeMachine();
    const stats = thunderStats(0);
    const enemies = [makeEnemy('e1', 10, 20), makeEnemy('e2', 30, 40)];
    const result = thunderNormalAttack(machine, stats, enemies, rngNoCrit);
    expect(result.path[0]).toEqual({ x: 10, y: 20 });
    expect(result.path[1]).toEqual({ x: 30, y: 40 });
  });
});

// ---------------------------------------------------------------------------
// thunderPlasmaDischarge — Plasma Discharge
// ---------------------------------------------------------------------------

describe('thunderPlasmaDischarge', () => {
  it('敵が 0 体のとき hits は空', () => {
    const machine = makeMachine();
    const stats = thunderStats(0);
    const result = thunderPlasmaDischarge(machine, stats, []);
    expect(result.hits).toHaveLength(0);
  });

  it('全敵にヒットする', () => {
    const machine = makeMachine();
    const stats = thunderStats(0);
    const enemies = [makeEnemy('e1'), makeEnemy('e2'), makeEnemy('e3'), makeEnemy('e4')];
    const result = thunderPlasmaDischarge(machine, stats, enemies);
    expect(result.hits).toHaveLength(4);
    expect(result.hits.map((h) => h.enemyId)).toEqual(['e1', 'e2', 'e3', 'e4']);
  });

  it('1体目ダメージは baseAttack × damageMul × plasmaDamageMul', () => {
    const machine = makeMachine({ baseAttack: BigNum.fromNumber(100) });
    const stats = thunderStats(0); // damageMul=1.0, plasmaDamageMul=15
    const enemies = [makeEnemy('e1')];
    const result = thunderPlasmaDischarge(machine, stats, enemies);
    // 100 × 1.0 × 15 = 1500
    expect(result.hits[0]!.damage.toString()).toBe('1500');
  });

  it('連鎖ごとに 10% 減衰する', () => {
    const machine = makeMachine({ baseAttack: BigNum.fromNumber(1000) });
    const stats = thunderStats(0); // damageMul=1.0, plasmaDamageMul=15, chainFalloff=0.9
    const enemies = [makeEnemy('e1'), makeEnemy('e2'), makeEnemy('e3')];
    const result = thunderPlasmaDischarge(machine, stats, enemies);

    // e1: 1000 × 1.0 × 15 × 0.9^0 = 15000
    // e2: 1000 × 1.0 × 15 × 0.9^1 = 13500
    // e3: 1000 × 1.0 × 15 × 0.9^2 = 12150
    expect(result.hits[0]!.damage.toString()).toBe('15000');
    const dmg2 = parseInt(result.hits[1]!.damage.toString(), 10);
    const dmg3 = parseInt(result.hits[2]!.damage.toString(), 10);
    expect(dmg2).toBeGreaterThanOrEqual(13500);
    expect(dmg2).toBeLessThanOrEqual(13501);
    expect(dmg3).toBeGreaterThanOrEqual(12150);
    expect(dmg3).toBeLessThanOrEqual(12151);
  });

  it('Lv が上がるとダメージが増加する', () => {
    const machine = makeMachine({ baseAttack: BigNum.fromNumber(100) });
    const statsLv0 = thunderStats(0);
    const statsLv10 = thunderStats(10);
    const enemies = [makeEnemy('e1')];

    const resultLv0 = thunderPlasmaDischarge(machine, statsLv0, enemies);
    const resultLv10 = thunderPlasmaDischarge(machine, statsLv10, enemies);

    const dmg0 = parseInt(resultLv0.hits[0]!.damage.toString(), 10);
    const dmg10 = parseInt(resultLv10.hits[0]!.damage.toString(), 10);
    expect(dmg10).toBeGreaterThan(dmg0);
  });
});
