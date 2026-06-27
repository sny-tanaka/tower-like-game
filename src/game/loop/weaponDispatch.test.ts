import { describe, expect, test } from 'vitest';

import { buildMachineStats } from './machineStats';
import { fireWeapon, getAttackPerSec } from './weaponDispatch';

import { MACHINE_UPGRADE_KEYS } from '@/data/schema';
import type { SpawnedEnemy } from '@/game/types';
import { BigNum } from '@/lib/bignum';
import type { MachineLevels } from '@/store/slices/machine';

/** machineLevels 全 key を 0 で初期化したテスト用フィクスチャ */
const defaultMachineLevels: MachineLevels = Object.fromEntries(
  MACHINE_UPGRADE_KEYS.map((k) => [k, 0])
) as MachineLevels;

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
    hitRadius: 1.03,
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

  test('v1.1.1: Lv が上がっても attackPerSec は固定 (laser)', () => {
    const lv0 = getAttackPerSec('laser', 0);
    const lv10 = getAttackPerSec('laser', 10);
    const lv100 = getAttackPerSec('laser', 100);
    expect(lv10).toBe(lv0);
    expect(lv100).toBe(lv0);
  });
});

// ---------------------------------------------------------------------------
// fireWeapon: RunWorkshop attackMul 反映
// ---------------------------------------------------------------------------

describe('fireWeapon: RunWorkshop attackMul の反映', () => {
  const enemy = makeEnemy('e1');
  // baseAttack Lv 9 で base=10 (累積差分: 1 + 9×1)。 BigNum 整数化の影響で
  // base=1 だと「×2 のダメージ差分」 が天井丸めで埋もれるため、 倍率の検証に必要な底上げ
  const machine = buildMachineStats({
    machineMaxHp: BigNum.fromNumber(100),
    machineLevels: { ...defaultMachineLevels, baseAttack: 9 },
  });

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

  test('attackMul=1.0 と attackMul=2.0 で cannon の damageMul が 2 倍になる (v1.1.2: hits は着弾時計算なので shell.damageMul を比較)', () => {
    // v1.1.2: cannon は発射時に hits を返さず、 cannonShell に damageMul を載せる。
    // attackMul は damageMul に乗算されるので、 そこが 2 倍になっていれば OK。
    const cannonEnemy = makeEnemy('c1', 70, 50);
    const baseResult = fireWeapon({
      weapon: 'cannon',
      weaponLv: 0,
      machine,
      enemiesInRange: [cannonEnemy],
      rng: () => 0.99,
      attackMul: 1.0,
    });
    const boostedResult = fireWeapon({
      weapon: 'cannon',
      weaponLv: 0,
      machine,
      enemiesInRange: [cannonEnemy],
      rng: () => 0.99,
      attackMul: 2.0,
    });
    expect(baseResult.cannonShell).toBeDefined();
    expect(boostedResult.cannonShell).toBeDefined();
    expect(boostedResult.cannonShell!.damageMul).toBeCloseTo(
      baseResult.cannonShell!.damageMul * 2,
      6
    );
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
