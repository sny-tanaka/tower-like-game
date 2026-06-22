/**
 * UpgradeCard — マシン強化 / 武器強化 / ラン中 WS の 1 項目
 *
 * 構成: Text + NumericDisplay + Button×3(+1/+5/Max) + 通貨アイコン + 数値
 *
 * **コンパクト設計**: 縦画面 360-412px 幅で 2 列並びを想定。最小カード幅 ~165px。
 * 最大数値表記 "150.5B" まで安全に表示できる文字幅を確保。
 *
 * - title: 強化項目名（13px truncate）
 * - description: 補足説明（オプション、caption 11px）
 * - iconName: 左肩アイコン（カテゴリ。26px 枠 + 16px SVG）
 * - currentLabel: "Lv 4" 等の現在状態 (小さな pill)
 * - before / after: 効果値（数値、矢印で差分表示）
 * - maxed: 上限到達 (true なら全ボタン無効 + "MAX" 表示)
 * - currency: 'screw' / 'bolt' / 'alloy'  ボタン下のコスト表示で使用
 * - options: 購入ボタン定義（最大 3）
 */
const CURRENCY_TINT = {
  screw: { color: 'var(--c-screw)', glow: '0 0 3px rgba(200,212,232,0.5)' },
  bolt: { color: 'var(--c-bolt)', glow: '0 0 3px rgba(78,228,246,0.6)' },
  alloy: { color: 'var(--c-alloy)', glow: '0 0 3px rgba(169,107,255,0.6)' },
};

const ACCENT_BTN = {
  primary: {
    background: 'linear-gradient(180deg, var(--c-primary) 0%, var(--c-primary-deep) 100%)',
    color: 'var(--c-bg-deep)',
    border: '1px solid var(--c-primary-hi)',
    boxShadow: 'var(--glow-cyan-sm)',
  },
  secondary: {
    background: 'linear-gradient(180deg, var(--c-secondary) 0%, var(--c-secondary-deep) 100%)',
    color: 'var(--c-text)',
    border: '1px solid var(--c-secondary-hi)',
    boxShadow: 'var(--glow-purple-sm)',
  },
  warning: {
    background: 'linear-gradient(180deg, var(--c-warning) 0%, #c89126 100%)',
    color: 'var(--c-bg-deep)',
    border: '1px solid var(--c-warning)',
    boxShadow: '0 0 6px rgba(246,185,74,0.45)',
  },
};

