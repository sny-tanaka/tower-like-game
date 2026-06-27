import styles from './style.module.scss';

import { AutoToggle } from '@/components/atoms/AutoToggle';
import { Icon } from '@/components/atoms/Icon';
import type { IconName } from '@/components/atoms/Icon';
import { Text } from '@/components/atoms/Text';
import { BigNum } from '@/lib/bignum/BigNum';

// ---------------------------------------------------------------------------
// 型定義
// ---------------------------------------------------------------------------

export type UpgradeCardCurrency = 'screw' | 'bolt' | 'alloy';
export type UpgradeCardAccent = 'primary' | 'secondary' | 'warning';

export interface UpgradeCardOption {
  /** ボタンラベル: '+1' / '+5' / 'MAX' など */
  amount: string;
  /** コスト（number か BigNum） */
  cost: number | BigNum;
  disabled?: boolean;
}

export interface UpgradeCardProps {
  /** 強化項目名 */
  title: string;
  /** 説明文（1 行表示）。省略可 */
  description?: string;
  /** アイコン名 */
  iconName?: IconName;
  /** アイコン色（CSS 変数でもよい） */
  iconColor?: string;
  /** 現 Lv 表示文字列 (例: "Lv 4") */
  currentLabel?: string;
  /** 強化前の効果値。 BigNum 系ステ (HP / 攻撃力 / 防御力 / リジェネ) は BigNum を渡して "10.00A" 表記にする。 */
  before?: number | BigNum;
  /** 強化後（+1 時）の効果値 */
  after?: number | BigNum;
  /** before/after に付与する suffix (例: "%", "×", "/s") */
  beforeSuffix?: string;
  /** 通貨種（コスト表示の色付けに使用） */
  currency?: UpgradeCardCurrency;
  /** アクセントカラー */
  accent?: UpgradeCardAccent;
  /** 強化ボタン群（claude design は最大 3 個: +1 / +5 / MAX） */
  options?: ReadonlyArray<UpgradeCardOption>;
  /** 上限到達フラグ。true 時はボタンを非表示にして MAXED 表示 */
  maxed?: boolean;
  /** ボタンクリック時のコールバック。option の amount が渡される */
  onUpgrade?: (amount: string) => void;
  /**
   * AUTO 自動強化トグルの ON/OFF 状態。
   * onToggleAuto が指定されているときだけ右上にトグルを表示する。
   */
  autoEnabled?: boolean;
  /**
   * AUTO トグルのクリックハンドラ。 指定されたときだけ AUTO トグルが表示される。
   * 現状は RunWorkshopBottomSheet 専用 (machine 強化など他用途では指定しない)。
   */
  onToggleAuto?: (next: boolean) => void;
}

// ---------------------------------------------------------------------------
// アクセント→CSS マッピング
// ---------------------------------------------------------------------------
//
// v1.3.7 フォローアップ:
//   accent (primary / secondary / warning) は 3 値固定なので、 color / boxShadow /
//   text-shadow は inline style ではなく CSS Module の class で表現する。
//   ここで保持するのは「JSX に流す class 名」 と「Icon の color prop に渡す CSS 変数文字列」 のみ。

/** Icon の color prop に渡す CSS 変数 (子 Icon を currentColor で塗らない用途向け) */
const ACCENT_ICON_COLOR: Record<UpgradeCardAccent, string> = {
  primary: 'var(--c-primary)',
  secondary: 'var(--c-secondary)',
  warning: 'var(--c-warning)',
};

const CURRENCY_TO_ACCENT: Record<UpgradeCardCurrency, UpgradeCardAccent> = {
  bolt: 'primary',
  alloy: 'secondary',
  screw: 'warning',
};

const ACCENT_BTN_CLASS: Record<UpgradeCardAccent, string> = {
  primary: styles.btnPrimary,
  secondary: styles.btnSecondary,
  warning: styles.btnWarning,
};

/** lvBadge に当てる accent 別 class (color + boxShadow を SCSS 側で持つ) */
const ACCENT_LV_BADGE_CLASS: Record<UpgradeCardAccent, string> = {
  primary: styles.lvBadgePrimary,
  secondary: styles.lvBadgeSecondary,
  warning: styles.lvBadgeWarning,
};

