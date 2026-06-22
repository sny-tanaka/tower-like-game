import type { RunWorkshopKey, RunWorkshopLevels } from './items';
import {
  RUN_WORKSHOP_ITEMS,
  calcRunWorkshopCost,
  calcRunWorkshopMaxLv,
  calcRunWorkshopMultiLvCost,
  calcRunWorkshopMultiplier,
} from './items';
import styles from './style.module.scss';

import { Sheet } from '@/components/atoms/Sheet';
import { BottomSheetHandle } from '@/components/molecules/BottomSheetHandle';
import { UpgradeCard } from '@/components/molecules/UpgradeCard';
import { BigNum } from '@/lib/bignum/BigNum';

// ---------------------------------------------------------------------------
// 型定義
// ---------------------------------------------------------------------------

export type { RunWorkshopLevels } from './items';

export interface RunWorkshopBottomSheetProps {
  /** 開閉フラグ */
  open: boolean;
  /** 現在のネジ残高 */
  screw: BigNum;
  /** 各項目の現在 Lv */
  levels: RunWorkshopLevels;
  /**
   * 強化ボタンクリック時のコールバック。
   * key: 強化対象の項目キー
   * delta: 1 | 5 | 'max'
   */
  onUpgrade: (key: RunWorkshopKey, delta: 1 | 5 | 'max') => void;
  /** シートを閉じるコールバック */
  onClose?: () => void;
}

// ---------------------------------------------------------------------------
// コンポーネント
// ---------------------------------------------------------------------------

/**
 * RunWorkshopBottomSheet
 *
 * バトル中のラン内ワークショップをボトムシートで表示する Organism。
 * Sheet + BottomSheetHandle + UpgradeCard × 4 を合成。
 * 強化ロジックは props 経由 (pure / stateless)。
 */
export function RunWorkshopBottomSheet({
  open,
  screw,
  levels,
  onUpgrade,
  onClose,
}: RunWorkshopBottomSheetProps) {
  if (!open) return null;

  return (
    <Sheet
      open={open}
      onClose={onClose}
      edge="bottom"
    >
      {/* ドラッグハンドル */}
      <BottomSheetHandle />

      <div className={styles.inner}>
        {/* 2×2 グリッド */}
        <div className={styles.grid}>
          {RUN_WORKSHOP_ITEMS.map((item) => {
            const lv = levels[item.key];
            const currentMul = calcRunWorkshopMultiplier(lv);
            const nextMul = calcRunWorkshopMultiplier(lv + 1);

            const cost1Num = calcRunWorkshopCost(item, lv);
            const cost5Num = calcRunWorkshopMultiLvCost(item, lv, 5);
            const { totalCost: costMaxBn, lvDelta: maxLvDelta } = calcRunWorkshopMaxLv(
              item,
              lv,
              screw
            );

            const cost1Bn = BigNum.fromNumber(cost1Num);
            const cost5Bn = BigNum.fromNumber(cost5Num);

            const canAfford1 = screw.gte(cost1Bn);
            const canAfford5 = screw.gte(cost5Bn);
            const canAffordMax = maxLvDelta > 0;

            return (
              <UpgradeCard
                key={item.key}
                title={item.title}
                iconName={item.iconName}
                currentLabel={`Lv ${lv}`}
                before={Math.round(currentMul * 10) / 10}
                after={Math.round(nextMul * 10) / 10}
                beforeSuffix="×"
                currency="screw"
                accent="warning"
                options={[
                  {
                    amount: '+1',
                    cost: cost1Bn,
                    disabled: !canAfford1,
                  },
                  {
                    amount: '+5',
                    cost: cost5Bn,
                    disabled: !canAfford5,
                  },
                  {
                    amount: 'MAX',
                    cost: costMaxBn,
                    disabled: !canAffordMax,
                  },
                ]}
                onUpgrade={(amount) => {
                  if (amount === '+1') onUpgrade(item.key, 1);
                  else if (amount === '+5') onUpgrade(item.key, 5);
                  else if (amount === 'MAX') onUpgrade(item.key, 'max');
                }}
              />
            );
          })}
        </div>
      </div>
    </Sheet>
  );
}
