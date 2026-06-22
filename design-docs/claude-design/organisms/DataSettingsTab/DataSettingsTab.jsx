/**
 * DataSettingsTab — 設定画面 データタブ Organism
 *
 * - onExport: JSON エクスポート
 * - onImport(file): JSON インポート (file は File オブジェクト)
 * - onReset: 全データリセット (確認ダイアログは上位)
 * - storageInfo: { usedKb, slots, lastSavedAt } 任意
 */
export function DataSettingsTab(props) {
  const { onExport, onImport, onReset, storageInfo } = props;

  const { Card, Text, Button, Icon } = window.TowerLikeGame_28197d;

  const fileRef = React.useRef(null);

  const handleImportClick = () => {
    if (fileRef.current) fileRef.current.click();
  };
  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file && onImport) onImport(file);
    e.target.value = '';
  };

  return React.createElement(
    'div',
    { role: 'tabpanel', 'aria-label': 'データ設定', style: { display: 'grid', gap: 8 } },

    // hidden file input
    React.createElement('input', {
      ref: fileRef,
      type: 'file',
      accept: 'application/json,.json',
      style: { display: 'none' },
      onChange: handleFileChange,
    }),

    // storage info
    storageInfo &&
      React.createElement(
        Card,
        { variant: 'sunken', padding: 'md' },
        React.createElement(
          Text,
          { variant: 'label', color: 'dim', style: { fontSize: 10, marginBottom: 6 } },
          'STORAGE'
        ),
        React.createElement(
          'div',
          { style: { display: 'grid', gap: 4 } },
          storageInfo.usedKb != null &&
            React.createElement(
              'div',
              { style: { display: 'flex', justifyContent: 'space-between', fontSize: 12 } },
              React.createElement('span', { style: { color: 'var(--c-text-mid)' } }, '使用容量'),
              React.createElement(
                'span',
                { style: { color: 'var(--c-text)', fontFamily: 'var(--ff-numeric)' } },
                storageInfo.usedKb + ' KB'
              )
            ),
          storageInfo.slots != null &&
            React.createElement(
              'div',
              { style: { display: 'flex', justifyContent: 'space-between', fontSize: 12 } },
              React.createElement(
                'span',
                { style: { color: 'var(--c-text-mid)' } },
                'セーブスロット'
              ),
              React.createElement(
                'span',
                { style: { color: 'var(--c-text)', fontFamily: 'var(--ff-numeric)' } },
                storageInfo.slots
              )
            ),
          storageInfo.lastSavedAt &&
            React.createElement(
              'div',
              { style: { display: 'flex', justifyContent: 'space-between', fontSize: 12 } },
              React.createElement('span', { style: { color: 'var(--c-text-mid)' } }, '最終セーブ'),
              React.createElement(
                'span',
                { style: { color: 'var(--c-text)', fontFamily: 'var(--ff-numeric)' } },
                storageInfo.lastSavedAt
              )
            )
        )
      ),

    React.createElement(
      Card,
      { variant: 'sunken', padding: 'md' },
      React.createElement(
        Text,
        {
          variant: 'body',
          color: 'text',
          style: { fontSize: 13, fontWeight: 500, marginBottom: 4 },
        },
        'バックアップ'
      ),
      React.createElement(
        Text,
        { variant: 'caption', color: 'dim', style: { fontSize: 11, marginBottom: 10 } },
        'JSON ファイルとして書き出し / 読み込み'
      ),
      React.createElement(
        'div',
        { style: { display: 'grid', gap: 6 } },
        React.createElement(Button, {
          label: 'エクスポート',
          variant: 'ghost',
          size: 'md',
          fullWidth: true,
          iconLeft: React.createElement(Icon, { name: 'arrow-up', size: 16 }),
          onClick: onExport,
        }),
        React.createElement(Button, {
          label: 'インポート',
          variant: 'ghost',
          size: 'md',
          fullWidth: true,
          iconLeft: React.createElement(Icon, { name: 'plus', size: 16 }),
          onClick: handleImportClick,
        })
      )
    ),

    React.createElement(
      Card,
      { variant: 'danger', padding: 'md' },
      React.createElement(
        Text,
        {
          variant: 'body',
          color: 'danger',
          style: { fontSize: 13, fontWeight: 500, marginBottom: 4 },
        },
        '危険な操作'
      ),
      React.createElement(
        Text,
        { variant: 'caption', color: 'mid', style: { fontSize: 11, marginBottom: 10 } },
        '全データを初期状態に戻します。取り消せません。'
      ),
      React.createElement(Button, {
        label: '全データをリセット',
        variant: 'danger',
        size: 'md',
        fullWidth: true,
        iconLeft: React.createElement(Icon, { name: 'skull', size: 16 }),
        onClick: onReset,
      })
    )
  );
}
