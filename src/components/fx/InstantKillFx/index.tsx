import { useId } from 'react';

import styles from './style.module.scss';

export interface InstantKillFxProps {
  /** アニメ時間 ms (default 520) */
  duration?: number;
  /** アニメ完了時に親へ通知 */
  onDone?: () => void;
}

/**
 * InstantKillFx — インスタントキル発動時の即死フラッシュ。
 * フルスクリーン赤フラッシュ + 中心から広がるリング。
 * 画面演出系: position absolute inset 0 で全面を覆う。
 */
export function InstantKillFx({ duration = 520, onDone }: InstantKillFxProps) {
  const uid = useId().replace(/:/g, 'ik');

  const css = `
    @keyframes ${uid}-fl {
      0%   { opacity: 0; }
      8%   { opacity: 1; }
      100% { opacity: 0; }
    }
    @keyframes ${uid}-rg {
      0%   { transform: translate(-50%, -50%) scale(0.1); opacity: 1; border-width: 4px; }
      100% { transform: translate(-50%, -50%) scale(1.5); opacity: 0; border-width: 1px; }
    }
    .${uid}-w  {
      position: absolute; inset: 0;
      pointer-events: none;
      z-index: var(--z-fx-field);
    }
    .${uid}-fl {
      position: absolute; inset: 0;
      background: rgba(255,77,109,0.6);
      mix-blend-mode: screen;
      animation: ${uid}-fl ${duration}ms var(--ease-out) both;
    }
    .${uid}-rg {
      position: absolute; left: 50%; top: 50%;
      width: 80%; padding-top: 80%; border-radius: 50%;
      border: 4px solid var(--c-danger);
      box-shadow: 0 0 32px var(--c-danger);
      animation: ${uid}-rg ${duration}ms var(--ease-out) both;
    }
    @media (prefers-reduced-motion: reduce) {
      .${uid}-fl, .${uid}-rg { animation-duration: 1ms; opacity: 0; }
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div
        className={`${uid}-w ${styles.wrap}`}
        onAnimationEnd={onDone}
      >
        <div className={`${uid}-fl`} />
        <div className={`${uid}-rg`} />
      </div>
    </>
  );
}
