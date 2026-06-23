import { describe, it, expect } from 'vitest';

import {
  CUTTER_BASE_AS,
  CUTTER_BASE_DAMAGE_MUL,
  CUTTER_OVERDRIVE_ATTACK_SPEED_MUL,
  CUTTER_OVERDRIVE_CD_SEC,
  CUTTER_OVERDRIVE_DURATION_SEC,
  cutterNormalAttack,
  cutterStartOverdrive,
  cutterStats,
  cutterTickOverdrive,
} from './cutter';

import type { MachineStats } from '@/game/damage.types';
import type { SpawnedEnemy } from '@/game/types';
import { BigNum } from '@/lib/bignum/BigNum';

// ---------------------------------------------------------------------------
// テスト用フィクスチャ
// ---------------------------------------------------------------------------

function makeMachine(overrides: Partial<MachineStats> = {}): MachineStats {
  return {
    baseAttack: BigNum.fromNumber(100),
    defense: BigNum.ZERO,
    damageReduction: 0,
    critRate: 0,
    critMultiplier: 2.0,
    maxHp: BigNum.fromNumber(1000),
    hpRegen: BigNum.ZERO,
    ...overrides,
  };
}

function makeEnemy(id: string, x = 0, y = 0): SpawnedEnemy {
  return {
    id,
    kind: 'normal',
    subtype: 'standard',
    hp: BigNum.fromNumber(1000),
    atk: BigNum.fromNumber(10),
    speed: 1,
    spawnedAtMs: 0,
    position: { x, y },
    maxHp: BigNum.fromNumber(1000),
    reward: {
      screw: 1,
      bolt: 1,
      alloyChance: 0,
      alloyAmount: 0,
    },
  };
}

/** 常に 0 を返す決定的 rng（クリットしない） */
const rngNever = () => 0;

// ---------------------------------------------------------------------------
// cutterStats: Lv スケール
// ---------------------------------------------------------------------------

describe('cutterStats', () => {
  it('Lv0 で初期値が正しい', () => {
    const stats = cutterStats(0);
    expect(stats.attackPerSec).toBeCloseTo(CUTTER_BASE_AS);
    expect(stats.orbitRadius).toBeCloseTo(80);
    expect(stats.simultaneousHits).toBe(1);
    expect(stats.damageMul).toBeCloseTo(CUTTER_BASE_DAMAGE_MUL);
    expect(stats.overdriveCdSec).toBe(CUTTER_OVERDRIVE_CD_SEC);
    expect(stats.overdriveDurationSec).toBe(CUTTER_OVERDRIVE_DURATION_SEC);
    expect(stats.overdriveAttackSpeedMul).toBe(CUTTER_OVERDRIVE_ATTACK_SPEED_MUL);
    expect(stats.overdriveDamageMul).toBe(1);
  });

  it('Lv10 でスケールが正しい', () => {
    const stats = cutterStats(10);
    expect(stats.attackPerSec).toBeCloseTo(CUTTER_BASE_AS * 1.3);
    expect(stats.orbitRadius).toBeCloseTo(85);
    expect(stats.simultaneousHits).toBe(1);
    expect(stats.damageMul).toBeCloseTo(CUTTER_BASE_DAMAGE_MUL * Math.pow(1.02, 10), 5);
  });

  it('Lv20 で simultaneousHits が 2 になる', () => {
    const stats = cutterStats(20);
    expect(stats.simultaneousHits).toBe(2);
  });

  it('Lv50 でスケールが正しい', () => {
    const stats = cutterStats(50);
    expect(stats.attackPerSec).toBeCloseTo(CUTTER_BASE_AS * (1 + 0.03 * 50));
    expect(stats.orbitRadius).toBeCloseTo(105);
    expect(stats.simultaneousHits).toBe(3);
    expect(stats.damageMul).toBeCloseTo(CUTTER_BASE_DAMAGE_MUL * Math.pow(1.02, 50), 5);
  });

  it('Lv100 でスケールが正しい', () => {
    const stats = cutterStats(100);
    expect(stats.attackPerSec).toBeCloseTo(CUTTER_BASE_AS * (1 + 0.03 * 100));
    expect(stats.orbitRadius).toBeCloseTo(130);
    expect(stats.simultaneousHits).toBe(6);
    expect(stats.damageMul).toBeCloseTo(CUTTER_BASE_DAMAGE_MUL * Math.pow(1.02, 100), 3);
  });
});

// ---------------------------------------------------------------------------
// cutterNormalAttack: 通常攻撃
// ---------------------------------------------------------------------------

