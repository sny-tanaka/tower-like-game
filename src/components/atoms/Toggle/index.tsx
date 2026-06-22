import styles from './style.module.scss';

export type ToggleProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
};

export const Toggle = ({ checked, onChange, disabled = false, label }: ToggleProps) => {
  const handleChange = () => {
    if (disabled) return;
    onChange(!checked);
  };

  return (
    <label
      className={[styles.wrapper, disabled ? styles.disabled : ''].join(' ')}
      aria-disabled={disabled}
    >
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-disabled={disabled}
        className={[styles.switch, checked ? styles.on : styles.off].join(' ')}
        onClick={handleChange}
        disabled={disabled}
      >
        <span className={styles.knob} />
      </button>
      {label && <span className={styles.label}>{label}</span>}
    </label>
  );
};
