import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test, vi } from 'vitest';

import { AutoToggle } from './index';

describe('AutoToggle', () => {
  test('常に "AUTO" 表記 (enabled=false でも MANUAL にならない)', () => {
    render(
      <AutoToggle
        enabled={false}
        onToggle={() => undefined}
      />
    );
    const btn = screen.getByRole('button');
    expect(btn).toHaveTextContent('AUTO');
    expect(btn).not.toHaveTextContent('MANUAL');
  });

  test('enabled=true でも "AUTO" 表記', () => {
    render(
      <AutoToggle
        enabled={true}
        onToggle={() => undefined}
      />
    );
    expect(screen.getByRole('button')).toHaveTextContent('AUTO');
  });

  test('enabled=false で aria-pressed=false', () => {
    render(
      <AutoToggle
        enabled={false}
        onToggle={() => undefined}
      />
    );
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'false');
  });

  test('enabled=true で aria-pressed=true', () => {
    render(
      <AutoToggle
        enabled={true}
        onToggle={() => undefined}
      />
    );
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'true');
  });

  test('OFF → ON クリックで onToggle(true) が呼ばれる', async () => {
    const onToggle = vi.fn();
    render(
      <AutoToggle
        enabled={false}
        onToggle={onToggle}
      />
    );
    await userEvent.click(screen.getByRole('button'));
    expect(onToggle).toHaveBeenCalledWith(true);
  });

  test('ON → OFF クリックで onToggle(false) が呼ばれる', async () => {
    const onToggle = vi.fn();
    render(
      <AutoToggle
        enabled={true}
        onToggle={onToggle}
      />
    );
    await userEvent.click(screen.getByRole('button'));
    expect(onToggle).toHaveBeenCalledWith(false);
  });

  test('デフォルトの aria-label は "AUTO OFF" / "AUTO ON"', () => {
    const { rerender } = render(
      <AutoToggle
        enabled={false}
        onToggle={() => undefined}
      />
    );
    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'AUTO OFF');
    rerender(
      <AutoToggle
        enabled={true}
        onToggle={() => undefined}
      />
    );
    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'AUTO ON');
  });

  test('ariaLabel props で上書きできる', () => {
    render(
      <AutoToggle
        enabled={false}
        onToggle={() => undefined}
        ariaLabel="アクティブスキルを自動モードに切り替え"
      />
    );
    expect(screen.getByRole('button')).toHaveAttribute(
      'aria-label',
      'アクティブスキルを自動モードに切り替え'
    );
  });
});
