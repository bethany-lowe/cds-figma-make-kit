import { Palette, FileText, Lightbulb, Code, Check, Copy } from 'lucide-react';
import { ResourceCards } from './ResourceCards';
import { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { GlobalColorHero } from './GlobalColorHero';

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
  const wcr = contrastRatio(1, bg);   // white text
  const bcr = contrastRatio(0, bg);   // black text
  return {
    white: { ratio: wcr, AA: wcr >= 4.5, AALarge: wcr >= 3 },
    black: { ratio: bcr, AA: bcr >= 4.5, AALarge: bcr >= 3 },
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

export function ColorsPage() {
  const { brandFont } = useTheme();
  const [activeTab, setActiveTab] = useState('Grey');
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const colorScales: ColorScale[] = [
    {
      category: 'Grey',
      swatches: [
        { name: '0', value: '#ffffff' },
        { name: '50', value: '#fafafa' },
        { name: '100', value: '#f4f4f7' },
        { name: '200', value: '#d0d0d2' },
        { name: '300', value: '#b4b4b7' },
        { name: '400', value: '#9a9a9d' },
        { name: '500', value: '#818186' },
        { name: '600', value: '#6e6e73' },
        { name: '700', value: '#57575b' },
        { name: '800', value: '#28282a' },
        { name: '900', value: '#151515' },
        { name: '1000', value: '#000000' },
      ],
    },
    {
      category: 'Red',
      swatches: [
        { name: '50', value: '#ffeff1' },
        { name: '100', value: '#ffc1c9' },
        { name: '200', value: '#ff93a0' },
        { name: '300', value: '#f36b7c' },
        { name: '400', value: '#f4213c' },
        { name: '500', value: '#d80b25' },
        { name: '600', value: '#ab1326' },
        { name: '700', value: '#810414' },
        { name: '800', value: '#53030d' },
        { name: '900', value: '#280005' },
      ],
    },
    {
      category: 'Amber',
      swatches: [
        { name: '50', value: '#fff4df' },
        { name: '100', value: '#faca69' },
        { name: '200', value: '#e7a727' },
        { name: '300', value: '#c98a0a' },
        { name: '400', value: '#aa750b' },
        { name: '500', value: '#906308' },
        { name: '600', value: '#755006' },
        { name: '700', value: '#563b03' },
        { name: '800', value: '#372502' },
        { name: '900', value: '#150e00' },
      ],
    },
    {
      category: 'Green',
      swatches: [
        { name: '50', value: '#cfffcf' },
        { name: '100', value: '#acffac' },
        { name: '200', value: '#8aff8a' },
        { name: '300', value: '#06ff2d' },
        { name: '400', value: '#00d51a' },
        { name: '500', value: '#00ab0b' },
        { name: '600', value: '#008101' },
        { name: '700', value: '#005700' },
        { name: '800', value: '#002d00' },
        { name: '900', value: '#000300' },
      ],
    },
    {
      category: 'Blue',
      swatches: [
        { name: '50', value: '#e9f5ff' },
        { name: '100', value: '#b1d7fe' },
        { name: '200', value: '#7cbbff' },
        { name: '300', value: '#409dfe' },
        { name: '400', value: '#0780ff' },
        { name: '500', value: '#006cde' },
        { name: '600', value: '#0057b1' },
        { name: '700', value: '#003f81' },
        { name: '800', value: '#002852' },
        { name: '900', value: '#000f1f' },
      ],
    },
  ];

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

  const colorDescriptions: Record<string, string> = {
    'Grey': 'Neutral tones for backgrounds, containers, borders, text, and UI elements. Use lighter shades for backgrounds and containers, darker shades for text and content.',
    'Red': 'Used for errors, destructive actions, and critical alerts. Communicates urgency and draws immediate attention.',
    'Amber': 'Used for warnings, caution states, and notifications that require attention but are not critical.',
    'Green': 'Used for success states, positive confirmations, and actions that indicate completion or approval.',
    'Blue': 'Used for informational messages, links, and primary interactive elements. Conveys trust and reliability.',
  };

  const resources = [
    {
      title: 'Color usage guidelines',
      description: 'Learn how to use colors effectively in your designs.',
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
      description: 'View all available color tokens and variables.',
      iconKey: 'objectGear/Line',
      iconBgColor: 'bg-blue-100',
      iconColor: '#1e40af',
    },
    {
      title: 'Implementation guide',
      description: 'How to implement colors in your codebase.',
      iconKey: 'objectToolbox/Line',
      iconBgColor: 'bg-green-100',
      iconColor: '#166534',
    },
  ];

  return (
    <div>
      <div className="mb-10">
        <GlobalColorHero />
      </div>
      <div className="mb-12">
        <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
          Foundations
        </div>
        <h1 className="text-5xl font-bold text-gray-900 mb-6" style={{ fontFamily: brandFont }}>Global Color</h1>
        <p className="text-base text-gray-600 leading-relaxed">
          Global color primitives available to all brands. These are the required foundational colors for the application, serving as the building blocks for UI components and design tokens.
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
              {colorDescriptions[activeTab]}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeScale.swatches.map((swatch) => {
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
                        className={`w-48 flex-shrink-0 flex items-center justify-center ${swatch.value === '#ffffff' ? 'border-r border-gray-200' : ''}`}
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
                            {/* White text badge */}
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
                            {/* Black text badge */}
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
                <strong className="font-medium text-gray-900">Design Tokens:</strong>
                <span className="text-gray-600"> These color primitives should be referenced through design tokens rather than used directly in components.</span>
              </div>
            </li>
            <li className="flex items-start">
              <div className="w-1.5 h-1.5 bg-gray-900 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <div>
                <strong className="font-medium text-gray-900">Accessibility:</strong>
                <span className="text-gray-600"> When pairing colors, ensure sufficient contrast ratios meet WCAG AA standards (4.5:1 for normal text, 3:1 for large text).</span>
              </div>
            </li>
            <li className="flex items-start">
              <div className="w-1.5 h-1.5 bg-gray-900 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <div>
                <strong className="font-medium text-gray-900">Scale Selection:</strong>
                <span className="text-gray-600"> Use lighter shades (0-300) for backgrounds and containers, mid-range shades (400-600) for borders and subtle elements, and darker shades (700-1000) for text and emphasis.</span>
              </div>
            </li>
            <li className="flex items-start">
              <div className="w-1.5 h-1.5 bg-gray-900 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <div>
                <strong className="font-medium text-gray-900">Consistency:</strong>
                <span className="text-gray-600"> These primitives are global and shared across all brands. Maintain consistency by using the same shade values for similar use cases.</span>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <ResourceCards resources={resources} />
    </div>
  );
}