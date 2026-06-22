import type { PatchCardProps } from '../../molecules/PatchCard/PatchCard';

export interface PatchInventoryTabProps {
  patches: PatchCardProps[];
  selectedId?: string;
  onSelect?: (patchId: string) => void;
}

export declare function PatchInventoryTab(props: PatchInventoryTabProps): JSX.Element;
