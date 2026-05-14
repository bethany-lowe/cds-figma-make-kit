/**
 * ToggleButtonTab
 *
 * Full "Toggle Button" tab content for ButtonPage.
 * Extracted into its own component so every useState lives at a
 * stable, unconditional call site — fixing the Rules-of-Hooks
 * violations caused by useState inside a conditional IIFE and
 * inside .map() callbacks.
 */

import { useState } from 'react';
import {
  ToggleButton,
  type ToggleButtonState,
  type ToggleButtonStyle,
  type ToggleButtonSize as TBSize,
  type ToggleButtonLayout,
} from './ui/ToggleButton';

// ── Shared icon helper (manifest icons via currentColor) ───────
import iconManifest from '../../imports/icon-manifest.json';

function ManifestIcon({ name, size = 18 }: { name: string; size?: number }) {
  const manifest = iconManifest as Record<string, { svg: string }>;
  const raw = manifest[name]?.svg ?? '';
  if (!raw) return null;
  const sized = raw
    .replace(/width="24"/, `width="${size}"`)
    .replace(/height="24"/, `height="${size}"`);
  return (
    <span dangerouslySetInnerHTML={{ __html: sized }} style={{ display: 'flex', alignItems: 'center' }} />
  );
}

// ── Icon picker options ────────────────────────────────────────
const TB_ICONS: { name: string; label: string }[] = [
  { name: 'connectWifiConnected/Line',      label: 'Wi-Fi'     },
  { name: 'connectBluetoothConnected/Line', label: 'Bluetooth' },
  { name: 'actionPower/Line',              label: 'Power'     },
  { name: 'homeTVSound/Line',              label: 'TV'        },
  { name: 'abstractLocation/Line',         label: 'Location'  },
  { name: 'actionHeart/Line',              label: 'Favourite' },
  { name: 'homeBulb/Line',                label: 'Light'     },
  { name: 'homeVideoCamera/Line',          label: 'Camera'    },
];

// ── Token table ────────────────────────────────────────────────
const TB_TOKENS: { prop: string; token: string; note: string }[] = [
  { prop: 'Shape',                       token: '--radius-full',                       note: 'Circle (9999px)' },
  { prop: 'Size — default',              token: '48 × 48 px',                          note: 'Minimum touch target; icon 20px' },
  { prop: 'Size — large',               token: '84 × 84 px',                          note: 'Hero device controls; icon 36px' },
  { prop: 'Background — on',            token: '--background-primary',                note: 'All styles; always brand-filled when active' },
  { prop: 'Foreground — on',            token: '--text-primary-inverse',              note: 'White icon on primary fill' },
  { prop: 'Glow — on',                  token: '0 6px 18px -6px --background-primary', note: 'Brand-coloured shadow under active button' },
  { prop: 'Background — off (high)',    token: '--background-neutral-subtle',         note: 'Resting neutral surface' },
  { prop: 'Foreground — off (high)',    token: '--text-neutral-bold',                 note: 'Near-black icon' },
  { prop: 'Border — off (outline)',     token: '--border-primary-bold',               note: '--border-width-thick (2px) solid' },
  { prop: 'Background — borderless',   token: '--background-primary-subtle',         note: 'Light primary tint, no border' },
  { prop: 'Background — error',         token: '--background-error-subtle',           note: 'Semantic error surface' },
  { prop: 'Foreground — error',         token: '--text-error',                        note: 'Error icon + caption' },
  { prop: 'Border — error',             token: '--border-error',                      note: '--border-width-thick (2px) solid' },
  { prop: 'Background — irresponsive', token: '--background-disabled',               note: 'Device unreachable' },
  { prop: 'Foreground — irresponsive', token: '--text-disabled',                     note: 'Muted icon' },
  { prop: 'Border — irresponsive',      token: '--border-neutral-bold',               note: '--border-width-thin (1px) dashed' },
  { prop: 'Focus ring',                 token: '--border-info',                       note: '--border-width-heavy (4px) + 2px gap' },
  { prop: 'Label font family',          token: '--typo-body-small-regular-family',    note: 'Noto Sans / brand font' },
  { prop: 'Label font size',            token: '--typo-body-small-regular-size',      note: '12px' },
  { prop: 'Label font weight',          token: '600',                                 note: 'Semibold' },
  { prop: 'Press scale',                token: '0.94',                               note: 'Active press feedback' },
  { prop: 'Hover opacity',              token: '0.88',                               note: 'Hover feedback' },
];