/** valueAfter に当てる accent 別 class (color + textShadow を SCSS 側で持つ) */
const ACCENT_VALUE_AFTER_CLASS: Record<UpgradeCardAccent, string> = {
  primary: styles.valueAfterPrimary,
  secondary: styles.valueAfterSecondary,
  warning: styles.valueAfterWarning,
};

// ---------------------------------------------------------------------------
// 数値表示ヘルパー
// ---------------------------------------------------------------------------

function formatNumber(v: number | BigNum): string {
  if (v instanceof BigNum) return v.toDisplay();
  return v.toLocaleString();
}

// ---------------------------------------------------------------------------
// コンポーネント
// ---------------------------------------------------------------------------

export function UpgradeCard({
  title,
  description,
  iconName,
  iconColor,
  currentLabel,
  before,
  after,
  beforeSuffix = '',
  currency = 'bolt',
  accent,
  options = [],
  maxed = false,
  onUpgrade,
  autoEnabled = false,
  onToggleAuto,
}: UpgradeCardProps) {
  const resolvedAccent = accent ?? CURRENCY_TO_ACCENT[currency];
  const accentIconColor = ACCENT_ICON_COLOR[resolvedAccent];
  const effectiveIconColor = iconColor ?? accentIconColor;
  const btnClass = ACCENT_BTN_CLASS[resolvedAccent];
  const lvBadgeAccentClass = ACCENT_LV_BADGE_CLASS[resolvedAccent];
  const valueAfterAccentClass = ACCENT_VALUE_AFTER_CLASS[resolvedAccent];

  return (
    <div
      className={styles.root}
      role="group"
      aria-label={title}
      data-maxed={maxed}
    >
      {/* ヘッダー行: 24px アイコン枠 + タイトル + Lv バッジ */}
      <div className={styles.header}>
        {iconName != null && (
          <span className={styles.iconWrap}>
            <Icon
              name={iconName}
              size={14}
              color={effectiveIconColor}
            />
          </span>
        )}
        <span className={styles.title}>{title}</span>
        {currentLabel != null && !maxed && (
          <span className={`${styles.lvBadge} ${lvBadgeAccentClass}`}>{currentLabel}</span>
        )}
        {maxed && <span className={`${styles.lvBadge} ${styles.lvBadgeMaxed}`}>MAX</span>}
      </div>

      {/* 説明文 */}
      {description != null && description.length > 0 && (
        <Text
          variant="caption"
          color="dim"
          className={styles.description}
        >
          {description}
        </Text>
      )}

      {/* 効果値行: before → after (左) と AUTO トグル (右) を space-between で配置 */}
      {before != null && (
        <div className={styles.valueRow}>
          <div className={styles.valueGroup}>
            <span className={styles.valueBefore}>
              {formatNumber(before)}
              {beforeSuffix}
            </span>
            {after != null && !maxed && (
              <>
                <span className={styles.arrow}>→</span>
                <span className={`${styles.valueAfter} ${valueAfterAccentClass}`}>
                  {formatNumber(after)}
                  {beforeSuffix}
                </span>
              </>
            )}
          </div>
          {onToggleAuto != null && !maxed && (
            <AutoToggle
              enabled={autoEnabled}
              onToggle={onToggleAuto}
            />
          )}
        </div>
      )}

      {/* ボタン群 (3 ボタン: +1 / +5 / MAX)。 grid-template-columns は --upgrade-cols 経由で SCSS に渡す。 */}
      {!maxed && options.length > 0 && (
        <div
          className={styles.buttons}
          style={{ ['--upgrade-cols' as string]: options.length }}
        >
          {options.map((opt) => {
            const disabled = opt.disabled === true;
            return (
              <div
                key={opt.amount}
                className={styles.btnCol}
              >
                <button
                  type="button"
                  className={`${styles.btn} ${btnClass}`}
                  disabled={disabled}
                  onClick={disabled ? undefined : () => onUpgrade?.(opt.amount)}
                >
                  {opt.amount}
                </button>
                <div className={styles.costRow}>
                  <span className={`${styles.costNum} ${disabled ? styles.costDisabled : ''}`}>
                    {formatNumber(opt.cost)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
