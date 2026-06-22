import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import { Page } from './index';

import { NavigationProvider } from '@/store/navigation';

/** NavigationProvider でラップするヘルパー */
function renderPage() {
  return render(
    <NavigationProvider initialScreen="battle">
      <Page />
    </NavigationProvider>
  );
}

describe('BattleScreen Page', () => {
  test('BattleField が描画される', () => {
    renderPage();
    expect(screen.getByRole('img', { name: 'バトルフィールド' })).toBeInTheDocument();
  });

  test('メニューオーバーレイは初期状態では非表示', () => {
    renderPage();
    expect(screen.queryByRole('heading', { name: 'メニュー' })).not.toBeInTheDocument();
  });

  test('リザルトダイアログは初期状態では非表示', () => {
    renderPage();
    // ResultDialog の「出撃準備へ」ボタンが非表示
    expect(screen.queryByRole('button', { name: '出撃準備へ' })).not.toBeInTheDocument();
  });

  test('スクリーンセーバーは初期状態では非表示', () => {
    renderPage();
    expect(
      screen.queryByRole('button', { name: 'スクリーンセーバーを終了' })
    ).not.toBeInTheDocument();
  });
});
