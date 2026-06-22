import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test, vi } from 'vitest';

import { WeaponPreview } from './index';

const defaultProps = {
  weapon: 'laser' as const,
  name: 'Laser',
  stats: [
    { label: '攻撃力', value: '120' },
    { label: '攻撃速度', value: '2.5/s' },
  ],
  activeName: 'Mega Beam',
  activeDesc: '前方直線に貫通レーザーを照射する。',
};

describe('WeaponPreview', () => {
  test('武器名が描画される', () => {
    render(<WeaponPreview {...defaultProps} />);
    expect(screen.getByText('Laser')).toBeInTheDocument();
  });

  test('ステータスのラベルと値が描画される', () => {
    render(<WeaponPreview {...defaultProps} />);
    expect(screen.getByText('攻撃力')).toBeInTheDocument();
    expect(screen.getByText('120')).toBeInTheDocument();
    expect(screen.getByText('攻撃速度')).toBeInTheDocument();
    expect(screen.getByText('2.5/s')).toBeInTheDocument();
  });

  test('アクティブ名が描画される', () => {
    render(<WeaponPreview {...defaultProps} />);
    expect(screen.getByText(/Mega Beam/)).toBeInTheDocument();
  });

  test('アクティブ説明が描画される', () => {
    render(<WeaponPreview {...defaultProps} />);
    expect(screen.getByText('前方直線に貫通レーザーを照射する。')).toBeInTheDocument();
  });

  test('selected=true で selected クラスが付く', () => {
    const { container } = render(
      <WeaponPreview
        {...defaultProps}
        selected={true}
      />
    );
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toMatch(/selected/);
  });

  test('selected=false で selected クラスが付かない', () => {
    const { container } = render(
      <WeaponPreview
        {...defaultProps}
        selected={false}
      />
    );
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).not.toMatch(/\bselected\b/);
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

  test('selected=true かつ onClick で aria-pressed が true', () => {
    const onClick = vi.fn();
    render(
      <WeaponPreview
        {...defaultProps}
        selected={true}
        onClick={onClick}
      />
    );
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'true');
  });
});
