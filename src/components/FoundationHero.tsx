import { useTheme } from '../contexts/ThemeContext';

export type FoundationType = 
  | 'brand-color' 
  | 'semantic-color' 
  | 'typography' 
  | 'spacing' 
  | 'border-width' 
  | 'border-radius' 
  | 'elevation' 
  | 'dimension' 
  | 'layout';

export function FoundationHero({ type }: { type: FoundationType }) {
  const { brand } = useTheme();
  
  const W = 900;
  const H = 380;
  
  // Theme-aware colors
  const primary = brand === 'telus' ? '#4b286d' : '#FFB100'; // Telus Purple : Homi Amber
  const secondary = brand === 'telus' ? '#2B8000' : '#151515'; // Telus Green : Homi Dark
  
  const renderContent = () => {
    switch (type) {
      case 'brand-color':
        return (
          <g>
            <rect width={W} height={H} fill={primary} />
            <circle cx={W/2} cy={H/2} r={300} fill={secondary} opacity={0.8} />
            <circle cx={W/2 - 150} cy={H/2 - 50} r={180} fill="#ffffff" opacity={0.2} />
            <circle cx={W/2 + 150} cy={H/2 + 50} r={180} fill="#ffffff" opacity={0.2} />
            {/* Palette shapes */}
            <path d="M450,90 C560,90 650,180 650,290 C650,320 620,350 590,350 C570,350 550,330 550,310 C550,290 570,270 570,250 C570,180 510,120 440,120 C370,120 310,180 310,250 C310,320 370,380 440,380 C470,380 490,400 490,420 C490,450 460,480 430,480 C320,480 230,390 230,280 C230,170 330,90 450,90 Z" fill="#ffffff" opacity={0.9} transform="scale(0.8) translate(150, -20)"/>
          </g>
        );
        
      case 'semantic-color':
        return (
          <g>
            <rect width={W} height={H} fill="#151515" />
            <g transform="translate(180, 90)">
              {/* Success, Error, Info, Warning blocks */}
              <rect x={0} y={0} width={250} height={90} rx={16} fill="#008101" />
              <rect x={270} y={0} width={250} height={90} rx={16} fill="#0780ff" />
              <rect x={0} y={110} width={250} height={90} rx={16} fill="#d80b25" />
              <rect x={270} y={110} width={250} height={90} rx={16} fill="#e7a727" />
              
              <circle cx={40} cy={45} r={12} fill="#ffffff" opacity={0.4} />
              <circle cx={310} cy={45} r={12} fill="#ffffff" opacity={0.4} />
              <circle cx={40} cy={155} r={12} fill="#ffffff" opacity={0.4} />
              <circle cx={310} cy={155} r={12} fill="#ffffff" opacity={0.4} />
              
              <rect x={70} y={35} width={120} height={8} rx={4} fill="#ffffff" opacity={0.5} />
              <rect x={340} y={35} width={120} height={8} rx={4} fill="#ffffff" opacity={0.5} />
              <rect x={70} y={145} width={120} height={8} rx={4} fill="#ffffff" opacity={0.5} />
              <rect x={340} y={145} width={120} height={8} rx={4} fill="#ffffff" opacity={0.5} />
            </g>
          </g>
        );
        
      case 'typography':
        return (
          <g>
            <rect width={W} height={H} fill="#f4f4f7" />
            {/* Baseline guides */}
            <line x1={0} y1={120} x2={W} y2={120} stroke="#d0d0d2" strokeWidth={2} strokeDasharray="8 8" />
            <line x1={0} y1={280} x2={W} y2={280} stroke="#4b286d" strokeWidth={2} />
            
            <text x={W/2} y={280} fontSize={220} fontFamily="Arial, sans-serif" fontWeight="bold" fill="#151515" textAnchor="middle">
              Aa
            </text>
            <text x={W/2 + 200} y={280} fontSize={100} fontFamily="Arial, sans-serif" fontWeight="normal" fill="#6e6e73" textAnchor="start">
              Gg
            </text>
            <text x={W/2 - 200} y={180} fontSize={60} fontFamily="Arial, sans-serif" fontWeight="bold" fill="#6e6e73" textAnchor="end">
              H1
            </text>
          </g>
        );
        
      case 'spacing':
        return (
          <g>
            <rect width={W} height={H} fill="#e9f5ff" />
            <g transform="translate(300, 70)">
              {/* Box model representation */}
              <rect x={0} y={0} width={300} height={240} rx={0} fill="#7cbbff" opacity={0.3} stroke="#0780ff" strokeWidth={2} strokeDasharray="4 4"/>
              <rect x={40} y={40} width={220} height={160} rx={0} fill="#b1d7fe" stroke="#0057b1" strokeWidth={2}/>
              <rect x={80} y={80} width={140} height={80} rx={4} fill="#003f81" />
              
              {/* Markers */}
              <line x1={20} y1={120} x2={80} y2={120} stroke="#151515" strokeWidth={2} markerEnd="url(#arrow)" markerStart="url(#arrow)"/>
              <text x={50} y={110} fontSize={12} fontFamily="monospace" fill="#151515" textAnchor="middle">40</text>
            </g>
          </g>
        );

      case 'border-width':
        return (
          <g>
            <rect width={W} height={H} fill="#1a1a2e" />
            
            {/* Background thin layer */}
            <circle cx={135} cy={304} r={80} fill="none" stroke="#ffffff" strokeWidth={1} opacity={0.1} />
            <circle cx={765} cy={76} r={120} fill="none" stroke="#ffffff" strokeWidth={1} opacity={0.08} />
            
            {/* 1px stroke (hairline/thin) */}
            <rect x={270} y={57} width={48} height={48} rx={8} fill="none" stroke="#ffffff" strokeWidth={1} opacity={0.3} transform="rotate(15, 270, 57)" />
            <circle cx={648} cy={247} r={32} fill="none" stroke="#ffffff" strokeWidth={1} opacity={0.25} />
            
            {/* 2px stroke (thick) */}
            <rect x={90} y={114} width={64} height={64} rx={16} fill="none" stroke="#ffffff" strokeWidth={2} opacity={0.4} transform="rotate(-12, 90, 114)" />
            <path d="M 540 38 L 585 57" stroke="#ffffff" strokeWidth={2} strokeLinecap="round" opacity={0.3} />
            
            {/* 4px stroke (heavy) */}
            <circle cx={738} cy={171} r={56} fill="none" stroke="#ffffff" strokeWidth={4} opacity={0.5} />
            <rect x={495} y={228} width={80} height={80} rx={24} fill="none" stroke={secondary} strokeWidth={4} opacity={0.8} transform="rotate(-8, 495, 228)" />
            
            {/* 8px stroke */}
            <rect x={225} y={209} width={100} height={100} rx={28} fill="none" stroke={primary} strokeWidth={8} opacity={0.7} transform="rotate(20, 225, 209)" />
            
            {/* 12px / 16px stroke (extra heavy) */}
            <circle cx={378} cy={95} r={40} fill="none" stroke={secondary} strokeWidth={12} opacity={0.9} />
            <rect x={612} y={76} width={120} height={120} rx={32} fill="none" stroke={primary} strokeWidth={16} opacity={0.95} transform="rotate(12, 612, 76)" />

            {/* Accents (Lines / Crosses) */}
            <line x1={405} y1={285} x2={450} y2={285} stroke="#ffffff" strokeWidth={4} strokeLinecap="round" opacity={0.4} />
            <line x1={810} y1={304} x2={810} y2={323} stroke="#ffffff" strokeWidth={8} strokeLinecap="round" opacity={0.3} />
          </g>
        );

      case 'border-radius':
        return (
          <g>
            <rect width={W} height={H} fill="#ffeff1" />
            <g transform="translate(180, 120)">
              <rect x={0} y={0} width={140} height={140} rx={0} fill="#f4213c" />
              <rect x={180} y={0} width={140} height={140} rx={24} fill="#f4213c" />
              <rect x={360} y={0} width={140} height={140} rx={48} fill="#f4213c" />
              <circle cx={610} cy={70} r={70} fill="#f4213c" />
              
              <text x={70} y={170} fontSize={14} fontFamily="monospace" fill="#810414" textAnchor="middle">radius-0</text>
              <text x={250} y={170} fontSize={14} fontFamily="monospace" fill="#810414" textAnchor="middle">radius-24</text>
              <text x={430} y={170} fontSize={14} fontFamily="monospace" fill="#810414" textAnchor="middle">radius-48</text>
              <text x={610} y={170} fontSize={14} fontFamily="monospace" fill="#810414" textAnchor="middle">radius-full</text>
            </g>
          </g>
        );

      case 'elevation':
        return (
          <g>
            <rect width={W} height={H} fill="#f4f4f7" />
            <g transform="translate(250, 160)">
              {/* Isometric cards with shadow */}
              <g transform="skewX(-20) skewY(10)">
                <rect x={0} y={0} width={160} height={160} rx={16} fill="#ffffff" stroke="#d0d0d2" strokeWidth={1} />
                
                <rect x={120} y={-80} width={160} height={160} rx={16} fill="#ffffff" filter="drop-shadow(10px 15px 15px rgba(0,0,0,0.15))" />
                
                <rect x={240} y={-160} width={160} height={160} rx={16} fill="#ffffff" filter="drop-shadow(20px 30px 25px rgba(0,0,0,0.25))" />
              </g>
            </g>
          </g>
        );

      case 'dimension':
        return (
          <g>
            <rect width={W} height={H} fill="#fff4df" />
            <g transform="translate(350, 90)">
              <rect x={0} y={0} width={200} height={200} fill="#faca69" opacity={0.5} stroke="#c98a0a" strokeWidth={2} strokeDasharray="6 6"/>
              
              {/* Width arrow */}
              <line x1={0} y1={-20} x2={200} y2={-20} stroke="#906308" strokeWidth={2} />
              <circle cx={0} cy={-20} r={4} fill="#906308" />
              <circle cx={200} cy={-20} r={4} fill="#906308" />
              <text x={100} y={-30} fontSize={14} fontFamily="monospace" fill="#906308" textAnchor="middle">width (W)</text>
              
              {/* Height arrow */}
              <line x1={220} y1={0} x2={220} y2={200} stroke="#906308" strokeWidth={2} />
              <circle cx={220} cy={0} r={4} fill="#906308" />
              <circle cx={220} cy={200} r={4} fill="#906308" />
              <text x={235} y={105} fontSize={14} fontFamily="monospace" fill="#906308" alignmentBaseline="middle">height (H)</text>
            </g>
          </g>
        );

      case 'layout':
        return (
          <g>
            <rect width={W} height={H} fill="#151515" />
            <g transform="translate(150, 70)">
              {/* Grid representation */}
              <rect x={0} y={0} width={600} height={240} rx={16} fill="#28282a" />
              
              {/* Columns */}
              <g fill="#57575b">
                <rect x={20} y={20} width={35} height={200} rx={4} />
                <rect x={70} y={20} width={35} height={200} rx={4} />
                <rect x={120} y={20} width={35} height={200} rx={4} />
                <rect x={170} y={20} width={35} height={200} rx={4} />
                
                <rect x={220} y={20} width={180} height={200} rx={8} fill={primary} />
                
                <rect x={415} y={20} width={35} height={200} rx={4} />
                <rect x={465} y={20} width={35} height={200} rx={4} />
                <rect x={515} y={20} width={35} height={200} rx={4} />
              </g>
            </g>
          </g>
        );

      default:
        return null;
    }
  };

  return (
    <div
      className="w-full rounded-3xl overflow-hidden"
      style={{ aspectRatio: '900 / 380' }}
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: '100%', display: 'block' }}
      >
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#151515" />
          </marker>
        </defs>
        {renderContent()}
      </svg>
    </div>
  );
}
