export interface PickupFxProps {
  icon?: string;
  /** 出発点 % */
  x?: number;
  y?: number;
  /** 吸込先 % (HUD 内の通貨表示位置) */
  targetX?: number;
  targetY?: number;
  /** アイコン色 (CSS) */
  color?: string;
  duration?: number;
  onDone?: () => void;
}
export declare function PickupFx(props: PickupFxProps): JSX.Element;
