import type { EquippedPatch, PatchName } from '@/game/patches.types';

/**
 * 装着パッチ一覧から、 指定名パッチの最大 Tier を探す。
 * 同名パッチの重複装着はできない前提だが、 念のため最大 Tier を採用する。
 * 未装着なら 0 を返す。
 *
 * shieldRegen / boltCast / freezeHit (getFrozenDamageBonusMul) / damageImmune
 * (getBarrierCapacity) の各パッシブ getter で共通に使う。
 */
export function findPatchTier(patches: EquippedPatch[], name: PatchName): number {
  let maxTier = 0;
  for (const p of patches) {
    if (p.name === name && p.tier > maxTier) maxTier = p.tier;
  }
  return maxTier;
}
