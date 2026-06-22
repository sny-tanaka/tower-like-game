/**
 * NumericDisplay — A→B→...→Z→AA→AB→... の無限スケール数値表記
 *
 * 仕様:
 *   - raw < 1,000        → そのまま (例 987)
 *   - 1,000 以上         → 1.23 × 10³ = "1.23A"
 *   - 10⁶ 以上           → 456 × 10⁶ = "456B"
 *   - ... → Z (10⁷⁸) の次は AA (10⁸¹) → AB → ... と無限ループ
 *
 * accentColor:
 *   'scale'    (default) 桁数 (A→B→C→...→Z) に応じて cyan → purple へ
 *              連続的に色相を変える。oklch で動的計算。
 *   'text'     白テキスト固定
 *   'primary'  シアン固定
 *   'secondary'紫固定
 *   'danger' / 'success' / 'warning' / 'dim'
 *
 * decimals: 'auto' は 1000 未満で 0 桁、それ以上で 2 桁。
 * size: 'sm' (13) / 'md' (18) / 'lg' (28) / 'xl' (36)
 * glow: true で text-shadow グロー付与
 */
export function formatScale(value, decimals) {
  if (value == null || !isFinite(value)) return '0';
  if (Math.abs(value) < 1000) {
    const d = decimals === 'auto' ? 0 : decimals;
    return value.toLocaleString('en-US', {
      minimumFractionDigits: d,
      maximumFractionDigits: d,
    });
  }
  const e = Math.floor(Math.log10(Math.abs(value)) / 3);
  const mantissa = value / Math.pow(10, e * 3);
  const d = decimals === 'auto' ? 2 : decimals;
  const num = mantissa.toLocaleString('en-US', {
    minimumFractionDigits: d,
    maximumFractionDigits: d,
  });
  let n = e;
  let letters = '';
  while (n > 0) {
    n -= 1;
    letters = String.fromCharCode(65 + (n % 26)) + letters;
    n = Math.floor(n / 26);
  }
  return num + letters;
}

/** 値に対する scale exponent (raw=0, A=1, B=2, ..., Z=26, AA=27, ...) */
export function scaleExponent(value) {
  if (value == null || !isFinite(value) || Math.abs(value) < 1000) return 0;
  return Math.max(0, Math.floor(Math.log10(Math.abs(value)) / 3));
}

/**
 * 桁 index e を受け取り、cyan (~ hue 195) → purple (~ hue 295) へ補間した oklch 色を返す。
 *   e <= 0: 白テキスト
 *   1 <= e <= 20: 線形補間
 *   e >= 20: purple 端に飽和（AA 以降も同じ色相を維持）
 */
export function scaleTierColor(e) {
  if (e <= 0) {
    return { color: 'var(--c-text)', glow: '0 0 6px rgba(232,239,255,0.35)' };
  }
  const t = Math.min(1, (e - 1) / 19);
  const hue = 195 + t * 100;
  const light = 0.86 - t * 0.14;
  const chroma = 0.13 + t * 0.07;
  const color = `oklch(${light.toFixed(3)} ${chroma.toFixed(3)} ${hue.toFixed(1)})`;
  const gColor = `oklch(${Math.min(0.95, light + 0.05).toFixed(3)} ${(chroma + 0.05).toFixed(3)} ${hue.toFixed(1)} / 0.55)`;
  return { color, glow: `0 0 8px ${gColor}` };
}

export function NumericDisplay(props) {
  const {
    value,
    decimals = 'auto',
    prefix = '',
    suffix = '',
    accentColor = 'scale',
    size = 'md',
    glow = false,
    align = 'left',
    style: styleOverride,
  } = props;

  const sizeMap = { sm: 13, md: 18, lg: 28, xl: 36 };
  const colorMap = {
    text: 'var(--c-text)',
    primary: 'var(--c-primary)',
    secondary: 'var(--c-secondary)',
    danger: 'var(--c-danger)',
    success: 'var(--c-success)',
    warning: 'var(--c-warning)',
    dim: 'var(--c-text-dim)',
  };
  const glowMap = {
    text: 'none',
    primary: 'var(--glow-cyan-sm)',
    secondary: 'var(--glow-purple-sm)',
    danger: '0 0 6px rgba(255,77,109,0.55)',
    success: '0 0 6px rgba(70,226,160,0.55)',
    warning: '0 0 6px rgba(246,185,74,0.55)',
    dim: 'none',
  };

  let resolvedColor;
  let resolvedGlow;
  if (accentColor === 'scale') {
    const e = scaleExponent(value);
    const t = scaleTierColor(e);
    resolvedColor = t.color;
    resolvedGlow = glow ? t.glow : 'none';
  } else {
    resolvedColor = colorMap[accentColor] || colorMap.text;
    resolvedGlow = glow ? glowMap[accentColor] : 'none';
  }

  const style = {
    fontFamily: 'var(--ff-numeric)',
    fontWeight: 'var(--fw-semibold)',
    fontSize: sizeMap[size] + 'px',
    lineHeight: 1,
    letterSpacing: 'var(--ls-num)',
    color: resolvedColor,
    textShadow: resolvedGlow,
    textAlign: align,
    fontVariantNumeric: 'tabular-nums',
    display: 'inline-block',
    ...styleOverride,
  };

  return React.createElement(
    'span',
    { style, 'data-numeric-display': true, 'data-scale-e': scaleExponent(value) },
    prefix,
    formatScale(value, decimals),
    suffix
  );
}

NumericDisplay.format = formatScale;
NumericDisplay.scaleExponent = scaleExponent;
NumericDisplay.scaleTierColor = scaleTierColor;
