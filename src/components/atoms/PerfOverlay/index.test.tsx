import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { PerfOverlay } from './index';

describe('PerfOverlay', () => {
  it('forceShow=false では何も描画しない', () => {
    const { container } = render(<PerfOverlay forceShow={false} />);
    expect(container.firstChild).toBeNull();
  });

  it('forceShow=true で 主要メトリクスのラベル行を描画する', () => {
    render(<PerfOverlay forceShow={true} />);
    expect(screen.getByRole('status')).toBeDefined();
    // 既存のラベル
    expect(screen.getByText('FPS')).toBeDefined();
    expect(screen.getByText('ENEMIES')).toBeDefined();
    // v1.3.8 で追加した発熱解析向けラベル
    expect(screen.getByText('LOOP')).toBeDefined();
    expect(screen.getByText('BUDGET')).toBeDefined();
    expect(screen.getByText('PROJ')).toBeDefined();
    expect(screen.getByText('DOM')).toBeDefined();
    expect(screen.getByText('LONG')).toBeDefined();
  });

  it('forceShow=true で aria-label = "Performance overlay"', () => {
    render(<PerfOverlay forceShow={true} />);
    expect(screen.getByRole('status').getAttribute('aria-label')).toBe('Performance overlay');
  });
});
