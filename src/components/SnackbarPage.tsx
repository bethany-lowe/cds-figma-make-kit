import { useState, useRef, useEffect } from 'react';
import { Snackbar, SnackbarRegion, type SnackbarSentiment, type SnackbarPosition } from './ui/Snackbar';
import { useTheme } from '../contexts/ThemeContext';

// ── Static data ───────────────────────────────────────────────

const SENTIMENT_META: {
  sentiment: SnackbarSentiment;
  label:     string;
  message:   string;
  action?:   string;
}[] = [
  { sentiment: 'neutral', label: 'Neutral', message: 'Profile changes have been saved.',                            action: 'Undo'        },
  { sentiment: 'info',    label: 'Info',    message: 'A new version of the app is available.',                      action: 'Update now'  },
  { sentiment: 'success', label: 'Success', message: 'File uploaded successfully.'                                                        },
  { sentiment: 'warning', label: 'Warning', message: 'Your session will expire in 2 minutes.',                      action: 'Stay signed in' },
  { sentiment: 'error',   label: 'Error',   message: 'Failed to send message. Check your connection.',              action: 'Retry'       },
];

const POSITION_META: {
  position:    SnackbarPosition;
  label:       string;
  description: string;
  x:           'left' | 'center' | 'right';
  y:           'top' | 'bottom';
}[] = [
  { position: 'bottom-center', label: 'Bottom center', description: 'Default. Best for global feedback that belongs to no specific element.', x: 'center', y: 'bottom' },
  { position: 'bottom-left',   label: 'Bottom left',   description: 'Suits left-anchored layouts or when paired with a fixed sidebar.',       x: 'left',   y: 'bottom' },
  { position: 'bottom-right',  label: 'Bottom right',  description: 'Common in chat and messaging products.',                                 x: 'right',  y: 'bottom' },
  { position: 'top-center',    label: 'Top center',    description: 'Use when the action originates from a top navigation area.',             x: 'center', y: 'top'    },
];

