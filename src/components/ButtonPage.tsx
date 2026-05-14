import { useState } from 'react';
import { Button, ButtonVariant, ButtonSize } from './ui/Button';
import { IconButton } from './ui/IconButton';
import { ToggleButtonTab } from './ToggleButtonTab';
import { useTheme } from '../contexts/ThemeContext';
import iconManifest from '../../imports/icon-manifest.json';
import { A11yAudit, A11yList } from './docs/DocAnnotations';

/* ─── tiny inline SVG icon helper ───────────────────────────── */
function Icon({ name, size = 18 }: { name: string; size?: number }) {
  const manifest = iconManifest as Record<string, { svg: string }>;
  const raw = manifest[name]?.svg ?? '';
  if (!raw) return null;
  const sized = raw
    .replace(/width="24"/, `width="${size}"`)
    .replace(/height="24"/, `height="${size}"`);
  return <span dangerouslySetInnerHTML={{ __html: sized }} style={{ display: 'flex', alignItems: 'center' }} />;
}

/* ─── copy-to-clipboard hook ─────────────────────────────────── */
function useCopy() {
  const [copied, setCopied] = useState(false);
  const copy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return { copied, copy };
}

/* ─── token rows per variant ─────────────────────────────────── */
const VARIANT_TOKENS: Record<ButtonVariant, { prop: string; token: string; note?: string }[]> = {
  high: [
    { prop: 'Background',       token: '--background-primary' },
    { prop: 'Background hover', token: '--background-primary-bold' },
    { prop: 'Active opacity',   token: '--opacity-medium', note: '0.6 — Figma pressed' },
    { prop: 'Text',             token: '--text-primary-inverse' },
    { prop: 'Border',           token: 'transparent' },
  ],
  mediumOutline: [
    { prop: 'Background',       token: 'transparent' },
    { prop: 'Background hover', token: '--background-primary-subtle' },
    { prop: 'Active opacity',   token: '--opacity-medium', note: '0.6 — Figma pressed' },
    { prop: 'Text',             token: '--text-primary' },
    { prop: 'Border',           token: '--border-primary' },
  ],
  mediumBorderlessPrimary: [
    { prop: 'Background',       token: '--background-primary-subtle' },
    { prop: 'Background hover', token: '--background-primary-subtle' },
    { prop: 'Active opacity',   token: '--opacity-medium', note: '0.6 — Figma pressed' },
    { prop: 'Text',             token: '--text-primary' },
    { prop: 'Border',           token: 'transparent' },
  ],
  mediumBorderlessNeutral: [
    { prop: 'Background',       token: '--background-neutral-subtle' },
    { prop: 'Background hover', token: '--background-neutral-subtle' },
    { prop: 'Active opacity',   token: '--opacity-medium', note: '0.6 — Figma pressed' },
    { prop: 'Text',             token: '--text-primary' },
    { prop: 'Icon',             token: '--icon-primary' },
    { prop: 'Border',           token: 'transparent' },
  ],
  lowGhost: [
    { prop: 'Background',       token: 'transparent' },
    { prop: 'Background hover', token: '--background-neutral-subtle' },
    { prop: 'Active opacity',   token: '--opacity-medium', note: '0.6 — Figma pressed' },
    { prop: 'Text',             token: '--text-neutral' },
    { prop: 'Border',           token: 'transparent' },
  ],
};

const SHARED_TOKENS = [
  { prop: 'Disabled background', token: '--background-disabled' },
  { prop: 'Disabled text',       token: '--text-neutral-subtle' },
  { prop: 'Focus ring colour',   token: '--border-info', note: 'Blue — matches Figma spec' },
  { prop: 'Focus ring width',    token: '--border-width-thick', note: '2px' },
  { prop: 'Border radius',       token: '--radius-full' },
  { prop: 'Icon slot size',      token: '--icon-size-medium', note: '24px' },
];

const VARIANT_META: Record<ButtonVariant, { label: string; figmaEmphasis: string; desc: string }> = {
  high:             { label: 'High',              figmaEmphasis: 'high - solid',      desc: 'Filled brand colour. The single highest-emphasis action on a surface. Use once per view.' },
  mediumOutline:    { label: 'Medium Outline',    figmaEmphasis: 'med - outline',     desc: 'Transparent with a brand-coloured border. Secondary action alongside a High button.' },
  mediumBorderlessPrimary: { label: 'Medium Borderless Primary', figmaEmphasis: 'med - borderless',  desc: 'Primary-subtle background, no border, brand-coloured text. Inline secondary emphasis — compact footprint.' },
  mediumBorderlessNeutral: { label: 'Medium Borderless Neutral', figmaEmphasis: 'med - borderless neutral', desc: 'Neutral-subtle background, no border, primary colour text and icon. Inline neutral emphasis.' },
  lowGhost:         { label: 'Low Ghost',         figmaEmphasis: 'low - ghost',       desc: 'Neutral text, no border, no background. De-emphasised or low-priority actions.' },
};

/* ─── component ─────────────────────────────────────────────── */

