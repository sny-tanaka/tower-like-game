export type CurrencyKind = 'screw' | 'bolt' | 'alloy';

export interface PageHeaderCurrency {
  kind: CurrencyKind;
  value: number;
}

export interface PageHeaderProps {
  title: string;
  subtitle?: string;
  /** 戻るボタン押下。未指定で戻るボタン非表示 */
  onBack?: () => void;
  /** 表示する通貨 (その画面で使うもののみ) */
  currencies?: PageHeaderCurrency[];
  /** 右端の追加 ReactNode (設定アイコン等) */
  actions?: React.ReactNode;
  /** position:sticky に */
  sticky?: boolean;
}

export declare function PageHeader(props: PageHeaderProps): JSX.Element;
