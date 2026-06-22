export interface AppShellProps {
  /** 上部固定エリア */
  header?: React.ReactNode;
  /** 下部固定エリア */
  footer?: React.ReactNode;
  /** default / battle (バトルはグリッド密度上昇) */
  variant?: 'default' | 'battle';
  /** メイン部のスクロール禁止 */
  noScroll?: boolean;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export declare function AppShell(props: AppShellProps): JSX.Element;
