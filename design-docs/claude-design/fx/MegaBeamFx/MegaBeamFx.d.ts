export interface MegaBeamFxProps {
  x?: number;
  y?: number;
  /** 度数法 (0=右) */
  angle?: number;
  duration?: number;
  color?: string;
  onDone?: () => void;
}
export declare function MegaBeamFx(props: MegaBeamFxProps): JSX.Element;
