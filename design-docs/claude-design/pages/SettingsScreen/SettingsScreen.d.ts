export interface SettingsScreenProps {
  sound?: { bgm?: number; se?: number; mute?: boolean };
  game?: {
    vibration?: boolean;
    speedDefault?: '1x' | '2x' | '3x' | '5x';
    showDamageNumbers?: boolean;
    prefersReducedMotion?: boolean;
  };
  onSound?: {
    bgm?: (v: number) => void;
    se?: (v: number) => void;
    mute?: (next: boolean) => void;
  };
  onGame?: {
    vibration?: (next: boolean) => void;
    speedDefault?: (v: '1x' | '2x' | '3x' | '5x') => void;
    showDamageNumbers?: (next: boolean) => void;
    reducedMotion?: (next: boolean) => void;
  };
  onExport?: () => void;
  onImport?: (file: File) => void;
  onReset?: () => void;
  storageInfo?: { usedKb?: number; slots?: number; lastSavedAt?: string };
  onBack?: () => void;
  activeNav?: 'prep' | 'machine' | 'armory' | 'patch' | 'setting';
  onNavChange?: (k: 'prep' | 'machine' | 'armory' | 'patch' | 'setting') => void;
}

export declare function SettingsScreen(props: SettingsScreenProps): JSX.Element;
