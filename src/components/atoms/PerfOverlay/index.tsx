import { useEffect, useRef, useState } from 'react';

import styles from './style.module.scss';

/**
 * PerfOverlay — `?debug=perf` 時に画面右上に常時表示する開発用パフォーマンスオーバーレイ。
 *
 * 表示内容:
 *   - 直近 1 秒の平均 fps (rAF タイムスタンプから算出)
 *   - JS ヒープ使用量 (Chrome only — `performance.memory.usedJSHeapSize`)
 *   - DOM 内 `[data-enemy-id]` 要素数 (敵スプライト数の DOM 観察用)
 *
 * v1.3.7 (Phase 0) のリファクタ効果を客観計測するためのハーネス。 機能変更ゼロ、
 * production ビルドでも `?debug=perf` クエリが無ければレンダリングされない (= 描画コスト 0)。
 *
 * 使い方: `https://.../tower-like-game/?debug=perf`
 *
 * 仕様参照: dev-docs/perf-bench.md
 */
export interface PerfOverlayProps {
  /** テスト / ストーリー用: 強制的に表示する */
  forceShow?: boolean;
}

/**
 * `?debug=perf` クエリが付いているか判定。 forceShow が true なら無条件で true。
 * URL 解析失敗 (SSR 等) は false を返す。
 */
function isPerfModeOn(forceShow: boolean): boolean {
  if (forceShow) return true;
  if (typeof window === 'undefined') return false;
  try {
    return new URLSearchParams(window.location.search).get('debug') === 'perf';
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

export function PerfOverlay({ forceShow = false }: PerfOverlayProps) {
  const [enabled] = useState(() => isPerfModeOn(forceShow));
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
