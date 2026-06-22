import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { TitleHeader } from './index';

describe('TitleHeader', () => {
  it('デフォルトタイトル "NEON SPIRE" を表示する', () => {
    render(<TitleHeader />);
    expect(screen.getByRole('heading', { level: 1 })).toBeDefined();
    expect(screen.getByText('NEON SPIRE')).toBeDefined();
  });

  it('title prop が渡されたときそのテキストを表示する', () => {
    render(<TitleHeader title="CUSTOM TITLE" />);
    expect(screen.getByText('CUSTOM TITLE')).toBeDefined();
  });

  it('subtitle が渡されたとき表示する', () => {
    render(<TitleHeader subtitle="TOWER DEFENSE × INFINITE TIER" />);
    expect(screen.getByText('TOWER DEFENSE × INFINITE TIER')).toBeDefined();
  });

  it('subtitle が未指定のとき表示しない', () => {
    render(<TitleHeader />);
    expect(screen.queryByText('TOWER DEFENSE × INFINITE TIER')).toBeNull();
  });

  it('version が渡されたとき表示する', () => {
    render(<TitleHeader version="v0.1.0" />);
    expect(screen.getByText('v0.1.0')).toBeDefined();
  });

  it('version が未指定のとき表示しない', () => {
    render(<TitleHeader />);
    expect(screen.queryByText('v0.1.0')).toBeNull();
  });

  it('tagline が渡されたとき表示する', () => {
    render(<TitleHeader tagline="マシン + 武器 + パッチで攻略する放置寄りラン" />);
    expect(screen.getByText('マシン + 武器 + パッチで攻略する放置寄りラン')).toBeDefined();
  });

  it('tagline が未指定のとき表示しない', () => {
    render(<TitleHeader />);
    expect(screen.queryByText('マシン + 武器 + パッチで攻略する放置寄りラン')).toBeNull();
  });

  it('role="banner" の header を描画する', () => {
    render(<TitleHeader />);
    expect(screen.getByRole('banner')).toBeDefined();
  });
});
