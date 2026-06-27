import { memo } from 'react';
import type { CSSProperties } from 'react';

import styles from './style.module.scss';

import { BigNum } from '@/lib/bignum/BigNum';

// ---------------------------------------------------------------------------
// 型定義
// ---------------------------------------------------------------------------

/**
 * NumericDisplay の size token。
 *  - xs (11px) HUD 補助数値 (max 値, shield 値)
 *  - sm (13px) inline numerics
 *  - hp (14px) HUD HP current 値 (sm よりやや大きく強調)
 *  - md (18px) card values (デフォルト)
 *  - lg (28px) HUD HP, large counters
 *  - xl (36px) hero counters (Showcase 等)
 *
 * v1.3.7 フォローアップ: 上書き class (font-size 直書き) を廃止するため
 * `xs` / `hp` を追加。 既存 sm/md/lg/xl の値は据え置き。
 */
export type NumericDisplaySize = 'xs' | 'sm' | 'hp' | 'md' | 'lg' | 'xl';
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
  /**
   * 親側で `font-size` 等を CSS Module class でかぶせるための拡張ポイント。
   * v1.3.7 inline style 棚卸し: 利用側で `style={{ fontSize: 14 }}` のように静的値を
   * inline 渡しするのを避けるため追加。 size class より後ろに連結されるので
   * 親 module の class が specificity でも勝つ (CSS Module は単一クラスセレクタ)。
   */
  className?: string;
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

function NumericDisplayImpl({
  value,
  size = 'md',
  accentColor = 'scale',
  glow = false,
  prefix,
  suffix,
  decimals,
  className,
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
    xs: styles.sizeXs,
    sm: styles.sizeSm,
    hp: styles.sizeHp,
    md: styles.sizeMd,
    lg: styles.sizeLg,
    xl: styles.sizeXl,
  }[size];

  const inlineStyle: CSSProperties = {
    color,
    ...(textShadow != null ? { textShadow } : {}),
    ...style,
  };

  const rootClass = className
    ? `${styles.root} ${sizeClass} ${className}`
    : `${styles.root} ${sizeClass}`;

  return (
    <span
      className={rootClass}
      style={inlineStyle}
    >
      {prefix != null && <span className={styles.affix}>{prefix}</span>}
      {text}
      {suffix != null && <span className={styles.affix}>{suffix}</span>}
    </span>
  );
}

// ---------------------------------------------------------------------------
// memo + 数値同値比較 (v1.3.7 Phase 5: BigNum 表示量子化)
// ---------------------------------------------------------------------------
//
// machineHp は被ダメごとに新 BigNum インスタンスで更新される。 BattleHudTop が React.memo で
// ラップ済みでも、 内部 selector (= machineHp) が変化したフレームは BattleHudTop ごと再 render
// する。 そのときの NumericDisplay も毎フレーム描画されるが、 表示文字列が同じなら出力 DOM は
// 等価のはず → memo + 数値同値比較で「BigNum 同値ならスキップ」 する。
//
// `style` は CSSProperties (オブジェクト)。 親で useMemo していなければ毎 render 新参照になり
// memo が効かないので、 ここではキー単位の浅い比較を行う。
function areNumericDisplayPropsEqual(
  prev: NumericDisplayProps,
  next: NumericDisplayProps
): boolean {
  if (
    prev.size !== next.size ||
    prev.accentColor !== next.accentColor ||
    prev.glow !== next.glow ||
    prev.prefix !== next.prefix ||
    prev.suffix !== next.suffix ||
    prev.decimals !== next.decimals ||
    prev.className !== next.className
  ) {
    return false;
  }
  if (!shallowStyleEq(prev.style, next.style)) return false;
  return numericValueEq(prev.value, next.value);
}

function numericValueEq(a: BigNum | number, b: BigNum | number): boolean {
  if (a === b) return true;
  const aBn = typeof a === 'number' ? BigNum.fromNumber(a) : a;
  const bBn = typeof b === 'number' ? BigNum.fromNumber(b) : b;
  return aBn.eq(bBn);
}

function shallowStyleEq(a: CSSProperties | undefined, b: CSSProperties | undefined): boolean {
  if (a === b) return true;
  if (a == null || b == null) return false;
  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);
  if (aKeys.length !== bKeys.length) return false;
  for (const k of aKeys) {
    if ((a as Record<string, unknown>)[k] !== (b as Record<string, unknown>)[k]) return false;
  }
  return true;
}

export const NumericDisplay = memo(NumericDisplayImpl, areNumericDisplayPropsEqual);
NumericDisplay.displayName = 'NumericDisplay';
