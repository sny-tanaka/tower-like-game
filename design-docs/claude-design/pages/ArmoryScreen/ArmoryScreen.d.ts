import type { WeaponDetailsInfo } from '../../organisms/WeaponDetailsTab/WeaponDetailsTab';
import type { WeaponLevelUpgradeTabProps } from '../../organisms/WeaponLevelUpgradeTab/WeaponLevelUpgradeTab';

export interface ArmoryScreenProps {
  bolt?: number;
  alloy?: number;
  weapons?: WeaponDetailsInfo[];
  weaponLevel?: {
    level?: number;
    before?: number;
    after?: number;
    statsImpact?: WeaponLevelUpgradeTabProps['statsImpact'];
    options?: WeaponLevelUpgradeTabProps['options'];
    maxed?: boolean;
  };
  onBack?: () => void;
  onBuyWeaponLevel?: (amount: string) => void;
  activeNav?: 'prep' | 'machine' | 'armory' | 'patch' | 'setting';
  onNavChange?: (k: 'prep' | 'machine' | 'armory' | 'patch' | 'setting') => void;
}

export declare function ArmoryScreen(props: ArmoryScreenProps): JSX.Element;
