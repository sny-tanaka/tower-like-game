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
    range: 150,
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

  it('v1.1.1: Lv 10 で attackPerSec / damageMul / blades / orbitRadius は固定、Overdrive 持続のみ伸びる', () => {
    const stats = cutterStats(10);
    expect(stats.attackPerSec).toBeCloseTo(CUTTER_BASE_AS); // 固定
    expect(stats.damageMul).toBeCloseTo(CUTTER_BASE_DAMAGE_MUL); // 固定
    expect(stats.orbitRadius).toBe(80);
    expect(stats.blades).toBe(2);
    expect(stats.overdriveDurationSec).toBeCloseTo(9); // 8 + 0.1×10
  });

  it('v1.1.1: Lv 60 で Overdrive 持続が 14s に延びる (8 + 0.1×60)、それ以外は固定', () => {
    const stats = cutterStats(60);
    expect(stats.attackPerSec).toBeCloseTo(CUTTER_BASE_AS);
    expect(stats.damageMul).toBeCloseTo(CUTTER_BASE_DAMAGE_MUL);
    expect(stats.overdriveDurationSec).toBeCloseTo(14);
  });

  it('v1.1.1: Lv 100 で blades=2、orbitRadius=80、OD 持続=18s、AS/dmg は固定', () => {
    const stats = cutterStats(100);
    expect(stats.attackPerSec).toBeCloseTo(CUTTER_BASE_AS);
    expect(stats.damageMul).toBeCloseTo(CUTTER_BASE_DAMAGE_MUL);
    expect(stats.orbitRadius).toBe(80);
    expect(stats.blades).toBe(2);
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

  it('v1.1.2: blades=2 で 1 fire の sweep 合計は 360° → 範囲内の全敵にヒット (上限なし)', () => {
    const stats = cutterStats(0);
    const right = inRange('right', 70, 50); // 0°
    const down = inRange('down', 50, 70); // 90°
    const left = inRange('left', 30, 50); // 180°
    const up = inRange('up', 50, 30); // 270°
    const result = cutterNormalAttack(machine, stats, [right, down, left, up], 0, rngNever);
    // v1.1.2: 刃が物理的に触れた敵全員にヒット (旧仕様の「最大 blades 体」上限を撤廃)
    expect(result.hits.map((h) => h.enemyId).sort()).toEqual(
      ['down', 'left', 'right', 'up'].sort()
    );
  });

  it('v1.1.2: Lv100 でも blades=2、4 体範囲内なら 4 体全員ヒット', () => {
    const stats = cutterStats(100);
    const enemies = [
      inRange('e1', 70, 50),
      inRange('e2', 50, 70),
      inRange('e3', 30, 50),
      inRange('e4', 50, 30),
    ];
    const result = cutterNormalAttack(machine, stats, enemies, 0, rngNever);
    expect(result.hits).toHaveLength(4);
  });

  it('v1.1.2: 1 rotation (= blades fires) で各敵が blades 回 (=2 回) ヒットを受ける', () => {
    const stats = cutterStats(0);
    const blades = stats.blades; // 2
    const enemy = inRange('e1', 70, 50);
    // 2 連続の fire で計 360° カバー、 各 fire で 1 ヒット
    let angle = 0;
    let totalHits = 0;
    for (let i = 0; i < blades; i++) {
      const result = cutterNormalAttack(machine, stats, [enemy], angle, rngNever);
      totalHits += result.hits.length;
      angle = result.angle;
    }
    expect(totalHits).toBe(blades);
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

  it('クリット時にCritical倍率が乗算される', () => {
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

  // progressInSweep: 視覚と pop タイミング同期のためのフィールド
  describe('progressInSweep', () => {
    it('sweep 開始角度 (currentAngleDeg) と同じ位置にいる敵は progress ≈ 0', () => {
      const stats = cutterStats(0);
      // currentAngleDeg=0 → blade A の sweep は 0°〜180°、 0°の敵 (右真横) は progress=0
      const result = cutterNormalAttack(machine, stats, [inRange('e1', 70, 50)], 0, rngNever);
      const hit = result.hits.find((h) => h.enemyId === 'e1');
      expect(hit?.progressInSweep).toBeCloseTo(0, 2);
    });

    it('sweep 中央 (start + sweepDeg/2) にいる敵は progress ≈ 0.5', () => {
      const stats = cutterStats(0);
      // blade A の sweep は 0°〜180°、 90° (下) の敵は progress=0.5
      const result = cutterNormalAttack(machine, stats, [inRange('down', 50, 70)], 0, rngNever);
      const hit = result.hits.find((h) => h.enemyId === 'down');
      expect(hit?.progressInSweep).toBeCloseTo(0.5, 2);
    });

    it('sweep 終端 (start + sweepDeg) にいる敵は progress ≈ 1 / または別 blade で 0', () => {
      const stats = cutterStats(0);
      // blade A: 0°〜180° の終端 = 180°、 ただし blade B (180°〜360°) の開始でもあるので progress=0
      const result = cutterNormalAttack(machine, stats, [inRange('left', 30, 50)], 0, rngNever);
      const hit = result.hits.find((h) => h.enemyId === 'left');
      // 「最も早く通過する刃」 を選ぶ仕様: blade B の始点として 0 を返す
      expect(hit?.progressInSweep).toBeCloseTo(0, 2);
    });

    it('全 progressInSweep は 0〜1 の範囲に収まる', () => {
      const stats = cutterStats(0);
      const enemies = [
        inRange('right', 70, 50),
        inRange('down', 50, 70),
        inRange('left', 30, 50),
        inRange('up', 50, 30),
      ];
      const result = cutterNormalAttack(machine, stats, enemies, 0, rngNever);
      for (const hit of result.hits) {
        expect(hit.progressInSweep).toBeGreaterThanOrEqual(0);
        expect(hit.progressInSweep).toBeLessThanOrEqual(1);
      }
    });
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
