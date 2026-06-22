/**
 * AppShell — 全画面スケルトン Organism
 *
 * 役割:
 *   - safe-area インセット適用 (env(safe-area-inset-*) )
 *   - 全画面背景パターン (ダーク + 微細グリッド + 放射ビネット)
 *   - header / main / footer のスロット
 *   - フル縦画面、最大幅 480 で中央寄せ
 *
 * props:
 *   header?: ReactNode       上部固定エリア (PageHeader 等)
 *   footer?: ReactNode       下部固定エリア (バトル下 HUD 等)
 *   children                 メインコンテンツ (スクロール領域)
 *   variant: 'default' / 'battle'   battle はグリッド密度を上げる
 *   noScroll: メイン部のスクロールを禁止
 *   className / style 上書き可
 */
const GRID_PATTERN = (color, density) => {
  const c = color || 'rgba(78,228,246,0.04)';
  const d = density || 32;
  return (
    `linear-gradient(${c} 1px, transparent 1px) 0 0 / ${d}px ${d}px, ` +
    `linear-gradient(90deg, ${c} 1px, transparent 1px) 0 0 / ${d}px ${d}px`
  );
};

export function AppShell(props) {
  const {
    header,
    footer,
    children,
    variant = 'default',
    noScroll = false,
    style: styleOverride,
  } = props;

  const isBattle = variant === 'battle';

  const wrapStyle = {
    position: 'relative',
    width: '100%',
    height: '100vh',
    maxHeight: '100vh',
    maxWidth: 480,
    margin: '0 auto',
    background: `
      radial-gradient(ellipse at 50% 0%, rgba(78,228,246,0.06), transparent 60%),
      radial-gradient(ellipse at 50% 100%, rgba(169,107,255,0.05), transparent 60%),
      ${GRID_PATTERN(
        isBattle ? 'rgba(78,228,246,0.05)' : 'rgba(78,228,246,0.025)',
        isBattle ? 24 : 40
      )},
      var(--c-bg-deep)
    `,
    display: 'flex',
    flexDirection: 'column',
    color: 'var(--c-text)',
    paddingTop: 'max(env(safe-area-inset-top, 0px), 12px)',
    paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 12px)',
    paddingLeft: 'env(safe-area-inset-left, 0px)',
    paddingRight: 'env(safe-area-inset-right, 0px)',
    boxSizing: 'border-box',
    overflow: 'hidden',
    ...styleOverride,
  };

  const mainStyle = {
    flex: 1,
    minHeight: 0,
    overflow: noScroll ? 'hidden' : 'auto',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
  };

  return React.createElement(
    'div',
    { style: wrapStyle, 'data-app-shell': variant },
    header &&
      React.createElement(
        'div',
        { style: { flex: 'none', position: 'relative', zIndex: 1 } },
        header
      ),
    React.createElement('main', { style: mainStyle }, children),
    footer &&
      React.createElement(
        'div',
        { style: { flex: 'none', position: 'relative', zIndex: 1 } },
        footer
      )
  );
}
