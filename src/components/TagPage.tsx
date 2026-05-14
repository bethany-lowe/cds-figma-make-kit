import { useState } from 'react';
import { Tag, TagVariant, TagColor, TagSize } from './ui/Tag';
import { useTheme } from '../contexts/ThemeContext';

// ── Colour palette data ───────────────────────────────────────
type ColorMeta = {
  key:    TagColor;
  label:  string;
  token:  string;
};

const COLORS: ColorMeta[] = [
  { key: 'primary',   label: 'Primary',   token: '--color-primary-*'   },
  { key: 'secondary', label: 'Secondary', token: '--color-secondary-*' },
  { key: 'neutral',   label: 'Neutral',   token: '--color-neutral-*'   },
  { key: 'alert',     label: 'Alert',     token: '--color-alert-*'     },
  { key: 'error',     label: 'Error',     token: '--color-error-*'     },
  { key: 'success',   label: 'Success',   token: '--color-success-*'   },
  { key: 'info',      label: 'Info',      token: '--color-info-*'      },
];

// ── Token rows for the design-tokens table ────────────────────
const TOKEN_ROWS = [
  { prop: 'Primary — solid bg',         token: '--background-primary',         swatch: '#4b286d' },
  { prop: 'Primary — subtle bg',        token: '--background-primary-subtle',  swatch: '#f8f0ff' },
  { prop: 'Primary — outline border',   token: '--border-primary',             swatch: '#b287d8' },
  { prop: 'Primary — text',             token: '--text-primary',               swatch: '#4b286d' },

  { prop: 'Secondary — solid bg',       token: '--background-secondary',       swatch: '#2b5e00' },
  { prop: 'Secondary — subtle bg',      token: '--background-secondary-subtle',swatch: '#e3f6d1' },
  { prop: 'Secondary — outline border', token: '--border-secondary',           swatch: '#2b5e00' },
  { prop: 'Secondary — text',           token: '--text-secondary',             swatch: '#2b5e00' },

  { prop: 'Neutral — solid bg',         token: '--background-neutral',         swatch: '#818186' },
  { prop: 'Neutral — subtle bg',        token: '--background-neutral-subtle',  swatch: '#f4f4f7' },
  { prop: 'Neutral — outline border',   token: '--border-neutral',             swatch: '#d0d0d2' },
  { prop: 'Neutral — text',             token: '--text-neutral',               swatch: '#57575b' },

  { prop: 'Alert — solid bg',           token: '--background-alert-bold',      swatch: '#906308' },
  { prop: 'Alert — subtle bg',          token: '--background-alert-subtle',    swatch: '#fff4df' },
  { prop: 'Alert — outline border',     token: '--border-alert-bold',          swatch: '#906308' },
  { prop: 'Alert — text (subtle)',      token: '--text-alert-bold',            swatch: '#563b03' },

  { prop: 'Error — solid bg',           token: '--background-error',           swatch: '#d80b25' },
  { prop: 'Error — subtle bg',          token: '--background-error-subtle',    swatch: '#ffeff1' },
  { prop: 'Error — outline border',     token: '--border-error',               swatch: '#d80b25' },
  { prop: 'Error — text',               token: '--text-error',                 swatch: '#d80b25' },

  { prop: 'Success — solid bg',         token: '--background-success',         swatch: '#00ab0b' },
  { prop: 'Success — subtle bg',        token: '--background-success-subtle',  swatch: '#cfffcf' },
  { prop: 'Success — outline border',   token: '--border-success',             swatch: '#00ab0b' },
  { prop: 'Success — text (subtle)',    token: '--text-success-bold',          swatch: '#005700' },

  { prop: 'Info — solid bg',            token: '--background-info',            swatch: '#006cde' },
  { prop: 'Info — subtle bg',           token: '--background-info-subtle',     swatch: '#e9f5ff' },
  { prop: 'Info — outline border',      token: '--border-info',                swatch: '#006cde' },
  { prop: 'Info — text (subtle)',       token: '--text-info-bold',             swatch: '#003f81' },

  { prop: 'Solid text (all colours)',   token: '--color-base-white',           swatch: '#ffffff' },
  { prop: 'Border radius',              token: '--radius-xsmall',              swatch: null },
  { prop: 'Icon size',                  token: '--icon-size-small',            swatch: null },
  { prop: 'Font size (large)',          token: '--text-size-4',                swatch: null },
  { prop: 'Font size (small)',          token: '--text-size-1',                swatch: null },
  { prop: 'Font weight (large)',        token: '700',                          swatch: null },
  { prop: 'Font weight (small)',        token: '600',                          swatch: null },
];

