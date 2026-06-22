export type EnemyHpVariant = 'normal' | 'elite' | 'boss';

export interface EnemyHpBarProps {
  /** 表示名 */
  name: string;
  current: number;
  max: number;
  variant?: EnemyHpVariant;
  /** Tier 値（指定すると Badge が tier に切り替わる。variant=normal のとき有効） */
  tier?: number;
  /** 数値表示 */
  showValue?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export declare function EnemyHpBar(props: EnemyHpBarProps): JSX.Element;