// ── Style meta ─────────────────────────────────────────────────
const STYLE_META: { id: ToggleButtonStyle; label: string; code: string; desc: string }[] = [
  { id: 'high',          label: 'High',           code: 'high',          desc: 'Neutral-subtle fill when off; brand fill when on. Most common for device tiles on white backgrounds.' },
  { id: 'medOutline',    label: 'Med Outline',    code: 'medOutline',    desc: 'Transparent with primary-bold border when off; brand fill when on. Works on light or white surfaces.' },
  { id: 'medBorderless', label: 'Med Borderless', code: 'medBorderless', desc: 'Primary-subtle fill, no border when off; brand fill when on. Compact, lower visual weight.' },
  { id: 'lowGhost',      label: 'Low Ghost',      code: 'lowGhost',      desc: 'Completely transparent off-state. Use on dark or image backgrounds where fills would clash.' },
];

// ── Stateful sub-components (each owns its own useState) ───────

/** One row in the Styles section */
function StyleRow({ id, label, code, desc }: { id: ToggleButtonStyle; label: string; code: string; desc: string }) {
  const [on, setOn] = useState(false);
  return (
    <div className="flex items-center gap-8 px-6 py-6 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0">
      <div className="w-36 flex-shrink-0">
        <p className="text-sm font-semibold text-gray-700">{label}</p>
        <code className="text-xs font-mono text-gray-400">style="{code}"</code>
      </div>
      <div className="flex gap-6 items-center">
        <ToggleButton
          icon="connectWifiConnected/Line"
          state={on ? 'on' : 'off'}
          style={id}
          size="default"
          bottomLabel={on ? 'On' : 'Off'}
          onToggle={next => setOn(next === 'on')}
          ariaLabel={`Toggle ${label}`}
        />
      </div>
      <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
    </div>
  );
}

/** One row in the States section (static — no interactive state needed) */
function StateRow({
  state, label, desc, isLast,
}: {
  state: ToggleButtonState; label: string; desc: string; isLast: boolean;
}) {
  return (
    <div className={`flex items-center gap-8 px-6 py-6 hover:bg-gray-50 transition-colors ${!isLast ? 'border-b border-gray-100' : ''}`}>
      <div className="w-32 flex-shrink-0">
        <p className="text-sm font-semibold text-gray-700">{label}</p>
        <code className="text-xs font-mono text-gray-400">state="{state}"</code>
      </div>
      <div className="flex-shrink-0">
        <ToggleButton
          icon="connectWifiConnected/Line"
          state={state}
          style="high"
          size="default"
          ariaLabel={`Demo ${state}`}
          onToggle={() => {}}
        />
      </div>
      <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
    </div>
  );
}

/** One card in the Sizes section */
function SizeCard({ sz, dim, iconSz, note }: { sz: TBSize; dim: string; iconSz: string; note: string }) {
  const [on, setOn] = useState(false);
  return (
    <div className="flex flex-col items-center gap-4">
      <ToggleButton
        icon="actionPower/Line"
        state={on ? 'on' : 'off'}
        style="high"
        size={sz}
        onToggle={next => setOn(next === 'on')}
        ariaLabel="Toggle power"
      />
      <div className="text-center">
        <div className="text-sm font-semibold text-gray-800 capitalize">{sz}</div>
        <div className="text-xs font-mono text-gray-400 mt-0.5">{dim}</div>
        <div className="text-xs font-mono text-gray-400">icon: {iconSz}</div>
        <div className="text-xs text-gray-400 mt-1 max-w-[140px]">{note}</div>
      </div>
    </div>
  );
}

