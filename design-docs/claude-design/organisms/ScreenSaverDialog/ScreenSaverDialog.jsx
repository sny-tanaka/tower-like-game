/**
 * ScreenSaverDialog — スクリーンセーバー Organism
 *
 * 焼き付き防止: ScreenSaverFx のドリフトに乗せ、同じ位置に常時描画しない。
 * 中央タワー (回転リング + glow パルス) も 1 つの drift item として扱われる。
 *
 * - open: 表示
 * - onDismiss: タップで復帰
 * - stats: { tier, wave, hpPct } — 漂わせるラベル群
 * - cycleSeconds: ドリフト 1 周秒数 (default 24)
 */
export function ScreenSaverDialog(props) {
  const { open = false, onDismiss, stats, cycleSeconds = 24 } = props;

  if (!open) return null;

  const { Overlay, ScreenSaverFx, Icon, Text } = window.TowerLikeGame_28197d;

  const label = (text, color, fontSize = 14) =>
    React.createElement(
      Text,
      {
        variant: 'label',
        color,
        style: {
          fontSize,
          letterSpacing: '0.18em',
          fontFamily: 'var(--ff-display)',
          whiteSpace: 'nowrap',
          opacity: 0.9,
        },
      },
      text
    );

  const items = [];
  items.push(label('TAP TO RESUME', 'dim', 11));
  if (stats) {
    if (stats.tier != null) items.push(label('TIER ' + stats.tier, 'primary', 13));
    if (stats.wave != null) items.push(label('WAVE ' + stats.wave, 'secondary', 13));
    if (stats.hpPct != null) {
      const hpColor = stats.hpPct > 50 ? 'success' : stats.hpPct > 25 ? 'warning' : 'danger';
      items.push(label('HP ' + Math.round(stats.hpPct) + '%', hpColor, 13));
    }
  }

  const towerIcon = React.createElement(Icon, { name: 'tower', size: 64 });

  return React.createElement(
    Overlay,
    {
      dimLevel: 'heavy',
      blur: 8,
      dismissible: true,
      onClose: onDismiss,
      align: 'center',
      zIndex: 'overlay',
      style: { padding: 0 },
    },
    React.createElement(
      'div',
      { style: { position: 'absolute', inset: 0, pointerEvents: 'none' } },
      React.createElement(ScreenSaverFx, {
        items,
        showTower: true,
        towerContent: towerIcon,
        cycleSeconds,
      })
    )
  );
}
