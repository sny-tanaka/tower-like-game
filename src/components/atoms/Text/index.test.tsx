import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import { Text } from './index';

describe('Text', () => {
  test('children が描画される', () => {
    render(<Text>テキスト内容</Text>);
    expect(screen.getByText('テキスト内容')).toBeInTheDocument();
  });

  test('heading-1 は h1 タグになる', () => {
    render(<Text variant="heading-1">タイトル</Text>);
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });

  test('heading-2 は h2 タグになる', () => {
    render(<Text variant="heading-2">見出し2</Text>);
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
  });

  test('heading-3 は h3 タグになる', () => {
    render(<Text variant="heading-3">見出し3</Text>);
    expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument();
  });

  test('body はデフォルトで span タグ', () => {
    const { container } = render(<Text variant="body">テキスト</Text>);
    expect(container.querySelector('span')).toBeInTheDocument();
  });

  test('as prop でタグを上書きできる', () => {
    const { container } = render(
      <Text
        variant="body"
        as="p"
      >
        段落
      </Text>
    );
    expect(container.querySelector('p')).toBeInTheDocument();
  });

  test('variant クラスが付く', () => {
    const { container } = render(<Text variant="heading-1">H1</Text>);
    const el = container.firstChild as HTMLElement;
    expect(el.className).toMatch(/variant_heading_1/);
  });

  test('color クラスが付く', () => {
    const { container } = render(<Text color="primary">primary</Text>);
    const el = container.firstChild as HTMLElement;
    expect(el.className).toMatch(/color_primary/);
  });

  test('デフォルト color は default', () => {
    const { container } = render(<Text>default color</Text>);
    const el = container.firstChild as HTMLElement;
    expect(el.className).toMatch(/color_default/);
  });

  test('danger color が適用される', () => {
    const { container } = render(<Text color="danger">危険</Text>);
    const el = container.firstChild as HTMLElement;
    expect(el.className).toMatch(/color_danger/);
  });

  test('numeric-l の variant クラスが付く', () => {
    const { container } = render(<Text variant="numeric-l">150.5B</Text>);
    const el = container.firstChild as HTMLElement;
    expect(el.className).toMatch(/variant_numeric_l/);
  });

  test('外部 className が付く', () => {
    const { container } = render(<Text className="external-class">テキスト</Text>);
    const el = container.firstChild as HTMLElement;
    expect(el).toHaveClass('external-class');
  });
});
