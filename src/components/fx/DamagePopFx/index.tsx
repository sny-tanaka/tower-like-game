import type { CSSProperties } from 'react';

import styles from './style.module.scss';

import { NumericDisplay } from '@/components/atoms/NumericDisplay';

export interface DamagePopFxProps {
  /** 表示ダメージ数値 */
  value: number;
  /** 親内パーセント座標 X (0–100) */
  x: number;
  /** 親内パーセント座標 Y (0–100) */
  y: number;
  /** クリティカル表示: 大きめ + warning 色 */
  crit?: boolean;
  /** アニメ時間 ms (default 800) */
  duration?: number;
  /** アニメ完了時に親へ通知 */
  onDone?: () => void;
}

/**
 * DamagePopFx — 敵被弾位置に数値がポップしてフェードアウト。
 * crit=true でクリティカル強調表示（大きめ + warning 色）。
 *
 * Issue #87: @keyframes は SCSS module に静的定義し、 インスタンス固有値
 * (位置 / duration) のみ CSS 変数で渡す。 撃破ラッシュで数十個の
 * <style> タグが DOM に追加されるのを防ぐ。
 */
export function DamagePopFx({
  value,
  x,
  y,
  crit = false,
  duration = 800,
  onDone,
}: DamagePopFxProps) {
  const rootStyle: CSSProperties = {
    ['--pop-x' as string]: `${x}%`,
    ['--pop-y' as string]: `${y}%`,
    ['--pop-duration' as string]: `${duration}ms`,
  };

  return (
    <div
      className={`${styles.root} ${crit ? styles.crit : ''}`}
      style={rootStyle}
      onAnimationEnd={onDone}
    >
      <NumericDisplay
        value={value}
        size={crit ? 'lg' : 'md'}
        accentColor={crit ? 'warning' : 'scale'}
        glow
        style={crit ? { fontSize: 22, fontWeight: 700 } : { fontSize: 16, fontWeight: 600 }}
      />
    </div>
  );
}
