import { useTheme } from '../contexts/ThemeContext';
import sizeTokens from '../../imports/primitive-size-tokens.json';
import { FoundationHero } from './FoundationHero';

// ── Token data ─────────────────────────────────────────────────────────────

const toCssSizeVar = (token: string) =>
  '--' + token.replace(/\./g, '-');

const scale = Object.entries(sizeTokens.size).map(([key, entry]) => ({
  token: `size.${key}`,
  step: key,
  value: (entry as { $value: { value: number; unit: string } }).$value.value,
  unit: (entry as { $value: { value: number; unit: string } }).$value.unit,
}));

const MAX_VALUE = Math.max(...scale.map((s) => s.value));

const usageMap: Record<string, string> = {
  'size.1':  'Minimal indicators and micro UI elements.',
  'size.2':  'Compact decorative elements and small indicators.',
  'size.3':  'Compact UI elements and component spacing.',
  'size.4':  'X-small icon sizes and compact component elements.',
  'size.5':  'Small icon sizes and compact component heights.',
  'size.6':  'Medium icon sizes and standard interactive elements.',
  'size.7':  'Prominent UI elements and component heights.',
  'size.8':  'Minimum touch target and large icon size. Minimum height for all interactive elements.',
  'size.9':  'Standard interactive component heights.',
  'size.10': 'X-large icon sizes and large component heights.',
  'size.11': 'Extra large component and list item heights.',
  'size.12': 'Largest standard height for UI components.',
};

const doItems = [
  'Use --size-8 (48) as the minimum height for buttons, list rows, and all interactive elements.',
  'Use size tokens for both width and height dimensions within a component.',
  'Apply size tokens consistently across all instances of a component.',
];

const dontItems = [
  'Use hardcoded dimension values — always reference a token.',
  'Use tokens below --size-8 for interactive element heights.',
  'Mix size tokens arbitrarily within the same component.',
];

// ── Component ──────────────────────────────────────────────────────────────

