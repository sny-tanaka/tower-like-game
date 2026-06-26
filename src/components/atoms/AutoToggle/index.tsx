import styles from './style.module.scss';

// ---------------------------------------------------------------------------
// 型定義
// ---------------------------------------------------------------------------

export interface AutoToggleProps {
  /** AUTO ON/OFF */
  enabled: boolean;
  /** クリック時のコールバック。 次の状態 (= !enabled) が引数に渡る */
  onToggle: (next: boolean) => void;
  /** カスタム aria-label。 省略時は "AUTO ON" / "AUTO OFF" */
  ariaLabel?: string;
}

// ---------------------------------------------------------------------------
// コンポーネント
// ---------------------------------------------------------------------------

/**
 * AutoToggle
 *
 * AUTO 機能の ON/OFF を切り替える pill 形ボタン。
 * - ラベルは常に "AUTO" 固定 (非活性時も MANUAL に切り替わらない)
 * - ON 時は紫アクセント (secondary) で発光、 OFF 時はグレー
 * - 戦闘 HUD のアクティブスキル AUTO 切替 (BattleHudBottom) と
 *   ラン中ワークショップの各カード AUTO トグル (UpgradeCard) で共用される。
 */
export function AutoToggle({ enabled, onToggle, ariaLabel }: AutoToggleProps) {
  const label = ariaLabel ?? `AUTO ${enabled ? 'ON' : 'OFF'}`;
  return (
    <button
      type="button"
      className={`${styles.root} ${enabled ? styles.on : ''}`}
      onClick={() => onToggle(!enabled)}
      aria-pressed={enabled}
      aria-label={label}
      title={label}
    >
      AUTO
    </button>
  );
}
