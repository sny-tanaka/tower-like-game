import type { CSSProperties, ReactElement } from 'react';
import { useEffect } from 'react';

import styles from './style.module.scss';

export interface CutterOrbitFxProps {
  /** タワー中心 X % (default 50) */
  cx?: number;
  /** タワー中心 Y % (default 50) */
  cy?: number;
  /**
   * 中心からの長さ（親要素の % — 親は正方形領域を前提）。
   * デフォルト 14 は CUTTER_ORBIT_RANGE_PCT=14 と揃えてあり、当たり判定と完全一致。
   */
  length?: number;
  /** 刃の太さ（親要素の % — 正方形領域前提） (default 2.2) */
  thickness?: number;
  /** 刃の本数 (default 2) */
  blades?: number;
  /** 1 周時間 ms (default 1300) */
  rotateMs?: number;
  /** 回転方向 (default 'cw') */
  direction?: 'cw' | 'ccw';
  /** 刃の色 (default var(--c-primary)) */
  color?: string;
  /** ms 指定で停止 (未指定で無限ループ — Cutter 武器選択中の常時表示用) */
  duration?: number;
  /** duration が指定された場合に duration 経過で呼ばれる */
  onDone?: () => void;
}

/**
 * CutterOrbitFx — Cutter の通常攻撃 (タワーから伸びる回転刃)
 *
 * タワー中心 (cx, cy) から外側 (length) まで「面」で伸びる細長い鋸刃が
 * 周囲をスイープする。 半径方向のセクター全体で当たり判定を持つイメージ。
 *
 * duration 未指定 = 武器選択中の常時表示 (無限ループ)。
 *
 * Issue #87: @keyframes は SCSS module に静的定義、 位置 / サイズ / 速度 /
 * 色は CSS 変数で渡す。 cw/ccw は class で keyframe を分岐。
 */
export function CutterOrbitFx({
  cx = 50,
  cy = 50,
  length = 14,
  thickness = 2.2,
  blades = 2,
  rotateMs = 1300,
  direction = 'cw',
  color = 'var(--c-primary)',
  duration,
  onDone,
}: CutterOrbitFxProps) {
  const dir = direction === 'ccw' ? -1 : 1;

  useEffect(() => {
    if (duration != null && onDone != null) {
      const t = setTimeout(onDone, duration);
      return () => {
        clearTimeout(t);
      };
    }
    return undefined;
  }, [duration, onDone]);

  // 親 .field（正方形）に対する % で配置。 .hub は length*2 角の正方形となり、
  // その中で blade/sweep は hub に対する相対比 (= length / (length*2) = 50%) を使う。
  const bladeHeightPct = (thickness / (length * 2)) * 100;
  const bladeMarginPct = (thickness / (length * 4)) * 100; // = bladeHeightPct / 2

  const hubStyle: CSSProperties = {
    ['--ct-cx' as string]: `${cx}%`,
    ['--ct-cy' as string]: `${cy}%`,
    ['--ct-size' as string]: `${length * 2}%`,
    ['--ct-rotate-ms' as string]: `${rotateMs}ms`,
    ['--ct-trail-ms' as string]: `${Math.round(rotateMs * 0.7)}ms`,
    ['--ct-blade-height' as string]: `${bladeHeightPct}%`,
    ['--ct-blade-margin' as string]: `-${bladeMarginPct}%`,
    ['--ct-color' as string]: color,
  };

  const sawTeeth = (sign: -1 | 1) =>
    'M 10 ' +
    `${sign * 3.5} ` +
    Array.from({ length: 9 }, (_, k) => {
      const baseX = 10 + k * 10;
      return `L ${baseX + 4} ${sign * 8} L ${baseX + 8} ${sign * 3.5} `;
    }).join('');

  const bladeEls: ReactElement[] = [];
  for (let i = 0; i < blades; i++) {
    const angle = (360 / blades) * i;
    const sweepDeg = 30 * dir;
    const rad = (sweepDeg * Math.PI) / 180;
    const sweepEndX = length * Math.cos(rad);
    const sweepEndY = length * Math.sin(rad);
    const sweepPath = `M 0 0 L ${length} 0 A ${length} ${length} 0 0 ${
      sweepDeg > 0 ? 1 : 0
    } ${sweepEndX.toFixed(2)} ${sweepEndY.toFixed(2)} Z`;
    bladeEls.push(
      // sweep (扇形の残光)
      <svg
        key={`sweep-${i}`}
        className={styles.sweep}
        viewBox={`0 0 ${length} ${length}`}
        style={{ transform: `rotate(${angle - sweepDeg}deg)`, transformOrigin: '0 0' }}
        preserveAspectRatio="none"
      >
        <path
          d={sweepPath}
          fill={color}
          opacity={0.18}
        />
      </svg>
    );
    bladeEls.push(
      // 刃本体: 中心から外側に向かう長い鋸刃
      <svg
        key={`blade-${i}`}
        className={styles.blade}
        viewBox="0 -10 100 20"
        style={{ transform: `rotate(${angle}deg)` }}
        preserveAspectRatio="none"
      >
        {/* ベース帯 */}
        <rect
          x={4}
          y={-3.5}
          width={92}
          height={7}
          fill="rgba(0,0,0,0.4)"
          stroke={color}
          strokeWidth={1.2}
        />
        {/* 刃のコア */}
        <rect
          x={6}
          y={-1.5}
          width={88}
          height={3}
          fill={color}
          opacity={0.55}
        />
        {/* 鋸歯 (上) */}
        <path
          d={sawTeeth(-1)}
          fill={color}
          opacity={0.85}
          stroke={color}
          strokeWidth={0.6}
          strokeLinejoin="round"
        />
        {/* 鋸歯 (下) */}
        <path
          d={sawTeeth(1)}
          fill={color}
          opacity={0.85}
          stroke={color}
          strokeWidth={0.6}
          strokeLinejoin="round"
        />
        {/* 中央ハブ */}
        <circle
          cx={2}
          cy={0}
          r={3}
          fill={color}
        />
        <circle
          cx={2}
          cy={0}
          r={1.5}
          fill="#fff"
        />
        {/* 先端スパーク */}
        <polygon
          points="94,0 100,-3 98,0 100,3"
          fill="#fff"
          opacity={0.85}
        />
      </svg>
    );
  }

  return (
    <div
      className={`${styles.hub} ${dir === 1 ? styles.hubCw : styles.hubCcw}`}
      style={hubStyle}
    >
      <div className={styles.orbit} />
      {bladeEls}
    </div>
  );
}
