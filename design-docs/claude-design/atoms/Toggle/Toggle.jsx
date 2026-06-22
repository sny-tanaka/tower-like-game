/**
 * Toggle — ON/OFF スイッチ Atom
 *
 * - checked / onChange
 * - label / description: 任意ラベル付き表示。指定しなければスイッチ単体
 * - size: 'sm' / 'md'
 * - accent: 'primary' / 'secondary' / 'success'
 */
const TONE = {
  primary: { on: 'var(--c-primary)', onHi: 'var(--c-primary-hi)', glow: 'var(--glow-cyan-sm)' },
  secondary: {
    on: 'var(--c-secondary)',
    onHi: 'var(--c-secondary-hi)',
    glow: 'var(--glow-purple-sm)',
  },
  success: { on: 'var(--c-success)', onHi: '#7ff0bd', glow: '0 0 6px rgba(70,226,160,0.55)' },
};

const SIZE = {
  sm: { w: 36, h: 20, dot: 14, dx: 16 },
  md: { w: 48, h: 26, dot: 18, dx: 22 },
};

export function Toggle(props) {
  const {
    checked = false,
    onChange,
    label,
    description,
    size = 'md',
    accent = 'primary',
    disabled = false,
  } = props;

  const { Text } = window.TowerLikeGame_28197d;
  const t = TONE[accent] || TONE.primary;
  const s = SIZE[size] || SIZE.md;

  const sw = React.createElement(
    'button',
    {
      type: 'button',
      role: 'switch',
      'aria-checked': checked,
      disabled,
      onClick: disabled ? undefined : () => onChange && onChange(!checked),
      style: {
        width: s.w,
        height: s.h,
        padding: 2,
        flex: 'none',
        background: checked ? t.on : 'var(--c-bg-base)',
        border: '1px solid ' + (checked ? t.onHi : 'var(--c-border)'),
        borderRadius: 'var(--r-pill)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        display: 'flex',
        alignItems: 'center',
        boxShadow: checked ? t.glow : 'none',
        transition: 'background var(--mo-fast) var(--ease-out)',
        opacity: disabled ? 0.5 : 1,
      },
    },
    React.createElement('span', {
      style: {
        width: s.dot,
        height: s.dot,
        borderRadius: '50%',
        background: checked ? 'var(--c-text)' : 'var(--c-text-dim)',
        transform: checked ? `translateX(${s.dx}px)` : 'translateX(0)',
        transition:
          'transform var(--mo-fast) var(--ease-out), background var(--mo-fast) var(--ease-out)',
      },
    })
  );

  if (label == null && description == null) return sw;

  return React.createElement(
    'label',
    {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.6 : 1,
      },
    },
    React.createElement(
      'div',
      { style: { flex: 1, minWidth: 0 } },
      label &&
        React.createElement(
          Text,
          { variant: 'body', color: 'text', style: { fontSize: 13, fontWeight: 500 } },
          label
        ),
      description &&
        React.createElement(
          Text,
          { variant: 'caption', color: 'dim', style: { fontSize: 11 } },
          description
        )
    ),
    sw
  );
}
