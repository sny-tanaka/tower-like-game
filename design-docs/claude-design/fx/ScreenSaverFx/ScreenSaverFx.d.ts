export interface ScreenSaverFxProps {
  /** 漂わせる要素の配列 */
  items?: React.ReactNode[];
  /** 中央タワー (回転リング + glow パルス) を 1 アイテムとして混在ドリフト */
  showTower?: boolean;
  /** showTower=true 時、リング中央に配置する要素 (Icon など) */
  towerContent?: React.ReactNode;
  /** 1 周のサイクル秒数 (default 24) */
  cycleSeconds?: number;
}

export declare function ScreenSaverFx(props: ScreenSaverFxProps): JSX.Element;
