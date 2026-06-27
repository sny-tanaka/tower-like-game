import styles from './style.module.scss';

import alloySvg from '@/assets/icons/alloy.svg?raw';
import boltSvg from '@/assets/icons/bolt.svg?raw';
import cannonSvg from '@/assets/icons/cannon.svg?raw';
import cutterSvg from '@/assets/icons/cutter.svg?raw';
import laserSvg from '@/assets/icons/laser.svg?raw';
import screwSvg from '@/assets/icons/screw.svg?raw';
import thunderSvg from '@/assets/icons/thunder.svg?raw';

export type IconName =
  | 'close'
  | 'menu'
  | 'settings'
  | 'tower' // = 上向き正三角形 (NEON SPIRE のタワーモチーフ)
  | 'shield'
  | 'heart'
  | 'flame'
  | 'ice'
  | 'lightning'
  | 'skull'
  | 'spark'
  | 'target'
  | 'play'
  | 'pause'
  | 'chevron-left'
  | 'chevron-right'
  | 'chevron-up'
  | 'chevron-down'
  | 'check'
  | 'plus'
  | 'minus'
  | 'info'
  | 'arrow-up'
  | 'screw'
  | 'bolt'
  | 'alloy'
  | 'laser'
  | 'cannon'
  | 'thunder'
  | 'cutter';

export interface IconProps {
  name: IconName;
  size?: number;
  color?: string;
  className?: string;
}

/**
 * Currency / Weapon の SVG ファイルマップ（claude design 製の inline-svg）。
 * @kind inline-svg として `dangerouslySetInnerHTML` で埋め込み、currentColor で着色する。
 */
const INLINE_SVG_MAP: Partial<Record<IconName, string>> = {
  screw: screwSvg,
  bolt: boltSvg,
  alloy: alloySvg,
  laser: laserSvg,
  cannon: cannonSvg,
  thunder: thunderSvg,
  cutter: cutterSvg,
};

/** SVG 文字列の width/height 属性を所定の size に書き換える */
function applySize(svg: string, size: number): string {
  return svg
    .replace(/\swidth="\d+"/, ` width="${size}"`)
    .replace(/\sheight="\d+"/, ` height="${size}"`);
}

/**
 * SVG アイコン集。
 * - Currency / Weapon (`screw / bolt / alloy / laser / cannon / thunder / cutter`):
 *   claude design 製の SVG ファイル (`src/assets/icons/*.svg`) を inline で埋め込み。
 * - UI / Game 系 (`close / menu / settings / tower / ...`):
 *   ジオメトリック合成（三角・六角・菱形・円・線のみ）で JSX 内に直接記述。複雑な SVG は禁止。
 */
