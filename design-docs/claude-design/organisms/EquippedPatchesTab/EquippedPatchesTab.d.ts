import type { PatchCardProps } from '../../molecules/PatchCard/PatchCard';

export interface EquippedPatchesTabProps {
  /** 装着中のパッチ配列 */
  patches: PatchCardProps[];
  /** スロット総数 (マシン強化「パッチスロット数」依存) */
  slotCount?: number;
  /** ロック中スロット数 */
  lockedCount?: number;
  /** パッチ庫画面への遷移 */
  onOpenPatchScreen?: () => void;
}

export declare function EquippedPatchesTab(props: EquippedPatchesTabProps): JSX.Element;
