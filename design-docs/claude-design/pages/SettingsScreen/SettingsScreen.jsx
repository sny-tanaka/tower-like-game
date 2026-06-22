/**
 * SettingsScreen — 設定画面 Page
 * AppShell + PageHeader + TabBar (サウンド / ゲーム / データ)。
 */
export function SettingsScreen(props) {
  const {
    sound = { bgm: 80, se: 80, mute: false },
    game = {
      vibration: true,
      speedDefault: '1x',
      showDamageNumbers: true,
      prefersReducedMotion: false,
    },
    onSound = {},
    onGame = {},
    onExport,
    onImport,
    onReset,
    storageInfo,
    onBack,
    activeNav = 'setting',
    onNavChange,
  } = props;

  const {
    AppShell,
    PageHeader,
    TabBar,
    SoundSettingsTab,
    GameSettingsTab,
    DataSettingsTab,
    BottomNav,
  } = window.TowerLikeGame_28197d;

  const [tab, setTab] = React.useState('sound');

  return React.createElement(
    AppShell,
    {
      header: React.createElement(
        React.Fragment,
        null,
        React.createElement(PageHeader, { title: '設定', onBack }),
        React.createElement(
          'div',
          {
            style: {
              padding: '10px 14px 4px',
              background: 'rgba(10,15,28,0.85)',
              backdropFilter: 'blur(8px)',
            },
          },
          React.createElement(TabBar, {
            tabs: [
              { key: 'sound', label: 'サウンド' },
              { key: 'game', label: 'ゲーム' },
              { key: 'data', label: 'データ' },
            ],
            value: tab,
            onChange: setTab,
            fullWidth: true,
          })
        )
      ),
      footer: React.createElement(BottomNav, {
        items: [
          { key: 'prep', label: '準備', iconName: 'tower' },
          { key: 'machine', label: 'マシン', iconName: 'heart' },
          { key: 'armory', label: '武器庫', iconName: 'laser' },
          { key: 'patch', label: 'パッチ', iconName: 'spark' },
          { key: 'setting', label: '設定', iconName: 'settings' },
        ],
        active: activeNav,
        onChange: onNavChange,
      }),
    },
    React.createElement(
      'div',
      { style: { padding: '12px 14px 20px', display: 'grid', gap: 12 } },

      tab === 'sound' &&
        React.createElement(SoundSettingsTab, {
          ...sound,
          onBgm: onSound.bgm,
          onSe: onSound.se,
          onToggleMute: onSound.mute,
        }),
      tab === 'game' &&
        React.createElement(GameSettingsTab, {
          ...game,
          onVibration: onGame.vibration,
          onSpeedDefault: onGame.speedDefault,
          onShowDamageNumbers: onGame.showDamageNumbers,
          onReducedMotion: onGame.reducedMotion,
        }),
      tab === 'data' &&
        React.createElement(DataSettingsTab, {
          storageInfo,
          onExport,
          onImport,
          onReset,
        })
    )
  );
}
