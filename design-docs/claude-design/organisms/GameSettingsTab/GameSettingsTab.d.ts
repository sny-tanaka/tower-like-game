export type GameSpeedDefault = '1x' | '2x' | '3x' | '5x';

export interface GameSettingsTabProps {
  vibration?: boolean;
  onVibration?: (next: boolean) => void;
  speedDefault?: GameSpeedDefault;
  onSpeedDefault?: (v: GameSpeedDefault) => void;
  showDamageNumbers?: boolean;
  onShowDamageNumbers?: (next: boolean) => void;
  prefersReducedMotion?: boolean;
  onReducedMotion?: (next: boolean) => void;
}

export declare function GameSettingsTab(props: GameSettingsTabProps): JSX.Element;
