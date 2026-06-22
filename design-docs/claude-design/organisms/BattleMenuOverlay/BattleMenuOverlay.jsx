/**
 * BattleMenuOverlay — バトル中メニューオーバーレイ Organism
 *
 * 構成: Overlay + Sheet
 *   - 撤退ボタン (danger)
 *   - 音量 (BGM / SE) スライダ 簡易 (本実装は input[type=range] を使うが、ここでは固定スライダ)
 *
 * props:
 *   - open: 表示
 *   - onClose: 背景タップ or × で閉じる
 *   - onRetreat: 撤退（確認ダイアログを上位で出す）
 *   - bgm / se: 0..100
 *   - onBgmChange / onSeChange
 */
export function BattleMenuOverlay(props) {
  const { open = false, onClose, onRetreat, bgm = 80, se = 80, onBgmChange, onSeChange } = props;

  if (!open) return null;

  const { Overlay, Sheet, Text, Button, IconButton, Icon } = window.TowerLikeGame_28197d;

  const rowStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: '12px 0',
    borderTop: '1px dashed var(--c-border-faint)',
  };

  return React.createElement(
    Overlay,
    { open, onClose, dimLevel: 'normal', blur: 4, align: 'center', zIndex: 'overlay' },
    React.createElement(
      Sheet,
      { edge: 'all', padding: 'md', style: { width: 320, maxWidth: '92%', maxHeight: '80vh' } },

      // Header
      React.createElement(
        'div',
        { style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 } },
        React.createElement(
          Text,
          {
            variant: 'heading-3',
            color: 'text',
            style: { flex: 1, fontSize: 14, fontFamily: 'var(--ff-display)', fontWeight: 600 },
          },
          'メニュー'
        ),
        React.createElement(IconButton, {
          icon: 'close',
          label: '閉じる',
          variant: 'ghost',
          size: 'sm',
          onClick: onClose,
        })
      ),

      // Volume rows
      React.createElement(
        'div',
        { style: rowStyle },
        React.createElement(
          'span',
          { style: { color: 'var(--c-text-mid)', display: 'inline-flex' } },
          React.createElement(Icon, { name: 'play', size: 16 })
        ),
        React.createElement(
          'div',
          { style: { flex: 1, minWidth: 0, display: 'flex', alignItems: 'center', gap: 10 } },
          React.createElement(
            Text,
            { variant: 'body', color: 'mid', style: { width: 38, fontSize: 12 } },
            'BGM'
          ),
          React.createElement('input', {
            type: 'range',
            min: 0,
            max: 100,
            value: bgm,
            onChange: (e) => onBgmChange && onBgmChange(Number(e.target.value)),
            style: { flex: 1, accentColor: 'var(--c-primary)' },
          }),
          React.createElement(
            Text,
            { variant: 'numeric-s', color: 'mid', style: { width: 28, textAlign: 'right' } },
            bgm
          )
        )
      ),
      React.createElement(
        'div',
        { style: rowStyle },
        React.createElement(
          'span',
          { style: { color: 'var(--c-text-mid)', display: 'inline-flex' } },
          React.createElement(Icon, { name: 'spark', size: 16 })
        ),
        React.createElement(
          'div',
          { style: { flex: 1, minWidth: 0, display: 'flex', alignItems: 'center', gap: 10 } },
          React.createElement(
            Text,
            { variant: 'body', color: 'mid', style: { width: 38, fontSize: 12 } },
            'SE'
          ),
          React.createElement('input', {
            type: 'range',
            min: 0,
            max: 100,
            value: se,
            onChange: (e) => onSeChange && onSeChange(Number(e.target.value)),
            style: { flex: 1, accentColor: 'var(--c-primary)' },
          }),
          React.createElement(
            Text,
            { variant: 'numeric-s', color: 'mid', style: { width: 28, textAlign: 'right' } },
            se
          )
        )
      ),

      // Retreat button
      React.createElement(
        'div',
        { style: { marginTop: 14 } },
        React.createElement(Button, {
          label: '撤退する',
          variant: 'danger',
          size: 'md',
          fullWidth: true,
          onClick: onRetreat,
        })
      )
    )
  );
}
