import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { PerfOverlay } from './index';

describe('PerfOverlay', () => {
  it('?debug=perf 無しでは何も描画しない (forceShow=false)', () => {
    const { container } = render(<PerfOverlay forceShow={false} />);
    expect(container.firstChild).toBeNull();
  });

  it('forceShow=true で FPS / ENEMIES 行を描画する', () => {
    render(<PerfOverlay forceShow={true} />);
    expect(screen.getByRole('status')).toBeDefined();
    expect(screen.getByText('FPS')).toBeDefined();
    expect(screen.getByText('ENEMIES')).toBeDefined();
  });

  it('forceShow=true で aria-label = "Performance overlay"', () => {
    render(<PerfOverlay forceShow={true} />);
    expect(screen.getByRole('status').getAttribute('aria-label')).toBe('Performance overlay');
  });
});
