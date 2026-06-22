import type { ChangeEvent, CSSProperties } from 'react';

import styles from './style.module.scss';

export type SliderProps = {
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange: (value: number) => void;
  color?: 'primary' | 'secondary';
  disabled?: boolean;
};

export const Slider = ({
  value,
  min = 0,
  max = 1,
  step = 0.01,
  onChange,
  color = 'primary',
  disabled = false,
}: SliderProps) => {
  const percent = max === min ? 0 : ((value - min) / (max - min)) * 100;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    onChange(parseFloat(e.target.value));
  };

  const cssVars = {
    '--slider-fill-pct': `${percent}%`,
  } as CSSProperties;

  return (
    <div
      className={[styles.wrapper, styles[`color-${color}`], disabled ? styles.disabled : ''].join(
        ' '
      )}
      style={cssVars}
    >
      <input
        type="range"
        className={styles.input}
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        aria-valuenow={value}
        aria-valuemin={min}
        aria-valuemax={max}
      />
    </div>
  );
};
