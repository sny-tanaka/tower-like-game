import { useCallback, useEffect, useRef, useState } from 'react';

import styles from './style.module.scss';

import { AppearanceBannerFx } from '@/components/fx/AppearanceBannerFx';
import { WaveStartFx } from '@/components/fx/WaveStartFx';
import { AppShell } from '@/components/organisms/AppShell';
import { BattleField } from '@/components/organisms/BattleField';
import type { HitEvent } from '@/components/organisms/BattleField';
import { BattleHudBottom } from '@/components/organisms/BattleHudBottom';
import { BattleHudTop } from '@/components/organisms/BattleHudTop';
import { BattleMenuOverlay } from '@/components/organisms/BattleMenuOverlay';
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

/** 索敵半径（パーセント） */
const DEFAULT_RANGE = 30;

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
  const activeCdSec = useStore((s) => s.activeCdSec);
  const isAutoActive = useStore((s) => s.isAutoActive);
  const isPaused = useStore((s) => s.isPaused);
  const runWorkshopLevels = useStore((s) => s.runWorkshopLevels);

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

  // ── BGM: wave に応じて切替 (App.tsx の画面別 BGM を wave 30 のみ上書き) ──
  useEffect(() => {
    if (currentWave === 30) {
      soundEngine.playBgm('battleBoss');
    } else {
      soundEngine.playBgm('battleNormal');
    }
  }, [currentWave]);

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

  // ── ゲームループ (敵 spawn / 武器発射 / ダメージ / 撃破 / 被ダメ / 弾道 / ドロップ) ──
  // ResultDialog 表示中 (撤退 / gameover) は paused で完全停止させる
  const {
    enemies,
    damageEvents,
    deathEvents,
    projectileEvents,
    pickupEvents,
    waveElapsedSec,
    onDamageDone,
    onDeathDone,
    onProjectileDone,
    onPickupDone,
    appearanceEvents,
    onAppearanceDone,
    fireActive,
    isOverdriveActive,
    killCount,
    runElapsedSec,
    droppedPatches,
  } = useBattleLoop({
    range: DEFAULT_RANGE,
    paused: isResultOpen,
  });

  // Wave 残り時間: 0 になったら advanceWave が走り経過秒はリセットされる
  const waveSecondsRemaining = Math.max(0, WAVE_DURATION_SEC - waveElapsedSec);

  // HitEvent (EnemyHitFx) は別途配線予定。 当面 [] のまま (弾道は projectileEvents が担う)
  const hitEvents: HitEvent[] = [];

  // 武器切替 CD (仕様 05-weapons.md §武器切替: 3 秒)
  // 装備中の武器は常に 100 (= CD なし表示)、 他の武器は経過率 % を出す
  const weaponCdPct = Math.max(
    0,
    Math.min(100, ((WEAPON_SWITCH_CD_SEC - weaponSwitchCdSec) / WEAPON_SWITCH_CD_SEC) * 100)
  );
  const weaponCds: Record<typeof currentWeapon, number> = {
    laser: currentWeapon === 'laser' ? 100 : weaponCdPct,
    cannon: currentWeapon === 'cannon' ? 100 : weaponCdPct,
    thunder: currentWeapon === 'thunder' ? 100 : weaponCdPct,
    cutter: currentWeapon === 'cutter' ? 100 : weaponCdPct,
  };

  // BattleHudTop は BigNum を受け取る — machineMaxHp が 0 (ラン外) のときは 1 にクランプ
  const hpCurrentBn = machineHp;
  const hpMaxBn = machineMaxHp.isZero() ? BigNum.fromNumber(1) : machineMaxHp;

  // ── ラン終了共通ヘルパー ──
  // gameover / 撤退どちらのフローでも endRun / profile 系を 1 度だけ呼ぶ。
  // hasFinalizedRef で重複呼び出しを防ぐ。
  const hasFinalizedRef = useRef(false);
  const finalizeRun = useCallback(
    (status: ResultStatus) => {
      if (hasFinalizedRef.current) return;
      hasFinalizedRef.current = true;
      // gameover パス: autoResultStatus は endRun() 後に isRunActive=false で null になるため
      // resultStatus state に固定してダイアログを維持する
      if (status === 'gameover') {
        setResultStatus('gameover');
      }
      const state = useStore.getState();
      state.endRun();
      state.updateHighest(currentTier, currentWave);
      state.incrementRuns();
      state.addEnemiesKilled(killCount);
      state.addPlayTimeSec(runElapsedSec);
      state.setLastPlayedAt(Date.now());
      void flushAfterRun();
    },
    [currentTier, currentWave, killCount, runElapsedSec]
  );

  // effectiveResultStatus が null → 非 null に変化した瞬間に 1 度だけ finalizeRun を呼ぶ
  const prevResultStatusRef = useRef<ResultStatus | null>(null);
  useEffect(() => {
    if (effectiveResultStatus !== null && prevResultStatusRef.current === null) {
      hasFinalizedRef.current = false; // 新しいラン終了イベントのためリセット
      finalizeRun(effectiveResultStatus);
    }
    prevResultStatusRef.current = effectiveResultStatus;
  }, [effectiveResultStatus, finalizeRun]);

  // ── ハンドラ ──
  // pause トグル: 「pause + メニュー開閉」 を同期 (= メニュー単独で開かない / pause 単独でも開かない)
  const handleTogglePause = () => {
    const next = !isPaused;
    setPaused(next);
    soundEngine.play(next ? 'dialogOpen' : 'tap');
  };

  const handleOpenScreenSaver = () => {
    setIsScreenSaverOpen(true);
    soundEngine.play('dialogOpen');
  };

  const handleRetreat = () => {
    // retreat 時はメニューも閉じる (= pause 解除)。 ResultDialog 側で停止が担保される
    setPaused(false);
    setResultStatus('retreat');
    soundEngine.play('resultRetreat');
  };

  const handleResultClose = () => {
    navigate('preparation');
  };

  const handleWorkshopUpgrade = (key: RunWorkshopKey, delta: 1 | 5 | 'max') => {
    const ok = upgradeRunWorkshop(key, delta);
    soundEngine.play(ok ? 'purchaseOk' : 'reject');
  };

  const handleSwitchWeapon = (weapon: typeof currentWeapon) => {
    switchWeapon(weapon);
    soundEngine.play('weaponSwitch');
  };

  const handleManualActivate = () => {
    // useBattleLoop の fireActive は内部で triggerActive (CD セット) + active 関数の実行
    // (Mega Beam / Volley / Plasma / Overdrive) + SE / Fx 配信をまとめて行う。
    const ok = fireActive();
    if (!ok) {
      soundEngine.play('reject');
    }
  };

  // リザルトリワード: ラン開始時残高からの差分で算出 (負にならないようクランプ)
  const earnedBoltRaw = bolt.sub(runStartBolt);
  const earnedAlloyRaw = alloy.sub(runStartAlloy);
  const earnedBolt = earnedBoltRaw.lt(BigNum.ZERO) ? BigNum.ZERO : earnedBoltRaw;
  const earnedAlloy = earnedAlloyRaw.lt(BigNum.ZERO) ? BigNum.ZERO : earnedAlloyRaw;

  // ── wave 関連 ──
  const TOTAL_WAVES = 30;

  return (
    <div className={styles.root}>
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
              onUpgrade={handleWorkshopUpgrade}
              onClose={() => {
                setIsWorkshopOpen(false);
              }}
            />
            <BattleHudBottom
              screw={screw}
              earnedBolt={earnedBolt}
              equippedWeapon={currentWeapon}
              weaponCds={weaponCds}
              activeCd={activeCdSec}
              activeMax={DEFAULT_ACTIVE_MAX_SEC}
              isAutoActive={isAutoActive}
              onSwitchWeapon={handleSwitchWeapon}
              onActivate={handleManualActivate}
              onToggleAuto={setAutoActive}
              isPaused={isPaused}
              onTogglePause={handleTogglePause}
              onOpenScreenSaver={handleOpenScreenSaver}
              isWorkshopOpen={isWorkshopOpen}
              onToggleWorkshop={() => {
                setIsWorkshopOpen((prev) => !prev);
              }}
            />
          </div>
        }
      >
        {/* メインコンテンツ: BattleField */}
        <BattleField
          enemies={enemies}
          damageEvents={damageEvents}
          hitEvents={hitEvents}
          deathEvents={deathEvents}
          projectileEvents={projectileEvents}
          pickupEvents={pickupEvents}
          onDamageDone={onDamageDone}
          onDeathDone={onDeathDone}
          onProjectileDone={onProjectileDone}
          onPickupDone={onPickupDone}
          showCutterOrbit={currentWeapon === 'cutter' && isRunActive && !isPaused && !isResultOpen}
          showOverdriveAura={isOverdriveActive && isRunActive && !isResultOpen}
          cutterRotateMs={calcCutterRotateMs(
            // useBattleLoop の effectivePerSec と同じ式 (cutterStats × RW × Overdrive、 ATTACK_PER_SEC_CAP で頭打ち)
            Math.min(
              ATTACK_PER_SEC_CAP,
              cutterStats(weaponLv).attackPerSec *
                calcRunWorkshopMultiplier(runWorkshopLevels.attackSpeedMul) *
                (isOverdriveActive ? CUTTER_OVERDRIVE_ATTACK_SPEED_MUL : 1)
            ),
            CUTTER_BLADES
          )}
          range={DEFAULT_RANGE}
        />
      </AppShell>

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
            reachedTier={currentTier}
            reachedWave={currentWave}
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

        {/* スクリーンセーバー */}
        <ScreenSaverDialog
          open={isScreenSaverOpen}
          onClose={() => {
            setIsScreenSaverOpen(false);
          }}
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
