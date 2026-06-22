import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test, vi } from 'vitest';

import { SegmentedControl } from './index';

const options = [
  { label: '×1', value: 1 },
  { label: '×2', value: 2 },
  { label: '×4', value: 4 },
] as const;

describe('SegmentedControl', () => {
  test('選択中の option が aria-checked=true になる', () => {
    render(
      <SegmentedControl
        options={options}
        value={2}
        onChange={() => {}}
      />
    );
    const btn2 = screen.getByRole('radio', { name: '×2' });
    expect(btn2).toHaveAttribute('aria-checked', 'true');
  });

  test('非選択の option は aria-checked=false', () => {
    render(
      <SegmentedControl
        options={options}
        value={2}
        onChange={() => {}}
      />
    );
    const btn1 = screen.getByRole('radio', { name: '×1' });
    expect(btn1).toHaveAttribute('aria-checked', 'false');
  });

  test('option クリックで onChange が呼ばれる', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <SegmentedControl
        options={options}
        value={1}
        onChange={onChange}
      />
    );
    await user.click(screen.getByRole('radio', { name: '×4' }));
    expect(onChange).toHaveBeenCalledWith(4);
  });

  test('既に選択中の option クリックでも onChange が呼ばれる', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <SegmentedControl
        options={options}
        value={2}
        onChange={onChange}
      />
    );
    await user.click(screen.getByRole('radio', { name: '×2' }));
    expect(onChange).toHaveBeenCalledWith(2);
  });

  test('disabled 時に onChange が発火しない', () => {
    const onChange = vi.fn();
    render(
      <SegmentedControl
        options={options}
        value={1}
        onChange={onChange}
        disabled
      />
    );
    // disabled 時は全セグメントが disabled になっている
    const btn2 = screen.getByRole('radio', { name: '×2' });
    expect(btn2).toBeDisabled();
    fireEvent.click(btn2);
    expect(onChange).not.toHaveBeenCalled();
  });

  test('全ラベルが表示される', () => {
    render(
      <SegmentedControl
        options={options}
        value={1}
        onChange={() => {}}
      />
    );
    expect(screen.getByText('×1')).toBeInTheDocument();
    expect(screen.getByText('×2')).toBeInTheDocument();
    expect(screen.getByText('×4')).toBeInTheDocument();
  });

  test('string 型の value でも動作する', async () => {
    const stringOpts = [
      { label: 'A', value: 'a' },
      { label: 'B', value: 'b' },
    ] as const;
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <SegmentedControl
        options={stringOpts}
        value="a"
        onChange={onChange}
      />
    );
    await user.click(screen.getByRole('radio', { name: 'B' }));
    expect(onChange).toHaveBeenCalledWith('b');
  });
});
