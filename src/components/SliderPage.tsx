import { useState } from 'react';
import { Slider, SliderSize, SliderValue, FeedbackCaptionVariant } from './ui/Slider';
import { useTheme } from '../contexts/ThemeContext';

// ── State showcase rows ───────────────────────────────────────
const STATE_ROWS: {
  label:      string;
  value:      number;
  disabled?:  boolean;
  loading?:   boolean;
  error?:     boolean;
  helperText?: string;
}[] = [
  { label: 'Default',              value: 50 },
  { label: 'With value shown',     value: 65 },
  { label: 'At minimum (inactive)',value: 0  },
  { label: 'Error',                value: 40, error: true,    helperText: 'Value out of acceptable range.' },
  { label: 'Loading',              value: 50, loading: true                                               },
  { label: 'Disabled',             value: 60, disabled: true                                              },
];

// ── Design token rows ─────────────────────────────────────────
const TOKEN_ROWS = [
  { prop: 'Track fill',              token: '--background-primary',      note: 'Brand primary purple'     },
  { prop: 'Knob fill',               token: '--background-primary',      note: 'Brand primary purple'     },
  { prop: 'Knob — hover/active',     token: '--background-primary-bold', note: 'Darker on interaction'    },
  { prop: 'Knob inactive (at min)',   token: '--border-primary',          note: 'Lighter primary purple'   },
  { prop: 'Error fill',              token: '--background-error',        note: 'Error red'                },
  { prop: 'Error knob',              token: '--background-error',        note: 'Error red'                },
  { prop: 'Error knob inactive',     token: '--border-error',            note: 'Muted error'              },
  { prop: 'Focus ring (inner)',       token: '--background-app',          note: 'White gap ring'           },
  { prop: 'Focus ring (outer)',       token: '--background-primary-bold', note: 'Dark brand ring'          },
  { prop: 'Track background',        token: '--background-app',          note: 'White surface'            },
  { prop: 'Track border',            token: '--border-neutral',          note: 'Subtle grey stroke'       },
  { prop: 'Track border width',      token: '--border-width-thin',       note: '1 px'                     },
  { prop: 'Track border radius',     token: '--radius-medium',           note: '12 px'                    },
  { prop: 'Disabled opacity',        token: '--opacity-medium',          note: '0.6'                      },
  { prop: 'Label text',              token: '--text-neutral-bolder',     note: 'Black / near-black'       },
  { prop: 'Value text',              token: '--text-neutral',            note: 'Grey'                     },
  { prop: 'Helper text',             token: '--text-neutral',            note: 'Grey'                     },
  { prop: 'Error helper text',       token: '--text-error',              note: 'Error red'                },
  { prop: 'Gap (label ↔ track)',      token: '--space-xsmall',           note: '4 px'                     },
  { prop: 'Label font size',         token: '--text-size-3',             note: '13 px · semibold'         },
  { prop: 'Value / helper font size', token: '--text-size-2',            note: '12 px · regular'          },
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
function buildSnippet({
  size, range, showValue, disabled, loading, error, steps, label, helperText, captionVariant,
}: {
  size: SliderSize; range: boolean; showValue: boolean;
  disabled: boolean; loading: boolean; error: boolean;
  steps: number; label: string; helperText: string;
  captionVariant: FeedbackCaptionVariant | 'none';
}) {
  const lines = ['<Slider'];
  lines.push(`  label="${label || 'Volume'}"`);
  if (range)       lines.push('  range');
  if (showValue)   lines.push('  showValue');
  if (size !== 'medium') lines.push(`  size="${size}"`);
  if (steps > 0)   lines.push(`  steps={${steps}}`);
  lines.push('  value={value}');
  lines.push('  onChange={setValue}');
  if (helperText)  lines.push(`  helperText="${helperText}"`);
  if (captionVariant !== 'none') lines.push(`  captionVariant="${captionVariant}"`);
  if (error)       lines.push('  error');
  if (disabled)    lines.push('  disabled');
  if (loading)     lines.push('  loading');
  lines.push('/>');
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

// ── Toggle pill ───────────────────────────────────────────────
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

// ── Page ──────────────────────────────────────────────────────
export function SliderPage() {
  const { brandFont, brandName } = useTheme();

  // Playground state
  const [playSize,       setPlaySize]       = useState<SliderSize>('medium');
  const [playRange,      setPlayRange]      = useState(false);
  const [playShowValue,  setPlayShowValue]  = useState(true);
  const [playDisabled,   setPlayDisabled]   = useState(false);
  const [playLoading,    setPlayLoading]    = useState(false);
  const [playError,      setPlayError]      = useState(false);
  const [playSteps,      setPlaySteps]      = useState<number>(0);
  const [playLabel,      setPlayLabel]      = useState('Volume');
  const [playHelper,     setPlayHelper]     = useState('');
  const [playCaptionVariant, setPlayCaptionVariant] = useState<FeedbackCaptionVariant | 'none'>('none');
  const [playValue,      setPlayValue]      = useState<SliderValue>(40);
  const [activeTab,      setActiveTab]      = useState<'preview' | 'code'>('preview');

  const { copied, copy } = useCopy();
  const snippet = buildSnippet({
    size: playSize, range: playRange, showValue: playShowValue,
    disabled: playDisabled, loading: playLoading, error: playError,
    steps: playSteps, label: playLabel, helperText: playHelper,
    captionVariant: playCaptionVariant,
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
            Slider
          </h1>
          <p className="text-base text-gray-600 leading-relaxed max-w-2xl">
            A horizontal range input that lets users select a numeric value — or a range of values —
            by dragging a knob along a track. Supports single and dual-knob (range) modes, three
            sizes, step markers, error and loading states, and an optional helper text. All visual
            properties are driven by <code className="font-mono">--*</code> semantic tokens and
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
              label="Size"
              value={playSize}
              onChange={setPlaySize}
              options={[
                { value: 'small',  label: 'Small'  },
                { value: 'medium', label: 'Medium' },
                { value: 'large',  label: 'Large'  },
              ]}
            />
            {/* Steps numeric input */}
            <div>
              <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Markers (3–8, 0 = none)
              </div>
              <input
                type="number"
                min={0}
                max={8}
                value={playSteps}
                onChange={e => {
                  const n = parseInt(e.target.value, 10);
                  setPlaySteps(isNaN(n) ? 0 : Math.min(8, Math.max(0, n)));
                }}
                className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs text-gray-700 bg-white focus:outline-none focus:border-gray-400 w-24"
              />
            </div>
            <TogglePill label="Range"      value={playRange}      onChange={v => { setPlayRange(v); setPlayValue(v ? [20, 75] : 40); }} />
            <TogglePill label="Show value" value={playShowValue}  onChange={setPlayShowValue}  />
            <TogglePill label="Error"      value={playError}      onChange={setPlayError}      />
            <TogglePill label="Loading"    value={playLoading}    onChange={setPlayLoading}    />
            <TogglePill label="Disabled"   value={playDisabled}   onChange={setPlayDisabled}   />

            {/* Caption variant */}
            <PillSelector
              label="Caption variant"
              value={playCaptionVariant}
              onChange={v => {
                setPlayCaptionVariant(v);
                // Auto-seed helper text so the caption is always visible
                if (v !== 'none' && !playHelper) {
                  const defaults: Record<string, string> = {
                    info:    'This setting affects all connected devices.',
                    error:   'Value exceeds the recommended threshold.',
                  };
                  setPlayHelper(defaults[v] ?? '');
                }
              }}
              options={[
                { value: 'none',  label: 'Plain' },
                { value: 'info',  label: 'Info'  },
                { value: 'error', label: 'Error' },
              ]}
            />

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
                placeholder="Volume"
              />
            </div>

            {/* Editable helper text */}
            <div>
              <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Helper text
              </div>
              <input
                type="text"
                value={playHelper}
                onChange={e => setPlayHelper(e.target.value)}
                className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs text-gray-700 bg-white focus:outline-none focus:border-gray-400 w-44"
                placeholder="Optional caption…"
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
                <Slider
                  value={playValue}
                  onChange={setPlayValue}
                  label={playLabel || undefined}
                  showValue={playShowValue}
                  size={playSize}
                  range={playRange}
                  steps={playSteps}
                  disabled={playDisabled}
                  loading={playLoading}
                  error={playError}
                  helperText={playHelper || undefined}
                  captionVariant={playCaptionVariant !== 'none' ? playCaptionVariant : undefined}
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

      {/* ── States ──────────────────────────────────────────── */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-2 text-gray-900">States</h2>
        <p className="text-sm text-gray-500 mb-6 leading-relaxed">
          Six core states shown at all three sizes. Hover and drag states are interactive — try
          dragging a knob in the playground above.
        </p>

        <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-[200px_1fr_1fr_1fr] border-b border-gray-100 px-6 py-3 bg-gray-50">
            {['State', 'Small', 'Medium', 'Large'].map(h => (
              <div key={h} className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                {h}
              </div>
            ))}
          </div>

          {STATE_ROWS.map((row, i) => (
            <div
              key={row.label}
              className={`grid grid-cols-[200px_1fr_1fr_1fr] items-center gap-6 px-6 py-6 hover:bg-gray-50 transition-colors ${
                i < STATE_ROWS.length - 1 ? 'border-b border-gray-100' : ''
              }`}
            >
              <span className="text-sm font-medium text-gray-700">{row.label}</span>

              {(['small', 'medium', 'large'] as SliderSize[]).map(sz => (
                <Slider
                  key={sz}
                  defaultValue={row.value}
                  size={sz}
                  showValue={row.label === 'With value shown'}
                  disabled={row.disabled}
                  loading={row.loading}
                  error={row.error}
                  helperText={row.helperText}
                  label={row.label === 'With value shown' ? 'Volume' : undefined}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── Range mode ────────────────────────────────────────── */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-2 text-gray-900">Range mode</h2>
        <p className="text-sm text-gray-500 mb-6 leading-relaxed">
          Pass <code className="font-mono">range</code> to enable dual-knob selection. The
          fill spans between the two knobs. Each knob has its own ARIA role, value, and keyboard
          handler so they can be moved independently.
        </p>

        <div className="bg-white border border-gray-200 rounded-3xl p-8">
          <RangeDemo />
        </div>
      </div>

      {/* ── Step markers ─────────────────────────────────────── */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-2 text-gray-900">Step markers</h2>
        <p className="text-sm text-gray-500 mb-6 leading-relaxed">
          The <code className="font-mono">steps</code> prop (3–8) places evenly-spaced visual dots
          inside the track to hint at discrete positions. Step markers do not constrain the value —
          use the <code className="font-mono">step</code> prop for that.
        </p>

        <div className="bg-white border border-gray-200 rounded-3xl p-8 flex flex-col gap-8">
          {[3, 5, 8].map(n => (
            <Slider
              key={n}
              defaultValue={50}
              label={`${n} step markers`}
              steps={n}
              showValue
              size="medium"
            />
          ))}
        </div>
      </div>

      {/* ── FeedbackCaption variants ──────────────────────────── */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-2 text-gray-900">FeedbackCaption variants</h2>
        <p className="text-sm text-gray-500 mb-6 leading-relaxed">
          Pass <code className="font-mono">captionVariant</code> alongside{' '}
          <code className="font-mono">helperText</code> to render the caption through the{' '}
          <code className="font-mono">FeedbackCaption</code> sub-component with a semantic icon.
          When <code className="font-mono">error</code> is true and no{' '}
          <code className="font-mono">captionVariant</code> is set, the error variant is applied
          automatically.
        </p>

        <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden">
          {[
            {
              label:   'Plain (no captionVariant)',
              helperText: 'Adjust the value between 0 and 100.',
              captionVariant: undefined,
              error: false,
              value: 50,
            },
            {
              label:   'captionVariant="info"',
              helperText: 'This setting affects all connected devices.',
              captionVariant: 'info' as FeedbackCaptionVariant,
              error: false,
              value: 35,
            },
            {
              label:   'captionVariant="error" (explicit)',
              helperText: 'Value exceeds the recommended threshold.',
              captionVariant: 'error' as FeedbackCaptionVariant,
              error: false,
              value: 90,
            },
            {
              label:   'error=true (auto error variant)',
              helperText: 'Value out of acceptable range.',
              captionVariant: undefined,
              error: true,
              value: 15,
            },
          ].map((row, i, arr) => (
            <div
              key={row.label}
              className={`flex items-start gap-8 px-6 py-6 hover:bg-gray-50 transition-colors ${
                i < arr.length - 1 ? 'border-b border-gray-100' : ''
              }`}
            >
              <span className="text-sm font-medium text-gray-700 w-56 flex-shrink-0 pt-1">
                <code className="font-mono text-xs text-gray-500">{row.label}</code>
              </span>
              <div className="flex-1 max-w-xs">
                <Slider
                  defaultValue={row.value}
                  label="Brightness"
                  showValue
                  size="medium"
                  helperText={row.helperText}
                  captionVariant={row.captionVariant}
                  error={row.error}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Design tokens ───────────────────────────────────── */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-2 text-gray-900">Design tokens</h2>
        <p className="text-sm text-gray-500 mb-6 leading-relaxed">
          Every colour, size, spacing, and typography value is driven by a{' '}
          <code className="font-mono">--*</code> token. Switching brands in the theme picker
          updates all values simultaneously with no component code changes.
        </p>

        <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden">
          <div className="grid grid-cols-[1fr_260px_1fr] border-b border-gray-100 px-6 py-3 bg-gray-50">
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Property</div>
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Token</div>
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Note</div>
          </div>
          {TOKEN_ROWS.map((row, i) => (
            <div
              key={row.prop}
              className={`grid grid-cols-[1fr_260px_1fr] items-center px-6 py-3 hover:bg-gray-50 transition-colors ${
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
                label: 'ARIA slider role',
                text:  'Each draggable knob carries role="slider" with aria-valuenow, aria-valuemin, and aria-valuemax so screen readers announce the current value and bounds on focus.',
              },
              {
                label: 'Label association',
                text:  'In single-knob mode a <label> element is linked to the knob via htmlFor/id (generated by useId()). In range mode each knob receives aria-label ("Volume minimum" / "Volume maximum") since two knobs share one visible label.',
              },
              {
                label: 'Keyboard navigation',
                text:  'Arrow Right / Arrow Up → increase value by one step. Arrow Left / Arrow Down → decrease. Home → minimum. End → maximum. Each key press triggers aria-valuenow to update, which screen readers announce immediately.',
              },
              {
                label: 'Pointer capture',
                text:  'The component uses setPointerCapture so dragging remains accurate even if the pointer leaves the track element. This also prevents accidental text selection during drag.',
              },
              {
                label: 'Error state',
                text:  'When error is true, the knob carries aria-invalid="true" and aria-describedby is linked to the helper text element so the error message is read out on focus.',
              },
              {
                label: 'Disabled & loading',
                text:  'Disabled knobs receive tabIndex={-1} and aria-disabled so they are correctly skipped during keyboard navigation. The loading state also removes pointer events until data is ready.',
              },
              {
                label: 'Focus ring',
                text:  'An inset double-ring focus indicator (--background-app + --background-primary-bold) remains visible inside the track bounds, meeting WCAG 2.4.11 Focus Appearance.',
              },
              {
                label: 'Colour contrast',
                text:  'The white notch icon on the primary-coloured knob, and all text token combinations, meet WCAG AA 4.5:1 contrast on the #FAFAFA page background.',
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
          <div className="grid grid-cols-[130px_240px_110px_1fr] border-b border-gray-100 px-6 py-3 bg-gray-50">
            {['Prop', 'Type', 'Default', 'Description'].map(h => (
              <div key={h} className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                {h}
              </div>
            ))}
          </div>
          {[
            { prop: 'value',        type: 'number | [number, number]',   def: '—',          desc: 'Controlled value. Single number in default mode; [lo, hi] tuple in range mode. Pair with onChange.' },
            { prop: 'defaultValue', type: 'number | [number, number]',   def: 'min / [min,max]', desc: 'Initial uncontrolled value.' },
            { prop: 'onChange',     type: '(value: SliderValue) => void', def: '—',         desc: 'Called with the new value on every pointer move or key press.' },
            { prop: 'min',          type: 'number',                       def: '0',          desc: 'Minimum selectable value.' },
            { prop: 'max',          type: 'number',                       def: '100',        desc: 'Maximum selectable value.' },
            { prop: 'step',         type: 'number',                       def: '1',          desc: 'Snap increment for keyboard and mouse dragging.' },
            { prop: 'label',        type: 'string',                       def: '—',          desc: 'Visible label rendered above the track.' },
            { prop: 'showValue',    type: 'boolean',                      def: 'false',      desc: 'Displays the current numeric value to the right of the label.' },
            { prop: 'size',         type: '"small" | "medium" | "large"', def: '"medium"',   desc: 'Track height and knob size. small = 32 px · medium = 40 px · large = 48 px.' },
            { prop: 'range',        type: 'boolean',                      def: 'false',      desc: 'Enables dual-knob range mode. value must be a [lo, hi] tuple.' },
            { prop: 'steps',        type: 'number (3–8)',                 def: '0',          desc: 'Number of evenly-spaced visual step markers drawn inside the track.' },
            { prop: 'disabled',     type: 'boolean',                      def: 'false',      desc: 'Dims the component and prevents all interaction.' },
            { prop: 'loading',      type: 'boolean',                      def: 'false',      desc: 'Hides the knob and fill — use while data is not yet available.' },
            { prop: 'error',        type: 'boolean',                      def: 'false',      desc: 'Applies error colour tokens to fill, knob, and helper text.' },
            { prop: 'helperText',   type: 'string',                       def: '—',          desc: 'Caption shown below the track. Coloured red when error is true.' },
            { prop: 'captionVariant', type: '\"info\" | \"error\"', def: '—', desc: 'Renders helperText via FeedbackCaption with a semantic icon. Only info and error are supported on Slider. When omitted and error=true, the error variant is applied automatically.' },
            { prop: 'knobIcon',     type: 'ReactNode',                    def: '<NotchIcon />', desc: 'Custom icon rendered inside the knob. Defaults to a vertical notch bar.' },
            { prop: 'stepIcon',     type: 'ReactNode',                    def: '<dot />',    desc: 'Custom content rendered at each step marker position.' },
          ].map((row, i, arr) => (
            <div
              key={row.prop}
              className={`grid grid-cols-[130px_240px_110px_1fr] px-6 py-3 items-start gap-4 hover:bg-gray-50 transition-colors ${
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
          The component renders a plain <code className="font-mono">{'<div>'}</code> tree; all
          ARIA attributes are applied directly to the knob element(s).
        </p>
      </div>
    </div>
  );
}

// ── Range mode demo (self-contained) ──────────────────────────
function RangeDemo() {
  const [priceRange, setPriceRange] = useState<SliderValue>([200, 700]);
  const [tempRange,  setTempRange]  = useState<SliderValue>([16, 24]);

  const [lo1, hi1] = Array.isArray(priceRange) ? priceRange : [0, priceRange as number];
  const [lo2, hi2] = Array.isArray(tempRange)  ? tempRange  : [0, tempRange as number];

  return (
    <div className="flex flex-col gap-10 max-w-md">
      <div className="flex flex-col gap-1">
        <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-2">
          Price range
        </p>
        <Slider
          range
          value={priceRange}
          onChange={setPriceRange}
          min={0}
          max={1000}
          step={10}
          label="Price range"
          showValue={false}
          size="medium"
        />
        <div className="flex justify-between mt-1">
          <span className="text-sm text-gray-500">${lo1}</span>
          <span className="text-sm text-gray-500">${hi1}</span>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-2">
          Temperature range
        </p>
        <Slider
          range
          value={tempRange}
          onChange={setTempRange}
          min={10}
          max={32}
          step={1}
          label="Temperature"
          showValue={false}
          size="large"
          steps={5}
        />
        <div className="flex justify-between mt-1">
          <span className="text-sm text-gray-500">{lo2} °C</span>
          <span className="text-sm text-gray-500">{hi2} °C</span>
        </div>
      </div>

      <div>
        <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-2">
          Disabled range
        </p>
        <Slider
          range
          defaultValue={[30, 70]}
          label="Locked range"
          disabled
          size="medium"
        />
      </div>
    </div>
  );
}

export default SliderPage;