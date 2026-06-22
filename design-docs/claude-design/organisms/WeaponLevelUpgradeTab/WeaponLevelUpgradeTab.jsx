/**
 * WeaponLevelUpgradeTab — 共通武器強化 Lv (alloy 消費) Organism
 *
 * 仕様: 武器強化は 4 武器すべてに共通して効く 1 個の Lv。
 * 大型 UpgradeCard を中心に、現状の各武器への適用効果を可視化。
 *
 * - currentLevel: 現 Lv
 * - alloy: 現所持 超合金
 * - before / after: 武器強化 Lv 値プレビュー (任意)
 * - statsImpact: [{ label, before, after, suffix? }]   各武器ステへの反映プレビュー (任意)
 * - options: UpgradeCard.options 配列
 * - onBuy(amount)
 */
export function WeaponLevelUpgradeTab(props) {
  const {
    currentLevel = 0,
    alloy = 0,
    before,
    after,
    beforeSuffix = '',
    statsImpact = [],
    options = [],
    maxed = false,
    onBuy,
  } = props;

  const { UpgradeCard, Text, NumericDisplay, CurrencyAmount, Card } = window.TowerLikeGame_28197d;

  return React.createElement(
    'div',
    { role: 'tabpanel', 'aria-label': '武器強化', style: { display: 'grid', gap: 12 } },

    React.createElement(
      'div',
      { style: { display: 'flex', alignItems: 'center', gap: 8 } },
      React.createElement(
        Text,
        { variant: 'caption', color: 'mid', style: { flex: 1, fontSize: 12 } },
        '全 4 武器に共通で効く強化です。'
      ),
      React.createElement(CurrencyAmount, { currency: 'alloy', value: alloy, size: 'sm' })
    ),

    React.createElement(UpgradeCard, {
      title: '武器強化 Lv',
      iconName: 'spark',
      iconColor: 'var(--c-secondary)',
      currentLabel: 'Lv ' + currentLevel,
      before,
      after,
      beforeSuffix,
      currency: 'alloy',
      accent: 'secondary',
      maxed,
      options: options.map((o) => ({
        ...o,
        onClick: o.disabled ? undefined : () => onBuy && onBuy(o.amount),
      })),
    }),

    statsImpact.length > 0 &&
      React.createElement(
        Card,
        { variant: 'sunken', padding: 'md' },
        React.createElement(
          Text,
          { variant: 'label', color: 'dim', style: { fontSize: 10, marginBottom: 6 } },
          '次 Lv での効果プレビュー'
        ),
        React.createElement(
          'div',
          { style: { display: 'grid', gap: 4 } },
          statsImpact.map((s, i) =>
            React.createElement(
              'div',
              {
                key: i,
                style: {
                  display: 'flex',
                  alignItems: 'baseline',
                  justifyContent: 'space-between',
                  padding: '4px 0',
                  borderTop: i === 0 ? 'none' : '1px dashed var(--c-border-faint)',
                  gap: 8,
                },
              },
              React.createElement(
                Text,
                { variant: 'caption', color: 'mid', style: { flex: 1, minWidth: 0, fontSize: 12 } },
                s.label
              ),
              React.createElement(
                'span',
                {
                  style: {
                    display: 'inline-flex',
                    alignItems: 'baseline',
                    gap: 6,
                    fontFamily: 'var(--ff-numeric)',
                  },
                },
                React.createElement(NumericDisplay, {
                  value: s.before,
                  suffix: s.suffix || '',
                  size: 'sm',
                  accentColor: 'dim',
                  style: { fontSize: 12 },
                }),
                React.createElement(
                  'span',
                  { style: { color: 'var(--c-text-dim)', fontSize: 10 } },
                  '→'
                ),
                React.createElement(NumericDisplay, {
                  value: s.after,
                  suffix: s.suffix || '',
                  size: 'sm',
                  accentColor: 'text',
                  style: {
                    fontSize: 13,
                    color: 'var(--c-secondary)',
                    textShadow: '0 0 5px rgba(169,107,255,0.5)',
                  },
                })
              )
            )
          )
        )
      )
  );
}
