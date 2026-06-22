import { render } from '@testing-library/react';

import { NumericDisplay } from './index';

import { BigNum } from '@/lib/bignum/BigNum';

describe('NumericDisplay', () => {
  it('number を渡すと BigNum に変換して表示する', () => {
    const { container } = render(<NumericDisplay value={42} />);
    expect(container.querySelector('span')?.textContent).toBe('42');
  });

  it('BigNum を渡すと toDisplay() を表示する', () => {
    const { container } = render(<NumericDisplay value={BigNum.fromNumber(1_500_000)} />);
    expect(container.querySelector('span')?.textContent).toBe('1.50B');
  });

  it('< 1000 は raw 表示で --c-primary 色が設定される', () => {
    const { container } = render(
      <NumericDisplay
        value={999}
        accentColor="scale"
      />
    );
    const el = container.querySelector('span')!;
    expect(el.textContent).toBe('999');
    expect(el.style.color).toBe('var(--c-primary)');
  });

  it('accentColor=scale でサフィックス A の場合 oklch 色 H195 が設定される', () => {
    const { container } = render(
      <NumericDisplay
        value={BigNum.fromNumber(1_000)}
        accentColor="scale"
      />
    );
    const el = container.querySelector('span')!;
    expect(el.style.color).toMatch(/oklch/);
    expect(el.style.color).toContain('195');
  });

  it('accentColor=primary で var(--c-primary) が設定される', () => {
    const { container } = render(
      <NumericDisplay
        value={BigNum.fromNumber(1_000)}
        accentColor="primary"
      />
    );
    const el = container.querySelector('span')!;
    expect(el.style.color).toBe('var(--c-primary)');
  });

  it('accentColor=secondary で var(--c-secondary) が設定される', () => {
    const { container } = render(
      <NumericDisplay
        value={BigNum.fromNumber(1_000)}
        accentColor="secondary"
      />
    );
    const el = container.querySelector('span')!;
    expect(el.style.color).toBe('var(--c-secondary)');
  });

  it('accentColor=danger で var(--c-danger) が設定される', () => {
    const { container } = render(
      <NumericDisplay
        value={BigNum.fromNumber(1_000)}
        accentColor="danger"
      />
    );
    const el = container.querySelector('span')!;
    expect(el.style.color).toBe('var(--c-danger)');
  });

  it('accentColor=success で var(--c-success) が設定される', () => {
    const { container } = render(
      <NumericDisplay
        value={BigNum.fromNumber(1_000)}
        accentColor="success"
      />
    );
    const el = container.querySelector('span')!;
    expect(el.style.color).toBe('var(--c-success)');
  });

  it('glow=true のとき textShadow が設定される', () => {
    const { container } = render(
      <NumericDisplay
        value={BigNum.fromNumber(1_000)}
        glow
      />
    );
    const el = container.querySelector('span')!;
    expect(el.style.textShadow).not.toBe('');
  });

  it('glow=false のとき textShadow が設定されない', () => {
    const { container } = render(
      <NumericDisplay
        value={BigNum.fromNumber(1_000)}
        glow={false}
      />
    );
    const el = container.querySelector('span')!;
    expect(el.style.textShadow).toBe('');
  });

  it('size=sm のとき sizeSm クラスが付く', () => {
    const { container } = render(
      <NumericDisplay
        value={1}
        size="sm"
      />
    );
    const el = container.querySelector('span')!;
    expect(el.className).toContain('sizeSm');
  });

  it('size=lg のとき sizeLg クラスが付く', () => {
    const { container } = render(
      <NumericDisplay
        value={1}
        size="lg"
      />
    );
    const el = container.querySelector('span')!;
    expect(el.className).toContain('sizeLg');
  });

  it('外部 style prop がマージされる', () => {
    const { container } = render(
      <NumericDisplay
        value={1}
        style={{ fontSize: '40px' }}
      />
    );
    const el = container.querySelector('span')!;
    expect(el.style.fontSize).toBe('40px');
  });

  it('AA サフィックス（n=27）は色相が循環して oklch を返す', () => {
    // 10^81 は AA
    const bn = BigNum.fromString('1' + '0'.repeat(81));
    const { container } = render(
      <NumericDisplay
        value={bn}
        accentColor="scale"
      />
    );
    const el = container.querySelector('span')!;
    expect(el.style.color).toMatch(/oklch/);
  });

  it('Z (n=26) は H295 付近の oklch を返す', () => {
    // 10^78 は Z
    const bn = BigNum.fromString('1' + '0'.repeat(78));
    const { container } = render(
      <NumericDisplay
        value={bn}
        accentColor="scale"
      />
    );
    const el = container.querySelector('span')!;
    expect(el.style.color).toMatch(/oklch/);
    expect(el.style.color).toContain('295');
  });
});
