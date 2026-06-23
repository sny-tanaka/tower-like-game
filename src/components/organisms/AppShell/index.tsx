import type { ReactNode } from 'react';

import styles from './style.module.scss';

export interface AppShellProps {
  /** ヘッダースロット（PageHeader が入る想定） */
  header?: ReactNode;
  /** フッタースロット（BottomNav が入る想定） */
  footer?: ReactNode;
  /** メインコンテンツ */
  children: ReactNode;
  /**
   * BattleScreen 用: true にするとメインエリアのスクロールを無効化し、
   * flex: 1 で残領域を埋める（固定キャンバス向け）
   */
  noScroll?: boolean;
  /** variant: 'default' | 'battle' */
  variant?: 'default' | 'battle';
}

/**
 * AppShell — 全画面の共通レイアウト骨格。
 * header / main / footer の 3 スロット構成。
 * 画面高さ固定（100dvh / 100vh フォールバック）で main がスクロール対象。
 */
export function AppShell({
  header,
  footer,
  children,
  noScroll = false,
  variant = 'default',
}: AppShellProps) {
  return (
    <div
      className={[styles.shell, variant === 'battle' ? styles.battle : '']
        .filter(Boolean)
        .join(' ')}
    >
      {header != null && <header className={styles.header}>{header}</header>}

      <main className={[styles.main, noScroll ? styles.noScroll : ''].filter(Boolean).join(' ')}>
        {children}
      </main>

      {footer != null && <footer className={styles.footer}>{footer}</footer>}
    </div>
  );
}
