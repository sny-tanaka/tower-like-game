import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import { Page } from './index';

import { NavigationProvider } from '@/store/navigation';

// openDatabase と export 関数をモック（IndexedDB 不使用）
vi.mock('@/data/db', () => ({
  openDatabase: vi.fn(),
}));

vi.mock('@/data/export', () => ({
  exportSave: vi.fn(),
  importSave: vi.fn(),
}));

// DB_NAME のみ使うため schema はオリジナルをそのまま使う（MACHINE_UPGRADE_KEYS 等が必要）

function renderPage() {
  return render(
    <NavigationProvider initialScreen="settings">
      <Page />
    </NavigationProvider>
  );
}

describe('SettingsScreen', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('ページタイトル「設定」が表示される', () => {
    renderPage();
    expect(screen.getAllByText('設定').length).toBeGreaterThan(0);
  });

  it('タブバーに「サウンド」「ゲーム」「データ」が表示される', () => {
    renderPage();
    expect(screen.getByRole('tab', { name: 'サウンド' })).toBeDefined();
    expect(screen.getByRole('tab', { name: 'ゲーム' })).toBeDefined();
    expect(screen.getByRole('tab', { name: 'データ' })).toBeDefined();
  });

  it('初期表示は「サウンド」タブが選択されている', () => {
    renderPage();
    const soundTab = screen.getByRole('tab', { name: 'サウンド' });
    expect(soundTab.getAttribute('aria-selected')).toBe('true');
  });

  it('初期表示では SoundSettingsTab のコンテンツが表示される', () => {
    renderPage();
    expect(screen.getByRole('tabpanel', { name: 'サウンド設定' })).toBeDefined();
  });

  it('「ゲーム」タブをクリックすると GameSettingsTab が表示される', async () => {
    const user = userEvent.setup();
    renderPage();
    await user.click(screen.getByRole('tab', { name: 'ゲーム' }));
    expect(screen.getByText('ゲーム設定')).toBeDefined();
  });

  it('「データ」タブをクリックすると DataSettingsTab が表示される', async () => {
    const user = userEvent.setup();
    renderPage();
    await user.click(screen.getByRole('tab', { name: 'データ' }));
    expect(screen.getByText('データ管理')).toBeDefined();
  });

  it('タブ切替で選択状態が変わる', async () => {
    const user = userEvent.setup();
    renderPage();

    // 初期は「サウンド」が選択
    expect(screen.getByRole('tab', { name: 'サウンド' }).getAttribute('aria-selected')).toBe(
      'true'
    );

    // 「ゲーム」をクリック
    await user.click(screen.getByRole('tab', { name: 'ゲーム' }));
    expect(screen.getByRole('tab', { name: 'ゲーム' }).getAttribute('aria-selected')).toBe('true');
    expect(screen.getByRole('tab', { name: 'サウンド' }).getAttribute('aria-selected')).toBe(
      'false'
    );
  });

  it('BottomNav の「設定」タブがアクティブになっている', () => {
    renderPage();
    // BottomNav の「設定」ボタンが aria-current="page"
    const settingsNavBtn = screen.getByRole('button', { name: '設定' });
    expect(settingsNavBtn.getAttribute('aria-current')).toBe('page');
  });
});
