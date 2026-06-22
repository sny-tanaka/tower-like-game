export type WeaponKind = 'laser' | 'cannon' | 'thunder' | 'cutter';

export interface LaunchButtonProps {
  /** 選択中 Tier */
  tier?: number;
  /** 選択中武器 */
  weaponKind?: WeaponKind;
  /** 装着パッチ数 */
  patchCount?: number;
  disabled?: boolean;
  onLaunch?: () => void;
  /** sticky 配置 (default true) */
  sticky?: boolean;
}

export declare function LaunchButton(props: LaunchButtonProps): JSX.Element;
