import type { PatchCardProps } from '../PatchCard/PatchCard';

export interface PatchSlotProps {
  /** 装着されたパッチ。null なら empty */
  patch?: PatchCardProps | null;
  /** スロット未解放 */
  locked?: boolean;
  /** 表示用スロット番号 (1-based) */
  slotIndex?: number;
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
}

export declare function PatchSlot(props: PatchSlotProps): JSX.Element;
