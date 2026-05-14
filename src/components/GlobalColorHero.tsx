export function GlobalColorHero() {
  const W = 900;
  const H = 380;
  const bg = '#151515'; // Dark theme background for vibrant contrast

  // Color scales matching the page values (200, 400, 600, 800)
  const scales = [
    ['#ff93a0', '#f4213c', '#ab1326', '#53030d'], // Red
    ['#e7a727', '#aa750b', '#755006', '#372502'], // Amber
    ['#8aff8a', '#00d51a', '#008101', '#002d00'], // Green
    ['#7cbbff', '#0780ff', '#0057b1', '#002852'], // Blue
    ['#d0d0d2', '#9a9a9d', '#6e6e73', '#28282a'], // Grey
  ];

  const yOffsets = [20, 0, -10, 0, 20]; // Creates a subtle wave effect

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
        <rect width={W} height={H} fill={bg} />
        
        {/* Abstract decorative circles in the background */}
        <circle cx={150} cy={100} r={300} fill="#ffffff" opacity={0.02} />
        <circle cx={750} cy={280} r={200} fill="#ffffff" opacity={0.03} />

        <g transform="translate(230, 80)">
          {scales.map((scale, i) => (
            <g key={i} transform={`translate(${i * 90}, ${yOffsets[i]})`}>
              {scale.map((color, j) => (
                <rect
                  key={j}
                  x={0}
                  y={j * 50}
                  width={80}
                  height={80}
                  rx={20}
                  fill={color}
                  stroke={bg}
                  strokeWidth={6}
                  style={{
                    transformOrigin: 'center',
                    transition: 'all 0.3s ease',
                  }}
                />
              ))}
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}
