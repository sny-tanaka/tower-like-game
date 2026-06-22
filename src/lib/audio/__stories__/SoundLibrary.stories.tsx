import type { Meta, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';

import { SOUND_CATEGORY, soundEngine } from '@/lib/audio';
import type { SoundCategory, SoundId } from '@/lib/audio';

const CATEGORY_LABEL: Record<SoundCategory, string> = {
  weapon: '武器 / 通常射撃',
  active: 'アクティブスキル',
  battle: 'バトル進行',
  ui: 'UI',
  result: 'リザルト',
};

const SOUND_LABEL: Record<SoundId, string> = {
  laserShoot: 'Laser 射撃',
  cannonShoot: 'Cannon 射撃',
  thunderShoot: 'Thunder 射撃',
  cutterShoot: 'Cutter 射撃',
  weaponSwitch: '武器切替',
  activeLaser: 'Active: Laser',
  activeCannon: 'Active: Cannon (Volley)',
  activeThunder: 'Active: Thunder',
  activeCutter: 'Active: Cutter',
  enemyKill: '雑魚撃破',
  bossWarn: 'ボス出現警告',
  bossKill: 'ボス撃破',
  machineHit: 'マシン被弾',
  machineDown: 'マシン全滅',
  waveClear: 'Wave クリア',
  tierClear: 'Tier クリア',
  tap: 'ボタンタップ',
  purchaseOk: '強化購入成功',
  reject: '拒否音',
  tabSwitch: 'タブ切替',
  dialogOpen: 'ダイアログ開',
  dialogClose: 'ダイアログ閉',
  launch: '出撃ボタン',
  resultClear: 'リザルト: クリア',
  resultGameOver: 'リザルト: 全滅',
  resultRetreat: 'リザルト: 撤退',
};

const ALL_SOUND_IDS = Object.keys(SOUND_CATEGORY) as SoundId[];

function groupByCategory(): Record<SoundCategory, SoundId[]> {
  const grouped: Record<SoundCategory, SoundId[]> = {
    weapon: [],
    active: [],
    battle: [],
    ui: [],
    result: [],
  };
  for (const id of ALL_SOUND_IDS) {
    grouped[SOUND_CATEGORY[id]].push(id);
  }
  return grouped;
}

function SoundLibrary() {
  const [seVolume, setSeVolume] = useState(0.7);
  const [initialized, setInitialized] = useState(soundEngine.isInitialized());

  useEffect(() => {
    return () => {
      soundEngine.destroy();
      setInitialized(false);
    };
  }, []);

  const handleInit = () => {
    soundEngine.init();
    setInitialized(soundEngine.isInitialized());
  };

  const handlePlay = (id: SoundId) => {
    if (!soundEngine.isInitialized()) {
      soundEngine.init();
      setInitialized(true);
    }
    soundEngine.play(id);
  };

  const handleVolume = (v: number) => {
    setSeVolume(v);
    soundEngine.setSeVolume(v);
  };

  const grouped = groupByCategory();

  const containerStyle: React.CSSProperties = {
    padding: 24,
    fontFamily: 'system-ui, sans-serif',
    color: '#e0f5ff',
    background: '#0a0e1a',
    minHeight: '100vh',
  };

  const headerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    marginBottom: 24,
    flexWrap: 'wrap',
  };

  const sectionStyle: React.CSSProperties = {
    marginBottom: 24,
  };

  const sectionTitleStyle: React.CSSProperties = {
    fontSize: 14,
    color: '#7fdfff',
    marginBottom: 8,
    letterSpacing: 1,
  };

  const buttonGridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
    gap: 8,
  };

  const buttonStyle: React.CSSProperties = {
    background: 'linear-gradient(180deg, #1a2a4a 0%, #0a1530 100%)',
    border: '1px solid #2a4a8a',
    color: '#e0f5ff',
    padding: '10px 12px',
    borderRadius: 6,
    cursor: 'pointer',
    fontSize: 13,
    fontFamily: 'inherit',
    textAlign: 'left' as const,
  };

  const initButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    background: initialized
      ? 'linear-gradient(180deg, #1a4a2a 0%, #0a3015 100%)'
      : 'linear-gradient(180deg, #4a2a1a 0%, #30150a 100%)',
    borderColor: initialized ? '#2a8a4a' : '#8a4a2a',
    fontWeight: 600,
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <button
          type="button"
          onClick={handleInit}
          style={initButtonStyle}
        >
          {initialized ? '✓ AudioContext 起動済' : '▶ AudioContext 起動 (初回タップ)'}
        </button>
        <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          SE 音量
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={seVolume}
            onChange={(e) => handleVolume(Number(e.target.value))}
            style={{ width: 160 }}
          />
          <span style={{ width: 40, textAlign: 'right' }}>{Math.round(seVolume * 100)}%</span>
        </label>
      </div>
      {(Object.keys(grouped) as SoundCategory[]).map((cat) => (
        <div
          key={cat}
          style={sectionStyle}
        >
          <div style={sectionTitleStyle}>{CATEGORY_LABEL[cat]}</div>
          <div style={buttonGridStyle}>
            {grouped[cat].map((id) => (
              <button
                key={id}
                type="button"
                onClick={() => handlePlay(id)}
                style={buttonStyle}
              >
                {SOUND_LABEL[id]}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

const meta: Meta<typeof SoundLibrary> = {
  title: 'Lib/Audio/SoundLibrary',
  component: SoundLibrary,
};

export default meta;
type Story = StoryObj<typeof SoundLibrary>;

export const Default: Story = {};
