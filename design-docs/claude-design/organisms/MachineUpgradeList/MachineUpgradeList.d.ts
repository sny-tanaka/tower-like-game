import type { UpgradeCardProps } from '../../molecules/UpgradeCard/UpgradeCard';

export interface MachineUpgradeListItem extends UpgradeCardProps {
  /** リストキー */
  id?: string;
}

export interface MachineUpgradeListProps {
  items: MachineUpgradeListItem[];
  columns?: 1 | 2;
  emptyLabel?: string;
}

export declare function MachineUpgradeList(props: MachineUpgradeListProps): JSX.Element;
