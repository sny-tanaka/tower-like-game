export interface ScreenSaverStats {
  tier?: number;
  wave?: number;
  /** 0..100 */
  hpPct?: number;
}

export interface ScreenSaverDialogProps {
  open?: boolean;
  onDismiss?: () => void;
  stats?: ScreenSaverStats;
  /** ドリフト 1 周の秒数 (default 24) */
  cycleSeconds?: number;
}

export declare function ScreenSaverDialog(props: ScreenSaverDialogProps): JSX.Element | null;
