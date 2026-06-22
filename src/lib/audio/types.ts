export type SoundId =
  // weapon
  | 'laserShoot'
  | 'cannonShoot'
  | 'thunderShoot'
  | 'cutterShoot'
  | 'weaponSwitch'
  // active
  | 'activeLaser'
  | 'activeCannon'
  | 'activeThunder'
  | 'activeCutter'
  // battle
  | 'enemyKill'
  | 'bossWarn'
  | 'bossKill'
  | 'machineHit'
  | 'machineDown'
  | 'waveClear'
  | 'tierClear'
  // ui
  | 'tap'
  | 'purchaseOk'
  | 'reject'
  | 'tabSwitch'
  | 'dialogOpen'
  | 'dialogClose'
  | 'launch'
  // result
  | 'resultClear'
  | 'resultGameOver'
  | 'resultRetreat';

export type Sound = (ctx: AudioContext, dest: AudioNode, now: number) => void;

export type SoundCategory = 'weapon' | 'active' | 'battle' | 'ui' | 'result';

export type BgmId = 'title' | 'base' | 'battleNormal' | 'battleBoss';

export const SOUND_CATEGORY: Record<SoundId, SoundCategory> = {
  laserShoot: 'weapon',
  cannonShoot: 'weapon',
  thunderShoot: 'weapon',
  cutterShoot: 'weapon',
  weaponSwitch: 'weapon',
  activeLaser: 'active',
  activeCannon: 'active',
  activeThunder: 'active',
  activeCutter: 'active',
  enemyKill: 'battle',
  bossWarn: 'battle',
  bossKill: 'battle',
  machineHit: 'battle',
  machineDown: 'battle',
  waveClear: 'battle',
  tierClear: 'battle',
  tap: 'ui',
  purchaseOk: 'ui',
  reject: 'ui',
  tabSwitch: 'ui',
  dialogOpen: 'ui',
  dialogClose: 'ui',
  launch: 'ui',
  resultClear: 'result',
  resultGameOver: 'result',
  resultRetreat: 'result',
};
