import { Layers, Link2, Box, Wrench, BookOpen, Code } from 'lucide-react';
import { ResourceCards } from './ResourceCards';
import { useTheme } from '../contexts/ThemeContext';
import { TokensHero } from './TokensHero';

export function DesignTokensPage() {
  const { brand, brandName, brandFont } = useTheme();
  const resources = [
    {
      title: 'Token reference',
      description: 'Browse the complete token library and specifications.',
      iconKey: 'objectBook/Line',
      iconBgColor: 'bg-blue-100',
      iconColor: '#1e40af',
    },
    {
      title: 'Implementation guide',
      description: 'Learn how to implement tokens in your codebase.',
      iconKey: 'objectToolbox/Line',
      iconBgColor: 'bg-green-100',
      iconColor: '#166534',
    },
    {
      title: 'Platform specifics',
      description: 'Platform-specific token guidance for iOS, Android, and Web.',
      iconKey: 'objectMobilePhone/Line',
      iconBgColor: 'bg-purple-100',
      iconColor: '#6b21a8',
    },
    {
      title: 'Best practices',
      description: 'Guidelines for working with design tokens effectively.',
      iconKey: 'abstractSuccess/Line',
      iconBgColor: 'bg-orange-100',
      iconColor: '#9a3412',
    },
  ];

  return (
    <div>
      <div className="mb-10">
        <TokensHero />
      </div>
      <div className="mb-12">
        <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
          Overview
        </div>
        <h1 className="text-5xl font-bold text-gray-900 mb-6" style={{ fontFamily: brandFont }}>Design Tokens</h1>
        <p className="text-base text-gray-600 leading-relaxed">
          Design tokens are the foundational building blocks of our design system. They capture design decisions as reusable, platform-agnostic values that ensure consistency across all products and platforms.
        </p>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-semibold mb-6 text-gray-900">Token Hierarchy</h2>
        <p className="text-base text-gray-600 leading-relaxed mb-8">
          Our design tokens are organized into four layers, each serving a specific purpose in the design system. Higher layers reference lower layers, creating a flexible and maintainable system.
        </p>

        <div className="space-y-4">
          <div className="bg-white border border-gray-200 rounded-3xl p-6 hover:border-gray-300 transition-colors">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Box className="w-6 h-6 text-purple-700" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Layer 1: Primitives</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Raw values like hex codes, pixel dimensions, and font names. These are the foundation layer with no references to other tokens.
                </p>
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Examples</p>
                  <div className="space-y-1 text-sm font-mono text-gray-700">
                    <div>global.color.grey.700 → #57575b</div>
                    <div>brand.telus.color.purple.700 → #4b286d</div>
                    <div>space.small → 8px</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-3xl p-6 hover:border-gray-300 transition-colors">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Layers className="w-6 h-6 text-blue-700" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Layer 2: Theme (Alias)</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Primitives mapped to named roles per brand. This is where brand decisions are captured and applied consistently.
                </p>
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Examples</p>
                  <div className="space-y-1 text-sm font-mono text-gray-700">
                    <div>color.primary.pure → brand.telus.color.purple.700</div>
                    <div>color.neutral.light → brand.telus.color.grey.200</div>
                    <div>color.info.pure → global.color.blue.500</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-3xl p-6 hover:border-gray-300 transition-colors">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Link2 className="w-6 h-6 text-green-700" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Layer 3: Semantic (Alias)</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Intent-based tokens that describe how values are used in the experience. This is the primary layer designers and developers work with.
                </p>
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Examples</p>
                  <div className="space-y-1 text-sm font-mono text-gray-700">
                    <div>background.primary → {'{color.primary.pure}'}</div>
                    <div>text.error → {'{color.error.pure}'}</div>
                    <div>border.neutral → {'{color.neutral.light}'}</div>
                    <div>base.white → {'{global.color.grey.0}'}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-3xl p-6 hover:border-gray-300 transition-colors">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Wrench className="w-6 h-6 text-orange-700" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Layer 4: Component</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Component-specific tokens for cases where no reusable semantic token fits. Used sparingly for unique component states.
                </p>
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Examples</p>
                  <div className="space-y-1 text-sm font-mono text-gray-700">
                    <div>toggle/knob/background-enabled-on → {'{color.primary.pure}'}</div>
                    <div>slider/knob/background-irresponsive → global.color.grey.200</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-semibold mb-6 text-gray-900">How Tokens Work Together</h2>
        <div className="bg-white border border-gray-200 rounded-3xl p-8">
          <p className="text-sm text-gray-600 mb-8">
            Tokens reference each other in a hierarchical chain, flowing from raw values up through brand decisions to semantic usage. This layering enables consistency, flexibility, and brand switching.
          </p>

          {/* Visual Diagram */}
          <div className="flex flex-col items-center justify-center py-8">
            {/* Primitives */}
            <div className="flex flex-col items-center mb-2">
              <div className="text-xs text-gray-500 mb-2">Primitives</div>
              <div className="flex items-center gap-3 bg-gray-900 text-white px-6 py-3 rounded-full">
                <div className="w-6 h-6 rounded-full" style={{ backgroundColor: '#4b286d' }}></div>
                <span className="font-mono text-sm">#4b286d</span>
              </div>
            </div>
            <div className="w-px h-12 bg-gray-300"></div>

            {/* Theme */}
            <div className="flex flex-col items-center mb-2">
              <div className="text-xs text-gray-500 mb-2">Theme <span className="text-gray-400">(alias)</span></div>
              <div className="flex items-center gap-3 bg-gray-900 text-white px-6 py-3 rounded-full">
                <div className="w-6 h-6 rounded-full" style={{ backgroundColor: '#4b286d' }}></div>
                <span className="font-mono text-sm">color.primary.pure</span>
              </div>
            </div>
            <div className="w-px h-12 bg-gray-300"></div>

            {/* Semantic */}
            <div className="flex flex-col items-center mb-2">
              <div className="text-xs text-gray-500 mb-2">Semantic <span className="text-gray-400">(alias)</span></div>
              <div className="flex items-center gap-3 bg-gray-900 text-white px-6 py-3 rounded-full">
                <div className="w-6 h-6 rounded-full" style={{ backgroundColor: '#4b286d' }}></div>
                <span className="font-mono text-sm">background.primary</span>
              </div>
            </div>
            <div className="w-px h-12 bg-gray-300"></div>

            {/* Component */}
            <div className="flex flex-col items-center mb-2">
              <div className="text-xs text-gray-500 mb-2">Component <span className="text-gray-400">(rarely used)</span></div>
              <div className="flex items-center gap-3 bg-gray-900 text-white px-6 py-3 rounded-full">
                <div className="w-6 h-6 rounded-full" style={{ backgroundColor: '#4b286d' }}></div>
                <span className="font-mono text-sm">button.background.primary</span>
              </div>
            </div>
            <div className="w-px h-12 bg-gray-300"></div>

            {/* Final Implementation */}
            <button
              className="text-white px-8 py-4 rounded-full font-medium text-base mt-2"
              style={{ backgroundColor: '#4b286d' }}
            >
              Primary Button
            </button>
          </div>

          <div className="bg-gray-50 rounded-xl p-6 mt-8">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-3">Reference Chain ({brandName} Active)</p>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="text-sm font-semibold text-gray-900 min-w-40">Semantic Token</div>
                <div className="text-sm font-mono text-gray-600">background.primary</div>
              </div>
              <div className="pl-6 border-l-2 border-gray-300">
                <div className="flex items-center gap-3 mb-2">
                  <div className="text-xs text-gray-500">references</div>
                  <div className="text-sm font-mono text-gray-600">{'{color.primary.pure}'}</div>
                </div>
                <div className="pl-6 border-l-2 border-gray-300">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="text-xs text-gray-500">resolves to ({brandName})</div>
                    <div className="text-sm font-mono text-gray-600">color.primary.pure</div>
                  </div>
                  <div className="pl-6 border-l-2 border-gray-300">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="text-xs text-gray-500">references</div>
                      <div className="text-sm font-mono text-gray-600">brand.{brand}.color.{brand === 'telus' ? 'purple' : 'primary'}.700</div>
                    </div>
                    <div className="pl-6 border-l-2 border-gray-300">
                      <div className="flex items-center gap-3">
                        <div className="text-xs text-gray-500">value</div>
                        <div className="text-sm font-mono font-semibold text-gray-900">#4b286d</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
                <strong className="font-medium text-gray-900">Use Semantic Tokens:</strong>
                <span className="text-gray-600"> Always reach for semantic tokens (Layer 3) in your designs and code. These are the intent-based tokens built for direct application.</span>
              </div>
            </li>
            <li className="flex items-start">
              <div className="w-1.5 h-1.5 bg-gray-900 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <div>
                <strong className="font-medium text-gray-900">Don't Use Primitives Directly:</strong>
                <span className="text-gray-600"> Avoid referencing primitive tokens directly in components. Primitives are building blocks for higher-layer tokens, not for direct application.</span>
              </div>
            </li>
            <li className="flex items-start">
              <div className="w-1.5 h-1.5 bg-gray-900 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <div>
                <strong className="font-medium text-gray-900">Respect the Hierarchy:</strong>
                <span className="text-gray-600"> Follow the token layer structure. If a semantic token doesn't exist for your use case, work with the design system team to create one rather than skipping layers.</span>
              </div>
            </li>
            <li className="flex items-start">
              <div className="w-1.5 h-1.5 bg-gray-900 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <div>
                <strong className="font-medium text-gray-900">Platform Considerations:</strong>
                <span className="text-gray-600"> Tokens are platform-agnostic by design, but each platform (iOS, Android, Web) may have platform-specific token files for typefaces and fonts.</span>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <ResourceCards resources={resources} />
    </div>
  );
}