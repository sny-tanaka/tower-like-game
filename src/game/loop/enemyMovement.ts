import type { SpawnedEnemy } from '@/game/types';

/**
 * マシン中心座標 (画面比 0-100%) — useBattleLoop の MACHINE_CENTER_X/Y と
 * 揃える。 敵はこの座標に向かって直線移動する。
 */
export const MACHINE_X = 50;
export const MACHINE_Y = 50;

/**
 * 1 フレームで敵の position を更新する純粋関数。
 *
 * - 敵 position (0-100%) からマシン中心 (50, 50) へ直線移動
 * - 移動量 = `enemy.speed × deltaSec` (単位: % / 秒)
 *   - 仕様上は `EnemyTemplate.speed` は "px/s" だが、 BattleField の解像度との
 *     対応は未確定。 当面は「% / 秒」と解釈してチューニング想定 (敵速 ~1-2 で
 *     T1 W1 が 25-50 秒で到達する妥当なバランス)
 * - マシンに到達 (距離 ≤ 移動量) で position を (50, 50) にスナップ
 *
 * 副作用なし。 新しい SpawnedEnemy オブジェクトを返す (position が変わらない場合
 * は元のオブジェクトを返す)。
 */
export function updateEnemyPosition(enemy: SpawnedEnemy, deltaSec: number): SpawnedEnemy {
  const dx = MACHINE_X - enemy.position.x;
  const dy = MACHINE_Y - enemy.position.y;
  const dist = Math.sqrt(dx * dx + dy * dy);
  if (dist <= 0) return enemy;

  const moveDist = enemy.speed * deltaSec;
  if (moveDist <= 0) return enemy;

  if (moveDist >= dist) {
    return { ...enemy, position: { x: MACHINE_X, y: MACHINE_Y } };
  }

  const ratio = moveDist / dist;
  return {
    ...enemy,
    position: {
      x: enemy.position.x + dx * ratio,
      y: enemy.position.y + dy * ratio,
    },
  };
}
