import type { EquippedPatch, PatchEffect, PatchTrigger } from '@/game/patches.types';

/**
 * インスタントキル:
 * 攻撃時 X% で雑魚 (normal) を即死させる。
 * スケール: 漸近確率 T1=2%, max=20%, K=20
 * p(T) = T1 + (max - T1) * T / (T + 20)
 */
export function applyPatchInstantKill(
  patch: EquippedPatch,
  trigger: PatchTrigger,
  rng: () => number,
): PatchEffect | null {
  if (trigger.type !== 'onAttack') return null;
  // ボス類（elite / miniboss / boss）には発動しない
  if (trigger.enemyKind !== 'normal') return null;

  const T = patch.tier;
  const T1 = 0.02;
  const max = 0.2;
  const prob = T1 + (max - T1) * T / (T + 20);

  if (rng() >= prob) return null;
  return { instantKill: true };
}
