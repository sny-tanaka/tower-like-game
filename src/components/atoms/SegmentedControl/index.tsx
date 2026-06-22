import styles from './style.module.scss';

type Option<T> = {
  label: string;
  value: T;
};

export type SegmentedControlProps<T extends string | number> = {
  options: ReadonlyArray<Option<T>>;
  value: T;
  onChange: (value: T) => void;
  size?: 'sm' | 'md';
  disabled?: boolean;
};

export const SegmentedControl = <T extends string | number>({
  options,
  value,
  onChange,
  size = 'md',
  disabled = false,
}: SegmentedControlProps<T>) => {
  return (
    <div
      className={[styles.root, styles[`size-${size}`], disabled ? styles.disabled : ''].join(' ')}
      role="group"
    >
      {options.map((opt) => {
        const isSelected = opt.value === value;
        return (
          <button
            key={String(opt.value)}
            type="button"
            role="radio"
            aria-checked={isSelected}
            className={[styles.segment, isSelected ? styles.selected : styles.unselected].join(' ')}
            onClick={() => {
              if (!disabled) onChange(opt.value);
            }}
            disabled={disabled}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
};
