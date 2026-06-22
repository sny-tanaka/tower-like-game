export type WeaponKind = 'laser' | 'cannon' | 'thunder' | 'cutter';
export type WeaponSlotSize = 'sm' | 'md' | 'lg';

export interface WeaponSlotIconProps {
  weapon: WeaponKind;
  /** 現在装備中 (発射対象) */
  active?: boolean;
  /** 通常攻撃 CD が完了 (発射可能) */
  ready?: boolean;
  /** CD 進捗 0..100。100 で ready */
  cdProgress?: number;
  /** 武器切替 CD 中（3 秒）= 全スロット操作不可 */
  swapDisabled?: boolean;
  size?: WeaponSlotSize;
  onClick?: () => void;
}

export declare function WeaponSlotIcon(props: WeaponSlotIconProps): JSX.Element;
