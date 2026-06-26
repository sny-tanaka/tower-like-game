import { describe, expect, it } from 'vitest';

import {
  THUNDER_BASE_AS,
  THUNDER_BASE_CHAIN_COUNT,
  THUNDER_BASE_DAMAGE_MUL,
  THUNDER_STACK_DMG_PER_STACK,
  THUNDER_STACK_MAX,
  thunderNormalAttack,
  thunderPlasmaDischarge,
  thunderStackMultiplier,
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
    range: 150,
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
  it('Lv0 の基本値が仕様通り (AS=2.0, dmgMul=0.45)', () => {
    const stats = thunderStats(0);
    expect(stats.attackPerSec).toBeCloseTo(THUNDER_BASE_AS);
    expect(THUNDER_BASE_AS).toBe(2.0);
    expect(stats.chainCount).toBe(THUNDER_BASE_CHAIN_COUNT);
    // v1.2.0: chainCount を 3 → 4 に増加 (中距離散布敵処理の役割強化)
    expect(THUNDER_BASE_CHAIN_COUNT).toBe(4);
    expect(stats.damageMul).toBeCloseTo(THUNDER_BASE_DAMAGE_MUL);
    expect(THUNDER_BASE_DAMAGE_MUL).toBeCloseTo(0.45);
    // Lv0: plasmaDamageMul = 10 × (1 + 0) = 10
    expect(stats.plasmaDamageMul).toBeCloseTo(10);
    // Lv0: hpLifestealPct = 0
    expect(stats.hpLifestealPct).toBe(0);
  });

  it('v1.1.1: Lv 10 でも damageMul / attackPerSec / plasmaDamageMul は固定底値', () => {
    const stats = thunderStats(10);
    expect(stats.damageMul).toBeCloseTo(THUNDER_BASE_DAMAGE_MUL);
    expect(stats.attackPerSec).toBeCloseTo(THUNDER_BASE_AS);
    expect(stats.plasmaDamageMul).toBeCloseTo(10);
  });

  it('v1.1.1: Lv 20 でも plasmaDamageMul は固定 10', () => {
    const stats = thunderStats(20);
    expect(stats.plasmaDamageMul).toBeCloseTo(10);
  });

  it('v1.1.1: Lv 1000 でも attackPerSec は THUNDER_BASE_AS で固定', () => {
    const stats = thunderStats(1000);
    expect(stats.attackPerSec).toBe(THUNDER_BASE_AS);
  });

  it('負 Lv は 0 として扱う', () => {
    const stats0 = thunderStats(0);
    const statsNeg = thunderStats(-5);
    expect(statsNeg.damageMul).toBeCloseTo(stats0.damageMul);
    expect(statsNeg.attackPerSec).toBeCloseTo(stats0.attackPerSec);
    expect(statsNeg.hpLifestealPct).toBe(0);
  });
});

// ---------------------------------------------------------------------------
// thunderStats — hpLifestealPct
// ---------------------------------------------------------------------------

describe('thunderStats — hpLifestealPct', () => {
  it('Lv0 で 0', () => {
    const stats = thunderStats(0);
    expect(stats.hpLifestealPct).toBe(0);
  });

  it('Lv60 で 0.06 (= 6%)', () => {
    const stats = thunderStats(60);
    expect(stats.hpLifestealPct).toBeCloseTo(0.06);
  });

  it('Lv100 で 0.10 (= 10%)', () => {
    const stats = thunderStats(100);
    expect(stats.hpLifestealPct).toBeCloseTo(0.1);
  });
});

// ---------------------------------------------------------------------------
// thunderNormalAttack — 通常攻撃（同時独立落雷）
// ---------------------------------------------------------------------------

