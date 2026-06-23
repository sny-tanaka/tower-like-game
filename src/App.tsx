// URL を増やさない方針: ゲーム / 単一画面ツール向けの SPA。
// 新しい画面は Screen union (src/store/navigation.tsx) と、ここの switch を増やす。
// react-router は使わない。NavigationProvider が screen state を管理する。

import { useEffect } from 'react';

import { soundEngine } from '@/lib/audio';
import type { BgmId } from '@/lib/audio';
import { ArmoryScreen } from '@/pages/armory';
import { Page as BattlePage } from '@/pages/battle';
import { Page as MachinePage } from '@/pages/machine';
import { Page as NotFoundPage } from '@/pages/not-found';
import { PatchScreen } from '@/pages/patches';
import { Page as PreparationPage } from '@/pages/preparation';
import { Page as SettingsPage } from '@/pages/settings';
import { Page as TitlePage } from '@/pages/title';
import { useStore } from '@/store';
import type { Screen } from '@/store/navigation';
import { useNavigation } from '@/store/navigation';

/**
 * 画面 → BGM のマッピング。
 * battle は wave 30 で 'battleBoss' に切り替わるが、 それは battle 画面側で上書きする。
 */
const SCREEN_BGM: Record<Screen, BgmId> = {
  title: 'title',
  preparation: 'base',
  machine: 'base',
  armory: 'base',
  patches: 'base',
  settings: 'base',
  battle: 'battleNormal',
};

/**
 * 最初のユーザー操作 (click / touchstart / keydown) で AudioContext を初期化する。
 * ブラウザの autoplay policy 対応: ユーザージェスチャー前に作った AudioContext は
 * suspend 状態になるため、 ユーザー操作後に init するのが安全。
 */
function useSoundBootstrap(bgmVolume: number, seVolume: number) {
  useEffect(() => {
    const initOnce = () => {
      if (!soundEngine.isInitialized()) {
        soundEngine.init();
        soundEngine.setBgmVolume(bgmVolume);
        soundEngine.setSeVolume(seVolume);
      }
    };
    window.addEventListener('pointerdown', initOnce, { once: true });
    window.addEventListener('keydown', initOnce, { once: true });
    return () => {
      window.removeEventListener('pointerdown', initOnce);
      window.removeEventListener('keydown', initOnce);
    };
    // bgmVolume / seVolume は init 時に 1 回反映するだけ。 以後の変化は下の effect で同期。
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // settings の volume 変化を engine に同期 (init 済みでなくても setXxxVolume は volume 保持する)
  useEffect(() => {
    soundEngine.setBgmVolume(bgmVolume);
  }, [bgmVolume]);
  useEffect(() => {
    soundEngine.setSeVolume(seVolume);
  }, [seVolume]);
}

function App() {
  const { screen } = useNavigation();
  const bgmVolume = useStore((s) => s.bgmVolume);
  const seVolume = useStore((s) => s.seVolume);
  useSoundBootstrap(bgmVolume, seVolume);

  // 画面遷移時に BGM を切り替える (同じ id を続けて呼ぶと内部で no-op)
  // battle 内の wave 30 切替は battle 画面側 useEffect が上書きする
  useEffect(() => {
    soundEngine.playBgm(SCREEN_BGM[screen]);
  }, [screen]);

  switch (screen) {
    case 'title':
      return <TitlePage />;
    case 'preparation':
      return <PreparationPage />;
    case 'machine':
      return <MachinePage />;
    case 'armory':
      return <ArmoryScreen />;
    case 'patches':
      return <PatchScreen />;
    case 'settings':
      return <SettingsPage />;
    case 'battle':
      return <BattlePage />;
    default: {
      // TypeScript の網羅性チェック
      ((_: never) => {})(screen);
      return <NotFoundPage />;
    }
  }
}

export default App;
