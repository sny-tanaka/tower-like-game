import type { Decorator } from '@storybook/react';
import { createElement } from 'react';
import type { ReactNode } from 'react';

import type { Screen } from '@/store/navigation';
import { NavigationProvider } from '@/store/navigation';

/**
 * ページストーリー用の共通 decorator。
 * NavigationProvider だけラップする。
 * initialScreen で初期画面を固定できる（遷移後の画面向け）。
 */
export function withAppContext(initialScreen?: Screen): Decorator {
  const Wrapper = ({ children }: { children: ReactNode }) => (
    <NavigationProvider initialScreen={initialScreen}>{children}</NavigationProvider>
  );
  Wrapper.displayName = 'AppContextWrapper';

  function AppContextDecorator(Story: Parameters<Decorator>[0]) {
    return <Wrapper>{createElement(Story as React.ComponentType)}</Wrapper>;
  }
  AppContextDecorator.displayName = 'AppContextDecorator';

  return AppContextDecorator;
}
