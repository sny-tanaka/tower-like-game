import { fireEvent, render } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';

import { VolleyFx } from './index';

describe('VolleyFx', () => {
  test('マウント時に DOM に描画される', () => {
    const { container } = render(
      <VolleyFx
        x={50}
        y={50}
      />
    );
    expect(container.firstChild).not.toBeNull();
  });

  test('count=5 のとき 5 つの弾要素が生成される', () => {
    const { container } = render(
      <VolleyFx
        x={50}
        y={50}
        count={5}
      />
    );
    // wrap div が最初の div
    const wrap = container.querySelector<HTMLElement>('div');
    expect(wrap?.children.length).toBe(5);
  });

  test('count=3 のとき 3 つの弾要素が生成される', () => {
    const { container } = render(
      <VolleyFx
        x={50}
        y={50}
        count={3}
      />
    );
    const wrap = container.querySelector<HTMLElement>('div');
    expect(wrap?.children.length).toBe(3);
  });

  test('onDone が onAnimationEnd で呼ばれる', () => {
    const onDone = vi.fn();
    const { container } = render(
      <VolleyFx
        x={50}
        y={50}
        onDone={onDone}
      />
    );
    const wrap = container.querySelector<HTMLElement>('div');
    if (wrap) {
      fireEvent.animationEnd(wrap);
    }
    expect(onDone).toHaveBeenCalledTimes(1);
  });

  test('prefers-reduced-motion スタイルが含まれる', () => {
    const { container } = render(
      <VolleyFx
        x={50}
        y={50}
      />
    );
    const style = container.querySelector('style');
    expect(style?.textContent).toContain('prefers-reduced-motion');
  });
});
