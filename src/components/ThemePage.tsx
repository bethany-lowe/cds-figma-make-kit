import { Palette, FileText, Lightbulb, Code, Check, Copy } from 'lucide-react';
import { ResourceCards } from './ResourceCards';
import { useTheme } from '../contexts/ThemeContext';
import { useState, useMemo } from 'react';

// ── WCAG contrast helpers ─────────────────────────────────────────────────────
function hexToRgb(hex: string) {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return m ? { r: parseInt(m[1], 16), g: parseInt(m[2], 16), b: parseInt(m[3], 16) } : null;
}
function linearize(v: number) {
  const s = v / 255;
  return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
}
function luminance(r: number, g: number, b: number) {
  return 0.2126 * linearize(r) + 0.7152 * linearize(g) + 0.0722 * linearize(b);
}
function contrastRatio(l1: number, l2: number) {
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}
function getA11y(hex: string) {
  const rgb = hexToRgb(hex);
  if (!rgb) return null;
  const bg = luminance(rgb.r, rgb.g, rgb.b);
  const wcr = contrastRatio(1, bg);
  const bcr = contrastRatio(0, bg);
  return {
    white: { ratio: wcr, AA: wcr >= 4.5 },
    black: { ratio: bcr, AA: bcr >= 4.5 },
  };
}
// ─────────────────────────────────────────────────────────────────────────────

interface ColorSwatch {
  name: string;
  value: string;
  reference: string;
}

interface ColorScale {
  category: string;
  swatches: ColorSwatch[];
}

