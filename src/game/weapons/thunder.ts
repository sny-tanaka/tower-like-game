import { calcOutgoingDamage, rollCrit } from '@/game/damage';
import type { MachineStats } from '@/game/damage.types';
import type { SpawnedEnemy } from '@/game/types';
import { BigNum } from '@/lib/bignum/BigNum';

// ---------------------------------------------------------------------------
// Thunder ステータス
// ---------------------------------------------------------------------------

export interface ThunderStats {
  /** 攻撃速度 (attacks/sec) */
  attackPerSec: number;
  /** 通常攻撃の最大同時ターゲット数 (仕様: THUNDER_BASE_CHAIN_COUNT 体、 Lv で伸びない) */
  chainCount: number;
  /** 武器ダメージ倍率 (Lv スケール: 1.02^Lv) */
  damageMul: number;
  /** Plasma Discharge 1 体あたりの威力倍率 (アクティブ底威力: ×10) */
  plasmaDamageMul: number;
  /** 攻撃時 HP 回復率 (与ダメ × hpLifestealPct を machineHp に加算) */
  hpLifestealPct: number;
}

/**
 * Thunder 武器レベルから ThunderStats を算出する。
 *
 * スケール仕様 (14-weapons-rebalance-v1.1.md):
 * - damageMul: THUNDER_BASE_DAMAGE_MUL × 1.02^Lv
 * - attackPerSec: THUNDER_BASE_AS × (1 + 0.03 × Lv)  ← 上限 10
 * - chainCount: THUNDER_BASE_CHAIN_COUNT (Lv で伸びない、 通常攻撃の独立落雷上限)
 * - plasmaDamageMul: 10 × (1 + 0.05 × Lv)
 * - hpLifestealPct: 0.001 × Lv (Lv 0 で 0、Lv 60 で 0.06、Lv 100 で 0.10)
 */
/** Thunder 通常攻撃の同時ターゲット数 (武器 Lv で伸びない仕様固定値) */
export const THUNDER_BASE_CHAIN_COUNT = 4;

/** Thunder 底値 武器ダメージ倍率 (v1.3.0 で 0.45 → 0.9 に倍化、 AS 1.0/s × 0.9 = 0.9 DPS / 4 体時 3.6 を維持) */
export const THUNDER_BASE_DAMAGE_MUL = 0.9;
/** Thunder 底値 attacks/sec (v1.3.0 で 2.0 → 1.0 に半減、 1 発ダメ倍増で DPS 維持) */
export const THUNDER_BASE_AS = 1.0;

/**
 * Thunder スタックシステム (v1.2.0):
 * 同じ敵に Thunder が命中するたびにスタック +1。 ダメ計算時に
 * `1 + THUNDER_STACK_DMG_PER_STACK × stack` 倍率が乗る。
 * 上限 THUNDER_STACK_MAX に達すると以降は増えない (= ずっと最大倍率)。
 * 敵が消滅 (撃破/wave 跨ぎ) すると自動でリセット。
 */
export const THUNDER_STACK_MAX = 5;
export const THUNDER_STACK_DMG_PER_STACK = 0.2;

/** スタック数 → ダメ倍率。 0 → 1.0、 5 → 2.0 */
export function thunderStackMultiplier(stack: number): number {
  const clamped = Math.max(0, Math.min(THUNDER_STACK_MAX, Math.floor(stack)));
  return 1 + THUNDER_STACK_DMG_PER_STACK * clamped;
}

export function thunderStats(weaponLv: number): ThunderStats {
  const lv = Math.max(0, weaponLv);

  // v1.1.1: damageMul / attackPerSec / plasmaDamageMul は武器Lv 不問の固定底値
  const damageMul = THUNDER_BASE_DAMAGE_MUL;
  const attackPerSec = THUNDER_BASE_AS;
  // v1.3.0: damageMul を 2 倍にしたので、 アクティブ絶対ダメ維持のため plasmaDamageMul を半分に (10 → 5)
  const plasmaDamageMul = 5;

  // Thunder の Lv 軸: 攻撃時 HP 回復率 (0.001 × Lv = 0.1%/Lv)
  const hpLifestealPct = 0.001 * lv;

  return {
    attackPerSec,
    chainCount: THUNDER_BASE_CHAIN_COUNT,
    damageMul,
    plasmaDamageMul,
    hpLifestealPct,
  };
}

// ---------------------------------------------------------------------------
// Thunder 通常攻撃
// ---------------------------------------------------------------------------

