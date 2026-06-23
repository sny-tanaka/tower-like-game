import type { EquippedPatch, PatchEffect, PatchTrigger } from '@/game/patches.types';
import { BigNum } from '@/lib/bignum/BigNum';

/**
 * ダメージ無効:
 * 被ダメ時 X% で完全無効化（受けたダメージを 0 に上書き）。
 * スケール: 漸近確率 T1=3%, max=30%, K=20
 * p(T) = T1 + (max - T1) * T / (T + 20)
 */
export function applyPatchDamageImmune(
  patch: EquippedPatch,
  trigger: PatchTrigger,
  rng: () => number,
): PatchEffect | null {
  if (trigger.type !== 'onHit') return null;

  const T = patch.tier;
  const T1 = 0.03;
  const max = 0.3;
  const prob = T1 + (max - T1) * T / (T + 20);

  if (rng() >= prob) return null;
  return { overrideReceivedDamage: BigNum.ZERO };
}
