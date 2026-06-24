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

  test('rotateMs が CSS 変数 (--ct-rotate-ms) に反映される', () => {
    const { container } = render(<CutterOrbitFx rotateMs={2000} />);
    const hub = container.firstChild as HTMLElement;
    expect(hub.style.getPropertyValue('--ct-rotate-ms')).toBe('2000ms');
  });

  test('direction=ccw で .hubCcw クラスが付与される (cw=hubCw)', () => {
    const { container: ccwCont } = render(<CutterOrbitFx direction="ccw" />);
    const ccwHub = ccwCont.firstChild as HTMLElement;
    expect(ccwHub.className).toMatch(/hubCcw/);

    const { container: cwCont } = render(<CutterOrbitFx direction="cw" />);
    const cwHub = cwCont.firstChild as HTMLElement;
    expect(cwHub.className).toMatch(/hubCw/);
  });

  test('Issue #87 回帰: <style> タグを動的注入しない', () => {
    const { container } = render(<CutterOrbitFx />);
    expect(container.querySelector('style')).toBeNull();
  });
});