export interface ThunderAttackResult {
  /** ヒット順 (始点 → 連鎖先) */
  hits: Array<{
    enemyId: string;
    damage: BigNum;
    crit: boolean;
    /** ヒット直前のスタック数 (このヒットで参照した倍率の元値) */
    stackBefore: number;
    /** ヒット直後のスタック数 (= min(stackBefore + 1, THUNDER_STACK_MAX)) */
    stackAfter: number;
  }>;
  /** 連鎖の軌跡 [start, ...chained] */
  path: Array<{ x: number; y: number }>;
}

/**
 * Thunder 通常攻撃: 索敵範囲内の最大 chainCount (= THUNDER_BASE_CHAIN_COUNT) 体に
 * 同時独立ヒット。 連鎖ではなく「同時 chainCount 体に独立落雷」 で減衰なし全員同ダメ。
 * 各敵には Thunder スタックが個別に貯まり、 ダメに `1 + 0.2 × stack` 倍率が乗る。
 *
 * @param machine        マシン本体ステータス
 * @param stats          Thunder 武器ステータス
 * @param enemiesInRange 索敵範囲内の敵リスト（位置情報付き）
 * @param rng            0-1 の乱数を返す関数（クリ判定用）
 */
export function thunderNormalAttack(
  machine: MachineStats,
  stats: ThunderStats,
  enemiesInRange: SpawnedEnemy[],
  rng: () => number
): ThunderAttackResult {
  if (enemiesInRange.length === 0) {
    return { hits: [], path: [] };
  }

  // 最大 chainCount 体まで取得（入力リストの先頭から順に使う）
  const targets = enemiesInRange.slice(0, stats.chainCount);

  const hits: ThunderAttackResult['hits'] = [];
  const path: ThunderAttackResult['path'] = [];

  // 仕様: 同時 chainCount 体に独立落雷。減衰なしで全員同ダメ。
  // スタックシステム: 各敵の thunderStacks (初期 0、 上限 THUNDER_STACK_MAX) を読んで
  // 「1 + 0.2 × stack」 倍率を damageMul に乗算。 ヒット後に stack を +1 して敵側に書き戻す。
  for (const enemy of targets) {
    const isCrit = rollCrit(machine.critRate, rng);
    const stackBefore = Math.max(
      0,
      Math.min(THUNDER_STACK_MAX, Math.floor(enemy.thunderStacks ?? 0))
    );
    const stackMul = thunderStackMultiplier(stackBefore);
    const result = calcOutgoingDamage(
      { machine, weapon: { damageMultiplier: stats.damageMul * stackMul }, isCrit },
      BigNum.ZERO,
      0
    );

    const stackAfter = Math.min(THUNDER_STACK_MAX, stackBefore + 1);
    hits.push({
      enemyId: enemy.id,
      damage: result.finalDmg,
      crit: isCrit,
      stackBefore,
      stackAfter,
    });
    path.push({ x: enemy.position.x, y: enemy.position.y });
  }

  return { hits, path };
}

// ---------------------------------------------------------------------------
// Plasma Discharge アクティブ
// ---------------------------------------------------------------------------

export interface PlasmaResult {
  hits: Array<{ enemyId: string; damage: BigNum }>;
}

/**
 * Plasma Discharge アクティブ: 射程無限の全体攻撃。
 * 引数で渡された全敵に均一ダメージ（連鎖・減衰・上限なし）。
 * クリ判定なし（アクティブスキル固定倍率）。
 *
 * 仕様（14-weapons-rebalance-v1.1.md）:
 *   全敵 1 ヒット = damageMul × plasmaDamageMul (減衰なし、均一)
 *
 * @param machine  マシン本体ステータス
 * @param stats    Thunder 武器ステータス
 * @param enemies  全敵リスト（射程外含む）
 */
export function thunderPlasmaDischarge(
  machine: MachineStats,
  stats: ThunderStats,
  enemies: SpawnedEnemy[]
): PlasmaResult {
  if (enemies.length === 0) {
    return { hits: [] };
  }

  const hits: PlasmaResult['hits'] = [];

  // 全敵に均一ダメージ（連鎖・上限・減衰なし）
  const effectiveDamageMul = stats.damageMul * stats.plasmaDamageMul;

  for (const enemy of enemies) {
    // Plasma Discharge はクリなし
    const result = calcOutgoingDamage(
      { machine, weapon: { damageMultiplier: effectiveDamageMul }, isCrit: false },
      BigNum.ZERO,
      0
    );

    hits.push({ enemyId: enemy.id, damage: result.finalDmg });
  }

  return { hits };
}
