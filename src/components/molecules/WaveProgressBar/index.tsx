import { useState, type CSSProperties } from 'react';

import styles from './style.module.scss';

import { Badge } from '@/components/atoms/Badge';
import { Icon } from '@/components/atoms/Icon';
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
  /** テキスト表示用の残り秒数 (showSeconds=true のときのみ使用) */
  secondsLeft: number;
  /** バー満タンから 0 までのアニメーション時間 (秒) */
  secondsMax: number;
  nextMilestone?: WaveMilestone;
  showSeconds?: boolean;
  size?: WaveProgressBarSize;
  /**
   * ゲームの一時停止状態。 true のときバーアニメーションを停止する。
   */
  paused?: boolean;
  /**
   * 現在の wave がボス wave (= tier 最終 wave) かどうか。
   * true のとき時間バーと残秒数を非表示にし、 「BOSS WAVE」 ラベルを出す。
   * (ボス wave はカウントダウンでなくボス撃破で次 tier に進むため)
   */
  isBossWave?: boolean;
}

// ---------------------------------------------------------------------------
// マイルストーン設定
// ---------------------------------------------------------------------------

/**
 * マイルストーン kind ごとの label / icon / 色 class の対応。
 * 色は SCSS Module の class で表現し、 内側 Icon は `currentColor` を継承する。
 * (旧実装は `style={{ color }}` を inline で渡していたが、 v1.3.7 フォローアップで class 化)
 */
const MILESTONE_CONFIG: Record<
  WaveMilestoneKind,
  { label: string; colorClass: string; iconName: 'skull' | 'lightning' | 'spark' }
> = {
  elite: { label: 'ELITE', colorClass: styles.milestoneElite, iconName: 'lightning' },
  boss: { label: 'BOSS', colorClass: styles.milestoneBoss, iconName: 'skull' },
  'tier-up': { label: 'TIER UP', colorClass: styles.milestoneTierUp, iconName: 'spark' },
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
  paused = false,
  isBossWave = false,
}: WaveProgressBarProps) {
  const isBoss = isBossWave || nextMilestone?.kind === 'boss';
  const milestone = nextMilestone != null ? MILESTONE_CONFIG[nextMilestone.kind] : null;
  const safeSecondsMax = Math.max(1, secondsMax);

  return (
    <div
      className={[styles.root, styles[`size-${size}`], isBoss ? styles.boss : '']
        .filter(Boolean)
        .join(' ')}
    >
      {/* 上行: Wave 番号 + マイルストーン + 残り秒数 */}
      <div className={styles.header}>
        {/* Wave 番号 */}
        <Badge
          text={`WAVE ${waveNumber}`}
          variant="tier"
        />

        {/* 次マイルストーン (ボス wave 中は「次」 が無いので表示しない) */}
        {!isBossWave && milestone != null && nextMilestone != null && (
          <span className={`${styles.milestone} ${milestone.colorClass}`}>
            <Icon
              name={milestone.iconName}
              size={12}
            />
            <span className={styles.milestoneText}>
              {milestone.label} @{nextMilestone.wave}
            </span>
          </span>
        )}

        {/* ボス wave のときは「BOSS WAVE」 ラベル (時間バーの代わり) */}
        {isBossWave && (
          <span className={`${styles.milestone} ${styles.milestoneBoss}`}>
            <Icon
              name="skull"
              size={12}
            />
            <span className={styles.milestoneText}>BOSS WAVE</span>
          </span>
        )}

        {/* 残り秒数 (テキスト表示。 ボス wave では出さない) */}
        {showSeconds && !isBossWave && (
          <span className={styles.seconds}>
            <Text
              variant="numeric-s"
              color="mid"
            >
              {Math.ceil(secondsLeft)}s
            </Text>
          </span>
        )}
      </div>

      {/* 残量バー (CSS animation で連続描画)。 ボス wave ではカウントダウンしないので非表示 */}
      {!isBossWave && (
        <div
          className={styles.timerTrack}
          role="progressbar"
          aria-label={`Wave ${waveNumber} timer`}
          aria-valuemin={0}
          aria-valuemax={safeSecondsMax}
          aria-valuenow={Math.max(0, secondsLeft)}
        >
          <AnimatedTimerBar
            key={waveNumber}
            secondsRemaining={secondsLeft}
            secondsMax={safeSecondsMax}
            isBoss={isBoss}
            paused={paused}
          />
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// AnimatedTimerBar: マウント時の残り時間を snapshot で固定し、 CSS animation で連続描画する。
// 親が key を変えると新規マウントされ、 そのときの残り時間で再起動。
// 同じ key の間に親が rerender しても snapshot は変わらないので、 animation は途切れない。
// ---------------------------------------------------------------------------

interface AnimatedTimerBarProps {
  secondsRemaining: number;
  secondsMax: number;
  isBoss: boolean;
  paused: boolean;
}

function AnimatedTimerBar({ secondsRemaining, secondsMax, isBoss, paused }: AnimatedTimerBarProps) {
  // mount 時 1 回だけ計算: 残り時間から initial scale (0〜1) / animation duration を決める。
  // 以後の rerender (秒の更新等) では useState の初期化関数は呼ばれないので snapshot は不変。
  const [snapshot] = useState(() => {
    const initialScale = Math.max(0, Math.min(1, secondsRemaining / secondsMax));
    const durationSec = Math.max(0.01, secondsRemaining);
    return { initialScale, durationSec };
  });

  const className = [
    styles.timerFill,
    isBoss ? styles.timerFillBoss : '',
    paused ? styles.timerFillPaused : '',
  ]
    .filter(Boolean)
    .join(' ');

  // --start-scale を CSS custom property として渡す。 keyframes の from で参照される。
  return (
    <div
      className={className}
      style={
        {
          '--start-scale': snapshot.initialScale,
          animationDuration: `${snapshot.durationSec}s`,
        } as CSSProperties
      }
    />
  );
}
