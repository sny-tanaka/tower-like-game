/**
 * cannon.test.ts — Cannon 武器ロジックのユニットテスト
 *
 * カバー範囲:
 *   - cannonStats: Lv スケール検証
 *   - cannonNormalAttack: splashRadius 内の全敵ヒット、外の敵は対象外、splashRadius=0 の挙動
 *   - cannonVolley: 5 発生成、各 shot の角度差が 72°、ヒット範囲検証
 */

import { describe, it, expect } from 'vitest';

import {
  CANNON_BASE_AS,
  CANNON_BASE_DAMAGE_MUL,
  VOLLEY_CD_SEC,
  VOLLEY_SHOTS,
  cannonNormalAttack,
  cannonStats,
  cannonVolley,
} from './cannon';
import type { CannonStats } from './cannon';

import type { MachineStats } from '@/game/damage.types';
import type { SpawnedEnemy } from '@/game/types';
import { BigNum } from '@/lib/bignum/BigNum';

// ---------------------------------------------------------------------------
// テスト用ユーティリティ
// ---------------------------------------------------------------------------

/** 常に 0.5 を返す確定的 RNG */
const rngFixed = (): number => 0.5;
/** 常に 0 を返す RNG（クリ確定） */
const rngCrit = (): number => 0;
/** 常に 1 を返す RNG（クリ不発） */
const rngNoCrit = (): number => 0.9999;

/** デフォルトのマシンステータス（クリ率 0）*/
function defaultMachine(overrides?: Partial<MachineStats>): MachineStats {
  return {
    baseAttack: BigNum.fromNumber(100),
    defense: BigNum.ZERO,
    damageReduction: 0,
    critRate: 0,
    critMultiplier: 2,
    maxHp: BigNum.fromNumber(1000),
    hpRegen: BigNum.ZERO,
    attackSpeed: 1,
    activePower: 1,
    activeCdReduction: 0,
    ...overrides,
  };
}

/** テスト用 SpawnedEnemy を簡易生成する */
function makeEnemy(id: string, x: number, y: number): SpawnedEnemy {
  return {
    id,
    kind: 'normal',
    subtype: 'standard',
    hp: BigNum.fromNumber(1000),
    atk: BigNum.fromNumber(10),
    speed: 1,
    reward: { screw: 1, bolt: 1, alloyChance: 0, alloyAmount: 0 },
    spawnedAtMs: 0,
    position: { x, y },
    maxHp: BigNum.fromNumber(1000),
  };
}

// ---------------------------------------------------------------------------
// cannonStats
// ---------------------------------------------------------------------------

