export type SpeedToken = '1x' | '2x' | '3x' | '5x';
export type WeaponKind = 'laser' | 'cannon' | 'thunder' | 'cutter';

export interface BattleHudBottomWeapon {
  kind: WeaponKind;
  ready: boolean;
  /** 0..100 (100 で ready) */
  cdProgress: number;
}

export interface BattleHudBottomActiveSkill {
  ready: boolean;
  cdProgress: number;
  weaponKind?: WeaponKind;
}

export interface BattleHudBottomProps {
  screws: number;
  weapons: BattleHudBottomWeapon[];
  activeWeapon?: WeaponKind;
  swapDisabled?: boolean;
  activeSkill?: BattleHudBottomActiveSkill;
  speed?: SpeedToken;
  autoActive?: boolean;
  paused?: boolean;
  sheetDragging?: boolean;
  onWeaponSelect?: (kind: WeaponKind) => void;
  onActiveSkill?: () => void;
  /** アクティブスキル発動モード手動/自動 切替 */
  onToggleAutoActive?: () => void;
  onSpeedToggle?: () => void;
  onPauseToggle?: () => void;
  onMenu?: () => void;
  onScreenSaver?: () => void;
  onSheetHandlePointerDown?: (e: React.PointerEvent) => void;
}

export declare function BattleHudBottom(props: BattleHudBottomProps): JSX.Element;
