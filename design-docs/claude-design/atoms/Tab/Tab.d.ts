export type TabVariant = 'underline' | 'pill';
export type TabSize = 'sm' | 'md';

export interface TabProps {
  /** タブのラベル */
  label: string;
  /** 選択中 */
  active?: boolean;
  /** 無効 */
  disabled?: boolean;
  /** 見た目バリアント */
  variant?: TabVariant;
  /** 高さ。sm 32 / md 40 px */
  size?: TabSize;
  /** 右肩バッジ（数値 or '!') */
  badge?: string | number;
  /** タップ */
  onClick?: () => void;
  /** 左アイコン */
  iconLeft?: React.ReactNode;
}

export declare function Tab(props: TabProps): JSX.Element;
