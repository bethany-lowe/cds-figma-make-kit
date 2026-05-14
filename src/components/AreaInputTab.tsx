/**
 * AreaInputTab
 *
 * Documentation tab for the Area Input field component.
 */

import { useState } from 'react';
import { AreaInputField } from './ui/AreaInputField';
import type { AreaInputState } from './ui/AreaInputField';
import { useTheme } from '../contexts/ThemeContext';

// ── Knob ──────────────────────────────────────────────────────
function Knob({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
        active
          ? 'bg-gray-900 text-white'
          : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-300'
      }`}
    >
      {children}
    </button>
  );
}

// ── Token table ───────────────────────────────────────────────
const TOKENS: { role: string; token: string; note: string }[] = [
  { role: 'Background · enabled',      token: '--background-app',                      note: 'White / app surface' },
  { role: 'Background · disabled',     token: '--background-disabled',                 note: 'Muted fill, no border' },
  { role: 'Border · enabled',          token: '--border-neutral',                      note: '1px (--border-width-thin)' },
  { role: 'Border · active / focus',   token: '--border-primary',                      note: '2px (--border-width-thick)' },
  { role: 'Textarea text',             token: '--text-neutral-bolder',                 note: 'Typed value' },
  { role: 'Placeholder',               token: '--text-neutral',                        note: 'Before typing' },
  { role: 'Text · disabled',           token: '--text-disabled',                       note: 'Not-allowed cursor; resize removed' },
  { role: 'Label',                     token: '--text-neutral-bolder',                 note: 'Always visible above textarea' },
  { role: 'Required / Counter / Hint', token: '--text-neutral-subtle',                 note: 'Subdued annotation text' },
  { role: 'Counter · at limit',        token: '--text-error',                          note: 'Turns red at x/x' },
  { role: 'Border radius',             token: '--radius-large',                        note: '16px' },
  { role: 'Padding',                   token: '--space-large',                         note: '16px all sides' },
  { role: 'Min-height',                token: '80px',                                  note: 'Resizable vertically in practice' },
  { role: 'Caption (info)',             token: '--icon-primary / --text-neutral-bolder',    note: 'FeedbackCaption subcomponent' },
  { role: 'Caption (success)',          token: '--icon-success-bold / --text-success-bold', note: 'FeedbackCaption subcomponent' },
  { role: 'Caption (error)',            token: '--icon-error-bold / --text-error',           note: 'FeedbackCaption subcomponent' },
];

// ── States showcase ───────────────────────────────────────────
const STATES: { state: AreaInputState; label: string; note: string }[] = [
  { state: 'enabled',   label: 'Enabled',   note: 'Default resting state. 1px --border-neutral.' },
  { state: 'active',    label: 'Active',    note: 'On focus. 2px --border-primary.' },
  { state: 'disabled',  label: 'Disabled',  note: 'No border, --background-disabled. Cursor not-allowed.' },
  { state: 'read-only', label: 'Read-only', note: 'Value visible, not editable. Resize disabled.' },
];

// ── Main component ────────────────────────────────────────────
export function AreaInputTab() {
  const { brandFont } = useTheme();

  // Playground
  const [pgState,    setPgState]    = useState<AreaInputState>('enabled');
  const [pgRequired, setPgRequired] = useState(false);
  const [pgCounter,  setPgCounter]  = useState(true);
  const [pgHint,     setPgHint]     = useState(false);
  const [pgCaption,  setPgCaption]  = useState<'none' | 'info' | 'success' | 'error'>('none');
  const [pgValue,    setPgValue]    = useState('');

  const charMax = 200;
  const captionMap = {
    none:    null,
    info:    { status: 'info'    as const, text: 'Describe what this automation does in detail.' },
    success: { status: 'success' as const, text: 'Description looks good.' },
    error:   { status: 'error'   as const, text: 'Description must be at least 10 characters.' },
  };

  // States showcase
  const [stateValues, setStateValues] = useState<Record<string, string>>({
    enabled: '',
    active:  '',
    disabled: '',
    'read-only': 'Turn on the porch lights every evening at sunset and turn them off at midnight automatically.',
  });

  // Behavior — hint vs caption
  const [notesA, setNotesA] = useState('');
  const [notesB, setNotesB] = useState('abc');

  // Behavior — counter
  const maxDesc = 200;
  const [descA, setDescA] = useState('');
  const [descB, setDescB] = useState('Turn on the porch lights every evening at sunset and turn them off at midnight. Send a notification when triggered. Repeat on weekdays only.');

  // In-context
  const [ctxName,  setCtxName]  = useState('');
  const [ctxNotes, setCtxNotes] = useState('');
  const [ctxDesc,  setCtxDesc]  = useState('');

  return (
    <div>
      {/* ═══════════════════════════════════════════════════════
          PLAYGROUND
      ═══════════════════════════════════════════════════════ */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-gray-900" style={{ fontFamily: brandFont }}>
          Playground
        </h2>
        <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden">

          {/* Row 1 — State */}
          <div className="px-6 py-5 border-b border-gray-100 bg-gray-50 flex flex-wrap gap-6 items-center">
            <div>
              <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">State</div>
              <div className="flex flex-wrap gap-1.5">
                {(['enabled', 'active', 'disabled', 'read-only'] as AreaInputState[]).map(s => (
                  <Knob key={s} active={pgState === s} onClick={() => setPgState(s)}>
                    {s}
                  </Knob>
                ))}
              </div>
            </div>
          </div>

          {/* Row 2 — Options + Caption */}
          <div className="px-6 py-5 border-b border-gray-100 bg-gray-50 flex flex-wrap gap-6 items-center">
            <div>
              <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">Options</div>
              <div className="flex flex-wrap gap-1.5">
                <Knob active={pgRequired} onClick={() => setPgRequired(v => !v)}>required</Knob>
                <Knob active={pgCounter}  onClick={() => setPgCounter(v => !v)}>counter</Knob>
                <Knob active={pgHint}     onClick={() => setPgHint(v => !v)}>hint</Knob>
              </div>
            </div>
            <div className="w-px h-8 bg-gray-200 hidden sm:block" />
            <div>
              <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">Caption</div>
              <div className="flex flex-wrap gap-1.5">
                {(['none', 'info', 'success', 'error'] as const).map(c => (
                  <Knob key={c} active={pgCaption === c} onClick={() => setPgCaption(c)}>
                    {c}
                  </Knob>
                ))}
              </div>
            </div>
          </div>

          {/* Stage */}
          <div className="px-10 py-12 flex justify-center" style={{ backgroundColor: '#FAFAFA' }}>
            <div className="w-full max-w-sm">
              <AreaInputField
                label="Automation description"
                required={pgRequired}
                showCounter={pgCounter}
                counter={`${pgValue.length}/${charMax}`}
                placeholder="Describe when and what this automation should do…"
                value={pgState === 'read-only'
                  ? 'Turn on the porch lights every evening at sunset and off at midnight.'
                  : pgValue}
                onChange={e => setPgValue(e.target.value)}
                state={pgState}
                hint="Be as specific as possible — include triggers, conditions, and actions."
                showHint={pgHint}
                caption={captionMap[pgCaption]}
                rows={4}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════
          ANATOMY
      ═══════════════════════════════════════════════════════ */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-2 text-gray-900" style={{ fontFamily: brandFont }}>Anatomy</h2>
        <p className="text-gray-500 mb-6 text-sm">Same six slots as the Single Input — the container swaps to a resizable textarea.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            ['1', 'Label',           '--text-size-4 (body medium) · always visible'],
            ['2', 'Required marker', '"(Required)" · optional'],
            ['3', 'Counter',         '--text-size-2 (body small) · optional'],
            ['4', 'Container',       '80px min-height · --radius-large (16px) · resizable'],
            ['5', 'Placeholder / Value', '--text-size-5 (body large)'],
            ['6', 'Caption',         'FeedbackCaption subcomponent · dynamic'],
          ].map(([n, title, desc]) => (
            <div key={n} className="flex items-start gap-3 bg-white border border-gray-200 rounded-2xl p-4">
              <span className="w-6 h-6 rounded-full bg-gray-900 text-white flex items-center justify-center text-[11px] font-bold flex-shrink-0 mt-0.5">
                {n}
              </span>
              <div>
                <div className="text-sm font-medium text-gray-900">{title}</div>
                <div className="text-xs text-gray-500 mt-0.5">{desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-[180px_1fr] gap-x-8 gap-y-2.5 text-sm">
          {[
            ['Min-height',          '80px (resizable in practice)'],
            ['Padding',             '16px (--space-large)'],
            ['Border radius',       '--radius-large (16px)'],
            ['Border · enabled',    '1px --border-neutral'],
            ['Border · active',     '2px --border-primary'],
            ['Border · disabled',   'none'],
            ['Resize',              'vertical (disabled in read-only)'],
          ].map(([k, v]) => (
            <div key={k} className="contents">
              <span className="text-gray-500">{k}</span>
              <span className="font-mono text-xs text-gray-700 self-center">{v}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════
          STATES
      ═══════════════════════════════════════════════════════ */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-2 text-gray-900" style={{ fontFamily: brandFont }}>States</h2>
        <p className="text-gray-500 mb-6 text-sm">Four states — enabled, active, disabled, read-only.</p>
        <div className="flex flex-col gap-6">
          {STATES.map(({ state, label, note }) => (
            <div key={state} className="flex gap-6 items-start">
              <div className="w-28 pt-5 flex-shrink-0">
                <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">{label}</div>
                <div className="text-xs text-gray-500 mt-1.5 leading-snug">{note}</div>
              </div>
              <div className="flex-1 max-w-sm">
                <AreaInputField
                  label="Automation description"
                  placeholder="Describe this automation…"
                  value={stateValues[state] ?? ''}
                  onChange={e => setStateValues(prev => ({ ...prev, [state]: e.target.value }))}
                  state={state}
                  rows={3}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════
          BEHAVIOR
      ═══════════════════════════════════════════════════════ */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-2 text-gray-900" style={{ fontFamily: brandFont }}>Behavior</h2>
        <p className="text-gray-500 mb-6 text-sm">Rules governing the counter, hint/caption transition, and edge cases.</p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

          {/* Hint → Caption */}
          <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-100">
              <div className="text-sm font-semibold text-gray-900 mb-1">Hint → Caption transition</div>
              <p className="text-xs text-gray-500 leading-relaxed">
                Show the hint before typing. Replace with FeedbackCaption after interaction. Never show both.
              </p>
            </div>
            <div className="px-6 py-5 flex flex-col gap-5">
              <div>
                <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-3">Before input · hint shown</div>
                <AreaInputField label="Notes" placeholder="What should this automation do?" value={notesA} onChange={e => setNotesA(e.target.value)} hint="Be specific about triggers and conditions." showHint rows={3} />
              </div>
              <div>
                <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-3">After blur — invalid · caption replaces hint</div>
                <AreaInputField label="Notes" placeholder="What should this automation do?" value={notesB} onChange={e => setNotesB(e.target.value)} caption={{ status: 'error', text: 'Description must be at least 10 characters.' }} rows={3} />
              </div>
            </div>
          </div>

          {/* Counter */}
          <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-100">
              <div className="text-sm font-semibold text-gray-900 mb-1">Counter with live update</div>
              <p className="text-xs text-gray-500 leading-relaxed">
                The character counter updates in real time. It turns to --text-error when at the limit.
              </p>
            </div>
            <div className="px-6 py-5 flex flex-col gap-5">
              <div>
                <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-3">Within limit · neutral counter</div>
                <AreaInputField label="Description" placeholder="Describe this automation…" value={descA} onChange={e => setDescA(e.target.value)} showCounter counter={`${descA.length}/${maxDesc}`} rows={3} />
              </div>
              <div>
                <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-3">At limit · counter turns red</div>
                <AreaInputField label="Description" placeholder="Describe this automation…" value={descB} onChange={e => setDescB(e.target.value.slice(0, maxDesc))} showCounter counter={`${Math.min(descB.length, maxDesc)}/${maxDesc}`} rows={3} />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════
          IN CONTEXT
      ═══════════════════════════════════════════════════════ */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-2 text-gray-900" style={{ fontFamily: brandFont }}>In context</h2>
        <p className="text-gray-500 mb-6 text-sm">Area Input in real SmartHome+ onboarding and settings patterns.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <div className="bg-white border border-gray-200 rounded-3xl p-6">
            <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-4">Automation notes</div>
            <div className="bg-gray-50 rounded-2xl p-4">
              <AreaInputField
                label="Description"
                placeholder="What does this automation do?"
                value={ctxNotes}
                onChange={e => setCtxNotes(e.target.value)}
                showCounter
                counter={`${ctxNotes.length}/200`}
                rows={4}
              />
            </div>
            <p className="mt-3 text-xs text-gray-400 leading-relaxed">Area variant with live counter. Use for notes and descriptions.</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-3xl p-6">
            <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-4">Room configuration</div>
            <div className="bg-gray-50 rounded-2xl p-4 flex flex-col gap-3">
              <AreaInputField
                label="Room description"
                placeholder="Describe this room…"
                value={ctxDesc}
                onChange={e => setCtxDesc(e.target.value)}
                hint="Helps the AI understand the space."
                showHint
                rows={3}
              />
              <AreaInputField
                label="Special instructions"
                placeholder="Any rules for this room?"
                value={ctxName}
                onChange={e => setCtxName(e.target.value)}
                required
                rows={2}
              />
            </div>
            <p className="mt-3 text-xs text-gray-400 leading-relaxed">Multiple area fields with hint and required marker.</p>
          </div>

        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════
          DO / DON'T
      ═══════════════════════════════════════════════════════ */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-gray-900" style={{ fontFamily: brandFont }}>Do and don't</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

          <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden">
            <div className="flex items-center gap-2 px-6 py-4 border-b border-gray-100">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-sm font-semibold text-green-700">Do — Use area for multi-line content</span>
            </div>
            <div className="px-6 py-6">
              <p className="text-xs text-gray-500 mb-4 leading-relaxed">Descriptions, notes, automation instructions — any content that may span multiple sentences belongs in an area variant.</p>
              <AreaInputField label="Room description" placeholder="Describe this room…" value="" onChange={() => {}} rows={3} />
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden">
            <div className="flex items-center gap-2 px-6 py-4 border-b border-gray-100">
              <span className="w-2 h-2 rounded-full bg-red-500" />
              <span className="text-sm font-semibold text-red-700">Don't — Use a single-line field for long values</span>
            </div>
            <div className="px-6 py-6">
              <p className="text-xs text-gray-500 mb-4 leading-relaxed">Single-line fields are confusing for long values — they look like a single-line input but the content overflows. Use the area variant instead.</p>
              <div className="flex flex-col gap-2">
                <span className="text-sm text-gray-700" style={{ fontFamily: 'Noto Sans, sans-serif' }}>Automation description</span>
                <div className="h-16 flex items-center px-4 border border-gray-200 rounded-2xl bg-white overflow-hidden">
                  <span className="text-gray-400 text-base truncate">Describe this automation in detail…</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════
          TOKEN TABLE
      ═══════════════════════════════════════════════════════ */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-gray-900" style={{ fontFamily: brandFont }}>Design tokens</h2>
        <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-left px-6 py-4 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Role</th>
                <th className="text-left px-6 py-4 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Token</th>
                <th className="text-left px-6 py-4 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Note</th>
              </tr>
            </thead>
            <tbody>
              {TOKENS.map((row, i) => (
                <tr key={row.role} className={`border-b border-gray-50 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/40'}`}>
                  <td className="px-6 py-3.5 text-gray-600">{row.role}</td>
                  <td className="px-6 py-3.5">
                    <code className="text-xs bg-gray-100 text-gray-800 px-2 py-0.5 rounded-md font-mono">
                      {row.token}
                    </code>
                  </td>
                  <td className="px-6 py-3.5 text-gray-500 text-xs">{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════
          ACCESSIBILITY
      ═══════════════════════════════════════════════════════ */}
      <div className="mb-4">
        <h2 className="text-2xl font-semibold mb-6 text-gray-900" style={{ fontFamily: brandFont }}>Accessibility</h2>
        <div className="flex flex-col gap-3">
          {[
            { level: 'AA', criterion: '1.3.1 Info and Relationships', impl: 'The label is a <label> element with htmlFor pointing at the textarea id. Screen readers announce "Automation description, text area" on focus.' },
            { level: 'AA', criterion: '3.3.1 Error Identification',   impl: 'When validation fails, aria-describedby on the textarea points to the FeedbackCaption id. aria-invalid="true" signals the invalid state.' },
            { level: 'AA', criterion: '3.3.2 Labels or Instructions', impl: 'The label is always visible. Hint text provides format instructions before interaction. Never use placeholder as the only label.' },
            { level: 'AA', criterion: '2.4.7 Focus Visible',          impl: 'The active state (2px --border-primary) is the visible focus indicator. The resize handle should not trap keyboard focus.' },
          ].map((row, i) => (
            <div key={row.criterion} className="flex gap-4 bg-white border border-gray-200 rounded-2xl px-5 py-4">
              <span className="bg-blue-50 text-blue-700 font-mono text-[10px] font-semibold px-2 py-1 rounded h-fit mt-0.5 flex-shrink-0">{row.level}</span>
              <div>
                <div className="text-sm font-semibold text-gray-900 mb-1">{row.criterion}</div>
                <p className="text-xs text-gray-500 leading-relaxed">{row.impl}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

export default AreaInputTab;