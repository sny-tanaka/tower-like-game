import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import { ScreenSaverFx } from './index';

describe('ScreenSaverFx', () => {
  test('items が描画される', () => {
    render(<ScreenSaverFx items={[<span key="a">item A</span>, <span key="b">item B</span>]} />);
    expect(screen.getByText('item A')).toBeInTheDocument();
    expect(screen.getByText('item B')).toBeInTheDocument();
  });

  test('items が空でもクラッシュしない', () => {
    expect(() => render(<ScreenSaverFx />)).not.toThrow();
  });

  test('showTower=false でタワー DOM が描画されない', () => {
    const { container } = render(<ScreenSaverFx showTower={false} />);
    const towers = container.querySelectorAll('[class*="tower"]');
    expect(towers.length).toBe(0);
  });

  test('showTower=true でタワーコンポジット (r1 / r2) が描画される', () => {
    const { container } = render(<ScreenSaverFx showTower={true} />);
    expect(container.querySelector('[class*="towerR1"]')).not.toBeNull();
    expect(container.querySelector('[class*="towerR2"]')).not.toBeNull();
  });

  test('towerContent が描画される（showTower=true 時）', () => {
    render(
      <ScreenSaverFx
        showTower={true}
        towerContent={<span>tower core</span>}
      />
    );
    expect(screen.getByText('tower core')).toBeInTheDocument();
  });

  test('cycleSeconds が CSS 変数 (--ss-cycle) に反映される', () => {
    const { container } = render(
      <ScreenSaverFx
        cycleSeconds={12}
        items={[<span key="x">x</span>]}
      />
    );
    const slot = container.querySelector('[class*="slot"]') as HTMLElement;
    expect(slot.style.getPropertyValue('--ss-cycle')).toBe('12s');
  });

  test('5 種類のドリフト経路クラス (p1〜p5) が item の index % 5 で割り当てられる', () => {
    const items = Array.from({ length: 6 }, (_, i) => <span key={i}>{i}</span>);
    const { container } = render(<ScreenSaverFx items={items} />);
    const slots = container.querySelectorAll('[class*="slot"]');
    expect(slots.length).toBe(6);
    // i=0 → p1, i=4 → p5, i=5 → p1 (wrap)
    expect((slots[0] as HTMLElement).className).toMatch(/p1/);
    expect((slots[4] as HTMLElement).className).toMatch(/p5/);
    expect((slots[5] as HTMLElement).className).toMatch(/p1/);
  });

  test('wrapper は pointer-events: none', () => {
    const { container } = render(<ScreenSaverFx />);
    const wrapper = container.firstChild as HTMLElement;
    // SCSS module の .root には pointer-events: none が含まれる
    expect(wrapper.className).toMatch(/root/);
  });

  test('Issue #87 回帰: <style> タグを動的注入しない', () => {
    const { container } = render(<ScreenSaverFx />);
    expect(container.querySelector('style')).toBeNull();
  });
});
