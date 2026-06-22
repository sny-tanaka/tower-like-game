/**
 * Icon — ジオメトリックなシンボル Atom
 *
 * ルール（守る）:
 *   - 「複雑な SVG は禁止」原則。形は 三角・六角・菱形・円・線 のみで構成
 *   - currency / weapon は画像生成 AI 製の SVG を `inline-svg` で埋め込み（currentColor 継承）
 *   - currentColor で塗るので親から color を渡せる
 *   - size: 数値 px (default 20)
 *
 * 名前空間:
 *   currency: screw / bolt / alloy
 *   weapon:   laser / cannon / thunder / cutter
 *   ui:       close / menu / settings / play / pause / chevron / chevron-right
 *             / chevron-down / plus / minus / check / info / arrow-up
 *   game:     tower / shield / heart / flame / ice / lightning / skull
 *             / spark / target
 */
const ICON_PATHS = {
  /* ---------- currency（画像生成 AI 製 SVG / assets/icons/） ---------- */
  screw: [
    'inline-svg',
    `<path d="M 5 5 L 9 9 L 8 10 L 9 11.5 L 8 13 L 9 14.5 L 8 16 L 9 17.5 L 8 19 L 9 20.5 L 12 22.5 L 16 20.5 L 15 19 L 16 17.5 L 15 16 L 16 14.5 L 15 13 L 16 11.5 L 15 10 L 15 9 L 19 5 Z" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M 8 10 L 16 11.5 M 8 13 L 16 14.5 M 8 16 L 16 17.5 M 8 19 L 16 20.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><ellipse cx="12" cy="5" rx="7" ry="2.5" fill="currentColor" fill-opacity="0.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></ellipse><path d="M 12 3.5 V 6.5 M 10 5 H 14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>`,
  ],
  bolt: [
    'inline-svg',
    `<path d="M 9 7 L 8 8 L 9 9.5 L 8 11 L 9 12.5 L 8 14 L 9 15.5 L 8 17 L 9 18.5 L 8 20 L 9 21.5 L 10 22 L 14 22 L 16 21.5 L 15 20 L 16 18.5 L 15 17 L 16 15.5 L 15 14 L 16 12.5 L 15 11 L 16 9.5 L 15 8 L 15 7 Z" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M 8 8 L 16 9.5 M 8 11 L 16 12.5 M 8 14 L 16 15.5 M 8 17 L 16 18.5 M 8 20 L 16 21.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M 5 4 L 9 3 L 15 3 L 19 4 L 19 6 L 15 7 L 9 7 L 5 6 Z" fill="currentColor" fill-opacity="0.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M 9 3 V 7 M 15 3 V 7" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>`,
  ],
  alloy: [
    'inline-svg',
    `<polygon points="12,5 20,9 12,13 4,9" fill="currentColor" fill-opacity="0.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></polygon><polygon points="4,9 12,13 12,20 4,16" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></polygon><polygon points="12,13 20,9 20,16 12,20" fill="currentColor" fill-opacity="0.1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></polygon>`,
  ],

  /* ---------- weapon（画像生成 AI 製 SVG / assets/icons/） ---------- */
  laser: [
    'inline-svg',
    `<rect x="3" y="9" width="5" height="6" rx="1" fill="currentColor" fill-opacity="0.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></rect><path d="M8,9 L21,12 L8,15 Z" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><line x1="8" y1="12" x2="19" y2="12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></line>`,
  ],
  cannon: [
    'inline-svg',
    `<path d="M4,7 L8,7 A1.5,3.5 0 0,1 8,17 L4,17 Z" fill="currentColor" fill-opacity="0.3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M8,8.5 L18,8.5 A1.5,3.5 0 0,1 18,15.5 L8,15.5 A1.5,3.5 0 0,1 8,8.5 Z" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><ellipse cx="18" cy="12" rx="1.5" ry="3.5" fill="currentColor" fill-opacity="0.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></ellipse><line x1="13" y1="8.5" x2="13" y2="15.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></line>`,
  ],
  thunder: [
    'inline-svg',
    `<polygon points="14,3 8,12 13,12 9,21 16,10 11,10" fill="currentColor" fill-opacity="0.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></polygon><polygon points="19,13 16,17 18.5,17 17,21 21,16 18.5,16" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></polygon>`,
  ],
  cutter: [
    'inline-svg',
    `<circle cx="12" cy="12" r="3" fill="currentColor" fill-opacity="0.1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></circle><g fill="currentColor" fill-opacity="0.3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M 12 3 A 9 9 0 0 1 21 12 L 18 12 C 18 8 16 5 12 5 Z"></path><path d="M 12 3 A 9 9 0 0 1 21 12 L 18 12 C 18 8 16 5 12 5 Z" transform="rotate(120 12 12)"></path><path d="M 12 3 A 9 9 0 0 1 21 12 L 18 12 C 18 8 16 5 12 5 Z" transform="rotate(240 12 12)"></path></g>`,
  ],

  /* ---------- ui ---------- */
  close: ['x', null],
  menu: ['hamburger', null],
  settings: ['gear-min', null],
  play: ['polygon', '6 4, 6 20, 20 12'],
  pause: ['pause', null],
  'chevron-right': ['polyline', '9 6, 15 12, 9 18'],
  'chevron-left': ['polyline', '15 6, 9 12, 15 18'],
  'chevron-down': ['polyline', '6 9, 12 15, 18 9'],
  'chevron-up': ['polyline', '6 15, 12 9, 18 15'],
  plus: ['plus', null],
  minus: ['line', '5 12, 19 12'],
  check: ['polyline', '4 12, 10 18, 20 6'],
  info: ['info', null],
  'arrow-up': ['polyline', '12 4, 12 20, 12 4, 6 10, 12 4, 18 10'],

  /* ---------- game ---------- */
  tower: ['polygon', '12 2, 4 22, 20 22'], // ピラミッド
  shield: ['polygon', '12 2, 21 6, 19 14, 12 22, 5 14, 3 6'],
  heart: ['polygon', '12 7, 9 4, 4 7, 4 12, 12 21, 20 12, 20 7, 15 4, 12 7'],
  flame: ['polygon', '12 2, 7 8, 9 12, 5 16, 12 22, 19 16, 15 12, 17 8'],
  ice: ['polygon', '12 2, 14 8, 20 8, 16 13, 18 20, 12 16, 6 20, 8 13, 4 8, 10 8'],
  lightning: ['polyline', '13 2, 5 14, 11 14, 11 22, 19 10, 13 10, 13 2'],
  skull: ['skull', null],
  spark: ['polygon', '12 2, 13 11, 22 12, 13 13, 12 22, 11 13, 2 12, 11 11'],
  target: ['target', null],
};

