import styles from './style.module.scss';

import { Icon } from '@/components/atoms/Icon';
import type { IconName } from '@/components/atoms/Icon';
import { Text } from '@/components/atoms/Text';
import type { Screen } from '@/store/navigation';

// ---------------------------------------------------------------------------
// タブ定義（固定 5 タブ）
// ---------------------------------------------------------------------------

interface TabDef {
  key: Screen;
  label: string;
  iconName: IconName;
}

const TABS: TabDef[] = [
  { key: 'preparation', label: '準備', iconName: 'tower' },
  { key: 'machine', label: 'マシン', iconName: 'heart' },
  { key: 'armory', label: '武器庫', iconName: 'laser' },
  { key: 'patches', label: 'パッチ', iconName: 'spark' },
  { key: 'settings', label: '設定', iconName: 'settings' },
];

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

export interface BottomNavProps {
  /** アクティブなタブキー */
  active: 'preparation' | 'machine' | 'armory' | 'patches' | 'settings';
  /** タブ選択時のコールバック */
  onChange: (target: Screen) => void;
  /** バッジ: タブキー → バッジ表示テキスト（数字 or '!'） */
  badges?: Partial<Record<string, number | string>>;
}

/**
 * BottomNav — 標準モバイル風 5 タブ底辺ナビ。
 * AppShell の footer スロットに配置される想定（自身は position fixed しない）。
 */
export function BottomNav({ active, onChange, badges }: BottomNavProps) {
  return (
    <nav
      className={styles.nav}
      aria-label="メインナビゲーション"
    >
      {TABS.map(({ key, label, iconName }) => {
        const isActive = key === active;
        const badge = badges?.[key];

        return (
          <button
            key={key}
            type="button"
            className={[styles.tab, isActive ? styles.active : ''].filter(Boolean).join(' ')}
            onClick={() => onChange(key)}
            aria-current={isActive ? 'page' : undefined}
            aria-label={label}
          >
            <span className={styles.iconWrap}>
              <Icon
                name={iconName}
                size={22}
                color={isActive ? 'var(--c-primary)' : 'var(--c-text-dim)'}
              />
              {badge != null && (
                <span
                  className={styles.badge}
                  aria-hidden="true"
                >
                  {badge}
                </span>
              )}
            </span>
            <Text
              variant="caption"
              color={isActive ? 'primary' : 'dim'}
            >
              {label}
            </Text>
          </button>
        );
      })}
    </nav>
  );
}
