import { useState } from 'react';
import { Toggle } from './ui/Toggle';
import { useTheme } from '../contexts/ThemeContext';

// ── Token reference table ─────────────────────────────────────
const TOKEN_ROWS = [
  { prop: 'Track — on',       token: '--background-primary',      note: 'Brand primary fill' },
  { prop: 'Track — off',      token: '--background-neutral',      note: 'Neutral grey fill' },
  { prop: 'Track — disabled', token: '--background-disabled-bold',note: 'Muted when disabled' },
  { prop: 'Knob',             token: '--color-base-white',        note: 'Always white' },
  { prop: 'Caption text',     token: '--text-neutral',            note: '' },
  { prop: 'Disabled text',    token: '--text-disabled',           note: '' },
  { prop: 'Focus ring',       token: '--border-info',             note: 'Blue — matches Figma spec' },
  { prop: 'Border radius',    token: '--radius-full',             note: '100px' },
];

// ── State showcase rows ───────────────────────────────────────
const STATE_ROWS: { label: string; checked: boolean; disabled: boolean; caption: string }[] = [
  { label: 'On',           checked: true,  disabled: false, caption: 'Caption' },
  { label: 'Off',          checked: false, disabled: false, caption: 'Caption' },
  { label: 'Disabled on',  checked: true,  disabled: true,  caption: 'Caption' },
  { label: 'Disabled off', checked: false, disabled: true,  caption: 'Caption' },
];

// ── Code snippet helper ───────────────────────────────────────
function buildSnippet(checked: boolean, disabled: boolean, label: string) {
  const lines = [`<Toggle`];
  lines.push(`  checked={${checked}}`);
  lines.push(`  onChange={setChecked}`);
  if (disabled) lines.push(`  disabled`);
  if (label)    lines.push(`  label="${label}"`);
  lines.push(`/>`);
  return lines.join('\n');
}

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

