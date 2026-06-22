import styles from './style.module.scss';

import { Icon } from '@/components/atoms/Icon';
import { ProgressBar } from '@/components/atoms/ProgressBar';
import { Text } from '@/components/atoms/Text';

// ---------------------------------------------------------------------------
// 型定義
// ---------------------------------------------------------------------------

export type WaveMilestoneKind = 'elite' | 'boss' | 'tier-up';

export interface WaveMilestone {
  wave: number;
  kind: WaveMilestoneKind;
}

export type WaveProgressBarSize = 'sm' | 'md' | 'lg';

export interface WaveProgressBarProps {
  waveNumber: number;
  secondsLeft: number;
  secondsMax: number;
  nextMilestone?: WaveMilestone;
  showSeconds?: boolean;
  size?: WaveProgressBarSize;
}

// ---------------------------------------------------------------------------
// マイルストーン設定
// ---------------------------------------------------------------------------

const MILESTONE_CONFIG: Record<
  WaveMilestoneKind,
  { label: string; color: string; iconName: 'skull' | 'lightning' | 'spark' }
> = {
  elite: { label: 'ELITE', color: 'var(--c-warning)', iconName: 'lightning' },
  boss: { label: 'BOSS', color: 'var(--c-secondary)', iconName: 'skull' },
  'tier-up': { label: 'TIER UP', color: 'var(--c-primary)', iconName: 'spark' },
};

const SIZE_FONT: Record<WaveProgressBarSize, string> = {
  sm: 'var(--fs-label)',
  md: 'var(--fs-caption)',
  lg: 'var(--fs-body)',
};

// ---------------------------------------------------------------------------
// コンポーネント
// ---------------------------------------------------------------------------

export function WaveProgressBar({
  waveNumber,
  secondsLeft,
  secondsMax,
  nextMilestone,
  showSeconds = true,
  size = 'md',
}: WaveProgressBarProps) {
  const isBoss = nextMilestone?.kind === 'boss';
  const milestone = nextMilestone != null ? MILESTONE_CONFIG[nextMilestone.kind] : null;

  return (
    <div
      className={[styles.root, styles[`size-${size}`], isBoss ? styles.boss : '']
        .filter(Boolean)
        .join(' ')}
    >
      {/* 上行: Wave 番号 + マイルストーン + 残り秒数 */}
      <div className={styles.header}>
        {/* Wave 番号 */}
        <span
          className={styles.waveLabel}
          style={{ fontSize: SIZE_FONT[size] }}
        >
          WAVE <span className={styles.waveNum}>{waveNumber}</span>
        </span>

        {/* 次マイルストーン */}
        {milestone != null && nextMilestone != null && (
          <span
            className={styles.milestone}
            style={{ color: milestone.color }}
          >
            <Icon
              name={milestone.iconName}
              size={12}
              color={milestone.color}
            />
            <span className={styles.milestoneText}>
              {milestone.label} @{nextMilestone.wave}
            </span>
          </span>
        )}

        {/* 残り秒数 */}
        {showSeconds && (
          <span className={styles.seconds}>
            <Text
              variant="numeric-s"
              color="mid"
            >
              {secondsLeft}s
            </Text>
          </span>
        )}
      </div>

      {/* 残量バー（right→left で減る: reverse） */}
      <ProgressBar
        value={secondsLeft}
        max={Math.max(1, secondsMax)}
        color={isBoss ? 'secondary' : 'wave'}
        size={size === 'lg' ? 'md' : 'sm'}
        glow={isBoss}
      />
    </div>
  );
}
