import styles from './style.module.scss';

import type { StatPart } from '@/hooks/useMachineStatsBreakdown';

export interface StatBreakdownRowProps {
  /** スタッツのタイトル (例: "攻撃力") */
  title: string;
  /** 数式の分解パート列 */
  parts: StatPart[];
  /** 補足表示 (例: "クリ時 ×200% = 1.61K", "→ 0.385秒/発") */
  note?: string;
  /** 上限注記 (例: "上限 98%") */
  cap?: string;
}

/**
 * 1 スタッツぶんの「基礎 × A × B = 最終値」 数式を 1 行で表示する atom。
 *
 * MachineStatsBreakdownOverlay が 11 スタッツぶん並べて使う。 v1.3.9 新設。
 *
 * 設計方針:
 *   - 状態を持たない pure presentational atom (props のみ)
 *   - 演算記号 (× / + / =) は kind から自動で出す
 *   - ラベル (例: 「永続」 「Tier差」) は数値の真下に small text で出す
 *   - flex-wrap でモバイル幅に折り返し対応 (狭い画面でも数式が分断しない見え方)
 */
export function StatBreakdownRow({ title, parts, note, cap }: StatBreakdownRowProps) {
  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <span className={styles.title}>{title}</span>
        {cap && <span className={styles.cap}>{cap}</span>}
      </div>
      <div className={styles.formula}>
        {parts.map((p, i) => (
          <span
            key={i}
            className={styles[`part-${p.kind}`]}
          >
            {p.kind !== 'base' && <span className={styles.op}>{opSymbol(p.kind)}</span>}
            <span className={styles.partBody}>
              <span className={styles.value}>{p.display}</span>
              {p.label && <span className={styles.label}>{p.label}</span>}
            </span>
          </span>
        ))}
      </div>
      {note && <div className={styles.note}>{note}</div>}
    </div>
  );
}

/** kind から演算記号を返す。 'base' は記号なし (左端) */
function opSymbol(kind: StatPart['kind']): string {
  switch (kind) {
    case 'mul':
      return '×';
    case 'add':
      return '+';
    case 'final':
      return '=';
    default:
      return '';
  }
}
