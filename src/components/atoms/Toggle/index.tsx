import styles from './style.module.scss';

// ---------------------------------------------------------------------------
// 型定義
// ---------------------------------------------------------------------------

/** ON 時のアクセントカラー */
export type ToggleAccent = 'primary' | 'secondary' | 'success' | 'disabled';

/** スイッチのサイズ */
export type ToggleSize = 'sm' | 'md';

export type ToggleProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
  /** ラベル下部のサブ説明文 */
  description?: string;
  /**
   * ON 時のアクセントカラー。デフォルト primary。
   * 'disabled' を指定すると常にグレー (永続的に操作不可表示にしたいとき用)。
   */
  accent?: ToggleAccent;
  /** スイッチのサイズ。デフォルト md */
  size?: ToggleSize;
};

export const Toggle = ({
  checked,
  onChange,
  disabled = false,
  label,
  description,
  accent = 'primary',
  size = 'md',
}: ToggleProps) => {
  // accent='disabled' は常に操作不可扱い
  const isDisabled = disabled || accent === 'disabled';

  const handleChange = () => {
    if (isDisabled) return;
    onChange(!checked);
  };

  return (
    <label
      className={[styles.wrapper, isDisabled ? styles.disabled : ''].filter(Boolean).join(' ')}
      aria-disabled={isDisabled}
    >
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-disabled={isDisabled}
        className={[
          styles.switch,
          checked ? styles.on : styles.off,
          styles[`size_${size}`],
          styles[`accent_${accent}`],
        ]
          .filter(Boolean)
          .join(' ')}
        onClick={handleChange}
        disabled={isDisabled}
      >
        <span className={styles.knob} />
      </button>
      {(label || description) && (
        <span className={styles.labelGroup}>
          {label && <span className={styles.label}>{label}</span>}
          {description && <span className={styles.description}>{description}</span>}
        </span>
      )}
    </label>
  );
};
