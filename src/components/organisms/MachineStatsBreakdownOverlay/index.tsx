import { memo } from 'react';

import styles from './style.module.scss';

import { IconButton } from '@/components/atoms/IconButton';
import { Overlay } from '@/components/atoms/Overlay';
import { StatBreakdownRow } from '@/components/atoms/StatBreakdownRow';
import { useMachineStatsBreakdown } from '@/hooks/useMachineStatsBreakdown';

export interface MachineStatsBreakdownOverlayProps {
  open: boolean;
  onClose: () => void;
}

/**
 * MachineStatsBreakdownOverlay — マシンスタッツの計算式を可視化するオーバーレイ。
 *
 * v1.3.9 新設。 BattleHudTop の `i` ボタンから開く。
 *
 * 設計方針:
 *   - ゲームは pause しない (ラン中強化の効きをリアルタイムで観察できる)
 *   - 11 スタッツを 3 セクション (攻撃 / 防御 / その他) に分けて表示
 *   - 各スタッツは StatBreakdownRow atom で「基礎 × A × B = 最終値」 を 1 行表示
 *   - Overlay の dimLevel='heavy' で背景を強くディムし、 数式に集中させる
 *   - blur は使わない (iOS Safari の発熱要因のため。 v1.3.9 までの方針と整合)
 *
 * パフォーマンス:
 *   - open=false の間は useMachineStatsBreakdown を呼ばない (内部の useStore subscribe を回さない)
 *   - memo で props 変化以外の再 render を抑える
 */
function MachineStatsBreakdownOverlayImpl({ open, onClose }: MachineStatsBreakdownOverlayProps) {
  if (!open) return null;
  return <MachineStatsBreakdownOverlayBody onClose={onClose} />;
}

/**
 * Body 部 — open=true のときだけ mount されるので、 ここで初めて useStore subscribe が走る。
 * 親 (Overlay) の open false 期間に hook を回さない構造。
 */
function MachineStatsBreakdownOverlayBody({ onClose }: { onClose: () => void }) {
  const breakdown = useMachineStatsBreakdown();

  return (
    <Overlay
      open
      onClose={onClose}
      dimLevel="heavy"
      zIndex="dialog"
      align="center"
      dismissible
    >
      <div
        className={styles.panel}
        // Overlay 内の click bubbling で onClose が発火するのを止める (パネル内の click は閉じない)
        onClick={(e) => e.stopPropagation()}
      >
        <header className={styles.header}>
          <h2 className={styles.title}>マシンスタッツ詳細</h2>
          <IconButton
            icon="close"
            label="閉じる"
            size="md"
            variant="ghost"
            onClick={onClose}
          />
        </header>

        <div className={styles.body}>
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>攻撃系</h3>
            <div className={styles.rows}>
              <StatBreakdownRow {...breakdown.attack} />
              <StatBreakdownRow {...breakdown.attackSpeed} />
              <StatBreakdownRow {...breakdown.critRate} />
              <StatBreakdownRow {...breakdown.critMultiplier} />
            </div>
          </section>

          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>防御系</h3>
            <div className={styles.rows}>
              <StatBreakdownRow {...breakdown.maxHp} />
              <StatBreakdownRow {...breakdown.hpRegen} />
              <StatBreakdownRow {...breakdown.defense} />
              <StatBreakdownRow {...breakdown.damageReduction} />
            </div>
          </section>

          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>その他</h3>
            <div className={styles.rows}>
              <StatBreakdownRow {...breakdown.range} />
              <StatBreakdownRow {...breakdown.activePower} />
              <StatBreakdownRow {...breakdown.activeCdReduction} />
            </div>
          </section>
        </div>
      </div>
    </Overlay>
  );
}

export const MachineStatsBreakdownOverlay = memo(MachineStatsBreakdownOverlayImpl);
