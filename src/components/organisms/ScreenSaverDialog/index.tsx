import styles from './style.module.scss';

import { Icon } from '@/components/atoms/Icon';
import { ScreenSaverFx } from '@/components/fx/ScreenSaverFx';

export interface ScreenSaverDialogProps {
  open: boolean;
  onClose: () => void;
}

/**
 * ScreenSaverDialog — スクリーンセーバー起動時のフルスクリーンダイアログ。
 *
 * 背景は **完全な黒 (#000)** で覆い、その上に ScreenSaverFx でリング + タワーアイコンを
 * ドリフト表示する。半透明オーバーレイは焼き付き防止の役目を果たさないため
 * 採用しない。画面のどこかをタップで onClose 発火。
 */
export function ScreenSaverDialog({ open, onClose }: ScreenSaverDialogProps) {
  if (!open) return null;

  return (
    <div
      className={styles.root}
      onClick={onClose}
      role="button"
      aria-label="スクリーンセーバーを終了"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClose();
        }
      }}
    >
      <ScreenSaverFx
        showTower
        towerContent={
          <Icon
            name="tower"
            size={88}
          />
        }
      />
    </div>
  );
}
