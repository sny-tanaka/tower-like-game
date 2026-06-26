// BigNumJSON は number[] 型（3桁ブロック配列）
// 詳細は design-docs/tower-like-game/11-bignum.md 参照
export type BigNumJSON = number[];

// --- DB メタ情報 ---

export const DB_NAME = 'tower-like-game';
export const DB_VERSION = 2;

export const STORES = {
  profile: 'profile',
  currencies: 'currencies',
  machine: 'machine',
  weapons: 'weapons',
  patches: 'patches',
  equippedPatches: 'equippedPatches',
  settings: 'settings',
} as const;

export type StoreName = (typeof STORES)[keyof typeof STORES];

// --- レコード型 ---

export type ProfileRecord = {
  id: 'singleton';
  highestTier: number;
  highestWave: number;
  totalPlayTimeSec: number;
  totalRuns: number;
  totalEnemiesKilled: number;
  createdAt: number; // unix ms
  lastPlayedAt: number; // unix ms
  schemaVersion: number;
};

export type CurrenciesRecord = {
  id: 'singleton';
  bolt: BigNumJSON;
  alloy: BigNumJSON;
};

export type MachineUpgradeKey =
  // Defensive
  | 'maxHp'
  | 'hpRegen'
  | 'damageReduction'
  | 'defense'
  // Offensive
  | 'baseAttack'
  | 'attackSpeed'
  | 'range'
  | 'critRate'
  | 'critMultiplier'
  // Active
  | 'activePower'
  | 'activeCdReduction'
  // Economic
  | 'screwGain'
  | 'boltGain'
  | 'alloyGain'
  | 'patchDropRate'
  // Slot
  | 'patchSlots';

export const MACHINE_UPGRADE_KEYS: MachineUpgradeKey[] = [
  'maxHp',
  'hpRegen',
  'damageReduction',
  'defense',
  'baseAttack',
  'attackSpeed',
  'range',
  'critRate',
  'critMultiplier',
  'activePower',
  'activeCdReduction',
  'screwGain',
  'boltGain',
  'alloyGain',
  'patchDropRate',
  'patchSlots',
];

export type MachineRecord = {
  key: MachineUpgradeKey;
  lv: number;
};

export type WeaponsRecord = {
  id: 'singleton';
  weaponLv: number;
  initialWeapon: 'laser' | 'cannon' | 'thunder' | 'cutter';
};

export type PatchName =
  | 'instantKill'
  | 'bossKiller'
  | 'doubleShot'
  | 'damageImmune'
  | 'killHeal'
  | 'shieldRegen'
  | 'bonusDrop'
  | 'boltCast'
  | 'freezeHit'
  | 'burnHit';

export type PatchInventoryRecord = {
  name: PatchName;
  tier: number;
  count: number;
};

export type EquippedPatchRecord = {
  slotIndex: number;
  name: PatchName;
  tier: number;
};

/**
 * 描画 fps の選択肢。 モバイル発熱対策で 30 / 45 / 60 から選べる。
 * 既存ユーザー (フィールド未保存) は hydration 時に DEFAULT_SETTINGS.targetFps へフォールバック。
 */
export type TargetFps = 30 | 45 | 60;
export const TARGET_FPS_OPTIONS: readonly TargetFps[] = [30, 45, 60];

export type SettingsRecord = {
  id: 'singleton';
  bgmVolume: number; // 0.0 〜 1.0
  seVolume: number; // 0.0 〜 1.0
  vibrationEnabled: boolean;
  muted: boolean;
  targetFps?: TargetFps; // 未保存の旧データは DEFAULT_SETTINGS.targetFps で補完
};

// --- SaveState: 全ストアをまとめた型 ---

export type SaveState = {
  profile: ProfileRecord;
  currencies: CurrenciesRecord;
  machine: MachineRecord[];
  weapons: WeaponsRecord;
  patches: PatchInventoryRecord[];
  equippedPatches: EquippedPatchRecord[];
  settings: SettingsRecord;
};

// --- デフォルト初期値 ---

export const DEFAULT_PROFILE: ProfileRecord = {
  id: 'singleton',
  highestTier: 0,
  highestWave: 0,
  totalPlayTimeSec: 0,
  totalRuns: 0,
  totalEnemiesKilled: 0,
  createdAt: 0, // openDatabase() 内で Date.now() に差し替える
  lastPlayedAt: 0,
  schemaVersion: DB_VERSION,
};

export const DEFAULT_CURRENCIES: CurrenciesRecord = {
  id: 'singleton',
  bolt: [],
  alloy: [],
};

export const DEFAULT_WEAPONS: WeaponsRecord = {
  id: 'singleton',
  weaponLv: 0,
  initialWeapon: 'laser',
};

export const DEFAULT_SETTINGS: SettingsRecord = {
  id: 'singleton',
  bgmVolume: 0.8,
  seVolume: 0.8,
  vibrationEnabled: true,
  muted: false,
  targetFps: 60,
};
