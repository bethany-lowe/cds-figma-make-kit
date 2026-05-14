/**
 * SingleInputTab
 *
 * Documentation tab for the Single Input field component.
 * Follows the same structure as ToggleButtonTab / ButtonPage sections.
 */

import { useState } from 'react';
import { SingleInputField } from './ui/SingleInputField';
import type { InputFieldState } from './ui/SingleInputField';
import { useTheme } from '../contexts/ThemeContext';

// ── Knob (pill-style control button) ─────────────────────────
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

// ── Token table row ───────────────────────────────────────────
const TOKENS: { role: string; token: string; note: string }[] = [
  { role: 'Background · enabled',      token: '--background-app',                      note: 'White / app surface' },
  { role: 'Background · disabled',     token: '--background-disabled',                 note: 'Muted fill, no border' },
  { role: 'Border · enabled',          token: '--border-neutral',                      note: '1px (--border-width-thin)' },
  { role: 'Border · active / focus',   token: '--border-primary',                      note: '2px (--border-width-thick)' },
  { role: 'Input text',                token: '--text-neutral-bolder',                 note: 'Typed value' },
  { role: 'Placeholder',               token: '--text-neutral',                        note: 'Hint before typing' },
  { role: 'Text · disabled',           token: '--text-disabled',                       note: 'Not-allowed cursor' },
  { role: 'Label',                     token: '--text-neutral-bolder',                 note: 'Always visible above field' },
  { role: 'Required / Counter / Hint', token: '--text-neutral-subtle',                 note: 'Subdued annotation text' },
  { role: 'Counter · at limit',        token: '--text-error',                          note: 'Turns red at x/x' },
  { role: 'Border radius',             token: '--radius-large',                        note: '16px' },
  { role: 'H. padding',                token: '--space-large',                         note: '16px' },
  { role: 'Gap (label → input)',        token: '--space-small',                        note: '8px' },
  { role: 'Clear icon',                token: 'actionClose/Line',                      note: 'From icon-manifest; currentColor' },
  { role: 'Caption (info)',             token: '--icon-primary / --text-neutral-bolder',    note: 'FeedbackCaption subcomponent' },
  { role: 'Caption (success)',          token: '--icon-success-bold / --text-success-bold', note: 'FeedbackCaption subcomponent' },
  { role: 'Caption (error)',            token: '--icon-error-bold / --text-error',           note: 'FeedbackCaption subcomponent' },
  { role: 'Focus ring',                token: '--border-info',                         note: 'Blue — keyboard navigation' },
];

// ── States showcase ───────────────────────────────────────────
const STATES: { state: InputFieldState; label: string; note: string }[] = [
  { state: 'enabled',   label: 'Enabled',   note: 'Default resting state. 1px --border-neutral.' },
  { state: 'active',    label: 'Active',    note: 'On focus. 2px --border-primary.' },
  { state: 'disabled',  label: 'Disabled',  note: 'No border, --background-disabled. Cursor not-allowed.' },
  { state: 'read-only', label: 'Read-only', note: 'Value visible, not editable. Same border as enabled.' },
];

