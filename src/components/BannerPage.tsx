import { useState, type ReactNode } from 'react';
import { Banner, type BannerSentiment } from './ui/Banner';
import { useTheme } from '../contexts/ThemeContext';

// ── Static data ───────────────────────────────────────────────

const SENTIMENT_META: {
  sentiment: BannerSentiment;
  label:     string;
  title:     string;
  message:   string;
  action?:   string;
}[] = [
  {
    sentiment: 'neutral',
    label:     'Neutral',
    title:     'New terms of service',
    message:   'We have updated our terms of service. Please review the changes before your next login.',
    action:    'Review terms',
  },
  {
    sentiment: 'info',
    label:     'Info',
    title:     'Scheduled maintenance',
    message:   'The platform will be unavailable on Sunday, 4 May from 02:00–04:00 UTC.',
    action:    'Learn more',
  },
  {
    sentiment: 'success',
    label:     'Success',
    title:     'Profile updated',
    message:   'Your changes have been saved and will take effect immediately.',
  },
  {
    sentiment: 'warning',
    label:     'Warning',
    title:     'Storage limit approaching',
    message:   'You have used 85% of your storage quota. Consider removing unused assets.',
    action:    'Manage storage',
  },
  {
    sentiment: 'error',
    label:     'Error',
    title:     'Payment failed',
    message:   'We could not process your payment. Please update your billing information and try again.',
    action:    'Update billing',
  },
];

