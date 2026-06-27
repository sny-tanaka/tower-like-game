import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';

import { BattleEntityStore } from './BattleEntityStore';

// ---------------------------------------------------------------------------
// BattleEntityStoreContext
// ---------------------------------------------------------------------------
//
// v1.3.7 (Phase 2-B): BattleEntityStore を React Context で配信する。 Page が
// useBattleLoop() から取得した entityStore を <BattleEntityStoreProvider> でラップし、
// BattleField の 3 layer (EnemyLayer / FxLayer / ProjectileLayer) が useContext で取得する。
//
// props drilling を排除して、 BattleField のインターフェースに entityStore を出さずに済む。
// テストやストーリーでは Provider 経由でモックの store を注入できる。
//
// 仕様参照: design-docs/tower-like-game/perf-refactor.md (Phase 2-B)
// ---------------------------------------------------------------------------

const BattleEntityStoreContext = createContext<BattleEntityStore | null>(null);

export interface BattleEntityStoreProviderProps {
  store: BattleEntityStore;
  children: ReactNode;
}

/**
 * Provider。 Page で useBattleLoop() の entityStore を渡してラップする。
 * children 配下の任意の component が useEntityStore() で取得できる。
 */
export function BattleEntityStoreProvider({ store, children }: BattleEntityStoreProviderProps) {
  return (
    <BattleEntityStoreContext.Provider value={store}>{children}</BattleEntityStoreContext.Provider>
  );
}

/**
 * BattleEntityStore を Context から取得する hook。 Provider 外で呼ぶとエラー。
 */
export function useEntityStore(): BattleEntityStore {
  const store = useContext(BattleEntityStoreContext);
  if (store == null) {
    throw new Error(
      'useEntityStore must be used inside <BattleEntityStoreProvider>. ' +
        'Page で useBattleLoop の戻り値 entityStore を Provider に渡すこと。'
    );
  }
  return store;
}
