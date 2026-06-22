import type { PatchCardProps } from '../../molecules/PatchCard/PatchCard';

export interface PatchEquipTabProps {
  patches: PatchCardProps[];
  slotCount?: number;
  lockedCount?: number;
  onSlotClick?: (slotIndex: number) => void;
}

export declare function PatchEquipTab(props: PatchEquipTabProps): JSX.Element;
