export interface WeaponLevelOption {
  amount: string;
  cost: number;
  disabled?: boolean;
}

export interface WeaponLevelStatImpact {
  label: string;
  before: number;
  after: number;
  suffix?: string;
}

export interface WeaponLevelUpgradeTabProps {
  currentLevel?: number;
  alloy?: number;
  before?: number;
  after?: number;
  beforeSuffix?: string;
  statsImpact?: WeaponLevelStatImpact[];
  options?: WeaponLevelOption[];
  maxed?: boolean;
  onBuy?: (amount: string) => void;
}

export declare function WeaponLevelUpgradeTab(props: WeaponLevelUpgradeTabProps): JSX.Element;
