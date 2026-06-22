import styles from './style.module.scss';

import { Card } from '@/components/atoms/Card';
import { CurrencyAmount } from '@/components/atoms/CurrencyAmount';
import { NumericDisplay } from '@/components/atoms/NumericDisplay';
import { Text } from '@/components/atoms/Text';
import { UpgradeCard } from '@/components/molecules/UpgradeCard';
import { BigNum } from '@/lib/bignum/BigNum';
import { useStore } from '@/store';

// ---------------------------------------------------------------------------
// コスト計算ユーティリティ
// 仕様: design-docs/tower-like-game/05-weapons.md「cost_W(Lv) = ceil(200 × 1.12^Lv)」
// ---------------------------------------------------------------------------

/**
 * 武器強化 Lv のコスト
 * cost_W(Lv) = ceil(200 × 1.12^Lv)
 */
export function calcWeaponUpgradeCost(lv: number): BigNum {
  const cost = Math.ceil(200 * Math.pow(1.12, lv));
  return BigNum.fromNumber(cost);
}

/**
 * +n Lv 分の累計コスト（currentLv → currentLv + n）
 */
export function calcCumulativeCost(currentLv: number, n: number): BigNum {
  let total = BigNum.ZERO;
  for (let i = 0; i < n; i++) {
    total = total.add(calcWeaponUpgradeCost(currentLv + i));
  }
  return total;
}

/**
 * 所持 alloy で最大何 Lv 上げられるか
 */
export function calcMaxLevels(currentLv: number, alloy: BigNum): number {
  let remaining = alloy;
  let count = 0;
  while (true) {
    const cost = calcWeaponUpgradeCost(currentLv + count);
    if (remaining.lt(cost)) break;
    remaining = remaining.sub(cost);
    count++;
    // 安全上限（無限ループ防止）
    if (count > 10_000) break;
  }
  return count;
}

// ---------------------------------------------------------------------------
// ステ計算ユーティリティ（04-weapons.md 準拠）
// ---------------------------------------------------------------------------

/**
 * 武器ダメージ倍率: ×1.02^Lv
 */
export function calcDamageMulLv(lv: number): number {
  return Math.pow(1.02, lv);
}

/**
 * 武器ごとの底値 DMG（Lv=0 の表示用代表値）
 */
const BASE_DAMAGE: Record<string, number> = {
  laser: 120,
  cannon: 480,
  thunder: 84,
  cutter: 62,
};

/** stats impact プレビュー用の 1 行 */
export interface StatsImpactItem {
  label: string;
  before: number;
  after: number;
  suffix?: string;
}

/**
 * weaponLv → weaponLv+1 の主要ステ変化プレビューを生成
 */
export function buildStatsImpact(lv: number): StatsImpactItem[] {
  const nextLv = lv + 1;
  const mulNow = calcDamageMulLv(lv);
  const mulNext = calcDamageMulLv(nextLv);

  return [
    {
      label: 'LASER DMG',
      before: Math.round(BASE_DAMAGE.laser * mulNow),
      after: Math.round(BASE_DAMAGE.laser * mulNext),
    },
    {
      label: 'CANNON 半径',
      before: Math.round((30 + 0.5 * lv) * 10) / 10,
      after: Math.round((30 + 0.5 * nextLv) * 10) / 10,
      suffix: 'm',
    },
    {
      label: 'THUNDER 連鎖',
      before: Math.floor(7 + 0.1 * lv),
      after: Math.floor(7 + 0.1 * nextLv),
    },
    {
      label: 'CUTTER 同時',
      before: Math.floor(1 + 0.05 * lv),
      after: Math.floor(1 + 0.05 * nextLv),
    },
  ];
}

// ---------------------------------------------------------------------------
// コンポーネント
// ---------------------------------------------------------------------------

export function WeaponLevelUpgradeTab() {
  const weaponLv = useStore((s) => s.weaponLv);
  const alloy = useStore((s) => s.alloy);
  const incrementWeaponLv = useStore((s) => s.incrementWeaponLv);
  const setWeaponLv = useStore((s) => s.setWeaponLv);
  const spendAlloy = useStore((s) => s.spendAlloy);

  // コスト計算
  const cost1 = calcWeaponUpgradeCost(weaponLv);
  const cost5 = calcCumulativeCost(weaponLv, 5);
  const maxLevels = calcMaxLevels(weaponLv, alloy);
  const costMax = calcCumulativeCost(weaponLv, maxLevels);

  const canAfford1 = !alloy.lt(cost1);
  const canAfford5 = maxLevels >= 5;
  const canAffordMax = maxLevels >= 1;

  // stats プレビュー (現 Lv → +1 後)
  const statsImpact = buildStatsImpact(weaponLv);

  function handleBuy(amount: string) {
    if (amount === '+1') {
      if (spendAlloy(cost1)) {
        incrementWeaponLv();
      }
    } else if (amount === '+5') {
      if (spendAlloy(cost5)) {
        setWeaponLv(weaponLv + 5);
      }
    } else if (amount === 'MAX') {
      if (maxLevels > 0 && spendAlloy(costMax)) {
        setWeaponLv(weaponLv + maxLevels);
      }
    }
  }

  return (
    <div
      className={styles.tab}
      role="tabpanel"
      aria-label="武器強化"
    >
      {/* 説明文 + 所持 alloy */}
      <div className={styles.topRow}>
        <Text
          variant="caption"
          color="mid"
          className={styles.description}
        >
          全 4 武器に共通で効く強化です。
        </Text>
        <CurrencyAmount
          currency="alloy"
          value={alloy}
          size="sm"
        />
      </div>

      {/* 武器強化 Lv アップグレードカード */}
      <UpgradeCard
        title="武器強化 Lv"
        iconName="spark"
        iconColor="var(--c-secondary)"
        currentLabel={`Lv ${weaponLv}`}
        before={weaponLv}
        after={weaponLv + 1}
        currency="alloy"
        accent="secondary"
        options={[
          { amount: '+1', cost: cost1, disabled: !canAfford1 },
          { amount: '+5', cost: cost5, disabled: !canAfford5 },
          { amount: 'MAX', cost: costMax, disabled: !canAffordMax },
        ]}
        onUpgrade={handleBuy}
      />

      {/* 次 Lv での効果プレビュー */}
      <Card
        variant="sunken"
        padding="md"
        className={styles.previewCard}
      >
        <Text
          variant="label"
          color="dim"
          className={styles.previewLabel}
        >
          次 Lv での効果プレビュー
        </Text>
        <div className={styles.impactGrid}>
          {statsImpact.map((item, i) => (
            <div
              key={item.label}
              className={[styles.impactRow, i > 0 ? styles.impactRowBordered : '']
                .filter(Boolean)
                .join(' ')}
            >
              <Text
                variant="caption"
                color="mid"
                className={styles.impactLabel}
              >
                {item.label}
              </Text>
              <span className={styles.impactValues}>
                <NumericDisplay
                  value={item.before}
                  size="sm"
                  accentColor="dim"
                  suffix={item.suffix}
                  decimals={item.suffix === 'm' ? 1 : 0}
                />
                <span className={styles.arrow}>→</span>
                <NumericDisplay
                  value={item.after}
                  size="sm"
                  accentColor="secondary"
                  suffix={item.suffix}
                  decimals={item.suffix === 'm' ? 1 : 0}
                />
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
