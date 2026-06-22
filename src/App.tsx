// URL を増やさない方針: ゲーム / 単一画面ツール向けの SPA。
// 新しい画面は Screen union (src/store/navigation.tsx) と、ここの switch を増やす。
// react-router は使わない。NavigationProvider が screen state を管理する。
// Phase 6 で各 Page が本格実装されるまで、暫定プレースホルダを表示する。

import { Page as HomePage } from '@/pages/home';
import { Page as NotFoundPage } from '@/pages/not-found';
import { useNavigation } from '@/store/navigation';
import type { Screen } from '@/store/navigation';

function PlaceholderPage({ screen }: { screen: Screen }) {
  return (
    <div>
      <h1>{screen}</h1>
    </div>
  );
}

function App() {
  const { screen } = useNavigation();

  switch (screen) {
    case 'title':
      return <HomePage />;
    case 'preparation':
      return <PlaceholderPage screen={screen} />;
    case 'machine':
      return <PlaceholderPage screen={screen} />;
    case 'armory':
      return <PlaceholderPage screen={screen} />;
    case 'patches':
      return <PlaceholderPage screen={screen} />;
    case 'settings':
      return <PlaceholderPage screen={screen} />;
    case 'battle':
      return <PlaceholderPage screen={screen} />;
    default: {
      // TypeScript の網羅性チェック
      ((_: never) => {})(screen);
      return <NotFoundPage />;
    }
  }
}

export default App;
