import type { EnemyKind } from '@/game/types';

// ---------------------------------------------------------------------------
// 凍結耐性（design-docs/tower-like-game/15-balance-v1.5.0.md §2.2）
// ---------------------------------------------------------------------------
//
// CC ハメ (高攻撃速度 × 凍結パッチによる永久凍結) の構造的排除。
//   - 全敵:     凍結終了後、 凍結時間×2 のあいだ凍結免疫 (アップタイム上限 33%)
//   - 上位敵:   加えて凍結時間そのものを ×0.5 (凍結:免疫 = 1:2 の比率は同じため
//               アップタイム上限は同じく 33% だが、 1 回あたりの絶対凍結時間が半分になる)
//   - 免疫中は freezeHit の発動判定自体をスキップ (発動演出も出さない)
//   - 凍結の重ねがけは不可 (旧 Math.max 延長は廃止。 常に新規上書き)

export interface FreezeApplyResult {
  /** 凍結を付与すべきか（false の場合は演出も出さず何もしない） */
  shouldApply: boolean;
  /** shouldApply=true のときのみ有効。 敵に設定する frozenUntilMs */
  frozenUntilMs?: number;
  /** shouldApply=true のときのみ有効。 敵に設定する freezeImmuneUntilMs */
  freezeImmuneUntilMs?: number;
}

/**
 * 凍結免疫中かどうかを判定する。
 *
 * @param nowGameMs           現在のゲーム内経過 ms
 * @param freezeImmuneUntilMs 敵の現在の免疫期限 (undefined = 免疫なし)
 */
export function isFreezeImmune(
  nowGameMs: number,
  freezeImmuneUntilMs: number | undefined
): boolean {
  return freezeImmuneUntilMs != null && nowGameMs < freezeImmuneUntilMs;
}

/**
 * 凍結付与の可否と、 付与する場合の新しい frozenUntilMs / freezeImmuneUntilMs を計算する。
 *
 * @param enemyKind            対象敵の種別 (elite/miniboss/boss は凍結時間 ×0.5)
 * @param baseFreezeSec        パッチ側から渡された基礎凍結秒数 (1 + 0.2×T)
 * @param nowGameMs            現在のゲーム内経過 ms
 * @param freezeImmuneUntilMs  対象敵の現在の免疫期限 (undefined = 免疫なし)
 */
export function calcFreezeApply(
  enemyKind: EnemyKind,
  baseFreezeSec: number,
  nowGameMs: number,
  freezeImmuneUntilMs: number | undefined
): FreezeApplyResult {
  if (isFreezeImmune(nowGameMs, freezeImmuneUntilMs)) {
    return { shouldApply: false };
  }
  const isUpperEnemy = enemyKind !== 'normal';
  const freezeSec = isUpperEnemy ? baseFreezeSec * 0.5 : baseFreezeSec;
  const frozenUntilMs = nowGameMs + freezeSec * 1000;
  const freezeImmuneUntilMsNext = frozenUntilMs + freezeSec * 2 * 1000;
  return {
    shouldApply: true,
    frozenUntilMs,
    freezeImmuneUntilMs: freezeImmuneUntilMsNext,
  };
}
