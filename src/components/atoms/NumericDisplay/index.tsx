import type { CSSProperties } from 'react';

import styles from './style.module.scss';

import { BigNum } from '@/lib/bignum/BigNum';

// ---------------------------------------------------------------------------
// 型定義
// ---------------------------------------------------------------------------

export type NumericDisplaySize = 'sm' | 'md' | 'lg' | 'xl';
export type NumericDisplayAccentColor =
  | 'scale'
  | 'primary'
  | 'secondary'
  | 'danger'
  | 'success'
  | 'warning'
  | 'dim';

export interface NumericDisplayProps {
  value: BigNum | number;
  size?: NumericDisplaySize;
  accentColor?: NumericDisplayAccentColor;
  glow?: boolean;
  /** 値の前に付けるテキスト（例: "×", "+"） */
  prefix?: string;
  /** 値の後に付けるテキスト（例: "%", " Wave"） */
  suffix?: string;
  /** 小数点以下の桁数（BigNum では整数表示だが、生の数値を decimals 桁で表示） */
  decimals?: number;
  style?: CSSProperties;
}

// ---------------------------------------------------------------------------
// 内部ヘルパー
// ---------------------------------------------------------------------------

/**
 * toDisplay() が返す文字列（例: "1.50B", "42", "1.00AA"）から
 * サフィックス部分（アルファベット）を抽出して n (1始まり) を返す。
 * サフィックスなし（< 1000）は 0 を返す。
 *
 * n=1: A, n=2: B, ..., n=26: Z, n=27: AA, ...
 */
function suffixToN(suffix: string): number {
  if (suffix === '') return 0;
  let n = 0;
  for (let i = 0; i < suffix.length; i++) {
    n = n * 26 + (suffix.charCodeAt(i) - 65 + 1);
  }
  return n;
}

/**
 * accentColor='scale' の場合に n から oklch 色を返す。
 * A (n=1) = H195 (cyan), Z (n=26) = H295 (purple)
 * AA 以降は (n-1) mod 26 で色相を循環
 */
function scaleColor(n: number): string {
  if (n === 0) return 'var(--c-primary)';
  const idx = (n - 1) % 26;
  const H = 195 + idx * (100 / 25);
  return `oklch(0.78 0.18 ${H.toFixed(1)})`;
}

/** accentColor ごとの CSS color 値を返す */
function resolveColor(accentColor: NumericDisplayAccentColor, n: number): string {
  switch (accentColor) {
    case 'scale':
      return scaleColor(n);
    case 'primary':
      return 'var(--c-primary)';
    case 'secondary':
      return 'var(--c-secondary)';
    case 'danger':
      return 'var(--c-danger)';
    case 'success':
      return 'var(--c-success)';
    case 'warning':
      return 'var(--c-warning)';
    case 'dim':
      return 'var(--c-text-dim)';
  }
}

/** accentColor ごとの glow text-shadow を返す */
function resolveGlow(accentColor: NumericDisplayAccentColor): string | undefined {
  switch (accentColor) {
    case 'scale':
    case 'primary':
      return 'var(--glow-cyan-md)';
    case 'secondary':
      return 'var(--glow-purple-md)';
    case 'danger':
      return 'var(--glow-danger-md)';
    case 'success':
      return 'var(--glow-success-md)';
    case 'warning':
      return '0 0 12px rgba(246,185,74,0.55), 0 0 24px rgba(246,185,74,0.25)';
    case 'dim':
      return undefined; // dim は glow しない
  }
}

// ---------------------------------------------------------------------------
// コンポーネント
// ---------------------------------------------------------------------------

export function NumericDisplay({
  value,
  size = 'md',
  accentColor = 'scale',
  glow = false,
  prefix,
  suffix,
  decimals,
  style,
}: NumericDisplayProps) {
  const bn: BigNum = typeof value === 'number' ? BigNum.fromNumber(value) : value;

  let text: string;
  if (decimals != null && typeof value === 'number') {
    // decimals 指定時は生の数値を fixed 表示
    text = value.toFixed(decimals);
  } else {
    text = bn.toDisplay();
  }

  // サフィックス（アルファベット部分）を抽出
  const match = text.match(/^[\d.]+([A-Z]*)$/);
  const alphaSuffix = match ? match[1] : '';
  const n = suffixToN(alphaSuffix);

  const color = resolveColor(accentColor, n);
  const textShadow = glow ? resolveGlow(accentColor) : undefined;

  const sizeClass = {
    sm: styles.sizeSm,
    md: styles.sizeMd,
    lg: styles.sizeLg,
    xl: styles.sizeXl,
  }[size];

  const inlineStyle: CSSProperties = {
    color,
    ...(textShadow != null ? { textShadow } : {}),
    ...style,
  };

  return (
    <span
      className={`${styles.root} ${sizeClass}`}
      style={inlineStyle}
    >
      {prefix != null && <span className={styles.affix}>{prefix}</span>}
      {text}
      {suffix != null && <span className={styles.affix}>{suffix}</span>}
    </span>
  );
}
