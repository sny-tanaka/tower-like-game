export interface TierSelectTabProps {
  /** 最新到達 Tier (これが表示・選択の上限) */
  maxTier: number;
  /** 選択下限 (default 1) */
  minTier?: number;
  /** 選択中 Tier */
  selectedTier?: number;
  onSelect?: (tier: number) => void;
}

export declare function TierSelectTab(props: TierSelectTabProps): JSX.Element;
