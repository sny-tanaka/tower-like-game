import type { IDBPDatabase } from 'idb';

import type {
  CurrenciesRecord,
  EquippedPatchRecord,
  MachineRecord,
  MachineUpgradeKey,
  PatchInventoryRecord,
  PatchName,
  ProfileRecord,
  SaveState,
  SettingsRecord,
  WeaponsRecord,
} from '@/data/schema';
import { STORES } from '@/data/schema';

// --- profile ---

export async function getProfile(db: IDBPDatabase): Promise<ProfileRecord | undefined> {
  return db.get(STORES.profile, 'singleton') as Promise<ProfileRecord | undefined>;
}

export async function putProfile(db: IDBPDatabase, record: ProfileRecord): Promise<void> {
  await db.put(STORES.profile, record);
}

// --- currencies ---

export async function getCurrencies(db: IDBPDatabase): Promise<CurrenciesRecord | undefined> {
  return db.get(STORES.currencies, 'singleton') as Promise<CurrenciesRecord | undefined>;
}

export async function putCurrencies(db: IDBPDatabase, record: CurrenciesRecord): Promise<void> {
  await db.put(STORES.currencies, record);
}

// --- machine ---

export async function getAllMachine(db: IDBPDatabase): Promise<MachineRecord[]> {
  return db.getAll(STORES.machine) as Promise<MachineRecord[]>;
}

export async function getMachine(
  db: IDBPDatabase,
  key: MachineUpgradeKey
): Promise<MachineRecord | undefined> {
  return db.get(STORES.machine, key) as Promise<MachineRecord | undefined>;
}

export async function putMachine(db: IDBPDatabase, record: MachineRecord): Promise<void> {
  await db.put(STORES.machine, record);
}

// --- weapons ---

export async function getWeapons(db: IDBPDatabase): Promise<WeaponsRecord | undefined> {
  return db.get(STORES.weapons, 'singleton') as Promise<WeaponsRecord | undefined>;
}

export async function putWeapons(db: IDBPDatabase, record: WeaponsRecord): Promise<void> {
  await db.put(STORES.weapons, record);
}

// --- patches ---

export async function getAllPatches(db: IDBPDatabase): Promise<PatchInventoryRecord[]> {
  return db.getAll(STORES.patches) as Promise<PatchInventoryRecord[]>;
}

export async function getPatch(
  db: IDBPDatabase,
  name: PatchName,
  tier: number
): Promise<PatchInventoryRecord | undefined> {
  return db.get(STORES.patches, [name, tier]) as Promise<PatchInventoryRecord | undefined>;
}

export async function putPatch(db: IDBPDatabase, record: PatchInventoryRecord): Promise<void> {
  await db.put(STORES.patches, record);
}

export async function deletePatch(db: IDBPDatabase, name: PatchName, tier: number): Promise<void> {
  await db.delete(STORES.patches, [name, tier]);
}

/** byName インデックスを使って同名の全 Tier を取得する */
export async function getPatchesByName(
  db: IDBPDatabase,
  name: PatchName
): Promise<PatchInventoryRecord[]> {
  return db
    .getAllFromIndex(STORES.patches, 'byName', name)
    .then((r) => r as PatchInventoryRecord[]);
}

// --- equippedPatches ---

export async function getAllEquippedPatches(db: IDBPDatabase): Promise<EquippedPatchRecord[]> {
  return db.getAll(STORES.equippedPatches) as Promise<EquippedPatchRecord[]>;
}

export async function getEquippedPatch(
  db: IDBPDatabase,
  slotIndex: number
): Promise<EquippedPatchRecord | undefined> {
  return db.get(STORES.equippedPatches, slotIndex) as Promise<EquippedPatchRecord | undefined>;
}

export async function putEquippedPatch(
  db: IDBPDatabase,
  record: EquippedPatchRecord
): Promise<void> {
  // 同名重複装着をアサート
  const all = await getAllEquippedPatches(db);
  const duplicate = all.find((r) => r.name === record.name && r.slotIndex !== record.slotIndex);
  if (duplicate) {
    throw new Error(`Patch "${record.name}" is already equipped in slot ${duplicate.slotIndex}`);
  }
  await db.put(STORES.equippedPatches, record);
}

export async function deleteEquippedPatch(db: IDBPDatabase, slotIndex: number): Promise<void> {
  await db.delete(STORES.equippedPatches, slotIndex);
}

// --- settings ---

export async function getSettings(db: IDBPDatabase): Promise<SettingsRecord | undefined> {
  return db.get(STORES.settings, 'singleton') as Promise<SettingsRecord | undefined>;
}

export async function putSettings(db: IDBPDatabase, record: SettingsRecord): Promise<void> {
  await db.put(STORES.settings, record);
}

// --- SaveState: 全ストアを 1 トランザクションで読む ---

export async function loadSaveState(db: IDBPDatabase): Promise<SaveState> {
  const tx = db.transaction(
    [
      STORES.profile,
      STORES.currencies,
      STORES.machine,
      STORES.weapons,
      STORES.patches,
      STORES.equippedPatches,
      STORES.settings,
    ],
    'readonly'
  );

  const [profile, currencies, machine, weapons, patches, equippedPatches, settings] =
    await Promise.all([
      tx.objectStore(STORES.profile).get('singleton'),
      tx.objectStore(STORES.currencies).get('singleton'),
      tx.objectStore(STORES.machine).getAll(),
      tx.objectStore(STORES.weapons).get('singleton'),
      tx.objectStore(STORES.patches).getAll(),
      tx.objectStore(STORES.equippedPatches).getAll(),
      tx.objectStore(STORES.settings).get('singleton'),
    ]);

  await tx.done;

  if (!profile || !currencies || !weapons || !settings) {
    throw new Error(
      '[DB] loadSaveState: Required singleton record is missing. Run openDatabase() first.'
    );
  }

  return {
    profile: profile as ProfileRecord,
    currencies: currencies as CurrenciesRecord,
    machine: machine as MachineRecord[],
    weapons: weapons as WeaponsRecord,
    patches: patches as PatchInventoryRecord[],
    equippedPatches: equippedPatches as EquippedPatchRecord[],
    settings: settings as SettingsRecord,
  };
}
