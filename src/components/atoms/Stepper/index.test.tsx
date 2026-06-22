import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test, vi } from 'vitest';

import { Stepper } from './index';

describe('Stepper', () => {
  test('現在値が表示される', () => {
    render(
      <Stepper
        value={5}
        min={1}
        max={10}
        onChange={() => {}}
      />
    );
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  test('[+] クリックで onChange が value + step を渡す', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <Stepper
        value={5}
        min={1}
        max={10}
        step={1}
        onChange={onChange}
      />
    );
    await user.click(screen.getByRole('button', { name: '増加' }));
    expect(onChange).toHaveBeenCalledWith(6);
  });

  test('[-] クリックで onChange が value - step を渡す', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <Stepper
        value={5}
        min={1}
        max={10}
        step={1}
        onChange={onChange}
      />
    );
    await user.click(screen.getByRole('button', { name: '減少' }));
    expect(onChange).toHaveBeenCalledWith(4);
  });

  test('step=2 で正しく増減する', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <Stepper
        value={4}
        min={0}
        max={10}
        step={2}
        onChange={onChange}
      />
    );
    await user.click(screen.getByRole('button', { name: '増加' }));
    expect(onChange).toHaveBeenCalledWith(6);
  });

  test('min のとき [-] ボタンが disabled になる', () => {
    render(
      <Stepper
        value={1}
        min={1}
        max={10}
        onChange={() => {}}
      />
    );
    expect(screen.getByRole('button', { name: '減少' })).toBeDisabled();
  });

  test('max のとき [+] ボタンが disabled になる', () => {
    render(
      <Stepper
        value={10}
        min={1}
        max={10}
        onChange={() => {}}
      />
    );
    expect(screen.getByRole('button', { name: '増加' })).toBeDisabled();
  });

  test('disabled 時に onChange が発火しない', () => {
    const onChange = vi.fn();
    render(
      <Stepper
        value={5}
        min={1}
        max={10}
        onChange={onChange}
        disabled
      />
    );
    // disabled 時は button 自体が disabled になり、内部ハンドラも早期 return する
    const incBtn = screen.getByRole('button', { name: '増加' });
    const decBtn = screen.getByRole('button', { name: '減少' });
    expect(incBtn).toBeDisabled();
    expect(decBtn).toBeDisabled();
    // disabled ボタンには onClick が発火しないことを確認（fireEvent は pointer-events を無視する）
    fireEvent.click(incBtn);
    fireEvent.click(decBtn);
    expect(onChange).not.toHaveBeenCalled();
  });

  test('min を下回らないようにクランプする', () => {
    render(
      <Stepper
        value={1}
        min={1}
        max={10}
        step={5}
        onChange={() => {}}
      />
    );
    // min のとき [-] は disabled なので発火しない
    const decBtn = screen.getByRole('button', { name: '減少' });
    expect(decBtn).toBeDisabled();
  });

  test('max を超えないようにクランプする', () => {
    render(
      <Stepper
        value={10}
        min={1}
        max={10}
        step={5}
        onChange={() => {}}
      />
    );
    const incBtn = screen.getByRole('button', { name: '増加' });
    expect(incBtn).toBeDisabled();
  });
});
