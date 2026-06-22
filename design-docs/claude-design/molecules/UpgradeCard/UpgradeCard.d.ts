export interface UpgradeOption {
  /** ボタン表示。例 '+1' / '+5' / 'MAX' */
  amount: string;
  /** コスト（currency 単位） */
  cost: number;
  /** 押下不可（コスト不足など） */
  disabled?: boolean;
  onClick?: () => void;
}

export interface UpgradeCardProps {
  title: string;
  description?: string;
  iconName?: string;
  iconColor?: string;
  /** 例 "Lv 4" "T2" */
  currentLabel?: string;
  /** 現在値（数値）。NumericDisplay でフォーマット */
  before?: number;
  /** 強化後の値 */
  after?: number;
  /** before/after の suffix （%, ×等） */
  beforeSuffix?: string;
  /** コスト通貨 */
  currency?: 'screw' | 'bolt' | 'alloy';
  /** 購入オプション（最大 3 個） */
  options?: UpgradeOption[];
  /** 上限到達。true で全ボタン非表示 + MAX バッジ */
  maxed?: boolean;
  /** アクセント色 */
  accent?: 'primary' | 'secondary' | 'warning';
}

export declare function UpgradeCard(props: UpgradeCardProps): JSX.Element;
