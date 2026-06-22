import { render } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import { BurnFx } from './index';

describe('BurnFx', () => {
  test('マウント時に DOM に描画される', () => {
    const { container } = render(
      <BurnFx
        x={50}
        y={50}
      />
    );
    expect(container.firstChild).not.toBeNull();
  });

  test('x/y % が wrap の style に反映される', () => {
    const { container } = render(
      <BurnFx
        x={30}
        y={70}
      />
    );
    const wrap = container.querySelector<HTMLElement>('[style]');
    expect(wrap?.style.left).toBe('30%');
    expect(wrap?.style.top).toBe('70%');
  });

  test('炎コア + エミッタ 3 つの計 4 子要素が存在する', () => {
    const { container } = render(
      <BurnFx
        x={50}
        y={50}
      />
    );
    const wrap = container.querySelector<HTMLElement>('[style]');
    expect(wrap?.children.length).toBe(4);
  });

  test('prefers-reduced-motion スタイルが含まれる', () => {
    const { container } = render(
      <BurnFx
        x={50}
        y={50}
      />
    );
    const style = container.querySelector('style');
    expect(style?.textContent).toContain('prefers-reduced-motion');
  });
});
