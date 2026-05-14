import { useState } from 'react';
import { Pill, PillGroup, PillIcon, type PillEmphasis } from './ui/Pill';
import { useTheme } from '../contexts/ThemeContext';

// ── Static data ───────────────────────────────────────────────

const TOKEN_ROWS = [
  { prop: 'Height',                        token: '48px (fixed)',                     note: 'Constant across all states'                          },
  { prop: 'Border radius',                 token: '--radius-medium',                  note: '12 px rounded corners'                               },
  { prop: 'Padding (horizontal)',          token: '--space-large',                    note: '16 px left and right inner spacing'                  },
  { prop: 'Padding (vertical)',            token: '--space-small',                    note: '8 px top and bottom inner spacing'                   },
  { prop: 'Gap — icon ↔ label',           token: '--space-small',                    note: '8 px between icon and label text'                    },
  { prop: 'Gap — pill ↔ pill',            token: '--space-medium',                   note: '12 px between adjacent pills in a group'             },
  { prop: 'Background — unselected',       token: '--background-neutral-subtle',      note: 'Resting surface; neutral lightest tint'              },
  { prop: 'Background — selected',         token: '--background-primary-subtle',      note: 'Active tint of the primary brand colour'             },
  { prop: 'Background — selected-high',    token: '--background-primary',             note: 'Bold primary fill for high-emphasis selection'       },
  { prop: 'Background — disabled',         token: '--background-disabled',            note: 'Same as disabled form controls'                      },
  { prop: 'Border color — selected',       token: '--border-primary',                 note: 'Primary stroke on the default selected state'        },
  { prop: 'Border width — selected',       token: '--border-width-thick',             note: '2 px; always reserved so layout does not shift'      },
  { prop: 'Text — unselected',             token: '--text-neutral-bold',              note: 'Near-black label on neutral surface'                 },
  { prop: 'Text — selected',               token: '--text-primary',                   note: 'Primary brand colour on subtle surface'              },
  { prop: 'Text — selected-high',          token: '--background-primary-inverse',     note: 'White (inverse) on primary filled surface'           },
  { prop: 'Text — disabled',              token: '--text-disabled',                  note: 'Muted neutral; same as disabled form text'           },
  { prop: 'Focus outline',                 token: '--border-info',                    note: '3 px ring offset 2 px; shows on keyboard navigation' },
  { prop: 'Font family',                   token: '--platform-font-default',          note: 'Inherits the active brand typeface'                  },
  { prop: 'Font size',                     token: '--text-size-5',                    note: 'Body large scale (15 px)'                            },
  { prop: 'Font weight',                   token: '600',                              note: 'Semibold; legible at small sizes'                    },
  { prop: 'Icon size',                     token: '--icon-size-medium',               note: '24 × 24 px; leading and trailing slots'              },
];

// ── Demo options ──────────────────────────────────────────────

const PLAN_OPTIONS = [
  { value: 'basic',    label: 'Basic'    },
  { value: 'standard', label: 'Standard' },
  { value: 'premium',  label: 'Premium'  },
];

const CATEGORY_OPTIONS = [
  { value: 'all',         label: 'All'         },
  { value: 'phones',      label: 'Phones'       },
  { value: 'tablets',     label: 'Tablets'      },
  { value: 'internet',    label: 'Internet'     },
  { value: 'tv',          label: 'TV'           },
];

const ICON_OPTIONS = [
  { value: 'location', label: 'Location',  leadingIcon: <PillIcon name="abstractLocation/Line" /> },
  { value: 'bolt',     label: 'Speed',     leadingIcon: <PillIcon name="abstractBolt/Line"      /> },
  { value: 'heart',    label: 'Favourites',leadingIcon: <PillIcon name="actionHeart/Line"        /> },
  { value: 'search',   label: 'Search',    leadingIcon: <PillIcon name="actionSearch/Line"       /> },
];

