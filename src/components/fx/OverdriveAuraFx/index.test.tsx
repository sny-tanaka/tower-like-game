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

  test('x/y が CSS 変数 (--oa-x / --oa-y) に反映される', () => {
    const { container } = render(
      <OverdriveAuraFx
        x={30}
        y={70}
      />
    );
    const wrap = container.firstChild as HTMLElement;
    expect(wrap.style.getPropertyValue('--oa-x')).toBe('30%');
    expect(wrap.style.getPropertyValue('--oa-y')).toBe('70%');
  });

  test('2 つのリング要素が存在する', () => {
    const { container } = render(
      <OverdriveAuraFx
        x={50}
        y={50}
      />
    );
    // wrap div の中に r1 + r2 = 2 children
    const wrap = container.firstChild as HTMLElement;
    expect(wrap.children.length).toBe(2);
  });

  test('Issue #87 回帰: <style> タグを動的注入しない', () => {
    const { container } = render(
      <OverdriveAuraFx
        x={50}
        y={50}
      />
    );
    expect(container.querySelector('style')).toBeNull();
  });
});
