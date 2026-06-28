import { useEffect, useRef, useState } from 'react';

import styles from './style.module.scss';

import {
  drainFrameStats,
  drainLoafStats,
  drainTickStats,
  getProjectileCount,
  recordLoaf,
} from '@/lib/perfBus';
import { useStore } from '@/store/index';

/**
 * PerfOverlay — dev サーバ起動時に画面右上に自動表示される開発用パフォーマンスオーバーレイ。
 *
 * **表示内容 (v1.3.8 拡張 → v1.3.8 第2弾で FRAME / LOAF 追加)**:
 *
 * | 項目 | 内容 |
 * |---|---|
 * | FPS | 直近 1 秒の `requestAnimationFrame` コール回数 |
 * | HEAP | Chrome 限定 (`performance.memory.usedJSHeapSize`)。 MB |
 * | LOOP | useBattleLoop tick の純 JS ロジック self time (avg / max ms) — React commit 含まず |
 * | BUDGET | LOOP avg を targetFps の 1 frame budget で割った % (= JS 占有率の目安) |
 * | FRAME | rAF callback 間の wall-clock 差分 (avg / max ms) — React commit + paint + 合成を含む実フレーム長 |
 * | LOAF | long-animation-frame 件数 / 最大 duration (ms) — iOS Safari 18+ で対応 |
 * | PROJ | 表示中 projectile 数 |
 * | ENEMIES | DOM 内 `[data-enemy-id]` 要素数 |
 * | DOM | `document.getElementsByTagName('*').length` — 全 DOM ノード数 |
 * | LONG | 直近 1 秒の long task (>=50ms) 数 |
 *
 * **サーバ送信**:
 * 1 秒ごとに上記スナップショットを `navigator.sendBeacon('/__perf', JSON)` で
 * Vite dev サーバに送信。 サーバ側 plugin (perfLogCollector) が `dev-perf-log.jsonl`
 * に追記する。 開発者 (Claude Code) がこのファイルを Read するだけで実機の発熱原因を
 * オフラインで分析できる。
 *
 * **表示制御**:
 *   - `yarn dev` (= `import.meta.env.DEV === true`): 自動で表示。 クエリ不要
 *   - `yarn build` (= production): 絶対に表示されない
 *   - `forceShow={true}` 明示: env 無視で表示 (story / test 用)
 *   - `forceShow={false}` 明示: env 無視で非表示 (test 用)
 *
 * 仕様参照: dev-docs/perf-bench.md
 */
export interface PerfOverlayProps {
  /**
   * 表示制御 (省略時は dev サーバなら表示、 production なら非表示)。
   * - `true`: 強制表示 (story 用)
   * - `false`: 強制非表示 (test 用)
   * - `undefined`: env で判定 (`import.meta.env.DEV`)
   */
  forceShow?: boolean;
}

/**
 * 表示判定。 forceShow を最優先、 未指定なら Vite の DEV env で判定。
 * SSR や env 未取得時は安全側に倒して false を返す。
 */
function shouldShow(forceShow: boolean | undefined): boolean {
  if (forceShow === true) return true;
  if (forceShow === false) return false;
  // Vite: import.meta.env.DEV は dev サーバ時 true、 production ビルド時 false
  try {
    return import.meta.env?.DEV === true;
  } catch {
    return false;
  }
}

interface PerformanceWithMemory extends Performance {
  memory?: { usedJSHeapSize: number; totalJSHeapSize: number; jsHeapSizeLimit: number };
}

/** byte → MB (小数 1 桁) */
function toMB(bytes: number): string {
  return (bytes / 1024 / 1024).toFixed(1);
}

const FPS_SAMPLE_WINDOW_MS = 1000;
const UI_UPDATE_INTERVAL_MS = 200;
const SERVER_SAMPLE_INTERVAL_MS = 1000;
const LONG_TASK_THRESHOLD_MS = 50;

