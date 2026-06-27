import { memo } from 'react';

import type { RunWorkshopKey } from './items';
import {
  RUN_WORKSHOP_ITEMS,
  calcRunWorkshopCost,
  calcRunWorkshopMaxLv,
  calcRunWorkshopMultiLvCost,
  calcRunWorkshopMultiplier,
} from './items';
import styles from './style.module.scss';

import { CurrencyAmount } from '@/components/atoms/CurrencyAmount';
import { IconButton } from '@/components/atoms/IconButton';
import { Text } from '@/components/atoms/Text';
import { UpgradeCard } from '@/components/molecules/UpgradeCard';
import { BigNum } from '@/lib/bignum/BigNum';
import { useStore } from '@/store/index';

// ---------------------------------------------------------------------------
// 型定義
// ---------------------------------------------------------------------------

export type { RunWorkshopLevels } from './items';

export interface RunWorkshopBottomSheetProps {
  /** 開閉フラグ */
  open: boolean;
  /**
   * 強化ボタンクリック時のコールバック。
   * key: 強化対象の項目キー
   * delta: 1 | 5 | 'max'
   *
   * v1.3.7 Phase 4-C: Page 側で SE (purchaseOk / reject) 再生と連動するため callback として残す。
   * 内部で `useStore((s) => s.upgradeRunWorkshop)` を直接呼ぶと SE 連動が失われる。
   */
  onUpgrade: (key: RunWorkshopKey, delta: 1 | 5 | 'max') => void;
  /**
   * AUTO トグルのクリックハンドラ。指定時のみカード右上にトグルが表示される。
   *
   * v1.3.7 Phase 4-C: Page 側で `processRunWorkshopAuto` の即時呼び出しと連動するため callback
   * として残す。 内部で `setRunWorkshopAuto` を直接呼ぶと「ON にした瞬間の即時購入」 が失われる。
   */
  onToggleAuto?: (key: RunWorkshopKey, enabled: boolean) => void;
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
 *
 * v1.3.7 Phase 4-C: 親 (Page) から prop drilling していた
 *   - screw (ネジ残高)
 *   - levels (= runWorkshopLevels)
 *   - autoEnabled (= runWorkshopAutoEnabled)
 * を撤去し、 内部で `useStore` selector を直接購読する。 さらに `React.memo` でラップして、
 * 自身が subscribe している値が変化したフレーム + 親 props (open / callback) が変化した
 * フレームだけ再 render する (= Page の re-render が伝播しない)。
 *
 * SE / processRunWorkshopAuto との連動が必要な `onUpgrade` / `onToggleAuto` は Page 側で
 * useCallback された関数を受け取る形のまま残す (内部で store action を直接呼ぶと連動が失われる)。
 */
function RunWorkshopBottomSheetImpl({
  open,
  onUpgrade,
  onToggleAuto,
  onClose,
}: RunWorkshopBottomSheetProps) {
  // ── store から直接 subscribe (Page を経由しない) ──
  // selector を 1 値ずつ書くことで、 zustand のデフォルト Object.is 比較に乗る。
  const screw = useStore((s) => s.screw);
  const levels = useStore((s) => s.runWorkshopLevels);
  const autoEnabled = useStore((s) => s.runWorkshopAutoEnabled);

  // open=false は何も描画しない (= hooks 順序を保つため selector の後に return)
  if (!open) return null;

  return (
    <section
      className={styles.root}
      role="dialog"
      aria-modal="false"
      aria-label="ラン中ワークショップ"
    >
      <div className={styles.inner}>
        {/* ヘッダー: title + subtitle + 通貨 + close */}
        <div className={styles.header}>
          <div className={styles.headerText}>
            <Text
              variant="heading-3"
              style={{ fontSize: 14, lineHeight: 1.2 }}
            >
              ラン中ワークショップ
            </Text>
            <Text
              variant="caption"
              color="dim"
              style={{ fontSize: 10.5 }}
            >
              ラン終了で全リセット
            </Text>
          </div>
          <CurrencyAmount
            currency="screw"
            value={screw}
            size="md"
          />
          {onClose != null && (
            <IconButton
              icon="chevron-down"
              label="閉じる"
              variant="ghost"
              size="sm"
              onClick={onClose}
            />
          )}
        </div>

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

            const cardAutoEnabled = autoEnabled[item.key] ?? false;
            const cardOnToggleAuto =
              onToggleAuto != null ? (next: boolean) => onToggleAuto(item.key, next) : undefined;

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
                autoEnabled={cardAutoEnabled}
                onToggleAuto={cardOnToggleAuto}
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
    </section>
  );
}

/**
 * v1.3.7 Phase 4-C: RunWorkshopBottomSheet を React.memo で wrap。 props を必要最小限
 * (open / callback) に絞ったため、 親 (Page) が 60fps で再 render しても親 props が
 * 変化しなければ RunWorkshopBottomSheet + その配下 (UpgradeCard × 4 + CurrencyAmount 等) の
 * re-render をスキップできる。 内部の store subscribe で値が変わったフレームだけ再 render される。
 */
export const RunWorkshopBottomSheet = memo(RunWorkshopBottomSheetImpl);
RunWorkshopBottomSheet.displayName = 'RunWorkshopBottomSheet';
