import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import type { ResultStatus } from '@/components/organisms/ResultDialog';
import type { PatchDrop } from '@/game/patches/drops';
import { soundEngine } from '@/lib/audio';
import { BigNum } from '@/lib/bignum/BigNum';
import { useStore } from '@/store/index';
import { flushAfterRun } from '@/store/sync';

// ---------------------------------------------------------------------------
// 仕様 (Phase 4-D)
// ---------------------------------------------------------------------------
//
// Page (pages/battle/index.tsx) に直書きされていたリザルト関連ロジックを 1 つの hook に集約する。
// 担当するもの:
//   1. 自動 status 判定 (isRunActive + machineHp<=0 → 'gameover')
//   2. 撤退 / Tier クリアの手動 status set ('retreat' / 'clear')
//   3. finalizeRun: endRun / updateHighest / incrementRuns / addEnemiesKilled /
//      addPlayTimeSec / setLastPlayedAt / flushAfterRun
//   4. ラン終了時点の Tier / Wave / earnedBolt / earnedAlloy のスナップショット保持
//      (endRun() が currentTier/Wave を 1 に、 runStartBolt/Alloy を 0 にリセットするため)
//   5. リザルト SE (resultClear / resultGameOver) の自動再生
//   6. 重複 finalize ガード (hasFinalizedRef)
//   7. earnedBolt / earnedAlloy の 0 クランプ + useMemo 安定化 (ResultDialog の reward fallback 用)
//
// 担当しないもの:
//   - Tier クリア時の `unlockNextTier(currentTier)` と `onTierClearedAck()` 呼び出し
//     (= useBattleLoop / Page 側の責務。 hook は finalize 'clear' のみを行う)
//   - hasFinalizedRef の「次ラン開始用」 リセット
//     (= ResultDialog の onClose ハンドラで `resetFinalize` を呼んでもらう)
// ---------------------------------------------------------------------------

export interface UseResultStatusOpts {
  /**
   * 現在ランの撃破数 (useBattleLoop の killCount をそのまま渡す)。
   *
   * v1.3.7 Phase 4-D: Page の hook 順序を「useResultStatus → useBattleLoop」 にすると
   * isResultOpen を useBattleLoop の paused 引数に渡せる。 ただしこの順だと useBattleLoop の
   * 戻り値 (killCount 等) を useResultStatus に props で渡せないため、 ref-based getter で受ける。
   * Page 側は useBattleLoop 戻り値を毎 render で ref に同期する。
   */
  getKillCount: () => number;
  /** 現在ランの経過秒 (同上 ref-based getter で受ける) */
  getRunElapsedSec: () => number;
  /** 現在ランでドロップしたパッチ (同上 ref-based getter で受ける) */
  getDroppedPatches: () => PatchDrop[];
}

export interface UseResultStatusResult {
  /**
   * 自動判定 (isRunActive + machineHp <= 0 → 'gameover') と
   * 手動 set ('retreat' / 'clear') の合算。 null = ラン継続中。
   */
  effectiveResultStatus: ResultStatus | null;
  /** ResultDialog 表示中フラグ (= effectiveResultStatus !== null)。 useBattleLoop の paused に渡す */
  isResultOpen: boolean;
  /**
   * ResultDialog 表示用の到達 Tier。 finalize 後はスナップショット、 finalize 前は現在の Tier
   * (= ResultDialog がマウントされた直後 1 フレームの fallback 用)。
   */
  reachedTier: number;
  /** ResultDialog 表示用の到達 Wave (同上 fallback あり) */
  reachedWave: number;
  /**
   * ResultDialog 表示用の獲得ボルト。 finalize 後はスナップショット、 finalize 前は
   * `bolt - runStartBolt` の 0 クランプ値 (fallback)。
   */
  earnedBolt: BigNum;
  /** ResultDialog 表示用の獲得アロイ (同上 fallback あり) */
  earnedAlloy: BigNum;
  /** 撤退ボタン押下時用 (BattleMenuOverlay の onRetreat ハンドラから呼ぶ想定) */
  setRetreat: () => void;
  /**
   * Tier クリアフローの finalize 'clear' 部分。 Page の handleTierClearFxDone から呼ぶ。
   * `unlockNextTier(currentTier)` と `onTierClearedAck()` は呼ばないので、 hook 利用側で別途実施する。
   */
  finalizeAsClear: () => void;
  /**
   * 次ラン開始用に finalize ガードと snapshot をリセット。
   * Page の handleResultClose から `navigate('preparation')` の直前に呼ぶ。
   */
  resetFinalize: () => void;
}

