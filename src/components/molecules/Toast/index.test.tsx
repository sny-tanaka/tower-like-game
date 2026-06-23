import { act, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

import { Toast } from './index';

describe('Toast', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test('open=false のとき何も描画されない', () => {
    const { container } = render(
      <Toast
        open={false}
        kind="info"
        message="テスト"
      />
    );
    expect(container.firstChild).toBeNull();
  });

  test('open=true のとき message が描画される', () => {
    render(
      <Toast
        open
        kind="info"
        message="テストメッセージ"
      />
    );
    expect(screen.getByText('テストメッセージ')).toBeInTheDocument();
  });

  test('duration 後に onDismiss が呼ばれる', () => {
    const onDismiss = vi.fn();
    render(
      <Toast
        open
        kind="success"
        message="msg"
        onDismiss={onDismiss}
        duration={2000}
      />
    );
    expect(onDismiss).not.toHaveBeenCalled();
    act(() => {
      vi.advanceTimersByTime(2000);
    });
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  test('duration 前は onDismiss が呼ばれない', () => {
    const onDismiss = vi.fn();
    render(
      <Toast
        open
        kind="info"
        message="msg"
        onDismiss={onDismiss}
        duration={3000}
      />
    );
    act(() => {
      vi.advanceTimersByTime(2999);
    });
    expect(onDismiss).not.toHaveBeenCalled();
  });

  test('タップで即 onDismiss が呼ばれる', () => {
    const onDismiss = vi.fn();
    render(
      <Toast
        open
        kind="warning"
        message="タップして消す"
        onDismiss={onDismiss}
        duration={5000}
      />
    );
    // fake timer 環境では fireEvent を使って同期的にクリックする
    act(() => {
      screen.getByRole('status').click();
    });
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  test('kind クラスが付く', () => {
    const { rerender } = render(
      <Toast
        open
        kind="info"
        message="msg"
      />
    );
    expect(screen.getByRole('status').className).toMatch(/kind-info/);

    rerender(
      <Toast
        open
        kind="error"
        message="msg"
      />
    );
    expect(screen.getByRole('status').className).toMatch(/kind-error/);
  });

  test('aria-live="polite" が付く', () => {
    render(
      <Toast
        open
        kind="info"
        message="msg"
      />
    );
    expect(screen.getByRole('status')).toHaveAttribute('aria-live', 'polite');
  });

  test('open が false になったとき timer がクリアされる', () => {
    const onDismiss = vi.fn();
    const { rerender } = render(
      <Toast
        open
        kind="info"
        message="msg"
        onDismiss={onDismiss}
        duration={3000}
      />
    );
    // open=false に変えてコンポーネントをアンマウント相当にする
    rerender(
      <Toast
        open={false}
        kind="info"
        message="msg"
        onDismiss={onDismiss}
        duration={3000}
      />
    );
    act(() => {
      vi.advanceTimersByTime(3000);
    });
    // アンマウント後は onDismiss が呼ばれない
    expect(onDismiss).not.toHaveBeenCalled();
  });
});
