import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test, vi } from 'vitest';

import { IconButton } from './index';

describe('IconButton', () => {
  test('aria-label が設定される', () => {
    render(
      <IconButton
        icon={<span />}
        label="テストボタン"
      />
    );
    expect(screen.getByRole('button', { name: 'テストボタン' })).toBeInTheDocument();
  });

  test('type は常に button', () => {
    render(
      <IconButton
        icon={<span />}
        label="btn"
      />
    );
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
  });

  test('onClick が呼ばれる', async () => {
    const handler = vi.fn();
    render(
      <IconButton
        icon={<span />}
        label="click me"
        onClick={handler}
      />
    );
    await userEvent.click(screen.getByRole('button'));
    expect(handler).toHaveBeenCalledTimes(1);
  });

  test('disabled のとき onClick が呼ばれない', () => {
    const handler = vi.fn();
    render(
      <IconButton
        icon={<span />}
        label="disabled"
        onClick={handler}
        disabled
      />
    );
    const btn = screen.getByRole('button');
    expect(btn).toBeDisabled();
    // pointer-events: none なので fireEvent で直接 click を試みる
    fireEvent.click(btn);
    expect(handler).not.toHaveBeenCalled();
  });

  test('disabled のとき aria-disabled が true', () => {
    render(
      <IconButton
        icon={<span />}
        label="disabled"
        disabled
      />
    );
    expect(screen.getByRole('button')).toHaveAttribute('aria-disabled', 'true');
  });

  test('variant クラスが付く', () => {
    const { rerender } = render(
      <IconButton
        icon={<span />}
        label="v"
        variant="default"
      />
    );
    const btn = screen.getByRole('button');
    expect(btn.className).toMatch(/variant-default/);

    rerender(
      <IconButton
        icon={<span />}
        label="v"
        variant="ghost"
      />
    );
    expect(btn.className).toMatch(/variant-ghost/);
  });

  test('size クラスが付く', () => {
    const { rerender } = render(
      <IconButton
        icon={<span />}
        label="s"
        size="sm"
      />
    );
    const btn = screen.getByRole('button');
    expect(btn.className).toMatch(/size-sm/);

    rerender(
      <IconButton
        icon={<span />}
        label="s"
        size="lg"
      />
    );
    expect(btn.className).toMatch(/size-lg/);
  });

  test('icon が描画される', () => {
    render(
      <IconButton
        icon={<span data-testid="my-icon" />}
        label="with icon"
      />
    );
    expect(screen.getByTestId('my-icon')).toBeInTheDocument();
  });
});
