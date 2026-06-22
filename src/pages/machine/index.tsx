import { AppShell } from '@/components/organisms/AppShell';
import { BottomNav } from '@/components/organisms/BottomNav';
import { MachineUpgradeList } from '@/components/organisms/MachineUpgradeList';
import { PageHeader } from '@/components/organisms/PageHeader';
import { useNavigation } from '@/store/navigation';
import type { Screen } from '@/store/navigation';

/**
 * MachineScreen — マシン強化画面。
 * タブなし、全 16 項目を 2 列リストで一覧表示する。
 */
export function Page() {
  const { navigate } = useNavigation();

  const handleNavChange = (target: Screen) => {
    navigate(target);
  };

  return (
    <AppShell
      header={
        <PageHeader
          title="マシン強化"
          currencies={['bolt']}
        />
      }
      footer={
        <BottomNav
          active="machine"
          onChange={handleNavChange}
        />
      }
    >
      <MachineUpgradeList />
    </AppShell>
  );
}
