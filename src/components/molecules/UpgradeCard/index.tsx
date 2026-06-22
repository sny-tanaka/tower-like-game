import type { CSSProperties } from 'react';

import styles from './style.module.scss';

import { Badge } from '@/components/atoms/Badge';
import { Button } from '@/components/atoms/Button';
import { Card } from '@/components/atoms/Card';
import { Text } from '@/components/atoms/Text';
import { BigNum } from '@/lib/bignum/BigNum';

// ---------------------------------------------------------------------------
// 型定義
// ---------------------------------------------------------------------------

export type UpgradeCardCurrency = 'screw' | 'bolt' | 'alloy';

export interface UpgradeCardProps {
  title: string;
  currentLv: number;
  currentValue: string;
  nextLvCost: BigNum | number;
  onUpgrade: (delta: 1 | 5 | 'max') => void;
  canAfford: boolean;
  currency: UpgradeCardCurrency;
  disabled?: boolean;
  maxLv?: number;
}

// ---------------------------------------------------------------------------
// 通貨ごとの CSS 変数
// ---------------------------------------------------------------------------

const CURRENCY_COLOR_VAR: Record<UpgradeCardCurrency, string> = {
  screw: 'var(--c-screw)',
  bolt: 'var(--c-bolt)',
  alloy: 'var(--c-alloy)',
};

// ---------------------------------------------------------------------------
// コンポーネント
// ---------------------------------------------------------------------------

export function UpgradeCard({
  title,
  currentLv,
  currentValue,
  nextLvCost,
  onUpgrade,
  canAfford,
  currency,
  disabled = false,
  maxLv,
}: UpgradeCardProps) {
  const costBn: BigNum =
    typeof nextLvCost === 'number' ? BigNum.fromNumber(nextLvCost) : nextLvCost;

  const colorVar = CURRENCY_COLOR_VAR[currency];
  const isDisabled = disabled || !canAfford;

  const costTextStyle: CSSProperties = {
    color: colorVar,
    fontSize: 'var(--fs-caption)',
    fontFamily: 'var(--ff-numeric)',
  };

  const lvLabel = maxLv != null ? `Lv ${currentLv} / ${maxLv}` : `Lv ${currentLv}`;

  return (
    <Card
      variant="elevated"
      padding="sm"
      className={styles.root}
    >
      {/* 上段: タイトル + レベル */}
      <div className={styles.header}>
        <Text
          variant="label"
          color="mid"
        >
          {title}
        </Text>
        <Badge
          text={lvLabel}
          variant="default"
        />
      </div>

      {/* 中段: 現効果値 */}
      <div className={styles.value}>
        <Text
          variant="numeric-m"
          color="primary"
        >
          {currentValue}
        </Text>
      </div>

      {/* 下段: +1 / +5 / Max ボタン */}
      <div className={styles.buttons}>
        {([1, 5, 'max'] as const).map((delta) => (
          <div
            key={delta}
            className={styles.buttonCol}
          >
            <Button
              label={delta === 'max' ? 'Max' : `+${delta}`}
              variant="ghost"
              size="sm"
              disabled={isDisabled}
              onClick={() => {
                onUpgrade(delta);
              }}
            />
            <span
              className={styles.costLabel}
              style={costTextStyle}
            >
              {costBn.toDisplay()}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}
