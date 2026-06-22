export interface MergeablePatch {
  patchId: string;
  name: string;
  iconName?: string;
  tier: number;
  /** 所持数 */
  count: number;
}

export interface PatchMergeTabProps {
  mergeable: MergeablePatch[];
  /** 合成上限 Tier (これ以上の Tier には合成しない) */
  maxTierLimit?: number;
  onLimitChange?: (tier: number) => void;
  onMergeAll?: () => void;
}

export declare function PatchMergeTab(props: PatchMergeTabProps): JSX.Element;
