import { useTheme } from '../contexts/ThemeContext';
import iconManifest from '../../imports/icon-manifest.json';

// ── Helpers ────────────────────────────────────────────────────────────────

/** Convert dot-notation token to CSS custom property (e.g. icon.size.medium → --icon-size-medium) */
const toCssIconSizeVar = (token: string) =>
  '--' + token.replace(/\./g, '-');

const sizeTokens = [
  {
    token: 'icon.size.small',
    px: 16,
    label: 'Small',
    touchTarget: false,
    usage: 'Inline with text. Use for supporting details, provider labels, and decorative elements inside compact components.',
  },
  {
    token: 'icon.size.medium',
    px: 24,
    label: 'Medium',
    touchTarget: false,
    usage: 'Default size. Use for the majority of UI contexts — device controls, navigation bars, header actions, and form fields.',
    isDefault: true,
  },
  {
    token: 'icon.size.large',
    px: 48,
    label: 'Large',
    touchTarget: true,
    usage: 'Large touch target contexts. Use for player controls, primary action buttons, and other prominent interactive icons.',
  },
  {
    token: 'icon.size.xlarge',
    px: 64,
    label: 'xLarge',
    touchTarget: true,
    usage: 'Hero icon moments. Use for large feature representations, device category icons, and onboarding illustrations.',
  },
  {
    token: 'icon.size.xxlarge',
    px: 88,
    label: 'xxLarge',
    touchTarget: true,
    usage: 'Maximum scale. Use for full-screen or near full-screen icon presentations, device status screens, and splash moments.',
  },
];

// A sample icon to preview — abstractBolt/Solid
const sampleIconSvg = (
  iconManifest as Record<string, { svg: string }>
)['abstractBolt/Solid']?.svg ?? '';

