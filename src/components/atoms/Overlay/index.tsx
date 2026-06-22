import styles from './style.module.scss';

export interface OverlayProps {
  open: boolean;
  children: React.ReactNode;
  onClose?: () => void;
  /**
   * true (デフォルト): 背景タップで onClose 発火
   * false: 背景タップで発火しない
   */
  dismissible?: boolean;
}

/**
 * 全画面ディムバックドロップ + 内側コンテンツ Atom。
 *
 * - open=true でマウント → フェードイン（親が条件付きレンダリングで制御）
 * - fadeIn @keyframes は style.module.scss に定義（Fx 化しない）
 * - 「閉じる × ボタン」は Overlay の責務ではなく内側の Dialog の責務
 * - dismissible=true 時に背景クリックで onClose 発火
 * - children クリックは onClose に透過させない（stopPropagation）
 */
export function Overlay({ open: _open, children, onClose, dismissible = true }: OverlayProps) {
  const handleBackdropClick = () => {
    if (dismissible && onClose) {
      onClose();
    }
  };

  const handleContentClick = (e: React.MouseEvent) => {
    // 背景クリックイベントを止めて onClose が発火しないようにする
    e.stopPropagation();
  };

  return (
    <div
      className={styles.overlay}
      onClick={handleBackdropClick}
      role="presentation"
      aria-modal="true"
    >
      <div
        className={styles.content}
        onClick={handleContentClick}
      >
        {children}
      </div>
    </div>
  );
}
