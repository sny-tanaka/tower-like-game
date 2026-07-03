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
  // ---- 内部状態 ----
  //
  // v1.3.7 (Phase 3-B): `enemies` は **mutable array** で持つ。 addEnemy で push、 removeEnemy で
  // splice。 useBattleLoop tick 内の 5 段 spread を in-place mutation に書き換えるため、 配列
  // 自体も spread 廃止 + push / splice ベースに揃える。 外部公開は `getEnemies()` で
  // `readonly MutableEnemy[]` として返す (= 読み取り専用ビュー)。
  private enemies: MutableEnemy[] = [];
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
  /**
   * v1.4.8: consumePendingRemovals の double-buffer 用「もう片方」 の Set (種別ごと)。
   * 旧実装は `this.pendingRemovals[kind] = new Set()` で毎フレーム (tick 冒頭 × 4 種別)
   * 新規 Set を生成していたが、 2 個の常駐 Set を swap して使い回す方式に変更する。
   * 呼出し側 (useBattleLoop の tick) は戻り値の Set を同フレーム内の `.filter()` / `.has()` で
   * 消費してすぐ破棄しており、 フレームを跨いで保持しないことを確認済み。
   */
  private pendingRemovalsSwap: Record<EventKind, Set<string>> = {
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
  /**
   * v1.4.8: pendingMovedIds / pendingStatusChangedIds の double-buffer 用「もう片方」 の Set。
   * notifyFrame() 内で毎フレーム `new Set()` していたのを、 2 個の常駐 Set を swap して使い回す
   * 方式に変更 (GC 圧削減)。 詳細は notifyFrame() のコメント参照。
   */
  private pendingMovedIdsSwap: Set<string> = new Set();
  private pendingStatusChangedIdsSwap: Set<string> = new Set();
  /** id → 敵オブジェクト (getEnemyById の O(1) lookup 用) */
  private enemyById: Map<string, SpawnedEnemy> = new Map();
  /** addEnemy / removeEnemy で +1 される、 敵リストの世代番号 */
  private enemyListVersion: number = 0;
  /**
   * v1.4.8: 描画キャップ (MAX_RENDERED_ENEMIES) の可視 ID 集合。
   * `null` = キャップ非発動 (全敵可視、 従来どおり)。 useBattleLoop の tick が 250ms
   * スロットルで計算し `setVisibleEnemyIds` を呼ぶ。 EnemyLayer は `isEnemyVisible(id)` で
   * マウントする sprite を絞り込む (ゲームロジックには一切影響しない、 DOM/GPU コスト削減のみ)。
   */
  private visibleEnemyIds: Set<string> | null = null;
  /**
   * v1.4.8: `visibleEnemyIds` が実際に変化した回数。 EnemyLayer は `enemyListVersion` と
   * 本カウンタの合算値を `getSnapshot` として購読し、 「敵リスト構造が変わった」 か
   * 「可視集合が変わった (敵の増減なしでもキャップ境界を跨いだ)」 いずれかで再 render する。
   */
  private visibleEnemyIdsVersion: number = 0;
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

  /**
   * @deprecated v1.3.7 (Phase 3-C): 本 API は順次廃止予定。 呼び出し側は `clearEnemies()`
   * → `addEnemy(e)` ループに展開してください。 BattleEntityStore.test.ts のみが既存仕様を
   * 検証するために本 API を直接呼びます。 useBattleLoop tick / BattleField stories / tests
   * からの呼び出しは Phase 3-C で全て撤去済み。
   *
   * 内部実装: `clearEnemies()` + 個別 `addEnemy()` のループに展開される。 `enemyListVersion`
   * は内部の addEnemy 経由で個々の敵分が +1 される (= clearEnemies で一度 +1、 N 体 add で
   * +N。 真の世代変化は clearEnemies の +1 が担保)。
   */
  setEnemies(enemies: readonly MutableEnemy[]): void {
    this.clearEnemies();
    for (const e of enemies) {
      this.addEnemy(e);
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
    // 変更を防ぐため、 「今フレーム分の pending id 集合」 を確定させてから iterate する。
    //
    // v1.4.8: 旧実装は `this.pendingMovedIds = new Set()` で毎フレーム新規 Set を生成して
    // いたが、 double-buffer (pendingMovedIdsSwap との swap) に変更して GC 圧を削減する。
    // `movedIds` (= 今フレーム分、 呼出し元スコープのローカル変数) はこのメソッド内の
    // iterate でのみ使われフレームを跨いで保持されない (mark 系メソッドは常に
    // `this.pendingMovedIds` という「現在の書き込み先」 の参照を見るため、 swap 後に
    // 新規 mark が来ても混線しない)。
    if (this.pendingMovedIds.size > 0) {
      const movedIds = this.pendingMovedIds;
      this.pendingMovedIds = this.pendingMovedIdsSwap;
      this.pendingMovedIds.clear();
      this.pendingMovedIdsSwap = movedIds;
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
      this.pendingStatusChangedIds = this.pendingStatusChangedIdsSwap;
      this.pendingStatusChangedIds.clear();
      this.pendingStatusChangedIdsSwap = statusIds;
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

  /**
   * 内部 enemies 配列の **読み取り専用ビュー**。 呼び出し側が破壊的更新しないこと
   * (TypeScript の `readonly MutableEnemy[]` で防ぐ。 配列自体は内部で再利用される)。
   */
  getEnemies(): readonly MutableEnemy[] {
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
   *
   * v1.4.8: 旧実装は `new Set()` で差し替えていたが、 pendingRemovalsSwap との swap に
   * 変更して毎フレーム ×4 種別のアロケーションを無くす。 戻り値の Set (= 旧書き込み先) は
   * 次回 consumePendingRemovals(kind) 呼び出し時に「新しい書き込み先」 として再利用され
   * clear() される。 呼び出し側 (useBattleLoop tick) がこの Set をフレームを跨いで保持
   * しないことを確認済み (同フレーム内で filter/has に使うのみ)。
   */
  consumePendingRemovals(kind: EventKind): Set<string> {
    const consumed = this.pendingRemovals[kind];
    const swap = this.pendingRemovalsSwap[kind];
    swap.clear();
    this.pendingRemovals[kind] = swap;
    this.pendingRemovalsSwap[kind] = consumed;
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
   * 敵を追加する。 内部の enemies 配列に **push** で in-place 追加し、 enemyById index を更新、
   * enemyListVersion を +1 する。 (個別 position / status listener は addEnemy 単体では呼ばない。
   * 必要なら notifyFrame で全体 listener が拾う。)
   *
   * v1.3.7 (Phase 3-B): 旧 `this.enemies = [...this.enemies, enemy]` の配列スプレッドを廃止し
   * `push` に変更。 同フレーム内で多数 spawn しても O(N²) コピーが発生しなくなる。
   */
  addEnemy(enemy: MutableEnemy): void {
    this.enemies.push(enemy);
    this.enemyById.set(enemy.id, enemy);
    this.enemyListVersion += 1;
  }

  /**
   * 敵を削除する。 enemies 配列から id 該当を **splice** で in-place 除去し、 listener Set /
   * snapshot キャッシュもまとめて掃除する。 enemyListVersion を +1 する。
   *
   * v1.3.7 (Phase 3-B): 旧 filter (新配列生成) を splice に変更。 indexOf-then-splice は
   * O(N) だが、 撃破処理は 1 フレームで N 件起きるとそれぞれ O(N) で実質 O(N²) になり得る。
   * 大量撃破フレームで気になる場合は呼び出し側で「死亡 ID をまとめて Set に貯めて 1 度の
   * filter + 再代入」 にする最適化が可能。 当面は push/splice の素直な実装を維持。
   */
  removeEnemy(id: string): void {
    const idx = this.enemies.findIndex((e) => e.id === id);
    if (idx >= 0) {
      this.enemies.splice(idx, 1);
    }
    this.enemyById.delete(id);
    this.enemyPositionListeners.delete(id);
    this.enemyStatusListeners.delete(id);
    this.statusSnapshotCache.delete(id);
    this.pendingMovedIds.delete(id);
    this.pendingStatusChangedIds.delete(id);
    this.enemyListVersion += 1;
  }

  /**
   * 敵リストを **一括クリア** する (Phase 3-B 新設)。 ラン開始 / Tier 切替時、 または
   * `suspendRendering` 復帰時に hook が呼ぶ。 内部の配列・index・listener Set・snapshot cache・
   * pending Set を全て掃除し、 `enemyListVersion` を +1 して購読側に「リスト構造変化」 を通知。
   *
   * 個別の `removeEnemy(id)` を N 回呼ぶより 1 回の clearEnemies のほうが効率的かつ意味が明確
   * (= 「ここで全 reset」 という意図)。
   */
  clearEnemies(): void {
    this.enemies.length = 0;
    this.enemyById.clear();
    this.enemyPositionListeners.clear();
    this.enemyStatusListeners.clear();
    this.statusSnapshotCache.clear();
    this.pendingMovedIds.clear();
    this.pendingStatusChangedIds.clear();
    // v1.4.8: 敵が全クリアされたら可視キャップ集合も破棄 (= 次 Tier 開始時は fast path
    // (null = 全敵可視) から再開する。 古い ID を握ったままでも実害はないが、 意味的に
    // 「敵ゼロなのに可視 ID 集合が残る」 のは不自然なので明示的にリセットする)。
    if (this.visibleEnemyIds !== null) {
      this.visibleEnemyIds = null;
      this.visibleEnemyIdsVersion += 1;
    }
    this.enemyListVersion += 1;
  }

  /**
   * addEnemy / removeEnemy のたびに +1 される世代番号。 「敵リストの構造的変化」 を検知したい
   * 購読側 (BattleField の敵一覧 layer 等) が getSnapshot として使う。
   *
   * v1.3.7 (Phase 3-C): `useSyncExternalStore(subscribe, getEnemyListVersion)` で `this`
   * バインド漏れが起きないようアロー関数として定義 (= `store.getEnemyListVersion` の参照を
   * そのまま渡しても this が外れない)。
   */
  getEnemyListVersion = (): number => {
    return this.enemyListVersion;
  };

  /**
   * v1.4.8: 描画キャップの可視 ID 集合をセットする。 `null` = キャップ非発動 (全敵可視)。
   * 集合が「前回と異なる」 と判定された場合のみ `visibleEnemyIdsVersion` を +1 する
   * (= 同じ集合を再セットしても無駄な再 render を起こさない)。
   *
   * 比較は「両方 null」 「サイズ違い」 「要素の有無」 で判定する簡易差分 (O(N))。 tick 側は
   * 250ms スロットルでしか呼ばないため、 呼び出し頻度自体が低く O(N) 比較のコストは無視できる。
   */
  setVisibleEnemyIds(ids: Set<string> | null): void {
    if (this.visibleEnemyIds === ids) return;
    const changed = !areVisibleIdSetsEqual(this.visibleEnemyIds, ids);
    this.visibleEnemyIds = ids;
    if (changed) {
      this.visibleEnemyIdsVersion += 1;
    }
  }

  /** 現在の可視 ID 集合 (`null` = 全敵可視)。 テスト / debug 用に外部公開。 */
  getVisibleEnemyIds(): Set<string> | null {
    return this.visibleEnemyIds;
  }

  /** 指定 ID の敵が現在マウント対象か。 `visibleEnemyIds === null` なら常に true。 */
  isEnemyVisible(id: string): boolean {
    return this.visibleEnemyIds === null || this.visibleEnemyIds.has(id);
  }

  /**
   * v1.4.8: EnemyLayer の `useSyncExternalStore` 用の統合バージョン。
   * 「敵リスト構造が変わった (enemyListVersion)」 か 「可視集合が変わった
   * (visibleEnemyIdsVersion、 敵の増減なしでもキャップ境界を跨ぐと変化する)」 の
   * いずれかで単調増加する合成値を返す。 `getSnapshot` は number 1 個しか比較できない
   * (useSyncExternalStore の Object.is 制約) ため、 2 つのカウンタを乗算合成する。
   *
   * アロー関数化の理由は `getEnemyListVersion` と同じ (this バインド漏れ防止)。
   */
  getEnemyListAndVisibilityVersion = (): number => {
    // 各カウンタは単調増加の非負整数。 十分大きな係数で桁を分離して衝突を避ける
    // (実運用で visibleEnemyIdsVersion が 1e6 回変化することは現実的にない)。
    return this.enemyListVersion * 1_000_000 + this.visibleEnemyIdsVersion;
  };

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
    // v1.3.7 (Phase 3-B): 敵周りの内部状態クリアは `clearEnemies()` に統合
    // (enemies / enemyById / listeners / pending / snapshotCache / enemyListVersion++)。
    this.clearEnemies();
    this.damageEvents = [];
    this.deathEvents = [];
    this.projectileEvents = [];
    this.appearanceEvents = [];
    this.waveElapsedSec = 0;
    // v1.3.7 (Phase 2-A): 削除キューも掃除 (前ランの Fx onDone が遅れて queue したものを
    // 次ランに持ち越さない)。 v1.4.8: reset() は低頻度パス (ラン開始/終了) なのでここでの
    // 新規 Set 生成は許容 (double-buffer 対象外)。 swap 側も一緒に空にしておく
    // (実害はないが、 次回 consumePendingRemovals で確実にクリーンな Set から始めるため)。
    this.pendingRemovals = {
      damage: new Set(),
      death: new Set(),
      projectile: new Set(),
      appearance: new Set(),
    };
    this.pendingRemovalsSwap = {
      damage: new Set(),
      death: new Set(),
      projectile: new Set(),
      appearance: new Set(),
    };
    // frameVersion / enemyListVersion はあえてリセットしない (購読側の Object.is で「変化
    // なし」 と誤判定されないよう単調増加を保つ)。
    this.notifyFrame();
  }
}

/**
 * v1.4.8: 2 つの可視 ID 集合 (`null` = 全敵可視) が「同じ内容」 か判定する。
 * `setVisibleEnemyIds` が無駄な `visibleEnemyIdsVersion` 加算 (= 無駄な EnemyLayer 再 render)
 * を避けるために使う。 named export してテストからも直接検証できるようにする。
 */
export function areVisibleIdSetsEqual(a: Set<string> | null, b: Set<string> | null): boolean {
  if (a === b) return true;
  if (a === null || b === null) return false;
  if (a.size !== b.size) return false;
  for (const id of a) {
    if (!b.has(id)) return false;
  }
  return true;
}
