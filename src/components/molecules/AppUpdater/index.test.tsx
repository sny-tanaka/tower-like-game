import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { AppUpdater } from './index';

describe('AppUpdater', () => {
  it('banner === null のとき何も描画しない', () => {
    const { container } = render(
      <AppUpdater
        banner={null}
        onApply={() => {}}
      />
    );
    expect(container.innerHTML).toBe('');
  });

  describe('has-update', () => {
    it('「新しいバージョンがあります」と「更新」ボタンを表示する', () => {
      render(
        <AppUpdater
          banner={{ kind: 'has-update' }}
          onApply={() => {}}
        />
      );
      expect(screen.getByText('新しいバージョンがあります')).toBeDefined();
      expect(screen.getByRole('button', { name: '更新' })).toBeDefined();
    });

    it('「更新」ボタン押下で onApply が呼ばれる', async () => {
      const onApply = vi.fn();
      render(
        <AppUpdater
          banner={{ kind: 'has-update' }}
          onApply={onApply}
        />
      );
      await userEvent.click(screen.getByRole('button', { name: '更新' }));
      expect(onApply).toHaveBeenCalledOnce();
    });

    it('role="status" / aria-live="polite" が付与される', () => {
      render(
        <AppUpdater
          banner={{ kind: 'has-update' }}
          onApply={() => {}}
        />
      );
      const status = screen.getByRole('status');
      expect(status.getAttribute('aria-live')).toBe('polite');
    });
  });

  describe('up-to-date', () => {
    it('「現在のバージョンは最新です」を表示する', () => {
      render(
        <AppUpdater
          banner={{ kind: 'up-to-date' }}
          onApply={() => {}}
        />
      );
      expect(screen.getByText('現在のバージョンは最新です')).toBeDefined();
    });

    it('「更新」ボタンは表示しない', () => {
      render(
        <AppUpdater
          banner={{ kind: 'up-to-date' }}
          onApply={() => {}}
        />
      );
      expect(screen.queryByRole('button', { name: '更新' })).toBeNull();
    });
  });
});
