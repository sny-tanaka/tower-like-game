import type { WaveMilestone } from '../../molecules/WaveProgressBar/WaveProgressBar';

export interface BattleHudTopHp {
  current: number;
  max: number;
}

export interface BattleHudTopWave {
  number: number;
  secondsLeft: number;
  secondsMax: number;
  nextMilestone?: WaveMilestone;
}

export interface BattleHudTopProps {
  hp: BattleHudTopHp;
  shield?: BattleHudTopHp | null;
  tier: number;
  wave: BattleHudTopWave;
  /** true で HP バー赤フラッシュ表示 (Fx 連携) */
  damaging?: boolean;
}

export declare function BattleHudTop(props: BattleHudTopProps): JSX.Element;
