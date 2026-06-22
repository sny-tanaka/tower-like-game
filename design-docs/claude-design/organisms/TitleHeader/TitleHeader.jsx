/**
 * TitleHeader — タイトル画面ロゴ Organism
 *
 * - title: ゲーム名 (default "TOWER LIKE GAME")
 * - subtitle: サブタイトル / タグライン
 * - version: バージョン表記 (例 "v0.1.0")
 * - tagline: 任意の 1 行 (default なし)
 *
 * メインタイトルは cyan→purple グラデのテキスト + 中央配置。
 */
export function TitleHeader(props) {
  const { title = 'TOWER LIKE GAME', subtitle, version, tagline } = props;

  const { Text } = window.TowerLikeGame_28197d;

  return React.createElement(
    'header',
    {
      style: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 6,
        padding: '32px 16px 16px',
        textAlign: 'center',
      },
      role: 'banner',
    },

    React.createElement(
      'h1',
      {
        style: {
          fontFamily: 'var(--ff-display)',
          fontWeight: 700,
          fontSize: 32,
          letterSpacing: '0.06em',
          margin: 0,
          background: 'linear-gradient(120deg, var(--c-primary-hi), var(--c-secondary-hi))',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
          filter: 'drop-shadow(0 0 12px rgba(78,228,246,0.35))',
          lineHeight: 1.1,
        },
      },
      title
    ),

    subtitle &&
      React.createElement(
        Text,
        {
          variant: 'label',
          color: 'mid',
          align: 'center',
          style: { fontSize: 11, letterSpacing: '0.24em' },
        },
        subtitle
      ),

    tagline &&
      React.createElement(
        Text,
        {
          variant: 'caption',
          color: 'dim',
          align: 'center',
          style: { marginTop: 4, fontSize: 11 },
        },
        tagline
      ),

    version &&
      React.createElement(
        Text,
        {
          variant: 'numeric-s',
          color: 'dim',
          align: 'center',
          style: { fontSize: 10, marginTop: 6, opacity: 0.7 },
        },
        version
      )
  );
}
