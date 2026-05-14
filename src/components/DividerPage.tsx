import { useState } from 'react';
import { Divider, type DividerOrientation, type DividerWeight, type DividerSpacing, type DividerEmphasis } from './ui/Divider';
import { useTheme } from '../contexts/ThemeContext';

// ── Static data ───────────────────────────────────────────────

const TOKEN_ROWS = [
  { prop: 'Line color — low',             token: '--border-neutral-subtle',   note: 'Lightest rule; recedes into the background'            },
  { prop: 'Line color — default',         token: '--border-neutral',          note: 'Standard neutral border; adapts to the active brand'   },
  { prop: 'Line color — high',            token: '--border-neutral-bold',     note: 'Dark rule; strong structural separation'               },
  { prop: 'Weight — hairline',            token: '--border-width-hairline',   note: 'Finest line, ~0.5 px on most displays'                 },
  { prop: 'Weight — thin (default)',      token: '--border-width-thin',       note: '1 px baseline stroke'                                  },
  { prop: 'Weight — thick',              token: '--border-width-thick',      note: 'Emphasis stroke, ~2 px'                                },
  { prop: 'Spacing — small (± margin)',  token: '--space-small',             note: 'Top + bottom (H) or left + right (V)'                  },
  { prop: 'Spacing — medium (± margin)', token: '--space-large',             note: 'Default. Generous breathing room'                      },
  { prop: 'Spacing — large (± margin)',  token: '--space-xlarge',            note: 'Section-level separation'                              },
  { prop: 'Label padding (horizontal)',  token: '--space-medium',            note: 'Gap between label text and each line segment'          },
  { prop: 'Label padding (vertical)',    token: '--space-medium',            note: 'Gap above and below rotated label text'                },
  { prop: 'Label font size',             token: '--text-size-2',             note: 'Small body scale (12 px)'                              },
  { prop: 'Label font weight',           token: '600',                       note: 'Slightly heavier than surrounding body copy'           },
  { prop: 'Label line height',           token: '--line-height-2',           note: 'Matches small body rhythm (16 px)'                     },
  { prop: 'Label color',                 token: '--text-neutral',            note: 'Mid-tone neutral; recedes behind primary content'      },
  { prop: 'Font family',                 token: '--platform-font-default',   note: 'Inherits the active brand typeface'                    },
];

// ── Helpers ───────────────────────────────────────────────────

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

function buildSnippet({
  orientation, weight, spacing, emphasis, label,
}: {
  orientation: DividerOrientation;
  weight:      DividerWeight;
  spacing:     DividerSpacing;
  emphasis:    DividerEmphasis;
  label:       string;
}) {
  const lines: string[] = ['<Divider'];
  if (orientation !== 'horizontal') lines.push(`  orientation="${orientation}"`);
  if (weight      !== 'thin')       lines.push(`  weight="${weight}"`);
  if (spacing     !== 'medium')     lines.push(`  spacing="${spacing}"`);
  if (emphasis    !== 'default')    lines.push(`  emphasis="${emphasis}"`);
  if (label)                        lines.push(`  label="${label}"`);
  lines.push('/>');
  return lines.join('\n');
}

// ── Sub-components ────────────────────────────────────────────

