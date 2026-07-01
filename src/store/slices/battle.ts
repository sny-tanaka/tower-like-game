import type { StateCreator } from 'zustand';

import { calcRunWorkshopMultiplier } from '@/components/organisms/RunWorkshopBottomSheet/items';
import { BigNum } from '@/lib/bignum';
import type { RootStore } from '@/store/index';
import type { WeaponType } from '@/store/slices/weapons';

// ---------------------------------------------------------------------------
// State
// ---------------------------------------------------------------------------

export interface BattleState {
  /** ラン中かどうか */
  isRunActive: boolean;
  /** ラン中通貨: ネジ */
  screw: BigNum;
  /** マシン現在 HP (BigNum でオーバーフロー耐性) */
  machineHp: BigNum;
  /** マシン最大 HP (base × RunWorkshop hpMul) — RunWorkshop hpMul の変化で動的に再計算される */
  machineMaxHp: BigNum;
  /**
   * マシン最大 HP の base 値 (永続強化 / 装着パッチ込み)。
   * ラン中ワークショップの hpMul を適用する前の値で、 startRun 時に固定される。
   * hpMul が上がっても base は変わらず、 machineMaxHp = baseMachineMaxHp × multiplier で再計算する。
   */
  baseMachineMaxHp: BigNum;
  /** 現在 Tier */
  currentTier: number;
  /** 現在 Wave (Tier 内) */
  currentWave: number;
  /** 現在の武器 */
  currentWeapon: WeaponType;
  /** 武器切替クールダウン残り秒 (0 = 切替可能) */
  weaponSwitchCdSec: number;
  /** アクティブスキルクールダウン残り秒 (0 = 使用可能) */
  activeCdSec: number;
  /** アクティブスキル: 手動(false) / 自動(true) */
  isAutoActive: boolean;
  /** 一時停止中か */
  isPaused: boolean;
  /**
   * ラン開始時点の bolt 残高。
   * リザルトで「このランで獲得したボルト数」を `currentBolt - runStartBolt` で算出する。
   */
  runStartBolt: BigNum;
  /** ラン開始時点の alloy 残高 (同上) */
  runStartAlloy: BigNum;
  /**
   * このランで既にパッチがドロップしたか。 仕様 (06-patches.md): パッチドロップは
   * 1 ラン中最大 1 個。 true の間は dropPatch の判定をスキップする。
   * ラン開始時に false にリセットされる。
   */
  runPatchDropped: boolean;
  /**
   * ボス HP が 60% を切ったタイミング (ラン開始からの経過 ms)。 null の間は雑魚スポーンが
   * 抑止される。 useBattleLoop が毎フレーム ボス HP を監視し、 60% を切った瞬間に
   * このフィールドへ現在 wave 内経過 ms (ボス出現時刻基準) を書き込む。 ラン / Tier
   * 切替時に null にリセットされる。
   */
  bossWeakenedAtMs: number | null;
}

// ---------------------------------------------------------------------------
// Actions
// ---------------------------------------------------------------------------

export interface BattleActions {
  startRun: (opts: {
    initialWeapon: WeaponType;
    /** マシン本体最大 HP の base 値 (永続強化込み / RunWorkshop hpMul は含まない) */
    baseMachineMaxHp: BigNum;
    /**
     * マシン強化「アクティブ CD 短縮率」の漸近実効値 (0〜0.5)。
     * 省略時は 0 (短縮なし)。 ラン開始時のゲージ初期値 (= 60s から短縮された値) と
     * fireActive 時の CD 再設定に使われる。
     */
    activeCdReduction?: number;
    /** 開始 Tier。省略時は 1 */
    initialTier?: number;
    /**
     * 開始 Wave。省略時は 1。
     * 主に DEV 限定デバッグ起動 (preparation 画面の DEBUG ボタン) で W28 等から
     * 開始して Tier クリアフローまで短時間で到達するために使う。
     * 通常の preparation 出撃では 1 のまま (= 通常 wave 1 から開始)。
     */
    initialWave?: number;
  }) => void;
  endRun: () => void;
  addScrew: (amount: BigNum) => void;
  /**
   * ラン中にパッチがドロップしたことを記録する。
   * 以降の dropPatch 判定をスキップさせて 1 ラン 1 個ルールを担保する。
   */
  markRunPatchDropped: () => void;
  /**
   * ボス HP が 60% を切ったタイミングを記録する。 すでに値が入っている場合は無視 (= 一度切ったら以降の
   * 値は保持)。 useBattleLoop の毎フレームから「初回検知時のみ」 呼ばれることを想定。
   */
  markBossWeakened: (waveElapsedMs: number) => void;
  spendScrew: (amount: BigNum) => boolean;
  setMachineHp: (hp: BigNum) => void;
  damageHp: (amount: BigNum) => void;
  /**
   * machineHp に delta を加算する (atomic)。 0 未満 / maxHp 超過はクランプ。
   * `setMachineHp(state.machineHp.add(...))` を tick 内で呼ぶと最新値を
   * 読み損ねて他の更新 (damageHp 等) を上書きするので、 加算系はこの action 経由で行う。
   */
  addMachineHp: (delta: BigNum) => void;
  /**
   * RunWorkshop hpMul 変化時に、 baseMachineMaxHp と新しい hpMul Lv から
   * machineMaxHp を再計算する。 現在 HP は「減量を維持」で更新:
   *   damage_taken = old_max - old_current
   *   new_current  = new_max - damage_taken
   * design-docs/04-run-workshop.md L28-44 参照。
   */
  recalcMachineMaxHpFromHpMul: (newHpMulLv: number) => void;
  advanceWave: () => void;
  advanceTier: () => void;
  switchWeapon: (weapon: WeaponType) => void;
  setWeaponSwitchCd: (sec: number) => void;
  setActiveCd: (sec: number) => void;
  setAutoActive: (auto: boolean) => void;
  setPaused: (paused: boolean) => void;
  /**
   * アクティブスキル発動。 CD 中 (activeCdSec > 0) なら何もせず false を返す。
   * 発動成功なら activeCdSec を maxSec にセットして true を返す。
   * (アクティブスキルの威力反映 = 各武器の Mega Beam / Volley / Plasma / Overdrive 呼び出しは
   *  useBattleLoop 側で行う想定。 ここでは CD 管理だけを担当する)
   */
  triggerActive: (maxSec: number) => boolean;
  tickCooldowns: (deltaSecGameTime: number) => void;
}

