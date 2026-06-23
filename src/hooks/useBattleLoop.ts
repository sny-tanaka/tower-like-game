import { useEffect, useRef } from 'react';

import { useStore } from '@/store/index';

// ---------------------------------------------------------------------------
// 純粋関数: 1 フレームの「ゲーム時間 (秒)」を計算する
//   - 一時停止中は 0 (副作用なし)
//   - gameSpeed (1x/2x/3x) で実時間を倍化
//   - 過大な elapsedMs (タブ復帰直後など) を 1 秒上限でクランプ
// ---------------------------------------------------------------------------

/** Tick 1 回で進めるゲーム時間 (秒) の上限。 タブ非アクティブ復帰時の暴走を防ぐ */
export const MAX_FRAME_GAME_SEC = 1.0;

export function calcFrameGameSec(
  elapsedMs: number,
  gameSpeed: 1 | 2 | 3,
  isPaused: boolean
): number {
  if (isPaused) return 0;
  const gameTimeSec = (elapsedMs * gameSpeed) / 1000;
  return Math.min(MAX_FRAME_GAME_SEC, Math.max(0, gameTimeSec));
}

// ---------------------------------------------------------------------------
// useBattleLoop
//
// Battle 画面で呼ぶカスタムフック。
// - isRunActive=true の間 requestAnimationFrame で連続 Tick
// - 毎フレーム: 実時間差 × gameSpeed をゲーム時間に変換し、 store の
//   tickCooldowns(deltaSec) を呼ぶ
// - isPaused=true 中は CD 減算なし (ループ自体は継続)
//
// 敵 spawn / 武器発射 / 被ダメ等は #90〜#92 で追加する。
// ---------------------------------------------------------------------------

export function useBattleLoop(): void {
  const rafIdRef = useRef<number | null>(null);
  const lastFrameMsRef = useRef<number>(0);

  const isRunActive = useStore((s) => s.isRunActive);

  useEffect(() => {
    if (!isRunActive) return;

    const tick = (nowMs: number) => {
      const elapsedMs = nowMs - lastFrameMsRef.current;
      lastFrameMsRef.current = nowMs;

      const state = useStore.getState();
      const deltaSec = calcFrameGameSec(elapsedMs, state.gameSpeed, state.isPaused);
      if (deltaSec > 0) {
        state.tickCooldowns(deltaSec);
      }

      rafIdRef.current = requestAnimationFrame(tick);
    };

    lastFrameMsRef.current = performance.now();
    rafIdRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafIdRef.current != null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };
  }, [isRunActive]);
}
