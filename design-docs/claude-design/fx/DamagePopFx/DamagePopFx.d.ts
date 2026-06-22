export interface DamagePopFxProps {
  value: number;
  /** 親内 %座標 */
  x?: number;
  y?: number;
  /** クリ表示 */
  crit?: boolean;
  duration?: number;
  onDone?: () => void;
}
export declare function DamagePopFx(props: DamagePopFxProps): JSX.Element;
