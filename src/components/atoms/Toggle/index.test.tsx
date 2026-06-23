import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test, vi } from 'vitest';

import { Toggle } from './index';

describe('Toggle', () => {
  test('OFF 状態で aria-checked が false', () => {
    render(
      <Toggle
        checked={false}
        onChange={() => {}}
      />
    );
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'false');
  });

  test('ON 状態で aria-checked が true', () => {
    render(
      <Toggle
        checked={true}
        onChange={() => {}}
      />
    );
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'true');
  });

  test('クリックで onChange(!checked) が呼ばれる（OFF → ON）', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <Toggle
        checked={false}
        onChange={onChange}
      />
    );
    await user.click(screen.getByRole('switch'));
    expect(onChange).toHaveBeenCalledWith(true);
  });

  test('クリックで onChange(!checked) が呼ばれる（ON → OFF）', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <Toggle
        checked={true}
        onChange={onChange}
      />
    );
    await user.click(screen.getByRole('switch'));
    expect(onChange).toHaveBeenCalledWith(false);
  });

  test('label が表示される', () => {
    render(
      <Toggle
        checked={false}
        onChange={() => {}}
        label="テストラベル"
      />
    );
    expect(screen.getByText('テストラベル')).toBeInTheDocument();
  });

  test('disabled 時に onChange が発火しない', () => {
    const onChange = vi.fn();
    render(
      <Toggle
        checked={false}
        onChange={onChange}
        disabled
      />
    );
    // disabled 時は button 自体が disabled になっているため発火しない
    const sw = screen.getByRole('switch');
    expect(sw).toBeDisabled();
    fireEvent.click(sw);
    expect(onChange).not.toHaveBeenCalled();
  });

  test('disabled 時に button が disabled になる', () => {
    render(
      <Toggle
        checked={false}
        onChange={() => {}}
        disabled
      />
    );
    expect(screen.getByRole('switch')).toBeDisabled();
  });

  test('accent prop に応じた className が付与される', () => {
    const { container, rerender } = render(
      <Toggle
        checked
        onChange={() => {}}
        accent="primary"
      />
    );
    expect(container.querySelector('[role="switch"]')!.className).toMatch(/accent_primary/);

    rerender(
      <Toggle
        checked
        onChange={() => {}}
        accent="secondary"
      />
    );
    expect(container.querySelector('[role="switch"]')!.className).toMatch(/accent_secondary/);

    rerender(
      <Toggle
        checked
        onChange={() => {}}
        accent="success"
      />
    );
    expect(container.querySelector('[role="switch"]')!.className).toMatch(/accent_success/);
  });

  test('accent=disabled のとき操作不可になる', () => {
    const onChange = vi.fn();
    render(
      <Toggle
        checked={false}
        onChange={onChange}
        accent="disabled"
      />
    );
    const sw = screen.getByRole('switch');
    expect(sw).toBeDisabled();
    fireEvent.click(sw);
    expect(onChange).not.toHaveBeenCalled();
  });

  test('size prop に応じた className が付与される', () => {
    const { container, rerender } = render(
      <Toggle
        checked={false}
        onChange={() => {}}
        size="sm"
      />
    );
    expect(container.querySelector('[role="switch"]')!.className).toMatch(/size_sm/);

    rerender(
      <Toggle
        checked={false}
        onChange={() => {}}
        size="md"
      />
    );
    expect(container.querySelector('[role="switch"]')!.className).toMatch(/size_md/);
  });

  test('description が表示される', () => {
    render(
      <Toggle
        checked={false}
        onChange={() => {}}
        label="バイブレーション"
        description="ヒット時の振動フィードバック"
      />
    );
    expect(screen.getByText('ヒット時の振動フィードバック')).toBeInTheDocument();
  });
});
