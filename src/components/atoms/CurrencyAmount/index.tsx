import type { CSSProperties } from 'react';

import styles from './style.module.scss';

import { NumericDisplay } from '@/components/atoms/NumericDisplay';
import type { NumericDisplaySize } from '@/components/atoms/NumericDisplay';
import { BigNum } from '@/lib/bignum/BigNum';

// ---------------------------------------------------------------------------
// 型定義
// ---------------------------------------------------------------------------

export type CurrencyType = 'screw' | 'bolt' | 'alloy';

export interface CurrencyAmountProps {
  currency: CurrencyType;
  value: BigNum | number;
  size?: NumericDisplaySize;
  delta?: '+' | '-';
}

// ---------------------------------------------------------------------------
// 通貨ごとの設定
// ---------------------------------------------------------------------------

const CURRENCY_CONFIG = {
  screw: {
    cssVar: '--c-screw',
    label: 'screw',
  },
  bolt: {
    cssVar: '--c-bolt',
    label: 'bolt',
  },
  alloy: {
    cssVar: '--c-alloy',
    label: 'alloy',
  },
} as const;

// ---------------------------------------------------------------------------
// SVG アイコン（inline ジオメトリック）
// ---------------------------------------------------------------------------

interface IconProps {
  currency: CurrencyType;
  sizeClass: string;
}

function CurrencyIcon({ currency, sizeClass }: IconProps) {
  const color = `var(${CURRENCY_CONFIG[currency].cssVar})`;

  if (currency === 'screw') {
    // 六角形 + 中央の十字（ねじ頭）
    return (
      <svg
        className={`${styles.icon} ${sizeClass}`}
        viewBox="0 0 12 12"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* 六角形 */}
        <polygon
          points="6,1 10.2,3.5 10.2,8.5 6,11 1.8,8.5 1.8,3.5"
          fill="none"
          stroke={color}
          strokeWidth="1"
        />
        {/* 十字（横） */}
        <line
          x1="3.5"
          y1="6"
          x2="8.5"
          y2="6"
          stroke={color}
          strokeWidth="1"
          strokeLinecap="round"
        />
        {/* 十字（縦） */}
        <line
          x1="6"
          y1="3.5"
          x2="6"
          y2="8.5"
          stroke={color}
          strokeWidth="1"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (currency === 'bolt') {
    // 雷形（ボルト）
    return (
      <svg
        className={`${styles.icon} ${sizeClass}`}
        viewBox="0 0 12 12"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <polyline
          points="7,1 4,6.5 6.5,6.5 5,11 8,5.5 5.5,5.5"
          fill={color}
          stroke="none"
        />
      </svg>
    );
  }

  // alloy: 菱形（金属塊）
  return (
    <svg
      className={`${styles.icon} ${sizeClass}`}
      viewBox="0 0 12 12"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <polygon
        points="6,1 11,6 6,11 1,6"
        fill="none"
        stroke={color}
        strokeWidth="1"
      />
      {/* 内側の小菱形 */}
      <polygon
        points="6,4 8.5,6 6,8 3.5,6"
        fill={color}
        stroke="none"
      />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// delta プレフィックス
// ---------------------------------------------------------------------------

interface DeltaPrefixProps {
  delta: '+' | '-';
  sizeClass: string;
}

function DeltaPrefix({ delta, sizeClass }: DeltaPrefixProps) {
  const colorVar = delta === '+' ? 'var(--c-success)' : 'var(--c-danger)';
  return (
    <span
      className={`${styles.delta} ${sizeClass}`}
      style={{ color: colorVar } as CSSProperties}
      aria-hidden="true"
    >
      {delta}
    </span>
  );
}

// ---------------------------------------------------------------------------
// コンポーネント
// ---------------------------------------------------------------------------

export function CurrencyAmount({ currency, value, size = 'md', delta }: CurrencyAmountProps) {
  const bn: BigNum = typeof value === 'number' ? BigNum.fromNumber(value) : value;

  const config = CURRENCY_CONFIG[currency];
  const colorVar = `var(${config.cssVar})`;

  // delta がある場合は delta の色を優先
  const accentStyle: CSSProperties = delta
    ? { color: delta === '+' ? 'var(--c-success)' : 'var(--c-danger)' }
    : { color: colorVar };

  const iconSizeClass = {
    sm: styles.iconSm,
    md: styles.iconMd,
    lg: styles.iconLg,
  }[size];

  const deltaSizeClass = {
    sm: styles.deltaSm,
    md: styles.deltaMd,
    lg: styles.deltaLg,
  }[size];

  return (
    <span
      className={styles.root}
      role="img"
      aria-label={`${config.label} ${bn.toDisplay()}`}
    >
      <CurrencyIcon
        currency={currency}
        sizeClass={iconSizeClass}
      />
      {delta !== undefined && (
        <DeltaPrefix
          delta={delta}
          sizeClass={deltaSizeClass}
        />
      )}
      <NumericDisplay
        value={bn}
        size={size}
        accentColor="primary"
        style={accentStyle}
      />
    </span>
  );
}
