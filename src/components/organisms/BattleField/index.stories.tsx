import type { Meta, StoryObj } from '@storybook/react';
import { useMemo, useState } from 'react';

import type { DamageEvent, DeathEvent, DummyPin, HitEvent, ProjectileEvent } from './index';
import { BattleField } from './index';

import { createEnemyTemplate, spawnEnemy } from '@/game/enemies';
import { BattleEntityStore } from '@/game/store/BattleEntityStore';
import { BattleEntityStoreProvider } from '@/game/store/BattleEntityStoreContext';
import type { SpawnedEnemy } from '@/game/types';
import { BigNum } from '@/lib/bignum/BigNum';

// ---------------------------------------------------------------------------
// design.png 用ダミーピン (Storybook 専用の装飾サンプル)
// ---------------------------------------------------------------------------
const SAMPLE_DUMMY_PINS: DummyPin[] = [
  { id: 'p1', x: 30, y: 22, kind: 'normal' },
  { id: 'p2', x: 65, y: 18, kind: 'normal' },
  { id: 'p3', x: 50, y: 30, kind: 'elite' },
  { id: 'p4', x: 78, y: 38, kind: 'normal' },
  { id: 'p5', x: 22, y: 50, kind: 'normal' },
  { id: 'p6', x: 60, y: 72, kind: 'boss' },
];

// ---------------------------------------------------------------------------
// ヘルパー: 再現可能な疑似乱数（seed 付き）
// ---------------------------------------------------------------------------
let _seed = 42;
function seededRng(): number {
  _seed = (_seed * 1664525 + 1013904223) & 0xffffffff;
  return (_seed >>> 0) / 0xffffffff;
}

function makeEnemy(
  id: string,
  kind: 'normal' | 'elite' | 'miniboss' | 'boss',
  x: number,
  y: number
) {
  _seed = 42;
  const template = createEnemyTemplate(1, 1, kind, kind === 'normal' ? 'standard' : undefined);
  const enemy = spawnEnemy(template, id, 0, seededRng);
  return { ...enemy, position: { x, y } };
}

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------
const meta: Meta<typeof BattleField> = {
  title: 'Organisms/BattleField',
  component: BattleField,
  parameters: {
    backgrounds: { default: 'dark' },
    layout: 'fullscreen',
  },
  decorators: [
    // v1.3.7 (Phase 2-B): BattleField の 3 layer は entityStore (Context 経由) から
    // enemies / events を読むため、 Story の args 経由で渡しても無視される。
    // decorator で args を取り出して BattleEntityStore に注入 + Provider でラップする。
    (Story, context) => {
      const args = context.args as {
        enemies?: SpawnedEnemy[];
        damageEvents?: DamageEvent[];
        deathEvents?: DeathEvent[];
        projectileEvents?: ProjectileEvent[];
      };
      const store = useMemo(() => {
        const s = new BattleEntityStore();
        if (args.enemies) s.setEnemies(args.enemies);
        if (args.damageEvents) s.setDamageEvents(args.damageEvents);
        if (args.deathEvents) s.setDeathEvents(args.deathEvents);
        if (args.projectileEvents) s.setProjectileEvents(args.projectileEvents);
        return s;
      }, [args.enemies, args.damageEvents, args.deathEvents, args.projectileEvents]);
      return (
        <BattleEntityStoreProvider store={store}>
          <div
            style={{
              width: 390,
              height: 600,
              margin: '0 auto',
              background: 'var(--c-bg-deep)',
              position: 'relative',
            }}
          >
            <Story />
          </div>
        </BattleEntityStoreProvider>
      );
    },
  ],
  args: {
    range: 25,
    enemies: [],
    damageEvents: [],
    hitEvents: [],
    deathEvents: [],
  },
};

export default meta;
type Story = StoryObj<typeof BattleField>;

// ---------------------------------------------------------------------------
// 1. 敵 0 体
// ---------------------------------------------------------------------------
export const Empty: Story = {
  name: '敵 0 体（マシン + 索敵円のみ）',
  args: {
    enemies: [],
    damageEvents: [],
    hitEvents: [],
    deathEvents: [],
    range: 25,
  },
};

