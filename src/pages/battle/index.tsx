import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import styles from './style.module.scss';

import { PerfOverlay } from '@/components/atoms/PerfOverlay';
import { AppearanceBannerFx } from '@/components/fx/AppearanceBannerFx';
import { TierClearFx } from '@/components/fx/TierClearFx';
import { WaveStartFx } from '@/components/fx/WaveStartFx';
import { AppShell } from '@/components/organisms/AppShell';
import { BattleField } from '@/components/organisms/BattleField';
import type { HitEvent } from '@/components/organisms/BattleField';
import { AppearanceBannerLayer } from '@/components/organisms/BattleField/AppearanceBannerLayer';
import { BattleHudBottom } from '@/components/organisms/BattleHudBottom';
import { BattleHudTop } from '@/components/organisms/BattleHudTop';
import { BattleMenuOverlay } from '@/components/organisms/BattleMenuOverlay';
import {
  MACHINE_UPGRADE_ITEMS,
  calcEffectValue,
} from '@/components/organisms/MachineUpgradeList/items';
import { ResultDialog } from '@/components/organisms/ResultDialog';
import { RunWorkshopBottomSheet } from '@/components/organisms/RunWorkshopBottomSheet';
import {
  calcRunWorkshopMultiplier,
  type RunWorkshopKey,
} from '@/components/organisms/RunWorkshopBottomSheet/items';
import { ScreenSaverDialog } from '@/components/organisms/ScreenSaverDialog';
import type { PatchDrop } from '@/game/patches/drops';
import { BattleEntityStoreProvider } from '@/game/store/BattleEntityStoreContext';
import { WAVE_DURATION_SEC } from '@/game/wave';
import {
  CUTTER_OVERDRIVE_ATTACK_SPEED_MUL,
  calcCutterRotateMs,
  cutterStats,
} from '@/game/weapons/cutter';
import { WEAPON_RANGE_PCT } from '@/game/weapons/range';
import { ATTACK_PER_SEC_CAP, useBattleLoop } from '@/hooks/useBattleLoop';
import { useBossPhase } from '@/hooks/useBossPhase';
import { useResultStatus } from '@/hooks/useResultStatus';
import { soundEngine } from '@/lib/audio';
import { useStore } from '@/store/index';
import { useNavigation } from '@/store/navigation';

// ---------------------------------------------------------------------------
// デフォルト値
// ---------------------------------------------------------------------------

// 索敵範囲は武器別に WEAPON_RANGE_PCT (= 直径 %) で管理 (currentWeapon に応じて切替)

/**
 * BattleField の hitEvents 用の空配列定数。
 * 毎 render で `const hitEvents: HitEvent[] = []` を新規生成すると BattleField への
 * props 参照が毎フレーム変化 → memo 化阻害。 EnemyHitFx 系の配線が入るまでは固定で空 (H2-4)。
 */
const EMPTY_HIT_EVENTS: HitEvent[] = [];

/**
 * Cutter の刃の枚数 (CutterOrbitFx の blades default と一致)。
 * 「刃 N 枚 = 1 周あたり N ヒット」なので 1 周時間 = (blades / attackPerSec) × 1000。
 * (計算は game/weapons/cutter の calcCutterRotateMs に委譲)
 */
const CUTTER_BLADES = 2;

// ---------------------------------------------------------------------------
// BattleScreen Page
// ---------------------------------------------------------------------------

/**
 * BattleScreen — バトル画面。
 *
 * AppShell(noScroll, variant='battle') + BattleHudTop / BattleField / BattleHudBottom を配置。
 * overlay 層に RunWorkshopBottomSheet / BattleMenuOverlay / ResultDialog / ScreenSaverDialog を絶対配置。
 * BottomNav なし（バトル中は他画面遷移しない）。
 *
 * ゲームループ (敵 spawn / 武器発射 / ダメージ / 撃破 / 被ダメ / 弾道 / ドロップ) は
 * useBattleLoop に集約。 ここでは store 値の取得・配線・UI 状態 (ダイアログ開閉等) を扱う。
 */