export function ButtonPage() {
  const { brandFont, brandName } = useTheme();

  // Top-level page tab
  const [pageTab, setPageTab] = useState<'standard' | 'icon' | 'toggleButton'>('standard');

  // Playground state
  const [variant,    setVariant]    = useState<ButtonVariant>('high');
  const [size,       setSize]       = useState<ButtonSize>('small');
  const [loading,    setLoading]    = useState(false);
  const [isDisabled, setDisabled]   = useState(false);
  const [fullWidth,  setFullWidth]  = useState(false);
  const [withLeft,   setWithLeft]   = useState(false);
  const [withRight,  setWithRight]  = useState(false);
  const [darkBg,     setDarkBg]     = useState(false);
  const [labelText,  setLabelText]  = useState('Button label');
  const [activeTab,  setActiveTab]  = useState<'preview' | 'code'>('preview');

  // Token table tab
  const [tokenVariant, setTokenVariant] = useState<ButtonVariant>('high');

  // ── Icon tab state ───────────────────────────────────────────
  const [iVariant,      setIVariant]      = useState<ButtonVariant>('high');
  const [iSize,         setISize]         = useState<ButtonSize>('small');
  const [iLoading,      setILoading]      = useState(false);
  const [iDisabled,     setIDisabled]     = useState(false);
  const [iDarkBg,       setIDarkBg]       = useState(false);
  const [iActiveTab,    setIActiveTab]    = useState<'preview' | 'code'>('preview');
  const [iTokenVariant, setITokenVariant] = useState<ButtonVariant>('high');

  const { copied, copy } = useCopy();

  /* ── code snippet ── */
  const props: string[] = [`variant="${variant}"`, `size="${size}"`];
  if (loading)    props.push('loading');
  if (isDisabled) props.push('disabled');
  if (fullWidth)  props.push('fullWidth');
  if (withLeft)   props.push('iconLeft={<YourIcon />}');
  if (withRight)  props.push('iconRight={<YourIcon />}');

  const codeSnippet =
`import { Button } from '@cds/components';

<Button ${props.join('\n        ')}>
  ${labelText}
</Button>`;

  /* ── icon-tab playground code snippet ── */
  const iProps: string[] = [`variant="${iVariant}"`, `size="${iSize}"`, `aria-label="Search"`];
  if (iLoading)  iProps.push('loading');
  if (iDisabled) iProps.push('disabled');
  const iCodeSnippet =
`import { IconButton } from '@cds/components';
import { SearchIcon } from './icons';

<IconButton ${iProps.join('\n           ')}
  icon={<SearchIcon />}
/>`;

  /* ── icon helpers for playground ── */
  const iconSize = size === 'medium' ? 20 : 18;
  const leftIcon  = withLeft  ? <Icon name="actionPlus/Line"         size={iconSize} /> : undefined;
  const rightIcon = withRight ? <Icon name="arrowChevronRight/Line"   size={iconSize} /> : undefined;

  return (
    <div>
      {/* ── Header ─────────────────────────────────────────── */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
            Components
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4" style={{ fontFamily: brandFont }}>
            Button
          </h1>
          <p className="text-base text-gray-600 leading-relaxed max-w-2xl">
            Buttons trigger actions or navigate users through the interface. The CDS Button uses an
            emphasis model — not colour roles — to communicate visual priority. Four levels map
            directly to Figma emphasis values and automatically pick up the active brand
            ({brandName}) via CSS custom properties.
          </p>
        </div>
        <div className="bg-green-50 text-green-700 border border-green-200 px-4 py-1.5 rounded-full text-xs font-semibold flex-shrink-0">
          Ready
        </div>
      </div>

      {/* ── Page-level tabs ─────────────────────────────────── */}
      <div className="border-b border-gray-200 mb-12">
        <div className="flex gap-8">
          {([
            { id: 'standard',     label: 'Standard'       },
            { id: 'icon',         label: 'Icon'           },
            { id: 'toggleButton', label: 'Toggle Button'  },
          ] as { id: 'standard' | 'icon' | 'toggleButton'; label: string }[]).map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setPageTab(id)}
              className={`pb-3 text-base font-medium transition-colors relative ${
                pageTab === id
                  ? 'text-gray-900'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {label}
              {pageTab === id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ── Standard tab ────────────────────────────────────── */}
      {pageTab === 'standard' && (
        <div>

      {/* ── Playground ─────────────────────────────────────── */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-gray-900">Playground</h2>
        <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden">

          {/* Controls */}
          <div className="px-6 py-5 border-b border-gray-100 bg-gray-50 flex flex-wrap gap-6 items-start">

            {/* Variant */}
            <div>
              <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">Variant</div>
              <div className="flex flex-wrap gap-1.5">
                {(['high', 'mediumOutline', 'mediumBorderlessPrimary', 'mediumBorderlessNeutral', 'lowGhost'] as ButtonVariant[]).map(v => (
                  <button
                    key={v}
                    onClick={() => setVariant(v)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                      variant === v
                        ? 'bg-gray-900 text-white'
                        : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>

            {/* Size */}
            <div>
              <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">Size</div>
              <div className="flex gap-1.5">
                {(['small', 'medium'] as ButtonSize[]).map(s => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium capitalize transition-colors ${
                      size === s
                        ? 'bg-gray-900 text-white'
                        : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Label text input */}
            <div>
              <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">Label</div>
              <input
                type="text"
                value={labelText}
                onChange={e => setLabelText(e.target.value)}
                placeholder="Button label"
                className="h-[30px] px-3 rounded-full text-xs text-gray-700 bg-white border border-gray-200 hover:border-gray-300 focus:border-gray-400 focus:outline-none transition-colors w-36"
              />
            </div>

            {/* Toggles */}
            <div>
              <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">Options</div>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { label: 'Loading',       value: loading,    setter: setLoading },
                  { label: 'Disabled',      value: isDisabled, setter: setDisabled },
                  { label: 'Full width',    value: fullWidth,  setter: setFullWidth },
                  { label: 'Icon left',     value: withLeft,   setter: setWithLeft },
                  { label: 'Icon right',    value: withRight,  setter: setWithRight },
                  { label: 'Dark preview',  value: darkBg,     setter: setDarkBg },
                ].map(({ label, value, setter }) => (
                  <button
                    key={label}
                    onClick={() => setter(!value)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                      value
                        ? 'bg-gray-900 text-white'
                        : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Preview / Code tabs */}
          <div className="border-b border-gray-100 flex gap-6 px-6">
            {(['preview', 'code'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-3 text-sm font-medium capitalize transition-colors relative ${
                  activeTab === tab ? 'text-gray-900' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900" />
                )}
              </button>
            ))}
          </div>

          {activeTab === 'preview' ? (
            <div
              className="p-12 flex items-center justify-center min-h-40 transition-colors duration-200"
              style={{ backgroundColor: darkBg ? '#1f2937' : '#f9fafb' }}
            >
              <Button
                variant={variant}
                size={size}
                loading={loading}
                disabled={isDisabled}
                fullWidth={fullWidth}
                iconLeft={leftIcon}
                iconRight={rightIcon}
              >
                {labelText}
              </Button>
            </div>
          ) : (
            <div className="relative bg-gray-950 rounded-none">
              <pre className="text-sm text-green-400 p-6 overflow-x-auto font-mono leading-relaxed">
                {codeSnippet}
              </pre>
              <button
                onClick={() => copy(codeSnippet)}
                className="absolute top-4 right-4 px-3 py-1.5 rounded-lg text-xs font-medium bg-white/10 text-white hover:bg-white/20 transition-colors"
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ── Emphasis levels (variants) ──────────────────────── */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-2 text-gray-900">Emphasis levels</h2>
        <p className="text-sm text-gray-500 mb-6 leading-relaxed">
          CDS uses an emphasis model to communicate visual priority — not colour roles. Each variant
          maps directly to a named Figma emphasis value.
        </p>
        <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-[220px_120px_1fr] border-b border-gray-100 px-6 py-3 bg-gray-50">
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Variant</div>
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Figma emphasis</div>
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Usage</div>
          </div>
          {(Object.entries(VARIANT_META) as [ButtonVariant, typeof VARIANT_META[ButtonVariant]][]).map(
            ([v, meta], i, arr) => (
              <div
                key={v}
                className={`grid grid-cols-[220px_120px_1fr] items-center gap-4 px-6 py-5 ${
                  i < arr.length - 1 ? 'border-b border-gray-100' : ''
                }`}
              >
                <div className="flex items-center">
                  <Button variant={v} size="small">{meta.label}</Button>
                </div>
                <code className="text-xs font-mono text-gray-400">{meta.figmaEmphasis}</code>
                <p className="text-sm text-gray-500">{meta.desc}</p>
              </div>
            )
          )}
        </div>
      </div>

      {/* ── Sizes ──────────────────────────────────────────── */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-gray-900">Sizes</h2>
        <div className="bg-white border border-gray-200 rounded-3xl p-8">
          <div className="flex items-end gap-10 flex-wrap mb-8">
            {(
              [
                {
                  s: 'small'  as ButtonSize,
                  label: 'Small (default)',
                  minH: '48px',
                  padding: '12px / 24px',
                  token: '--size-8',
                  note: 'Meets 48px touch target minimum.',
                },
                {
                  s: 'medium' as ButtonSize,
                  label: 'Medium',
                  minH: '56px',
                  padding: '16px / 24px',
                  token: '--size-9',
                  note: 'Use when more visual prominence is needed.',
                },
              ]
            ).map(({ s, label, minH, padding, token, note }) => (
              <div key={s} className="flex flex-col items-start gap-4">
                <Button variant="high" size={s}>Button label</Button>
                <div>
                  <div className="text-sm font-semibold text-gray-800">{label}</div>
                  <div className="text-xs font-mono text-gray-400 mt-0.5">min-height: {minH} ({token})</div>
                  <div className="text-xs font-mono text-gray-400">padding: {padding} (v / h)</div>
                  <div className="text-xs text-gray-400 mt-1">{note}</div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-500 leading-relaxed">
            The default size is <code className="font-mono text-xs bg-gray-100 px-1.5 py-0.5 rounded">small</code>.
            Both sizes meet the WCAG 2.5.5 minimum 44×44px touch target requirement.
          </p>
        </div>
      </div>

      {/* ── With icons ─────────────────────────────────────── */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-gray-900">With icons</h2>
        <div className="bg-white border border-gray-200 rounded-3xl p-8">
          <div className="flex flex-wrap gap-4 items-center mb-8">
            <Button variant="high"             size="small"  iconLeft={<Icon name="actionPlus/Line"         size={18} />}>New item</Button>
            <Button variant="mediumOutline"    size="small"  iconLeft={<Icon name="objectBook/Line"         size={18} />}>Read docs</Button>
            <Button variant="mediumBorderlessPrimary" size="small"  iconRight={<Icon name="arrowChevronRight/Line" size={18} />}>View details</Button>
            <Button variant="mediumBorderlessNeutral" size="small"  iconLeft={<Icon name="actionTune/Line"         size={18} />}>Filter</Button>
            <Button variant="lowGhost"         size="small"  iconRight={<Icon name="actionShareAndroid/Line" size={18} />}>Share</Button>
          </div>
          <p className="text-sm text-gray-500 leading-relaxed">
            Icons are passed as ReactNode via{' '}
            <code className="font-mono text-gray-700 bg-gray-100 px-1.5 py-0.5 rounded text-xs">iconLeft</code> or{' '}
            <code className="font-mono text-gray-700 bg-gray-100 px-1.5 py-0.5 rounded text-xs">iconRight</code>.
            The icon slot is sized to <code className="font-mono text-xs bg-gray-100 px-1.5 py-0.5 rounded">--icon-size-medium</code> (24px)
            and inherits text colour automatically.
          </p>
        </div>
      </div>

      {/* ── States ─────────────────────────────────────────── */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-gray-900">States</h2>
        <div className="bg-white border border-gray-200 rounded-3xl p-8 space-y-6">
          {(
            [
              { v: 'high'          as ButtonVariant, label: 'High' },
              { v: 'mediumOutline' as ButtonVariant, label: 'Medium Outline' },
            ]
          ).map(({ v, label }) => (
            <div key={v}>
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">{label}</div>
              <div className="flex flex-wrap gap-3 items-center">
                <Button variant={v} size="small">Default</Button>
                <Button variant={v} size="small" disabled>Disabled</Button>
                <Button variant={v} size="small" loading>Loading</Button>
              </div>
            </div>
          ))}

          {/* State mapping table */}
          <div className="pt-4 border-t border-gray-100">
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">State mapping</div>
            <div className="overflow-hidden rounded-2xl border border-gray-100">
              {[
                { state: 'Default',  css: '—',              behaviour: 'Variant base tokens' },
                { state: 'Hover',    css: ':hover',          behaviour: 'Background shifts — web equivalent of mobile "pressed"' },
                { state: 'Active',   css: ':active',         behaviour: '--opacity-medium (0.6) — matches Figma pressed state' },
                { state: 'Disabled', css: '[disabled]',      behaviour: '--background-disabled, --text-neutral-subtle, no border' },
                { state: 'Loading',  css: 'aria-busy',       behaviour: 'Spinner replaces icons; cursor: wait; pointer events off' },
                { state: 'Focus',    css: ':focus-visible',  behaviour: '--border-info (blue) 2px outline — matches Figma focus ring' },
              ].map((row, i, arr) => (
                <div key={row.state} className={`grid grid-cols-[90px_130px_1fr] px-4 py-2.5 items-center text-sm ${i < arr.length - 1 ? 'border-b border-gray-100' : ''} ${i === 0 ? 'bg-gray-50' : ''}`}>
                  <span className="font-semibold text-gray-800">{row.state}</span>
                  <code className="text-xs font-mono text-gray-400">{row.css}</code>
                  <span className="text-gray-500">{row.behaviour}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Token reference ────────────────────────────────── */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-2 text-gray-900">Design tokens</h2>
        <p className="text-sm text-gray-500 mb-6">
          All colour values are CSS custom properties from{' '}
          <code className="font-mono text-xs bg-gray-100 px-1.5 py-0.5 rounded">tokens.css</code>.
          Switching the active brand updates these at{' '}
          <code className="font-mono text-xs bg-gray-100 px-1.5 py-0.5 rounded">:root</code> via{' '}
          <code className="font-mono text-xs bg-gray-100 px-1.5 py-0.5 rounded">data-brand</code> on{' '}
          <code className="font-mono text-xs bg-gray-100 px-1.5 py-0.5 rounded">&lt;html&gt;</code>.
          All semantic tokens cascade automatically — zero code changes needed.
        </p>

        {/* Variant token selector */}
        <div className="flex gap-2 mb-4 flex-wrap">
          {(['high', 'mediumOutline', 'mediumBorderlessPrimary', 'mediumBorderlessNeutral', 'lowGhost'] as ButtonVariant[]).map(v => (
            <button
              key={v}
              onClick={() => setTokenVariant(v)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                tokenVariant === v
                  ? 'bg-gray-900 text-white'
                  : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-300'
              }`}
            >
              {v}
            </button>
          ))}
        </div>

        <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden mb-4">
          <div className="grid grid-cols-[160px_1fr_auto] border-b border-gray-100 px-6 py-3 bg-gray-50">
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Property</div>
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Token / Value</div>
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Note</div>
          </div>
          {VARIANT_TOKENS[tokenVariant].map((row, i) => (
            <div
              key={row.prop}
              className={`grid grid-cols-[160px_1fr_auto] px-6 py-3 items-center gap-4 ${
                i < VARIANT_TOKENS[tokenVariant].length - 1 ? 'border-b border-gray-100' : ''
              } hover:bg-gray-50 transition-colors`}
            >
              <span className="text-sm text-gray-600">{row.prop}</span>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-mono text-gray-600">{row.token}</span>
              <span className="text-sm text-gray-400">{row.note ?? ''}</span>
            </div>
          ))}
        </div>

        <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden">
          <div className="px-6 py-3 bg-gray-50 border-b border-gray-100">
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Shared across all variants</div>
          </div>
          {SHARED_TOKENS.map((row, i) => (
            <div
              key={row.prop}
              className={`grid grid-cols-[160px_1fr_auto] px-6 py-3 items-center gap-4 ${
                i < SHARED_TOKENS.length - 1 ? 'border-b border-gray-100' : ''
              } hover:bg-gray-50 transition-colors`}
            >
              <span className="text-sm text-gray-600">{row.prop}</span>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-mono text-gray-600">{row.token}</span>
              <span className="text-sm text-gray-400">{row.note ?? ''}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Anatomy ────────────────────────────────────────── */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-gray-900">Anatomy</h2>
        <div className="bg-white border border-gray-200 rounded-3xl p-8">
          {/* Annotated button */}
          <div className="flex justify-center mb-10">
            <div className="relative inline-flex items-center">
              <div
                className="inline-flex items-center gap-2 px-6"
                style={{
                  height: 48,
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: 'var(--background-primary)',
                  color: 'white',
                  fontSize: 15,
                  fontWeight: 500,
                  letterSpacing: '-0.6px',
                }}
              >
                <span style={{ width: 24, height: 24, display: 'flex', alignItems: 'center', opacity: 0.9 }}>
                  <Icon name="actionPlus/Line" size={24} />
                </span>
                <span>Button label</span>
              </div>
            </div>
          </div>

          {/* Anatomy table */}
          <div className="space-y-4">
            {[
              { part: 'Container',     desc: 'Background, border-radius (--radius-full), 2px border, min-height, horizontal padding. Responds to variant and size props.' },
              { part: 'Icon left',     desc: 'Optional. 24px icon slot (--icon-size-medium) rendered before the label. Inherits text colour. Hidden during loading.' },
              { part: 'Label',         desc: 'The button text. font-size-5 (15px), font-weight-medium (500), letter-spacing-dense (-0.6px). Always wrap in a <span>.' },
              { part: 'Icon right',    desc: 'Optional. 24px icon slot rendered after the label. Often a directional chevron or action indicator.' },
              { part: 'Spinner',       desc: 'Replaces all icon slots when loading={true}. border: 2px solid currentColor, top-color: transparent, animation: cds-spin 0.7s.' },
              { part: 'Focus ring',    desc: '2px --border-info (blue) outline with 2px offset. Visible only on keyboard focus (:focus-visible). Matches Figma focus ring spec.' },
            ].map((row, i, arr) => (
              <div key={row.part} className={`flex gap-4 ${i < arr.length - 1 ? 'pb-4 border-b border-gray-100' : ''}`}>
                <div className="w-28 flex-shrink-0">
                  <span className="text-sm font-semibold text-gray-800">{row.part}</span>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">{row.desc}</p>
              </div>
            ))}
          </div>
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
                'Use High for the single most important action on a screen.',
                'Pair High with Medium Outline for primary + secondary action groups.',
                'Use Medium Borderless for inline secondary emphasis with a compact footprint.',
                'Reserve Low Ghost for de-emphasised, tertiary, or utility actions.',
                'Use clear, action-oriented labels: "Save changes", "Add item", "Sign in".',
                'Use the loading state while async operations are in flight.',
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
                "Don't use two High buttons side by side — creates visual ambiguity.",
                'Don\'t use generic labels: "Click here", "OK", or "Submit".',
                "Don't rely on colour alone to convey button importance.",
                "Don't hardcode colours — always reference a CDS semantic token.",
                "Don't use Medium Borderless as the primary action on a surface.",
                "Don't skip the loading state for async actions — it communicates progress.",
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

      {/* ── Accessibility ──────────────────────────────────── */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-gray-900">Accessibility</h2>
        <A11yAudit
          items={[
            { criterion: '2.1.1 Keyboard',           level: 'A',   note: 'All variants are focusable via Tab and activate on Enter or Space.',                                                status: 'pass' },
            { criterion: '2.4.7 Focus Visible',      level: 'AA',  note: 'Visible focus ring applied on keyboard focus using --border-info (blue, per Figma spec).',                      status: 'pass' },
            { criterion: '1.4.3 Contrast (Minimum)', level: 'AA',  note: 'All label text meets 4.5 : 1 contrast ratio against the button surface in every variant.',                          status: 'pass' },
            { criterion: '4.1.2 Name, Role, Value',  level: 'A',   note: 'aria-disabled preserves tab focus while conveying state. aria-busy signals loading. Icon-only buttons require aria-label.', status: 'pass' },
            { criterion: '2.5.5 Target Size',        level: 'AAA', note: 'Both sizes (48 px and 56 px min-height) exceed the 44 × 44 px minimum touch target.',                             status: 'pass' },
          ]}
        />
        <div className="mt-4">
          <A11yList
            items={[
              { label: 'Disabled state',    description: 'Sets aria-disabled and cursor: not-allowed. Keeps the button in the tab order while conveying state to screen readers — do not use the HTML disabled attribute.' },
              { label: 'Loading state',     description: 'Sets aria-busy. The spinner carries role="status" and aria-label="Loading". Add an aria-label to the button describing the pending action if no visible text remains.' },
              { label: 'Icon-only buttons', description: 'Always provide an aria-label when using icon slots with no visible text label. The aria-label should describe the action, not the icon shape.' },
            ]}
          />
        </div>
      </div>

      {/* ── Props reference ────────────────────────────────── */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-gray-900">Props</h2>
        <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden">
          <div className="grid grid-cols-[120px_220px_80px_1fr] border-b border-gray-100 px-6 py-3 bg-gray-50">
            {['Prop', 'Type', 'Default', 'Description'].map(h => (
              <div key={h} className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</div>
            ))}
          </div>
          {[
            { prop: 'variant',   type: '"high" | "mediumOutline" | "mediumBorderlessPrimary" | "mediumBorderlessNeutral" | "lowGhost"', def: '"high"',    desc: 'Emphasis level — maps to Figma emphasis system.' },
            { prop: 'size',      type: '"small" | "medium"',                                          def: '"small"',   desc: 'Size scale. small = 48px, medium = 56px min-height.' },
            { prop: 'fullWidth', type: 'boolean',                                                      def: 'false',    desc: 'Stretch button to fill its container width.' },
            { prop: 'loading',   type: 'boolean',                                                      def: 'false',    desc: 'Show spinner, suppress interaction, set aria-busy.' },
            { prop: 'disabled',  type: 'boolean',                                                      def: 'false',    desc: 'Disable and suppress interaction. Sets aria-disabled.' },
            { prop: 'iconLeft',  type: 'ReactNode',                                                    def: '—',        desc: 'SVG icon rendered before the label.' },
            { prop: 'iconRight', type: 'ReactNode',                                                    def: '—',        desc: 'SVG icon rendered after the label.' },
            { prop: 'children', type: 'ReactNode',                                                     def: '—',        desc: 'Button label text.' },
          ].map((row, i, arr) => (
            <div
              key={row.prop}
              className={`grid grid-cols-[120px_220px_80px_1fr] px-6 py-3 items-start gap-4 ${
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
        <p className="text-xs text-gray-400 mt-3">
          All native <code className="font-mono">{'<button>'}</code> attributes (onClick, type, aria-*, data-*, etc.) are forwarded via rest props.
        </p>
      </div>

        </div>
      )}

      {/* ── Icon tab ────────────────────────────────────────── */}
      {pageTab === 'icon' && (
        <div>

          {/* ── Playground ─────────────────────────────────── */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 text-gray-900">Playground</h2>
            <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden">

              {/* Controls */}
              <div className="px-6 py-5 border-b border-gray-100 bg-gray-50 flex flex-wrap gap-6 items-start">

                {/* Variant */}
                <div>
                  <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">Variant</div>
                  <div className="flex flex-wrap gap-1.5">
                    {(['high', 'mediumOutline', 'mediumBorderlessPrimary', 'mediumBorderlessNeutral', 'lowGhost'] as ButtonVariant[]).map(v => (
                      <button
                        key={v}
                        onClick={() => setIVariant(v)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                          iVariant === v
                            ? 'bg-gray-900 text-white'
                            : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-300'
                        }`}
                      >
                        {v}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Size */}
                <div>
                  <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">Size</div>
                  <div className="flex gap-1.5">
                    {(['small', 'medium'] as ButtonSize[]).map(s => (
                      <button
                        key={s}
                        onClick={() => setISize(s)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium capitalize transition-colors ${
                          iSize === s
                            ? 'bg-gray-900 text-white'
                            : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-300'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Toggles */}
                <div>
                  <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">Options</div>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      { label: 'Loading',      value: iLoading,  setter: setILoading },
                      { label: 'Disabled',     value: iDisabled, setter: setIDisabled },
                      { label: 'Dark preview', value: iDarkBg,   setter: setIDarkBg },
                    ].map(({ label, value, setter }) => (
                      <button
                        key={label}
                        onClick={() => setter(!value)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                          value
                            ? 'bg-gray-900 text-white'
                            : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-300'
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Preview / Code tabs */}
              <div className="border-b border-gray-100 flex gap-6 px-6">
                {(['preview', 'code'] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setIActiveTab(tab)}
                    className={`py-3 text-sm font-medium capitalize transition-colors relative ${
                      iActiveTab === tab ? 'text-gray-900' : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    {tab}
                    {iActiveTab === tab && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900" />
                    )}
                  </button>
                ))}
              </div>

              {iActiveTab === 'preview' ? (
                <div
                  className="p-12 flex items-center justify-center min-h-40 transition-colors duration-200"
                  style={{ backgroundColor: iDarkBg ? '#1f2937' : '#f9fafb' }}
                >
                  <IconButton
                    variant={iVariant}
                    size={iSize}
                    loading={iLoading}
                    disabled={iDisabled}
                    aria-label="Search"
                    icon={<Icon name="actionSearch/Line" size={24} />}
                  />
                </div>
              ) : (
                <div className="relative bg-gray-950">
                  <pre className="text-sm text-green-400 p-6 overflow-x-auto font-mono leading-relaxed">
                    {iCodeSnippet}
                  </pre>
                  <button
                    onClick={() => copy(iCodeSnippet)}
                    className="absolute top-4 right-4 px-3 py-1.5 rounded-lg text-xs font-medium bg-white/10 text-white hover:bg-white/20 transition-colors"
                  >
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* ── Emphasis levels ─────────────────────────────── */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-2 text-gray-900">Emphasis levels</h2>
            <p className="text-sm text-gray-500 mb-6 leading-relaxed">
              The same four-level emphasis model from the standard Button applies here.
              Only the geometry changes — the icon is always centred in a fixed square.
            </p>
            <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden">
              <div className="grid grid-cols-[160px_120px_1fr] border-b border-gray-100 px-6 py-3 bg-gray-50">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Variant</div>
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Figma emphasis</div>
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Usage</div>
              </div>
              {(Object.entries(VARIANT_META) as [ButtonVariant, typeof VARIANT_META[ButtonVariant]][]).map(
                ([v, meta], i, arr) => (
                  <div
                    key={v}
                    className={`grid grid-cols-[160px_120px_1fr] items-center gap-4 px-6 py-5 ${
                      i < arr.length - 1 ? 'border-b border-gray-100' : ''
                    }`}
                  >
                    <div className="flex items-center">
                      <IconButton
                        variant={v}
                        size="small"
                        aria-label={meta.label}
                        icon={<Icon name="actionSearch/Line" size={24} />}
                      />
                    </div>
                    <code className="text-xs font-mono text-gray-400">{meta.figmaEmphasis}</code>
                    <p className="text-sm text-gray-500">{meta.desc}</p>
                  </div>
                )
              )}
            </div>
          </div>

          {/* ── Sizes ───────────────────────────────────────── */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 text-gray-900">Sizes</h2>
            <div className="bg-white border border-gray-200 rounded-3xl p-8">
              <div className="flex items-end gap-10 flex-wrap mb-8">
                {[
                  {
                    s: 'small' as ButtonSize,
                    label: 'Small (default)',
                    dim: '48 × 48 px',
                    token: '--size-8',
                    note: 'Meets 48 px touch target minimum.',
                  },
                  {
                    s: 'medium' as ButtonSize,
                    label: 'Medium',
                    dim: '56 × 56 px',
                    token: '--size-9',
                    note: 'Use when more visual prominence is needed.',
                  },
                ].map(({ s, label, dim, token, note }) => (
                  <div key={s} className="flex flex-col items-start gap-4">
                    <IconButton
                      variant="high"
                      size={s}
                      aria-label="Search"
                      icon={<Icon name="actionSearch/Line" size={24} />}
                    />
                    <div>
                      <div className="text-sm font-semibold text-gray-800">{label}</div>
                      <div className="text-xs font-mono text-gray-400 mt-0.5">{dim} ({token})</div>
                      <div className="text-xs font-mono text-gray-400">padding: 0 — icon centred by flexbox</div>
                      <div className="text-xs text-gray-400 mt-1">{note}</div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-500 leading-relaxed">
                The default size is <code className="font-mono text-xs bg-gray-100 px-1.5 py-0.5 rounded">small</code>.
                Unlike the standard Button, icon buttons are <strong className="font-semibold text-gray-700">fixed square</strong> — the
                icon is always centred with no horizontal padding. Both sizes meet the WCAG 2.5.5 minimum 44 × 44 px touch target requirement.
              </p>
            </div>
          </div>

          {/* ── States ──────────────────────────────────────── */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 text-gray-900">States</h2>
            <div className="bg-white border border-gray-200 rounded-3xl p-8 space-y-6">
              {(
                [
                  { v: 'high'          as ButtonVariant, label: 'High' },
                  { v: 'mediumOutline' as ButtonVariant, label: 'Medium Outline' },
                ]
              ).map(({ v, label }) => (
                <div key={v}>
                  <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">{label}</div>
                  <div className="flex flex-wrap gap-3 items-center">
                    <IconButton variant={v} size="small" aria-label="Default"  icon={<Icon name="actionSearch/Line" size={24} />} />
                    <IconButton variant={v} size="small" aria-label="Disabled" disabled icon={<Icon name="actionSearch/Line" size={24} />} />
                    <IconButton variant={v} size="small" aria-label="Loading"  loading  icon={<Icon name="actionSearch/Line" size={24} />} />
                  </div>
                </div>
              ))}

              {/* State mapping table */}
              <div className="pt-4 border-t border-gray-100">
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">State mapping</div>
                <div className="overflow-hidden rounded-2xl border border-gray-100">
                  {[
                    { state: 'Default',  css: '—',             behaviour: 'Variant base tokens' },
                    { state: 'Hover',    css: ':hover',         behaviour: 'Background shifts — web equivalent of mobile "pressed"' },
                    { state: 'Active',   css: ':active',        behaviour: '--opacity-medium (0.6) — matches Figma pressed state' },
                    { state: 'Disabled', css: '[disabled]',     behaviour: '--background-disabled, --text-neutral-subtle, no border' },
                    { state: 'Loading',  css: 'aria-busy',      behaviour: 'Spinner replaces icon; cursor: wait; pointer events off' },
                    { state: 'Focus',    css: ':focus-visible', behaviour: '--border-info (blue) 2px outline — matches Figma focus ring' },
                  ].map((row, i, arr) => (
                    <div key={row.state} className={`grid grid-cols-[90px_130px_1fr] px-4 py-2.5 items-center text-sm ${i < arr.length - 1 ? 'border-b border-gray-100' : ''} ${i === 0 ? 'bg-gray-50' : ''}`}>
                      <span className="font-semibold text-gray-800">{row.state}</span>
                      <code className="text-xs font-mono text-gray-400">{row.css}</code>
                      <span className="text-gray-500">{row.behaviour}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── Token reference ──────────────────────────────── */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-2 text-gray-900">Token reference</h2>
            <p className="text-sm text-gray-500 mb-6">
              Icon buttons share all colour tokens with the standard Button. The only
              structural difference is the geometry tokens — fixed square, no padding.
            </p>

            <div className="flex gap-2 mb-4 flex-wrap">
              {(['high', 'mediumOutline', 'mediumBorderlessPrimary', 'mediumBorderlessNeutral', 'lowGhost'] as ButtonVariant[]).map(v => (
                <button
                  key={v}
                  onClick={() => setITokenVariant(v)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    iTokenVariant === v
                      ? 'bg-gray-900 text-white'
                      : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-300'
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>

            <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden mb-4">
              <div className="grid grid-cols-[160px_1fr_auto] border-b border-gray-100 px-6 py-3 bg-gray-50">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Property</div>
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Token / Value</div>
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Note</div>
              </div>
              {VARIANT_TOKENS[iTokenVariant].map((row, i) => (
                <div
                  key={row.prop}
                  className={`grid grid-cols-[160px_1fr_auto] px-6 py-3 items-center gap-4 ${
                    i < VARIANT_TOKENS[iTokenVariant].length - 1 ? 'border-b border-gray-100' : ''
                  } hover:bg-gray-50 transition-colors`}
                >
                  <span className="text-sm text-gray-600">{row.prop}</span>
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-mono text-gray-600">{row.token}</span>
                  <span className="text-sm text-gray-400">{row.note ?? ''}</span>
                </div>
              ))}
            </div>

            <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden mb-4">
              <div className="px-6 py-3 bg-gray-50 border-b border-gray-100">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Shared across all variants</div>
              </div>
              {SHARED_TOKENS.map((row, i) => (
                <div
                  key={row.prop}
                  className={`grid grid-cols-[160px_1fr_auto] px-6 py-3 items-center gap-4 ${
                    i < SHARED_TOKENS.length - 1 ? 'border-b border-gray-100' : ''
                  } hover:bg-gray-50 transition-colors`}
                >
                  <span className="text-sm text-gray-600">{row.prop}</span>
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-mono text-gray-600">{row.token}</span>
                  <span className="text-sm text-gray-400">{row.note ?? ''}</span>
                </div>
              ))}
            </div>

            <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden">
              <div className="px-6 py-3 bg-gray-50 border-b border-gray-100">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Icon button geometry</div>
              </div>
              {[
                { prop: 'Small width & height',  token: '--size-8',           note: '48 px' },
                { prop: 'Medium width & height', token: '--size-9',           note: '56 px' },
                { prop: 'Icon size',             token: '--icon-size-medium', note: '24 px — centred via flexbox' },
                { prop: 'Padding',               token: '0',                      note: 'Square sides, no horizontal / vertical padding' },
              ].map((row, i, arr) => (
                <div
                  key={row.prop}
                  className={`grid grid-cols-[160px_1fr_auto] px-6 py-3 items-center gap-4 ${
                    i < arr.length - 1 ? 'border-b border-gray-100' : ''
                  } hover:bg-gray-50 transition-colors`}
                >
                  <span className="text-sm text-gray-600">{row.prop}</span>
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-mono text-gray-600">{row.token}</span>
                  <span className="text-sm text-gray-400">{row.note}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Anatomy ─────────────────────────────────────── */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 text-gray-900">Anatomy</h2>
            <div className="bg-white border border-gray-200 rounded-3xl p-8">
              <div className="flex justify-center mb-10">
                <div className="flex items-end gap-12">
                  {[
                    { w: 48, label: 'small · 48 × 48 px' },
                    { w: 56, label: 'medium · 56 × 56 px' },
                  ].map(({ w, label }) => (
                    <div key={w} className="flex flex-col items-center gap-3">
                      <div
                        className="inline-flex items-center justify-center"
                        style={{
                          width: w,
                          height: w,
                          borderRadius: 'var(--radius-full)',
                          backgroundColor: 'var(--background-primary)',
                          color: 'white',
                          flexShrink: 0,
                        }}
                      >
                        <Icon name="actionSearch/Line" size={24} />
                      </div>
                      <span className="text-xs text-gray-400">{label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                {[
                  { part: 'Container',  desc: 'Fixed square — width and height match the size token (48 or 56 px). border-radius: --radius-full. No padding; icon is centred via flexbox.' },
                  { part: 'Icon slot',  desc: '24 px (--icon-size-medium) centred in the square. Inherits text colour automatically. Hidden during loading.' },
                  { part: 'Spinner',    desc: 'Replaces the icon when loading={true}. Identical 1em spinner as the standard Button — centred in the square.' },
                  { part: 'Focus ring', desc: '2 px --border-info (blue) outline with 2 px offset. Visible only on keyboard focus (:focus-visible). Matches Figma focus ring spec.' },
                ].map((row, i, arr) => (
                  <div key={row.part} className={`flex gap-4 ${i < arr.length - 1 ? 'pb-4 border-b border-gray-100' : ''}`}>
                    <div className="w-28 flex-shrink-0">
                      <span className="text-sm font-semibold text-gray-800">{row.part}</span>
                    </div>
                    <p className="text-sm text-gray-500 leading-relaxed">{row.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Usage ───────────────────────────────────────── */}
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
                    'Always provide a descriptive aria-label — describe the action, not the icon.',
                    'Use universally recognised icons (search, close, settings) so the action is unambiguous.',
                    'Use High for the primary icon action on a surface.',
                    'Pair Medium Outline with a standard Button to add a secondary icon action.',
                    'Use Low Ghost for low-priority icon actions (overflow menus, collapse toggles).',
                    'Use the loading state while async operations triggered by the button are in flight.',
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
                    "Don't omit aria-label — icon-only buttons are inaccessible without it.",
                    "Don't use ambiguous icons (e.g. a star for both \"favourite\" and \"rate\") without a tooltip.",
                    "Don't place multiple High icon buttons side by side — it creates visual ambiguity.",
                    "Don't use icon buttons as the sole navigation mechanism for complex flows.",
                    "Don't rely on colour alone to distinguish icon button variants.",
                    "Don't skip the loading state for async actions — it communicates progress.",
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

          {/* ── Accessibility ────────────────────────────────── */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 text-gray-900">Accessibility</h2>
            <A11yAudit
              items={[
                { criterion: '1.1.1 Non-text Content', level: 'A',   note: 'aria-label is required and must describe the action — "Search", "Close dialog" — not the icon shape.',          status: 'pass' },
                { criterion: '2.1.1 Keyboard',         level: 'A',   note: 'All variants are focusable via Tab and activate on Enter or Space.',                                             status: 'pass' },
                { criterion: '2.4.7 Focus Visible',    level: 'AA',  note: 'Visible focus ring applied on keyboard focus using --border-info (blue, per Figma spec).',                   status: 'pass' },
                { criterion: '4.1.2 Name, Role, Value',level: 'A',   note: 'aria-label provides the accessible name. aria-disabled and aria-busy convey state without removing tab focus.',  status: 'pass' },
                { criterion: '2.5.5 Target Size',      level: 'AAA', note: 'Both sizes (48 × 48 px and 56 × 56 px) exceed the 44 × 44 px minimum touch target.',                           status: 'pass' },
              ]}
            />
            <div className="mt-4">
              <A11yList
                items={[
                  { label: 'aria-label (required)', description: 'Because there is no visible text, aria-label is mandatory on every IconButton. Describe the action performed, not the icon shape — "Close dialog" not "X icon".' },
                  { label: 'Disabled state',        description: 'Sets aria-disabled and cursor: not-allowed. Keeps the button in the tab order while conveying state to screen readers — do not use the HTML disabled attribute.' },
                  { label: 'Loading state',         description: 'Sets aria-busy. The spinner carries role="status" and aria-label="Loading". Consider updating the button\'s own aria-label to describe the pending action.' },
                  { label: 'Tooltip pairing',       description: 'Pair with a tooltip that surfaces the aria-label text on hover and focus — essential for sighted mouse users who may not recognise the icon without a label.' },
                ]}
              />
            </div>
          </div>

          {/* ── Props ────────────────────────────────────────── */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 text-gray-900">Props</h2>
            <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden">
              <div className="grid grid-cols-[130px_200px_80px_1fr] border-b border-gray-100 px-6 py-3 bg-gray-50">
                {['Prop', 'Type', 'Default', 'Description'].map(h => (
                  <div key={h} className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</div>
                ))}
              </div>
              {[
                { prop: 'icon',       type: 'ReactNode',                                                 def: '—',       desc: 'The icon to render. Pass an SVG element sized to 24 px.' },
                { prop: 'variant',    type: '"high" | "mediumOutline" | "mediumBorderlessPrimary" | "mediumBorderlessNeutral" | "lowGhost"', def: '"high"',  desc: 'Emphasis level — identical to the standard Button.' },
                { prop: 'size',       type: '"small" | "medium"',                                         def: '"small"', desc: 'small = 48 × 48 px, medium = 56 × 56 px.' },
                { prop: 'loading',    type: 'boolean',                                                     def: 'false',  desc: 'Show spinner, suppress interaction, set aria-busy.' },
                { prop: 'disabled',   type: 'boolean',                                                     def: 'false',  desc: 'Disable and suppress interaction. Sets aria-disabled.' },
                { prop: 'aria-label', type: 'string',                                                      def: '—',      desc: 'Required. Describes the action for screen readers. No visible text fallback.' },
              ].map((row, i, arr) => (
                <div
                  key={row.prop}
                  className={`grid grid-cols-[130px_200px_80px_1fr] px-6 py-3 items-start gap-4 ${
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
            <p className="text-xs text-gray-400 mt-3">
              All native <code className="font-mono">{'<button>'}</code> attributes (onClick, type, data-*, etc.) are forwarded via rest props.{' '}
              <code className="font-mono">children</code> is intentionally omitted — label text is not rendered in icon-only mode.
            </p>
          </div>

        </div>
      )}

      {/* ── Toggle Button tab ────────────────────────────────── */}
      {pageTab === 'toggleButton' && <ToggleButtonTab />}

    </div>
  );
}
