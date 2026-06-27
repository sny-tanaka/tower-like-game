import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import styles from './style.module.scss';

import { PerfOverlay } from '@/components/atoms/PerfOverlay';
import { AppearanceBannerFx } from '@/components/fx/AppearanceBannerFx';
import { TierClearFx } from '@/components/fx/TierClearFx';
import { WaveStartFx } from '@/components/fx/WaveStartFx';
import { AppShell } from '@/components/organisms/AppShell';
import { BattleField } from '@/components/organisms/BattleField';
import type { HitEvent } from '@/components/organisms/BattleField';
import { BattleHudBottom } from '@/components/organisms/BattleHudBottom';
import { BattleHudTop } from '@/components/organisms/BattleHudTop';
import { BattleMenuOverlay } from '@/components/organisms/BattleMenuOverlay';
import {
  MACHINE_UPGRADE_ITEMS,
  calcEffectValue,
} from '@/components/organisms/MachineUpgradeList/items';
import { ResultDialog } from '@/components/organisms/ResultDialog';
import type { ResultStatus } from '@/components/organisms/ResultDialog';
import { RunWorkshopBottomSheet } from '@/components/organisms/RunWorkshopBottomSheet';
import {
  calcRunWorkshopMultiplier,
  type RunWorkshopKey,
} from '@/components/organisms/RunWorkshopBottomSheet/items';
import { ScreenSaverDialog } from '@/components/organisms/ScreenSaverDialog';
import { WAVE_DURATION_SEC } from '@/game/wave';
import {
  CUTTER_OVERDRIVE_ATTACK_SPEED_MUL,
  calcCutterRotateMs,
  cutterStats,
} from '@/game/weapons/cutter';
import { WEAPON_RANGE_PCT } from '@/game/weapons/range';
import { ATTACK_PER_SEC_CAP, DEFAULT_ACTIVE_MAX_SEC, useBattleLoop } from '@/hooks/useBattleLoop';
import { soundEngine } from '@/lib/audio';
import { BigNum } from '@/lib/bignum/BigNum';
import { useStore } from '@/store/index';
import { useNavigation } from '@/store/navigation';
import { WEAPON_SWITCH_CD_SEC } from '@/store/slices/battle';
import { flushAfterRun } from '@/store/sync';

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

/**
 * リザルトダイアログが開いているかの判定。
 * isRunActive: true のときだけ HP チェックを行う（ラン開始前の初期 HP=0 でリザルトを出さない）。
 */
