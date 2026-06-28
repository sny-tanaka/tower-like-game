// ---------------------------------------------------------------------------
// perfBus — dev サーバ専用の計測シングルトン
// ---------------------------------------------------------------------------
//
// useBattleLoop の tick callback が markTickStart / markTickEnd / setProjectileCount を呼び、
// PerfOverlay が 1 秒ごとに drainTickStats() で平均/最大を取り出して dev サーバに送信する。
//
// すべての関数は `import.meta.env.DEV` ガード付き。 production ビルドでは Vite が
// `import.meta.env.DEV` を `false` に置換するため、 関数本体は tree-shake で消える。
// 完全に消えなくても、 markTickStart/End は冒頭の早期 return だけが残るので hot path
// (useBattleLoop の tick) のオーバーヘッドは無視できる。
//
// なぜシングルトン?
//   useBattleLoop (ゲームループ) と PerfOverlay (表示) は React 階層上で離れており、
//   props で計測値を流すと「props を流すために再 render」 のコストが乗ってしまう。
//   側道 (module-level シングルトン) でやり取りすれば、 useBattleLoop の hot path には
//   関数呼び出ししか入らず、 PerfOverlay の表示更新は別の rAF で完結する。
// ---------------------------------------------------------------------------

/**
 * 直近 drainTickStats() 以降に積まれた tick (= 1 フレームのゲームロジック処理) の統計。
 * `markTickStart` / `markTickEnd` で 1 区間ぶん積まれる。
 */
interface TickAccum {
  /** tick 区間数 (= 集計期間中の実描画フレーム数。 skipped frame は含まれない) */
  count: number;
  /** 全区間の合計セルフタイム (ms) */
  totalMs: number;
  /** 区間中の最大セルフタイム (ms) */
  maxMs: number;
}

let ticks: TickAccum = { count: 0, totalMs: 0, maxMs: 0 };
let currentTickStartMs: number | null = null;
let lastProjectileCount = 0;

/**
 * フレーム間隔の集計 (rAF callback の冒頭で markFrameInterval を呼んだ wall-clock 差分)。
 *
 * `LOOP` (markTickStart/End) はゲームロジックの純 self time で、
 * React commit / paint / 合成は含まれない。 これに対し `FRAME` は rAF callback 間の
 * 経過 ms を測るため、 React commit + paint + composite まで含む 1 フレーム全工程の総時間。
 *
 * 60 fps が安定していれば `FRAME` は 16.67ms ピッタリに収束する。 fps drop が起きた瞬間は
 * 突発的に 33ms / 50ms 等になるため、 `LOOP` が軽いのに `FRAME.maxMs` が大きいフレームを
 * 見つけられれば「描画/合成側で詰まったフレーム」 を特定できる。
 */
interface FrameAccum {
  /** 集計したフレーム間隔の件数 */
  count: number;
  /** 全フレーム間隔の合計 (ms) */
  totalMs: number;
  /** 最大フレーム間隔 (ms) */
  maxMs: number;
}
let frames: FrameAccum = { count: 0, totalMs: 0, maxMs: 0 };
let prevFrameMs: number | null = null;

/**
 * long-animation-frame (LoAF) の集計。 LoAF は 1 フレーム全工程 (script / styleAndLayout /
 * paint / composite) が **>= 50ms** を超えた場合に PerformanceObserver が報告する Web API。
 *
 * 旧 `longTask` (50ms 超のタスク) は「JS スレッドのブロッキング」 を測るが、 LoAF は
 * 「1 フレーム全体の長さ」 を測る。 描画/合成側で詰まったフレームを直接捉えられる。
 *
 * iOS Safari は 18+ で対応。 PerformanceObserver.supportedEntryTypes に
 * 'long-animation-frame' が無ければ recordLoaf は呼ばれず、 統計は 0 のままになる。
 *
 * scripts[] には各スクリプトの duration breakdown が含まれるが、 ここでは合計のみ集計。
 * (詳細解析が必要になったら drainLoafStats を拡張)
 */
interface LoafAccum {
  /** 集計した LoAF 件数 */
  count: number;
  /** 全 LoAF duration の合計 (ms) */
  totalMs: number;
  /** 最大 LoAF duration (ms) */
  maxMs: number;
  /** LoAF.renderStart - LoAF.startTime の合計 (= フレーム内の script 部分) */
  totalScriptMs: number;
}
let loaf: LoafAccum = { count: 0, totalMs: 0, maxMs: 0, totalScriptMs: 0 };

/**
 * useBattleLoop の tick 冒頭 (shouldDrawFrame を通過した後) で呼ぶ。 production では no-op。
 *
 * 既に markTickStart 中なら (= markTickEnd が呼ばれなかった異常状態) 上書きする。
 * 直前の区間は失われるが、 計測の整合性を優先する (= 異常区間を平均に混ぜない)。
 */
export function markTickStart(): void {
  if (!import.meta.env.DEV) return;
  currentTickStartMs = performance.now();
}

/**
 * useBattleLoop の tick 末尾 (rAF 再予約の直前) で呼ぶ。 production では no-op。
 *
 * markTickStart が呼ばれていない場合は黙って無視 (= フレームスキップ直前の return)。
 */
