/**
 * ResultDialog — ラン終了時のリザルトダイアログ Organism
 *
 * 構成: Overlay + Sheet
 *   - ヘッダー (クリア / 全滅 / 撤退)
 *   - 統計 (到達 Tier / Wave / 撃破数 / 所要時間)
 *   - 獲得 (ボルト / 超合金 / ドロップパッチ一覧)
 *   - アクション (タイトルへ / 出撃準備へ)
 *
 * props:
 *   - kind: 'clear' | 'defeat' | 'retreat'
 *   - stats: { tier, wave, kills, durationSec }
 *   - rewards: { bolt, alloy, patches: [{ name, iconName, tier }] }
 *   - onPreparation: 出撃準備へ戻るボタン
 *   - open
 */
const KIND_PRESET = {
  clear: { title: 'クリア', color: 'var(--c-success)', icon: 'check', bg: 'rgba(70,226,160,0.10)' },
  defeat: { title: '全滅', color: 'var(--c-danger)', icon: 'skull', bg: 'rgba(255,77,109,0.10)' },
  retreat: {
    title: '撤退',
    color: 'var(--c-warning)',
    icon: 'arrow-up',
    bg: 'rgba(246,185,74,0.10)',
  },
};

function formatDuration(sec) {
  if (sec == null) return '0:00';
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return m + ':' + (s < 10 ? '0' + s : s);
}

export function ResultDialog(props) {
  const {
    open = false,
    kind = 'clear',
    stats = { tier: 1, wave: 0, kills: 0, durationSec: 0 },
    rewards = { bolt: 0, alloy: 0, patches: [] },
    onPreparation,
  } = props;

  if (!open) return null;

  const { Overlay, Sheet, Text, Button, Badge, Icon, NumericDisplay, CurrencyAmount, PatchCard } =
    window.TowerLikeGame_28197d;

  const preset = KIND_PRESET[kind] || KIND_PRESET.clear;

  const statRow = (label, value, color = 'text') =>
    React.createElement(
      'div',
      {
        style: {
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          padding: '6px 0',
          borderTop: '1px dashed var(--c-border-faint)',
        },
      },
      React.createElement(
        Text,
        { variant: 'label', color: 'dim', style: { fontSize: 10.5 } },
        label
      ),
      React.createElement(NumericDisplay, {
        value,
        size: 'sm',
        accentColor: color,
        style: { fontSize: 14 },
      })
    );

  return React.createElement(
    Overlay,
    { dimLevel: 'heavy', blur: 6, dismissible: false, zIndex: 'dialog' },
    React.createElement(
      Sheet,
      { edge: 'all', padding: 'md', style: { width: 340, maxWidth: '94%', maxHeight: '90vh' } },

      // header
      React.createElement(
        'div',
        {
          style: {
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: '4px 4px 14px',
            borderBottom: '1px solid var(--c-border-faint)',
            marginBottom: 12,
          },
        },
        React.createElement(
          'span',
          {
            style: {
              width: 36,
              height: 36,
              borderRadius: '50%',
              background: preset.bg,
              border: '1px solid ' + preset.color,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: preset.color,
              filter: `drop-shadow(0 0 6px ${preset.color}66)`,
            },
          },
          React.createElement(Icon, { name: preset.icon, size: 18 })
        ),
        React.createElement(
          Text,
          {
            variant: 'heading-2',
            color: 'text',
            style: {
              flex: 1,
              fontSize: 18,
              fontFamily: 'var(--ff-display)',
              fontWeight: 600,
              color: preset.color,
            },
          },
          preset.title
        ),
        React.createElement(Badge, { variant: 'tier', tier: stats.tier, size: 'md' })
      ),

      // stats
      React.createElement(
        'div',
        { style: { display: 'grid', gap: 0 } },
        React.createElement(
          Text,
          { variant: 'label', color: 'dim', style: { fontSize: 10, marginBottom: 4 } },
          'STATISTICS'
        ),
        statRow('到達 Tier', stats.tier, 'primary'),
        statRow('到達 Wave', stats.wave),
        statRow('撃破数', stats.kills),
        React.createElement(
          'div',
          {
            style: {
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              padding: '6px 0',
              borderTop: '1px dashed var(--c-border-faint)',
            },
          },
          React.createElement(
            Text,
            { variant: 'label', color: 'dim', style: { fontSize: 10.5 } },
            '所要時間'
          ),
          React.createElement(
            Text,
            { variant: 'numeric-s', color: 'text', style: { fontSize: 14 } },
            formatDuration(stats.durationSec)
          )
        )
      ),

      // rewards
      React.createElement(
        'div',
        { style: { marginTop: 12 } },
        React.createElement(
          Text,
          { variant: 'label', color: 'dim', style: { fontSize: 10, marginBottom: 6 } },
          'REWARDS'
        ),
        React.createElement(
          'div',
          { style: { display: 'flex', gap: 16, alignItems: 'center', marginBottom: 10 } },
          React.createElement(CurrencyAmount, {
            currency: 'bolt',
            value: rewards.bolt,
            size: 'md',
            delta: rewards.bolt > 0 ? '+' : undefined,
          }),
          React.createElement(CurrencyAmount, {
            currency: 'alloy',
            value: rewards.alloy,
            size: 'md',
            delta: rewards.alloy > 0 ? '+' : undefined,
          })
        ),
        rewards.patches &&
          rewards.patches.length > 0 &&
          React.createElement(
            'div',
            { style: { display: 'flex', gap: 6, flexWrap: 'wrap' } },
            rewards.patches.map((p, i) =>
              React.createElement(
                'div',
                {
                  key: i,
                  style: {
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '4px 8px',
                    background: 'var(--c-bg-base)',
                    border: `1px solid var(--c-patch-t${Math.max(1, Math.min(5, p.tier))})`,
                    borderRadius: 'var(--r-pill)',
                    fontSize: 11,
                    color: 'var(--c-text)',
                    fontFamily: 'var(--ff-display)',
                  },
                },
                React.createElement(
                  'span',
                  {
                    style: {
                      color: `var(--c-patch-t${Math.max(1, Math.min(5, p.tier))})`,
                      display: 'inline-flex',
                    },
                  },
                  React.createElement(Icon, { name: p.iconName || 'spark', size: 12 })
                ),
                React.createElement('span', null, p.name),
                React.createElement(
                  'span',
                  { style: { color: 'var(--c-text-dim)', fontFamily: 'var(--ff-numeric)' } },
                  'T' + p.tier
                )
              )
            )
          )
      ),

      // actions
      React.createElement(
        'div',
        { style: { marginTop: 16 } },
        React.createElement(Button, {
          label: '出撃準備へ',
          variant: 'primary',
          size: 'md',
          fullWidth: true,
          onClick: onPreparation,
        })
      )
    )
  );
}