const TOKEN_ROWS = [
  { prop: 'Root padding',              token: '--space-large',              note: 'Inner spacing on all sides'            },
  { prop: 'Gap (icon ↔ content)',      token: '--space-medium',             note: 'Horizontal space between icon and text' },
  { prop: 'Border radius',             token: '--radius-large',             note: 'Rounded corners'                        },
  { prop: 'Border width',              token: '--border-width-thick',       note: 'Uniform perimeter border'               },
  { prop: 'Background — info',         token: '--background-info-subtle',   note: 'Tinted blue surface'                    },
  { prop: 'Background — success',      token: '--background-success-subtle', note: 'Tinted green surface'                  },
  { prop: 'Background — warning',      token: '--background-alert-subtle',  note: 'Tinted amber surface'                   },
  { prop: 'Background — error',        token: '--background-error-subtle',  note: 'Tinted red surface'                     },
  { prop: 'Background — neutral',      token: '--background-primary-inverse', note: 'Primary brand inverse surface'        },
  { prop: 'Border colour — info',      token: '--border-info',              note: 'Blue accent + perimeter'                },
  { prop: 'Border colour — success',   token: '--border-success',           note: 'Green accent + perimeter'               },
  { prop: 'Border colour — warning',   token: '--border-alert',             note: 'Amber accent + perimeter'               },
  { prop: 'Border colour — error',     token: '--border-error',             note: 'Red accent + perimeter'                 },
  { prop: 'Border colour — neutral',   token: '--border-primary',           note: 'Primary brand perimeter'                },
  { prop: 'Icon colour — info',        token: '--text-info',                note: 'Blue'                                   },
  { prop: 'Icon colour — success',     token: '--text-success',             note: 'Green'                                  },
  { prop: 'Icon colour — warning',     token: '--text-alert',               note: 'Amber'                                  },
  { prop: 'Icon colour — error',       token: '--text-error',               note: 'Red'                                    },
  { prop: 'Icon colour — neutral',     token: '--text-primary',             note: 'Primary brand colour'                   },
  { prop: 'Title font size',           token: '--text-size-5',              note: 'Bold large body (15 px)'                },
  { prop: 'Title font weight',         token: '600',                        note: 'Semibold'                               },
  { prop: 'Title colour',              token: '--text-neutral-bolder',      note: 'Near-black'                             },
  { prop: 'Title gap (↓ message)',     token: '--space-xsmall',             note: '4 px below title row'                   },
  { prop: 'Title icon size',           token: '--icon-size-small',          note: '16×16 px — inline with title text'      },
  { prop: 'Title icon gap (→ text)',   token: '--space-small',              note: '8 px between title icon and title text' },
  { prop: 'Message font size',         token: '--text-size-3',              note: 'Regular body (13 px)'                   },
  { prop: 'Message colour',            token: '--text-neutral',             note: 'Grey'                                   },
  { prop: 'Action font size',          token: '--text-size-3',              note: 'Bold body, underlined (13 px)'          },
  { prop: 'Action colour — info',      token: '--text-info',                note: 'Matches icon colour'                    },
  { prop: 'Action gap (↑ message)',    token: '--space-small',              note: '8 px above action'                      },
  { prop: 'Action hover opacity',      token: '--opacity-semiSolid',        note: 'Fades on hover'                         },
  { prop: 'Dismiss button radius',     token: '--radius-xsmall',            note: 'Rounded hover state'                    },
  { prop: 'Dismiss hover background',  token: '--background-disabled-bold', note: 'Subtle grey on hover'                   },
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
  sentiment, title, message, actionLabel, showAction, showDismiss, showIcon, titleIcon,
}: {
  sentiment:   BannerSentiment;
  title:       string;
  message:     string;
  actionLabel: string;
  showAction:  boolean;
  showDismiss: boolean;
  showIcon:    boolean;
  titleIcon:   boolean;
}) {
  const lines = ['<Banner'];
  if (sentiment !== 'info') lines.push(`  sentiment="${sentiment}"`);
  if (!showIcon)            lines.push('  showIcon={false}');
  if (!titleIcon)           lines.push('  titleIcon={false}');
  if (title)                lines.push(`  title="${title}"`);
  if (message)              lines.push(`  message="${message}"`);
  if (showAction && actionLabel) {
    lines.push(`  actionLabel="${actionLabel}"`);
    lines.push('  onAction={() => { /* handle action */ }}');
  }
  if (showDismiss)          lines.push('  onDismiss={() => { /* handle dismiss */ }}');
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

// ── Dismissible stack demo ────────────────────────────────────

function DismissibleDemo() {
  const ALL: { sentiment: BannerSentiment; title: string; message: string }[] = [
    { sentiment: 'info',    title: 'App update available',        message: 'Version 3.2.1 is ready to install. Refresh the page to apply.' },
    { sentiment: 'warning', title: 'Session expiring soon',       message: 'Your session will expire in 5 minutes. Save your work.' },
    { sentiment: 'error',   title: 'Connection lost',             message: 'Unable to reach the server. Check your internet connection.' },
    { sentiment: 'success', title: 'Changes saved',               message: 'All edits have been committed to the repository.' },
  ];
  const [visible, setVisible] = useState<Set<number>>(new Set([0, 1, 2, 3]));
  const dismiss = (i: number) => setVisible(prev => { const n = new Set(prev); n.delete(i); return n; });
  const reset   = () => setVisible(new Set([0, 1, 2, 3]));

  return (
    <div className="flex flex-col gap-4">
      {ALL.map((b, i) =>
        visible.has(i) ? (
          <Banner
            key={i}
            sentiment={b.sentiment}
            title={b.title}
            message={b.message}
            onDismiss={() => dismiss(i)}
            titleIcon={false}
          />
        ) : null
      )}
      {visible.size === 0 && (
        <p className="text-sm text-gray-500 text-center py-4">All banners dismissed.</p>
      )}
      {visible.size < ALL.length && (
        <button
          onClick={reset}
          className="self-start px-4 py-2 rounded-xl text-sm font-medium bg-gray-900 text-white hover:bg-gray-700 transition-colors"
        >
          Restore all
        </button>
      )}
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────

export function BannerPage() {
  const { brandFont, brandName } = useTheme();

  // Playground state
  const [playSentiment,   setPlaySentiment]   = useState<BannerSentiment>('info');
  const [playTitle,       setPlayTitle]       = useState('Scheduled maintenance');
  const [playMessage,     setPlayMessage]     = useState('The platform will be unavailable on Sunday from 02:00–04:00 UTC.');
  const [playActionLabel, setPlayActionLabel] = useState('Learn more');
  const [playShowAction,  setPlayShowAction]  = useState(true);
  const [playShowDismiss, setPlayShowDismiss] = useState(true);
  const [playShowIcon,    setPlayShowIcon]    = useState(true);
  const [playTitleIcon,   setPlayTitleIcon]   = useState(true);
  const [dismissed,       setDismissed]       = useState(false);
  const [activeTab,       setActiveTab]       = useState<'preview' | 'code'>('preview');

  const { copied, copy } = useCopy();
  const snippet = buildSnippet({
    sentiment: playSentiment, title: playTitle, message: playMessage,
    actionLabel: playActionLabel, showAction: playShowAction, showDismiss: playShowDismiss, showIcon: playShowIcon, titleIcon: playTitleIcon,
  });

  const resetDismissed = () => setDismissed(false);

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
            Banner
          </h1>
          <p className="text-base text-gray-600 leading-relaxed max-w-2xl">
            A full-width contextual message strip used to inform, warn, or confirm an action.
            Banners sit inline in the page flow and support five semantic sentiments, an optional
            bold title, a body message, an inline action link, and a dismiss button. The heavy
            left accent border and tinted background are driven entirely by{' '}
            <code className="font-mono">--*</code> tokens and adapt automatically to the
            active {brandName} brand palette.
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
              label="Sentiment"
              value={playSentiment}
              onChange={v => { setPlaySentiment(v); resetDismissed(); }}
              options={[
                { value: 'info',    label: 'Info'    },
                { value: 'success', label: 'Success' },
                { value: 'warning', label: 'Warning' },
                { value: 'error',   label: 'Error'   },
                { value: 'neutral', label: 'Neutral' },
              ]}
            />
            <TogglePill label="Action link"     value={playShowAction}  onChange={v => { setPlayShowAction(v); resetDismissed(); }}  />
            <TogglePill label="Dismiss button"  value={playShowDismiss} onChange={v => { setPlayShowDismiss(v); resetDismissed(); }} />
            <TogglePill label="Banner icon"     value={playShowIcon}    onChange={v => { setPlayShowIcon(v); resetDismissed(); }}    />
            <TogglePill label="Title icon"      value={playTitleIcon}   onChange={v => { setPlayTitleIcon(v); resetDismissed(); }}   />

            {/* Title input */}
            <div>
              <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Title
              </div>
              <input
                type="text"
                value={playTitle}
                onChange={e => { setPlayTitle(e.target.value); resetDismissed(); }}
                className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs text-gray-700 bg-white focus:outline-none focus:border-gray-400 w-52"
                placeholder="Optional title…"
              />
            </div>

            {/* Message input */}
            <div>
              <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Message
              </div>
              <input
                type="text"
                value={playMessage}
                onChange={e => { setPlayMessage(e.target.value); resetDismissed(); }}
                className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs text-gray-700 bg-white focus:outline-none focus:border-gray-400 w-64"
                placeholder="Body message…"
              />
            </div>

            {/* Action label */}
            {playShowAction && (
              <div>
                <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  Action label
                </div>
                <input
                  type="text"
                  value={playActionLabel}
                  onChange={e => { setPlayActionLabel(e.target.value); resetDismissed(); }}
                  className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs text-gray-700 bg-white focus:outline-none focus:border-gray-400 w-36"
                  placeholder="Learn more"
                />
              </div>
            )}
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
              className="px-12 py-10 flex items-center justify-center min-h-40"
              style={{ backgroundColor: '#f9fafb' }}
            >
              <div className="w-full max-w-xl">
                {dismissed ? (
                  <div className="flex flex-col items-center gap-3 py-4">
                    <p className="text-sm text-gray-500">Banner dismissed.</p>
                    <button
                      onClick={() => setDismissed(false)}
                      className="px-4 py-2 rounded-xl text-xs font-medium bg-gray-900 text-white hover:bg-gray-700 transition-colors"
                    >
                      Restore
                    </button>
                  </div>
                ) : (
                  <Banner
                    sentiment={playSentiment}
                    title={playTitle || undefined}
                    message={playMessage}
                    actionLabel={playShowAction && playActionLabel ? playActionLabel : undefined}
                    onAction={playShowAction && playActionLabel ? () => {} : undefined}
                    onDismiss={playShowDismiss ? () => setDismissed(true) : undefined}
                    showIcon={playShowIcon}
                    titleIcon={playTitleIcon}
                  />
                )}
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
      <div className="mb-20">
        <h2 className="text-2xl font-semibold mb-2 text-gray-900">Sentiments</h2>
        <p className="text-sm text-gray-500 mb-6 leading-relaxed">
          The <code className="font-mono">sentiment</code> prop controls the background tint,
          accent border colour, icon colour, and action link colour simultaneously. Each maps to a
          distinct set of semantic tokens so the banner's meaning is clear without relying on
          colour alone.
        </p>
        <div className="flex flex-col gap-4">
          {SENTIMENT_META.map(row => (
            <div key={row.sentiment} className="flex items-start gap-6">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider w-16 flex-shrink-0 pt-4">
                {row.label}
              </span>
              <div className="flex-1">
                <Banner
                  sentiment={row.sentiment}
                  title={row.title}
                  message={row.message}
                  actionLabel={row.action}
                  onAction={row.action ? () => {} : undefined}
                  titleIcon={false}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Anatomy ─────────────────────────────────────────── */}
      <div className="mb-20">
        <h2 className="text-2xl font-semibold mb-2 text-gray-900">Anatomy</h2>
        <p className="text-sm text-gray-500 mb-6 leading-relaxed">
          The banner is composed of four optional slots — icon, title, message, and action — plus
          an optional dismiss control. At minimum only the{' '}
          <code className="font-mono">message</code> prop is required. All other slots are
          additive and can be combined freely.
        </p>
        <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden">
          {[
            {
              label:   'Message only',
              props:   { sentiment: 'info' as BannerSentiment, message: 'Your session is about to expire.' },
            },
            {
              label:   '+ Title',
              props:   { sentiment: 'info' as BannerSentiment, title: 'Session expiring', message: 'Your session is about to expire.' },
            },
            {
              label:   '+ Action link',
              props:   { sentiment: 'info' as BannerSentiment, title: 'Session expiring', message: 'Your session is about to expire.', actionLabel: 'Extend session', onAction: () => {} },
            },
            {
              label:   '+ Dismiss',
              props:   { sentiment: 'info' as BannerSentiment, title: 'Session expiring', message: 'Your session is about to expire.', actionLabel: 'Extend session', onAction: () => {}, onDismiss: () => {} },
            },
          ].map((row, i, arr) => (
            <div
              key={row.label}
              className={`flex items-start gap-8 px-6 py-6 hover:bg-gray-50 transition-colors ${
                i < arr.length - 1 ? 'border-b border-gray-100' : ''
              }`}
            >
              <code className="text-xs font-mono text-gray-400 w-28 flex-shrink-0 pt-3 leading-relaxed">
                {row.label}
              </code>
              <div className="flex-1">
                <Banner {...row.props} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Dismissible stack ────────────────────────────────── */}
      <div className="mb-20">
        <h2 className="text-2xl font-semibold mb-2 text-gray-900">Dismissible banners</h2>
        <p className="text-sm text-gray-500 mb-6 leading-relaxed">
          Pass <code className="font-mono">onDismiss</code> to render the close button. The
          callback is responsible for removing the banner from the React tree — the component
          itself holds no visibility state. Try dismissing each banner below.
        </p>
        <div className="bg-white border border-gray-200 rounded-3xl p-8">
          <DismissibleDemo />
        </div>
      </div>

      {/* ── Design tokens ────────────────────────────────────── */}
      <div className="mb-20">
        <h2 className="text-2xl font-semibold mb-2 text-gray-900">Design tokens</h2>
        <p className="text-sm text-gray-500 mb-6 leading-relaxed">
          Every colour, spacing, border, and typography value is driven by a{' '}
          <code className="font-mono">--*</code> token. Switching brands in the theme
          picker updates all values simultaneously with no component code changes.
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
                label: 'ARIA alert role',
                text:  'The banner root carries role="alert" and aria-live="polite". Screen readers will announce the banner content when it is injected into the DOM, without interrupting the current reading flow.',
              },
              {
                label: 'Colour is never the sole signal',
                text:  'Each sentiment has a unique icon in addition to its colour. Pair a sentiment with descriptive title or message text so users who cannot perceive colour still understand the nature of the message.',
              },
              {
                label: 'Decorative icons',
                text:  'All built-in SVG icons carry aria-hidden="true" because the banner\'s textual content is the primary communication channel. If you supply a custom icon via the icon prop, ensure it is also marked aria-hidden or carry its own accessible label.',
              },
              {
                label: 'Dismiss button label',
                text:  'The dismiss button carries aria-label="Dismiss" because it contains only an icon with no visible text. This gives screen reader users an actionable label rather than an unlabelled button.',
              },
              {
                label: 'Action link focus order',
                text:  'The action button is a native <button> element placed in document order after the message, before the dismiss button. This ensures a logical tab sequence: icon → content → action → dismiss.',
              },
              {
                label: 'Colour contrast',
                text:  'All text, icon, and action link colour token combinations meet WCAG AA 4.5:1 contrast against their respective subtle background tokens. The heavy left border adds an additional non-colour affordance for sentiment identification.',
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

      {/* ── Props ───────────────────────────────────────────── */}
      <div className="mb-20">
        <h2 className="text-2xl font-semibold mb-6 text-gray-900">Props</h2>
        <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden">
          <div className="grid grid-cols-[140px_240px_100px_1fr] border-b border-gray-100 px-6 py-3 bg-gray-50">
            {['Prop', 'Type', 'Default', 'Description'].map(h => (
              <div key={h} className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                {h}
              </div>
            ))}
          </div>
          {[
            {
              prop: 'sentiment',
              type: '"info" | "success" | "warning" | "error" | "neutral"',
              def:  '"info"',
              desc: 'Controls the background tint, accent border, icon, and action link colour. Choose based on the nature of the message, not visual preference.',
            },
            {
              prop: 'title',
              type: 'string',
              def:  '—',
              desc: 'Optional bold heading rendered above the message. Use to give the banner a scannable summary when the message is longer than one line.',
            },
            {
              prop: 'message',
              type: 'string',
              def:  '""',
              desc: 'Main body text of the banner. The only required piece of content — all other props are additive.',
            },
            {
              prop: 'actionLabel',
              type: 'string',
              def:  '—',
              desc: 'Label for the inline action button, rendered as an underlined link below the message. Has no effect unless onAction is also provided.',
            },
            {
              prop: 'onAction',
              type: '() => void',
              def:  '—',
              desc: 'Called when the action button is clicked. Required alongside actionLabel for the action to render.',
            },
            {
              prop: 'onDismiss',
              type: '() => void',
              def:  '—',
              desc: 'Called when the dismiss button is clicked. Providing this prop renders the close button. The caller is responsible for removing the banner from the tree.',
            },
            {
              prop: 'icon',
              type: 'ReactNode',
              def:  '—',
              desc: "Custom icon overriding the default sentiment icon. Inherits currentColor from the sentiment's icon token. Mark it aria-hidden if it is decorative.",
            },
            {
              prop: 'showIcon',
              type: 'boolean',
              def:  'true',
              desc: 'Toggles the leading sentiment icon on the left of the banner. Set to false to suppress the icon entirely when layout space is constrained.',
            },
            {
              prop: 'titleIcon',
              type: 'boolean',
              def:  'true',
              desc: 'Toggles the small placeholder icon rendered inline with the title text. Set to false to show the title without the accompanying icon.',
            },
          ].map((row, i, arr) => (
            <div
              key={row.prop}
              className={`grid grid-cols-[140px_240px_100px_1fr] items-start px-6 py-4 hover:bg-gray-50 transition-colors ${
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