import styles from './style.module.scss';

// ---------------------------------------------------------------------------
// DiagnosticsOverlay — production でも使える戦闘中ミニ診断オーバーレイ (v1.4.8)
// ---------------------------------------------------------------------------
//
// 設定画面の「診断モード」トグルが ON のときだけ battle Page から表示される Atom。
// 表示専用 (props で値を受けるだけ、 内部で store / rAF 等には一切触れない)。
// データ収集は `src/lib/diagnostics/useDiagnosticsStats.ts` (battle page 側の hook) が担う。
//
// 既存の PerfOverlay (画面右上、 dev サーバ専用) とは表示位置を分ける
// (画面左下に配置し、 HUD / PerfOverlay と重ならないようにする)。
// ---------------------------------------------------------------------------

export interface DiagnosticsOverlayProps {
  fps: number;
  enemyCount: number;
  fxEventCount: number;
  domCount: number;
  /** Chrome 限定。 null のときは HEAP 行自体を表示しない */
  heapMB: number | null;
}

/** byte 単位ではなく既に MB 換算済みの数値を小数 1 桁で表示 */
function formatMB(mb: number): string {
  return mb.toFixed(1);
}

export function DiagnosticsOverlay({
  fps,
  enemyCount,
  fxEventCount,
  domCount,
  heapMB,
}: DiagnosticsOverlayProps) {
  return (
    <div
      className={styles.root}
      role="status"
      aria-label="Diagnostics overlay"
    >
      <div className={styles.row}>
        <span className={styles.label}>FPS</span>
        <span className={styles.value}>{fps}</span>
      </div>
      <div className={styles.row}>
        <span className={styles.label}>ENEMIES</span>
        <span className={styles.value}>{enemyCount}</span>
      </div>
      <div className={styles.row}>
        <span className={styles.label}>FX</span>
        <span className={styles.value}>{fxEventCount}</span>
      </div>
      <div className={styles.row}>
        <span className={styles.label}>DOM</span>
        <span className={styles.value}>{domCount}</span>
      </div>
      {heapMB != null && (
        <div className={styles.row}>
          <span className={styles.label}>HEAP</span>
          <span className={styles.value}>{formatMB(heapMB)}MB</span>
        </div>
      )}
    </div>
  );
}
