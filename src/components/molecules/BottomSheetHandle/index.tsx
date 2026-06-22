import styles from './style.module.scss';

export interface BottomSheetHandleProps {
  className?: string;
}

/**
 * ボトムシートのドラッグハンドル（視覚的な装飾コンポーネント）。
 * ドラッグ操作等の機能は親 Sheet が担う。
 */
export function BottomSheetHandle({ className }: BottomSheetHandleProps) {
  return (
    <div
      className={[styles.container, className].filter(Boolean).join(' ')}
      aria-hidden="true"
    >
      <span className={styles.handle} />
    </div>
  );
}
