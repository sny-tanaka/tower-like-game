/**
 * TitleActions — タイトル画面のアクション群 Organism
 *
 * 3 ボタン: 続きから / 新規開始 / 設定
 *
 * - hasSave: セーブデータあり (true なら「続きから」有効)
 * - onResume / onNewGame / onSettings
 * - lastSavedAt: 任意 "最終セーブ: 12 分前" 等のラベル
 */
export function TitleActions(props) {
  const { hasSave = false, onResume, onNewGame, onSettings, lastSavedAt } = props;

  const { Button, Icon, Text } = window.TowerLikeGame_28197d;

  return React.createElement(
    'div',
    {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        padding: '0 24px',
        maxWidth: 360,
        margin: '0 auto',
        width: '100%',
        boxSizing: 'border-box',
      },
    },

    // 続きから (hasSave 時のみ目立たせる)
    React.createElement(Button, {
      label: hasSave ? '続きから' : '続きから (セーブなし)',
      variant: hasSave ? 'primary' : 'ghost',
      size: 'lg',
      fullWidth: true,
      disabled: !hasSave,
      iconLeft: React.createElement(Icon, { name: 'play', size: 18 }),
      onClick: onResume,
    }),

    hasSave &&
      lastSavedAt &&
      React.createElement(
        Text,
        {
          variant: 'caption',
          color: 'dim',
          align: 'center',
          style: { fontSize: 10.5, marginTop: -2 },
        },
        '最終セーブ: ' + lastSavedAt
      ),

    // 新規開始
    React.createElement(Button, {
      label: '新規開始',
      variant: hasSave ? 'ghost' : 'primary',
      size: 'lg',
      fullWidth: true,
      iconLeft: React.createElement(Icon, { name: 'plus', size: 18 }),
      onClick: onNewGame,
    }),

    // 設定
    React.createElement(Button, {
      label: '設定',
      variant: 'ghost',
      size: 'md',
      fullWidth: true,
      iconLeft: React.createElement(Icon, { name: 'settings', size: 16 }),
      onClick: onSettings,
    })
  );
}
