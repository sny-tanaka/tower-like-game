export type EnemyKind = 'normal' | 'elite' | 'boss';
export type WeaponKind = 'laser' | 'cannon' | 'thunder' | 'cutter';

export interface BattleFieldEnemy {
  /** ラジアン (0 = 右, π/2 = 下) */
  angle: number;
  /** 0..1 (0 = 中心, 1 = 端) */
  distance: number;
  kind: EnemyKind;
  /** 0..1 HP 残量 */
  hp?: number;
}

export interface BattleFieldProps {
  height?: string | number;
  /** 索敵円半径 % of viewport */
  searchRadiusPct?: number;
  showSearchCircle?: boolean;
  weapon?: WeaponKind;
  /** cutter の旋回半径表示 (%) */
  cutterRadiusPct?: number;
  enemies?: BattleFieldEnemy[];
  paused?: boolean;
}

export declare function BattleField(props: BattleFieldProps): JSX.Element;
