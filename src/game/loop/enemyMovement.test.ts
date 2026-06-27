import { describe, expect, test } from 'vitest';

import { MACHINE_X, MACHINE_Y, updateEnemyPosition } from './enemyMovement';

import type { SpawnedEnemy } from '@/game/types';
import { BigNum } from '@/lib/bignum';

function makeEnemy(x: number, y: number, speed: number): SpawnedEnemy {
  return {
    kind: 'normal',
    subtype: 'standard',
    hp: BigNum.fromNumber(1),
    atk: BigNum.fromNumber(1),
    speed,
    reward: { screw: 0, bolt: 0, alloyChance: 0, alloyAmount: 0 },
    id: 'e1',
    spawnedAtMs: 0,
    position: { x, y },
    maxHp: BigNum.fromNumber(1),
    hitRadius: 1.03,
  };
}

describe('updateEnemyPosition', () => {
  test('既にマシン位置にいる敵は position を変えない', () => {
    const e = makeEnemy(MACHINE_X, MACHINE_Y, 5);
    const updated = updateEnemyPosition(e, 1);
    expect(updated.position).toEqual({ x: MACHINE_X, y: MACHINE_Y });
  });

  test('水平方向に等速で近づく (speed=10 / deltaSec=1 で 10 進む)', () => {
    // (100, 50) からマシン (50, 50) へ。 distance=50。 速度 10 で 1 秒なら 10 進む。
    const e = makeEnemy(100, 50, 10);
    const updated = updateEnemyPosition(e, 1);
    expect(updated.position.x).toBeCloseTo(90);
    expect(updated.position.y).toBeCloseTo(50);
  });

  test('斜め方向: ratio を保って近づく', () => {
    // (50 + 3, 50 + 4) からマシン (50, 50) へ。 distance=5。 速度 1 で 1 秒なら 1 進む。
    // 新位置: (53 - 3*0.2, 54 - 4*0.2) = (52.4, 53.2)
    const e = makeEnemy(53, 54, 1);
    const updated = updateEnemyPosition(e, 1);
    expect(updated.position.x).toBeCloseTo(52.4);
    expect(updated.position.y).toBeCloseTo(53.2);
  });

  test('移動量がマシンまでの距離を超えるとマシン位置にスナップ', () => {
    const e = makeEnemy(51, 50, 100); // 距離 1、 移動量 100 → over shoot
    const updated = updateEnemyPosition(e, 1);
    expect(updated.position).toEqual({ x: MACHINE_X, y: MACHINE_Y });
  });

  test('speed=0 で位置不変', () => {
    const e = makeEnemy(80, 30, 0);
    const updated = updateEnemyPosition(e, 1);
    expect(updated.position).toEqual({ x: 80, y: 30 });
  });

  test('deltaSec=0 で位置不変', () => {
    const e = makeEnemy(80, 30, 10);
    const updated = updateEnemyPosition(e, 0);
    expect(updated.position).toEqual({ x: 80, y: 30 });
  });
});