// ── Copy hook ─────────────────────────────────────────────────
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

// ── Code snippet ──────────────────────────────────────────────
function buildSnippet(variant: TagVariant, color: TagColor, size: TagSize, showIcon: boolean) {
  const lines: string[] = [`<Tag`];
  if (variant !== 'solid')   lines.push(`  variant="${variant}"`);
  if (color   !== 'primary') lines.push(`  color="${color}"`);
  if (size    !== 'large')   lines.push(`  size="${size}"`);
  if (!showIcon)             lines.push(`  icon={null}`);
  lines.push(`>`);
  lines.push(`  Display tag`);
  lines.push(`</Tag>`);
  return lines.join('\n');
}

// ── Pill selector ─────────────────────────────────────────────
function PillSelector<T extends string>({
  label, options, value, onChange,
}: {
  label: string;
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div>
      <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">{label}</div>
      <div className="flex flex-wrap gap-1.5">
        {options.map(opt => (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              value === opt.value
                ? 'bg-gray-900 text-white'
                : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-300'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────
export function TagPage() {
  const { brandFont, brandName } = useTheme();

  const [variant,  setVariant]  = useState<TagVariant>('solid');
  const [color,    setColor]    = useState<TagColor>('primary');
  const [size,     setSize]     = useState<TagSize>('large');
  const [showIcon, setShowIcon] = useState(true);
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');

  const { copied, copy } = useCopy();
  const snippet = buildSnippet(variant, color, size, showIcon);

  return (
    <div>
      {/* ── Header ──────────────────────────────────────────── */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
            Components
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4" style={{ fontFamily: brandFont }}>
            Tag
          </h1>
          <p className="text-base text-gray-600 leading-relaxed max-w-2xl">
            Compact labels that classify, categorise, or annotate content at a glance. The CDS Tag
            offers three visual variants — solid, subtle, and outline — across seven semantic colour
            roles and two sizes, automatically picking up the active brand ({brandName}) palette.
          </p>
        </div>
        <div className="bg-green-50 text-green-700 border border-green-200 px-4 py-1.5 rounded-full text-xs font-semibold flex-shrink-0">
          Ready
        </div>
      </div>

      {/* ── Playground ──────────────────────────────────────── */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-gray-900">Playground</h2>
        <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden">

          {/* Controls */}
          <div className="px-6 py-5 border-b border-gray-100 bg-gray-50 flex flex-wrap gap-6 items-start">
            <PillSelector
              label="Variant"
              value={variant}
              onChange={setVariant}
              options={[
                { value: 'solid',   label: 'Solid' },
                { value: 'subtle',  label: 'Subtle' },
                { value: 'outline', label: 'Outline' },
              ]}
            />
            <PillSelector
              label="Color"
              value={color}
              onChange={setColor}
              options={[
                { value: 'primary',   label: 'Primary' },
                { value: 'secondary', label: 'Secondary' },
                { value: 'neutral',   label: 'Neutral' },
                { value: 'alert',     label: 'Alert' },
                { value: 'error',     label: 'Error' },
                { value: 'success',   label: 'Success' },
                { value: 'info',      label: 'Info' },
              ]}
            />
            <PillSelector
              label="Size"
              value={size}
              onChange={setSize}
              options={[
                { value: 'large', label: 'Large' },
                { value: 'small', label: 'Small' },
              ]}
            />
            <div>
              <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">Options</div>
              <button
                onClick={() => setShowIcon(!showIcon)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  showIcon
                    ? 'bg-gray-900 text-white'
                    : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-300'
                }`}
              >
                Icon
              </button>
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
            <div className="p-12 flex items-center justify-center min-h-40" style={{ backgroundColor: '#f9fafb' }}>
              <Tag variant={variant} color={color} size={size} icon={showIcon ? undefined : null}>
                Display tag
              </Tag>
            </div>
          ) : (
            <div className="relative bg-gray-950">
              <pre className="text-sm text-green-400 p-6 overflow-x-auto font-mono leading-relaxed">
                {snippet}
              </pre>
              <button
                onClick={() => copy(snippet)}
                className="absolute top-4 right-4 px-3 py-1.5 rounded-lg text-xs font-medium bg-white/10 text-white hover:bg-white/20 transition-colors"
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ── Colour & variant showcase ────────────────────────── */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-2 text-gray-900">Colours &amp; variants</h2>
        <p className="text-sm text-gray-500 mb-6 leading-relaxed">
          All seven semantic colour roles across the three variants. Both sizes are shown side-by-side.
        </p>

        <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-[140px_1fr_1fr_1fr] border-b border-gray-100 px-6 py-3 bg-gray-50">
            {['Colour role', 'Solid', 'Subtle', 'Outline'].map(h => (
              <div key={h} className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</div>
            ))}
          </div>

          {COLORS.map((c, i) => (
            <div
              key={c.key}
              className={`grid grid-cols-[140px_1fr_1fr_1fr] items-center gap-4 px-6 py-4 hover:bg-gray-50 transition-colors ${
                i < COLORS.length - 1 ? 'border-b border-gray-100' : ''
              }`}
            >
              <div>
                <p className="text-sm font-medium text-gray-700">{c.label}</p>
                <p className="text-[11px] text-gray-400 font-mono mt-0.5">{c.token}</p>
              </div>

              <div className="flex items-center gap-3">
                <Tag variant="solid" color={c.key} size="large">Display tag</Tag>
                <Tag variant="solid" color={c.key} size="small">Display tag</Tag>
              </div>

              <div className="flex items-center gap-3">
                <Tag variant="subtle" color={c.key} size="large">Display tag</Tag>
                <Tag variant="subtle" color={c.key} size="small">Display tag</Tag>
              </div>

              <div className="flex items-center gap-3">
                <Tag variant="outline" color={c.key} size="large">Display tag</Tag>
                <Tag variant="outline" color={c.key} size="small">Display tag</Tag>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Sizes ───────────────────────────────────────────── */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-2 text-gray-900">Sizes</h2>
        <p className="text-sm text-gray-500 mb-6 leading-relaxed">
          Two sizes to match different information densities. Use <strong>large</strong> for primary
          metadata; use <strong>small</strong> in dense tables, lists, or inline with body text.
        </p>

        <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden">
          <div className="grid grid-cols-[120px_80px_80px_1fr] border-b border-gray-100 px-6 py-3 bg-gray-50">
            {['Size', 'Height', 'Font', 'Example'].map(h => (
              <div key={h} className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</div>
            ))}
          </div>
          {[
            { size: 'large' as TagSize, height: '24 px', font: '14 px / 700' },
            { size: 'small' as TagSize, height: '17 px', font: '11 px / 600' },
          ].map((row, i, arr) => (
            <div
              key={row.size}
              className={`grid grid-cols-[120px_80px_80px_1fr] items-center gap-4 px-6 py-5 hover:bg-gray-50 transition-colors ${
                i < arr.length - 1 ? 'border-b border-gray-100' : ''
              }`}
            >
              <code className="text-sm font-mono text-gray-800">{row.size}</code>
              <span className="text-sm text-gray-500">{row.height}</span>
              <span className="text-sm text-gray-500">{row.font}</span>
              <div className="flex items-center gap-4">
                <Tag variant="solid"   color="primary" size={row.size}>Display tag</Tag>
                <Tag variant="subtle"  color="info"    size={row.size}>Display tag</Tag>
                <Tag variant="outline" color="error"   size={row.size}>Display tag</Tag>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Design tokens ────────────────────────────────────── */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-2 text-gray-900">Design tokens</h2>
        <p className="text-sm text-gray-500 mb-6 leading-relaxed">
          Every colour, spacing, and typography value is consumed from a <code className="font-mono">--*</code> token.
          Each colour role exposes four token slots: solid bg, subtle bg, border, and text.
        </p>

        <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden">
          <div className="grid grid-cols-[1fr_220px_40px] border-b border-gray-100 px-6 py-3 bg-gray-50">
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Property</div>
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Token</div>
            <div />
          </div>
          {TOKEN_ROWS.map((row, i) => (
            <div
              key={row.prop}
              className={`grid grid-cols-[1fr_220px_40px] items-center px-6 py-3 hover:bg-gray-50 transition-colors ${
                i < TOKEN_ROWS.length - 1 ? 'border-b border-gray-100' : ''
              }`}
            >
              <span className="text-sm text-gray-600">{row.prop}</span>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-mono text-gray-600">{row.token}</span>
              {row.swatch ? (
                <span
                  className="inline-block w-5 h-5 rounded border border-gray-200 flex-shrink-0"
                  style={{ backgroundColor: row.swatch }}
                />
              ) : (
                <span />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── Accessibility ────────────────────────────────────── */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-gray-900">Accessibility</h2>
        <div className="bg-white border border-gray-200 rounded-3xl p-8">
          <ul className="space-y-4">
            {[
              { label: 'Semantics',       text: 'Tag renders as a <span> — non-interactive by default. If a tag triggers an action (e.g. dismiss), wrap it in a <button> and add an aria-label.' },
              { label: 'Colour contrast', text: 'All solid and outline token combinations meet WCAG AA 4.5:1 for text on their backgrounds. Subtle variants use dark text on pale backgrounds for the same compliance.' },
              { label: 'Don\'t rely on colour alone', text: 'Always pair a colour role with a meaningful text label. Never use colour as the sole differentiator between tag types.' },
              { label: 'Icon-only tags',  text: 'Tags always include a visible text label. If used without text, ensure the parent carries a meaningful aria-label for screen-reader users.' },
              { label: 'Keyboard',        text: 'Tags are not focusable by default. If implemented as interactive elements (e.g. filterable chips), ensure Tab focus, Enter/Space activation, and a visible focus ring.' },
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 bg-gray-900 rounded-full mt-2 flex-shrink-0" />
                <div>
                  <strong className="text-sm font-semibold text-gray-900">{item.label}: </strong>
                  <span className="text-sm text-gray-600">{item.text}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── Props reference ──────────────────────────────────── */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-gray-900">Props</h2>
        <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden">
          <div className="grid grid-cols-[120px_1fr_90px_1fr] border-b border-gray-100 px-6 py-3 bg-gray-50">
            {['Prop', 'Type', 'Default', 'Description'].map(h => (
              <div key={h} className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</div>
            ))}
          </div>
          {[
            {
              prop: 'variant',
              type: '"solid" | "subtle" | "outline"',
              def:  '"solid"',
              desc: 'Visual style: filled, tinted background, or transparent with border.',
            },
            {
              prop: 'color',
              type: '"primary" | "secondary" | "neutral" | "alert" | "error" | "success" | "info"',
              def:  '"primary"',
              desc: 'Semantic colour role — maps directly to a CDS token group.',
            },
            {
              prop: 'size',
              type: '"large" | "small"',
              def:  '"large"',
              desc: 'Size scale. large = 14 px / 700 weight. small = 11 px / 600 weight.',
            },
            {
              prop: 'icon',
              type: 'ReactNode | null',
              def:  'actionHeart/Solid',
              desc: 'Icon before the label (from the CDS icon library, 16 px via --icon-size-small). Pass null to suppress.',
            },
            {
              prop: 'children',
              type: 'ReactNode',
              def:  '—',
              desc: 'Tag label text.',
            },
            {
              prop: 'className',
              type: 'string',
              def:  '""',
              desc: 'Extra class names on the wrapper <span>.',
            },
          ].map((row, i, arr) => (
            <div
              key={row.prop}
              className={`grid grid-cols-[120px_1fr_90px_1fr] px-6 py-3 items-start gap-4 hover:bg-gray-50 transition-colors ${
                i < arr.length - 1 ? 'border-b border-gray-100' : ''
              }`}
            >
              <code className="text-sm font-mono text-gray-800">{row.prop}</code>
              <code className="text-xs font-mono text-gray-500 break-words">{row.type}</code>
              <code className="text-sm font-mono text-gray-400">{row.def}</code>
              <span className="text-sm text-gray-600">{row.desc}</span>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-400 mt-3">
          All native <code className="font-mono">{'<span>'}</code> attributes are forwarded via rest props.
        </p>
      </div>
    </div>
  );
}

export default TagPage;