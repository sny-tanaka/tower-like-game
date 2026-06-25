/**
 * cannon.test.ts — Cannon 武器ロジックのユニットテスト
 *
 * カバー範囲:
 *   - cannonStats: Lv スケール検証（v1.1 底値）
 *   - cannonNormalAttack: splashRadius 内の全敵ヒット、外の敵は対象外、
 *     半円カット（マシン背面側の敵は除外）
 *   - cannonVolley: 5 発生成、各 shot の角度差が 72°、ヒット範囲検証、
 *     各 shot にも半円カット適用
 *
 * 仕様: design-docs/tower-like-game/14-weapons-rebalance-v1.1.md
 */

import { describe, it, expect } from 'vitest';

import {
  CANNON_BASE_AS,
  CANNON_BASE_DAMAGE_MUL,
  CANNON_SHELL_MS,
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

/** デフォルトのマシンステータス（Critical率 0）*/
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
    range: 150,
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
  it('Lv 0 は底値を返す (v1.1: damageMul=3.0, AS=0.5, splash=30, volleyMul=10)', () => {
    const s = cannonStats(0);
    expect(s.attackPerSec).toBeCloseTo(CANNON_BASE_AS);
    expect(s.splashRadius).toBeCloseTo(30);
    expect(s.damageMul).toBeCloseTo(CANNON_BASE_DAMAGE_MUL);
    expect(CANNON_BASE_DAMAGE_MUL).toBe(3.0);
    expect(s.volleyShots).toBe(VOLLEY_SHOTS);
    expect(s.volleyDamageMul).toBeCloseTo(10);
  });

  it('v1.1.1: Lv 10 で damageMul / attackPerSec / volleyDamageMul は固定底値、splash 半径だけ Lv で伸びる', () => {
    const s = cannonStats(10);
    expect(s.damageMul).toBeCloseTo(CANNON_BASE_DAMAGE_MUL); // Lv 不問固定
    expect(s.attackPerSec).toBeCloseTo(CANNON_BASE_AS); // Lv 不問固定
    expect(s.volleyDamageMul).toBeCloseTo(10); // Lv 不問固定
    expect(s.splashRadius).toBeCloseTo(35, 5); // Lv 軸: 30 + 0.5×10
  });

  it('v1.1.1: Lv 50 でも damageMul / attackPerSec / volleyDamageMul は固定、splash 半径のみ伸びる', () => {
    const s = cannonStats(50);
    expect(s.damageMul).toBeCloseTo(CANNON_BASE_DAMAGE_MUL);
    expect(s.attackPerSec).toBeCloseTo(CANNON_BASE_AS);
    expect(s.volleyDamageMul).toBeCloseTo(10);
    expect(s.splashRadius).toBeCloseTo(55, 5); // 30 + 0.5×50
  });

  it('v1.1.1: Lv 100 でも damageMul / attackPerSec / volleyDamageMul は固定、splash 半径のみ伸びる', () => {
    const s = cannonStats(100);
    expect(s.damageMul).toBeCloseTo(CANNON_BASE_DAMAGE_MUL);
    expect(s.attackPerSec).toBeCloseTo(CANNON_BASE_AS);
    expect(s.volleyDamageMul).toBeCloseTo(10);
    expect(s.splashRadius).toBeCloseTo(80, 5); // 30 + 0.5×100
  });

  it('v1.1.1: Lv 9999 でも attackPerSec は CANNON_BASE_AS で固定（AS は伸びないため上限到達しない）', () => {
    const sHigh = cannonStats(9999);
    expect(sHigh.attackPerSec).toBe(CANNON_BASE_AS);
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
  const stats = cannonStats(0); // Lv 0: splashRadius = 30, damageMul = 3.0

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

  it('splashRadius 内 かつ マシン前方の敵がヒットする', () => {
    // splashRadius = 30
    // マシン中心 (50, 50)
    //   NEAR(x=60, y=50):  マシンから距離 10 → 最寄り、 着弾点
    //   MID (x=65, y=50):  着弾点 NEAR から距離 5 ≤ 30、マシン前方 → ヒット
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
    //   半円判定: (60-50)×(60-50) + 0×0 = 100 > 0 → 前方 OK
    // FAR は着弾点から距離 30 > 0 → ヒットしない
    expect(result.hits).toHaveLength(1);
    expect(result.hits[0]!.enemyId).toBe('NEAR');
  });

  it('クリ発動でダメージが増加する', () => {
    const machineCrit = defaultMachine({ critRate: 1, critMultiplier: 2 });
    // マシン (50,50) より前方に置く（半円カット回避）
    const enemyA = makeEnemy('A', 60, 50);

    const resultCrit = cannonNormalAttack(machineCrit, stats, [enemyA], rngCrit);
    const resultNoCrit = cannonNormalAttack(defaultMachine(), stats, [enemyA], rngNoCrit);

    expect(resultCrit.hits).toHaveLength(1);
    expect(resultNoCrit.hits).toHaveLength(1);
    expect(resultCrit.hits[0]!.crit).toBe(true);
    expect(resultCrit.hits[0]!.damage.compare(resultNoCrit.hits[0]!.damage)).toBe(1);
  });

  it('クリ判定は全ヒットに一律適用される', () => {
    const machineCrit = defaultMachine({ critRate: 1, critMultiplier: 2 });
    // 複数敵が splashRadius 内にいる（どちらもマシン前方）
    const enemyFar = makeEnemy('FAR', 80, 50);
    const enemyNear = makeEnemy('NEAR', 82, 50); // 距離 2 ≤ 30
    const statsWide: CannonStats = { ...stats, splashRadius: 30 };

    const result = cannonNormalAttack(machineCrit, statsWide, [enemyFar, enemyNear], rngCrit);
    expect(result.hits.length).toBeGreaterThanOrEqual(2);
    // 全ヒットが crit
    result.hits.forEach((h) => expect(h.crit).toBe(true));
  });

  it('v1.1.1: damageMul は Lv 不問固定なので Lv 10 と Lv 0 で同ダメージ', () => {
    const statsLv10 = cannonStats(10);
    const enemy = makeEnemy('A', 60, 50);

    const resultLv0 = cannonNormalAttack(machine, stats, [enemy], rngNoCrit);
    const resultLv10 = cannonNormalAttack(machine, statsLv10, [enemy], rngNoCrit);

    expect(resultLv0.hits).toHaveLength(1);
    expect(resultLv10.hits).toHaveLength(1);
    expect(resultLv10.hits[0]!.damage.compare(resultLv0.hits[0]!.damage)).toBe(0);
  });

  // ---------------------------------------------------------------------------
  // 半円カット（v1.1 新仕様）
  // ---------------------------------------------------------------------------

  describe('半円カット (マシン背面側の敵は除外)', () => {
    const statsWide: CannonStats = { ...stats, splashRadius: 50 };

    it('マシン背面側の敵は splash 範囲内でもヒットしない', () => {
      // マシン (50, 50)、着弾点を x=60 に取らせる
      //   TARGET(60, 50): 着弾点 (最寄り) → ヒット (半円判定: 10×10=100>0)
      //   BEHIND(40, 50): マシン背面側
      //     距離: (40-60)=20 ≤ 50 → 範囲内
      //     半円判定: (40-50)×(60-50) + 0×0 = -10×10 = -100 ≤ 0 → カット
      const target = makeEnemy('TARGET', 60, 50);
      const behind = makeEnemy('BEHIND', 40, 50);

      const result = cannonNormalAttack(machine, statsWide, [target, behind], rngFixed);
      expect(result.blastX).toBe(60);
      const hitIds = result.hits.map((h) => h.enemyId);
      expect(hitIds).toContain('TARGET');
      expect(hitIds).not.toContain('BEHIND');
    });

    it('マシン側 (着弾点と同じ前方) の敵は splash 範囲内ならヒットする', () => {
      // マシン (50, 50)
      //   TARGET(60, 50): 最寄り → 着弾点
      //   FRONT(70, 50): 距離 (70-60)=10 ≤ 50 → 範囲内
      //     半円判定: (70-50)×(60-50) + 0×0 = 20×10 = 200 > 0 → ヒット
      const target = makeEnemy('TARGET', 60, 50);
      const front = makeEnemy('FRONT', 70, 50);

      const result = cannonNormalAttack(machine, statsWide, [target, front], rngFixed);
      const hitIds = result.hits.map((h) => h.enemyId);
      expect(hitIds).toContain('TARGET');
      expect(hitIds).toContain('FRONT');
    });

    it('着弾点ぴったり (敵が着弾点と同じ位置、マシンより前) はヒットする', () => {
      // 着弾点 = TARGET(60, 50)
      //   TARGET(60, 50): 距離 0、半円判定 (60-50)×(60-50)=100 > 0 → ヒット
      const target = makeEnemy('TARGET', 60, 50);

      const result = cannonNormalAttack(machine, statsWide, [target], rngFixed);
      expect(result.hits).toHaveLength(1);
      expect(result.hits[0]!.enemyId).toBe('TARGET');
    });

    it('斜め方向の背面カット (内積が負の象限はカット)', () => {
      // マシン (50, 50)
      //   TARGET(60, 60): 最寄り、着弾点（マシン右上方向）
      //   SIDE(40, 40): 着弾点から (40-60, 40-60)=(-20,-20)、距離 √800≈28.3 ≤ 50 → 範囲内
      //     半円判定: (40-50)×(60-50) + (40-50)×(60-50) = -100 + -100 = -200 ≤ 0 → カット
      const target = makeEnemy('TARGET', 60, 60);
      const side = makeEnemy('SIDE', 40, 40);

      const result = cannonNormalAttack(machine, statsWide, [target, side], rngFixed);
      const hitIds = result.hits.map((h) => h.enemyId);
      expect(hitIds).toContain('TARGET');
      expect(hitIds).not.toContain('SIDE');
    });
  });
});

// ---------------------------------------------------------------------------
// cannonVolley
// ---------------------------------------------------------------------------

describe('cannonVolley', () => {
  const machine = defaultMachine();
  const stats = cannonStats(0); // Lv 0: volleyShots=5, volleyDamageMul=10

  it('敵が 0 体でも 5 shot を生成する', () => {
    const result = cannonVolley(machine, stats, []);
    expect(result.shots).toHaveLength(5);
    result.shots.forEach((s) => {
      expect(s.targetEnemyId).toBeNull();
      expect(s.hits).toHaveLength(0);
    });
  });

  it('5 発撃つ (volleyShots=5)', () => {
    const enemies = [makeEnemy('A', 60, 50)];
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
    //   CLOSE 射影 = 10、FAR 射影 = 40（最大）→ shot[0] 着弾点 = FAR(90, 50)
    //   EXTRA(x=55, y=50): 射影 = 5 < 40
    //     FAR(x=90, y=50) から EXTRA(x=55, y=50) の距離 = 35 > 30（通常外）、≤ 90（Volley 内）
    //     半円判定: (55-50)×(90-50) + 0 = 200 > 0 → 前方 OK → ヒット
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
    // baseAttack=100, Lv0: damageMul=CANNON_BASE_DAMAGE_MUL(=3), volleyDamageMul=10
    // 敵をマシン (50,50) から離して baseDeg / 射影 が決定するようにする
    const enemy = makeEnemy('A', 70, 50);
    const result = cannonVolley(machine, stats, [enemy]);

    const shot0 = result.shots[0]!;
    expect(shot0.hits.length).toBeGreaterThan(0);

    // 100 × CANNON_BASE_DAMAGE_MUL × 10
    const expectedDmg = BigNum.fromNumber(100 * CANNON_BASE_DAMAGE_MUL * 10);
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

  // ---------------------------------------------------------------------------
  // Volley の半円カット（v1.1 新仕様）
  // ---------------------------------------------------------------------------

  describe('Volley の半円カット (各 shot にも適用)', () => {
    it('shot 着弾点のマシン背面側の敵はヒットしない', () => {
      // splashRadius=30、Volley splashRadius=90
      // マシン (50, 50)
      //   TARGET(70, 50): 唯一の敵 → 最近の敵 → baseDeg = 0°
      //   shot[0] は方向 (1, 0)、TARGET の射影 = 20 → shot[0] 着弾点 = TARGET(70, 50)
      // ここで仮想の BEHIND を追加する: shot[0] の着弾点(70,50) から
      //   半径 90 内に入ってもマシン背面側ならカットされることを確認したい
      //   BEHIND(20, 50): 距離 (70-20)=50 ≤ 90 → 範囲内
      //     半円判定: (20-50)×(70-50) + 0 = -30×20 = -600 ≤ 0 → カット
      const target = makeEnemy('TARGET', 70, 50);
      const behind = makeEnemy('BEHIND', 20, 50);
      const result = cannonVolley(machine, stats, [target, behind]);

      const shot0 = result.shots[0]!;
      expect(shot0.targetEnemyId).toBe('TARGET');
      const hitIds = shot0.hits.map((h) => h.enemyId);
      expect(hitIds).toContain('TARGET');
      expect(hitIds).not.toContain('BEHIND');
    });

    it('shot 着弾点のマシン前方の敵は Volley 半径内ならヒットする', () => {
      // マシン (50, 50)
      //   TARGET(70, 50): baseDeg = 0°、shot[0] 着弾点
      //   FRONT(85, 50): TARGET(70,50) から距離 15 ≤ 90 → 範囲内
      //     半円判定: (85-50)×(70-50) + 0 = 35×20 = 700 > 0 → ヒット
      const target = makeEnemy('TARGET', 70, 50);
      const front = makeEnemy('FRONT', 85, 50);
      const result = cannonVolley(machine, stats, [target, front]);

      const shot0 = result.shots[0]!;
      const hitIds = shot0.hits.map((h) => h.enemyId);
      expect(hitIds).toContain('TARGET');
      expect(hitIds).toContain('FRONT');
    });
  });
});

// ---------------------------------------------------------------------------
// CANNON_SHELL_MS 定数値テスト
// ---------------------------------------------------------------------------

describe('CANNON_SHELL_MS', () => {
  it('定数値が 480 (ms) であること', () => {
    expect(CANNON_SHELL_MS).toBe(480);
  });
});
