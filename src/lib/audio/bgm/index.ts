/**
 * BGM ファクトリ
 * createBgmTrack(id, ctx, dest) で BgmTrack を返す
 */

import { createBaseBgm } from './base';
import { createBattleBossBgm } from './battleBoss';
import { createBattleNormalBgm } from './battleNormal';
import { createTitleBgm } from './title';
import type { BgmTrack } from './types';

import type { BgmId } from '@/lib/audio/types';

export type { BgmTrack } from './types';

export function createBgmTrack(id: BgmId, ctx: AudioContext, dest: AudioNode): BgmTrack {
  switch (id) {
    case 'title':
      return createTitleBgm(ctx, dest);
    case 'base':
      return createBaseBgm(ctx, dest);
    case 'battleNormal':
      return createBattleNormalBgm(ctx, dest);
    case 'battleBoss':
      return createBattleBossBgm(ctx, dest);
  }
}
