import styles from './style.module.scss';

import { Overlay } from '@/components/atoms/Overlay';
import { ScreenSaverFx } from '@/components/fx/ScreenSaverFx';

// ---------------------------------------------------------------------------
// 型定義
// ---------------------------------------------------------------------------

export interface ScreenSaverDialogProps {
  open: boolean;
  onClose: () => void;
}

// ---------------------------------------------------------------------------
// コンポーネント
// ---------------------------------------------------------------------------

/**
 * ScreenSaverDialog — スクリーンセーバー起動時のフルスクリーンダイアログ。
 *
 * 構成: Overlay (全画面、タップで onClose) + ScreenSaverFx (Fx)
 *
 * ゲームは進行中のまま、画面焼き付き防止アニメを前面に描画する。
 * 画面のどこかをタップすると復帰 (onClose 発火)。
 */
export function ScreenSaverDialog({ open, onClose }: ScreenSaverDialogProps) {
  if (!open) return null;

  return (
    <Overlay
      open={open}
      onClose={onClose}
      dimLevel="heavy"
      dismissible
      align="center"
    >
      {/* タップエリア全体を ScreenSaverFx で覆う */}
      <div
        className={styles.fxContainer}
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        role="button"
        aria-label="スクリーンセーバーを終了"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            onClose();
          }
        }}
      >
        <ScreenSaverFx showTower />
      </div>
    </Overlay>
  );
}
