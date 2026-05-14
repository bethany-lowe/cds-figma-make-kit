import { useTheme } from '../contexts/ThemeContext';
import { FoundationHero } from './FoundationHero';

const toCssBorderRadiusVar = (token: string) =>
  '--' + token.replace(/\./g, '-');

const borderRadiusTokens = [
  {
    token: 'border.radius.none',
    value: 0,
    label: 'None',
    usage: 'Zero corner radius. Used to remove or reset corner rounding on elements and containers.',
  },
  {
    token: 'border.radius.xsmall',
    value: 4,
    label: 'xSmall',
    usage: 'Smallest corner radius. Used for compact elements, status tags, and small interactive indicators.',
  },
  {
    token: 'border.radius.small',
    value: 8,
    label: 'Small',
    usage: 'Used for elements nested within larger containers to maintain proportional rounding.',
  },
  {
    token: 'border.radius.medium',
    value: 12,
    label: 'Medium',
    usage: 'Used for cards, tiles, and standard container elements.',
  },
  {
    token: 'border.radius.large',
    value: 16,
    label: 'Large',
    usage: 'Used for banners, input fields, and larger containers.',
  },
  {
    token: 'border.radius.xlarge',
    value: 24,
    label: 'xLarge',
    usage: 'Largest fixed corner radius. Used for prominent UI elements such as bottom sheets and modal containers.',
  },
  {
    token: 'border.radius.full',
    value: 999,
    label: 'Full',
    usage: 'Maximum corner radius. Used for fully rounded pill shapes, circular elements, and avatar containers.',
  },
];

