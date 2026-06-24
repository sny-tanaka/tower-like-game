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
    const animEl = container.querySelector<HTMLElement>('div');
    if (animEl) {
      fireEvent.animationEnd(animEl);
    }
    expect(onDone).toHaveBeenCalledTimes(1);
  });

  test('crit=true で .crit クラスが付与される', () => {
    const { container } = render(
      <DamagePopFx
        value={9999}
        x={50}
        y={50}
        crit
      />
    );
    const root = container.firstChild as HTMLElement;
    expect(root.className).toMatch(/crit/);
  });

  test('crit=false で .crit クラスが付与されない', () => {
    const { container } = render(
      <DamagePopFx
        value={100}
        x={50}
        y={50}
        crit={false}
      />
    );
    const root = container.firstChild as HTMLElement;
    expect(root.className).not.toMatch(/crit/);
  });

  test('Issue #87 回帰: <style> タグを動的注入しない (DOM 軽量化)', () => {
    const { container } = render(
      <DamagePopFx
        value={100}
        x={50}
        y={50}
      />
    );
    expect(container.querySelector('style')).toBeNull();
  });

  test('x / y / duration が CSS 変数として inline style に乗る', () => {
    const { container } = render(
      <DamagePopFx
        value={100}
        x={42}
        y={88}
        duration={500}
      />
    );
    const root = container.firstChild as HTMLElement;
    expect(root.style.getPropertyValue('--pop-x')).toBe('42%');
    expect(root.style.getPropertyValue('--pop-y')).toBe('88%');
    expect(root.style.getPropertyValue('--pop-duration')).toBe('500ms');
  });
});