export function Icon({ name, size = 16, color = 'currentColor', className }: IconProps) {
  const inlineSvg = INLINE_SVG_MAP[name];
  if (inlineSvg) {
    return (
      <span
        role="img"
        aria-hidden
        className={className ? `${styles.inlineSvgWrap} ${className}` : styles.inlineSvgWrap}
        style={{ color }}
        dangerouslySetInnerHTML={{ __html: applySize(inlineSvg, size) }}
      />
    );
  }

  const svgProps = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: color,
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    xmlns: 'http://www.w3.org/2000/svg',
    className,
    'aria-hidden': true as const,
  };

  switch (name) {
    case 'close':
      return (
        <svg {...svgProps}>
          <line
            x1="4"
            y1="4"
            x2="20"
            y2="20"
          />
          <line
            x1="20"
            y1="4"
            x2="4"
            y2="20"
          />
        </svg>
      );

    case 'menu':
      return (
        <svg {...svgProps}>
          <line
            x1="3"
            y1="7"
            x2="21"
            y2="7"
          />
          <line
            x1="3"
            y1="12"
            x2="21"
            y2="12"
          />
          <line
            x1="3"
            y1="17"
            x2="21"
            y2="17"
          />
        </svg>
      );

    case 'settings':
      // gear-min: 八角形 + 中央円 で歯車を簡略表現（design ref: gear-min）
      return (
        <svg {...svgProps}>
          <polygon
            points="12,3 16,5 19,8 21,12 19,16 16,19 12,21 8,19 5,16 3,12 5,8 8,5"
            fill={color}
            fillOpacity="0.15"
            stroke={color}
          />
          <circle
            cx="12"
            cy="12"
            r="3.2"
          />
        </svg>
      );

    case 'tower':
      // NEON SPIRE のタワー = 上向きの正三角形 (旧 'triangle' と統一)
      return (
        <svg {...svgProps}>
          <polygon
            points="12,4 20,20 4,20"
            fill={color}
            stroke={color}
            strokeLinejoin="round"
          />
        </svg>
      );

    case 'shield':
      return (
        <svg {...svgProps}>
          <path d="M12 3 L20 6.5 V12 C20 16.5 16.5 19.5 12 21 C7.5 19.5 4 16.5 4 12 V6.5 Z" />
        </svg>
      );

    case 'heart':
      return (
        <svg {...svgProps}>
          <path d="M12 21 C12 21 4 14.5 4 9 C4 6.2 6.2 4 9 4 C10.4 4 11.7 4.6 12 5.5 C12.3 4.6 13.6 4 15 4 C17.8 4 20 6.2 20 9 C20 14.5 12 21 12 21Z" />
        </svg>
      );

    case 'flame':
      return (
        <svg {...svgProps}>
          <path d="M12 2C12 2 7 8 7 13C7 15.8 9.2 18 12 18C14.8 18 17 15.8 17 13C17 8 12 2 12 2Z" />
          <path
            d="M12 12C12 12 10 14 10 15.5C10 16.3 10.9 17 12 17C13.1 17 14 16.3 14 15.5C14 14 12 12 12 12Z"
            fill={color}
            stroke="none"
          />
        </svg>
      );

    case 'ice':
      return (
        <svg {...svgProps}>
          {/* 雪の結晶: 六角形 + 中心線 */}
          <line
            x1="12"
            y1="3"
            x2="12"
            y2="21"
          />
          <line
            x1="3"
            y1="7.5"
            x2="21"
            y2="16.5"
          />
          <line
            x1="3"
            y1="16.5"
            x2="21"
            y2="7.5"
          />
          <line
            x1="9"
            y1="3.5"
            x2="12"
            y2="8"
          />
          <line
            x1="15"
            y1="3.5"
            x2="12"
            y2="8"
          />
          <line
            x1="9"
            y1="20.5"
            x2="12"
            y2="16"
          />
          <line
            x1="15"
            y1="20.5"
            x2="12"
            y2="16"
          />
        </svg>
      );

    case 'lightning':
      return (
        <svg {...svgProps}>
          <polygon
            points="13,3 6,13 11,13 11,21 18,11 13,11"
            fill={color}
            stroke="none"
          />
        </svg>
      );

    case 'skull':
      return (
        <svg {...svgProps}>
          {/* 頭蓋骨: 円 + 眼窩 + 歯 */}
          <circle
            cx="12"
            cy="10"
            r="7"
          />
          <circle
            cx="9.5"
            cy="9.5"
            r="1.5"
            fill={color}
            stroke="none"
          />
          <circle
            cx="14.5"
            cy="9.5"
            r="1.5"
            fill={color}
            stroke="none"
          />
          <path
            d="M8 16 V21 M12 16 V21 M16 16 V21"
            strokeWidth="2.5"
          />
          <rect
            x="7"
            y="16"
            width="10"
            height="1.5"
            fill={color}
            stroke="none"
          />
        </svg>
      );

    case 'spark':
      return (
        <svg {...svgProps}>
          {/* 菱形の星形 */}
          <polygon
            points="12,2 14,10 22,12 14,14 12,22 10,14 2,12 10,10"
            fill={color}
            stroke="none"
          />
        </svg>
      );

    case 'target':
      return (
        <svg {...svgProps}>
          <circle
            cx="12"
            cy="12"
            r="9"
          />
          <circle
            cx="12"
            cy="12"
            r="5"
          />
          <circle
            cx="12"
            cy="12"
            r="1.5"
            fill={color}
            stroke="none"
          />
          <line
            x1="12"
            y1="3"
            x2="12"
            y2="6"
          />
          <line
            x1="12"
            y1="18"
            x2="12"
            y2="21"
          />
          <line
            x1="3"
            y1="12"
            x2="6"
            y2="12"
          />
          <line
            x1="18"
            y1="12"
            x2="21"
            y2="12"
          />
        </svg>
      );

    case 'play':
      return (
        <svg {...svgProps}>
          <polygon
            points="6,4 20,12 6,20"
            fill={color}
            stroke="none"
          />
        </svg>
      );

    case 'pause':
      return (
        <svg {...svgProps}>
          <rect
            x="5"
            y="4"
            width="5"
            height="16"
            fill={color}
            stroke="none"
          />
          <rect
            x="14"
            y="4"
            width="5"
            height="16"
            fill={color}
            stroke="none"
          />
        </svg>
      );

    case 'chevron-left':
      return (
        <svg {...svgProps}>
          <polyline points="15,5 9,12 15,19" />
        </svg>
      );

    case 'chevron-right':
      return (
        <svg {...svgProps}>
          <polyline points="9,5 15,12 9,19" />
        </svg>
      );

    case 'chevron-up':
      return (
        <svg {...svgProps}>
          <polyline points="5,15 12,9 19,15" />
        </svg>
      );

    case 'chevron-down':
      return (
        <svg {...svgProps}>
          <polyline points="5,9 12,15 19,9" />
        </svg>
      );

    case 'check':
      return (
        <svg {...svgProps}>
          <polyline
            points="4,12 9,17 20,6"
            strokeWidth="2.5"
          />
        </svg>
      );

    case 'plus':
      return (
        <svg {...svgProps}>
          <line
            x1="12"
            y1="4"
            x2="12"
            y2="20"
            strokeWidth="2.5"
          />
          <line
            x1="4"
            y1="12"
            x2="20"
            y2="12"
            strokeWidth="2.5"
          />
        </svg>
      );

    case 'minus':
      return (
        <svg {...svgProps}>
          <line
            x1="4"
            y1="12"
            x2="20"
            y2="12"
            strokeWidth="2.5"
          />
        </svg>
      );

    case 'info':
      return (
        <svg {...svgProps}>
          <circle
            cx="12"
            cy="12"
            r="9"
          />
          <line
            x1="12"
            y1="8"
            x2="12"
            y2="8"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <line
            x1="12"
            y1="11"
            x2="12"
            y2="17"
            strokeWidth="2"
          />
        </svg>
      );

    case 'arrow-up':
      return (
        <svg {...svgProps}>
          <line
            x1="12"
            y1="19"
            x2="12"
            y2="5"
            strokeWidth="2"
          />
          <polyline
            points="6,11 12,5 18,11"
            strokeWidth="2"
          />
        </svg>
      );

    default:
      // Currency / Weapon は INLINE_SVG_MAP の早期 return で処理済み
      return null;
  }
}
