import type { DamageEvent, DeathEvent, ProjectileEvent } from '@/components/organisms/BattleField';
import type { SpawnedEnemy } from '@/game/types';

// ---------------------------------------------------------------------------
// BattleEntityStore
// ---------------------------------------------------------------------------
//
// v1.3.7 (Phase 1): バトル中の「タイムリーに変動するゲームエンティティ」 を集約管理する
// 外部 store。 useBattleLoop が tick の末尾で notifyFrame() を呼び、 listener (= BattleField
// 等) に「フレームが進んだ」 ことだけを通知する。
//
// Phase 1 では「中身はまだ immutable」 のまま、 store を介在させるだけ。 既存の React state
// (useBattleLoop の useState) と二重に持つことで、 BattleField の props インターフェースは
// そのまま使い続けられる。
//
// Phase 2 で BattleField が useSyncExternalStore で本 store を直接購読し、 React state は廃止。
// Phase 3 で enemies を mutable 化する。
//
// 設計指針:
//   - getSnapshot() は「version 番号」 を返す (= 配列を返すと tearing リスクあり、 Object.is
//     で安定判定できない)
//   - subscribe(listener) は cleanup 関数を返す (React 19 useSyncExternalStore 規約)
//   - notify は 1 tick = 1 回 (バッチ)。 listener 内で getSnapshot を読んで Object.is で
//     比較 → 値が変わっていれば re-render
//
// 仕様参照: design-docs/tower-like-game/perf-refactor.md
// ---------------------------------------------------------------------------

/**
 * 上位敵 (elite / miniboss / boss) の出現バナー演出イベント。
 * useBattleLoop が spawn 検知時に発火し、 battle 画面が AppearanceBannerFx をマウントする。
 *
 * (useBattleLoop.ts の AppearanceEvent と同型。 store ファイルが hook に依存しないよう、
 *  ここで再定義して export する。 hook 側は本ファイルから import する。)
 */
export interface AppearanceEvent {
  id: string;
  kind: 'elite' | 'miniboss' | 'boss';
  /** 表示用の敵名 (例 "ELITE T1W5"。 battle 画面で生成しても良い) */
  name: string;
}

type Listener = () => void;

/**
 * 削除キューの種別。 useBattleLoop の Fx 完了通知 (onXDone) で「次フレームに events から
 * 取り除く」 ID を積むときに使う。
 *
 * v1.3.7 (Phase 2-A): hook 内の pendingXRemovalsRef × 4 を BattleEntityStore に移管。
 */
export type EventKind = 'damage' | 'death' | 'projectile' | 'appearance';

export class BattleEntityStore {
  // ---- 内部状態 (Phase 1 は immutable のまま、 配列丸ごと差し替え) ----
  private enemies: readonly SpawnedEnemy[] = [];
  private damageEvents: readonly DamageEvent[] = [];
  private deathEvents: readonly DeathEvent[] = [];
  private projectileEvents: readonly ProjectileEvent[] = [];
  private appearanceEvents: readonly AppearanceEvent[] = [];
  private waveElapsedSec: number = 0;

  /** notifyFrame() で +1 されるフレームバージョン。 getSnapshot() の戻り値 */
  private frameVersion: number = 0;
  private listeners: Set<Listener> = new Set();

  /**
   * v1.3.7 (Phase 2-A): Fx 完了通知 (onXDone) からの削除キュー。 種別ごとに Set で持ち、
   * tick 冒頭で consumePendingRemovals() で取り出す。 notify は起こさない (= 再 render
   * しない、 hook 側で events 配列を更新 → tick 末尾の 1 度の notifyFrame で反映)。
   */
  private pendingRemovals: Record<EventKind, Set<string>> = {
    damage: new Set(),
    death: new Set(),
    projectile: new Set(),
    appearance: new Set(),
  };

  // -------------------------------------------------------------------------
  // subscribe / getSnapshot (React.useSyncExternalStore 規約)
  // -------------------------------------------------------------------------

  /**
   * 1 tick が進むたびに listener が 1 回呼ばれる。
   * 戻り値は unsubscribe 関数 (React 19 useSyncExternalStore 規約)。
   */
  subscribe = (listener: Listener): (() => void) => {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  };