const CLOSE_OPTIONS = [
  { value: 'wifi',     label: 'Wi-Fi',  trailingIcon: <PillIcon name="actionClose/Line" /> },
  { value: 'roaming',  label: 'Roaming',trailingIcon: <PillIcon name="actionClose/Line" /> },
  { value: 'calls',    label: 'Calls',  trailingIcon: <PillIcon name="actionClose/Line" /> },
];

const INTEREST_OPTIONS = [
  { value: 'streaming', label: 'Streaming', leadingIcon: <PillIcon name="abstractBolt/Line" />,      trailingIcon: <PillIcon name="actionClose/Line" /> },
  { value: 'gaming',    label: 'Gaming',    leadingIcon: <PillIcon name="abstractSuccess/Line" />,   trailingIcon: <PillIcon name="actionClose/Line" /> },
  { value: 'travel',    label: 'Travel',    leadingIcon: <PillIcon name="abstractLocation/Line" />,  trailingIcon: <PillIcon name="actionClose/Line" /> },
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
  multiSelect,
  emphasis,
  leadingIcon,
  trailingIcon,
}: {
  multiSelect:  boolean;
  emphasis:     PillEmphasis;
  leadingIcon:  boolean;
  trailingIcon: boolean;
}) {
  const groupLines: string[] = ['<PillGroup'];
  groupLines.push('  options={options}');
  groupLines.push('  value={value}');
  groupLines.push('  onChange={setValue}');
  if (multiSelect)          groupLines.push('  multiSelect');
  if (emphasis !== 'default') groupLines.push(`  emphasis="${emphasis}"`);
  groupLines.push('/>');

  const optLines: string[] = ['const options = ['];
  optLines.push('  {');
  optLines.push('    value: \'standard\',');
  optLines.push('    label: \'Standard\',');
  if (leadingIcon)  optLines.push('    leadingIcon:  <PillIcon name="abstractBolt/Line" />,');
  if (trailingIcon) optLines.push('    trailingIcon: <PillIcon name="actionClose/Line" />,');
  optLines.push('  },');
  optLines.push('  // …more options');
  optLines.push('];');

  return [...optLines, '', ...groupLines].join('\n');
}

// ── Sub-components ────────────────────────────────────────────

