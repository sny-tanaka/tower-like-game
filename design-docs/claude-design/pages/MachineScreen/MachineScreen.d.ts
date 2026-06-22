import type { MachineUpgradeListItem } from '../../organisms/MachineUpgradeList/MachineUpgradeList';

export interface MachineScreenProps {
  bolt?: number;
  items?: MachineUpgradeListItem[];
  onBack?: () => void;
  activeNav?: 'prep' | 'machine' | 'armory' | 'patch' | 'setting';
  onNavChange?: (k: 'prep' | 'machine' | 'armory' | 'patch' | 'setting') => void;
}

export declare function MachineScreen(props: MachineScreenProps): JSX.Element;
