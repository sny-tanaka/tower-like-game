// @vitest-environment jsdom
import { beforeEach, describe, expect, it } from 'vitest';

import {
  _CRASH_SNAPSHOT_STORAGE_KEYS,
  clearCrashLog,
  formatCrashRecord,
  getCrashLog,
  initCrashDetection,
  markRunEnded,
  markRunStarted,
  saveSnapshot,
  type CrashRecord,
  type CrashSnapshotData,
} from '@/lib/diagnostics/crashSnapshot';

// ---------------------------------------------------------------------------
// Setup: テストごとに localStorage をクリーン状態に戻す
// ---------------------------------------------------------------------------

beforeEach(() => {
  for (const key of _CRASH_SNAPSHOT_STORAGE_KEYS) {
    localStorage.removeItem(key);
  }
});

function makeSnapshot(overrides: Partial<CrashSnapshotData> = {}): CrashSnapshotData {
  return {
    tier: 5,
    wave: 30,
    runElapsedSec: 754,
    weapon: 'laser',
    enemyCount: 42,
    fxEventCount: 180,
    heapMB: 512.3,
    appVersion: '1.4.7',
    ...overrides,
  };
}

// ---------------------------------------------------------------------------
// ① ラン開始 → 正常終了でフラグが残らない
// ---------------------------------------------------------------------------

describe('crashSnapshot: 正常終了フロー', () => {
  it('ラン開始→正常終了→再 init しても crashLog が増えない', () => {
    markRunStarted();
    saveSnapshot(makeSnapshot());
    markRunEnded();

    // 次回起動を模擬
    initCrashDetection();

    expect(getCrashLog()).toEqual([]);
  });
});

// ---------------------------------------------------------------------------
// ② ラン開始→(終了せず) 再 init で異常終了と判定されクラッシュ記録が確定する
// ---------------------------------------------------------------------------

describe('crashSnapshot: 異常終了フロー', () => {
  it('ラン開始→終了せず再 init すると直近スナップショットがクラッシュ記録になる', () => {
    markRunStarted();
    saveSnapshot(makeSnapshot({ tier: 5, wave: 30, enemyCount: 42 }));

    // markRunEnded を呼ばずに次回起動を模擬 (= 異常終了)
    initCrashDetection();

    const log = getCrashLog();
    expect(log).toHaveLength(1);
    expect(log[0]).toMatchObject({
      tier: 5,
      wave: 30,
      enemyCount: 42,
      appVersion: '1.4.7',
    });
    expect(typeof log[0]!.savedAt).toBe('string');
  });

  it('異常終了判定後はフラグがクリアされ、次の init では記録が増えない', () => {
    markRunStarted();
    saveSnapshot(makeSnapshot());
    initCrashDetection();
    expect(getCrashLog()).toHaveLength(1);

    // フラグは判定後クリアされているはずなので、再度 init しても記録は増えない
    initCrashDetection();
    expect(getCrashLog()).toHaveLength(1);
  });

  it('スナップショットが一度も保存されないまま異常終了扱いになった場合は記録を追加しない', () => {
    markRunStarted();
    // saveSnapshot を一度も呼ばない
    initCrashDetection();

    expect(getCrashLog()).toEqual([]);
  });
});

// ---------------------------------------------------------------------------
// ③ 記録が 3 件でローテーションする
// ---------------------------------------------------------------------------

describe('crashSnapshot: クラッシュ記録のローテーション', () => {
  it('4 回連続でクラッシュすると最新 3 件のみ保持される (古い順に消える)', () => {
    for (let i = 0; i < 4; i++) {
      markRunStarted();
      saveSnapshot(makeSnapshot({ wave: i + 1 }));
      initCrashDetection();
    }

    const log = getCrashLog();
    expect(log).toHaveLength(3);
    // 新しい順 (先頭が最新) : wave=4,3,2 が残り、 wave=1 (最古) は消える
    expect(log.map((r) => r.wave)).toEqual([4, 3, 2]);
  });
});

// ---------------------------------------------------------------------------
// ④ スナップショットの保存/読出し round-trip
// ---------------------------------------------------------------------------

describe('crashSnapshot: スナップショットの round-trip', () => {
  it('saveSnapshot で保存した内容が異常終了判定時にそのまま復元される', () => {
    const data = makeSnapshot({
      tier: 3,
      wave: 15,
      runElapsedSec: 321,
      weapon: 'cutter',
      enemyCount: 7,
      fxEventCount: 99,
      heapMB: null,
      appVersion: '1.4.7',
    });
    markRunStarted();
    saveSnapshot(data);
    initCrashDetection();

    const log = getCrashLog();
    expect(log[0]).toMatchObject(data);
  });

  it('saveSnapshot を複数回呼ぶと最後の値だけが記録される', () => {
    markRunStarted();
    saveSnapshot(makeSnapshot({ wave: 1 }));
    saveSnapshot(makeSnapshot({ wave: 2 }));
    saveSnapshot(makeSnapshot({ wave: 3 }));
    initCrashDetection();

    const log = getCrashLog();
    expect(log[0]?.wave).toBe(3);
  });
});

// ---------------------------------------------------------------------------
// clearCrashLog
// ---------------------------------------------------------------------------

describe('crashSnapshot: clearCrashLog', () => {
  it('クラッシュ記録を全消去できる', () => {
    markRunStarted();
    saveSnapshot(makeSnapshot());
    initCrashDetection();
    expect(getCrashLog()).toHaveLength(1);

    clearCrashLog();
    expect(getCrashLog()).toEqual([]);
  });
});

// ---------------------------------------------------------------------------
// formatCrashRecord
// ---------------------------------------------------------------------------

describe('crashSnapshot: formatCrashRecord', () => {
  it('仕様例に沿った 1 行サマリを組み立てる', () => {
    const record: CrashRecord = {
      tier: 5,
      wave: 30,
      runElapsedSec: 754, // 12分34秒
      weapon: 'laser',
      enemyCount: 42,
      fxEventCount: 180,
      heapMB: 512.3,
      appVersion: '1.4.7',
      savedAt: '2026-07-03T12:04:00.000Z',
    };
    const summary = formatCrashRecord(record);
    expect(summary).toContain('T5 W30');
    expect(summary).toContain('12分34秒経過');
    expect(summary).toContain('Laser');
    expect(summary).toContain('敵42');
    expect(summary).toContain('Fx180');
    expect(summary).toContain('v1.4.7');
  });
});
