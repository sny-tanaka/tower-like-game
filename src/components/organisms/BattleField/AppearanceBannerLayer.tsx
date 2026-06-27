import { useCallback, useSyncExternalStore } from 'react';

import { AppearanceBannerFx } from '@/components/fx/AppearanceBannerFx';
import { useEntityStore } from '@/game/store/BattleEntityStoreContext';

// ---------------------------------------------------------------------------
// AppearanceBannerLayer
// ---------------------------------------------------------------------------
//
// v1.3.7 (Phase 2-C): Page の `appearanceEvents.map((evt) => <AppearanceBannerFx />)` を
// 小コンポーネントに閉じ込める。 entityStore を直接購読することで、 Page 本体は
// appearance イベントに reactive でなくなる (= Page の re-render 頻度がさらに減る)。
//
// 描画位置: pages/battle の overlayLayer 内。 BattleField の外 (= AppShell の外側) で
// マウントするので、 ScreenSaverDialog 開閉時の挙動も既存のまま (entityStore が空配列に
// なっていれば何も描画しない)。
// ---------------------------------------------------------------------------

export function AppearanceBannerLayer() {
  const store = useEntityStore();
  useSyncExternalStore(store.subscribe, store.getSnapshot);
  const events = store.getAppearanceEvents();

  const handleDone = useCallback(
    (id: string) => {
      store.queueRemoval('appearance', id);
    },
    [store]
  );

  return (
    <>
      {events.map((evt) => (
        <AppearanceBannerFx
          key={evt.id}
          // 'miniboss' は AppearanceBannerFx に専用 kind が無いので 'boss' で代用 (赤・大きい)
          kind={evt.kind === 'miniboss' ? 'boss' : evt.kind}
          name={evt.name}
          onDone={() => handleDone(evt.id)}
        />
      ))}
    </>
  );
}
