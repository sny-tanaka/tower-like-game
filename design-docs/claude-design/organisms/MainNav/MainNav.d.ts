export interface MainNavItem {
  key: string;
  label: string;
  iconName: string;
  /** Icon と枠のアクセント色 (token CSS 値) */
  iconColor?: string;
  /** 右上に表示するバッジ (数値 / '!' / '新') */
  badge?: string | number;
  disabled?: boolean;
  onClick?: () => void;
}

export interface MainNavProps {
  items: MainNavItem[];
  /** グリッド列数 (default 2) */
  columns?: 2 | 3;
}

export declare function MainNav(props: MainNavProps): JSX.Element;
