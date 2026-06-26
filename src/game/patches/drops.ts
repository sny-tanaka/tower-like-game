import type { PatchName } from '@/data/schema';
import type { EnemyKind } from '@/game/types';

// ---------------------------------------------------------------------------
// パッチドロップ仕様 (design-docs/tower-like-game/06-patches.md)
// ---------------------------------------------------------------------------

/**
 * 敵種別ごとの基礎ドロップ確率 (× マシン「patchDropRate」 倍率)。
 * 仕様 (06-patches.md): パッチドロップは Tier ボス撃破のみ。 1 ラン最大 1 個。
 * - 通常敵 / エリート / ミニボス: 0%
 * - Tier ボス: 20%
 */
export const PATCH_BASE_DROP_RATE: Record<EnemyKind, number> = {
  normal: 0,
  elite: 0,
  miniboss: 0,
  boss: 0.2,
};

/** プール 10 種 (06-patches.md と同順序、 抽選は均等) */
export const PATCH_POOL: readonly PatchName[] = [
  'instantKill',
  'bossKiller',
  'doubleShot',
  'damageImmune',
  'killHeal',
  'shieldRegen',
  'bonusDrop',
  'boltCast',
  'freezeHit',
  'burnHit',
];

// ---------------------------------------------------------------------------
// rollPatchDrop: 敵 1 体撃破時にドロップするかを判定
// ---------------------------------------------------------------------------

/**
 * 敵を撃破したときに「パッチを 1 つドロップするか」 を判定する。
 *
 * @param enemyKind        撃破した敵の種別
 * @param patchDropRateMul マシン「patchDropRate」 倍率 (1.0 で base、 パッチ bonusDrop で × さらに)
 * @param rng              0〜1 の乱数
 * @returns true ならドロップ成立
 */
export function rollPatchDrop(
  enemyKind: EnemyKind,
  patchDropRateMul: number,
  rng: () => number
): boolean {
  const base = PATCH_BASE_DROP_RATE[enemyKind] ?? 0;
  if (base <= 0) return false;
  const effective = Math.min(1, base * patchDropRateMul);
  return rng() < effective;
}

// ---------------------------------------------------------------------------
// selectPatchTier: ドロップ確定後の Tier 抽選
// ---------------------------------------------------------------------------

/**
 * 「到達 Tier 以下のどの Tier をドロップするか」 を線形逆重みで抽選する。
 *   重み(T) = 到達Tier - T + 1
 *   出現率(T) = 重み(T) / 合計重み
 *
 * @param reachedTier  プレイヤーが現在到達している tier (1 以上)
 * @param rng          0〜1 の乱数
 * @returns 1〜reachedTier のうち抽選で選ばれた tier
 */
export function selectPatchTier(reachedTier: number, rng: () => number): number {
  const N = Math.max(1, Math.floor(reachedTier));
  const totalWeight = (N * (N + 1)) / 2;
  let r = rng() * totalWeight;
  for (let t = 1; t <= N; t++) {
    const weight = N - t + 1;
    if (r < weight) return t;
    r -= weight;
  }
  return N; // 浮動小数誤差の保険
}

// ---------------------------------------------------------------------------
// selectPatchName: プール 10 種から均等抽選
// ---------------------------------------------------------------------------

export function selectPatchName(rng: () => number): PatchName {
  const idx = Math.floor(rng() * PATCH_POOL.length);
  // rng() == 1 で out-of-bounds になるケースを clamp
  return PATCH_POOL[Math.min(PATCH_POOL.length - 1, idx)]!;
}

// ---------------------------------------------------------------------------
// dropPatch: 撃破時のドロップ判定 〜 種別/Tier 決定までを一括
// ---------------------------------------------------------------------------

export interface PatchDrop {
  name: PatchName;
  tier: number;
}

/**
 * 敵を撃破したときに、 ドロップする (パッチ名, Tier) を返す。 ドロップしなければ null。
 *
 * @param enemyKind        撃破した敵の種別
 * @param reachedTier      プレイヤーの現在到達 Tier
 * @param patchDropRateMul マシン「patchDropRate」 倍率
 * @param rng              0〜1 の乱数
 */
export function dropPatch(
  enemyKind: EnemyKind,
  reachedTier: number,
  patchDropRateMul: number,
  rng: () => number
): PatchDrop | null {
  if (!rollPatchDrop(enemyKind, patchDropRateMul, rng)) return null;
  const tier = selectPatchTier(reachedTier, rng);
  const name = selectPatchName(rng);
  return { name, tier };
}
