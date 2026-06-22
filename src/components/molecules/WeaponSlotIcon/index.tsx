import styles from './style.module.scss';

import { CircularProgress } from '@/components/atoms/CircularProgress';
import { Icon } from '@/components/atoms/Icon';

export type WeaponType = 'laser' | 'cannon' | 'thunder' | 'cutter';

export interface WeaponSlotIconProps {
  weapon: WeaponType;
  equipped: boolean;
  cdRemaining?: number;
  disabled?: boolean;
  onClick?: () => void;
}

export function WeaponSlotIcon({
  weapon,
  equipped,
  cdRemaining,
  disabled = false,
  onClick,
}: WeaponSlotIconProps) {
  const hasCd = cdRemaining != null && cdRemaining > 0;

  const classNames = [
    styles.root,
    equipped ? styles.equipped : '',
    hasCd ? styles.onCd : '',
    disabled ? styles.disabled : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type="button"
      className={classNames}
      onClick={onClick}
      disabled={disabled}
      aria-label={`${weapon} weapon slot${equipped ? ' (equipped)' : ''}${hasCd ? ` (cooldown: ${cdRemaining}s)` : ''}`}
      aria-pressed={equipped}
    >
      <span className={styles.iconWrap}>
        <Icon
          name={weapon}
          size={24}
          color={equipped ? 'var(--c-primary)' : 'var(--c-text-mid)'}
        />
      </span>

      {hasCd && (
        <>
          <span className={styles.cdOverlay} aria-hidden="true" />
          <span className={styles.cdProgress} aria-hidden="true">
            <CircularProgress
              value={cdRemaining}
              max={3}
              size={44}
              color="cd"
              thickness={3}
            />
          </span>
        </>
      )}
    </button>
  );
}
