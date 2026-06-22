export interface BottomNavItem {
  key: string;
  label: string;
  iconName: string;
  badge?: string | number;
  disabled?: boolean;
}

export interface BottomNavProps {
  items: BottomNavItem[];
  active?: string;
  onChange?: (key: string) => void;
}

export declare function BottomNav(props: BottomNavProps): JSX.Element;
