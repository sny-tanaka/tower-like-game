/**
 * RunWorkshopBottomSheet — ラン中ワークショップのボトムシート Organism
 *
 * 構成: Sheet + 説明バナー + UpgradeCard ×4 (攻撃力 / 攻撃速度 / HP / ネジ獲得)
 *
 * - items: [{ id, title, iconName, before, after, beforeSuffix, level, options: [{amount,cost,disabled}] }]
 * - screws: 現在のネジ残高 (シート上部に表示)
 * - onBuy: (itemId, amount) => void
 * - onClose: シート閉じる
 * - onHandlePointerDown / handleDragging — Sheet ハンドル
 */
export function RunWorkshopBottomSheet(props) {
  const {
    items = [],
    screws = 0,
    onBuy,
    onClose,
    onHandlePointerDown,
    handleDragging = false,
  } = props;

  const { Sheet, UpgradeCard, Text, IconButton, CurrencyAmount } = window.TowerLikeGame_28197d;

  return React.createElement(
    Sheet,
    {
      edge: 'bottom',
      withHandle: true,
      padding: 'md',
      onHandlePointerDown,
      handleDragging,
      style: {
        borderColor: 'var(--c-primary)',
        boxShadow: '0 -12px 32px rgba(0,0,0,0.6), 0 -2px 16px rgba(78,228,246,0.18)',
      },
    },

    // Header: title + screws + close
    React.createElement(
      'div',
      {
        style: {
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          marginBottom: 10,
        },
      },
      React.createElement(
        'div',
        { style: { flex: 1, minWidth: 0 } },
        React.createElement(
          Text,
          {
            variant: 'heading-3',
            color: 'text',
            style: { fontSize: 14, fontFamily: 'var(--ff-display)', fontWeight: 600 },
          },
          'ラン中ワークショップ'
        ),
        React.createElement(
          Text,
          { variant: 'caption', color: 'dim', style: { fontSize: 10.5 } },
          'ラン終了で全リセット'
        )
      ),
      React.createElement(CurrencyAmount, { currency: 'screw', value: screws, size: 'md' }),
      onClose &&
        React.createElement(IconButton, {
          icon: 'chevron-down',
          label: '閉じる',
          variant: 'ghost',
          size: 'sm',
          onClick: onClose,
        })
    ),

    // 2-column grid of 4 UpgradeCards
    React.createElement(
      'div',
      {
        style: {
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 8,
        },
      },
      items.map((it) =>
        React.createElement(UpgradeCard, {
          key: it.id,
          title: it.title,
          iconName: it.iconName,
          iconColor: 'var(--c-warning)',
          currentLabel: it.level != null ? 'Lv ' + it.level : undefined,
          before: it.before,
          after: it.after,
          beforeSuffix: it.beforeSuffix,
          currency: 'screw',
          accent: 'warning',
          options: (it.options || []).map((o) => ({
            ...o,
            onClick: o.disabled ? undefined : () => onBuy && onBuy(it.id, o.amount),
          })),
        })
      )
    )
  );
}
