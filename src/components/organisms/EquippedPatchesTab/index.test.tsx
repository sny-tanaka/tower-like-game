import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { EquippedPatchesTab } from './index';

import { useStore } from '@/store/index';

/** store を初期状態にリセット */
afterEach(() => {
  useStore.setState({
    equippedPatches: new Map(),
    machineLevels: {
      maxHp: 0,
      hpRegen: 0,
      damageReduction: 0,
      defense: 0,
      baseAttack: 0,
      attackSpeed: 0,
      range: 0,
      critRate: 0,
      critMultiplier: 0,
      activePower: 0,
      activeCdReduction: 0,
      screwGain: 0,
      boltGain: 0,
      alloyGain: 0,
      patchDropRate: 0,
      patchSlots: 0,
    },
  });
});

describe('EquippedPatchesTab', () => {
  describe('表示（未装着）', () => {
    it('role=tabpanel を持つ要素を描画する', () => {
      render(<EquippedPatchesTab />);
      expect(screen.getByRole('tabpanel')).toBeDefined();
    });

    it('パッチが装着されていないとき「パッチが装着されていません」を表示する', () => {
      render(<EquippedPatchesTab />);
      expect(screen.getByText('パッチが装着されていません')).toBeDefined();
    });

    it('onOpenPatchScreen が渡されたとき「パッチ庫を開く」ボタンが表示される', () => {
      render(<EquippedPatchesTab onOpenPatchScreen={() => {}} />);
      expect(screen.getByText('パッチ庫を開く')).toBeDefined();
    });

    it('onOpenPatchScreen が未指定のとき「パッチ庫を開く」ボタンが表示されない', () => {
      render(<EquippedPatchesTab />);
      expect(screen.queryByText('パッチ庫を開く')).toBeNull();
    });
  });

  describe('スロット数', () => {
    it('patchSlots Lv=0 のとき slotCount=1（初期スロット）', () => {
      useStore.setState({
        equippedPatches: new Map([[0, { name: 'freezeHit', tier: 1 }]]),
        machineLevels: {
          maxHp: 0,
          hpRegen: 0,
          damageReduction: 0,
          defense: 0,
          baseAttack: 0,
          attackSpeed: 0,
          range: 0,
          critRate: 0,
          critMultiplier: 0,
          activePower: 0,
          activeCdReduction: 0,
          screwGain: 0,
          boltGain: 0,
          alloyGain: 0,
          patchDropRate: 0,
          patchSlots: 0,
        },
      });
      render(<EquippedPatchesTab />);
      expect(screen.getByText('装着 1 / 1')).toBeDefined();
    });

    it('patchSlots Lv=3 のとき slotCount=4', () => {
      useStore.setState({
        equippedPatches: new Map([[0, { name: 'freezeHit', tier: 1 }]]),
        machineLevels: {
          maxHp: 0,
          hpRegen: 0,
          damageReduction: 0,
          defense: 0,
          baseAttack: 0,
          attackSpeed: 0,
          range: 0,
          critRate: 0,
          critMultiplier: 0,
          activePower: 0,
          activeCdReduction: 0,
          screwGain: 0,
          boltGain: 0,
          alloyGain: 0,
          patchDropRate: 0,
          patchSlots: 3,
        },
      });
      render(<EquippedPatchesTab />);
      expect(screen.getByText('装着 1 / 4')).toBeDefined();
    });
  });

  describe('装着中パッチ表示', () => {
    it('装着中パッチがあるとき注釈「変更はパッチ庫で行えます」を表示する', () => {
      useStore.setState({
        equippedPatches: new Map([[0, { name: 'freezeHit', tier: 2 }]]),
      });
      render(<EquippedPatchesTab />);
      expect(screen.getByText('変更はパッチ庫で行えます')).toBeDefined();
    });
  });

  describe('「装備変更」ボタン', () => {
    it('onOpenPatchScreen が渡されたとき「装備変更」ボタンが表示される', () => {
      render(<EquippedPatchesTab onOpenPatchScreen={() => {}} />);
      expect(screen.getByText('装備変更')).toBeDefined();
    });

    it('「装備変更」ボタンクリックで onOpenPatchScreen が呼ばれる', async () => {
      const onOpen = vi.fn();
      render(<EquippedPatchesTab onOpenPatchScreen={onOpen} />);
      await userEvent.click(screen.getByText('装備変更'));
      expect(onOpen).toHaveBeenCalledOnce();
    });
  });
});