export function DimensionPage() {
  const { brandFont, primaryColor } = useTheme();

  return (
    <div>
      {/* ── Header ──────────────────────────────────────────────── */}
      <div className="mb-10">
        <FoundationHero type="dimension" />
      </div>
      <div className="mb-12">
        <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
          Foundations
        </div>
        <h1 className="text-5xl font-bold text-gray-900 mb-6" style={{ fontFamily: brandFont }}>
          Dimension
        </h1>
        <p className="text-base text-gray-600 leading-relaxed">
          Dimension tokens define a fixed numeric scale of values used across components for widths,
          heights, and icon sizing. Every dimension in a component must reference a token — never a
          hardcoded value.
        </p>
        <p className="text-sm text-gray-400 mt-3">
          Also known as: Size scale, Sizing tokens, Component size scale, Height scale.
        </p>
      </div>

      {/* ── Scope notice ────────────────────────────────────────── */}
      <div className="mb-12 bg-blue-50 border border-blue-100 rounded-2xl px-6 py-4 flex items-start gap-3">
        <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
        <p className="text-sm text-blue-700 leading-relaxed">
          This page covers the size scale and token values. It does not cover component-specific
          size assignments — check Figma for per-component values.
        </p>
      </div>

      {/* ── Scale table ─────────────────────────────────────────── */}
      <div className="mb-16">
        <h2 className="text-2xl font-semibold mb-2 text-gray-900">Size scale</h2>
        <p className="text-sm text-gray-500 mb-6 leading-relaxed">
          Twelve steps from 2 to 80px, covering every standard component dimension from micro
          indicators up to the largest container heights.
        </p>

        <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-[160px_80px_1fr_280px] border-b border-gray-100 px-6 py-3 bg-gray-50">
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Token</div>
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Value</div>
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Visual</div>
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Usage</div>
          </div>

          {scale.map((item, index) => {
            const isTouchTarget = item.token === 'size.8';
            const barWidth = Math.max(3, (item.value / MAX_VALUE) * 100); // % of max
            const isLast = index === scale.length - 1;

            return (
              <div
                key={item.token}
                className={`grid grid-cols-[160px_80px_1fr_280px] px-6 py-4 items-center gap-0 ${
                  !isLast ? 'border-b border-gray-100' : ''
                } ${isTouchTarget ? 'bg-gray-50/60' : 'hover:bg-gray-50'} transition-colors`}
              >
                {/* Token */}
                <div className="flex items-center gap-2">
                  <span className="inline-block px-2.5 py-1 rounded-full text-xs font-mono text-gray-600">
                    {toCssSizeVar(item.token)}
                  </span>
                </div>

                {/* Value */}
                <div className="text-sm text-gray-600 font-mono">
                  {item.value}
                  <span className="text-gray-400 text-xs ml-0.5">{item.unit}</span>
                </div>

                {/* Visual bar */}
                <div className="flex items-center gap-3">
                  <div className="flex-1 max-w-[240px] flex items-center">
                    <div
                      className="h-5 rounded-sm transition-all"
                      style={{
                        width: `${barWidth}%`,
                        backgroundColor: isTouchTarget ? primaryColor : `${primaryColor}99`,
                        minWidth: '3px',
                      }}
                    />
                  </div>
                  {isTouchTarget && (
                    <span
                      className="flex-shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-full"
                      style={{
                        backgroundColor: `${primaryColor}18`,
                        color: primaryColor,
                      }}
                    >
                      Min. touch target
                    </span>
                  )}
                </div>

                {/* Usage */}
                <div className="text-sm text-gray-600 leading-relaxed">
                  {usageMap[item.token]}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Touch target callout ─────────────────────────────────── */}
      <div className="mb-16 border rounded-2xl px-6 py-5 flex items-start gap-4"
        style={{ borderColor: `${primaryColor}40`, backgroundColor: `${primaryColor}08` }}>
        <div>
          <p className="text-sm font-semibold text-gray-800 mb-1">
            <code className="font-mono bg-gray-100 border border-gray-200 rounded px-1.5 py-0.5 text-gray-700 text-xs">
              --size-8
            </code>
            {' '}— Minimum interactive height
          </p>
          <p className="text-sm text-gray-600 leading-relaxed">
            48px is the minimum height for any interactive element — buttons, list rows, inputs, and
            all tappable targets. Never use a smaller token for an interactive element height. Use
            padding to extend touch targets on visually smaller elements where needed.
          </p>
        </div>
      </div>

      {/* ── Do / Don't ──────────────────────────────────────────── */}
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

      {/* ── Accessibility ────────────────────────────────────────── */}
      <div className="mb-16">
        <h2 className="text-2xl font-semibold mb-6 text-gray-900">Accessibility</h2>
        <div className="bg-white border border-gray-200 rounded-3xl p-8">
          <p className="text-sm text-gray-600 leading-relaxed">
            <code className="font-mono text-xs bg-gray-100 border border-gray-200 rounded px-1.5 py-0.5 text-gray-700">
              --size-8
            </code>{' '}
            (48px) is the minimum touch target for interactive elements on both iOS and Android.
            Never spec interactive elements below this value. The 48dp/pt minimum applies to the
            full tappable area — not just the visual element. Use padding to extend touch targets on
            visually smaller elements where needed.
          </p>
        </div>
      </div>

      {/* ── Platform note ────────────────────────────────────────── */}
      <div className="mb-16">
        <h2 className="text-2xl font-semibold mb-6 text-gray-900">Platform note</h2>
        <div className="bg-white border border-gray-200 rounded-3xl p-8">
          <p className="text-sm text-gray-600 leading-relaxed">
            iOS native touch target is 44pt and Android is 48dp. CDS uses 48 across both platforms
            to maintain a consistent, platform-agnostic approach. Always spec interactive elements
            at{' '}
            <code className="font-mono text-xs bg-gray-100 border border-gray-200 rounded px-1.5 py-0.5 text-gray-700">
              --size-8
            </code>{' '}
            (48) minimum.
          </p>
        </div>
      </div>
    </div>
  );
}