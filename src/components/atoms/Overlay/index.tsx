import type { CSSProperties, ReactNode } from 'react';

import styles from './style.module.scss';

// ---------------------------------------------------------------------------
// 型定義
// ---------------------------------------------------------------------------

/** 背景ディムの強度 */
export type OverlayDimLevel = 'soft' | 'normal' | 'heavy';

/** 子要素の縦方向整列 */
export type OverlayAlign = 'center' | 'top' | 'bottom';

/** zIndex トークン名 */
export type OverlayZIndex = 'sheet' | 'dialog' | 'overlay' | 'toast';

export interface OverlayProps {
  /** デフォルト true: position: fixed で全画面。false: position: absolute で親要素に対して全面 */
  fullscreen?: boolean;
  children?: ReactNode;
  onClose?: () => void;
  /**
   * true (デフォルト): 背景タップで onClose 発火
   * false: 背景タップで発火しない
   */
  dismissible?: boolean;
  /** ディムの強度。soft=0.45 / normal=0.60 / heavy=0.80。デフォルト normal */
  dimLevel?: OverlayDimLevel;
  /** backdrop-filter の blur 量（px）。0 でぼかし無し。デフォルト 0 */
  blur?: number;
  /** 子要素の縦方向整列。デフォルト center */
  align?: OverlayAlign;
  /** z-index。トークン名（'sheet' / 'dialog' / 'overlay' / 'toast'）または直接 number。デフォルト 'overlay' */
  zIndex?: OverlayZIndex | number;
  /** 追加スタイル（ padding-top など） */
  style?: CSSProperties;
  /** open prop（後方互換用、未使用） */
  open?: boolean;
}

// ---------------------------------------------------------------------------
// ディムレベルマップ
// ---------------------------------------------------------------------------

const DIM_ALPHA: Record<OverlayDimLevel, number> = {
  soft: 0.45,
  normal: 0.6,
  heavy: 0.8,
};

// ---------------------------------------------------------------------------
// zIndex トークンマップ
// ---------------------------------------------------------------------------

const Z_INDEX_MAP: Record<OverlayZIndex, string> = {
  sheet: 'var(--z-sheet)',
  dialog: 'var(--z-dialog)',
  overlay: 'var(--z-overlay)',
  toast: 'var(--z-toast)',
};

// ---------------------------------------------------------------------------
// align クラスマップ
// ---------------------------------------------------------------------------

const ALIGN_CLASS: Record<OverlayAlign, string> = {
  center: styles.alignCenter,
  top: styles.alignTop,
  bottom: styles.alignBottom,
};

/**
 * 全画面ディムバックドロップ + 内側コンテンツ Atom。
 *
 * - マウント時にフェードイン（親が条件付きレンダリングで制御）
 * - fadeIn @keyframes は style.module.scss に定義（Fx 化しない）
 * - 「閉じる × ボタン」は Overlay の責務ではなく内側の Dialog の責務
 * - dismissible=true 時に背景クリックで onClose 発火
 * - children クリックは onClose に透過させない（stopPropagation）
 */
export function Overlay({
  fullscreen = true,
  children,
  onClose,
  dismissible = true,
  dimLevel = 'normal',
  blur = 0,
  align = 'center',
  zIndex = 'overlay',
  style,
  open: _open,
}: OverlayProps) {
  const handleBackdropClick = () => {
    if (dismissible && onClose) {
      onClose();
    }
  };

  const handleContentClick = (e: React.MouseEvent) => {
    // 背景クリックイベントを止めて onClose が発火しないようにする
    e.stopPropagation();
  };

  const alpha = DIM_ALPHA[dimLevel];
  const resolvedZ =
    typeof zIndex === 'number' ? zIndex : (Z_INDEX_MAP[zIndex] ?? Z_INDEX_MAP.overlay);
  // ディム背景: 深い黒寄り (--c-bg-deep 系) — design ref に合わせ rgba(2,4,10,...)
  const bgStyle: CSSProperties = {
    background: `rgba(2, 4, 10, ${alpha})`,
    zIndex: resolvedZ,
    ...(blur > 0 ? { backdropFilter: `blur(${blur}px)` } : {}),
    ...style,
  };

  return (
    <div
      className={[
        styles.overlay,
        fullscreen ? styles.fullscreen : styles.absolute,
        ALIGN_CLASS[align],
      ].join(' ')}
      style={bgStyle}
      onClick={handleBackdropClick}
      role="presentation"
      aria-modal="true"
    >
      <div
        className={styles.content}
        onClick={handleContentClick}
      >
        {children}
      </div>
    </div>
  );
}
