/**
 * cannon.test.ts — Cannon 武器ロジックのユニットテスト
 *
 * カバー範囲:
 *   - cannonStats: Lv スケール検証
 *   - cannonNormalAttack: splashRadius 内の全敵ヒット、外の敵は対象外、splashRadius=0 の挙動
 *   - cannonVolley: 5 発生成、各 shot の角度差が 72°、ヒット範囲検証
 */

import { describe, it, expect } from 'vitest';

import { cannonStats, cannonNormalAttack, cannonVolley } from './cannon';
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
  };
}

// ---------------------------------------------------------------------------
// cannonStats
// ---------------------------------------------------------------------------

describe('cannonStats', () => {
  it('Lv 0 は底値を返す', () => {
    const s = cannonStats(0);
    expect(s.attackPerSec).toBeCloseTo(0.5);
    expect(s.splashRadius).toBeCloseTo(30);
    expect(s.damageMul).toBeCloseTo(1.0);
    expect(s.volleyCdSec).toBe(25);
    expect(s.volleyShots).toBe(5);
    expect(s.volleyDamageMul).toBeCloseTo(20);
  });

  it('Lv 10 のスケール確認（仕様早見表と一致）', () => {
    const s = cannonStats(10);
    // 武器ダメージ倍率: 1.02^10 ≈ 1.2190
    expect(s.damageMul).toBeCloseTo(Math.pow(1.02, 10), 4);
    // AS: 0.5 × (1 + 0.03 × 10) = 0.5 × 1.30 = 0.65
    expect(s.attackPerSec).toBeCloseTo(0.65, 5);
    // 爆発半径: 30 + 0.5 × 10 = 35
    expect(s.splashRadius).toBeCloseTo(35, 5);
    // Volley ダメ倍率: 20 × (1 + 0.05 × 10) = 20 × 1.5 = 30
    expect(s.volleyDamageMul).toBeCloseTo(30, 5);
  });

  it('Lv 50 のスケール確認', () => {
    const s = cannonStats(50);
    // 武器ダメージ倍率: 1.02^50 ≈ 2.6916
    expect(s.damageMul).toBeCloseTo(Math.pow(1.02, 50), 4);
    // AS: 0.5 × (1 + 0.03 × 50) = 0.5 × 2.50 = 1.25
    expect(s.attackPerSec).toBeCloseTo(1.25, 5);
    // 爆発半径: 30 + 0.5 × 50 = 55
    expect(s.splashRadius).toBeCloseTo(55, 5);
  });

  it('Lv 100 のスケール確認', () => {
    const s = cannonStats(100);
    // AS: 0.5 × (1 + 0.03 × 100) = 0.5 × 4.0 = 2.0
    expect(s.attackPerSec).toBeCloseTo(2.0, 5);
  });

  it('AS 上限 10 attacks/sec を超えない', () => {
    // 0.5 × (1 + 0.03 × Lv) = 10 → Lv = (10/0.5 - 1) / 0.03 = 633.33...
    // Lv 634 で初めて上限に達する
    const s = cannonStats(634);
    expect(s.attackPerSec).toBe(10);
    const sHigh = cannonStats(999);
    expect(sHigh.attackPerSec).toBe(10);
  });

  it('負の Lv は Lv 0 として扱う', () => {
    const s = cannonStats(-5);
    expect(s.attackPerSec).toBeCloseTo(0.5);
    expect(s.splashRadius).toBeCloseTo(30);
    expect(s.damageMul).toBeCloseTo(1.0);
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

  it('敵が 0 体のとき hits は空で blastX/Y はデフォルト', () => {
    const result = cannonNormalAttack(machine, stats, [], rngFixed);
    expect(result.hits).toHaveLength(0);
    expect(result.blastX).toBe(0);
    expect(result.blastY).toBe(50);
  });

  it('最遠の敵が着弾点になる', () => {
    // マシンは x=0, y=50
    // enemyA: x=20, y=50 → 距離 20
    // enemyB: x=50, y=50 → 距離 50 (最遠)
    const enemyA = makeEnemy('A', 20, 50);
    const enemyB = makeEnemy('B', 50, 50);
    const result = cannonNormalAttack(machine, stats, [enemyA, enemyB], rngFixed);
    expect(result.blastX).toBe(50);
    expect(result.blastY).toBe(50);
  });

  it('splashRadius 内の全敵がヒットする', () => {
    // splashRadius = 30
    // マシン(x=0, y=50)
    //   FAR(x=80, y=50):  マシンから距離 80 → 最遠、着弾点
    //   NEAR(x=75, y=50): 着弾点 FAR から距離 5 ≤ 30 → ヒット（マシンから 75 < 80）
    //   OUT(x=60, y=15):  マシンから √(3600+1225)≈69.4 < 80、FAR から √(400+1225)≈40.3 > 30 → スプラッシュ外
    const statsLv0: CannonStats = { ...stats, splashRadius: 30 };
    const enemyFar = makeEnemy('FAR', 80, 50);
    const enemyNear = makeEnemy('NEAR', 75, 50); // FAR から距離 5、マシンから 75
    const enemyOut = makeEnemy('OUT', 60, 15); // FAR から距離 ~40.3

    const result = cannonNormalAttack(machine, statsLv0, [enemyFar, enemyNear, enemyOut], rngFixed);

    // 着弾点は enemyFar (最遠、距離 80)
    expect(result.blastX).toBe(80);
    const hitIds = result.hits.map((h) => h.enemyId);
    // FAR: 着弾点、距離 0 ≤ 30 → ヒット
    expect(hitIds).toContain('FAR');
    // NEAR: 距離 5 ≤ 30 → ヒット
    expect(hitIds).toContain('NEAR');
    // OUT: 距離 40.3 > 30 → ヒットしない
    expect(hitIds).not.toContain('OUT');
  });

  it('splashRadius=0 のときメインターゲットのみヒット', () => {
    // splashRadius=0 のとき、着弾点の敵（距離 0）のみヒット
    // マシン(0,50) から: NEAR(80.001,50) の方が FAR(80,50) より遠い → NEAR が着弾点
    // FAR は着弾点から距離 0.001 > 0 → ヒットしない
    const statsZeroRadius: CannonStats = { ...stats, splashRadius: 0 };
    const enemyFar = makeEnemy('FAR', 80, 50);
    const enemyNear = makeEnemy('NEAR', 80.001, 50); // マシンから距離 80.001 → 最遠、着弾点

    const result = cannonNormalAttack(machine, statsZeroRadius, [enemyFar, enemyNear], rngFixed);
    // NEAR が着弾点（最遠）、距離 0 → ヒット
    // FAR は着弾点から距離 0.001 > 0 → ヒットしない
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
    const machineX = 0;
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
    // マシン(x=0, y=50)
    // baseDeg は最近の敵 CLOSE(x=10,y=50) の方向 = 0°
    // shot[0] 方向 cos(0°)=1, sin(0°)=0
    //   CLOSE 射影 = 10
    //   FAR 射影 = 50 → shot[0] 着弾点
    //   EXTRA は y 方向にずらして 0° 方向の射影を小さくする
    //   EXTRA(x=50, y=85): 射影 = 50×1 + (85-50)×0 = 50（FAR と等しい）
    //   同一射影の場合は最初に見つかった方 → EXTRA を CLOSE, FAR の後に渡す
    //   ただし結果が不安定なので、EXTRA を FAR から上方向（y 方向）にずらす
    //   EXTRA(x=15, y=50): 射影 = 15 < 50 なので着弾点は FAR
    //   FAR(x=50,y=50) から EXTRA(x=15,y=50) の距離 = 35 > 30（通常外）、≤ 90（Volley 内）
    const statsLv0 = cannonStats(0); // splashRadius=30

    const close = makeEnemy('CLOSE', 10, 50); // 最近の敵 → baseDeg=0°
    const far = makeEnemy('FAR', 50, 50); // 射影最大 → shot[0] の着弾点
    // EXTRA: FAR から距離 35（通常半径 30 外）、Volley 半径 90 内、射影 15 < 50
    const extra = makeEnemy('EXTRA', 15, 50); // FAR から距離 35、射影 15

    const result = cannonVolley(machine, statsLv0, [close, far, extra]);

    const shot0 = result.shots[0]!;
    expect(shot0.targetEnemyId).toBe('FAR');
    // EXTRA は Volley 半径 90 内（FAR から距離 35） → ヒット
    expect(shot0.hits.map((h) => h.enemyId)).toContain('EXTRA');
  });

  it('Volley ダメージは通常攻撃の volleyDamageMul 倍になっている', () => {
    // Lv 0: damageMul=1.0, volleyDamageMul=20
    // 通常攻撃ダメ = 100 (baseAttack=100, damageMul=1.0, 防御/軽減 0)
    // Volley ダメ = 100 × 20 = 2000
    const enemy = makeEnemy('A', 50, 50);
    const result = cannonVolley(machine, stats, [enemy]);

    const shot0 = result.shots[0]!;
    // 少なくとも 1 体ヒットしている
    expect(shot0.hits.length).toBeGreaterThan(0);

    // ダメージを確認: 100 × 1.0 × 20 = 2000
    const expectedDmg = BigNum.fromNumber(100 * 1.0 * 20);
    expect(shot0.hits[0]!.damage.eq(expectedDmg)).toBe(true);
  });

  it('同一敵が複数 shot にまたがってヒットし得る', () => {
    // 全 5 shot が着弾点を共有するような位置に敵を配置
    // 敵を複数配置して複数 shot でヒットするか確認
    const enemy = makeEnemy('A', 50, 50);
    const result = cannonVolley(machine, stats, [enemy]);

    // どこかの shot に enemy A のヒットがある
    const allHitIds = result.shots.flatMap((s) => s.hits.map((h) => h.enemyId));
    expect(allHitIds).toContain('A');
  });

  it('spreadDeg=0 のとき全 shot が同じ方向を向く', () => {
    const enemy = makeEnemy('A', 50, 50);
    const result = cannonVolley(machine, stats, [enemy], 0);

    // 全 5 shot の blastX / blastY が同一
    const first = result.shots[0]!;
    result.shots.forEach((s) => {
      expect(s.blastX).toBeCloseTo(first.blastX, 5);
      expect(s.blastY).toBeCloseTo(first.blastY, 5);
    });
  });
});
