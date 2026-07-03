// ---------------------------------------------------------------------------
// crashSnapshot — production でも使えるクラッシュ検知 + 直前状態スナップショット
// ---------------------------------------------------------------------------
//
// v1.4.8: iOS 実機のメモリ枯渇 (jetsam) による白画面落ちの原因調査用。
// 既存の perfBus (src/lib/perfBus.ts) は `import.meta.env.DEV` ガード付きで
// dev サーバ専用のため、 production では使えない。 本モジュールは
// `diagnosticsEnabled` の ON/OFF に関わらず常時動作し (コストは 5 秒毎の小さな
// JSON 書き込みのみ)、 「前回のラン中に異常終了 (jetsam / クラッシュ / タブ強制終了等)
// したか」 を次回起動時に判定できるようにする。
//
// 検知の仕組み:
//   - ラン開始 (isRunActive: false → true) で localStorage に「ラン中」 フラグを立てる
//   - ラン正常終了 (isRunActive: true → false) でフラグを消す
//   - 次回起動時 (initCrashDetection) にフラグが残っていれば
//     「前回はラン中に正常終了しなかった」 と判定し、 直前に保存されていたスナップショットを
//     「クラッシュ記録」 として確定保存する (最新 3 件までローテーション)
//
// 依存方向:
//   本モジュールは battle slice / BattleEntityStore を一切 import しない。
//   「今どんな値を保存すべきか」 は呼び出し側 (useDiagnosticsStats など battle 画面に
//   近い層) が `CrashSnapshotData` を組み立てて `saveSnapshot()` に渡す形にする
//   (= 依存が diagnostics → battle 側ではなく battle 側 → diagnostics の一方向になる)。
// ---------------------------------------------------------------------------

/** localStorage キー: 「ラン中」 フラグ (存在する間は最後に正常終了していない) */
const RUN_ACTIVE_FLAG_KEY = 'diag_run_active_flag_v1';
/** localStorage キー: 直近スナップショット (ラン中 5 秒毎 + wave 変化時に上書き) */
const LATEST_SNAPSHOT_KEY = 'diag_latest_snapshot_v1';
/** localStorage キー: 確定したクラッシュ記録一覧 (最新 3 件) */
const CRASH_LOG_KEY = 'diag_crash_log_v1';

/** クラッシュ記録として保持する最大件数 */
const MAX_CRASH_LOG_ENTRIES = 3;

/** ラン中スナップショットの JSON 構造 */
export interface CrashSnapshotData {
  tier: number;
  wave: number;
  runElapsedSec: number;
  /** 装備中の武器 (currentWeapon) */
  weapon: string;
  enemyCount: number;
  fxEventCount: number;
  /** Chrome 限定。 取れない環境では null */
  heapMB: number | null;
  appVersion: string;
}

/** 確定したクラッシュ記録 (スナップショット + 保存時刻) */
export interface CrashRecord extends CrashSnapshotData {
  /** スナップショットが保存された時刻 (ISO 8601) */
  savedAt: string;
}

// ---------------------------------------------------------------------------
// localStorage アクセス (壊れた JSON / 例外は握りつぶして安全側に倒す)
// ---------------------------------------------------------------------------

