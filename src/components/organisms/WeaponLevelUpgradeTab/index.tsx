import styles from './style.module.scss';

import { Card } from '@/components/atoms/Card';
import { CurrencyAmount } from '@/components/atoms/CurrencyAmount';
import { Text } from '@/components/atoms/Text';
import { UpgradeCard } from '@/components/molecules/UpgradeCard';
import type { WeaponStat } from '@/components/molecules/WeaponPreview';
import {
  buildLaserStats,
  buildCannonStats,
  buildThunderStats,
  buildCutterStats,
  calcMachineBaseAttack,
  calcMachineRange,
} from '@/components/organisms/WeaponDetailsTab';
import { soundEngine } from '@/lib/audio';
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
// ステ計算ユーティリティ（buildXStats / calcMachineBaseAttack 経由でゲーム実値を使う）
// ---------------------------------------------------------------------------

/** stats impact プレビュー用の 1 行 */
export interface StatsImpactItem {
  label: string;
  before: string;
  after: string;
  suffix?: string;
}

/**
 * weaponLv → weaponLv+1 の主要ステ変化プレビューを生成
 * baseAttackLv / rangeLv は store の machineLevels から渡す。
 */
export function buildStatsImpact(
  lv: number,
  baseAttackLv: number,
  rangeLv: number
): StatsImpactItem[] {
  const baseAttack = calcMachineBaseAttack(baseAttackLv);
  const machineRange = calcMachineRange(rangeLv);
  const nextLv = lv + 1;

  const laserBefore = buildLaserStats(lv, baseAttack, machineRange);
  const laserAfter = buildLaserStats(nextLv, baseAttack, machineRange);
  const cannonBefore = buildCannonStats(lv, baseAttack, machineRange);
  const cannonAfter = buildCannonStats(nextLv, baseAttack, machineRange);
  const thunderBefore = buildThunderStats(lv, baseAttack, machineRange);
  const thunderAfter = buildThunderStats(nextLv, baseAttack, machineRange);
  const cutterBefore = buildCutterStats(lv, baseAttack);
  const cutterAfter = buildCutterStats(nextLv, baseAttack);

  /** buildXStats が返す配列の DMG 値（index 0、label='DMG'）を文字列で取り出す */
  const dmg = (stats: WeaponStat[]) => String(stats[0]!.value);

  return [
    { label: 'LASER DMG', before: dmg(laserBefore), after: dmg(laserAfter) },
    { label: 'CANNON DMG', before: dmg(cannonBefore), after: dmg(cannonAfter) },
    { label: 'THUNDER DMG', before: dmg(thunderBefore), after: dmg(thunderAfter) },
    { label: 'CUTTER DMG', before: dmg(cutterBefore), after: dmg(cutterAfter) },
  ];
}

// ---------------------------------------------------------------------------
// コンポーネント
// ---------------------------------------------------------------------------

export function WeaponLevelUpgradeTab() {
  const weaponLv = useStore((s) => s.weaponLv);
  const alloy = useStore((s) => s.alloy);
  const machineLevels = useStore((s) => s.machineLevels);
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
  const statsImpact = buildStatsImpact(weaponLv, machineLevels.baseAttack, machineLevels.range);

  function handleBuy(amount: string) {
    if (amount === '+1') {
      if (spendAlloy(cost1)) {
        incrementWeaponLv();
        soundEngine.play('purchaseOk');
      } else {
        soundEngine.play('reject');
      }
    } else if (amount === '+5') {
      if (spendAlloy(cost5)) {
        setWeaponLv(weaponLv + 5);
        soundEngine.play('purchaseOk');
      } else {
        soundEngine.play('reject');
      }
    } else if (amount === 'MAX') {
      if (maxLevels > 0 && spendAlloy(costMax)) {
        setWeaponLv(weaponLv + maxLevels);
        soundEngine.play('purchaseOk');
      } else {
        soundEngine.play('reject');
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
                <Text
                  variant="body"
                  color="dim"
                  className={styles.impactValue}
                >
                  {item.before}
                  {item.suffix != null ? item.suffix : ''}
                </Text>
                <span className={styles.arrow}>→</span>
                <Text
                  variant="body"
                  color="secondary"
                  className={styles.impactValue}
                >
                  {item.after}
                  {item.suffix != null ? item.suffix : ''}
                </Text>
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
