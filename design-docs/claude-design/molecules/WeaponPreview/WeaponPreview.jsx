/**
 * WeaponPreview — 武器 1 種の詳細プレビュー (出撃準備の武器選択 / 武器庫)
 *
 * 構成: Icon (大) + Text(name) + Text(description) + NumericDisplay × 複数 (stats)
 *
 * - weapon: 'laser' | 'cannon' | 'thunder' | 'cutter'
 * - name: 表示名
 * - description: 短い説明文 (1-2 行)
 * - stats: [{ label, value, suffix?, accent? }]   主要ステータス
 * - active: 選択中 (cyan 枠 + glow)
 * - onClick: 選択
 * - layout: 'tall' (デフォルト、垂直配置) / 'wide' (水平、icon 左)
 */
export function WeaponPreview(props) {
  const { weapon, name, description, stats = [], active = false, layout = 'tall', onClick } = props;

  const { Icon, Text, NumericDisplay, Badge } = window.TowerLikeGame_28197d;

  const isWide = layout === 'wide';

  const wrapStyle = {
    display: 'grid',
    gridTemplateColumns: isWide ? 'auto 1fr' : '1fr',
    gap: isWide ? 14 : 10,
    padding: 14,
    background: active ? 'var(--c-surface)' : 'var(--c-bg-elev)',
    border: active ? '1px solid var(--c-primary)' : '1px solid var(--c-border-faint)',
    borderRadius: 'var(--r-m)',
    boxShadow: active ? 'var(--glow-cyan-md)' : 'var(--sh-low)',
    cursor: onClick ? 'pointer' : 'default',
    position: 'relative',
    minWidth: 0,
    boxSizing: 'border-box',
    transition: 'box-shadow var(--mo-fast) var(--ease-out), border var(--mo-fast) var(--ease-out)',
  };

  const iconBoxStyle = {
    width: isWide ? 72 : 88,
    height: isWide ? 72 : 88,
    borderRadius: 'var(--r-m)',
    background: 'linear-gradient(135deg, rgba(78,228,246,0.12), rgba(78,228,246,0.02))',
    border: '1px solid rgba(78,228,246,0.35)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--c-primary)',
    margin: isWide ? '0' : '0 auto 4px',
    filter: 'drop-shadow(0 0 6px rgba(78,228,246,0.45))',
    flex: 'none',
  };

  return React.createElement(
    'div',
    {
      style: wrapStyle,
      role: 'group',
      'aria-label': name,
      'data-weapon': weapon,
      'data-active': active,
      onClick,
    },
    // icon
    React.createElement(
      'div',
      { style: iconBoxStyle },
      React.createElement(Icon, { name: weapon, size: isWide ? 40 : 52 })
    ),

    // main column
    React.createElement(
      'div',
      { style: { display: 'flex', flexDirection: 'column', gap: 8, minWidth: 0 } },

      // header: name + active/locked badge
      React.createElement(
        'div',
        { style: { display: 'flex', alignItems: 'center', gap: 8 } },
        React.createElement(
          Text,
          {
            variant: 'heading-3',
            color: 'text',
            truncate: true,
            style: {
              flex: 1,
              minWidth: 0,
              textAlign: isWide ? 'left' : 'center',
              fontFamily: 'var(--ff-display)',
              fontWeight: 600,
              fontSize: 16,
            },
          },
          name
        ),
        active &&
          React.createElement(Badge, { variant: 'info', text: 'EQUIPPED', size: 'sm', glow: true })
      ),

      // description
      description &&
        React.createElement(
          Text,
          {
            variant: 'caption',
            color: 'mid',
            align: isWide ? 'left' : 'center',
            style: { fontSize: 12, lineHeight: 1.45 },
          },
          description
        ),

      // stats grid
      stats.length > 0 &&
        React.createElement(
          'div',
          {
            style: {
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 6,
              paddingTop: 6,
              borderTop: '1px dashed var(--c-border-faint)',
            },
          },
          stats.map((stat, i) =>
            React.createElement(
              'div',
              {
                key: i,
                style: {
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2,
                  padding: '4px 8px',
                  background: 'var(--c-bg-base)',
                  border: '1px solid var(--c-border-faint)',
                  borderRadius: 'var(--r-xs)',
                  minWidth: 0,
                },
              },
              React.createElement(
                Text,
                { variant: 'label', color: 'dim', style: { fontSize: 9.5, lineHeight: 1 } },
                stat.label
              ),
              React.createElement(NumericDisplay, {
                value: stat.value,
                suffix: stat.suffix || '',
                size: 'sm',
                accentColor: stat.accent || 'text',
                glow: !!stat.accent && stat.accent !== 'text' && stat.accent !== 'dim',
                style: { fontSize: 14, lineHeight: 1.1 },
              })
            )
          )
        )
    )
  );
}
