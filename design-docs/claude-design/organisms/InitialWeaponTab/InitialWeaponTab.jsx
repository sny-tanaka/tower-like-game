/**
 * InitialWeaponTab — 初期武器選択タブ Organism (出撃準備画面)
 *
 * 4 武器 (Laser / Cannon / Thunder / Cutter) を WeaponPreview の tall 配置で表示。
 * いずれか 1 つを選択。
 *
 * - weapons: [{ kind, name, description, stats }]
 * - selectedKind
 * - onSelect(kind)
 *
 * (武器は全解放仕様のため locked 状態は持たない)
 */
export function InitialWeaponTab(props) {
  const { weapons = [], selectedKind, onSelect } = props;

  const { WeaponPreview, Text } = window.TowerLikeGame_28197d;

  return React.createElement(
    'div',
    { role: 'tabpanel', 'aria-label': '初期武器選択' },

    React.createElement(
      'div',
      { style: { marginBottom: 12 } },
      React.createElement(
        Text,
        { variant: 'caption', color: 'mid', style: { fontSize: 12 } },
        'ラン開始時の武器を選択。ラン中は CD 3 秒で切替可能です。'
      )
    ),

    React.createElement(
      'div',
      {
        style: {
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 10,
        },
      },
      weapons.map((w) =>
        React.createElement(WeaponPreview, {
          key: w.kind,
          weapon: w.kind,
          name: w.name,
          description: w.description,
          stats: w.stats,
          active: w.kind === selectedKind,
          layout: 'tall',
          onClick: () => onSelect && onSelect(w.kind),
        })
      )
    )
  );
}
