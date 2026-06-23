import styles from './style.module.scss';

import { Text } from '@/components/atoms/Text';
import { PatchCard } from '@/components/molecules/PatchCard';
import { useStore } from '@/store';
import type { PatchEntry } from '@/store/slices/patches';

// ---------------------------------------------------------------------------
// 型定義
// ---------------------------------------------------------------------------

export interface PatchInventoryTabProps {
  /** ストーリー / テスト用オーバーライド */
  overridePatches?: Map<string, PatchEntry>;
  overrideEquipped?: Map<number, { name: string; tier: number }>;
  selectedId?: string | null;
  onSelect?: (patchKey: string | null) => void;
}

// ---------------------------------------------------------------------------
// パッチ名→アイコン/トリガー/エフェクト マッピング
// ---------------------------------------------------------------------------

const PATCH_ICON_MAP: Record<string, string> = {
  instantKill: 'skull',
  bossKiller: 'skull',
  doubleShot: 'lightning',
  damageImmune: 'shield',
  killHeal: 'heart',
  shieldRegen: 'shield',
  bonusDrop: 'star',
  boltCast: 'lightning',
  freezeHit: 'ice',
  burnHit: 'flame',
};

const PATCH_TRIGGER_MAP: Record<string, string> = {
  instantKill: 'HP25%↓',
  bossKiller: 'ボス時',
  doubleShot: '射撃時',
  damageImmune: '常時',
  killHeal: '撃破時',
  shieldRegen: '常時',
  bonusDrop: '撃破時',
  boltCast: '射撃時',
  freezeHit: 'クリ時',
  burnHit: '貫通時',
};

const PATCH_EFFECT_MAP: Record<string, string> = {
  instantKill: '即死',
  bossKiller: '攻撃+50%',
  doubleShot: '2連射',
  damageImmune: '被ダメ-5%',
  killHeal: 'HP+1',
  shieldRegen: 'シールド再生',
  bonusDrop: 'ドロップ+',
  boltCast: 'ボルト獲得',
  freezeHit: '2秒凍結',
  burnHit: '周囲焼夷',
};

// ---------------------------------------------------------------------------
// コンポーネント
// ---------------------------------------------------------------------------

export function PatchInventoryTab({
  overridePatches,
  overrideEquipped,
  selectedId,
  onSelect,
}: PatchInventoryTabProps) {
  const storePatches = useStore((s) => s.patches);
  const storeEquipped = useStore((s) => s.equippedPatches);

  const patches = overridePatches ?? storePatches;
  const equipped = overrideEquipped ?? storeEquipped;

  // 装着済みのパッチ名セット
  const equippedNames = new Set<string>(Array.from(equipped.values()).map((e) => e.name));

  const entries = Array.from(patches.values());

  if (entries.length === 0) {
    return (
      <div className={styles.root}>
        <div className={styles.empty}>
          <Text
            variant="body"
            color="dim"
          >
            パッチを所持していません
          </Text>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <Text variant="heading-3">パッチ在庫</Text>
        <Text
          variant="caption"
          color="dim"
        >
          {entries.length} 種類
        </Text>
      </div>
      <div className={styles.grid}>
        {entries.map((entry) => {
          const key = `${entry.name}#${entry.tier}`;
          const isEquipped = equippedNames.has(entry.name);
          return (
            <PatchCard
              key={key}
              patchId={key}
              name={entry.name}
              iconName={
                (PATCH_ICON_MAP[entry.name] ?? 'spark') as Parameters<
                  typeof PatchCard
                >[0]['iconName']
              }
              tier={entry.tier}
              count={entry.count}
              trigger={PATCH_TRIGGER_MAP[entry.name] ?? '常時'}
              effect={PATCH_EFFECT_MAP[entry.name] ?? '-'}
              selected={selectedId === key}
              locked={isEquipped}
              onClick={onSelect ? () => onSelect(selectedId === key ? null : key) : undefined}
            />
          );
        })}
      </div>
    </div>
  );
}
