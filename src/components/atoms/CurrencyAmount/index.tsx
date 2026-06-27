import { memo } from 'react';
import type { CSSProperties } from 'react';

import styles from './style.module.scss';

// stable な CSSProperties オブジェクト (毎 render 生成しないため module-level に置く)。
// NumericDisplay の memo + shallowStyleEq は内容比較するが、 同参照ならその比較もスキップ。
const STYLE_COLOR_SUCCESS: CSSProperties = { color: 'var(--c-success)' };
const STYLE_COLOR_DANGER: CSSProperties = { color: 'var(--c-danger)' };
const STYLE_COLOR_DISABLED: CSSProperties = { color: 'var(--c-text-disabled)' };
const STYLE_COLOR_SCREW: CSSProperties = { color: 'var(--c-screw)' };
const STYLE_COLOR_BOLT: CSSProperties = { color: 'var(--c-bolt)' };
const STYLE_COLOR_ALLOY: CSSProperties = { color: 'var(--c-alloy)' };

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
  /**
   * 兵装ランクのスタンプを末尾に表示。
   * 例: "S" / "A" / "B" / "C" / 任意文字列。
   * 未指定 (undefined) なら描画しない。
   */
  ranked?: string;
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
  xs: 10,
  sm: 12,
  hp: 14,
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
  const colorClass = delta === '+' ? styles.deltaPlus : styles.deltaMinus;
  return (
    <span
      className={`${styles.delta} ${sizeClass} ${colorClass}`}
      aria-hidden="true"
    >
      {delta}
    </span>
  );
}

// ---------------------------------------------------------------------------
// コンポーネント
// ---------------------------------------------------------------------------

function CurrencyAmountImpl({
  currency,
  value,
  size = 'md',
  delta,
  showLabel,
  subtle,
  align = 'start',
  ranked,
}: CurrencyAmountProps) {
  const bn: BigNum = typeof value === 'number' ? BigNum.fromNumber(value) : value;

  const config = CURRENCY_CONFIG[currency];
  const colorVar = subtle ? 'var(--c-text-disabled)' : `var(${config.cssVar})`;

  // delta がある場合は delta の色を優先 (subtle の場合は無効化)。
  // 毎 render 新 CSSProperties オブジェクトを作らないように module-level の定数を選択する。
  // (NumericDisplay は memo + shallowStyleEq だが、 そもそも同参照ならその比較もスキップ)
  const accentStyle: CSSProperties = subtle
    ? STYLE_COLOR_DISABLED
    : delta === '+'
      ? STYLE_COLOR_SUCCESS
      : delta === '-'
        ? STYLE_COLOR_DANGER
        : currency === 'screw'
          ? STYLE_COLOR_SCREW
          : currency === 'bolt'
            ? STYLE_COLOR_BOLT
            : STYLE_COLOR_ALLOY;

  const deltaSizeClass = {
    xs: styles.deltaSm, // xs は sm 相当 (delta は 11px と 12px の差を吸収)
    sm: styles.deltaSm,
    hp: styles.deltaMd, // hp (14px) は md (16px) 相当に寄せる
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
      {ranked !== undefined && ranked !== '' && (
        <span
          className={styles.rankStamp}
          data-rank={ranked}
          aria-label={`rank ${ranked}`}
        >
          {ranked}
        </span>
      )}
    </span>
  );
}

// ---------------------------------------------------------------------------
// memo + 数値同値比較 (v1.3.7 Phase 5: BigNum 表示量子化)
// ---------------------------------------------------------------------------
//
// 親 (BattleHudBottom など) が `useStore((s) => s.screw)` で BigNum を購読すると、 同じ数値でも
// addScrew 系のアクションを経由した結果 BigNum インスタンスが入れ替わる場合がある (= zustand の
// Object.is 比較で differ 判定 → 親 component 再 render → 子 CurrencyAmount も毎回再 render)。
//
// CurrencyAmount は表示が `aria-label="screw 1.20A"` のような文字列単位で決まるため、 BigNum の
// **数値が同値であれば描画結果は同じ** という性質がある。 React.memo + カスタム比較で
// `prev.value.eq(next.value)` を取れば、 同値 BigNum はスキップでき、 整数桁が変わったとき
// (= toDisplay() の結果が変わったとき) だけ再 render される。
//
// 他の props (currency / size / delta / showLabel / subtle / align / ranked) は primitives なので
// Object.is で比較すれば十分。
function areCurrencyAmountPropsEqual(
  prev: CurrencyAmountProps,
  next: CurrencyAmountProps
): boolean {
  if (
    prev.currency !== next.currency ||
    prev.size !== next.size ||
    prev.delta !== next.delta ||
    prev.showLabel !== next.showLabel ||
    prev.subtle !== next.subtle ||
    prev.align !== next.align ||
    prev.ranked !== next.ranked
  ) {
    return false;
  }
  return bignumOrNumberEq(prev.value, next.value);
}

function bignumOrNumberEq(a: BigNum | number, b: BigNum | number): boolean {
  // 1) 参照同値ならスキップ
  if (a === b) return true;
  // 2) 片方 number / 片方 BigNum の混在は数値同値で比較 (BigNum.fromNumber 経由)
  const aBn = typeof a === 'number' ? BigNum.fromNumber(a) : a;
  const bBn = typeof b === 'number' ? BigNum.fromNumber(b) : b;
  return aBn.eq(bBn);
}

export const CurrencyAmount = memo(CurrencyAmountImpl, areCurrencyAmountPropsEqual);
CurrencyAmount.displayName = 'CurrencyAmount';
