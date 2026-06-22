/**
 * Sheet — ボトムシート（または上端固定パネル）の素地 Atom
 *
 * 視覚的にはカード相当だが、画面端に固定するためのラウンドコーナーパターンが既定。
 *
 * - edge: 'bottom' (default) / 'top' / 'side' / 'all'  どの辺が画面端か
 * - withHandle: 上端に BottomSheetHandle を表示 (bottom edge 時)
 * - padding: 'sm' / 'md' / 'lg'
 * - maxHeight: 高さ上限 (CSS 値)
 *
 * 開閉アニメは BottomSheetSlideFx で包む。
 */
const PADDING_MAP = {
  none: 0,
  sm: 12,
  md: 16,
  lg: 20,
};

const RADIUS_BY_EDGE = {
  bottom: 'var(--r-l) var(--r-l) 0 0',
  top: '0 0 var(--r-l) var(--r-l)',
  side: 'var(--r-l) 0 0 var(--r-l)',
  all: 'var(--r-l)',
};

export function Sheet(props) {
  const {
    edge = 'bottom',
    withHandle = false,
    padding = 'md',
    maxHeight,
    children,
    style: styleOverride,
    onHandlePointerDown,
    handleDragging = false,
    ...rest
  } = props;

  const { BottomSheetHandle } = window.TowerLikeGame_28197d;

  const p = PADDING_MAP[padding] != null ? PADDING_MAP[padding] : PADDING_MAP.md;

  const style = {
    background: 'var(--c-bg-elev)',
    border: '1px solid var(--c-border)',
    borderRadius: RADIUS_BY_EDGE[edge] || RADIUS_BY_EDGE.bottom,
    boxShadow: 'var(--sh-high)',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    maxHeight: maxHeight || 'none',
    ...styleOverride,
  };

  const bodyStyle = {
    padding: withHandle && edge === 'bottom' ? `0 ${p}px ${p}px` : p + 'px',
    overflow: 'auto',
    minHeight: 0,
  };

  return React.createElement(
    'div',
    { style, 'data-sheet-edge': edge, role: 'dialog', ...rest },
    withHandle &&
      edge === 'bottom' &&
      React.createElement(BottomSheetHandle, {
        dragging: handleDragging,
        onPointerDown: onHandlePointerDown,
      }),
    React.createElement('div', { style: bodyStyle }, children)
  );
}
