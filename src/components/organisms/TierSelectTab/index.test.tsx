import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { TierSelectTab } from './index';

import { useStore } from '@/store/index';

/** store を初期状態にリセット */
afterEach(() => {
  useStore.setState({ highestTier: 0 });
});

describe('TierSelectTab', () => {
  describe('表示', () => {
    it('role=tabpanel を持つ要素を描画する', () => {
      render(<TierSelectTab selectedTier={1} />);
      expect(screen.getByRole('tabpanel')).toBeDefined();
    });

    it('highestTier=0 のとき T1 のみ表示する（最低 1 Tier）', () => {
      useStore.setState({ highestTier: 0 });
      render(<TierSelectTab selectedTier={1} />);
      expect(screen.getByText('T1')).toBeDefined();
      expect(screen.queryByText('T2')).toBeNull();
    });

    it('highestTier=5 のとき T1 〜 T5 を表示する', () => {
      useStore.setState({ highestTier: 5 });
      render(<TierSelectTab selectedTier={3} />);
      for (let t = 1; t <= 5; t++) {
        expect(screen.getByText(`T${t}`)).toBeDefined();
      }
    });

    it('highestTier=5 のとき T6 は表示しない', () => {
      useStore.setState({ highestTier: 5 });
      render(<TierSelectTab selectedTier={3} />);
      expect(screen.queryByText('T6')).toBeNull();
    });

    it('最大 Tier ラベルを表示する', () => {
      useStore.setState({ highestTier: 5 });
      render(<TierSelectTab selectedTier={1} />);
      expect(screen.getByText('最大 Tier 5')).toBeDefined();
    });
  });

  describe('選択状態', () => {
    it('selectedTier に対応するボタンが aria-pressed=true になる', () => {
      useStore.setState({ highestTier: 5 });
      render(<TierSelectTab selectedTier={3} />);
      const btn = screen.getByText('T3').closest('button');
      expect(btn?.getAttribute('aria-pressed')).toBe('true');
    });

    it('非選択ボタンは aria-pressed=false になる', () => {
      useStore.setState({ highestTier: 5 });
      render(<TierSelectTab selectedTier={3} />);
      const btn = screen.getByText('T1').closest('button');
      expect(btn?.getAttribute('aria-pressed')).toBe('false');
    });
  });

  describe('FRONTIER マーカー', () => {
    it('maxTier（最高 Tier）かつ非選択時に FRONTIER テキストが表示される', () => {
      useStore.setState({ highestTier: 5 });
      render(<TierSelectTab selectedTier={3} />);
      expect(screen.getByText('FRONTIER')).toBeDefined();
    });

    it('maxTier が選択中のとき FRONTIER テキストは表示されない', () => {
      useStore.setState({ highestTier: 5 });
      render(<TierSelectTab selectedTier={5} />);
      expect(screen.queryByText('FRONTIER')).toBeNull();
    });
  });

  describe('インタラクション', () => {
    it('Tier ボタンをクリックすると onSelect が呼ばれる', async () => {
      useStore.setState({ highestTier: 3 });
      const onSelect = vi.fn();
      render(
        <TierSelectTab
          selectedTier={1}
          onSelect={onSelect}
        />
      );
      await userEvent.click(screen.getByText('T2'));
      expect(onSelect).toHaveBeenCalledWith(2);
    });

    it('onSelect が未指定でもクリックでエラーにならない', async () => {
      useStore.setState({ highestTier: 3 });
      render(<TierSelectTab selectedTier={1} />);
      await userEvent.click(screen.getByText('T2'));
      // エラーが発生しなければ pass
    });
  });
});
