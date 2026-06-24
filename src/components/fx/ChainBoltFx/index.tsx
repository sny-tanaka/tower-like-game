import type { CSSProperties } from 'react';
import { useMemo } from 'react';

import styles from './style.module.scss';

export interface ChainBoltFxPoint {
  x: number;
  y: number;
}

export interface ChainBoltFxProps {
  /** 連鎖経路の % 座標配列 (親内座標、 2 点以上必須) */
  points: ChainBoltFxPoint[];
  /** 電撃色 (default: var(--c-primary)) */
  color?: string;
  /** 1 セグメントあたりの ms (default 90) */
  segmentMs?: number;
  /** ジグザグ振幅 (default 2.2) */
  jaggedness?: number;
  /** 1 セグメントあたりの分割数 (default 4) */
  subdivisions?: number;
  /** アニメ開始遅延 ms (default 0)。 着弾後に連鎖を遅らせたい用途で使う */
  delayMs?: number;
  /** アニメ完了通知 */
  onDone?: () => void;
}

/**
 * ChainBoltFx — Thunder 連鎖電撃 (ジグザグした稲妻が順次連鎖する敵に飛ぶ)。
 *
 * points: [{x, y}, ...] のチェイン経路 (%, 親内座標)。
 * 各セグメントは直線ではなく、 subdivisions 分割 + 垂直方向ランダムオフセットで
 * 雷らしいジグザグに分割される。
 *
 * 外側 glow + 内側 white core の 2 重ストロークで描画。
 *
 * Issue #87: @keyframes は SCSS module に静的定義、 duration / delay は
 * CSS 変数で渡す。 SVG path の d 属性は乱数生成のため動的のまま (= CSS 負荷外)。
 */
export function ChainBoltFx({
  points,
  color = 'var(--c-primary)',
  segmentMs = 90,
  jaggedness = 2.2,
  subdivisions = 4,
  delayMs = 0,
  onDone,
}: ChainBoltFxProps) {
  // points が空 / 1 点だけのときは何も描画しない
  const isValid = points.length >= 2;

  // 各セグメント (P_i → P_{i+1}) を subdivisions 分割し、 垂直方向にランダムオフセット
  const d = useMemo(() => {
    if (!isValid) return '';
    const all: { x: number; y: number }[] = [];
    for (let i = 0; i < points.length - 1; i++) {
      const a = points[i]!;
      const b = points[i + 1]!;
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const len = Math.hypot(dx, dy) || 1;
      const nx = -dy / len;
      const ny = dx / len;
      if (i === 0) all.push(a);
      for (let j = 1; j < subdivisions; j++) {
        const t = j / subdivisions;
        const mx = a.x + dx * t;
        const my = a.y + dy * t;
        const off = (Math.random() - 0.5) * 2 * jaggedness;
        all.push({ x: mx + nx * off, y: my + ny * off });
      }
      all.push(b);
    }
    return all.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(2)} ${p.y.toFixed(2)}`).join(' ');
    // 初回マウント時のみ計算
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isValid) return null;

  const total = (points.length - 1) * segmentMs + 200;

  const svgStyle: CSSProperties = {
    ['--chn-duration' as string]: `${total}ms`,
    ['--chn-delay' as string]: `${delayMs}ms`,
  };

  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className={styles.svg}
      style={svgStyle}
      onAnimationEnd={onDone}
    >
      {/* 外側 glow */}
      <path
        className={styles.path}
        d={d}
        fill="none"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={300}
        style={{ filter: `drop-shadow(0 0 3px ${color})`, opacity: 0.5 }}
      />
      {/* 内側コア (白) */}
      <path
        className={styles.path}
        d={d}
        fill="none"
        stroke="#fff"
        strokeWidth={0.55}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={300}
        style={{ filter: `drop-shadow(0 0 1.5px ${color}) drop-shadow(0 0 3px ${color})` }}
      />
    </svg>
  );
}
