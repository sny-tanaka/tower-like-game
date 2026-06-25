import { describe, it, expect } from 'vitest';

import {
  CUTTER_BASE_AS,
  CUTTER_BASE_DAMAGE_MUL,
  CUTTER_BASE_ORBIT_RADIUS,
  CUTTER_BLADES,
  CUTTER_OVERDRIVE_ATTACK_SPEED_MUL,
  CUTTER_OVERDRIVE_BASE_DURATION_SEC,
  CUTTER_OVERDRIVE_DAMAGE_MUL,
  calcCutterRotateMs,
  cutterNormalAttack,
  cutterStartOverdrive,
  cutterStats,
  cutterTickOverdrive,
  isAngleInRange,
  shortestAngleDiff,
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
    attackSpeed: 1,
    activePower: 1,
    activeCdReduction: 0,
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
  it('Lv0 で初期値が正しい (AS=1.0, damageMul=1.2, blades=2)', () => {
    const stats = cutterStats(0);
    expect(stats.attackPerSec).toBeCloseTo(CUTTER_BASE_AS);
    expect(stats.attackPerSec).toBeCloseTo(1.0);
    expect(stats.orbitRadius).toBe(CUTTER_BASE_ORBIT_RADIUS);
    expect(stats.orbitRadius).toBe(80);
    expect(stats.blades).toBe(CUTTER_BLADES);
    expect(stats.blades).toBe(2);
    expect(stats.damageMul).toBeCloseTo(CUTTER_BASE_DAMAGE_MUL);
    expect(stats.damageMul).toBeCloseTo(1.2);
    // 単体 DPS = AS × damageMul = 1.0 × 1.2 = 1.2 (2 体時 2.4)
    expect(stats.attackPerSec * stats.damageMul).toBeCloseTo(1.2);
    expect(stats.overdriveDurationSec).toBeCloseTo(CUTTER_OVERDRIVE_BASE_DURATION_SEC);
    expect(stats.overdriveDurationSec).toBeCloseTo(8);
    expect(stats.overdriveAttackSpeedMul).toBe(CUTTER_OVERDRIVE_ATTACK_SPEED_MUL);
    expect(stats.overdriveAttackSpeedMul).toBe(3);
    expect(stats.overdriveDamageMul).toBe(CUTTER_OVERDRIVE_DAMAGE_MUL);
    expect(stats.overdriveDamageMul).toBe(3);
  });

  it('Lv10 で AS / dmg がスケールし、 blades / orbitRadius は固定', () => {
    const stats = cutterStats(10);
    expect(stats.attackPerSec).toBeCloseTo(CUTTER_BASE_AS * 1.3);
    expect(stats.orbitRadius).toBe(80);
    expect(stats.blades).toBe(2);
    expect(stats.damageMul).toBeCloseTo(CUTTER_BASE_DAMAGE_MUL * Math.pow(1.02, 10), 5);
  });

  it('Lv 60 で Overdrive 持続が 14s に延びる (8 + 0.1×60)', () => {
    const stats = cutterStats(60);
    expect(stats.overdriveDurationSec).toBeCloseTo(14);
  });

  it('Lv50 で blades / orbitRadius は固定のまま', () => {
    const stats = cutterStats(50);
    expect(stats.attackPerSec).toBeCloseTo(CUTTER_BASE_AS * (1 + 0.03 * 50));
    expect(stats.orbitRadius).toBe(80);
    expect(stats.blades).toBe(2);
    expect(stats.damageMul).toBeCloseTo(CUTTER_BASE_DAMAGE_MUL * Math.pow(1.02, 50), 5);
    expect(stats.overdriveDurationSec).toBeCloseTo(13);
  });

  it('Lv100 で blades=2、 orbitRadius=80、 OD 持続=18s', () => {
    const stats = cutterStats(100);
    expect(stats.attackPerSec).toBeCloseTo(CUTTER_BASE_AS * (1 + 0.03 * 100));
    expect(stats.orbitRadius).toBe(80);
    expect(stats.blades).toBe(2);
    expect(stats.damageMul).toBeCloseTo(CUTTER_BASE_DAMAGE_MUL * Math.pow(1.02, 100), 3);
    expect(stats.overdriveDurationSec).toBeCloseTo(18);
  });
});

// ---------------------------------------------------------------------------
// cutterNormalAttack: sweep ベースの当たり判定
// ---------------------------------------------------------------------------

