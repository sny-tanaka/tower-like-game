import { act, render } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

import { CannonShellFx, formatShellTransform } from './index';

describe('formatShellTransform', () => {
  test('dx/dy から cqmin 換算 (1% = 1.4cqmin) の translate3d + 中央寄せ translate を生成する', () => {
    expect(formatShellTransform(10, -5)).toBe(
      'translate3d(14cqmin, -7cqmin, 0) translate(-50%, -50%)'
    );
  });

  test('dx=0, dy=0 のとき移動なし (中央寄せのみ) の transform を生成する', () => {
    expect(formatShellTransform(0, 0)).toBe('translate3d(0cqmin, 0cqmin, 0) translate(-50%, -50%)');
  });
});

describe('CannonShellFx', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  test('mount で initial 位置に配置される (left=x1%, top=y1%)', () => {
    const { container } = render(
      <CannonShellFx
        x1={10}
        y1={20}
        x2={80}
        y2={70}
      />
    );
    const shell = container.querySelector('[class*="shell"]') as HTMLElement;
    expect(shell.style.left).toBe('10%');
    expect(shell.style.top).toBe('20%');
  });

  // v1.4.7: iOS メモリ対策 — left/top は layout 再計算を誘発するため、 移動は transform で
  // 行い left/top はマウント時の値に固定したまま変化しないことを検証する。
  test('移動は transform で行われ、 left/top は moved 前後で変化しない (layout thrashing 回避)', () => {
    const { container } = render(
      <CannonShellFx
        x1={10}
        y1={20}
        x2={80}
        y2={70}
      />
    );
    const shell = container.querySelector('[class*="shell"]') as HTMLElement;
    expect(shell.style.left).toBe('10%');
    expect(shell.style.top).toBe('20%');
    expect(shell.style.transform).toBe(formatShellTransform(0, 0));

    act(() => {
      vi.advanceTimersByTime(30);
    });

    // left/top は変化しない
    expect(shell.style.left).toBe('10%');
    expect(shell.style.top).toBe('20%');
    // transform が移動量 (x2-x1, y2-y1) の cqmin 換算値に切り替わる
    expect(shell.style.transform).toBe(formatShellTransform(70, 50));
  });

  test('transition は transform に対して指定され、 left/top を含まない', () => {
    const { container } = render(
      <CannonShellFx
        x1={10}
        y1={20}
        x2={80}
        y2={70}
        duration={480}
      />
    );
    const shell = container.querySelector('[class*="shell"]') as HTMLElement;
    expect(shell.style.transition).toContain('transform');
    expect(shell.style.transition).not.toContain('left');
    expect(shell.style.transition).not.toContain('top');
  });

  test('duration + 20ms 経過で onDone が呼ばれる', () => {
    const onDone = vi.fn();
    render(
      <CannonShellFx
        duration={400}
        onDone={onDone}
      />
    );
    act(() => {
      vi.advanceTimersByTime(420);
    });
    expect(onDone).toHaveBeenCalledTimes(1);
  });

  test('size が width/height に反映される', () => {
    const { container } = render(<CannonShellFx size={5} />);
    const shell = container.querySelector('[class*="shell"]') as HTMLElement;
    expect(shell.style.width).toBe('5vmin');
    expect(shell.style.height).toBe('5vmin');
  });
});