/** One vertical layout tile */
function VerticalTile({
  icon, label, sub, defaultOn,
}: { icon: string; label: string; sub: string; defaultOn: boolean }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <ToggleButton
      icon={icon}
      state={on ? 'on' : 'off'}
      style="high"
      size="default"
      layout="vertical"
      leadingLabel={label}
      bottomLabel={sub}
      onToggle={next => setOn(next === 'on')}
      ariaLabel={`Toggle ${label}`}
    />
  );
}

/** One horizontal layout row */
function HorizontalRow({
  icon, label, trailing, defaultOn,
}: { icon: string; label: string; trailing: string; defaultOn: boolean }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <ToggleButton
      icon={icon}
      state={on ? 'on' : 'off'}
      style="medBorderless"
      size="default"
      layout="horizontal"
      bottomLabel={label}
      trailingLabel={trailing}
      onToggle={next => setOn(next === 'on')}
      ariaLabel={`Toggle ${label}`}
    />
  );
}

/** One tile in the Device Tile Context section */
function DeviceTile({
  label, subLabel, icon, sty, initOn, fixedState,
}: {
  label: string; subLabel: string; icon: string;
  sty: ToggleButtonStyle; initOn: boolean;
  fixedState?: ToggleButtonState;
}) {
  const [on, setOn] = useState(initOn);
  const effectiveState: ToggleButtonState = fixedState ?? (on ? 'on' : 'off');
  return (
    <div className="flex flex-col items-center gap-3 p-5 rounded-2xl border border-gray-200 bg-white">
      <ToggleButton
        icon={icon}
        state={effectiveState}
        style={sty}
        size="default"
        layout="vertical"
        bottomLabel={label}
        onToggle={fixedState ? () => {} : next => setOn(next === 'on')}
        ariaLabel={`Toggle ${label}`}
      />
      <p className="text-xs text-gray-400 text-center">{subLabel}</p>
    </div>
  );
}

// ── Copy hook ──────────────────────────────────────────────────
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