export function IconSizePage() {
  const { brandFont, primaryColor } = useTheme();

  return (
    <div>
      {/* ── Header ──────────────────────────────────────────────────── */}
      <div className="mb-12">
        <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
          Iconography
        </div>
        <h1
          className="text-5xl font-bold text-gray-900 mb-6"
          style={{ fontFamily: brandFont }}
        >
          Icon Size
        </h1>
        <p className="text-base text-gray-600 leading-relaxed">
          Icon size tokens define the five supported display sizes for CDS icons. Size is not
          purely aesthetic — each icon is drawn and optimised at a specific pixel grid. Always
          use <span className="font-mono text-gray-800 bg-gray-100 px-1.5 py-0.5 rounded text-sm">--icon-size-*</span> tokens; never hardcode dimensions.
        </p>
        <p className="text-sm text-gray-400 mt-3">
          Also known as: Icon scale, icon dimensions, icon display size.
        </p>
      </div>

      {/* ── Scope notice ────────────────────────────────────────────── */}
      <div className="mb-12 bg-blue-50 border border-blue-100 rounded-2xl px-6 py-4 flex items-start gap-3">
        <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
        <p className="text-sm text-blue-700 leading-relaxed">
          This page covers the icon size scale, token values, touch target requirements, and
          scaling rules. It does not cover icon naming, variants, colour, or accessibility
          labelling — see Icon Usage for those guidelines.
        </p>
      </div>

      {/* ── Size scale table ────────────────────────────────────────── */}
      <div className="mb-16">
        <h2 className="text-2xl font-semibold mb-2 text-gray-900">Size scale</h2>
        <p className="text-sm text-gray-500 mb-6 leading-relaxed">
          Five steps from compact inline use to full-screen display moments.{' '}
          <span className="font-mono text-gray-700 bg-gray-100 px-1.5 py-0.5 rounded">
            --icon-size-medium
          </span>{' '}
          is the default and covers the majority of UI contexts.
        </p>

        <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden">
          {/* Table header */}
          <div className="grid grid-cols-[200px_90px_80px_80px_1fr] border-b border-gray-100 px-6 py-3 bg-gray-50">
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Token</div>
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Size</div>
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Preview</div>
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Touch</div>
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">When to use</div>
          </div>

          {sizeTokens.map((size, index) => (
            <div
              key={size.token}
              className={`grid grid-cols-[200px_90px_80px_80px_1fr] px-6 py-5 items-center ${
                index < sizeTokens.length - 1 ? 'border-b border-gray-100' : ''
              } hover:bg-gray-50 transition-colors`}
            >
              {/* Token */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-mono text-gray-600">{toCssIconSizeVar(size.token)}</span>
                {size.isDefault && (
                  <span className="text-[10px] font-medium text-green-700 bg-green-100 px-1.5 py-0.5 rounded-md">
                    Default
                  </span>
                )}
              </div>

              {/* Size */}
              <div className="text-sm text-gray-600">
                {size.px}
                <span className="text-gray-400 text-xs ml-0.5">×</span>
                {size.px}
                <span className="text-gray-400 text-xs ml-0.5">px</span>
              </div>

              {/* Preview */}
              <div className="flex items-center">
                <span
                  style={{
                    color: primaryColor,
                    display: 'inline-flex',
                    width: Math.min(size.px, 40),
                    height: Math.min(size.px, 40),
                    flexShrink: 0,
                  }}
                  dangerouslySetInnerHTML={{
                    __html: sampleIconSvg
                      .replace(/width="24"/, `width="${Math.min(size.px, 40)}"`)
                      .replace(/height="24"/, `height="${Math.min(size.px, 40)}"`),
                  }}
                />
              </div>

              {/* Touch target */}
              <div className="flex">
                {size.touchTarget ? (
                  <span className="inline-flex w-fit items-center gap-1 text-xs text-green-700 rounded-lg px-2 py-1">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 12 12">
                      <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Meets 48px
                  </span>
                ) : (
                  <span className="flex w-full items-center gap-1 text-xs text-amber-700 rounded-lg px-2 py-1">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 12 12">
                      <path d="M6 2v4M6 8v1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                    Wrap 48px
                  </span>
                )}
              </div>

              {/* Usage */}
              <div className="text-sm text-gray-600 leading-relaxed">{size.usage}</div>
            </div>
          ))}
        </div>

        <p className="text-xs text-gray-400 mt-3 ml-1">
          ⚠️ An xsmall size (12×12) appears in some legacy documentation but is{' '}
          <strong className="text-gray-500">not a supported CDS token</strong> and is currently
          under review due to accessibility concerns. Do not use it.
        </p>
      </div>

      {/* ── Scaling rule ────────────────────────────────────────────── */}
      <div className="mb-16">
        <h2 className="text-2xl font-semibold mb-6 text-gray-900">Scaling rule</h2>
        <div className="bg-white border border-gray-200 rounded-3xl p-8">
          <ul className="space-y-4">
            {[
              {
                bold: 'Never scale icons between sizes',
                rest: ' — each icon is designed and optimised for its specific pixel grid. Scaling to a size outside the token set introduces legibility issues.',
              },
              {
                bold: 'If a new size is required',
                rest: ', the icon must be reproduced at that size. Do not stretch or shrink an existing asset.',
              },
              {
                bold: 'Always use the token that matches the intended use context',
                rest: ' — not a hardcoded pixel value.',
              },
              {
                bold: '--icon-size-medium is the default',
                rest: '. Only deviate when the context explicitly calls for a different size.',
              },
              {
                bold: 'Size values are identical on iOS (pt) and Android (dp)',
                rest: '. Unit conversion is handled in code — design specs should reference token names only.',
              },
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                <div className="w-1.5 h-1.5 bg-gray-900 rounded-full mt-2 flex-shrink-0" />
                <span>
                  <strong className="font-medium text-gray-900">{item.bold}</strong>
                  {item.rest}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── Do / Don't ──────────────────────────────────────────────── */}
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
                'Use --icon-size-medium as the default for all standard UI contexts.',
                'Use --icon-size-small only when the icon sits inline with body text or inside compact components.',
                'Use --icon-size-large or larger for player controls and primary interactive icon buttons.',
                'Use --icon-size-xlarge and --icon-size-xxlarge exclusively for hero, status, or splash moments.',
                'Reference --icon-size-* tokens in design specs and component annotations.',
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
                  <path d="M3 3l6 6M9 3l-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <span className="text-sm font-semibold text-red-700 uppercase tracking-wider">Don't</span>
            </div>
            <ul className="space-y-3">
              {[
                "Hardcode pixel dimensions — always reference an --icon-size-* token.",
                "Scale or stretch an icon asset between sizes — use the icon designed for the target size.",
                "Use the unsupported xsmall (12×12) size, even in compact contexts.",
                "Use --icon-size-xlarge or --icon-size-xxlarge within list items, form fields, or standard navigation.",
                "Mix different size tokens within the same component or control group.",
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

      {/* ── Touch targets ───────────────────────────────────────────── */}
      <div className="mb-16">
        <h2 className="text-2xl font-semibold mb-6 text-gray-900">Touch targets</h2>
        <div className="bg-white border border-gray-200 rounded-3xl p-8">
          <p className="text-sm text-gray-600 leading-relaxed mb-6">
            Interactive icons must meet the CDS minimum touch target of{' '}
            <span className="font-mono text-gray-800 bg-gray-100 px-1.5 py-0.5 rounded">48×48px</span>,
            regardless of the icon's visual size. The visual icon size and the interactive touch
            target size are independent — never reduce the tappable area to match the icon.
          </p>

          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
            <div className="grid grid-cols-[1fr_100px_1fr] border-b border-gray-100 px-5 py-3 bg-gray-50">
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Token</div>
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Visual size</div>
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Touch target</div>
            </div>
            {sizeTokens.map((size, i) => (
              <div
                key={size.token}
                className={`grid grid-cols-[1fr_100px_1fr] px-5 py-3.5 items-center text-sm ${
                  i < sizeTokens.length - 1 ? 'border-b border-gray-50' : ''
                }`}
              >
                <span className="inline-block w-fit px-3 py-1 rounded-full text-xs font-mono text-gray-600">{toCssIconSizeVar(size.token)}</span>
                <span className="text-gray-600">{size.px}×{size.px}px</span>
                <span className="text-gray-600">
                  {size.touchTarget
                    ? <span className="text-green-700">✓ Meets 48×48px alone</span>
                    : <span className="text-amber-700">Wrap in a 48×48px hit area</span>
                  }
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Accessibility ───────────────────────────────────────────── */}
      <div className="mb-16">
        <h2 className="text-2xl font-semibold mb-6 text-gray-900">Accessibility</h2>
        <div className="bg-white border border-gray-200 rounded-3xl p-8">
          <p className="text-sm text-gray-600 leading-relaxed">
            The minimum interactive touch target is{' '}
            <span className="font-mono text-gray-800 bg-gray-100 px-1.5 py-0.5 rounded">48×48dp</span>{' '}
            on both iOS and Android, in line with Apple HIG and Android Material guidelines.
            This applies to the full tappable area — not the visual icon. For{' '}
            <span className="font-mono text-gray-800 bg-gray-100 px-1.5 py-0.5 rounded">--icon-size-small</span>{' '}
            and{' '}
            <span className="font-mono text-gray-800 bg-gray-100 px-1.5 py-0.5 rounded">--icon-size-medium</span>,
            always wrap the icon in a container that expands the hit area to 48×48px.
            Never annotate a component with a touch target smaller than the visual icon size.
          </p>
        </div>
      </div>

      {/* ── Platform note ───────────────────────────────────────────── */}
      <div className="mb-16">
        <h2 className="text-2xl font-semibold mb-6 text-gray-900">Platform note</h2>
        <div className="bg-white border border-gray-200 rounded-3xl p-8">
          <p className="text-sm text-gray-600 leading-relaxed">
            Icon size values are identical on iOS (pt) and Android (dp). The unit differs by
            platform but the numeric values are the same. Design specs should reference{' '}
            <span className="font-mono text-gray-800 bg-gray-100 px-1.5 py-0.5 rounded">
              --icon-size-*
            </span>{' '}
            tokens only — platform unit conversion is handled in code. Web implementations use{' '}
            <span className="font-mono text-gray-800 bg-gray-100 px-1.5 py-0.5 rounded">px</span>{' '}
            at the same numeric values (no conversion needed at 1×).
          </p>
        </div>
      </div>
    </div>
  );
}