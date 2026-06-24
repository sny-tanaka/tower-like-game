import { render } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';

import { MachineHitFx } from './index';

describe('MachineHitFx', () => {
  test('aria-hidden 付きの div を 1 つレンダリングする', () => {
    const { container } = render(
      <MachineHitFx
        cx={50}
        cy={50}
      />
    );
    const div = container.querySelector('div[aria-hidden="true"]');
    expect(div).not.toBeNull();
  });

  test('cx / cy が CSS 変数 (--mhf-x / --mhf-y) に反映される', () => {
    const { container } = render(
      <MachineHitFx
        cx={30}
        cy={70}
      />
    );
    const flash = container.firstChild as HTMLElement;
    expect(flash.style.getPropertyValue('--mhf-x')).toBe('30%');
    expect(flash.style.getPropertyValue('--mhf-y')).toBe('70%');
  });

  test('duration が CSS 変数 (--mhf-duration) に反映される', () => {
    const { container } = render(
      <MachineHitFx
        cx={50}
        cy={50}
        duration={500}
      />
    );
    const flash = container.firstChild as HTMLElement;
    expect(flash.style.getPropertyValue('--mhf-duration')).toBe('500ms');
  });

  test('onDone が onAnimationEnd で呼ばれる', () => {
    const onDone = vi.fn();
    const { container } = render(
      <MachineHitFx
        cx={50}
        cy={50}
        onDone={onDone}
      />
    );
    const div = container.querySelector('div[aria-hidden="true"]') as HTMLDivElement;
    div.dispatchEvent(new Event('animationend', { bubbles: true }));
    expect(onDone).toHaveBeenCalledTimes(1);
  });

  test('Issue #87 回帰: <style> タグを動的注入しない', () => {
    const { container } = render(
      <MachineHitFx
        cx={50}
        cy={50}
      />
    );
    expect(container.querySelector('style')).toBeNull();
  });
});
