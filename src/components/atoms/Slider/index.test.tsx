import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';

import { Slider } from './index';

describe('Slider', () => {
  test('input[type=range] が描画される', () => {
    render(
      <Slider
        value={0.5}
        onChange={() => {}}
      />
    );
    expect(screen.getByRole('slider')).toBeInTheDocument();
  });

  test('value が aria-valuenow に反映される', () => {
    render(
      <Slider
        value={0.5}
        min={0}
        max={1}
        onChange={() => {}}
      />
    );
    expect(screen.getByRole('slider')).toHaveAttribute('aria-valuenow', '0.5');
  });

  test('onChange が変更後の数値を渡す', () => {
    const onChange = vi.fn();
    render(
      <Slider
        value={0.3}
        min={0}
        max={1}
        step={0.1}
        onChange={onChange}
      />
    );
    const input = screen.getByRole('slider');
    fireEvent.change(input, { target: { value: '0.7' } });
    expect(onChange).toHaveBeenCalledWith(0.7);
  });

  test('disabled 時に input が disabled になる', () => {
    render(
      <Slider
        value={0.5}
        onChange={() => {}}
        disabled
      />
    );
    expect(screen.getByRole('slider')).toBeDisabled();
  });

  test('disabled 時に onChange が発火しない', () => {
    const onChange = vi.fn();
    render(
      <Slider
        value={0.5}
        onChange={onChange}
        disabled
      />
    );
    const input = screen.getByRole('slider');
    fireEvent.change(input, { target: { value: '0.8' } });
    expect(onChange).not.toHaveBeenCalled();
  });

  test('min/max が input に反映される', () => {
    render(
      <Slider
        value={0.5}
        min={0.1}
        max={0.9}
        onChange={() => {}}
      />
    );
    const input = screen.getByRole('slider');
    expect(input).toHaveAttribute('min', '0.1');
    expect(input).toHaveAttribute('max', '0.9');
  });
});
