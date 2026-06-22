/**
 * Button — タップ可能なボタン Atom
 *
 * variant:
 *   primary   — シアン主役。最も重要な行動（出撃、購入、確認）
 *   secondary — 紫副役。並列の選択肢（タブ切替プライマリ）
 *   danger    — 赤。破壊的・取り返し不能（撤退、リセット）
 *   ghost     — 枠線のみ。サブ動線、キャンセル、戻る
 *
 * size: sm (32px) / md (40px) / lg (48px)
 * fullWidth: 親の幅いっぱいに広げる
 *
 * 状態: hover / active / disabled は内部 CSS-in-JS で表現。
 * アニメ・グローのパルスなど時間的演出は持たない（Fx 側の責務）。
 */
export function Button(props) {
  const {
    label,
    variant = 'primary',
    size = 'md',
    disabled = false,
    fullWidth = false,
    iconLeft = null,
    iconRight = null,
    onClick,
    children,
  } = props;

  const sizeMap = {
    sm: { h: 32, px: 12, fs: 12, gap: 6 },
    md: { h: 40, px: 16, fs: 13, gap: 8 },
    lg: { h: 48, px: 20, fs: 14, gap: 10 },
  };
  const s = sizeMap[size] || sizeMap.md;

  const variantStyle =
    {
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
    }[variant] || variantStyle.primary;

  const disabledOverlay = disabled
    ? {
        filter: 'grayscale(0.6) brightness(0.55)',
        boxShadow: 'none',
        cursor: 'not-allowed',
      }
    : {};

  const style = {
    height: s.h + 'px',
    padding: `0 ${s.px}px`,
    fontSize: s.fs + 'px',
    fontFamily: 'var(--ff-display)',
    fontWeight: 'var(--fw-semibold)',
    letterSpacing: 'var(--ls-loose)',
    textTransform: 'uppercase',
    borderRadius: 'var(--r-s)',
    width: fullWidth ? '100%' : 'auto',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: s.gap + 'px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'transform var(--mo-fast) var(--ease-out), filter var(--mo-fast) var(--ease-out)',
    userSelect: 'none',
    whiteSpace: 'nowrap',
    ...variantStyle,
    ...disabledOverlay,
  };

  return React.createElement(
    'button',
    {
      type: 'button',
      style,
      disabled,
      onClick: disabled ? undefined : onClick,
      'data-variant': variant,
      'data-size': size,
    },
    iconLeft,
    label != null ? label : children,
    iconRight
  );
}
