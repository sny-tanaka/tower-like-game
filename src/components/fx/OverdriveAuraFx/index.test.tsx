import { render } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import { OverdriveAuraFx } from './index';

describe('OverdriveAuraFx', () => {
  test('マウント時に DOM に描画される', () => {
    const { container } = render(
      <OverdriveAuraFx
        x={50}
        y={50}
      />
    );
    expect(container.firstChild).not.toBeNull();
  });

  test('x/y % が style タグに反映される', () => {
    const { container } = render(
      <OverdriveAuraFx
        x={30}
        y={70}
      />
    );
    const style = container.querySelector('style');
    expect(style?.textContent).toContain('left: 30%');
    expect(style?.textContent).toContain('top: 70%');
  });

  test('2 つのリング要素が存在する', () => {
    const { container } = render(
      <OverdriveAuraFx
        x={50}
        y={50}
      />
    );
    // wrap div の中に r1 + r2 = 2 children
    const wrap = container.querySelector<HTMLElement>('div');
    expect(wrap?.children.length).toBe(2);
  });

  test('prefers-reduced-motion スタイルが含まれる', () => {
    const { container } = render(
      <OverdriveAuraFx
        x={50}
        y={50}
      />
    );
    const style = container.querySelector('style');
    expect(style?.textContent).toContain('prefers-reduced-motion');
  });
});
