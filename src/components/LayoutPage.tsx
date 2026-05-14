import { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { FoundationHero } from './FoundationHero';

type TabId = 'grid' | 'breakpoints' | 'anatomy';
type ViewportKey = 'mobile' | 'tablet' | 'desktop';

// ─── Grid specs ───────────────────────────────────────────────────────────────

const GRID_SPECS: Record<ViewportKey, {
  label: string; width: string; columns: number;
  margin: number; marginToken: string;
  gutter: number; gutterToken: string;
  maxContent: string;
}> = {
  mobile: {
    label: 'Mobile',   width: '375px+', columns: 4,
    margin: 16, marginToken: 'space.large',
    gutter: 16, gutterToken: 'space.large',
    maxContent: '343px',
  },
  tablet: {
    label: 'Tablet',   width: '768px+', columns: 8,
    margin: 24, marginToken: 'space.xlarge',
    gutter: 16, gutterToken: 'space.large',
    maxContent: '720px',
  },
  desktop: {
    label: 'Desktop',  width: '1024px+', columns: 12,
    margin: 32, marginToken: 'space.xxlarge',
    gutter: 24, gutterToken: 'space.xlarge',
    maxContent: '960px',
  },
};

// ─── Breakpoints ──────────────────────────────────────────────────────────────

const BREAKPOINTS = [
  { name: 'xs',  px: 0,    cols: 4,  margin: '—',   label: 'Extra Small', device: 'Compact phones',              note: 'Base styles — no min-width constraint. 4-column grid.' },
  { name: 'sm',  px: 375,  cols: 4,  margin: '16px', label: 'Small',       device: 'Standard phones (iPhone)',    note: '4-column grid, 16px screen margin.' },
  { name: 'md',  px: 414,  cols: 4,  margin: '16px', label: 'Medium',      device: 'Large phones (Pro Max)',      note: '4-column grid, 16px screen margin.' },
  { name: 'lg',  px: 768,  cols: 8,  margin: '24px', label: 'Large',       device: 'Tablets (iPad mini, Air)',    note: 'Grid expands to 8 columns. 24px screen margin.' },
  { name: 'xl',  px: 1024, cols: 12, margin: '32px', label: 'Extra Large', device: 'Desktop / iPad Pro',          note: 'Grid expands to 12 columns. 32px screen margin.' },
  { name: '2xl', px: 1440, cols: 12, margin: '32px', label: 'Wide',        device: 'Wide desktop monitors',       note: 'Max content width of 1440px constrains further expansion.' },
];

// ─── Screen anatomy regions ───────────────────────────────────────────────────

const ANATOMY_REGIONS: {
  label: string; heightLabel: string; heightPx: number;
  token: string; platform: string; notes: string;
  color: string; textColor: string;
}[] = [
  {
    label: 'Status bar',           heightLabel: '44–54px', heightPx: 44,
    token: '—',                    platform: 'iOS / Android',
    notes: 'System-owned. Height varies by device and notch presence. Content must not intrude into this region.',
    color: '#1f2937', textColor: '#f9fafb',
  },
  {
    label: 'Navigation bar',       heightLabel: '56px',    heightPx: 56,
    token: 'size.9',               platform: 'Both',
    notes: 'App-level top bar. Holds the screen title, leading navigation action, and trailing utility actions.',
    color: '#374151', textColor: '#f9fafb',
  },
  {
    label: 'Content area',         heightLabel: 'Flexible', heightPx: 200,
    token: '—',                    platform: 'Both',
    notes: 'Fills all remaining vertical space. Uses the layout grid for horizontal structure and the space scale for internal padding.',
    color: '#f9fafb', textColor: '#6b7280',
  },
  {
    label: 'Tab bar',              heightLabel: '49px',    heightPx: 49,
    token: '—',                    platform: 'iOS',
    notes: 'iOS navigation bar. Fixed to the bottom edge. On Face ID devices, add a 34px home indicator safe area below.',
    color: '#e5e7eb', textColor: '#374151',
  },
  {
    label: 'Bottom navigation',    heightLabel: '56px',    heightPx: 56,
    token: 'size.9',               platform: 'Android',
    notes: 'Android bottom nav. Fixed to the bottom edge. Add system gesture inset (typically 16–28dp) below.',
    color: '#d1d5db', textColor: '#374151',
  },
  {
    label: 'Safe area inset',      heightLabel: '0–34px',  heightPx: 34,
    token: '—',                    platform: 'iOS',
    notes: 'Home indicator zone on Face ID devices. Must remain free of all interactive elements and informational content.',
    color: '#f3f4f6', textColor: '#9ca3af',
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export function LayoutPage() {
  const { brandFont, primaryColor } = useTheme();
  const [activeTab, setActiveTab] = useState<TabId>('grid');
  const [viewport, setViewport] = useState<ViewportKey>('mobile');

  const spec = GRID_SPECS[viewport];
  const cols = Array.from({ length: spec.columns });

  // Max breakpoint for scale visual (xs is 0, so the scale goes 0 → 1440)
  const MAX_PX = 1440;

  return (
    <div>
      {/* ── Page header ─────────────────────────────────────────────────── */}
      <div className="mb-10">
        <FoundationHero type="layout" />
      </div>
      <div className="mb-12">
        <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
          Foundations
        </div>
        <h1 className="text-5xl font-bold text-gray-900 mb-6" style={{ fontFamily: brandFont }}>
          Layout
        </h1>
        <p className="text-base text-gray-600 leading-relaxed">
          The layout system defines how content is structured and positioned across all screen sizes and platforms. It consists of a responsive column grid, a set of named breakpoints, and a documented screen anatomy — all grounded in the CDS spacing and size token scales.
        </p>
      </div>

      {/* ── Tab navigation ──────────────────────────────────────────────── */}
      <div className="mb-12 border-b border-gray-200">
        <div className="flex gap-8">
          {([
            { id: 'grid' as TabId,        label: 'Grid' },
            { id: 'breakpoints' as TabId, label: 'Breakpoints' },
            { id: 'anatomy' as TabId,     label: 'Anatomy' },
          ]).map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`pb-3 text-base font-medium transition-colors relative ${
                activeTab === id ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {label}
              {activeTab === id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          GRID TAB
      ════════════════════════════════════════════════════════════════════ */}
      {activeTab === 'grid' && (
        <div>
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-2 text-gray-900">Column grid</h2>
            <p className="text-sm text-gray-500 leading-relaxed">
              CDS uses a responsive column grid that adapts across screen sizes. Columns, margins, and gutters are all expressed using values from the spacing token scale. The grid shifts from 4 columns on mobile to 8 on tablet and 12 on desktop, while margins and gutters grow proportionally.
            </p>
          </div>

          {/* Viewport selector */}
          <div className="flex gap-2 mb-6">
            {(['mobile', 'tablet', 'desktop'] as ViewportKey[]).map(v => (
              <button
                key={v}
                onClick={() => setViewport(v)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  viewport === v
                    ? 'bg-gray-900 text-white'
                    : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-300'
                }`}
              >
                {GRID_SPECS[v].label}
              </button>
            ))}
          </div>

          {/* Grid visualizer */}
          <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden mb-8">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-gray-700">{spec.label}</span>
                  <span className="text-xs font-mono text-gray-400">{spec.width}</span>
                </div>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span>{spec.columns} columns</span>
                  <span>{spec.margin}px margins</span>
                  <span>{spec.gutter}px gutters</span>
                </div>
              </div>

              {/* Column strip */}
              <div className="relative bg-gray-50 rounded-2xl overflow-hidden" style={{ height: 112 }}>
                {/* Margin zones */}
                <div
                  className="absolute top-0 left-0 bottom-0 flex items-center justify-center"
                  style={{ width: spec.margin, backgroundColor: `${primaryColor}18` }}
                >
                  <div
                    className="w-px h-12"
                    style={{ backgroundColor: `${primaryColor}60` }}
                  />
                </div>
                <div
                  className="absolute top-0 right-0 bottom-0 flex items-center justify-center"
                  style={{ width: spec.margin, backgroundColor: `${primaryColor}18` }}
                >
                  <div
                    className="w-px h-12"
                    style={{ backgroundColor: `${primaryColor}60` }}
                  />
                </div>

                {/* Columns */}
                <div
                  className="absolute inset-0 flex items-center"
                  style={{
                    paddingLeft: spec.margin,
                    paddingRight: spec.margin,
                    gap: spec.gutter,
                  }}
                >
                  {cols.map((_, i) => (
                    <div
                      key={i}
                      className="flex-1 h-16 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${primaryColor}20`, border: `1px solid ${primaryColor}30` }}
                    >
                      <span className="text-[10px] font-mono" style={{ color: primaryColor }}>
                        {i + 1}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dimension annotations */}
              <div className="relative mt-3 flex" style={{ height: 32 }}>
                {/* Margin annotation left */}
                <div
                  className="flex flex-col items-center justify-start"
                  style={{ width: spec.margin }}
                >
                  <div className="flex items-center w-full">
                    <div className="flex-1 h-px" style={{ backgroundColor: primaryColor }} />
                    <div className="w-1 h-1 rounded-full" style={{ backgroundColor: primaryColor }} />
                  </div>
                  <span className="text-[9px] font-mono whitespace-nowrap mt-1" style={{ color: primaryColor }}>
                    {spec.margin}px
                  </span>
                </div>
                {/* Spacer matching column 1 */}
                <div className="flex-1" />
                {/* Gutter annotation (between col 1 and 2) */}
                {spec.columns > 1 && (
                  <>
                    <div
                      className="flex flex-col items-center justify-start"
                      style={{ width: spec.gutter }}
                    >
                      <div className="flex items-center w-full">
                        <div className="w-1 h-1 rounded-full" style={{ backgroundColor: '#9ca3af' }} />
                        <div className="flex-1 h-px bg-gray-300" />
                        <div className="w-1 h-1 rounded-full" style={{ backgroundColor: '#9ca3af' }} />
                      </div>
                      <span className="text-[9px] font-mono text-gray-400 whitespace-nowrap mt-1">
                        {spec.gutter}px
                      </span>
                    </div>
                    <div className="flex-1" />
                  </>
                )}
                {/* Margin annotation right */}
                <div
                  className="flex flex-col items-center justify-start"
                  style={{ width: spec.margin }}
                >
                  <div className="flex items-center w-full">
                    <div className="w-1 h-1 rounded-full" style={{ backgroundColor: primaryColor }} />
                    <div className="flex-1 h-px" style={{ backgroundColor: primaryColor }} />
                  </div>
                  <span className="text-[9px] font-mono whitespace-nowrap mt-1" style={{ color: primaryColor }}>
                    {spec.margin}px
                  </span>
                </div>
              </div>
            </div>

            {/* Spec detail row */}
            <div className="grid grid-cols-4 divide-x divide-gray-100 px-0">
              {[
                { label: 'Columns',      value: String(spec.columns),    token: '' },
                { label: 'Margin',       value: `${spec.margin}px`,       token: spec.marginToken },
                { label: 'Gutter',       value: `${spec.gutter}px`,       token: spec.gutterToken },
                { label: 'Max content',  value: spec.maxContent,          token: '' },
              ].map(({ label, value, token }) => (
                <div key={label} className="px-6 py-4 flex flex-col gap-1">
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{label}</span>
                  <span className="text-base font-semibold text-gray-900">{value}</span>
                  {token && (
                    <span className="text-xs font-mono text-gray-400">{token}</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* All-viewports spec table */}
          <div className="mb-8">
            <h3 className="text-base font-semibold text-gray-800 mb-4">All viewports</h3>
            <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden">
              <div className="grid grid-cols-[140px_80px_90px_90px_90px_1fr] border-b border-gray-100 px-6 py-3 bg-gray-50">
                {['Viewport', 'Width', 'Columns', 'Margin', 'Gutter', 'Max content'].map(h => (
                  <div key={h} className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</div>
                ))}
              </div>
              {(['mobile', 'tablet', 'desktop'] as ViewportKey[]).map((vk, i, arr) => {
                const s = GRID_SPECS[vk];
                return (
                  <div
                    key={vk}
                    className={`grid grid-cols-[140px_80px_90px_90px_90px_1fr] px-6 py-4 items-center hover:bg-gray-50 transition-colors ${i < arr.length - 1 ? 'border-b border-gray-100' : ''}`}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: primaryColor }} />
                      <span className="text-sm font-medium text-gray-800">{s.label}</span>
                    </div>
                    <span className="text-sm font-mono text-gray-600">{s.width}</span>
                    <span className="text-sm text-gray-600">{s.columns}</span>
                    <div>
                      <span className="text-sm text-gray-600">{s.margin}px</span>
                      <span className="block text-[11px] font-mono text-gray-400">{s.marginToken}</span>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">{s.gutter}px</span>
                      <span className="block text-[11px] font-mono text-gray-400">{s.gutterToken}</span>
                    </div>
                    <span className="text-sm font-mono text-gray-600">{s.maxContent}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Grid usage rules */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-200 rounded-3xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <svg className="w-3 h-3 text-green-600" fill="none" viewBox="0 0 12 12">
                    <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span className="text-sm font-semibold text-green-700 uppercase tracking-wider">Do</span>
              </div>
              <ul className="space-y-3">
                {[
                  'Align all content to column boundaries — headings, text, images, and cards.',
                  'Let components span multiple columns (e.g. a card spanning 2 of 4 columns on mobile).',
                  'Respect margins — no content should bleed into the screen margin zone.',
                  'Use the full column count to create full-bleed hero images or banners.',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                    <div className="w-1 h-1 rounded-full bg-green-400 mt-2 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white border border-gray-200 rounded-3xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                  <svg className="w-3 h-3 text-red-600" fill="none" viewBox="0 0 12 12">
                    <path d="M3 3l6 6M9 3l-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
                <span className="text-sm font-semibold text-red-700 uppercase tracking-wider">Don't</span>
              </div>
              <ul className="space-y-3">
                {[
                  'Use arbitrary widths or margins — always snap to the grid.',
                  'Ignore the grid on specific screens "just for this case" — apply it consistently.',
                  'Place interactive elements in the margin zone.',
                  'Use hardcoded pixel values for margin or gutter — reference the space token.',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                    <div className="w-1 h-1 rounded-full bg-red-400 mt-2 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          BREAKPOINTS TAB
      ════════════════════════════════════════════════════════════════════ */}
      {activeTab === 'breakpoints' && (
        <div>
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-2 text-gray-900">Breakpoints</h2>
            <p className="text-sm text-gray-500 leading-relaxed">
              Breakpoints mark the screen widths at which the layout shifts. They are named by size tier rather than specific device to remain device-agnostic as hardware evolves. The grid column count and margin value change at each major tier.
            </p>
          </div>

          {/* Breakpoint scale visual */}
          <div className="bg-white border border-gray-200 rounded-3xl p-6 mb-8">
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-5">
              Scale — 0 to 1440px
            </div>
            {/* Bar */}
            <div className="relative h-10 rounded-xl overflow-hidden flex mb-3">
              {BREAKPOINTS.map((bp, i) => {
                const nextPx = BREAKPOINTS[i + 1]?.px ?? MAX_PX;
                const widthPct = ((nextPx - bp.px) / MAX_PX) * 100;
                const colors = [
                  { bg: '#f3f4f6', text: '#6b7280' },
                  { bg: '#e5e7eb', text: '#4b5563' },
                  { bg: '#d1d5db', text: '#374151' },
                  { bg: '#9ca3af', text: '#1f2937' },
                  { bg: '#6b7280', text: '#ffffff' },
                  { bg: '#4b5563', text: '#ffffff' },
                ];
                const c = colors[i] ?? colors[colors.length - 1];
                return (
                  <div
                    key={bp.name}
                    className="flex items-center justify-center overflow-hidden"
                    style={{ width: `${widthPct}%`, backgroundColor: c.bg }}
                  >
                    <span className="text-[10px] font-semibold" style={{ color: c.text }}>
                      {bp.name}
                    </span>
                  </div>
                );
              })}
            </div>
            {/* Tick marks and labels */}
            <div className="relative" style={{ height: 36 }}>
              {BREAKPOINTS.map((bp) => {
                const leftPct = (bp.px / MAX_PX) * 100;
                return (
                  <div
                    key={bp.name}
                    className="absolute flex flex-col items-center"
                    style={{ left: `${leftPct}%`, transform: 'translateX(-50%)' }}
                  >
                    <div className="w-px h-2 bg-gray-300" />
                    <span className="text-[10px] font-mono text-gray-500 whitespace-nowrap mt-0.5">
                      {bp.px === 0 ? '0' : `${bp.px}px`}
                    </span>
                  </div>
                );
              })}
              {/* Right edge tick */}
              <div className="absolute flex flex-col items-center" style={{ right: 0 }}>
                <div className="w-px h-2 bg-gray-300" />
                <span className="text-[10px] font-mono text-gray-500 mt-0.5">1440px</span>
              </div>
            </div>
          </div>

          {/* Breakpoints table */}
          <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden mb-8">
            <div className="grid grid-cols-[60px_80px_70px_60px_60px_1fr] border-b border-gray-100 px-6 py-3 bg-gray-50">
              {['Name', 'Min-width', 'Label', 'Cols', 'Margin', 'Notes'].map(h => (
                <div key={h} className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</div>
              ))}
            </div>
            {BREAKPOINTS.map((bp, i) => (
              <div
                key={bp.name}
                className={`grid grid-cols-[60px_80px_70px_60px_60px_1fr] px-6 py-4 items-start hover:bg-gray-50 transition-colors ${i < BREAKPOINTS.length - 1 ? 'border-b border-gray-100' : ''}`}
              >
                <span className="text-sm font-mono font-semibold text-gray-800">{bp.name}</span>
                <span className="text-sm font-mono text-gray-600">{bp.px === 0 ? '0' : `${bp.px}px`}</span>
                <span className="text-sm text-gray-600">{bp.label}</span>
                <span className="text-sm text-gray-600">{bp.cols}</span>
                <span className="text-sm font-mono text-gray-600">{bp.margin}</span>
                <p className="text-sm text-gray-500 leading-relaxed">{bp.note}</p>
              </div>
            ))}
          </div>

          {/* Device examples */}
          <div className="mb-8">
            <h3 className="text-base font-semibold text-gray-800 mb-4">Typical devices per tier</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {BREAKPOINTS.map((bp) => (
                <div key={bp.name} className="bg-white border border-gray-200 rounded-2xl px-4 py-4">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono font-semibold px-2 py-0.5 bg-gray-100 border border-gray-200 rounded-full text-gray-600">{bp.name}</span>
                    <span className="text-xs text-gray-400">{bp.px === 0 ? '0px' : `${bp.px}px+`}</span>
                  </div>
                  <p className="text-sm text-gray-700">{bp.device}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Breakpoint callout */}
          <div className="bg-blue-50 border border-blue-100 rounded-2xl px-6 py-4 flex items-start gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
            <p className="text-sm text-blue-700 leading-relaxed">
              <span className="font-semibold">Breakpoints describe structural shifts, not component breakpoints.</span>{' '}
              Individual components may adapt at different widths using their own internal logic — the breakpoints defined here govern only the layout grid and screen margin.
            </p>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          ANATOMY TAB
      ════════════════════════════════════════════════════════════════════ */}
      {activeTab === 'anatomy' && (
        <div>
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-2 text-gray-900">Screen anatomy</h2>
            <p className="text-sm text-gray-500 leading-relaxed">
              Every screen is composed of a stack of regions. Understanding this anatomy ensures consistent placement of navigation, content, and system elements, and prevents common issues like content overlapping safe areas or system chrome.
            </p>
          </div>

          {/* Anatomy diagram + region list side by side */}
          <div className="flex gap-8 mb-8 items-start">
            {/* Phone diagram */}
            <div className="flex-shrink-0 hidden md:block">
              <div
                className="relative rounded-[28px] overflow-hidden border-4 border-gray-800"
                style={{ width: 180, boxShadow: '0 4px 32px rgba(0,0,0,0.18)' }}
              >
                {/* Dynamic island */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-5 bg-gray-900 rounded-full z-10" />

                {/* Stacked regions */}
                {[
                  { label: 'Status bar', heightPx: 44, bg: '#1f2937', text: '#9ca3af', fontSize: 9 },
                  { label: 'Navigation bar', heightPx: 56, bg: '#374151', text: '#e5e7eb', fontSize: 9 },
                  { label: 'Content area', heightPx: 260, bg: '#f9fafb', text: '#9ca3af', fontSize: 9 },
                  { label: 'Tab bar', heightPx: 49, bg: '#e5e7eb', text: '#4b5563', fontSize: 9 },
                  { label: 'Safe area', heightPx: 28, bg: '#f3f4f6', text: '#9ca3af', fontSize: 8 },
                ].map((region) => (
                  <div
                    key={region.label}
                    className="w-full flex items-center justify-center"
                    style={{
                      height: Math.round(region.heightPx * (180 / 390)),
                      backgroundColor: region.bg,
                      minHeight: region.heightPx < 50 ? 24 : 32,
                    }}
                  >
                    <span
                      className="font-medium text-center px-1 leading-tight"
                      style={{ fontSize: region.fontSize, color: region.text }}
                    >
                      {region.label}
                    </span>
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-gray-400 text-center mt-3">iOS diagram</p>
            </div>

            {/* Region summary cards */}
            <div className="flex-1 space-y-3">
              {ANATOMY_REGIONS.map((region) => (
                <div
                  key={region.label}
                  className="flex items-start gap-4 bg-white border border-gray-200 rounded-2xl px-5 py-4"
                >
                  {/* Color chip */}
                  <div
                    className="w-3 flex-shrink-0 self-stretch rounded-full mt-0.5"
                    style={{ backgroundColor: region.color, border: region.color === '#f9fafb' || region.color === '#f3f4f6' ? '1px solid #e5e7eb' : 'none' }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1 flex-wrap">
                      <span className="text-sm font-semibold text-gray-800">{region.label}</span>
                      <span className="text-xs font-mono text-gray-500 bg-gray-50 border border-gray-200 rounded-full px-2 py-0.5">{region.heightLabel}</span>
                      <span className="text-xs text-gray-400">{region.platform}</span>
                      {region.token !== '—' && (
                        <span className="text-xs font-mono text-gray-400 bg-gray-50 border border-gray-100 rounded-full px-2 py-0.5">{region.token}</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 leading-relaxed">{region.notes}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Detailed table */}
          <div className="mb-8">
            <h3 className="text-base font-semibold text-gray-800 mb-4">Region reference</h3>
            <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden">
              <div className="grid grid-cols-[160px_90px_80px_100px_1fr] border-b border-gray-100 px-6 py-3 bg-gray-50">
                {['Region', 'Height', 'Platform', 'Token', 'Notes'].map(h => (
                  <div key={h} className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</div>
                ))}
              </div>
              {ANATOMY_REGIONS.map((r, i) => (
                <div
                  key={r.label}
                  className={`grid grid-cols-[160px_90px_80px_100px_1fr] px-6 py-4 items-start hover:bg-gray-50 transition-colors ${i < ANATOMY_REGIONS.length - 1 ? 'border-b border-gray-100' : ''}`}
                >
                  <span className="text-sm font-medium text-gray-800">{r.label}</span>
                  <span className="text-sm font-mono text-gray-600">{r.heightLabel}</span>
                  <span className="text-sm text-gray-500">{r.platform}</span>
                  <span className="text-sm font-mono text-gray-400">{r.token}</span>
                  <p className="text-sm text-gray-500 leading-relaxed">{r.notes}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Safe area callout */}
          <div className="space-y-3">
            <div className="bg-amber-50 border border-amber-200 rounded-2xl px-5 py-4 flex items-start gap-3">
              <div className="w-1 h-1 rounded-full bg-amber-400 mt-2 flex-shrink-0" />
              <p className="text-sm text-amber-800 leading-relaxed">
                <span className="font-semibold">Safe area insets are mandatory, not optional.</span> On Face ID iPhones, the 34px home indicator zone at the bottom must remain free of all tappable elements, text, and critical information. Use <code className="font-mono text-xs bg-amber-100 border border-amber-200 rounded px-1 py-0.5">safeAreaInsets</code> from the platform API — never hardcode this value.
              </p>
            </div>
            <div className="bg-blue-50 border border-blue-100 rounded-2xl px-5 py-4 flex items-start gap-3">
              <div className="w-1 h-1 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
              <p className="text-sm text-blue-700 leading-relaxed">
                <span className="font-semibold">The navigation bar and tab bar are system-provided components on mobile.</span> The heights defined here reflect the design intent for custom implementations. When using native platform components (UINavigationController, UITabBarController on iOS; Toolbar on Android), defer to the system for heights and let the layout engine handle safe areas automatically.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
