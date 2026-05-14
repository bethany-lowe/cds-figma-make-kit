import { Type, BookOpen, Code, Palette } from 'lucide-react';
import { ResourceCards } from './ResourceCards';
import { useTheme } from '../contexts/ThemeContext';
import { useState } from 'react';
import semanticTextTokens from '../../imports/semantic-text-tokens.json';
import primitiveTokens from '../../imports/primitive-design-tokens.json';
import { FoundationHero } from './FoundationHero';

export function TypographyPage() {
  const { brandFont } = useTheme();
  const [activeTab, setActiveTab] = useState<'styles' | 'specs' | 'usage'>('styles');

  // Helper to resolve token references
  const resolveToken = (ref: string): string => {
    const cleanRef = ref.replace(/[{}]/g, '');
    const parts = cleanRef.split('.');

    let value: any = { text: primitiveTokens.text };
    for (const part of parts) {
      value = value?.[part];
      if (!value) break;
    }

    if (value?.$value) {
      if (typeof value.$value === 'object' && 'value' in value.$value) {
        return `${value.$value.value}${value.$value.unit}`;
      }
      return value.$value;
    }
    return ref;
  };

  // Convert a JSON token path or {ref} to a CSS custom property name
  // e.g. 'display.xlarge' → '--display-xlarge'
  // e.g. '{text.scale.fontSize.13}' → '--text-scale-font-size-13'
  const toCssTypoVar = (ref: string): string => {
    const clean = ref.replace(/[{}]/g, '');
    const kebab = clean
      .replace(/\./g, '-')
      .replace(/([A-Z])/g, (m) => `-${m.toLowerCase()}`);
    return `--${kebab}`;
  };

  // Helper to resolve font family based on active theme
  const resolveFontFamily = (ref: string): string => {
    const cleanRef = ref.replace(/[{}]/g, '');

    // If it references alias.theme.text.primary, use the brand font
    if (cleanRef.includes('alias.theme.text.primary')) {
      return brandFont;
    }

    // Otherwise it's platform.text.default which is Noto Sans
    return 'Noto Sans';
  };

  interface TypeSpec {
    name: string;
    token: string;
    fontSize: string;
    lineHeight: string;
    fontWeight: string;
    letterSpacing: string;
    fontSizeToken: string;
    lineHeightToken: string;
    fontWeightToken: string;
    letterSpacingToken: string;
    fontFamilyToken: string;
  }

  interface TypeCategory {
    category: string;
    specs: TypeSpec[];
  }

  const typeCategories: TypeCategory[] = [
    {
      category: 'Display',
      specs: [
        {
          name: 'Display XLarge',
          token: 'display.xlarge',
          fontSize: resolveToken(semanticTextTokens.display.xlarge.$value.fontSize),
          lineHeight: resolveToken(semanticTextTokens.display.xlarge.$value.lineHeight),
          fontWeight: 'Regular',
          letterSpacing: resolveToken(semanticTextTokens.display.xlarge.$value.letterSpacing),
          fontSizeToken: semanticTextTokens.display.xlarge.$value.fontSize,
          lineHeightToken: semanticTextTokens.display.xlarge.$value.lineHeight,
          fontWeightToken: semanticTextTokens.display.xlarge.$value.fontWeight,
          letterSpacingToken: semanticTextTokens.display.xlarge.$value.letterSpacing,
          fontFamilyToken: semanticTextTokens.display.xlarge.$value.fontFamily,
        },
        {
          name: 'Display Large',
          token: 'display.large',
          fontSize: resolveToken(semanticTextTokens.display.large.$value.fontSize),
          lineHeight: resolveToken(semanticTextTokens.display.large.$value.lineHeight),
          fontWeight: 'Regular',
          letterSpacing: resolveToken(semanticTextTokens.display.large.$value.letterSpacing),
          fontSizeToken: semanticTextTokens.display.large.$value.fontSize,
          lineHeightToken: semanticTextTokens.display.large.$value.lineHeight,
          fontWeightToken: semanticTextTokens.display.large.$value.fontWeight,
          letterSpacingToken: semanticTextTokens.display.large.$value.letterSpacing,
          fontFamilyToken: semanticTextTokens.display.large.$value.fontFamily,
        },
        {
          name: 'Display Medium',
          token: 'display.medium',
          fontSize: resolveToken(semanticTextTokens.display.medium.$value.fontSize),
          lineHeight: resolveToken(semanticTextTokens.display.medium.$value.lineHeight),
          fontWeight: 'Regular',
          letterSpacing: resolveToken(semanticTextTokens.display.medium.$value.letterSpacing),
          fontSizeToken: semanticTextTokens.display.medium.$value.fontSize,
          lineHeightToken: semanticTextTokens.display.medium.$value.lineHeight,
          fontWeightToken: semanticTextTokens.display.medium.$value.fontWeight,
          letterSpacingToken: semanticTextTokens.display.medium.$value.letterSpacing,
          fontFamilyToken: semanticTextTokens.display.medium.$value.fontFamily,
        },
        {
          name: 'Display Small',
          token: 'display.small',
          fontSize: resolveToken(semanticTextTokens.display.small.$value.fontSize),
          lineHeight: resolveToken(semanticTextTokens.display.small.$value.lineHeight),
          fontWeight: 'Regular',
          letterSpacing: resolveToken(semanticTextTokens.display.small.$value.letterSpacing),
          fontSizeToken: semanticTextTokens.display.small.$value.fontSize,
          lineHeightToken: semanticTextTokens.display.small.$value.lineHeight,
          fontWeightToken: semanticTextTokens.display.small.$value.fontWeight,
          letterSpacingToken: semanticTextTokens.display.small.$value.letterSpacing,
          fontFamilyToken: semanticTextTokens.display.small.$value.fontFamily,
        },
      ]
    },
    {
      category: 'Heading',
      specs: [
        {
          name: 'Heading XXLarge Bold',
          token: 'heading.xxlarge.bold',
          fontSize: resolveToken(semanticTextTokens.heading.xxlarge.bold.$value.fontSize),
          lineHeight: resolveToken(semanticTextTokens.heading.xxlarge.bold.$value.lineHeight),
          fontWeight: 'Bold',
          letterSpacing: resolveToken(semanticTextTokens.heading.xxlarge.bold.$value.letterSpacing),
          fontSizeToken: semanticTextTokens.heading.xxlarge.bold.$value.fontSize,
          lineHeightToken: semanticTextTokens.heading.xxlarge.bold.$value.lineHeight,
          fontWeightToken: semanticTextTokens.heading.xxlarge.bold.$value.fontWeight,
          letterSpacingToken: semanticTextTokens.heading.xxlarge.bold.$value.letterSpacing,
          fontFamilyToken: semanticTextTokens.heading.xxlarge.bold.$value.fontFamily,
        },
        {
          name: 'Heading XLarge Bold',
          token: 'heading.xlarge.bold',
          fontSize: resolveToken(semanticTextTokens.heading.xlarge.bold.$value.fontSize),
          lineHeight: resolveToken(semanticTextTokens.heading.xlarge.bold.$value.lineHeight),
          fontWeight: 'Bold',
          letterSpacing: resolveToken(semanticTextTokens.heading.xlarge.bold.$value.letterSpacing),
          fontSizeToken: semanticTextTokens.heading.xlarge.bold.$value.fontSize,
          lineHeightToken: semanticTextTokens.heading.xlarge.bold.$value.lineHeight,
          fontWeightToken: semanticTextTokens.heading.xlarge.bold.$value.fontWeight,
          letterSpacingToken: semanticTextTokens.heading.xlarge.bold.$value.letterSpacing,
          fontFamilyToken: semanticTextTokens.heading.xlarge.bold.$value.fontFamily,
        },
        {
          name: 'Heading Large Bold',
          token: 'heading.large.bold',
          fontSize: resolveToken(semanticTextTokens.heading.large.bold.$value.fontSize),
          lineHeight: resolveToken(semanticTextTokens.heading.large.bold.$value.lineHeight),
          fontWeight: 'Bold',
          letterSpacing: resolveToken(semanticTextTokens.heading.large.bold.$value.letterSpacing),
          fontSizeToken: semanticTextTokens.heading.large.bold.$value.fontSize,
          lineHeightToken: semanticTextTokens.heading.large.bold.$value.lineHeight,
          fontWeightToken: semanticTextTokens.heading.large.bold.$value.fontWeight,
          letterSpacingToken: semanticTextTokens.heading.large.bold.$value.letterSpacing,
          fontFamilyToken: semanticTextTokens.heading.large.bold.$value.fontFamily,
        },
        {
          name: 'Heading Medium Bold',
          token: 'heading.medium.bold',
          fontSize: resolveToken(semanticTextTokens.heading.medium.bold.$value.fontSize),
          lineHeight: resolveToken(semanticTextTokens.heading.medium.bold.$value.lineHeight),
          fontWeight: 'Bold',
          letterSpacing: resolveToken(semanticTextTokens.heading.medium.bold.$value.letterSpacing),
          fontSizeToken: semanticTextTokens.heading.medium.bold.$value.fontSize,
          lineHeightToken: semanticTextTokens.heading.medium.bold.$value.lineHeight,
          fontWeightToken: semanticTextTokens.heading.medium.bold.$value.fontWeight,
          letterSpacingToken: semanticTextTokens.heading.medium.bold.$value.letterSpacing,
          fontFamilyToken: semanticTextTokens.heading.medium.bold.$value.fontFamily,
        },
        {
          name: 'Heading Small Bold',
          token: 'heading.small.bold',
          fontSize: resolveToken(semanticTextTokens.heading.small.bold.$value.fontSize),
          lineHeight: resolveToken(semanticTextTokens.heading.small.bold.$value.lineHeight),
          fontWeight: 'Semibold',
          letterSpacing: resolveToken(semanticTextTokens.heading.small.bold.$value.letterSpacing),
          fontSizeToken: semanticTextTokens.heading.small.bold.$value.fontSize,
          lineHeightToken: semanticTextTokens.heading.small.bold.$value.lineHeight,
          fontWeightToken: semanticTextTokens.heading.small.bold.$value.fontWeight,
          letterSpacingToken: semanticTextTokens.heading.small.bold.$value.letterSpacing,
          fontFamilyToken: semanticTextTokens.heading.small.bold.$value.fontFamily,
        },
      ]
    },
    {
      category: 'Body',
      specs: [
        {
          name: 'Body Large Regular',
          token: 'body.large.regular',
          fontSize: resolveToken(semanticTextTokens.body.large.regular.$value.fontSize),
          lineHeight: resolveToken(semanticTextTokens.body.large.regular.$value.lineHeight),
          fontWeight: 'Regular',
          letterSpacing: resolveToken(semanticTextTokens.body.large.regular.$value.letterSpacing),
          fontSizeToken: semanticTextTokens.body.large.regular.$value.fontSize,
          lineHeightToken: semanticTextTokens.body.large.regular.$value.lineHeight,
          fontWeightToken: semanticTextTokens.body.large.regular.$value.fontWeight,
          letterSpacingToken: semanticTextTokens.body.large.regular.$value.letterSpacing,
          fontFamilyToken: semanticTextTokens.body.large.regular.$value.fontFamily,
        },
        {
          name: 'Body Large Bold',
          token: 'body.large.bold',
          fontSize: resolveToken(semanticTextTokens.body.large.bold.$value.fontSize),
          lineHeight: resolveToken(semanticTextTokens.body.large.bold.$value.lineHeight),
          fontWeight: 'Semibold',
          letterSpacing: resolveToken(semanticTextTokens.body.large.bold.$value.letterSpacing),
          fontSizeToken: semanticTextTokens.body.large.bold.$value.fontSize,
          lineHeightToken: semanticTextTokens.body.large.bold.$value.lineHeight,
          fontWeightToken: semanticTextTokens.body.large.bold.$value.fontWeight,
          letterSpacingToken: semanticTextTokens.body.large.bold.$value.letterSpacing,
          fontFamilyToken: semanticTextTokens.body.large.bold.$value.fontFamily,
        },
        {
          name: 'Body Medium Regular',
          token: 'body.medium.regular',
          fontSize: resolveToken(semanticTextTokens.body.medium.regular.$value.fontSize),
          lineHeight: resolveToken(semanticTextTokens.body.medium.regular.$value.lineHeight),
          fontWeight: 'Regular',
          letterSpacing: resolveToken(semanticTextTokens.body.medium.regular.$value.letterSpacing),
          fontSizeToken: semanticTextTokens.body.medium.regular.$value.fontSize,
          lineHeightToken: semanticTextTokens.body.medium.regular.$value.lineHeight,
          fontWeightToken: semanticTextTokens.body.medium.regular.$value.fontWeight,
          letterSpacingToken: semanticTextTokens.body.medium.regular.$value.letterSpacing,
          fontFamilyToken: semanticTextTokens.body.medium.regular.$value.fontFamily,
        },
        {
          name: 'Body Medium Bold',
          token: 'body.medium.bold',
          fontSize: resolveToken(semanticTextTokens.body.medium.bold.$value.fontSize),
          lineHeight: resolveToken(semanticTextTokens.body.medium.bold.$value.lineHeight),
          fontWeight: 'Semibold',
          letterSpacing: resolveToken(semanticTextTokens.body.medium.bold.$value.letterSpacing),
          fontSizeToken: semanticTextTokens.body.medium.bold.$value.fontSize,
          lineHeightToken: semanticTextTokens.body.medium.bold.$value.lineHeight,
          fontWeightToken: semanticTextTokens.body.medium.bold.$value.fontWeight,
          letterSpacingToken: semanticTextTokens.body.medium.bold.$value.letterSpacing,
          fontFamilyToken: semanticTextTokens.body.medium.bold.$value.fontFamily,
        },
        {
          name: 'Body Small Regular',
          token: 'body.small.regular',
          fontSize: resolveToken(semanticTextTokens.body.small.regular.$value.fontSize),
          lineHeight: resolveToken(semanticTextTokens.body.small.regular.$value.lineHeight),
          fontWeight: 'Regular',
          letterSpacing: resolveToken(semanticTextTokens.body.small.regular.$value.letterSpacing),
          fontSizeToken: semanticTextTokens.body.small.regular.$value.fontSize,
          lineHeightToken: semanticTextTokens.body.small.regular.$value.lineHeight,
          fontWeightToken: semanticTextTokens.body.small.regular.$value.fontWeight,
          letterSpacingToken: semanticTextTokens.body.small.regular.$value.letterSpacing,
          fontFamilyToken: semanticTextTokens.body.small.regular.$value.fontFamily,
        },
        {
          name: 'Body Small Bold',
          token: 'body.small.bold',
          fontSize: resolveToken(semanticTextTokens.body.small.bold.$value.fontSize),
          lineHeight: resolveToken(semanticTextTokens.body.small.bold.$value.lineHeight),
          fontWeight: 'Semibold',
          letterSpacing: resolveToken(semanticTextTokens.body.small.bold.$value.letterSpacing),
          fontSizeToken: semanticTextTokens.body.small.bold.$value.fontSize,
          lineHeightToken: semanticTextTokens.body.small.bold.$value.lineHeight,
          fontWeightToken: semanticTextTokens.body.small.bold.$value.fontWeight,
          letterSpacingToken: semanticTextTokens.body.small.bold.$value.letterSpacing,
          fontFamilyToken: semanticTextTokens.body.small.bold.$value.fontFamily,
        },
      ]
    },
    {
      category: 'Interface',
      specs: [
        {
          name: 'Caption Regular',
          token: 'interface.caption.regular',
          fontSize: resolveToken(semanticTextTokens.interface.caption.regular.$value.fontSize),
          lineHeight: resolveToken(semanticTextTokens.interface.caption.regular.$value.lineHeight),
          fontWeight: 'Regular',
          letterSpacing: resolveToken(semanticTextTokens.interface.caption.regular.$value.letterSpacing),
          fontSizeToken: semanticTextTokens.interface.caption.regular.$value.fontSize,
          lineHeightToken: semanticTextTokens.interface.caption.regular.$value.lineHeight,
          fontWeightToken: semanticTextTokens.interface.caption.regular.$value.fontWeight,
          letterSpacingToken: semanticTextTokens.interface.caption.regular.$value.letterSpacing,
          fontFamilyToken: semanticTextTokens.interface.caption.regular.$value.fontFamily,
        },
        {
          name: 'Caption Bold',
          token: 'interface.caption.bold',
          fontSize: resolveToken(semanticTextTokens.interface.caption.bold.$value.fontSize),
          lineHeight: resolveToken(semanticTextTokens.interface.caption.bold.$value.lineHeight),
          fontWeight: 'Semibold',
          letterSpacing: resolveToken(semanticTextTokens.interface.caption.bold.$value.letterSpacing),
          fontSizeToken: semanticTextTokens.interface.caption.bold.$value.fontSize,
          lineHeightToken: semanticTextTokens.interface.caption.bold.$value.lineHeight,
          fontWeightToken: semanticTextTokens.interface.caption.bold.$value.fontWeight,
          letterSpacingToken: semanticTextTokens.interface.caption.bold.$value.letterSpacing,
          fontFamilyToken: semanticTextTokens.interface.caption.bold.$value.fontFamily,
        },
        {
          name: 'Label Large',
          token: 'interface.label.large',
          fontSize: resolveToken(semanticTextTokens.interface.label.large.$value.fontSize),
          lineHeight: resolveToken(semanticTextTokens.interface.label.large.$value.lineHeight),
          fontWeight: 'Medium',
          letterSpacing: resolveToken(semanticTextTokens.interface.label.large.$value.letterSpacing),
          fontSizeToken: semanticTextTokens.interface.label.large.$value.fontSize,
          lineHeightToken: semanticTextTokens.interface.label.large.$value.lineHeight,
          fontWeightToken: semanticTextTokens.interface.label.large.$value.fontWeight,
          letterSpacingToken: semanticTextTokens.interface.label.large.$value.letterSpacing,
          fontFamilyToken: semanticTextTokens.interface.label.large.$value.fontFamily,
        },
        {
          name: 'Label Small',
          token: 'interface.label.small',
          fontSize: resolveToken(semanticTextTokens.interface.label.small.$value.fontSize),
          lineHeight: resolveToken(semanticTextTokens.interface.label.small.$value.lineHeight),
          fontWeight: 'Semibold',
          letterSpacing: resolveToken(semanticTextTokens.interface.label.small.$value.letterSpacing),
          fontSizeToken: semanticTextTokens.interface.label.small.$value.fontSize,
          lineHeightToken: semanticTextTokens.interface.label.small.$value.lineHeight,
          fontWeightToken: semanticTextTokens.interface.label.small.$value.fontWeight,
          letterSpacingToken: semanticTextTokens.interface.label.small.$value.letterSpacing,
          fontFamilyToken: semanticTextTokens.interface.label.small.$value.fontFamily,
        },
        {
          name: 'Footnote Regular',
          token: 'interface.footnote.regular',
          fontSize: resolveToken(semanticTextTokens.interface.footnote.regular.$value.fontSize),
          lineHeight: resolveToken(semanticTextTokens.interface.footnote.regular.$value.lineHeight),
          fontWeight: 'Regular',
          letterSpacing: resolveToken(semanticTextTokens.interface.footnote.regular.$value.letterSpacing),
          fontSizeToken: semanticTextTokens.interface.footnote.regular.$value.fontSize,
          lineHeightToken: semanticTextTokens.interface.footnote.regular.$value.lineHeight,
          fontWeightToken: semanticTextTokens.interface.footnote.regular.$value.fontWeight,
          letterSpacingToken: semanticTextTokens.interface.footnote.regular.$value.letterSpacing,
          fontFamilyToken: semanticTextTokens.interface.footnote.regular.$value.fontFamily,
        },
      ]
    },
  ];

  const resources = [
    {
      title: 'Typography guidelines',
      description: 'Learn how to use typography effectively in your designs.',
      iconKey: 'objectBook/Line',
      iconBgColor: 'bg-purple-100',
      iconColor: '#6b21a8',
    },
    {
      title: 'Accessibility standards',
      description: 'Ensure your typography meets WCAG requirements.',
      iconKey: 'actionInfo/Line',
      iconBgColor: 'bg-yellow-100',
      iconColor: '#854d0e',
    },
    {
      title: 'Design tokens',
      description: 'View all available typography tokens and variables.',
      iconKey: 'objectGear/Line',
      iconBgColor: 'bg-blue-100',
      iconColor: '#1e40af',
    },
    {
      title: 'Platform specifics',
      description: 'Platform-specific font guidance for iOS, Android, and Web.',
      iconKey: 'objectMobilePhone/Line',
      iconBgColor: 'bg-green-100',
      iconColor: '#166534',
    },
  ];

  return (
    <div>
      <div className="mb-10">
        <FoundationHero type="typography" />
      </div>
      <div className="mb-12">
        <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
          Foundations
        </div>
        <h1 className="text-5xl font-bold text-gray-900 mb-6" style={{ fontFamily: brandFont }}>Typography</h1>
        <p className="text-base text-gray-600 leading-relaxed">
          Our typography system uses semantic tokens to define text styles across the application. These tokens ensure consistency and make it easy to maintain and update typography throughout your designs.
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="mb-12 border-b border-gray-200">
        <div className="flex gap-8">
          <button
            onClick={() => setActiveTab('styles')}
            className={`pb-3 text-base font-medium transition-colors relative ${
              activeTab === 'styles'
                ? 'text-gray-900'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Styles
            {activeTab === 'styles' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900"></div>
            )}
          </button>
          <button
            onClick={() => setActiveTab('specs')}
            className={`pb-3 text-base font-medium transition-colors relative ${
              activeTab === 'specs'
                ? 'text-gray-900'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Specs
            {activeTab === 'specs' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900"></div>
            )}
          </button>
          <button
            onClick={() => setActiveTab('usage')}
            className={`pb-3 text-base font-medium transition-colors relative ${
              activeTab === 'usage'
                ? 'text-gray-900'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Usage
            {activeTab === 'usage' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900"></div>
            )}
          </button>
        </div>
      </div>

      {/* Styles Tab */}
      {activeTab === 'styles' && typeCategories.map((category) => {
        const fontWeightMap: Record<string, number> = {
          'Regular': 400,
          'Medium': 500,
          'Semibold': 600,
          'Bold': 700,
        };

        return (
          <div key={category.category} className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 text-gray-900">{category.category}</h2>
            <div className="bg-white border border-gray-200 rounded-3xl p-8">
              <div className="space-y-8">
                {category.specs.map((spec) => {
                  // Apply brand font to Display and Heading (up to Large only)
                  const useBrandFont =
                    category.category === 'Display' ||
                    (category.category === 'Heading' &&
                      (spec.name.includes('XXLarge') || spec.name.includes('XLarge') || spec.name.includes('Large')));

                  return (
                    <div key={spec.token}>
                      <div className="text-xs text-gray-500 mb-2">
                        {spec.name} • {spec.fontSize} • {spec.fontWeight}
                      </div>
                      <div
                        style={{
                          fontSize: spec.fontSize,
                          lineHeight: spec.lineHeight,
                          fontWeight: fontWeightMap[spec.fontWeight] || 400,
                          letterSpacing: spec.letterSpacing,
                          fontFamily: useBrandFont ? brandFont : undefined,
                        }}
                        className="text-gray-900"
                      >
                        Pack my box with five dozen quality UI tweaks
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}

      {/* Specs Tab */}
      {activeTab === 'specs' && typeCategories.map((category) => (
        <div key={category.category} className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-gray-900">{category.category}</h2>
          <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">Name</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">Token</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">Font Family</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">Font Size</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">Line Height</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">Font Weight</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">Letter Spacing</th>
                  </tr>
                </thead>
                <tbody>
                  {category.specs.map((spec, idx) => (
                    <tr key={spec.token} className={idx !== category.specs.length - 1 ? 'border-b border-gray-100' : ''}>
                      <td className="py-4 px-6 text-sm text-gray-900">{spec.name}</td>
                      <td className="py-4 px-6 text-xs font-mono text-gray-600">{toCssTypoVar(spec.token)}</td>
                      <td className="py-4 px-6">
                        <div className="space-y-1">
                          <div className="text-sm text-gray-900">{resolveFontFamily(spec.fontFamilyToken)}</div>
                          <span className="inline-block px-3 py-1 rounded-full text-xs font-mono text-gray-600">
                            {toCssTypoVar(spec.fontFamilyToken)}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="inline-block px-3 py-1 rounded-full text-xs font-mono text-gray-600">
                          {toCssTypoVar(spec.fontSizeToken)}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="inline-block px-3 py-1 rounded-full text-xs font-mono text-gray-600">
                          {toCssTypoVar(spec.lineHeightToken)}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="inline-block px-3 py-1 rounded-full text-xs font-mono text-gray-600">
                          {toCssTypoVar(spec.fontWeightToken)}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="inline-block px-3 py-1 rounded-full text-xs font-mono text-gray-600">
                          {toCssTypoVar(spec.letterSpacingToken)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ))}

      {/* Usage Tab */}
      {activeTab === 'usage' && (
        <div>
          {/* Adaptive typography */}
          <div className="mb-10 bg-blue-50 border border-blue-100 rounded-2xl px-6 py-4 flex items-start gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
            <p className="text-sm text-blue-700 leading-relaxed">
              <span className="font-semibold">Adaptive typography — </span>
              CDS tokens define the base scale. At runtime, platform accessibility features (Dynamic Type on iOS, font scaling on Android) apply on top. Designs should account for how layouts behave as type scales with accessibility settings enabled.
            </p>
          </div>

          {/* Typeface sources */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-2 text-gray-900">Typeface sources</h2>
            <p className="text-sm text-gray-500 mb-6">Two typeface sources are used across the system. Which one applies depends on the category.</p>
            <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden">
              <div className="grid grid-cols-[120px_1fr_1fr] border-b border-gray-100 px-6 py-3 bg-gray-50">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Source</div>
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Typeface</div>
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Applied to</div>
              </div>
              <div className="grid grid-cols-[120px_1fr_1fr] px-6 py-4 border-b border-gray-100">
                <div className="text-sm font-medium text-gray-700">Brand</div>
                <div className="text-sm text-gray-900" style={{ fontFamily: brandFont }}>{brandFont}</div>
                <div className="text-sm text-gray-600">Display, Heading xxlarge, Heading xlarge</div>
              </div>
              <div className="grid grid-cols-[120px_1fr_1fr] px-6 py-4">
                <div className="text-sm font-medium text-gray-700">Platform</div>
                <div className="text-sm text-gray-600">SF Pro (iOS) / Roboto (Android)</div>
                <div className="text-sm text-gray-600">Heading large, medium, small · Body · Label · Caption</div>
              </div>
            </div>
          </div>

          {/* ── Display ── */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-2 text-gray-900">Display</h2>
            <p className="text-sm text-gray-500 mb-6 leading-relaxed">
              For editorial, hero, and brand moments where typography is the primary expressive element. Uses the brand typeface at maximum visual scale. Not for structural content organization — exists for impact at the top of a screen or section.
            </p>
            <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden mb-4">
              <div className="grid grid-cols-[300px_1fr_200px] border-b border-gray-100 px-6 py-3 bg-gray-50">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Token</div>
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Usage rule</div>
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">UI example</div>
              </div>
              {([
                { token: 'display.xlarge',  rule: 'The largest expressive text in the system. Use for hero moments where typography dominates the composition. Also used on device control screens to communicate status at a glance. Use sparingly — one instance per screen maximum.', example: 'Onboarding hero headline, device control screen status' },
                { token: 'display.large',   rule: 'Large brand-expressive text. Use for high-impact headlines where the brand typeface leads.', example: 'Feature announcement headline, section hero text' },
                { token: 'display.medium',  rule: 'Mid-scale display text. Use where brand expression is needed without the full weight of large or xlarge.', example: 'Promotional card headline, settings section header with brand emphasis' },
                { token: 'display.small',   rule: 'The smallest display size. Use where brand typography is appropriate but space is constrained.', example: 'In-line promotional label, compact hero text' },
              ] as { token: string; rule: string; example: string }[]).map((row, i, arr) => (
                <div key={row.token} className={`grid grid-cols-[300px_1fr_200px] px-6 py-4 items-start hover:bg-gray-50 transition-colors ${i < arr.length - 1 ? 'border-b border-gray-100' : ''}`}>
                  <span className="inline-block px-2.5 py-1 rounded-full text-xs font-mono text-gray-600 self-start justify-self-start">{toCssTypoVar(row.token)}</span>
                  <p className="text-sm text-gray-600 leading-relaxed pr-6">{row.rule}</p>
                  <p className="text-sm text-gray-400 leading-relaxed">{row.example}</p>
                </div>
              ))}
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-2xl px-5 py-3 flex items-start gap-2">
              <div className="w-1 h-1 rounded-full bg-gray-400 mt-2 flex-shrink-0" />
              <p className="text-sm text-gray-500 leading-relaxed">Display tokens do not have weight variants — all display tokens use the regular weight of the brand typeface. Weight variation at display scale is not supported in CDS.</p>
            </div>
          </div>

          {/* ── Heading ── */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-2 text-gray-900">Heading</h2>
            <p className="text-sm text-gray-500 mb-6 leading-relaxed">
              For structural hierarchy and content organization across screens and components. <span className="text-gray-700 font-medium">Typeface split:</span> Heading xxlarge and xlarge use the brand typeface. Heading large, medium, and small use the platform system font — brand expression is limited to the top two heading sizes where space allows it, while the platform font handles structural UI hierarchy at smaller sizes.
            </p>
            <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden mb-4">
              <div className="grid grid-cols-[300px_1fr_200px] border-b border-gray-100 px-6 py-3 bg-gray-50">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Token</div>
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Usage rule</div>
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">UI example</div>
              </div>
              {([
                { token: 'heading.xxlarge.light',   rule: 'The largest structural heading. Light weight. Use for top-level screen titles where the brand typeface leads at maximum heading scale.', example: 'Promotional screen title, feature introduction heading' },
                { token: 'heading.xxlarge.regular', rule: 'The largest structural heading. Regular weight. Use where xxlarge scale is needed with standard weight.', example: 'Top-level content screen heading' },
                { token: 'heading.xxlarge.bold',    rule: 'The largest structural heading. Bold weight. Use where xxlarge scale needs strong emphasis.', example: 'High-impact screen title, bold feature heading' },
                { token: 'heading.xlarge.light',    rule: 'Large structural heading. Light weight. Brand typeface. Use for primary screen titles and major section headers.', example: 'Screen title, primary section header' },
                { token: 'heading.xlarge.regular',  rule: 'Large structural heading. Regular weight. Brand typeface. The standard choice for primary screen titles.', example: 'Screen title, primary section header' },
                { token: 'heading.xlarge.bold',     rule: 'Large structural heading. Bold weight. Brand typeface. Use where a primary heading needs stronger visual presence.', example: 'Emphasized screen title, bold section header' },
                { token: 'heading.large.light',     rule: 'Mid-scale structural heading. Light weight. Platform font. Use for secondary screen titles and subsection headers.', example: 'Secondary screen title, subsection header' },
                { token: 'heading.large.regular',   rule: 'Mid-scale structural heading. Regular weight. Platform font.', example: 'Secondary screen title, subsection header' },
                { token: 'heading.large.bold',      rule: 'Mid-scale structural heading. Bold weight. Platform font. Use for emphasized secondary headings.', example: 'Emphasized subsection header' },
                { token: 'heading.medium.light',    rule: 'Compact structural heading. Light weight. Platform font. Use for tertiary headings and grouped content labels.', example: 'Grouped list header, settings section title' },
                { token: 'heading.medium.regular',  rule: 'Compact structural heading. Regular weight. Platform font.', example: 'Grouped list header, settings section title' },
                { token: 'heading.medium.bold',     rule: 'Compact structural heading. Bold weight. Platform font. Use for emphasized compact headings.', example: 'Prominent grouped list header, bold settings section title' },
                { token: 'heading.small.bold',      rule: 'The smallest structural heading. Bold weight only. Platform font. Use for the lowest level of heading hierarchy — tight spaces where a label needs heading-level prominence.', example: 'Form section label' },
              ] as { token: string; rule: string; example: string }[]).map((row, i, arr) => (
                <div key={row.token} className={`grid grid-cols-[300px_1fr_200px] px-6 py-4 items-start hover:bg-gray-50 transition-colors ${i < arr.length - 1 ? 'border-b border-gray-100' : ''}`}>
                  <span className="inline-block px-2.5 py-1 rounded-full text-xs font-mono text-gray-600 self-start justify-self-start">{toCssTypoVar(row.token)}</span>
                  <p className="text-sm text-gray-600 leading-relaxed pr-6">{row.rule}</p>
                  <p className="text-sm text-gray-400 leading-relaxed">{row.example}</p>
                </div>
              ))}
            </div>
            <div className="space-y-2">
              <div className="bg-gray-50 border border-gray-200 rounded-2xl px-5 py-3 flex items-start gap-2">
                <div className="w-1 h-1 rounded-full bg-gray-400 mt-2 flex-shrink-0" />
                <p className="text-sm text-gray-500 leading-relaxed">
                  <code className="font-mono text-xs bg-white border border-gray-200 rounded px-1.5 py-0.5 text-gray-600">--heading-small</code> only has a bold variant — light and regular are not defined at this size. If a non-bold small heading is needed, use <code className="font-mono text-xs bg-white border border-gray-200 rounded px-1.5 py-0.5 text-gray-600">--body-*</code> or <code className="font-mono text-xs bg-white border border-gray-200 rounded px-1.5 py-0.5 text-gray-600">--interface-label-*</code> instead.
                </p>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-2xl px-5 py-3 flex items-start gap-2">
                <div className="w-1 h-1 rounded-full bg-gray-400 mt-2 flex-shrink-0" />
                <p className="text-sm text-gray-500 leading-relaxed">Card headings are defined with component semantic text tokens, not through heading tokens.</p>
              </div>
            </div>
          </div>

          {/* ── Body ── */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-2 text-gray-900">Body</h2>
            <p className="text-sm text-gray-500 mb-6 leading-relaxed">
              For primary reading styles — descriptions, main content, and supporting text where readability and reading rhythm matter. Body tokens use the platform system font and include paragraph spacing as part of the token definition. <span className="font-medium text-gray-700"><code className="font-mono text-xs bg-gray-100 border border-gray-200 rounded px-1 py-0.5">--body-large-regular</code> is the primary body style throughout SmartHome+.</span>
            </p>
            <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden mb-4">
              <div className="grid grid-cols-[300px_1fr_220px] border-b border-gray-100 px-6 py-3 bg-gray-50">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Token</div>
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Usage rule</div>
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">UI example</div>
              </div>
              {([
                { token: 'body.large.regular',  rule: 'The primary body text style throughout the app. Use for the majority of UI copy, content descriptions, and supporting text.', example: 'Settings descriptions, feature explanations, list row supporting text, onboarding copy', primary: true },
                { token: 'body.large.bold',     rule: 'Primary body text. Bold weight. Use to emphasize specific words or phrases within large body copy.', example: 'Inline emphasis within descriptions, bold promotional text', primary: false },
                { token: 'body.medium.regular', rule: 'Medium body text. Use when visual hierarchy requires a smaller visual size — supporting text that sits below a primary label or description.', example: 'Secondary descriptions, supporting content beneath a primary body style', primary: false },
                { token: 'body.medium.bold',    rule: 'Medium body text. Bold weight. Use to emphasize within medium body copy.', example: 'Inline emphasis within secondary descriptions', primary: false },
                { token: 'body.small.regular',  rule: 'Small body text. Use when visual hierarchy requires the smallest reading size — tertiary supporting copy.', example: 'Fine supporting text beneath medium body, compact content areas', primary: false },
                { token: 'body.small.bold',     rule: 'Small body text. Bold weight. Use to emphasize within small body copy.', example: 'Inline emphasis within small body copy', primary: false },
              ] as { token: string; rule: string; example: string; primary: boolean }[]).map((row, i, arr) => (
                <div key={row.token} className={`grid grid-cols-[300px_1fr_220px] px-6 py-4 items-start transition-colors ${i < arr.length - 1 ? 'border-b border-gray-100' : ''} ${row.primary ? 'bg-gray-50/60' : 'hover:bg-gray-50'}`}>
                  <div className="flex flex-col gap-1.5 self-start justify-self-start">
                    <span className="inline-block px-2.5 py-1 rounded-full text-xs font-mono text-gray-600 w-fit">{toCssTypoVar(row.token)}</span>
                    {row.primary && <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-green-100 text-green-700 w-fit">Primary style</span>}
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed pr-6">{row.rule}</p>
                  <p className="text-sm text-gray-400 leading-relaxed">{row.example}</p>
                </div>
              ))}
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-2xl px-5 py-3 flex items-start gap-2">
              <div className="w-1 h-1 rounded-full bg-gray-400 mt-2 flex-shrink-0" />
              <p className="text-sm text-gray-500 leading-relaxed">
                Body tokens are the only category that includes paragraph spacing. All body sizes carry <code className="font-mono text-xs bg-white border border-gray-200 rounded px-1.5 py-0.5 text-gray-600">paragraphSpacing</code> at the default value — this applies automatically and should not be overridden manually.
              </p>
            </div>
          </div>

          {/* ── Interface ── */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-2 text-gray-900">Interface</h2>
            <p className="text-sm text-gray-500 mb-8 leading-relaxed">
              For functional UI elements that appear consistently across screens — labels, captions, and footnotes. Token paths are nested under <code className="font-mono text-xs bg-gray-100 border border-gray-200 rounded px-1.5 py-0.5 text-gray-600">--interface-*</code>. These tokens use the platform system font and prioritize clear legibility with minimal visual prominence.
            </p>

            {/* Label */}
            <h3 className="text-base font-semibold text-gray-700 mb-2">Label</h3>
            <p className="text-sm text-gray-500 mb-4 leading-relaxed">For interactive and structural UI text elements. Label tokens do not have weight variants — large and small represent distinct size and style treatments.</p>
            <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden mb-8">
              <div className="grid grid-cols-[300px_1fr_220px] border-b border-gray-100 px-6 py-3 bg-gray-50">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Token</div>
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Usage rule</div>
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">UI example</div>
              </div>
              {([
                { token: 'interface.label.large', rule: 'The standard label size for prominent UI text elements. Use for primary interactive labels and navigation elements.', example: 'Tab bar label, primary navigation label, button label' },
                { token: 'interface.label.small', rule: 'The compact label size. Use for de-emphasized or supporting UI labels where a smaller visual size is needed.', example: 'Secondary navigation label, metadata label, supporting UI text' },
              ] as { token: string; rule: string; example: string }[]).map((row, i, arr) => (
                <div key={row.token} className={`grid grid-cols-[300px_1fr_220px] px-6 py-4 items-start hover:bg-gray-50 transition-colors ${i < arr.length - 1 ? 'border-b border-gray-100' : ''}`}>
                  <span className="inline-block px-2.5 py-1 rounded-full text-xs font-mono text-gray-600 self-start justify-self-start">{toCssTypoVar(row.token)}</span>
                  <p className="text-sm text-gray-600 leading-relaxed pr-6">{row.rule}</p>
                  <p className="text-sm text-gray-400 leading-relaxed">{row.example}</p>
                </div>
              ))}
            </div>

            {/* Caption */}
            <h3 className="text-base font-semibold text-gray-700 mb-2">Caption</h3>
            <p className="text-sm text-gray-500 mb-4 leading-relaxed">For small supporting text that accompanies UI elements. Uses the platform system font at the smallest readable size.</p>
            <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden mb-8">
              <div className="grid grid-cols-[300px_1fr_220px] border-b border-gray-100 px-6 py-3 bg-gray-50">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Token</div>
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Usage rule</div>
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">UI example</div>
              </div>
              {([
                { token: 'interface.caption.regular', rule: 'Standard caption text. Use for annotations and supporting copy that accompanies data fields and data visualizations.', example: 'Supporting data field label, data visualization annotation' },
                { token: 'interface.caption.bold',    rule: 'Bold caption text. Use where a caption needs stronger visual presence.', example: 'Emphasized data field label, bold data visualization annotation' },
              ] as { token: string; rule: string; example: string }[]).map((row, i, arr) => (
                <div key={row.token} className={`grid grid-cols-[300px_1fr_220px] px-6 py-4 items-start hover:bg-gray-50 transition-colors ${i < arr.length - 1 ? 'border-b border-gray-100' : ''}`}>
                  <span className="inline-block px-2.5 py-1 rounded-full text-xs font-mono text-gray-600 self-start justify-self-start">{toCssTypoVar(row.token)}</span>
                  <p className="text-sm text-gray-600 leading-relaxed pr-6">{row.rule}</p>
                  <p className="text-sm text-gray-400 leading-relaxed">{row.example}</p>
                </div>
              ))}
            </div>

            {/* Footnote */}
            <h3 className="text-base font-semibold text-gray-700 mb-4">Footnote</h3>
            <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden mb-4">
              <div className="grid grid-cols-[300px_1fr_220px] border-b border-gray-100 px-6 py-3 bg-gray-50">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Token</div>
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Usage rule</div>
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">UI example</div>
              </div>
              <div className="grid grid-cols-[300px_1fr_220px] px-6 py-4 items-start hover:bg-gray-50 transition-colors">
                <span className="inline-block px-2.5 py-1 rounded-full text-xs font-mono text-gray-600 self-start justify-self-start">--interface-footnote-regular</span>
                <p className="text-sm text-gray-600 leading-relaxed pr-6">Footnote text. Use strictly for footnotes and legal-style supporting copy.</p>
                <p className="text-sm text-gray-400 leading-relaxed">Terms and conditions footnote, legal disclaimer, pricing footnote</p>
              </div>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-2xl px-5 py-3 flex items-start gap-2">
              <div className="w-1 h-1 rounded-full bg-amber-400 mt-2 flex-shrink-0" />
              <p className="text-sm text-amber-800 leading-relaxed">
                <code className="font-mono text-xs bg-white border border-amber-200 rounded px-1.5 py-0.5 text-amber-700">--interface-footnote-regular</code> is for footnotes and legal-style text only. Do not use in place of <code className="font-mono text-xs bg-white border border-amber-200 rounded px-1.5 py-0.5 text-amber-700">--body-*</code> or <code className="font-mono text-xs bg-white border border-amber-200 rounded px-1.5 py-0.5 text-amber-700">--interface-caption-*</code> for readable UI copy.
              </p>
            </div>
          </div>

          {/* ── Component ── */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-2 text-gray-900">Component</h2>
            <p className="text-sm text-gray-500 mb-8 leading-relaxed">
              Purpose-built typography definitions for specific UI components where a distinct typographic need doesn't map cleanly to a semantic interface or body token. Token paths are nested under <code className="font-mono text-xs bg-gray-100 border border-gray-200 rounded px-1.5 py-0.5 text-gray-600">--component-*</code>. All component tokens use the platform system font.
            </p>
            {([
              {
                heading: 'Card heading',
                description: 'Three distinct typographic treatments to support different card sizes and hierarchy levels.',
                rows: [
                  { token: 'component.card.heading.large',     rule: 'Standard card heading. Use for the primary title on a standard card.', example: 'Device tile title, feature card heading' },
                  { token: 'component.card.heading.largeBold', rule: 'Bold card heading. Use where a card heading needs stronger visual presence.', example: 'Emphasized device tile title, bold feature card heading' },
                  { token: 'component.card.heading.small',     rule: 'Compact card heading. Use for the primary title on a smaller or more compact card.', example: 'Compact device tile title, small card heading' },
                ],
              },
              {
                heading: 'Pill',
                description: 'Single token — no size or weight variants.',
                rows: [
                  { token: 'component.pill', rule: 'Typography for pill elements.', example: 'Filter pill, selection pill, status pill' },
                ],
              },
              {
                heading: 'Tag',
                description: '',
                rows: [
                  { token: 'component.tag.large', rule: 'Standard tag typography. Use for the label text on a standard tag.', example: 'Status tag, category tag' },
                  { token: 'component.tag.small', rule: 'Compact tag typography. Use for the label text on a smaller tag.', example: 'Compact status tag, small category tag' },
                ],
              },
              {
                heading: 'Button',
                description: '',
                rows: [
                  { token: 'component.button.large', rule: 'Typography for all button styles at the large size variant.', example: 'All button styles — large variant' },
                  { token: 'component.button.small', rule: 'Typography for all button styles at the small size variant.', example: 'All button styles — small variant' },
                ],
              },
            ] as { heading: string; description: string; rows: { token: string; rule: string; example: string }[] }[]).map((group) => (
              <div key={group.heading} className="mb-8">
                <h3 className="text-base font-semibold text-gray-700 mb-2">{group.heading}</h3>
                {group.description && <p className="text-sm text-gray-500 mb-4">{group.description}</p>}
                <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden">
                  <div className="grid grid-cols-[300px_1fr_220px] border-b border-gray-100 px-6 py-3 bg-gray-50">
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Token</div>
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Usage rule</div>
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">UI example</div>
                  </div>
                  {group.rows.map((row, i, arr) => (
                    <div key={row.token} className={`grid grid-cols-[300px_1fr_220px] px-6 py-4 items-start hover:bg-gray-50 transition-colors ${i < arr.length - 1 ? 'border-b border-gray-100' : ''}`}>
                      <span className="inline-block px-2.5 py-1 rounded-full text-xs font-mono text-gray-600 self-start justify-self-start">{toCssTypoVar(row.token)}</span>
                      <p className="text-sm text-gray-600 leading-relaxed pr-6">{row.rule}</p>
                      <p className="text-sm text-gray-400 leading-relaxed">{row.example}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <ResourceCards resources={resources} />
    </div>
  );
}