function safeGetItem(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeSetItem(key: string, value: string): void {
  try {
    localStorage.setItem(key, value);
  } catch {
    // 容量超過 / private mode 等は無視 (診断機能の失敗でアプリを壊さない)
  }
}

function safeRemoveItem(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch {
    // 無視
  }
}

// ---------------------------------------------------------------------------
// クラッシュ検知
// ---------------------------------------------------------------------------

/**
 * アプリ起動時に 1 回だけ呼ぶ (src/main.tsx から)。
 *
 * 「ラン中」 フラグが残っていれば前回はラン中に異常終了したと判定し、
 * 直近スナップショットをクラッシュ記録として確定保存する。 判定後はフラグ・
 * 直近スナップショットともにクリアする (= 次回起動での誤検知を防ぐ)。
 *
 * `diagnosticsEnabled` に関わらず常に呼んでよい (呼び出しコストは localStorage
 * read 数回のみ)。
 */
export function initCrashDetection(): void {
  const flag = safeGetItem(RUN_ACTIVE_FLAG_KEY);
  if (flag === '1') {
    const latestRaw = safeGetItem(LATEST_SNAPSHOT_KEY);
    if (latestRaw != null) {
      try {
        const data = JSON.parse(latestRaw) as CrashSnapshotData;
        appendCrashRecord(data);
      } catch {
        // 壊れた JSON は記録せず読み捨てる
      }
    }
  }
  // 判定が終わったら状態をクリア (フラグ + 直近スナップショット)
  safeRemoveItem(RUN_ACTIVE_FLAG_KEY);
  safeRemoveItem(LATEST_SNAPSHOT_KEY);
}

/**
 * ラン開始時 (isRunActive: false → true) に呼ぶ。 「ラン中」 フラグを立てる。
 */
export function markRunStarted(): void {
  safeSetItem(RUN_ACTIVE_FLAG_KEY, '1');
}

/**
 * ラン正常終了時 (isRunActive: true → false) に呼ぶ。
 * フラグと直近スナップショットの両方をクリアする (= 正常終了は記録に残さない)。
 */
export function markRunEnded(): void {
  safeRemoveItem(RUN_ACTIVE_FLAG_KEY);
  safeRemoveItem(LATEST_SNAPSHOT_KEY);
}

// ---------------------------------------------------------------------------
// スナップショット保存 / クラッシュ記録
// ---------------------------------------------------------------------------

/**
 * ラン中 5 秒間隔 + wave 変化時に呼ぶ。 直近スナップショットを上書き保存する。
 * ラン中でない (markRunStarted していない) 状態で呼んでも実害はない
 * (次回起動時の判定はフラグの有無で決まるため)。
 */
export function saveSnapshot(data: CrashSnapshotData): void {
  safeSetItem(LATEST_SNAPSHOT_KEY, JSON.stringify(data));
}

/** クラッシュ記録一覧を先頭 (最新) に追加し、 最大件数でローテーションする */
function appendCrashRecord(data: CrashSnapshotData): void {
  const record: CrashRecord = {
    ...data,
    savedAt: new Date().toISOString(),
  };
  const existing = getCrashLog();
  const next = [record, ...existing].slice(0, MAX_CRASH_LOG_ENTRIES);
  safeSetItem(CRASH_LOG_KEY, JSON.stringify(next));
}

/** 確定済みのクラッシュ記録一覧を新しい順で返す (最大 3 件) */
export function getCrashLog(): CrashRecord[] {
  const raw = safeGetItem(CRASH_LOG_KEY);
  if (raw == null) return [];
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed as CrashRecord[];
  } catch {
    return [];
  }
}

/** 設定画面の「クリア」 ボタンから呼ぶ。 クラッシュ記録を全消去する。 */
export function clearCrashLog(): void {
  safeRemoveItem(CRASH_LOG_KEY);
}

// ---------------------------------------------------------------------------
// 表示用フォーマット
// ---------------------------------------------------------------------------

/** 先頭 1 文字だけ大文字化 (weapon 文字列を "Laser" のように表示するため) */
function capitalize(s: string): string {
  if (s.length === 0) return s;
  return s[0]!.toUpperCase() + s.slice(1);
}

/** 秒数を「12分34秒」形式にフォーマットする */
function formatElapsed(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}分${s}秒`;
}

/** 保存時刻 (ISO) を「YYYY/MM/DD HH:mm」形式の日本語表記でフォーマットする */
function formatSavedAt(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}/${pad(d.getMonth() + 1)}/${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

/**
 * 設定画面の「前回の異常終了」 表示用に 1 行のサマリ文字列を組み立てる。
 * 例: "T5 W30 / 12分34秒経過 / Laser / 敵42 / Fx180 / v1.4.7 / 2026/07/03 21:04"
 */
export function formatCrashRecord(record: CrashRecord): string {
  const parts = [
    `T${record.tier} W${record.wave}`,
    `${formatElapsed(record.runElapsedSec)}経過`,
    capitalize(record.weapon),
    `敵${record.enemyCount}`,
    `Fx${record.fxEventCount}`,
    `v${record.appVersion}`,
    formatSavedAt(record.savedAt),
  ];
  return parts.join(' / ');
}

// ---------------------------------------------------------------------------
// テスト用ユーティリティ
// ---------------------------------------------------------------------------

/** テスト間で localStorage 状態をリセットするためのキー一覧 (テストファイル専用) */
export const _CRASH_SNAPSHOT_STORAGE_KEYS = [
  RUN_ACTIVE_FLAG_KEY,
  LATEST_SNAPSHOT_KEY,
  CRASH_LOG_KEY,
] as const;
