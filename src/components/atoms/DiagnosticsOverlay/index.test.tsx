import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { DiagnosticsOverlay } from './index';

describe('DiagnosticsOverlay', () => {
  it('主要メトリクスのラベルと値を描画する', () => {
    render(
      <DiagnosticsOverlay
        fps={59}
        enemyCount={12}
        fxEventCount={34}
        domCount={842}
        heapMB={187.4}
      />
    );
    expect(screen.getByRole('status')).toBeDefined();
    expect(screen.getByText('FPS')).toBeDefined();
    expect(screen.getByText('59')).toBeDefined();
    expect(screen.getByText('ENEMIES')).toBeDefined();
    expect(screen.getByText('12')).toBeDefined();
    expect(screen.getByText('FX')).toBeDefined();
    expect(screen.getByText('34')).toBeDefined();
    expect(screen.getByText('DOM')).toBeDefined();
    expect(screen.getByText('842')).toBeDefined();
    expect(screen.getByText('HEAP')).toBeDefined();
    expect(screen.getByText('187.4MB')).toBeDefined();
  });

  it('heapMB=null のときは HEAP 行を描画しない', () => {
    render(
      <DiagnosticsOverlay
        fps={60}
        enemyCount={0}
        fxEventCount={0}
        domCount={0}
        heapMB={null}
      />
    );
    expect(screen.queryByText('HEAP')).toBeNull();
  });

  it('aria-label = "Diagnostics overlay"', () => {
    render(
      <DiagnosticsOverlay
        fps={60}
        enemyCount={0}
        fxEventCount={0}
        domCount={0}
        heapMB={null}
      />
    );
    expect(screen.getByRole('status').getAttribute('aria-label')).toBe('Diagnostics overlay');
  });
});
