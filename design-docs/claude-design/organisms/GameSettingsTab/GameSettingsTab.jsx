/**
 * GameSettingsTab — 設定画面 ゲームタブ Organism
 *
 * - vibration / onVibration            バイブ
 * - speedDefault: '1x' | '2x' | '3x'   ラン開始時のデフォルト速度
 * - onSpeedDefault
 * - showDamageNumbers / onShowDamageNumbers   ダメージ数値表示
 * - prefersReducedMotion / onReducedMotion    モーション削減（補助）
 */
export function GameSettingsTab(props) {
  const {
    vibration = true,
    onVibration,
    speedDefault = '1x',
    onSpeedDefault,
    showDamageNumbers = true,
    onShowDamageNumbers,
    prefersReducedMotion = false,
    onReducedMotion,
  } = props;

  const { Card, Toggle, TabBar, Text } = window.TowerLikeGame_28197d;

  return React.createElement(
    'div',
    { role: 'tabpanel', 'aria-label': 'ゲーム設定', style: { display: 'grid', gap: 8 } },

    React.createElement(
      Card,
      { variant: 'sunken', padding: 'md' },
      React.createElement(Toggle, {
        label: 'バイブレーション',
        description: 'ヒット / 被ダメ時の振動',
        checked: vibration,
        onChange: onVibration,
      })
    ),

    React.createElement(
      Card,
      { variant: 'sunken', padding: 'md' },
      React.createElement(Toggle, {
        label: 'ダメージ数値表示',
        description: '攻撃ヒット時のポップ表示',
        checked: showDamageNumbers,
        onChange: onShowDamageNumbers,
      })
    ),

    React.createElement(
      Card,
      { variant: 'sunken', padding: 'md' },
      React.createElement(Toggle, {
        label: 'モーション削減',
        description: 'アニメーションを最小化 (端末負荷対策)',
        checked: prefersReducedMotion,
        onChange: onReducedMotion,
        accent: 'secondary',
      })
    ),

    React.createElement(
      Card,
      { variant: 'sunken', padding: 'md' },
      React.createElement(
        Text,
        {
          variant: 'body',
          color: 'text',
          style: { fontSize: 13, fontWeight: 500, marginBottom: 4 },
        },
        'ラン開始時の速度'
      ),
      React.createElement(
        Text,
        { variant: 'caption', color: 'dim', style: { fontSize: 11, marginBottom: 8 } },
        'ラン中は HUD ボタンで切替可'
      ),
      React.createElement(TabBar, {
        variant: 'pill',
        size: 'sm',
        tabs: [
          { key: '1x', label: '×1' },
          { key: '2x', label: '×2' },
          { key: '3x', label: '×3' },
          { key: '5x', label: '×5' },
        ],
        value: speedDefault,
        onChange: onSpeedDefault,
        fullWidth: true,
      })
    )
  );
}
