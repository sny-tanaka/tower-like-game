/**
 * PatchMergeTab — パッチ合成 Organism (パッチ庫画面)
 *
 * 同 Tier 2 個合成で 1 Tier UP。所持数が偶数になるまでの最大合成数を表示。
 * 「一括合成」ボタンで実行 (内部で Tier 制限 / 確認上位で実施)。
 *
 * - mergeable: 合成可能なパッチ群 [{patchId, name, iconName, tier, count, mergeCount}]
 *   mergeCount = 合成で消費される個数 (count を 2 で割った商 ×2)
 * - maxTierLimit: 合成上限 Tier (Stepper で調整、default なし=無制限)
 * - onLimitChange(t)
 * - onMergeAll: 一括合成実行 (確認ダイアログは上位)
 */
export function PatchMergeTab(props) {
  const { mergeable = [], maxTierLimit, onLimitChange, onMergeAll } = props;

  const { Card, Text, Icon, NumericDisplay, Button } = window.TowerLikeGame_28197d;

  const totalMerges = mergeable.reduce((s, p) => s + Math.floor((p.count || 0) / 2), 0);

  return React.createElement(
    'div',
    { role: 'tabpanel', 'aria-label': 'パッチ合成', style: { display: 'grid', gap: 12 } },

    // header explanation
    React.createElement(
      Text,
      { variant: 'caption', color: 'mid', style: { fontSize: 12 } },
      '同 Tier × 2 個で 1 Tier UP。合成は強化通貨を消費しません。'
    ),

    // Tier 上限 Stepper
    React.createElement(
      Card,
      { variant: 'sunken', padding: 'md' },
      React.createElement(
        'div',
        { style: { display: 'flex', alignItems: 'center', gap: 10 } },
        React.createElement(
          'div',
          { style: { flex: 1, minWidth: 0 } },
          React.createElement(
            Text,
            { variant: 'body', color: 'text', style: { fontSize: 13, fontWeight: 500 } },
            '合成上限 Tier'
          ),
          React.createElement(
            Text,
            { variant: 'caption', color: 'dim', style: { fontSize: 11 } },
            'ここを超える Tier には合成しません'
          )
        ),
        // simple stepper inline
        React.createElement(
          'div',
          {
            style: {
              display: 'inline-flex',
              alignItems: 'stretch',
              borderRadius: 'var(--r-pill)',
              border: '1px solid var(--c-border)',
              overflow: 'hidden',
            },
          },
          React.createElement(
            'button',
            {
              type: 'button',
              onClick: () => onLimitChange && onLimitChange(Math.max(2, (maxTierLimit || 5) - 1)),
              style: {
                width: 32,
                background: 'var(--c-bg-base)',
                border: 0,
                color: 'var(--c-text-mid)',
                cursor: 'pointer',
              },
              'aria-label': '上限を下げる',
            },
            React.createElement(Icon, { name: 'minus', size: 14 })
          ),
          React.createElement(
            'div',
            {
              style: {
                padding: '0 14px',
                display: 'flex',
                alignItems: 'center',
                background: 'var(--c-bg-base)',
                borderLeft: '1px solid var(--c-border-faint)',
                borderRight: '1px solid var(--c-border-faint)',
              },
            },
            React.createElement(
              'span',
              {
                style: {
                  fontFamily: 'var(--ff-display)',
                  fontWeight: 600,
                  fontSize: 13,
                  color: 'var(--c-primary)',
                },
              },
              'T' + (maxTierLimit || '∞')
            )
          ),
          React.createElement(
            'button',
            {
              type: 'button',
              onClick: () => onLimitChange && onLimitChange((maxTierLimit || 5) + 1),
              style: {
                width: 32,
                background: 'var(--c-bg-base)',
                border: 0,
                color: 'var(--c-text-mid)',
                cursor: 'pointer',
              },
              'aria-label': '上限を上げる',
            },
            React.createElement(Icon, { name: 'plus', size: 14 })
          )
        )
      )
    ),

    // mergeable list
    mergeable.length === 0
      ? React.createElement(
          Card,
          { variant: 'ghost', padding: 'lg' },
          React.createElement(
            Text,
            { variant: 'caption', color: 'dim', align: 'center' },
            '合成可能なパッチがありません'
          ),
          React.createElement(
            Text,
            {
              variant: 'caption',
              color: 'dim',
              align: 'center',
              style: { fontSize: 11, marginTop: 4 },
            },
            '同 Tier 2 個揃うと合成可能になります'
          )
        )
      : React.createElement(
          'div',
          { style: { display: 'grid', gap: 6 } },
          mergeable.map((p) => {
            const pairs = Math.floor((p.count || 0) / 2);
            const tierColor = `var(--c-patch-t${Math.max(1, Math.min(5, p.tier))})`;
            return React.createElement(
              'div',
              {
                key: p.patchId,
                style: {
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '8px 10px',
                  background: 'var(--c-bg-elev)',
                  border: '1px solid var(--c-border-faint)',
                  borderLeft: `3px solid ${tierColor}`,
                  borderRadius: 'var(--r-s)',
                },
              },
              React.createElement(
                'span',
                {
                  style: {
                    color: tierColor,
                    display: 'inline-flex',
                    filter: `drop-shadow(0 0 3px ${tierColor})`,
                  },
                },
                React.createElement(Icon, { name: p.iconName || 'spark', size: 18 })
              ),
              React.createElement(
                'div',
                { style: { flex: 1, minWidth: 0, display: 'grid', gap: 0 } },
                React.createElement(
                  Text,
                  {
                    variant: 'body',
                    color: 'text',
                    style: { fontSize: 12.5, fontWeight: 600, fontFamily: 'var(--ff-display)' },
                    truncate: true,
                  },
                  p.name
                ),
                React.createElement(
                  Text,
                  { variant: 'caption', color: 'dim', style: { fontSize: 10 } },
                  'T' + p.tier + ' → T' + (p.tier + 1)
                )
              ),
              React.createElement(
                'span',
                {
                  style: {
                    display: 'inline-flex',
                    alignItems: 'baseline',
                    gap: 4,
                    fontFamily: 'var(--ff-numeric)',
                    fontSize: 12,
                  },
                },
                React.createElement(NumericDisplay, {
                  value: p.count || 0,
                  size: 'sm',
                  accentColor: 'dim',
                  style: { fontSize: 11 },
                }),
                React.createElement(
                  'span',
                  { style: { color: 'var(--c-text-dim)', fontSize: 10 } },
                  '→'
                ),
                React.createElement(NumericDisplay, {
                  value: pairs,
                  size: 'sm',
                  accentColor: 'primary',
                  style: { fontSize: 13, color: tierColor },
                }),
                React.createElement(
                  'span',
                  { style: { color: 'var(--c-text-dim)', fontSize: 10 } },
                  '個'
                )
              )
            );
          })
        ),

    // merge-all button
    mergeable.length > 0 &&
      React.createElement(Button, {
        label: '一括合成 (' + totalMerges + ' 回)',
        variant: 'secondary',
        size: 'md',
        fullWidth: true,
        iconLeft: React.createElement(Icon, { name: 'spark', size: 16 }),
        onClick: onMergeAll,
      })
  );
}
