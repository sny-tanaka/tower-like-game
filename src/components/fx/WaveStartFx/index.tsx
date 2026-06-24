import type { CSSProperties } from 'react';

import styles from './style.module.scss';

import { Text } from '@/components/atoms/Text';

export interface WaveStartFxProps {
  /** 表示するウェーブ番号 */
  waveNumber: number;
  /** アニメーション時間 ms（デフォルト: 1100） */
  duration?: number;
  /** アニメーション完了コールバック */
  onDone?: () => void;
}

/**
 * WaveStartFx — ウェーブ開始時にウェーブ番号がスライドインするバナー Fx。
 *
 * 画面上部 26% 付近に中央揃えで表示し、左から右へ流れてフェードアウトする。
 * `prefers-reduced-motion` 時はアニメーション無効で静止表示。
 *
 * Issue #87: @keyframes は SCSS module に静的定義、 duration は CSS 変数で渡す。
 */
export function WaveStartFx({ waveNumber, duration = 1100, onDone }: WaveStartFxProps) {
  const wrapStyle: CSSProperties = {
    ['--wv-duration' as string]: `${duration}ms`,
  };

  return (
    <div
      className={styles.wrap}
      style={wrapStyle}
      onAnimationEnd={onDone}
    >
      <div className={styles.badge}>
        <Text
          variant="label"
          color="primary"
          style={{ fontSize: 11 }}
        >
          WAVE
        </Text>
        <Text
          variant="numeric-l"
          color="primary"
          style={{ fontSize: 24, fontWeight: 700 }}
        >
          {String(waveNumber)}
        </Text>
      </div>
    </div>
  );
}