describe('cannonStats', () => {
  it('Lv 0 は底値を返す', () => {
    const s = cannonStats(0);
    expect(s.attackPerSec).toBeCloseTo(CANNON_BASE_AS);
    expect(s.splashRadius).toBeCloseTo(30);
    expect(s.damageMul).toBeCloseTo(CANNON_BASE_DAMAGE_MUL);
    expect(s.volleyCdSec).toBe(VOLLEY_CD_SEC);
    expect(s.volleyShots).toBe(VOLLEY_SHOTS);
    expect(s.volleyDamageMul).toBeCloseTo(20);
  });

  it('Lv 10 のスケール: damageMul と attackPerSec が Lv で増加', () => {
    const s = cannonStats(10);
    // 武器ダメージ倍率: CANNON_BASE_DAMAGE_MUL × 1.02^10
    expect(s.damageMul).toBeCloseTo(CANNON_BASE_DAMAGE_MUL * Math.pow(1.02, 10), 4);
    // AS: CANNON_BASE_AS × (1 + 0.03 × 10)
    expect(s.attackPerSec).toBeCloseTo(CANNON_BASE_AS * 1.3, 5);
    // 爆発半径: 30 + 0.5 × 10 = 35
    expect(s.splashRadius).toBeCloseTo(35, 5);
    // Volley ダメ倍率: 20 × (1 + 0.05 × 10) = 30
    expect(s.volleyDamageMul).toBeCloseTo(30, 5);
  });

  it('Lv 50 のスケール', () => {
    const s = cannonStats(50);
    expect(s.damageMul).toBeCloseTo(CANNON_BASE_DAMAGE_MUL * Math.pow(1.02, 50), 4);
    expect(s.attackPerSec).toBeCloseTo(CANNON_BASE_AS * (1 + 0.03 * 50), 5);
    expect(s.splashRadius).toBeCloseTo(55, 5);
  });

  it('Lv 100 のスケール', () => {
    const s = cannonStats(100);
    expect(s.attackPerSec).toBeCloseTo(CANNON_BASE_AS * (1 + 0.03 * 100), 5);
  });

  it('AS 上限 10 attacks/sec を超えない', () => {
    // BASE_AS × (1 + 0.03 × Lv) = 10 を超える Lv で必ず 10 にクランプ
    const sHigh = cannonStats(9999);
    expect(sHigh.attackPerSec).toBe(10);
  });

  it('負の Lv は Lv 0 として扱う', () => {
    const s = cannonStats(-5);
    expect(s.attackPerSec).toBeCloseTo(CANNON_BASE_AS);
    expect(s.splashRadius).toBeCloseTo(30);
    expect(s.damageMul).toBeCloseTo(CANNON_BASE_DAMAGE_MUL);
  });

  it('小数 Lv は切り捨て', () => {
    const s9 = cannonStats(9);
    const s9_9 = cannonStats(9.9);
    expect(s9.attackPerSec).toBeCloseTo(s9_9.attackPerSec, 10);
    expect(s9.splashRadius).toBeCloseTo(s9_9.splashRadius, 10);
    expect(s9.damageMul).toBeCloseTo(s9_9.damageMul, 10);
  });
});

// ---------------------------------------------------------------------------
// cannonNormalAttack
// ---------------------------------------------------------------------------

