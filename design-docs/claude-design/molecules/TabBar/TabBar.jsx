/**
 * TabBar — Tab × N をまとめたタブストリップ
 *
 * 状態は親側で持つ (value を渡し、onChange でハンドリング)。
 * variant: 'underline' (default) / 'pill'
 * fullWidth: タブを等幅に並べる
 * align: 'start' / 'center' / 'stretch' (= fullWidth と同義)
 *
 * tabs: [{ key, label, iconName?, badge?, disabled? }]
 */
export function TabBar(props) {
  const {
    tabs,
    value,
    onChange,
    variant = 'underline',
    size = 'md',
    fullWidth = false,
    align = 'start',
  } = props;

  const { Tab, Icon } = window.TowerLikeGame_28197d;

  const isStretch = fullWidth || align === 'stretch';

  const wrapStyle =
    variant === 'pill'
      ? {
          display: 'inline-flex',
          gap: 6,
          padding: 5,
          background: 'var(--c-bg-base)',
          border: '1px solid var(--c-border-faint)',
          borderRadius: 'var(--r-pill)',
          justifyContent: align === 'center' ? 'center' : 'flex-start',
        }
      : {
          display: 'flex',
          background: 'var(--c-bg-base)',
          border: '1px solid var(--c-border-faint)',
          borderRadius: 'var(--r-m)',
          overflow: 'hidden',
          justifyContent: align === 'center' ? 'center' : 'flex-start',
        };

  return React.createElement(
    'div',
    { style: wrapStyle, role: 'tablist' },
    tabs.map((t) =>
      React.createElement(
        'div',
        {
          key: t.key,
          style: {
            flex: isStretch ? '1 1 0' : '0 0 auto',
            display: 'flex',
            justifyContent: 'center',
            minWidth: 0,
          },
        },
        React.createElement(Tab, {
          label: t.label,
          active: value === t.key,
          disabled: t.disabled,
          badge: t.badge,
          variant,
          size,
          onClick: t.disabled ? undefined : () => onChange && onChange(t.key),
          iconLeft: t.iconName ? React.createElement(Icon, { name: t.iconName, size: 14 }) : null,
        })
      )
    )
  );
}
