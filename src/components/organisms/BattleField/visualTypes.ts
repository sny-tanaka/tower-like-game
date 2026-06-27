import type { EnemyVisualType } from '@/components/molecules/Enemy';

export { spawnedEnemyToVisualType } from '@/components/molecules/Enemy';

/**
 * 敵タイプ別 cqmin サイズ (= フィールド短辺に対する % 相当)。
 *
 * v1.1.1 で px 固定から cqmin に切替。 端末間で「マシン本体に対する敵の相対サイズ」 を
 * 揃えるため。 値は旧 px 値を「典型的なポートレート field (~390 cqmin)」 で割った比率を
 * 採用 (standard 14px / 390 ≈ 3.6cqmin)。
 *
 * v1.3.7 (Phase 2-B): BattleField から EnemyLayer に切り出した際の共用定数として
 * 本ファイルに移管。 BattleField/index.tsx と EnemyLayer.tsx 双方が参照する。
 */
export const ENEMY_SIZE_CQMIN: Record<EnemyVisualType, string> = {
  standard: '3.6cqmin',
  swift: '3.3cqmin',
  tough: '4.6cqmin',
  elite: '6.7cqmin',
  miniboss: '9.2cqmin',
  boss: '21.6cqmin', // v1.3.1 で 14.4 → 21.6 (×1.5) に拡大
};
