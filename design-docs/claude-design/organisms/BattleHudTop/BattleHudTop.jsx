/**
 * BattleHudTop — バトル画面上端 HUD Organism
 *
 * 構成: HP バー + Tier バッジ + Wave 進捗
 *
 * props:
 *   - hp: { current, max }                   マシン HP
 *   - shield: { current, max } | null        シールドあれば
 *   - tier: 整数 Tier 番号
 *   - wave: { number, secondsLeft, secondsMax, nextMilestone? } — WaveProgressBar に渡す
 *   - damaging: true で HP バーが赤フラッシュ (Fx 側が制御)
 */
export function BattleHudTop(props) {
  const { hp, shield = null, tier, wave, damaging = false } = props;

  const { Badge, ProgressBar, NumericDisplay, Text, WaveProgressBar } = window.TowerLikeGame_28197d;

  const wrapStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
    padding: '10px 14px 8px',
    background: 'linear-gradient(180deg, rgba(10,15,28,0.85) 0%, rgba(10,15,28,0.55) 100%)',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    borderBottom: '1px solid var(--c-border-faint)',
    minWidth: 0,
  };

  const headerRow = {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    minWidth: 0,
  };

  return React.createElement(
    'div',
    { style: wrapStyle, role: 'group', 'aria-label': 'バトル状態' },

    // Tier + HP value
    React.createElement(
      'div',
      { style: headerRow },
      React.createElement(Badge, { variant: 'tier', tier, glow: true, size: 'md' }),
      React.createElement(Text, { variant: 'label', color: 'dim', style: { fontSize: 10 } }, 'HP'),
      React.createElement(
        'span',
        { style: { display: 'inline-flex', gap: 4, alignItems: 'baseline', flex: 1, minWidth: 0 } },
        React.createElement(NumericDisplay, {
          value: hp.current,
          size: 'sm',
          accentColor: damaging ? 'danger' : 'text',
          glow: damaging,
          style: { fontSize: 14 },
        }),
        React.createElement('span', { style: { color: 'var(--c-text-dim)', fontSize: 11 } }, '/'),
        React.createElement(NumericDisplay, {
          value: hp.max,
          size: 'sm',
          accentColor: 'dim',
          style: { fontSize: 11 },
        })
      ),
      shield &&
        React.createElement(
          'span',
          { style: { display: 'inline-flex', gap: 3, alignItems: 'baseline' } },
          React.createElement(
            Text,
            { variant: 'label', color: 'primary', style: { fontSize: 9.5 } },
            'SHLD'
          ),
          React.createElement(NumericDisplay, {
            value: shield.current,
            size: 'sm',
            accentColor: 'primary',
            style: { fontSize: 11 },
          })
        )
    ),

    // HP bar
    React.createElement(ProgressBar, {
      value: hp.current,
      max: hp.max,
      color: 'hp',
      variant: 'solid',
      size: 'md',
      lowThreshold: 0.3,
    }),

    // Shield bar (if any)
    shield &&
      React.createElement(ProgressBar, {
        value: shield.current,
        max: shield.max,
        color: 'shield',
        variant: 'neon',
        size: 'sm',
      }),

    // Wave progress
    React.createElement(WaveProgressBar, {
      waveNumber: wave.number,
      secondsLeft: wave.secondsLeft,
      secondsMax: wave.secondsMax,
      nextMilestone: wave.nextMilestone,
      size: 'sm',
    })
  );
}