export function UpgradeCard(props) {
  const {
    title,
    description,
    iconName,
    iconColor = 'var(--c-primary)',
    currentLabel,
    before,
    after,
    beforeSuffix = '',
    currency,
    options = [],
    maxed = false,
    accent = 'primary',
  } = props;

  const { Icon, Text, NumericDisplay, Badge } = window.TowerLikeGame_28197d;

  const accentColor =
    {
      primary: 'var(--c-primary)',
      secondary: 'var(--c-secondary)',
      warning: 'var(--c-warning)',
    }[accent] || 'var(--c-primary)';

  const accentGlow =
    {
      primary: 'rgba(78,228,246,0.55)',
      secondary: 'rgba(169,107,255,0.55)',
      warning: 'rgba(246,185,74,0.55)',
    }[accent] || 'rgba(78,228,246,0.55)';

  const iconGlow =
    {
      'var(--c-primary)': 'rgba(78,228,246,0.35)',
      'var(--c-secondary)': 'rgba(169,107,255,0.35)',
      'var(--c-warning)': 'rgba(246,185,74,0.35)',
    }[iconColor] || 'rgba(78,228,246,0.35)';

  const cur = currency ? CURRENCY_TINT[currency] || CURRENCY_TINT.bolt : null;

  const wrapStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: 7,
    padding: '10px 10px 8px',
    background: 'var(--c-bg-elev)',
    border: '1px solid var(--c-border-faint)',
    borderRadius: 'var(--r-m)',
    boxShadow: 'var(--sh-low)',
    minWidth: 0,
  };

  return React.createElement(
    'div',
    { style: wrapStyle, 'data-maxed': maxed, role: 'group', 'aria-label': title },

    // ===== Header: icon + title + label =====
    React.createElement(
      'div',
      { style: { display: 'flex', alignItems: 'center', gap: 6, minWidth: 0 } },
      iconName &&
        React.createElement(
          'span',
          {
            style: {
              width: 24,
              height: 24,
              borderRadius: 'var(--r-xs)',
              background: 'var(--c-bg-base)',
              border: '1px solid var(--c-border-faint)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: iconColor,
              flex: 'none',
              filter: `drop-shadow(0 0 3px ${iconGlow})`,
            },
          },
          React.createElement(Icon, { name: iconName, size: 14 })
        ),
      React.createElement(
        Text,
        {
          variant: 'heading-3',
          color: 'text',
          truncate: true,
          style: {
            flex: 1,
            minWidth: 0,
            fontSize: 12.5,
            lineHeight: 1.2,
            fontFamily: 'var(--ff-display)',
            fontWeight: 600,
          },
        },
        title
      ),
      currentLabel &&
        !maxed &&
        React.createElement(Badge, { variant: 'neutral', size: 'sm', text: currentLabel }),
      maxed && React.createElement(Badge, { variant: 'success', size: 'sm', text: 'MAX' })
    ),

    // ===== Description (optional) =====
    description &&
      React.createElement(
        Text,
        {
          variant: 'caption',
          color: 'dim',
          truncate: true,
          style: { fontSize: 10.5, lineHeight: 1.35 },
        },
        description
      ),

    // ===== Value preview: before → after =====
    (before != null || after != null) &&
      React.createElement(
        'div',
        {
          style: {
            display: 'flex',
            alignItems: 'baseline',
            gap: 5,
            minWidth: 0,
            overflow: 'hidden',
          },
        },
        before != null &&
          React.createElement(NumericDisplay, {
            value: before,
            suffix: beforeSuffix,
            size: 'sm',
            accentColor: 'dim',
            style: { fontSize: 12, flex: '0 1 auto', minWidth: 0 },
          }),
        before != null &&
          after != null &&
          React.createElement(
            'span',
            { style: { color: 'var(--c-text-dim)', fontSize: 10, flex: 'none' } },
            '→'
          ),
        after != null &&
          React.createElement(NumericDisplay, {
            value: after,
            suffix: beforeSuffix,
            size: 'sm',
            accentColor: 'text',
            style: {
              fontSize: 13.5,
              color: accentColor,
              textShadow: `0 0 5px ${accentGlow}`,
              flex: '0 1 auto',
              minWidth: 0,
            },
          })
      ),

    // ===== Button row + cost (icon over number, compact) =====
    !maxed &&
      options.length > 0 &&
      React.createElement(
        'div',
        {
          style: {
            display: 'grid',
            gridTemplateColumns: `repeat(${options.length}, 1fr)`,
            gap: 4,
          },
        },
        options.map((opt, i) =>
          React.createElement(
            'div',
            { key: i, style: { display: 'grid', gap: 2, minWidth: 0 } },

            // Button
            React.createElement(
              'button',
              {
                type: 'button',
                disabled: opt.disabled,
                onClick: opt.disabled ? undefined : opt.onClick,
                style: {
                  height: 24,
                  padding: '0 2px',
                  fontFamily: 'var(--ff-display)',
                  fontSize: 10.5,
                  fontWeight: 'var(--fw-semibold)',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  borderRadius: 'var(--r-xs)',
                  cursor: opt.disabled ? 'not-allowed' : 'pointer',
                  transition:
                    'transform var(--mo-fast) var(--ease-out), filter var(--mo-fast) var(--ease-out)',
                  userSelect: 'none',
                  whiteSpace: 'nowrap',
                  width: '100%',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  ...(ACCENT_BTN[accent] || ACCENT_BTN.primary),
                  ...(opt.disabled
                    ? {
                        filter: 'grayscale(0.6) brightness(0.55)',
                        boxShadow: 'none',
                      }
                    : {}),
                },
              },
              opt.amount
            ),

            // Cost: 数値のみ (通貨はカード単位で同じなので per-button アイコンは省略)
            currency &&
              React.createElement(
                'div',
                {
                  style: {
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    overflow: 'hidden',
                    minWidth: 0,
                    lineHeight: 1,
                  },
                },
                React.createElement(NumericDisplay, {
                  value: opt.cost,
                  accentColor: opt.disabled ? 'dim' : 'text',
                  size: 'sm',
                  align: 'center',
                  style: {
                    fontSize: 11,
                    lineHeight: 1,
                    maxWidth: '100%',
                    overflow: 'hidden',
                    textOverflow: 'clip',
                    whiteSpace: 'nowrap',
                  },
                })
              )
          )
        )
      )
  );
}