export type BattleSlice = BattleState & BattleActions;

// ---------------------------------------------------------------------------
// Default state
// ---------------------------------------------------------------------------

/**
 * 武器切替後のクールダウン秒数 (仕様: 05-weapons.md §武器切替「最後の切替から 3 秒間は他の武器に切替えられない」)
 */
export const WEAPON_SWITCH_CD_SEC = 3;

/**
 * アクティブスキル CD 最大値 (秒)。 ラン開始時のゲージは「0 (= CD 満タン)」 からスタートし、
 * この秒数経過で発動可能になる。 RW 等で短縮していく想定。
 */
export const DEFAULT_ACTIVE_MAX_SEC = 60;

export const defaultBattleState: BattleState = {
  isRunActive: false,
  screw: BigNum.ZERO,
  machineHp: BigNum.ZERO,
  machineMaxHp: BigNum.ZERO,
  baseMachineMaxHp: BigNum.ZERO,
  currentTier: 1,
  currentWave: 1,
  currentWeapon: 'laser',
  weaponSwitchCdSec: 0,
  activeCdSec: 0,
  isAutoActive: false,
  isPaused: false,
  runStartBolt: BigNum.ZERO,
  runStartAlloy: BigNum.ZERO,
  runPatchDropped: false,
  bossWeakenedAtMs: null,
};

// ---------------------------------------------------------------------------
// HP 値を BigNum 同士で「下限 0 / 上限 max」にクランプ
// ---------------------------------------------------------------------------

function clampBig(value: BigNum, min: BigNum, max: BigNum): BigNum {
  if (value.lt(min)) return min;
  if (value.gt(max)) return max;
  return value;
}

// ---------------------------------------------------------------------------
// Factory
// ---------------------------------------------------------------------------

