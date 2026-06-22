import styles from './style.module.scss';

import { Text } from '@/components/atoms/Text';

export interface TitleHeaderProps {
  /** ゲーム名 (default "NEON SPIRE") */
  title?: string;
  /** サブタイトル / タグライン */
  subtitle?: string;
  /** バージョン表記 (例 "v0.1.0") */
  version?: string;
  /** 任意の 1 行補足 */
  tagline?: string;
}

/**
 * TitleHeader — タイトル画面ロゴ Organism
 *
 * 大型タイトルテキスト (cyan→purple グラデ) + サブタイトル / バージョン
 * を中央配置する。
 */
export function TitleHeader({
  title = 'NEON SPIRE',
  subtitle,
  version,
  tagline,
}: TitleHeaderProps) {
  return (
    <header
      className={styles.root}
      role="banner"
    >
      <h1 className={styles.title}>{title}</h1>

      {subtitle != null && (
        <Text
          variant="label"
          color="mid"
          align="center"
          style={{ fontSize: 11, letterSpacing: '0.24em' }}
        >
          {subtitle}
        </Text>
      )}

      {tagline != null && (
        <Text
          variant="caption"
          color="dim"
          align="center"
          style={{ marginTop: 4, fontSize: 11 }}
        >
          {tagline}
        </Text>
      )}

      {version != null && (
        <Text
          variant="numeric-s"
          color="dim"
          align="center"
          style={{ fontSize: 10, marginTop: 6, opacity: 0.7 }}
        >
          {version}
        </Text>
      )}
    </header>
  );
}