export function Icon(props) {
  const { name, size = 20, color = 'currentColor', strokeWidth = 1.6, ...rest } = props;
  const entry = ICON_PATHS[name];
  if (!entry) {
    return React.createElement(
      'span',
      {
        style: {
          display: 'inline-block',
          width: size,
          height: size,
          border: '1px dashed var(--c-text-disabled)',
          color: 'var(--c-text-disabled)',
          fontSize: 9,
          textAlign: 'center',
          lineHeight: size + 'px',
        },
      },
      '?'
    );
  }
  const [kind, data] = entry;

  // 画像生成 AI 製の SVG はそのまま埋め込む（currentColor で親色を継承）。
  if (kind === 'inline-svg') {
    return React.createElement('svg', {
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      style: { display: 'inline-block', verticalAlign: 'middle', color },
      ...rest,
      dangerouslySetInnerHTML: { __html: data },
    });
  }

  const svgProps = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: color,
    strokeWidth,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    style: { display: 'inline-block', verticalAlign: 'middle' },
    ...rest,
  };

  let body = null;
  if (kind === 'polygon') {
    body = React.createElement('polygon', {
      points: data,
      fill: color,
      fillOpacity: 0.18,
      stroke: color,
    });
  } else if (kind === 'polyline') {
    body = React.createElement('polyline', { points: data, fill: 'none' });
  } else if (kind === 'line') {
    const [x1, y1, x2, y2] = data.split(/[ ,]+/).map(Number);
    body = React.createElement('line', { x1, y1, x2, y2 });
  } else if (kind === 'hex') {
    body = React.createElement('polygon', {
      points: '12 3, 20 7.5, 20 16.5, 12 21, 4 16.5, 4 7.5',
      fill: color,
      fillOpacity: 0.18,
      stroke: color,
    });
  } else if (kind === 'ring') {
    body = [
      React.createElement('circle', { key: 'o', cx: 12, cy: 12, r: 9 }),
      React.createElement('circle', {
        key: 'i',
        cx: 12,
        cy: 12,
        r: 4,
        fill: color,
        fillOpacity: 0.25,
      }),
    ];
  } else if (kind === 'cross') {
    body = [
      React.createElement('line', { key: 'a', x1: 5, y1: 5, x2: 19, y2: 19 }),
      React.createElement('line', { key: 'b', x1: 19, y1: 5, x2: 5, y2: 19 }),
      React.createElement('circle', {
        key: 'c',
        cx: 12,
        cy: 12,
        r: 2.2,
        fill: color,
        stroke: 'none',
      }),
    ];
  } else if (kind === 'x') {
    body = [
      React.createElement('line', { key: 'a', x1: 6, y1: 6, x2: 18, y2: 18 }),
      React.createElement('line', { key: 'b', x1: 18, y1: 6, x2: 6, y2: 18 }),
    ];
  } else if (kind === 'plus') {
    body = [
      React.createElement('line', { key: 'a', x1: 12, y1: 5, x2: 12, y2: 19 }),
      React.createElement('line', { key: 'b', x1: 5, y1: 12, x2: 19, y2: 12 }),
    ];
  } else if (kind === 'pause') {
    body = [
      React.createElement('rect', {
        key: 'a',
        x: 6,
        y: 5,
        width: 4,
        height: 14,
        fill: color,
        stroke: 'none',
      }),
      React.createElement('rect', {
        key: 'b',
        x: 14,
        y: 5,
        width: 4,
        height: 14,
        fill: color,
        stroke: 'none',
      }),
    ];
  } else if (kind === 'hamburger') {
    body = [
      React.createElement('line', { key: 'a', x1: 4, y1: 7, x2: 20, y2: 7 }),
      React.createElement('line', { key: 'b', x1: 4, y1: 12, x2: 20, y2: 12 }),
      React.createElement('line', { key: 'c', x1: 4, y1: 17, x2: 20, y2: 17 }),
    ];
  } else if (kind === 'gear-min') {
    // 八角形 + 中央円 で簡略表現
    body = [
      React.createElement('polygon', {
        key: 'o',
        points: '12 3, 16 5, 19 8, 21 12, 19 16, 16 19, 12 21, 8 19, 5 16, 3 12, 5 8, 8 5',
        fill: color,
        fillOpacity: 0.15,
        stroke: color,
      }),
      React.createElement('circle', { key: 'i', cx: 12, cy: 12, r: 3.2 }),
    ];
  } else if (kind === 'info') {
    body = [
      React.createElement('circle', { key: 'o', cx: 12, cy: 12, r: 9 }),
      React.createElement('line', { key: 'b', x1: 12, y1: 11, x2: 12, y2: 17 }),
      React.createElement('circle', {
        key: 'd',
        cx: 12,
        cy: 7.5,
        r: 1,
        fill: color,
        stroke: 'none',
      }),
    ];
  } else if (kind === 'skull') {
    body = [
      React.createElement('polygon', {
        key: 'h',
        points: '12 3, 19 6, 20 13, 17 17, 17 21, 7 21, 7 17, 4 13, 5 6',
        fill: color,
        fillOpacity: 0.2,
        stroke: color,
      }),
      React.createElement('circle', {
        key: 'e1',
        cx: 9,
        cy: 13,
        r: 1.4,
        fill: color,
        stroke: 'none',
      }),
      React.createElement('circle', {
        key: 'e2',
        cx: 15,
        cy: 13,
        r: 1.4,
        fill: color,
        stroke: 'none',
      }),
    ];
  } else if (kind === 'ai-slot') {
    // 画像生成 AI が SVG を生成するまでのプレースホルダ。
    // ストライプ柄 + 六角形枠 + ラベルを描画して「ここに何が入るか」を明示。
    const stripeId = 'aiSlotStripes-' + Math.random().toString(36).slice(2, 7);
    body = [
      React.createElement(
        'defs',
        { key: 'd' },
        React.createElement(
          'pattern',
          {
            id: stripeId,
            width: 4,
            height: 4,
            patternUnits: 'userSpaceOnUse',
            patternTransform: 'rotate(45)',
          },
          React.createElement('line', {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 4,
            stroke: color,
            strokeOpacity: 0.18,
            strokeWidth: 1,
          })
        )
      ),
      React.createElement('rect', {
        key: 'fill',
        x: 2,
        y: 2,
        width: 20,
        height: 20,
        rx: 2,
        fill: `url(#${stripeId})`,
        stroke: 'none',
      }),
      React.createElement('rect', {
        key: 'frame',
        x: 2,
        y: 2,
        width: 20,
        height: 20,
        rx: 2,
        fill: 'none',
        stroke: color,
        strokeOpacity: 0.5,
        strokeDasharray: '2 2',
      }),
    ];
    // ラベルは size が十分大きいときだけ表示
    if (size >= 28) {
      body.push(
        React.createElement(
          'text',
          {
            key: 'label',
            x: 12,
            y: 13.5,
            textAnchor: 'middle',
            fontFamily: 'ui-monospace, monospace',
            fontSize: 3.6,
            fontWeight: 600,
            fill: color,
            fillOpacity: 0.7,
            stroke: 'none',
            letterSpacing: 0.2,
          },
          'AI-GEN'
        )
      );
    }
  } else if (kind === 'target') {
    body = [
      React.createElement('circle', { key: 'o', cx: 12, cy: 12, r: 9 }),
      React.createElement('circle', { key: 'm', cx: 12, cy: 12, r: 5 }),
      React.createElement('circle', {
        key: 'i',
        cx: 12,
        cy: 12,
        r: 1.5,
        fill: color,
        stroke: 'none',
      }),
    ];
  }

  return React.createElement('svg', svgProps, body);
}

Icon.names = Object.keys(ICON_PATHS);
