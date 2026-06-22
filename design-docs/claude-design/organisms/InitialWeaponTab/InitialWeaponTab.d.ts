export type WeaponKind = 'laser' | 'cannon' | 'thunder' | 'cutter';

export interface InitialWeaponInfo {
  kind: WeaponKind;
  name: string;
  description?: string;
  stats?: { label: string; value: number; suffix?: string; accent?: string }[];
}

export interface InitialWeaponTabProps {
  weapons: InitialWeaponInfo[];
  selectedKind?: WeaponKind;
  onSelect?: (kind: WeaponKind) => void;
}

export declare function InitialWeaponTab(props: InitialWeaponTabProps): JSX.Element;
