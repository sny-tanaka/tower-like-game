import styles from './style.module.scss';

import { Badge } from '@/components/atoms/Badge';
import { Button } from '@/components/atoms/Button';
import { Icon } from '@/components/atoms/Icon';
import { Text } from '@/components/atoms/Text';
import type { WeaponType } from '@/store/slices/weapons';

// ---------------------------------------------------------------------------
// 型定義
// ---------------------------------------------------------------------------

export interface LaunchButtonProps {
  /** 選択中 Tier */
  tier?: number;
  /** 選択中武器 */
  weaponKind?: WeaponType;
  /** 装着パッチ数 */
  patchCount?: number;
  /** 出撃不可フラグ */
  disabled?: boolean;
  /** 出撃コールバック */
  onLaunch?: () => void;
  /**
   * position: sticky を有効にするか（default: true）
   * フッター固定で配置される想定のため true が基本
   */
  sticky?: boolean;
}

// ---------------------------------------------------------------------------
// コンポーネント
// ---------------------------------------------------------------------------

/**
 * LaunchButton — 出撃準備画面のフッタ Organism
 *
 * Tier + 武器 + パッチ概要を summary として表示し、大型の「出撃」ボタンを提供する。
 * AppShell.footer に渡される想定で、sticky bottom:0 がデフォルト。
 */
export function LaunchButton({
  tier,
  weaponKind,
  patchCount = 0,
  disabled = false,
  onLaunch,
  sticky = true,
}: LaunchButtonProps) {
  return (
    <div
      role="group"
      aria-label="出撃"
      className={[styles.wrapper, sticky ? styles.sticky : ''].filter(Boolean).join(' ')}
    >
      {/* サマリー行 */}
      <div className={styles.summary}>
        {tier != null && (
          <Badge
            variant="tier"
            tier={tier}
            size="sm"
          />
        )}
        {weaponKind != null && (
          <span className={styles.weaponInfo}>
            <Icon
              name={weaponKind}
              size={14}
            />
            <Text
              variant="label"
              color="primary"
            >
              {weaponKind.toUpperCase()}
            </Text>
          </span>
        )}
        <span className={styles.patchInfo}>
          <Icon
            name="spark"
            size={12}
            color="var(--c-text-dim)"
          />
          <Text
            variant="numeric-s"
            color="dim"
          >
            PATCH ×{patchCount}
          </Text>
        </span>
      </div>

      {/* 出撃ボタン */}
      <Button
        label="出撃"
        variant="primary"
        size="lg"
        fullWidth
        disabled={disabled}
        iconLeft={
          <Icon
            name="triangle"
            size={18}
          />
        }
        onClick={onLaunch}
      />
    </div>
  );
}
