export interface EnemyHitFxProps {
  x?: number;
  y?: number;
  color?: string;
  duration?: number;
  onDone?: () => void;
}
export declare function EnemyHitFx(props: EnemyHitFxProps): JSX.Element;
