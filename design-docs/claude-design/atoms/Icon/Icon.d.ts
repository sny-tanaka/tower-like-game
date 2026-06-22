export type IconName =
  // currency
  | 'screw'
  | 'bolt'
  | 'alloy'
  // weapon
  | 'laser'
  | 'cannon'
  | 'thunder'
  | 'cutter'
  // ui
  | 'close'
  | 'menu'
  | 'settings'
  | 'play'
  | 'pause'
  | 'chevron-right'
  | 'chevron-left'
  | 'chevron-down'
  | 'chevron-up'
  | 'plus'
  | 'minus'
  | 'check'
  | 'info'
  | 'arrow-up'
  // game
  | 'tower'
  | 'shield'
  | 'heart'
  | 'flame'
  | 'ice'
  | 'lightning'
  | 'skull'
  | 'spark'
  | 'target';

export interface IconProps {
  /** アイコン名 */
  name: IconName;
  /** 一辺の px (default 20) */
  size?: number;
  /** 色。未指定なら currentColor */
  color?: string;
  /** stroke 太さ */
  strokeWidth?: number;
}

export declare function Icon(props: IconProps): JSX.Element;
export declare namespace Icon {
  const names: string[];
}
