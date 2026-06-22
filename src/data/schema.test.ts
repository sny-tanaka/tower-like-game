import { describe, expect, it } from 'vitest';

import {
  DB_NAME,
  DB_VERSION,
  DEFAULT_CURRENCIES,
  DEFAULT_SETTINGS,
  DEFAULT_WEAPONS,
  MACHINE_UPGRADE_KEYS,
  STORES,
} from '@/data/schema';

describe('schema 定数', () => {
  it('DB_NAME が正しい', () => {
    expect(DB_NAME).toBe('tower-like-game');
  });

  it('DB_VERSION が 1', () => {
    expect(DB_VERSION).toBe(1);
  });

  it('STORES に 7 件のストア名が定義されている', () => {
    expect(Object.keys(STORES)).toHaveLength(7);
  });

  it('MACHINE_UPGRADE_KEYS が 16 件', () => {
    expect(MACHINE_UPGRADE_KEYS).toHaveLength(16);
  });

  it('DEFAULT_CURRENCIES の bolt/alloy が空配列（BigNumJSON）', () => {
    expect(DEFAULT_CURRENCIES.bolt).toEqual([]);
    expect(DEFAULT_CURRENCIES.alloy).toEqual([]);
  });

  it('DEFAULT_SETTINGS のデフォルト値が正しい', () => {
    expect(DEFAULT_SETTINGS.defaultGameSpeed).toBe(1);
    expect(DEFAULT_SETTINGS.bgmVolume).toBe(0.8);
    expect(DEFAULT_SETTINGS.seVolume).toBe(0.8);
    expect(DEFAULT_SETTINGS.vibrationEnabled).toBe(true);
  });

  it('DEFAULT_WEAPONS の初期武器は laser', () => {
    expect(DEFAULT_WEAPONS.initialWeapon).toBe('laser');
    expect(DEFAULT_WEAPONS.weaponLv).toBe(0);
  });
});
