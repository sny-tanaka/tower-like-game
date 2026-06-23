import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';

import { ScreenSaverDialog } from './index';

describe('ScreenSaverDialog', () => {
  it('open=false の時に何も表示されない', () => {
    render(
      <ScreenSaverDialog
        open={false}
        onClose={vi.fn()}
      />
    );
    expect(screen.queryByRole('button', { name: 'スクリーンセーバーを終了' })).toBeNull();
  });

  it('open=true の時にスクリーンセーバーが表示される', () => {
    render(
      <ScreenSaverDialog
        open={true}
        onClose={vi.fn()}
      />
    );
    expect(screen.getByRole('button', { name: 'スクリーンセーバーを終了' })).toBeDefined();
  });

  it('画面タップで onClose が呼ばれる', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(
      <ScreenSaverDialog
        open={true}
        onClose={onClose}
      />
    );
    const saverBtn = screen.getByRole('button', { name: 'スクリーンセーバーを終了' });
    await user.click(saverBtn);
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('Enter キーで onClose が呼ばれる', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(
      <ScreenSaverDialog
        open={true}
        onClose={onClose}
      />
    );
    const saverBtn = screen.getByRole('button', { name: 'スクリーンセーバーを終了' });
    saverBtn.focus();
    await user.keyboard('{Enter}');
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('スペースキーで onClose が呼ばれる', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(
      <ScreenSaverDialog
        open={true}
        onClose={onClose}
      />
    );
    const saverBtn = screen.getByRole('button', { name: 'スクリーンセーバーを終了' });
    saverBtn.focus();
    await user.keyboard(' ');
    expect(onClose).toHaveBeenCalledOnce();
  });
});
