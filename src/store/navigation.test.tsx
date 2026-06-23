import { act, renderHook } from '@testing-library/react';
import type { ReactNode } from 'react';
import { describe, expect, test } from 'vitest';

import { NavigationProvider, useNavigation } from './navigation';
import type { Screen } from './navigation';

function makeWrapper(initialScreen?: Screen) {
  return function Wrapper({ children }: { children: ReactNode }) {
    return <NavigationProvider initialScreen={initialScreen}>{children}</NavigationProvider>;
  };
}

describe('useNavigation', () => {
  test('デフォルト初期 screen は title', () => {
    const { result } = renderHook(() => useNavigation(), {
      wrapper: makeWrapper(),
    });
    expect(result.current.screen).toBe('title');
  });

  test('navigate("battle") で screen が battle になる', () => {
    const { result } = renderHook(() => useNavigation(), {
      wrapper: makeWrapper(),
    });
    act(() => {
      result.current.navigate('battle');
    });
    expect(result.current.screen).toBe('battle');
  });

  test('7 画面すべてに navigate できる', () => {
    const screens: Screen[] = [
      'title',
      'preparation',
      'machine',
      'armory',
      'patches',
      'settings',
      'battle',
    ];
    const { result } = renderHook(() => useNavigation(), {
      wrapper: makeWrapper(),
    });
    for (const screen of screens) {
      act(() => {
        result.current.navigate(screen);
      });
      expect(result.current.screen).toBe(screen);
    }
  });

  test('initialScreen prop で初期 screen を設定できる', () => {
    const { result } = renderHook(() => useNavigation(), {
      wrapper: makeWrapper('preparation'),
    });
    expect(result.current.screen).toBe('preparation');
  });

  test('NavigationProvider 外で useNavigation を呼ぶとエラーになる', () => {
    // エラーを console に出力させないよう suppressErrorBoundary は不要（renderHook が throws をキャッチ）
    expect(() => {
      renderHook(() => useNavigation());
    }).toThrow('useNavigation は NavigationProvider の内部でのみ使用できます');
  });
});
