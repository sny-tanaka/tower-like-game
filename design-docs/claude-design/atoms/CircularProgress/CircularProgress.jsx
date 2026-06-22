/**
 * CircularProgress — 円弧プログレス Atom（武器 CD 表示が主用途）
 *
 * value / max: 進捗 (0..max)
 * size:       径 px (default 32)
 * thickness:  リング太さ px (default 3)
 * color:      'cd' / 'wave' / 'hp' / 'primary' / 'secondary' / 'warning' / 'danger' / 任意 CSS 値
 * variant:    'fill'   (CD 用、進捗が増えるほど埋まる)
 *             'drain'  (残量。進捗が減るほど埋まる方向は同じだが startAngle 違い)
 * reverse:    true で時計回り→反時計回り
 * showLabel:  中央にラベル（'%' or children）
 * glow:       true で外側に淡いグロー
 *
 * 12 時方向起点、時計回りが既定。
 */
const COLOR_MAP = {
  cd: 'var(--c-cd)',
  wave: 'var(--c-wave)',
  hp: 'var(--c-hp)',
  primary: 'var(--c-primary)',
  secondary: 'var(--c-secondary)',
  warning: 'var(--c-warning)',
  danger: 'var(--c-danger)',
  success: 'var(--c-success)',
};

const GLOW_MAP = {
  cd: 'var(--glow-cyan-sm)',
  wave: 'var(--glow-purple-sm)',
  primary: 'var(--glow-cyan-sm)',
  secondary: 'var(--glow-purple-sm)',
};

export function CircularProgress(props) {
  const {
    value,
    max = 100,
    size = 32,
    thickness = 3,
    color = 'cd',
    reverse = false,
    showLabel = false,
    label,
    glow = false,
    children,
  } = props;

  const pct = Math.max(0, Math.min(1, value / max));
  const stroke = COLOR_MAP[color] || color;
  const glowShadow = glow ? GLOW_MAP[color] || '0 0 6px currentColor' : 'none';

  const r = (size - thickness) / 2;
  const cx = size / 2;
  const cy = size / 2;
  const circumference = 2 * Math.PI * r;
  // dashoffset で時計回り表示
  const dashOffset = circumference * (1 - pct);

  const svg = React.createElement(
    'svg',
    {
      width: size,
      height: size,
      viewBox: `0 0 ${size} ${size}`,
      style: {
        display: 'block',
        transform: reverse ? 'scaleX(-1) rotate(-90deg)' : 'rotate(-90deg)',
        filter: glow ? `drop-shadow(${glowShadow})` : 'none',
      },
    },
    React.createElement('circle', {
      cx,
      cy,
      r,
      stroke: 'var(--c-bg-base)',
      strokeWidth: thickness,
      fill: 'none',
    }),
    React.createElement('circle', {
      cx,
      cy,
      r,
      stroke,
      strokeWidth: thickness,
      fill: 'none',
      strokeLinecap: 'round',
      strokeDasharray: circumference.toFixed(2),
      strokeDashoffset: dashOffset.toFixed(2),
      style: { transition: 'stroke-dashoffset var(--mo-fast) var(--ease-out)' },
    })
  );

  if (!showLabel && !children) {
    return React.createElement(
      'span',
      {
        style: { display: 'inline-block', width: size, height: size },
        'data-circular-progress': true,
      },
      svg
    );
  }

  const labelStyle = {
    position: 'absolute',
    inset: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'var(--ff-numeric)',
    fontWeight: 'var(--fw-semibold)',
    fontSize: Math.max(9, Math.round(size * 0.32)) + 'px',
    color: 'var(--c-text)',
    letterSpacing: 'var(--ls-num)',
    pointerEvents: 'none',
    lineHeight: 1,
  };

  return React.createElement(
    'span',
    {
      style: { display: 'inline-block', position: 'relative', width: size, height: size },
      'data-circular-progress': true,
    },
    svg,
    React.createElement(
      'span',
      { style: labelStyle },
      children != null ? children : label != null ? label : Math.round(pct * 100) + '%'
    )
  );
}