// ---------------------------------------------------------------------------
// 2. 通常敵 5 体
// ---------------------------------------------------------------------------
export const FiveNormals: Story = {
  name: '通常敵 5 体',
  args: {
    enemies: [
      makeEnemy('e1', 'normal', 20, 30),
      makeEnemy('e2', 'normal', 75, 20),
      makeEnemy('e3', 'normal', 10, 60),
      makeEnemy('e4', 'normal', 80, 55),
      makeEnemy('e5', 'normal', 45, 15),
    ],
    damageEvents: [],
    hitEvents: [],
    deathEvents: [],
    range: 25,
  },
};

// ---------------------------------------------------------------------------
// 3. 通常敵 10 体（パフォーマンス確認）
// ---------------------------------------------------------------------------
export const TenNormals: Story = {
  name: '通常敵 10 体',
  args: {
    enemies: Array.from({ length: 10 }, (_, i) => {
      const angle = (i / 10) * Math.PI * 2;
      const r = 30;
      const x = 50 + Math.cos(angle) * r;
      const y = 45 + Math.sin(angle) * r * 0.6;
      return makeEnemy(`e${i}`, 'normal', x, y);
    }),
    damageEvents: [],
    hitEvents: [],
    deathEvents: [],
    range: 35,
  },
};

// ---------------------------------------------------------------------------
// 4. Elite
// ---------------------------------------------------------------------------
export const EliteEnemy: Story = {
  name: 'Elite 敵',
  args: {
    enemies: [
      makeEnemy('elite1', 'elite', 50, 30),
      makeEnemy('n1', 'normal', 25, 40),
      makeEnemy('n2', 'normal', 70, 45),
    ],
    damageEvents: [],
    hitEvents: [],
    deathEvents: [],
    range: 25,
  },
};

// ---------------------------------------------------------------------------
// 5. Boss
// ---------------------------------------------------------------------------
export const BossEnemy: Story = {
  name: 'Boss 敵',
  args: {
    enemies: [
      makeEnemy('boss1', 'boss', 50, 20),
      makeEnemy('mini1', 'miniboss', 20, 50),
      makeEnemy('n1', 'normal', 75, 35),
    ],
    damageEvents: [],
    hitEvents: [],
    deathEvents: [],
    range: 30,
  },
};

// ---------------------------------------------------------------------------
// 6. DamagePop × 複数同時発生（インタラクティブ）
// ---------------------------------------------------------------------------
function DamagePopMultiRender(args: React.ComponentProps<typeof BattleField>) {
  const [damageEvents, setDamageEvents] = useState<DamageEvent[]>([]);
  let counter = 0;

  const fireDamage = () => {
    const count = 6;
    const newEvents: DamageEvent[] = Array.from({ length: count }, (_, i) => ({
      id: `dmg-${Date.now()}-${i}-${++counter}`,
      x: 15 + Math.random() * 70,
      y: 10 + Math.random() * 60,
      value: BigNum.fromNumber(Math.floor(Math.random() * 9000) + 1000),
      crit: Math.random() < 0.3,
    }));
    setDamageEvents((prev) => [...prev, ...newEvents]);
  };

  const handleDamageDone = (id: string) => {
    setDamageEvents((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1, position: 'relative' }}>
        <BattleField
          {...args}
          damageEvents={damageEvents}
          onDamageDone={handleDamageDone}
        />
      </div>
      <div style={{ padding: 8, background: 'var(--c-bg-elev)', flexShrink: 0 }}>
        <button
          onClick={fireDamage}
          style={{
            padding: '8px 16px',
            background: 'var(--c-primary)',
            color: 'var(--c-bg-deep)',
            border: 'none',
            borderRadius: 4,
            cursor: 'pointer',
            fontWeight: 700,
          }}
        >
          DamagePop 発火
        </button>
      </div>
    </div>
  );
}

