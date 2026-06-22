/**
 * IconButton — アイコンのみのタップターゲット Atom
 *
 * Button と異なり label を持たず、aria-label と icon (Icon name) を必須にする。
 *
 * variant: 'primary' / 'secondary' / 'ghost' / 'danger' (Button と同じ)
 * shape:   'square' (角丸正方形) / 'round' (円)
 * size:    sm (32) / md (40) / lg (48) — Button と一致
 * iconSize: アイコン径 (default size に応じて自動)
 * active:   選択状態 (例 武器スロット選択中の表示)
 */
const SIZE_MAP = {
  sm: { box: 32, icon: 16 },
  md: { box: 40, icon: 20 },
  lg: { box: 48, icon: 24 },
};

const VARIANT_STYLE = {
  primary: {
    background: 'linear-gradient(180deg, var(--c-primary) 0%, var(--c-primary-deep) 100%)',
    color: 'var(--c-bg-deep)',
    border: '1px solid var(--c-primary-hi)',
    boxShadow: 'var(--glow-cyan-md)',
  },
  secondary: {
    background: 'linear-gradient(180deg, var(--c-secondary) 0%, var(--c-secondary-deep) 100%)',
    color: 'var(--c-text)',
    border: '1px solid var(--c-secondary-hi)',
    boxShadow: 'var(--glow-purple-md)',
  },
  danger: {
    background: 'linear-gradient(180deg, var(--c-danger) 0%, var(--c-danger-deep) 100%)',
    color: 'var(--c-text)',
    border: '1px solid var(--c-danger)',
    boxShadow: 'var(--glow-danger-md)',
  },
  ghost: {
    background: 'transparent',
    color: 'var(--c-text-mid)',
    border: '1px solid var(--c-border)',
    boxShadow: 'none',
  },
};

export function IconButton(props) {
  const {
    icon,
    label, // aria-label。必須 (a11y)
    variant = 'ghost',
    shape = 'square',
    size = 'md',
    iconSize: iconSizeOverride,
    active = false,
    disabled = false,
    onClick,
    ...rest
  } = props;

  const s = SIZE_MAP[size] || SIZE_MAP.md;
  const iconPx = iconSizeOverride != null ? iconSizeOverride : s.icon;
  const v = VARIANT_STYLE[variant] || VARIANT_STYLE.ghost;
  const { Icon } = window.TowerLikeGame_28197d;

  const activeOverride = active
    ? {
        background: 'var(--c-primary-bg)',
        color: 'var(--c-primary)',
        border: '1px solid var(--c-primary)',
        boxShadow: 'var(--glow-cyan-sm)',
      }
    : {};

  const disabledOverride = disabled
    ? { filter: 'grayscale(0.6) brightness(0.55)', boxShadow: 'none', cursor: 'not-allowed' }
    : {};

  const style = {
    width: s.box + 'px',
    height: s.box + 'px',
    padding: 0,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: shape === 'round' ? '50%' : 'var(--r-s)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'transform var(--mo-fast) var(--ease-out), filter var(--mo-fast) var(--ease-out)',
    userSelect: 'none',
    ...v,
    ...activeOverride,
    ...disabledOverride,
  };

  return React.createElement(
    'button',
    {
      type: 'button',
      'aria-label': label,
      'aria-pressed': active || undefined,
      style,
      disabled,
      onClick: disabled ? undefined : onClick,
      'data-variant': variant,
      'data-shape': shape,
      'data-size': size,
      ...rest,
    },
    typeof icon === 'string' ? React.createElement(Icon, { name: icon, size: iconPx }) : icon
  );
}
