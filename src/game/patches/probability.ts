// ---------------------------------------------------------------------------
// 発動率の線形式 共通ヘルパー
// ---------------------------------------------------------------------------
//
// 仕様 (design-docs/tower-like-game/15-balance-v1.5.0.md §1.2):
// 発動率 (オーバーフロー型 / 別軸型) は p = t1 + step × (T-1) の線形式で統一されている。
// 実装 (doubleShot / instantKill / bonusDrop / freezeHit / burnHit) と
// 表示 (displayInfo.ts) の双方が同じ式・同じパラメータを参照する必要があるため、
// ここに一本化する (二重定義を解消)。

/** 発動率の線形式パラメータ (t1 + step×(T-1)) */
export const PROB_PARAMS: Record<'doubleShotLike' | 'instantKill', { t1: number; step: number }> = {
  doubleShotLike: { t1: 0.05, step: 0.015 }, // doubleShot / bonusDrop / freezeHit / burnHit
  instantKill: { t1: 0.02, step: 0.006 },
};

/** 発動率 p = params.t1 + params.step × (tier - 1) を返す (上限なし)。 */
export function linearProb(tier: number, params: { t1: number; step: number }): number {
  return params.t1 + params.step * (tier - 1);
}
