import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import { Enemy, spawnedEnemyToVisualType } from './index';

describe('Enemy', () => {
  test('type 6 種すべてが role=img + aria-label 付きで描画される', () => {
    const types = ['standard', 'swift', 'tough', 'elite', 'miniboss', 'boss'] as const;
    for (const t of types) {
      const { container, unmount } = render(<Enemy type={t} />);
      const root = container.querySelector(`[data-enemy-type="${t}"]`);
      expect(root).not.toBeNull();
      expect(root?.getAttribute('aria-label')).toBe(`${t} enemy`);
      unmount();
    }
  });

  test('elite / miniboss / boss は hp 指定時に HP バーが描画される (default ON)', () => {
    const { container } = render(
      <Enemy
        type="elite"
        hp={0.5}
      />
    );
    // hpBar / hpFill が CSS Modules で生成される
    const fills = container.querySelectorAll('[class*="hpFill"]');
    expect(fills.length).toBe(1);
    expect((fills[0] as HTMLElement).style.width).toBe('50%');
  });

  test('通常敵 (standard) は default で HP バーを出さない', () => {
    const { container } = render(
      <Enemy
        type="standard"
        hp={0.5}
      />
    );
    const fills = container.querySelectorAll('[class*="hpFill"]');
    expect(fills.length).toBe(0);
  });

  test('通常敵でも showHp=true なら HP バーを出す', () => {
    const { container } = render(
      <Enemy
        type="standard"
        hp={0.3}
        showHp
      />
    );
    const fills = container.querySelectorAll('[class*="hpFill"]');
    expect(fills.length).toBe(1);
  });

  test('size 指定で width/height が反映される', () => {
    const { container } = render(
      <Enemy
        type="boss"
        size={80}
      />
    );
    const root = container.querySelector('[data-enemy-type="boss"]') as HTMLElement;
    expect(root.style.width).toBe('80px');
    expect(root.style.height).toBe('80px');
  });

  test('status が data-status に反映される', () => {
    render(
      <Enemy
        type="standard"
        status="frozen"
      />
    );
    const el = screen.getByRole('img');
    expect(el.getAttribute('data-status')).toBe('frozen');
  });

  test('hp は 0-1 範囲外でもクランプされる', () => {
    const { container } = render(
      <Enemy
        type="boss"
        hp={1.5}
      />
    );
    const fill = container.querySelector('[class*="hpFill"]') as HTMLElement;
    expect(fill.style.width).toBe('100%');
  });

  test('hp = 0 では fill が 0% になる', () => {
    const { container } = render(
      <Enemy
        type="boss"
        hp={0}
      />
    );
    const fill = container.querySelector('[class*="hpFill"]') as HTMLElement;
    expect(fill.style.width).toBe('0%');
  });
});

describe('spawnedEnemyToVisualType', () => {
  test('elite → "elite"', () => {
    expect(spawnedEnemyToVisualType('elite')).toBe('elite');
  });
  test('miniboss → "miniboss"', () => {
    expect(spawnedEnemyToVisualType('miniboss')).toBe('miniboss');
  });
  test('boss → "boss"', () => {
    expect(spawnedEnemyToVisualType('boss')).toBe('boss');
  });
  test('normal + standard → "standard"', () => {
    expect(spawnedEnemyToVisualType('normal', 'standard')).toBe('standard');
  });
  test('normal + swift → "swift"', () => {
    expect(spawnedEnemyToVisualType('normal', 'swift')).toBe('swift');
  });
  test('normal + tough → "tough"', () => {
    expect(spawnedEnemyToVisualType('normal', 'tough')).toBe('tough');
  });
  test('normal + subtype なし → "standard" (フォールバック)', () => {
    expect(spawnedEnemyToVisualType('normal')).toBe('standard');
  });
});
