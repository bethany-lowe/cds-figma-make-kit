/**
 * AiAssistantPage
 *
 * Component documentation page for the AI Assistant button.
 * Structure mirrors SnackbarPage: Playground → States → Anatomy →
 * Compositions → When to use → Do / Don't → Design tokens → Accessibility.
 */

import { useState } from 'react';
import { AiAssistantButton } from './ui/AiAssistantButton';
import type { AiAssistantState, AiAssistantSize } from './ui/AiAssistantButton';
import { useTheme } from '../contexts/ThemeContext';

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

// ── Token table data ──────────────────────────────────────────
const TOKEN_ROWS = [
  { prop: 'Container size — default', token: '60 × 60 px',                             note: 'Circular visual bound; circle inner is 58 px'                          },
  { prop: 'Container size — large',   token: '84 × 84 px',                             note: 'Hero / header size'                                                    },
  { prop: 'Touch target',             token: '48 × 48 px min',                          note: '60 px visual already exceeds WCAG minimum'                             },
  { prop: 'Border radius',            token: '--radius-full',                            note: '9999 px — always a perfect circle'                                     },
  { prop: 'Border colour',            token: '--color-base-white',                       note: '#ffffff — 1 px ring rendered outside the clipPath on the circle edge'  },
  { prop: 'Border width',             token: '--border-width-thin',                      note: '1 px — SVG stroke on rx="28.5" rect, inset 0.5 px for crisp alignment' },
  { prop: 'Gradient start',           token: '#FFD4F7',                                 note: 'Pale rose/pink — top-right origin'                                      },
  { prop: 'Gradient end',             token: '#ADEDFF',                                 note: 'Pale sky blue — bottom-left'                                            },
  { prop: 'Gradient rotation',        token: 'rotate(133.5°) scale(57.64)',             note: 'Diagonal sweep, top-right → bottom-left'                                },
  { prop: 'Wave colour A',            token: '#7A0BD2, fillOpacity 0.61',               note: 'Lightest wave — rendered twice for depth'                               },
  { prop: 'Wave colour B',            token: '#6E0BD2, fillOpacity 0.61',               note: 'Middle wave — rendered twice for depth'                                 },
  { prop: 'Wave colour C',            token: '#3F0BD2, fillOpacity 0.62',               note: 'Deepest wave — rendered twice for depth'                                },
  { prop: 'Wave mask',                token: 'luminance mask, circle r=29',             note: 'Clips all 6 wave draws to the circle bounds'                            },
  { prop: 'Wave animation — axis',    token: 'translateX + translateY',                  note: 'Each layer travels a unique diagonal path; no two waves share a trajectory' },
  { prop: 'Wave animation — easing',  token: 'ease-in-out, alternate',                  note: 'CSS draws a perfect cosine arc between two endpoints — no mid-stop seams'  },
  { prop: 'Wave A — timing',          token: '3.8 s, delay 0 s',                        note: '−5 px → +5 px X  ·  +3 px → −3 px Y  (subtle outer layer)'             },
  { prop: 'Wave B — timing',          token: '2.8 s, delay 0.7 s',                      note: '−8 px → +8 px X  ·    0 px → −9 px Y  (dominant centre energy)'         },
  { prop: 'Wave C — timing',          token: '3.3 s, delay 1.4 s',                      note: '−6 px → +6 px X  ·  −4 px → +5 px Y  (counter-phase base layer)'        },
  { prop: 'Outer glow — default',     token: 'rgba(120, 80, 240, 0.30), blur 10 px',   note: 'CSS drop-shadow; always present at rest'                                },
  { prop: 'Outer glow — listening',   token: 'rgba(120, 80, 240, 0.55), blur 16 px',   note: 'Intensified during listening state'                                     },
  { prop: 'Breathe animation',        token: 'scale(1) → scale(1.05)',                  note: '1.8 s ease-in-out during listening; sits above wave motion'             },
  { prop: 'Disabled opacity',         token: '0.4',                                    note: 'Glow removed; pointer-events none'                                      },
  { prop: 'Focus ring color',         token: '--border-info',                           note: 'Blue — keyboard / switch navigation'                                    },
  { prop: 'Focus ring width',         token: '4 px, offset 3 px',                      note: 'Applied on :focus-visible'                                              },
  { prop: 'Press scale',              token: '0.94',                                   note: 'Active feedback on :active'                                             },
  { prop: 'Pulse ring color',         token: 'rgba(140, 90, 255, 0.5)',                 note: 'Two staggered rings behind button'                                      },
  { prop: 'Pulse ring scale',         token: 'scale(1) → scale(1.9)',                  note: '1.8 s ease-out, rings offset by 0.6 s'                                  },
];

