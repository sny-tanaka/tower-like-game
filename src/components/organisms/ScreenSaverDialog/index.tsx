import { useEffect } from 'react';

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
 *
 * open 中は Screen Wake Lock を取得して画面消灯を防ぐ (Issue #78)。
 * Wake Lock 未対応ブラウザ (古い iOS Safari 等) では silently noop。
 */
export function ScreenSaverDialog({ open, onClose }: ScreenSaverDialogProps) {
  // ── Screen Wake Lock: open 中は画面消灯を防ぐ ──
  // mount = 取得、 unmount / open=false = release。 取得失敗・未対応は警告ログのみ。
  useEffect(() => {
    if (!open) return;
    if (!('wakeLock' in navigator)) return;
    let sentinel: WakeLockSentinel | null = null;
    let released = false;
    void navigator.wakeLock
      .request('screen')
      .then((s) => {
        if (released) {
          void s.release();
          return;
        }
        sentinel = s;
      })
      .catch((err) => {
        console.warn('[ScreenSaverDialog] Wake Lock 取得失敗:', err);
      });
    return () => {
      released = true;
      if (sentinel) {
        void sentinel.release().catch(() => {});
      }
    };
  }, [open]);

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
