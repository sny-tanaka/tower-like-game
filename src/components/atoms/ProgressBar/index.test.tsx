import { render } from '@testing-library/react';

import { ProgressBar } from './index';

describe('ProgressBar', () => {
  it('基本レンダリング', () => {
    const { container } = render(
      <ProgressBar
        value={50}
        max={100}
      />
    );
    const el = container.querySelector('[role="progressbar"]')!;
    expect(el).toBeTruthy();
  });

  it('aria-valuenow / aria-valuemax が正しく設定される', () => {
    const { container } = render(
      <ProgressBar
        value={30}
        max={100}
      />
    );
    const el = container.querySelector('[role="progressbar"]')!;
    expect(el.getAttribute('aria-valuenow')).toBe('30');
    expect(el.getAttribute('aria-valuemax')).toBe('100');
    expect(el.getAttribute('aria-valuemin')).toBe('0');
  });

  it('fill の width が value/max × 100% になる', () => {
    const { container } = render(
      <ProgressBar
        value={50}
        max={100}
      />
    );
    const fill = container.querySelector('[role="progressbar"] > div')!;
    expect((fill as HTMLElement).style.width).toBe('50%');
  });

  it('value=0 のとき fill width が 0%', () => {
    const { container } = render(
      <ProgressBar
        value={0}
        max={100}
      />
    );
    const fill = container.querySelector('[role="progressbar"] > div')!;
    expect((fill as HTMLElement).style.width).toBe('0%');
  });

  it('value=max のとき fill width が 100%', () => {
    const { container } = render(
      <ProgressBar
        value={100}
        max={100}
      />
    );
    const fill = container.querySelector('[role="progressbar"] > div')!;
    expect((fill as HTMLElement).style.width).toBe('100%');
  });

  it('value が max を超えても 100% にクランプされる', () => {
    const { container } = render(
      <ProgressBar
        value={150}
        max={100}
      />
    );
    const fill = container.querySelector('[role="progressbar"] > div')!;
    expect((fill as HTMLElement).style.width).toBe('100%');
  });

  it('value が負でも 0% にクランプされる', () => {
    const { container } = render(
      <ProgressBar
        value={-10}
        max={100}
      />
    );
    const fill = container.querySelector('[role="progressbar"] > div')!;
    expect((fill as HTMLElement).style.width).toBe('0%');
  });

  it('showLabel=true のときラベルが表示される', () => {
    const { container } = render(
      <ProgressBar
        value={42}
        max={100}
        showLabel
      />
    );
    expect(container.textContent).toContain('42');
    expect(container.textContent).toContain('100');
  });

  it('showLabel=false のときラベルが表示されない', () => {
    const { container } = render(
      <ProgressBar
        value={42}
        max={100}
        showLabel={false}
      />
    );
    // role=progressbar の aria-label には値があるが、テキストコンテンツにはない
    const label = container.querySelector(`.label`);
    expect(label).toBeNull();
  });

  it('glow=true のとき fill に boxShadow が設定される', () => {
    const { container } = render(
      <ProgressBar
        value={50}
        max={100}
        glow
      />
    );
    const fill = container.querySelector('[role="progressbar"] > div')!;
    expect((fill as HTMLElement).style.boxShadow).not.toBe('');
  });

  it('glow=false のとき fill に boxShadow が設定されない', () => {
    const { container } = render(
      <ProgressBar
        value={50}
        max={100}
        glow={false}
      />
    );
    const fill = container.querySelector('[role="progressbar"] > div')!;
    expect((fill as HTMLElement).style.boxShadow).toBe('');
  });

  it('color prop に応じた backgroundColor が設定される', () => {
    const { container } = render(
      <ProgressBar
        value={50}
        max={100}
        color="hp"
      />
    );
    const fill = container.querySelector('[role="progressbar"] > div')!;
    expect((fill as HTMLElement).style.backgroundColor).toBe('var(--c-hp)');
  });

  it('size=sm クラスが設定される', () => {
    const { container } = render(
      <ProgressBar
        value={50}
        max={100}
        size="sm"
      />
    );
    const el = container.querySelector('[role="progressbar"]')!;
    expect(el.className).toContain('sizeSm');
  });

  it('size=lg クラスが設定される', () => {
    const { container } = render(
      <ProgressBar
        value={50}
        max={100}
        size="lg"
      />
    );
    const el = container.querySelector('[role="progressbar"]')!;
    expect(el.className).toContain('sizeLg');
  });

  it('max=0 でも除算エラーにならない', () => {
    expect(() => {
      render(
        <ProgressBar
          value={0}
          max={0}
        />
      );
    }).not.toThrow();
  });
});
