import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test, vi } from 'vitest';

import { ConfirmDialog } from './index';

describe('ConfirmDialog', () => {
  test('open=false のとき何も描画されない', () => {
    const { container } = render(
      <ConfirmDialog
        open={false}
        title="タイトル"
        onConfirm={vi.fn()}
        onCancel={vi.fn()}
      />
    );
    expect(container.firstChild).toBeNull();
  });

  test('open=true のとき title が描画される', () => {
    render(
      <ConfirmDialog
        open
        title="撤退しますか？"
        onConfirm={vi.fn()}
        onCancel={vi.fn()}
      />
    );
    expect(screen.getByText('撤退しますか？')).toBeInTheDocument();
  });

  test('message が描画される', () => {
    render(
      <ConfirmDialog
        open
        title="タイトル"
        message="詳細メッセージ"
        onConfirm={vi.fn()}
        onCancel={vi.fn()}
      />
    );
    expect(screen.getByText('詳細メッセージ')).toBeInTheDocument();
  });

  test('message が undefined のとき message 要素が描画されない', () => {
    render(
      <ConfirmDialog
        open
        title="タイトル"
        onConfirm={vi.fn()}
        onCancel={vi.fn()}
      />
    );
    // message テキスト要素が存在しない
    expect(screen.queryByText('', { selector: 'span' })).not.toBeInTheDocument();
    expect(screen.getByText('タイトル')).toBeInTheDocument();
  });

  test('デフォルトラベル「確定」「キャンセル」が描画される', () => {
    render(
      <ConfirmDialog
        open
        title="確認"
        onConfirm={vi.fn()}
        onCancel={vi.fn()}
      />
    );
    expect(screen.getByRole('button', { name: '確定' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'キャンセル' })).toBeInTheDocument();
  });

  test('カスタムラベルが反映される', () => {
    render(
      <ConfirmDialog
        open
        title="確認"
        confirmLabel="はい"
        cancelLabel="いいえ"
        onConfirm={vi.fn()}
        onCancel={vi.fn()}
      />
    );
    expect(screen.getByRole('button', { name: 'はい' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'いいえ' })).toBeInTheDocument();
  });

  test('確定ボタンをクリックすると onConfirm が呼ばれる', async () => {
    const handleConfirm = vi.fn();
    render(
      <ConfirmDialog
        open
        title="確認"
        onConfirm={handleConfirm}
        onCancel={vi.fn()}
      />
    );
    await userEvent.click(screen.getByRole('button', { name: '確定' }));
    expect(handleConfirm).toHaveBeenCalledTimes(1);
  });

  test('キャンセルボタンをクリックすると onCancel が呼ばれる', async () => {
    const handleCancel = vi.fn();
    render(
      <ConfirmDialog
        open
        title="確認"
        onConfirm={vi.fn()}
        onCancel={handleCancel}
      />
    );
    await userEvent.click(screen.getByRole('button', { name: 'キャンセル' }));
    expect(handleCancel).toHaveBeenCalledTimes(1);
  });

  test('variant="danger" クラスが付く', () => {
    const { container } = render(
      <ConfirmDialog
        open
        title="削除"
        onConfirm={vi.fn()}
        onCancel={vi.fn()}
        variant="danger"
      />
    );
    const dialog = container.querySelector('[class*="variantDanger"]');
    expect(dialog).toBeInTheDocument();
  });
});