describe('cutterNormalAttack', () => {
  const machine = makeMachine();
  const inRange = (id: string, x = 70, y = 50) => makeEnemy(id, x, y);

  it('敵 1 体ならその 1 体だけヒットする (blades=2 でも余りはヒットなし)', () => {
    const stats = cutterStats(0);
    const result = cutterNormalAttack(machine, stats, [inRange('e1', 70)], 0, rngNever);
    expect(result.hits).toHaveLength(1);
    expect(result.hits[0].enemyId).toBe('e1');
  });

  it('enemiesInRange が空のとき hits も空', () => {
    const stats = cutterStats(0);
    const result = cutterNormalAttack(machine, stats, [], 0, rngNever);
    expect(result.hits).toHaveLength(0);
  });

  it('blades=2 (固定): 1 fire の sweep 合計は 360° → どの方向の敵も候補、 先頭 2 体ヒット', () => {
    const stats = cutterStats(0);
    const right = inRange('right', 70, 50); // 0°
    const down = inRange('down', 50, 70); // 90°
    const left = inRange('left', 30, 50); // 180°
    const up = inRange('up', 50, 30); // 270°
    const result = cutterNormalAttack(machine, stats, [right, down, left, up], 0, rngNever);
    // blades=2 で先頭 2 体 (enemiesInRange の順)
    expect(result.hits.map((h) => h.enemyId)).toEqual(['right', 'down']);
  });

  it('Lv100 でも blades=2 のまま 2 体までしかヒットしない', () => {
    const stats = cutterStats(100);
    const enemies = [
      inRange('e1', 70, 50),
      inRange('e2', 50, 70),
      inRange('e3', 30, 50),
      inRange('e4', 50, 30),
    ];
    const result = cutterNormalAttack(machine, stats, enemies, 0, rngNever);
    expect(result.hits).toHaveLength(2);
  });

  it('blades=2 default: 反対側 (180°) の敵にもヒット', () => {
    const stats = cutterStats(0);
    const leftEnemy = inRange('left', 30, 50);
    const result = cutterNormalAttack(machine, stats, [leftEnemy], 0, rngNever);
    expect(result.hits).toHaveLength(1);
    expect(result.hits[0].enemyId).toBe('left');
  });

  it('ダメージが正しく計算される (クリなし、 damageMul=1.2)', () => {
    const baseAttack = 200;
    const stats = cutterStats(0);
    const m = makeMachine({ baseAttack: BigNum.fromNumber(baseAttack) });
    const result = cutterNormalAttack(m, stats, [inRange('e1', 70)], 0, rngNever);
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
    const result = cutterNormalAttack(m, stats, [inRange('e1', 70)], 0, rngNever);
    expect(result.hits[0].crit).toBe(true);
    const expected = BigNum.fromNumber(baseAttack).mulNumber(CUTTER_BASE_DAMAGE_MUL).mulNumber(2.0);
    expect(result.hits[0].damage.eq(expected)).toBe(true);
  });

  it('旋回角度が 1 fire で 360/blades 度進む (blades=2 → 180°)', () => {
    const stats = cutterStats(0);
    const result = cutterNormalAttack(machine, stats, [], 0, rngNever);
    expect(result.angle).toBeCloseTo(180);
  });

  it('blades 引数を明示すると stats.blades を上書きする (テスト用: blades=4 → 90°)', () => {
    const stats = cutterStats(0);
    const result = cutterNormalAttack(machine, stats, [], 0, rngNever, 4);
    expect(result.angle).toBeCloseTo(90);
  });

  it('angle が 360 を超えたとき 0〜360 に正規化される', () => {
    const stats = cutterStats(0);
    // currentAngleDeg=270 + 180 (blades=2) = 450 → 90 に正規化
    const result = cutterNormalAttack(machine, stats, [], 270, rngNever);
    expect(result.angle).toBeCloseTo(90);
  });
});

// ---------------------------------------------------------------------------
// Overdrive
// ---------------------------------------------------------------------------

