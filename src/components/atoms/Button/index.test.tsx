import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test, vi } from 'vitest';

import { Button } from './index';

describe('Button', () => {
  test('label が描画される', () => {
    render(<Button label="テストボタン" />);
    expect(screen.getByRole('button', { name: 'テストボタン' })).toBeInTheDocument();
  });

  test('デフォルト type は button', () => {
    render(<Button label="btn" />);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
  });

  test('type="submit" が反映される', () => {
    render(
      <Button
        label="submit"
        type="submit"
      />
    );
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
  });

  test('onClick が呼ばれる', async () => {
    const handler = vi.fn();
    render(
      <Button
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
      <Button
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
      <Button
        label="disabled"
        disabled
      />
    );
    expect(screen.getByRole('button')).toHaveAttribute('aria-disabled', 'true');
  });

  test('iconLeft / iconRight が描画される', () => {
    render(
      <Button
        label="with icons"
        iconLeft={<span data-testid="left-icon" />}
        iconRight={<span data-testid="right-icon" />}
      />
    );
    expect(screen.getByTestId('left-icon')).toBeInTheDocument();
    expect(screen.getByTestId('right-icon')).toBeInTheDocument();
  });

  test('variant クラスが付く', () => {
    const { rerender } = render(
      <Button
        label="v"
        variant="primary"
      />
    );
    const btn = screen.getByRole('button');
    expect(btn.className).toMatch(/variant-primary/);

    rerender(
      <Button
        label="v"
        variant="danger"
      />
    );
    expect(btn.className).toMatch(/variant-danger/);
  });

  test('size クラスが付く', () => {
    const { rerender } = render(
      <Button
        label="s"
        size="sm"
      />
    );
    const btn = screen.getByRole('button');
    expect(btn.className).toMatch(/size-sm/);

    rerender(
      <Button
        label="s"
        size="lg"
      />
    );
    expect(btn.className).toMatch(/size-lg/);
  });

  test('fullWidth クラスが付く', () => {
    render(
      <Button
        label="fw"
        fullWidth
      />
    );
    expect(screen.getByRole('button').className).toMatch(/fullWidth/);
  });
});
