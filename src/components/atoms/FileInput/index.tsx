import type { ChangeEvent } from 'react';
import { useRef, useState } from 'react';

import styles from './style.module.scss';

export type FileInputProps = {
  accept?: string;
  onChange: (file: File | null) => void;
  label?: string;
  disabled?: boolean;
};

export const FileInput = ({
  accept = 'application/json',
  onChange,
  label = 'ファイルを選択',
  disabled = false,
}: FileInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleClick = () => {
    if (disabled) return;
    inputRef.current?.click();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setFileName(file?.name ?? null);
    onChange(file);
    // 同じファイルを再選択できるよう value をリセット
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <div className={[styles.wrapper, disabled ? styles.disabled : ''].join(' ')}>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className={styles.hiddenInput}
        onChange={handleChange}
        disabled={disabled}
        aria-hidden="true"
        tabIndex={-1}
      />
      <button
        type="button"
        className={styles.btn}
        onClick={handleClick}
        disabled={disabled}
      >
        {label}
      </button>
      {fileName && (
        <span
          className={styles.fileName}
          title={fileName}
        >
          {fileName}
        </span>
      )}
    </div>
  );
};
