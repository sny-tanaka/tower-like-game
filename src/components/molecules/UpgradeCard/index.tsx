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

const ACCENT_COLOR: Record<UpgradeCardAccent, string> = {
  primary: 'var(--c-primary)',
  secondary: 'var(--c-secondary)',
  warning: 'var(--c-warning)',
};

const ACCENT_GLOW: Record<UpgradeCardAccent, string> = {
  primary: 'var(--glow-cyan-sm)',
  secondary: 'var(--glow-purple-sm)',
  warning: 'none',
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

const ACCENT_GLOW_RGBA: Record<UpgradeCardAccent, string> = {
  primary: 'rgba(78, 228, 246, 0.55)',
  secondary: 'rgba(169, 107, 255, 0.55)',
  warning: 'rgba(246, 185, 74, 0.55)',
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
  const accentColor = ACCENT_COLOR[resolvedAccent];
  const effectiveIconColor = iconColor ?? accentColor;
  const btnClass = ACCENT_BTN_CLASS[resolvedAccent];
  const afterGlow = ACCENT_GLOW_RGBA[resolvedAccent];

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
          <span
            className={styles.lvBadge}
            style={{ color: accentColor, boxShadow: ACCENT_GLOW[resolvedAccent] }}
          >
            {currentLabel}
          </span>
        )}
        {maxed && (
          <span
            className={styles.lvBadge}
            style={{
              color: 'var(--c-success)',
              boxShadow: 'var(--glow-success-md)',
            }}
          >
            MAX
          </span>
        )}
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
                <span
                  className={styles.valueAfter}
                  style={{
                    color: accentColor,
                    textShadow: `0 0 5px ${afterGlow}`,
                  }}
                >
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

      {/* ボタン群 (3 ボタン: +1 / +5 / MAX) */}
      {!maxed && options.length > 0 && (
        <div
          className={styles.buttons}
          style={{ gridTemplateColumns: `repeat(${options.length}, 1fr)` }}
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
