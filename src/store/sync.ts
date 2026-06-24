import { openDatabase } from '@/data/db';
import {
  loadSaveState,
  putCurrencies,
  putEquippedPatch,
  putMachine,
  putPatch,
  putProfile,
  putSettings,
  putWeapons,
} from '@/data/repository';
import {
  DB_VERSION,
  DEFAULT_CURRENCIES,
  DEFAULT_PROFILE,
  DEFAULT_SETTINGS,
  DEFAULT_WEAPONS,
  MACHINE_UPGRADE_KEYS,
} from '@/data/schema';
import type {
  CurrenciesRecord,
  EquippedPatchRecord,
  MachineRecord,
  PatchInventoryRecord,
  ProfileRecord,
  SettingsRecord,
  WeaponsRecord,
} from '@/data/schema';
import { BigNum } from '@/lib/bignum';
import { useStore } from '@/store/index';
import type { PatchEntry } from '@/store/slices/patches';
import { patchKey } from '@/store/slices/patches';

// ---------------------------------------------------------------------------
// Internal: get DB (cached)
// ---------------------------------------------------------------------------

async function getDb() {
  return openDatabase();
}

// ---------------------------------------------------------------------------
// hydrateStore: IndexedDB → Zustand store にロード
// ---------------------------------------------------------------------------

/**
 * アプリ起動時に IndexedDB の全データを Zustand store に読み込む。
 * IndexedDB にデータがない場合はデフォルト値をそのまま維持する。
 */
export async function hydrateStore(): Promise<void> {
  const db = await getDb();
  const save = await loadSaveState(db);

  const store = useStore.getState();

  // --- profile ---
  const p: ProfileRecord = save.profile ?? DEFAULT_PROFILE;
  useStore.setState({
    highestTier: p.highestTier,
    highestWave: p.highestWave,
    totalPlayTimeSec: p.totalPlayTimeSec,
    totalRuns: p.totalRuns,
    totalEnemiesKilled: p.totalEnemiesKilled,
    createdAt: p.createdAt,
    lastPlayedAt: p.lastPlayedAt,
  });

  // --- currencies ---
  const c: CurrenciesRecord = save.currencies ?? DEFAULT_CURRENCIES;
  useStore.setState({
    bolt: BigNum.fromJSON(c.bolt),
    alloy: BigNum.fromJSON(c.alloy),
  });

  // --- machine ---
  const machineRecords: MachineRecord[] = save.machine;
  const machineLevels = { ...store.machineLevels };
  for (const key of MACHINE_UPGRADE_KEYS) {
    const record = machineRecords.find((r) => r.key === key);
    machineLevels[key] = record ? record.lv : 0;
  }
  useStore.setState({ machineLevels });

  // --- weapons ---
  const w: WeaponsRecord = save.weapons ?? DEFAULT_WEAPONS;
  useStore.setState({
    weaponLv: w.weaponLv,
    initialWeapon: w.initialWeapon,
  });

  // --- patches ---
  const patchRecords: PatchInventoryRecord[] = save.patches;
  const patchesMap = new Map<string, PatchEntry>();
  for (const r of patchRecords) {
    if (r.count > 0) {
      patchesMap.set(patchKey(r.name, r.tier), { name: r.name, tier: r.tier, count: r.count });
    }
  }
  useStore.setState({ patches: patchesMap });

  // --- equippedPatches ---
  const equippedRecords: EquippedPatchRecord[] = save.equippedPatches;
  const equippedMap = new Map<
    number,
    { name: (typeof equippedRecords)[0]['name']; tier: number }
  >();
  for (const r of equippedRecords) {
    equippedMap.set(r.slotIndex, { name: r.name, tier: r.tier });
  }
  useStore.setState({ equippedPatches: equippedMap });

  // --- settings ---
  const s: SettingsRecord = save.settings ?? DEFAULT_SETTINGS;
  useStore.setState({
    bgmVolume: s.bgmVolume,
    seVolume: s.seVolume,
    vibrationEnabled: s.vibrationEnabled,
    muted: s.muted ?? false,
  });
}

