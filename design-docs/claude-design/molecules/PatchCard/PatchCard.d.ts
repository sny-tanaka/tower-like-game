export interface PatchCardProps {
  patchId: string;
  name: string;
  iconName?: string;
  iconColor?: string;
  tier: number;
  /** トリガー条件 (短文) */
  trigger?: string;
  /** 効果説明 (短文) */
  effect?: string;
  /** 所持数 (0 で dim 表示) */
  count?: number;
  selected?: boolean;
  merging?: boolean;
  disabled?: boolean;
  locked?: boolean;
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
}

export declare function PatchCard(props: PatchCardProps): JSX.Element;
