import { describe, expect, test } from 'vitest';

import { buildMachineStats } from './machineStats';
import { fireWeapon, getAttackPerSec } from './weaponDispatch';

import type { SpawnedEnemy } from '@/game/types';
import { BigNum } from '@/lib/bignum';

// ---------------------------------------------------------------------------
// テスト用ヘルパー: 単純な敵を 1 体作成
// ---------------------------------------------------------------------------

function makeEnemy(id: string, x = 50, y = 50): SpawnedEnemy {
  return {
    kind: 'normal',
    subtype: 'standard',
    hp: BigNum.fromNumber(1000),
    atk: BigNum.fromNumber(1),
    speed: 1,
    reward: { screw: 1, bolt: 0, alloyChance: 0, alloyAmount: 0 },
    id,
    spawnedAtMs: 0,
    position: { x, y },
    maxHp: BigNum.fromNumber(1000),
  };
}

// ---------------------------------------------------------------------------
// getAttackPerSec
// ---------------------------------------------------------------------------

describe('getAttackPerSec', () => {
  test('4 武器の base attackPerSec が取得できる (Lv 0)', () => {
    expect(getAttackPerSec('laser', 0)).toBeGreaterThan(0);
    expect(getAttackPerSec('cannon', 0)).toBeGreaterThan(0);
    expect(getAttackPerSec('thunder', 0)).toBeGreaterThan(0);
    expect(getAttackPerSec('cutter', 0)).toBeGreaterThan(0);
  });

  test('Lv が上がると attackPerSec が増える (laser)', () => {
    const lv0 = getAttackPerSec('laser', 0);
    const lv10 = getAttackPerSec('laser', 10);
    expect(lv10).toBeGreaterThan(lv0);
  });
});

// ---------------------------------------------------------------------------
// fireWeapon: RunWorkshop attackMul 反映
// ---------------------------------------------------------------------------

describe('fireWeapon: RunWorkshop attackMul の反映', () => {
  const enemy = makeEnemy('e1');
  const machine = buildMachineStats({ machineMaxHp: BigNum.fromNumber(100) });

  test('attackMul=1.0 と attackMul=2.0 でダメージが 2 倍になる (laser)', () => {
    const baseResult = fireWeapon({
      weapon: 'laser',
      weaponLv: 0,
      machine,
      enemiesInRange: [enemy],
      rng: () => 0.99, // crit 抑制 (critRate=0.05)
      attackMul: 1.0,
    });
    const boostedResult = fireWeapon({
      weapon: 'laser',
      weaponLv: 0,
      machine,
      enemiesInRange: [enemy],
      rng: () => 0.99,
      attackMul: 2.0,
    });
    expect(baseResult.hits.length).toBeGreaterThan(0);
    expect(boostedResult.hits.length).toBe(baseResult.hits.length);
    const baseDmg = baseResult.hits[0].damage;
    const boostedDmg = boostedResult.hits[0].damage;
    // boosted = base × 2 (浮動小数の rounding 影響を考慮し toString で比較)
    const expectedBoosted = baseDmg.mulNumber(2);
    expect(boostedDmg.toString()).toBe(expectedBoosted.toString());
  });

  test('attackMul=1.0 と attackMul=2.0 でダメージが 2 倍になる (cannon)', () => {
    const baseResult = fireWeapon({
      weapon: 'cannon',
      weaponLv: 0,
      machine,
      enemiesInRange: [enemy],
      rng: () => 0.99,
      attackMul: 1.0,
    });
    const boostedResult = fireWeapon({
      weapon: 'cannon',
      weaponLv: 0,
      machine,
      enemiesInRange: [enemy],
      rng: () => 0.99,
      attackMul: 2.0,
    });
    expect(baseResult.hits.length).toBeGreaterThan(0);
    const baseDmg = baseResult.hits[0].damage;
    const boostedDmg = boostedResult.hits[0].damage;
    const expectedBoosted = baseDmg.mulNumber(2);
    expect(boostedDmg.toString()).toBe(expectedBoosted.toString());
  });

  test('射程内に敵がいないと hits[] は空', () => {
    const result = fireWeapon({
      weapon: 'laser',
      weaponLv: 0,
      machine,
      enemiesInRange: [],
      rng: Math.random,
      attackMul: 1.0,
    });
    expect(result.hits).toEqual([]);
  });
});
