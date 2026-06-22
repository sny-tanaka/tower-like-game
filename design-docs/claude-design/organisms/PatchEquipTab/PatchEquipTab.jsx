/**
 * PatchEquipTab — パッチ装着スロット一覧 Organism (パッチ庫画面)
 *
 * - patches: 装着中のパッチ
 * - slotCount: マシン強化「パッチスロット数」依存
 * - lockedCount: ロック中スロット
 * - onSlotClick(slotIndex): 装着/外しのトリガー
 */
export function PatchEquipTab(props) {
  const { patches = [], slotCount = 8, lockedCount = 0, onSlotClick } = props;
  const { PatchSlot, Text } = window.TowerLikeGame_28197d;

  const total = slotCount + lockedCount;

  return React.createElement(
    'div',
    { role: 'tabpanel', 'aria-label': 'パッチ装着' },
    React.createElement(
      Text,
      {
        variant: 'caption',
        color: 'mid',
        style: { fontSize: 12, marginBottom: 10, display: 'block' },
      },
      '装着 ' +
        patches.length +
        ' / ' +
        slotCount +
        ' (' +
        total +
        ' スロット中 ' +
        lockedCount +
        ' ロック)'
    ),
    React.createElement(
      'div',
      {
        style: {
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 10,
          justifyItems: 'center',
        },
      },
      Array.from({ length: total }, (_, i) => {
        const isLocked = i >= slotCount;
        const patch = i < patches.length ? patches[i] : null;
        return React.createElement(PatchSlot, {
          key: i,
          patch,
          locked: isLocked,
          slotIndex: i + 1,
          onClick: () => onSlotClick && onSlotClick(i),
        });
      })
    )
  );
}
