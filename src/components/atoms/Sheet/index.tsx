import styles from './style.module.scss';

export type SheetPosition = 'bottom';

export interface SheetProps {
  open: boolean;
  children: React.ReactNode;
  onClose?: () => void;
  position?: SheetPosition;
}

/**
 * ボトムシート素地 Atom。
 *
 * - open=true でマウント、open=false でアンマウント（親が条件付きレンダリングで制御）
 * - slideIn @keyframes は style.module.scss に定義（Fx 化しない）
 * - safe-area-inset-bottom を考慮した padding 付き
 */
export function Sheet({ open: _open, children, onClose, position = 'bottom' }: SheetProps) {
  // open フラグは親の条件付きレンダリングで制御されるため、
  // マウント時に即 slideIn アニメーションが発火する
  return (
    <div
      className={`${styles.sheet} ${styles[`position-${position}`]}`}
      role="dialog"
      aria-modal="true"
    >
      {/* 背景クリックで閉じるオーバーレイ（Sheet 自身のバックドロップ） */}
      {onClose && (
        <div
          className={styles.backdrop}
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      <div className={styles.content}>{children}</div>
    </div>
  );
}
