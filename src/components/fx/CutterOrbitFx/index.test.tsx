import { act, render } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

import { CutterOrbitFx } from './index';

describe('CutterOrbitFx', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  test('blades 数 (default 2) 分の刃 SVG が描画される', () => {
    const { container } = render(<CutterOrbitFx blades={3} />);
    const blades = container.querySelectorAll('[class*="blade"]');
    expect(blades.length).toBe(3);
  });

  test('sweep (残光扇形) も blades 数だけ描画される', () => {
    const { container } = render(<CutterOrbitFx blades={2} />);
    const sweeps = container.querySelectorAll('[class*="sweep"]');
    expect(sweeps.length).toBe(2);
  });

  test('orbit (円ガイド) が描画される', () => {
    const { container } = render(<CutterOrbitFx />);
    expect(container.querySelector('[class*="orbit"]')).not.toBeNull();
  });

  test('duration を指定すると指定 ms 後に onDone が呼ばれる', () => {
    const onDone = vi.fn();
    render(
      <CutterOrbitFx
        duration={1500}
        onDone={onDone}
      />
    );
    act(() => {
      vi.advanceTimersByTime(1600);
    });
    expect(onDone).toHaveBeenCalledTimes(1);
  });

  test('duration 未指定では onDone が呼ばれない (無限ループ)', () => {
    const onDone = vi.fn();
    render(<CutterOrbitFx onDone={onDone} />);
    act(() => {
      vi.advanceTimersByTime(5000);
    });
    expect(onDone).not.toHaveBeenCalled();
  });

  test('rotateMs が CSS に反映される', () => {
    const { container } = render(<CutterOrbitFx rotateMs={2000} />);
    expect(container.querySelector('style')?.innerHTML).toContain('2000ms');
  });

  test('direction=ccw で逆回転が CSS に反映される', () => {
    const { container } = render(<CutterOrbitFx direction="ccw" />);
    expect(container.querySelector('style')?.innerHTML).toContain('rotate(-360deg)');
  });
});
