import type { ReactNode } from 'react';
import { useRef, useEffect, useState } from 'react';

import styles from './style.module.scss';

import { Tab } from '@/components/atoms/Tab';

export interface TabBarItem<T extends string> {
  key: T;
  label: string;
  icon?: ReactNode;
}

export interface TabBarProps<T extends string> {
  tabs: ReadonlyArray<TabBarItem<T>>;
  active: T;
  onChange: (key: T) => void;
  size?: 'sm' | 'md';
  fullWidth?: boolean;
}

/**
 * 複数 Tab を横並びにして切替を制御する Molecule。
 * アクティブ下線インジケータが translateX でスムーズに移動する。
 */
export function TabBar<T extends string>({
  tabs,
  active,
  onChange,
  size = 'md',
  fullWidth = false,
}: TabBarProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState<{
    left: number;
    width: number;
  }>({ left: 0, width: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const activeIndex = tabs.findIndex((t) => t.key === active);
    if (activeIndex < 0) return;

    const tabEl = container.querySelectorAll<HTMLButtonElement>('[role="tab"]')[activeIndex];
    if (!tabEl) return;

    const containerRect = container.getBoundingClientRect();
    const tabRect = tabEl.getBoundingClientRect();

    setIndicatorStyle({
      left: tabRect.left - containerRect.left,
      width: tabRect.width,
    });
  }, [active, tabs]);

  return (
    <div
      ref={containerRef}
      role="tablist"
      className={[styles.tabBar, styles[`size-${size}`], fullWidth ? styles.fullWidth : '']
        .filter(Boolean)
        .join(' ')}
    >
      {tabs.map((tab) => (
        <Tab
          key={tab.key}
          label={tab.label}
          active={tab.key === active}
          onClick={() => onChange(tab.key)}
          icon={tab.icon}
        />
      ))}
      {/* スライドするアクティブインジケータ */}
      <span
        className={styles.indicator}
        aria-hidden="true"
        style={{
          transform: `translateX(${indicatorStyle.left}px)`,
          width: indicatorStyle.width,
        }}
      />
    </div>
  );
}
