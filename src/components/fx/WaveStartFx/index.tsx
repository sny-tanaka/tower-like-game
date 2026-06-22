import { useId } from 'react';

import { Text } from '@/components/atoms/Text';

export interface WaveStartFxProps {
  /** 表示するウェーブ番号 */
  waveNumber: number;
  /** アニメーション時間 ms（デフォルト: 1100） */
  duration?: number;
  /** アニメーション完了コールバック */
  onDone?: () => void;
}

/**
 * WaveStartFx — ウェーブ開始時にウェーブ番号がスライドインするバナー Fx。
 *
 * 画面上部 26% 付近に中央揃えで表示し、左から右へ流れてフェードアウトする。
 * `prefers-reduced-motion` 時はアニメーション無効で静止表示。
 */
export function WaveStartFx({ waveNumber, duration = 1100, onDone }: WaveStartFxProps) {
  const uid = useId().replace(/:/g, '');
  const id = `wv-${uid}`;

  const css = `
    @keyframes ${id}-in {
      0%   { transform: translate(-50%, -50%) translateX(-40px); opacity: 0; }
      18%  { transform: translate(-50%, -50%) translateX(0);     opacity: 1; }
      75%  { transform: translate(-50%, -50%) translateX(0);     opacity: 1; }
      100% { transform: translate(-50%, -50%) translateX(40px);  opacity: 0; }
    }
    .${id}-w {
      position: absolute;
      left: 50%;
      top: 26%;
      pointer-events: none;
      z-index: var(--z-fx-field);
      animation: ${id}-in ${duration}ms var(--ease-default) both;
    }
    .${id}-b {
      padding: 8px 16px;
      background: rgba(10,15,28,0.85);
      border: 1px solid var(--c-primary);
      border-radius: var(--r-pill);
      box-shadow: var(--glow-cyan-md);
      display: inline-flex;
      align-items: baseline;
      gap: 8px;
      backdrop-filter: blur(6px);
    }
    @media (prefers-reduced-motion: reduce) {
      .${id}-w { animation: none; opacity: 1; }
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div
        className={`${id}-w`}
        onAnimationEnd={onDone}
      >
        <div className={`${id}-b`}>
          <Text
            variant="label"
            color="primary"
            style={{ fontSize: 11 }}
          >
            WAVE
          </Text>
          <Text
            variant="numeric-l"
            color="primary"
            style={{ fontSize: 24, fontWeight: 700 }}
          >
            {String(waveNumber)}
          </Text>
        </div>
      </div>
    </>
  );
}
