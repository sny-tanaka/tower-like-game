import type { CSSProperties, ReactNode } from 'react';

import styles from './style.module.scss';

import { BottomSheetHandle } from '@/components/molecules/BottomSheetHandle';

// ---------------------------------------------------------------------------
// 型定義
// ---------------------------------------------------------------------------

/** シートの配置エッジ */
export type SheetEdge = 'bottom' | 'top' | 'side' | 'all';

/** パディング量 */
export type SheetPadding = 'none' | 'sm' | 'md' | 'lg';

/**
 * @deprecated `position` は `edge` に統一。後方互換のため残す。
 */
export type SheetPosition = 'bottom';

export interface SheetProps {
  /** 開閉フラグ（親が条件付きレンダリングで制御） */
  open?: boolean;
  children: ReactNode;
  onClose?: () => void;
  /**
   * シートの配置エッジ。
   * bottom: 下端固定 / top: 上端固定 / side: 右端固定 / all: 中央モーダル
   * デフォルト: bottom
   */
  edge?: SheetEdge;
  /**
   * @deprecated edge を使ってください。後方互換のため残す。
   */
  position?: SheetPosition;
  /** ドラッグハンドルを表示するか（edge=bottom 時のみ有効） */
  withHandle?: boolean;
  /** コンテンツのパディング。デフォルト none（中身が自前で padding を持つ） */
  padding?: SheetPadding;
  /** 追加スタイル */
  style?: CSSProperties;
}

// ---------------------------------------------------------------------------
// padding マップ
// ---------------------------------------------------------------------------

const PADDING_CLASS: Record<SheetPadding, string> = {
  none: '',
  sm: styles.paddingSm,
  md: styles.paddingMd,
  lg: styles.paddingLg,
};

/**
 * 画面端固定パネルの素地 Atom。
 *
 * - マウント時にスライドイン（edge に応じてアニメーション方向が変わる）
 * - @keyframes は style.module.scss に定義（Fx 化しない）
 * - safe-area-inset-bottom を考慮した padding 付き（bottom 時）
 * - withHandle=true で BottomSheetHandle を上端に表示
 */
export function Sheet({
  open: _open,
  children,
  onClose,
  edge: edgeProp,
  position,
  withHandle,
  padding = 'none',
  style,
}: SheetProps) {
  // position（deprecated）が渡された場合は edge へ変換
  const edge = edgeProp ?? (position === 'bottom' ? 'bottom' : 'bottom');

  const edgeClass = {
    bottom: styles.edgeBottom,
    top: styles.edgeTop,
    side: styles.edgeSide,
    all: styles.edgeAll,
  }[edge];

  const paddingClass = PADDING_CLASS[padding];

  return (
    <div
      className={[styles.sheet, edgeClass].filter(Boolean).join(' ')}
      role="dialog"
      aria-modal="true"
      style={style}
    >
      {/* 背景クリックで閉じるオーバーレイ（Sheet 自身のバックドロップ） */}
      {onClose && (
        <div
          className={styles.backdrop}
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      <div className={[styles.content, paddingClass].filter(Boolean).join(' ')}>
        {withHandle && edge === 'bottom' && <BottomSheetHandle />}
        {children}
      </div>
    </div>
  );
}
