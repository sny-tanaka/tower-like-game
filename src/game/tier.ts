import type { TierConfig } from './types';

import { BigNum } from '@/lib/bignum/BigNum';

// ---------------------------------------------------------------------------
// 基準定数（07-enemies-tiers.md より）
// ---------------------------------------------------------------------------

export const TIER_BASE = {
  // v1.0.0 リバランス: HP / ATK を 100× にリスケール。
  // 永続強化 baseAttack / defense / hpRegen / maxHp の baseValue を 1→100 / 100→10000 に
  // rebase したため、 ダメージ比率を保つために敵側も 100× する。
  // SPD / SPAWN_INTERVAL はダメージスケールと無関係なので touch しない。
  /** T1W1 Standard の HP */
  HP: 1000,
  /** T1W1 Standard の ATK */
  ATK: 200,
  /** T1W1 Standard の移動速度（px/s） */
  SPD: 10,
  /** T1W1 のスポーン間隔（秒/体） */
  SPAWN_INTERVAL: 2,
  /** HP の Tier ごとの成長倍率 */
  HP_GROWTH: 1.8,
  /** ATK の Tier ごとの成長倍率 */
  ATK_GROWTH: 1.4,
} as const;

// ---------------------------------------------------------------------------
// ウェーブ係数（3 区間の折れ線、07-enemies-tiers.md より）
// ---------------------------------------------------------------------------

/**
 * ウェーブ W の HP 係数を返す。
 * 3 区間の折れ線: W1→W10: +0.074/W, W11→W20: +0.133/W, W21→W30: +0.200/W
 * W=1 で 1.0, W=10 で 1.67, W=20 で 3.00, W=30 で 5.00
 */
export function waveHpFactor(waveIndex: number): number {
  if (waveIndex <= 10) {
    return 1 + 0.074 * (waveIndex - 1);
  } else if (waveIndex <= 20) {
    return 1 + 0.074 * 9 + 0.133 * (waveIndex - 10);
  } else {
    return 1 + 0.074 * 9 + 0.133 * 10 + 0.2 * (waveIndex - 20);
  }
}

/**
 * ウェーブ W の ATK 係数を返す。
 * 3 区間の折れ線: W1→W10: +0.037/W, W11→W20: +0.067/W, W21→W30: +0.100/W
 * W=1 で 1.0, W=10 で 1.33, W=20 で 2.00, W=30 で 3.00
 */
export function waveAtkFactor(waveIndex: number): number {
  if (waveIndex <= 10) {
    return 1 + 0.037 * (waveIndex - 1);
  } else if (waveIndex <= 20) {
    return 1 + 0.037 * 9 + 0.067 * (waveIndex - 10);
  } else {
    return 1 + 0.037 * 9 + 0.067 * 10 + 0.1 * (waveIndex - 20);
  }
}

/**
 * ウェーブ W のスポーン係数を返す（大きいほどスポーンが速くなる）。
 * 3 区間の折れ線: W1→W10: +0.019/W, W11→W20: +0.033/W, W21→W30: +0.050/W
 * W=1 で 1.0, W=10 で 1.17, W=20 で 1.50, W=30 で 2.00
 */
export function waveSpawnFactor(waveIndex: number): number {
  if (waveIndex <= 10) {
    return 1 + 0.019 * (waveIndex - 1);
  } else if (waveIndex <= 20) {
    return 1 + 0.019 * 9 + 0.033 * (waveIndex - 10);
  } else {
    return 1 + 0.019 * 9 + 0.033 * 10 + 0.05 * (waveIndex - 20);
  }
}

/**
 * Wave 進行に応じた screw ドロップ倍率。
 *   waveScrewFactor(W) = 1 + 0.2 × (W - 1)
 * 例: W1=1.0, W10=2.8, W20=4.8, W30=6.8
 * 仕様: ラン中強化に必要な screw 量を稼ぎやすくする。 wave 末ほど旨味が増える設計。
 */
export function waveScrewFactor(waveIndex: number): number {
  return 1 + 0.2 * Math.max(0, waveIndex - 1);
}

/**
 * Tier 進行に応じた screw ドロップ倍率。 1.5^(T-1)。
 * 例: T1=1.0, T2=1.5, T3=2.25, T5=5.06
 * 仕様: 高 tier ほど強化コストも上がるので screw 報酬も指数で増やす。
 */
export function tierScrewFactor(tier: number): number {
  return Math.pow(1.5, Math.max(0, tier - 1));
}

// ---------------------------------------------------------------------------
// Tier 計算
// ---------------------------------------------------------------------------

/**
 * Tier N の基礎 HP を計算: HP_base × HP_GROWTH^(N-1)
 * BigNum で精密計算。大 N でも破綻しない。
 */
export function tierBaseHp(tier: number): BigNum {
  // HP_base × HP_GROWTH^(tier-1) を mulNumber で累積
  let result = BigNum.fromNumber(TIER_BASE.HP);
  for (let i = 1; i < tier; i++) {
    result = result.mulNumber(TIER_BASE.HP_GROWTH);
  }
  return result;
}

/**
 * Tier N の基礎 ATK を計算: ATK_base × ATK_GROWTH^(N-1)
 * BigNum で精密計算。
 */
export function tierBaseAtk(tier: number): BigNum {
  let result = BigNum.fromNumber(TIER_BASE.ATK);
  for (let i = 1; i < tier; i++) {
    result = result.mulNumber(TIER_BASE.ATK_GROWTH);
  }
  return result;
}

/**
 * Tier N の設定を取得する。
 * baseHp / baseAtk は tierBaseHp / tierBaseAtk の結果を格納する。
 */
export function getTierConfig(tier: number): TierConfig {
  return {
    tier,
    baseHp: tierBaseHp(tier),
    baseAtk: tierBaseAtk(tier),
    hpGrowth: TIER_BASE.HP_GROWTH,
    atkGrowth: TIER_BASE.ATK_GROWTH,
  };
}
