import { render } from '@testing-library/react';

import { CircularProgress } from './index';

describe('CircularProgress', () => {
  it('基本レンダリング', () => {
    const { container } = render(
      <CircularProgress
        value={50}
        max={100}
      />
    );
    const el = container.querySelector('svg')!;
    expect(el).toBeTruthy();
  });

  it('role=progressbar が設定される', () => {
    const { container } = render(
      <CircularProgress
        value={50}
        max={100}
      />
    );
    expect(container.querySelector('[role="progressbar"]')).toBeTruthy();
  });

  it('aria-valuenow / aria-valuemax が正しく設定される', () => {
    const { container } = render(
      <CircularProgress
        value={30}
        max={100}
      />
    );
    const el = container.querySelector('[role="progressbar"]')!;
    expect(el.getAttribute('aria-valuenow')).toBe('30');
    expect(el.getAttribute('aria-valuemax')).toBe('100');
    expect(el.getAttribute('aria-valuemin')).toBe('0');
  });

  it('size prop が SVG の width/height に反映される', () => {
    const { container } = render(
      <CircularProgress
        value={50}
        max={100}
        size={48}
      />
    );
    const svg = container.querySelector('svg')!;
    expect(svg.getAttribute('width')).toBe('48');
    expect(svg.getAttribute('height')).toBe('48');
  });

  it('value=0 のとき strokeDashoffset が circumference と等しい（線なし）', () => {
    const { container } = render(
      <CircularProgress
        value={0}
        max={100}
        size={24}
        thickness={3}
      />
    );
    const circles = container.querySelectorAll('circle');
    // 2つ目の circle が progress arc
    const arc = circles[1] as SVGCircleElement;
    const r = parseFloat(arc.getAttribute('r') ?? '0');
    const circumference = 2 * Math.PI * r;
    const dashOffset = parseFloat(arc.getAttribute('stroke-dashoffset') ?? '0');
    expect(dashOffset).toBeCloseTo(circumference, 1);
  });

  it('value=max のとき strokeDashoffset が 0（完全な円）', () => {
    const { container } = render(
      <CircularProgress
        value={100}
        max={100}
        size={24}
        thickness={3}
      />
    );
    const circles = container.querySelectorAll('circle');
    const arc = circles[1] as SVGCircleElement;
    const dashOffset = parseFloat(arc.getAttribute('stroke-dashoffset') ?? '1');
    expect(dashOffset).toBeCloseTo(0, 1);
  });

  it('value が max を超えても 100% にクランプされる', () => {
    const { container } = render(
      <CircularProgress
        value={200}
        max={100}
        size={24}
        thickness={3}
      />
    );
    const circles = container.querySelectorAll('circle');
    const arc = circles[1] as SVGCircleElement;
    const dashOffset = parseFloat(arc.getAttribute('stroke-dashoffset') ?? '1');
    expect(dashOffset).toBeCloseTo(0, 1);
  });

  it('color=hp のとき arc の stroke が var(--c-hp) になる', () => {
    const { container } = render(
      <CircularProgress
        value={50}
        max={100}
        color="hp"
      />
    );
    const circles = container.querySelectorAll('circle');
    const arc = circles[1] as SVGCircleElement;
    expect(arc.getAttribute('stroke')).toBe('var(--c-hp)');
  });

  it('color=cd のとき arc の stroke が var(--c-cd) になる', () => {
    const { container } = render(
      <CircularProgress
        value={50}
        max={100}
        color="cd"
      />
    );
    const circles = container.querySelectorAll('circle');
    const arc = circles[1] as SVGCircleElement;
    expect(arc.getAttribute('stroke')).toBe('var(--c-cd)');
  });

  it('max=0 でも除算エラーにならない', () => {
    expect(() => {
      render(
        <CircularProgress
          value={0}
          max={0}
        />
      );
    }).not.toThrow();
  });

  it.each([
    ['xs', 20],
    ['sm', 32],
    ['md', 48],
    ['lg', 64],
  ] as const)('size="%s" のとき width/height が %ipx になる', (sizeName, expectedPx) => {
    const { container } = render(
      <CircularProgress
        value={50}
        max={100}
        size={sizeName}
      />
    );
    const svg = container.querySelector('svg')!;
    expect(svg.getAttribute('width')).toBe(String(expectedPx));
    expect(svg.getAttribute('height')).toBe(String(expectedPx));
  });

  it('背景トラック（1 つ目の circle）が描画される', () => {
    const { container } = render(
      <CircularProgress
        value={50}
        max={100}
      />
    );
    const circles = container.querySelectorAll('circle');
    // [0]: 背景トラック / [1]: 進捗アーク
    expect(circles.length).toBe(2);
    expect(circles[0]?.getAttribute('fill')).toBe('none');
  });

  it('withLabel=true のとき中央にラベルが表示される', () => {
    const { container } = render(
      <CircularProgress
        value={42}
        max={100}
        withLabel
      />
    );
    expect(container.textContent).toContain('42%');
  });

  it('children が渡されると label より優先して表示される', () => {
    const { getByText } = render(
      <CircularProgress
        value={42}
        max={100}
        showLabel
      >
        <span>X</span>
      </CircularProgress>
    );
    expect(getByText('X')).toBeTruthy();
  });

  it.each(['hp', 'cd', 'wave', 'primary', 'warning'] as const)(
    'color=%s は arc の stroke にトークン変数を反映する',
    (color) => {
      const { container } = render(
        <CircularProgress
          value={50}
          max={100}
          color={color}
        />
      );
      const arc = container.querySelectorAll('circle')[1] as SVGCircleElement;
      expect(arc.getAttribute('stroke')).toBe(`var(--c-${color})`);
    }
  );
});
