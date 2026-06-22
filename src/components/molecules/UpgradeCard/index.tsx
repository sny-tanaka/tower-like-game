import styles from './style.module.scss';

import { Button } from '@/components/atoms/Button';
import { Card } from '@/components/atoms/Card';
import { CurrencyAmount } from '@/components/atoms/CurrencyAmount';
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
  /** 強化前の効果値 */
  before?: number;
  /** 強化後（+1 時）の効果値 */
  after?: number;
  /** before/after に付与する suffix (例: "%", "×", "/s") */
  beforeSuffix?: string;
  /** 通貨種 */
  currency?: UpgradeCardCurrency;
  /** アクセントカラー */
  accent?: UpgradeCardAccent;
  /** 強化ボタン群 */
  options?: ReadonlyArray<UpgradeCardOption>;
  /** 上限到達フラグ。true 時はボタンを非表示にして MAXED 表示 */
  maxed?: boolean;
  /** ボタンクリック時のコールバック。option の amount が渡される */
  onUpgrade?: (amount: string) => void;
}

// ---------------------------------------------------------------------------
// アクセント→CSS 変数マッピング
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
}: UpgradeCardProps) {
  const resolvedAccent = accent ?? CURRENCY_TO_ACCENT[currency];
  const accentColor = ACCENT_COLOR[resolvedAccent];
  const effectiveIconColor = iconColor ?? accentColor;

  return (
    <Card
      variant="elevated"
      padding="sm"
      className={styles.root}
    >
      {/* ヘッダー行: アイコン + タイトル + Lv バッジ */}
      <div className={styles.header}>
        {iconName != null && (
          <span className={styles.iconWrap}>
            <Icon
              name={iconName}
              size={16}
              color={effectiveIconColor}
            />
          </span>
        )}
        <Text
          variant="label"
          color="mid"
          className={styles.title}
        >
          {title}
        </Text>
        {currentLabel != null && (
          <span
            className={styles.lvBadge}
            style={{ color: accentColor, boxShadow: ACCENT_GLOW[resolvedAccent] }}
          >
            {currentLabel}
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

      {/* 効果値行: before → after */}
      {before != null && (
        <div className={styles.valueRow}>
          <span
            className={styles.valueNum}
            style={{ color: accentColor }}
          >
            {before.toLocaleString()}
            {beforeSuffix}
          </span>
          {after != null && !maxed && (
            <>
              <span className={styles.arrow}>→</span>
              <span
                className={styles.valueNum}
                style={{ color: 'var(--c-text)' }}
              >
                {after.toLocaleString()}
                {beforeSuffix}
              </span>
            </>
          )}
        </div>
      )}

      {/* ボタン群 or MAXED */}
      {maxed ? (
        <div
          className={styles.maxed}
          style={{ color: accentColor }}
        >
          MAXED
        </div>
      ) : options.length > 0 ? (
        <div className={styles.buttons}>
          {options.map((opt) => {
            const costBn = typeof opt.cost === 'number' ? BigNum.fromNumber(opt.cost) : opt.cost;
            return (
              <div
                key={opt.amount}
                className={styles.btnCol}
              >
                <Button
                  label={opt.amount}
                  variant="ghost"
                  size="sm"
                  disabled={opt.disabled === true}
                  onClick={() => onUpgrade?.(opt.amount)}
                />
                <CurrencyAmount
                  currency={currency}
                  value={costBn}
                  size="sm"
                />
              </div>
            );
          })}
        </div>
      ) : null}
    </Card>
  );
}
