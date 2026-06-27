import type { DamageEvent, DeathEvent, ProjectileEvent } from '@/components/organisms/BattleField';
import type { EnemyKind, MutableEnemy, NormalSubtype, SpawnedEnemy } from '@/game/types';

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

/**
 * v1.3.7 (Phase 3-A): `getEnemyStatusSnapshot(id)` の戻り値型。 `useSyncExternalStore` の
 * `Object.is` 安定判定のため、 同一フレーム内で同じ参照を返すよう `BattleEntityStore` が
 * Map にキャッシュする。
 */
export interface EnemyStatusSnapshot {
  hpRatio: number;
  kind: EnemyKind;
  subtype?: NormalSubtype;
  isFrozen: boolean;
  isBurning: boolean;
  thunderStacks?: number;
}

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
  // v1.3.7 (Phase 3-A): 敵単位の listener / mutation
  // -------------------------------------------------------------------------
  //
  // 設計意図: Phase 3-B 以降、 敵の position / 状態異常は in-place mutation で更新する。
  // 全体 listener (this.listeners) で全 BattleField を再 render するのではなく、 「動いた敵」
  // 「状態異常が変わった敵」 だけが listener を通じて自身を再 render する。
  //
  // mark 系メソッドは内部 Set にバッファするだけで notify しない。 1 tick 末尾の
  // notifyFrame() でまとめて呼ぶ (= 1 tick = 1 回の React 再 render に保つ)。

  /** id → 「位置が変わった敵」 を購読する listener Set */
  private enemyPositionListeners: Map<string, Set<Listener>> = new Map();
  /** id → 「状態異常 / HP が変わった敵」 を購読する listener Set */
  private enemyStatusListeners: Map<string, Set<Listener>> = new Map();
  /** id → 敵オブジェクト (getEnemyById の O(1) lookup 用) */
  private enemyById: Map<string, SpawnedEnemy> = new Map();
  /** addEnemy / removeEnemy で +1 される、 敵リストの世代番号 */
  private enemyListVersion: number = 0;
  /** notifyFrame で flush する markEnemyMoved の id 集合 */
  private pendingMovedIds: Set<string> = new Set();
  /** notifyFrame で flush する markEnemyStatusChanged の id 集合 */
  private pendingStatusChangedIds: Set<string> = new Set();
  /**
   * id → status snapshot のキャッシュ。 lazy 方式: `markEnemyStatusChanged(id)` で当該 id
   * のキャッシュを破棄し、 次回 `getEnemyStatusSnapshot(id)` で再計算する。 これにより
   * `useSyncExternalStore` の `Object.is` 比較で「変わってない敵は同じ参照」 となる。
   */
  private statusSnapshotCache: Map<string, EnemyStatusSnapshot> = new Map();

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
    // v1.3.7 (Phase 3-A): enemyById index も同期する。 個別 listener は呼ばない
    // (Phase 3-B で setEnemies の意味を見直す予定)。
    this.enemyById.clear();
    for (const e of enemies) {
      this.enemyById.set(e.id, e);
    }
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
   *
   * v1.3.7 (Phase 3-A): 全体 listener に加えて、 markEnemyMoved / markEnemyStatusChanged
   * で積まれた id 集合に対応する敵単位 listener も呼ぶ (一括通知)。 敵単位 listener が
   * 1 件もない id でも積みっぱなしにならないよう、 通知後は pending Set を空にする。
   */
  notifyFrame(): void {
    this.frameVersion += 1;
    for (const listener of this.listeners) {
      listener();
    }

    // 敵単位 listener の一括通知 (Phase 3-A)。 listener 内 set state による listener 集合の
    // 変更を防ぐため、 Set を一度コピーしてから iterate する。
    if (this.pendingMovedIds.size > 0) {
      const movedIds = this.pendingMovedIds;
      this.pendingMovedIds = new Set();
      for (const id of movedIds) {
        const set = this.enemyPositionListeners.get(id);
        if (!set || set.size === 0) continue;
        for (const listener of [...set]) {
          listener();
        }
      }
    }
    if (this.pendingStatusChangedIds.size > 0) {
      const statusIds = this.pendingStatusChangedIds;
      this.pendingStatusChangedIds = new Set();
      for (const id of statusIds) {
        const set = this.enemyStatusListeners.get(id);
        if (!set || set.size === 0) continue;
        for (const listener of [...set]) {
          listener();
        }
      }
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
  // v1.3.7 (Phase 3-A): 敵単位 subscribe / mutation
  // -------------------------------------------------------------------------

  /**
   * 指定 ID の敵の「位置」 を購読する。 戻り値は unsubscribe 関数。
   * mark + notifyFrame までは呼ばれない (= 1 tick = 高々 1 回)。
   */
  subscribeEnemyPosition = (id: string, listener: Listener): (() => void) => {
    let set = this.enemyPositionListeners.get(id);
    if (!set) {
      set = new Set();
      this.enemyPositionListeners.set(id, set);
    }
    set.add(listener);
    return () => {
      const s = this.enemyPositionListeners.get(id);
      if (!s) return;
      s.delete(listener);
      if (s.size === 0) {
        this.enemyPositionListeners.delete(id);
      }
    };
  };

  /**
   * 指定 ID の敵の「状態 (HP / 状態異常)」 を購読する。 戻り値は unsubscribe 関数。
   */
  subscribeEnemyStatus = (id: string, listener: Listener): (() => void) => {
    let set = this.enemyStatusListeners.get(id);
    if (!set) {
      set = new Set();
      this.enemyStatusListeners.set(id, set);
    }
    set.add(listener);
    return () => {
      const s = this.enemyStatusListeners.get(id);
      if (!s) return;
      s.delete(listener);
      if (s.size === 0) {
        this.enemyStatusListeners.delete(id);
      }
    };
  };

  /**
   * 「この敵は今フレームに動いた」 ことを記録する。 notify は起こさず Set に積むだけ。
   * notifyFrame() で対応する subscribeEnemyPosition の listener が呼ばれる。
   */
  markEnemyMoved(id: string): void {
    this.pendingMovedIds.add(id);
  }

  /**
   * 「この敵は今フレームに状態 (HP / 状態異常) が変わった」 ことを記録する。 notify は起こさず
   * Set に積むだけ。 同時に status snapshot のキャッシュを破棄して次回 read 時に再計算する。
   */
  markEnemyStatusChanged(id: string): void {
    this.pendingStatusChangedIds.add(id);
    this.statusSnapshotCache.delete(id);
  }

  /**
   * 敵を追加する。 内部の enemies 配列と enemyById index を更新し、 enemyListVersion を +1。
   * (個別 position / status listener は addEnemy 単体では呼ばない。 必要なら notifyFrame で
   *  全体 listener が拾う。)
   */
  addEnemy(enemy: MutableEnemy): void {
    this.enemies = [...this.enemies, enemy];
    this.enemyById.set(enemy.id, enemy);
    this.enemyListVersion += 1;
  }

  /**
   * 敵を削除する。 enemies 配列から id を filter で外し、 listener Set / snapshot キャッシュ
   * もまとめて掃除する。 enemyListVersion を +1。
   */
  removeEnemy(id: string): void {
    this.enemies = this.enemies.filter((e) => e.id !== id);
    this.enemyById.delete(id);
    this.enemyPositionListeners.delete(id);
    this.enemyStatusListeners.delete(id);
    this.statusSnapshotCache.delete(id);
    this.pendingMovedIds.delete(id);
    this.pendingStatusChangedIds.delete(id);
    this.enemyListVersion += 1;
  }

  /**
   * addEnemy / removeEnemy のたびに +1 される世代番号。 「敵リストの構造的変化」 を検知したい
   * 購読側 (BattleField の敵一覧 layer 等) が getSnapshot として使う。
   */
  getEnemyListVersion(): number {
    return this.enemyListVersion;
  }

  /** id → 敵オブジェクトの O(1) lookup */
  getEnemyById(id: string): MutableEnemy | undefined {
    return this.enemyById.get(id);
  }

  /**
   * 指定 ID の敵の「描画に必要な状態」 のスナップショットを返す。
   *
   * `useSyncExternalStore` の `Object.is` 安定判定のため、 `markEnemyStatusChanged(id)` で
   * 明示的に invalidate されるまでは同じ参照を返す lazy キャッシュ方式 (= 状態異常が変わって
   * いない敵は再 render されない)。 該当 id の敵が居ない場合は null を返す。
   */
  getEnemyStatusSnapshot(id: string): EnemyStatusSnapshot | null {
    const cached = this.statusSnapshotCache.get(id);
    if (cached !== undefined) return cached;
    const enemy = this.enemyById.get(id);
    if (!enemy) return null;
    // BigNum → number 変換は EnemyLayer の既存パターンに揃える (parseFloat(toString()))。
    // 表示用比率なので精度は十分。
    const hpNum = parseFloat(enemy.hp.toString());
    const maxHpNum = Math.max(0.0001, parseFloat(enemy.maxHp.toString()));
    const hpRatio = Math.max(0, Math.min(1, hpNum / maxHpNum));
    // isFrozen / isBurning は「タイマーが定義されている (= 期限切れリセット前)」 で判定する。
    // タイマー期限切れは hook 側で enemy.frozenUntilMs = undefined に戻して
    // markEnemyStatusChanged(id) を呼ぶ運用 (Phase 3-B 担当)。
    const isFrozen = enemy.frozenUntilMs !== undefined;
    const isBurning = enemy.burnUntilMs !== undefined;
    const snapshot: EnemyStatusSnapshot = {
      hpRatio,
      kind: enemy.kind,
      subtype: enemy.subtype,
      isFrozen,
      isBurning,
      thunderStacks: enemy.thunderStacks,
    };
    this.statusSnapshotCache.set(id, snapshot);
    return snapshot;
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
    // v1.3.7 (Phase 3-A): 敵単位の内部状態も掃除する。 enemyListVersion は frameVersion と
    // 同じく単調増加を保つ (購読側の Object.is 誤判定を避ける)。
    this.enemyPositionListeners.clear();
    this.enemyStatusListeners.clear();
    this.enemyById.clear();
    this.pendingMovedIds.clear();
    this.pendingStatusChangedIds.clear();
    this.statusSnapshotCache.clear();
    // frameVersion / enemyListVersion はあえてリセットしない (購読側の Object.is で「変化
    // なし」 と誤判定されないよう単調増加を保つ)。
    this.notifyFrame();
  }
}
