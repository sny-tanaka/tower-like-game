import styles from './style.module.scss';

import { Card } from '@/components/atoms/Card';
import { CurrencyAmount } from '@/components/atoms/CurrencyAmount';
import { Text } from '@/components/atoms/Text';
import { UpgradeCard } from '@/components/molecules/UpgradeCard';
import {
  calcLaserCritBonus,
  calcCannonSplashRadius,
  calcThunderHpRegenPct,
  calcCutterOverdriveDurationSec,
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
}

/**
 * weaponLv → weaponLv+1 の主要ステ変化プレビューを生成。
 *
 * v1.1.1 で武器Lv は damageMul / attackPerSec を一切伸ばさないため、
 * プレビューは「各武器の Lv 軸 1 つ」だけを表示する:
 *   - Laser: クリ倍率ボーナス +0.01/Lv
 *   - Cannon: 爆発半径 +0.5/Lv (px)
 *   - Thunder: HP 回復率 +0.1%/Lv
 *   - Cutter: Overdrive 持続秒 +0.1/Lv
 *
 * baseAttackLv / rangeLv はマシン強化由来なのでこの軸とは無関係。
 * インターフェース互換のため引数だけ残してある（呼び出し側のリファクタを最小化）。
 */
export function buildStatsImpact(
  lv: number,
  _baseAttackLv: number,
  _rangeLv: number
): StatsImpactItem[] {
  const nextLv = lv + 1;
  return [
    {
      label: 'LASER クリ倍率ボーナス',
      before: `+${calcLaserCritBonus(lv).toFixed(2)}`,
      after: `+${calcLaserCritBonus(nextLv).toFixed(2)}`,
    },
    {
      label: 'CANNON 爆発半径',
      before: `${calcCannonSplashRadius(lv).toFixed(1)}m`,
      after: `${calcCannonSplashRadius(nextLv).toFixed(1)}m`,
    },
    {
      label: 'THUNDER HP 回復率',
      before: `${calcThunderHpRegenPct(lv).toFixed(1)}%`,
      after: `${calcThunderHpRegenPct(nextLv).toFixed(1)}%`,
    },
    {
      label: 'CUTTER Overdrive 持続',
      before: `${calcCutterOverdriveDurationSec(lv).toFixed(1)}s`,
      after: `${calcCutterOverdriveDurationSec(nextLv).toFixed(1)}s`,
    },
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
                </Text>
                <span className={styles.arrow}>→</span>
                <Text
                  variant="body"
                  color="secondary"
                  className={styles.impactValue}
                >
                  {item.after}
                </Text>
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