// ---------------------------------------------------------------------------
// 個別 sync 関数
// ---------------------------------------------------------------------------

/** currencies slice を IndexedDB に書き戻す */
export async function syncCurrencies(): Promise<void> {
  const db = await getDb();
  const { bolt, alloy } = useStore.getState();
  await putCurrencies(db, {
    id: 'singleton',
    bolt: bolt.toJSON(),
    alloy: alloy.toJSON(),
  });
}

/** machine slice を IndexedDB に書き戻す */
export async function syncMachine(): Promise<void> {
  const db = await getDb();
  const { machineLevels } = useStore.getState();
  await Promise.all(
    MACHINE_UPGRADE_KEYS.map((key) => putMachine(db, { key, lv: machineLevels[key] }))
  );
}

/** weapons slice を IndexedDB に書き戻す */
export async function syncWeapons(): Promise<void> {
  const db = await getDb();
  const { weaponLv, initialWeapon } = useStore.getState();
  await putWeapons(db, { id: 'singleton', weaponLv, initialWeapon });
}

/** settings slice を IndexedDB に書き戻す */
export async function syncSettings(): Promise<void> {
  const db = await getDb();
  const { bgmVolume, seVolume, vibrationEnabled, muted } = useStore.getState();
  await putSettings(db, {
    id: 'singleton',
    bgmVolume,
    seVolume,
    vibrationEnabled,
    muted,
  });
}

/** profile slice を IndexedDB に書き戻す */
export async function syncProfile(): Promise<void> {
  const db = await getDb();
  const {
    highestTier,
    highestWave,
    totalPlayTimeSec,
    totalRuns,
    totalEnemiesKilled,
    createdAt,
    lastPlayedAt,
  } = useStore.getState();
  await putProfile(db, {
    id: 'singleton',
    highestTier,
    highestWave,
    totalPlayTimeSec,
    totalRuns,
    totalEnemiesKilled,
    createdAt,
    lastPlayedAt,
    schemaVersion: DB_VERSION,
  });
}

/** patches slice を IndexedDB に書き戻す */
export async function syncPatches(): Promise<void> {
  const db = await getDb();
  const { patches } = useStore.getState();
  // 全パッチを put（count>0 のみ）
  const ops: Promise<void>[] = [];
  for (const entry of patches.values()) {
    if (entry.count > 0) {
      ops.push(putPatch(db, { name: entry.name, tier: entry.tier, count: entry.count }));
    }
  }
  await Promise.all(ops);
}

/** equippedPatches slice を IndexedDB に書き戻す */
export async function syncEquippedPatches(): Promise<void> {
  const db = await getDb();
  const { equippedPatches } = useStore.getState();
  const ops: Promise<void>[] = [];
  for (const [slotIndex, entry] of equippedPatches) {
    ops.push(putEquippedPatch(db, { slotIndex, name: entry.name, tier: entry.tier }));
  }
  await Promise.all(ops);
}

// ---------------------------------------------------------------------------
// ラン終了時一括 flush
// ---------------------------------------------------------------------------

/**
 * ラン終了後（成功 / 撤退 / 全滅）に呼ぶ。
 * currencies / patches / profile を一括書き戻す。
 */
export async function flushAfterRun(): Promise<void> {
  await Promise.all([syncCurrencies(), syncPatches(), syncProfile()]);
}

// ---------------------------------------------------------------------------
// 全永続化 slice flush（visibilitychange / beforeunload 用）
// ---------------------------------------------------------------------------

/** 全永続化 slice を IndexedDB に書き戻す */
export async function flushAll(): Promise<void> {
  await Promise.all([
    syncProfile(),
    syncCurrencies(),
    syncMachine(),
    syncWeapons(),
    syncPatches(),
    syncEquippedPatches(),
    syncSettings(),
  ]);
}