describe('cutterNormalAttack', () => {
  const machine = makeMachine();

  it('simultaneousHits=1 のとき、1 体だけヒットする', () => {
    const stats = cutterStats(0); // simultaneousHits=1
    const enemies = [makeEnemy('e1'), makeEnemy('e2'), makeEnemy('e3')];
    const result = cutterNormalAttack(machine, stats, enemies, 0, rngNever);
    expect(result.hits).toHaveLength(1);
    expect(result.hits[0].enemyId).toBe('e1');
  });

  it('enemiesInRange が空のとき hits も空', () => {
    const stats = cutterStats(0);
    const result = cutterNormalAttack(machine, stats, [], 0, rngNever);
    expect(result.hits).toHaveLength(0);
  });

  it('simultaneousHits=2 のとき、2 体ヒットする', () => {
    const stats = cutterStats(20); // simultaneousHits=2
    const enemies = [makeEnemy('e1'), makeEnemy('e2'), makeEnemy('e3')];
    const result = cutterNormalAttack(machine, stats, enemies, 0, rngNever);
    expect(result.hits).toHaveLength(2);
    expect(result.hits[0].enemyId).toBe('e1');
    expect(result.hits[1].enemyId).toBe('e2');
  });

  it('enemiesInRange に simultaneousHits 未満の敵しかいないとき全員ヒット', () => {
    const stats = cutterStats(20); // simultaneousHits=2
    const enemies = [makeEnemy('e1')];
    const result = cutterNormalAttack(machine, stats, enemies, 0, rngNever);
    expect(result.hits).toHaveLength(1);
  });

  it('ダメージが正しく計算される（クリットなし）', () => {
    const baseAttack = 200;
    const stats = cutterStats(0); // damageMul = CUTTER_BASE_DAMAGE_MUL
    const m = makeMachine({ baseAttack: BigNum.fromNumber(baseAttack) });
    const enemies = [makeEnemy('e1')];
    const result = cutterNormalAttack(m, stats, enemies, 0, rngNever);
    expect(result.hits[0].crit).toBe(false);
    const expected = BigNum.fromNumber(baseAttack).mulNumber(CUTTER_BASE_DAMAGE_MUL);
    expect(result.hits[0].damage.eq(expected)).toBe(true);
  });

  it('クリット時にクリ倍率が乗算される', () => {
    const baseAttack = 100;
    const m = makeMachine({
      baseAttack: BigNum.fromNumber(baseAttack),
      critRate: 1,
      critMultiplier: 2.0,
    });
    const stats = cutterStats(0);
    const enemies = [makeEnemy('e1')];
    const result = cutterNormalAttack(m, stats, enemies, 0, rngNever);
    expect(result.hits[0].crit).toBe(true);
    // baseAttack × CUTTER_BASE_DAMAGE_MUL × 2.0
    const expected = BigNum.fromNumber(baseAttack).mulNumber(CUTTER_BASE_DAMAGE_MUL).mulNumber(2.0);
    expect(result.hits[0].damage.eq(expected)).toBe(true);
  });

  it('旋回角度が更新される（angle は currentAngleDeg + 360/attackPerSec）', () => {
    const stats = cutterStats(0);
    const result = cutterNormalAttack(machine, stats, [], 0, rngNever);
    expect(result.angle).toBeCloseTo((0 + 360 / CUTTER_BASE_AS) % 360);
  });

  it('angle が 360 を超えたとき 0〜360 に正規化される', () => {
    const stats = cutterStats(0);
    // 360 / CUTTER_BASE_AS 度ずつ進む。 0 + step*N が >360 の場合は剰余で 0-360 に
    const step = 360 / CUTTER_BASE_AS;
    const start = 360 - step + 30; // 1 hit で 360 を超える位置から開始
    const result = cutterNormalAttack(machine, stats, [], start, rngNever);
    expect(result.angle).toBeCloseTo((((start + step) % 360) + 360) % 360);
  });
});

// ---------------------------------------------------------------------------
// Overdrive
// ---------------------------------------------------------------------------

describe('cutterStartOverdrive', () => {
  it('active=true、remainingSec=8、attackSpeedMul=3、damageMul=1 で開始する', () => {
    const stats = cutterStats(0);
    const state = cutterStartOverdrive(stats);
    expect(state.active).toBe(true);
    expect(state.remainingSec).toBeCloseTo(8);
    expect(state.attackSpeedMul).toBe(3);
    expect(state.damageMul).toBe(1);
  });
});

describe('cutterTickOverdrive', () => {
  it('deltaSec を引いた残り時間が返る', () => {
    const stats = cutterStats(0);
    const initial = cutterStartOverdrive(stats);
    const after = cutterTickOverdrive(initial, 3);
    expect(after.active).toBe(true);
    expect(after.remainingSec).toBeCloseTo(5);
    expect(after.attackSpeedMul).toBe(3);
  });

  it('残り時間ちょうどで終了したとき active=false になる', () => {
    const stats = cutterStats(0);
    const initial = cutterStartOverdrive(stats);
    const after = cutterTickOverdrive(initial, 8);
    expect(after.active).toBe(false);
    expect(after.remainingSec).toBe(0);
    expect(after.attackSpeedMul).toBe(1);
    expect(after.damageMul).toBe(1);
  });

  it('残り時間を超える deltaSec でも active=false、remainingSec=0', () => {
    const stats = cutterStats(0);
    const initial = cutterStartOverdrive(stats);
    const after = cutterTickOverdrive(initial, 100);
    expect(after.active).toBe(false);
    expect(after.remainingSec).toBe(0);
  });

  it('active=false の状態に tick しても変化しない', () => {
    const dormant = {
      active: false,
      remainingSec: 0,
      attackSpeedMul: 1,
      damageMul: 1,
    };
    const after = cutterTickOverdrive(dormant, 5);
    expect(after).toStrictEqual(dormant);
  });

  it('tick を複数回繰り返すと持続時間がカウントダウンされる', () => {
    const stats = cutterStats(0);
    let state = cutterStartOverdrive(stats); // 8s
    state = cutterTickOverdrive(state, 2); // 6s
    expect(state.active).toBe(true);
    expect(state.remainingSec).toBeCloseTo(6);
    state = cutterTickOverdrive(state, 3); // 3s
    expect(state.active).toBe(true);
    expect(state.remainingSec).toBeCloseTo(3);
    state = cutterTickOverdrive(state, 3); // 0s
    expect(state.active).toBe(false);
    expect(state.remainingSec).toBe(0);
  });
});
