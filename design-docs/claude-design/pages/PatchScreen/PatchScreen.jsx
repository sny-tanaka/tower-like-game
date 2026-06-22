/**
 * PatchScreen — パッチ庫画面 Page
 * AppShell + PageHeader + TabBar (装着 / 所持 / 合成)。
 */
export function PatchScreen(props) {
  const {
    equipped = [],
    slotCount = 8,
    lockedCount = 0,
    inventory = [],
    mergeable = [],
    mergeLimit,
    onMergeLimitChange,
    onMergeAll,
    onBack,
    onSelectInventory,
    selectedInventoryId,
    onEquipSlotClick,
    activeNav = 'patch',
    onNavChange,
  } = props;

  const {
    AppShell,
    PageHeader,
    TabBar,
    PatchEquipTab,
    PatchInventoryTab,
    PatchMergeTab,
    BottomNav,
  } = window.TowerLikeGame_28197d;

  const [tab, setTab] = React.useState('equipped');

  return React.createElement(
    AppShell,
    {
      header: React.createElement(
        React.Fragment,
        null,
        React.createElement(PageHeader, {
          title: 'パッチ庫',
          onBack,
          subtitle:
            '装着 ' + equipped.length + ' / ' + slotCount + '  ·  在庫 ' + inventory.length + ' 種',
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
              { key: 'equipped', label: '装着', badge: equipped.length + '/' + slotCount },
              { key: 'inventory', label: '所持', badge: inventory.length },
              { key: 'merge', label: '合成', badge: mergeable.length || undefined },
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

      tab === 'equipped' &&
        React.createElement(PatchEquipTab, {
          patches: equipped,
          slotCount,
          lockedCount,
          onSlotClick: onEquipSlotClick,
        }),
      tab === 'inventory' &&
        React.createElement(PatchInventoryTab, {
          patches: inventory,
          selectedId: selectedInventoryId,
          onSelect: onSelectInventory,
        }),
      tab === 'merge' &&
        React.createElement(PatchMergeTab, {
          mergeable,
          maxTierLimit: mergeLimit,
          onLimitChange: onMergeLimitChange,
          onMergeAll,
        })
    )
  );
}
