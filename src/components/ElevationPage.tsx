import { useTheme } from '../contexts/ThemeContext';
import elevationTokens from '../../imports/semantic-elevation-tokens.json';
import { FoundationHero } from './FoundationHero';

// ── Helpers ────────────────────────────────────────────────────────────────

/** Convert dot-notation token to CSS custom property (e.g. elevation.level1 → --elevation-level1) */
const toCssElevationVar = (token: string) =>
  '--' + token.replace(/\./g, '-');

/** Convert a hex colour with optional alpha (e.g. #0000000F) to rgba() */
function hexToRgba(hex: string): string {
  const clean = hex.replace('#', '');
  if (clean.length === 8) {
    const r = parseInt(clean.slice(0, 2), 16);
    const g = parseInt(clean.slice(2, 4), 16);
    const b = parseInt(clean.slice(4, 6), 16);
    const a = parseInt(clean.slice(6, 8), 16) / 255;
    return `rgba(${r},${g},${b},${a.toFixed(3)})`;
  }
  // fallback: treat as opaque
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  return `rgb(${r},${g},${b})`;
}

/** Build a CSS box-shadow string from a token value object */
function buildShadow(v: {
  color: string;
  offsetX: { value: number };
  offsetY: { value: number };
  blur: { value: number };
  spread: { value: number };
}): string {
  if (v.blur.value === 0 && v.offsetY.value === 0) return 'none';
  return `${v.offsetX.value}px ${v.offsetY.value}px ${v.blur.value}px ${v.spread.value}px ${hexToRgba(v.color)}`;
}

/** Alpha percentage label from a hex-with-alpha string */
function alphaLabel(hex: string): string {
  const clean = hex.replace('#', '');
  if (clean.length !== 8) return '100%';
  const a = parseInt(clean.slice(6, 8), 16) / 255;
  return `${Math.round(a * 100)}%`;
}

// ── Derived token data ─────────────────────────────────────────────────────

const levels = [
  {
    key: 'level0',
    token: 'elevation.level0',
    label: 'Level 0',
    deprecated: false,
    data: elevationTokens.elevation.level0.$value,
    description: elevationTokens.elevation.level0.$description,
  },
  {
    key: 'level1',
    token: 'elevation.level1',
    label: 'Level 1',
    deprecated: false,
    data: elevationTokens.elevation.level1.$value,
    description: elevationTokens.elevation.level1.$description,
  },
  {
    key: 'level2',
    token: 'elevation.level2',
    label: 'Level 2',
    deprecated: false,
    data: elevationTokens.elevation.level2.$value,
    description: elevationTokens.elevation.level2.$description,
  },
  {
    key: 'level3',
    token: 'elevation.level3',
    label: 'Level 3',
    deprecated: false,
    data: elevationTokens.elevation.level3.$value,
    description: elevationTokens.elevation.level3.$description,
  },
];

const usageSections = [
  {
    level: 'Level 1',
    heading: 'Interactive components that reinforce presence or hierarchy',
    components: ['Device tiles', 'Feature cards', 'Content cards', 'Navigation elements'],
  },
  {
    level: 'Level 2',
    heading: 'Layout-based elements, overlapping elements, and scrolled states',
    components: ['Bottom sheets', 'Overlapping components', 'Tab bar', 'Elements in a scrolled state'],
  },
  {
    level: 'Level 3',
    heading: 'Tooltips and high-level notifications',
    components: ['Tooltips', 'Snackbar', 'High-priority notifications'],
  },
];

const layeringReference = [
  { component: 'Device tiles, feature cards', level: 'Level 1' },
  { component: 'Navigation elements', level: 'Level 1' },
  { component: 'Bottom sheets', level: 'Level 2' },
  { component: 'Overlapping and scrolled elements', level: 'Level 2' },
  { component: 'Tooltips', level: 'Level 3' },
  { component: 'Snackbar', level: 'Level 3' },
];

const doItems = [
  'Apply elevation only when a component needs to appear above another element.',
  'Pair Level 2 and Level 3 elements with background.overlay where a scrim is required.',
  'Keep each component at a consistent elevation level.',
];

const dontItems = [
  'Apply elevation for decoration alone.',
  'Assign levels arbitrarily — each level has a defined purpose and shadow weight.',
  'Use elevation to imply interactivity — shadow communicates position in the stack, not tappability.',
];