// ── Pill toggle helper ─────────────────────────────────────────
function Pill({
  active, onClick, children,
}: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
        active ? 'bg-gray-900 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-300'
      }`}
    >
      {children}
    </button>
  );
}

// ── Main exported component ────────────────────────────────────
export function ToggleButtonTab() {
  // Playground state — all at the top level, no conditional hooks
  const [tbStyle,      setTbStyle]      = useState<ToggleButtonStyle>('high');
  const [tbSize,       setTbSize]       = useState<TBSize>('default');
  const [tbLayout,     setTbLayout]     = useState<ToggleButtonLayout>('vertical');
  const [tbState,      setTbState]      = useState<ToggleButtonState>('off');
  const [tbIcon,       setTbIcon]       = useState('connectWifiConnected/Line');
  const [tbLeading,    setTbLeading]    = useState(false);
  const [tbBottom,     setTbBottom]     = useState(false);
  const [tbDark,       setTbDark]       = useState(false);
  const [tbPreviewTab, setTbPreviewTab] = useState<'preview' | 'code'>('preview');
  const { copied, copy } = useCopy();

  const tbSnippet = [
    `<ToggleButton`,
    `  icon="${tbIcon}"`,
    `  state="${tbState}"`,
    `  style="${tbStyle}"`,
    tbSize   !== 'default'  ? `  size="${tbSize}"` : null,
    tbLayout !== 'vertical' ? `  layout="${tbLayout}"` : null,
    tbLeading               ? `  leadingLabel="Wi-Fi"` : null,
    tbBottom                ? `  bottomLabel="2.4 GHz"` : null,
    `  onToggle={next => setState(next)}`,
    `  ariaLabel="Toggle Wi-Fi"`,
    `/>`,
  ].filter(Boolean).join('\n');

  return (
    <div>

      {/* ── Playground ────────────────────────────────────── */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-gray-900">Playground</h2>
        <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden">

          {/* Controls */}
          <div className="px-6 py-5 border-b border-gray-100 bg-gray-50 flex flex-wrap gap-6 items-start">

            {/* State */}
            <div>
              <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">State</div>
              <div className="flex flex-wrap gap-1.5">
                {(['off','on','loading','error','irresponsive'] as ToggleButtonState[]).map(s => (
                  <Pill key={s} active={tbState === s} onClick={() => setTbState(s)}>{s}</Pill>
                ))}
              </div>
            </div>

            {/* Style */}
            <div>
              <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">Style</div>
              <div className="flex flex-wrap gap-1.5">
                {(['high','medOutline','medBorderless','lowGhost'] as ToggleButtonStyle[]).map(s => (
                  <Pill key={s} active={tbStyle === s} onClick={() => setTbStyle(s)}>{s}</Pill>
                ))}
              </div>
            </div>

            {/* Size */}
            <div>
              <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">Size</div>
              <div className="flex gap-1.5">
                {(['default','large'] as TBSize[]).map(s => (
                  <Pill key={s} active={tbSize === s} onClick={() => setTbSize(s)}>{s}</Pill>
                ))}
              </div>
            </div>

            {/* Layout */}
            <div>
              <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">Layout</div>
              <div className="flex gap-1.5">
                {(['vertical','horizontal'] as ToggleButtonLayout[]).map(l => (
                  <Pill key={l} active={tbLayout === l} onClick={() => setTbLayout(l)}>{l}</Pill>
                ))}
              </div>
            </div>

            {/* Icon */}
            <div>
              <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">Icon</div>
              <div className="flex flex-wrap gap-1.5">
                {TB_ICONS.map(ic => (
                  <Pill key={ic.name} active={tbIcon === ic.name} onClick={() => setTbIcon(ic.name)}>
                    {ic.label}
                  </Pill>
                ))}
              </div>
            </div>

            {/* Options */}
            <div>
              <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">Options</div>
              <div className="flex flex-wrap gap-1.5">
                <Pill active={tbLeading} onClick={() => setTbLeading(v => !v)}>Leading label</Pill>
                <Pill active={tbBottom}  onClick={() => setTbBottom(v => !v)}>Bottom label</Pill>
                <Pill active={tbDark}    onClick={() => setTbDark(v => !v)}>Dark preview</Pill>
              </div>
            </div>
          </div>

          {/* Preview / Code tabs */}
          <div className="border-b border-gray-100 flex gap-6 px-6">
            {(['preview','code'] as const).map(tab => (
              <button key={tab} onClick={() => setTbPreviewTab(tab)}
                className={`py-3 text-sm font-medium capitalize transition-colors relative ${tbPreviewTab === tab ? 'text-gray-900' : 'text-gray-400 hover:text-gray-600'}`}>
                {tab}
                {tbPreviewTab === tab && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900" />}
              </button>
            ))}
          </div>

          {tbPreviewTab === 'preview' ? (
            <div
              className="p-12 flex items-center justify-center min-h-48 transition-colors duration-200"
              style={{ backgroundColor: tbDark ? '#1f2937' : '#f9fafb' }}
            >
              <ToggleButton
                icon={tbIcon}
                state={tbState}
                style={tbStyle}
                size={tbSize}
                layout={tbLayout}
                leadingLabel={tbLeading ? 'Wi-Fi' : undefined}
                bottomLabel={tbBottom  ? '2.4 GHz' : undefined}
                onToggle={next => setTbState(next)}
                ariaLabel="Toggle device"
              />
            </div>
          ) : (
            <div className="relative bg-gray-950">
              <pre className="text-sm text-green-400 p-6 overflow-x-auto font-mono leading-relaxed">
                {tbSnippet}
              </pre>
              <button onClick={() => copy(tbSnippet)}
                className="absolute top-4 right-4 px-3 py-1.5 rounded-lg text-xs font-medium bg-white/10 text-white hover:bg-white/20 transition-colors">
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ── Styles ──────────────────────────────────────────── */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-2 text-gray-900">Styles</h2>
        <p className="text-sm text-gray-500 mb-6 leading-relaxed">
          The <code className="font-mono">style</code> prop controls how the button looks in the <strong>off</strong> state only.
          The <strong>on</strong> state is always a brand-filled circle (<code className="font-mono">--background-primary</code>)
          regardless of style chosen — ensuring the "device is active" signal is unambiguous. Click a button to toggle it.
        </p>
        <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden">
          {STYLE_META.map(s => (
            <StyleRow key={s.id} {...s} />
          ))}
        </div>
      </div>

      {/* ── States ──────────────────────────────────────────── */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-2 text-gray-900">States</h2>
        <p className="text-sm text-gray-500 mb-6 leading-relaxed">
          Toggle Button has five distinct states that communicate device status, not just interaction state.
          Unlike a standard button which only has default/hover/active/disabled, Toggle Button models the full
          lifecycle of a connected device.
        </p>
        <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden">
          {([
            { state: 'off'          as ToggleButtonState, label: 'Off',           desc: 'Device is reachable but inactive. Appearance determined by the style prop.' },
            { state: 'on'           as ToggleButtonState, label: 'On',            desc: 'Device is active. Always --background-primary fill with a brand-coloured glow.' },
            { state: 'loading'      as ToggleButtonState, label: 'Loading',       desc: 'Toggle command sent; awaiting device confirmation. Pulsing on-state + spinner. Non-interactive.' },
            { state: 'error'        as ToggleButtonState, label: 'Error',         desc: 'Device reported an error. --background-error-subtle + danger icon + --border-error border.' },
            { state: 'irresponsive' as ToggleButtonState, label: 'Irresponsive',  desc: 'Device is out of range or offline. Disabled-like dashed border. Non-interactive.' },
          ]).map((row, i, arr) => (
            <StateRow key={row.state} {...row} isLast={i === arr.length - 1} />
          ))}
        </div>
      </div>

      {/* ── Sizes ───────────────────────────────────────────── */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-2 text-gray-900">Sizes</h2>
        <p className="text-sm text-gray-500 mb-6 leading-relaxed">
          <code className="font-mono">default</code> (48×48 px) matches the standard icon button touch target.
          <code className="font-mono"> large</code> (84×84 px) is for hero device-control tiles where the button
          must be visually dominant. Click to toggle.
        </p>
        <div className="bg-white border border-gray-200 rounded-3xl p-8">
          <div className="flex flex-wrap items-end gap-12">
            <SizeCard sz="default" dim="48 × 48 px" iconSz="20 px" note="Standard device tile; meets touch target minimum." />
            <SizeCard sz="large"   dim="84 × 84 px" iconSz="36 px" note="Hero control; TV, smart home, prominent device card." />
          </div>
        </div>
      </div>

      {/* ── Layouts ─────────────────────────────────────────── */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-2 text-gray-900">Layouts</h2>
        <p className="text-sm text-gray-500 mb-6 leading-relaxed">
          <code className="font-mono">layout="vertical"</code> (default) stacks labels above and below the button — the
          standard tile pattern. <code className="font-mono">layout="horizontal"</code> places the button inline with
          labels before and after — suits list rows and settings panels.
        </p>
        <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden">
          {/* Vertical */}
          <div className="px-6 py-8 border-b border-gray-100">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-6">Vertical (default)</p>
            <div className="flex flex-wrap gap-8 items-start">
              <VerticalTile icon="connectWifiConnected/Line"      label="Wi-Fi"     sub="2.4 GHz"   defaultOn={true}  />
              <VerticalTile icon="connectBluetoothConnected/Line" label="Bluetooth" sub="Connected"  defaultOn={false} />
              <VerticalTile icon="actionPower/Line"               label="Power"     sub="Always on"  defaultOn={false} />
              <VerticalTile icon="homeVideoCamera/Line"           label="Camera"    sub="Front view" defaultOn={false} />
            </div>
          </div>
          {/* Horizontal */}
          <div className="px-6 py-8">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-6">Horizontal</p>
            <div className="flex flex-col gap-6">
              <HorizontalRow icon="connectWifiConnected/Line"      label="Wi-Fi"     trailing="Connected to Home-5G" defaultOn={true}  />
              <HorizontalRow icon="connectBluetoothConnected/Line" label="Bluetooth" trailing="No devices paired"    defaultOn={false} />
              <HorizontalRow icon="abstractLocation/Line"          label="Location"  trailing="Precise location on"  defaultOn={false} />
            </div>
          </div>
        </div>
      </div>

      {/* ── Device tile context ──────────────────────────────── */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-2 text-gray-900">Device tile context</h2>
        <p className="text-sm text-gray-500 mb-6 leading-relaxed">
          Toggle Buttons are typically composed inside device tiles — SDUI-rendered cards that surface controls
          for a paired device. The button sits at the tile's centre or corner and communicates the full state of
          the device at a glance.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <DeviceTile label="Wi-Fi"     subLabel="Tap to toggle" icon="connectWifiConnected/Line"      sty="high"          initOn={true}  />
          <DeviceTile label="Bluetooth" subLabel="No devices"    icon="connectBluetoothConnected/Line" sty="high"          initOn={false} />
          <DeviceTile label="TV"        subLabel="Error state"   icon="homeTVSound/Line"               sty="medBorderless" initOn={false} fixedState="error"        />
          <DeviceTile label="Camera"    subLabel="Offline"       icon="homeVideoCamera/Line"           sty="medOutline"    initOn={false} fixedState="irresponsive" />
        </div>
      </div>

      {/* ── Design tokens ───────────────────────────────────── */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-2 text-gray-900">Design tokens</h2>
        <p className="text-sm text-gray-500 mb-6 leading-relaxed">
          Every colour, border, and typography value is a brand design token.
          Brand switching updates all values simultaneously — zero component code changes required.
        </p>
        <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden">
          <div className="grid grid-cols-[1fr_260px_1fr] border-b border-gray-100 px-6 py-3 bg-gray-50">
            {['Property', 'Token', 'Note'].map(h => (
              <div key={h} className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</div>
            ))}
          </div>
          {TB_TOKENS.map((row, i) => (
            <div key={row.prop}
              className={`grid grid-cols-[1fr_260px_1fr] items-center px-6 py-3 hover:bg-gray-50 transition-colors ${i < TB_TOKENS.length - 1 ? 'border-b border-gray-100' : ''}`}>
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
              { label: 'aria-label (required)',   text: 'No visible text label is rendered inside the button. Always pass ariaLabel describing the action and the device — e.g. "Toggle Wi-Fi", not just "Toggle".' },
              { label: 'aria-pressed',            text: 'Set to true when state === "on". Screen readers announce "button, pressed" / "button, not pressed" — communicating selection without relying on colour.' },
              { label: 'aria-disabled',           text: 'Set on loading and irresponsive states. The button remains in the DOM but interaction is suppressed.' },
              { label: 'Focus ring',              text: 'A 4 px (--border-width-heavy) --border-info ring with a 2 px white gap appears on :focus-visible. Visible against all state backgrounds.' },
              { label: 'Touch target',            text: 'Both sizes (48 px and 84 px) significantly exceed the WCAG 2.5.5 minimum 44 × 44 px touch target requirement.' },
              { label: 'Loading state',           text: 'The internal spinner carries role="status" and aria-label="Loading". Consider updating the outer ariaLabel to "Turning on Wi-Fi…" for full context.' },
              { label: 'Error state',             text: 'The error icon is decorative (aria-hidden). Update ariaLabel to describe the failure, e.g. "Wi-Fi — connection error".' },
              { label: 'Colour contrast',         text: 'The on-state uses --text-primary-inverse (white) on --background-primary. Both default and error states meet WCAG 4.5:1 contrast in all brand themes.' },
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

      {/* ── Usage ───────────────────────────────────────────── */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-gray-900">Usage</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border border-gray-200 rounded-3xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                <svg className="w-3 h-3 text-green-600" fill="none" viewBox="0 0 12 12">
                  <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="text-sm font-semibold text-green-700 uppercase tracking-wider">Do</span>
            </div>
            <ul className="space-y-3">
              {[
                'Use for binary device controls that require immediate feedback — Wi-Fi, Bluetooth, location, camera.',
                'Always pair with ariaLabel that names the device and action: "Toggle Bluetooth".',
                'Use the loading state while the toggle command is in flight — never jump straight from off to on.',
                'Use the irresponsive state when the device is offline or out of range, not the disabled prop.',
                'Use the large size for hero controls where the button is the primary element on the surface.',
                'Use horizontal layout when embedding Toggle Buttons in list rows or settings panels.',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                  <div className="w-1 h-1 rounded-full bg-green-400 mt-2 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white border border-gray-200 rounded-3xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center">
                <svg className="w-3 h-3 text-red-600" fill="none" viewBox="0 0 12 12">
                  <path d="M3 3l6 6M9 3l-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <span className="text-sm font-semibold text-red-700 uppercase tracking-wider">Don't</span>
            </div>
            <ul className="space-y-3">
              {[
                "Don't use Toggle Button for persistent preferences — use the Toggle (switch) component instead.",
                "Don't omit the loading state — jumping from off to on without it makes the UI feel broken.",
                "Don't rely on the icon alone to communicate error or irresponsive state — surface helper text or a tooltip.",
                "Don't use ambiguous icons without a label — the user must understand what device is being toggled.",
                "Don't mix styles within the same tile grid — consistency helps users build a mental model quickly.",
                "Don't hardcode colours — every value must reference a brand token to support brand switching.",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                  <div className="w-1 h-1 rounded-full bg-red-400 mt-2 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ── Props ───────────────────────────────────────────── */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-gray-900">Props</h2>
        <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden">
          <div className="grid grid-cols-[130px_220px_100px_1fr] border-b border-gray-100 px-6 py-3 bg-gray-50">
            {['Prop', 'Type', 'Default', 'Description'].map(h => (
              <div key={h} className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</div>
            ))}
          </div>
          {[
            { prop: 'icon',          type: 'string',                                                  def: '—',           desc: 'CDS icon manifest key. Required unless state="error" (danger icon is automatic).' },
            { prop: 'state',         type: '"on"|"off"|"loading"|"error"|"irresponsive"',             def: '"off"',       desc: 'Visual + interaction state. Models the full device lifecycle.' },
            { prop: 'style',         type: '"high"|"medOutline"|"medBorderless"|"lowGhost"',          def: '"high"',      desc: 'Off-state visual treatment. On-state is always brand-filled regardless.' },
            { prop: 'size',          type: '"default"|"large"',                                       def: '"default"',   desc: 'default = 48×48px / icon 20px; large = 84×84px / icon 36px.' },
            { prop: 'layout',        type: '"vertical"|"horizontal"',                                 def: '"vertical"',  desc: 'Stacks labels above/below (vertical) or inline before/after (horizontal).' },
            { prop: 'leadingLabel',  type: 'string',                                                  def: '—',           desc: 'Label above the button (vertical) or to its left (horizontal).' },
            { prop: 'bottomLabel',   type: 'string',                                                  def: '—',           desc: 'Label below the button (vertical) or primary inline label (horizontal).' },
            { prop: 'trailingLabel', type: 'string',                                                  def: '—',           desc: 'Horizontal only. Secondary label stacked after bottomLabel.' },
            { prop: 'onToggle',      type: '(next: "on"|"off") => void',                             def: '—',           desc: 'Called with the next state. Not called when loading or irresponsive.' },
            { prop: 'ariaLabel',     type: 'string',                                                  def: '"Toggle"',    desc: 'Required. Accessible label for the button — include the device name.' },
            { prop: 'forceFocus',    type: 'boolean',                                                 def: 'false',       desc: 'Force-renders the focus ring. Used in spec and documentation pages.' },
          ].map((row, i, arr) => (
            <div key={row.prop}
              className={`grid grid-cols-[130px_220px_100px_1fr] px-6 py-3 items-start gap-4 hover:bg-gray-50 transition-colors ${i < arr.length - 1 ? 'border-b border-gray-100' : ''}`}>
              <code className="text-sm font-mono text-gray-800">{row.prop}</code>
              <code className="text-xs font-mono text-gray-500 break-words">{row.type}</code>
              <code className="text-sm font-mono text-gray-400">{row.def}</code>
              <span className="text-sm text-gray-600">{row.desc}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}