// ── State meta ────────────────────────────────────────────────
const STATE_ROWS: {
  state: AiAssistantState;
  label: string;
  note:  string;
}[] = [
  { state: 'default',   label: 'Default',   note: 'Component at rest, awaiting user interaction. No animation active on the wave layers.'                              },
  { state: 'listening', label: 'Listening', note: 'Actively capturing voice input. Three wave layers oscillate diagonally — each on a unique translateX + translateY path — producing a silk-smooth interference waveform. A breathe-scale (1 → 1.05) and intensified glow layer over the wave motion. Pulse rings expand behind the button.' },
  { state: 'disabled',  label: 'Disabled',  note: 'Unavailable. 0.4 opacity. Pointer-events none. Glow and all animations removed. Announce "unavailable" to screen readers.' },
];

// ── Code snippet builder ──────────────────────────────────────
function buildSnippet(state: AiAssistantState, size: AiAssistantSize) {
  const lines: string[] = ['import { AiAssistantButton } from \'@cds/components\';', ''];
  const props: string[] = [];
  if (state !== 'default') props.push(`state="${state}"`);
  if (size  !== 'default') props.push(`size="${size}"`);
  props.push('onClick={() => { /* open AI panel */ }}');
  if (props.length <= 2) {
    lines.push(`<AiAssistantButton ${props.join(' ')} />`);
  } else {
    lines.push('<AiAssistantButton');
    props.forEach(p => lines.push(`  ${p}`));
    lines.push('/>');
  }
  return lines.join('\n');
}

// ── Page ──────────────────────────────────────────────────────

