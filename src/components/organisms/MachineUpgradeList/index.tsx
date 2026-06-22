import {
  MACHINE_UPGRADE_ITEMS,
  calcCost,
  calcCostForN,
  calcEffectValue,
  calcMaxAffordableBigNum,
} from './items';
import styles from './style.module.scss';

import { UpgradeCard } from '@/components/molecules/UpgradeCard';
import type { UpgradeCardOption } from '@/components/molecules/UpgradeCard';
import { BigNum } from '@/lib/bignum/BigNum';
import { useStore } from '@/store';

// ---------------------------------------------------------------------------
// コンポーネント
// ---------------------------------------------------------------------------

/**
 * MachineUpgradeList
 *
 * マシン強化画面のメイン Organism。
 * 全 16 項目を **カテゴリ見出しなし、混在のまま 2 列グリッド** で表示する
 * (claude design 仕様)。並び順は items.ts の定義順 (防御 → 攻撃 → アクティブ
 * → 経済 → スロット)。
 * props なし（useStore から全データを取得）。
 */
export function MachineUpgradeList() {
  const machineLevels = useStore((s) => s.machineLevels);
  const bolt = useStore((s) => s.bolt);
  const incrementMachineLv = useStore((s) => s.incrementMachineLv);
  const spendBolt = useStore((s) => s.spendBolt);

  return (
    <div className={styles.root}>
      {MACHINE_UPGRADE_ITEMS.map((item) => {
        const lv = machineLevels[item.key];
        const isMaxed = item.maxLv != null && lv >= item.maxLv;
        const currentValue = calcEffectValue(item, lv);
        const nextValue = calcEffectValue(item, lv + 1);

        const formatValue = (v: number): number => {
          if (item.unit === '%') {
            // asymptotic 系は割合 (0〜1) → パーセント表示
            return Math.round(v * 1000) / 10;
          }
          return v;
        };

        const displayCurrent = formatValue(currentValue);
        const displayNext = formatValue(nextValue);

        // 3 オプション (+1 / +5 / MAX) のコストと disabled を計算
        const cost1 = calcCost(item, lv);
        const cost5 = calcCostForN(item, lv, 5);
        const cost1Bn = BigNum.fromNumber(cost1);
        const cost5Bn = BigNum.fromNumber(cost5);

        // 残ボルトで何 Lv 上げられるか（BigNum 同士で比較するため number 経由しない）
        const maxBuyN = calcMaxAffordableBigNum(item, lv, bolt);
        const remainingLevels = item.maxLv != null ? item.maxLv - lv : Number.POSITIVE_INFINITY;
        const maxBuyClamped = Math.min(maxBuyN, remainingLevels);
        const costMax = maxBuyClamped > 0 ? calcCostForN(item, lv, maxBuyClamped) : cost1;
        const costMaxBn = BigNum.fromNumber(costMax);

        const disabled1 = bolt.lt(cost1Bn);
        const disabled5 = bolt.lt(cost5Bn) || (item.maxLv != null && lv + 5 > item.maxLv);
        const disabledMax = maxBuyClamped < 1;

        const options: UpgradeCardOption[] = isMaxed
          ? []
          : [
              { amount: '+1', cost: cost1Bn, disabled: disabled1 },
              { amount: '+5', cost: cost5Bn, disabled: disabled5 },
              { amount: 'MAX', cost: costMaxBn, disabled: disabledMax },
            ];

        const handleUpgrade = (amount: string) => {
          if (isMaxed) return;
          let buyCount = 0;
          if (amount === '+1') buyCount = 1;
          else if (amount === '+5') buyCount = 5;
          else if (amount === 'MAX') buyCount = maxBuyClamped;
          if (buyCount < 1) return;

          // maxLv を超えないようにクランプ
          if (item.maxLv != null) {
            buyCount = Math.min(buyCount, item.maxLv - lv);
          }
          // 実コスト
          const totalCost = calcCostForN(item, lv, buyCount);
          const totalCostBn = BigNum.fromNumber(totalCost);
          const spent = spendBolt(totalCostBn);
          if (spent) {
            for (let i = 0; i < buyCount; i++) {
              incrementMachineLv(item.key);
            }
          }
        };

        return (
          <UpgradeCard
            key={item.key}
            title={item.title}
            iconName={item.iconName}
            currentLabel={`Lv ${lv}`}
            before={displayCurrent}
            after={isMaxed ? undefined : displayNext}
            beforeSuffix={item.unit ?? ''}
            currency="bolt"
            accent="primary"
            maxed={isMaxed}
            options={options}
            onUpgrade={handleUpgrade}
          />
        );
      })}
    </div>
  );
}