export function Page() {
  const { navigate } = useNavigation();

  // ── store から状態取得 ──
  // v1.3.7 Phase 4-D: bolt / alloy / runStartBolt / runStartAlloy / isRunActive (ResultDialog 用) は
  // useResultStatus 内部で subscribe するため Page では引き続き使わない。
  // isRunActive は BATTLE START バナーの遷移検知でも使うので Page でも subscribe する。
  // machineHp は被ダメ検知 useEffect で使うので Page でも引き続き subscribe。
  const isRunActive = useStore((s) => s.isRunActive);
  const machineHp = useStore((s) => s.machineHp);
  // currentTier / currentWave は BGM 切替 (useBossPhase 連動) / WaveStartFx / TierClearFx /
  // ScreenSaverDialog で使うため Page で引き続き subscribe。
  const currentTier = useStore((s) => s.currentTier);
  const currentWave = useStore((s) => s.currentWave);
  // currentWeapon は BattleField の showCutterOrbit / cutterRotateMs / WEAPON_RANGE_PCT で使う。
  // (v1.3.7 Phase 4-B: HUD 下段の equippedWeapon は BattleHudBottom 内部 selector に移譲)
  const currentWeapon = useStore((s) => s.currentWeapon);
  const weaponLv = useStore((s) => s.weaponLv);
  // machineLevels は BattleField の machineRangePx / machineAttackSpeedMul で使う。
  // (v1.3.7 Phase 4-B: activeCdReduction は BattleHudBottom 内部に移譲したので Page では
  // range / attackSpeed の派生だけ実施)
  const machineLevels = useStore((s) => s.machineLevels);
  const isPaused = useStore((s) => s.isPaused);
  // v1.3.7 Phase 4-C: runWorkshopLevels は BattleField 側で
  // calcRunWorkshopMultiplier(runWorkshopLevels.attackSpeedMul) を計算する Cutter rotateMs の
  // 派生に必要なので Page では引き続き subscribe。 RunWorkshopBottomSheet 側は内部 selector
  // に移譲済みなので props 渡しは不要。
  const runWorkshopLevels = useStore((s) => s.runWorkshopLevels);
  // setRunWorkshopAuto は handleToggleWorkshopAuto 内で processRunWorkshopAuto 連動のため必要。
  const setRunWorkshopAuto = useStore((s) => s.setRunWorkshopAuto);

  // settings slice
  // v1.3.7 Phase 4-C: bgmVolume / seVolume / setBgmVolume / setSeVolume は BattleMenuOverlay
  // 内部 selector に移譲したため Page では subscribe しない。
  const setAutoActive = useStore((s) => s.setAutoActive);
  const switchWeapon = useStore((s) => s.switchWeapon);
  const setPaused = useStore((s) => s.setPaused);
  const upgradeRunWorkshop = useStore((s) => s.upgradeRunWorkshop);
  // v1.3.7 Phase 4-B: activeCdSec / isAutoActive / weaponSwitchCdSec は BattleHudBottom 内部
  // で購読するようになったため Page では subscribe しない。
  // (handleManualActivate は useBattleLoop.fireActive に集約済みで activeCdSec を読まない)

  // ── ローカル UI state (overlay 開閉) ──
  // pause と BattleMenuOverlay は連動: isPaused が真のときに menu を表示する。
  // 「メニュー開いてるけど pause じゃない」 状態を作らないため、 isMenuOpen 単独 state は持たない。
  const [isWorkshopOpen, setIsWorkshopOpen] = useState(false);
  const [isScreenSaverOpen, setIsScreenSaverOpen] = useState(false);

  // ── 被ダメ検知 (machineHp の prev/current 比較) ──
  // HP が前フレームより減少したとき machineHitKey を +1 して MachineHitFx を再マウント (= 再生開始)。
  // HP 回復 (onKill heal / HP リジェネ) では HP が増加するため lt 比較で誤発火しない。
  const prevMachineHpRef = useRef<typeof machineHp>(machineHp);
  const [machineHitKey, setMachineHitKey] = useState(0);
  useEffect(() => {
    if (machineHp.lt(prevMachineHpRef.current)) {
      setMachineHitKey((k) => k + 1);
    }
    prevMachineHpRef.current = machineHp;
  }, [machineHp]);

  // ── Tier クリア検知 ──
  // 0.3.5: useBattleLoop の tierCleared フラグを契機に TierClearFx を再マウント。
  // 旧 0.3.4 までは「currentTier の prev/current 比較」 で発火していたが、
  // advanceTier 廃止 (= ボス撃破でも currentTier がインクリメントされない仕様) に伴い
  // フラグベース通知に変更。 演出終了後に handleTierClearFxDone で次 Tier 解放 + endRun する。
  const [tierClearKey, setTierClearKey] = useState(0);

  // ── BATTLE START バナー: 「isRunActive が false→true に切り替わった瞬間」 のみ表示 ──
  // 単に isRunActive=true で発火すると、 同一ラン中の画面再マウントや内部 state 変動で
  // 戦闘途中に再発火することがあるため、 prev/current 比較で「ラン開始の瞬間」 だけ拾う。
  const [isBattleStartShown, setIsBattleStartShown] = useState(false);
  const prevIsRunActiveRef = useRef(isRunActive);
  useEffect(() => {
    if (isRunActive && !prevIsRunActiveRef.current) {
      setIsBattleStartShown(true);
    }
    prevIsRunActiveRef.current = isRunActive;
  }, [isRunActive]);

  // ── バックグラウンド時に自動 pause (アプリ非表示 / タブ切替で即停止) ──
  // 復帰時の自動再開はしない (= メニューが開いた状態でユーザーが手動で「再開」 する)。
  // ラン外 / リザルト表示中は対象外。
  const isRunActiveRef = useRef(isRunActive);
  isRunActiveRef.current = isRunActive;
  useEffect(() => {
    const onVis = () => {
      if (document.hidden && isRunActiveRef.current) {
        setPaused(true);
      }
    };
    document.addEventListener('visibilitychange', onVis);
    return () => {
      document.removeEventListener('visibilitychange', onVis);
    };
  }, [setPaused]);

  // ── WaveStartFx: 「次の wave へ進んだ瞬間」のみ表示 (出撃直後は出さない) ──
  const prevWaveRef = useRef(currentWave);
  const [waveStartKey, setWaveStartKey] = useState<number | null>(null);
  useEffect(() => {
    if (prevWaveRef.current !== currentWave) {
      setWaveStartKey((k) => (k ?? 0) + 1);
    }
    prevWaveRef.current = currentWave;
  }, [currentWave]);

  // ── useBattleLoop の戻り値を hook 間で共有するための ref ──
  // useResultStatus は finalize 時に killCount / runElapsedSec を必要とするが、 hook 呼出順は
  // 「useResultStatus → useBattleLoop」 にしたい (= useBattleLoop に isResultOpen を渡すため)。
  // そこで useBattleLoop の戻り値を毎 render で ref に同期し、 useResultStatus の getter で
  // 読み出す形にする。 (= hook 順序の循環依存を回避)
  const battleLoopRef = useRef<{
    killCount: number;
    runElapsedSec: number;
    droppedPatches: PatchDrop[];
  }>({
    killCount: 0,
    runElapsedSec: 0,
    droppedPatches: [],
  });

  // ── リザルト状態 (Phase 4-D: useResultStatus に集約) ──
  // 自動 status 判定 (isRunActive + machineHp<=0 → 'gameover') / 手動 set ('retreat' / 'clear') /
  // finalize 後 snapshot (reachedTier / reachedWave / earnedBolt / earnedAlloy) / SE 再生 /
  // hasFinalizedRef ガードはすべて hook 内に閉じ込め済み。
  const {
    effectiveResultStatus,
    isResultOpen,
    reachedTier,
    reachedWave,
    earnedBolt,
    earnedAlloy,
    setRetreat,
    finalizeAsClear,
    resetFinalize,
  } = useResultStatus({
    getKillCount: () => battleLoopRef.current.killCount,
    getRunElapsedSec: () => battleLoopRef.current.runElapsedSec,
    getDroppedPatches: () => battleLoopRef.current.droppedPatches,
  });

  // ── ゲームループ (敵 spawn / 武器発射 / ダメージ / 撃破 / 被ダメ / 弾道 / ドロップ) ──
  // ResultDialog 表示中 (撤退 / gameover) は paused で完全停止させる
  const {
    waveElapsedSec,
    fireActive,
    isOverdriveActive,
    killCount,
    runElapsedSec,
    droppedPatches,
    tierCleared,
    onTierClearedAck,
    entityStore,
  } = useBattleLoop({
    paused: isResultOpen,
    // v1.3.2: スクリーンセーバー中は描画 events (damageEvents 等) の生成を停止して
    // 発熱対策 (BattleField を unmount しているため Fx 完了通知 onDamageDone が来ず、
    // 通常通り setDamageEvents で append するとメモリ蓄積する)。
    suspendRendering: isScreenSaverOpen,
  });

  // useBattleLoop の戻り値を ref に同期 (useResultStatus.getter から読まれる)
  battleLoopRef.current = { killCount, runElapsedSec, droppedPatches };

  // Tier クリア通知: tierCleared が true になった瞬間に TierClearFx をマウント。
  // 演出終了 (onDone) は handleTierClearFxDone で処理 (次 Tier 解放 + ラン終了 + ResultDialog)。
  useEffect(() => {
    if (tierCleared) {
      setTierClearKey((k) => k + 1);
    }
  }, [tierCleared]);

  // ── BGM: ボス出現を契機に切替 (App.tsx の画面別 BGM を bossPhase 中だけ上書き) ──
  // v1.3.7 (Phase 2-C): Page の useEffect([enemies]) 監視を useBossPhase hook に切り出した。
  // 内部で entityStore を直接 subscribe するため、 Page が enemies 配列の参照変化に reactive
  // でなくなる (Phase 4 で Page から useStore を分散するための布石も兼ねる)。
  //
  // 仕様維持: wave 30 中にボスが entityStore.enemies に含まれたら true、 wave 30 を抜けたら
  // false にリセット (= TierClearFx 中も battleBoss が流れ、 wave=1 に戻る瞬間に battleNormal)。
  const bossPhase = useBossPhase(entityStore);
  // v1.3.6: スクリーンセーバー中は SoundEngine.suspendAudio + autoResumeSuppressed のため
  // playBgm が早期 return される (= currentBgm.id 更新も skip)。 セーバー中に bossPhase が
  // 変化したまま閉じると、 ctx.resume() 後も旧 BGM track が鳴り続けてしまうため、
  // isScreenSaverOpen=false 復帰時に bossPhase に応じた playBgm を再呼出して正しい track に揃える。
  // 同一 id の playBgm は SoundEngine 側で no-op なので副作用なし。
  useEffect(() => {
    if (isScreenSaverOpen) return;
    soundEngine.playBgm(bossPhase ? 'battleBoss' : 'battleNormal');
  }, [bossPhase, isScreenSaverOpen]);

  // Wave 残り時間: 0 になったら advanceWave が走り経過秒はリセットされる
  const waveSecondsRemaining = Math.max(0, WAVE_DURATION_SEC - waveElapsedSec);

  // HitEvent (EnemyHitFx) は別途配線予定。 当面はモジュール定数の空配列を使い回す (H2-4)
  const hitEvents = EMPTY_HIT_EVENTS;

  // マシン索敵距離 (range_asymptotic: 150 → 450 px、Lv 100 で 300)。
  // BattleField の range prop は **直径 %** を渡す: WEAPON_RANGE_PCT × (machineRange / 150)。
  // useBattleLoop 側は machineTick.range を読んで /2 して半径として当たり判定に使う (二重計算)。
  // 描画用にここでも machineLevels.range から導出する。
  const machineRangePx = useMemo(() => {
    const item = MACHINE_UPGRADE_ITEMS.find((i) => i.key === 'range');
    if (item == null) return 150;
    return calcEffectValue(item, machineLevels.range);
  }, [machineLevels.range]);

  // マシン強化「攻撃速度」倍率 (linear: 1.0 + 0.05/Lv, maxLv 99)。
  // useBattleLoop の effectivePerSec が machineTick.attackSpeed を乗算しているので、
  // Cutter の rotateMs も同じ倍率を含めて視覚と当たり判定を同期する。
  const machineAttackSpeedMul = useMemo(() => {
    const item = MACHINE_UPGRADE_ITEMS.find((i) => i.key === 'attackSpeed');
    if (item == null) return 1;
    return calcEffectValue(item, machineLevels.attackSpeed);
  }, [machineLevels.attackSpeed]);

  // v1.3.7 Phase 4-B: 以下の派生計算は BattleHudBottom 内部に移譲済み:
  //   - weaponCds (currentWeapon / weaponSwitchCdSec から計算)
  //   - activeCdReduction / activeMaxSec (machineLevels.activeCdReduction から計算)
  //   - earnedBolt の HUD 表示用計算 (bolt - runStartBolt)
  // v1.3.7 Phase 4-D: ResultDialog 用の earnedBolt / earnedAlloy / reachedTier / reachedWave
  // も useResultStatus 内部に移譲済み。 Page 側で別途 useMemo / selector を持つ必要なし。

  // v1.3.7 Phase 4-A: hpCurrentBn / hpMaxBn の useMemo は BattleHudTop 内部に移譲した
  // (BattleHudTop が useStore で直接 machineHp / machineMaxHp を購読 → memo + 0 クランプ
  // も内部で実施)。 Page は hp 値を BattleHudTop に渡さなくなったのでここの useMemo を削除。
  // machineHp は引き続き「被ダメ検知 useEffect」 でのみ使うので Page 上の useStore subscribe は残す。
  // gameover 判定 (旧 resolveResultStatus) は useResultStatus 内部の subscribe に移譲。

  // ── ハンドラ ──
  // (v1.3.7 Phase 4-D: finalizeRun / hasFinalizedRef / effectiveResultStatus 遷移検知 useEffect /
  //  resultStatus SE 再生 useEffect は useResultStatus 内部に移譲済み。)
  // (H2-4: BattleHudBottom / RunWorkshopBottomSheet に渡すハンドラを useCallback 化。
  //  下流コンポーネントの React.memo を活かすため、 props の関数参照を安定化する。
  //  pause/screenSaver 等の依存は setState 系のみで安定なので deps を最小化できる)
  // pause トグル: 「pause + メニュー開閉」 を同期 (= メニュー単独で開かない / pause 単独でも開かない)
  const handleTogglePause = useCallback(() => {
    const next = !isPaused;
    setPaused(next);
    soundEngine.play(next ? 'dialogOpen' : 'dialogClose');
  }, [isPaused, setPaused]);

  const handleOpenScreenSaver = useCallback(() => {
    setIsScreenSaverOpen(true);
    soundEngine.play('dialogOpen');
  }, []);

  const handleRetreat = useCallback(() => {
    // retreat 時はメニューも閉じる (= pause 解除)。 ResultDialog 側で停止が担保される
    setPaused(false);
    // setRetreat: useResultStatus の手動 status set ('retreat')。 内部で setManualResultStatus
    // するため、 直後の effectiveResultStatus は null → 'retreat' に遷移する。
    setRetreat();
    soundEngine.play('resultRetreat');
  }, [setPaused, setRetreat]);

  const handleResultClose = useCallback(() => {
    // 次のラン開始用に finalize ガードと snapshot をリセット (= 次ランで再度 null→非 null
    // 遷移を検知できる)。 旧 hasFinalizedRef.current = false に相当。
    resetFinalize();
    navigate('preparation');
  }, [navigate, resetFinalize]);

  const handleWorkshopUpgrade = useCallback(
    (key: RunWorkshopKey, delta: 1 | 5 | 'max') => {
      const ok = upgradeRunWorkshop(key, delta);
      soundEngine.play(ok ? 'purchaseOk' : 'reject');
    },
    [upgradeRunWorkshop]
  );

  const handleToggleWorkshopAuto = useCallback(
    (key: RunWorkshopKey, enabled: boolean) => {
      setRunWorkshopAuto(key, enabled);
      // AUTO を ON にした瞬間にも、 既に貯まっているネジで強化可能なら即時消費する
      // (addScrew からの自動発火を待たずに UX を即応させる)。
      if (enabled) {
        useStore.getState().processRunWorkshopAuto();
      }
    },
    [setRunWorkshopAuto]
  );

  const handleSwitchWeapon = useCallback(
    (weapon: typeof currentWeapon) => {
      switchWeapon(weapon);
      soundEngine.play('weaponSwitch');
    },
    [switchWeapon]
  );

  const handleManualActivate = useCallback(() => {
    // useBattleLoop の fireActive は内部で triggerActive (CD セット) + active 関数の実行
    // (Mega Beam / Volley / Plasma / Overdrive) + SE / Fx 配信をまとめて行う。
    const ok = fireActive();
    if (!ok) {
      soundEngine.play('reject');
    }
  }, [fireActive]);

  // BattleHudBottom の onToggleWorkshop: inline arrow 廃止 (毎 render 新規参照になり memo 阻害)
  const handleToggleWorkshop = useCallback(() => {
    setIsWorkshopOpen((prev) => !prev);
  }, []);

  // RunWorkshopBottomSheet の onClose: inline arrow 廃止 (同上)
  const handleCloseWorkshop = useCallback(() => {
    setIsWorkshopOpen(false);
  }, []);

  // TierClearFx 演出終了時のハンドラ (0.3.5):
  //   1. Fx unmount (key を 0 に)
  //   2. クリア Tier 番号を事前にスナップショット (finalizeRun の endRun で 1 にリセットされる)
  //   3. finalizeRun('clear') を呼んで通常のラン終了処理 (updateHighest / endRun / SE / etc.)
  //   4. unlockNextTier(clearedTier) で次 Tier 解放
  //      → 順序が重要: updateHighest は「tier > highestTier なら更新、 そうでなければ拒否」
  //        ロジックなので、 unlockNextTier(N) で highestTier=N+1 にした「後」 に
  //        updateHighest(N, wave) を呼ぶと「N <= N+1」 で highestWave が更新されない。
  //        finalizeRun (= updateHighest) を先、 unlockNextTier を後にすることで両方有効化。
  //   5. onTierClearedAck() で useBattleLoop の tierCleared をリセット
  const handleTierClearFxDone = useCallback(() => {
    setTierClearKey(0);
    const clearedTier = useStore.getState().currentTier;
    // Phase 4-D: finalize 'clear' は useResultStatus.finalizeAsClear に委譲
    // (順序: finalizeAsClear → unlockNextTier の順は維持。 endRun が currentTier を 1 に
    //  リセットするため clearedTier は finalize 前にスナップショット済み)
    finalizeAsClear();
    useStore.getState().unlockNextTier(clearedTier);
    onTierClearedAck();
  }, [onTierClearedAck, finalizeAsClear]);

  // ── wave 関連 ──
  const TOTAL_WAVES = 30;

  return (
    <BattleEntityStoreProvider store={entityStore}>
      <div className={styles.root}>
        {/* v1.3.7 (Phase 0): dev サーバ起動時 (import.meta.env.DEV=true) のみ自動表示。
          production ビルドでは絶対に表示されない (= 描画コスト 0)。 */}
        <PerfOverlay />
        {/* v1.3.6: スクリーンセーバー中は AppShell 全体 (= BattleHudTop / BattleHudBottom /
          RunWorkshopBottomSheet / BattleField) を unmount。 これらは store selector を
          subscribe しているため、 tickCooldowns が毎フレーム activeCdSec を setState するたび
          re-render する。 unmount すれば subscribers がいなくなり、 store 更新は no-op に。
          ScreenSaverDialog 等の overlay 層 (BattleMenuOverlay / ResultDialog) は引き続き表示。 */}
        {!isScreenSaverOpen && (
          <AppShell
            noScroll
            variant="battle"
            header={
              <BattleHudTop
                totalWaves={TOTAL_WAVES}
                secondsRemaining={waveSecondsRemaining}
                secondsTotal={WAVE_DURATION_SEC}
                isBossWave={currentWave === TOTAL_WAVES}
                isResultOpen={isResultOpen}
              />
            }
            footer={
              <div className={styles.battleFooter}>
                {/* ワークショップシート: HudBottom の上に absolute で重ねる overlay。
                BattleField の高さは変えない。 */}
                <RunWorkshopBottomSheet
                  open={isWorkshopOpen}
                  onUpgrade={handleWorkshopUpgrade}
                  onToggleAuto={handleToggleWorkshopAuto}
                  onClose={handleCloseWorkshop}
                />
                <BattleHudBottom
                  onSwitchWeapon={handleSwitchWeapon}
                  onActivate={handleManualActivate}
                  onToggleAuto={setAutoActive}
                  onTogglePause={handleTogglePause}
                  onOpenScreenSaver={handleOpenScreenSaver}
                  isWorkshopOpen={isWorkshopOpen}
                  onToggleWorkshop={handleToggleWorkshop}
                />
              </div>
            }
          >
            {/* メインコンテンツ: BattleField
            v1.3.2: スクリーンセーバー中は BattleField を完全 unmount して描画を停止する
            (発熱対策)。 useBattleLoop の rAF / state 更新は継続するため
            ゲーム進行は止まらないが、 敵 / Fx の描画 + DamagePop / DeathFx の
            DOM ノード生成・GPU フィルタが全て止まる (スクリーンセーバー閉じたら
            ref ベースの最新位置で再 mount される)。 */}
            {!isScreenSaverOpen && (
              <BattleField
                hitEvents={hitEvents}
                showCutterOrbit={
                  currentWeapon === 'cutter' && isRunActive && !isPaused && !isResultOpen
                }
                showOverdriveAura={isOverdriveActive && isRunActive && !isResultOpen}
                machineHitKey={machineHitKey}
                cutterRotateMs={calcCutterRotateMs(
                  // useBattleLoop の effectivePerSec と同じ式
                  // (cutterStats × machineAS × RW × Overdrive、 ATTACK_PER_SEC_CAP で頭打ち)
                  Math.min(
                    ATTACK_PER_SEC_CAP,
                    cutterStats(weaponLv).attackPerSec *
                      machineAttackSpeedMul *
                      calcRunWorkshopMultiplier(runWorkshopLevels.attackSpeedMul) *
                      (isOverdriveActive ? CUTTER_OVERDRIVE_ATTACK_SPEED_MUL : 1)
                  ),
                  CUTTER_BLADES
                )}
                range={WEAPON_RANGE_PCT[currentWeapon] * (machineRangePx / 150)}
              />
            )}
          </AppShell>
        )}

        {/* ── overlay 層（AppShell の外、root に対して絶対配置）── */}
        <div
          className={styles.overlayLayer}
          aria-live="polite"
        >
          {/* バトルメニュー (isPaused と完全連動: pause = メニュー開) */}
          <BattleMenuOverlay
            open={isPaused}
            onRetreat={handleRetreat}
            onClose={() => {
              // メニューを閉じる = pause 解除
              setPaused(false);
            }}
          />

          {/* リザルトダイアログ
            Phase 4-D: status / reachedTier / reachedWave / earnedBolt / earnedAlloy はすべて
            useResultStatus が finalize snapshot or fallback 値を返す。 effectiveResultStatus は
            null 時に isResultOpen=false のため、 ! で確定する。 */}
          {isResultOpen && (
            <ResultDialog
              open={isResultOpen}
              status={effectiveResultStatus!}
              reachedTier={reachedTier}
              reachedWave={reachedWave}
              killed={killCount}
              elapsedSec={runElapsedSec}
              reward={{
                bolt: earnedBolt,
                alloy: earnedAlloy,
                patches: droppedPatches.map((p) => ({ ...p, count: 1 })),
              }}
              onClose={handleResultClose}
            />
          )}

          {/* スクリーンセーバー (v1.3.3 で Tier/Wave + GAME OVER / TIER CLEAR をフェード表示) */}
          <ScreenSaverDialog
            open={isScreenSaverOpen}
            onClose={() => {
              setIsScreenSaverOpen(false);
            }}
            currentTier={currentTier}
            currentWave={currentWave}
            resultStatus={effectiveResultStatus}
          />

          {/* BATTLE START バナー (出撃直後 1.6 秒) */}
          {isBattleStartShown && (
            <AppearanceBannerFx
              kind="battle-start"
              onDone={() => {
                setIsBattleStartShown(false);
              }}
            />
          )}

          {/* Tier クリア演出 (useBattleLoop の tierCleared フラグで再マウント、 0.3.5)。
            onDone で次 Tier 解放 + ack + ラン終了 → ResultDialog 'clear' 表示の流れに繋ぐ */}
          {tierClearKey > 0 && (
            <TierClearFx
              key={tierClearKey}
              onDone={handleTierClearFxDone}
            />
          )}

          {/* v1.3.7 (Phase 2-C): 上位敵 (elite / miniboss / boss) 出現バナーを
              AppearanceBannerLayer に閉じ込め、 entityStore を直接購読。 Page 本体は
              appearance イベントに reactive でなくなる (= Page の re-render 頻度がさらに減る)。 */}
          <AppearanceBannerLayer />

          {/* Wave 進行バナー (wave 切替時の 1.1 秒) */}
          {waveStartKey != null && (
            <WaveStartFx
              key={waveStartKey}
              waveNumber={currentWave}
              onDone={() => {
                setWaveStartKey(null);
              }}
            />
          )}
        </div>
      </div>
    </BattleEntityStoreProvider>
  );
}
