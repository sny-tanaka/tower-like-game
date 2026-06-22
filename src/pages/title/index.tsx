import styles from './style.module.scss';

import { AppShell } from '@/components/organisms/AppShell';
import { TitleActions } from '@/components/organisms/TitleActions';
import { TitleHeader } from '@/components/organisms/TitleHeader';
import { useNavigation } from '@/store/navigation';

/**
 * TitleScreen — ゲーム起動時の最初の画面。
 *
 * AppShell の center (children) に TitleHeader + TitleActions を縦並びで配置する。
 * BottomNav なし（タイトルは初期入口のため）。
 * セーブ判定は TitleActions が内部で store の createdAt を参照して自動切替。
 */
export function Page() {
  const { navigate } = useNavigation();

  return (
    <AppShell>
      <div className={styles.center}>
        <TitleHeader
          subtitle="CYBER TOWER DEFENSE × INFINITE TIER"
          version="v0.1.0"
        />
        <TitleActions
          onResume={() => navigate('preparation')}
          onNewGame={() => navigate('preparation')}
          onSettings={() => navigate('settings')}
        />
      </div>
    </AppShell>
  );
}
