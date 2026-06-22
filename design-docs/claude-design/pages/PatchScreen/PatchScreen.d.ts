import type { PatchCardProps } from '../../molecules/PatchCard/PatchCard';
import type { MergeablePatch } from '../../organisms/PatchMergeTab/PatchMergeTab';

export interface PatchScreenProps {
  equipped?: PatchCardProps[];
  slotCount?: number;
  lockedCount?: number;
  inventory?: PatchCardProps[];
  mergeable?: MergeablePatch[];
  mergeLimit?: number;
  onMergeLimitChange?: (t: number) => void;
  onMergeAll?: () => void;
  onBack?: () => void;
  onSelectInventory?: (id: string) => void;
  selectedInventoryId?: string;
  onEquipSlotClick?: (i: number) => void;
  activeNav?: 'prep' | 'machine' | 'armory' | 'patch' | 'setting';
  onNavChange?: (k: 'prep' | 'machine' | 'armory' | 'patch' | 'setting') => void;
}

export declare function PatchScreen(props: PatchScreenProps): JSX.Element;