export const DamagePopMulti: Story = {
  name: 'DamagePop 複数同時',
  render: (args) => <DamagePopMultiRender {...args} />,
  args: {
    enemies: [
      makeEnemy('e1', 'normal', 30, 40),
      makeEnemy('e2', 'normal', 60, 30),
      makeEnemy('e3', 'elite', 50, 20),
    ],
    hitEvents: [],
    deathEvents: [],
    range: 25,
  },
};

// ---------------------------------------------------------------------------
// 7. 各 Fx をボタンで発火
// ---------------------------------------------------------------------------
function FxPlaygroundRender(args: React.ComponentProps<typeof BattleField>) {
  const [hitEvents, setHitEvents] = useState<HitEvent[]>([]);
  const [deathEvents, setDeathEvents] = useState<DeathEvent[]>([]);
  const [damageEvents, setDamageEvents] = useState<DamageEvent[]>([]);
  let c = 0;

  const fireHit = () => {
    const id = `hit-${Date.now()}-${++c}`;
    setHitEvents((p) => [...p, { id, x: 30 + Math.random() * 40, y: 20 + Math.random() * 40 }]);
  };
  const fireDeath = () => {
    const id = `death-${Date.now()}-${++c}`;
    setDeathEvents((p) => [...p, { id, x: 30 + Math.random() * 40, y: 20 + Math.random() * 40 }]);
  };
  const fireCrit = () => {
    const id = `crit-${Date.now()}-${++c}`;
    setDamageEvents((p) => [
      ...p,
      {
        id,
        x: 30 + Math.random() * 40,
        y: 20 + Math.random() * 40,
        value: BigNum.fromNumber(99999),
        crit: true,
      },
    ]);
  };

  const btnStyle = {
    padding: '6px 12px',
    border: 'none',
    borderRadius: 4,
    cursor: 'pointer',
    fontWeight: 600,
    fontSize: 12,
  };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1, position: 'relative' }}>
        <BattleField
          {...args}
          hitEvents={hitEvents}
          deathEvents={deathEvents}
          damageEvents={damageEvents}
          onHitDone={(id) => setHitEvents((p) => p.filter((e) => e.id !== id))}
          onDeathDone={(id) => setDeathEvents((p) => p.filter((e) => e.id !== id))}
          onDamageDone={(id) => setDamageEvents((p) => p.filter((e) => e.id !== id))}
        />
      </div>
      <div
        style={{
          padding: 8,
          background: 'var(--c-bg-elev)',
          flexShrink: 0,
          display: 'flex',
          gap: 8,
          flexWrap: 'wrap',
        }}
      >
        <button
          onClick={fireHit}
          style={{ ...btnStyle, background: 'var(--c-primary)', color: 'var(--c-bg-deep)' }}
        >
          EnemyHit
        </button>
        <button
          onClick={fireDeath}
          style={{ ...btnStyle, background: 'var(--c-danger)', color: 'white' }}
        >
          EnemyDeath
        </button>
        <button
          onClick={fireCrit}
          style={{ ...btnStyle, background: 'var(--c-warning)', color: 'var(--c-bg-deep)' }}
        >
          クリティカル DamagePop
        </button>
      </div>
    </div>
  );
}

export const FxPlayground: Story = {
  name: 'Fx プレイグラウンド',
  render: (args) => <FxPlaygroundRender {...args} />,
  args: {
    enemies: [
      makeEnemy('e1', 'normal', 30, 35),
      makeEnemy('e2', 'elite', 65, 25),
      makeEnemy('e3', 'boss', 50, 15),
    ],
    range: 28,
  },
};

// ---------------------------------------------------------------------------
// 8. ダミーピン装飾 (design.png 準拠)
// ---------------------------------------------------------------------------
export const WithDummyPins: Story = {
  name: 'ダミーピン装飾あり',
  args: {
    enemies: [],
    damageEvents: [],
    hitEvents: [],
    deathEvents: [],
    range: 30,
    dummyPins: SAMPLE_DUMMY_PINS,
  },
};
