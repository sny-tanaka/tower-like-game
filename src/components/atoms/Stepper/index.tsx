import styles from './style.module.scss';

export type StepperProps = {
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
  size?: 'sm' | 'md';
  disabled?: boolean;
};

export const Stepper = ({
  value,
  min,
  max,
  step = 1,
  onChange,
  size = 'md',
  disabled = false,
}: StepperProps) => {
  const canDecrement = value - step >= min;
  const canIncrement = value + step <= max;

  const handleDecrement = () => {
    if (disabled || !canDecrement) return;
    onChange(Math.max(min, value - step));
  };

  const handleIncrement = () => {
    if (disabled || !canIncrement) return;
    onChange(Math.min(max, value + step));
  };

  return (
    <div
      className={[styles.stepper, styles[`size-${size}`], disabled ? styles.disabled : ''].join(
        ' '
      )}
      role="group"
      aria-label="数値増減"
    >
      <button
        type="button"
        className={styles.btn}
        onClick={handleDecrement}
        disabled={disabled || !canDecrement}
        aria-label="減少"
      >
        −
      </button>
      <span
        className={styles.value}
        aria-live="polite"
        aria-atomic="true"
      >
        {value}
      </span>
      <button
        type="button"
        className={styles.btn}
        onClick={handleIncrement}
        disabled={disabled || !canIncrement}
        aria-label="増加"
      >
        ＋
      </button>
    </div>
  );
};
