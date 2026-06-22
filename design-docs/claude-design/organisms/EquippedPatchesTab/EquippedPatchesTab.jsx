/**
 * EquippedPatchesTab — 装着中パッチ確認タブ Organism (出撃準備画面)
 *
 * 出撃前にどのパッチが装着されているか「読み取り専用」で確認するタブ。
 * 編集はパッチ庫画面 (PatchEquipTab) で行う。
 *
 * - patches: 装着中の patches 配列 [{patchId, name, iconName, tier, trigger, effect, count}]
 * - slotCount: マシン強化「パッチスロット数」依存のスロット総数
 * - lockedCount: ロック中のスロット数 (slotCount との合計が全スロット数)
 * - onOpenPatchScreen: パッチ庫画面に遷移
 */
export function EquippedPatchesTab(props) {
  const { patches = [], slotCount = 8, lockedCount = 0, onOpenPatchScreen } = props;

  const { PatchSlot, Text, Button, Icon } = window.TowerLikeGame_28197d;

  // slot 配列を生成: patches を先頭から、残りは空き / locked
  const slots = [];
  const equippedCount = patches.length;
  for (let i = 0; i < slotCount; i++) {
    if (i < equippedCount) {
      slots.push({ kind: 'filled', patch: patches[i], idx: i + 1 });
    } else {
      slots.push({ kind: 'empty', idx: i + 1 });
    }
  }
  for (let i = 0; i < lockedCount; i++) {
    slots.push({ kind: 'locked', idx: slotCount + i + 1 });
  }

  return React.createElement(
    'div',
    { role: 'tabpanel', 'aria-label': '装着パッチ' },

    // header
    React.createElement(
      'div',
      { style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 } },
      React.createElement(
        Text,
        { variant: 'caption', color: 'mid', style: { flex: 1, fontSize: 12 } },
        '装着 ' +
          equippedCount +
          ' / ' +
          slotCount +
          (lockedCount > 0 ? ' (+' + lockedCount + ' ロック)' : '')
      ),
      onOpenPatchScreen &&
        React.createElement(Button, {
          label: '装備変更',
          variant: 'ghost',
          size: 'sm',
          iconRight: React.createElement(Icon, { name: 'chevron-right', size: 14 }),
          onClick: onOpenPatchScreen,
        })
    ),

    // grid
    equippedCount === 0
      ? React.createElement(
          'div',
          {
            style: {
              padding: 24,
              background: 'var(--c-bg-elev)',
              border: '1px dashed var(--c-border)',
              borderRadius: 'var(--r-m)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 8,
            },
          },
          React.createElement(
            'span',
            { style: { color: 'var(--c-text-dim)' } },
            React.createElement(Icon, { name: 'plus', size: 24 })
          ),
          React.createElement(
            Text,
            { variant: 'body', color: 'dim', align: 'center', style: { fontSize: 12 } },
            'パッチが装着されていません'
          ),
          onOpenPatchScreen &&
            React.createElement(Button, {
              label: 'パッチ庫を開く',
              variant: 'secondary',
              size: 'sm',
              onClick: onOpenPatchScreen,
            })
        )
      : React.createElement(
          'div',
          {
            style: {
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 10,
              justifyItems: 'center',
            },
          },
          slots.map((s, i) =>
            React.createElement(PatchSlot, {
              key: i,
              patch: s.kind === 'filled' ? s.patch : null,
              locked: s.kind === 'locked',
              slotIndex: s.idx,
              // 読み取り専用: onClick は装備変更画面遷移のみ
              onClick: onOpenPatchScreen,
            })
          )
        )
  );
}
