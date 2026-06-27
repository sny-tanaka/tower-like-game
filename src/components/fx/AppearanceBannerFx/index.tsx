import type { CSSProperties } from 'react';

import styles from './style.module.scss';

import { Text } from '@/components/atoms/Text';

export type AppearanceKind = 'elite' | 'boss' | 'battle-start';

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
  'battle-start': {
    color: 'var(--c-primary)',
    label: 'BATTLE START',
    glow: '0 0 20px rgba(80,220,255,0.7)',
  },
};

export interface AppearanceBannerFxProps {
  /** エリート / ボス / 出撃 のどれか */
  kind?: AppearanceKind;
  /** 敵の名前 (elite / boss のとき必須、 battle-start のときは省略可) */
  name?: string;
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
 *
 * Issue #87: @keyframes は SCSS module に静的定義、 kind 別アクセント色 / glow /
 * duration は CSS 変数で渡す。
 */
export function AppearanceBannerFx({
  kind = 'elite',
  name,
  duration = 1600,
  onDone,
}: AppearanceBannerFxProps) {
  const preset = KIND_PRESET[kind];

  const wrapStyle: CSSProperties = {
    ['--app-color' as string]: preset.color,
    ['--app-glow' as string]: preset.glow,
    ['--app-duration' as string]: `${duration}ms`,
  };

  return (
    <div
      className={styles.wrap}
      style={wrapStyle}
      onAnimationEnd={onDone}
    >
      <div className={styles.flash} />
      <div className={styles.band}>
        <Text
          variant="label"
          className={styles.label}
        >
          {preset.label}
        </Text>
        {name != null && name !== '' && (
          <Text
            variant="heading-1"
            className={styles.name}
          >
            {name}
          </Text>
        )}
      </div>
    </div>
  );
}
