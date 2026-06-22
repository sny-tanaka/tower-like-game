import { useRef, useEffect, useState } from 'react';

import styles from './style.module.scss';

import { Icon } from '@/components/atoms/Icon';
import type { IconName } from '@/components/atoms/Icon';

// ---------------------------------------------------------------------------
// 型定義
// ---------------------------------------------------------------------------

export interface TabBarItem<T extends string> {
  key: T;
  label: string;
  /** Icon Atom に渡す iconName */
  iconName?: IconName;
  /** バッジ表示。数値 / 文字列 (例: '6/8', '!') */
  badge?: string | number;
  disabled?: boolean;
}

export type TabBarVariant = 'underline' | 'pill';
export type TabBarAlign = 'start' | 'center' | 'end';

export interface TabBarProps<T extends string> {
  tabs: ReadonlyArray<TabBarItem<T>>;
  /** 現在選択中の key */
  value: T;
  onChange: (key: T) => void;
  variant?: TabBarVariant;
  size?: 'sm' | 'md';
  fullWidth?: boolean;
  align?: TabBarAlign;
}

// ---------------------------------------------------------------------------
// コンポーネント
// ---------------------------------------------------------------------------

/**
 * 複数 Tab を横並びにして切替を制御する Molecule。
 * - underline: アクティブ下線インジケータが translateX でスムーズに移動
 * - pill: アクティブ背景ブロック
 * prefers-reduced-motion 対応。
 */
export function TabBar<T extends string>({
  tabs,
  value,
  onChange,
  variant = 'underline',
  size = 'md',
  fullWidth = false,
  align = 'start',
}: TabBarProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState<{
    left: number;
    width: number;
  }>({ left: 0, width: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const activeIndex = tabs.findIndex((t) => t.key === value);
    if (activeIndex < 0) return;

    const tabEls = container.querySelectorAll<HTMLButtonElement>('[role="tab"]');
    const tabEl = tabEls[activeIndex];
    if (!tabEl) return;

    const containerRect = container.getBoundingClientRect();
    const tabRect = tabEl.getBoundingClientRect();

    setIndicatorStyle({
      left: tabRect.left - containerRect.left,
      width: tabRect.width,
    });
  }, [value, tabs]);

  return (
    <div
      ref={containerRef}
      role="tablist"
      className={[
        styles.tabBar,
        styles[`variant-${variant}`],
        styles[`size-${size}`],
        styles[`align-${align}`],
        fullWidth ? styles.fullWidth : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {tabs.map((tab) => {
        const isActive = tab.key === value;
        return (
          <button
            key={tab.key}
            type="button"
            role="tab"
            aria-selected={isActive}
            disabled={tab.disabled === true}
            className={[
              styles.tab,
              isActive ? styles.tabActive : '',
              tab.disabled === true ? styles.tabDisabled : '',
            ]
              .filter(Boolean)
              .join(' ')}
            onClick={() => {
              if (tab.disabled !== true) onChange(tab.key);
            }}
          >
            {tab.iconName != null && (
              <span
                className={styles.tabIcon}
                aria-hidden="true"
              >
                <Icon
                  name={tab.iconName}
                  size={size === 'sm' ? 12 : 14}
                />
              </span>
            )}
            <span className={styles.tabLabel}>{tab.label}</span>
            {tab.badge != null && (
              <span
                className={[styles.badge, isActive ? styles.badgeActive : '']
                  .filter(Boolean)
                  .join(' ')}
              >
                {tab.badge}
              </span>
            )}
          </button>
        );
      })}

      {/* underline: スライドするアクティブインジケータ */}
      {variant === 'underline' && (
        <span
          className={styles.indicator}
          aria-hidden="true"
          style={{
            transform: `translateX(${indicatorStyle.left}px)`,
            width: indicatorStyle.width,
          }}
        />
      )}
    </div>
  );
}