function resolveResultStatus(isRunActive: boolean, machineHp: BigNum): ResultStatus | null {
  if (!isRunActive) return null;
  if (machineHp.lte(BigNum.ZERO)) return 'gameover';
  return null;
}

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
  const isRunActive = useStore((s) => s.isRunActive);
  const screw = useStore((s) => s.screw);
  const bolt = useStore((s) => s.bolt);
  const alloy = useStore((s) => s.alloy);
  const runStartBolt = useStore((s) => s.runStartBolt);
  const runStartAlloy = useStore((s) => s.runStartAlloy);
  const machineHp = useStore((s) => s.machineHp);
  const machineMaxHp = useStore((s) => s.machineMaxHp);
  const currentTier = useStore((s) => s.currentTier);
  const currentWave = useStore((s) => s.currentWave);
  const currentWeapon = useStore((s) => s.currentWeapon);
  const weaponLv = useStore((s) => s.weaponLv);
  const machineLevels = useStore((s) => s.machineLevels);
  const activeCdSec = useStore((s) => s.activeCdSec);
  const isAutoActive = useStore((s) => s.isAutoActive);
  const isPaused = useStore((s) => s.isPaused);
  const runWorkshopLevels = useStore((s) => s.runWorkshopLevels);
  const runWorkshopAutoEnabled = useStore((s) => s.runWorkshopAutoEnabled);
  const setRunWorkshopAuto = useStore((s) => s.setRunWorkshopAuto);

  // settings slice
  const bgmVolume = useStore((s) => s.bgmVolume);
  const seVolume = useStore((s) => s.seVolume);
  const setBgmVolume = useStore((s) => s.setBgmVolume);
  const setSeVolume = useStore((s) => s.setSeVolume);
  const setAutoActive = useStore((s) => s.setAutoActive);
  const switchWeapon = useStore((s) => s.switchWeapon);
  const setPaused = useStore((s) => s.setPaused);
  const upgradeRunWorkshop = useStore((s) => s.upgradeRunWorkshop);
  const weaponSwitchCdSec = useStore((s) => s.weaponSwitchCdSec);

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

  // ── リザルト状態 (useBattleLoop に paused として渡すため先に計算) ──
  const autoResultStatus = resolveResultStatus(isRunActive, machineHp);
  // 撤退時は 'retreat' を手動で set するためローカル state で保持
  const [resultStatus, setResultStatus] = useState<ResultStatus | null>(null);
  const effectiveResultStatus = resultStatus ?? autoResultStatus;
  const isResultOpen = effectiveResultStatus !== null;

  // ラン終了時点の tier / wave をスナップショット。 endRun() が currentTier/Wave を 1 に
  // リセットしてしまうため、 ResultDialog 表示用に finalizeRun の冒頭で保存しておく。
  const [finalTier, setFinalTier] = useState<number | null>(null);
  const [finalWave, setFinalWave] = useState<number | null>(null);
  // ラン終了時点の獲得 bolt / alloy もスナップショット。 endRun() は runStartBolt/Alloy を
  // 0 にリセットするため、 再 render 後の earnedBolt = bolt - 0 = 全所持数 になってしまう。
  // finalizeRun の冒頭で earnedBolt/earnedAlloy 自体を保存しておけば差分計算は固定される。
  const [finalEarnedBolt, setFinalEarnedBolt] = useState<BigNum | null>(null);
  const [finalEarnedAlloy, setFinalEarnedAlloy] = useState<BigNum | null>(null);

  // ── リザルト SE (clear / gameover) ──
  useEffect(() => {
    if (effectiveResultStatus === 'clear') soundEngine.play('resultClear');
    if (effectiveResultStatus === 'gameover') soundEngine.play('resultGameOver');
  }, [effectiveResultStatus]);

  // ── ゲームループ (敵 spawn / 武器発射 / ダメージ / 撃破 / 被ダメ / 弾道 / ドロップ) ──
  // ResultDialog 表示中 (撤退 / gameover) は paused で完全停止させる
  const {
    enemies,
    damageEvents,
    deathEvents,
    projectileEvents,
    waveElapsedSec,
    onDamageDone,
    onDeathDone,
    onProjectileDone,
    appearanceEvents,
    onAppearanceDone,
    fireActive,
    isOverdriveActive,
    killCount,
    runElapsedSec,
    droppedPatches,
    tierCleared,
    onTierClearedAck,
  } = useBattleLoop({
    paused: isResultOpen,
    // v1.3.2: スクリーンセーバー中は描画 events (damageEvents 等) の生成を停止して
    // 発熱対策 (BattleField を unmount しているため Fx 完了通知 onDamageDone が来ず、
    // 通常通り setDamageEvents で append するとメモリ蓄積する)。
    suspendRendering: isScreenSaverOpen,
  });

  // Tier クリア通知: tierCleared が true になった瞬間に TierClearFx をマウント。
  // 演出終了 (onDone) は handleTierClearFxDone で処理 (次 Tier 解放 + ラン終了 + ResultDialog)。
  useEffect(() => {
    if (tierCleared) {
      setTierClearKey((k) => k + 1);
    }
  }, [tierCleared]);

  // ── BGM: ボス出現を契機に切替 (App.tsx の画面別 BGM を bossPhase 中だけ上書き) ──
  // wave 30 開始時点では BGM は battleNormal のまま。 wave 開始 25 秒後にボスがスポーン
  // (= AppearanceBannerFx と同時) するタイミングで battleBoss に切替。 ボス撃破で
  // enemies からボスが消えた後も、 currentWave === 30 のうちは bossPhase を維持し、
  // TierClearFx の演出中も battleBoss を流し続ける (advanceTier で wave=1 に戻る瞬間に解除)。
  // (BUG-W30-2: 旧実装は currentWave===30 だけで判定していたため、 wave 30 開始直後
  //  (= ボス出現の 25 秒前) から battleBoss に切替わってしまっていた)
  const [bossPhase, setBossPhase] = useState(false);
  useEffect(() => {
    if (enemies.some((e) => e.kind === 'boss')) {
      setBossPhase(true);
    }
  }, [enemies]);
  useEffect(() => {
    if (currentWave !== 30) setBossPhase(false);
  }, [currentWave]);
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

  // マシン強化「アクティブ CD 短縮率」 (0〜0.5)。 CD ゲージ最大値も短縮率に応じて縮め、
  // 「ゲージが満タンになるまでの時間 = 60s × (1 - reduction)」 とすることで、
  // 「最初から部分的に溜まった見た目」 ではなく「溜まる速度が上がった見た目」 にする。
  const activeCdReduction = useMemo(() => {
    const item = MACHINE_UPGRADE_ITEMS.find((i) => i.key === 'activeCdReduction');
    if (item == null) return 0;
    return calcEffectValue(item, machineLevels.activeCdReduction);
  }, [machineLevels.activeCdReduction]);
  const activeMaxSec = useMemo(
    () => DEFAULT_ACTIVE_MAX_SEC * (1 - Math.max(0, Math.min(1, activeCdReduction))),
    [activeCdReduction]
  );

  // 武器切替 CD (仕様 05-weapons.md §武器切替: 3 秒)
  // 装備中の武器は常に 100 (= CD なし表示)、 他の武器は経過率 % を出す。
  // (H2-4: weaponCds は同じ値の組み合わせなら参照を安定化させて BattleHudBottom の memo を活かす)
  const weaponCds = useMemo<Record<typeof currentWeapon, number>>(() => {
    const weaponCdPct = Math.max(
      0,
      Math.min(100, ((WEAPON_SWITCH_CD_SEC - weaponSwitchCdSec) / WEAPON_SWITCH_CD_SEC) * 100)
    );
    return {
      laser: currentWeapon === 'laser' ? 100 : weaponCdPct,
      cannon: currentWeapon === 'cannon' ? 100 : weaponCdPct,
      thunder: currentWeapon === 'thunder' ? 100 : weaponCdPct,
      cutter: currentWeapon === 'cutter' ? 100 : weaponCdPct,
    };
  }, [currentWeapon, weaponSwitchCdSec]);

  // BattleHudTop は BigNum を受け取る — machineMaxHp が 0 (ラン外) のときは 1 にクランプ
  // (H2-4: BigNum 演算結果を useMemo してパス先 BattleHudTop の memo を活かす)
  const hpCurrentBn = machineHp;
  const hpMaxBn = useMemo(
    () => (machineMaxHp.isZero() ? BigNum.fromNumber(1) : machineMaxHp),
    [machineMaxHp]
  );

  // ── ラン終了共通ヘルパー ──
  // gameover / 撤退どちらのフローでも endRun / profile 系を 1 度だけ呼ぶ。
  // hasFinalizedRef で重複呼び出しを防ぐ。
  const hasFinalizedRef = useRef(false);
  const finalizeRun = useCallback(
    (status: ResultStatus) => {
      if (hasFinalizedRef.current) return;
      hasFinalizedRef.current = true;
      // endRun() で currentTier/Wave が 1、 runStartBolt/Alloy が 0 にリセットされるので
      // useStore.getState() で fresh な値をスナップショット。
      // (0.3.5: 旧実装は selector closure (deps に [currentTier, currentWave, ...]) を使って
      //  いたが、 handleTierClearFxDone 経由で同期的に finalizeRun を呼ぶケースで「setState
      //  → react reconcile 待ち」 タイミングの問題が起きるため、 すべて getState() に統一)
      const state = useStore.getState();
      const snapTier = state.currentTier;
      const snapWave = state.currentWave;
      setFinalTier(snapTier);
      setFinalWave(snapWave);
      const finalBolt = state.bolt.sub(state.runStartBolt);
      const finalAlloy = state.alloy.sub(state.runStartAlloy);
      setFinalEarnedBolt(finalBolt.lt(BigNum.ZERO) ? BigNum.ZERO : finalBolt);
      setFinalEarnedAlloy(finalAlloy.lt(BigNum.ZERO) ? BigNum.ZERO : finalAlloy);
      // gameover / clear パス: autoResultStatus は endRun() 後に「machineHp=0 → gameover」
      // を返してしまう (defaultBattleState.machineHp = ZERO のため)。 'clear' でも 'gameover' でも
      // ローカル state に固定してダイアログを維持する。
      // (0.3.5: 'clear' を追加。 旧仕様では Tier ボス撃破で advanceTier していたため 'clear'
      //  ステータスは事実上未使用だったが、 Tier クリア → リザルト画面フローで明示的に使う)
      if (status === 'gameover' || status === 'clear') {
        setResultStatus(status);
      }
      state.endRun();
      state.updateHighest(snapTier, snapWave);
      state.incrementRuns();
      state.addEnemiesKilled(killCount);
      state.addPlayTimeSec(runElapsedSec);
      state.setLastPlayedAt(Date.now());
      void flushAfterRun();
    },
    [killCount, runElapsedSec]
  );

  // effectiveResultStatus が null → 非 null に変化した瞬間に 1 度だけ finalizeRun を呼ぶ。
  // hasFinalizedRef のリセットは handleResultClose (preparation 遷移時) で行う。
  // 0.3.5: Tier クリアフロー (handleTierClearFxDone) が finalizeRun を先行呼びするケースが
  // あるため、 ここでリセットすると重複呼び (updateHighest や incrementRuns が 2 回) になる。
  const prevResultStatusRef = useRef<ResultStatus | null>(null);
  useEffect(() => {
    if (effectiveResultStatus !== null && prevResultStatusRef.current === null) {
      finalizeRun(effectiveResultStatus);
    }
    prevResultStatusRef.current = effectiveResultStatus;
  }, [effectiveResultStatus, finalizeRun]);

  // ── ハンドラ ──
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
    setResultStatus('retreat');
    soundEngine.play('resultRetreat');
  }, [setPaused]);

  const handleResultClose = useCallback(() => {
    // 次のラン開始用に finalize ガードをリセット (0.3.5: 旧実装は useEffect 内でリセット
    // していたが、 Tier クリアフロー (handleTierClearFxDone) との重複防止のため移動)
    hasFinalizedRef.current = false;
    navigate('preparation');
  }, [navigate]);

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
    finalizeRun('clear');
    useStore.getState().unlockNextTier(clearedTier);
    onTierClearedAck();
  }, [onTierClearedAck, finalizeRun]);

  // リザルトリワード: ラン開始時残高からの差分で算出 (負にならないようクランプ)。
  // (H2-4: BigNum.sub は新規 BigNum を返すため、 毎 render で参照が変わって BattleHudBottom +
  //  CurrencyAmount が 60fps re-render してしまう。 useMemo で固定し、 deps が変化しないフレームでは
  //  同一参照を返す)
  const earnedBolt = useMemo(() => {
    const raw = bolt.sub(runStartBolt);
    return raw.lt(BigNum.ZERO) ? BigNum.ZERO : raw;
  }, [bolt, runStartBolt]);
  const earnedAlloy = useMemo(() => {
    const raw = alloy.sub(runStartAlloy);
    return raw.lt(BigNum.ZERO) ? BigNum.ZERO : raw;
  }, [alloy, runStartAlloy]);

  // ── wave 関連 ──
  const TOTAL_WAVES = 30;

  return (
    <div className={styles.root}>
      {/* v1.3.7 (Phase 0): ?debug=perf クエリ時のみ fps / heap / 敵 sprite 数を画面右上に表示。
          クエリが無ければ null を返すので production への影響ゼロ。 */}
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
              hpCurrent={hpCurrentBn}
              hpMax={hpMaxBn}
              tier={currentTier}
              wave={currentWave}
              totalWaves={TOTAL_WAVES}
              secondsRemaining={waveSecondsRemaining}
              secondsTotal={WAVE_DURATION_SEC}
              isBossWave={currentWave === TOTAL_WAVES}
              paused={isPaused || isResultOpen}
            />
          }
          footer={
            <div className={styles.battleFooter}>
              {/* ワークショップシート: HudBottom の上に absolute で重ねる overlay。
                BattleField の高さは変えない。 */}
              <RunWorkshopBottomSheet
                open={isWorkshopOpen}
                screw={screw}
                levels={runWorkshopLevels}
                autoEnabled={runWorkshopAutoEnabled}
                onUpgrade={handleWorkshopUpgrade}
                onToggleAuto={handleToggleWorkshopAuto}
                onClose={handleCloseWorkshop}
              />
              <BattleHudBottom
                screw={screw}
                earnedBolt={earnedBolt}
                equippedWeapon={currentWeapon}
                weaponCds={weaponCds}
                activeCd={activeCdSec}
                activeMax={activeMaxSec}
                isAutoActive={isAutoActive}
                onSwitchWeapon={handleSwitchWeapon}
                onActivate={handleManualActivate}
                onToggleAuto={setAutoActive}
                isPaused={isPaused}
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
              enemies={enemies}
              damageEvents={damageEvents}
              hitEvents={hitEvents}
              deathEvents={deathEvents}
              projectileEvents={projectileEvents}
              onDamageDone={onDamageDone}
              onDeathDone={onDeathDone}
              onProjectileDone={onProjectileDone}
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
          bgmVolume={bgmVolume}
          seVolume={seVolume}
          onBgmChange={setBgmVolume}
          onSeChange={setSeVolume}
          onRetreat={handleRetreat}
          onClose={() => {
            // メニューを閉じる = pause 解除
            setPaused(false);
          }}
        />

        {/* リザルトダイアログ */}
        {isResultOpen && (
          <ResultDialog
            open={isResultOpen}
            status={effectiveResultStatus!}
            reachedTier={finalTier ?? currentTier}
            reachedWave={finalWave ?? currentWave}
            killed={killCount}
            elapsedSec={runElapsedSec}
            reward={{
              bolt: finalEarnedBolt ?? earnedBolt,
              alloy: finalEarnedAlloy ?? earnedAlloy,
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

        {/* 上位敵 (elite / miniboss / boss) 出現バナー */}
        {appearanceEvents.map((evt) => (
          <AppearanceBannerFx
            key={evt.id}
            // 'miniboss' は AppearanceBannerFx に専用 kind が無いので 'boss' で代用 (赤・大きい)
            kind={evt.kind === 'miniboss' ? 'boss' : evt.kind}
            name={evt.name}
            onDone={() => onAppearanceDone(evt.id)}
          />
        ))}

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
  );
}
