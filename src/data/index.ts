// Schema / 型
export type {
  BigNumJSON,
  CurrenciesRecord,
  EquippedPatchRecord,
  MachineRecord,
  MachineUpgradeKey,
  PatchInventoryRecord,
  PatchName,
  ProfileRecord,
  SaveState,
  SettingsRecord,
  StoreName,
  WeaponsRecord,
} from '@/data/schema';
export {
  DB_NAME,
  DB_VERSION,
  DEFAULT_CURRENCIES,
  DEFAULT_PROFILE,
  DEFAULT_SETTINGS,
  DEFAULT_WEAPONS,
  MACHINE_UPGRADE_KEYS,
  STORES,
} from '@/data/schema';

// DB 接続
export { openDatabase, resetDbInstance } from '@/data/db';

// Repository
export {
  deleteEquippedPatch,
  deletePatch,
  getAllEquippedPatches,
  getAllMachine,
  getAllPatches,
  getCurrencies,
  getEquippedPatch,
  getMachine,
  getPatch,
  getPatchesByName,
  getProfile,
  getSettings,
  getWeapons,
  loadSaveState,
  putCurrencies,
  putEquippedPatch,
  putMachine,
  putPatch,
  putProfile,
  putSettings,
  putWeapons,
} from '@/data/repository';

// Export / Import
export type { ExportFile } from '@/data/export';
export { exportSave, importSave, listBackups } from '@/data/export';
