export interface LaserBeamFxProps {
  /** ビーム始点 % */
  x1?: number;
  y1?: number;
  /** ビーム終点 % */
  x2?: number;
  y2?: number;
  duration?: number;
  color?: string;
  onDone?: () => void;
}
export declare function LaserBeamFx(props: LaserBeamFxProps): JSX.Element;
