/**
 * Text — タイポトークンを呼び出すだけの薄いラッパ Atom
 *
 * variant に応じて (font-family, font-size, font-weight, line-height, letter-spacing) を
 * styles.css のトークンから引く。テキスト色は color prop で上書き可能。
 *
 * variant:
 *   heading-1 / heading-2 / heading-3  Chakra Petch、見出し
 *   body                                Inter、本文
 *   caption                             Inter、補足
 *   label                               Chakra Petch、UPPER + tracking
 *   numeric-l / numeric-m / numeric-s  JetBrains Mono、数値（NumericDisplay と
 *                                       同じスケールだが値整形はしない）
 *
 * align: left / center / right
 * color: 'text' / 'mid' / 'dim' / 'primary' / 'secondary' / 'danger' / 'success' / 'warning' / 任意 CSS 値
 * as:    レンダリングタグ (default: variant に応じた h1/h2/.../span)
 * truncate: 1 行省略 (...)
 * uppercase: 強制大文字
 */
const VARIANT_PRESET = {
  'heading-1': {
    ff: 'var(--ff-display)',
    fs: 'var(--fs-h1)',
    fw: 'var(--fw-semibold)',
    lh: 'var(--lh-tight)',
    ls: 'normal',
    as: 'h1',
    upper: false,
  },
  'heading-2': {
    ff: 'var(--ff-display)',
    fs: 'var(--fs-h2)',
    fw: 'var(--fw-semibold)',
    lh: 'var(--lh-snug)',
    ls: 'normal',
    as: 'h2',
    upper: false,
  },
  'heading-3': {
    ff: 'var(--ff-display)',
    fs: 'var(--fs-h3)',
    fw: 'var(--fw-semibold)',
    lh: 'var(--lh-snug)',
    ls: 'normal',
    as: 'h3',
    upper: false,
  },
  body: {
    ff: 'var(--ff-body)',
    fs: 'var(--fs-body)',
    fw: 'var(--fw-regular)',
    lh: 'var(--lh-normal)',
    ls: 'normal',
    as: 'p',
    upper: false,
  },
  caption: {
    ff: 'var(--ff-body)',
    fs: 'var(--fs-caption)',
    fw: 'var(--fw-regular)',
    lh: 'var(--lh-normal)',
    ls: 'normal',
    as: 'p',
    upper: false,
  },
  label: {
    ff: 'var(--ff-display)',
    fs: 'var(--fs-label)',
    fw: 'var(--fw-medium)',
    lh: '1',
    ls: 'var(--ls-loose)',
    as: 'span',
    upper: true,
  },
  'numeric-l': {
    ff: 'var(--ff-numeric)',
    fs: 'var(--fs-num-l)',
    fw: 'var(--fw-semibold)',
    lh: '1',
    ls: 'var(--ls-num)',
    as: 'span',
    upper: false,
  },
  'numeric-m': {
    ff: 'var(--ff-numeric)',
    fs: 'var(--fs-num-m)',
    fw: 'var(--fw-semibold)',
    lh: '1',
    ls: 'var(--ls-num)',
    as: 'span',
    upper: false,
  },
  'numeric-s': {
    ff: 'var(--ff-numeric)',
    fs: 'var(--fs-num-s)',
    fw: 'var(--fw-medium)',
    lh: '1',
    ls: 'var(--ls-num)',
    as: 'span',
    upper: false,
  },
};

const COLOR_MAP = {
  text: 'var(--c-text)',
  mid: 'var(--c-text-mid)',
  dim: 'var(--c-text-dim)',
  disabled: 'var(--c-text-disabled)',
  primary: 'var(--c-primary)',
  secondary: 'var(--c-secondary)',
  danger: 'var(--c-danger)',
  success: 'var(--c-success)',
  warning: 'var(--c-warning)',
};

export function Text(props) {
  const {
    variant = 'body',
    as,
    color = 'text',
    align = 'left',
    uppercase,
    truncate = false,
    children,
    style: styleOverride,
    ...rest
  } = props;

  const preset = VARIANT_PRESET[variant] || VARIANT_PRESET.body;
  const Tag = as || preset.as;

  const isUpper = uppercase != null ? uppercase : preset.upper;

  const style = {
    fontFamily: preset.ff,
    fontSize: preset.fs,
    fontWeight: preset.fw,
    lineHeight: preset.lh,
    letterSpacing: preset.ls,
    color: COLOR_MAP[color] || color,
    textAlign: align,
    textTransform: isUpper ? 'uppercase' : 'none',
    margin: 0,
    ...(truncate && {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      display: 'block',
    }),
    ...styleOverride,
  };

  return React.createElement(Tag, { style, ...rest }, children);
}
