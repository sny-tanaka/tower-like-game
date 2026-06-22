/**
 * BattleScreen — バトル画面 Page
 *
 * AppShell(variant=battle) + BattleHudTop + BattleField + BattleHudBottom
 * + 各種オーバーレイ (RunWorkshopBottomSheet / BattleMenuOverlay / ResultDialog / ScreenSaverDialog)
 */
export function BattleScreen(props) {
  const {
    hp = { current: 100, max: 100 },
    shield,
    tier = 1,
    wave = { number: 1, secondsLeft: 26, secondsMax: 26 },
    enemies = [],
    weapon = 'laser',
    cutterRadiusPct,
    screws = 0,
    weapons = [],
    activeWeapon,
    swapDisabled,
    activeSkill,
    speed = '1x',
    paused = false,
    autoActive = false,
    onWeaponSelect,
    onActiveSkill,
    onToggleAutoActive,
    onSpeedToggle,
    onPauseToggle,
    workshopOpen = false,
    workshopItems = [],
    onWorkshopBuy,
    onWorkshopClose,
    onSheetHandlePointerDown,
    menuOpen = false,
    onOpenMenu,
    onCloseMenu,
    onRetreat,
    bgm = 80,
    se = 80,
    onBgmChange,
    onSeChange,
    resultOpen = false,
    resultKind,
    resultStats,
    resultRewards,
    onResultPreparation,
    screenSaverOpen = false,
    onScreenSaverDismiss,
    onOpenScreenSaver,
    damaging = false,
    sheetDragging = false,
  } = props;

  const {
    AppShell,
    BattleField,
    BattleHudTop,
    BattleHudBottom,
    RunWorkshopBottomSheet,
    BattleMenuOverlay,
    ResultDialog,
    ScreenSaverDialog,
  } = window.TowerLikeGame_28197d;

  return React.createElement(
    AppShell,
    {
      variant: 'battle',
      noScroll: true,
      header: React.createElement(BattleHudTop, { hp, shield, tier, wave, damaging }),
      footer: React.createElement(BattleHudBottom, {
        screws,
        weapons,
        activeWeapon,
        swapDisabled,
        activeSkill,
        speed,
        autoActive,
        paused,
        sheetDragging,
        onWeaponSelect,
        onActiveSkill,
        onToggleAutoActive,
        onSpeedToggle,
        onPauseToggle,
        onMenu: onOpenMenu,
        onScreenSaver: onOpenScreenSaver,
        onSheetHandlePointerDown,
      }),
    },

    // BattleField fills remaining
    React.createElement(BattleField, {
      enemies,
      weapon,
      cutterRadiusPct,
      paused,
      height: 'auto',
      style: { flex: 1, minHeight: 0 },
    }),

    // Run workshop bottom sheet (overlay layer)
    workshopOpen &&
      React.createElement(
        'div',
        { style: { position: 'absolute', left: 0, right: 0, bottom: 0, zIndex: 'var(--z-sheet)' } },
        React.createElement(RunWorkshopBottomSheet, {
          items: workshopItems,
          screws,
          onBuy: onWorkshopBuy,
          onClose: onWorkshopClose,
          onHandlePointerDown: onSheetHandlePointerDown,
        })
      ),

    // Battle menu overlay
    React.createElement(BattleMenuOverlay, {
      open: menuOpen,
      onClose: onCloseMenu,
      onRetreat,
      bgm,
      se,
      onBgmChange,
      onSeChange,
    }),

    // Result dialog
    React.createElement(ResultDialog, {
      open: resultOpen,
      kind: resultKind,
      stats: resultStats,
      rewards: resultRewards,
      onPreparation: onResultPreparation,
    }),

    // Screen saver
    React.createElement(ScreenSaverDialog, {
      open: screenSaverOpen,
      onDismiss: onScreenSaverDismiss,
      stats: { tier, wave: wave.number, hpPct: Math.round((hp.current / hp.max) * 100) },
    })
  );
}