describe('cannonNormalAttack', () => {
  const machine = defaultMachine();
  const stats = cannonStats(0); // Lv 0: splashRadius = 30, damageMul = 1.0

  it('敵が 0 体のとき hits は空で blastX/Y はマシン中心', () => {
    const result = cannonNormalAttack(machine, stats, [], rngFixed);
    expect(result.hits).toHaveLength(0);
    expect(result.blastX).toBe(50);
    expect(result.blastY).toBe(50);
  });

  it('最寄り敵が着弾点になる (マシン中心 50,50 基準)', () => {
    // マシン中心 (50, 50)
    // enemyA: (60, 50) → 距離 10 (最寄り)
    // enemyB: (90, 50) → 距離 40
    const enemyA = makeEnemy('A', 60, 50);
    const enemyB = makeEnemy('B', 90, 50);
    const result = cannonNormalAttack(machine, stats, [enemyA, enemyB], rngFixed);
    expect(result.blastX).toBe(60);
    expect(result.blastY).toBe(50);
  });

  it('splashRadius 内の全敵がヒットする', () => {
    // splashRadius = 30
    // マシン中心 (50, 50)
    //   NEAR(x=60, y=50):  マシンから距離 10 → 最寄り、 着弾点
    //   MID (x=65, y=50):  着弾点 NEAR から距離 5 ≤ 30 → ヒット
    //   OUT (x=30, y=20):  着弾点 NEAR から √(900+900)≈42.4 > 30 → スプラッシュ外
    const statsLv0: CannonStats = { ...stats, splashRadius: 30 };
    const enemyNear = makeEnemy('NEAR', 60, 50);
    const enemyMid = makeEnemy('MID', 65, 50);
    const enemyOut = makeEnemy('OUT', 30, 20);

    const result = cannonNormalAttack(machine, statsLv0, [enemyNear, enemyMid, enemyOut], rngFixed);

    // 着弾点は enemyNear (最寄り)
    expect(result.blastX).toBe(60);
    const hitIds = result.hits.map((h) => h.enemyId);
    expect(hitIds).toContain('NEAR');
    expect(hitIds).toContain('MID');
    expect(hitIds).not.toContain('OUT');
  });

  it('splashRadius=0 のときメインターゲット (最寄り敵) のみヒット', () => {
    const statsZeroRadius: CannonStats = { ...stats, splashRadius: 0 };
    // マシン中心 (50,50) から: NEAR(60,50) が距離 10 で最寄り、 FAR(90,50) は 40
    const enemyNear = makeEnemy('NEAR', 60, 50);
    const enemyFar = makeEnemy('FAR', 90, 50);

    const result = cannonNormalAttack(machine, statsZeroRadius, [enemyFar, enemyNear], rngFixed);
    // NEAR が着弾点 (最寄り)、 距離 0 → ヒット
    // FAR は着弾点から距離 30 > 0 → ヒットしない
    expect(result.hits).toHaveLength(1);
    expect(result.hits[0]!.enemyId).toBe('NEAR');
  });

  it('クリ発動でダメージが増加する', () => {
    const machineCrit = defaultMachine({ critRate: 1, critMultiplier: 2 });
    const enemyA = makeEnemy('A', 50, 50);

    const resultCrit = cannonNormalAttack(machineCrit, stats, [enemyA], rngCrit);
    const resultNoCrit = cannonNormalAttack(defaultMachine(), stats, [enemyA], rngNoCrit);

    expect(resultCrit.hits[0]!.crit).toBe(true);
    expect(resultCrit.hits[0]!.damage.compare(resultNoCrit.hits[0]!.damage)).toBe(1);
  });

  it('クリ判定は全ヒットに一律適用される', () => {
    const machineCrit = defaultMachine({ critRate: 1, critMultiplier: 2 });
    // 複数敵が splashRadius 内にいる
    const enemyFar = makeEnemy('FAR', 80, 50);
    const enemyNear = makeEnemy('NEAR', 82, 50); // 距離 2 ≤ 30
    const statsWide: CannonStats = { ...stats, splashRadius: 30 };

    const result = cannonNormalAttack(machineCrit, statsWide, [enemyFar, enemyNear], rngCrit);
    expect(result.hits.length).toBeGreaterThanOrEqual(2);
    // 全ヒットが crit
    result.hits.forEach((h) => expect(h.crit).toBe(true));
  });

  it('damageMul が正しくダメージに反映される', () => {
    // Lv 0: damageMul=1.0, Lv 10: damageMul=1.02^10
    const statsLv10 = cannonStats(10);
    const enemy = makeEnemy('A', 50, 50);

    const resultLv0 = cannonNormalAttack(machine, stats, [enemy], rngNoCrit);
    const resultLv10 = cannonNormalAttack(machine, statsLv10, [enemy], rngNoCrit);

    // Lv 10 の方がダメージが大きいはず
    expect(resultLv10.hits[0]!.damage.compare(resultLv0.hits[0]!.damage)).toBe(1);
  });
});

// ---------------------------------------------------------------------------
// cannonVolley
// ---------------------------------------------------------------------------

