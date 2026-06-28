import type { CSSProperties } from 'react';
import { useMemo } from 'react';

import styles from './style.module.scss';

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
 *
 * Issue #87: @keyframes は SCSS module に静的定義、 インスタンス固有値は
 * CSS 変数で渡す。 SVG path (ジグザグ d 属性) はマウント時に乱数生成する性質上
 * 動的のままだが、 これは attribute なので CSS パーサ負荷とは無関係。
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

  const flashStyle: CSSProperties = {
    ['--thn-x' as string]: `${x}%`,
    ['--thn-y' as string]: `${y}%`,
    ['--thn-color' as string]: color,
    ['--thn-strike-duration' as string]: `${strikeMs}ms`,
    ['--thn-flash-duration' as string]: `${flashMs}ms`,
  };
  // bolt / boltGlow のアニメ時間は SCSS 側で var(--thn-strike-duration) を参照するため、
  // SVG の親要素 (= flash と同じ wrapper にしたいが構造上分かれている) に変数を持たせる。
  // ここでは svg 自体と flash 双方に変数を継承させるため fragment 外側にスタイルは不要、
  // それぞれ自分の親 chain から var() で参照する。 簡単のため SVG にも同じ style を当てる。

  return (
    <>
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className={styles.svg}
        style={flashStyle}
      >
        {/* v1.3.9: drop-shadow を撤去 (iOS Safari GPU compositor 主因)。
            Thunder 攻撃ごとに 320ms × 多数体ヒット分発火するため発熱寄与が極めて大きかった。
            boltGlow (半透明太 stroke) + flash で「光った落雷」 の印象を維持。 */}
        <path
          className={styles.boltGlow}
          d={path}
          fill="none"
          stroke={color}
          strokeWidth={2.4}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={300}
          style={{ opacity: 0.5 }}
        />
        <path
          className={styles.bolt}
          d={path}
          fill="none"
          stroke="#fff"
          strokeWidth={0.7}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={300}
        />
      </svg>
      <div
        className={styles.flash}
        style={flashStyle}
        onAnimationEnd={onDone}
      />
    </>
  );
}
