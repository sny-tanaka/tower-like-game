/**
 * PatchInventoryTab — パッチ所持一覧 Organism (パッチ庫画面)
 *
 * 同名同 Tier ごとに集約された PatchCard を 2 列で並べる。
 *
 * - patches: 集約済みパッチ配列 (count を含む)
 * - sortBy: 'tier-desc' / 'tier-asc' / 'count-desc' (TBD)
 * - selectedId / onSelect
 */
export function PatchInventoryTab(props) {
  const { patches = [], selectedId, onSelect } = props;
  const { PatchCard, Text } = window.TowerLikeGame_28197d;

  if (patches.length === 0) {
    return React.createElement(
      'div',
      {
        style: {
          padding: 32,
          textAlign: 'center',
          background: 'var(--c-bg-elev)',
          border: '1px dashed var(--c-border)',
          borderRadius: 'var(--r-m)',
        },
      },
      React.createElement(Text, { variant: 'caption', color: 'dim' }, 'パッチを所持していません'),
      React.createElement(
        Text,
        { variant: 'caption', color: 'dim', style: { fontSize: 11, marginTop: 4 } },
        'ラン中にドロップ → ここに集まります'
      )
    );
  }

  return React.createElement(
    'div',
    { role: 'tabpanel', 'aria-label': 'パッチ所持' },
    React.createElement(
      Text,
      {
        variant: 'caption',
        color: 'mid',
        style: { fontSize: 12, marginBottom: 10, display: 'block' },
      },
      '所持 ' +
        patches.length +
        ' 種 / 合計 ' +
        patches.reduce((s, p) => s + (p.count || 0), 0) +
        ' 個'
    ),
    React.createElement(
      'div',
      {
        style: {
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 10,
          justifyItems: 'center',
        },
      },
      patches.map((p) =>
        React.createElement(PatchCard, {
          key: p.patchId,
          ...p,
          selected: p.patchId === selectedId,
          onClick: () => onSelect && onSelect(p.patchId),
        })
      )
    )
  );
}
