import type { StateCreator } from 'zustand';

import {
  RUN_WORKSHOP_ITEMS,
  calcRunWorkshopMaxLv,
  calcRunWorkshopMultiLvCost,
} from '@/components/organisms/RunWorkshopBottomSheet/items';
import type {
  RunWorkshopKey,
  RunWorkshopLevels,
} from '@/components/organisms/RunWorkshopBottomSheet/items';
import { BigNum } from '@/lib/bignum';
import type { RootStore } from '@/store/index';

// ---------------------------------------------------------------------------
// State
// ---------------------------------------------------------------------------

/** RunWorkshop 4 項目の AUTO ON/OFF マップ */
export type RunWorkshopAutoEnabled = {
  [K in RunWorkshopKey]: boolean;
};

export interface RunWorkshopState {
  /** ラン中ワークショップ 4 項目の現在 Lv */
  runWorkshopLevels: RunWorkshopLevels;
  /** ラン中ワークショップ 4 項目の AUTO ON/OFF。 ラン開始時に全 false にリセットされる */
  runWorkshopAutoEnabled: RunWorkshopAutoEnabled;
}

// ---------------------------------------------------------------------------
// Actions
// ---------------------------------------------------------------------------

export interface RunWorkshopActions {
  /**
   * 指定項目を delta 段階強化する。ネジを消費 (battle slice の spendScrew を経由)。
   * 戻り値:
   *   - true: 強化成功 (ネジ消費 + Lv 加算済み)
   *   - false: ネジ不足 / 未知の key / 'max' で買える Lv がない場合
   */
  upgradeRunWorkshop: (key: RunWorkshopKey, delta: 1 | 5 | 'max') => boolean;
  /**
   * ラン開始 / 終了時に全 Lv を 0 に戻す。
   * v1.4.4: AUTO ON/OFF はセッション跨ぎ永続化のためリセット対象外 (Lv のみリセット)。
   */
  resetRunWorkshop: () => void;
  /** 指定項目の AUTO ON/OFF を切り替える */
  setRunWorkshopAuto: (key: RunWorkshopKey, enabled: boolean) => void;
  /**
   * AUTO が ON の項目に対して、 優先順位 (攻撃 > 速度 > HP > ネジ) の順で
   * `upgradeRunWorkshop(key, 'max')` を試行する。
   * 上位項目がネジ不足で買えなくても、 下位の ON 項目があれば残ネジで購入を試みる
   * (フォールスルー)。
   * 主に battle slice の addScrew から呼ばれ、 ネジが貯まったら即時自動強化される。
   */
  processRunWorkshopAuto: () => void;
}

export type RunWorkshopSlice = RunWorkshopState & RunWorkshopActions;

// ---------------------------------------------------------------------------
// Default state
// ---------------------------------------------------------------------------

export const defaultRunWorkshopLevels: RunWorkshopLevels = {
  attackMul: 0,
  attackSpeedMul: 0,
  hpMul: 0,
  screwGainMul: 0,
};

export const defaultRunWorkshopAutoEnabled: RunWorkshopAutoEnabled = {
  attackMul: false,
  attackSpeedMul: false,
  hpMul: false,
  screwGainMul: false,
};

export const defaultRunWorkshopState: RunWorkshopState = {
  runWorkshopLevels: defaultRunWorkshopLevels,
  runWorkshopAutoEnabled: defaultRunWorkshopAutoEnabled,
};

/**
 * AUTO 自動強化の優先順位 (上位ほど優先)。
 * 仕様: 攻撃 > 速度 > HP > ネジ。
 */
export const RUN_WORKSHOP_AUTO_PRIORITY: readonly RunWorkshopKey[] = [
  'attackMul',
  'attackSpeedMul',
  'hpMul',
  'screwGainMul',
];

// ---------------------------------------------------------------------------
// Factory
// ---------------------------------------------------------------------------

export const createRunWorkshopSlice: StateCreator<RootStore, [], [], RunWorkshopSlice> = (
  set,
  get
) => ({
  ...defaultRunWorkshopState,

  upgradeRunWorkshop: (key, delta) => {
    const item = RUN_WORKSHOP_ITEMS.find((i) => i.key === key);
    if (item == null) return false;

    const currentLv = get().runWorkshopLevels[key];

    // delta を実数 + 合計コストに解決
    let lvDelta: number;
    let totalCost: BigNum;
    if (delta === 'max') {
      const r = calcRunWorkshopMaxLv(item, currentLv, get().screw);
      if (r.lvDelta === 0) return false;
      lvDelta = r.lvDelta;
      totalCost = r.totalCost;
    } else {
      lvDelta = delta;
      totalCost = BigNum.fromNumber(calcRunWorkshopMultiLvCost(item, currentLv, delta));
    }

    // ネジ消費は battle slice の spendScrew に委譲 (残高チェック込み)
    const spent = get().spendScrew(totalCost);
    if (!spent) return false;

    const newLv = currentLv + lvDelta;
    set((s) => ({
      runWorkshopLevels: {
        ...s.runWorkshopLevels,
        [key]: newLv,
      },
    }));

    // hpMul の場合は machineMaxHp を動的に再計算 ( design-docs/04-run-workshop.md L28-44 「減量維持」)
    if (key === 'hpMul') {
      get().recalcMachineMaxHpFromHpMul(newLv);
    }
    return true;
  },

  resetRunWorkshop: () =>
    // v1.4.4: AUTO 設定はセッション跨ぎで保持したいので触らない。 Lv のみ 0 に戻す。
    set({
      runWorkshopLevels: defaultRunWorkshopLevels,
    }),

  setRunWorkshopAuto: (key, enabled) =>
    set((s) => ({
      runWorkshopAutoEnabled: {
        ...s.runWorkshopAutoEnabled,
        [key]: enabled,
      },
    })),

  processRunWorkshopAuto: () => {
    // AUTO が 1 つも ON でなければ即 return (ホットパス最適化: addScrew から毎回呼ばれる)
    const autoEnabled = get().runWorkshopAutoEnabled;
    let anyOn = false;
    for (const k of RUN_WORKSHOP_AUTO_PRIORITY) {
      if (autoEnabled[k]) {
        anyOn = true;
        break;
      }
    }
    if (!anyOn) return;

    // 優先順位順に MAX 強化を試みる (フォールスルー: 上位がネジ不足でも下位の ON 項目を試す)
    for (const key of RUN_WORKSHOP_AUTO_PRIORITY) {
      if (!get().runWorkshopAutoEnabled[key]) continue;
      // upgradeRunWorkshop('max') は内部で「現在のネジで買える最大段数」を計算し
      // 全部一括購入する。 ネジ 0 / 1 段も買えないなら false を返して state 無変更。
      get().upgradeRunWorkshop(key, 'max');
    }
  },
});
