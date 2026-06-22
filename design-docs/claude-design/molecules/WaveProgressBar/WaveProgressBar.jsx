/**
 * WaveProgressBar — ウェーブ残量 + 現 Wave 番号 + 次マイルストーン
 *
 * 上 HUD で常時表示。残量が減るほどバーが減る (reverse=true)。
 *
 * - Badge: W{n} (current wave) — secondary 色
 * - ProgressBar: wave 色 (purple)、neon variant
 * - Optional milestone badge: 次ボス Wave (例 "→ W20 BOSS")
 */
export function WaveProgressBar(props) {
  const {
    waveNumber,
    secondsLeft,
    secondsMax,
    nextMilestone, // { wave: number, kind: 'boss' | 'elite' | 'tier-up' }
    showSeconds = true,
    size = 'md',
  } = props;

  const { Badge, ProgressBar, NumericDisplay } = window.TowerLikeGame_28197d;

  const sizeMap = {
    sm: { bar: 'sm', gap: 4, fs: 10 },
    md: { bar: 'md', gap: 6, fs: 11 },
    lg: { bar: 'lg', gap: 8, fs: 12 },
  };
  const s = sizeMap[size] || sizeMap.md;

  const milestoneLabel = nextMilestone
    ? `→ W${nextMilestone.wave} ${(nextMilestone.kind === 'boss' ? 'BOSS' : nextMilestone.kind === 'elite' ? 'ELITE' : 'TIER').toUpperCase()}`
    : null;
  const milestoneVariant =
    nextMilestone?.kind === 'boss' ? 'boss' : nextMilestone?.kind === 'elite' ? 'elite' : 'info';

  return React.createElement(
    'div',
    {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: s.gap + 'px',
      },
      role: 'group',
      'aria-label': `Wave ${waveNumber}`,
    },
    React.createElement(
      'div',
      { style: { display: 'flex', alignItems: 'center', gap: 8 } },
      React.createElement(Badge, {
        text: 'W' + waveNumber,
        variant: 'info',
        size: size === 'sm' ? 'sm' : 'md',
        glow: true,
      }),
      milestoneLabel &&
        React.createElement(Badge, {
          text: milestoneLabel,
          variant:
            milestoneVariant === 'boss'
              ? 'boss'
              : milestoneVariant === 'elite'
                ? 'elite'
                : 'neutral',
          size: 'sm',
        }),
      React.createElement('span', { style: { flex: 1 } }),
      showSeconds &&
        React.createElement(
          'span',
          {
            style: {
              display: 'inline-flex',
              gap: 4,
              alignItems: 'baseline',
              fontFamily: 'var(--ff-numeric)',
              color: 'var(--c-text-mid)',
              fontSize: s.fs + 'px',
            },
          },
          React.createElement(NumericDisplay, {
            value: secondsLeft,
            size: 'sm',
            accentColor: 'mid',
            decimals: 0,
          }),
          React.createElement('span', { style: { color: 'var(--c-text-dim)' } }, 's')
        )
    ),
    React.createElement(ProgressBar, {
      value: secondsLeft,
      max: secondsMax,
      color: 'wave',
      variant: 'neon',
      size: s.bar,
      reverse: true,
    })
  );
}
