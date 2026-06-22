import { useId } from 'react';

import { Text } from '@/components/atoms/Text';

export type AppearanceKind = 'elite' | 'boss';

interface KindPreset {
  color: string;
  label: string;
  glow: string;
}

const KIND_PRESET: Record<AppearanceKind, KindPreset> = {
  elite: {
    color: 'var(--c-warning)',
    label: 'ELITE',
    glow: '0 0 16px rgba(246,185,74,0.6)',
  },
  boss: {
    color: 'var(--c-danger)',
    label: 'BOSS',
    glow: '0 0 24px rgba(255,77,109,0.7)',
  },
};

export interface AppearanceBannerFxProps {
  /** エリートかボスか */
  kind?: AppearanceKind;
  /** 敵の名前 */
  name: string;
  /** アニメーション時間 ms（デフォルト: 1600） */
  duration?: number;
  /** アニメーション完了コールバック */
  onDone?: () => void;
}

/**
 * AppearanceBannerFx — エリート / ボス出現時のフルスクリーンバナー演出 Fx。
 *
 * 1) 画面全体フラッシュ（color に mix-blend-mode: screen）
 * 2) 中段にバンドが上からスライドイン + 名前と種別ラベルを表示
 *
 * `prefers-reduced-motion` 時はアニメーション無効で静止表示。
 */
export function AppearanceBannerFx({
  kind = 'elite',
  name,
  duration = 1600,
  onDone,
}: AppearanceBannerFxProps) {
  const uid = useId().replace(/:/g, '');
  const id = `app-${uid}`;
  const preset = KIND_PRESET[kind];

  const css = `
    @keyframes ${id}-flash {
      0%   { opacity: 0; }
      10%  { opacity: 0.55; }
      40%  { opacity: 0; }
      100% { opacity: 0; }
    }
    @keyframes ${id}-band {
      0%   { transform: translateY(-100%); opacity: 0; }
      12%  { transform: translateY(0);     opacity: 1; }
      80%  { transform: translateY(0);     opacity: 1; }
      100% { transform: translateY(-100%); opacity: 0; }
    }
    .${id}-w {
      position: absolute;
      inset: 0;
      pointer-events: none;
      z-index: var(--z-fx-field);
    }
    .${id}-fl {
      position: absolute;
      inset: 0;
      background: ${preset.color};
      mix-blend-mode: screen;
      animation: ${id}-flash ${duration}ms var(--ease-out) both;
    }
    .${id}-bd {
      position: absolute;
      left: 0;
      right: 0;
      top: 30%;
      padding: 14px 0;
      background:
        linear-gradient(90deg, transparent, color-mix(in srgb, ${preset.color} 20%, transparent) 50%, transparent),
        linear-gradient(0deg, rgba(10,15,28,0.85), rgba(10,15,28,0.85));
      border-top: 1px solid ${preset.color};
      border-bottom: 1px solid ${preset.color};
      box-shadow: ${preset.glow};
      text-align: center;
      animation: ${id}-band ${duration}ms var(--ease-out) both;
    }
    .${id}-label {
      display: block;
      margin-bottom: 4px;
    }
    .${id}-name {
      display: block;
    }
    @media (prefers-reduced-motion: reduce) {
      .${id}-fl, .${id}-bd { animation: none; opacity: 1; transform: none; }
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div
        className={`${id}-w`}
        onAnimationEnd={onDone}
      >
        <div className={`${id}-fl`} />
        <div className={`${id}-bd`}>
          <Text
            variant="label"
            className={`${id}-label`}
            style={{ color: preset.color, fontSize: 12, letterSpacing: '0.32em' }}
          >
            {preset.label}
          </Text>
          <Text
            variant="heading-1"
            className={`${id}-name`}
            style={{
              color: 'var(--c-text)',
              fontSize: 22,
              fontFamily: 'var(--ff-display)',
              fontWeight: 700,
              textShadow: preset.glow,
            }}
          >
            {name}
          </Text>
        </div>
      </div>
    </>
  );
}
