import type { CSSProperties } from 'react';

import styles from './style.module.scss';

import { BigNum } from '@/lib/bignum/BigNum';

// ---------------------------------------------------------------------------
// 型定義
// ---------------------------------------------------------------------------

export type NumericDisplaySize = 'sm' | 'md' | 'lg' | 'xl';
export type NumericDisplayAccentColor =
  | 'scale'
  | 'text'
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
 *  - n=0 (raw < 1000): 白 (`var(--c-text)`)
 *  - n=1 (A) ～ n=20 (T): cyan(H195) → purple(H295) を 20 段で線形補間
 *  - n>=21: purple 端で飽和（循環しない）
 *
 * 戻り値は color と glow (text-shadow 値) のペア。
 */
function scaleTierColor(n: number): { color: string; glow: string } {
  if (n <= 0) {
    return {
      color: 'var(--c-text)',
      glow: '0 0 6px rgba(232,239,255,0.35)',
    };
  }
  const t = Math.min(1, (n - 1) / 19);
  const hue = 195 + t * 100;
  const light = 0.86 - t * 0.14;
  const chroma = 0.13 + t * 0.07;
  const color = `oklch(${light.toFixed(3)} ${chroma.toFixed(3)} ${hue.toFixed(1)})`;
  const gLight = Math.min(0.95, light + 0.05);
  const gChroma = chroma + 0.05;
  const gColor = `oklch(${gLight.toFixed(3)} ${gChroma.toFixed(3)} ${hue.toFixed(1)} / 0.55)`;
  return { color, glow: `0 0 8px ${gColor}` };
}

/** accentColor ごとの CSS color 値を返す（scale 以外） */
function resolveColor(accentColor: Exclude<NumericDisplayAccentColor, 'scale'>): string {
  switch (accentColor) {
    case 'text':
      return 'var(--c-text)';
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

/** accentColor ごとの glow text-shadow を返す（scale 以外） */
function resolveGlow(accentColor: Exclude<NumericDisplayAccentColor, 'scale'>): string | undefined {
  switch (accentColor) {
    case 'text':
      return '0 0 6px rgba(232,239,255,0.35)';
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

  let color: string;
  let textShadow: string | undefined;
  if (accentColor === 'scale') {
    const tier = scaleTierColor(n);
    color = tier.color;
    textShadow = glow ? tier.glow : undefined;
  } else {
    color = resolveColor(accentColor);
    textShadow = glow ? resolveGlow(accentColor) : undefined;
  }

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
