export type {
  EnemyKind,
  NormalSubtype,
  EnemyTemplate,
  SpawnedEnemy,
  WaveSchedule,
  NormalSpawnRow,
  TierConfig,
} from './types';

export {
  TIER_BASE,
  tierBaseHp,
  tierBaseAtk,
  getTierConfig,
  waveHpFactor,
  waveAtkFactor,
  waveSpawnFactor,
} from './tier';

export {
  createEnemyTemplate,
  spawnEnemy,
  scaledReward,
  UPPER_HP_MULT,
  UPPER_ATK_MULT,
  NORMAL_HP_MULT,
  NORMAL_ATK_MULT,
  NORMAL_SPD_MULT,
} from './enemies';

export { buildTierWaves, getSpawnsAtTime } from './wave';

export type { MachineStats, WeaponStats } from './damage.types';

export type { DamageCalcInput, DamageCalcResult } from './damage';
export { calcOutgoingDamage, calcReceivedDamage, rollCrit } from './damage';

// ---- Weapons ----
export type { LaserStats, LaserAttackResult, MegaBeamResult } from './weapons/laser';
export { laserStats, laserNormalAttack, laserMegaBeam } from './weapons/laser';

export type { CannonStats, CannonAttackResult, VolleyResult } from './weapons/cannon';
export { cannonStats, cannonNormalAttack, cannonVolley } from './weapons/cannon';

export type { ThunderStats, ThunderAttackResult, PlasmaResult } from './weapons/thunder';
export { thunderStats, thunderNormalAttack, thunderPlasmaDischarge } from './weapons/thunder';

export type { CutterStats, CutterAttackResult, OverdriveState } from './weapons/cutter';
export {
  cutterStats,
  cutterNormalAttack,
  cutterStartOverdrive,
  cutterTickOverdrive,
} from './weapons/cutter';

// ---- Patches ----
export type { PatchName, EquippedPatch, PatchTrigger, PatchEffect } from './patches.types';
export { evaluatePatches } from './patches';