// ── Main component ────────────────────────────────────────────
export function SingleInputTab() {
  const { brandFont } = useTheme();

  // Playground controls
  const [pgState,     setPgState]     = useState<InputFieldState>('enabled');
  const [pgRequired,  setPgRequired]  = useState(false);
  const [pgCounter,   setPgCounter]   = useState(false);
  const [pgHint,      setPgHint]      = useState(false);
  const [pgCaption,   setPgCaption]   = useState<'none' | 'info' | 'success' | 'error'>('none');
  const [pgValue,     setPgValue]     = useState('');

  const charMax = 100;
  const captionMap = {
    none:    null,
    info:    { status: 'info'    as const, text: 'Enter a 10-digit Canadian phone number.' },
    success: { status: 'success' as const, text: 'Phone number is valid.' },
    error:   { status: 'error'   as const, text: 'Phone number is not valid. Try 10 digits, no spaces.' },
  };

  // States showcase values
  const [stateValues, setStateValues] = useState<Record<string, string>>({
    enabled: '', active: '', disabled: '', 'read-only': '6045551234',
  });

  // Behavior — hint vs caption
  const [emailA, setEmailA] = useState('');
  const [emailB, setEmailB] = useState('notanemail');

  // Behavior — counter
  const [counterA, setCounterA] = useState('Morning lights');
  const [counterB, setCounterB] = useState('Morning lights on weekdays');

  // Behavior — required
  const [reqA, setReqA] = useState('');
  const [reqB, setReqB] = useState('');

  // Behavior — error pairing
  const [errA, setErrA] = useState('abc');
  const [succA, setSuceA] = useState('alex_home');

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

          {/* Controls row 1 — State */}
          <div className="px-6 py-5 border-b border-gray-100 bg-gray-50 flex flex-wrap gap-6 items-center">
            <div>
              <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">State</div>
              <div className="flex flex-wrap gap-1.5">
                {(['enabled', 'active', 'disabled', 'read-only'] as InputFieldState[]).map(s => (
                  <Knob key={s} active={pgState === s} onClick={() => setPgState(s)}>
                    {s}
                  </Knob>
                ))}
              </div>
            </div>
          </div>

          {/* Controls row 2 — Options + Caption */}
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

          {/* Preview stage */}
          <div className="px-10 py-12 flex justify-center" style={{ backgroundColor: '#FAFAFA' }}>
            <div className="w-full max-w-sm">
              <SingleInputField
                label="Phone number"
                required={pgRequired}
                showCounter={pgCounter}
                counter={`${pgValue.length}/${charMax}`}
                placeholder="6045551234"
                value={pgState === 'read-only' ? '6045551234' : pgValue}
                onChange={e => setPgValue(e.target.value)}
                onClear={() => setPgValue('')}
                state={pgState}
                hint="Enter a 10-digit phone number without spaces."
                showHint={pgHint}
                caption={captionMap[pgCaption]}
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
        <p className="text-gray-500 mb-6 text-sm">Six structural parts make up the Single Input field.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            ['1', 'Label',           '--text-size-4 (body medium) · always visible'],
            ['2', 'Required marker', '"(Required)" · optional'],
            ['3', 'Counter',         '--text-size-2 (body small) · optional'],
            ['4', 'Container',       '64px height · --radius-large (16px)'],
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

        {/* Spec table */}
        <div className="mt-6 grid grid-cols-[180px_1fr] gap-x-8 gap-y-2.5 text-sm">
          {[
            ['Height',              '64px'],
            ['Horizontal padding',  '16px (--space-large)'],
            ['Border radius',       '--radius-large (16px)'],
            ['Border · enabled',    '1px --border-neutral'],
            ['Border · active',     '2px --border-primary'],
            ['Border · disabled',   'none'],
            ['Gap (label → input)', '--space-small (8px)'],
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
              <div className="w-28 pt-7 flex-shrink-0">
                <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">{label}</div>
                <div className="text-xs text-gray-500 mt-1.5 leading-snug">{note}</div>
              </div>
              <div className="flex-1 max-w-sm">
                <SingleInputField
                  label="Phone number"
                  placeholder="6045551234"
                  value={stateValues[state] ?? (state === 'read-only' ? '6045551234' : '')}
                  onChange={e => setStateValues(prev => ({ ...prev, [state]: e.target.value }))}
                  onClear={() => setStateValues(prev => ({ ...prev, [state]: '' }))}
                  state={state}
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
        <p className="text-gray-500 mb-6 text-sm">Rules governing sub-components and edge cases.</p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

          {/* Hint → Caption */}
          <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-100">
              <div className="text-sm font-semibold text-gray-900 mb-1">Hint → Caption transition</div>
              <p className="text-xs text-gray-500 leading-relaxed">
                Show the hint before the user types. On blur (or submit), replace it with a FeedbackCaption. Never show both simultaneously.
              </p>
            </div>
            <div className="px-6 py-5 flex flex-col gap-5">
              <div>
                <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-3">Before input · hint shown</div>
                <SingleInputField label="Email" placeholder="you@example.com" value={emailA} onChange={e => setEmailA(e.target.value)} onClear={() => setEmailA('')} hint="We'll only use this for alerts." showHint />
              </div>
              <div>
                <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-3">After blur — invalid · caption replaces hint</div>
                <SingleInputField label="Email" placeholder="you@example.com" value={emailB} onChange={e => setEmailB(e.target.value)} onClear={() => setEmailB('')} caption={{ status: 'error', text: 'Enter a valid email address.' }} />
              </div>
            </div>
          </div>

          {/* Counter */}
          <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-100">
              <div className="text-sm font-semibold text-gray-900 mb-1">Counter</div>
              <p className="text-xs text-gray-500 leading-relaxed">
                Updates in real time. Turns to --text-error when at or near the limit.
              </p>
            </div>
            <div className="px-6 py-5 flex flex-col gap-5">
              <div>
                <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-3">Within limit · neutral counter</div>
                <SingleInputField label="Automation name" placeholder="Name this automation" value={counterA} onChange={e => setCounterA(e.target.value)} onClear={() => setCounterA('')} showCounter counter={`${counterA.length}/50`} />
              </div>
              <div>
                <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-3">At limit · counter turns red</div>
                <SingleInputField label="Automation name" placeholder="Name this automation" value={counterB} onChange={e => setCounterB(e.target.value)} onClear={() => setCounterB('')} showCounter counter={`${counterB.length}/${counterB.length}`} />
              </div>
            </div>
          </div>

          {/* Required marker */}
          <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-100">
              <div className="text-sm font-semibold text-gray-900 mb-1">Required marker</div>
              <p className="text-xs text-gray-500 leading-relaxed">
                "(Required)" appears to the right of the label. Use sparingly — if all fields are required, mark only optional ones instead.
              </p>
            </div>
            <div className="px-6 py-5 flex flex-col gap-5">
              <div>
                <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-3">Required · with marker</div>
                <SingleInputField label="Account name" placeholder="Your name" value={reqA} onChange={e => setReqA(e.target.value)} onClear={() => setReqA('')} required />
              </div>
              <div>
                <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-3">Optional · no marker</div>
                <SingleInputField label="Nickname" placeholder="Optional" value={reqB} onChange={e => setReqB(e.target.value)} onClear={() => setReqB('')} />
              </div>
            </div>
          </div>

          {/* Error pairing */}
          <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-100">
              <div className="text-sm font-semibold text-gray-900 mb-1">Error state pairing</div>
              <p className="text-xs text-gray-500 leading-relaxed">
                No dedicated "error" border — the FeedbackCaption with status="error" carries the visual signal, paired with the field's focus border.
              </p>
            </div>
            <div className="px-6 py-5 flex flex-col gap-5">
              <div>
                <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-3">Error · caption carries the status</div>
                <SingleInputField label="Password" placeholder="••••••••" value={errA} onChange={e => setErrA(e.target.value)} onClear={() => setErrA('')} caption={{ status: 'error', text: 'Password must be 8+ characters.' }} />
              </div>
              <div>
                <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-3">Success · async validation confirmed</div>
                <SingleInputField label="Username" placeholder="Choose a username" value={succA} onChange={e => setSuceA(e.target.value)} onClear={() => setSuceA('')} caption={{ status: 'success', text: 'Username is available.' }} />
              </div>
            </div>
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
              <span className="text-sm font-semibold text-green-700">Do — Always pair a visible label</span>
            </div>
            <div className="px-6 py-6">
              <p className="text-xs text-gray-500 mb-4 leading-relaxed">The label sits above the field at all times. Placeholder-only fields lose context once the user types.</p>
              <SingleInputField label="Wi-Fi password" placeholder="Password" value="" onChange={() => {}} />
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden">
            <div className="flex items-center gap-2 px-6 py-4 border-b border-gray-100">
              <span className="w-2 h-2 rounded-full bg-red-500" />
              <span className="text-sm font-semibold text-red-700">Don't — Use placeholder as the only label</span>
            </div>
            <div className="px-6 py-6">
              <p className="text-xs text-gray-500 mb-4 leading-relaxed">As soon as the user starts typing, the placeholder disappears and context is lost — especially problematic for password fields.</p>
              <div className="h-16 flex items-center px-4 border border-gray-200 rounded-2xl bg-white">
                <span className="text-gray-400 text-base">Wi-Fi password</span>
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
            { level: 'AA', criterion: '1.3.1 Info and Relationships', impl: 'The label is a <label> element with htmlFor pointing at the input id. Screen readers announce "Phone number, edit text" when the field receives focus.' },
            { level: 'AA', criterion: '3.3.1 Error Identification',   impl: 'When validation fails, aria-describedby on the input points to the FeedbackCaption id. aria-invalid="true" signals the invalid state to assistive technology.' },
            { level: 'AA', criterion: '3.3.2 Labels or Instructions', impl: 'The label is always visible. Hint text and the required marker provide format instructions before interaction.' },
            { level: 'AA', criterion: '2.4.7 Focus Visible',          impl: 'The active state (2px --border-primary) is the visible focus indicator. It must meet 3:1 contrast against the background.' },
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

export default SingleInputTab;