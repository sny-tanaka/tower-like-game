/**
 * PreparationScreen — 出撃準備画面 Page
 *
 * 構成:
 *   header: PageHeader + TabBar(Tier/武器/パッチ) — 固定
 *   main:   各タブの内容 — スクロール
 *   footer: LaunchButton (出撃) → BottomNav (主要画面遷移) の 2 段固定
 */
export function PreparationScreen(props) {
  const {
    currencies = { screw: 0, bolt: 0, alloy: 0 },
    maxTier = 1,
    selectedTier,
    onSelectTier,
    weapons = [],
    selectedWeapon,
    onSelectWeapon,
    patches = [],
    slotCount = 8,
    lockedCount = 0,
    onLaunch,
    activeNav = 'prep',
    onNavChange,
  } = props;

  const {
    AppShell,
    PageHeader,
    IconButton,
    TabBar,
    TierSelectTab,
    InitialWeaponTab,
    EquippedPatchesTab,
    LaunchButton,
    BottomNav,
  } = window.TowerLikeGame_28197d;

  const [tab, setTab] = React.useState('tier');

  const NAV_ITEMS = [
    { key: 'prep', label: '準備', iconName: 'tower' },
    { key: 'machine', label: 'マシン', iconName: 'heart' },
    { key: 'armory', label: '武器庫', iconName: 'laser' },
    { key: 'patch', label: 'パッチ', iconName: 'spark' },
    { key: 'setting', label: '設定', iconName: 'settings' },
  ];

  return React.createElement(
    AppShell,
    {
      header: React.createElement(
        React.Fragment,
        null,
        React.createElement(PageHeader, {
          title: '出撃準備',
          currencies: [
            { kind: 'screw', value: currencies.screw },
            { kind: 'bolt', value: currencies.bolt },
            { kind: 'alloy', value: currencies.alloy },
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
              { key: 'tier', label: 'Tier' },
              { key: 'weapon', label: '武器' },
              { key: 'patch', label: 'パッチ' },
            ],
            value: tab,
            onChange: setTab,
            fullWidth: true,
          })
        )
      ),
      footer: React.createElement(
        React.Fragment,
        null,
        React.createElement(LaunchButton, {
          tier: selectedTier,
          weaponKind: selectedWeapon,
          patchCount: patches.length,
          onLaunch,
          sticky: false,
        }),
        React.createElement(BottomNav, {
          items: NAV_ITEMS,
          active: activeNav,
          onChange: onNavChange,
        })
      ),
    },

    React.createElement(
      'div',
      { style: { padding: '12px 14px 16px', display: 'grid', gap: 14 } },
      tab === 'tier' &&
        React.createElement(TierSelectTab, { maxTier, selectedTier, onSelect: onSelectTier }),
      tab === 'weapon' &&
        React.createElement(InitialWeaponTab, {
          weapons,
          selectedKind: selectedWeapon,
          onSelect: onSelectWeapon,
        }),
      tab === 'patch' &&
        React.createElement(EquippedPatchesTab, {
          patches,
          slotCount,
          lockedCount,
          onOpenPatchScreen: () => onNavChange && onNavChange('patch'),
        })
    )
  );
}
