import { Palette, FileText, Lightbulb, Code, Check, Copy } from 'lucide-react';
import { ResourceCards } from './ResourceCards';
import { useTheme } from '../contexts/ThemeContext';
import { useState, useMemo } from 'react';
import { FoundationHero } from './FoundationHero';

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
}

interface ColorScale {
  category: string;
  swatches: ColorSwatch[];
}

export function BrandColorPage() {
  const { brand, tokens, brandName, brandFont } = useTheme();
  const [activeTab, setActiveTab] = useState('');
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const colorScales: ColorScale[] = useMemo(() => {
    const brandKey = brand === 'telus' ? 'telus' : 'homi';
    const brandColors = tokens.brandPrimitives.brand[brandKey].color;

    // Determine the color categories for this brand
    const scales: ColorScale[] = [];

    if (brand === 'telus') {
      // TELUS: Purple, Green, Grey
      if (brandColors.purple) {
        scales.push({
          category: 'Purple',
          swatches: Object.entries(brandColors.purple)
            .filter(([key]) => key !== '$type' && key !== '$value')
            .map(([name, data]: [string, any]) => ({
              name,
              value: data.$value
            }))
            .sort((a, b) => parseInt(a.name) - parseInt(b.name))
        });
      }
      if (brandColors.green) {
        scales.push({
          category: 'Green',
          swatches: Object.entries(brandColors.green)
            .filter(([key]) => key !== '$type' && key !== '$value')
            .map(([name, data]: [string, any]) => ({
              name,
              value: data.$value
            }))
            .sort((a, b) => parseInt(a.name) - parseInt(b.name))
        });
      }
      if (brandColors.grey) {
        scales.push({
          category: 'Grey',
          swatches: Object.entries(brandColors.grey)
            .filter(([key]) => key !== '$type' && key !== '$value')
            .map(([name, data]: [string, any]) => ({
              name,
              value: data.$value
            }))
            .sort((a, b) => parseInt(a.name) - parseInt(b.name))
        });
      }
    } else {
      // HOMI: Teal, Blue, Yellow
      if (brandColors.teal) {
        scales.push({
          category: 'Teal',
          swatches: Object.entries(brandColors.teal)
            .filter(([key]) => key !== '$type' && key !== '$value')
            .map(([name, data]: [string, any]) => ({
              name,
              value: data.$value
            }))
            .sort((a, b) => parseInt(a.name) - parseInt(b.name))
        });
      }
      if (brandColors.blue) {
        scales.push({
          category: 'Blue',
          swatches: Object.entries(brandColors.blue)
            .filter(([key]) => key !== '$type' && key !== '$value')
            .map(([name, data]: [string, any]) => ({
              name,
              value: data.$value
            }))
            .sort((a, b) => parseInt(a.name) - parseInt(b.name))
        });
      }
      if (brandColors.yellow) {
        scales.push({
          category: 'Yellow',
          swatches: Object.entries(brandColors.yellow)
            .filter(([key]) => key !== '$type' && key !== '$value')
            .map(([name, data]: [string, any]) => ({
              name,
              value: data.$value
            }))
            .sort((a, b) => parseInt(a.name) - parseInt(b.name))
        });
      }
    }

    return scales;
  }, [brand, tokens]);

  // Set initial active tab when scales load
  useMemo(() => {
    if (colorScales.length > 0 && !activeTab) {
      setActiveTab(colorScales[0].category);
    }
  }, [colorScales, activeTab]);

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

  const colorDescriptions: Record<string, Record<string, string>> = {
    telus: {
      'Purple': 'TELUS Purple - The signature brand color scale. Ranges from light to dark, providing the full spectrum for brand expression.',
      'Green': 'TELUS Green - The complementary brand color scale. Supports brand storytelling and provides visual variety.',
      'Grey': 'TELUS Grey - Brand-specific neutral tones that align with TELUS brand aesthetic.',
    },
    homi: {
      'Teal': 'HOMI Teal - The signature brand color scale. Ranges from light to dark, providing the full spectrum for brand expression.',
      'Blue': 'HOMI Blue - The complementary brand color scale. Supports brand storytelling and provides visual variety.',
      'Yellow': 'HOMI Yellow - The accent brand color scale. Used for highlights and special moments.',
    }
  };

  const resources = [
    {
      title: 'Brand guidelines',
      description: 'Learn how to use brand colors effectively.',
      iconKey: 'objectPalette/Line',
      iconBgColor: 'bg-purple-100',
      iconColor: '#6b21a8',
    },
    {
      title: 'Accessibility standards',
      description: 'Ensure your color choices meet WCAG requirements.',
      iconKey: 'actionInfo/Line',
      iconBgColor: 'bg-yellow-100',
      iconColor: '#854d0e',
    },
    {
      title: 'Design tokens',
      description: 'View all available brand color tokens.',
      iconKey: 'objectGear/Line',
      iconBgColor: 'bg-blue-100',
      iconColor: '#1e40af',
    },
    {
      title: 'Implementation guide',
      description: 'How to implement brand colors in your codebase.',
      iconKey: 'objectToolbox/Line',
      iconBgColor: 'bg-green-100',
      iconColor: '#166534',
    },
  ];

  return (
    <div>
      <div className="mb-10">
        <FoundationHero type="brand-color" />
      </div>
      <div className="mb-12">
        <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
          Foundations
        </div>
        <h1 className="text-5xl font-bold text-gray-900 mb-6" style={{ fontFamily: brandFont }}>Brand Color ({brandName})</h1>
        <p className="text-base text-gray-600 leading-relaxed">
          Brand-specific color primitives for {brandName}. These colors form the foundation of the brand's visual identity and are used to create brand-specific themes and semantic tokens.
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
              {colorDescriptions[brand]?.[activeTab] || ''}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeScale?.swatches.map((swatch) => {
                const isDark = ['600', '700', '800', '900'].includes(swatch.name);
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
                        className="w-48 flex-shrink-0 flex items-center justify-center"
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
                        <div className="text-lg font-semibold text-gray-900 mb-1">
                          {activeTab} {swatch.name}
                        </div>
                        <div className="text-sm text-gray-600 font-mono mb-3">
                          {swatch.value}
                        </div>
                        {a11y && (
                          <div className="flex items-center gap-2">
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
                <strong className="font-medium text-gray-900">Brand Primitives:</strong>
                <span className="text-gray-600"> These are brand-specific color values that serve as primitives within the design token system.</span>
              </div>
            </li>
            <li className="flex items-start">
              <div className="w-1.5 h-1.5 bg-gray-900 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <div>
                <strong className="font-medium text-gray-900">Token Hierarchy:</strong>
                <span className="text-gray-600"> Brand colors feed into the theme layer (alias tokens) which then inform semantic tokens used throughout the application.</span>
              </div>
            </li>
            <li className="flex items-start">
              <div className="w-1.5 h-1.5 bg-gray-900 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <div>
                <strong className="font-medium text-gray-900">Direct Usage:</strong>
                <span className="text-gray-600"> Like global primitives, these should not be used directly in components. Instead, reference them through design tokens.</span>
              </div>
            </li>
            <li className="flex items-start">
              <div className="w-1.5 h-1.5 bg-gray-900 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <div>
                <strong className="font-medium text-gray-900">Brand Switching:</strong>
                <span className="text-gray-600"> Each brand defines its own color values while maintaining the same structure, enabling seamless brand switching in the system.</span>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <ResourceCards resources={resources} />
    </div>
  );
}