/**
 * Badge — タグ / バッジ Atom
 *
 * variant:
 *   tier        Tier N (1-10+) を表示。背景色は --c-tier-N、cyan→magenta 段階色
 *   patch-tier  パッチ Tier (1-5)。背景は --c-patch-tN
 *   elite       エリート敵バッジ（warning）
 *   boss        ボス敵バッジ（danger）
 *   info        primary 縁取り（情報タグ）
 *   success     success 縁取り（達成タグ）
 *   warning     warning 縁取り
 *   danger      danger 縁取り
 *   neutral     surface 系（在庫数など中立タグ）
 *
 * size: 'sm' (16) / 'md' (20) / 'lg' (24) px
 * variant=tier の場合は tier (1..) を渡す。10 超で T10+ にクランプ
 */
function clamp(v, lo, hi) {
  return Math.max(lo, Math.min(hi, v));
}

const SIZE_MAP = {
  sm: { h: 16, px: 6, fs: 9.5, gap: 3 },
  md: { h: 20, px: 8, fs: 11, gap: 4 },
  lg: { h: 24, px: 10, fs: 12, gap: 5 },
};

function tierColor(t) {
  const i = clamp(t, 1, 10);
  return `var(--c-tier-${i})`;
}
function patchTierColor(t) {
  const i = clamp(t, 1, 5);
  return `var(--c-patch-t${i})`;
}

export function Badge(props) {
  const {
    text,
    variant = 'neutral',
    size = 'md',
    tier = 1,
    glow: glowProp,
    iconLeft = null,
  } = props;

  const s = SIZE_MAP[size] || SIZE_MAP.md;

  let bg, color, border, glow;
  const glowEnabled = glowProp != null ? glowProp : false;
  switch (variant) {
    case 'tier': {
      const c = tierColor(tier);
      bg = 'transparent';
      color = c;
      border = `1px solid ${c}`;
      glow = glowEnabled ? `0 0 6px ${c}` : 'none';
      break;
    }
    case 'patch-tier': {
      const c = patchTierColor(tier);
      bg = 'transparent';
      color = c;
      border = `1px solid ${c}`;
      glow = glowEnabled ? `0 0 6px ${c}` : 'none';
      break;
    }
    case 'elite':
      bg = 'rgba(246,185,74,0.12)';
      color = 'var(--c-warning)';
      border = '1px solid var(--c-warning)';
      glow = glowEnabled ? '0 0 6px rgba(246,185,74,0.55)' : 'none';
      break;
    case 'boss':
      bg = 'rgba(255,77,109,0.14)';
      color = 'var(--c-danger)';
      border = '1px solid var(--c-danger)';
      glow = glowEnabled ? '0 0 8px rgba(255,77,109,0.55)' : 'none';
      break;
    case 'info':
      bg = 'rgba(78,228,246,0.08)';
      color = 'var(--c-primary)';
      border = '1px solid var(--c-primary)';
      glow = glowEnabled ? 'var(--glow-cyan-sm)' : 'none';
      break;
    case 'success':
      bg = 'rgba(70,226,160,0.10)';
      color = 'var(--c-success)';
      border = '1px solid var(--c-success)';
      glow = glowEnabled ? '0 0 6px rgba(70,226,160,0.55)' : 'none';
      break;
    case 'warning':
      bg = 'rgba(246,185,74,0.10)';
      color = 'var(--c-warning)';
      border = '1px solid var(--c-warning)';
      glow = glowEnabled ? '0 0 6px rgba(246,185,74,0.55)' : 'none';
      break;
    case 'danger':
      bg = 'rgba(255,77,109,0.10)';
      color = 'var(--c-danger)';
      border = '1px solid var(--c-danger)';
      glow = glowEnabled ? '0 0 6px rgba(255,77,109,0.55)' : 'none';
      break;
    case 'neutral':
    default:
      bg = 'var(--c-surface)';
      color = 'var(--c-text-mid)';
      border = '1px solid var(--c-border)';
      glow = 'none';
      break;
  }

  let displayText = text;
  if (variant === 'tier') {
    const i = clamp(tier, 1, 10);
    displayText = text != null ? text : 'T' + tier + (tier > 10 ? '' : '');
    if (text == null && tier > 10) displayText = 'T' + tier;
    if (text == null) displayText = 'T' + tier;
  } else if (variant === 'patch-tier') {
    displayText = text != null ? text : 'T' + clamp(tier, 1, 5);
  }

  const style = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: s.gap + 'px',
    height: s.h + 'px',
    padding: '0 ' + s.px + 'px',
    background: bg,
    color,
    border,
    borderRadius: 'var(--r-pill)',
    fontFamily: 'var(--ff-display)',
    fontSize: s.fs + 'px',
    fontWeight: 'var(--fw-semibold)',
    letterSpacing: 'var(--ls-loose)',
    textTransform: 'uppercase',
    boxShadow: glow,
    whiteSpace: 'nowrap',
    lineHeight: 1,
  };

  return React.createElement('span', { style, 'data-variant': variant }, iconLeft, displayText);
}
