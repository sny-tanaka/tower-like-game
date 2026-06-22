import type { MachineUpgradeCategory } from './items';
import { CATEGORY_LABELS, MACHINE_UPGRADE_ITEMS, calcCost, calcEffectValue } from './items';
import styles from './style.module.scss';

import { Text } from '@/components/atoms/Text';
import { UpgradeCard } from '@/components/molecules/UpgradeCard';
import { BigNum } from '@/lib/bignum/BigNum';
import { useStore } from '@/store';

// ---------------------------------------------------------------------------
// カテゴリの表示順
// ---------------------------------------------------------------------------

const CATEGORY_ORDER: readonly MachineUpgradeCategory[] = [
  'defense',
  'offense',
  'active',
  'economy',
  'slot',
];

// ---------------------------------------------------------------------------
// コンポーネント
// ---------------------------------------------------------------------------

/**
 * MachineUpgradeList
 *
 * マシン強化画面のメイン Organism。
 * 全 16 項目を 5 カテゴリに分けて 2 列グリッドで表示する。
 * カテゴリ間に小見出しを入れる。
 * props なし（useStore から全データを取得）。
 */
export function MachineUpgradeList() {
  const machineLevels = useStore((s) => s.machineLevels);
  const bolt = useStore((s) => s.bolt);
  const incrementMachineLv = useStore((s) => s.incrementMachineLv);
  const spendBolt = useStore((s) => s.spendBolt);

  // カテゴリ別にアイテムをグループ化
  const grouped = CATEGORY_ORDER.map((category) => ({
    category,
    items: MACHINE_UPGRADE_ITEMS.filter((item) => item.category === category),
  }));

  return (
    <div className={styles.root}>
      {grouped.map(({ category, items }) => (
        <section
          key={category}
          className={styles.section}
        >
          {/* カテゴリ小見出し */}
          <div className={styles.categoryHeader}>
            <span className={styles.categoryDiamond} />
            <Text
              variant="label"
              color="primary"
            >
              {CATEGORY_LABELS[category]}
            </Text>
          </div>

          {/* 2 列グリッド */}
          <div className={styles.grid}>
            {items.map((item) => {
              const lv = machineLevels[item.key];
              const isMaxed = item.maxLv != null && lv >= item.maxLv;
              const cost = calcCost(item, lv);
              const costBn = BigNum.fromNumber(cost);
              const canAfford = !isMaxed && bolt.gte(costBn);
              const currentValue = calcEffectValue(item, lv);
              const nextValue = calcEffectValue(item, lv + 1);

              // 効果値の表示フォーマット
              const formatValue = (v: number): number => {
                if (item.unit === '%') {
                  // asymptotic 系は割合 (0〜1) → パーセント表示
                  return Math.round(v * 1000) / 10; // 小数 1 桁
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
        </section>
      ))}
    </div>
  );
}
