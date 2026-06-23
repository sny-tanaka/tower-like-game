import { act, render } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

import { CannonShellFx } from './index';

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

  test('20ms 後に着弾位置 (x2%, y2%) に切り替わる', () => {
    const { container } = render(
      <CannonShellFx
        x1={10}
        y1={20}
        x2={80}
        y2={70}
      />
    );
    act(() => {
      vi.advanceTimersByTime(30);
    });
    const shell = container.querySelector('[class*="shell"]') as HTMLElement;
    expect(shell.style.left).toBe('80%');
    expect(shell.style.top).toBe('70%');
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