export const createBattleSlice: StateCreator<RootStore, [], [], BattleSlice> = (set, get) => ({
  ...defaultBattleState,

  startRun: ({
    initialWeapon,
    baseMachineMaxHp,
    activeCdReduction = 0,
    initialTier,
    initialWave,
  }) => {
    // ラン跨ぎで RunWorkshop の Lv をリセット (maxHp 計算の前に必須)。
    // ここで先にリセットしないと、 前ランの hpMul Lv が残ったまま読まれて、
    // 新ランの machineMaxHp に前回の HP 倍率が乗ってしまうバグになる。
    get().resetRunWorkshop();
    const hpMulLv = get().runWorkshopLevels.hpMul;
    const multiplier = calcRunWorkshopMultiplier(hpMulLv);
    const machineMaxHp = baseMachineMaxHp.mulNumber(multiplier);
    const currentState = get();
    // マシン強化「アクティブ CD 短縮」 を初回ゲージ充填にも反映させる。
    // (旧バグ: 初回は 60s 固定、 2 回目以降の fireActive 経路だけ短縮されていた)
    const initialCdSec = DEFAULT_ACTIVE_MAX_SEC * (1 - Math.max(0, Math.min(1, activeCdReduction)));
    set({
      isRunActive: true,
      screw: BigNum.ZERO,
      machineHp: machineMaxHp,
      machineMaxHp,
      baseMachineMaxHp,
      currentTier: initialTier ?? 1,
      currentWave: initialWave ?? 1,
      currentWeapon: initialWeapon,
      weaponSwitchCdSec: 0,
      // ラン開始時はゲージ 0 = CD 満タン (= activeCdReduction 適用後の秒数を待つ)
      activeCdSec: initialCdSec,
      // isAutoActive は v1.4.4 でセッション跨ぎ永続化に変更。 startRun ではリセットしない
      // (ユーザーの設定を保持する)。
      isPaused: false,
      // ラン開始時の bolt/alloy 残高をスナップショット (リザルト獲得量算出用)
      runStartBolt: currentState.bolt,
      runStartAlloy: currentState.alloy,
      // ラン中パッチドロップフラグをリセット (1 ラン 1 個ルール)
      runPatchDropped: false,
      // ボス HP 60% 切ったタイミングをリセット
      bossWeakenedAtMs: null,
    });
  },

  endRun: () => {
    // v1.4.4: isAutoActive はセッション跨ぎ永続化のためリセット対象外。
    // defaultBattleState.isAutoActive は初期値 (hydrate 前) 用途に限定される。
    set((s) => ({ ...defaultBattleState, isAutoActive: s.isAutoActive }));
    get().resetRunWorkshop();
  },

  addScrew: (amount) => {
    set((s) => ({ screw: s.screw.add(amount) }));
    // RunWorkshop の AUTO が ON の項目を優先順位順に自動強化する。
    // AUTO が全 OFF の場合は処理側で即 return される (ホットパス: 毎フレームの敵撃破で呼ばれる)。
    get().processRunWorkshopAuto();
  },

  markRunPatchDropped: () => set({ runPatchDropped: true }),

  markBossWeakened: (waveElapsedMs) =>
    set((s) => (s.bossWeakenedAtMs == null ? { bossWeakenedAtMs: waveElapsedMs } : {})),

  spendScrew: (amount) => {
    const cur = get().screw;
    if (cur.lt(amount)) return false;
    set({ screw: cur.sub(amount) });
    return true;
  },

  setMachineHp: (hp) => set((s) => ({ machineHp: clampBig(hp, BigNum.ZERO, s.machineMaxHp) })),

  damageHp: (amount) =>
    set((s) => {
      const next = s.machineHp.sub(amount);
      return { machineHp: next.lt(BigNum.ZERO) ? BigNum.ZERO : next };
    }),

  addMachineHp: (delta) =>
    set((s) => ({ machineHp: clampBig(s.machineHp.add(delta), BigNum.ZERO, s.machineMaxHp) })),

  recalcMachineMaxHpFromHpMul: (newHpMulLv) => {
    const s = get();
    const oldMax = s.machineMaxHp;
    const oldCurrent = s.machineHp;
    // damage_taken = max(0, old_max - old_current)
    const rawDamageTaken = oldMax.sub(oldCurrent);
    const damageTaken = rawDamageTaken.lt(BigNum.ZERO) ? BigNum.ZERO : rawDamageTaken;
    const newMax = s.baseMachineMaxHp.mulNumber(calcRunWorkshopMultiplier(newHpMulLv));
    const newCurrentRaw = newMax.sub(damageTaken);
    const newCurrent = newCurrentRaw.lt(BigNum.ZERO) ? BigNum.ZERO : newCurrentRaw;
    set({ machineMaxHp: newMax, machineHp: newCurrent });
  },

  advanceWave: () => set((s) => ({ currentWave: s.currentWave + 1 })),

  advanceTier: () => set((s) => ({ currentTier: s.currentTier + 1, currentWave: 1 })),

  switchWeapon: (weapon) => {
    const s = get();
    // CD 中 or 同じ武器なら無視 (連打防止 / 仕様 05-weapons.md §武器切替)
    if (s.weaponSwitchCdSec > 0) return;
    if (s.currentWeapon === weapon) return;
    set({ currentWeapon: weapon, weaponSwitchCdSec: WEAPON_SWITCH_CD_SEC });
  },

  setWeaponSwitchCd: (sec) => set({ weaponSwitchCdSec: Math.max(0, sec) }),

  setActiveCd: (sec) => set({ activeCdSec: Math.max(0, sec) }),

  setAutoActive: (auto) => set({ isAutoActive: auto }),

  setPaused: (paused) => set({ isPaused: paused }),

  triggerActive: (maxSec) => {
    if (get().activeCdSec > 0) return false;
    set({ activeCdSec: Math.max(0, maxSec) });
    return true;
  },

  tickCooldowns: (deltaSecGameTime) =>
    set((s) => {
      // v1.3.6: CD が両方 0 なら set 呼び出し自体を skip (= zustand subscribers が発火しない)。
      // 60fps × 何もしないフレームで Page (= useStore((s)=>s.activeCdSec) 等を subscribe) を
      // re-render し続ける副作用を断つ。
      if (s.weaponSwitchCdSec === 0 && s.activeCdSec === 0) return s;
      return {
        weaponSwitchCdSec: Math.max(0, s.weaponSwitchCdSec - deltaSecGameTime),
        activeCdSec: Math.max(0, s.activeCdSec - deltaSecGameTime),
      };
    }),
});
