import { useId } from 'react';

export interface MachineHitFxProps {
  /** マシン中心の x 座標 (0-100、 .field 空間) */
  cx: number;
  /** マシン中心の y 座標 (0-100、 .field 空間) */
  cy: number;
  /** アニメ長 ms (デフォルト 280) */
  duration?: number;
  /** 完了時のコールバック (= 親で再マウントトリガーをリセット) */
  onDone?: () => void;
}

/**
 * MachineHitFx — マシン本体被ダメ時の赤フラッシュ Fx。
 *
 * 画面全体ビネット (旧 DamageVignetteFx) はチカチカで鬱陶しいため、
 * マシン本体周辺だけが局所的に赤くフラッシュする方式に置換。
 *
 * - .field 空間 (0-100) の cx/cy にマウント
 * - 半径 ~40px の赤発光を一瞬出して 280ms で消える
 * - `prefers-reduced-motion` 時は超短縮で即消去
 */
export function MachineHitFx({ cx, cy, duration = 280, onDone }: MachineHitFxProps) {
  const uid = useId().replace(/:/g, '');
  const id = `mhf-${uid}`;

  const css = `
    @keyframes ${id}-flash {
      0%   { opacity: 0; transform: translate(-50%, -50%) scale(0.7); }
      30%  { opacity: 1; transform: translate(-50%, -50%) scale(1.1); }
      100% { opacity: 0; transform: translate(-50%, -50%) scale(1.4); }
    }
    .${id} {
      position: absolute;
      left: ${cx}%;
      top: ${cy}%;
      width: 80px;
      height: 80px;
      border-radius: 50%;
      pointer-events: none;
      background: radial-gradient(
        circle,
        rgba(255, 77, 109, 0.85) 0%,
        rgba(255, 77, 109, 0.5) 35%,
        rgba(255, 77, 109, 0) 70%
      );
      animation: ${id}-flash ${duration}ms var(--ease-out) both;
      z-index: var(--z-fx-field);
    }
    @media (prefers-reduced-motion: reduce) {
      .${id} { animation-duration: 1ms; opacity: 0; }
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div
        className={id}
        onAnimationEnd={onDone}
        aria-hidden="true"
      />
    </>
  );
}
