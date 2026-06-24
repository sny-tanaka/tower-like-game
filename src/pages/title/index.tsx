import { useMemo, useState } from 'react';

import styles from './style.module.scss';

import { AppUpdater } from '@/components/molecules/AppUpdater';
import { ConfirmDialog } from '@/components/molecules/ConfirmDialog';
import { AppShell } from '@/components/organisms/AppShell';
import { TitleActions } from '@/components/organisms/TitleActions';
import { TitleHeader } from '@/components/organisms/TitleHeader';
import { TitleHero } from '@/components/organisms/TitleHero';
import { useAppUpdate } from '@/hooks/useAppUpdate';
import { soundEngine } from '@/lib/audio';
import { useStore } from '@/store';
import { useNavigation } from '@/store/navigation';

function formatRelativeTime(ms: number): string {
  if (ms < 0) return '今';
  const sec = Math.floor(ms / 1000);
  if (sec < 60) return '今';
  const min = Math.floor(sec / 60);
  if (min < 60) return `${min} 分前`;
  const hour = Math.floor(min / 60);
  if (hour < 24) return `${hour} 時間前`;
  return `${Math.floor(hour / 24)} 日前`;
}

/**
 * TitleScreen — ゲーム起動時の最初の画面。
 *
 * AppShell に TitleHeader / TitleHero / TitleActions を縦並びで配置する。
 * TitleHero がフレックス伸長で中央に陣取り、上下にヘッダー / アクションが固定される。
 * セーブ判定は TitleActions が内部で store の createdAt を参照して自動切替。
 */
export function Page() {
  const { navigate } = useNavigation();
  const createdAt = useStore((s) => s.createdAt);
  const { banner, checkForUpdate, isChecking, applyUpdate } = useAppUpdate();

  const resetProfile = useStore((s) => s.resetProfile);
  const resetCurrencies = useStore((s) => s.resetCurrencies);
  const resetMachine = useStore((s) => s.resetMachine);
  const resetWeapons = useStore((s) => s.resetWeapons);
  const resetPatches = useStore((s) => s.resetPatches);
  const clearEquippedPatches = useStore((s) => s.clearEquippedPatches);
  const endRun = useStore((s) => s.endRun);

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const lastSavedAt = useMemo(
    () => (createdAt > 0 ? formatRelativeTime(Date.now() - createdAt) : undefined),
    [createdAt]
  );

  const doNewGame = () => {
    const now = Date.now();
    resetProfile(now);
    resetCurrencies();
    resetMachine();
    resetWeapons();
    resetPatches();
    clearEquippedPatches();
    endRun();
    navigate('preparation');
  };

  const handleNewGameRequest = () => {
    if (createdAt > 0) {
      // セーブあり → 確認ダイアログを開く
      setIsConfirmOpen(true);
    } else {
      // セーブなし → そのまま遷移
      doNewGame();
    }
  };

  return (
    <AppShell>
      <div className={styles.layout}>
        <TitleHeader
          subtitle="TOWER DEFENSE × INFINITE TIER"
          tagline="マシン + 武器 + パッチで攻略する放置寄りラン"
          version={`v${__APP_VERSION__}`}
        />
        <div className={styles.heroWrap}>
          <TitleHero />
        </div>
        <TitleActions
          lastSavedAt={lastSavedAt}
          onResume={() => {
            soundEngine.play('tap');
            navigate('preparation');
          }}
          onNewGame={() => {
            soundEngine.play('tap');
            handleNewGameRequest();
          }}
          onCheckUpdate={() => void checkForUpdate()}
          isCheckingUpdate={isChecking}
        />
        <AppUpdater
          banner={banner}
          onApply={applyUpdate}
        />
        <ConfirmDialog
          open={isConfirmOpen}
          variant="danger"
          iconName="skull"
          title="新規開始"
          message="現在のセーブデータは消えます。本当に新規開始しますか?"
          confirmLabel="新規開始"
          cancelLabel="キャンセル"
          onConfirm={() => {
            setIsConfirmOpen(false);
            doNewGame();
          }}
          onCancel={() => setIsConfirmOpen(false)}
        />
      </div>
    </AppShell>
  );
}
