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
  /** 通常攻撃の最大同時ターゲット数 (仕様: 最大 3 体) */
  chainCount: number;
  /** 連鎖ごとのダメ減衰倍率 (0-1, e.g. 0.9 = 10%減衰) */
  chainFalloff: number;
  /** 武器ダメージ倍率 (Lv スケール: 1.02^Lv) */
  damageMul: number;
  /** Plasma Discharge CD (秒) */
  plasmaCdSec: number;
  /** Plasma Discharge 1体目の威力倍率 (アクティブ底威力: ×15) */
  plasmaDamageMul: number;
  /** Plasma Discharge の連鎖上限 (Lv0=7、+0.1/Lv、切り捨て) */
  plasmaChainCount: number;
}

/**
 * Thunder 武器レベルから ThunderStats を算出する。
 *
 * スケール仕様（05-weapons.md より）:
 * - damageMul: 1.02 ^ Lv
 * - attackPerSec: 0.7 × (1 + 0.03 × Lv)  ← 上限 10
 * - chainCount: floor(3 + 0.1 × Lv)  ← Lv0=3 は通常ターゲット上限
 *   ※ アクティブ連鎖数: Lv0=7、+0.1/Lv → plasmaDamageMul スケールに反映
 * - plasmaDamageMul: 15 × (1 + 0.05 × Lv)
 * - chainFalloff: 固定 0.9 (10%減衰)
 */
/** Thunder 通常攻撃の同時ターゲット数 (武器 Lv で伸びない仕様固定値) */
export const THUNDER_BASE_CHAIN_COUNT = 3;
/** Thunder 連鎖ごとの減衰率 (固定 0.9 = 10% 減衰) */
export const THUNDER_CHAIN_FALLOFF = 0.9;
/** Thunder アクティブ (Plasma) のクールダウン秒 */
export const THUNDER_PLASMA_CD_SEC = 30;

/** Thunder 底値 武器ダメージ倍率 (低ダメ。 3 体同時で総 DPS を稼ぐ。 AS 2.5/s × 0.18 = 0.45) */
export const THUNDER_BASE_DAMAGE_MUL = 0.18;
/** Thunder 底値 attacks/sec (Laser と同等の標準テンポ) */
export const THUNDER_BASE_AS = 2.5;

export function thunderStats(weaponLv: number): ThunderStats {
  const lv = Math.max(0, weaponLv);

  const damageMul = THUNDER_BASE_DAMAGE_MUL * Math.pow(1.02, lv);
  const attackPerSec = Math.min(10, THUNDER_BASE_AS * (1 + 0.03 * lv));
  const plasmaDamageMul = 15 * (1 + 0.05 * lv);
  const plasmaChainCount = Math.floor(7 + 0.1 * lv);

  return {
    attackPerSec,
    chainCount: THUNDER_BASE_CHAIN_COUNT,
    chainFalloff: THUNDER_CHAIN_FALLOFF,
    damageMul,
    plasmaCdSec: THUNDER_PLASMA_CD_SEC,
    plasmaDamageMul,
    plasmaChainCount,
  };
}

// ---------------------------------------------------------------------------
// Thunder 通常攻撃
// ---------------------------------------------------------------------------

export interface ThunderAttackResult {
  /** ヒット順 (始点 → 連鎖先) */
  hits: Array<{ enemyId: string; damage: BigNum; crit: boolean }>;
  /** 連鎖の軌跡 [start, ...chained] */
  path: Array<{ x: number; y: number }>;
}

/**
 * Thunder 通常攻撃: 索敵範囲内の最大 chainCount 体に同時ヒット。
 * 最初のターゲット（最寄り）を始点に、次の敵へ順次連鎖し、
 * 連鎖ごとに chainFalloff でダメ減衰する。
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

  // 仕様: 連鎖ではなく「同時 3 体に独立落雷」。 chainFalloff は通常攻撃には適用しない
  // (Plasma アクティブのみ chainFalloff を使う)。
  for (const enemy of targets) {
    const isCrit = rollCrit(machine.critRate, rng);
    const result = calcOutgoingDamage(
      { machine, weapon: { damageMultiplier: stats.damageMul }, isCrit },
      BigNum.ZERO,
      0
    );

    hits.push({ enemyId: enemy.id, damage: result.finalDmg, crit: isCrit });
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
 * Plasma Discharge アクティブ: 索敵範囲外含む全敵への連鎖ダメージ。
 * 1 体目に plasmaDamageMul、以降 chainFalloff (=0.9) ずつ減衰。
 * クリ判定なし（アクティブスキル固定倍率）。
 *
 * 仕様（05-weapons.md）:
 *   1 体目: 通常攻撃 ×15 (plasmaDamageMul)
 *   以降:   10% ずつ減衰 (chainFalloff=0.9)
 *   ヒット順は敵リストの順序に従う
 *
 * @param machine  マシン本体ステータス
 * @param stats    Thunder 武器ステータス
 * @param enemies  全敵リスト（索敵範囲外含む）
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

  // 連鎖上限でスライス（仕様: Lv0=7、+0.1/Lv）
  const targets = enemies.slice(0, stats.plasmaChainCount);

  for (let i = 0; i < targets.length; i++) {
    const enemy = targets[i]!;
    // 1体目: plasmaDamageMul × 1.0, 2体目: × 0.9, 3体目: × 0.81, ...
    const falloffMul = Math.pow(stats.chainFalloff, i);
    const effectiveDamageMul = stats.damageMul * stats.plasmaDamageMul * falloffMul;

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