// ---------------------------------------------------------------------------
// visibilitychange (hidden) で全スライスを flush
// ---------------------------------------------------------------------------

/**
 * visibilitychange イベントを購読し、hidden 時に flushAll を呼ぶ。
 * @returns cleanup 関数（アンマウント時に呼ぶこと）
 */
export function setupVisibilityChangeFlush(): () => void {
  const handler = () => {
    if (document.visibilityState === 'hidden') {
      void flushAll();
    }
  };
  document.addEventListener('visibilitychange', handler);
  return () => document.removeEventListener('visibilitychange', handler);
}

// ---------------------------------------------------------------------------
// オートセーブ (主動): store の各 slice 変更を購読し debounced で IndexedDB に書き戻す
// ---------------------------------------------------------------------------

/** 同一 slice 連続更新時の書き込みを束ねるためのデバウンス幅 (ms) */
const AUTOSAVE_DEBOUNCE_MS = 500;

function makeDebounced(label: string, fn: () => Promise<void>): () => void {
  let timer: ReturnType<typeof setTimeout> | null = null;
  return () => {
    if (timer != null) clearTimeout(timer);
    timer = setTimeout(() => {
      fn().catch((err) => {
        console.error(`[autosave:${label}] failed`, err);
      });
    }, AUTOSAVE_DEBOUNCE_MS);
  };
}

/**
 * アプリ起動時に 1 回呼ぶ。
 * - store の各 slice の変化を購読し、 debounced で対応する sync* を呼ぶ
 * - visibilitychange (hidden) で全 slice を flush
 * - beforeunload で best-effort flush
 *
 * cleanup は不要 (アプリ全体ライフサイクル想定)。
 */
export function setupAutoSave(): void {
  setupVisibilityChangeFlush();

  // ブラウザ閉じる直前 best-effort flush
  window.addEventListener('beforeunload', () => {
    void flushAll();
  });

  const saveCurrencies = makeDebounced('currencies', syncCurrencies);
  const saveMachine = makeDebounced('machine', syncMachine);
  const saveWeapons = makeDebounced('weapons', syncWeapons);
  const saveSettings = makeDebounced('settings', syncSettings);
  const saveProfile = makeDebounced('profile', syncProfile);
  const savePatches = makeDebounced('patches', syncPatches);
  const saveEquippedPatches = makeDebounced('equippedPatches', syncEquippedPatches);

  // 1 つの subscribe で全 slice を監視 (差分判定で対応する sync を起動)
  useStore.subscribe((state, prev) => {
    // currencies (bolt / alloy)
    if (state.bolt !== prev.bolt || state.alloy !== prev.alloy) {
      saveCurrencies();
    }
    // machine
    if (state.machineLevels !== prev.machineLevels) {
      saveMachine();
    }
    // weapons
    if (state.weaponLv !== prev.weaponLv || state.initialWeapon !== prev.initialWeapon) {
      saveWeapons();
    }
    // settings
    if (
      state.bgmVolume !== prev.bgmVolume ||
      state.seVolume !== prev.seVolume ||
      state.vibrationEnabled !== prev.vibrationEnabled ||
      state.muted !== prev.muted
    ) {
      saveSettings();
    }
    // profile
    if (
      state.highestTier !== prev.highestTier ||
      state.highestWave !== prev.highestWave ||
      state.totalPlayTimeSec !== prev.totalPlayTimeSec ||
      state.totalRuns !== prev.totalRuns ||
      state.totalEnemiesKilled !== prev.totalEnemiesKilled ||
      state.lastPlayedAt !== prev.lastPlayedAt
    ) {
      saveProfile();
    }
    // patches
    if (state.patches !== prev.patches) {
      savePatches();
    }
    // equipped patches
    if (state.equippedPatches !== prev.equippedPatches) {
      saveEquippedPatches();
    }
  });
}
