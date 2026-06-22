import { fireEvent, render } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';

import { DamagePopFx } from './index';

describe('DamagePopFx', () => {
  test('マウント時に DOM に描画される', () => {
    const { container } = render(
      <DamagePopFx
        value={100}
        x={50}
        y={50}
      />
    );
    expect(container.firstChild).not.toBeNull();
  });

  test('onDone が onAnimationEnd で呼ばれる', () => {
    const onDone = vi.fn();
    const { container } = render(
      <DamagePopFx
        value={100}
        x={50}
        y={50}
        onDone={onDone}
      />
    );
    // style タグの次の div が onAnimationEnd を持つ要素
    const animEl = container.querySelector<HTMLElement>('div');
    if (animEl) {
      fireEvent.animationEnd(animEl);
    }
    expect(onDone).toHaveBeenCalledTimes(1);
  });

  test('crit=true で style タグに scale(1.15) が含まれる', () => {
    const { container } = render(
      <DamagePopFx
        value={9999}
        x={50}
        y={50}
        crit
      />
    );
    const style = container.querySelector('style');
    expect(style?.textContent).toContain('1.15');
  });

  test('crit=false で style タグに scale(1.15) が含まれない', () => {
    const { container } = render(
      <DamagePopFx
        value={100}
        x={50}
        y={50}
        crit={false}
      />
    );
    const style = container.querySelector('style');
    expect(style?.textContent).not.toContain('1.15');
  });
});