// ── Page ──────────────────────────────────────────────────────
export function TogglePage() {
  const { brandFont, brandName } = useTheme();

  const [playChecked, setPlayChecked] = useState(true);
  const [playDisabled, setPlayDisabled] = useState(false);
  const [playLabel, setPlayLabel] = useState('Caption');
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');
  const { copied, copy } = useCopy();

  const snippet = buildSnippet(playChecked, playDisabled, playLabel);

  return (
    <div>
      {/* ── Header ──────────────────────────────────────────── */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
            Components
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4" style={{ fontFamily: brandFont }}>
            Toggle
          </h1>
          <p className="text-base text-gray-600 leading-relaxed max-w-2xl">
            A binary switch that lets users turn a single setting on or off. The CDS Toggle follows
            the iOS-style pill-track pattern from the Figma spec, automatically picking up the active
            brand ({brandName}) via CSS custom properties. Supports an optional caption label,
            disabled state, and a smooth knob-transition animation.
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

            {/* Checked */}
            <div>
              <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">Checked</div>
              <div className="flex gap-1.5">
                {([true, false] as const).map((val) => (
                  <button
                    key={String(val)}
                    onClick={() => setPlayChecked(val)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                      playChecked === val
                        ? 'bg-gray-900 text-white'
                        : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    {val ? 'true' : 'false'}
                  </button>
                ))}
              </div>
            </div>

            {/* Label */}
            <div>
              <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">Label</div>
              <input
                type="text"
                value={playLabel}
                onChange={(e) => setPlayLabel(e.target.value)}
                placeholder="Caption text…"
                className="h-[30px] px-3 rounded-full text-xs text-gray-700 bg-white border border-gray-200 hover:border-gray-300 focus:border-gray-400 focus:outline-none transition-colors w-36"
              />
            </div>

            {/* Options */}
            <div>
              <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">Options</div>
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => setPlayDisabled(!playDisabled)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    playDisabled
                      ? 'bg-gray-900 text-white'
                      : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-300'
                  }`}
                >
                  Disabled
                </button>
              </div>
            </div>
          </div>

          {/* Preview / Code tabs */}
          <div className="border-b border-gray-100 flex gap-6 px-6">
            {(['preview', 'code'] as const).map((tab) => (
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
              style={{ backgroundColor: '#f9fafb' }}
            >
              <Toggle
                checked={playChecked}
                onChange={setPlayChecked}
                disabled={playDisabled}
                label={playLabel || undefined}
              />
            </div>
          ) : (
            <div className="relative bg-gray-950 rounded-none">
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
          The four canonical states — on, off, disabled-on, and disabled-off — drawn directly from
          the Figma design.
        </p>

        <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden">
          <div className="grid grid-cols-[180px_1fr] border-b border-gray-100 px-6 py-3 bg-gray-50">
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">State</div>
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Preview</div>
          </div>

          {STATE_ROWS.map((row, i) => (
            <div
              key={row.label}
              className={`grid grid-cols-[180px_1fr] items-center gap-6 px-6 py-5 hover:bg-gray-50 transition-colors ${
                i < STATE_ROWS.length - 1 ? 'border-b border-gray-100' : ''
              }`}
            >
              <div>
                <p className="text-sm text-gray-700">{row.label}</p>
                <code className="text-xs font-mono text-gray-400">
                  {row.checked ? 'checked' : '!checked'}
                  {row.disabled ? ' · disabled' : ''}
                </code>
              </div>
              <div className="flex items-center">
                <Toggle
                  checked={row.checked}
                  onChange={() => {}}
                  disabled={row.disabled}
                  label={row.caption}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Design tokens ────────────────────────────────────── */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-2 text-gray-900">Design tokens</h2>
        <p className="text-sm text-gray-500 mb-6 leading-relaxed">
          The Toggle uses CDS semantic tokens exclusively, so it responds correctly to the active
          brand theme.
        </p>

        <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden">
          <div className="grid grid-cols-[200px_1fr_auto] border-b border-gray-100 px-6 py-3 bg-gray-50">
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Property</div>
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Token / Value</div>
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Note</div>
          </div>

          {TOKEN_ROWS.map((row, i) => (
            <div
              key={row.prop}
              className={`grid grid-cols-[200px_1fr_auto] px-6 py-3 items-center gap-4 hover:bg-gray-50 transition-colors ${
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
              { label: 'Role',           text: 'The toggle is a <button> with role="switch" and aria-checked reflecting the current on/off state.' },
              { label: 'Keyboard',       text: 'Space and Enter toggle the switch. Tab moves focus to the button element; the label text is not separately focusable.' },
              { label: 'aria-label',     text: 'When no visible label is provided, supply an aria-label so screen readers can identify the control.' },
              { label: 'Disabled state', text: 'Sets the button\'s disabled attribute and applies cursor: not-allowed. The label is rendered non-interactive.' },
              { label: 'Focus ring',     text: 'A 2px focus ring in --border-info (blue) appears on keyboard focus (focus-visible), meeting WCAG 2.4.11.' },
              { label: 'Touch target',   text: 'The 51×31px track and knob comfortably exceed the WCAG 2.5.5 minimum 44×44px touch target when the label is included.' },
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
          <div className="grid grid-cols-[120px_220px_80px_1fr] border-b border-gray-100 px-6 py-3 bg-gray-50">
            {['Prop', 'Type', 'Default', 'Description'].map((h) => (
              <div key={h} className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</div>
            ))}
          </div>
          {[
            { prop: 'checked',    type: 'boolean',                   def: '—',          desc: 'Controls the on/off state of the toggle.' },
            { prop: 'onChange',   type: '(checked: boolean) => void', def: '—',          desc: 'Called when the user toggles the switch.' },
            { prop: 'disabled',   type: 'boolean',                   def: 'false',      desc: 'Prevents interaction; applies muted visual treatment.' },
            { prop: 'label',      type: 'string',                    def: 'undefined',  desc: 'Caption rendered beside the track. Clicking it also toggles the switch.' },
            { prop: 'aria-label', type: 'string',                    def: 'undefined',  desc: 'Accessible name when no visible label is provided.' },
            { prop: 'id',         type: 'string',                    def: 'auto',       desc: 'Forwarded to the underlying <button> element.' },
            { prop: 'className',  type: 'string',                    def: '""',         desc: 'Extra class names applied to the wrapper <span>.' },
          ].map((row, i, arr) => (
            <div
              key={row.prop}
              className={`grid grid-cols-[120px_220px_80px_1fr] px-6 py-3 items-start gap-4 hover:bg-gray-50 transition-colors ${
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
          All native <code className="font-mono">{'<button>'}</code> attributes (onClick, aria-*, data-*, etc.) are forwarded via rest props.
        </p>
      </div>
    </div>
  );
}

export default TogglePage;