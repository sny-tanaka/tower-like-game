/**
 * Overlay — 全画面ディムバックドロップ Atom
 *
 * 背景タップで onClose 発火（dismissible=true のとき）。
 * 中身は中央配置（align='center'）か上端配置（align='top'）。
 *
 * - dimLevel: 'soft' (0.4) / 'normal' (0.6) / 'heavy' (0.8)
 * - blur: 0..8 (背景ぼかし px)
 * - dismissible: true で背景タップで onClose
 * - align: 'center' / 'top' / 'bottom'
 * - zIndex: token 名 ('dialog' / 'overlay' / 'sheet') か直接値
 * - children: 中央コンテンツ
 */
const DIM_MAP = {
  soft: 'rgba(2,4,10,0.45)',
  normal: 'rgba(2,4,10,0.65)',
  heavy: 'rgba(2,4,10,0.80)',
};

const Z_MAP = {
  sheet: 'var(--z-sheet)',
  dialog: 'var(--z-dialog)',
  overlay: 'var(--z-overlay)',
  toast: 'var(--z-toast)',
};

export function Overlay(props) {
  const {
    dimLevel = 'normal',
    blur = 0,
    dismissible = true,
    align = 'center',
    zIndex = 'overlay',
    onClose,
    children,
    fullscreen = true,
    style: styleOverride,
  } = props;

  const z = Z_MAP[zIndex] != null ? Z_MAP[zIndex] : zIndex;

  const alignMap = {
    center: { alignItems: 'center', justifyContent: 'center' },
    top: { alignItems: 'flex-start', justifyContent: 'center', paddingTop: 80 },
    bottom: { alignItems: 'flex-end', justifyContent: 'center', paddingBottom: 40 },
  };

  const onBackdropClick = (e) => {
    if (!dismissible) return;
    if (e.target === e.currentTarget) {
      onClose && onClose();
    }
  };

  const style = {
    position: fullscreen ? 'fixed' : 'absolute',
    inset: 0,
    background: DIM_MAP[dimLevel] || DIM_MAP.normal,
    backdropFilter: blur > 0 ? `blur(${blur}px)` : 'none',
    WebkitBackdropFilter: blur > 0 ? `blur(${blur}px)` : 'none',
    zIndex: z,
    display: 'flex',
    padding: 16,
    boxSizing: 'border-box',
    ...alignMap[align],
    ...styleOverride,
  };

  return React.createElement(
    'div',
    {
      style,
      role: 'presentation',
      onClick: onBackdropClick,
      'data-overlay-align': align,
    },
    children
  );
}
