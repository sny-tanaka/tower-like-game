import type { MutableEnemy } from '@/game/types';

/**
 * マシン中心座標 (画面比 0-100%) — useBattleLoop の MACHINE_CENTER_X/Y と
 * 揃える。 敵はこの座標に向かって直線移動する。
 */
export const MACHINE_X = 50;
export const MACHINE_Y = 50;

/**
 * 1 フレームで敵の position を **副作用的に** 更新する関数 (v1.3.7 Phase 3-B)。
 *
 * - 敵 position (0-100%) からマシン中心 (50, 50) へ直線移動
 * - 移動量 = `enemy.speed × deltaSec` (単位: % / 秒)
 *   - 仕様上は `EnemyTemplate.speed` は "px/s" だが、 BattleField の解像度との
 *     対応は未確定。 当面は「% / 秒」と解釈してチューニング想定 (敵速 ~1-2 で
 *     T1 W1 が 25-50 秒で到達する妥当なバランス)
 * - マシンに到達 (距離 ≤ 移動量) で position を (50, 50) にスナップ
 * - **凍結中 (frozenUntilMs > nowMs) は移動しない** (近接ダメは止めない仕様)
 *
 * Phase 3-B (in-place mutation):
 *   - 引数 enemy の `position.x` / `position.y` を **直接書換える** (オブジェクト差替えなし)
 *   - 戻り値は「位置が変わったか」 (boolean)。 useBattleLoop は false の場合
 *     `markEnemyMoved(id)` を省略でき、 listener 通知を最小化できる
 *
 * @param nowMs ラン開始からの現在経過 ms (凍結期限判定に使用)。 省略時は凍結無視
 * @returns 位置が変わった場合 true、 frozen / speed=0 / 既にマシン上などで変わらない場合 false
 */
export function mutateEnemyPosition(
  enemy: MutableEnemy,
  deltaSec: number,
  nowMs?: number
): boolean {
  // 凍結中はそのまま (移動量 0)
  if (enemy.frozenUntilMs != null && nowMs != null && enemy.frozenUntilMs > nowMs) {
    return false;
  }

  const dx = MACHINE_X - enemy.position.x;
  const dy = MACHINE_Y - enemy.position.y;
  const dist = Math.sqrt(dx * dx + dy * dy);
  if (dist <= 0) return false;

  const moveDist = enemy.speed * deltaSec;
  if (moveDist <= 0) return false;

  if (moveDist >= dist) {
    // 既にマシン位置にいる場合は false を返す (本来は dist=0 で早期 return しているが
    // 浮動小数演算で僅差を取りこぼすリスクの保険)。
    if (enemy.position.x === MACHINE_X && enemy.position.y === MACHINE_Y) return false;
    enemy.position.x = MACHINE_X;
    enemy.position.y = MACHINE_Y;
    return true;
  }

  const ratio = moveDist / dist;
  enemy.position.x = enemy.position.x + dx * ratio;
  enemy.position.y = enemy.position.y + dy * ratio;
  return true;
}
