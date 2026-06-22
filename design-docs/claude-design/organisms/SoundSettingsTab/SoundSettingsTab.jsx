/**
 * SoundSettingsTab — 設定画面 サウンドタブ Organism
 *
 * - bgm / se: 0..100
 * - mute: ミュート (全体ミュート、各 Slider を 0 に丸めない)
 * - onBgm / onSe / onToggleMute
 */
export function SoundSettingsTab(props) {
  const { bgm = 80, se = 80, mute = false, onBgm, onSe, onToggleMute } = props;

  const { Card, Text, Toggle, Icon } = window.TowerLikeGame_28197d;

  const sliderRow = (label, iconName, value, onChange) =>
    React.createElement(
      Card,
      { variant: 'sunken', padding: 'md' },
      React.createElement(
        'div',
        { style: { display: 'flex', alignItems: 'center', gap: 10 } },
        React.createElement(
          'span',
          {
            style: {
              color: mute ? 'var(--c-text-disabled)' : 'var(--c-primary)',
              display: 'inline-flex',
            },
          },
          React.createElement(Icon, { name: iconName, size: 16 })
        ),
        React.createElement(
          Text,
          {
            variant: 'body',
            color: mute ? 'disabled' : 'text',
            style: { width: 50, fontSize: 13, fontWeight: 500 },
          },
          label
        ),
        React.createElement('input', {
          type: 'range',
          min: 0,
          max: 100,
          value,
          disabled: mute,
          onChange: (e) => onChange && onChange(Number(e.target.value)),
          style: { flex: 1, accentColor: 'var(--c-primary)', opacity: mute ? 0.4 : 1 },
        }),
        React.createElement(
          Text,
          {
            variant: 'numeric-s',
            color: mute ? 'disabled' : 'mid',
            style: { width: 32, textAlign: 'right' },
          },
          value
        )
      )
    );

  return React.createElement(
    'div',
    { role: 'tabpanel', 'aria-label': 'サウンド設定', style: { display: 'grid', gap: 8 } },
    React.createElement(
      Card,
      { variant: 'sunken', padding: 'md' },
      React.createElement(Toggle, {
        label: 'ミュート',
        description: '全サウンドを一時停止',
        checked: mute,
        onChange: onToggleMute,
        accent: 'primary',
      })
    ),
    sliderRow('BGM', 'play', bgm, onBgm),
    sliderRow('SE', 'spark', se, onSe)
  );
}
