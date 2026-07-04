import type { EquippedPatch, PatchEffect, PatchTrigger } from '@/game/patches.types';

/**
 * キル時回復（design-docs/15-balance-v1.5.0.md §1.2）:
 * 敵撃破時、 `現在のリジェネ/秒 × 0.2 × T` を回復する。
 * リジェネ永続強化 (×1.02/Lv) と乗算で伸びるため恒久投資と噛み合う無限軸。
 * shieldRegen によるリジェネ倍率パッシブは適用しない（素のリジェネ基準で統一）。
 * BigNum の mulNumber は天井丸め。
 */
export function applyPatchKillHeal(
  patch: EquippedPatch,
  trigger: PatchTrigger,
  _rng: () => number
): PatchEffect | null {
  if (trigger.type !== 'onKill') return null;

  const T = patch.tier;
  const heal = trigger.hpRegen.mulNumber(0.2 * T);
  return { heal };
}
