import type { EquippedPatch, PatchEffect, PatchTrigger } from '@/game/patches.types';

/**
 * ダブルショット:
 * 攻撃が X% で 2 発撃ち（計 ×2 ダメ）。
 * スケール: 漸近確率 T1=5%, max=50%, K=20
 * p(T) = T1 + (max - T1) * T / (T + 20)
 */
export function applyPatchDoubleShot(
  patch: EquippedPatch,
  trigger: PatchTrigger,
  rng: () => number,
): PatchEffect | null {
  if (trigger.type !== 'onAttack') return null;

  const T = patch.tier;
  const T1 = 0.05;
  const max = 0.5;
  const prob = T1 + (max - T1) * T / (T + 20);

  if (rng() >= prob) return null;
  return { extraShot: true };
}
