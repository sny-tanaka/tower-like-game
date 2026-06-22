import type { CSSProperties } from 'react';

import styles from './style.module.scss';

import { Badge } from '@/components/atoms/Badge';
import { ProgressBar } from '@/components/atoms/ProgressBar';
import { Text } from '@/components/atoms/Text';

// ---------------------------------------------------------------------------
// 型定義
// ---------------------------------------------------------------------------

export interface WaveProgressBarProps {
  currentWave: number;
  totalWaves: number;
  secondsRemaining: number;
  secondsTotal: number;
  isBossWave?: boolean;
}

// ---------------------------------------------------------------------------
// コンポーネント
// ---------------------------------------------------------------------------

export function WaveProgressBar({
  currentWave,
  totalWaves,
  secondsRemaining,
  secondsTotal,
  isBossWave = false,
}: WaveProgressBarProps) {
  const glowStyle: CSSProperties | undefined = isBossWave
    ? { boxShadow: 'var(--glow-purple-md)' }
    : undefined;

  return (
    <div
      className={[styles.root, isBossWave ? styles.bossWave : ''].filter(Boolean).join(' ')}
      style={glowStyle}
    >
      {/* Wave 番号 + ミレストン */}
      <div className={styles.header}>
        <Badge
          text={`Wave ${currentWave}`}
          variant={isBossWave ? 'boss' : 'default'}
          glow={isBossWave}
        />
        <Text
          variant="caption"
          color="dim"
        >
          {currentWave} / {totalWaves}
        </Text>
        <Text
          variant="numeric-s"
          color={isBossWave ? 'secondary' : 'mid'}
        >
          {secondsRemaining}s
        </Text>
      </div>

      {/* 残り秒数バー */}
      <ProgressBar
        value={secondsRemaining}
        max={Math.max(1, secondsTotal)}
        color={isBossWave ? 'secondary' : 'wave'}
        size="sm"
        glow={isBossWave}
      />
    </div>
  );
}
