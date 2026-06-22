export interface WeaponStat {
  /** ラベル (例 "ダメージ" "射程") */
  label: string;
  value: number;
  suffix?: string;
  /** 強調カラー */
  accent?: 'text' | 'primary' | 'secondary' | 'warning' | 'danger' | 'success' | 'dim';
}

export interface WeaponPreviewProps {
  weapon: 'laser' | 'cannon' | 'thunder' | 'cutter';
  name: string;
  description?: string;
  stats?: WeaponStat[];
  active?: boolean;
  /** 'tall' = 縦配置（出撃準備）, 'wide' = 横配置（武器庫詳細） */
  layout?: 'tall' | 'wide';
  onClick?: () => void;
}

export declare function WeaponPreview(props: WeaponPreviewProps): JSX.Element;
