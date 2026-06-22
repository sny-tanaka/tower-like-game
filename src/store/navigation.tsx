import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import type { ReactElement, ReactNode } from 'react';

// 画面を string literal union で型安全に表現する。
// URL を増やさない方針: ゲーム / 単一画面ツール向けの SPA。
// 新しい画面は Screen union をここに追加し、App.tsx の switch を増やす。
export type Screen =
  | 'title'
  | 'preparation'
  | 'machine'
  | 'armory'
  | 'patches'
  | 'settings'
  | 'battle';

export interface NavigationContextValue {
  screen: Screen;
  navigate: (target: Screen) => void;
}

const NavigationContext = createContext<NavigationContextValue | null>(null);

export function NavigationProvider({
  children,
  initialScreen,
}: {
  children: ReactNode;
  initialScreen?: Screen;
}): ReactElement {
  const [screen, setScreen] = useState<Screen>(initialScreen ?? 'title');

  const navigate = useCallback((target: Screen) => {
    setScreen(target);
  }, []);

  return (
    <NavigationContext.Provider value={{ screen, navigate }}>{children}</NavigationContext.Provider>
  );
}

export function useNavigation(): NavigationContextValue {
  const ctx = useContext(NavigationContext);
  if (!ctx) {
    throw new Error('useNavigation は NavigationProvider の内部でのみ使用できます');
  }
  return ctx;
}

/**
 * Redirect — render 中の遷移を安全に行うヘルパー。
 * react-router の <Navigate> と同様、ガード条件成立時に条件付きで描画して遷移させる。
 * 「描画中に別コンポーネントの state を更新」する警告を避けるため useEffect で遷移する。
 */
export function Redirect({ to }: { to: Screen }) {
  const { screen, navigate } = useNavigation();
  useEffect(() => {
    if (screen !== to) navigate(to);
    // to は呼び出し側で固定リテラルのため依存に含める
  }, [screen, navigate, to]);
  return null;
}