// ── Component ──────────────────────────────────────────────────────────────

export function ElevationPage() {
  const { brandFont, primaryColor } = useTheme();

  return (
    <div>
      {/* ── Header ────────────────────────────────────────────────── */}
      <div className="mb-10">
        <FoundationHero type="elevation" />
      </div>
      <div className="mb-12">
        <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
          Foundations
        </div>
        <h1 className="text-5xl font-bold text-gray-900 mb-6" style={{ fontFamily: brandFont }}>
          Elevation
        </h1>
        <p className="text-base text-gray-600 leading-relaxed">
          Elevation provides cues about the depth and stacking order of elements in an experience.
          Used exclusively to communicate layering — indicating that a component needs to appear
          above another element in the UI stack.
        </p>
        <p className="text-sm text-gray-400 mt-3">Also known as: Drop Shadow, Depth.</p>
      </div>

      {/* ── Scope notice ─────────────────────────────────────────── */}
      <div className="mb-12 bg-blue-50 border border-blue-100 rounded-2xl px-6 py-4 flex items-start gap-3">
        <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
        <p className="text-sm text-blue-700 leading-relaxed">
          This page covers elevation levels, shadow values, and usage rules. It does not cover
          platform-specific implementation — check platform code for exact rendering behaviour.
        </p>
      </div>

      {/* ── Token scale ──────────────────────────────────────────── */}
      <div className="mb-16">
        <h2 className="text-2xl font-semibold mb-2 text-gray-900">Elevation levels</h2>
        <p className="text-sm text-gray-500 mb-6 leading-relaxed">
          Three active levels. Elements with no layering requirement carry no shadow.
        </p>

        <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden">
          {/* Table header */}
          <div className="grid grid-cols-[180px_1fr_200px_200px] gap-0 border-b border-gray-100 px-6 py-3 bg-gray-50">
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Token</div>
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Description</div>
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Shadow values</div>
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Preview</div>
          </div>

          {levels.map((level, index) => {
            const v = level.data;
            const shadow = buildShadow(v);
            const isLast = index === levels.length - 1;
            const isNone = v.blur.value === 0 && v.offsetY.value === 0;

            return (
              <div
                key={level.key}
                className={`grid grid-cols-[180px_1fr_200px_200px] gap-0 px-6 py-5 items-center ${
                  !isLast ? 'border-b border-gray-100' : ''
                } hover:bg-gray-50 transition-colors`}
              >
                {/* Token */}
                <div>
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-mono text-gray-600">
                    {toCssElevationVar(level.token)}
                  </span>
                </div>

                {/* Description */}
                <div className="text-sm text-gray-600 leading-relaxed pr-4">
                  {level.description}
                </div>

                {/* Shadow values */}
                <div className="text-xs text-gray-500 font-mono space-y-0.5">
                  {isNone ? (
                    <span className="text-gray-400 italic">No shadow</span>
                  ) : (
                    <>
                      <div><span className="text-gray-400">x</span> {v.offsetX.value}px &nbsp;<span className="text-gray-400">y</span> {v.offsetY.value}px</div>
                      <div><span className="text-gray-400">blur</span> {v.blur.value}px &nbsp;<span className="text-gray-400">spread</span> {v.spread.value}px</div>
                      <div><span className="text-gray-400">opacity</span> {alphaLabel(v.color)}</div>
                    </>
                  )}
                </div>

                {/* Live preview */}
                <div className="flex items-center justify-center">
                  <div
                    className="w-24 h-14 rounded-2xl bg-white border border-gray-100 flex items-center justify-center"
                    style={{ boxShadow: shadow }}
                  >
                    <span className="text-xs text-gray-400">{level.label}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Usage by level ───────────────────────────────────────── */}
      <div className="mb-16">
        <h2 className="text-2xl font-semibold mb-6 text-gray-900">Usage by level</h2>
        <div className="space-y-4">
          {usageSections.map((section) => {
            const levelNum = parseInt(section.level.replace('Level ', ''));
            const v = levels[levelNum]?.data;
            const shadow = v ? buildShadow(v) : 'none';

            return (
              <div
                key={section.level}
                className="bg-white border border-gray-200 rounded-3xl p-6 flex gap-6 items-start"
              >
                {/* Mini preview */}
                <div className="flex-shrink-0 flex flex-col items-center gap-2 pt-1">
                  <div
                    className="w-14 h-14 rounded-2xl bg-white border border-gray-100"
                    style={{ boxShadow: shadow }}
                  />
                  <span
                    className="text-xs font-semibold"
                    style={{ color: primaryColor }}
                  >
                    {section.level}
                  </span>
                </div>

                {/* Content */}
                <div>
                  <p className="text-sm text-gray-700 mb-3 leading-relaxed">
                    {section.heading}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {section.components.map((comp) => (
                      <span
                        key={comp}
                        className="inline-block px-3 py-1 bg-gray-50 border border-gray-200 rounded-full text-xs text-gray-600"
                      >
                        {comp}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Layering reference ────────────────────────────────────── */}
      <div className="mb-16">
        <h2 className="text-2xl font-semibold mb-6 text-gray-900">Layering reference</h2>
        <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden">
          <div className="grid grid-cols-2 border-b border-gray-100 px-6 py-3 bg-gray-50">
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Component</div>
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Level</div>
          </div>
          {layeringReference.map((row, index) => (
            <div
              key={row.component}
              className={`grid grid-cols-2 px-6 py-4 items-center ${
                index < layeringReference.length - 1 ? 'border-b border-gray-100' : ''
              } hover:bg-gray-50 transition-colors`}
            >
              <div className="text-sm text-gray-700">{row.component}</div>
              <div>
                <span
                  className="inline-block px-3 py-1 rounded-full text-xs font-medium"
                  style={{ backgroundColor: `${primaryColor}18`, color: primaryColor }}
                >
                  {row.level}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Do / Don't ───────────────────────────────────────────── */}
      <div className="mb-16">
        <h2 className="text-2xl font-semibold mb-6 text-gray-900">Do / Don't</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Do */}
          <div className="bg-white border border-gray-200 rounded-3xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                <svg className="w-3 h-3 text-green-600" fill="none" viewBox="0 0 12 12">
                  <path
                    d="M2 6l3 3 5-5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span className="text-sm font-semibold text-green-700 uppercase tracking-wider">Do</span>
            </div>
            <ul className="space-y-3">
              {doItems.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                  <div className="w-1 h-1 rounded-full bg-green-400 mt-2 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Don't */}
          <div className="bg-white border border-gray-200 rounded-3xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                <svg className="w-3 h-3 text-red-600" fill="none" viewBox="0 0 12 12">
                  <path
                    d="M3 3l6 6M9 3l-6 6"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <span className="text-sm font-semibold text-red-700 uppercase tracking-wider">Don't</span>
            </div>
            <ul className="space-y-3">
              {dontItems.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                  <div className="w-1 h-1 rounded-full bg-red-400 mt-2 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ── Accessibility ─────────────────────────────────────────── */}
      <div className="mb-16">
        <h2 className="text-2xl font-semibold mb-6 text-gray-900">Accessibility</h2>
        <div className="bg-white border border-gray-200 rounded-3xl p-8">
          <p className="text-sm text-gray-600 leading-relaxed">
            Shadows may be suppressed when Reduce Transparency is enabled. Never rely on elevation
            alone to communicate layering or hierarchy. Any stacking relationship that is meaningful
            to the experience must also be communicated through layout, colour, or copy.
          </p>
        </div>
      </div>

      {/* ── Platform note ─────────────────────────────────────────── */}
      <div className="mb-16">
        <h2 className="text-2xl font-semibold mb-6 text-gray-900">Platform note</h2>
        <div className="bg-white border border-gray-200 rounded-3xl p-8">
          <p className="text-sm text-gray-600 leading-relaxed">
            Shadow rendering differs by platform.{' '}
            <strong className="font-medium text-gray-800">iOS</strong> uses Core Animation shadow
            properties (x, y, blur, spread).{' '}
            <strong className="font-medium text-gray-800">Android</strong> uses Material elevation
            (dp value + ambient/spot colour + opacity). The design values above reflect design
            intent; platform implementation diverges. Check platform code for exact rendering
            behaviour.
          </p>
        </div>
      </div>
    </div>
  );
}