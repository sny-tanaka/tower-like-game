/**
 * Tier 差分による基礎攻撃力倍率 (v1.3.4)。
 *
 * 仕様: 最高 Tier 更新インセンティブ。 最新未クリア Tier (= `highestTier`) と
 * 出撃中 Tier (= `currentTier`) の差が大きいほど、 baseAttack が累積倍率で上昇する。
 *
 * - 計算式: 倍率 = TIER_DIFF_ATTACK_MUL_BASE ^ max(0, highestTier - currentTier)
 * - currentTier >= highestTier (= 最新未クリア Tier に出撃中 or それ以上) のときは
 *   差が 0 以下なので 1.0 (バフなし)
 * - currentTier < highestTier (= 過去 Tier を周回中) なら差分のぶん指数的に増える
 *
 * 例 (highestTier=5):
 *   currentTier=5 → ×1.0
 *   currentTier=4 → ×1.2
 *   currentTier=3 → ×1.44
 *   currentTier=1 → ×2.0736
 *
 * 例 (highestTier=20):
 *   currentTier=20 → ×1.0
 *   currentTier=15 → ×2.49 (差 5)
 *   currentTier=5  → ×15.4 (差 15)
 *   currentTier=1  → ×31.9 (差 19)
 *
 * 設計意図: 「最高 Tier を更新するほど過去 Tier の周回効率が指数的に上がる」 → 「最新 Tier 突破」
 * そのものが全 Tier 周回の永続強化になるインセンティブ。 高 Tier 出撃の T² ボルト報酬と併存して
 * 「高 Tier 出撃 = T² 通貨」 / 「低 Tier 周回 = 差分攻撃力で速攻」 の住み分けが成立する。
 *
 * 仕様参照: design-docs/tower-like-game/03-machine.md (Tier 差分バフ)
 */

/** 差 1 あたりの倍率基数 (1.2 = 差 1 で +20%、 累積) */
export const TIER_DIFF_ATTACK_MUL_BASE = 1.2;

/**
 * Tier 差分による baseAttack 倍率を計算する。
 *
 * @param highestTier  最新未クリア Tier (= store.highestTier、 デフォルト 0)
 * @param currentTier  出撃中 Tier (= store.currentTier)
 * @returns 倍率 (1.0 以上)。 currentTier >= highestTier なら 1.0
 */
export function calcTierDiffAttackMul(highestTier: number, currentTier: number): number {
  const diff = Math.max(0, Math.floor(highestTier) - Math.floor(currentTier));
  return Math.pow(TIER_DIFF_ATTACK_MUL_BASE, diff);
}
