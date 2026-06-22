/**
 * BottomSheetHandle — ボトムシート上端のドラッグハンドル
 *
 * 視覚的な“掴める”アフォーダンス。実際のドラッグは Sheet/Organism が onPointer* で扱う。
 *
 * - dragging: ドラッグ中で色変化
 * - width: 横幅 px (default 40)
 */
export function BottomSheetHandle(props) {
  const { dragging = false, width = 40, onPointerDown } = props;

  return React.createElement(
    'div',
    {
      style: {
        width: '100%',
        padding: '8px 0 6px',
        display: 'flex',
        justifyContent: 'center',
        cursor: 'grab',
        touchAction: 'none',
        userSelect: 'none',
      },
      role: 'separator',
      'aria-label': 'シートをドラッグして開閉',
      onPointerDown,
    },
    React.createElement('div', {
      style: {
        width: width + 'px',
        height: 4,
        background: dragging ? 'var(--c-primary)' : 'var(--c-text-disabled)',
        borderRadius: 'var(--r-pill)',
        boxShadow: dragging ? 'var(--glow-cyan-sm)' : 'none',
        transition:
          'background var(--mo-fast) var(--ease-out), box-shadow var(--mo-fast) var(--ease-out)',
      },
    })
  );
}
