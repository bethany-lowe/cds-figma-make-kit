export function TokensHero() {
  // Amber palette
  const bg = '#FFB100';
  const pill1 = '#C47E00';   // lightest pill
  const pill2 = '#9A6100';   // mid pill
  const pill3 = '#6B4200';   // darkest pill
  const endCircle = '#3D2300';
  const lineColor = '#FFB100'; // line punches through in bg color
  const nodeFill = '#FFB100';

  // Layout constants
  const W = 900;
  const H = 380;
  const pillW = 380;
  const pillH = 62;
  const pillRx = 31;
  const pillX = (W - pillW) / 2; // 260
  const p1Y = 64;
  const p2Y = 158;
  const p3Y = 252;
  const lineX = 484;
  const p1CY = p1Y + pillH / 2;  // 95
  const p2CY = p2Y + pillH / 2;  // 189
  const p3CY = p3Y + pillH / 2;  // 283
  const circleR = 36;
  const circleCY = p3Y + pillH + 40 + circleR; // ~354, fits in 380

  // Icon positioning (left portion of each pill)
  const iconX = pillX + 42;

  return (
    <div
      className="w-full rounded-3xl overflow-hidden"
      style={{ backgroundColor: bg, aspectRatio: '900 / 380' }}
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: '100%', display: 'block' }}
      >
        {/* Background */}
        <rect width={W} height={H} fill={bg} />

        {/* Pill 1 — Primitive tokens */}
        <rect x={pillX} y={p1Y} width={pillW} height={pillH} rx={pillRx} fill={pill1} />
        {/* Pill 2 — Brand tokens */}
        <rect x={pillX} y={p2Y} width={pillW} height={pillH} rx={pillRx} fill={pill2} />
        {/* Pill 3 — Semantic tokens */}
        <rect x={pillX} y={p3Y} width={pillW} height={pillH} rx={pillRx} fill={pill3} />

        {/* Vertical connecting line — drawn in bg color, punches through pills */}
        <line
          x1={lineX} y1={p1CY}
          x2={lineX} y2={circleCY - circleR}
          stroke={lineColor}
          strokeWidth={3}
        />

        {/* Node dots on each pill */}
        <circle cx={lineX} cy={p1CY} r={8} fill={nodeFill} />
        <circle cx={lineX} cy={p2CY} r={8} fill={nodeFill} />
        <circle cx={lineX} cy={p3CY} r={8} fill={nodeFill} />

        {/* End circle */}
        <circle cx={lineX} cy={circleCY} r={circleR} fill={endCircle} />

        {/* ── Icons ── */}

        {/* Pill 1 icon: wave / squiggle (primitive — raw value) */}
        <g transform={`translate(${iconX}, ${p1CY})`}>
          <path
            d="M-14 8 C-9 8 -6 -8 0 -8 C6 -8 9 8 14 8"
            stroke={bg}
            strokeWidth={3.5}
            strokeLinecap="round"
            fill="none"
          />
        </g>

        {/* Pill 2 icon: eyedropper (brand/color token) */}
        <g transform={`translate(${iconX}, ${p2CY})`}>
          <path
            d="M5 -12 L12 -5 L0 8 L-8 0 Z"
            stroke={bg}
            strokeWidth={2.5}
            strokeLinejoin="round"
            fill="none"
          />
          <path
            d="M-8 0 L-13 5 Q-15 8 -12 11 Q-9 14 -6 12 L-2 7"
            stroke={bg}
            strokeWidth={2.5}
            strokeLinecap="round"
            fill="none"
          />
          <circle cx={11} cy={-9} r={3} fill={bg} />
        </g>

        {/* Pill 3 icon: 2×2 grid (component/semantic) */}
        <g transform={`translate(${iconX}, ${p3CY})`}>
          {/* top-left */}
          <rect x={-14} y={-13} width={11} height={11} rx={2} fill={bg} />
          {/* top-right */}
          <rect x={1} y={-13} width={11} height={11} rx={2} fill={bg} />
          {/* bottom-left */}
          <rect x={-14} y={2} width={11} height={11} rx={2} fill={bg} />
          {/* bottom-right */}
          <rect x={1} y={2} width={11} height={11} rx={2} fill={bg} />
        </g>

        {/* Token labels on pills */}
        <text
          x={pillX + pillW - 48}
          y={p1CY + 5}
          textAnchor="end"
          fontSize={13}
          fontFamily="'Noto Sans', sans-serif"
          fontWeight={500}
          fill={bg}
          opacity={0.7}
        >
          Primitive
        </text>
        <text
          x={pillX + pillW - 48}
          y={p2CY + 5}
          textAnchor="end"
          fontSize={13}
          fontFamily="'Noto Sans', sans-serif"
          fontWeight={500}
          fill={bg}
          opacity={0.7}
        >
          Brand
        </text>
        <text
          x={pillX + pillW - 48}
          y={p3CY + 5}
          textAnchor="end"
          fontSize={13}
          fontFamily="'Noto Sans', sans-serif"
          fontWeight={500}
          fill={bg}
          opacity={0.7}
        >
          Semantic
        </text>
      </svg>
    </div>
  );
}
