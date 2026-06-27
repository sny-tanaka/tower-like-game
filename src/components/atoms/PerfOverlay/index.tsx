import { useEffect, useRef, useState } from 'react';

import styles from './style.module.scss';

/**
 * PerfOverlay — dev サーバ起動時に画面右上に自動表示される開発用パフォーマンスオーバーレイ。
 *
 * 表示内容:
 *   - 直近 1 秒の平均 fps (rAF タイムスタンプから算出)
 *   - JS ヒープ使用量 (Chrome only — `performance.memory.usedJSHeapSize`)
 *   - DOM 内 `[data-enemy-id]` 要素数 (敵スプライト数の DOM 観察用)
 *
 * v1.3.7 (Phase 0) のリファクタ効果を客観計測するためのハーネス。
 *
 * 表示制御:
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

export function PerfOverlay({ forceShow }: PerfOverlayProps) {
  const [enabled] = useState(() => shouldShow(forceShow));
  const [fps, setFps] = useState<number>(0);
  const [heapMb, setHeapMb] = useState<string | null>(null);
  const [enemyCount, setEnemyCount] = useState<number>(0);

  // rAF で fps を計測。 直近 1 秒のフレーム数を表示する rolling window。
  const frameTimesRef = useRef<number[]>([]);
  useEffect(() => {
    if (!enabled) return;
    let rafId: number | null = null;
    let lastUiUpdateMs = performance.now();
    const tick = (now: number) => {
      frameTimesRef.current.push(now);
      // window 外を捨てる
      const cutoff = now - FPS_SAMPLE_WINDOW_MS;
      while (frameTimesRef.current.length > 0 && frameTimesRef.current[0]! < cutoff) {
        frameTimesRef.current.shift();
      }
      // 200ms ごとに表示更新 (オーバーレイ自体の re-render を抑える)
      if (now - lastUiUpdateMs >= 200) {
        lastUiUpdateMs = now;
        setFps(frameTimesRef.current.length);
        const perf = performance as PerformanceWithMemory;
        if (perf.memory) {
          setHeapMb(toMB(perf.memory.usedJSHeapSize));
        }
        setEnemyCount(document.querySelectorAll('[data-enemy-id]').length);
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
        <span className={styles.value}>{fps}</span>
      </div>
      {heapMb != null && (
        <div className={styles.row}>
          <span className={styles.label}>HEAP</span>
          <span className={styles.value}>{heapMb}MB</span>
        </div>
      )}
      <div className={styles.row}>
        <span className={styles.label}>ENEMIES</span>
        <span className={styles.value}>{enemyCount}</span>
      </div>
    </div>
  );
}
