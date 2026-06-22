import type { EquippedPatch, PatchEffect, PatchTrigger } from '@/game/patches.types';

/**
 * シールド再生:
 * 仕様書では「ウェーブクリア時に HP +(5×T) 回復」。
 * トリガーモデルでは interval イベントとして扱う。
 * interval トリガーを受け取るたびに shieldRecover を返す。
 * （ウェーブクリア判定は呼び出し側が interval で制御）
 *
 * スケール: 線形 → shieldRecover = 5 * T
 */
export function applyPatchShieldRegen(
  patch: EquippedPatch,
  trigger: PatchTrigger,
  _rng: () => number,
): PatchEffect | null {
  if (trigger.type !== 'interval') return null;

  const T = patch.tier;
  return { shieldRecover: 5 * T };
}