export function markTickEnd(): void {
  if (!import.meta.env.DEV) return;
  if (currentTickStartMs == null) return;
  const dur = performance.now() - currentTickStartMs;
  currentTickStartMs = null;
  ticks.count += 1;
  ticks.totalMs += dur;
  if (dur > ticks.maxMs) ticks.maxMs = dur;
}

/**
 * tick 内で projectile 数を 1 度だけ書き込む (PerfOverlay が読み取る最後の値)。
 *
 * 1 フレームで複数回呼んでも最後の値だけが使われる (= 最終時点の projectile 数)。
 */
export function setProjectileCount(n: number): void {
  if (!import.meta.env.DEV) return;
  lastProjectileCount = n;
}

/**
 * PerfOverlay が 1 秒ごとに呼ぶ。 直前の集計値を返し、 内部 accumulator をリセットする。
 *
 * count=0 (= この期間に tick が走らなかった) のときは avgMs/maxMs ともに 0 を返す。
 */
export function drainTickStats(): { avgMs: number; maxMs: number; count: number } {
  if (ticks.count === 0) {
    return { avgMs: 0, maxMs: 0, count: 0 };
  }
  const out = {
    avgMs: ticks.totalMs / ticks.count,
    maxMs: ticks.maxMs,
    count: ticks.count,
  };
  ticks = { count: 0, totalMs: 0, maxMs: 0 };
  return out;
}

/** 最新の projectile 数 (PerfOverlay 表示用)。 リセットせず読むだけ。 */
export function getProjectileCount(): number {
  return lastProjectileCount;
}

/**
 * useBattleLoop の rAF callback の冒頭 (shouldDrawFrame の前) で呼ぶ。 production では no-op。
 *
 * 前回呼ばれた時刻との差を「フレーム間隔」 として記録する。 1 回目は記録対象外
 * (基準時刻として保存のみ)。
 */
export function markFrameInterval(nowMs: number): void {
  if (!import.meta.env.DEV) return;
  if (prevFrameMs == null) {
    prevFrameMs = nowMs;
    return;
  }
  const dur = nowMs - prevFrameMs;
  prevFrameMs = nowMs;
  // 異常に大きい値 (タブ非アクティブで rAF が止まっていた等) は集計から除外
  // (= 500ms 超は捨てる)。 これがないと max が瞬間スパイクで巨大化する。
  if (dur > 500) return;
  frames.count += 1;
  frames.totalMs += dur;
  if (dur > frames.maxMs) frames.maxMs = dur;
}

/**
 * PerformanceObserver の long-animation-frame コールバックから呼ぶ。 production では no-op。
 *
 * @param duration LoAF entry の duration (= フレーム全工程の長さ ms)
 * @param scriptDurationMs LoAF entry の renderStart - startTime (= script 部分 ms)。
 *   renderStart が 0 (= rendering されなかった) のときは 0 を渡す。
 */
export function recordLoaf(duration: number, scriptDurationMs: number): void {
  if (!import.meta.env.DEV) return;
  loaf.count += 1;
  loaf.totalMs += duration;
  if (duration > loaf.maxMs) loaf.maxMs = duration;
  loaf.totalScriptMs += scriptDurationMs;
}

/** PerfOverlay が 1 秒ごとに呼ぶ。 直前のフレーム間隔集計を返し、 リセットする。 */
export function drainFrameStats(): { avgMs: number; maxMs: number; count: number } {
  if (frames.count === 0) {
    return { avgMs: 0, maxMs: 0, count: 0 };
  }
  const out = {
    avgMs: frames.totalMs / frames.count,
    maxMs: frames.maxMs,
    count: frames.count,
  };
  frames = { count: 0, totalMs: 0, maxMs: 0 };
  return out;
}

/** PerfOverlay が 1 秒ごとに呼ぶ。 直前の LoAF 集計を返し、 リセットする。 */
export function drainLoafStats(): {
  count: number;
  avgMs: number;
  maxMs: number;
  avgScriptMs: number;
} {
  if (loaf.count === 0) {
    return { count: 0, avgMs: 0, maxMs: 0, avgScriptMs: 0 };
  }
  const out = {
    count: loaf.count,
    avgMs: loaf.totalMs / loaf.count,
    maxMs: loaf.maxMs,
    avgScriptMs: loaf.totalScriptMs / loaf.count,
  };
  loaf = { count: 0, totalMs: 0, maxMs: 0, totalScriptMs: 0 };
  return out;
}

/**
 * テスト用に全 state を初期化する。 production には影響なし (export はしているが
 * useBattleLoop / PerfOverlay からは呼ばれない)。
 */
export function _resetPerfBusForTest(): void {
  ticks = { count: 0, totalMs: 0, maxMs: 0 };
  currentTickStartMs = null;
  lastProjectileCount = 0;
  frames = { count: 0, totalMs: 0, maxMs: 0 };
  prevFrameMs = null;
  loaf = { count: 0, totalMs: 0, maxMs: 0, totalScriptMs: 0 };
}