  /**
   * getSnapshot は「number」 を返す。 配列を返すと StrictMode の double-invoke で
   * 参照が変わってしまい Object.is で安定しないため。
   * React 側は version 変化を検知したあと、 別途 getXxx() メソッドで実値を読む。
   */
  getSnapshot = (): number => {
    return this.frameVersion;
  };

  // -------------------------------------------------------------------------
  // mutation API (Phase 1: 配列を丸ごと差し替え)
  // -------------------------------------------------------------------------

  setEnemies(enemies: readonly SpawnedEnemy[]): void {
    this.enemies = enemies;
  }

  setDamageEvents(events: readonly DamageEvent[]): void {
    this.damageEvents = events;
  }

  setDeathEvents(events: readonly DeathEvent[]): void {
    this.deathEvents = events;
  }

  setProjectileEvents(events: readonly ProjectileEvent[]): void {
    this.projectileEvents = events;
  }

  setAppearanceEvents(events: readonly AppearanceEvent[]): void {
    this.appearanceEvents = events;
  }

  setWaveElapsedSec(sec: number): void {
    this.waveElapsedSec = sec;
  }

  /**
   * tick 末尾で 1 回だけ呼ぶ。 frameVersion を +1 して全 listener に通知。
   * Phase 1 では useBattleLoop の tick 末尾から呼ばれ、 BattleField はまだ
   * React state 経由なので listener は無 (空 Set)。 Phase 2 から実利用。
   */
  notifyFrame(): void {
    this.frameVersion += 1;
    for (const listener of this.listeners) {
      listener();
    }
  }

  // -------------------------------------------------------------------------
  // getters (Phase 2 で BattleField が listener 内から呼ぶ)
  // -------------------------------------------------------------------------

  getEnemies(): readonly SpawnedEnemy[] {
    return this.enemies;
  }

  getDamageEvents(): readonly DamageEvent[] {
    return this.damageEvents;
  }

  getDeathEvents(): readonly DeathEvent[] {
    return this.deathEvents;
  }

  getProjectileEvents(): readonly ProjectileEvent[] {
    return this.projectileEvents;
  }

  getAppearanceEvents(): readonly AppearanceEvent[] {
    return this.appearanceEvents;
  }

  getWaveElapsedSec(): number {
    return this.waveElapsedSec;
  }

  // -------------------------------------------------------------------------
  // 削除キュー API (Phase 2-A): Fx 完了通知から呼び、 tick 冒頭で hook が flush する
  // -------------------------------------------------------------------------

  /**
   * Fx 完了 ID を削除キューに積む。 notify は起こさない (= 単発の React 再 render を発生
   * させない)。 tick 冒頭で consumePendingRemovals() で取り出し、 hook 側で events 配列を
   * filter → tick 末尾の 1 度の notifyFrame で反映する。
   */
  queueRemoval(kind: EventKind, id: string): void {
    this.pendingRemovals[kind].add(id);
  }

  /**
   * 指定種別の削除キューを取り出して内部 Set をクリアする (atomic)。
   * 戻り値の Set は呼び出し側で読み取り専用に扱う。
   */
  consumePendingRemovals(kind: EventKind): Set<string> {
    const consumed = this.pendingRemovals[kind];
    this.pendingRemovals[kind] = new Set();
    return consumed;
  }

  /** 現在の削除キューサイズ (テスト / debug 用) */
  getPendingRemovalCount(kind: EventKind): number {
    return this.pendingRemovals[kind].size;
  }

  // -------------------------------------------------------------------------
  // テスト用ヘルパー
  // -------------------------------------------------------------------------

  /** 現在の listener 数 (テスト / debug 用) */
  getListenerCount(): number {
    return this.listeners.size;
  }

  /** ラン終了 / Tier 切替などで全状態をリセット */
  reset(): void {
    this.enemies = [];
    this.damageEvents = [];
    this.deathEvents = [];
    this.projectileEvents = [];
    this.appearanceEvents = [];
    this.waveElapsedSec = 0;
    // v1.3.7 (Phase 2-A): 削除キューも掃除 (前ランの Fx onDone が遅れて queue したものを
    // 次ランに持ち越さない)
    this.pendingRemovals = {
      damage: new Set(),
      death: new Set(),
      projectile: new Set(),
      appearance: new Set(),
    };
    // frameVersion はあえてリセットしない (購読側の Object.is で「変化なし」 と
    // 誤判定されないよう単調増加を保つ)。
    this.notifyFrame();
  }
}
