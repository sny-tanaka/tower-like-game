import styles from './style.module.scss';

import { Button } from '@/components/atoms/Button';
import { Text } from '@/components/atoms/Text';
import type { AppUpdateBanner } from '@/hooks/useAppUpdate';

export interface AppUpdaterProps {
  banner: AppUpdateBanner;
  /** 「更新」ボタン押下時のハンドラ。banner.kind === 'has-update' のときだけ使う。 */
  onApply: () => void;
}

/**
 * AppUpdater — タイトル画面に出すバナー / トースト。
 *
 * - has-update: 「新しいバージョンがあります」+ 「更新」ボタン (= リロード)
 * - up-to-date: 「現在のバージョンは最新です」(一定時間で自動消滅)
 * - null: 何も描画しない
 *
 * banner / onApply は呼び出し側 (Title page) が useAppUpdate から取り出して渡す。
 */
export function AppUpdater({ banner, onApply }: AppUpdaterProps) {
  if (banner === null) return null;

  if (banner.kind === 'has-update') {
    return (
      <div
        className={styles.banner}
        role="status"
        aria-live="polite"
      >
        <Text
          variant="body"
          color="default"
        >
          新しいバージョンがあります
        </Text>
        <Button
          label="更新"
          size="sm"
          variant="primary"
          onClick={onApply}
        />
      </div>
    );
  }

  // up-to-date
  return (
    <div
      className={`${styles.banner} ${styles.bannerInfo}`}
      role="status"
      aria-live="polite"
    >
      <Text
        variant="body"
        color="dim"
      >
        現在のバージョンは最新です
      </Text>
    </div>
  );
}
