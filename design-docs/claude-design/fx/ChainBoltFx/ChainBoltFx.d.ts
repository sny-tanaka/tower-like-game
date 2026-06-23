export interface ChainBoltPoint { x: number; y: number; }
export interface ChainBoltFxProps {
  /** 連鎖経路 (% 座標) */
  points: ChainBoltPoint[];
  color?: string;
  segmentMs?: number;
  onDone?: () => void;
}
export declare function ChainBoltFx(props: ChainBoltFxProps): JSX.Element | null;
