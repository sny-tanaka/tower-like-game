export interface EnemyDeathFxProps {
  x?: number;
  y?: number;
  /** パーティクル色 (CSS) */
  color?: string;
  duration?: number;
  onDone?: () => void;
}
export declare function EnemyDeathFx(props: EnemyDeathFxProps): JSX.Element;
