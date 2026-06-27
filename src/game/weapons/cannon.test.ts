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
  CANNON_SHELL_SPEED_PCT_PER_SEC,
  SPLASH_EDGE_FACTOR,
  VOLLEY_SHOTS,
  cannonApplySplash,
  cannonNormalAttack,
  cannonStats,
  cannonVolley,
  predictCannonImpact,
} from './cannon';
import type { CannonAttackHit, CannonStats } from './cannon';

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

/**
 * 旧 API (発射時にヒット確定) と互換の挙動をテスト 1 行で書くためのヘルパー。
 * cannonNormalAttack で blast metadata を取り、 同じ敵リストに対して
 * cannonApplySplash で実ヒットを計算して返す (= 着弾までに敵が動かないケース)。
 */
function fireAndResolve(
  machine: MachineStats,
  stats: CannonStats,
  enemies: SpawnedEnemy[],
  rng: () => number
): { hits: CannonAttackHit[]; blastX: number; blastY: number; flightSec: number } {
  const r = cannonNormalAttack(machine, stats, enemies, rng);
  const hits = cannonApplySplash(
    machine,
    enemies,
    r.blastX,
    r.blastY,
    r.splashRadius,
    r.damageMul,
    r.isCrit
  );
  return { hits, blastX: r.blastX, blastY: r.blastY, flightSec: r.flightSec };
}

/**
 * Volley 用の fire+apply ヘルパー。 各 shot の blast から cannonApplySplash で
 * ヒットを計算した結果を { ...shot, hits } として返す。
 */
function fireVolleyAndResolve(
  machine: MachineStats,
  stats: CannonStats,
  enemies: SpawnedEnemy[],
  spreadDeg?: number
): {
  shots: Array<{
    targetEnemyId: string | null;
    blastX: number;
    blastY: number;
    flightSec: number;
    hits: CannonAttackHit[];
  }>;
  splashRadius: number;
  damageMul: number;
} {
  const r = cannonVolley(machine, stats, enemies, spreadDeg);
  const shotsWithHits = r.shots.map((shot) => ({
    ...shot,
    hits: cannonApplySplash(
      machine,
      enemies,
      shot.blastX,
      shot.blastY,
      r.splashRadius,
      r.damageMul,
      false
    ),
  }));
  return { shots: shotsWithHits, splashRadius: r.splashRadius, damageMul: r.damageMul };
}

/**
 * テスト用 SpawnedEnemy を簡易生成する。
 *
 * v1.1.2: cannonNormalAttack は予測着弾 (砲弾 × 敵直線運動の交点) を返すため
 * 敵速度 0 で静止敵にする。 速度 0 のとき predictCannonImpact の factor = 1.0 になり
 * 着弾点 = 敵の現在位置 で旧仕様と一致する。
 *
 * 動的予測のテストは別途 predictCannonImpact 単体テスト + speed > 0 を指定するケースで行う。
 */
function makeEnemy(id: string, x: number, y: number, speed = 0): SpawnedEnemy {
  return {
    id,
    kind: 'normal',
    subtype: 'standard',
    hp: BigNum.fromNumber(1000),
    atk: BigNum.fromNumber(10),
    speed,
    reward: { screw: 1, bolt: 1, alloyChance: 0, alloyAmount: 0 },
    spawnedAtMs: 0,
    position: { x, y },
    maxHp: BigNum.fromNumber(1000),
    hitRadius: 1.03,
  };
}

// ---------------------------------------------------------------------------
// cannonStats
// ---------------------------------------------------------------------------

