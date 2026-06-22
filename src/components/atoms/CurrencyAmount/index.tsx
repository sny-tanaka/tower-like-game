import type { CSSProperties } from 'react';

import styles from './style.module.scss';

import { Icon } from '@/components/atoms/Icon';
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
// アイコン: Icon Atom に委譲（claude design 製 SVG を参照）
// ---------------------------------------------------------------------------

const ICON_SIZE_MAP: Record<NumericDisplaySize, number> = {
  sm: 12,
  md: 16,
  lg: 22,
};

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
      <span
        className={styles.icon}
        style={{ color: colorVar }}
      >
        <Icon
          name={currency}
          size={ICON_SIZE_MAP[size]}
        />
      </span>
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
