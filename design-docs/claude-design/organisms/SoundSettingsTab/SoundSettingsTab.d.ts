export interface SoundSettingsTabProps {
  bgm?: number;
  se?: number;
  mute?: boolean;
  onBgm?: (v: number) => void;
  onSe?: (v: number) => void;
  onToggleMute?: (next: boolean) => void;
}

export declare function SoundSettingsTab(props: SoundSettingsTabProps): JSX.Element;
