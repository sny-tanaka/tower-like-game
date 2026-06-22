/**
 * PageHeader — 画面共通ヘッダ Organism
 *
 * 構成:
 *   左:   戻る IconButton (onBack)
 *   中央: タイトル (Text heading-2)
 *   右:   通貨表示（その画面で使うもののみ）+ 任意の actions
 *
 * - title: 画面名 (例 "マシン強化")
 * - subtitle: 任意の補足 (画面状態など)
 * - onBack: 戻るボタン押下。null/undefined なら戻るボタン非表示
 * - currencies: [{ kind: 'screw'/'bolt'/'alloy', value: number }, ...]   表示する通貨
 * - actions: 右端の追加 ReactNode (設定アイコン等)
 * - sticky: true で position:sticky top:0
 */
export function PageHeader(props) {
  const { title, subtitle, onBack, currencies = [], actions, sticky = true } = props;

  const { IconButton, Text, CurrencyAmount } = window.TowerLikeGame_28197d;

  const wrapStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    padding: '10px 14px',
    background: 'rgba(10,15,28,0.85)',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    borderBottom: '1px solid var(--c-border-faint)',
    boxSizing: 'border-box',
    position: sticky ? 'sticky' : 'relative',
    top: 0,
    zIndex: 'var(--z-hud)',
    minHeight: 56,
  };

  return React.createElement(
    'header',
    { style: wrapStyle, role: 'banner' },

    onBack
      ? React.createElement(IconButton, {
          icon: 'chevron-left',
          label: '戻る',
          variant: 'ghost',
          size: 'sm',
          onClick: onBack,
        })
      : React.createElement('span', { style: { width: 32, flex: 'none' } }),

    React.createElement(
      'div',
      { style: { flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 0 } },
      React.createElement(
        Text,
        {
          variant: 'heading-3',
          color: 'text',
          truncate: true,
          style: {
            fontSize: 16,
            fontFamily: 'var(--ff-display)',
            fontWeight: 600,
            lineHeight: 1.15,
          },
        },
        title
      ),
      subtitle &&
        React.createElement(
          Text,
          {
            variant: 'caption',
            color: 'dim',
            truncate: true,
            style: { fontSize: 10.5, lineHeight: 1.2 },
          },
          subtitle
        )
    ),

    currencies.length > 0 &&
      React.createElement(
        'div',
        { style: { display: 'flex', gap: 12, alignItems: 'center', flex: 'none' } },
        currencies.map((c, i) =>
          React.createElement(CurrencyAmount, {
            key: c.kind + '-' + i,
            currency: c.kind,
            value: c.value,
            size: 'sm',
            align: 'start',
          })
        )
      ),

    actions &&
      React.createElement(
        'div',
        { style: { display: 'flex', gap: 6, alignItems: 'center', flex: 'none' } },
        actions
      )
  );
}
