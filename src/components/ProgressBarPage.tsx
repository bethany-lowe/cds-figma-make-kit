import { useState } from 'react';
import { ProgressBar, ProgressBarSentiment, ProgressBarSize } from './ui/ProgressBar';
import { useTheme } from '../contexts/ThemeContext';

// ── Static data ───────────────────────────────────────────────

const SENTIMENT_ROWS: {
  sentiment: ProgressBarSentiment;
  label:     string;
  value:     number;
  helper?:   string;
}[] = [
  { sentiment: 'primary', label: 'Primary',  value: 60 },
  { sentiment: 'success', label: 'Success',  value: 100, helper: 'Upload complete.' },
  { sentiment: 'warning', label: 'Warning',  value: 75,  helper: 'Approaching storage limit.' },
  { sentiment: 'error',   label: 'Error',    value: 40,  helper: 'Upload failed. Please retry.' },
  { sentiment: 'neutral', label: 'Neutral',  value: 30 },
];

const TOKEN_ROWS = [
  { prop: 'Track background',         token: '--background-disabled',      note: 'Muted grey track surface'    },
  { prop: 'Fill — primary',           token: '--background-primary',       note: 'Brand primary purple'        },
  { prop: 'Fill — success',           token: '--background-success',       note: 'Green'                       },
  { prop: 'Fill — warning',           token: '--background-alert',         note: 'Amber / orange'              },
  { prop: 'Fill — error',             token: '--background-error',         note: 'Error red'                   },
  { prop: 'Fill — neutral',           token: '--background-neutral',       note: 'Neutral grey'                },
  { prop: 'Track border radius',      token: '--radius-full',              note: 'Pill shape'                  },
  { prop: 'Label text',               token: '--text-neutral-bolder',      note: 'Black / near-black'          },
  { prop: 'Value text (default)',      token: '--text-neutral',             note: 'Grey'                        },
  { prop: 'Value — primary',          token: '--text-primary',             note: 'Brand primary'               },
  { prop: 'Value — success',          token: '--text-success',             note: 'Green'                       },
  { prop: 'Value — warning',          token: '--text-alert',               note: 'Amber'                       },
  { prop: 'Value — error',            token: '--text-error',               note: 'Error red'                   },
  { prop: 'Helper text',              token: '--text-neutral',             note: 'Grey'                        },
  { prop: 'Helper text — error',      token: '--text-error',               note: 'Error red'                   },
  { prop: 'Helper text — success',    token: '--text-success',             note: 'Green'                       },
  { prop: 'Gap (label ↔ track)',       token: '--space-xsmall',            note: '4 px'                        },
  { prop: 'Label font size',          token: '--text-size-3',              note: 'Regular body (13 px)'        },
  { prop: 'Value font size',          token: '--text-size-3',              note: 'Bold body (13 px)'           },
  { prop: 'Helper font size',         token: '--text-size-2',              note: 'Small regular (12 px)'       },
  { prop: 'Track height — small',     token: '4px',                        note: 'Compact; for inline use'     },
  { prop: 'Track height — medium',    token: '8px',                        note: 'Default'                     },
  { prop: 'Track height — large',     token: '12px',                       note: 'High-emphasis'               },
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
  value, sentiment, size, showValue, indeterminate, label, helperText,
}: {
  value: number;
  sentiment: ProgressBarSentiment;
  size: ProgressBarSize;
  showValue: boolean;
  indeterminate: boolean;
  label: string;
  helperText: string;
}) {
  const lines = ['<ProgressBar'];
  if (label)               lines.push(`  label="${label}"`);
  if (size !== 'medium')   lines.push(`  size="${size}"`);
  if (sentiment !== 'primary') lines.push(`  sentiment="${sentiment}"`);
  if (!indeterminate)      lines.push(`  value={${value}}`);
  if (showValue)           lines.push('  showValue');
  if (indeterminate)       lines.push('  indeterminate');
  if (helperText)          lines.push(`  helperText="${helperText}"`);
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

function TogglePill({
  label, value, onChange,
}: {
  label:    string;
  value:    boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div>
      <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">
        {label}
      </div>
      <button
        onClick={() => onChange(!value)}
        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
          value
            ? 'bg-gray-900 text-white'
            : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-300'
        }`}
      >
        {value ? 'On' : 'Off'}
      </button>
    </div>
  );
}

// ── Animated demo ─────────────────────────────────────────────

function AnimatedDemo() {
  const [progress, setProgress] = useState(0);
  const [running, setRunning] = useState(false);

  const start = () => {
    if (running) return;
    setRunning(true);
    setProgress(0);
    let current = 0;
    const id = setInterval(() => {
      current += Math.random() * 12 + 4;
      if (current >= 100) {
        current = 100;
        clearInterval(id);
        setTimeout(() => setRunning(false), 600);
      }
      setProgress(Math.min(100, current));
    }, 200);
  };

  return (
    <div className="flex flex-col gap-6">
      <ProgressBar
        value={progress}
        label="Uploading file…"
        showValue
        helperText={progress === 100 ? 'Upload complete.' : 'Please wait while your file uploads.'}
        sentiment={progress === 100 ? 'success' : 'primary'}
      />
      <button
        onClick={start}
        disabled={running}
        className="self-start px-4 py-2 rounded-xl text-sm font-medium bg-gray-900 text-white hover:bg-gray-700 disabled:opacity-40 transition-colors"
      >
        {running ? 'Uploading…' : progress === 100 ? 'Upload again' : 'Simulate upload'}
      </button>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────

export function ProgressBarPage() {
  const { brandFont, brandName } = useTheme();

  // Playground state
  const [playSentiment,    setPlaySentiment]    = useState<ProgressBarSentiment>('primary');
  const [playSize,         setPlaySize]         = useState<ProgressBarSize>('medium');
  const [playValue,        setPlayValue]        = useState(60);
  const [playShowValue,    setPlayShowValue]    = useState(true);
  const [playIndeterminate, setPlayIndeterminate] = useState(false);
  const [playLabel,        setPlayLabel]        = useState('Loading');
  const [playHelper,       setPlayHelper]       = useState('');
  const [activeTab,        setActiveTab]        = useState<'preview' | 'code'>('preview');

  const { copied, copy } = useCopy();
  const snippet = buildSnippet({
    value: playValue, sentiment: playSentiment, size: playSize,
    showValue: playShowValue, indeterminate: playIndeterminate,
    label: playLabel, helperText: playHelper,
  });

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
            Progress Bar
          </h1>
          <p className="text-base text-gray-600 leading-relaxed max-w-2xl">
            A horizontal bar that communicates the completion status of an operation — such as a
            file upload, form submission, or background task. Supports a determinate mode driven by
            an explicit <code className="font-mono">value</code> (0–100), an indeterminate animated
            mode for processes of unknown length, five semantic sentiments, and three sizes. All
            visual properties are driven by <code className="font-mono">--*</code> tokens and
            adapt automatically to the active {brandName} brand palette.
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
              label="Sentiment"
              value={playSentiment}
              onChange={setPlaySentiment}
              options={[
                { value: 'primary', label: 'Primary' },
                { value: 'success', label: 'Success' },
                { value: 'warning', label: 'Warning' },
                { value: 'error',   label: 'Error'   },
                { value: 'neutral', label: 'Neutral' },
              ]}
            />
            <PillSelector
              label="Size"
              value={playSize}
              onChange={setPlaySize}
              options={[
                { value: 'small',  label: 'Small'  },
                { value: 'medium', label: 'Medium' },
                { value: 'large',  label: 'Large'  },
              ]}
            />

            {/* Value slider */}
            {!playIndeterminate && (
              <div>
                <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  Value ({playValue}%)
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={playValue}
                  onChange={e => setPlayValue(Number(e.target.value))}
                  className="w-32 accent-gray-900"
                />
              </div>
            )}

            <TogglePill label="Show value"    value={playShowValue}     onChange={setPlayShowValue}     />
            <TogglePill label="Indeterminate" value={playIndeterminate} onChange={setPlayIndeterminate} />

            {/* Editable label */}
            <div>
              <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Label text
              </div>
              <input
                type="text"
                value={playLabel}
                onChange={e => setPlayLabel(e.target.value)}
                className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs text-gray-700 bg-white focus:outline-none focus:border-gray-400 w-32"
                placeholder="Loading"
              />
            </div>

            {/* Editable helper */}
            <div>
              <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Helper text
              </div>
              <input
                type="text"
                value={playHelper}
                onChange={e => setPlayHelper(e.target.value)}
                className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs text-gray-700 bg-white focus:outline-none focus:border-gray-400 w-44"
                placeholder="Optional status message…"
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
              className="px-16 py-12 flex items-center justify-center min-h-40"
              style={{ backgroundColor: '#f9fafb' }}
            >
              <div className="w-full max-w-sm">
                <ProgressBar
                  value={playValue}
                  sentiment={playSentiment}
                  size={playSize}
                  label={playLabel || undefined}
                  showValue={playShowValue}
                  indeterminate={playIndeterminate}
                  helperText={playHelper || undefined}
                />
              </div>
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

      {/* ── Sentiments ──────────────────────────────────────── */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-2 text-gray-900">Sentiments</h2>
        <p className="text-sm text-gray-500 mb-6 leading-relaxed">
          The <code className="font-mono">sentiment</code> prop maps to a semantic fill colour and
          a matching value-text colour. Choose a sentiment that reflects the nature or outcome of
          the underlying process — not just a visual preference.
        </p>

        <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-[160px_1fr_1fr_1fr] border-b border-gray-100 px-6 py-3 bg-gray-50">
            {['Sentiment', 'Small', 'Medium', 'Large'].map(h => (
              <div key={h} className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                {h}
              </div>
            ))}
          </div>

          {SENTIMENT_ROWS.map((row, i) => (
            <div
              key={row.sentiment}
              className={`grid grid-cols-[160px_1fr_1fr_1fr] items-center gap-8 px-6 py-6 hover:bg-gray-50 transition-colors ${
                i < SENTIMENT_ROWS.length - 1 ? 'border-b border-gray-100' : ''
              }`}
            >
              <span className="text-sm font-medium text-gray-700">{row.label}</span>
              {(['small', 'medium', 'large'] as ProgressBarSize[]).map(sz => (
                <ProgressBar
                  key={sz}
                  value={row.value}
                  sentiment={row.sentiment}
                  size={sz}
                  showValue
                  helperText={sz === 'medium' ? row.helper : undefined}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── Indeterminate ────────────────────────────────────── */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-2 text-gray-900">Indeterminate</h2>
        <p className="text-sm text-gray-500 mb-6 leading-relaxed">
          Pass <code className="font-mono">indeterminate</code> for processes where the total
          duration is unknown — such as connecting to a server or processing an AI request. The fill
          animates as a sliding pulse. The <code className="font-mono">value</code> prop and the{' '}
          <code className="font-mono">showValue</code> badge are suppressed automatically.
        </p>
        <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden">
          {(['primary', 'warning', 'neutral'] as ProgressBarSentiment[]).map((s, i, arr) => (
            <div
              key={s}
              className={`flex items-center gap-8 px-6 py-6 hover:bg-gray-50 transition-colors ${
                i < arr.length - 1 ? 'border-b border-gray-100' : ''
              }`}
            >
              <span className="text-sm font-medium text-gray-700 w-28 flex-shrink-0 capitalize">{s}</span>
              <div className="flex-1">
                <ProgressBar
                  indeterminate
                  sentiment={s}
                  label={s === 'primary' ? 'Connecting…' : s === 'warning' ? 'Retrying…' : 'Processing…'}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Animated demo ────────────────────────────────────── */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-2 text-gray-900">Simulated upload</h2>
        <p className="text-sm text-gray-500 mb-6 leading-relaxed">
          A live example of a determinate progress bar driven by a timed interval — demonstrating
          how the <code className="font-mono">value</code> prop and{' '}
          <code className="font-mono">sentiment</code> can be updated reactively as a task
          progresses and completes.
        </p>
        <div className="bg-white border border-gray-200 rounded-3xl p-8">
          <AnimatedDemo />
        </div>
      </div>

      {/* ── Design tokens ────────────────────────────────────── */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-2 text-gray-900">Design tokens</h2>
        <p className="text-sm text-gray-500 mb-6 leading-relaxed">
          Every colour, spacing, and typography value is driven by a{' '}
          <code className="font-mono">--*</code> token. Switching brands in the theme picker
          updates all values simultaneously with no component code changes.
        </p>

        <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden">
          <div className="grid grid-cols-[1fr_280px_1fr] border-b border-gray-100 px-6 py-3 bg-gray-50">
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Property</div>
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Token</div>
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Note</div>
          </div>
          {TOKEN_ROWS.map((row, i) => (
            <div
              key={row.prop}
              className={`grid grid-cols-[1fr_280px_1fr] items-center px-6 py-3 hover:bg-gray-50 transition-colors ${
                i < TOKEN_ROWS.length - 1 ? 'border-b border-gray-100' : ''
              }`}
            >
              <span className="text-sm text-gray-600">{row.prop}</span>
              <code className="inline-block px-3 py-1 rounded-full text-xs font-mono text-gray-600">{row.token}</code>
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
                label: 'ARIA progressbar role',
                text: 'The track element carries role="progressbar" with aria-valuemin={0} and aria-valuemax={100}. In determinate mode aria-valuenow is set to the clamped value; in indeterminate mode it is omitted as required by the ARIA spec.',
              },
              {
                label: 'Accessible label',
                text: 'When the label prop is set, aria-label is derived from it so screen readers can announce which operation is in progress. When no label is supplied, aria-label defaults to "Progress" to ensure the role is always named.',
              },
              {
                label: 'Human-readable value text',
                text: 'aria-valuetext provides a formatted string ("60%" or "Loading…") so screen readers announce a natural phrase rather than a bare number. In indeterminate mode the text is "Loading…" to communicate that duration is unknown.',
              },
              {
                label: 'Not keyboard focusable',
                text: 'Progress bars are status indicators, not interactive controls. The track is intentionally not focusable. Use a live region (aria-live="polite") on a nearby element if you need screen readers to announce completion events.',
              },
              {
                label: 'Sentiment and colour',
                text: 'Colour alone is never the sole means of conveying outcome. Always pair a semantic sentiment with a descriptive helperText (e.g. "Upload complete." for success, "Upload failed." for error) so the message is clear to users who cannot perceive colour.',
              },
              {
                label: 'Colour contrast',
                text: 'All fill colours and text token combinations meet WCAG AA 4.5:1 contrast against the #FAFAFA page background. The indeterminate animation respects prefers-reduced-motion — consider adding a media query if animation is a concern for your users.',
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
          <div className="grid grid-cols-[140px_260px_110px_1fr] border-b border-gray-100 px-6 py-3 bg-gray-50">
            {['Prop', 'Type', 'Default', 'Description'].map(h => (
              <div key={h} className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                {h}
              </div>
            ))}
          </div>
          {[
            {
              prop: 'value',
              type: 'number',
              def: '0',
              desc: 'Current progress percentage (0–100). Values outside this range are clamped automatically. Ignored when indeterminate is true.',
            },
            {
              prop: 'sentiment',
              type: '"primary" | "success" | "warning" | "error" | "neutral"',
              def: '"primary"',
              desc: 'Fill colour conveying the nature or outcome of the process. Maps directly to a semantic background token.',
            },
            {
              prop: 'size',
              type: '"small" | "medium" | "large"',
              def: '"medium"',
              desc: 'Track height — small (4 px), medium (8 px), large (12 px). Choose based on visual hierarchy; prefer small for inline or dense layouts.',
            },
            {
              prop: 'label',
              type: 'string',
              def: '—',
              desc: 'Visible label rendered above the track. Also used as the accessible name (aria-label) on the track element.',
            },
            {
              prop: 'showValue',
              type: 'boolean',
              def: 'false',
              desc: 'When true, renders the numeric percentage to the right of the label. Automatically suppressed when indeterminate is true.',
            },
            {
              prop: 'indeterminate',
              type: 'boolean',
              def: 'false',
              desc: 'Enables an infinite sliding animation for processes of unknown duration. Suppresses value, showValue badge, and aria-valuenow.',
            },
            {
              prop: 'helperText',
              type: 'string',
              def: '—',
              desc: 'Optional status or helper message shown below the track. Coloured red on error sentiment and green on success sentiment via CSS token overrides.',
            },
          ].map((row, i, arr) => (
            <div
              key={row.prop}
              className={`grid grid-cols-[140px_260px_110px_1fr] items-start px-6 py-4 hover:bg-gray-50 transition-colors ${
                i < arr.length - 1 ? 'border-b border-gray-100' : ''
              }`}
            >
              <code className="text-sm font-mono text-gray-800 pt-0.5">{row.prop}</code>
              <code className="text-xs font-mono text-violet-600 leading-relaxed pt-0.5">{row.type}</code>
              <code className="text-sm font-mono text-gray-400 pt-0.5">{row.def}</code>
              <span className="text-sm text-gray-600 leading-relaxed">{row.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
