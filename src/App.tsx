// URL を増やさない方針: ゲーム / 単一画面ツール向けの SPA。
// 新しい画面は Screen union (src/store/navigation.tsx) と、ここの switch を増やす。
// react-router は使わない。NavigationProvider が screen state を管理する。

import { Page as HomePage } from '@/pages/home';
import { Page as NotFoundPage } from '@/pages/not-found';
import { useNavigation } from '@/store/navigation';

function App() {
  const { screen } = useNavigation();

  switch (screen.name) {
    case 'home':
      return <HomePage />;
    case 'notFound':
      return <NotFoundPage />;
    default: {
      // TypeScript の網羅性チェック
      const _exhaustive: never = screen;
      return _exhaustive;
    }
  }
}

export default App;