describe('cutterStartOverdrive', () => {
  it('Lv0: active=true、 remainingSec=8、 attackSpeedMul=3、 damageMul=3 で開始する', () => {
    const stats = cutterStats(0);
    const state = cutterStartOverdrive(stats);
    expect(state.active).toBe(true);
    expect(state.remainingSec).toBeCloseTo(8);
    expect(state.attackSpeedMul).toBe(3);
    expect(state.damageMul).toBe(3);
  });

  it('Lv60: remainingSec=14 (8 + 0.1×60) で開始する', () => {
    const stats = cutterStats(60);
    const state = cutterStartOverdrive(stats);
    expect(state.remainingSec).toBeCloseTo(14);
    expect(state.damageMul).toBe(3);
  });

  it('Lv100: remainingSec=18 (8 + 0.1×100) で開始する', () => {
    const stats = cutterStats(100);
    const state = cutterStartOverdrive(stats);
    expect(state.remainingSec).toBeCloseTo(18);
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
    expect(after.damageMul).toBe(3);
  });

  it('残り時間ちょうどで終了したとき active=false になり、 バフ倍率は 1 に戻る', () => {
    const stats = cutterStats(0);
    const initial = cutterStartOverdrive(stats);
    const after = cutterTickOverdrive(initial, 8);
    expect(after.active).toBe(false);
    expect(after.remainingSec).toBe(0);
    expect(after.attackSpeedMul).toBe(1);
    expect(after.damageMul).toBe(1);
  });

  it('残り時間を超える deltaSec でも active=false、 remainingSec=0', () => {
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

// ---------------------------------------------------------------------------
// calcCutterRotateMs: CutterOrbitFx の 1 周時間
// ---------------------------------------------------------------------------

describe('calcCutterRotateMs', () => {
  it('attackPerSec=1, blades=2 → 2000ms (Lv0 基本値: AS=1.0/sec、 2 秒で 1 周)', () => {
    expect(calcCutterRotateMs(1, 2)).toBe(2000);
  });

  it('attackPerSec=2.5, blades=2 → 800ms', () => {
    expect(calcCutterRotateMs(2.5, 2)).toBe(800);
  });

  it('Overdrive ×3 (AS=3.0, blades=2) → 約 667ms (Lv0 AS=1.0 × 3)', () => {
    expect(calcCutterRotateMs(3.0, 2)).toBeCloseTo(666.67, 1);
  });

  it('刃の数が増えると 1 周時間も伸びる (AS=1.0, blades=4 → 4000ms)', () => {
    expect(calcCutterRotateMs(1.0, 4)).toBe(4000);
  });

  it('AS=0 のとき Infinity (静止扱い)', () => {
    expect(calcCutterRotateMs(0, 2)).toBe(Number.POSITIVE_INFINITY);
  });

  it('負値 (異常入力) も Infinity', () => {
    expect(calcCutterRotateMs(-1, 2)).toBe(Number.POSITIVE_INFINITY);
  });
});

// ---------------------------------------------------------------------------
// shortestAngleDiff / isAngleInRange: 角度ヘルパー
// ---------------------------------------------------------------------------

describe('shortestAngleDiff', () => {
  it('同じ角度なら 0', () => {
    expect(shortestAngleDiff(45, 45)).toBe(0);
  });

  it('境界をまたぐ場合に最短差を返す (350° と 10° → 20°)', () => {
    expect(shortestAngleDiff(350, 10)).toBeCloseTo(20);
    expect(shortestAngleDiff(10, 350)).toBeCloseTo(20);
  });

  it('180° の半周差', () => {
    expect(shortestAngleDiff(0, 180)).toBe(180);
  });

  it('結果は常に 0〜180', () => {
    expect(shortestAngleDiff(720, 0)).toBe(0);
    expect(shortestAngleDiff(-90, 0)).toBe(90);
  });
});

describe('isAngleInRange', () => {
  it('範囲内ならtrue', () => {
    expect(isAngleInRange(50, 0, 90)).toBe(true);
    expect(isAngleInRange(0, 0, 90)).toBe(true);
    expect(isAngleInRange(90, 0, 90)).toBe(true);
  });

  it('範囲外なら false', () => {
    expect(isAngleInRange(91, 0, 90)).toBe(false);
    expect(isAngleInRange(-1, 0, 90)).toBe(false);
  });

  it('360° 境界をまたぐ範囲 (start=350, span=20 → [350, 370 = 10])', () => {
    expect(isAngleInRange(355, 350, 20)).toBe(true);
    expect(isAngleInRange(5, 350, 20)).toBe(true);
    expect(isAngleInRange(20, 350, 20)).toBe(false);
  });

  it('span=180 ならちょうど半周をカバー', () => {
    expect(isAngleInRange(0, 0, 180)).toBe(true);
    expect(isAngleInRange(180, 0, 180)).toBe(true);
    expect(isAngleInRange(181, 0, 180)).toBe(false);
  });
});
