import type { EquippedPatch, PatchEffect, PatchTrigger } from '@/game/patches.types';

/**
 * 燃焼ヒット:
 * 攻撃時 X% で (1 + 0.2×T) 秒間 燃焼（毎秒 通常ダメの 30%）。
 * スケール: 漸近確率 T1=5%, max=50%, K=20 + 時間線形
 * p(T) = T1 + (max - T1) * T / (T + 20)
 * sec(T) = 1 + 0.2 * T
 */
export function applyPatchBurnHit(
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
  const burnSec = 1 + 0.2 * T;
  return { burnSec };
}