describe('cannonVolley', () => {
  const machine = defaultMachine();
  const stats = cannonStats(0); // Lv 0: volleyShots=5, volleyDamageMul=20

  it('敵が 0 体でも 5 shot を生成する', () => {
    const result = cannonVolley(machine, stats, []);
    expect(result.shots).toHaveLength(5);
    result.shots.forEach((s) => {
      expect(s.targetEnemyId).toBeNull();
      expect(s.hits).toHaveLength(0);
    });
  });

  it('5 発撃つ (volleyShots=5)', () => {
    const enemies = [makeEnemy('A', 50, 50)];
    const result = cannonVolley(machine, stats, enemies);
    expect(result.shots).toHaveLength(stats.volleyShots);
    expect(result.shots).toHaveLength(5);
  });

  it('各 shot の着弾点角度が 72° 刻みになっている', () => {
    // 敵なし（全 shot が仮想着弾点）で角度を検証する
    // 敵なし → baseDeg = 0°（デフォルト）
    // shot[i] の着弾点 = (cos(72°×i), sin(72°×i)) × 100 + マシン座標
    const machineX = 50; // useBattleLoop の MACHINE_CENTER と一致
    const machineY = 50;
    const result = cannonVolley(machine, stats, []);

    // 各 shot の着弾点からマシンへの角度を計算
    const angles = result.shots.map((s) => {
      const dx = s.blastX - machineX;
      const dy = s.blastY - machineY;
      return (Math.atan2(dy, dx) * 180) / Math.PI;
    });

    // 連続する角度の差が 72° であること
    for (let i = 1; i < angles.length; i++) {
      let diff = angles[i]! - angles[i - 1]!;
      // 角度を -180 〜 180 に正規化
      while (diff > 180) diff -= 360;
      while (diff < -180) diff += 360;
      expect(Math.abs(diff)).toBeCloseTo(72, 1);
    }
  });

  it('shot の爆発半径は通常の 3 倍（Volley は splashRadius × 3 を使う）', () => {
    // splashRadius=30 → volley splashRadius=90
    // マシン(x=50, y=50)
    // baseDeg は最近の敵 CLOSE(x=60,y=50) の方向 = 0°
    // shot[0] 方向 cos(0°)=1, sin(0°)=0
    //   各敵の射影 = (ex - 50) × 1 + (ey - 50) × 0 = ex - 50
    //   CLOSE 射影 = 10、FAR 射影 = 40（最大）→ shot[0] 着弾点 = FAR
    //   EXTRA(x=55, y=50): 射影 = 5 < 40。
    //     FAR(x=90, y=50) から EXTRA(x=55, y=50) の距離 = 35 > 30（通常外）、≤ 90（Volley 内）
    const statsLv0 = cannonStats(0); // splashRadius=30

    const close = makeEnemy('CLOSE', 60, 50); // 最近の敵 → baseDeg=0°
    const far = makeEnemy('FAR', 90, 50); // 射影最大 → shot[0] の着弾点
    const extra = makeEnemy('EXTRA', 55, 50); // FAR から距離 35、射影 5

    const result = cannonVolley(machine, statsLv0, [close, far, extra]);

    const shot0 = result.shots[0]!;
    expect(shot0.targetEnemyId).toBe('FAR');
    // EXTRA は Volley 半径 90 内（FAR から距離 35） → ヒット
    expect(shot0.hits.map((h) => h.enemyId)).toContain('EXTRA');
  });

  it('Volley ダメージは通常攻撃の damageMul × volleyDamageMul 倍になっている', () => {
    // baseAttack=100, Lv0: damageMul=CANNON_BASE_DAMAGE_MUL, volleyDamageMul=20
    // 敵をマシン (50,50) から離して baseDeg / 射影 が決定するようにする
    const enemy = makeEnemy('A', 70, 50);
    const result = cannonVolley(machine, stats, [enemy]);

    const shot0 = result.shots[0]!;
    expect(shot0.hits.length).toBeGreaterThan(0);

    // 100 × CANNON_BASE_DAMAGE_MUL × 20
    const expectedDmg = BigNum.fromNumber(100 * CANNON_BASE_DAMAGE_MUL * 20);
    expect(shot0.hits[0]!.damage.eq(expectedDmg)).toBe(true);
  });

  it('同一敵が複数 shot にまたがってヒットし得る', () => {
    // 敵をマシン (50,50) から右に置いて shot[0] にヒットすることを保証
    const enemy = makeEnemy('A', 70, 50);
    const result = cannonVolley(machine, stats, [enemy]);

    // どこかの shot に enemy A のヒットがある
    const allHitIds = result.shots.flatMap((s) => s.hits.map((h) => h.enemyId));
    expect(allHitIds).toContain('A');
  });

  it('spreadDeg=0 のとき全 shot が同じ方向を向く', () => {
    const enemy = makeEnemy('A', 70, 50);
    const result = cannonVolley(machine, stats, [enemy], 0);

    // 全 5 shot の blastX / blastY が同一
    const first = result.shots[0]!;
    result.shots.forEach((s) => {
      expect(s.blastX).toBeCloseTo(first.blastX, 5);
      expect(s.blastY).toBeCloseTo(first.blastY, 5);
    });
  });
});
