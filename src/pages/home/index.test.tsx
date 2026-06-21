import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import { Page } from '@/pages/home';

describe('HomePage', () => {
  test('見出しが表示される', () => {
    render(<Page />);
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });
});
