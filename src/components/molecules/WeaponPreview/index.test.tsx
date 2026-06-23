import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test, vi } from 'vitest';

import { WeaponPreview } from './index';

const defaultProps = {
  weapon: 'laser' as const,
  name: 'Laser',
  description: '高速直進ビーム。貫通でき、連発で削り続ける。',
  stats: [
    { label: '攻撃力', value: 120, accent: 'primary' as const },
    { label: '攻撃速度', value: '2.5/s' },
  ],
};

describe('WeaponPreview', () => {
  test('武器名が描画される', () => {
    render(<WeaponPreview {...defaultProps} />);
    expect(screen.getByText('Laser')).toBeInTheDocument();
  });

  test('description が描画される', () => {
    render(<WeaponPreview {...defaultProps} />);
    expect(screen.getByText('高速直進ビーム。貫通でき、連発で削り続ける。')).toBeInTheDocument();
  });

  test('ステータスのラベルが描画される', () => {
    render(<WeaponPreview {...defaultProps} />);
    expect(screen.getByText('攻撃力')).toBeInTheDocument();
    expect(screen.getByText('攻撃速度')).toBeInTheDocument();
  });

  test('active=true で active クラスが付く', () => {
    const { container } = render(
      <WeaponPreview
        {...defaultProps}
        active={true}
      />
    );
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toMatch(/active/);
  });

  test('active=false で active クラスが付かない', () => {
    const { container } = render(
      <WeaponPreview
        {...defaultProps}
        active={false}
      />
    );
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).not.toMatch(/\bactive\b/);
  });

  test('onClick が渡された時に button role が付く', () => {
    const onClick = vi.fn();
    render(
      <WeaponPreview
        {...defaultProps}
        onClick={onClick}
      />
    );
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('onClick が呼ばれる', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <WeaponPreview
        {...defaultProps}
        onClick={onClick}
      />
    );
    await user.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledOnce();
  });

  test('onClick が渡されない時は button role が付かない', () => {
    render(<WeaponPreview {...defaultProps} />);
    expect(screen.queryByRole('button')).toBeNull();
  });

  test('stats が空の時もクラッシュしない', () => {
    render(
      <WeaponPreview
        {...defaultProps}
        stats={[]}
      />
    );
    expect(screen.getByText('Laser')).toBeInTheDocument();
  });

  test('active=true かつ onClick で aria-pressed が true', () => {
    const onClick = vi.fn();
    render(
      <WeaponPreview
        {...defaultProps}
        active={true}
        onClick={onClick}
      />
    );
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'true');
  });

  test('locked=true のとき LOCKED テキストが描画される', () => {
    render(
      <WeaponPreview
        {...defaultProps}
        locked={true}
      />
    );
    expect(screen.getByText('LOCKED')).toBeInTheDocument();
  });

  test('layout="wide" で wide クラスが付く', () => {
    const { container } = render(
      <WeaponPreview
        {...defaultProps}
        layout="wide"
      />
    );
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toMatch(/wide/);
  });
});
