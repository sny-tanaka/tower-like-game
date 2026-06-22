import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { Card } from '.';

describe('Card', () => {
  it('children が描画される', () => {
    render(<Card>テストコンテンツ</Card>);
    expect(screen.getByText('テストコンテンツ')).toBeTruthy();
  });

  it('デフォルト variant は default', () => {
    const { container } = render(<Card>content</Card>);
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain('variant-default');
  });

  it('variant="flat" のクラスが付く', () => {
    const { container } = render(<Card variant="flat">content</Card>);
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain('variant-flat');
  });

  it('variant="outline" のクラスが付く', () => {
    const { container } = render(<Card variant="outline">content</Card>);
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain('variant-outline');
  });

  it('デフォルト padding は md', () => {
    const { container } = render(<Card>content</Card>);
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain('padding-md');
  });

  it('padding="lg" のクラスが付く', () => {
    const { container } = render(<Card padding="lg">content</Card>);
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain('padding-lg');
  });

  it('interactive=true でクラスが付く', () => {
    const { container } = render(<Card interactive>content</Card>);
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain('interactive');
  });

  it('interactive=false (デフォルト) でクラスが付かない', () => {
    const { container } = render(<Card>content</Card>);
    const el = container.firstChild as HTMLElement;
    expect(el.className).not.toContain('interactive');
  });

  it('className が追加される', () => {
    const { container } = render(<Card className="custom-class">content</Card>);
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain('custom-class');
  });
});
