/**
 * MachineScreen — マシン強化画面 Page
 * AppShell + PageHeader + MachineUpgradeList + BottomNav (footer)
 */
const NAV_ITEMS = [
  { key: 'prep', label: '準備', iconName: 'tower' },
  { key: 'machine', label: 'マシン', iconName: 'heart' },
  { key: 'armory', label: '武器庫', iconName: 'laser' },
  { key: 'patch', label: 'パッチ', iconName: 'spark' },
  { key: 'setting', label: '設定', iconName: 'settings' },
];

export function MachineScreen(props) {
  const { bolt = 0, items = [], onBack, activeNav = 'machine', onNavChange } = props;
  const { AppShell, PageHeader, MachineUpgradeList, BottomNav } = window.TowerLikeGame_28197d;

  return React.createElement(
    AppShell,
    {
      header: React.createElement(PageHeader, {
        title: 'マシン強化',
        onBack,
        currencies: [{ kind: 'bolt', value: bolt }],
      }),
      footer: React.createElement(BottomNav, {
        items: NAV_ITEMS,
        active: activeNav,
        onChange: onNavChange,
      }),
    },
    React.createElement(
      'div',
      { style: { padding: '12px 14px 20px' } },
      React.createElement(MachineUpgradeList, { items })
    )
  );
}
