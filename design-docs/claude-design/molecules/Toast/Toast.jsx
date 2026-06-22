/**
 * Toast — 一時通知 1 件 (画面端からスライドイン、ToastSlideFx が動きを担当)
 *
 * - kind: 'info' / 'success' / 'warning' / 'error'
 * - message: 本文
 * - iconName: 任意上書き (省略時は kind に応じた自動選択)
 * - action: { label, onClick }  オプションのアクション（例 "UNDO"）
 *
 * 自己消滅タイマーは持たない（親で setTimeout → unmount）
 */
const KIND_PRESET = {
  info: {
    icon: 'info',
    color: 'var(--c-primary)',
    bg: 'rgba(78,228,246,0.10)',
    border: 'var(--c-primary)',
  },
  success: {
    icon: 'check',
    color: 'var(--c-success)',
    bg: 'rgba(70,226,160,0.10)',
    border: 'var(--c-success)',
  },
  warning: {
    icon: 'flame',
    color: 'var(--c-warning)',
    bg: 'rgba(246,185,74,0.10)',
    border: 'var(--c-warning)',
  },
  error: {
    icon: 'skull',
    color: 'var(--c-danger)',
    bg: 'rgba(255,77,109,0.12)',
    border: 'var(--c-danger)',
  },
};

export function Toast(props) {
  const { kind = 'info', message, iconName, action } = props;

  const { Icon, Text } = window.TowerLikeGame_28197d;

  const preset = KIND_PRESET[kind] || KIND_PRESET.info;
  const icon = iconName || preset.icon;

  const wrapStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 10,
    padding: '10px 14px 10px 12px',
    background: 'var(--c-bg-elev)',
    border: `1px solid ${preset.border}`,
    borderRadius: 'var(--r-m)',
    boxShadow: 'var(--sh-mid)',
    maxWidth: 360,
    minWidth: 0,
  };

  return React.createElement(
    'div',
    { style: wrapStyle, role: 'status', 'aria-live': 'polite', 'data-kind': kind },
    React.createElement(
      'span',
      {
        style: {
          width: 28,
          height: 28,
          borderRadius: '50%',
          background: preset.bg,
          color: preset.color,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          flex: 'none',
          filter: `drop-shadow(0 0 4px ${preset.color}88)`,
        },
      },
      React.createElement(Icon, { name: icon, size: 16 })
    ),
    React.createElement(
      Text,
      {
        variant: 'body',
        color: 'text',
        style: { flex: 1, fontSize: 13, lineHeight: 1.4, margin: 0 },
      },
      message
    ),
    action &&
      React.createElement(
        'button',
        {
          type: 'button',
          onClick: action.onClick,
          style: {
            background: 'transparent',
            border: 0,
            color: preset.color,
            fontFamily: 'var(--ff-display)',
            fontSize: 11,
            fontWeight: 'var(--fw-semibold)',
            letterSpacing: 'var(--ls-loose)',
            textTransform: 'uppercase',
            cursor: 'pointer',
            padding: '4px 8px',
            borderRadius: 'var(--r-xs)',
            flex: 'none',
            whiteSpace: 'nowrap',
          },
        },
        action.label
      )
  );
}
