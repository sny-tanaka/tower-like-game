import styles from './style.module.scss';

import { Icon } from '@/components/atoms/Icon';

export interface TitleHeroProps {
  /** ヒーロー全体サイズ (px)。default 180 */
  size?: number;
  /** 中央アイコン名。default 'tower' (= 上向き三角) */
  iconName?: 'tower' | 'shield' | 'laser' | 'spark';
}

/**
 * TitleHero — タイトル画面の中央エンブレム Organism
 *
 * 同心円リング (cyan dashed / purple dotted / radial glow) と
 * 4 隅のアクセント、中央の三角形アイコンを重ねた静的な紋章。
 * デザインは [TitleScreen.html] の `hero` 部分に準拠。
 */
export function TitleHero({ size = 180, iconName = 'tower' }: TitleHeroProps) {
  return (
    <div
      className={styles.root}
      style={{ width: size, height: size }}
      role="presentation"
      aria-hidden="true"
    >
      <div className={styles.ringOuter} />
      <div className={styles.ringMiddle} />
      <div className={styles.glowDisc} />
      {[0, 90, 180, 270].map((deg) => (
        <div
          key={deg}
          className={styles.cornerAccent}
          style={{ transform: `rotate(${deg}deg) translate(${size / 2 - 5}px) rotate(45deg)` }}
        />
      ))}
      <span className={styles.icon}>
        <Icon
          name={iconName}
          size={Math.round(size * 0.49)}
        />
      </span>
    </div>
  );
}
