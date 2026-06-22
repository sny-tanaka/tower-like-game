/**
 * ArmoryScreen — 武器庫画面 Page
 * AppShell + PageHeader + TabBar (詳細 / 強化) + WeaponDetailsTab or WeaponLevelUpgradeTab。
 */
export function ArmoryScreen(props) {
  const {
    bolt = 0,
    alloy = 0,
    weapons = [],
    weaponLevel,
    onBack,
    onBuyWeaponLevel,
    activeNav = 'armory',
    onNavChange,
  } = props;

  const { AppShell, PageHeader, TabBar, WeaponDetailsTab, WeaponLevelUpgradeTab, BottomNav } =
    window.TowerLikeGame_28197d;

  const [tab, setTab] = React.useState('details');

  return React.createElement(
    AppShell,
    {
      header: React.createElement(
        React.Fragment,
        null,
        React.createElement(PageHeader, {
          title: '武器庫',
          onBack,
          currencies: [
            { kind: 'bolt', value: bolt },
            { kind: 'alloy', value: alloy },
          ],
        }),
        React.createElement(
          'div',
          {
            style: {
              padding: '10px 14px 4px',
              background: 'rgba(10,15,28,0.85)',
              backdropFilter: 'blur(8px)',
            },
          },
          React.createElement(TabBar, {
            tabs: [
              { key: 'details', label: '詳細' },
              { key: 'upgrade', label: '強化' },
            ],
            value: tab,
            onChange: setTab,
            fullWidth: true,
          })
        )
      ),
      footer: React.createElement(BottomNav, {
        items: [
          { key: 'prep', label: '準備', iconName: 'tower' },
          { key: 'machine', label: 'マシン', iconName: 'heart' },
          { key: 'armory', label: '武器庫', iconName: 'laser' },
          { key: 'patch', label: 'パッチ', iconName: 'spark' },
          { key: 'setting', label: '設定', iconName: 'settings' },
        ],
        active: activeNav,
        onChange: onNavChange,
      }),
    },
    React.createElement(
      'div',
      { style: { padding: '12px 14px 20px', display: 'grid', gap: 12 } },

      tab === 'details' && React.createElement(WeaponDetailsTab, { weapons }),
      tab === 'upgrade' &&
        React.createElement(WeaponLevelUpgradeTab, {
          currentLevel: weaponLevel?.level,
          alloy,
          before: weaponLevel?.before,
          after: weaponLevel?.after,
          statsImpact: weaponLevel?.statsImpact,
          options: weaponLevel?.options,
          maxed: weaponLevel?.maxed,
          onBuy: onBuyWeaponLevel,
        })
    )
  );
}