function PillSelector<T extends string>({
  label, options, value, onChange,
}: {
  label:    string;
  options:  { value: T; label: string }[];
  value:    T;
  onChange: (v: T) => void;
}) {
  return (
    <div>
      <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">
        {label}
      </div>
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

export function DividerPage() {
  const { brandFont, brandName } = useTheme();

  const [playOrientation, setPlayOrientation] = useState<DividerOrientation>('horizontal');
  const [playWeight,      setPlayWeight]      = useState<DividerWeight>('thin');
  const [playSpacing,     setPlaySpacing]     = useState<DividerSpacing>('medium');
  const [playEmphasis,    setPlayEmphasis]    = useState<DividerEmphasis>('default');
  const [playLabel,       setPlayLabel]       = useState('');
  const [activeTab,       setActiveTab]       = useState<'preview' | 'code'>('preview');

  const { copied, copy } = useCopy();
  const snippet = buildSnippet({
    orientation: playOrientation,
    weight:      playWeight,
    spacing:     playSpacing,
    emphasis:    playEmphasis,
    label:       playLabel,
  });

  return (
    <div>
      {/* ── Header ──────────────────────────────────────────── */}
      <div className="flex items-start justify-between mb-12">
        <div>
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
            Components
          </div>
          <h1
            className="text-5xl font-bold text-gray-900 mb-4"
            style={{ fontFamily: brandFont }}
          >
            Divider
          </h1>
          <p className="text-base text-gray-600 leading-relaxed max-w-2xl">
            A structural rule that separates content regions — horizontally between stacked
            sections, or vertically between side-by-side elements. Supports three{' '}
            <code className="font-mono">weight</code>s, four{' '}
            <code className="font-mono">spacing</code> sizes, three{' '}
            <code className="font-mono">emphasis</code> levels, and an optional centred{' '}
            <code className="font-mono">label</code>. Every colour, weight, spacing, and
            typography value is driven by{' '}
            <code className="font-mono">--*</code> tokens and adapts to the active{' '}
            {brandName} brand palette.
          </p>
        </div>
        <div className="bg-green-50 text-green-700 border border-green-200 px-4 py-1.5 rounded-full text-xs font-semibold flex-shrink-0">
          Ready
        </div>
      </div>

      {/* ── Playground ──────────────────────────────────────── */}
      <div className="mb-20">
        <h2 className="text-2xl font-semibold mb-2 text-gray-900">Playground</h2>
        <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden">

          {/* Controls */}
          <div className="px-6 py-5 border-b border-gray-100 bg-gray-50 flex flex-wrap gap-6 items-start">
            <PillSelector
              label="Orientation"
              value={playOrientation}
              onChange={setPlayOrientation}
              options={[
                { value: 'horizontal', label: 'Horizontal' },
                { value: 'vertical',   label: 'Vertical'   },
              ]}
            />
            <PillSelector
              label="Weight"
              value={playWeight}
              onChange={setPlayWeight}
              options={[
                { value: 'hairline', label: 'Hairline' },
                { value: 'thin',     label: 'Thin'     },
                { value: 'thick',    label: 'Thick'    },
              ]}
            />
            <PillSelector
              label="Spacing"
              value={playSpacing}
              onChange={setPlaySpacing}
              options={[
                { value: 'none',   label: 'None'   },
                { value: 'small',  label: 'Small'  },
                { value: 'medium', label: 'Medium' },
                { value: 'large',  label: 'Large'  },
              ]}
            />
            <PillSelector
              label="Emphasis"
              value={playEmphasis}
              onChange={setPlayEmphasis}
              options={[
                { value: 'low',     label: 'Low'     },
                { value: 'default', label: 'Default' },
                { value: 'high',    label: 'High'    },
              ]}
            />
            <div>
              <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Label
              </div>
              <input
                type="text"
                value={playLabel}
                onChange={e => setPlayLabel(e.target.value)}
                className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs text-gray-700 bg-white focus:outline-none focus:border-gray-400 w-48"
                placeholder="or"
              />
            </div>
          </div>

          {/* Tabs */}
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
              className="px-12 py-10 flex items-center justify-center min-h-48"
              style={{ backgroundColor: '#f9fafb' }}
            >
              {playOrientation === 'horizontal' ? (
                <div className="w-full max-w-sm">
                  <Divider
                    orientation={playOrientation}
                    weight={playWeight}
                    spacing="none"
                    emphasis={playEmphasis}
                    label={playLabel || undefined}
                  />
                </div>
              ) : (
                <div className="flex items-stretch h-24">
                  <div className="text-xs text-gray-400 flex items-center px-4">Left panel</div>
                  <Divider
                    orientation="vertical"
                    weight={playWeight}
                    spacing="none"
                    emphasis={playEmphasis}
                    label={playLabel || undefined}
                  />
                  <div className="text-xs text-gray-400 flex items-center px-4">Right panel</div>
                </div>
              )}
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

      {/* ── Orientation ─────────────────────────────────────── */}
      <div className="mb-20">
        <h2 className="text-2xl font-semibold mb-2 text-gray-900">Orientation</h2>
        <p className="text-sm text-gray-500 mb-6 leading-relaxed">
          The <code className="font-mono">orientation</code> prop switches between a full-width
          horizontal rule and a self-stretching vertical rule. When set to{' '}
          <code className="font-mono">"vertical"</code> the divider renders as{' '}
          <code className="font-mono">inline-flex</code> with{' '}
          <code className="font-mono">align-self: stretch</code>, so it fills the height of its
          flex container automatically.
        </p>
        <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden">
          <div className="px-6 py-8 border-b border-gray-100">
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-5">Horizontal</div>
            <div className="space-y-4">
              <p className="text-sm text-gray-500">Section above</p>
              <Divider spacing="none" />
              <p className="text-sm text-gray-500">Section below</p>
            </div>
          </div>
          <div className="px-6 py-8">
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-5">Vertical</div>
            <div className="flex items-stretch h-16 bg-gray-50 rounded-2xl overflow-hidden">
              <div className="flex items-center px-6 text-sm text-gray-500">Left panel</div>
              <Divider orientation="vertical" spacing="none" />
              <div className="flex items-center px-6 text-sm text-gray-500">Middle panel</div>
              <Divider orientation="vertical" spacing="none" />
              <div className="flex items-center px-6 text-sm text-gray-500">Right panel</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Emphasis ────────────────────────────────────────── */}
      <div className="mb-20">
        <h2 className="text-2xl font-semibold mb-2 text-gray-900">Emphasis</h2>
        <p className="text-sm text-gray-500 mb-6 leading-relaxed">
          The <code className="font-mono">emphasis</code> prop shifts the line colour along the
          neutral border token scale. Use <code className="font-mono">low</code> (
          <code className="font-mono">--border-neutral-subtle</code>) for supporting
          structure inside dense layouts, <code className="font-mono">default</code> (
          <code className="font-mono">--border-neutral</code>) for general-purpose
          separation, and <code className="font-mono">high</code> (
          <code className="font-mono">--border-neutral-bold</code>) when the divider needs
          to stand out against a busy or coloured background.
        </p>
        <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden">
          {([
            { value: 'low'     as DividerEmphasis, label: 'Low',     token: '--border-neutral-subtle', note: 'Subtle tint for inline structure'       },
            { value: 'default' as DividerEmphasis, label: 'Default', token: '--border-neutral',        note: 'Standard rule, works in most contexts'  },
            { value: 'high'    as DividerEmphasis, label: 'High',    token: '--border-neutral-bold',   note: 'Bold line for strong visual separation' },
          ]).map((row, i, arr) => (
            <div
              key={row.value}
              className={`px-6 py-6 hover:bg-gray-50 transition-colors ${
                i < arr.length - 1 ? 'border-b border-gray-100' : ''
              }`}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs font-semibold text-gray-700 w-14">{row.label}</span>
                <code className="text-xs font-mono text-gray-400">{row.token}</code>
                <span className="text-xs text-gray-300 mx-1">—</span>
                <span className="text-xs text-gray-400">{row.note}</span>
              </div>
              <Divider emphasis={row.value} spacing="none" />
            </div>
          ))}
        </div>
      </div>

      {/* ── Weights ─────────────────────────────────────────── */}
      <div className="mb-20">
        <h2 className="text-2xl font-semibold mb-2 text-gray-900">Weights</h2>
        <p className="text-sm text-gray-500 mb-6 leading-relaxed">
          The <code className="font-mono">weight</code> prop maps to the{' '}
          <code className="font-mono">--border-width-*</code> token tier.{' '}
          <code className="font-mono">hairline</code> is the finest, <code className="font-mono">thin</code> is the
          default 1 px separator, and <code className="font-mono">thick</code> is for structural emphasis.
        </p>
        <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden">
          {(['hairline', 'thin', 'thick'] as DividerWeight[]).map((w, i, arr) => (
            <div
              key={w}
              className={`flex items-center gap-8 px-6 py-6 hover:bg-gray-50 transition-colors ${
                i < arr.length - 1 ? 'border-b border-gray-100' : ''
              }`}
            >
              <code className="text-xs font-mono text-gray-400 w-16 flex-shrink-0 capitalize">{w}</code>
              <div className="flex-1"><Divider weight={w} spacing="none" /></div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Spacing ─────────────────────────────────────────── */}
      <div className="mb-20">
        <h2 className="text-2xl font-semibold mb-2 text-gray-900">Spacing</h2>
        <p className="text-sm text-gray-500 mb-6 leading-relaxed">
          The <code className="font-mono">spacing</code> prop adds equal margin on both sides —
          top/bottom for horizontal, left/right for vertical. Each size maps to a{' '}
          <code className="font-mono">--space-*</code> token.{' '}
          <code className="font-mono">none</code> removes all margin.
        </p>
        <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden">
          {([
            { value: 'none',   token: '0'               },
            { value: 'small',  token: '--space-small'   },
            { value: 'medium', token: '--space-large'   },
            { value: 'large',  token: '--space-xlarge'  },
          ] as { value: DividerSpacing; token: string }[]).map((s, i, arr) => (
            <div
              key={s.value}
              className={`hover:bg-gray-50 transition-colors ${i < arr.length - 1 ? 'border-b border-gray-100' : ''}`}
            >
              <div className="flex items-center gap-4 px-6 pt-4">
                <code className="text-xs font-mono text-gray-400 w-16 flex-shrink-0 capitalize">{s.value}</code>
                <code className="text-xs font-mono text-gray-300">{s.token}</code>
              </div>
              <div className="px-6 pb-4">
                <Divider spacing={s.value} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── With label ──────────────────────────────────────── */}
      <div className="mb-20">
        <h2 className="text-2xl font-semibold mb-2 text-gray-900">With label</h2>
        <p className="text-sm text-gray-500 mb-6 leading-relaxed">
          Pass a <code className="font-mono">label</code> string to split the rule into two
          segments with text centred between them. Common uses include "or" separators in forms,
          section headings inside card bodies, and timeline markers. The label uses{' '}
          <code className="font-mono">--text-size-2</code> / <code className="font-mono">--line-height-2</code> tokens and{' '}
          <code className="font-mono">--text-neutral</code>.
        </p>
        <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden">
          {[
            { label: 'or',                 note: 'Sign-in / sign-up form separator'  },
            { label: 'Continue reading',   note: 'Article section break'             },
            { label: 'More options below', note: 'Progressive disclosure hint'       },
          ].map((row, i, arr) => (
            <div
              key={row.label}
              className={`px-6 py-6 hover:bg-gray-50 transition-colors ${i < arr.length - 1 ? 'border-b border-gray-100' : ''}`}
            >
              <div className="text-xs text-gray-400 mb-3 font-mono">{row.note}</div>
              <Divider label={row.label} spacing="none" />
            </div>
          ))}
          <div className="px-6 py-6 border-t border-gray-100 hover:bg-gray-50 transition-colors">
            <div className="text-xs text-gray-400 mb-3 font-mono">Vertical with label</div>
            <div className="flex items-stretch h-24 bg-gray-50 rounded-2xl overflow-hidden">
              <div className="flex items-center px-6 text-sm text-gray-500">Section A</div>
              <Divider orientation="vertical" label="or" spacing="none" />
              <div className="flex items-center px-6 text-sm text-gray-500">Section B</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Design tokens ───────────────────────────────────── */}
      <div className="mb-20">
        <h2 className="text-2xl font-semibold mb-2 text-gray-900">Design tokens</h2>
        <p className="text-sm text-gray-500 mb-6 leading-relaxed">
          Every colour, border width, spacing, and typography value is resolved through a{' '}
          <code className="font-mono">--*</code> token. Switching brands in the theme picker
          updates all values simultaneously with zero component code changes.
        </p>
        <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden">
          <div className="grid grid-cols-[1fr_300px_1fr] border-b border-gray-100 px-6 py-3 bg-gray-50">
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Property</div>
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Token</div>
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Note</div>
          </div>
          {TOKEN_ROWS.map((row, i) => (
            <div
              key={row.prop}
              className={`grid grid-cols-[1fr_300px_1fr] items-center px-6 py-3 hover:bg-gray-50 transition-colors ${
                i < TOKEN_ROWS.length - 1 ? 'border-b border-gray-100' : ''
              }`}
            >
              <span className="text-sm text-gray-600">{row.prop}</span>
              <code className="text-sm font-mono text-gray-700">{row.token}</code>
              <span className="text-sm text-gray-400">{row.note}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Accessibility ────────────────────────────────────── */}
      <div className="mb-20">
        <h2 className="text-2xl font-semibold mb-6 text-gray-900">Accessibility</h2>
        <div className="bg-white border border-gray-200 rounded-3xl p-8">
          <ul className="space-y-4">
            {[
              {
                label: 'Semantic role',
                text:  'The root element carries role="separator" and aria-orientation set to the active orientation. Screen readers announce it as a thematic break.',
              },
              {
                label: 'Decorative lines hidden',
                text:  'Each line segment carries aria-hidden="true". Only the role="separator" and its label (if present) are surfaced to assistive technology.',
              },
              {
                label: 'Label legibility',
                text:  'Labels should be short, meaningful phrases. Screen readers read the label as part of the separator context. Avoid purely decorative labels without an accompanying aria-label on the parent region.',
              },
              {
                label: 'Colour contrast',
                text:  '--border-neutral-subtle (Low) still satisfies the WCAG 2.2 non-text contrast requirement of 3:1 against --background-app. --border-neutral-bold (High) exceeds this comfortably. Label text uses --text-neutral which meets 4.5:1 against white backgrounds.',
              },
              {
                label: 'Do not convey meaning through the divider alone',
                text:  'Visual separation is a layout aid, not an information carrier. Communicate meaningful state changes through headings or instructional text alongside the divider.',
              },
            ].map(item => (
              <li key={item.label} className="flex gap-4">
                <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-gray-300 mt-2" />
                <div>
                  <span className="text-sm font-semibold text-gray-700">{item.label} — </span>
                  <span className="text-sm text-gray-500 leading-relaxed">{item.text}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── Usage guidelines ─────────────────────────────────── */}
      <div className="mb-20">
        <h2 className="text-2xl font-semibold mb-6 text-gray-900">Usage guidelines</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white border border-gray-200 rounded-3xl p-6">
            <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 border border-green-200 px-3 py-1 rounded-full text-xs font-semibold mb-4">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                <circle cx="5" cy="5" r="5" fill="currentColor" opacity=".15" />
                <path d="M2.5 5l1.8 1.8 3.2-3.6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Do
            </div>
            <ul className="space-y-3">
              {[
                'Use emphasis="low" inside dense card bodies where a subtle structural cue is enough.',
                'Use emphasis="high" when the divider sits against a coloured or media background.',
                'Prefer spacing="medium" (default) for general-purpose section separation.',
                'Use orientation="vertical" inside flex rows to separate side-by-side panels.',
                'Use spacing="none" when the parent already manages gaps via CSS gap or padding.',
              ].map(text => (
                <li key={text} className="flex gap-3 text-sm text-gray-600">
                  <span className="mt-1 flex-shrink-0 text-green-500">✓</span>
                  {text}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white border border-gray-200 rounded-3xl p-6">
            <div className="inline-flex items-center gap-2 bg-red-50 text-red-600 border border-red-200 px-3 py-1 rounded-full text-xs font-semibold mb-4">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                <circle cx="5" cy="5" r="5" fill="currentColor" opacity=".15" />
                <path d="M3 3l4 4M7 3l-4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
              </svg>
              Don't
            </div>
            <ul className="space-y-3">
              {[
                "Don't stack multiple dividers between the same pair of elements — use spacing tokens on the parent instead.",
                "Don't use a divider as a substitute for a heading or landmark; it provides no semantic hierarchy.",
                "Don't apply custom border colours inline — override tokens in tokens.css instead.",
                "Don't combine emphasis=\"low\" with weight=\"hairline\" on light backgrounds; the line may become imperceptible.",
                "Don't place a labelled vertical divider without testing writing-mode rendering across target browsers.",
              ].map(text => (
                <li key={text} className="flex gap-3 text-sm text-gray-600">
                  <span className="mt-1 flex-shrink-0 text-red-400">✕</span>
                  {text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}