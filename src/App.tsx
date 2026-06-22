// URL を増やさない方針: ゲーム / 単一画面ツール向けの SPA。
// 新しい画面は Screen union (src/store/navigation.tsx) と、ここの switch を増やす。
// react-router は使わない。NavigationProvider が screen state を管理する。

import { ArmoryScreen } from '@/pages/armory';
import { Page as BattlePage } from '@/pages/battle';
import { Page as MachinePage } from '@/pages/machine';
import { Page as NotFoundPage } from '@/pages/not-found';
import { PatchScreen } from '@/pages/patches';
import { Page as PreparationPage } from '@/pages/preparation';
import { Page as SettingsPage } from '@/pages/settings';
import { Page as TitlePage } from '@/pages/title';
import { useNavigation } from '@/store/navigation';

function App() {
  const { screen } = useNavigation();

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
