import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

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

// ---------------------------------------------------------------------------
// Wake Lock (Issue #78 焼き付き対策)
// ---------------------------------------------------------------------------

describe('ScreenSaverDialog — Wake Lock', () => {
  let releaseSpy: ReturnType<typeof vi.fn>;
  let requestSpy: ReturnType<typeof vi.fn>;
  const originalWakeLock = (navigator as unknown as { wakeLock?: unknown }).wakeLock;

  beforeEach(() => {
    releaseSpy = vi.fn().mockResolvedValue(undefined);
    requestSpy = vi.fn().mockResolvedValue({ release: releaseSpy });
    Object.defineProperty(navigator, 'wakeLock', {
      value: { request: requestSpy },
      configurable: true,
    });
  });

  afterEach(() => {
    if (originalWakeLock === undefined) {
      delete (navigator as unknown as { wakeLock?: unknown }).wakeLock;
    } else {
      Object.defineProperty(navigator, 'wakeLock', {
        value: originalWakeLock,
        configurable: true,
      });
    }
  });

  it('open=true で wakeLock.request("screen") が呼ばれる', async () => {
    await act(async () => {
      render(
        <ScreenSaverDialog
          open={true}
          onClose={vi.fn()}
        />
      );
    });
    expect(requestSpy).toHaveBeenCalledWith('screen');
  });

  it('open=false → unmount で sentinel.release() が呼ばれる', async () => {
    const { rerender, unmount } = render(
      <ScreenSaverDialog
        open={true}
        onClose={vi.fn()}
      />
    );
    // Wake Lock 取得の Promise resolve を待つ
    await act(async () => {});
    // open=false に切り替え (useEffect cleanup で release)
    await act(async () => {
      rerender(
        <ScreenSaverDialog
          open={false}
          onClose={vi.fn()}
        />
      );
    });
    expect(releaseSpy).toHaveBeenCalled();
    unmount();
  });

  it('open=false 初期では wakeLock.request は呼ばれない', () => {
    render(
      <ScreenSaverDialog
        open={false}
        onClose={vi.fn()}
      />
    );
    expect(requestSpy).not.toHaveBeenCalled();
  });
});