const TOKEN_ROWS = [
  { prop: 'Padding (vertical)',        token: '--space-medium',             note: 'Top and bottom inner spacing'              },
  { prop: 'Padding (horizontal)',      token: '--space-large',              note: 'Left and right inner spacing'              },
  { prop: 'Gap',                       token: '--space-small',              note: 'Between icon, message, action, dismiss'    },
  { prop: 'Border radius',             token: '--radius-large',             note: 'Pill-like rounded corners'                 },
  { prop: 'Background — neutral/info/success/warning', token: '--background-neutral-bold', note: 'Near-black surface'         },
  { prop: 'Background — error',        token: '--background-error',         note: 'Red surface'                               },
  { prop: 'Text colour',               token: '--text-neutral-inverse',     note: 'White on dark background'                  },
  { prop: 'Message font size',         token: '--text-size-3',              note: 'Regular body (13 px)'                      },
  { prop: 'Message font weight',       token: '400',                        note: 'Regular weight'                            },
  { prop: 'Action font size',          token: '--text-size-3',              note: 'Bold body, underlined (13 px)'             },
  { prop: 'Action font weight',        token: '700',                        note: 'Bold weight'                               },
  { prop: 'Action padding (vert)',      token: '--space-xsmall',            note: 'Top and bottom'                            },
  { prop: 'Action padding (horiz)',     token: '--space-small',             note: 'Left and right'                            },
  { prop: 'Action border radius',       token: '--radius-xsmall',           note: 'Rounded hover state'                       },
  { prop: 'Icon size',                 token: '--icon-size-small',          note: '16 × 16 px'                                },
  { prop: 'Region gap',                token: '--space-small',              note: 'Between stacked snackbars'                 },
  { prop: 'Region offset from edge',   token: '--space-xlarge',             note: 'Distance from viewport edge'               },
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
  sentiment, message, actionLabel, showAction, showDismiss, showIcon, position,
}: {
  sentiment:   SnackbarSentiment;
  message:     string;
  actionLabel: string;
  showAction:  boolean;
  showDismiss: boolean;
  showIcon:    boolean;
  position:    SnackbarPosition;
}) {
  const lines: string[] = [];

  // SnackbarRegion wrapper
  if (position !== 'bottom-center') {
    lines.push(`<SnackbarRegion position="${position}">`);
  } else {
    lines.push('<SnackbarRegion>');
  }

  // Snackbar itself
  const inner: string[] = ['  <Snackbar'];
  if (sentiment !== 'neutral') inner.push(`    sentiment="${sentiment}"`);
  if (!showIcon)               inner.push('    showIcon={false}');
  if (message)                 inner.push(`    message="${message}"`);
  if (showAction && actionLabel) {
    inner.push(`    actionLabel="${actionLabel}"`);
    inner.push('    onAction={() => { /* handle action */ }}');
  }
  if (showDismiss)             inner.push('    onDismiss={() => { /* handle dismiss */ }}');
  inner.push('  />');

  lines.push(...inner);
  lines.push('</SnackbarRegion>');
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

// ── Position mini-viewport card ───────────────────────────────

function PositionCard({
  position, label, description, x, y,
}: {
  position:    SnackbarPosition;
  label:       string;
  description: string;
  x:           'left' | 'center' | 'right';
  y:           'top' | 'bottom';
}) {
  const [live, setLive] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const launch = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setLive(true);
    timerRef.current = setTimeout(() => setLive(false), 3500);
  };

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  // Alignment classes for the mini snackbar within the card
  const alignH = x === 'left' ? 'items-start' : x === 'right' ? 'items-end' : 'items-center';
  const alignV = y === 'top'  ? 'justify-start pt-3' : 'justify-end pb-3';

  return (
    <div className="bg-white border border-gray-200 rounded-3xl p-6">
      {/* Mini viewport frame */}
      <div className="relative w-full h-40 bg-gray-100 rounded-2xl overflow-hidden mb-4 border border-gray-200">
        {/* Browser chrome dots */}
        <div className="flex items-center gap-1 px-3 py-2 border-b border-gray-200 bg-white">
          <div className="w-2 h-2 rounded-full bg-gray-200" />
          <div className="w-2 h-2 rounded-full bg-gray-200" />
          <div className="w-2 h-2 rounded-full bg-gray-200" />
          <div className="flex-1 mx-2 h-3 bg-gray-100 rounded-full" />
        </div>
        {/* Snackbar position indicator */}
        <div className={`absolute inset-x-0 bottom-0 top-9 flex flex-col px-3 ${alignV} ${alignH}`}>
          <div
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-white text-[10px] font-medium whitespace-nowrap"
            style={{ background: 'var(--text-neutral-bolder)', boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }}
          >
            <svg width="10" height="10" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
              <circle cx="8" cy="8" r="8" opacity="0.3" />
              <circle cx="8" cy="8" r="4" />
            </svg>
            Snackbar
          </div>
        </div>
      </div>

      {/* Label + description */}
      <p className="text-sm font-semibold text-gray-900 mb-1">{label}</p>
      <p className="text-xs text-gray-500 leading-relaxed mb-4">{description}</p>

      {/* Launch button */}
      <button
        onClick={launch}
        disabled={live}
        className="w-full py-2 rounded-xl text-xs font-medium border border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {live ? 'Showing…' : 'Launch preview'}
      </button>

      {/* Real floating snackbar */}
      {live && (
        <SnackbarRegion position={position}>
          <Snackbar
            sentiment="neutral"
            message="Profile changes have been saved."
            actionLabel="Undo"
            onAction={() => setLive(false)}
            onDismiss={() => setLive(false)}
          />
        </SnackbarRegion>
      )}
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────

export function SnackbarPage() {
  const { brandFont, brandName } = useTheme();

  // Playground state
  const [playSentiment,   setPlaySentiment]   = useState<SnackbarSentiment>('neutral');
  const [playPosition,    setPlayPosition]    = useState<SnackbarPosition>('bottom-center');
  const [playMessage,     setPlayMessage]     = useState('Profile changes have been saved.');
  const [playActionLabel, setPlayActionLabel] = useState('Undo');
  const [playShowAction,  setPlayShowAction]  = useState(true);
  const [playShowDismiss, setPlayShowDismiss] = useState(false);
  const [playShowIcon,    setPlayShowIcon]    = useState(true);
  const [activeTab,       setActiveTab]       = useState<'preview' | 'code'>('preview');

  // Live snackbar state
  const [liveVisible, setLiveVisible] = useState(false);
  const liveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const launchLive = () => {
    if (liveTimer.current) clearTimeout(liveTimer.current);
    setLiveVisible(true);
    liveTimer.current = setTimeout(() => setLiveVisible(false), 4000);
  };

  useEffect(() => () => { if (liveTimer.current) clearTimeout(liveTimer.current); }, []);

  const { copied, copy } = useCopy();
  const snippet = buildSnippet({
    sentiment: playSentiment, message: playMessage,
    actionLabel: playActionLabel, showAction: playShowAction,
    showDismiss: playShowDismiss, showIcon: playShowIcon,
    position: playPosition,
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
            Snackbar
          </h1>
          <p className="text-base text-gray-600 leading-relaxed max-w-2xl">
            A lightweight, floating notification that appears temporarily to confirm an action or
            surface brief status feedback. Unlike a{' '}
            <code className="font-mono">Banner</code>, the snackbar does not interrupt the page
            layout — it overlays the UI and auto-dismisses after a few seconds. Five sentiments,
            four positions, an optional action link, and a dismiss button are all supported. Every
            colour, spacing, and typography value is driven by{' '}
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
              label="Sentiment"
              value={playSentiment}
              onChange={setPlaySentiment}
              options={[
                { value: 'neutral', label: 'Neutral' },
                { value: 'info',    label: 'Info'    },
                { value: 'success', label: 'Success' },
                { value: 'warning', label: 'Warning' },
                { value: 'error',   label: 'Error'   },
              ]}
            />
            <PillSelector
              label="Position"
              value={playPosition}
              onChange={setPlayPosition}
              options={[
                { value: 'bottom-center', label: 'Bottom center' },
                { value: 'bottom-left',   label: 'Bottom left'   },
                { value: 'bottom-right',  label: 'Bottom right'  },
                { value: 'top-center',    label: 'Top center'    },
              ]}
            />
            <TogglePill label="Action link"    value={playShowAction}  onChange={setPlayShowAction}  />
            <TogglePill label="Dismiss button" value={playShowDismiss} onChange={setPlayShowDismiss} />
            <TogglePill label="Icon"           value={playShowIcon}    onChange={setPlayShowIcon}    />

            {/* Message input */}
            <div>
              <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Message
              </div>
              <input
                type="text"
                value={playMessage}
                onChange={e => setPlayMessage(e.target.value)}
                className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs text-gray-700 bg-white focus:outline-none focus:border-gray-400 w-64"
                placeholder="Notification message…"
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
                  onChange={e => setPlayActionLabel(e.target.value)}
                  className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs text-gray-700 bg-white focus:outline-none focus:border-gray-400 w-32"
                  placeholder="Undo"
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
              className="px-12 py-10 flex flex-col items-center justify-center min-h-48 gap-6"
              style={{ backgroundColor: '#f9fafb' }}
            >
              {/* Inline snackbar preview */}
              <Snackbar
                sentiment={playSentiment}
                message={playMessage}
                actionLabel={playShowAction && playActionLabel ? playActionLabel : undefined}
                onAction={playShowAction && playActionLabel ? () => {} : undefined}
                onDismiss={playShowDismiss ? () => {} : undefined}
                showIcon={playShowIcon}
              />
              {/* Launch live button */}
              <button
                onClick={launchLive}
                disabled={liveVisible}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium bg-gray-900 text-white hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M8 5v14l11-7z"/>
                </svg>
                {liveVisible ? 'Live preview active…' : `Launch at ${playPosition.replace('-', ' ')}`}
              </button>
              <p className="text-xs text-gray-400">
                The live preview appears in its real floating position for 4 seconds.
              </p>
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

      {/* Live snackbar from playground */}
      {liveVisible && (
        <SnackbarRegion position={playPosition}>
          <Snackbar
            sentiment={playSentiment}
            message={playMessage}
            actionLabel={playShowAction && playActionLabel ? playActionLabel : undefined}
            onAction={playShowAction && playActionLabel ? () => setLiveVisible(false) : undefined}
            onDismiss={playShowDismiss ? () => setLiveVisible(false) : undefined}
            showIcon={playShowIcon}
          />
        </SnackbarRegion>
      )}

      {/* ── Sentiments ──────────────────────────────────────── */}
      <div className="mb-20">
        <h2 className="text-2xl font-semibold mb-2 text-gray-900">Sentiments</h2>
        <p className="text-sm text-gray-500 mb-6 leading-relaxed">
          The <code className="font-mono">sentiment</code> prop switches the background colour,
          text colour, and default icon simultaneously. Unlike the{' '}
          <code className="font-mono">Banner</code>, sentiments use fully saturated fill colours
          rather than subtle tints, giving the snackbar strong visual presence against any page
          background.
        </p>
        <div className="flex flex-col gap-4">
          {SENTIMENT_META.map(row => (
            <div key={row.sentiment} className="flex items-center gap-6">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider w-16 flex-shrink-0">
                {row.label}
              </span>
              <Snackbar
                sentiment={row.sentiment}
                message={row.message}
                actionLabel={row.action}
                onAction={row.action ? () => {} : undefined}
              />
            </div>
          ))}
        </div>
      </div>

      {/* ── Anatomy ─────────────────────────────────────────── */}
      <div className="mb-20">
        <h2 className="text-2xl font-semibold mb-2 text-gray-900">Anatomy</h2>
        <p className="text-sm text-gray-500 mb-6 leading-relaxed">
          The snackbar has three optional slots — icon, action, and dismiss — alongside the
          required <code className="font-mono">message</code>. A thin separator automatically
          appears between the message and action to visually segment the two. All slots can be
          composed freely.
        </p>
        <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden">
          {[
            {
              label: 'Message only',
              props: { message: 'Draft saved automatically.' },
            },
            {
              label: '+ Icon',
              props: { message: 'Draft saved automatically.', showIcon: true },
            },
            {
              label: '+ Action',
              props: { message: 'Draft saved automatically.', actionLabel: 'View draft', onAction: () => {} },
            },
            {
              label: '+ Dismiss',
              props: { message: 'Draft saved automatically.', actionLabel: 'View draft', onAction: () => {}, onDismiss: () => {} },
            },
          ].map((row, i, arr) => (
            <div
              key={row.label}
              className={`flex items-center gap-8 px-6 py-5 hover:bg-gray-50 transition-colors ${
                i < arr.length - 1 ? 'border-b border-gray-100' : ''
              }`}
            >
              <code className="text-xs font-mono text-gray-400 w-28 flex-shrink-0 leading-relaxed">
                {row.label}
              </code>
              <Snackbar {...(row.props as Parameters<typeof Snackbar>[0])} />
            </div>
          ))}
        </div>
      </div>

      {/* ── Positions ───────────────────────────────────────── */}
      <div className="mb-20">
        <h2 className="text-2xl font-semibold mb-2 text-gray-900">Positions</h2>
        <p className="text-sm text-gray-500 mb-6 leading-relaxed">
          The <code className="font-mono">SnackbarRegion</code> wrapper controls where the
          snackbar stack is anchored using the <code className="font-mono">position</code> prop.
          Use "Launch preview" on each card to see it at the real viewport position.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {POSITION_META.map(p => (
            <PositionCard key={p.position} {...p} />
          ))}
        </div>
      </div>

      {/* ── Design tokens ────────────────────────────────────── */}
      <div className="mb-20">
        <h2 className="text-2xl font-semibold mb-2 text-gray-900">Design tokens</h2>
        <p className="text-sm text-gray-500 mb-6 leading-relaxed">
          Every colour, spacing, border, and typography value is driven by a{' '}
          <code className="font-mono">--*</code> token. Switching brands in the theme
          picker updates all values simultaneously with no component code changes. The drop shadow
          is the only hardcoded value — it uses a fixed RGBA formula to ensure legibility across
          all background colours.
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
                label: 'ARIA live region',
                text:  'The snackbar root carries role="status", aria-live="polite", and aria-atomic="true". Screen readers announce the message when it enters the DOM without interrupting the current reading flow. For error-severity snackbars in critical flows, consider aria-live="assertive" to prioritise the announcement.',
              },
              {
                label: 'Auto-dismiss timeout',
                text:  'WCAG 2.2 Success Criterion 2.2.1 requires that users can extend or disable time limits. Provide at minimum a 5-second display window, or include a dismiss button so users can remove the snackbar at their own pace.',
              },
              {
                label: 'Colour is never the sole signal',
                text:  'Each sentiment has a distinct default icon alongside its colour. Always include a descriptive message so users who cannot perceive colour still understand the nature of the notification.',
              },
              {
                label: 'Dismiss button label',
                text:  'The dismiss button carries aria-label="Dismiss" because it contains only an icon with no visible text. This gives screen reader users a clear, actionable label.',
              },
              {
                label: 'Keyboard reachability',
                text:  'The snackbar\'s action and dismiss buttons are native <button> elements and receive focus in document order. Because the snackbar is a transient overlay, avoid forcing focus into it automatically — let the user navigate to it if needed.',
              },
              {
                label: 'Motion sensitivity',
                text:  'If you add enter/exit animations, respect the prefers-reduced-motion media query. Provide a simple opacity-only fade as the reduced-motion alternative to slide or scale transitions.',
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

        {/* Snackbar props */}
        <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Snackbar</p>
        <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden mb-8">
          <div className="grid grid-cols-[140px_220px_100px_1fr] border-b border-gray-100 px-6 py-3 bg-gray-50">
            {['Prop', 'Type', 'Default', 'Description'].map(h => (
              <div key={h} className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                {h}
              </div>
            ))}
          </div>
          {[
            {
              prop: 'sentiment',
              type: '"neutral" | "info" | "success" | "warning" | "error"',
              def:  '"neutral"',
              desc: 'Controls the background colour, inverse text colour, and default leading icon. Choose based on the nature of the feedback.',
            },
            {
              prop: 'message',
              type: 'string',
              def:  '""',
              desc: 'Main body text of the snackbar. Keep it concise — ideally one short sentence.',
            },
            {
              prop: 'actionLabel',
              type: 'string',
              def:  '—',
              desc: 'Label for the inline action button. Has no effect unless onAction is also provided. A separator appears automatically between the message and action.',
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
              desc: 'Called when the dismiss button (×) is clicked. Providing this prop renders the close button. The caller is responsible for removing the snackbar from the tree.',
            },
            {
              prop: 'icon',
              type: 'ReactNode',
              def:  '—',
              desc: "Custom icon overriding the default sentiment icon. Inherits currentColor from the sentiment's text. Mark it aria-hidden if decorative.",
            },
            {
              prop: 'showIcon',
              type: 'boolean',
              def:  'true',
              desc: 'Toggles the leading sentiment icon. Set to false to suppress the icon when horizontal space is constrained.',
            },
          ].map((row, i, arr) => (
            <div
              key={row.prop}
              className={`grid grid-cols-[140px_220px_100px_1fr] items-start px-6 py-4 hover:bg-gray-50 transition-colors ${
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

        {/* SnackbarRegion props */}
        <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">SnackbarRegion</p>
        <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden">
          <div className="grid grid-cols-[140px_220px_100px_1fr] border-b border-gray-100 px-6 py-3 bg-gray-50">
            {['Prop', 'Type', 'Default', 'Description'].map(h => (
              <div key={h} className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                {h}
              </div>
            ))}
          </div>
          {[
            {
              prop: 'position',
              type: '"bottom-center" | "bottom-left" | "bottom-right" | "top-center"',
              def:  '"bottom-center"',
              desc: 'Controls where the snackbar stack is anchored in the viewport. The region uses position: fixed so it always overlays the page content.',
            },
            {
              prop: 'children',
              type: 'ReactNode',
              def:  '—',
              desc: 'One or more <Snackbar> elements to stack within the region. The region adds a gap between them using --space-small.',
            },
          ].map((row, i, arr) => (
            <div
              key={row.prop}
              className={`grid grid-cols-[140px_220px_100px_1fr] items-start px-6 py-4 hover:bg-gray-50 transition-colors ${
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