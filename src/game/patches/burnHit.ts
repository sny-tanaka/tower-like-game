import type { EquippedPatch, PatchEffect, PatchTrigger } from '@/game/patches.types';

/**
 * 燃焼ヒット — 別軸型（design-docs/15-balance-v1.5.0.md §1.2）:
 * 発動率 p = 5% + 1.5%×(T-1)。 100% で自然飽和 (min(p, 1))。
 * 燃焼時間 sec(T) = 1 + 0.2×T (現行維持)。
 * DoT 係数 burnDotFraction(T) = 0.30 + 0.03×T （線形・上限なし、T24 で毎秒 100%）。
 */
export function applyPatchBurnHit(
  patch: EquippedPatch,
  trigger: PatchTrigger,
  rng: () => number
): PatchEffect | null {
  if (trigger.type !== 'onAttack') return null;

  const T = patch.tier;
  const prob = Math.min(1, 0.05 + 0.015 * (T - 1));

  if (rng() >= prob) return null;
  const burnSec = 1 + 0.2 * T;
  const burnDotFraction = 0.3 + 0.03 * T;
  return { burnSec, burnDotFraction };
}
