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

  test('@keyframes を内部 style に注入する', () => {
    const { container } = render(
      <MachineHitFx
        cx={50}
        cy={50}
      />
    );
    const style = container.querySelector('style');
    expect(style?.textContent).toContain('@keyframes');
    expect(style?.textContent).toContain('flash');
  });

  test('cx / cy が CSS left / top に反映される', () => {
    const { container } = render(
      <MachineHitFx
        cx={30}
        cy={70}
      />
    );
    const style = container.querySelector('style');
    expect(style?.textContent).toContain('left: 30%');
    expect(style?.textContent).toContain('top: 70%');
  });

  test('duration が animation-duration に反映される', () => {
    const { container } = render(
      <MachineHitFx
        cx={50}
        cy={50}
        duration={500}
      />
    );
    const style = container.querySelector('style');
    expect(style?.textContent).toContain('500ms');
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

  test('prefers-reduced-motion 時のスタイルが含まれる', () => {
    const { container } = render(
      <MachineHitFx
        cx={50}
        cy={50}
      />
    );
    const style = container.querySelector('style');
    expect(style?.textContent).toContain('prefers-reduced-motion');
  });
});
