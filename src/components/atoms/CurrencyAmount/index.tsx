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
  /** 通貨名ラベル（例: "screw"）を数値の後に表示 */
  showLabel?: boolean;
  /** 購入不可・条件未達のグレーアウト表示 */
  subtle?: boolean;
  /** アイコン + 数値の並び順。"start"（デフォルト）= アイコン先行、"end" = 数値先行 */
  align?: 'start' | 'end';
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
  xl: 28,
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

export function CurrencyAmount({
  currency,
  value,
  size = 'md',
  delta,
  showLabel,
  subtle,
  align = 'start',
}: CurrencyAmountProps) {
  const bn: BigNum = typeof value === 'number' ? BigNum.fromNumber(value) : value;

  const config = CURRENCY_CONFIG[currency];
  const colorVar = subtle ? 'var(--c-text-disabled)' : `var(${config.cssVar})`;

  // delta がある場合は delta の色を優先（subtle の場合は無効化）
  const accentStyle: CSSProperties =
    delta && !subtle
      ? { color: delta === '+' ? 'var(--c-success)' : 'var(--c-danger)' }
      : { color: colorVar };

  const deltaSizeClass = {
    sm: styles.deltaSm,
    md: styles.deltaMd,
    lg: styles.deltaLg,
    xl: styles.deltaLg, // xl はlg相当
  }[size];

  const iconEl = (
    <Icon
      name={currency}
      size={ICON_SIZE_MAP[size]}
      color={colorVar}
      className={styles.icon}
    />
  );

  const numericEl = (
    <>
      {delta !== undefined && !subtle && (
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
    </>
  );

  return (
    <span
      className={[styles.root, subtle ? styles.subtle : ''].filter(Boolean).join(' ')}
      role="img"
      aria-label={`${config.label} ${bn.toDisplay()}`}
    >
      {align === 'end' ? (
        <>
          {numericEl}
          {iconEl}
        </>
      ) : (
        <>
          {iconEl}
          {numericEl}
        </>
      )}
      {showLabel && (
        <span
          className={styles.currencyLabel}
          aria-hidden="true"
        >
          {config.label}
        </span>
      )}
    </span>
  );
}
