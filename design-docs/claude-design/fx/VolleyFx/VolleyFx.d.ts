export interface VolleyFxProps {
  x?: number;
  y?: number;
  count?: number;
  /** 拡散角 (度)。default 360 = 全方位 (count 等分) */
  spreadDeg?: number;
  /** 飛距離 (vmin) */
  range?: number;
  duration?: number;
  color?: string;
  onDone?: () => void;
}
export declare function VolleyFx(props: VolleyFxProps): JSX.Element;
