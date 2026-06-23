import type { CSSProperties } from 'react';

import styles from './style.module.scss';

import { Badge } from '@/components/atoms/Badge';
import { ProgressBar } from '@/components/atoms/ProgressBar';
import { Text } from '@/components/atoms/Text';
import { BigNum } from '@/lib/bignum/BigNum';

// ---------------------------------------------------------------------------
// 型定義
// ---------------------------------------------------------------------------

/** エネミーのバリアント */
export type EnemyHpBarVariant = 'normal' | 'elite' | 'boss';

/** HP バーのサイズ */
export type EnemyHpBarSize = 'sm' | 'md' | 'lg';

export interface EnemyHpBarProps {
  name: string;
  /** HP バーのバリアント。normal: 通常 / elite: 強敵 / boss: ボス */
  variant?: EnemyHpBarVariant;
  /** 現在 HP */
  current?: BigNum | number;
  /** 最大 HP */
  max?: BigNum | number;
  /** Tier 番号（variant="normal" のみ表示） */
  tier?: number;
  /** バーサイズ。sm: 通常 / md: エリート / lg: ボス。デフォルト md */
  size?: EnemyHpBarSize;
  /** HP 数値を表示するか。デフォルト true */
  showValue?: boolean;
  // ---- deprecated ----
  /**
   * @deprecated variant を使用してください。後方互換のため残す。
   */
  type?: 'elite' | 'boss';
  /**
   * @deprecated current を使用してください。後方互換のため残す。
   */
  currentHp?: BigNum | number;
  /**
   * @deprecated max を使用してください。後方互換のため残す。
   */
  maxHp?: BigNum | number;
}

// ---------------------------------------------------------------------------
// 内部ヘルパー: BigNum の比率を 0〜1000 の整数で返す
// ---------------------------------------------------------------------------

function hpRatio1000(current: BigNum, max: BigNum): number {
  if (max.isZero()) return 0;
  // toString() で整数文字列を取得し JS の number で近似計算
  // 超巨大数では精度が落ちるが UI 表示用なので許容範囲内
  const c = parseFloat(current.toString());
  const m = parseFloat(max.toString());
  if (m === 0 || isNaN(m)) return 0;
  return Math.min(1000, Math.max(0, Math.round((c / m) * 1000)));
}

// ---------------------------------------------------------------------------
// サイズマップ
// ---------------------------------------------------------------------------

const SIZE_CLASS: Record<EnemyHpBarSize, string> = {
  sm: styles.sizeSm,
  md: styles.sizeMd,
  lg: styles.sizeLg,
};

// ---------------------------------------------------------------------------
// コンポーネント
// ---------------------------------------------------------------------------

export function EnemyHpBar({
  name,
  variant: variantProp,
  current: currentProp,
  max: maxProp,
  tier,
  size = 'md',
  showValue = true,
  type,
  currentHp,
  maxHp,
}: EnemyHpBarProps) {
  // deprecated props へのフォールバック
  const variant: EnemyHpBarVariant = variantProp ?? type ?? 'normal';
  const currentRaw = currentProp ?? currentHp ?? 0;
  const maxRaw = maxProp ?? maxHp ?? 0;

  const currentBn: BigNum =
    typeof currentRaw === 'number' ? BigNum.fromNumber(currentRaw) : currentRaw;
  const maxBn: BigNum = typeof maxRaw === 'number' ? BigNum.fromNumber(maxRaw) : maxRaw;

  // 比率（0 〜 1000）
  const ratio1000 = hpRatio1000(currentBn, maxBn);

  // HP が 25% 以下かどうか
  const isLow = ratio1000 <= 250;

  // ProgressBar の color
  const barColor = isLow ? 'hp-low' : 'hp';

  // ProgressBar のサイズ
  const barSize = size === 'lg' ? 'lg' : size === 'sm' ? 'sm' : 'md';

  // wrapper のグロースタイル（variant によって変化）
  let rootStyle: CSSProperties | undefined;
  if (variant === 'boss') {
    rootStyle = { boxShadow: 'var(--glow-danger-md)' };
  } else if (variant === 'elite') {
    rootStyle = { boxShadow: 'var(--glow-purple-md)' };
  }

  return (
    <div
      className={[
        styles.root,
        variant === 'boss' ? styles.boss : '',
        variant === 'elite' ? styles.elite : '',
        SIZE_CLASS[size],
      ]
        .filter(Boolean)
        .join(' ')}
      style={rootStyle}
    >
      {/* 上段: 名前 + タイプバッジ / Tier */}
      <div className={styles.header}>
        <Text
          variant="label"
          color="mid"
        >
          {name}
        </Text>
        <div className={styles.headerRight}>
          {variant === 'normal' && tier !== undefined && (
            <Text
              variant="numeric-s"
              color="dim"
            >
              T{tier}
            </Text>
          )}
          {(variant === 'elite' || variant === 'boss') && (
            <Badge
              text={variant.toUpperCase()}
              variant={variant}
              glow={variant === 'boss'}
            />
          )}
        </div>
      </div>

      {/* HP バー */}
      <ProgressBar
        value={ratio1000}
        max={1000}
        color={barColor}
        size={barSize}
        glow={isLow}
      />

      {/* HP 数値 */}
      {showValue && (
        <div className={styles.hpText}>
          <Text
            variant="numeric-s"
            color={isLow ? 'danger' : 'mid'}
          >
            {currentBn.toDisplay()} / {maxBn.toDisplay()}
          </Text>
        </div>
      )}
    </div>
  );
}

// ratio ユーティリティを外部テスト向けに export
export { hpRatio1000 };
