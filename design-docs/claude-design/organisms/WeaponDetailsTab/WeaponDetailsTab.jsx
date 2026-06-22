/**
 * WeaponDetailsTab — 武器庫の詳細閲覧 Organism
 *
 * 4 武器を縦並びの wide WeaponPreview として表示。
 * 情報量が少ないためタブで分けず、スクロールで全武器を見る形に。
 *
 * - weapons: [{ kind, name, description, stats }]
 */
export function WeaponDetailsTab(props) {
  const { weapons = [] } = props;
  const { WeaponPreview } = window.TowerLikeGame_28197d;

  return React.createElement(
    'div',
    {
      role: 'tabpanel',
      'aria-label': '武器詳細',
      style: { display: 'grid', gap: 10 },
    },
    weapons.map((w) =>
      React.createElement(WeaponPreview, {
        key: w.kind,
        weapon: w.kind,
        name: w.name,
        description: w.description,
        stats: w.stats,
        layout: 'wide',
      })
    )
  );
}