/** PerfOverlay の DOM に表示する 1 秒間の集計値 */
interface DisplaySnapshot {
  fps: number;
  heapMb: string | null;
  loopAvgMs: number;
  loopMaxMs: number;
  budgetPct: number;
  /**
   * frame interval (= rAF callback 間の wall-clock 差分) の集計 (1秒分)。
   * 60fps 安定なら avg=16.67ms、 fps drop の瞬間に max が突発的に伸びる。
   */
  frameAvgMs: number;
  frameMaxMs: number;
  /**
   * long-animation-frame (LoAF) の集計 (1秒分)。 iOS Safari 18+ で対応。
   * 「フレーム全工程が 50ms 超」 のフレームを直接捉える。 longTaskCount が JS スレッド
   * ブロック検知なのに対し、 loafCount は描画/合成側のブロックも含む。
   */
  loafCount: number;
  loafMaxMs: number;
  loafAvgScriptMs: number;
  projCount: number;
  enemyCount: number;
  domCount: number;
  longTaskCount: number;
}

/**
 * サーバへ送る 1 秒スナップショット。 JSONL の各行にこれを書く。
 * Date / 時刻系はサーバ側で先頭に ISO 文字列を付与するため、 ここでは `ts` (ms epoch) のみ。
 */
interface ServerSnapshot extends DisplaySnapshot {
  ts: number;
  targetFps: number;
  loopCount: number;
  frameCount: number;
  currentTier?: number;
  currentWave?: number;
  isRunActive?: boolean;
  isPaused?: boolean;
  screenSaverOpen?: boolean;
}

/**
 * useStore から発熱解析に必要な field だけ抜く。 store が未 hydrate 等で
 * 読めなくても (例: テスト環境) 落ちずに optional を返す。
 */
function readStoreContext(): Partial<ServerSnapshot> {
  try {
    const s = useStore.getState() as unknown as Record<string, unknown>;
    return {
      targetFps: typeof s.targetFps === 'number' ? s.targetFps : 60,
      currentTier: typeof s.currentTier === 'number' ? s.currentTier : undefined,
      currentWave: typeof s.currentWave === 'number' ? s.currentWave : undefined,
      isRunActive: typeof s.isRunActive === 'boolean' ? s.isRunActive : undefined,
      isPaused: typeof s.isPaused === 'boolean' ? s.isPaused : undefined,
      screenSaverOpen: typeof s.isScreenSaverOpen === 'boolean' ? s.isScreenSaverOpen : undefined,
    };
  } catch {
    return { targetFps: 60 };
  }
}

/**
 * sendBeacon で `/__perf` に POST。 失敗してもオーバーレイは動き続ける。
 * sendBeacon が無い環境 (古い iOS Safari 等) では fetch にフォールバック。
 */
function postSnapshot(snap: ServerSnapshot): void {
  const body = JSON.stringify(snap);
  try {
    if (typeof navigator !== 'undefined' && typeof navigator.sendBeacon === 'function') {
      const blob = new Blob([body], { type: 'application/json' });
      navigator.sendBeacon('/__perf', blob);
      return;
    }
  } catch {
    // sendBeacon が拒否された (CSP 等) — fetch にフォールバック
  }
  try {
    void fetch('/__perf', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
      keepalive: true,
    });
  } catch {
    // 送信失敗は無視 (オーバーレイの存在価値は表示にもあるため)
  }
}

