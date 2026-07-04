import { findPatchTier } from '@/game/patches/patchUtils';
import { PROB_PARAMS, linearProb } from '@/game/patches/probability';
import type { EquippedPatch, PatchEffect, PatchTrigger } from '@/game/patches.types';

/**
 * 凍結ヒット — 別軸型（design-docs/15-balance-v1.5.0.md §1.2）:
 * 発動率 p = 5% + 1.5%×(T-1)。 100% で自然飽和 (繰り越しなし、min(p, 1))。
 * 凍結時間 sec(T) = 1 + 0.2×T (現行維持)。
 * 新規無限軸: 凍結中の敵への与ダメ +2%×T は getFrozenDamageBonusMul() で別途取得する
 * (発動率とは独立した「常時パッシブ」軸。 §2.2 凍結耐性でアップタイムが頭打ちになるため
 *  高 Tier の成長はこちらが担う)。
 */
export function applyPatchFreezeHit(
  patch: EquippedPatch,
  trigger: PatchTrigger,
  rng: () => number
): PatchEffect | null {
  if (trigger.type !== 'onAttack') return null;

  const T = patch.tier;
  const prob = Math.min(1, linearProb(T, PROB_PARAMS.doubleShotLike));

  if (rng() >= prob) return null;
  const freezeSec = 1 + 0.2 * T;
  return { freeze: true, freezeSec };
}

/**
 * 凍結中の敵への与ダメ倍率 (1 + 0.02×T)。 freezeHit 未装着なら 1.0 (無補正)。
 * 複数装着はできない前提 (同名パッチ重複装着不可) だが、 念のため最大 Tier のものを採用する。
 */
export function getFrozenDamageBonusMul(patches: EquippedPatch[]): number {
  const maxTier = findPatchTier(patches, 'freezeHit');
  if (maxTier <= 0) return 1;
  return 1 + 0.02 * maxTier;
}
