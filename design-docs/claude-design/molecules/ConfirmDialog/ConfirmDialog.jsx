/**
 * ConfirmDialog — 確認ダイアログ本体 (撤退確認 / リセット確認)
 *
 * Overlay は提供しない (Overlay Atom が別途包む)。ダイアログ本体のみ。
 *
 * - title: 見出し
 * - message: 本文 (string or ReactNode)
 * - confirmLabel: 既定 "確定"
 * - cancelLabel: 既定 "キャンセル"
 * - variant: 'default' / 'danger'   danger は confirm ボタンが赤
 * - iconName: 上部に飾るアイコン（オプション）
 * - onConfirm / onCancel
 */
export function ConfirmDialog(props) {
  const {
    title,
    message,
    confirmLabel = '確定',
    cancelLabel = 'キャンセル',
    variant = 'default',
    iconName,
    onConfirm,
    onCancel,
  } = props;

  const { Icon, Text, Button } = window.TowerLikeGame_28197d;

  const isDanger = variant === 'danger';

  const wrapStyle = {
    width: '100%',
    maxWidth: 340,
    background: 'var(--c-bg-elev)',
    border: '1px solid ' + (isDanger ? 'rgba(255,77,109,0.5)' : 'var(--c-border-faint)'),
    borderRadius: 'var(--r-l)',
    boxShadow: isDanger
      ? '0 12px 32px rgba(0,0,0,0.6), 0 0 24px rgba(255,77,109,0.25)'
      : 'var(--sh-high)',
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
    gap: 14,
    boxSizing: 'border-box',
  };

  const iconBoxStyle = {
    width: 48,
    height: 48,
    borderRadius: '50%',
    background: isDanger ? 'rgba(255,77,109,0.12)' : 'rgba(78,228,246,0.10)',
    border: '1px solid ' + (isDanger ? 'rgba(255,77,109,0.4)' : 'var(--c-primary)'),
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: isDanger ? 'var(--c-danger)' : 'var(--c-primary)',
    margin: '0 auto',
    filter: isDanger
      ? 'drop-shadow(0 0 8px rgba(255,77,109,0.5))'
      : 'drop-shadow(0 0 6px rgba(78,228,246,0.4))',
  };

  return React.createElement(
    'div',
    { style: wrapStyle, role: 'dialog', 'aria-modal': true, 'aria-labelledby': 'confirm-title' },
    iconName &&
      React.createElement(
        'div',
        { style: iconBoxStyle },
        React.createElement(Icon, { name: iconName, size: 24 })
      ),
    React.createElement(
      Text,
      {
        variant: 'heading-2',
        color: 'text',
        align: 'center',
        style: {
          fontSize: 18,
          fontFamily: 'var(--ff-display)',
          fontWeight: 600,
          id: 'confirm-title',
        },
      },
      title
    ),
    message != null &&
      React.createElement(
        'div',
        { style: { textAlign: 'center', lineHeight: 1.55 } },
        typeof message === 'string'
          ? React.createElement(Text, { variant: 'body', color: 'mid' }, message)
          : message
      ),
    React.createElement(
      'div',
      { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 4 } },
      React.createElement(Button, {
        label: cancelLabel,
        variant: 'ghost',
        size: 'md',
        fullWidth: true,
        onClick: onCancel,
      }),
      React.createElement(Button, {
        label: confirmLabel,
        variant: isDanger ? 'danger' : 'primary',
        size: 'md',
        fullWidth: true,
        onClick: onConfirm,
      })
    )
  );
}
