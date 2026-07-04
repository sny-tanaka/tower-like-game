import { rollOverflowCount } from '@/game/patches/overflow';
import type { EquippedPatch, PatchEffect, PatchTrigger } from '@/game/patches.types';

/**
 * ダブルショット — オーバーフロー型（design-docs/15-balance-v1.5.0.md §1.2）:
 * 発動率 p = 5% + 1.5%×(T-1)、上限なし。
 * p が 100% を超えた分は「追加発射数」に繰り越す:
 *   extraShots = floor(p) + (rng < frac(p) ? 1 : 0)
 * 例: T64 で p=100% → 確定 1 追加発射 (計 2 発)。 p=150% → 確定 1 + 50%で 2 追加発射 (計 2.5 発期待)。
 */
export function applyPatchDoubleShot(
  patch: EquippedPatch,
  trigger: PatchTrigger,
  rng: () => number
): PatchEffect | null {
  if (trigger.type !== 'onAttack') return null;

  const T = patch.tier;
  const prob = 0.05 + 0.015 * (T - 1);
  const extraShots = rollOverflowCount(prob, rng);
  if (extraShots <= 0) return null;
  return { extraShots };
}
