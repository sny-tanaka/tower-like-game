import { describe, expect, test } from 'vitest';

import { MACHINE_X, MACHINE_Y, mutateEnemyPosition } from './enemyMovement';

import { MutableEnemy } from '@/game/types';
import { BigNum } from '@/lib/bignum';

function makeEnemy(x: number, y: number, speed: number): MutableEnemy {
  return new MutableEnemy({
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
  });
}

describe('mutateEnemyPosition', () => {
  test('既にマシン位置にいる敵は position を変えない (戻り値 false)', () => {
    const e = makeEnemy(MACHINE_X, MACHINE_Y, 5);
    const changed = mutateEnemyPosition(e, 1);
    expect(changed).toBe(false);
    expect(e.position).toEqual({ x: MACHINE_X, y: MACHINE_Y });
  });

  test('水平方向に等速で近づく (speed=10 / deltaSec=1 で 10 進む) — position 直書き、 戻り値 true', () => {
    // (100, 50) からマシン (50, 50) へ。 distance=50。 速度 10 で 1 秒なら 10 進む。
    const e = makeEnemy(100, 50, 10);
    const changed = mutateEnemyPosition(e, 1);
    expect(changed).toBe(true);
    expect(e.position.x).toBeCloseTo(90);
    expect(e.position.y).toBeCloseTo(50);
  });

  test('斜め方向: ratio を保って近づく (in-place mutation)', () => {
    // (50 + 3, 50 + 4) からマシン (50, 50) へ。 distance=5。 速度 1 で 1 秒なら 1 進む。
    // 新位置: (53 - 3*0.2, 54 - 4*0.2) = (52.4, 53.2)
    const e = makeEnemy(53, 54, 1);
    const changed = mutateEnemyPosition(e, 1);
    expect(changed).toBe(true);
    expect(e.position.x).toBeCloseTo(52.4);
    expect(e.position.y).toBeCloseTo(53.2);
  });

  test('移動量がマシンまでの距離を超えるとマシン位置にスナップ (戻り値 true)', () => {
    const e = makeEnemy(51, 50, 100); // 距離 1、 移動量 100 → over shoot
    const changed = mutateEnemyPosition(e, 1);
    expect(changed).toBe(true);
    expect(e.position).toEqual({ x: MACHINE_X, y: MACHINE_Y });
  });

  test('speed=0 で位置不変 (戻り値 false)', () => {
    const e = makeEnemy(80, 30, 0);
    const changed = mutateEnemyPosition(e, 1);
    expect(changed).toBe(false);
    expect(e.position).toEqual({ x: 80, y: 30 });
  });

  test('deltaSec=0 で位置不変 (戻り値 false)', () => {
    const e = makeEnemy(80, 30, 10);
    const changed = mutateEnemyPosition(e, 0);
    expect(changed).toBe(false);
    expect(e.position).toEqual({ x: 80, y: 30 });
  });

  test('凍結中 (frozenUntilMs > nowMs) は移動しない (戻り値 false)', () => {
    const e = makeEnemy(80, 30, 10);
    e.frozenUntilMs = 5000;
    const changed = mutateEnemyPosition(e, 1, 1000);
    expect(changed).toBe(false);
    expect(e.position).toEqual({ x: 80, y: 30 });
  });

  test('凍結期限切れ (frozenUntilMs <= nowMs) は通常通り移動する', () => {
    const e = makeEnemy(80, 30, 10);
    e.frozenUntilMs = 5000;
    const changed = mutateEnemyPosition(e, 1, 6000);
    expect(changed).toBe(true);
    // 元位置 (80, 30) からマシン (50, 50) への移動量 10
    // dx=-30, dy=20, dist=sqrt(900+400)=sqrt(1300)≈36.06
    // 新 x ≈ 80 + (-30) * (10/36.06) ≈ 80 - 8.32 = 71.68
    expect(e.position.x).toBeCloseTo(71.68, 1);
    expect(e.position.y).toBeCloseTo(35.55, 1);
  });

  test('position オブジェクト参照は再利用される (差替えなし)', () => {
    const e = makeEnemy(100, 50, 10);
    const posRef = e.position;
    mutateEnemyPosition(e, 1);
    expect(e.position).toBe(posRef); // 同一参照
  });
});
