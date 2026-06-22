export type CurrencyKind = 'screw' | 'bolt' | 'alloy';
export type CurrencySize = 'sm' | 'md' | 'lg';

export interface CurrencyAmountProps {
  /** 通貨種別 */
  currency: CurrencyKind;
  /** 表示する値（無限スケール表記） */
  value: number;
  /** サイズ。アイコン径と文字サイズが連動 */
  size?: CurrencySize;
  /** 'start' = icon left, 'end' = icon right */
  align?: 'start' | 'end';
  /** 増減プレフィックス '+' / '-' */
  delta?: '+' | '-';
  /** 控えめ配色（dim） */
  subtle?: boolean;
  /** 通貨名ラベル併記 */
  showLabel?: boolean;
  /** NumericDisplay の decimals */
  decimals?: number | 'auto';
}

export declare function CurrencyAmount(props: CurrencyAmountProps): JSX.Element;
