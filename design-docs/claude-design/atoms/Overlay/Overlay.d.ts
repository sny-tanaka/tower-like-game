export type OverlayDim = 'soft' | 'normal' | 'heavy';
export type OverlayAlign = 'center' | 'top' | 'bottom';
export type OverlayZ = 'sheet' | 'dialog' | 'overlay' | 'toast' | number | string;

export interface OverlayProps {
  /** ディム強度 */
  dimLevel?: OverlayDim;
  /** backdrop blur 量 px */
  blur?: number;
  /** 背景タップで onClose */
  dismissible?: boolean;
  align?: OverlayAlign;
  /** z-index token 名 or 直接値 */
  zIndex?: OverlayZ;
  /** position:fixed (default) / absolute */
  fullscreen?: boolean;
  onClose?: () => void;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export declare function Overlay(props: OverlayProps): JSX.Element;