export function PerfOverlay({ forceShow }: PerfOverlayProps) {
  const [enabled] = useState(() => shouldShow(forceShow));
  const [snap, setSnap] = useState<DisplaySnapshot | null>(null);

  const frameTimesRef = useRef<number[]>([]);
  const longTaskCountRef = useRef<number>(0);

  // ---- PerformanceObserver: long task (>= 50ms) のカウント ----
  useEffect(() => {
    if (!enabled) return;
    if (typeof PerformanceObserver === 'undefined') return;
    type SupportedPO = typeof PerformanceObserver & { supportedEntryTypes?: string[] };
    const supported = (PerformanceObserver as SupportedPO).supportedEntryTypes ?? [];
    if (!supported.includes('longtask')) return;
    const po = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.duration >= LONG_TASK_THRESHOLD_MS) {
          longTaskCountRef.current += 1;
        }
      }
    });
    try {
      po.observe({ entryTypes: ['longtask'] });
    } catch {
      return;
    }
    return () => po.disconnect();
  }, [enabled]);

  // ---- PerformanceObserver: long-animation-frame (LoAF) — iOS Safari 18+ 対応 ----
  // フレーム全工程 (script / styleAndLayout / paint / composite) が 50ms 超のフレームを
  // 直接捉える。 PerformanceLongAnimationFrameTiming は標準で entry.duration (= フレーム長)
  // と renderStart (= ブラウザが render phase に入った時刻) を持つ。
  useEffect(() => {
    if (!enabled) return;
    if (typeof PerformanceObserver === 'undefined') return;
    type SupportedPO = typeof PerformanceObserver & { supportedEntryTypes?: string[] };
    const supported = (PerformanceObserver as SupportedPO).supportedEntryTypes ?? [];
    if (!supported.includes('long-animation-frame')) return;
    // LoAF entry の型 (まだ TypeScript lib に入っていない部分があるため最小限の構造のみ拾う)
    type LoafEntry = PerformanceEntry & { renderStart?: number };
    const po = new PerformanceObserver((list) => {
      for (const e of list.getEntries() as LoafEntry[]) {
        const renderStart = e.renderStart ?? 0;
        // script 部分 = renderStart - startTime。 renderStart=0 のときは duration 全体が script
        const scriptMs = renderStart > 0 ? renderStart - e.startTime : e.duration;
        recordLoaf(e.duration, scriptMs);
      }
    });
    try {
      po.observe({ entryTypes: ['long-animation-frame'] });
    } catch {
      return;
    }
    return () => po.disconnect();
  }, [enabled]);

  // ---- rAF: fps 計測 + 200ms ごと表示更新 + 1秒ごとサーバ送信 ----
  useEffect(() => {
    if (!enabled) return;
    let rafId: number | null = null;
    let lastUiUpdateMs = performance.now();
    let lastServerSampleMs = performance.now();

    const tick = (now: number) => {
      frameTimesRef.current.push(now);
      const cutoff = now - FPS_SAMPLE_WINDOW_MS;
      while (frameTimesRef.current.length > 0 && frameTimesRef.current[0]! < cutoff) {
        frameTimesRef.current.shift();
      }

      const isUiTick = now - lastUiUpdateMs >= UI_UPDATE_INTERVAL_MS;
      const isServerTick = now - lastServerSampleMs >= SERVER_SAMPLE_INTERVAL_MS;

      if (isUiTick || isServerTick) {
        // 1 秒スパンの集計 (= drain で次の 1 秒へ送る)
        // UI は 200ms ごと更新したいが、 drain は LOOP 計測の整合性のため
        // server サンプル単位 (1秒) で行う。 200ms tick は前回値を踏襲する。
        const fps = frameTimesRef.current.length;
        const perf = performance as PerformanceWithMemory;
        const heapMb = perf.memory ? toMB(perf.memory.usedJSHeapSize) : null;
        const enemyCount = document.querySelectorAll('[data-enemy-id]').length;

        if (isServerTick) {
          lastServerSampleMs = now;
          const tick = drainTickStats();
          const frame = drainFrameStats();
          const loafStats = drainLoafStats();
          const projCount = getProjectileCount();
          const longTaskCount = longTaskCountRef.current;
          longTaskCountRef.current = 0;
          const ctx = readStoreContext();
          const targetFps = ctx.targetFps ?? 60;
          const budgetMs = targetFps > 0 ? 1000 / targetFps : 16.67;
          const budgetPct = budgetMs > 0 ? (tick.avgMs / budgetMs) * 100 : 0;
          const domCount =
            typeof document !== 'undefined' ? document.getElementsByTagName('*').length : 0;

          const display: DisplaySnapshot = {
            fps,
            heapMb,
            loopAvgMs: tick.avgMs,
            loopMaxMs: tick.maxMs,
            budgetPct,
            frameAvgMs: frame.avgMs,
            frameMaxMs: frame.maxMs,
            loafCount: loafStats.count,
            loafMaxMs: loafStats.maxMs,
            loafAvgScriptMs: loafStats.avgScriptMs,
            projCount,
            enemyCount,
            domCount,
            longTaskCount,
          };
          const server: ServerSnapshot = {
            ...display,
            ts: Date.now(),
            targetFps,
            loopCount: tick.count,
            frameCount: frame.count,
            currentTier: ctx.currentTier,
            currentWave: ctx.currentWave,
            isRunActive: ctx.isRunActive,
            isPaused: ctx.isPaused,
            screenSaverOpen: ctx.screenSaverOpen,
          };
          postSnapshot(server);
          setSnap(display);
        } else if (isUiTick) {
          // 200ms 更新: LOOP / BUDGET / FRAME / LoAF / PROJ / DOM / LONG は前回 server サンプル値を保持。
          // FPS / HEAP / ENEMIES (= 軽い計測値) のみ更新。
          lastUiUpdateMs = now;
          setSnap((prev) => ({
            fps,
            heapMb,
            loopAvgMs: prev?.loopAvgMs ?? 0,
            loopMaxMs: prev?.loopMaxMs ?? 0,
            budgetPct: prev?.budgetPct ?? 0,
            frameAvgMs: prev?.frameAvgMs ?? 0,
            frameMaxMs: prev?.frameMaxMs ?? 0,
            loafCount: prev?.loafCount ?? 0,
            loafMaxMs: prev?.loafMaxMs ?? 0,
            loafAvgScriptMs: prev?.loafAvgScriptMs ?? 0,
            projCount: prev?.projCount ?? 0,
            enemyCount,
            domCount: prev?.domCount ?? 0,
            longTaskCount: prev?.longTaskCount ?? 0,
          }));
        }
        // 200ms tick は server tick と兼ねるので、 server tick 内では UI 更新時刻も反映
        if (isServerTick) lastUiUpdateMs = now;
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => {
      if (rafId != null) cancelAnimationFrame(rafId);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      className={styles.root}
      role="status"
      aria-label="Performance overlay"
    >
      <div className={styles.row}>
        <span className={styles.label}>FPS</span>
        <span className={styles.value}>{snap?.fps ?? 0}</span>
      </div>
      {snap?.heapMb != null && (
        <div className={styles.row}>
          <span className={styles.label}>HEAP</span>
          <span className={styles.value}>{snap.heapMb}MB</span>
        </div>
      )}
      <div className={styles.row}>
        <span className={styles.label}>LOOP</span>
        <span className={styles.value}>
          {(snap?.loopAvgMs ?? 0).toFixed(1)}/{(snap?.loopMaxMs ?? 0).toFixed(1)}
        </span>
      </div>
      <div className={styles.row}>
        <span className={styles.label}>BUDGET</span>
        <span className={styles.value}>{(snap?.budgetPct ?? 0).toFixed(0)}%</span>
      </div>
      <div className={styles.row}>
        <span className={styles.label}>FRAME</span>
        <span className={styles.value}>
          {(snap?.frameAvgMs ?? 0).toFixed(1)}/{(snap?.frameMaxMs ?? 0).toFixed(1)}
        </span>
      </div>
      <div className={styles.row}>
        <span className={styles.label}>LOAF</span>
        <span className={styles.value}>
          {snap?.loafCount ?? 0}/{(snap?.loafMaxMs ?? 0).toFixed(0)}
        </span>
      </div>
      <div className={styles.row}>
        <span className={styles.label}>PROJ</span>
        <span className={styles.value}>{snap?.projCount ?? 0}</span>
      </div>
      <div className={styles.row}>
        <span className={styles.label}>ENEMIES</span>
        <span className={styles.value}>{snap?.enemyCount ?? 0}</span>
      </div>
      <div className={styles.row}>
        <span className={styles.label}>DOM</span>
        <span className={styles.value}>{snap?.domCount ?? 0}</span>
      </div>
      <div className={styles.row}>
        <span className={styles.label}>LONG</span>
        <span className={styles.value}>{snap?.longTaskCount ?? 0}</span>
      </div>
    </div>
  );
}
