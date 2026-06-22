import { MACHINE_UPGRADE_ITEMS, calcCost, calcEffectValue } from './items';
import styles from './style.module.scss';

import { UpgradeCard } from '@/components/molecules/UpgradeCard';
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
        const cost = calcCost(item, lv);
        const costBn = BigNum.fromNumber(cost);
        const canAfford = !isMaxed && bolt.gte(costBn);
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

        const handleUpgrade = () => {
          if (isMaxed) return;
          const spent = spendBolt(costBn);
          if (spent) {
            incrementMachineLv(item.key);
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
            options={
              isMaxed
                ? []
                : [
                    {
                      amount: '+1',
                      cost: costBn,
                      disabled: !canAfford,
                    },
                  ]
            }
            onUpgrade={handleUpgrade}
          />
        );
      })}
    </div>
  );
}