describe('thunderNormalAttack', () => {
  it('敵が 0 体のとき hits/path は空', () => {
    const machine = makeMachine();
    const stats = thunderStats(0);
    const result = thunderNormalAttack(machine, stats, [], rngNoCrit);
    expect(result.hits).toHaveLength(0);
    expect(result.path).toHaveLength(0);
  });

  it('敵 1 体だけなら hits が 1 件', () => {
    const machine = makeMachine();
    const stats = thunderStats(0);
    const enemies = [makeEnemy('e1', 10, 10)];
    const result = thunderNormalAttack(machine, stats, enemies, rngNoCrit);
    expect(result.hits).toHaveLength(1);
    expect(result.hits[0]!.enemyId).toBe('e1');
    expect(result.path).toHaveLength(1);
  });

  it('chainCount=4 のとき最大 4 体まで同時ヒット (v1.2.0)', () => {
    const machine = makeMachine();
    const stats = thunderStats(0); // chainCount=4
    const enemies = [
      makeEnemy('e1', 10, 10),
      makeEnemy('e2', 20, 20),
      makeEnemy('e3', 30, 30),
      makeEnemy('e4', 40, 40),
      makeEnemy('e5', 50, 50), // 5 体目は対象外
    ];
    const result = thunderNormalAttack(machine, stats, enemies, rngNoCrit);
    expect(result.hits).toHaveLength(4);
    expect(result.hits.map((h) => h.enemyId)).toEqual(['e1', 'e2', 'e3', 'e4']);
  });

  it('4 体同時ヒットでダメージは全員同じ (通常攻撃の連鎖減衰は適用されない)', () => {
    const baseAttack = 1000;
    const machine = makeMachine({ baseAttack: BigNum.fromNumber(baseAttack) });
    const stats = thunderStats(0); // damageMul = THUNDER_BASE_DAMAGE_MUL
    const enemies = [makeEnemy('e1'), makeEnemy('e2'), makeEnemy('e3'), makeEnemy('e4')];
    const result = thunderNormalAttack(machine, stats, enemies, rngNoCrit);

    // 全員 baseAttack × THUNDER_BASE_DAMAGE_MUL ダメージ (chainFalloff は通常攻撃には適用されない)
    const expected = String(Math.floor(baseAttack * THUNDER_BASE_DAMAGE_MUL));
    expect(result.hits[0]!.damage.toString()).toBe(expected);
    expect(result.hits[1]!.damage.toString()).toBe(expected);
    expect(result.hits[2]!.damage.toString()).toBe(expected);
    expect(result.hits[3]!.damage.toString()).toBe(expected);
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
// Thunder スタックシステム (v1.2.0)
// ---------------------------------------------------------------------------

describe('thunderStackMultiplier (v1.2.0)', () => {
  it('スタック 0 で倍率 1.0', () => {
    expect(thunderStackMultiplier(0)).toBeCloseTo(1.0);
  });

  it('スタック 1 で倍率 1.2 (+20%)', () => {
    expect(thunderStackMultiplier(1)).toBeCloseTo(1.2);
  });

  it('スタック 2 で倍率 1.4', () => {
    expect(thunderStackMultiplier(2)).toBeCloseTo(1.4);
  });

  it('スタック 5 (= 上限) で倍率 2.0', () => {
    expect(thunderStackMultiplier(5)).toBeCloseTo(2.0);
  });

  it('上限を超える値も倍率 2.0 でキャップ (= ずっと最大倍率)', () => {
    expect(thunderStackMultiplier(6)).toBeCloseTo(2.0);
    expect(thunderStackMultiplier(100)).toBeCloseTo(2.0);
  });

  it('負値や小数は 0 / floor で扱う', () => {
    expect(thunderStackMultiplier(-3)).toBeCloseTo(1.0);
    expect(thunderStackMultiplier(1.9)).toBeCloseTo(1.2); // floor(1.9) = 1
  });

  it('定数の確認: 上限 5、 stack あたり +20%', () => {
    expect(THUNDER_STACK_MAX).toBe(5);
    expect(THUNDER_STACK_DMG_PER_STACK).toBeCloseTo(0.2);
  });
});

describe('thunderNormalAttack — スタック反映 (v1.2.0)', () => {
  function makeEnemyWithStacks(id: string, stacks: number): SpawnedEnemy {
    return { ...makeEnemy(id), thunderStacks: stacks };
  }

  it('スタック 0 の敵にヒットすると stackAfter=1', () => {
    const machine = makeMachine();
    const stats = thunderStats(0);
    const enemies = [makeEnemy('e1')];
    const result = thunderNormalAttack(machine, stats, enemies, rngNoCrit);
    expect(result.hits[0]!.stackBefore).toBe(0);
    expect(result.hits[0]!.stackAfter).toBe(1);
  });

  it('スタック 4 の敵にヒットすると stackAfter=5 (上限到達)', () => {
    const machine = makeMachine();
    const stats = thunderStats(0);
    const enemies = [makeEnemyWithStacks('e1', 4)];
    const result = thunderNormalAttack(machine, stats, enemies, rngNoCrit);
    expect(result.hits[0]!.stackBefore).toBe(4);
    expect(result.hits[0]!.stackAfter).toBe(5);
  });

  it('スタック 5 (上限) の敵にヒットしても stackAfter=5 のまま (減らない / 増えない)', () => {
    const machine = makeMachine();
    const stats = thunderStats(0);
    const enemies = [makeEnemyWithStacks('e1', 5)];
    const result = thunderNormalAttack(machine, stats, enemies, rngNoCrit);
    expect(result.hits[0]!.stackBefore).toBe(5);
    expect(result.hits[0]!.stackAfter).toBe(5);
  });

  it('スタック 0 のダメは底値 × 1.0、 スタック 5 のダメは底値 × 2.0', () => {
    const baseAttack = 1000;
    const machine = makeMachine({ baseAttack: BigNum.fromNumber(baseAttack) });
    const stats = thunderStats(0);
    const enemies = [makeEnemy('e1'), makeEnemyWithStacks('e2', 5)];
    const result = thunderNormalAttack(machine, stats, enemies, rngNoCrit);
    const baseDmg = Math.floor(baseAttack * THUNDER_BASE_DAMAGE_MUL);
    expect(result.hits[0]!.damage.toString()).toBe(String(baseDmg));
    expect(result.hits[1]!.damage.toString()).toBe(String(baseDmg * 2));
  });

  it('スタック 2 の敵には 1.4 倍ダメージ', () => {
    const baseAttack = 1000;
    const machine = makeMachine({ baseAttack: BigNum.fromNumber(baseAttack) });
    const stats = thunderStats(0);
    const enemies = [makeEnemyWithStacks('e1', 2)];
    const result = thunderNormalAttack(machine, stats, enemies, rngNoCrit);
    // 1000 × 0.45 × 1.4 = 630
    const expected = Math.floor(baseAttack * THUNDER_BASE_DAMAGE_MUL * 1.4);
    expect(result.hits[0]!.damage.toString()).toBe(String(expected));
  });

  it('複数体に同時ヒットしたとき、 各敵のスタックは独立に評価される', () => {
    const baseAttack = 1000;
    const machine = makeMachine({ baseAttack: BigNum.fromNumber(baseAttack) });
    const stats = thunderStats(0);
    const enemies = [
      makeEnemy('e1'), // stack 0 → x1.0
      makeEnemyWithStacks('e2', 1), // stack 1 → x1.2
      makeEnemyWithStacks('e3', 5), // stack 5 → x2.0
    ];
    const result = thunderNormalAttack(machine, stats, enemies, rngNoCrit);
    const baseDmg = baseAttack * THUNDER_BASE_DAMAGE_MUL;
    expect(result.hits[0]!.damage.toString()).toBe(String(Math.floor(baseDmg)));
    expect(result.hits[1]!.damage.toString()).toBe(String(Math.floor(baseDmg * 1.2)));
    expect(result.hits[2]!.damage.toString()).toBe(String(Math.floor(baseDmg * 2.0)));
    expect(result.hits.map((h) => h.stackAfter)).toEqual([1, 2, 5]);
  });
});

// ---------------------------------------------------------------------------
// thunderPlasmaDischarge — 全体攻撃化
// ---------------------------------------------------------------------------

describe('thunderPlasmaDischarge', () => {
  it('敵が 0 体のとき hits は空', () => {
    const machine = makeMachine();
    const stats = thunderStats(0);
    const result = thunderPlasmaDischarge(machine, stats, []);
    expect(result.hits).toHaveLength(0);
  });

  it('全敵に均一ヒット (10 体渡したら 10 件返る)', () => {
    const machine = makeMachine();
    const stats = thunderStats(0);
    const enemies = Array.from({ length: 10 }, (_, i) => makeEnemy(`e${i + 1}`));
    const result = thunderPlasmaDischarge(machine, stats, enemies);
    expect(result.hits).toHaveLength(10);
    expect(result.hits.map((h) => h.enemyId)).toEqual(enemies.map((e) => e.id));
  });

  it('1体目ダメージは baseAttack × damageMul × plasmaDamageMul', () => {
    const baseAttack = 100;
    const machine = makeMachine({ baseAttack: BigNum.fromNumber(baseAttack) });
    const stats = thunderStats(0); // damageMul=THUNDER_BASE_DAMAGE_MUL, plasmaDamageMul=10
    const enemies = [makeEnemy('e1')];
    const result = thunderPlasmaDischarge(machine, stats, enemies);
    const expected = String(Math.floor(baseAttack * THUNDER_BASE_DAMAGE_MUL * 10));
    expect(result.hits[0]!.damage.toString()).toBe(expected);
  });

  it('全敵のダメージが均一 (減衰なし)', () => {
    const baseAttack = 1000;
    const machine = makeMachine({ baseAttack: BigNum.fromNumber(baseAttack) });
    const stats = thunderStats(0);
    const enemies = [
      makeEnemy('e1'),
      makeEnemy('e2'),
      makeEnemy('e3'),
      makeEnemy('e4'),
      makeEnemy('e5'),
    ];
    const result = thunderPlasmaDischarge(machine, stats, enemies);

    const expected = String(Math.floor(baseAttack * THUNDER_BASE_DAMAGE_MUL * 10));
    // 全員同じダメージ（連鎖減衰なし）
    for (const hit of result.hits) {
      expect(hit.damage.toString()).toBe(expected);
    }
  });

  it('v1.1.1: Plasma ダメは Lv で増えない (damageMul / plasmaDamageMul 固定)', () => {
    const machine = makeMachine({ baseAttack: BigNum.fromNumber(100) });
    const statsLv0 = thunderStats(0);
    const statsLv10 = thunderStats(10);
    const enemies = [makeEnemy('e1')];

    const resultLv0 = thunderPlasmaDischarge(machine, statsLv0, enemies);
    const resultLv10 = thunderPlasmaDischarge(machine, statsLv10, enemies);

    const dmg0 = parseInt(resultLv0.hits[0]!.damage.toString(), 10);
    const dmg10 = parseInt(resultLv10.hits[0]!.damage.toString(), 10);
    expect(dmg10).toBe(dmg0);
  });

  it('全体攻撃: 大量 (100 体) でも全員ヒット、上限なし', () => {
    const machine = makeMachine();
    const stats = thunderStats(0);
    const enemies = Array.from({ length: 100 }, (_, i) => makeEnemy(`e${i + 1}`));
    const result = thunderPlasmaDischarge(machine, stats, enemies);
    expect(result.hits).toHaveLength(100);
  });

  it('ヒット順は入力配列の順序通り', () => {
    const machine = makeMachine();
    const stats = thunderStats(0);
    const enemies = Array.from({ length: 10 }, (_, i) => makeEnemy(`enemy-${i}`));
    const result = thunderPlasmaDischarge(machine, stats, enemies);
    expect(result.hits.map((h) => h.enemyId)).toEqual(enemies.map((e) => e.id));
  });
});
