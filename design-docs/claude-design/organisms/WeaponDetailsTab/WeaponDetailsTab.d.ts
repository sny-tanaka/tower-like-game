export type WeaponKind = 'laser' | 'cannon' | 'thunder' | 'cutter';

export interface WeaponDetailsInfo {
  kind: WeaponKind;
  name: string;
  description?: string;
  stats?: { label: string; value: number; suffix?: string; accent?: string }[];
}

export interface WeaponDetailsTabProps {
  weapons: WeaponDetailsInfo[];
}

export declare function WeaponDetailsTab(props: WeaponDetailsTabProps): JSX.Element;
