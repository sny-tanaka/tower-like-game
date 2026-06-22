export type IconName =
  | 'close'
  | 'menu'
  | 'settings'
  | 'tower'
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
 * ジオメトリック合成 SVG アイコン集。
 * 三角・六角・菱形・円・線のみで構成。複雑な SVG パスは禁止。
 * Currency / Weapon 系は後でファイル差し替え想定のプレースホルダ。
 */
export function Icon({ name, size = 16, color = 'currentColor', className }: IconProps) {
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
      return (
        <svg {...svgProps}>
          <circle
            cx="12"
            cy="12"
            r="3"
          />
          <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M16.9 16.9l1.5 1.5M5.6 18.4l1.4-1.4M16.9 7.1l1.5-1.5" />
        </svg>
      );

    case 'tower':
      return (
        <svg {...svgProps}>
          {/* ジオメトリックなタワー: 三角の頂部 + 長方形の塔身 + 台座 */}
          <polygon
            points="12,3 18,10 6,10"
            fill={color}
            stroke="none"
          />
          <rect
            x="8"
            y="10"
            width="8"
            height="9"
          />
          <rect
            x="5"
            y="19"
            width="14"
            height="2"
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

    // --- Currency / Weapon placeholders (ジオメトリック代替、後でSVG差し替え予定) ---
    case 'screw':
      return (
        <svg {...svgProps}>
          {/* ネジ: 六角形 + 縦線 */}
          <polygon points="12,4 16,6.5 16,12 12,14.5 8,12 8,6.5" />
          <line
            x1="12"
            y1="14.5"
            x2="12"
            y2="20"
            strokeWidth="2.5"
          />
          <line
            x1="9"
            y1="16"
            x2="15"
            y2="16"
          />
          <line
            x1="9"
            y1="18.5"
            x2="15"
            y2="18.5"
          />
        </svg>
      );

    case 'bolt':
      return (
        <svg {...svgProps}>
          {/* ボルト: 六角頭 + 棒 */}
          <polygon points="12,3 17,6 17,10 12,13 7,10 7,6" />
          <rect
            x="10.5"
            y="13"
            width="3"
            height="8"
            rx="1"
            fill={color}
            stroke="none"
          />
          <line
            x1="8.5"
            y1="20"
            x2="15.5"
            y2="20"
            strokeWidth="2"
          />
        </svg>
      );

    case 'alloy':
      return (
        <svg {...svgProps}>
          {/* 合金: 菱形 */}
          <polygon points="12,3 20,12 12,21 4,12" />
          <polygon
            points="12,7 16,12 12,17 8,12"
            fill={color}
            stroke="none"
          />
        </svg>
      );

    case 'laser':
      return (
        <svg {...svgProps}>
          {/* レーザー: 集束する線 */}
          <line
            x1="3"
            y1="5"
            x2="21"
            y2="12"
            strokeWidth="2"
          />
          <line
            x1="3"
            y1="19"
            x2="21"
            y2="12"
            strokeWidth="2"
          />
          <circle
            cx="21"
            cy="12"
            r="2"
            fill={color}
            stroke="none"
          />
        </svg>
      );

    case 'cannon':
      return (
        <svg {...svgProps}>
          {/* 大砲: 円筒形 */}
          <rect
            x="3"
            y="9"
            width="14"
            height="6"
            rx="3"
          />
          <rect
            x="17"
            y="10.5"
            width="4"
            height="3"
            rx="1"
            fill={color}
            stroke="none"
          />
          <circle
            cx="8"
            cy="12"
            r="1.5"
            fill={color}
            stroke="none"
          />
        </svg>
      );

    case 'thunder':
      return (
        <svg {...svgProps}>
          {/* サンダー: ジグザグ稲妻 */}
          <polyline
            points="13,2 8,12 12,12 11,22 18,10 13,10 16,2"
            fill={color}
            stroke="none"
          />
        </svg>
      );

    case 'cutter':
      return (
        <svg {...svgProps}>
          {/* カッター: 菱形の刃 */}
          <polygon points="12,2 22,12 12,22 2,12" />
          <line
            x1="2"
            y1="12"
            x2="22"
            y2="12"
          />
          <line
            x1="12"
            y1="2"
            x2="12"
            y2="22"
          />
        </svg>
      );

    default:
      // TypeScript exhaustive check helper
      return null;
  }
}
