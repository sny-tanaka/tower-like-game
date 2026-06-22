/**
 * Card — 汎用カードコンテナ Atom
 *
 * variant:
 *   default   bg-elev + border-faint （標準）
 *   elevated  bg-elev + sh-mid + border-faint
 *   sunken    bg-base （凹み）
 *   accent    bg-elev + primary border + cyan-inset glow
 *   secondary bg-elev + secondary border + purple-inset glow
 *   danger    bg-elev + danger border
 *   ghost     transparent + border-faint
 *
 * padding: 'none' / 'sm' (8) / 'md' (12) / 'lg' (16) / 'xl' (20)
 * radius:  'sm' / 'md' (default) / 'l'
 * interactive: hover で border ハイライト + 軽い持ち上げ
 *
 * as: タグ上書き (default 'div')
 */
const VARIANT_STYLE = {
  default: {
    background: 'var(--c-bg-elev)',
    border: '1px solid var(--c-border-faint)',
    boxShadow: 'none',
  },
  elevated: {
    background: 'var(--c-bg-elev)',
    border: '1px solid var(--c-border-faint)',
    boxShadow: 'var(--sh-mid)',
  },
  sunken: {
    background: 'var(--c-bg-base)',
    border: '1px solid var(--c-border-faint)',
    boxShadow: 'none',
  },
  accent: {
    background: 'var(--c-bg-elev)',
    border: '1px solid var(--c-primary)',
    boxShadow: 'var(--glow-cyan-inset)',
  },
  secondary: {
    background: 'var(--c-bg-elev)',
    border: '1px solid var(--c-secondary)',
    boxShadow: 'var(--glow-purple-inset)',
  },
  danger: {
    background: 'var(--c-bg-elev)',
    border: '1px solid var(--c-danger)',
    boxShadow: '0 0 12px rgba(255,77,109,0.18) inset',
  },
  ghost: {
    background: 'transparent',
    border: '1px solid var(--c-border-faint)',
    boxShadow: 'none',
  },
};

const PADDING_MAP = {
  none: 0,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
};

const RADIUS_MAP = {
  sm: 'var(--r-s)',
  md: 'var(--r-m)',
  l: 'var(--r-l)',
};

export function Card(props) {
  const {
    variant = 'default',
    padding = 'md',
    radius = 'md',
    interactive = false,
    as: Tag = 'div',
    children,
    style: styleOverride,
    onClick,
    ...rest
  } = props;

  const v = VARIANT_STYLE[variant] || VARIANT_STYLE.default;
  const p = PADDING_MAP[padding] != null ? PADDING_MAP[padding] : PADDING_MAP.md;
  const r = RADIUS_MAP[radius] || RADIUS_MAP.md;

  const style = {
    ...v,
    padding: p + 'px',
    borderRadius: r,
    boxSizing: 'border-box',
    cursor: interactive || onClick ? 'pointer' : 'default',
    transition: interactive
      ? 'border var(--mo-fast) var(--ease-out), box-shadow var(--mo-fast) var(--ease-out), transform var(--mo-fast) var(--ease-out)'
      : 'none',
    ...styleOverride,
  };

  return React.createElement(
    Tag,
    {
      style,
      onClick,
      'data-card-variant': variant,
      ...rest,
    },
    children
  );
}
