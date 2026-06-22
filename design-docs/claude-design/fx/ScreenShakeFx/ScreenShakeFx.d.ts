export type ShakeIntensity = 'light' | 'medium' | 'heavy';
export interface ScreenShakeFxProps {
  intensity?: ShakeIntensity;
  duration?: number;
  onDone?: () => void;
  children?: React.ReactNode;
}
export declare function ScreenShakeFx(props: ScreenShakeFxProps): JSX.Element;
