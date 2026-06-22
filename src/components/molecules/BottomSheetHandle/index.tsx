import type { PointerEventHandler } from 'react';

import styles from './style.module.scss';

export interface BottomSheetHandleProps {
  className?: string;
  /** ドラッグ中かどうか。true のときシアングロー状態を表示 */
  dragging?: boolean;
  /** ハンドルバーの幅（px）。デフォルト 36 */
  width?: number;
  /** pointer-down イベントハンドラ（ドラッグ開始の検知） */
  onPointerDown?: PointerEventHandler<HTMLDivElement>;
}

/**
 * ボトムシートのドラッグハンドル（視覚的な装飾コンポーネント）。
 * ドラッグ操作等の機能は親 Sheet が担う。
 * dragging=true 時に cyan-glow でフィードバック。
 */
export function BottomSheetHandle({
  className,
  dragging,
  width,
  onPointerDown,
}: BottomSheetHandleProps) {
  return (
    <div
      className={[styles.container, className].filter(Boolean).join(' ')}
      aria-hidden="true"
      onPointerDown={onPointerDown}
    >
      <span
        className={[styles.handle, dragging ? styles.dragging : ''].filter(Boolean).join(' ')}
        style={width !== undefined ? { width: `${width}px` } : undefined}
      />
    </div>
  );
}
