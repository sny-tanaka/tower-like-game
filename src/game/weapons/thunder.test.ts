import { describe, expect, it } from 'vitest';

import {
  THUNDER_BASE_AS,
  THUNDER_BASE_CHAIN_COUNT,
  THUNDER_BASE_DAMAGE_MUL,
  THUNDER_CHAIN_FALLOFF,
  THUNDER_PLASMA_CD_SEC,
  thunderNormalAttack,
  thunderPlasmaDischarge,
  thunderStats,
} from './thunder';

import type { MachineStats } from '@/game/damage.types';
import type { SpawnedEnemy } from '@/game/types';
import { BigNum } from '@/lib/bignum/BigNum';

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
    attackSpeed: 1,
    activePower: 1,
    activeCdReduction: 0,
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
    maxHp: BigNum.fromNumber(500),
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
    expect(stats.attackPerSec).toBeCloseTo(THUNDER_BASE_AS);
    expect(stats.chainCount).toBe(THUNDER_BASE_CHAIN_COUNT);
    expect(stats.chainFalloff).toBe(THUNDER_CHAIN_FALLOFF);
    expect(stats.damageMul).toBeCloseTo(THUNDER_BASE_DAMAGE_MUL);
    expect(stats.plasmaCdSec).toBe(THUNDER_PLASMA_CD_SEC);
    // Lv0: plasmaDamageMul = 15 × (1 + 0) = 15
    expect(stats.plasmaDamageMul).toBeCloseTo(15);
  });

  it('Lv10: damageMul = THUNDER_BASE_DAMAGE_MUL × 1.02^10', () => {
    const stats = thunderStats(10);
    expect(stats.damageMul).toBeCloseTo(THUNDER_BASE_DAMAGE_MUL * Math.pow(1.02, 10), 5);
  });

  it('Lv10: attackPerSec = THUNDER_BASE_AS × (1 + 0.03 × 10)', () => {
    const stats = thunderStats(10);
    expect(stats.attackPerSec).toBeCloseTo(THUNDER_BASE_AS * 1.3, 5);
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

  it('3 体同時ヒットでダメージは全員同じ (通常攻撃の連鎖減衰は廃止)', () => {
    const baseAttack = 1000;
    const machine = makeMachine({ baseAttack: BigNum.fromNumber(baseAttack) });
    const stats = thunderStats(0); // damageMul = THUNDER_BASE_DAMAGE_MUL
    const enemies = [makeEnemy('e1'), makeEnemy('e2'), makeEnemy('e3')];
    const result = thunderNormalAttack(machine, stats, enemies, rngNoCrit);

    // 全員 baseAttack × THUNDER_BASE_DAMAGE_MUL ダメージ (chainFalloff は通常攻撃には適用されない)
    const expected = String(Math.floor(baseAttack * THUNDER_BASE_DAMAGE_MUL));
    expect(result.hits[0]!.damage.toString()).toBe(expected);
    expect(result.hits[1]!.damage.toString()).toBe(expected);
    expect(result.hits[2]!.damage.toString()).toBe(expected);
  });

  it('クリ判定が反映される（rng=0 で常にクリ）', () => {
    const baseAttack = 100;
    const machine = makeMachine({
      baseAttack: BigNum.fromNumber(baseAttack),
      critRate: 0.5,
      critMultiplier: 2.0,
    });
    const stats = thunderStats(0);
    const enemies = [makeEnemy('e1')];
    const result = thunderNormalAttack(machine, stats, enemies, rngAlwaysCrit);
    expect(result.hits[0]!.crit).toBe(true);
    // baseAttack × THUNDER_BASE_DAMAGE_MUL × 2.0
    const expected = String(Math.floor(baseAttack * THUNDER_BASE_DAMAGE_MUL * 2));
    expect(result.hits[0]!.damage.toString()).toBe(expected);
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
// thunderStats — plasmaChainCount
// ---------------------------------------------------------------------------

describe('thunderStats — plasmaChainCount', () => {
  it('Lv0: plasmaChainCount === 7', () => {
    const stats = thunderStats(0);
    expect(stats.plasmaChainCount).toBe(7); // Math.floor(7 + 0.1 * 0) = 7
  });

  it('Lv10: plasmaChainCount === 8', () => {
    const stats = thunderStats(10);
    expect(stats.plasmaChainCount).toBe(8); // Math.floor(7 + 0.1 * 10) = 8
  });

  it('Lv30: plasmaChainCount === 10', () => {
    const stats = thunderStats(30);
    expect(stats.plasmaChainCount).toBe(10); // Math.floor(7 + 0.1 * 30) = 10
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
    const baseAttack = 100;
    const machine = makeMachine({ baseAttack: BigNum.fromNumber(baseAttack) });
    const stats = thunderStats(0); // damageMul=THUNDER_BASE_DAMAGE_MUL, plasmaDamageMul=15
    const enemies = [makeEnemy('e1')];
    const result = thunderPlasmaDischarge(machine, stats, enemies);
    const expected = String(Math.floor(baseAttack * THUNDER_BASE_DAMAGE_MUL * 15));
    expect(result.hits[0]!.damage.toString()).toBe(expected);
  });

  it('連鎖ごとに chainFalloff で減衰する', () => {
    const baseAttack = 1000;
    const machine = makeMachine({ baseAttack: BigNum.fromNumber(baseAttack) });
    const stats = thunderStats(0);
    const enemies = [makeEnemy('e1'), makeEnemy('e2'), makeEnemy('e3')];
    const result = thunderPlasmaDischarge(machine, stats, enemies);

    const baseDmg = baseAttack * THUNDER_BASE_DAMAGE_MUL * 15;
    // 1体目 = baseDmg、 以降は chainFalloff^i で減衰
    expect(result.hits[0]!.damage.toString()).toBe(String(Math.floor(baseDmg)));
    const dmg2 = parseInt(result.hits[1]!.damage.toString(), 10);
    const dmg3 = parseInt(result.hits[2]!.damage.toString(), 10);
    const expected2 = Math.floor(baseDmg * THUNDER_CHAIN_FALLOFF);
    const expected3 = Math.floor(baseDmg * THUNDER_CHAIN_FALLOFF * THUNDER_CHAIN_FALLOFF);
    expect(dmg2).toBeGreaterThanOrEqual(expected2);
    expect(dmg2).toBeLessThanOrEqual(expected2 + 1);
    expect(dmg3).toBeGreaterThanOrEqual(expected3);
    expect(dmg3).toBeLessThanOrEqual(expected3 + 1);
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

// ---------------------------------------------------------------------------
// thunderPlasmaDischarge — 連鎖上限
// ---------------------------------------------------------------------------

describe('thunderPlasmaDischarge — 連鎖上限', () => {
  it('Lv0 で 10 体渡したとき hits が 7 件', () => {
    const machine = makeMachine();
    const stats = thunderStats(0); // plasmaChainCount = 7
    const enemies = Array.from({ length: 10 }, (_, i) => makeEnemy(`e${i + 1}`));
    const result = thunderPlasmaDischarge(machine, stats, enemies);
    expect(result.hits).toHaveLength(7);
  });

  it('Lv10 で 10 体渡したとき hits が 8 件', () => {
    const machine = makeMachine();
    const stats = thunderStats(10); // plasmaChainCount = 8
    const enemies = Array.from({ length: 10 }, (_, i) => makeEnemy(`e${i + 1}`));
    const result = thunderPlasmaDischarge(machine, stats, enemies);
    expect(result.hits).toHaveLength(8);
  });

  it('敵数が plasmaChainCount 未満の場合は全員ヒット', () => {
    const machine = makeMachine();
    const stats = thunderStats(0); // plasmaChainCount = 7
    const enemies = Array.from({ length: 5 }, (_, i) => makeEnemy(`e${i + 1}`)); // 5 < 7
    const result = thunderPlasmaDischarge(machine, stats, enemies);
    expect(result.hits).toHaveLength(5);
  });

  // --- 追加 edge case ---

  it('敵数が plasmaChainCount とちょうど同数 (Lv0=7) のとき全員ヒット', () => {
    const machine = makeMachine();
    const stats = thunderStats(0); // plasmaChainCount = 7
    const enemies = Array.from({ length: 7 }, (_, i) => makeEnemy(`e${i + 1}`));
    const result = thunderPlasmaDischarge(machine, stats, enemies);
    expect(result.hits).toHaveLength(7);
  });

  it('ヒット順は入力配列の順序通り (index 0 が先頭)', () => {
    const machine = makeMachine();
    const stats = thunderStats(0); // plasmaChainCount = 7
    const enemies = Array.from({ length: 10 }, (_, i) => makeEnemy(`enemy-${i}`));
    const result = thunderPlasmaDischarge(machine, stats, enemies);
    // 先頭 7 体が順番通りにヒットするはず
    expect(result.hits.map((h) => h.enemyId)).toEqual(enemies.slice(0, 7).map((e) => e.id));
  });

  it('Lv9: plasmaChainCount = floor(7 + 0.9) = 7 で 10 体渡すと hits が 7 件', () => {
    const machine = makeMachine();
    const stats = thunderStats(9); // Math.floor(7 + 0.9) = 7
    expect(stats.plasmaChainCount).toBe(7);
    const enemies = Array.from({ length: 10 }, (_, i) => makeEnemy(`e${i + 1}`));
    const result = thunderPlasmaDischarge(machine, stats, enemies);
    expect(result.hits).toHaveLength(7);
  });

  it('Lv100: plasmaChainCount = floor(7 + 10) = 17 で 20 体渡すと hits が 17 件', () => {
    const machine = makeMachine();
    const stats = thunderStats(100); // Math.floor(7 + 10) = 17
    expect(stats.plasmaChainCount).toBe(17);
    const enemies = Array.from({ length: 20 }, (_, i) => makeEnemy(`e${i + 1}`));
    const result = thunderPlasmaDischarge(machine, stats, enemies);
    expect(result.hits).toHaveLength(17);
  });

  it('Lv1000: plasmaChainCount = floor(7 + 100) = 107 で 50 体のみ渡すと全員ヒット', () => {
    const machine = makeMachine();
    const stats = thunderStats(1000); // Math.floor(7 + 100) = 107
    expect(stats.plasmaChainCount).toBe(107);
    const enemies = Array.from({ length: 50 }, (_, i) => makeEnemy(`e${i + 1}`));
    const result = thunderPlasmaDischarge(machine, stats, enemies);
    // 敵数 50 < plasmaChainCount 107 → 全員ヒット
    expect(result.hits).toHaveLength(50);
  });

  it('負 Lv は 0 として扱い plasmaChainCount = 7 で上限が適用される', () => {
    const machine = makeMachine();
    const stats = thunderStats(-99); // lv = max(0, -99) = 0 → plasmaChainCount = 7
    expect(stats.plasmaChainCount).toBe(7);
    const enemies = Array.from({ length: 10 }, (_, i) => makeEnemy(`e${i + 1}`));
    const result = thunderPlasmaDischarge(machine, stats, enemies);
    expect(result.hits).toHaveLength(7);
  });

  it('chainFalloff 減衰は 8 体目以降 (Lv10, plasmaChainCount=8) には適用されない', () => {
    const machine = makeMachine({ baseAttack: BigNum.fromNumber(1000) });
    const stats = thunderStats(10); // plasmaChainCount = 8
    const enemies = Array.from({ length: 10 }, (_, i) => makeEnemy(`e${i + 1}`));
    const result = thunderPlasmaDischarge(machine, stats, enemies);
    // 8 件ヒットし、8 番目が存在すること
    expect(result.hits).toHaveLength(8);
    // 8 体目ダメージ = 1 体目 × 0.9^7
    const baseDmg = 1000 * stats.damageMul * stats.plasmaDamageMul;
    const expected8th = Math.floor(baseDmg * Math.pow(THUNDER_CHAIN_FALLOFF, 7));
    const actual8th = parseInt(result.hits[7]!.damage.toString(), 10);
    expect(actual8th).toBeGreaterThanOrEqual(expected8th);
    expect(actual8th).toBeLessThanOrEqual(expected8th + 1);
    // 9 番目は存在しない
    expect(result.hits[8]).toBeUndefined();
  });
});
