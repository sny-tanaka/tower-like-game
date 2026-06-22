import type { PatchCardProps } from '../../molecules/PatchCard/PatchCard';
import type { WeaponDetailsInfo } from '../../organisms/WeaponDetailsTab/WeaponDetailsTab';

export type WeaponKind = 'laser' | 'cannon' | 'thunder' | 'cutter';
export type NavKey = 'prep' | 'machine' | 'armory' | 'patch' | 'setting';

export interface PreparationScreenProps {
  currencies?: { screw: number; bolt: number; alloy: number };
  maxTier?: number;
  selectedTier?: number;
  onSelectTier?: (t: number) => void;
  weapons?: WeaponDetailsInfo[];
  selectedWeapon?: WeaponKind;
  onSelectWeapon?: (k: WeaponKind) => void;
  patches?: PatchCardProps[];
  slotCount?: number;
  lockedCount?: number;
  onLaunch?: () => void;
  activeNav?: NavKey;
  onNavChange?: (k: NavKey) => void;
}

export declare function PreparationScreen(props: PreparationScreenProps): JSX.Element;
