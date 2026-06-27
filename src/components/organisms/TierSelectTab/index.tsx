import styles from './style.module.scss';

import { Text } from '@/components/atoms/Text';
import { calcTierDiffAttackMul } from '@/game/balance/tierDiffAttackMul';
import { useStore } from '@/store';

// ---------------------------------------------------------------------------
// 型定義
// ---------------------------------------------------------------------------

export interface TierSelectTabProps {
  selectedTier: number;
  onSelect?: (tier: number) => void;
}

// ---------------------------------------------------------------------------
// コンポーネント
// ---------------------------------------------------------------------------

/**
 * TierSelectTab — 出撃準備画面の Tier 選択タブ Organism
 *
 * 到達済み Tier (1 〜 profile.highestTier) をグリッドで表示し、
 * 1 つを選択する。未到達 Tier は表示しない。
 */
export function TierSelectTab({ selectedTier, onSelect }: TierSelectTabProps) {
  const highestTier = useStore((s) => s.highestTier);
  const maxTier = Math.max(1, highestTier);

  const tiers: number[] = [];
  for (let t = 1; t <= maxTier; t++) tiers.push(t);

  const tierColorVar = (t: number): string => {
    const clamped = Math.max(1, Math.min(10, t));
    return `var(--c-tier-${clamped})`;
  };

  return (
    <div
      role="tabpanel"
      aria-label="Tier 選択"
      className={styles.wrapper}
    >
      {/* ヘッダー情報 */}
      <div className={styles.header}>
        <Text
          variant="caption"
          color="mid"
        >
          到達済み Tier を選んで出撃します。
        </Text>
        <Text
          variant="numeric-s"
          color="dim"
        >
          最大 Tier {maxTier}
        </Text>
      </div>

      {/* v1.3.4: 選択中 Tier の差分バフ表示 (基礎攻撃力倍率) */}
      {(() => {
        const tierDiffMul = calcTierDiffAttackMul(highestTier, selectedTier);
        const pct = Math.round((tierDiffMul - 1) * 100);
        return (
          <div className={styles.tierDiffBuffRow}>
            <Text
              variant="caption"
              color="dim"
            >
              選択中 Tier の差分バフ (基礎攻撃力)
            </Text>
            <Text
              variant="numeric-s"
              color={tierDiffMul > 1 ? 'text' : 'dim'}
            >
              ×{tierDiffMul.toFixed(2)}
              {pct > 0 ? ` (+${pct}%)` : ''}
            </Text>
          </div>
        );
      })()}

      {/* Tier グリッド */}
      <div className={styles.grid}>
        {tiers.map((t) => {
          const isActive = t === selectedTier;
          const isFrontier = t === maxTier;
          const color = tierColorVar(t);

          return (
            <button
              key={t}
              type="button"
              aria-pressed={isActive}
              data-active={isActive}
              data-frontier={isFrontier}
              className={[styles.tierBtn, isActive ? styles.active : ''].filter(Boolean).join(' ')}
              style={
                {
                  '--tier-color': color,
                } as React.CSSProperties
              }
              onClick={() => onSelect?.(t)}
            >
              <span className={styles.tierLabel}>T{t}</span>
              {isFrontier && !isActive && <span className={styles.frontierLabel}>FRONTIER</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}
