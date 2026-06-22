export type SheetEdge = 'bottom' | 'top' | 'side' | 'all';
export type SheetPadding = 'none' | 'sm' | 'md' | 'lg';

export interface SheetProps {
  /** どの辺が画面端か (default 'bottom') */
  edge?: SheetEdge;
  /** 上端にドラッグハンドルを表示 (bottom edge 時のみ有効) */
  withHandle?: boolean;
  padding?: SheetPadding;
  /** CSS 高さ上限 */
  maxHeight?: string | number;
  /** ハンドルのドラッグ pointerdown */
  onHandlePointerDown?: (e: React.PointerEvent) => void;
  /** ハンドルのドラッグ中フラグ */
  handleDragging?: boolean;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export declare function Sheet(props: SheetProps): JSX.Element;
