import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import { Badge } from './index';

describe('Badge', () => {
  test('text が描画される', () => {
    render(
      <Badge
        text="ELITE"
        variant="elite"
      />
    );
    expect(screen.getByText('ELITE')).toBeInTheDocument();
  });

  test('デフォルト variant は neutral (default は後方互換エイリアス)', () => {
    const { container } = render(<Badge text="N" />);
    const el = container.firstChild as HTMLElement;
    // default は内部で neutral に解決される
    expect(el.className).toMatch(/variant-neutral/);
  });

  test('elite variant クラスが付く', () => {
    const { container } = render(
      <Badge
        text="ELITE"
        variant="elite"
      />
    );
    const el = container.firstChild as HTMLElement;
    expect(el.className).toMatch(/variant-elite/);
  });

  test('boss variant クラスが付く', () => {
    const { container } = render(
      <Badge
        text="BOSS"
        variant="boss"
      />
    );
    const el = container.firstChild as HTMLElement;
    expect(el.className).toMatch(/variant-boss/);
  });

  test('glow クラスが付く (true)', () => {
    const { container } = render(
      <Badge
        text="glow"
        glow={true}
      />
    );
    const el = container.firstChild as HTMLElement;
    expect(el.className).toMatch(/glow/);
  });

  test('glow クラスが付かない (false)', () => {
    const { container } = render(
      <Badge
        text="no glow"
        glow={false}
      />
    );
    const el = container.firstChild as HTMLElement;
    // .glow クラスは付かないが .badge は付く
    expect(el.className).not.toMatch(/\bglow\b/);
  });

  test('tier=5 のとき --badge-color が --c-tier-5 を参照する', () => {
    const { container } = render(
      <Badge
        text="Tier 5"
        variant="tier"
        tier={5}
      />
    );
    const el = container.firstChild as HTMLElement;
    expect(el.style.getPropertyValue('--badge-color')).toBe('var(--c-tier-5)');
  });

  test('tier が 10 を超えると 10 にクランプされる', () => {
    const { container } = render(
      <Badge
        text="T99"
        variant="tier"
        tier={99}
      />
    );
    const el = container.firstChild as HTMLElement;
    expect(el.style.getPropertyValue('--badge-color')).toBe('var(--c-tier-10)');
  });

  test('tier が 1 未満は 1 にクランプされる', () => {
    const { container } = render(
      <Badge
        text="T0"
        variant="tier"
        tier={0}
      />
    );
    const el = container.firstChild as HTMLElement;
    expect(el.style.getPropertyValue('--badge-color')).toBe('var(--c-tier-1)');
  });

  test('patch-tier の tier=3 で --badge-color が --c-patch-t3 を参照する', () => {
    const { container } = render(
      <Badge
        text="PT3"
        variant="patch-tier"
        tier={3}
      />
    );
    const el = container.firstChild as HTMLElement;
    expect(el.style.getPropertyValue('--badge-color')).toBe('var(--c-patch-t3)');
  });
});
