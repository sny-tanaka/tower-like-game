/**
 * CurrencyAmount — Icon (currency) + NumericDisplay の組合せ Atom
 *
 * currency: 'screw' | 'bolt' | 'alloy'
 *   それぞれの token から自動で配色 (screw=銀白 / bolt=cyan / alloy=purple)
 *
 * value: 表示する数値。NumericDisplay の無限スケール表記に従う
 * size:  'sm' / 'md' / 'lg' — アイコン径と文字サイズが連動
 * align: 'start' (icon left) / 'end' (icon right)
 * delta: 増減プレフィックス。'+' / '-' を表示
 * subtle: true で控えめ配色（dim）
 * showLabel: 通貨名を併記（例 "ボルト × 1.23A"）
 */
const CURRENCY_META = {
  screw: { color: 'var(--c-screw)', label: 'ネジ', glow: 'none' },
  bolt: { color: 'var(--c-bolt)', label: 'ボルト', glow: 'var(--glow-cyan-sm)' },
  alloy: { color: 'var(--c-alloy)', label: '超合金', glow: 'var(--glow-purple-sm)' },
};

const SIZE_MAP = {
  sm: { icon: 14, num: 'sm', gap: 4, fs: 12 },
  md: { icon: 18, num: 'md', gap: 6, fs: 13 },
  lg: { icon: 28, num: 'lg', gap: 10, fs: 16 },
};

export function CurrencyAmount(props) {
  const {
    currency,
    value,
    size = 'md',
    align = 'start',
    delta,
    subtle = false,
    showLabel = false,
    decimals = 'auto',
  } = props;

  const meta = CURRENCY_META[currency] || CURRENCY_META.bolt;
  const s = SIZE_MAP[size] || SIZE_MAP.md;
  const { Icon, NumericDisplay } = window.TowerLikeGame_28197d;

  const fgColor = subtle ? 'var(--c-text-dim)' : meta.color;
  const glow = subtle ? 'none' : meta.glow;

  const iconEl = React.createElement(
    'span',
    {
      style: {
        color: fgColor,
        display: 'inline-flex',
        filter: subtle
          ? 'none'
          : 'drop-shadow(' +
            glow
              .replace('var(--glow-cyan-sm)', '0 0 4px rgba(78,228,246,0.55)')
              .replace('var(--glow-purple-sm)', '0 0 4px rgba(169,107,255,0.55)') +
            ')',
      },
    },
    React.createElement(Icon, { name: currency, size: s.icon })
  );

  const deltaEl = delta
    ? React.createElement(
        'span',
        {
          style: {
            fontFamily: 'var(--ff-numeric)',
            fontSize: s.fs + 'px',
            fontWeight: 'var(--fw-semibold)',
            color: delta === '+' ? 'var(--c-success)' : 'var(--c-danger)',
            marginRight: 2,
          },
        },
        delta
      )
    : null;

  const numEl = React.createElement(NumericDisplay, {
    value,
    size: s.num,
    decimals,
    accentColor: subtle ? 'dim' : 'text',
    style: { color: subtle ? 'var(--c-text-dim)' : 'var(--c-text)' },
  });

  const labelEl = showLabel
    ? React.createElement(
        'span',
        {
          style: {
            fontFamily: 'var(--ff-body)',
            fontSize: Math.max(10, s.fs - 2) + 'px',
            color: 'var(--c-text-dim)',
            marginRight: 4,
          },
        },
        meta.label
      )
    : null;

  const children =
    align === 'end' ? [deltaEl, numEl, labelEl, iconEl] : [iconEl, labelEl, deltaEl, numEl];

  return React.createElement(
    'span',
    {
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: s.gap + 'px',
        fontFamily: 'var(--ff-numeric)',
        whiteSpace: 'nowrap',
      },
      'data-currency': currency,
    },
    ...children.filter(Boolean)
  );
}
