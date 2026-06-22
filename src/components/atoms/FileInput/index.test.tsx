import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test, vi } from 'vitest';

import { FileInput } from './index';

describe('FileInput', () => {
  test('デフォルトラベルが表示される', () => {
    render(<FileInput onChange={() => {}} />);
    expect(screen.getByRole('button', { name: 'ファイルを選択' })).toBeInTheDocument();
  });

  test('カスタムラベルが表示される', () => {
    render(
      <FileInput
        onChange={() => {}}
        label="データをインポート"
      />
    );
    expect(screen.getByRole('button', { name: 'データをインポート' })).toBeInTheDocument();
  });

  test('ファイル選択後に onChange が File オブジェクトを渡す', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<FileInput onChange={onChange} />);

    const file = new File(['{"test": true}'], 'save.json', { type: 'application/json' });
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    await user.upload(input, file);

    expect(onChange).toHaveBeenCalledWith(file);
  });

  test('ファイル選択後にファイル名が表示される', async () => {
    const user = userEvent.setup();
    render(<FileInput onChange={() => {}} />);

    const file = new File(['{}'], 'mysave.json', { type: 'application/json' });
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    await user.upload(input, file);

    expect(screen.getByText('mysave.json')).toBeInTheDocument();
  });

  test('disabled 時にボタンが disabled になる', () => {
    render(
      <FileInput
        onChange={() => {}}
        disabled
      />
    );
    expect(screen.getByRole('button')).toBeDisabled();
  });

  test('disabled 時に input が disabled になる', () => {
    render(
      <FileInput
        onChange={() => {}}
        disabled
      />
    );
    const input = document.querySelector('input[type="file"]');
    expect(input).toBeDisabled();
  });

  test('初期状態ではファイル名が表示されない', () => {
    render(<FileInput onChange={() => {}} />);
    // ファイル名表示エリアがないことを確認
    expect(screen.queryByTitle(/\.json/)).not.toBeInTheDocument();
  });
});
