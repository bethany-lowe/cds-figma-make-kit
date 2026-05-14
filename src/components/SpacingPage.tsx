import { useTheme } from '../contexts/ThemeContext';
import { FoundationHero } from './FoundationHero';

const toCssSpaceVar = (token: string) =>
  '--' + token.replace(/\./g, '-');

const spacingTokens = [
  {
    token: 'space.none',
    value: 0,
    usage: 'Zero spacing. Used to remove or reset spacing between elements and containers.',
  },
  {
    token: 'space.xxsmall',
    value: 2,
    usage: 'Minimum spacing. Used for tight internal gaps and micro-adjustments between elements.',
  },
  {
    token: 'space.xsmall',
    value: 4,
    usage: 'Extra small spacing. Used for compact gaps between closely related elements.',
  },
  {
    token: 'space.small',
    value: 8,
    usage: 'Small spacing. Used for gaps between inline elements such as icons and labels.',
  },
  {
    token: 'space.medium',
    value: 12,
    usage: 'Medium spacing. Used for internal padding within compact components.',
  },
  {
    token: 'space.large',
    value: 16,
    usage: 'Standard spacing. Used for padding within containers and gaps between grouped elements.',
  },
  {
    token: 'space.xlarge',
    value: 24,
    usage: 'Large spacing. Used for screen margins and padding on mobile layouts.',
  },
  {
    token: 'space.xxlarge',
    value: 32,
    usage: 'Extra large spacing. Used for spacing between distinct sections of a layout.',
  },
  {
    token: 'space.xxxlarge',
    value: 48,
    usage: 'Maximum spacing. Used for generous vertical rhythm and large section separations.',
  },
];

export function SpacingPage() {
  const { brandFont, primaryColor } = useTheme();

  return (
    <div>
      {/* Header */}
      <div className="mb-10">
        <FoundationHero type="spacing" />
      </div>
      <div className="mb-12">
        <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
          Foundations
        </div>
        <h1 className="text-5xl font-bold text-gray-900 mb-6" style={{ fontFamily: brandFont }}>
          Spacing
        </h1>
        <p className="text-base text-gray-600 leading-relaxed">
          Spacing units provide a foundation for managing density in components and layouts. Space is
          the distance between objects in a design. Intentional spacing creates harmony, improves
          overall experience, and supports accessibility.
        </p>
        <p className="text-sm text-gray-400 mt-3">Also known as: Padding, Margin, Gutter.</p>
      </div>

      {/* Scope notice */}
      <div className="mb-12 bg-blue-50 border border-blue-100 rounded-2xl px-6 py-4 flex items-start gap-3">
        <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0"></div>
        <p className="text-sm text-blue-700 leading-relaxed">
          This page covers the spacing scale and token values. It does not cover component-specific
          spacing assignments — check Figma for per-component values.
        </p>
      </div>

      {/* Token Table */}
      <div className="mb-16">
        <h2 className="text-2xl font-semibold mb-6 text-gray-900">Spacing scale</h2>
        <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden">
          {/* Table header */}
          <div className="grid grid-cols-[160px_80px_64px_1fr] gap-0 border-b border-gray-100 px-6 py-3 bg-gray-50">
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Token</div>
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Value</div>
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Visual</div>
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Usage</div>
          </div>

          {/* Rows */}
          {spacingTokens.map((token, index) => (
            <div
              key={token.token}
              className={`grid grid-cols-[160px_80px_64px_1fr] gap-0 px-6 py-4 items-center ${
                index < spacingTokens.length - 1 ? 'border-b border-gray-100' : ''
              } hover:bg-gray-50 transition-colors`}
            >
              {/* Token name */}
              <div>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-mono text-gray-600">
                  {toCssSpaceVar(token.token)}
                </span>
              </div>

              {/* Value */}
              <div className="text-sm text-gray-600">
                {token.value}
                <span className="text-gray-400 text-xs ml-0.5">px</span>
              </div>

              {/* Visual bar */}
              <div className="flex items-center">
                {token.value === 0 ? (
                  <div className="w-3 h-3 rounded-sm border-2 border-dashed border-gray-300" />
                ) : (
                  <div
                    className="rounded-sm"
                    style={{
                      width: Math.min(token.value, 48),
                      height: 20,
                      backgroundColor: primaryColor,
                    }}
                  />
                )}
              </div>

              {/* Usage */}
              <div className="text-sm text-gray-600 leading-relaxed">{token.usage}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Usage rules */}
      <div className="mb-16">
        <h2 className="text-2xl font-semibold mb-6 text-gray-900">Usage</h2>
        <div className="bg-white border border-gray-200 rounded-3xl p-8">
          <ul className="space-y-4 text-sm">
            {[
              { bold: 'Always use a spacing token', rest: ' — never a hardcoded value.' },
              {
                bold: 'Be consistent',
                rest: ' — spacing should be consistent across all instances of the same component.',
              },
              {
                bold: 'Use --space-none explicitly',
                rest: ' — use it to remove spacing; do not rely on the absence of spacing as a default.',
              },
              {
                bold: 'Scale intentionally',
                rest: ' — prefer smaller spacing values within components; use larger values for layout-level separation.',
              },
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 bg-gray-900 rounded-full mt-2 flex-shrink-0"></div>
                <div className="text-gray-600">
                  <strong className="font-medium text-gray-900">{item.bold}</strong>
                  {item.rest}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Do / Don't */}
      <div className="mb-16">
        <h2 className="text-2xl font-semibold mb-6 text-gray-900">Do / Don't</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Do */}
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
                'Use --space-xsmall and --space-small for compact internal gaps within components.',
                'Use --space-large and --space-xlarge for container padding and screen-level margins.',
                'Use --space-xxlarge and --space-xxxlarge for separating distinct content sections.',
                'Apply spacing tokens consistently across all instances of a component.',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                  <div className="w-1 h-1 rounded-full bg-green-400 mt-2 flex-shrink-0"></div>
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
                  <path d="M3 3l6 6M9 3l-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <span className="text-sm font-semibold text-red-700 uppercase tracking-wider">Don't</span>
            </div>
            <ul className="space-y-3">
              {[
                'Use hardcoded spacing values — always reference a token.',
                'Mix spacing tokens arbitrarily within the same component.',
                'Use --space-xxxlarge within compact components — it is reserved for layout-level separation.',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                  <div className="w-1 h-1 rounded-full bg-red-400 mt-2 flex-shrink-0"></div>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Accessibility */}
      <div className="mb-16">
        <h2 className="text-2xl font-semibold mb-6 text-gray-900">Accessibility</h2>
        <div className="bg-white border border-gray-200 rounded-3xl p-8">
          <p className="text-sm text-gray-600 leading-relaxed">
            Spacing contributes to readability and touch target separation. Ensure that interactive
            elements maintain the minimum{' '}
            <span className="font-mono text-gray-800 bg-gray-100 px-1.5 py-0.5 rounded">
              48×48dp
            </span>{' '}
            touch target regardless of the spacing applied between them. Adequate spacing between
            interactive elements prevents accidental activation.
          </p>
        </div>
      </div>
    </div>
  );
}