export function ThemePage() {
  const { brand, tokens, brandName, brandFont } = useTheme();
  const [activeTab, setActiveTab] = useState('Primary');
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  // Helper function to resolve token references to actual hex values
  const resolveTokenValue = (tokenRef: string): { hex: string; reference: string } => {
    // Remove curly braces from token reference
    const cleanRef = tokenRef.replace(/[{}]/g, '');
    const parts = cleanRef.split('.');

    let value: any = tokens;
    for (const part of parts) {
      if (part === 'brand') {
        value = tokens.brandPrimitives.brand;
      } else if (part === 'global') {
        value = tokens.primitives.global;
      } else {
        value = value?.[part];
      }
      if (!value) break;
    }

    return {
      hex: value?.$value || tokenRef,
      reference: cleanRef
    };
  };

  const colorScales: ColorScale[] = useMemo(() => {
    const themeColors = tokens.themeAlias.color;

    // Define the order for primary, secondary, tertiary
    const standardOrder = ['lighter', 'light', 'pure', 'dark', 'darker'];
    // Define the order for neutral
    const neutralOrder = ['lightest', 'lighter', 'light', 'pure', 'dark', 'darker', 'darkest'];

    return [
      {
        category: 'Primary',
        swatches: standardOrder
          .filter(key => themeColors.primary?.[key])
          .map(name => {
            const resolved = resolveTokenValue(themeColors.primary[name].$value);
            return { name, value: resolved.hex, reference: resolved.reference };
          })
      },
      {
        category: 'Secondary',
        swatches: standardOrder
          .filter(key => themeColors.secondary?.[key])
          .map(name => {
            const resolved = resolveTokenValue(themeColors.secondary[name].$value);
            return { name, value: resolved.hex, reference: resolved.reference };
          })
      },
      {
        category: 'Tertiary',
        swatches: standardOrder
          .filter(key => themeColors.tertiary?.[key])
          .map(name => {
            const resolved = resolveTokenValue(themeColors.tertiary[name].$value);
            return { name, value: resolved.hex, reference: resolved.reference };
          })
      },
      {
        category: 'Neutral',
        swatches: neutralOrder
          .filter(key => themeColors.neutral?.[key])
          .map(name => {
            const resolved = resolveTokenValue(themeColors.neutral[name].$value);
            return { name, value: resolved.hex, reference: resolved.reference };
          })
      },
      {
        category: 'Success',
        swatches: standardOrder
          .filter(key => themeColors.success?.[key])
          .map(name => {
            const resolved = resolveTokenValue(themeColors.success[name].$value);
            return { name, value: resolved.hex, reference: resolved.reference };
          })
      },
      {
        category: 'Alert',
        swatches: standardOrder
          .filter(key => themeColors.alert?.[key])
          .map(name => {
            const resolved = resolveTokenValue(themeColors.alert[name].$value);
            return { name, value: resolved.hex, reference: resolved.reference };
          })
      },
      {
        category: 'Error',
        swatches: standardOrder
          .filter(key => themeColors.error?.[key])
          .map(name => {
            const resolved = resolveTokenValue(themeColors.error[name].$value);
            return { name, value: resolved.hex, reference: resolved.reference };
          })
      },
      {
        category: 'Info',
        swatches: standardOrder
          .filter(key => themeColors.info?.[key])
          .map(name => {
            const resolved = resolveTokenValue(themeColors.info[name].$value);
            return { name, value: resolved.hex, reference: resolved.reference };
          })
      },
    ];
  }, [brand, tokens]);

  const handleCopyColor = async (color: string) => {
    // Use fallback method that works in all environments
    const textarea = document.createElement('textarea');
    textarea.value = color;
    textarea.style.position = 'fixed';
    textarea.style.top = '-9999px';
    textarea.style.left = '-9999px';
    document.body.appendChild(textarea);
    textarea.select();

    try {
      document.execCommand('copy');
    } catch (err) {
      // Silently fail
    } finally {
      document.body.removeChild(textarea);
    }

    setCopiedColor(color);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  const activeScale = colorScales.find(scale => scale.category === activeTab) || colorScales[0];

  const brandColorDescriptions: Record<string, Record<string, string>> = {
    telus: {
      'Primary': 'Primary brand palette - Alias tokens that map to TELUS Purple primitives. Used for key brand moments, primary actions, and main interactive elements.',
      'Secondary': 'Secondary brand palette - Alias tokens that map to TELUS Green primitives. Complements the primary palette and provides flexibility for additional brand expression.',
      'Tertiary': 'Tertiary brand palette - Alias tokens that map to TELUS Green primitives. Extends the brand palette for accent moments and supporting visual elements.',
      'Neutral': 'Neutral brand palette - Alias tokens that map to TELUS Grey primitives. Provides brand-specific neutral tones for backgrounds, borders, and text.',
      'Success': 'Success feedback palette - Defined at the theme level so brands can override the global green scale if needed. Currently maps to global green primitives.',
      'Alert': 'Alert feedback palette - Defined at the theme level so brands can override the global amber scale if needed. Note: background and border tokens intentionally use the light stop; text tokens use the pure stop for contrast.',
      'Error': 'Error feedback palette - Defined at the theme level so brands can override the global red scale if needed. Currently maps to global red primitives.',
      'Info': 'Info feedback palette - Defined at the theme level so brands can override the global blue scale if needed. Currently maps to global blue primitives.',
    },
    homi: {
      'Primary': 'Primary brand palette - Alias tokens that map to HOMI Teal primitives. Used for key brand moments, primary actions, and main interactive elements.',
      'Secondary': 'Secondary brand palette - Alias tokens that map to HOMI Blue primitives. Complements the primary palette and provides flexibility for additional brand expression.',
      'Tertiary': 'Tertiary brand palette - Alias tokens that map to HOMI Yellow primitives. Extends the brand palette for accent moments and supporting visual elements.',
      'Neutral': 'Neutral brand palette - Alias tokens that map to global Grey primitives. Provides neutral tones for backgrounds, borders, and text.',
      'Success': 'Success feedback palette - Defined at the theme level so brands can override the global green scale if needed. Currently maps to global green primitives.',
      'Alert': 'Alert feedback palette - Defined at the theme level so brands can override the global amber scale if needed. Note: background and border tokens intentionally use the light stop; text tokens use the pure stop for contrast.',
      'Error': 'Error feedback palette - Defined at the theme level so brands can override the global red scale if needed. Currently maps to global red primitives.',
      'Info': 'Info feedback palette - Defined at the theme level so brands can override the global blue scale if needed. Currently maps to global blue primitives.',
    }
  };

  const resources = [
    {
      title: 'Theme usage guidelines',
      description: 'Learn how to use themes effectively in your designs.',
      iconKey: 'objectPalette/Line',
      iconBgColor: 'bg-purple-100',
      iconColor: '#6b21a8',
    },
    {
      title: 'Accessibility standards',
      description: 'Ensure your theme choices meet WCAG requirements.',
      iconKey: 'actionInfo/Line',
      iconBgColor: 'bg-yellow-100',
      iconColor: '#854d0e',
    },
    {
      title: 'Design tokens',
      description: 'View all available theme tokens and variables.',
      iconKey: 'objectGear/Line',
      iconBgColor: 'bg-blue-100',
      iconColor: '#1e40af',
    },
    {
      title: 'Implementation guide',
      description: 'How to implement themes in your codebase.',
      iconKey: 'objectToolbox/Line',
      iconBgColor: 'bg-green-100',
      iconColor: '#166534',
    },
  ];

  return (
    <div>
      <div className="mb-12">
        <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
          Brand Expression
        </div>
        <h1 className="text-5xl font-bold text-gray-900 mb-6" style={{ fontFamily: brandFont }}>Brand Palette ({brandName})</h1>
        <p className="text-base text-gray-600 leading-relaxed">
          The brand palette serves as the building blocks for brand expression throughout the app. These colors function as an alias layer, capturing brand decisions in our design system tokens to inform our semantic tokens and create consistent, branded experiences.
        </p>
      </div>

      <div className="mb-16">
        <div className="w-full">
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <div className="flex gap-8">
              {colorScales.map((scale) => (
                <button
                  key={scale.category}
                  onClick={() => setActiveTab(scale.category)}
                  className={`pb-3 text-base font-medium transition-colors relative ${
                    activeTab === scale.category
                      ? 'text-gray-900'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {scale.category}
                  {activeTab === scale.category && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900"></div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Swatch Book Content */}
          <div className="py-8">
            <p className="text-sm text-gray-600 mb-6">
              {brandColorDescriptions[brand][activeTab]}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeScale.swatches.map((swatch) => {
                const isDark = ['dark', 'darker', 'darkest'].includes(swatch.name);
                const isCopied = copiedColor === swatch.value;
                const a11y = getA11y(swatch.value);

                return (
                  <button
                    key={swatch.name}
                    onClick={() => handleCopyColor(swatch.value)}
                    className="group relative bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-gray-300 hover:shadow-md transition-all text-left"
                  >
                    <div className="flex items-stretch">
                      <div
                        className="w-32 flex-shrink-0 flex items-center justify-center"
                        style={{ backgroundColor: swatch.value }}
                      >
                        <div className={`opacity-0 group-hover:opacity-100 transition-opacity ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {isCopied ? (
                            <Check className="w-5 h-5" />
                          ) : (
                            <Copy className="w-5 h-5" />
                          )}
                        </div>
                      </div>
                      <div className="flex-1 px-5 py-4">
                        <div className="text-sm font-semibold text-gray-900 mb-2">
                          {activeTab.toLowerCase()}-{swatch.name}
                        </div>
                        <span className="inline-block px-3 py-1 bg-gray-50 border border-gray-200 rounded-full text-xs font-mono text-gray-600 mb-3">
                          {swatch.reference}
                        </span>
                        {a11y && (
                          <div className="flex items-center gap-2 mt-2">
                            <span
                              title={`White text contrast: ${a11y.white.ratio.toFixed(2)}:1`}
                              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium border ${
                                a11y.white.AA
                                  ? 'bg-green-50 border-green-200 text-green-700'
                                  : 'bg-gray-50 border-gray-200 text-gray-400'
                              }`}
                            >
                              <span
                                className="inline-block w-2.5 h-2.5 rounded-sm border border-current opacity-60"
                                style={{ backgroundColor: '#ffffff' }}
                              />
                              AA {a11y.white.AA ? '✓' : '✗'}
                            </span>
                            <span
                              title={`Black text contrast: ${a11y.black.ratio.toFixed(2)}:1`}
                              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium border ${
                                a11y.black.AA
                                  ? 'bg-green-50 border-green-200 text-green-700'
                                  : 'bg-gray-50 border-gray-200 text-gray-400'
                              }`}
                            >
                              <span
                                className="inline-block w-2.5 h-2.5 rounded-sm border border-gray-300"
                                style={{ backgroundColor: '#000000' }}
                              />
                              AA {a11y.black.AA ? '✓' : '✗'}
                            </span>
                          </div>
                        )}
                        {isCopied && (
                          <div className="text-xs text-green-600 mt-2">
                            Copied to clipboard!
                          </div>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-semibold mb-6 text-gray-900">Usage Guidelines</h2>
        <div className="bg-white border border-gray-200 rounded-3xl p-8">
          <ul className="space-y-4 text-sm">
            <li className="flex items-start">
              <div className="w-1.5 h-1.5 bg-gray-900 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <div>
                <strong className="font-medium text-gray-900">Alias Layer:</strong>
                <span className="text-gray-600"> Brand colors function as an intermediate layer between color primitives and semantic tokens, allowing brand decisions to be captured and applied consistently.</span>
              </div>
            </li>
            <li className="flex items-start">
              <div className="w-1.5 h-1.5 bg-gray-900 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <div>
                <strong className="font-medium text-gray-900">Token Mapping:</strong>
                <span className="text-gray-600"> These brand colors should map to semantic tokens (e.g., button-primary-background, link-default) rather than being used directly in components.</span>
              </div>
            </li>
            <li className="flex items-start">
              <div className="w-1.5 h-1.5 bg-gray-900 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <div>
                <strong className="font-medium text-gray-900">Brand Differentiation:</strong>
                <span className="text-gray-600"> Each brand can define its own color values while maintaining the same token structure, enabling multi-brand experiences within a single system.</span>
              </div>
            </li>
            <li className="flex items-start">
              <div className="w-1.5 h-1.5 bg-gray-900 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <div>
                <strong className="font-medium text-gray-900">Customization:</strong>
                <span className="text-gray-600"> Brand color values can be customized per brand while preserving the overall token architecture and ensuring consistent application patterns.</span>
              </div>
            </li>
            <li className="flex items-start">
              <div className="w-1.5 h-1.5 bg-gray-900 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <div>
                <strong className="font-medium text-gray-900">Feedback colors at the theme level:</strong>
                <span className="text-gray-600"> Success, Alert, Error, and Info are intentionally defined in the theme alias layer — not hardcoded to global primitives. While both TELUS and HOMI currently point to the same global scales (green, amber, red, blue), housing these definitions in the theme gives each brand the freedom to substitute their own colour choices for feedback states without touching the global primitive layer or the semantic token structure.</span>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <ResourceCards resources={resources} />
    </div>
  );
}