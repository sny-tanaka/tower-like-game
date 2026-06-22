import { render } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import type { IconName } from './index';
import { Icon } from './index';

const ALL_ICON_NAMES: IconName[] = [
  'close',
  'menu',
  'settings',
  'tower',
  'shield',
  'heart',
  'flame',
  'ice',
  'lightning',
  'skull',
  'spark',
  'target',
  'play',
  'pause',
  'chevron-left',
  'chevron-right',
  'chevron-up',
  'chevron-down',
  'check',
  'plus',
  'minus',
  'screw',
  'bolt',
  'alloy',
  'laser',
  'cannon',
  'thunder',
  'cutter',
];

describe('Icon', () => {
  test('すべての IconName で null 以外がレンダリングされる', () => {
    ALL_ICON_NAMES.forEach((name) => {
      const { container } = render(<Icon name={name} />);
      expect(container.querySelector('svg'), `${name} should render SVG`).not.toBeNull();
    });
  });

  test('size prop が width/height に反映される', () => {
    const { container } = render(
      <Icon
        name="tower"
        size={32}
      />
    );
    const svg = container.querySelector('svg')!;
    expect(svg).toHaveAttribute('width', '32');
    expect(svg).toHaveAttribute('height', '32');
  });

  test('デフォルト size は 16', () => {
    const { container } = render(<Icon name="tower" />);
    const svg = container.querySelector('svg')!;
    expect(svg).toHaveAttribute('width', '16');
    expect(svg).toHaveAttribute('height', '16');
  });

  test('color prop が stroke に反映される', () => {
    const { container } = render(
      <Icon
        name="close"
        color="#ff0000"
      />
    );
    const svg = container.querySelector('svg')!;
    expect(svg).toHaveAttribute('stroke', '#ff0000');
  });

  test('デフォルト color は currentColor', () => {
    const { container } = render(<Icon name="close" />);
    const svg = container.querySelector('svg')!;
    expect(svg).toHaveAttribute('stroke', 'currentColor');
  });

  test('className が SVG に渡される', () => {
    const { container } = render(
      <Icon
        name="tower"
        className="test-class"
      />
    );
    const svg = container.querySelector('svg')!;
    expect(svg).toHaveClass('test-class');
  });

  test('aria-hidden が設定される', () => {
    const { container } = render(<Icon name="heart" />);
    const svg = container.querySelector('svg')!;
    expect(svg).toHaveAttribute('aria-hidden', 'true');
  });
});
