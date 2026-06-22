export interface BottomSheetHandleProps {
  /** ドラッグ中で色変化 */
  dragging?: boolean;
  /** バー幅 px (default 40) */
  width?: number;
  onPointerDown?: (e: React.PointerEvent) => void;
}

export declare function BottomSheetHandle(props: BottomSheetHandleProps): JSX.Element;
