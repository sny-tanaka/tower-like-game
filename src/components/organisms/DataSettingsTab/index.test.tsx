import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';

import { DataSettingsTab } from './index';

describe('DataSettingsTab', () => {
  it('エクスポートボタンが表示される', () => {
    render(<DataSettingsTab onExport={() => {}} />);
    expect(screen.getByRole('button', { name: 'エクスポート' })).toBeDefined();
  });

  it('ファイルインポート要素が表示される', () => {
    render(<DataSettingsTab onImport={() => {}} />);
    // FileInput ボタン
    expect(screen.getByRole('button', { name: /ファイルを選択/i })).toBeDefined();
  });

  it('リセットボタンが表示される', () => {
    render(<DataSettingsTab onReset={() => {}} />);
    expect(screen.getByRole('button', { name: '全データをリセット' })).toBeDefined();
  });

  it('ストレージ情報が表示される', () => {
    render(<DataSettingsTab storageInfo={{ usedKb: 142, slots: 1, lastSavedAt: '5 分前' }} />);
    expect(screen.getByText('142')).toBeDefined();
    expect(screen.getByText('5 分前', { exact: false })).toBeDefined();
  });

  it('リセットボタンを押すとダイアログが開く', async () => {
    const user = userEvent.setup();
    const onReset = vi.fn();
    render(<DataSettingsTab onReset={onReset} />);

    await user.click(screen.getByRole('button', { name: '全データをリセット' }));
    // ConfirmDialog の確認ボタンが表示される
    expect(screen.getByRole('button', { name: 'リセットする' })).toBeDefined();
  });

  it('ダイアログでキャンセルを押すと onReset は呼ばれない', async () => {
    const user = userEvent.setup();
    const onReset = vi.fn();
    render(<DataSettingsTab onReset={onReset} />);

    await user.click(screen.getByRole('button', { name: '全データをリセット' }));
    await user.click(screen.getByRole('button', { name: 'キャンセル' }));

    expect(onReset).not.toHaveBeenCalled();
  });

  it('ダイアログで「リセットする」を押すと onReset が呼ばれる', async () => {
    const user = userEvent.setup();
    const onReset = vi.fn();
    render(<DataSettingsTab onReset={onReset} />);

    await user.click(screen.getByRole('button', { name: '全データをリセット' }));
    await user.click(screen.getByRole('button', { name: 'リセットする' }));

    await waitFor(() => {
      expect(onReset).toHaveBeenCalledOnce();
    });
  });

  it('エクスポートボタンを押すと onExport が呼ばれる', async () => {
    const user = userEvent.setup();
    const onExport = vi.fn();
    render(<DataSettingsTab onExport={onExport} />);

    await user.click(screen.getByRole('button', { name: 'エクスポート' }));
    expect(onExport).toHaveBeenCalledOnce();
  });

  it('onReset が未定義のとき「全データをリセット」ボタンは disabled', () => {
    render(<DataSettingsTab />);
    const btn = screen.getByRole('button', { name: '全データをリセット' });
    expect((btn as HTMLButtonElement).disabled).toBe(true);
  });
});
