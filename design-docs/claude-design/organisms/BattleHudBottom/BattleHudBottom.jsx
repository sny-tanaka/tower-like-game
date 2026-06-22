/**
 * BattleHudBottom — バトル画面下端 HUD Organism
 *
 * 親指可動域に集約。2 行レイアウト:
 *   行 1 (大): 武器スロット ×4 + アクティブスキルボタン (大)
 *   行 2 (小): ネジ + 速度切替 + 一時停止 + メニュー + スクリーンセーバー + シートハンドル
 *
 * props:
 *   - screws: 現在のネジ残高
 *   - weapons: [{ kind, ready, cdProgress }] 長さ 4
 *   - activeWeapon: 現装備の kind
 *   - swapDisabled: 切替 CD 中
 *   - activeSkill: { ready, cdProgress, weaponKind } — アクティブスキル発動状態
 *   - speed: '1x' | '2x' | '3x' | '5x'
 *   - paused: 一時停止中
 *   - onWeaponSelect, onActiveSkill, onSpeedToggle, onPauseToggle, onMenu, onScreenSaver, onSheetHandlePointerDown
 */
const SPEED_NEXT = { '1x': '2x', '2x': '3x', '3x': '5x', '5x': '1x' };

export function BattleHudBottom(props) {
  const {
    screws = 0,
    weapons = [],
    activeWeapon,
    swapDisabled = false,
    activeSkill = { ready: false, cdProgress: 0 },
    speed = '1x',
    autoActive = false,
    paused = false,
    onWeaponSelect,
    onActiveSkill,
    onToggleAutoActive,
    onSpeedToggle,
    onPauseToggle,
    onMenu,
    onScreenSaver,
    onSheetHandlePointerDown,
    sheetDragging = false,
  } = props;

  const {
    WeaponSlotIcon,
    IconButton,
    CircularProgress,
    Icon,
    Text,
    NumericDisplay,
    BottomSheetHandle,
    Badge,
  } = window.TowerLikeGame_28197d;

  const wrapStyle = {
    display: 'flex',
    flexDirection: 'column',
    background: 'linear-gradient(0deg, rgba(10,15,28,0.92) 0%, rgba(10,15,28,0.7) 100%)',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    borderTop: '1px solid var(--c-border-faint)',
    borderRadius: 'var(--r-l) var(--r-l) 0 0',
  };

  // ===== Active skill button (large round) =====
  const activeStyle = {
    width: 64,
    height: 64,
    borderRadius: '50%',
    flex: 'none',
    position: 'relative',
    background: activeSkill.ready
      ? 'radial-gradient(circle, rgba(169,107,255,0.4), rgba(169,107,255,0.08) 70%)'
      : 'var(--c-bg-base)',
    border: '1px solid ' + (activeSkill.ready ? 'var(--c-secondary)' : 'var(--c-border)'),
    boxShadow: activeSkill.ready ? 'var(--glow-purple-md)' : 'none',
    cursor: activeSkill.ready && !autoActive ? 'pointer' : 'not-allowed',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: activeSkill.ready ? 'var(--c-secondary)' : 'var(--c-text-disabled)',
    transition: 'box-shadow var(--mo-fast) var(--ease-out), border var(--mo-fast) var(--ease-out)',
  };

  return React.createElement(
    'div',
    { style: wrapStyle, role: 'group', 'aria-label': 'バトル操作' },

    // ===== sheet handle =====
    React.createElement(BottomSheetHandle, {
      dragging: sheetDragging,
      onPointerDown: onSheetHandlePointerDown,
    }),

    // ===== Row 1: weapons + active =====
    React.createElement(
      'div',
      {
        style: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 10,
          padding: '4px 14px 8px',
        },
      },

      // weapon slots
      React.createElement(
        'div',
        { style: { display: 'flex', gap: 6 } },
        weapons.map((w) =>
          React.createElement(WeaponSlotIcon, {
            key: w.kind,
            weapon: w.kind,
            active: w.kind === activeWeapon,
            ready: w.ready,
            cdProgress: w.cdProgress,
            swapDisabled,
            size: 'md',
            onClick: () => onWeaponSelect && onWeaponSelect(w.kind),
          })
        )
      ),

      // active skill (large button) + manual/auto toggle below
      React.createElement(
        'div',
        { style: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 } },
        React.createElement(
          'button',
          {
            type: 'button',
            style: activeStyle,
            disabled: !activeSkill.ready || autoActive,
            onClick: () => activeSkill.ready && !autoActive && onActiveSkill && onActiveSkill(),
            'aria-label': 'アクティブスキル発動',
          },
          // CD ring
          React.createElement(
            'span',
            { style: { position: 'absolute', inset: 0 } },
            React.createElement(CircularProgress, {
              value: activeSkill.cdProgress,
              size: 64,
              thickness: 3,
              color: 'secondary',
              glow: activeSkill.ready,
            })
          ),
          // Icon
          React.createElement(Icon, {
            name: activeSkill.weaponKind || activeWeapon || 'spark',
            size: 30,
          })
        ),
        // Manual / Auto toggle
        React.createElement(
          'button',
          {
            type: 'button',
            onClick: onToggleAutoActive,
            'aria-pressed': autoActive,
            style: {
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4,
              padding: '2px 8px',
              height: 18,
              background: autoActive ? 'var(--c-secondary-bg)' : 'var(--c-bg-base)',
              border: '1px solid ' + (autoActive ? 'var(--c-secondary)' : 'var(--c-border-faint)'),
              borderRadius: 'var(--r-pill)',
              cursor: onToggleAutoActive ? 'pointer' : 'default',
              color: autoActive ? 'var(--c-secondary)' : 'var(--c-text-dim)',
              fontFamily: 'var(--ff-display)',
              fontSize: 9.5,
              fontWeight: 'var(--fw-semibold)',
              letterSpacing: 'var(--ls-loose)',
              textTransform: 'uppercase',
              boxShadow: autoActive ? 'var(--glow-purple-sm)' : 'none',
              transition: 'all var(--mo-fast) var(--ease-out)',
              userSelect: 'none',
              whiteSpace: 'nowrap',
            },
          },
          autoActive ? 'AUTO' : 'MANUAL'
        )
      )
    ),

    // ===== Row 2: small controls =====
    React.createElement(
      'div',
      {
        style: {
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '0 14px 12px',
          minHeight: 36,
        },
      },

      // Screws
      React.createElement(
        'div',
        {
          style: {
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            padding: '6px 10px',
            background: 'var(--c-bg-base)',
            border: '1px solid var(--c-border-faint)',
            borderRadius: 'var(--r-pill)',
            flex: 1,
            minWidth: 0,
          },
        },
        React.createElement(
          'span',
          {
            style: {
              color: 'var(--c-screw)',
              display: 'inline-flex',
              filter: 'drop-shadow(0 0 3px rgba(200,212,232,0.5))',
            },
          },
          React.createElement(Icon, { name: 'screw', size: 14 })
        ),
        React.createElement(NumericDisplay, {
          value: screws,
          size: 'sm',
          accentColor: 'text',
          style: { fontSize: 13, fontWeight: 'var(--fw-semibold)' },
        })
      ),

      // Speed
      React.createElement(
        'button',
        {
          type: 'button',
          onClick: onSpeedToggle,
          style: {
            height: 32,
            minWidth: 40,
            padding: '0 8px',
            flex: 'none',
            background: 'var(--c-bg-base)',
            border: '1px solid var(--c-border)',
            borderRadius: 'var(--r-s)',
            cursor: 'pointer',
            color: 'var(--c-text)',
            fontFamily: 'var(--ff-numeric)',
            fontSize: 12,
            fontWeight: 'var(--fw-semibold)',
            letterSpacing: 'var(--ls-num)',
          },
          'aria-label': '速度 ' + speed + ' → ' + SPEED_NEXT[speed],
        },
        speed
      ),

      // Pause
      React.createElement(IconButton, {
        icon: paused ? 'play' : 'pause',
        label: paused ? '再開' : '一時停止',
        variant: paused ? 'primary' : 'ghost',
        size: 'sm',
        onClick: onPauseToggle,
      }),

      // Menu
      React.createElement(IconButton, {
        icon: 'menu',
        label: 'メニュー',
        variant: 'ghost',
        size: 'sm',
        onClick: onMenu,
      }),

      // Screen saver
      React.createElement(IconButton, {
        icon: 'ice',
        label: 'スクリーンセーバー',
        variant: 'ghost',
        size: 'sm',
        onClick: onScreenSaver,
      })
    )
  );
}