describe('cannonStats', () => {
  it('Lv 0 は底値を返す (v1.1.2: damageMul=3.0, AS=0.5, splash=8 フィールド%, volleyMul=10)', () => {
    const s = cannonStats(0);
    expect(s.attackPerSec).toBeCloseTo(CANNON_BASE_AS);
    expect(s.splashRadius).toBeCloseTo(8);
    expect(s.damageMul).toBeCloseTo(CANNON_BASE_DAMAGE_MUL);
    expect(CANNON_BASE_DAMAGE_MUL).toBe(6.0); // v1.3.0 で 3.0 → 6.0 に倍化
    expect(s.volleyShots).toBe(VOLLEY_SHOTS);
    expect(s.volleyDamageMul).toBeCloseTo(5);
  });

  it('v1.1.2: Lv 10 で damageMul / attackPerSec / volleyDamageMul は固定底値、splash 半径だけ Lv で伸びる', () => {
    const s = cannonStats(10);
    expect(s.damageMul).toBeCloseTo(CANNON_BASE_DAMAGE_MUL); // Lv 不問固定
    expect(s.attackPerSec).toBeCloseTo(CANNON_BASE_AS); // Lv 不問固定
    expect(s.volleyDamageMul).toBeCloseTo(5); // Lv 不問固定
    expect(s.splashRadius).toBeCloseTo(9, 5); // Lv 軸: 8 + 0.1×10
  });

  it('v1.1.2: Lv 50 でも damageMul / attackPerSec / volleyDamageMul は固定、splash 半径のみ伸びる', () => {
    const s = cannonStats(50);
    expect(s.damageMul).toBeCloseTo(CANNON_BASE_DAMAGE_MUL);
    expect(s.attackPerSec).toBeCloseTo(CANNON_BASE_AS);
    expect(s.volleyDamageMul).toBeCloseTo(5);
    expect(s.splashRadius).toBeCloseTo(13, 5); // 8 + 0.1×50
  });

  it('v1.1.2: Lv 100 でも damageMul / attackPerSec / volleyDamageMul は固定、splash 半径のみ伸びる', () => {
    const s = cannonStats(100);
    expect(s.damageMul).toBeCloseTo(CANNON_BASE_DAMAGE_MUL);
    expect(s.attackPerSec).toBeCloseTo(CANNON_BASE_AS);
    expect(s.volleyDamageMul).toBeCloseTo(5);
    expect(s.splashRadius).toBeCloseTo(18, 5); // 8 + 0.1×100
  });

  it('v1.1.2: Lv 9999 でも attackPerSec は CANNON_BASE_AS で固定（AS は伸びないため上限到達しない）', () => {
    const sHigh = cannonStats(9999);
    expect(sHigh.attackPerSec).toBe(CANNON_BASE_AS);
  });

  it('負の Lv は Lv 0 として扱う', () => {
    const s = cannonStats(-5);
    expect(s.attackPerSec).toBeCloseTo(CANNON_BASE_AS);
    expect(s.splashRadius).toBeCloseTo(8);
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
  const stats = cannonStats(0); // Lv 0: splashRadius = 8, damageMul = 3.0

  it('敵が 0 体のとき hits は空で blastX/Y はマシン中心', () => {
    const result = fireAndResolve(machine, stats, [], rngFixed);
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
    const result = fireAndResolve(machine, stats, [enemyA, enemyB], rngFixed);
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

    const result = fireAndResolve(machine, statsLv0, [enemyNear, enemyMid, enemyOut], rngFixed);

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

    const result = fireAndResolve(machine, statsZeroRadius, [enemyFar, enemyNear], rngFixed);
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

    const resultCrit = fireAndResolve(machineCrit, stats, [enemyA], rngCrit);
    const resultNoCrit = fireAndResolve(defaultMachine(), stats, [enemyA], rngNoCrit);

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

    const result = fireAndResolve(machineCrit, statsWide, [enemyFar, enemyNear], rngCrit);
    expect(result.hits.length).toBeGreaterThanOrEqual(2);
    // 全ヒットが crit
    result.hits.forEach((h) => expect(h.crit).toBe(true));
  });

  it('v1.1.1: damageMul は Lv 不問固定なので Lv 10 と Lv 0 で同ダメージ', () => {
    const statsLv10 = cannonStats(10);
    const enemy = makeEnemy('A', 60, 50);

    const resultLv0 = fireAndResolve(machine, stats, [enemy], rngNoCrit);
    const resultLv10 = fireAndResolve(machine, statsLv10, [enemy], rngNoCrit);

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

      const result = fireAndResolve(machine, statsWide, [target, behind], rngFixed);
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

      const result = fireAndResolve(machine, statsWide, [target, front], rngFixed);
      const hitIds = result.hits.map((h) => h.enemyId);
      expect(hitIds).toContain('TARGET');
      expect(hitIds).toContain('FRONT');
    });

    it('着弾点ぴったり (敵が着弾点と同じ位置、マシンより前) はヒットする', () => {
      // 着弾点 = TARGET(60, 50)
      //   TARGET(60, 50): 距離 0、半円判定 (60-50)×(60-50)=100 > 0 → ヒット
      const target = makeEnemy('TARGET', 60, 50);

      const result = fireAndResolve(machine, statsWide, [target], rngFixed);
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

      const result = fireAndResolve(machine, statsWide, [target, side], rngFixed);
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
  const stats = cannonStats(0); // Lv 0: volleyShots=5, volleyDamageMul=5 (v1.3.0)

  it('敵が 0 体でも 5 shot を生成する', () => {
    const result = fireVolleyAndResolve(machine, stats, []);
    expect(result.shots).toHaveLength(5);
    result.shots.forEach((s) => {
      expect(s.targetEnemyId).toBeNull();
      expect(s.hits).toHaveLength(0);
    });
  });

  it('5 発撃つ (volleyShots=5)', () => {
    const enemies = [makeEnemy('A', 60, 50)];
    const result = fireVolleyAndResolve(machine, stats, enemies);
    expect(result.shots).toHaveLength(stats.volleyShots);
    expect(result.shots).toHaveLength(5);
  });

  it('各 shot の着弾点角度が 72° 刻みになっている', () => {
    // 敵なし（全 shot が仮想着弾点）で角度を検証する
    // 敵なし → baseDeg = 0°（デフォルト）
    // shot[i] の着弾点 = (cos(72°×i), sin(72°×i)) × 100 + マシン座標
    const machineX = 50; // useBattleLoop の MACHINE_CENTER と一致
    const machineY = 50;
    const result = fireVolleyAndResolve(machine, stats, []);

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
    // v1.1.2: splashRadius=8 (Lv 0 フィールド%) → volley splashRadius=24
    // マシン(x=50, y=50)
    // baseDeg は最近の敵 CLOSE(x=60,y=50) の方向 = 0°
    // shot[0] 方向 cos(0°)=1, sin(0°)=0
    //   各敵の射影 = (ex - 50) × 1 + (ey - 50) × 0 = ex - 50
    //   CLOSE 射影 = 10、FAR 射影 = 40（最大）→ shot[0] 着弾点 = FAR(90, 50)
    //   EXTRA(x=72, y=50): 射影 = 22 < 40
    //     FAR(x=90, y=50) から EXTRA(x=72, y=50) の距離 = 18 > 8（通常外）、≤ 24（Volley 内）
    //     半円判定: (72-50)×(90-50) + 0 = 880 > 0 → 前方 OK → ヒット
    const statsLv0 = cannonStats(0); // splashRadius=8、 Volley=24

    const close = makeEnemy('CLOSE', 60, 50); // 最近の敵 → baseDeg=0°
    const far = makeEnemy('FAR', 90, 50); // 射影最大 → shot[0] の着弾点
    const extra = makeEnemy('EXTRA', 72, 50); // FAR から距離 18、 射影 22

    const result = fireVolleyAndResolve(machine, statsLv0, [close, far, extra]);

    const shot0 = result.shots[0]!;
    expect(shot0.targetEnemyId).toBe('FAR');
    // EXTRA は Volley 半径 24 内（FAR から距離 18） → ヒット
    expect(shot0.hits.map((h) => h.enemyId)).toContain('EXTRA');
  });

  it('Volley ダメージは通常攻撃の damageMul × volleyDamageMul 倍になっている', () => {
    // v1.3.0: damageMul=CANNON_BASE_DAMAGE_MUL(=6), volleyDamageMul=5 (旧 3 × 10 と絶対値は同じ 30 倍)
    // 敵をマシン (50,50) から離して baseDeg / 射影 が決定するようにする
    const enemy = makeEnemy('A', 70, 50);
    const result = fireVolleyAndResolve(machine, stats, [enemy]);

    const shot0 = result.shots[0]!;
    expect(shot0.hits.length).toBeGreaterThan(0);

    // 100 × CANNON_BASE_DAMAGE_MUL × 5
    const expectedDmg = BigNum.fromNumber(100 * CANNON_BASE_DAMAGE_MUL * 5);
    expect(shot0.hits[0]!.damage.eq(expectedDmg)).toBe(true);
  });

  it('同一敵が複数 shot にまたがってヒットし得る', () => {
    // 敵をマシン (50,50) から右に置いて shot[0] にヒットすることを保証
    const enemy = makeEnemy('A', 70, 50);
    const result = fireVolleyAndResolve(machine, stats, [enemy]);

    // どこかの shot に enemy A のヒットがある
    const allHitIds = result.shots.flatMap((s) => s.hits.map((h) => h.enemyId));
    expect(allHitIds).toContain('A');
  });

  it('spreadDeg=0 のとき全 shot が同じ方向を向く', () => {
    const enemy = makeEnemy('A', 70, 50);
    const result = fireVolleyAndResolve(machine, stats, [enemy], 0);

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
    // 半円カット単体を検証するため splashRadius を Lv 0 底値 (8) より広く override。
    // 新仕様 (底値 8) のままだと「TARGET より遠く + 着弾点から Volley 半径内 + マシン背面」
    // を満たす位置が存在せず、 半円カットだけのテストが書けないため。
    const statsWide: CannonStats = { ...stats, splashRadius: 50 }; // Volley = 150

    it('shot 着弾点のマシン背面側の敵はヒットしない', () => {
      // マシン (50, 50)
      //   TARGET(70, 50): 距離 20 → 最近の敵 → baseDeg = 0°
      //   shot[0] 方向 (1, 0): TARGET 射影 20、 BEHIND(20,50) 射影 -30 → shot[0] target = TARGET
      //   shot[0] 着弾点 = TARGET(70, 50)
      //   BEHIND(20, 50): 距離 50 ≤ 150 → 範囲内
      //     半円判定: (20-50)×(70-50) + 0 = -600 ≤ 0 → カット
      const target = makeEnemy('TARGET', 70, 50);
      const behind = makeEnemy('BEHIND', 20, 50);
      const result = fireVolleyAndResolve(machine, statsWide, [target, behind]);

      const shot0 = result.shots[0]!;
      expect(shot0.targetEnemyId).toBe('TARGET');
      const hitIds = shot0.hits.map((h) => h.enemyId);
      expect(hitIds).toContain('TARGET');
      expect(hitIds).not.toContain('BEHIND');
    });

    it('shot 着弾点のマシン前方の敵は Volley 半径内ならヒットする', () => {
      // マシン (50, 50)、 statsWide で Volley splashRadius=150
      //   TARGET(70, 50): 距離 20 → 最近の敵 → baseDeg = 0°
      //   shot[0] 方向 (1, 0): TARGET 射影 20、 FRONT(85,50) 射影 35 → shot[0] target = FRONT
      //   shot[0] 着弾点 = FRONT(85, 50)
      //   TARGET(70, 50): FRONT から距離 15 ≤ 150 → 範囲内
      //     半円判定: (70-50)×(85-50) + 0 = 700 > 0 → ヒット
      const target = makeEnemy('TARGET', 70, 50);
      const front = makeEnemy('FRONT', 85, 50);
      const result = fireVolleyAndResolve(machine, statsWide, [target, front]);

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

// ---------------------------------------------------------------------------
// predictCannonImpact (v1.1.2: 砲弾 × 敵直線運動の交点)
// ---------------------------------------------------------------------------

describe('predictCannonImpact', () => {
  it('静止敵 (speed=0): factor=1.0、 着弾点 = 敵の現在位置', () => {
    const r = predictCannonImpact(70, 50, 0);
    expect(r.blastX).toBeCloseTo(70, 6);
    expect(r.blastY).toBeCloseTo(50, 6);
    // distance=20, combinedSpeed=50, flightSec = 20/50 = 0.4
    expect(r.flightSec).toBeCloseTo(20 / CANNON_SHELL_SPEED_PCT_PER_SEC, 6);
  });

  it('移動敵 (マシン方向): 着弾点はマシン寄りに引き寄せられる (factor < 1.0)', () => {
    // 敵 (70, 50)、 マシン方向に speed=10 で移動。 shellSpeed=50。
    // factor = 50 / (50+10) = 5/6 ≈ 0.833
    // distance = 20 → blastX = 50 + 20 × 5/6 ≈ 66.67
    const r = predictCannonImpact(70, 50, 10);
    expect(r.blastX).toBeCloseTo(50 + 20 * (50 / 60), 4);
    expect(r.blastY).toBeCloseTo(50, 6);
    // flightSec = 20 / 60 ≈ 0.333
    expect(r.flightSec).toBeCloseTo(20 / 60, 6);
  });

  it('敵速度 >> 砲弾速度 のとき着弾点はマシン寄りに大きく寄る', () => {
    // 敵速度 = 砲弾速度 → factor = 0.5 (中点で着弾)
    const r = predictCannonImpact(70, 50, CANNON_SHELL_SPEED_PCT_PER_SEC);
    expect(r.blastX).toBeCloseTo(60, 4);
    expect(r.flightSec).toBeCloseTo(20 / (CANNON_SHELL_SPEED_PCT_PER_SEC * 2), 6);
  });

  it('マシン中心ぴったりの敵 (distance=0): blastX/Y=マシン中心、 flightSec=0', () => {
    const r = predictCannonImpact(50, 50, 10);
    expect(r.blastX).toBe(50);
    expect(r.blastY).toBe(50);
    expect(r.flightSec).toBe(0);
  });

  it('shellSpeed=0 + targetSpeed=0 のとき静止砲弾扱いで現在位置即時着弾', () => {
    const r = predictCannonImpact(70, 50, 0, 0);
    expect(r.blastX).toBe(70);
    expect(r.blastY).toBe(50);
    expect(r.flightSec).toBe(0);
  });
});

// ---------------------------------------------------------------------------
// cannonApplySplash (v1.1.2: 距離減衰 + 半円カット)
// ---------------------------------------------------------------------------

describe('cannonApplySplash', () => {
  const machine = defaultMachine();
  const baseAttack = 100;
  const damageMul = CANNON_BASE_DAMAGE_MUL; // 3.0

  it('SPLASH_EDGE_FACTOR = 0.3 (半径ギリギリは中心の 30%)', () => {
    expect(SPLASH_EDGE_FACTOR).toBe(0.3);
  });

  it('着弾点 (距離 0) の敵は 100% のダメージを受ける', () => {
    const blast = { x: 60, y: 50 };
    const enemy = makeEnemy('CENTER', blast.x, blast.y);
    const hits = cannonApplySplash(machine, [enemy], blast.x, blast.y, 30, damageMul, false);
    const expected = BigNum.fromNumber(baseAttack * damageMul); // フルダメ
    expect(hits[0]!.damage.eq(expected)).toBe(true);
  });

  it('半径ギリギリの敵は中心の SPLASH_EDGE_FACTOR (= 30%) のダメージ', () => {
    // 着弾点 (60, 50)、 splashRadius=30、 敵を距離 30 ぴったりに置く
    const blast = { x: 60, y: 50 };
    const enemy = makeEnemy('EDGE', blast.x + 30, blast.y);
    const hits = cannonApplySplash(machine, [enemy], blast.x, blast.y, 30, damageMul, false);
    // 実装と完全に同じ式で expected を計算 (1 - 0.7 等の FP 誤差を再現させる)
    const falloff = 1 - (1 - SPLASH_EDGE_FACTOR) * (30 / 30);
    const expected = BigNum.fromNumber(baseAttack).mulNumber(damageMul * falloff);
    expect(hits[0]!.damage.eq(expected)).toBe(true);
  });

  it('中間距離 (半径の半分) は線形補間で中心の 65% のダメージ', () => {
    // falloff = 1 - 0.7 × 0.5 = 0.65
    const blast = { x: 60, y: 50 };
    const enemy = makeEnemy('MID', blast.x + 15, blast.y); // 距離 15、 splashRadius=30
    const hits = cannonApplySplash(machine, [enemy], blast.x, blast.y, 30, damageMul, false);
    const expectedFalloff = 1 - (1 - SPLASH_EDGE_FACTOR) * 0.5; // = 0.65
    const expected = BigNum.fromNumber(baseAttack).mulNumber(damageMul * expectedFalloff);
    expect(hits[0]!.damage.eq(expected)).toBe(true);
  });

  it('splashRadius 外の敵はヒットしない', () => {
    const blast = { x: 60, y: 50 };
    const enemy = makeEnemy('FAR', blast.x + 50, blast.y); // 距離 50 > splashRadius 30
    const hits = cannonApplySplash(machine, [enemy], blast.x, blast.y, 30, damageMul, false);
    expect(hits).toHaveLength(0);
  });

  it('マシン背面側の敵は半径内でもカット', () => {
    // 着弾点 (60, 50)、 敵 (40, 50)
    // 内積 (40-50)×(60-50) + 0 = -100 ≤ 0 → カット
    const enemy = makeEnemy('BEHIND', 40, 50);
    const hits = cannonApplySplash(machine, [enemy], 60, 50, 30, damageMul, false);
    expect(hits).toHaveLength(0);
  });

  it('splashRadius=0 のときは中心 (距離 0) の敵だけ full damage でヒット', () => {
    const enemy = makeEnemy('AT_BLAST', 60, 50);
    const hits = cannonApplySplash(machine, [enemy], 60, 50, 0, damageMul, false);
    expect(hits).toHaveLength(1);
    const expected = BigNum.fromNumber(baseAttack).mulNumber(damageMul);
    expect(hits[0]!.damage.eq(expected)).toBe(true);
  });
});
