/**
 * WeaponSlotIcon — バトル下 HUD の武器スロット 1 枚
 *
 * 構成: CircularProgress(CD) + Icon(weapon)
 *   - ready=true なら外周リング glow + アイコン明色
 *   - active=true なら中央背景 primary-bg
 *   - swapDisabled (切替 CD 中) は dim + disabled
 *
 * Atomic Design: Atom(Icon + CircularProgress) を 1 機能にまとめた Molecule。
 * 状態は外から渡す（Organism / Store 管理）。
 */
export function WeaponSlotIcon(props) {
  const {
    weapon, // 'laser' | 'cannon' | 'thunder' | 'cutter'
    active = false,
    ready = true, // 武器単体の通常 CD が完了したか（攻撃 ready）
    cdProgress = 100, // 0..100 (100 で ready)
    swapDisabled = false, // 切替 CD 中 = 全スロット dim
    size = 'md', // 'sm' (40) / 'md' (52) / 'lg' (64)
    onClick,
  } = props;

  const sizeMap = {
    sm: { box: 40, ring: 36, ringThick: 2.5, icon: 20 },
    md: { box: 52, ring: 48, ringThick: 3, icon: 26 },
    lg: { box: 64, ring: 60, ringThick: 3.5, icon: 32 },
  };
  const s = sizeMap[size] || sizeMap.md;
  const { Icon, CircularProgress } = window.TowerLikeGame_28197d;

  const iconColor = swapDisabled
    ? 'var(--c-text-disabled)'
    : ready
      ? 'var(--c-primary)'
      : 'var(--c-text-mid)';

  const containerStyle = {
    position: 'relative',
    width: s.box + 'px',
    height: s.box + 'px',
    background: active ? 'var(--c-primary-bg)' : 'transparent',
    border: active ? '1px solid var(--c-primary)' : '1px solid var(--c-border)',
    borderRadius: '50%',
    cursor: swapDisabled ? 'not-allowed' : 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: active && ready ? 'var(--glow-cyan-md)' : 'none',
    opacity: swapDisabled ? 0.55 : 1,
    transition: 'box-shadow var(--mo-fast) var(--ease-out), opacity var(--mo-fast) var(--ease-out)',
    userSelect: 'none',
  };

  const ringStyle = {
    position: 'absolute',
    inset: (s.box - s.ring) / 2 + 'px',
    pointerEvents: 'none',
  };

  return React.createElement(
    'button',
    {
      type: 'button',
      'aria-label': weapon + (active ? ' (active)' : ''),
      'aria-pressed': active,
      disabled: swapDisabled,
      onClick: swapDisabled ? undefined : onClick,
      style: containerStyle,
      'data-weapon': weapon,
      'data-active': active,
      'data-ready': ready,
    },
    React.createElement(
      'span',
      { style: ringStyle },
      React.createElement(CircularProgress, {
        value: cdProgress,
        max: 100,
        size: s.ring,
        thickness: s.ringThick,
        color: ready ? 'cd' : 'cd',
        glow: ready && active,
      })
    ),
    React.createElement(
      'span',
      {
        style: {
          color: iconColor,
          display: 'inline-flex',
          filter: ready && active ? 'drop-shadow(var(--glow-cyan-sm))' : 'none',
          transition: 'color var(--mo-fast) var(--ease-out)',
        },
      },
      React.createElement(Icon, { name: weapon, size: s.icon })
    )
  );
}
