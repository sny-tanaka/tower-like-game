import { useEffect } from 'react';

import styles from './style.module.scss';

import { Icon } from '@/components/atoms/Icon';
import { ScreenSaverFx } from '@/components/fx/ScreenSaverFx';

export interface ScreenSaverDialogProps {
  open: boolean;
  onClose: () => void;
  /** 現在 Tier (表示用) */
  currentTier?: number;
  /** 現在 Wave (表示用) */
  currentWave?: number;
  /**
   * リザルト状態 (= ResultDialog の表示理由)。 スクリーンセーバー上に「GAME OVER」 or
   * 「TIER CLEAR」 をフェード表示する。 'retreat' (撤退) は意図的な行動なので何も出さない。
   * null / undefined のときも何も出さない。
   */
  resultStatus?: 'gameover' | 'clear' | 'retreat' | null;
}

// ---------------------------------------------------------------------------
// Wake Lock API
//
// スクリーンセーバー中はゲームが進行しているのに端末がスリープして画面ロックされる
// と困るため、 Screen Wake Lock API でロックを抑止する。
//
// iOS Safari は 16.4 で対応、 Android Chrome / Edge は対応済み。 非対応端末は単に
// 取得失敗で no-op になる。 visibility 変化 (タブ非表示など) で sentinel が自動
// 解放されることがあるので、 復帰時に再取得する。
// ---------------------------------------------------------------------------

interface WakeLockSentinel {
  release: () => Promise<void>;
}

interface NavigatorWithWakeLock {
  wakeLock?: {
    request: (type: 'screen') => Promise<WakeLockSentinel>;
  };
}

async function acquireWakeLock(): Promise<WakeLockSentinel | null> {
  const nav = navigator as unknown as NavigatorWithWakeLock;
  if (nav.wakeLock == null) return null;
  try {
    return await nav.wakeLock.request('screen');
  } catch {
    return null;
  }
}

/**
 * ScreenSaverDialog — スクリーンセーバー起動時のフルスクリーンダイアログ。
 *
 * 背景は **完全な黒 (#000)** で覆い、 その上に ScreenSaverFx でリング + タワーアイコン +
 * 現在 Tier/Wave + GAME OVER メッセージ (該当時) をドリフト表示する。 半透明オーバーレイは
 * 焼き付き防止の役目を果たさないため採用しない。 画面のどこかをタップで onClose 発火。
 *
 * v1.3.2: BattleField を pages/battle 側で unmount し、 useBattleLoop の描画 events 生成も
 * 抑止する (= ゲームループ自体は継続するが描画負荷を完全に止める)。 本コンポーネントは
 * 軽量 Fx だけ表示する。
 *
 * v1.3.3: Wake Lock API で画面ロックを抑止 + 現在 Wave / GAME OVER 表示を追加。
 */
export function ScreenSaverDialog({
  open,
  onClose,
  currentTier,
  currentWave,
  resultStatus = null,
}: ScreenSaverDialogProps) {
  // Wake Lock: open の間だけスクリーン点灯を維持する
  useEffect(() => {
    if (!open) return;
    let sentinel: WakeLockSentinel | null = null;
    let released = false;

    const acquire = async () => {
      const s = await acquireWakeLock();
      if (released) {
        // すでに cleanup 済み → 取れたら即解放
        s?.release().catch(() => undefined);
        return;
      }
      sentinel = s;
    };

    // タブ復帰時に再取得 (visibility 変化で自動解放されるブラウザがある)
    const onVis = () => {
      if (document.visibilityState === 'visible' && sentinel == null) {
        void acquire();
      }
    };

    void acquire();
    document.addEventListener('visibilitychange', onVis);

    return () => {
      released = true;
      document.removeEventListener('visibilitychange', onVis);
      sentinel?.release().catch(() => undefined);
    };
  }, [open]);

  if (!open) return null;

  const items: React.ReactNode[] = [];
  if (currentTier != null && currentWave != null) {
    items.push(
      <div
        key="wave"
        className={styles.waveLabel}
      >
        T{currentTier} W{currentWave}
      </div>
    );
  }
  if (resultStatus === 'gameover') {
    items.push(
      <div
        key="gameover"
        className={styles.gameOverLabel}
      >
        GAME OVER
      </div>
    );
  } else if (resultStatus === 'clear') {
    items.push(
      <div
        key="clear"
        className={styles.clearLabel}
      >
        TIER CLEAR
      </div>
    );
  }

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
        items={items}
      />
    </div>
  );
}
