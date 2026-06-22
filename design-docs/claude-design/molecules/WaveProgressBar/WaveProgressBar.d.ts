export interface WaveMilestone {
  wave: number;
  kind: 'boss' | 'elite' | 'tier-up';
}

export interface WaveProgressBarProps {
  /** 現在のウェーブ番号 */
  waveNumber: number;
  /** 残り秒数 */
  secondsLeft: number;
  /** 1 ウェーブの最大秒数 */
  secondsMax: number;
  /** 次に到来するマイルストーン */
  nextMilestone?: WaveMilestone;
  showSeconds?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export declare function WaveProgressBar(props: WaveProgressBarProps): JSX.Element;
