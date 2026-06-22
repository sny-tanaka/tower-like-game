/**
 * TierSelectTab — 初期 Tier 選択タブ Organism (出撃準備画面の 1 タブ)
 *
 * Tier は無限スケールのため、未到達 Tier は表示しない。
 * 表示範囲は minTier (default 1) 〜 maxTier (最新到達 Tier)。
 *
 * props:
 *   - maxTier: 最新到達 Tier (これが表示の上限 = 選択上限)
 *   - minTier: 選択下限 (default 1)
 *   - selectedTier: 選択中
 *   - onSelect(tier)
 *
 * グリッド: 5 列。Tier 別の段階色 (cyan→magenta) で塗り分け、Tier 10 以上は最終色。
 */
export function TierSelectTab(props) {
  const { maxTier = 1, minTier = 1, selectedTier, onSelect } = props;

  const { Text } = window.TowerLikeGame_28197d;

  // 1..maxTier の全 Tier を表示
  const tiers = [];
  for (let t = minTier; t <= maxTier; t++) tiers.push(t);

  const tierColor = (t) => `var(--c-tier-${Math.max(1, Math.min(10, t))})`;

  return React.createElement(
    'div',
    { role: 'tabpanel', 'aria-label': 'Tier 選択' },

    React.createElement(
      'div',
      {
        style: {
          marginBottom: 12,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 8,
        },
      },
      React.createElement(
        Text,
        { variant: 'caption', color: 'mid', style: { fontSize: 12 } },
        '到達済み Tier を選んで出撃します。'
      ),
      React.createElement(
        Text,
        { variant: 'numeric-s', color: 'dim', style: { fontSize: 11 } },
        '最大 Tier ' + maxTier
      )
    ),

    React.createElement(
      'div',
      {
        style: {
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: 8,
        },
      },
      tiers.map((t) => {
        const isActive = t === selectedTier;
        const isFrontier = t === maxTier;
        const color = tierColor(t);

        return React.createElement(
          'button',
          {
            key: t,
            type: 'button',
            onClick: () => onSelect && onSelect(t),
            'aria-pressed': isActive,
            style: {
              position: 'relative',
              aspectRatio: '1',
              padding: 6,
              background: isActive
                ? `linear-gradient(135deg, ${color}33, ${color}11)`
                : 'var(--c-bg-elev)',
              border: isActive ? `2px solid ${color}` : '1px solid var(--c-border)',
              borderRadius: 'var(--r-s)',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 2,
              boxShadow: isActive ? `0 0 8px ${color}66` : 'none',
              transition:
                'box-shadow var(--mo-fast) var(--ease-out), border var(--mo-fast) var(--ease-out)',
            },
            'data-tier': t,
            'data-active': isActive,
            'data-frontier': isFrontier,
          },

          // Tier label
          React.createElement(
            'div',
            {
              style: {
                fontFamily: 'var(--ff-display)',
                fontWeight: 600,
                fontSize: 16,
                color: isActive ? color : 'var(--c-text)',
                lineHeight: 1,
                textShadow: isActive ? `0 0 6px ${color}` : 'none',
              },
            },
            'T' + t
          ),

          // frontier marker
          isFrontier &&
            !isActive &&
            React.createElement(
              'div',
              {
                style: {
                  fontFamily: 'var(--ff-numeric)',
                  fontSize: 8,
                  color,
                  letterSpacing: 'var(--ls-num)',
                  marginTop: 2,
                  textTransform: 'uppercase',
                },
              },
              'frontier'
            )
        );
      })
    )
  );
}
