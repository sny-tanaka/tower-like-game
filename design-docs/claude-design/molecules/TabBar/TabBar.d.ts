export interface TabBarItem {
  /** 状態キー（onChange の引数になる） */
  key: string;
  label: string;
  iconName?: string;
  badge?: string | number;
  disabled?: boolean;
}

export interface TabBarProps {
  tabs: TabBarItem[];
  /** 選択中のキー */
  value: string;
  onChange?: (key: string) => void;
  variant?: 'underline' | 'pill';
  size?: 'sm' | 'md';
  /** 全タブを等幅に */
  fullWidth?: boolean;
  align?: 'start' | 'center' | 'stretch';
}

export declare function TabBar(props: TabBarProps): JSX.Element;
