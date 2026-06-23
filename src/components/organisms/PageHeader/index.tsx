import type { ReactNode } from 'react';

import styles from './style.module.scss';

import { CurrencyAmount } from '@/components/atoms/CurrencyAmount';
import type { CurrencyType } from '@/components/atoms/CurrencyAmount';
import { IconButton } from '@/components/atoms/IconButton';
import { Text } from '@/components/atoms/Text';
import { useStore } from '@/store/index';

export interface PageHeaderProps {
  /** 画面タイトル */
  title: string;
  /** サブタイトル（省略可） */
  subtitle?: string;
  /** 戻るボタンのコールバック。渡したとき戻るボタンを表示 */
  onBack?: () => void;
  /**
   * 表示する通貨の種類。
   * store から残高を引いて CurrencyAmount で表示する。
   * screw はラン中（isRunActive=true）のときのみ表示。
   */
  currencies?: ReadonlyArray<CurrencyType>;
  /** TabBar Molecule などを下部に配置するスロット */
  tabBar?: ReactNode;
  /** 右端に追加アクション（設定アイコン等） */
  actions?: ReactNode;
}

/**
 * PageHeader — 画面タイトル + 戻るボタン + 通貨表示を担う Organism。
 * TabBar を下部スロットに受け取り、AppShell.header に配置される想定。
 */
export function PageHeader({
  title,
  subtitle,
  onBack,
  currencies,
  tabBar,
  actions,
}: PageHeaderProps) {
  const bolt = useStore((s) => s.bolt);
  const alloy = useStore((s) => s.alloy);
  const screw = useStore((s) => s.screw);
  const isRunActive = useStore((s) => s.isRunActive);

  /**
   * 表示する通貨エントリー一覧を算出。
   * screw はラン中以外では非表示（仕様: screw はラン中の一時通貨）。
   */
  const visibleCurrencies: CurrencyType[] = (currencies ?? []).filter((kind) => {
    if (kind === 'screw') return isRunActive;
    return true;
  });

  function getValue(kind: CurrencyType) {
    switch (kind) {
      case 'bolt':
        return bolt;
      case 'alloy':
        return alloy;
      case 'screw':
        return screw;
    }
  }

  return (
    <div className={styles.root}>
      {/* メイン行: 戻る / タイトル / 通貨 + アクション */}
      <div className={styles.titleRow}>
        {/* 左: 戻るボタン */}
        <div className={styles.left}>
          {onBack != null && (
            <IconButton
              icon="chevron-left"
              label="戻る"
              variant="ghost"
              size="md"
              onClick={onBack}
            />
          )}
        </div>

        {/* 中央: タイトル */}
        <div className={styles.center}>
          <Text
            variant="heading-3"
            truncate
            align="center"
          >
            {title}
          </Text>
          {subtitle != null && (
            <Text
              variant="caption"
              color="dim"
              align="center"
            >
              {subtitle}
            </Text>
          )}
        </div>

        {/* 右: 通貨 + アクション */}
        <div className={styles.right}>
          {visibleCurrencies.length > 0 && (
            <div className={styles.currencies}>
              {visibleCurrencies.map((kind) => (
                <CurrencyAmount
                  key={kind}
                  currency={kind}
                  value={getValue(kind)}
                  size="sm"
                />
              ))}
            </div>
          )}
          {actions != null && <div className={styles.actions}>{actions}</div>}
        </div>
      </div>

      {/* タブバースロット */}
      {tabBar != null && <div className={styles.tabBarSlot}>{tabBar}</div>}
    </div>
  );
}
