import { useTheme } from '../contexts/ThemeContext';
import { FoundationHero } from './FoundationHero';

const toCssBorderWidthVar = (token: string) =>
  '--' + token.replace(/\./g, '-');

const borderWidthTokens = [
  {
    token: 'border.width.none',
    value: 0,
    label: 'None',
    usage: 'Zero border width. Used to remove or reset borders on elements.',
  },
  {
    token: 'border.width.hairline',
    value: 0.5,
    label: 'Hairline',
    usage: 'Sub-pixel border. Used for extremely subtle dividers on high-density displays.',
  },
  {
    token: 'border.width.thin',
    value: 1,
    label: 'Thin',
    usage: 'Standard border. Used for inputs, cards, dividers, and most interactive element outlines.',
  },
  {
    token: 'border.width.thick',
    value: 2,
    label: 'Thick',
    usage: 'Emphasis border. Used for focus rings, active states, and selected element indicators.',
  },
  {
    token: 'border.width.heavy',
    value: 4,
    label: 'Heavy',
    usage: 'Strong emphasis border. Used for callouts, alert strips, and high-visibility dividers.',
  },
];

export function BorderWidthPage() {
  const { brandFont, primaryColor } = useTheme();

  const primaryColorLight = primaryColor + '18';

  return (
    <div>
      {/* Header */}
      <div className="mb-10">
        <FoundationHero type="border-width" />
      </div>
      <div className="mb-12">
        <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
          Foundations
        </div>
        <h1 className="text-5xl font-bold text-gray-900 mb-6" style={{ fontFamily: brandFont }}>
          Border Width
        </h1>
        <p className="text-base text-gray-600 leading-relaxed">
          Border width tokens define the stroke thickness of UI element edges — outlines, dividers,
          and focus rings. Each token maps to a fixed pixel value and must be applied by token name,
          never as a raw number.
        </p>
        <p className="text-sm text-gray-400 mt-3">
          Also known as: Stroke Width, Outline Width.
        </p>
      </div>

      {/* Scope notice */}
      <div className="mb-12 bg-blue-50 border border-blue-100 rounded-2xl px-6 py-4 flex items-start gap-3">
        <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
        <p className="text-sm text-blue-700 leading-relaxed">
          This page covers the border width scale and token values. It does not cover
          component-specific border assignments — check Figma for per-component values.
        </p>
      </div>

      {/* ── TOKEN SCALE ───────────────────────────────────────────── */}
      <div className="mb-16">
        <h2 className="text-2xl font-semibold mb-2 text-gray-900">Width scale</h2>
        <p className="text-sm text-gray-500 mb-6 leading-relaxed">
          Five steps from zero to heavy, covering every standard use case from invisible borders
          to strong callout strokes.
        </p>

        <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden">
          {/* Table header */}
          <div className="grid grid-cols-[180px_80px_140px_1fr] gap-0 border-b border-gray-100 px-6 py-3 bg-gray-50">
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Token</div>
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Value</div>
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Visual</div>
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Usage</div>
          </div>

          {borderWidthTokens.map((token, index) => (
            <div
              key={token.token}
              className={`grid grid-cols-[180px_80px_140px_1fr] gap-0 px-6 py-5 items-center ${
                index < borderWidthTokens.length - 1 ? 'border-b border-gray-100' : ''
              } hover:bg-gray-50 transition-colors`}
            >
              {/* Token name */}
              <div>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-mono text-gray-600">
                  {toCssBorderWidthVar(token.token)}
                </span>
              </div>

              {/* Value */}
              <div className="text-sm text-gray-600">
                {token.value}
                <span className="text-gray-400 text-xs ml-0.5">px</span>
              </div>

              {/* Visual */}
              <div className="flex items-center">
                {token.value === 0 ? (
                  <div
                    className="w-16 h-8 rounded"
                    style={{ border: '1.5px dashed #d1d5db' }}
                  />
                ) : (
                  <div
                    className="w-16 h-8 rounded"
                    style={{
                      border: `${token.value}px solid ${primaryColor}`,
                      backgroundColor: primaryColorLight,
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

      {/* ── USAGE ─────────────────────────────────────────────────── */}
      <div className="mb-16">
        <h2 className="text-2xl font-semibold mb-6 text-gray-900">Usage</h2>
        <div className="bg-white border border-gray-200 rounded-3xl p-8">
          <ul className="space-y-4">
            {[
              {
                bold: 'Always use a border width token',
                rest: ' — never a hardcoded value.',
              },
              {
                bold: '--border-width-thin',
                rest: ' is the default for most outlines, inputs, and dividers.',
              },
              {
                bold: '--border-width-thick',
                rest: ' is reserved for focus rings and active or selected states.',
              },
              {
                bold: '--border-width-heavy',
                rest: ' is for high-visibility callouts and alert strips only.',
              },
              {
                bold: '--border-width-hairline',
                rest: ' is a high-density display option — do not use as the standard default.',
              },
              {
                bold: '--border-width-none',
                rest: ' must be explicit — do not rely on the absence of a border declaration.',
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
                'Use --border-width-thin for standard input and card outlines.',
                'Use --border-width-thick (2px) for focus rings to meet WCAG 2.2 focus indicator guidance.',
                'Apply --border-width-heavy for callouts and alerts that need strong visual separation.',
                'Pair focus ring width with a sufficient contrast ratio between the ring colour and its background.',
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
                'Use hardcoded pixel values — always reference a token.',
                'Use --border-width-hairline as the default — it is only appropriate on high-density displays.',
                'Mix token-based widths with hardcoded values within the same component.',
                'Rely on the absence of a border declaration to mean "no border" — always use --border-width-none explicitly.',
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
            Border width directly affects focus indicator visibility. Use{' '}
            <span className="font-mono text-gray-800 bg-gray-100 px-1.5 py-0.5 rounded">
              --border-width-thick
            </span>{' '}
            (2px) or greater for focus rings to satisfy WCAG 2.2 Success Criterion 2.4.11 (Focus
            Appearance), which requires a minimum focus indicator thickness of 2 CSS pixels. Always
            pair the focus ring with a colour that achieves at least a 3:1 contrast ratio against
            the adjacent background.
          </p>
        </div>
      </div>

      {/* ── PLATFORM NOTE ─────────────────────────────────────────── */}
      <div className="mb-16">
        <h2 className="text-2xl font-semibold mb-6 text-gray-900">Platform note</h2>
        <div className="bg-white border border-gray-200 rounded-3xl p-8">
          <p className="text-sm text-gray-600 leading-relaxed">
            Both iOS and Android use the same border width scale values. Design specs should
            reference{' '}
            <span className="font-mono text-gray-800 bg-gray-100 px-1.5 py-0.5 rounded">
              --border-width-*
            </span>{' '}
            tokens only — platform-specific implementation details are handled in code.
          </p>
        </div>
      </div>
    </div>
  );
}