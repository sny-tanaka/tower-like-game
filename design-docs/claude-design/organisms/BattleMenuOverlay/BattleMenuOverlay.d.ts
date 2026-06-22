export interface BattleMenuOverlayProps {
  open?: boolean;
  onClose?: () => void;
  /** 撤退 (確認ダイアログは上位で表示) */
  onRetreat?: () => void;
  /** BGM 音量 0..100 */
  bgm?: number;
  /** SE 音量 0..100 */
  se?: number;
  onBgmChange?: (v: number) => void;
  onSeChange?: (v: number) => void;
}

export declare function BattleMenuOverlay(props: BattleMenuOverlayProps): JSX.Element | null;