/**
 * バトル画面のリザルト状態を集約する hook (v1.3.7 Phase 4-D)。
 *
 * Page が `bolt` / `alloy` / `runStartBolt` / `runStartAlloy` / `isRunActive` / `machineHp` を
 * 直接 subscribe しなくて済むよう、 すべて hook 内で `useStore` する。 Page は本 hook が返す
 * `effectiveResultStatus` / `isResultOpen` / `setRetreat` / `finalizeAsClear` / `resetFinalize`
 * と finalize snapshot (`reachedTier` / `reachedWave` / `earnedBolt` / `earnedAlloy`) を
 * ResultDialog に渡すだけになる。
 *
 * @example
 * const {
 *   effectiveResultStatus,
 *   isResultOpen,
 *   reachedTier,
 *   reachedWave,
 *   earnedBolt,
 *   earnedAlloy,
 *   setRetreat,
 *   finalizeAsClear,
 *   resetFinalize,
 * } = useResultStatus({ killCount, runElapsedSec, droppedPatches });
 */
export function useResultStatus({
  getKillCount,
  getRunElapsedSec,
  getDroppedPatches: _getDroppedPatches,
}: UseResultStatusOpts): UseResultStatusResult {
  // Page から渡される getter を ref で常に最新に保つ (= finalizeRun の deps に入れない)
  const getKillCountRef = useRef(getKillCount);
  getKillCountRef.current = getKillCount;
  const getRunElapsedSecRef = useRef(getRunElapsedSec);
  getRunElapsedSecRef.current = getRunElapsedSec;
  // ── 自動判定の元になる store 値 ──
  // Page から「isRunActive + machineHp」 の selector を本 hook 側に移譲する。
  // (これにより Page 側で `useStore((s) => s.isRunActive)` / `useStore((s) => s.machineHp)` を
  //  購読する必要が減る ... が、 BATTLE START バナーや被ダメ検知で Page でも引き続き使うので
  //  Page 側の subscribe は残置されている。 hook 内 subscribe は ResultDialog 表示制御のため独立。)
  const isRunActive = useStore((s) => s.isRunActive);
  const machineHp = useStore((s) => s.machineHp);

  // ── 撤退 / クリア時の手動 status ──
  const [manualResultStatus, setManualResultStatus] = useState<ResultStatus | null>(null);

  // ── 自動 status (= gameover 検知) ──
  // isRunActive が true のときだけ machineHp チェック (ラン開始前の初期 HP=0 で誤発火させない)。
  const autoResultStatus: ResultStatus | null =
    isRunActive && machineHp.lte(BigNum.ZERO) ? 'gameover' : null;

  const effectiveResultStatus = manualResultStatus ?? autoResultStatus;
  const isResultOpen = effectiveResultStatus !== null;

  // ── finalize 後 snapshot (endRun で currentTier/Wave / runStartBolt/Alloy がリセットされる前に保存) ──
  const [finalTier, setFinalTier] = useState<number | null>(null);
  const [finalWave, setFinalWave] = useState<number | null>(null);
  const [finalEarnedBolt, setFinalEarnedBolt] = useState<BigNum | null>(null);
  const [finalEarnedAlloy, setFinalEarnedAlloy] = useState<BigNum | null>(null);

  // ── ResultDialog fallback 用の現在値 (finalize 前の 1 フレームだけ使われる) ──
  // Page から「earnedBolt / earnedAlloy / currentTier / currentWave」 を fallback で渡す必要が
  // なくなるよう、 hook 内で subscribe + 0 クランプ + useMemo まで済ませる。
  const bolt = useStore((s) => s.bolt);
  const alloy = useStore((s) => s.alloy);
  const runStartBolt = useStore((s) => s.runStartBolt);
  const runStartAlloy = useStore((s) => s.runStartAlloy);
  const currentTier = useStore((s) => s.currentTier);
  const currentWave = useStore((s) => s.currentWave);

  const earnedBoltLive = useMemo(() => {
    const raw = bolt.sub(runStartBolt);
    return raw.lt(BigNum.ZERO) ? BigNum.ZERO : raw;
  }, [bolt, runStartBolt]);
  const earnedAlloyLive = useMemo(() => {
    const raw = alloy.sub(runStartAlloy);
    return raw.lt(BigNum.ZERO) ? BigNum.ZERO : raw;
  }, [alloy, runStartAlloy]);

  // ── リザルト SE (clear / gameover) ──
  // status が null→非 null に遷移したフレームで 1 度だけ再生。
  // (retreat は handleRetreat 側で 'resultRetreat' を再生するため、 ここでは clear / gameover のみ。)
  useEffect(() => {
    if (effectiveResultStatus === 'clear') soundEngine.play('resultClear');
    if (effectiveResultStatus === 'gameover') soundEngine.play('resultGameOver');
  }, [effectiveResultStatus]);

  // ── finalize 本体 ──
  // gameover / clear / retreat いずれのフローでも endRun / profile 系を 1 度だけ呼ぶ。
  // hasFinalizedRef で重複呼び出しを防ぐ (= 1 ラン内で複数回起動されても 2 回目以降は no-op)。
  const hasFinalizedRef = useRef(false);
  const finalizeRun = useCallback((status: ResultStatus) => {
    if (hasFinalizedRef.current) return;
    hasFinalizedRef.current = true;
    // endRun() で currentTier/Wave が 1、 runStartBolt/Alloy が 0 にリセットされるので
    // useStore.getState() で fresh な値をスナップショット。
    // (selector closure ではなく getState() に統一: handleTierClearFxDone 経由で同期的に
    //  finalizeRun を呼ぶケースで「setState → react reconcile 待ち」 タイミング問題を回避)
    const state = useStore.getState();
    const snapTier = state.currentTier;
    const snapWave = state.currentWave;
    setFinalTier(snapTier);
    setFinalWave(snapWave);
    const finalBolt = state.bolt.sub(state.runStartBolt);
    const finalAlloy = state.alloy.sub(state.runStartAlloy);
    setFinalEarnedBolt(finalBolt.lt(BigNum.ZERO) ? BigNum.ZERO : finalBolt);
    setFinalEarnedAlloy(finalAlloy.lt(BigNum.ZERO) ? BigNum.ZERO : finalAlloy);
    // gameover / clear パス: autoResultStatus は endRun() 後に machineHp=0 を維持するので
    // 'gameover' を返してしまう。 ローカル state に固定してダイアログを維持する。
    if (status === 'gameover' || status === 'clear') {
      setManualResultStatus(status);
    }
    state.endRun();
    state.updateHighest(snapTier, snapWave);
    state.incrementRuns();
    state.addEnemiesKilled(getKillCountRef.current());
    state.addPlayTimeSec(getRunElapsedSecRef.current());
    state.setLastPlayedAt(Date.now());
    void flushAfterRun();
  }, []);

  // ── effectiveResultStatus 遷移検知 → finalizeRun を自動呼び出し ──
  // null → 'gameover' (自動) / 'retreat' (手動) のとき finalize を発火。
  // 'clear' は finalizeAsClear 経由で先に finalize されているため、 hasFinalizedRef で二重発火を防ぐ。
  const prevResultStatusRef = useRef<ResultStatus | null>(null);
  useEffect(() => {
    if (effectiveResultStatus !== null && prevResultStatusRef.current === null) {
      finalizeRun(effectiveResultStatus);
    }
    prevResultStatusRef.current = effectiveResultStatus;
  }, [effectiveResultStatus, finalizeRun]);

  // ── 公開ハンドラ ──
  const setRetreat = useCallback(() => {
    setManualResultStatus('retreat');
  }, []);

  const finalizeAsClear = useCallback(() => {
    finalizeRun('clear');
  }, [finalizeRun]);

  const resetFinalize = useCallback(() => {
    hasFinalizedRef.current = false;
    setManualResultStatus(null);
    setFinalTier(null);
    setFinalWave(null);
    setFinalEarnedBolt(null);
    setFinalEarnedAlloy(null);
    // prevResultStatusRef も次ラン用にリセット (= 次ランで null→非 null 遷移を再検知できる)
    prevResultStatusRef.current = null;
  }, []);

  return {
    effectiveResultStatus,
    isResultOpen,
    // finalize 後は snapshot、 まだ finalize 前なら現在の Tier/Wave (= 1 フレームの fallback)
    reachedTier: finalTier ?? currentTier,
    reachedWave: finalWave ?? currentWave,
    earnedBolt: finalEarnedBolt ?? earnedBoltLive,
    earnedAlloy: finalEarnedAlloy ?? earnedAlloyLive,
    setRetreat,
    finalizeAsClear,
    resetFinalize,
  };
}
