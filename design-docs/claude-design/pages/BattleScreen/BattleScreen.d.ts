import type { BattleHudTopProps } from '../../organisms/BattleHudTop/BattleHudTop';
import type { BattleHudBottomProps } from '../../organisms/BattleHudBottom/BattleHudBottom';
import type { BattleFieldEnemy } from '../../organisms/BattleField/BattleField';
import type { RunWorkshopItem } from '../../organisms/RunWorkshopBottomSheet/RunWorkshopBottomSheet';
import type {
  ResultDialogStats,
  ResultDialogRewards,
  ResultKind,
} from '../../organisms/ResultDialog/ResultDialog';

export type WeaponKind = 'laser' | 'cannon' | 'thunder' | 'cutter';

export interface BattleScreenProps {
  hp: { current: number; max: number };
  shield?: { current: number; max: number };
  tier: number;
  wave: BattleHudTopProps['wave'];
  damaging?: boolean;
  enemies?: BattleFieldEnemy[];
  weapon?: WeaponKind;
  cutterRadiusPct?: number;
  screws?: number;
  weapons?: BattleHudBottomProps['weapons'];
  activeWeapon?: WeaponKind;
  swapDisabled?: boolean;
  activeSkill?: BattleHudBottomProps['activeSkill'];
  speed?: BattleHudBottomProps['speed'];
  paused?: boolean;
  autoActive?: boolean;
  onWeaponSelect?: (k: WeaponKind) => void;
  onActiveSkill?: () => void;
  onToggleAutoActive?: () => void;
  onSpeedToggle?: () => void;
  onPauseToggle?: () => void;
  workshopOpen?: boolean;
  workshopItems?: RunWorkshopItem[];
  onWorkshopBuy?: (id: string, amount: string) => void;
  onWorkshopClose?: () => void;
  onSheetHandlePointerDown?: (e: React.PointerEvent) => void;
  sheetDragging?: boolean;
  menuOpen?: boolean;
  onOpenMenu?: () => void;
  onCloseMenu?: () => void;
  onRetreat?: () => void;
  bgm?: number;
  se?: number;
  onBgmChange?: (v: number) => void;
  onSeChange?: (v: number) => void;
  resultOpen?: boolean;
  resultKind?: ResultKind;
  resultStats?: ResultDialogStats;
  resultRewards?: ResultDialogRewards;
  onResultPreparation?: () => void;
  screenSaverOpen?: boolean;
  onScreenSaverDismiss?: () => void;
  onOpenScreenSaver?: () => void;
}

export declare function BattleScreen(props: BattleScreenProps): JSX.Element;
