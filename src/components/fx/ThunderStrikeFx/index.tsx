import { useId, useMemo } from 'react';

export interface ThunderStrikeFxProps {
  /** 着弾点 X % (default 50) */
  x?: number;
  /** 着弾点 Y % (default 60) */
  y?: number;
  /** 落下開始 Y % (default 0 = フィールド上端) */
  fromY?: number;
  /** 全体時間 ms (default 320) */
  duration?: number;
  /** 電撃色 (default var(--c-primary)) */
  color?: string;
  /** ジグザグ折れ数 (default 7) */
  segments?: number;
  /** 折れ幅 % (default 3.5) */
  jaggedness?: number;
  /** flash 完了通知 */
  onDone?: () => void;
}

/**
 * ThunderStrikeFx — Thunder の通常攻撃 (敵の真上から雷が落ちる)
 *
 * (x, y) を着弾点として、 その真上 (fromY) からジグザグの稲妻が一瞬で走り、
 * 着弾点で円形フラッシュ。 着弾後の連鎖は別途 ChainBoltFx で表現する。
 */
export function ThunderStrikeFx({
  x = 50,
  y = 60,
  fromY = 0,
  duration = 320,
  color = 'var(--c-primary)',
  segments = 7,
  jaggedness = 3.5,
  onDone,
}: ThunderStrikeFxProps) {
  const uid = useId().replace(/:/g, '');
  const id = `thn-${uid}`;

  const path = useMemo(() => {
    const pts: { x: number; y: number }[] = [{ x, y: fromY }];
    const totalLen = y - fromY;
    const seg = totalLen / segments;
    for (let i = 1; i < segments; i++) {
      const py = fromY + seg * i;
      const px = x + (Math.random() - 0.5) * 2 * jaggedness;
      pts.push({ x: px, y: py });
    }
    pts.push({ x, y });
    return pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(2)} ${p.y.toFixed(2)}`).join(' ');
    // path は mount 時のみ計算
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const strikeMs = Math.round(duration * 0.35);
  const flashMs = Math.round(duration * 0.65);

  const css = `
    @keyframes ${id}-strike {
      0%   { stroke-dashoffset: 300; opacity: 0; }
      15%  { opacity: 1; }
      40%  { stroke-dashoffset: 0;   opacity: 1; }
      100% { stroke-dashoffset: 0;   opacity: 0; }
    }
    @keyframes ${id}-strike-glow {
      0%   { opacity: 0; }
      20%  { opacity: 0.6; }
      100% { opacity: 0; }
    }
    @keyframes ${id}-flash {
      0%   { transform: translate(-50%, -50%) scale(0.2); opacity: 0; }
      30%  { transform: translate(-50%, -50%) scale(1);   opacity: 1; }
      100% { transform: translate(-50%, -50%) scale(1.4); opacity: 0; }
    }
    .${id}-bolt { animation: ${id}-strike ${strikeMs}ms var(--ease-out) both; }
    .${id}-bolt-glow { animation: ${id}-strike-glow ${strikeMs}ms var(--ease-out) both; }
    .${id}-flash {
      position: absolute; left: ${x}%; top: ${y}%;
      width: 8vmin; height: 8vmin; border-radius: 50%;
      background: radial-gradient(circle, #fff 0%, ${color} 30%, transparent 70%);
      box-shadow: 0 0 20px ${color}, 0 0 40px ${color}88;
      animation: ${id}-flash ${flashMs}ms ${strikeMs}ms var(--ease-out) both;
      pointer-events: none;
      z-index: var(--z-fx-field);
    }
    .${id}-svg {
      position: absolute; inset: 0; width: 100%; height: 100%;
      pointer-events: none;
      z-index: var(--z-fx-field);
    }
    @media (prefers-reduced-motion: reduce) {
      .${id}-bolt, .${id}-bolt-glow, .${id}-flash { animation-duration: 1ms; opacity: 0; }
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className={`${id}-svg`}
      >
        <path
          className={`${id}-bolt-glow`}
          d={path}
          fill="none"
          stroke={color}
          strokeWidth={2.4}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={300}
          style={{ filter: `drop-shadow(0 0 3px ${color})`, opacity: 0.5 }}
        />
        <path
          className={`${id}-bolt`}
          d={path}
          fill="none"
          stroke="#fff"
          strokeWidth={0.7}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={300}
          style={{ filter: `drop-shadow(0 0 2px ${color}) drop-shadow(0 0 4px ${color})` }}
        />
      </svg>
      <div
        className={`${id}-flash`}
        onAnimationEnd={onDone}
      />
    </>
  );
}
