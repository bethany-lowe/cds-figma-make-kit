import { useState } from 'react';
import { Button, ButtonVariant } from './ui/Button';
import { IconButton } from './ui/IconButton';
import { ButtonGroup, IconGridItem } from './ui/ButtonGroup';
import { useTheme } from '../contexts/ThemeContext';
import iconManifest from '../../imports/icon-manifest.json';

/* ─── tiny inline SVG icon helper ───────────────────────────── */
function Icon({ name, size = 24 }: { name: string; size?: number }) {
  const manifest = iconManifest as Record<string, { svg: string }>;
  const raw = manifest[name]?.svg ?? '';
  if (!raw) return null;
  const sized = raw
    .replace(/width="24"/, `width="${size}"`)
    .replace(/height="24"/, `height="${size}"`);
  return <span dangerouslySetInnerHTML={{ __html: sized }} style={{ display: 'flex', alignItems: 'center' }} />;
}

export function ButtonGroupPage() {
  const { brandFont, brandName } = useTheme();
  const [darkBg, setDarkBg] = useState(false);

  return (
    <div>
      {/* ── Header ─────────────────────────────────────────── */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
            Components
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4" style={{ fontFamily: brandFont }}>
            Button Group
          </h1>
          <p className="text-base text-gray-600 leading-relaxed max-w-2xl">
            ButtonGroup organizes multiple buttons into cohesive layouts. Three variants handle
            common patterns: stacked primary/secondary pairs, horizontal side-by-side actions,
            and icon button toolbars with labels. Uses the existing Button and IconButton components —
            no custom rendering.
          </p>
        </div>
        <div className="bg-yellow-50 text-yellow-700 border border-yellow-200 px-4 py-1.5 rounded-full text-xs font-semibold flex-shrink-0">
          Beta
        </div>
      </div>

      {/* ── Variants ────────────────────────────────────────── */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-gray-900">Variants</h2>
        <div className="bg-white border border-gray-200 rounded-3xl p-8 space-y-10">

          {/* Stacked */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-gray-800">Stacked</h3>
            <p className="text-sm text-gray-500 mb-6">
              Vertical stack with 12px gap. Use for primary + secondary action pairs where
              the primary action should be visually dominant.
            </p>
            <div
              className="p-8 rounded-2xl transition-colors duration-200 flex justify-center"
              style={{ backgroundColor: darkBg ? '#1f2937' : '#f9fafb' }}
            >
              <ButtonGroup variant="stacked">
                <Button variant="high">Primary action</Button>
                <Button variant="mediumOutline">Secondary action</Button>
              </ButtonGroup>
            </div>
          </div>

          {/* Horizontal */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-gray-800">Horizontal</h3>
            <p className="text-sm text-gray-500 mb-6">
              Horizontal row with 24px gap. Side-by-side actions with equal visual weight.
            </p>
            <div
              className="p-8 rounded-2xl transition-colors duration-200 flex justify-center"
              style={{ backgroundColor: darkBg ? '#1f2937' : '#f9fafb' }}
            >
              <ButtonGroup variant="horizontal">
                <Button variant="high">Primary action</Button>
                <Button variant="mediumOutline">Secondary action</Button>
              </ButtonGroup>
            </div>
          </div>

          {/* Icon Grid */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-gray-800">Icon Grid</h3>
            <p className="text-sm text-gray-500 mb-6">
              Horizontal grid of icon buttons with labels below. 4px gap. Use for toolbars
              and action panels where multiple related actions are grouped.
            </p>
            <div
              className="p-8 rounded-2xl transition-colors duration-200 flex justify-center"
              style={{ backgroundColor: darkBg ? '#1f2937' : '#f9fafb' }}
            >
              <ButtonGroup variant="iconGrid">
                <IconGridItem
                  button={<IconButton variant="high" icon={<Icon name="actionSearch/Line" />} aria-label="Search" />}
                  label="Search"
                />
                <IconGridItem
                  button={<IconButton variant="high" icon={<Icon name="actionPlus/Line" />} aria-label="Add" />}
                  label="Add"
                />
                <IconGridItem
                  button={<IconButton variant="high" icon={<Icon name="actionTune/Line" />} aria-label="Filter" />}
                  label="Filter"
                />
              </ButtonGroup>
            </div>
          </div>

          {/* Dark preview toggle */}
          <div className="pt-4 border-t border-gray-100">
            <button
              onClick={() => setDarkBg(!darkBg)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                darkBg
                  ? 'bg-gray-900 text-white'
                  : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-300'
              }`}
            >
              Dark preview
            </button>
          </div>
        </div>
      </div>

      {/* ── Code Examples ───────────────────────────────────── */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-gray-900">Code Examples</h2>
        <div className="space-y-4">

          {/* Stacked */}
          <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden">
            <div className="px-6 py-3 bg-gray-50 border-b border-gray-100">
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Stacked</div>
            </div>
            <div className="bg-gray-950">
              <pre className="text-sm text-green-400 p-6 overflow-x-auto font-mono leading-relaxed">
{`import { ButtonGroup, Button } from '@cds/components';

<ButtonGroup variant="stacked">
  <Button variant="high">Primary action</Button>
  <Button variant="mediumOutline">Secondary action</Button>
</ButtonGroup>`}
              </pre>
            </div>
          </div>

          {/* Horizontal */}
          <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden">
            <div className="px-6 py-3 bg-gray-50 border-b border-gray-100">
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Horizontal</div>
            </div>
            <div className="bg-gray-950">
              <pre className="text-sm text-green-400 p-6 overflow-x-auto font-mono leading-relaxed">
{`import { ButtonGroup, Button } from '@cds/components';

<ButtonGroup variant="horizontal">
  <Button variant="high">Primary action</Button>
  <Button variant="mediumOutline">Secondary action</Button>
</ButtonGroup>`}
              </pre>
            </div>
          </div>

          {/* Icon Grid */}
          <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden">
            <div className="px-6 py-3 bg-gray-50 border-b border-gray-100">
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Icon Grid</div>
            </div>
            <div className="bg-gray-950">
              <pre className="text-sm text-green-400 p-6 overflow-x-auto font-mono leading-relaxed">
{`import { ButtonGroup, IconGridItem, IconButton } from '@cds/components';
import { SearchIcon, AddIcon, FilterIcon } from './icons';

<ButtonGroup variant="iconGrid">
  <IconGridItem
    button={<IconButton icon={<SearchIcon />} aria-label="Search" />}
    label="Search"
  />
  <IconGridItem
    button={<IconButton icon={<AddIcon />} aria-label="Add" />}
    label="Add"
  />
  <IconGridItem
    button={<IconButton icon={<FilterIcon />} aria-label="Filter" />}
    label="Filter"
  />
</ButtonGroup>`}
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* ── Design tokens ───────────────────────────────────── */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-2 text-gray-900">Design tokens</h2>
        <p className="text-sm text-gray-500 mb-6">
          All spacing values reference repo CSS custom properties. ButtonGroup does not
          introduce new semantic tokens — it composes existing Button spacing primitives.
        </p>
        <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden">
          <div className="grid grid-cols-[140px_1fr_auto] border-b border-gray-100 px-6 py-3 bg-gray-50">
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Variant</div>
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Gap Token</div>
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Resolved</div>
          </div>
          {[
            { variant: 'Stacked',    token: '--space-medium',  value: '12px' },
            { variant: 'Horizontal', token: '--space-xlarge',  value: '24px' },
            { variant: 'Icon Grid',  token: '--space-xsmall',  value: '4px'  },
          ].map((row, i, arr) => (
            <div
              key={row.variant}
              className={`grid grid-cols-[140px_1fr_auto] px-6 py-3 items-center gap-4 ${
                i < arr.length - 1 ? 'border-b border-gray-100' : ''
              } hover:bg-gray-50 transition-colors`}
            >
              <span className="text-sm font-medium text-gray-800">{row.variant}</span>
              <code className="text-xs font-mono text-gray-600">{row.token}</code>
              <span className="text-sm text-gray-400">{row.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Usage ──────────────────────────────────────────── */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-gray-900">Usage</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border border-gray-200 rounded-3xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                <svg className="w-3 h-3 text-green-600" fill="none" viewBox="0 0 12 12">
                  <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="text-sm font-semibold text-green-700 uppercase tracking-wider">Do</span>
            </div>
            <ul className="space-y-3">
              {[
                'Use stacked for primary + secondary action pairs in cards and modals.',
                'Use horizontal when both actions have equal visual weight.',
                'Use icon grid for toolbars with 3–6 related actions.',
                'Pair High + Medium Outline for clear emphasis hierarchy.',
                'Keep icon grid labels short — single words or 2-word phrases.',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                  <div className="w-1 h-1 rounded-full bg-green-400 mt-2 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white border border-gray-200 rounded-3xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center">
                <svg className="w-3 h-3 text-red-600" fill="none" viewBox="0 0 12 12">
                  <path d="M3 3l6 6M9 3l-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <span className="text-sm font-semibold text-red-700 uppercase tracking-wider">Don't</span>
            </div>
            <ul className="space-y-3">
              {[
                "Don't stack more than 2 buttons — it creates decision fatigue.",
                "Don't place two High buttons side by side — use Medium Outline for the secondary action.",
                "Don't use icon grid with more than 6 items — consider a dropdown menu instead.",
                "Don't mix button sizes within a group — keep them consistent.",
                "Don't rely on icon grid without labels — always provide text context.",
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

      {/* ── Props reference ────────────────────────────────── */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-gray-900">Props</h2>

        {/* ButtonGroup */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-800">ButtonGroup</h3>
          <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden">
            <div className="grid grid-cols-[120px_200px_100px_1fr] border-b border-gray-100 px-6 py-3 bg-gray-50">
              {['Prop', 'Type', 'Default', 'Description'].map(h => (
                <div key={h} className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</div>
              ))}
            </div>
            {[
              { prop: 'variant',  type: '"stacked" | "horizontal" | "iconGrid"', def: '"horizontal"', desc: 'Layout variant.' },
              { prop: 'children', type: 'ReactNode',                              def: '—',            desc: 'Button or IconButton components to group.' },
              { prop: 'className', type: 'string',                                def: '—',            desc: 'Additional CSS class.' },
            ].map((row, i, arr) => (
              <div
                key={row.prop}
                className={`grid grid-cols-[120px_200px_100px_1fr] px-6 py-3 items-start gap-4 ${
                  i < arr.length - 1 ? 'border-b border-gray-100' : ''
                } hover:bg-gray-50 transition-colors`}
              >
                <code className="text-sm font-mono text-gray-800">{row.prop}</code>
                <code className="text-xs font-mono text-gray-500 break-words">{row.type}</code>
                <code className="text-sm font-mono text-gray-400">{row.def}</code>
                <span className="text-sm text-gray-600">{row.desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* IconGridItem */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-gray-800">IconGridItem</h3>
          <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden">
            <div className="grid grid-cols-[120px_200px_100px_1fr] border-b border-gray-100 px-6 py-3 bg-gray-50">
              {['Prop', 'Type', 'Default', 'Description'].map(h => (
                <div key={h} className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</div>
              ))}
            </div>
            {[
              { prop: 'button',    type: 'ReactNode', def: '—', desc: 'IconButton component.' },
              { prop: 'label',     type: 'string',    def: '—', desc: 'Label text displayed below the icon button.' },
              { prop: 'className', type: 'string',    def: '—', desc: 'Additional CSS class.' },
            ].map((row, i, arr) => (
              <div
                key={row.prop}
                className={`grid grid-cols-[120px_200px_100px_1fr] px-6 py-3 items-start gap-4 ${
                  i < arr.length - 1 ? 'border-b border-gray-100' : ''
                } hover:bg-gray-50 transition-colors`}
              >
                <code className="text-sm font-mono text-gray-800">{row.prop}</code>
                <code className="text-xs font-mono text-gray-500 break-words">{row.type}</code>
                <code className="text-sm font-mono text-gray-400">{row.def}</code>
                <span className="text-sm text-gray-600">{row.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
