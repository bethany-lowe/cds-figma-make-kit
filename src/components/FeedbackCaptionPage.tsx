import { useState } from 'react';
import { FeedbackCaption, FeedbackCaptionVariant } from './ui/FeedbackCaption';
import { useTheme } from '../contexts/ThemeContext';

// ── Variant showcase ──────────────────────────────────────────
const VARIANT_ROWS: {
  variant:     FeedbackCaptionVariant;
  label:       string;
  icon:        string;
  iconToken:   string;
  textToken:   string;
  description: string;
}[] = [
  {
    variant:     'info',
    label:       'Info',
    icon:        'actionInfo/Solid',
    iconToken:   '--icon-primary',
    textToken:   '--text-neutral-bold',
    description: 'Additional context or helpful guidance. Neutral in tone.',
  },
  {
    variant:     'success',
    label:       'Success',
    icon:        'abstractSuccess/Solid',
    iconToken:   '--icon-success',
    textToken:   '--text-success-bold',
    description: 'Confirms a completed action or valid input.',
  },
  {
    variant:     'error',
    label:       'Error',
    icon:        'abstractWarning/Solid',
    iconToken:   '--icon-error',
    textToken:   '--text-error',
    description: 'Signals a problem, invalid input, or failed action.',
  },
];

// ── Design token rows ─────────────────────────────────────────
const TOKEN_ROWS = [
  { prop: 'Info — icon colour',     token: '--icon-primary',          note: 'Primary purple'             },
  { prop: 'Info — text colour',     token: '--text-neutral-bold',     note: 'Neutral dark / black'       },
  { prop: 'Success — icon colour',  token: '--icon-success',          note: 'Success green'              },
  { prop: 'Success — text colour',  token: '--text-success-bold',     note: 'Success dark green #005700' },
  { prop: 'Error — icon colour',    token: '--icon-error',            note: 'Error red'                  },
  { prop: 'Error — text colour',    token: '--text-error',            note: 'Error pure red   #d80b25'   },
  { prop: 'Gap (icon ↔ text)',       token: '--space-xsmall',          note: '4 px'                       },
  { prop: 'Icon size',              token: '--icon-size-small',       note: '16 px'                      },
  { prop: 'Font size',              token: '--text-size-2',           note: '12 px'                      },
  { prop: 'Line height',            token: '--line-height-2',         note: '16 px'                      },
  { prop: 'Font weight',            token: '400',                     note: 'Regular'                    },
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
function buildSnippet(variant: FeedbackCaptionVariant, message: string) {
  const lines = ['<FeedbackCaption'];
  if (variant !== 'info') lines.push(`  variant="${variant}"`);
  lines.push('>');
  lines.push(`  ${message || 'Important information.'}`);
  lines.push('</FeedbackCaption>');
  return lines.join('\n');
}

// ── Pill selector ─────────────────────────────────────────────
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
export function FeedbackCaptionPage() {
  const { brandFont, brandName } = useTheme();

  // Playground state
  const [playVariant, setPlayVariant] = useState<FeedbackCaptionVariant>('info');
  const [playMessage, setPlayMessage] = useState('Important information.');
  const [activeTab,   setActiveTab]   = useState<'preview' | 'code'>('preview');

  const { copied, copy } = useCopy();
  const snippet = buildSnippet(playVariant, playMessage);

  return (
    <div>
      {/* ── Header ──────────────────────────────────────────── */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
            Components
          </div>
          <h1
            className="text-5xl font-bold text-gray-900 mb-4"
            style={{ fontFamily: brandFont }}
          >
            Feedback Caption
          </h1>
          <p className="text-base text-gray-600 leading-relaxed max-w-2xl">
            A compact inline message that pairs a semantic icon with a short text string to
            communicate status to the user. Three variants — <strong>info</strong>,{' '}
            <strong>success</strong>, and <strong>error</strong> — are each driven by dedicated{' '}
            <code className="font-mono">--icon-*</code> and{' '}
            <code className="font-mono">--text-*</code> semantic tokens so they adapt
            automatically to the active {brandName} brand palette.
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
              value={playVariant}
              onChange={setPlayVariant}
              options={[
                { value: 'info',    label: 'Info'    },
                { value: 'success', label: 'Success' },
                { value: 'error',   label: 'Error'   },
              ]}
            />
            {/* Editable message */}
            <div>
              <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Message
              </div>
              <input
                type="text"
                value={playMessage}
                onChange={e => setPlayMessage(e.target.value)}
                className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs text-gray-700 bg-white focus:outline-none focus:border-gray-400 w-56"
                placeholder="Important information."
              />
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
              className="p-12 flex items-center justify-center min-h-40"
              style={{ backgroundColor: '#f9fafb' }}
            >
              <FeedbackCaption variant={playVariant}>
                {playMessage || 'Important information.'}
              </FeedbackCaption>
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

      {/* ── Variants ────────────────────────────────────────── */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-2 text-gray-900">Variants</h2>
        <p className="text-sm text-gray-500 mb-6 leading-relaxed">
          Each variant maps to a dedicated pair of semantic icon and text colour tokens. Switching
          the theme in the top-right switcher updates all token values simultaneously.
        </p>

        <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-[100px_180px_1fr_160px_160px] border-b border-gray-100 px-6 py-3 bg-gray-50">
            {['Variant', 'Preview', 'Description', 'Icon token', 'Text token'].map(h => (
              <div key={h} className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                {h}
              </div>
            ))}
          </div>

          {VARIANT_ROWS.map((row, i) => (
            <div
              key={row.variant}
              className={`grid grid-cols-[100px_180px_1fr_160px_160px] items-start gap-4 px-6 py-5 hover:bg-gray-50 transition-colors ${
                i < VARIANT_ROWS.length - 1 ? 'border-b border-gray-100' : ''
              }`}
            >
              {/* Variant label */}
              <div className="flex items-center pt-0.5">
                <span className="text-sm font-medium text-gray-700 capitalize">{row.label}</span>
              </div>

              {/* Live preview */}
              <div className="pt-0.5">
                <FeedbackCaption variant={row.variant}>
                  Important information.
                </FeedbackCaption>
              </div>

              {/* Description */}
              <span className="text-sm text-gray-500 leading-relaxed">{row.description}</span>

              {/* Icon token */}
              <code className="text-xs font-mono text-gray-600 break-all leading-relaxed">
                {row.iconToken}
              </code>

              {/* Text token */}
              <code className="text-xs font-mono text-gray-600 break-all leading-relaxed">
                {row.textToken}
              </code>
            </div>
          ))}
        </div>
      </div>

      {/* ── Usage examples ───────────────────────────────────── */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-2 text-gray-900">Usage</h2>
        <p className="text-sm text-gray-500 mb-6 leading-relaxed">
          Feedback Caption is designed to appear directly below an input field, selector, or form
          control. It communicates validation state or contextual hints at a glance.
        </p>

        <div className="bg-white border border-gray-200 rounded-3xl p-8 space-y-8">
          {/* Inline form example */}
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
              With a form field
            </p>
            <div className="flex flex-col gap-6 max-w-xs">
              {/* Email — success */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-700">Email address</label>
                <div className="flex items-center border border-green-400 rounded-lg px-3 py-2 bg-white">
                  <span className="text-sm text-gray-900">alex@example.com</span>
                </div>
                <FeedbackCaption variant="success">Email address confirmed.</FeedbackCaption>
              </div>

              {/* Password — error */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-700">Password</label>
                <div className="flex items-center border border-red-400 rounded-lg px-3 py-2 bg-white">
                  <span className="text-sm text-gray-400">••••••</span>
                </div>
                <FeedbackCaption variant="error">
                  Password must be at least 8 characters.
                </FeedbackCaption>
              </div>

              {/* Username — info */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-700">Username</label>
                <div className="flex items-center border border-gray-200 rounded-lg px-3 py-2 bg-white">
                  <span className="text-sm text-gray-400">Enter username…</span>
                </div>
                <FeedbackCaption variant="info">
                  Username must be unique across all accounts.
                </FeedbackCaption>
              </div>
            </div>
          </div>

          {/* All three together */}
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
              All variants
            </p>
            <div className="flex flex-col gap-3">
              <FeedbackCaption variant="info">Important information.</FeedbackCaption>
              <FeedbackCaption variant="success">Important information.</FeedbackCaption>
              <FeedbackCaption variant="error">Important information.</FeedbackCaption>
            </div>
          </div>
        </div>
      </div>

      {/* ── Design tokens ────────────────────────────────────── */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-2 text-gray-900">Design tokens</h2>
        <p className="text-sm text-gray-500 mb-6 leading-relaxed">
          Every colour, spacing, icon size, and typography value is driven by a{' '}
          <code className="font-mono">--*</code> token. Switching brands updates all values
          simultaneously with no component code changes.
        </p>

        <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden">
          <div className="grid grid-cols-[1fr_240px_1fr] border-b border-gray-100 px-6 py-3 bg-gray-50">
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Property</div>
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Token</div>
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Note</div>
          </div>
          {TOKEN_ROWS.map((row, i) => (
            <div
              key={row.prop}
              className={`grid grid-cols-[1fr_240px_1fr] items-center px-6 py-3 hover:bg-gray-50 transition-colors ${
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
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-gray-900">Accessibility</h2>
        <div className="bg-white border border-gray-200 rounded-3xl p-8">
          <ul className="space-y-4">
            {[
              {
                label: 'Inline element',
                text: 'FeedbackCaption renders as a <span> so it can sit inline beneath a form control without disrupting document flow.',
              },
              {
                label: 'Icon is decorative',
                text: 'The icon element carries aria-hidden="true". The semantic meaning is conveyed entirely through the text content, so no role="img" or title is needed.',
              },
              {
                label: 'Colour alone is not the only signal',
                text: 'Each variant uses both a distinct icon shape and distinct text to communicate its meaning. Users who cannot distinguish colours still receive full context from the icon shape (ⓘ, ✓, !) and the message wording.',
              },
              {
                label: 'Live region pairing',
                text: 'When used below a form field for validation feedback, wrap the FeedbackCaption in an element with role="alert" or aria-live="polite" so screen readers announce the message when it appears dynamically.',
              },
              {
                label: 'Colour contrast',
                text: 'All three text colour tokens (--text-neutral-bold, --text-success-bold, --text-error) meet WCAG AA 4.5:1 contrast on a white background.',
              },
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

      {/* ── Props ────────────────────────────────────────────── */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-gray-900">Props</h2>
        <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden">
          <div className="grid grid-cols-[120px_200px_100px_1fr] border-b border-gray-100 px-6 py-3 bg-gray-50">
            {['Prop', 'Type', 'Default', 'Description'].map(h => (
              <div key={h} className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                {h}
              </div>
            ))}
          </div>
          {[
            {
              prop: 'variant',
              type: '"info" | "success" | "error"',
              def:  '"info"',
              desc: 'Semantic variant — selects the icon and drives the icon/text colour tokens.',
            },
            {
              prop: 'children',
              type: 'React.ReactNode',
              def:  '—',
              desc: 'The caption message rendered beside the icon.',
            },
            {
              prop: 'className',
              type: 'string',
              def:  '""',
              desc: 'Extra class names forwarded to the root <span> wrapper.',
            },
          ].map((row, i, arr) => (
            <div
              key={row.prop}
              className={`grid grid-cols-[120px_200px_100px_1fr] px-6 py-3 items-start gap-4 hover:bg-gray-50 transition-colors ${
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
          All native <code className="font-mono">{'<span>'}</code> attributes (
          <code className="font-mono">id</code>, <code className="font-mono">aria-*</code>,{' '}
          <code className="font-mono">data-*</code>, etc.) can be forwarded by spreading onto the
          component.
        </p>
      </div>
    </div>
  );
}

export default FeedbackCaptionPage;