export function BorderRadiusPage() {
  const { brandFont, primaryColor } = useTheme();

  return (
    <div>
      {/* Header */}
      <div className="mb-10">
        <FoundationHero type="border-radius" />
      </div>
      <div className="mb-12">
        <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
          Foundations
        </div>
        <h1 className="text-5xl font-bold text-gray-900 mb-6" style={{ fontFamily: brandFont }}>
          Border Radius
        </h1>
        <p className="text-base text-gray-600 leading-relaxed">
          Border radius softens the visual weight of UI elements and contributes to the
          approachable, friendly aesthetic of SmartHome+. Radius is applied consistently using
          tokens — never arbitrary values.
        </p>
        <p className="text-sm text-gray-400 mt-3">
          Also known as: Corner Radius, Shape Radius, Rounding.
        </p>
      </div>

      {/* Scope notice */}
      <div className="mb-12 bg-blue-50 border border-blue-100 rounded-2xl px-6 py-4 flex items-start gap-3">
        <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
        <p className="text-sm text-blue-700 leading-relaxed">
          This page covers the radius scale and token values. It does not cover component-specific
          radius assignments — check Figma for per-component values.
        </p>
      </div>

      {/* ── TOKEN SCALE ───────────────────────────────────────────── */}
      <div className="mb-16">
        <h2 className="text-2xl font-semibold mb-2 text-gray-900">Radius scale</h2>
        <p className="text-sm text-gray-500 mb-6 leading-relaxed">
          Seven steps from sharp to fully rounded, covering every standard container and
          interactive element. Larger containers generally use larger radius values; smaller
          components use smaller values.
        </p>

        <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden">
          {/* Table header */}
          <div className="grid grid-cols-[200px_100px_160px_1fr] gap-0 border-b border-gray-100 px-6 py-3 bg-gray-50">
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Token</div>
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Value</div>
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Visual</div>
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Usage</div>
          </div>

          {borderRadiusTokens.map((token, index) => {
            // Cap display radius to half the swatch height (16px) so corners are proportional
            const displayRadius = Math.min(token.value, 16);
            return (
              <div
                key={token.token}
                className={`grid grid-cols-[200px_100px_160px_1fr] gap-0 px-6 py-5 items-center ${
                  index < borderRadiusTokens.length - 1 ? 'border-b border-gray-100' : ''
                } hover:bg-gray-50 transition-colors`}
              >
                {/* Token name */}
                <div>
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-mono text-gray-600">
                    {toCssBorderRadiusVar(token.token)}
                  </span>
                </div>

                {/* Value */}
                <div className="text-sm text-gray-600">
                  {token.value === 999 ? (
                    <>
                      999
                      <span className="text-gray-400 text-xs ml-0.5">px</span>
                      <span className="ml-1.5 text-gray-400 text-xs">(pill)</span>
                    </>
                  ) : (
                    <>
                      {token.value}
                      <span className="text-gray-400 text-xs ml-0.5">px</span>
                    </>
                  )}
                </div>

                {/* Visual: filled rectangle showing corner radius */}
                <div className="flex items-center">
                  <div
                    className="w-20 h-8"
                    style={{
                      borderRadius: token.value === 999 ? '9999px' : `${displayRadius}px`,
                      backgroundColor: primaryColor,
                    }}
                  />
                </div>

                {/* Usage */}
                <div className="text-sm text-gray-600 leading-relaxed">{token.usage}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── USAGE ─────────────────────────────────────────────────── */}
      <div className="mb-16">
        <h2 className="text-2xl font-semibold mb-6 text-gray-900">Usage</h2>
        <div className="bg-white border border-gray-200 rounded-3xl p-8">
          <ul className="space-y-4">
            {[
              {
                bold: 'Always use a radius token',
                rest: ' — never a hardcoded value.',
              },
              {
                bold: 'Radius should be consistent',
                rest: ' across all instances of the same component.',
              },
              {
                bold: 'Larger containers',
                rest: ' generally use larger radius values; smaller components use smaller values.',
              },
              {
                bold: '--border-radius-full',
                rest: ' creates a pill shape regardless of element dimensions — use it intentionally, not as a catch-all.',
              },
              {
                bold: '--border-radius-none',
                rest: ' is not a default — sharp corners are a deliberate design choice, not a fallback.',
              },
              {
                bold: 'Individual corner overrides',
                rest: ' are acceptable only when a component is edge-anchored (e.g. a bottom sheet with square top corners).',
              },
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                <div className="w-1.5 h-1.5 bg-gray-900 rounded-full mt-2 flex-shrink-0" />
                <span>
                  <strong className="font-medium text-gray-900 font-mono">{item.bold}</strong>
                  {item.rest}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── DO / DON'T ────────────────────────────────────────────── */}
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
              {[
                'Apply radius tokens consistently across all instances of a component.',
                'Use --border-radius-full for pill-shaped interactive elements such as buttons and tags.',
                'Use --border-radius-large or --border-radius-xlarge for card and container components.',
                'Apply individual corner overrides only when a component is edge-anchored (e.g. a bottom sheet with square top corners).',
              ].map((item, i) => (
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
              {[
                'Use hardcoded corner radius values — always reference a token.',
                'Mix arbitrary radius values with token values within the same component.',
                'Apply --border-radius-full to rectangular containers — it should only be used where the pill shape is the intended visual.',
                'Use --border-radius-none as a default — sharp corners are a deliberate choice, not a fallback.',
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

      {/* ── ACCESSIBILITY ─────────────────────────────────────────── */}
      <div className="mb-16">
        <h2 className="text-2xl font-semibold mb-6 text-gray-900">Accessibility</h2>
        <div className="bg-white border border-gray-200 rounded-3xl p-8">
          <p className="text-sm text-gray-600 leading-relaxed">
            Border radius has no direct accessibility impact. However, rounded elements must still
            meet the{' '}
            <span className="font-mono text-gray-800 bg-gray-100 px-1.5 py-0.5 rounded">
              48×48dp
            </span>{' '}
            minimum touch target requirement regardless of their visual shape. The perceived
            interactive area should never be smaller than the touch target, even when corners are
            heavily rounded.
          </p>
        </div>
      </div>

      {/* ── PLATFORM NOTE ─────────────────────────────────────────── */}
      <div className="mb-16">
        <h2 className="text-2xl font-semibold mb-6 text-gray-900">Platform note</h2>
        <div className="bg-white border border-gray-200 rounded-3xl p-8">
          <p className="text-sm text-gray-600 leading-relaxed">
            Both iOS and Android use the same radius scale values. Android implements radius through
            both{' '}
            <span className="font-mono text-gray-800 bg-gray-100 px-1.5 py-0.5 rounded">
              CdsRadius
            </span>{' '}
            tokens and a separate{' '}
            <span className="font-mono text-gray-800 bg-gray-100 px-1.5 py-0.5 rounded">
              CdsShapes
            </span>{' '}
            system that maps to Material Design shape tokens — these are implementation details
            handled in code. Design specs should reference{' '}
            <span className="font-mono text-gray-800 bg-gray-100 px-1.5 py-0.5 rounded">
              --border-radius-*
            </span>{' '}
            tokens only.
          </p>
        </div>
      </div>
    </div>
  );
}