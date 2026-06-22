import type { Sound, SoundId } from 'src/lib/audio/types';

import { activeCannon, activeCutter, activeLaser, activeThunder } from './active';
import {
  bossKill,
  bossWarn,
  enemyKill,
  machineDown,
  machineHit,
  tierClear,
  waveClear,
} from './battle';
import { resultClear, resultGameOver, resultRetreat } from './result';
import { dialogClose, dialogOpen, launch, purchaseOk, reject, tabSwitch, tap } from './ui';
import { cannonShoot, cutterShoot, laserShoot, thunderShoot, weaponSwitch } from './weapon';

export const soundLibrary: Record<SoundId, Sound> = {
  laserShoot,
  cannonShoot,
  thunderShoot,
  cutterShoot,
  weaponSwitch,
  activeLaser,
  activeCannon,
  activeThunder,
  activeCutter,
  enemyKill,
  bossWarn,
  bossKill,
  machineHit,
  machineDown,
  waveClear,
  tierClear,
  tap,
  purchaseOk,
  reject,
  tabSwitch,
  dialogOpen,
  dialogClose,
  launch,
  resultClear,
  resultGameOver,
  resultRetreat,
};
