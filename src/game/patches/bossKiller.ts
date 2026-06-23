import type { EquippedPatch, PatchEffect, PatchTrigger } from '@/game/patches.types';

/**
 * ボスキラー:
 * ボス類（elite / miniboss / boss）への与ダメ +(5×T)%。
 * スケール: 線形 → damageMultiplier = 1 + 0.05 * T
 */
export function applyPatchBossKiller(
  patch: EquippedPatch,
  trigger: PatchTrigger,
  _rng: () => number,
): PatchEffect | null {
  if (trigger.type !== 'onAttack') return null;
  if (trigger.enemyKind === 'normal') return null;

  const T = patch.tier;
  const damageMultiplier = 1 + 0.05 * T;
  return { damageMultiplier };
}