export function AiAssistantPage() {
  const { brandFont, brandName } = useTheme();

  // Playground
  const [playState, setPlayState] = useState<AiAssistantState>('default');
  const [playSize,  setPlaySize]  = useState<AiAssistantSize>('default');
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');

  const { copied, copy } = useCopy();
  const snippet = buildSnippet(playState, playSize);

  return (
    <div>

      {/* ── Header ──────────────────────────────────────────── */}
      <div className="flex items-start justify-between mb-12">
        <div>
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
            Components
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4" style={{ fontFamily: brandFont }}>
            AI Assistant
          </h1>
          <p className="text-base text-gray-600 leading-relaxed max-w-2xl">
            A compact, circular button that provides the primary entry point for voice and
            text-based AI interaction within {brandName} SmartHome+. A gradient animated
            background conveys active listening or processing. Sometimes called{' '}
            <em>Jarvis</em>, <em>AI button</em>, or <em>voice button</em> by designers and
            engineers. All visual tokens, animations, and icon sizing are driven by{' '}
            <code className="font-mono text-sm bg-gray-100 px-1.5 py-0.5 rounded">--*</code>{' '}
            tokens and adapt to the active brand palette.
          </p>
        </div>
        <div className="bg-green-50 text-green-700 border border-green-200 px-4 py-1.5 rounded-full text-xs font-semibold flex-shrink-0 ml-6">
          Ready
        </div>
      </div>

      {/* ── Playground ──────────────────────────────────────── */}
      <div className="mb-20">
        <h2 className="text-2xl font-semibold mb-2 text-gray-900">Playground</h2>
        <p className="text-sm text-gray-500 mb-6 leading-relaxed">
          Toggle state and size to inspect every variant. Switch to the{' '}
          <code className="font-mono">code</code> tab to copy the corresponding JSX.
        </p>
        <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden">

          {/* Controls */}
          <div className="px-6 py-5 border-b border-gray-100 bg-gray-50 flex flex-wrap gap-6 items-start">
            <PillSelector
              label="State"
              value={playState}
              onChange={setPlayState}
              options={[
                { value: 'default',   label: 'Default'   },
                { value: 'listening', label: 'Listening' },
                { value: 'disabled',  label: 'Disabled'  },
              ]}
            />
            <PillSelector
              label="Size"
              value={playSize}
              onChange={setPlaySize}
              options={[
                { value: 'default', label: 'Default (60px)' },
                { value: 'large',   label: 'Large (84px)'   },
              ]}
            />
          </div>

          {/* Preview / Code sub-tabs */}
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
              className="px-12 py-16 flex items-center justify-center min-h-48"
              style={{ backgroundColor: '#f9fafb' }}
            >
              <AiAssistantButton
                state={playState}
                size={playSize}
                onClick={() => {
                  if (playState !== 'listening') setPlayState('listening');
                  else setPlayState('default');
                }}
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
          Three interactive states plus a transient{' '}
          <code className="font-mono">pressed</code> state (scale 0.94) on tap or click.
          A fourth "processing" state may be added in a future version — for now, reuse{' '}
          <code className="font-mono">listening</code>.
        </p>
        <div className="flex flex-col gap-3">
          {STATE_ROWS.map(({ state, label, note }) => (
            <div
              key={state}
              className="flex items-center gap-6 bg-white border border-gray-200 rounded-2xl px-6 py-5"
            >
              <div className="w-28 flex-shrink-0">
                <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
                  {label}
                </div>
              </div>
              {/* 80px box so the pulse ring doesn't clip */}
              <div className="w-20 h-20 flex items-center justify-center flex-shrink-0">
                <AiAssistantButton state={state} />
              </div>
              <p className="text-sm text-gray-500 leading-relaxed">{note}</p>
            </div>
          ))}
          {/* Pressed — shown as description only (transient) */}
          <div className="flex items-center gap-6 bg-white border border-gray-200 rounded-2xl px-6 py-5">
            <div className="w-28 flex-shrink-0">
              <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
                Pressed
              </div>
            </div>
            <div className="w-20 h-20 flex items-center justify-center flex-shrink-0">
              <div className="w-[60px] h-[60px] rounded-full flex items-center justify-center text-xs text-gray-400 border-2 border-dashed border-gray-200">
                :active
              </div>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              Transient tap / click feedback. Button scales to 0.94 on{' '}
              <code className="font-mono text-xs">:active</code>. Haptic feedback
              recommended on mobile. Automatically returns to previous state on release.
            </p>
          </div>
        </div>
      </div>

      {/* ── Anatomy ─────────────────────────────────────────── */}
      <div className="mb-20">
        <h2 className="text-2xl font-semibold mb-2 text-gray-900">Anatomy</h2>
        <p className="text-sm text-gray-500 mb-6 leading-relaxed">
          Three structural parts compose the AI Assistant button. No text label is included
          by design — an accessible <code className="font-mono">aria-label</code> replaces it.
        </p>

        {/* Large centered preview with numbered callouts */}
        <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden mb-6">

          {/* Annotation canvas — fixed 480 × 260 coordinate space */}
          <div className="flex justify-center" style={{ backgroundColor: '#f9fafb' }}>
            <div className="relative" style={{ width: 480, height: 260 }}>

              {/* Button — absolutely centred in the canvas */}
              <div
                className="absolute"
                style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)', zIndex: 1 }}
              >
                <AiAssistantButton state="default" size="large" />
              </div>

              {/* SVG annotation overlay — same 480 × 260 coordinate space */}
              <svg
                className="absolute inset-0 pointer-events-none"
                width="480"
                height="260"
                viewBox="0 0 480 260"
                fill="none"
              >
                {/*
                  Button centre  : (240, 130)
                  Button radius  : 30 px
                  45° intercepts : (240 ± 21, 130 ± 21)
                */}

                {/* ── L-shaped callout lines ── */}
                {/* 1 — top-left  : circle container */}
                <path d="M 219,109 L 60,109 L 60,50"  stroke="#d1d5db" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                {/* 2 — top-right : gradient background */}
                <path d="M 261,109 L 420,109 L 420,50" stroke="#d1d5db" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                {/* 3 — bottom-right : wave bands */}
                <path d="M 261,151 L 420,151 L 420,210" stroke="#d1d5db" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                {/* 4 — bottom-left  : border ring */}
                <path d="M 219,151 L 60,151 L 60,210"  stroke="#d1d5db" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />

                {/* ── Touch-point dots on the button perimeter ── */}
                <circle cx="219" cy="109" r="3" fill="#9ca3af" />
                <circle cx="261" cy="109" r="3" fill="#9ca3af" />
                <circle cx="261" cy="151" r="3" fill="#9ca3af" />
                <circle cx="219" cy="151" r="3" fill="#9ca3af" />

                {/* ── Numbered endpoint circles ── */}
                {/* 1 — top-left */}
                <circle cx="60"  cy="38"  r="13" fill="#111827" />
                <text x="60"  y="38"  textAnchor="middle" dominantBaseline="middle" fill="white" fontSize="11" fontWeight="700" fontFamily="ui-sans-serif,system-ui,sans-serif">1</text>
                {/* 2 — top-right */}
                <circle cx="420" cy="38"  r="13" fill="#111827" />
                <text x="420" y="38"  textAnchor="middle" dominantBaseline="middle" fill="white" fontSize="11" fontWeight="700" fontFamily="ui-sans-serif,system-ui,sans-serif">2</text>
                {/* 3 — bottom-right */}
                <circle cx="420" cy="222" r="13" fill="#111827" />
                <text x="420" y="222" textAnchor="middle" dominantBaseline="middle" fill="white" fontSize="11" fontWeight="700" fontFamily="ui-sans-serif,system-ui,sans-serif">3</text>
                {/* 4 — bottom-left */}
                <circle cx="60"  cy="222" r="13" fill="#111827" />
                <text x="60"  y="222" textAnchor="middle" dominantBaseline="middle" fill="white" fontSize="11" fontWeight="700" fontFamily="ui-sans-serif,system-ui,sans-serif">4</text>
              </svg>
            </div>
          </div>

          {/* Parts grid — 4 columns for 4 anatomy items */}
          <div className="grid grid-cols-1 sm:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-gray-100 border-t border-gray-100">
            {[
              { n: '1', title: 'Circle container', desc: 'Rounded-29 clipPath + luminance mask bound all content to a perfect circle, 58 px inner / 60 px outer with 1 px breathing room for the glow.' },
              { n: '2', title: 'Gradient background', desc: 'Radial gradient #FFD4F7 (pale pink, top-right) → #ADEDFF (pale blue, bottom-left) at rotate(133.5°). Sets the airy upper half tone.' },
              { n: '3', title: 'Wave bands', desc: 'Three purple paths (p2bb7e700 / p3d3f0e00 / p113b5300) drawn twice each for layered opacity depth. Fills rise from #7A0BD2 → #3F0BD2, forming the ocean-wave silhouette.' },
              { n: '4', title: 'Border ring', desc: '1 px white stroke (--color-base-white / --border-width-thin) rendered as an SVG <rect> outside the clipPath group. Inset 0.5 px so the stroke lands precisely on the circle edge without being clipped.' },
            ].map(({ n, title, desc }) => (
              <div key={n} className="px-6 py-5 flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-gray-900 text-white flex items-center justify-center text-[11px] font-bold flex-shrink-0 mt-0.5">
                  {n}
                </span>
                <div>
                  <p className="text-sm font-semibold text-gray-900 mb-1">{title}</p>
                  <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Motion ─────────────────────────────────────────── */}
      <div className="mb-20">
        <h2 className="text-2xl font-semibold mb-2 text-gray-900">Motion</h2>
        <p className="text-sm text-gray-500 mb-6 leading-relaxed">
          The listening-state wave animation is inspired by Siri-style voice waveforms and
          silk-fabric motion from the original design exploration. Three independent wave
          layers each travel a unique diagonal path combining{' '}
          <code className="font-mono">translateX</code> and{' '}
          <code className="font-mono">translateY</code>, producing an organic interference
          pattern that never visually repeats within a practical session length.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          {[
            {
              label: 'Wave A',
              duration: '3.8 s',
              delay: '0 s',
              x: '−5 px → +5 px',
              y: '+3 px → −3 px',
              role: 'Subtle outer layer — longest period, least travel.',
              color: '#7A0BD2',
            },
            {
              label: 'Wave B',
              duration: '2.8 s',
              delay: '0.7 s',
              x: '−8 px → +8 px',
              y: '0 px → −9 px',
              role: 'Dominant centre energy — most vertical amplitude, mirrors the voice-waveform peak.',
              color: '#6E0BD2',
            },
            {
              label: 'Wave C',
              duration: '3.3 s',
              delay: '1.4 s',
              x: '−6 px → +6 px',
              y: '−4 px → +5 px',
              role: 'Counter-phase base — opposite vertical bias to B, deepens the interference pattern.',
              color: '#3F0BD2',
            },
          ].map(w => (
            <div key={w.label} className="bg-white border border-gray-200 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: w.color }} />
                <span className="text-sm font-semibold text-gray-900">{w.label}</span>
              </div>
              <dl className="space-y-1.5 mb-3">
                {[
                  { k: 'Duration', v: w.duration },
                  { k: 'Delay',    v: w.delay    },
                  { k: 'X travel', v: w.x        },
                  { k: 'Y travel', v: w.y        },
                ].map(({ k, v }) => (
                  <div key={k} className="flex justify-between">
                    <dt className="text-xs text-gray-400">{k}</dt>
                    <dd className="text-xs font-mono text-gray-700">{v}</dd>
                  </div>
                ))}
              </dl>
              <p className="text-xs text-gray-500 leading-relaxed border-t border-gray-100 pt-3">{w.role}</p>
            </div>
          ))}
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl p-5">
          <p className="text-sm font-semibold text-gray-900 mb-2">
            Why <code className="font-mono text-sm">alternate</code> + two keyframe stops?
          </p>
          <p className="text-sm text-gray-500 leading-relaxed">
            Using <code className="font-mono">animation-direction: alternate</code> with only a{' '}
            <code className="font-mono">from</code> and <code className="font-mono">to</code>{' '}
            keyframe lets the browser render a mathematically perfect cosine arc between
            the two endpoints. Earlier iterations used five mid-stops (0 % → 25 % → 50 % → 75 % → 100 %)
            which applied <code className="font-mono">ease-in-out</code> independently to each
            segment, introducing subtle velocity discontinuities at every boundary. The
            two-stop approach eliminates those seams entirely — the motion is now one
            continuous smooth arc per wave layer.
          </p>
        </div>
      </div>

      {/* ── Common compositions ──────────────────────────────── */}
      <div className="mb-20">
        <h2 className="text-2xl font-semibold mb-2 text-gray-900">Common compositions</h2>
        <p className="text-sm text-gray-500 mb-6 leading-relaxed">
          Two placements are defined in the SmartHome+ design spec. Both use the default 60 px
          size unless the surface explicitly calls for the large variant.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          {/* Floating action button */}
          <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden">
            <div className="relative h-48 bg-gray-100 rounded-t-3xl overflow-hidden flex items-center justify-center">
              {/* Simulated phone screen */}
              <div className="w-44 h-40 rounded-2xl bg-white shadow-lg relative overflow-hidden border border-gray-200">
                {/* Status bar */}
                <div className="h-6 bg-gray-50 border-b border-gray-100 flex items-center px-3 gap-1">
                  <div className="w-12 h-1.5 bg-gray-200 rounded-full" />
                  <div className="flex-1" />
                  <div className="w-4 h-1.5 bg-gray-200 rounded-full" />
                </div>
                {/* Content rows */}
                <div className="p-3 space-y-2">
                  <div className="h-2 bg-gray-100 rounded w-3/4" />
                  <div className="h-2 bg-gray-100 rounded w-1/2" />
                  <div className="h-2 bg-gray-100 rounded w-2/3" />
                </div>
                {/* FAB */}
                <div className="absolute bottom-3 right-3">
                  <AiAssistantButton state="default" />
                </div>
              </div>
            </div>
            <div className="px-6 py-5">
              <p className="text-sm font-semibold text-gray-900 mb-1">Home screen entry point</p>
              <p className="text-xs text-gray-500 leading-relaxed">
                Positioned as a floating action button for quick voice access from the main
                SmartHome+ screen. Bottom-right corner; 16–24 dp from edge.
              </p>
            </div>
          </div>

          {/* Header control */}
          <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden">
            <div className="relative h-48 bg-gray-100 rounded-t-3xl overflow-hidden flex items-center justify-center">
              {/* Simulated app header */}
              <div className="w-56 h-40 rounded-2xl bg-white shadow-lg overflow-hidden border border-gray-200">
                {/* Header bar */}
                <div className="h-12 bg-white border-b border-gray-100 flex items-center justify-between px-3">
                  {/* Menu icon mock */}
                  <div className="flex flex-col gap-0.5">
                    <div className="w-3.5 h-0.5 bg-gray-300 rounded" />
                    <div className="w-3.5 h-0.5 bg-gray-300 rounded" />
                    <div className="w-3.5 h-0.5 bg-gray-300 rounded" />
                  </div>
                  <div className="w-16 h-2 bg-gray-200 rounded" />
                  {/* AI button in header */}
                  <div style={{ transform: 'scale(0.6)', transformOrigin: 'center' }}>
                    <AiAssistantButton state="default" />
                  </div>
                </div>
                {/* Screen content */}
                <div className="p-3 space-y-2">
                  <div className="h-2 bg-gray-100 rounded w-full" />
                  <div className="h-2 bg-gray-100 rounded w-3/4" />
                  <div className="h-16 bg-gray-50 rounded-xl" />
                </div>
              </div>
            </div>
            <div className="px-6 py-5">
              <p className="text-sm font-semibold text-gray-900 mb-1">Persistent header control</p>
              <p className="text-xs text-gray-500 leading-relaxed">
                Integrated into the app header for consistent access across all screens.
                Use the large (84 px) variant here if the header height permits.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* ── When to use ─────────────────────────────────────── */}
      <div className="mb-20">
        <h2 className="text-2xl font-semibold mb-2 text-gray-900">When to use</h2>
        <p className="text-sm text-gray-500 mb-6 leading-relaxed">
          The AI Assistant button is a <em>highly specific</em> component — reserve it for
          genuine AI voice-interaction entry points.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Use when */}
          <div className="bg-white border border-gray-200 rounded-3xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500 flex-shrink-0" />
              <span className="text-sm font-semibold text-green-700">Use when</span>
            </div>
            <ul className="space-y-3">
              {[
                'Providing the primary entry point for voice interaction with the smart home system.',
                'Offering quick access to AI-powered features without requiring text input.',
                'Indicating that voice recognition or processing is actively occurring.',
                'Acting as a visual anchor for context-aware AI suggestions or responses.',
              ].map(t => (
                <li key={t} className="flex items-start gap-2 text-sm text-gray-700">
                  <svg className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M13.5 3.5L6 11 2.5 7.5l-1 1L6 13l8.5-8.5-1-1z" />
                  </svg>
                  {t}
                </li>
              ))}
            </ul>
          </div>
          {/* Don't use when */}
          <div className="bg-white border border-gray-200 rounded-3xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 flex-shrink-0" />
              <span className="text-sm font-semibold text-red-700">Don't use when</span>
            </div>
            <ul className="space-y-3">
              {[
                'For non-voice related interactive controls — use Button or IconButton instead.',
                'As a badge or status indicator without interactive functionality.',
                'In contexts where the microphone metaphor would confuse users.',
                'As a replacement for explicit action buttons with clear text labels.',
              ].map(t => (
                <li key={t} className="flex items-start gap-2 text-sm text-gray-700">
                  <svg className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M12.5 3.5l-9 9 1 1 9-9-1-1zm-9 0l-1 1 9 9 1-1-9-9z" />
                  </svg>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ── Do / Don't ──────────────────────────────────────── */}
      <div className="mb-20">
        <h2 className="text-2xl font-semibold mb-2 text-gray-900">Do and don't</h2>
        <p className="text-sm text-gray-500 mb-6 leading-relaxed">
          Four key guidelines for integrating the AI Assistant button correctly.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          {/* Do 1 */}
          <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden">
            <div className="flex items-center gap-2 px-6 py-4 border-b border-gray-100">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-sm font-semibold text-green-700">Do — Provide haptic feedback on tap</span>
            </div>
            <div className="px-6 py-6 flex items-center gap-6">
              <div className="w-20 h-20 flex items-center justify-center flex-shrink-0">
                <AiAssistantButton state="listening" />
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">
                Trigger a haptic pulse on press to confirm the interaction began. This is
                especially important during the transition to the listening state.
              </p>
            </div>
          </div>

          {/* Don't 1 */}
          <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden">
            <div className="flex items-center gap-2 px-6 py-4 border-b border-gray-100">
              <span className="w-2 h-2 rounded-full bg-red-500" />
              <span className="text-sm font-semibold text-red-700">Don't — Add text labels to the button</span>
            </div>
            <div className="px-6 py-6 flex items-center gap-6">
              <div className="w-20 h-20 flex items-center justify-center flex-shrink-0">
                <div className="flex flex-col items-center gap-1">
                  <AiAssistantButton state="default" />
                  <span className="text-[10px] text-gray-500 whitespace-nowrap">Ask AI</span>
                </div>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">
                Text labels crowd the compact circular design and break the established visual
                pattern. Use <code className="font-mono text-[10px]">aria-label</code> instead
                for accessible labelling.
              </p>
            </div>
          </div>

          {/* Do 2 */}
          <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden">
            <div className="flex items-center gap-2 px-6 py-4 border-b border-gray-100">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-sm font-semibold text-green-700">Do — Keep touch target ≥ 48 pt / dp</span>
            </div>
            <div className="px-6 py-6 flex items-center gap-6">
              <div className="w-20 h-20 flex items-center justify-center flex-shrink-0 relative">
                <div className="absolute inset-0 rounded-full border-2 border-dashed border-blue-200 opacity-70" />
                <AiAssistantButton state="default" />
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">
                The 60 px visual container already exceeds the 48 pt minimum. Do not reduce
                the component size below this threshold in any configuration.
              </p>
            </div>
          </div>

          {/* Don't 2 */}
          <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden">
            <div className="flex items-center gap-2 px-6 py-4 border-b border-gray-100">
              <span className="w-2 h-2 rounded-full bg-red-500" />
              <span className="text-sm font-semibold text-red-700">Don't — Display without animation context</span>
            </div>
            <div className="px-6 py-6 flex items-center gap-6">
              <div className="w-20 h-20 flex items-center justify-center flex-shrink-0">
                <div
                  className="w-[60px] h-[60px] rounded-full flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #E53293, #4B286D)', opacity: 0.4 }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="white" aria-hidden="true">
                    <path d="M12 14a3 3 0 0 0 3-3V5a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3zm-1 1.93V18H9v2h6v-2h-2v-2.07A5 5 0 0 0 17 11h-2a3 3 0 0 1-6 0H7a5 5 0 0 0 4 4.93z" />
                  </svg>
                </div>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">
                The gradient animation signals AI activity — removing it reduces affordance.
                Do not use a flat, static version of the button as a generic icon button;
                use <code className="font-mono text-[10px]">IconButton</code> instead.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* ── Design tokens ────────────────────────────────────── */}
      <div className="mb-20">
        <h2 className="text-2xl font-semibold mb-2 text-gray-900">Design tokens</h2>
        <p className="text-sm text-gray-500 mb-6 leading-relaxed">
          Every dimension, colour, and animation value is listed here. Gradient colors are
          from the TELUS brand palette and are hardcoded by design — the gradient is a
          distinctive brand expression unique to this component.
        </p>
        <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden">
          <div className="grid grid-cols-[1fr_280px_1fr] border-b border-gray-100 px-6 py-3 bg-gray-50">
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Property</div>
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Token / Value</div>
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
          <ul className="space-y-5">
            {[
              {
                label: 'Touch target',
                text: 'Default 60 px visual container exceeds the 48 × 48 pt / dp WCAG minimum — no additional tap area extension needed. Never scale the button below 60 px.',
              },
              {
                label: 'Semantic labelling',
                text: 'Always provide aria-label="AI Assistant" (or a locale-appropriate equivalent). The microphone icon alone is insufficient — many users will not associate it with an AI system.',
              },
              {
                label: 'State announcement',
                text: 'Set aria-pressed={true} during the listening state so screen readers announce "AI Assistant, toggle button, pressed". Announce transitions using a polite ARIA live region or by updating aria-label to "AI Assistant, listening".',
              },
              {
                label: 'Color contrast',
                text: 'The --text-neutral-inverse (white) microphone icon on the dark gradient must meet the WCAG AA 3:1 non-text contrast minimum. Verify at the darkest part of the gradient (#4B286D) — target is >4.5:1.',
              },
              {
                label: 'Focus indicator',
                text: 'A 4 px --border-info (blue) focus ring with 3 px offset is applied on :focus-visible. Do not remove the focus ring — keyboard and switch users depend on it to locate and activate the button.',
              },
              {
                label: 'Disabled state',
                text: 'When state="disabled", aria-disabled="true" and pointer-events: none are applied. The button is removed from the tab order. Provide a tooltip or inline message explaining why the feature is unavailable.',
              },
              {
                label: 'Haptic feedback',
                text: 'Trigger haptic feedback on tap (Light Impact on iOS, VibrationEffect.EFFECT_CLICK on Android) to confirm the interaction. Provide an audio cue (brief sound or voice acknowledgement) when transitioning to listening state for visually impaired users.',
              },
            ].map((item, i, arr) => (
              <li
                key={item.label}
                className={`flex gap-4 pb-5 ${i < arr.length - 1 ? 'border-b border-gray-100' : ''}`}
              >
                <span
                  className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                  style={{ background: 'var(--background-primary, #4B286D)' }}
                />
                <div>
                  <p className="text-sm font-semibold text-gray-900 mb-1">{item.label}</p>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

    </div>
  );
}

export default AiAssistantPage;