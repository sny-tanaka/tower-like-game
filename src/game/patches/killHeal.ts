import type { EquippedPatch, PatchEffect, PatchTrigger } from '@/game/patches.types';
import { BigNum } from '@/lib/bignum/BigNum';

/**
 * キル時回復:
 * 敵撃破時に HP +(0.5×T) 回復。
 * スケール: 線形 → heal = 0.5 * T
 * 小数は切り上げ（最低 1 以上）。
 */
export function applyPatchKillHeal(
  patch: EquippedPatch,
  trigger: PatchTrigger,
  _rng: () => number,
): PatchEffect | null {
  if (trigger.type !== 'onKill') return null;

  const T = patch.tier;
  // 0.5 * T → 2T/4 → mulRational で整数計算。最低 1
  const healAmount = Math.ceil(0.5 * T);
  return { heal: BigNum.fromNumber(healAmount) };
}
