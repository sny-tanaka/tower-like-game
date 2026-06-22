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
});