function PillControl<T extends string>({
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

function ToggleControl({
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

export function PillPage() {
  const { brandFont, brandName } = useTheme();

  // Playground state
  const [playMulti,         setPlayMulti]         = useState(false);
  const [playEmphasis,      setPlayEmphasis]       = useState<PillEmphasis>('default');
  const [playLeadingIcon,   setPlayLeadingIcon]    = useState(false);
  const [playTrailingIcon,  setPlayTrailingIcon]   = useState(false);
  const [playSingle,        setPlaySingle]         = useState<string | null>('standard');
  const [playMultiVal,      setPlayMultiVal]       = useState<string[]>(['standard']);
  const [activeTab,         setActiveTab]          = useState<'preview' | 'code'>('preview');

  // Other section states
  const [statesSelected,    setStatesSelected]     = useState<string | null>('selected');
  const [emphasisDefault,   setEmphasisDefault]    = useState<string | null>('standard');
  const [emphasisHigh,      setEmphasisHigh]       = useState<string | null>('standard');
  const [catValue,          setCatValue]           = useState<string | null>('all');
  const [multiTagValue,     setMultiTagValue]      = useState<string[]>(['wifi', 'roaming']);
  const [iconLeadValue,     setIconLeadValue]      = useState<string | null>('bolt');
  const [iconBothValue,     setIconBothValue]      = useState<string[]>(['streaming']);

  const { copied, copy } = useCopy();

  // Build playground options
  const playOptions = PLAN_OPTIONS.map(opt => ({
    ...opt,
    leadingIcon:  playLeadingIcon  ? <PillIcon name="abstractBolt/Line"   /> : undefined,
    trailingIcon: playTrailingIcon ? <PillIcon name="actionClose/Line"    /> : undefined,
  }));

  const snippet = buildSnippet({
    multiSelect:  playMulti,
    emphasis:     playEmphasis,
    leadingIcon:  playLeadingIcon,
    trailingIcon: playTrailingIcon,
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
            Pill
          </h1>
          <p className="text-base text-gray-600 leading-relaxed max-w-2xl">
            A compact, toggleable filter chip for selecting one or more options from a flat
            list. Pills are always used within a{' '}
            <code className="font-mono">PillGroup</code> — never standalone. Three visual
            states, two emphasis levels, optional leading and trailing icons, and full
            multi-select support. Every colour, spacing, and typography value is driven by{' '}
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
            <PillControl
              label="Mode"
              value={playMulti ? 'multi' : 'single'}
              onChange={v => setPlayMulti(v === 'multi')}
              options={[
                { value: 'single', label: 'Single-select' },
                { value: 'multi',  label: 'Multi-select'  },
              ]}
            />
            <PillControl
              label="Emphasis"
              value={playEmphasis}
              onChange={setPlayEmphasis}
              options={[
                { value: 'default', label: 'Default' },
                { value: 'high',    label: 'High'    },
              ]}
            />
            <ToggleControl label="Leading icon"  value={playLeadingIcon}  onChange={setPlayLeadingIcon}  />
            <ToggleControl label="Trailing icon" value={playTrailingIcon} onChange={setPlayTrailingIcon} />
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
              <PillGroup
                options={playOptions}
                value={playMulti ? playMultiVal : playSingle}
                onChange={v => {
                  if (playMulti) setPlayMultiVal(v as string[] ?? []);
                  else setPlaySingle(v as string | null);
                }}
                multiSelect={playMulti}
                emphasis={playEmphasis}
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
      <div className="mb-20">
        <h2 className="text-2xl font-semibold mb-2 text-gray-900">States</h2>
        <p className="text-sm text-gray-500 mb-6 leading-relaxed">
          The <code className="font-mono">state</code> prop controls the pill's visual
          appearance. In practice <code className="font-mono">PillGroup</code> manages state
          automatically based on the current <code className="font-mono">value</code> and{' '}
          <code className="font-mono">emphasis</code>. Each state maps to a distinct
          background, border, and text token trio — no colour is hardcoded.
        </p>
        <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden">
          {/* Unselected */}
          <div className="px-6 py-6 border-b border-gray-100 hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-8">
              <div className="w-32 flex-shrink-0">
                <p className="text-sm font-semibold text-gray-700">Unselected</p>
                <code className="text-xs font-mono text-gray-400">state="unselected"</code>
              </div>
              <div className="flex gap-3 flex-wrap">
                <Pill label="Basic"    state="unselected" />
                <Pill label="Standard" state="unselected" />
                <Pill label="Premium"  state="unselected" />
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-3 leading-relaxed">
              Default resting state. Background: <code className="font-mono">--background-neutral-subtle</code>.
              Text: <code className="font-mono">--text-neutral-bold</code>.
            </p>
          </div>

          {/* Selected */}
          <div className="px-6 py-6 border-b border-gray-100 hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-8">
              <div className="w-32 flex-shrink-0">
                <p className="text-sm font-semibold text-gray-700">Selected</p>
                <code className="text-xs font-mono text-gray-400">state="selected"</code>
              </div>
              <div className="flex gap-3 flex-wrap">
                {/* interactive single-select example */}
                <PillGroup
                  options={[
                    { value: 'basic',    label: 'Basic'    },
                    { value: 'selected', label: 'Standard' },
                    { value: 'premium',  label: 'Premium'  },
                  ]}
                  value={statesSelected}
                  onChange={v => setStatesSelected(v as string | null)}
                  emphasis="default"
                />
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-3 leading-relaxed">
              Active state with default emphasis. Background: <code className="font-mono">--background-primary-subtle</code>.
              Border: <code className="font-mono">--border-primary</code> ({' '}
              <code className="font-mono">--border-width-thick</code>).
              Text: <code className="font-mono">--text-primary</code>.
            </p>
          </div>

          {/* Selected-high */}
          <div className="px-6 py-6 hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-8">
              <div className="w-32 flex-shrink-0">
                <p className="text-sm font-semibold text-gray-700">Selected-high</p>
                <code className="text-xs font-mono text-gray-400">state="selected-high"</code>
              </div>
              <div className="flex gap-3 flex-wrap">
                <Pill label="Basic"    state="unselected"    />
                <Pill label="Standard" state="selected-high" />
                <Pill label="Premium"  state="unselected"    />
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-3 leading-relaxed">
              Active state with high emphasis. Background: <code className="font-mono">--background-primary</code>.
              Text: <code className="font-mono">--background-primary-inverse</code> (white on primary fill).
            </p>
          </div>
        </div>
      </div>

      {/* ── Emphasis ────────────────────────────────────────── */}
      <div className="mb-20">
        <h2 className="text-2xl font-semibold mb-2 text-gray-900">Emphasis</h2>
        <p className="text-sm text-gray-500 mb-6 leading-relaxed">
          The <code className="font-mono">emphasis</code> prop on{' '}
          <code className="font-mono">PillGroup</code> controls how selected pills are
          rendered. <code className="font-mono">"default"</code> uses a subtle primary tint
          with a border — ideal for filters on a white surface.{' '}
          <code className="font-mono">"high"</code> uses a fully filled primary background —
          better contrast on coloured or image backgrounds.
        </p>
        <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden">
          {/* Default emphasis */}
          <div className="px-6 py-8 border-b border-gray-100">
            <div className="flex items-center gap-3 mb-5">
              <span className="text-sm font-semibold text-gray-700">Default</span>
              <code className="text-xs font-mono text-gray-400">emphasis="default"</code>
            </div>
            <PillGroup
              options={PLAN_OPTIONS}
              value={emphasisDefault}
              onChange={v => setEmphasisDefault(v as string | null)}
              emphasis="default"
            />
          </div>

          {/* High emphasis */}
          <div className="px-6 py-8">
            <div className="flex items-center gap-3 mb-5">
              <span className="text-sm font-semibold text-gray-700">High</span>
              <code className="text-xs font-mono text-gray-400">emphasis="high"</code>
            </div>
            <PillGroup
              options={PLAN_OPTIONS}
              value={emphasisHigh}
              onChange={v => setEmphasisHigh(v as string | null)}
              emphasis="high"
            />
          </div>
        </div>
      </div>

      {/* ── Icons ───────────────────────────────────────────── */}
      <div className="mb-20">
        <h2 className="text-2xl font-semibold mb-2 text-gray-900">Icons</h2>
        <p className="text-sm text-gray-500 mb-6 leading-relaxed">
          Both <code className="font-mono">leadingIcon</code> and{' '}
          <code className="font-mono">trailingIcon</code> accept any 24×24 ReactNode. Use{' '}
          <code className="font-mono">{'<PillIcon name="..." />'}</code> to inline an icon from the
          CDS icon manifest at <code className="font-mono">currentColor</code>, or pass a
          custom SVG element. The trailing position is typically reserved for a dismiss/close
          action that removes the filter.
        </p>
        <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden">
          {/* Leading only */}
          <div className="px-6 py-6 border-b border-gray-100 hover:bg-gray-50 transition-colors">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Leading icon</p>
            <PillGroup
              options={ICON_OPTIONS}
              value={iconLeadValue}
              onChange={v => setIconLeadValue(v as string | null)}
              emphasis="default"
            />
          </div>

          {/* Trailing only — filter chips with dismiss */}
          <div className="px-6 py-6 border-b border-gray-100 hover:bg-gray-50 transition-colors">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Trailing icon (dismiss pattern)</p>
            <PillGroup
              options={CLOSE_OPTIONS}
              value={multiTagValue}
              onChange={v => setMultiTagValue((v as string[]) ?? [])}
              multiSelect
              emphasis="high"
            />
          </div>

          {/* Both */}
          <div className="px-6 py-6 hover:bg-gray-50 transition-colors">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Leading + trailing</p>
            <PillGroup
              options={INTEREST_OPTIONS}
              value={iconBothValue}
              onChange={v => setIconBothValue((v as string[]) ?? [])}
              multiSelect
              emphasis="high"
            />
          </div>
        </div>
      </div>

      {/* ── Category filter ──────────────────────────────────── */}
      <div className="mb-20">
        <h2 className="text-2xl font-semibold mb-2 text-gray-900">Single-select — category filter</h2>
        <p className="text-sm text-gray-500 mb-6 leading-relaxed">
          The most common pattern. A single option can be selected at a time; selecting another
          pill deselects the current one. Clicking the selected pill again deselects it
          (returning to <code className="font-mono">null</code>). Use for content category
          filtering, tab-like navigation within a panel, or scope selectors.
        </p>
        <div className="bg-white border border-gray-200 rounded-3xl p-8">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Device categories</p>
          <PillGroup
            options={CATEGORY_OPTIONS}
            value={catValue}
            onChange={v => setCatValue(v as string | null)}
            emphasis="default"
          />
        </div>
      </div>

      {/* ── Multi-select ─────────────────────────────────────── */}
      <div className="mb-20">
        <h2 className="text-2xl font-semibold mb-2 text-gray-900">Multi-select</h2>
        <p className="text-sm text-gray-500 mb-6 leading-relaxed">
          Set <code className="font-mono">multiSelect</code> on{' '}
          <code className="font-mono">PillGroup</code> to allow any number of options to be
          active simultaneously. The <code className="font-mono">value</code> prop becomes a{' '}
          <code className="font-mono">string[]</code> and <code className="font-mono">onChange</code>{' '}
          is called with the updated array. Use for attribute filters, tag selectors, or
          preference pickers where more than one choice is valid.
        </p>
        <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden">
          <div className="px-6 py-8 border-b border-gray-100">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
              Default emphasis
            </p>
            <PillGroup
              options={PLAN_OPTIONS}
              value={playMultiVal}
              onChange={v => setPlayMultiVal((v as string[]) ?? [])}
              multiSelect
              emphasis="default"
            />
          </div>
          <div className="px-6 py-8">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
              High emphasis
            </p>
            <PillGroup
              options={PLAN_OPTIONS}
              value={playMultiVal}
              onChange={v => setPlayMultiVal((v as string[]) ?? [])}
              multiSelect
              emphasis="high"
            />
          </div>
        </div>
      </div>

      {/* ── Disabled ─────────────────────────────────────────── */}
      <div className="mb-20">
        <h2 className="text-2xl font-semibold mb-2 text-gray-900">Disabled</h2>
        <p className="text-sm text-gray-500 mb-6 leading-relaxed">
          Set <code className="font-mono">disabled: true</code> on any option in the{' '}
          <code className="font-mono">options</code> array to make that pill non-interactive.
          Disabled pills retain their position in the group but cannot be clicked. They always
          render with <code className="font-mono">--background-disabled</code> and{' '}
          <code className="font-mono">--text-disabled</code>, regardless of the current
          selection or emphasis level.
        </p>
        <div className="bg-white border border-gray-200 rounded-3xl p-8">
          <PillGroup
            options={[
              { value: 'basic',     label: 'Basic'    },
              { value: 'standard',  label: 'Standard', disabled: true },
              { value: 'premium',   label: 'Premium'  },
              { value: 'unlimited', label: 'Unlimited',disabled: true },
            ]}
            value="basic"
            onChange={() => {}}
            emphasis="default"
          />
        </div>
      </div>

      {/* ── Anatomy ─────────────────────────────────────────── */}
      <div className="mb-20">
        <h2 className="text-2xl font-semibold mb-2 text-gray-900">Anatomy</h2>
        <p className="text-sm text-gray-500 mb-6 leading-relaxed">
          Each <code className="font-mono">Pill</code> has two optional icon slots surrounding
          the required label. The border is always present (transparent when unselected) to
          prevent layout shift on state transitions.
        </p>
        <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden">
          {[
            { label: 'Label only',               el: <Pill label="Standard"   state="selected" />                                                                                                                },
            { label: '+ Leading icon',           el: <Pill label="Standard"   state="selected"   leadingIcon={<PillIcon name="abstractBolt/Line"    />} />                                                       },
            { label: '+ Trailing icon',          el: <Pill label="Standard"   state="selected"   trailingIcon={<PillIcon name="actionClose/Line"   />} />                                                       },
            { label: '+ Both icons',             el: <Pill label="Standard"   state="selected"   leadingIcon={<PillIcon name="abstractBolt/Line"    />} trailingIcon={<PillIcon name="actionClose/Line" />} />  },
            { label: 'High emphasis',            el: <Pill label="Standard"   state="selected-high" leadingIcon={<PillIcon name="abstractBolt/Line" />} />                                                       },
            { label: 'Disabled',                 el: <Pill label="Standard"   state="unselected" disabled />                                                                                                     },
          ].map((row, i, arr) => (
            <div
              key={row.label}
              className={`flex items-center gap-8 px-6 py-5 hover:bg-gray-50 transition-colors ${
                i < arr.length - 1 ? 'border-b border-gray-100' : ''
              }`}
            >
              <code className="text-xs font-mono text-gray-400 w-36 flex-shrink-0 leading-relaxed">
                {row.label}
              </code>
              {row.el}
            </div>
          ))}
        </div>
      </div>

      {/* ── Design tokens ───────────────────────────────────── */}
      <div className="mb-20">
        <h2 className="text-2xl font-semibold mb-2 text-gray-900">Design tokens</h2>
        <p className="text-sm text-gray-500 mb-6 leading-relaxed">
          Every colour, spacing, border, and typography value is driven by a{' '}
          <code className="font-mono">--*</code> token. Switching brands in the theme
          picker updates all values simultaneously with no component code changes.
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
                label: 'Button semantics',
                text:  'Each Pill renders as a native <button> element. This means keyboard users can Tab to it, activate it with Enter or Space, and screen readers will announce it as a button without any extra ARIA.',
              },
              {
                label: 'aria-pressed',
                text:  'Each pill carries aria-pressed={state !== "unselected"}. Screen readers announce "button, pressed" or "button, not pressed" so users always know the selection state without relying on colour.',
              },
              {
                label: 'Group landmark',
                text:  'PillGroup renders a <div role="group">. Add an aria-label or aria-labelledby pointing to a visible heading when the group has a meaningful name (e.g. aria-label="Filter by plan type").',
              },
              {
                label: 'Focus ring',
                text:  'Pills show a 3 px focus ring using --border-info on :focus-visible only. This avoids the outline appearing on mouse click while still satisfying WCAG 2.4.7 Focus Visible for keyboard users.',
              },
              {
                label: 'Disabled state',
                text:  'Disabled pills use the native disabled attribute, making them unreachable by Tab and announcing as "dimmed" to screen readers. Do not use disabled pills to convey conditional logic — use a tooltip or helper text to explain why an option is unavailable.',
              },
              {
                label: 'Colour is never the sole signal',
                text:  'The selected-high state changes both background colour and the text contrast ratio. The selected state adds a border in addition to the tint. Neither state relies solely on colour — the structural border and layout make selection perceivable to users with colour blindness.',
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
                'Always wrap pills in PillGroup — never render a standalone Pill without group context.',
                'Use single-select for mutually exclusive choices (one plan, one category).',
                'Use multi-select when several attributes can apply simultaneously (add-ons, interests).',
                'Use the trailing icon + dismiss pattern to let users remove active filters individually.',
                'Apply emphasis="high" when pills sit on a coloured, image, or dark background where the subtle tint would be hard to see.',
                'Add aria-label to PillGroup when a visible heading is not nearby.',
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
                "Don't use pills for primary actions — use Button instead.",
                "Don't mix single-select and multi-select within the same PillGroup.",
                "Don't put more than one icon in the leading slot or more than one in the trailing slot.",
                "Don't use pills for navigation — use Tab or a NavLink component instead.",
                "Don't truncate pill labels; pills should be short enough to fit on one line.",
                "Don't rely on colour alone to communicate selection — always pair with the border (default) or fill (high) affordance.",
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