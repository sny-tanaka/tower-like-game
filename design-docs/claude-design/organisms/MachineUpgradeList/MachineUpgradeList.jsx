/**
 * MachineUpgradeList — 選択中カテゴリの UpgradeCard リスト Organism
 *
 * - items: UpgradeCard に渡す props 配列
 * - columns: 1 or 2 (default 2)
 * - emptyLabel: 0 件時の表示文字
 *
 * カテゴリの切替は親 (MachineScreen Page) が items を差し替え。
 * 通貨は bolt 固定 (マシン強化は永続通貨で行う)。
 */
export function MachineUpgradeList(props) {
  const { items = [], columns = 2, emptyLabel = '項目がありません' } = props;
  const { UpgradeCard, Text } = window.TowerLikeGame_28197d;

  if (items.length === 0) {
    return React.createElement(
      'div',
      {
        style: {
          padding: 24,
          textAlign: 'center',
          background: 'var(--c-bg-elev)',
          border: '1px dashed var(--c-border)',
          borderRadius: 'var(--r-m)',
        },
      },
      React.createElement(Text, { variant: 'caption', color: 'dim' }, emptyLabel)
    );
  }

  return React.createElement(
    'div',
    {
      style: {
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: 8,
      },
    },
    items.map((it) => React.createElement(UpgradeCard, { key: it.id || it.title, ...it }))
  );
}
