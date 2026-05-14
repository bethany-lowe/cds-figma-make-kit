import { useState } from 'react';
import { Checkbox } from './ui/Checkbox';
import { useTheme } from '../contexts/ThemeContext';

// ── State showcase rows ───────────────────────────────────────
const STATE_ROWS = [
  { label: 'Checked',                 checked: true,  indeterminate: false, disabled: false },
  { label: 'Unchecked',               checked: false, indeterminate: false, disabled: false },
  { label: 'Indeterminate',           checked: false, indeterminate: true,  disabled: false },
  { label: 'Checked, disabled',       checked: true,  indeterminate: false, disabled: true  },
  { label: 'Unchecked, disabled',     checked: false, indeterminate: false, disabled: true  },
  { label: 'Indeterminate, disabled', checked: false, indeterminate: true,  disabled: true  },
];

// ── Design token rows ─────────────────────────────────────────
const TOKEN_ROWS = [
  { prop: 'Control — unchecked border',       token: '--background-primary',       note: 'Brand primary purple'         },
  { prop: 'Control — checked fill',           token: '--background-primary',       note: 'Brand primary purple'         },
  { prop: 'Control — indeterminate fill',     token: '--background-primary',       note: 'Same as checked'              },
  { prop: 'Control — hover border',           token: '--border-primary',           note: 'Lighter primary purple'       },
  { prop: 'Control — hover fill',             token: '--border-primary',           note: 'Matches hover border'         },
  { prop: 'Icon (check / minus)',             token: '--color-base-white',         note: 'Always white'                 },
  { prop: 'Disabled border (unchecked)',      token: '--border-neutral',           note: 'Muted grey'                   },
  { prop: 'Disabled fill (checked / indet.)', token: '--background-disabled-bold', note: 'Muted when disabled'          },
  { prop: 'Label text',                       token: '--text-neutral',             note: ''                             },
  { prop: 'Disabled text',                    token: '--text-disabled',            note: ''                             },
  { prop: 'Focus ring',                       token: '--border-info',              note: 'Blue keyboard outline'        },
  { prop: 'Border width',                     token: '--border-width-thick',       note: ''                             },
  { prop: 'Border radius',                    token: '--radius-small',             note: '4 px'                         },
  { prop: 'Gap (control ↔ label)',             token: '--space-small',              note: '8 px'                         },
  { prop: 'Label font size',                  token: '--text-size-4',              note: '14 px'                        },
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
type CheckState = 'unchecked' | 'checked' | 'indeterminate';

function buildSnippet(
  checkState: CheckState,
  disabled: boolean,
  size: 'medium' | 'small',
  label: string,
) {
  const lines = ['<Checkbox'];
  if (checkState === 'checked')       lines.push('  checked={true}');
  if (checkState === 'checked')       lines.push('  onChange={setChecked}');
  if (checkState === 'indeterminate') lines.push('  indeterminate');
  if (disabled)                       lines.push('  disabled');
  if (size !== 'medium')              lines.push(`  size="${size}"`);
  if (label)                          lines.push(`  label="${label}"`);
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
export function CheckboxPage() {
  const { brandFont, brandName } = useTheme();

  // Playground state
  const [checkState,   setCheckState]   = useState<CheckState>('checked');
  const [playDisabled, setPlayDisabled] = useState(false);
  const [playSize,     setPlaySize]     = useState<'medium' | 'small'>('medium');
  const [playLabel,    setPlayLabel]    = useState('Label');
  const [activeTab,    setActiveTab]    = useState<'preview' | 'code'>('preview');

  const { copied, copy } = useCopy();
  const snippet = buildSnippet(checkState, playDisabled, playSize, playLabel);

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
            Checkbox
          </h1>
          <p className="text-base text-gray-600 leading-relaxed max-w-2xl">
            A binary selection control that supports three visual states: unchecked, checked, and
            indeterminate. The CDS Checkbox renders a fully-accessible native input behind a
            token-driven custom control, with check and minus icons sourced from the CDS icon
            library. Automatically adopts the active {brandName} brand palette.
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
              label="State"
              value={checkState}
              onChange={setCheckState}
              options={[
                { value: 'unchecked',     label: 'Unchecked'     },
                { value: 'checked',       label: 'Checked'       },
                { value: 'indeterminate', label: 'Indeterminate' },
              ]}
            />
            <PillSelector
              label="Size"
              value={playSize}
              onChange={setPlaySize}
              options={[
                { value: 'medium', label: 'Medium' },
                { value: 'small',  label: 'Small'  },
              ]}
            />
            <TogglePill label="Disabled" value={playDisabled} onChange={setPlayDisabled} />

            {/* Editable label */}
            <div>
              <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Label text
              </div>
              <input
                type="text"
                value={playLabel}
                onChange={e => setPlayLabel(e.target.value)}
                className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs text-gray-700 bg-white focus:outline-none focus:border-gray-400 w-36"
                placeholder="Label"
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
              <Checkbox
                checked={checkState === 'checked'}
                indeterminate={checkState === 'indeterminate'}
                onChange={() => {}}
                disabled={playDisabled}
                size={playSize}
                label={playLabel || undefined}
              />
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
          Six core states — checked, unchecked, and indeterminate in both enabled and disabled —
          shown at medium and small sizes. Hover states are applied interactively in the playground
          above.
        </p>

        <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden">
          <div className="grid grid-cols-[200px_1fr_1fr] border-b border-gray-100 px-6 py-3 bg-gray-50">
            {['State', 'Medium', 'Small'].map(h => (
              <div key={h} className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                {h}
              </div>
            ))}
          </div>

          {STATE_ROWS.map((row, i) => (
            <div
              key={row.label}
              className={`grid grid-cols-[200px_1fr_1fr] items-center gap-4 px-6 py-6 hover:bg-gray-50 transition-colors ${
                i < STATE_ROWS.length - 1 ? 'border-b border-gray-100' : ''
              }`}
            >
              <span className="text-sm font-medium text-gray-700">{row.label}</span>

              <Checkbox
                checked={row.checked}
                indeterminate={row.indeterminate}
                onChange={() => {}}
                disabled={row.disabled}
                size="medium"
                label="Label"
              />

              <Checkbox
                checked={row.checked}
                indeterminate={row.indeterminate}
                onChange={() => {}}
                disabled={row.disabled}
                size="small"
                label="Label"
              />
            </div>
          ))}
        </div>
      </div>

      {/* ── Indeterminate ────────────────────────────────────── */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-2 text-gray-900">Indeterminate</h2>
        <p className="text-sm text-gray-500 mb-6 leading-relaxed">
          The <code className="font-mono">indeterminate</code> prop is used for "select all" parent
          checkboxes when only some children are checked. It renders a minus icon and is set via
          JavaScript — it cannot be expressed as an HTML attribute.
        </p>

        <div className="bg-white border border-gray-200 rounded-3xl p-8">
          <IndeterminateDemo />
        </div>
      </div>

      {/* ── Checkbox group ───────────────────────────────────── */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-2 text-gray-900">Checkbox group</h2>
        <p className="text-sm text-gray-500 mb-6 leading-relaxed">
          Unlike radio buttons, multiple checkboxes can be selected simultaneously. Group them
          within a <code className="font-mono">{'<fieldset>'}</code> with a{' '}
          <code className="font-mono">{'<legend>'}</code> for screen reader context.
        </p>

        <div className="bg-white border border-gray-200 rounded-3xl p-8">
          <GroupDemo />
        </div>
      </div>

      {/* ── Design tokens ────────────────────────────────────── */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-2 text-gray-900">Design tokens</h2>
        <p className="text-sm text-gray-500 mb-6 leading-relaxed">
          Every colour, spacing, and typography value is driven by a{' '}
          <code className="font-mono">--cds-*</code> token. Switching brands in the theme picker
          above updates all token values simultaneously.
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
              <span className="inline-block px-3 py-1 rounded-full text-xs font-mono text-gray-600">{row.token}</span>
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
                label: 'Native input',
                text: 'Checkbox renders a real <input type="checkbox"> hidden off-screen. The browser handles all keyboard interaction, form submission, and assistive-technology announcements natively.',
              },
              {
                label: 'Label association',
                text: 'The visible label is wrapped in a <label> element with a matching htmlFor/id pair generated by useId(). Screen readers announce the label when the control receives focus.',
              },
              {
                label: 'Keyboard navigation',
                text: 'Tab moves focus to the checkbox. Space toggles the checked state. A blue focus ring (--cds-border-info) is shown on :focus-visible for keyboard users.',
              },
              {
                label: 'Indeterminate state',
                text: 'The indeterminate prop sets element.indeterminate via a ref, which assistive technologies announce as "mixed". It does not affect the underlying checked value.',
              },
              {
                label: 'Grouping',
                text: 'Wrap related checkboxes in a <fieldset> with a <legend> to give screen readers the group label context ("Notification preferences: Email, SMS, Push").',
              },
              {
                label: 'Disabled state',
                text: 'Disabled checkboxes use the native disabled attribute so they are correctly skipped during keyboard navigation and announced as unavailable by screen readers.',
              },
              {
                label: 'Colour contrast',
                text: 'All state token combinations (unchecked border on white, checked fill on white, label text on white) meet WCAG AA 4.5:1 minimum contrast.',
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
          <div className="grid grid-cols-[130px_1fr_100px_1fr] border-b border-gray-100 px-6 py-3 bg-gray-50">
            {['Prop', 'Type', 'Default', 'Description'].map(h => (
              <div key={h} className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                {h}
              </div>
            ))}
          </div>
          {[
            {
              prop: 'label',
              type: 'string',
              def:  '—',
              desc: 'Visible label text rendered beside the control.',
            },
            {
              prop: 'checked',
              type: 'boolean',
              def:  '—',
              desc: 'Controlled checked state. Pair with onChange.',
            },
            {
              prop: 'defaultChecked',
              type: 'boolean',
              def:  '—',
              desc: 'Uncontrolled initial checked state.',
            },
            {
              prop: 'indeterminate',
              type: 'boolean',
              def:  'false',
              desc: 'Shows a minus icon — used for parent "select all" with mixed child selections.',
            },
            {
              prop: 'disabled',
              type: 'boolean',
              def:  'false',
              desc: 'Disables interaction and applies muted token styles.',
            },
            {
              prop: 'size',
              type: '"medium" | "small"',
              def:  '"medium"',
              desc: 'medium = 28 px control · small = 20 px control.',
            },
            {
              prop: 'name',
              type: 'string',
              def:  '—',
              desc: 'HTML checkbox name — useful for form grouping.',
            },
            {
              prop: 'value',
              type: 'string',
              def:  '—',
              desc: 'HTML checkbox value submitted with the form.',
            },
            {
              prop: 'onChange',
              type: '(e: ChangeEvent) => void',
              def:  '—',
              desc: 'Change handler for controlled usage.',
            },
            {
              prop: 'className',
              type: 'string',
              def:  '""',
              desc: 'Extra class names forwarded to the wrapper <label>.',
            },
          ].map((row, i, arr) => (
            <div
              key={row.prop}
              className={`grid grid-cols-[130px_1fr_100px_1fr] px-6 py-3 items-start gap-4 hover:bg-gray-50 transition-colors ${
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
          All native{' '}
          <code className="font-mono">{'<input type="checkbox">'}</code> attributes (
          <code className="font-mono">aria-*</code>, <code className="font-mono">data-*</code>,
          etc.) are forwarded through to the hidden input.
        </p>
      </div>
    </div>
  );
}

// ── Indeterminate demo (self-contained) ────────────────────────
function IndeterminateDemo() {
  const options = ['Email notifications', 'SMS notifications', 'Push notifications'];
  const [selected, setSelected] = useState<boolean[]>([true, false, true]);

  const allChecked   = selected.every(Boolean);
  const noneChecked  = selected.every(v => !v);
  const someChecked  = !allChecked && !noneChecked;

  const toggleAll = () => {
    setSelected(allChecked ? [false, false, false] : [true, true, true]);
  };

  const toggle = (i: number) => {
    setSelected(prev => prev.map((v, idx) => (idx === i ? !v : v)));
  };

  return (
    <fieldset className="border-none p-0 m-0">
      <legend className="text-sm font-semibold text-gray-700 mb-4">Notification preferences</legend>
      <div className="flex flex-col gap-4">
        <Checkbox
          checked={allChecked}
          indeterminate={someChecked}
          onChange={toggleAll}
          label="All notifications"
          size="medium"
        />
        <div className="ml-9 flex flex-col gap-3 border-l-2 border-gray-100 pl-5">
          {options.map((opt, i) => (
            <Checkbox
              key={opt}
              checked={selected[i]}
              onChange={() => toggle(i)}
              label={opt}
              size="medium"
            />
          ))}
        </div>
      </div>
    </fieldset>
  );
}

// ── Checkbox group demo (self-contained) ──────────────────────
function GroupDemo() {
  const options = [
    { value: 'design',      label: 'Design'      },
    { value: 'engineering', label: 'Engineering' },
    { value: 'product',     label: 'Product'     },
    { value: 'marketing',   label: 'Marketing'   },
  ];
  const [selected, setSelected] = useState<string[]>(['design', 'product']);

  const toggle = (value: string) => {
    setSelected(prev =>
      prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
    );
  };

  return (
    <fieldset className="border-none p-0 m-0">
      <legend className="text-sm font-semibold text-gray-700 mb-4">Select your teams</legend>
      <div className="flex flex-col gap-4">
        {options.map(opt => (
          <Checkbox
            key={opt.value}
            checked={selected.includes(opt.value)}
            onChange={() => toggle(opt.value)}
            label={opt.label}
            size="medium"
          />
        ))}
      </div>
    </fieldset>
  );
}

export default CheckboxPage;