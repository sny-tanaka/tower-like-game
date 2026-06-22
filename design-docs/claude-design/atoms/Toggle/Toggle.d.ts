export interface ToggleProps {
  checked?: boolean;
  onChange?: (next: boolean) => void;
  /** インラインラベル (省略するとスイッチ単体) */
  label?: string;
  /** 補足説明 */
  description?: string;
  size?: 'sm' | 'md';
  accent?: 'primary' | 'secondary' | 'success';
  disabled?: boolean;
}

export declare function Toggle(props: ToggleProps): JSX.Element;
