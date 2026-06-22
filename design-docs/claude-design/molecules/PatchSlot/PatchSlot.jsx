/**
 * PatchSlot — 装着スロット 1 個 (PatchCard を入れる枠 or 空表示)
 *
 * 状態:
 *   filled  patch オブジェクト指定で PatchCard を内包
 *   empty   "+" 表示で装着待ち
 *   locked  スロット未解放 (マシン強化「パッチスロット数」依存)
 *
 * props:
 *   - patch: { patchId, name, iconName, tier, trigger, effect, count } | null
 *   - locked: スロット非開放
 *   - slotIndex: 表示用 1-base 番号 (空状態のラベル "Slot 3" 等)
 *   - size: 'sm' / 'md' / 'lg'  PatchCard と同じ
 *   - onClick: 装着 (empty) / 装着詳細 (filled)
 */
export function PatchSlot(props) {
  const { patch = null, locked = false, slotIndex, size = 'md', onClick } = props;

  const { Icon, Text, PatchCard } = window.TowerLikeGame_28197d;

  const sizeMap = {
    sm: { w: 130, h: 178 },
    md: { w: 160, h: 198 },
    lg: { w: 190, h: 220 },
  };
  const s = sizeMap[size] || sizeMap.md;

  // ===== filled =====
  if (patch) {
    return React.createElement(PatchCard, { ...patch, size, onClick });
  }

  const emptyStyle = {
    width: s.w,
    height: s.h,
    background: locked ? 'var(--c-bg-base)' : 'var(--c-bg-elev)',
    border: '1.5px dashed ' + (locked ? 'var(--c-border-faint)' : 'var(--c-border)'),
    borderRadius: 'var(--r-m)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    color: locked ? 'var(--c-text-disabled)' : 'var(--c-text-dim)',
    cursor: locked ? 'not-allowed' : onClick ? 'pointer' : 'default',
    opacity: locked ? 0.6 : 0.85,
    transition:
      'opacity var(--mo-fast) var(--ease-out), border-color var(--mo-fast) var(--ease-out)',
    boxSizing: 'border-box',
    userSelect: 'none',
  };

  return React.createElement(
    'div',
    {
      style: emptyStyle,
      role: 'button',
      'aria-label': locked
        ? 'ロック中のスロット'
        : '空きスロット' + (slotIndex != null ? ' #' + slotIndex : ''),
      'data-empty': !locked,
      'data-locked': locked,
      onClick: locked ? undefined : onClick,
    },
    React.createElement(
      'span',
      { style: { fontSize: 0 } },
      React.createElement(Icon, { name: locked ? 'shield' : 'plus', size: 28 })
    ),
    React.createElement(
      Text,
      {
        variant: 'label',
        color: locked ? 'disabled' : 'dim',
        align: 'center',
      },
      locked ? 'LOCKED' : slotIndex != null ? 'SLOT ' + slotIndex : 'EMPTY'
    )
  );
}
