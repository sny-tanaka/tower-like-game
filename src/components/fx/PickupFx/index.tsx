import { useId } from 'react';

import { Icon } from '@/components/atoms/Icon';

export type PickupIconName = 'screw' | 'bolt' | 'alloy';

export interface PickupFxProps {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  iconName: PickupIconName;
  duration?: number;
  onDone?: () => void;
}

const COLOR_MAP: Record<PickupIconName, string> = {
  screw: 'var(--c-screw)',
  bolt: 'var(--c-bolt)',
  alloy: 'var(--c-alloy)',
};

/**
 * PickupFx — 通貨 / アイテム獲得時に HUD まで吸い込まれる演出。
 * 指定座標から targetX/Y へ弧を描いて飛んで小さくなる。
 * マウント = 再生開始、アンマウント = 停止。
 */
export function PickupFx({
  x,
  y,
  targetX,
  targetY,
  iconName,
  duration = 400,
  onDone,
}: PickupFxProps) {
  const uid = useId().replace(/:/g, '');
  const id = `pk-${uid}`;
  const color = COLOR_MAP[iconName];

  const midX = (x + targetX) / 2;
  const midY = Math.min(x, targetX, y, targetY) - 8;

  const css = `
    @keyframes ${id}-arc {
      0%   { left: ${x}%;       top: ${y}%;       transform: translate(-50%, -50%) scale(1);   opacity: 1; }
      40%  { left: ${midX}%;    top: ${midY}%;    transform: translate(-50%, -50%) scale(1.1); opacity: 1; }
      100% { left: ${targetX}%; top: ${targetY}%; transform: translate(-50%, -50%) scale(0.5); opacity: 0; }
    }
    .${id} {
      position: absolute;
      color: ${color};
      filter: drop-shadow(0 0 4px ${color});
      animation: ${id}-arc ${duration}ms var(--ease-default) both;
      pointer-events: none;
      display: inline-flex;
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
      >
        <Icon
          name={iconName}
          size={18}
        />
      </div>
    </>
  );
}
