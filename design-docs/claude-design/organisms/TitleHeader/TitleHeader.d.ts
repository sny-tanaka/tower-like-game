export interface TitleHeaderProps {
  /** ゲーム名 (default 'TOWER LIKE GAME') */
  title?: string;
  /** サブタイトル */
  subtitle?: string;
  /** バージョン表記 */
  version?: string;
  /** 任意のタグライン */
  tagline?: string;
}

export declare function TitleHeader(props: TitleHeaderProps): JSX.Element;
