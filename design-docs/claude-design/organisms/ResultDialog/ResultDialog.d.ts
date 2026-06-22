export type ResultKind = 'clear' | 'defeat' | 'retreat';

export interface ResultDialogStats {
  tier: number;
  wave: number;
  kills: number;
  durationSec: number;
}

export interface ResultDialogPatch {
  name: string;
  iconName?: string;
  tier: number;
}

export interface ResultDialogRewards {
  bolt: number;
  alloy: number;
  patches?: ResultDialogPatch[];
}

export interface ResultDialogProps {
  open?: boolean;
  kind?: ResultKind;
  stats: ResultDialogStats;
  rewards: ResultDialogRewards;
  onPreparation?: () => void;
}

export declare function ResultDialog(props: ResultDialogProps): JSX.Element | null;
