export interface BlastFxProps {
  x?: number;
  y?: number;
  /** vmin 単位の爆発半径 (default 12) */
  radius?: number;
  /** CSS 色 (default warning) */
  color?: string;
  duration?: number;
  onDone?: () => void;
}
export declare function BlastFx(props: BlastFxProps): JSX.Element;
