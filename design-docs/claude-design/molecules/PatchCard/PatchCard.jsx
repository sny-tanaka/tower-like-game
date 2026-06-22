/**
 * PatchCard — パッチ 1 種の表示カード（パッチ庫 / 装着画面）
 *
 * 構成: Icon + Text(name) + Text(trigger/effect) + Badge(Tier) + NumericDisplay(count)
 *
 * - patchId: 識別子 (data-* に乗せる)
 * - name: 表示名（例 "瞬殺装甲"）
 * - iconName: game icons (flame / ice / skull / spark etc)
 * - iconColor: アイコン色（パッチ系統で使い分け、未指定なら Tier 色）
 * - tier: 1..5+ (Tier badge 用)
 * - trigger: 短いトリガー条件 (例 "クリ発動時")
 * - effect: 短い効果説明 (例 "対象を即死")
 * - count: 所持数（0 で dim 表示）
 * - selected: 選択中
 * - merging: 合成プレビュー中 (2 枚 →1 枚)
 * - disabled / locked
 * - size: 'sm' (130) / 'md' (160) / 'lg' (190) — グリッド配置の目安
 */
const PATCH_TIER_COLOR = {
  1: 'var(--c-patch-t1)',
  2: 'var(--c-patch-t2)',
  3: 'var(--c-patch-t3)',
  4: 'var(--c-patch-t4)',
  5: 'var(--c-patch-t5)',
};

export function PatchCard(props) {
  const {
    patchId,
    name,
    iconName = 'spark',
    iconColor,
    tier = 1,
    trigger,
    effect,
    count = 1,
    selected = false,
    merging = false,
    disabled = false,
    locked = false,
    size = 'md',
    onClick,
  } = props;

  const { Icon, Text, Badge, NumericDisplay } = window.TowerLikeGame_28197d;

  const tierColor = PATCH_TIER_COLOR[Math.max(1, Math.min(5, tier))];
  const finalIconColor = iconColor || tierColor;

  const sizeMap = {
    sm: { w: 130, iconBox: 36, iconSvg: 22, pad: 8, gap: 4, nameFs: 12, subFs: 10 },
    md: { w: 160, iconBox: 44, iconSvg: 26, pad: 10, gap: 5, nameFs: 13, subFs: 10.5 },
    lg: { w: 190, iconBox: 52, iconSvg: 32, pad: 12, gap: 6, nameFs: 14, subFs: 11 },
  };
  const s = sizeMap[size] || sizeMap.md;

  const wrapStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: s.gap + 'px',
    padding: s.pad + 'px',
    width: s.w + 'px',
    minWidth: 0,
    background: selected ? 'var(--c-surface)' : 'var(--c-bg-elev)',
    border: selected ? `1px solid ${tierColor}` : '1px solid var(--c-border-faint)',
    borderRadius: 'var(--r-m)',
    boxShadow: selected ? `0 0 8px ${tierColor}66` : 'var(--sh-low)',
    cursor: disabled || locked ? 'not-allowed' : onClick ? 'pointer' : 'default',
    opacity: locked ? 0.5 : disabled || count === 0 ? 0.6 : 1,
    position: 'relative',
    transition: 'box-shadow var(--mo-fast) var(--ease-out), border var(--mo-fast) var(--ease-out)',
    boxSizing: 'border-box',
    userSelect: 'none',
  };

  const iconBoxStyle = {
    width: s.iconBox,
    height: s.iconBox,
    borderRadius: 'var(--r-s)',
    background: `linear-gradient(135deg, ${tierColor}22, ${tierColor}08)`,
    border: `1px solid ${tierColor}55`,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: finalIconColor,
    flex: 'none',
    filter: locked ? 'grayscale(1)' : `drop-shadow(0 0 4px ${tierColor}55)`,
    margin: '2px auto 4px',
  };

  return React.createElement(
    'div',
    {
      style: wrapStyle,
      role: 'group',
      'aria-label': name + ' Tier ' + tier,
      'data-patch-id': patchId,
      'data-tier': tier,
      'data-selected': selected,
      onClick: disabled || locked ? undefined : onClick,
    },

    // count badge (top right)
    !locked &&
      React.createElement(
        'div',
        {
          style: {
            position: 'absolute',
            top: 6,
            right: 6,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 2,
            padding: '1px 5px',
            background: count >= 2 ? `${tierColor}22` : 'var(--c-bg-base)',
            border: `1px solid ${count >= 2 ? tierColor : 'var(--c-border-faint)'}`,
            borderRadius: 'var(--r-pill)',
            fontFamily: 'var(--ff-numeric)',
            fontSize: 10,
            fontWeight: 'var(--fw-semibold)',
            color: count >= 2 ? tierColor : 'var(--c-text-mid)',
            letterSpacing: 'var(--ls-num)',
            lineHeight: 1,
          },
        },
        '×' + count
      ),

    // locked overlay
    locked &&
      React.createElement(
        'div',
        {
          style: {
            position: 'absolute',
            top: 6,
            right: 6,
            color: 'var(--c-text-disabled)',
          },
        },
        React.createElement(Icon, { name: 'shield', size: 14 })
      ),

    // tier badge (top left)
    React.createElement(
      'div',
      { style: { display: 'flex', justifyContent: 'flex-start' } },
      React.createElement(Badge, { variant: 'patch-tier', tier, size: 'sm', glow: selected })
    ),

    // icon box
    React.createElement(
      'div',
      { style: iconBoxStyle },
      React.createElement(Icon, { name: iconName, size: s.iconSvg })
    ),

    // name
    React.createElement(
      Text,
      {
        variant: 'heading-3',
        color: 'text',
        align: 'center',
        truncate: true,
        style: {
          fontSize: s.nameFs,
          lineHeight: 1.15,
          fontFamily: 'var(--ff-display)',
          fontWeight: 600,
        },
      },
      name
    ),

    // trigger / effect (short labels)
    (trigger || effect) &&
      React.createElement(
        'div',
        {
          style: {
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            minWidth: 0,
            alignItems: 'center',
          },
        },
        trigger &&
          React.createElement(
            Text,
            {
              variant: 'caption',
              color: 'dim',
              truncate: true,
              align: 'center',
              style: { fontSize: s.subFs, lineHeight: 1.3 },
            },
            trigger
          ),
        effect &&
          React.createElement(
            Text,
            {
              variant: 'caption',
              color: 'mid',
              truncate: true,
              align: 'center',
              style: { fontSize: s.subFs, lineHeight: 1.3 },
            },
            effect
          )
      ),

    // merging hint
    merging &&
      React.createElement(
        'div',
        {
          style: {
            position: 'absolute',
            inset: 0,
            background: `${tierColor}11`,
            border: `2px dashed ${tierColor}`,
            borderRadius: 'var(--r-m)',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'var(--ff-display)',
            fontSize: 11,
            fontWeight: 600,
            color: tierColor,
            letterSpacing: 'var(--ls-loose)',
            textTransform: 'uppercase',
          },
        },
        'MERGING…'
      )
  );
}
