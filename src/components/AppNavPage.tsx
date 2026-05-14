/**
 * AppNavPage
 *
 * Component documentation for the App Navigation bar.
 * Playground → Platform Variants → States → Anatomy →
 * Platform Guidelines → When to use → Do / Don't → Design tokens → Accessibility
 */

import { useState } from 'react';
import { AppNav } from './ui/AppNav';
import type { AppNavVariant, AppNavPlatform } from './ui/AppNav';
import { AiAssistantButton } from './ui/AiAssistantButton';
import { useTheme } from '../contexts/ThemeContext';
import iconManifest from '../../imports/icon-manifest.json';

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

// ── Device presets ────────────────────────────────────────────
// Common logical-pixel widths for iOS (pt) and Android (dp).
// These drive the PhoneFrame width and the AppNav width prop.
const DEVICE_PRESETS = {
  ios: [
    { id: 'iphoneSE3',    label: 'iPhone SE',        sub: '3rd gen · 375 pt', width: 375 },
    { id: 'iphone14',     label: 'iPhone 14',         sub: '390 pt',           width: 390 },
    { id: 'iphone15',     label: 'iPhone 15',         sub: '393 pt',           width: 393 },
    { id: 'iphone15plus', label: 'iPhone 15 Plus',    sub: '430 pt',           width: 430 },
  ],
  android: [
    { id: 'galaxyS24',    label: 'Galaxy S24',        sub: '360 dp',           width: 360 },
    { id: 'galaxyS24p',   label: 'Galaxy S24+',       sub: '384 dp',           width: 384 },
    { id: 'pixel8',       label: 'Pixel 8',           sub: '412 dp',           width: 412 },
  ],
} as const;

type DeviceId =
  | typeof DEVICE_PRESETS['ios'][number]['id']
  | typeof DEVICE_PRESETS['android'][number]['id'];

const DEFAULT_DEVICE: Record<'ios' | 'android', DeviceId> = {
  ios:     'iphone14',
  android: 'pixel8',
};

/** Returns the numeric width for a given device id across both platforms. */
function getDeviceWidth(id: DeviceId): number {
  const all = [...DEVICE_PRESETS.ios, ...DEVICE_PRESETS.android];
  return all.find(d => d.id === id)?.width ?? 390;
}

// ── Device size selector ──────────────────────────────────────
function DeviceSizeSelector({
  platform,
  value,
  onChange,
}: {
  platform: 'ios' | 'android';
  value:    DeviceId;
  onChange: (id: DeviceId) => void;
}) {
  const presets = DEVICE_PRESETS[platform];
  return (
    <div>
      <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">
        Device size
      </div>
      <div className="flex flex-wrap gap-1.5">
        {presets.map(device => {
          const active = value === device.id;
          return (
            <button
              key={device.id}
              onClick={() => onChange(device.id as DeviceId)}
              className={`flex flex-col items-start px-3 py-1.5 rounded-full text-left transition-colors ${
                active
                  ? 'bg-gray-900 text-white'
                  : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-300'
              }`}
            >
              <span className="text-xs font-medium leading-tight">{device.label}</span>
              <span className={`text-[10px] leading-tight mt-0.5 ${active ? 'text-gray-300' : 'text-gray-400'}`}>
                {device.sub}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ── Phone frame wrapper ───────────────────────────────────────
// Simulates the bottom portion of a phone screen to show the
// nav bar in context. Matches 390 px (iPhone 14) screen width.
function PhoneFrame({
  platform,
  hasAi,
  width,
  children,
}: {
  platform: AppNavPlatform;
  hasAi:    boolean;
  width:    number;
  children: React.ReactNode;
}) {
  const isIos = platform === 'ios';
  return (
    <div
      style={{
        width:        `${width}px`,
        background:   isIos ? '#f0f0f5' : '#fafafa',
        borderRadius: isIos ? '44px' : '24px',
        overflow:     'hidden',
        boxShadow:    '0 20px 60px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.06)',
        display:      'flex',
        flexDirection:'column',
        transition:   'width 200ms ease-out',
      }}
    >
      {/* Simulated screen content */}
      <div
        style={{
          flex:       1,
          height:     hasAi ? '160px' : '120px',
          background: isIos
            ? 'linear-gradient(180deg, #f7f7fa 0%, #ebebf0 100%)'
            : 'linear-gradient(180deg, #f8f8fc 0%, #f0f0f5 100%)',
          display:     'flex',
          alignItems:  'center',
          justifyContent: 'center',
          padding:     '16px',
        }}
      >
        {/* Status bar mockup */}
        <div
          style={{
            position:  'absolute',
            top:       0,
            left:      0,
            right:     0,
            height:    isIos ? '44px' : '32px',
            display:   'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding:   '0 24px',
            opacity:   0.5,
          }}
        >
          {isIos ? (
            <>
              <span style={{ fontSize: '11px', fontWeight: 600, fontFamily: '-apple-system, sans-serif' }}>9:41</span>
              <div style={{ width: '16px', height: '16px', background: 'rgba(0,0,0,0.15)', borderRadius: '50%' }} />
              <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                <div style={{ width: '16px', height: '10px', border: '1px solid rgba(0,0,0,0.3)', borderRadius: '2px', position: 'relative' }}>
                  <div style={{ position: 'absolute', inset: '1px', background: 'rgba(0,0,0,0.3)', borderRadius: '1px', width: '70%' }} />
                </div>
              </div>
            </>
          ) : (
            <>
              <span style={{ fontSize: '10px', fontWeight: 500, fontFamily: '"Roboto", sans-serif' }}>9:41</span>
              <div style={{ display: 'flex', gap: '4px' }}>
                <div style={{ width: '12px', height: '8px', border: '1px solid rgba(0,0,0,0.3)', borderRadius: '1px' }} />
              </div>
            </>
          )}
        </div>

        {/* Content placeholder rows */}
        <div style={{ width: '100%', marginTop: '16px' }}>
          {[80, 60, 70].map((w, i) => (
            <div
              key={i}
              style={{
                height:       '10px',
                width:        `${w}%`,
                background:   'rgba(0,0,0,0.08)',
                borderRadius: '5px',
                marginBottom: '8px',
              }}
            />
          ))}
        </div>
      </div>

      {/* Nav bar */}
      <div style={{ position: 'relative', flexShrink: 0 }}>
        {children}
      </div>

      {/* Home indicator (iOS only) */}
      {isIos && (
        <div
          style={{
            height:          '8px',
            background:      'rgba(244,244,247,0.9)',
            display:         'flex',
            alignItems:      'center',
            justifyContent:  'center',
            paddingBottom:   '4px',
          }}
        >
          <div
            style={{
              width:        '120px',
              height:       '4px',
              background:   'rgba(0,0,0,0.2)',
              borderRadius: '2px',
            }}
          />
        </div>
      )}
    </div>
  );
}

// ── Token table data ──────────────────────────────────────────
const TOKEN_ROWS = [
  // Layout
  { prop: 'Bar height — iOS',           token: '83 px',                          note: '49 px content + 34 px safe-area padding-bottom'      },
  { prop: 'Bar height — Android',       token: '80 px',                          note: 'M3 navigation bar height; no safe-area adjustment'    },
  { prop: 'Bar width',                  token: '100 % / 390 px (iPhone 14)',      note: 'Stretches to device width'                            },
  { prop: 'Tab item width — iOS',       token: '56 px',                          note: 'Equal slots across 4 tabs'                            },
  { prop: 'Tab item padding-top',       token: '7 px (iOS) / 12 px (Android)',   note: 'Space between bar top edge and icon'                  },
  { prop: 'Tab icon size',              token: '--icon-size-medium (24 px)',  note: 'Standard icon size'                                   },
  { prop: 'Tab label size',             token: '10 px (iOS) / 12 px (Android)',  note: 'Platform-appropriate label sizing'                    },
  { prop: 'Tab label gap',              token: '4–6 px',                         note: 'Space between icon and label'                         },
  { prop: 'AI button offset',           token: '−38 px (iOS) / −34 px (Android)',note: 'Distance button floats above bar top edge'            },
  { prop: 'AI button size',             token: '60 × 60 px',                     note: 'Standard AiAssistantButton default size'              },
  // Colour
  { prop: 'Active tab colour',          token: '--text-primary',              note: '#4B286D (TELUS) — adapts to active brand theme'       },
  { prop: 'Inactive tab colour',        token: '--text-neutral',              note: '#54595F — consistent across both platforms'           },
  { prop: 'iOS bar background',         token: 'rgba(244,244,247, 0.85)',        note: 'Translucent frosted glass — matches iOS system tint'  },
  { prop: 'Android bar background',     token: '--background-app',            note: 'Solid white/surface; tonal elevation via shadow'      },
  { prop: 'Android active indicator',   token: '--background-primary-subtle', note: 'Soft primary tint behind active icon — 64 × 32 px pill'},
  // Typography
  { prop: 'iOS font family',            token: '-apple-system, SF Pro Text',     note: 'System font; resolves to SF Pro on iOS'               },
  { prop: 'Android font family',        token: '"Roboto", "Google Sans"',        note: 'Material 3 system font'                               },
  { prop: 'Active label weight — iOS',  token: '600',                            note: 'Semibold for selected state'                          },
  { prop: 'Active label weight — And.', token: '700',                            note: 'Bold for selected state (M3 convention)'              },
  // Shadow
  { prop: 'iOS shadow',                 token: '0 −1 px 0 rgba(0,0,0,0.08)',    note: 'Hairline separator at top of bar'                     },
  { prop: 'Android shadow',             token: '0 −1 px 3 px + 0 −4 px 8 px',  note: 'Two-layer elevation shadow (1dp + 2dp equivalent)'    },
  // Blur
  { prop: 'iOS backdrop blur',          token: '25 px',                          note: 'blur(25px) — matches system nav bar translucency'     },
  { prop: 'Border radius — active pill',token: '--radius-full',               note: 'Android only — pill indicator behind active icon'     },
];

// ── Accessibility row data ────────────────────────────────────
const A11Y_ROWS = [
  {
    label: 'Touch target',
    text:  'Every tab has a minimum 48 × 48 pt / dp tap area per WCAG 2.5.5. The 56 px iOS tab width and Android full-height column both exceed this threshold.',
  },
  {
    label: 'aria-current="page"',
    text:  'The active tab item receives aria-current="page" so screen readers announce "Home, selected" rather than just "Home".',
  },
  {
    label: 'aria-label on AI button',
    text:  'AiAssistantButton exposes aria-label="AI Assistant" by default. Update to a locale-appropriate string in production.',
  },
  {
    label: 'Keyboard navigation',
    text:  'Each tab is a <button> element — fully keyboard-focusable. Tab key cycles through all items. Active state is visually distinct beyond colour alone (filled icon on iOS, pill indicator on Android).',
  },
  {
    label: 'Color contrast',
    text:  '--text-primary (#4B286D) on rgba(244,244,247) achieves ≥ 4.5:1 WCAG AA. Inactive grey (#54595F) on the same surface achieves ≥ 3:1 for non-text elements.',
  },
  {
    label: 'Motion sensitivity',
    text:  'The AI button wave animation respects prefers-reduced-motion. Add @media (prefers-reduced-motion: reduce) to AiAssistantButton.module.css to pause keyframe animations.',
  },
  {
    label: 'Safe area (iOS)',
    text:  'The 34 px padding-bottom accommodates the Home Indicator on iPhone X and later. Do not place tappable elements in this region — the iOS system gesture area overlaps it.',
  },
];

// ── Page ──────────────────────────────────────────────────────

export function AppNavPage() {
  const { brandFont, brandName } = useTheme();

  // Playground state
  const [playVariant,  setPlayVariant]  = useState<AppNavVariant>('standard');
  const [playPlatform, setPlayPlatform] = useState<AppNavPlatform>('ios');
  const [playDevice,   setPlayDevice]   = useState<DeviceId>('iphone14');
  const [playTab,      setPlayTab]      = useState('home');
  const [activeTab,    setActiveTab]    = useState<'preview' | 'code'>('preview');

  const { copied, copy } = useCopy();

  // Derived width from selected device
  const deviceWidth = getDeviceWidth(playDevice);

  const snippet = [
    `import { AppNav } from '@cds/components';`,
    ``,
    `<AppNav`,
    playVariant  !== 'standard' ? `  variant="${playVariant}"` : null,
    playPlatform !== 'ios'      ? `  platform="${playPlatform}"` : null,
    `  activeTab="${playTab}"`,
    `  onTabChange={setActiveTab}`,
    `/>`,
  ].filter(l => l !== null).join('\n');

  return (
    <div>

      {/* ── Header ──────────────────────────────────────────── */}
      <div className="flex items-start justify-between mb-12">
        <div>
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
            Components
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4" style={{ fontFamily: brandFont }}>
            App Navigation
          </h1>
          <p className="text-base text-gray-600 leading-relaxed max-w-2xl">
            The bottom navigation bar provides persistent, one-tap access to the top-level
            sections of {brandName} SmartHome+. Available in two variants — standard (4 equal
            tabs) and AI (2 + AI + 2 with a floating{' '}
            <code className="font-mono text-sm bg-gray-100 px-1.5 py-0.5 rounded">AiAssistantButton</code>
            {' '}at center) — and two platform renders:{' '}
            <strong>iOS</strong> (HIG-compliant frosted glass tab bar) and{' '}
            <strong>Android</strong> (Material 3 navigation bar with active indicator pill).
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
          Toggle variant and platform to preview all four combinations inside a device frame.
          Switch to <code className="font-mono">code</code> to copy the corresponding JSX.
        </p>
        <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden">

          {/* Controls */}
          <div className="px-6 py-5 border-b border-gray-100 bg-gray-50 flex flex-wrap gap-6 items-start">
            <PillSelector
              label="Variant"
              value={playVariant}
              onChange={setPlayVariant}
              options={[
                { value: 'standard', label: 'Standard' },
                { value: 'ai',       label: 'With AI Assistant' },
              ]}
            />
            <PillSelector
              label="Platform"
              value={playPlatform}
              onChange={(v) => {
                setPlayPlatform(v);
                setPlayDevice(DEFAULT_DEVICE[v]);
              }}
              options={[
                { value: 'ios',     label: 'iOS' },
                { value: 'android', label: 'Android' },
              ]}
            />
            <PillSelector
              label="Active Tab"
              value={playTab as 'home' | 'services' | 'manage' | 'settings'}
              onChange={setPlayTab}
              options={[
                { value: 'home',     label: 'Home'     },
                { value: 'services', label: 'Services' },
                { value: 'manage',   label: 'Manage'   },
                { value: 'settings', label: 'Settings' },
              ]}
            />
            <DeviceSizeSelector
              platform={playPlatform}
              value={playDevice}
              onChange={setPlayDevice}
            />
          </div>

          {/* Preview / Code */}
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
              className="px-12 py-12 flex items-center justify-center min-h-64"
              style={{ backgroundColor: '#f9fafb' }}
            >
              <PhoneFrame platform={playPlatform} hasAi={playVariant === 'ai'} width={deviceWidth}>
                <AppNav
                  variant={playVariant}
                  platform={playPlatform}
                  activeTab={playTab as 'home' | 'services' | 'manage' | 'settings'}
                  onTabChange={setPlayTab}
                  width={deviceWidth}
                />
              </PhoneFrame>
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

      {/* ── Platform Variants ────────────────────────────────── */}
      <div className="mb-20">
        <h2 className="text-2xl font-semibold mb-2 text-gray-900">Platform variants</h2>
        <p className="text-sm text-gray-500 mb-6 leading-relaxed">
          The same component tree renders both platforms. Token values and structural details
          (blur, shadow, active indicator, font) swap automatically via the{' '}
          <code className="font-mono">platform</code> prop.
        </p>

        {/* 2×2 grid: platform × variant */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {(
            [
              { platform: 'ios',     variant: 'standard', label: 'iOS — Standard',       desc: 'HIG tab bar. Frosted glass, SF Pro labels, active icon fill.' },
              { platform: 'ios',     variant: 'ai',       label: 'iOS — AI Variant',      desc: 'AI button floats 38 px above center. Left/right tab groups flanked.' },
              { platform: 'android', variant: 'standard', label: 'Android — Standard',    desc: 'M3 navigation bar. Solid surface, active indicator pill.' },
              { platform: 'android', variant: 'ai',       label: 'Android — AI Variant',  desc: 'AI button floats 34 px above center. Pill indicator maintained on flanking tabs.' },
            ] as { platform: AppNavPlatform; variant: AppNavVariant; label: string; desc: string }[]
          ).map(({ platform, variant, label, desc }) => (
            <div key={`${platform}-${variant}`} className="bg-white border border-gray-200 rounded-3xl overflow-visible">
              <div
                className="flex items-center justify-center py-10"
                style={{ backgroundColor: '#f9fafb', borderRadius: '24px 24px 0 0', overflow: 'visible', paddingTop: variant === 'ai' ? '52px' : '24px' }}
              >
                <div style={{ position: 'relative', overflow: 'visible' }}>
                  <AppNav
                    variant={variant}
                    platform={platform}
                    activeTab="home"
                  />
                </div>
              </div>
              <div className="px-6 py-4 border-t border-gray-100">
                <p className="text-sm font-semibold text-gray-900 mb-1">{label}</p>
                <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── States ──────────────────────────────────────────── */}
      <div className="mb-20">
        <h2 className="text-2xl font-semibold mb-2 text-gray-900">States</h2>
        <p className="text-sm text-gray-500 mb-6 leading-relaxed">
          Each tab item has three visual states. The AI button carries its own
          independent state system (see{' '}
          <code className="font-mono">AiAssistantButton</code> docs).
        </p>
        <div className="flex flex-col gap-3">
          {[
            {
              label: 'Active',
              desc:  'The currently selected destination. iOS: filled icon + --text-primary label + semibold weight. Android: same colour + bold label + active indicator pill.',
              activeTab: 'home',
            },
            {
              label: 'Inactive',
              desc:  'All non-selected tabs. Both platforms: --text-neutral icon and label, regular weight, no indicator.',
              activeTab: 'services',
            },
            {
              label: 'Pressed',
              desc:  'Transient :active feedback. Opacity 0.6 on the tapped item. Haptic feedback (Light Impact on iOS, EFFECT_CLICK on Android) recommended.',
              activeTab: 'manage',
            },
          ].map(({ label, desc, activeTab: at }) => (
            <div key={label} className="flex items-center gap-6 bg-white border border-gray-200 rounded-2xl px-6 py-5">
              <div className="w-28 flex-shrink-0">
                <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
                  {label}
                </div>
              </div>
              <div className="flex-shrink-0 overflow-visible" style={{ paddingTop: '4px' }}>
                <AppNav
                  variant="standard"
                  platform="ios"
                  activeTab={at as 'home' | 'services' | 'manage' | 'settings'}
                />
              </div>
              <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Anatomy ─────────────────────────────────────────── */}
      <div className="mb-20">
        <h2 className="text-2xl font-semibold mb-2 text-gray-900">Anatomy</h2>
        <p className="text-sm text-gray-500 mb-6 leading-relaxed">
          Six structural parts compose the navigation bar. Parts 5 and 6 are present only
          in the AI variant.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            {
              n: '1',
              title: 'Bar container',
              desc:  'Full-width surface. iOS: translucent frosted glass (backdrop-blur 25 px + rgba(244,244,247,0.85)). Android: solid --background-app with tonal box-shadow elevation.',
            },
            {
              n: '2',
              title: 'Tab item',
              desc:  'Icon + label column. 4 items in standard variant; 2+2 flanking the AI slot in AI variant. Minimum 48 × 48 pt touch target.',
            },
            {
              n: '3',
              title: 'Tab icon',
              desc:  '--icon-size-medium (24 px). Solid style when active, Line style when inactive — both sourced from the icon manifest (icon-manifest.json). Colour switches between --text-primary (active) and --text-neutral (inactive) via currentColor.',
            },
            {
              n: '4',
              title: 'Tab label',
              desc:  '10 px SF Pro (iOS) / 12 px Roboto (Android). Active: semibold/bold + primary colour. Inactive: regular + --text-neutral.',
            },
            {
              n: '5',
              title: 'Active indicator (Android)',
              desc:  '64 × 32 px pill. --background-primary-subtle fill. --radius-full. Transitions 180 ms ease-out on tab change. iOS omits this element.',
            },
            {
              n: '6',
              title: 'AI Assistant button',
              desc:  'AiAssistantButton subcomponent. Floats 38 px (iOS) / 34 px (Android) above the bar top edge at center. 60 × 60 px default size.',
            },
          ].map(({ n, title, desc }) => (
            <div key={n} className="bg-white border border-gray-200 rounded-2xl px-5 py-4 flex items-start gap-3">
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

      {/* ── Icons ───────────────────────────────────────────── */}
      <div className="mb-20">
        <h2 className="text-2xl font-semibold mb-2 text-gray-900">Icons</h2>
        <p className="text-sm text-gray-500 mb-6 leading-relaxed">
          All four tab icons are sourced directly from the CDS icon library (
          <code className="font-mono">icon-manifest.json</code>). The{' '}
          <strong>Line</strong> variant is used for inactive tabs; the{' '}
          <strong>Solid</strong> variant is used for the active tab. Both are rendered
          as inline SVG with <code className="font-mono">fill="currentColor"</code>{' '}
          so colour is controlled entirely by the{' '}
          <code className="font-mono">color</code> CSS property — no hardcoded fills.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { tab: 'Home',     lineKey: 'homeHouse/Line',          solidKey: 'homeHouse/Solid'          },
            { tab: 'Services', lineKey: 'abstractActivity/Line',    solidKey: 'abstractActivity/Solid'   },
            { tab: 'Manage',   lineKey: 'homeDeviceGroup/Line',     solidKey: 'homeDeviceGroup/Solid'    },
            { tab: 'Settings', lineKey: 'objectGear/Line',          solidKey: 'objectGear/Solid'         },
          ].map(({ tab, lineKey, solidKey }) => {
            const lineEntry  = (iconManifest as Record<string, { svg: string }>)[lineKey];
            const solidEntry = (iconManifest as Record<string, { svg: string }>)[solidKey];
            return (
              <div key={tab} className="bg-white border border-gray-200 rounded-2xl p-5">
                <p className="text-sm font-semibold text-gray-900 mb-4">{tab}</p>
                <div className="flex items-start gap-4">
                  {/* Line (inactive) */}
                  <div className="flex flex-col items-center gap-2 flex-1">
                    <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-50 border border-gray-100">
                      <span
                        style={{ color: '#54595F', display: 'flex' }}
                        dangerouslySetInnerHTML={{ __html: lineEntry?.svg ?? '' }}
                      />
                    </div>
                    <span className="text-[10px] text-gray-400 text-center leading-tight">Line<br/>(inactive)</span>
                    <code className="text-[9px] text-gray-400 font-mono text-center break-all">{lineKey}</code>
                  </div>
                  {/* Solid (active) */}
                  <div className="flex flex-col items-center gap-2 flex-1">
                    <div
                      className="w-10 h-10 flex items-center justify-center rounded-xl border"
                      style={{ backgroundColor: 'var(--background-primary-subtle, #EDE1F5)', borderColor: 'var(--background-primary-subtle, #EDE1F5)' }}
                    >
                      <span
                        style={{ color: 'var(--text-primary, #4B286D)', display: 'flex' }}
                        dangerouslySetInnerHTML={{ __html: solidEntry?.svg ?? '' }}
                      />
                    </div>
                    <span className="text-[10px] text-gray-400 text-center leading-tight">Solid<br/>(active)</span>
                    <code className="text-[9px] text-gray-400 font-mono text-center break-all">{solidKey}</code>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Platform Guidelines ──────────────────────────────── */}
      <div className="mb-20">
        <h2 className="text-2xl font-semibold mb-2 text-gray-900">Platform guidelines</h2>
        <p className="text-sm text-gray-500 mb-6 leading-relaxed">
          This component follows Apple Human Interface Guidelines (HIG) for iOS and
          Material Design 3 for Android. Key differences are called out below.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          {/* iOS HIG */}
          <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden">
            <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100 bg-gray-50">
              {/* Apple icon */}
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="flex-shrink-0">
                <path d="M13.3 9.6c0-2.1 1.7-3.1 1.8-3.2-1-1.5-2.5-1.7-3.1-1.7-1.3-.1-2.6.8-3.2.8-.7 0-1.7-.8-2.8-.7-1.4.1-2.7.8-3.4 2.1-1.5 2.5-.4 6.3 1 8.3.7 1 1.5 2.1 2.6 2 1 0 1.4-.7 2.7-.7s1.6.7 2.7.7c1.1 0 1.8-1 2.5-2 .8-1.1 1.1-2.2 1.1-2.3-.1 0-2-.8-2.1-3.3zm-2-6.1c.5-.7.9-1.7.8-2.6-.8 0-1.7.5-2.3 1.2-.5.6-.9 1.6-.8 2.5.9.1 1.8-.4 2.3-1.1z" fill="#555"/>
              </svg>
              <span className="text-sm font-semibold text-gray-900">iOS — Apple HIG</span>
            </div>
            <ul className="divide-y divide-gray-100">
              {[
                { rule: 'Tab count',       detail: 'Use 3–5 tabs (HIG max 5). Our standard uses 4; AI variant maintains visual balance with 2+AI+2.' },
                { rule: 'Always visible',  detail: 'The tab bar must remain visible at all times. Do not hide it during scroll. Only hide during immersive full-screen content.' },
                { rule: 'Frosted glass',   detail: 'Match system translucency (backdrop-blur 25 px, rgba bg). Do not use an opaque background — it breaks the iOS visual language.' },
                { rule: 'Safe area',       detail: '34 px padding-bottom accommodates the Home Indicator on iPhone X+. Never place tap targets in this region.' },
                { rule: 'Label behaviour', detail: 'Always show labels — HIG requires labels under icons in tab bars. Do not show labels only on active tab (that is the macOS sidebar pattern).' },
                { rule: 'Icon fill',       detail: 'Active tabs use filled icon variants. Inactive tabs use outlined icons. Both icon styles must be visually distinct.' },
                { rule: 'Haptic feedback', detail: 'Trigger UIImpactFeedbackGenerator with .light on every tab switch, and .medium when entering the AI listening state.' },
              ].map(({ rule, detail }) => (
                <li key={rule} className="px-6 py-3">
                  <span className="text-xs font-semibold text-gray-700 mr-2">{rule}:</span>
                  <span className="text-xs text-gray-500">{detail}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Android Material 3 */}
          <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden">
            <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100 bg-gray-50">
              {/* Android icon */}
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="flex-shrink-0">
                <path d="M2.5 6.5h13a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H14v2a1 1 0 0 1-2 0v-2H6v2a1 1 0 0 1-2 0v-2h-.5a1 1 0 0 1-1-1v-5a1 1 0 0 1 1-1zM6 2.5L4.5 1m9 1.5L12 1M5.5 6.5V5a3.5 3.5 0 0 1 7 0v1.5" stroke="#3DDC84" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
              <span className="text-sm font-semibold text-gray-900">Android — Material 3</span>
            </div>
            <ul className="divide-y divide-gray-100">
              {[
                { rule: 'Component name',  detail: 'This maps to the M3 "Navigation Bar" component (not Bottom Navigation from M2). Use NavigationBar + NavigationBarItem in Compose.' },
                { rule: 'Active indicator', detail: 'The 64 × 32 dp pill indicator is mandatory in M3. It communicates selection independent of colour — critical for accessibility.' },
                { rule: 'Label behaviour', detail: 'M3 recommends always showing labels (not hiding inactive labels as M2 allowed). Our implementation keeps all labels always visible.' },
                { rule: 'Solid surface',   detail: 'Unlike iOS, Android nav bar uses a solid surface-level background. Tonal elevation (slight tint) is acceptable in dark mode.' },
                { rule: 'Gesture bar',     detail: 'On gesture-navigation Android, the system gesture bar (32 dp) is transparent. The nav bar should use windowInsets to pad bottom accordingly.' },
                { rule: 'Touch target',    detail: 'M3 recommends 48 dp minimum. The full-height column layout (80 dp bar ÷ columns) satisfies this vertically; 64 dp pill satisfies it horizontally.' },
                { rule: 'Ripple effect',   detail: 'Add a Material ripple (bounded, primary colour, 40 % opacity) on press for Android-native feel. The current CSS implementation uses opacity reduction as a web fallback.' },
              ].map(({ rule, detail }) => (
                <li key={rule} className="px-6 py-3">
                  <span className="text-xs font-semibold text-gray-700 mr-2">{rule}:</span>
                  <span className="text-xs text-gray-500">{detail}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ── When to use ─────────────────────────────────────── */}
      <div className="mb-20">
        <h2 className="text-2xl font-semibold mb-2 text-gray-900">When to use</h2>
        <p className="text-sm text-gray-500 mb-6 leading-relaxed">
          Bottom navigation is a top-level navigation pattern. It is not appropriate for
          secondary or in-page navigation.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white border border-gray-200 rounded-3xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500 flex-shrink-0" />
              <span className="text-sm font-semibold text-green-700">Use when</span>
            </div>
            <ul className="space-y-3">
              {[
                'The app has 3–5 top-level destinations of equal importance.',
                'Users need to switch frequently between sections without losing state.',
                'The destination count is stable — destinations do not change based on context.',
                'Using the AI variant when the AI Assistant is a first-class feature of the app.',
                'Building for iOS or Android native apps (use web-native tab patterns on desktop).',
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
          <div className="bg-white border border-gray-200 rounded-3xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 flex-shrink-0" />
              <span className="text-sm font-semibold text-red-700">Don't use when</span>
            </div>
            <ul className="space-y-3">
              {[
                'The app has fewer than 3 or more than 5 top-level destinations.',
                'For secondary navigation — use tabs (UITabBar sub-view) or a segmented control.',
                'On desktop or tablet layouts — use a sidebar or top navigation instead.',
                'When destinations change dynamically based on user role or context.',
                'For single-screen utilities where navigation provides no value.',
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
          Critical guidelines for correct usage across both platforms.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          {/* Do 1 */}
          <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden">
            <div className="flex items-center gap-2 px-6 py-4 border-b border-gray-100">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-sm font-semibold text-green-700">Do — Keep labels always visible</span>
            </div>
            <div className="px-6 py-6 flex items-start gap-4">
              <div className="flex-shrink-0 overflow-visible" style={{ paddingTop: '2px' }}>
                <AppNav variant="standard" platform="ios" activeTab="home" />
              </div>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed px-6 pb-6">
              Both HIG and M3 require labels to be always visible. Never hide inactive labels —
              users rely on them to understand destinations at a glance.
            </p>
          </div>

          {/* Don't 1 */}
          <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden">
            <div className="flex items-center gap-2 px-6 py-4 border-b border-gray-100">
              <span className="w-2 h-2 rounded-full bg-red-500" />
              <span className="text-sm font-semibold text-red-700">Don't — Mix platform styles</span>
            </div>
            <div className="px-6 py-6 flex items-start gap-4">
              {/* Mixed: android indicator on ios-style bar */}
              <div style={{ width: '390px', height: '49px', backgroundColor: 'rgba(244,244,247,0.85)', backdropFilter: 'blur(25px)', display: 'flex', justifyContent: 'space-around', alignItems: 'center', boxShadow: '0 -1px 0 rgba(0,0,0,0.08)' }}>
                {['Home','Services','Manage','Settings'].map((l, i) => (
                  <div key={l} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
                    {/* Wrong: Android pill on iOS bar */}
                    {i === 0 && (
                      <div style={{ width: '64px', height: '28px', borderRadius: '999px', backgroundColor: 'rgba(75,40,109,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ width: '20px', height: '20px', background: '#4B286D', borderRadius: '3px', opacity: 0.7 }} />
                      </div>
                    )}
                    {i !== 0 && <div style={{ width: '20px', height: '20px', background: '#54595F', borderRadius: '3px', opacity: 0.4 }} />}
                    <span style={{ fontSize: '9px', color: i === 0 ? '#4B286D' : '#54595F' }}>{l}</span>
                  </div>
                ))}
              </div>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed px-6 pb-6">
              Do not apply Android active indicator pills on the iOS bar (or iOS frosted glass
              on Android). The <code className="font-mono text-[10px]">platform</code> prop
              manages this automatically — never override individual sub-styles.
            </p>
          </div>

          {/* Do 2 */}
          <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden">
            <div className="flex items-center gap-2 px-6 py-4 border-b border-gray-100">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-sm font-semibold text-green-700">Do — Use AI variant with 4-tab slots only</span>
            </div>
            <div className="px-6 py-6 flex items-start gap-4 overflow-visible" style={{ paddingTop: '48px' }}>
              <div style={{ overflow: 'visible', position: 'relative' }}>
                <AppNav variant="ai" platform="android" activeTab="home" />
              </div>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed px-6 pb-6">
              The AI variant always uses a fixed 2+AI+2 layout. Do not reduce to fewer tabs or
              attempt to add a fifth tab — the center AI slot is not a regular navigation destination.
            </p>
          </div>

          {/* Don't 2 */}
          <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden">
            <div className="flex items-center gap-2 px-6 py-4 border-b border-gray-100">
              <span className="w-2 h-2 rounded-full bg-red-500" />
              <span className="text-sm font-semibold text-red-700">Don't — Use text instead of icons</span>
            </div>
            <div className="px-6 py-6">
              {/* Text-only mockup */}
              <div style={{ width: '390px', height: '49px', backgroundColor: 'rgba(244,244,247,0.85)', display: 'flex', justifyContent: 'space-around', alignItems: 'center', boxShadow: '0 -1px 0 rgba(0,0,0,0.08)' }}>
                {[['Home', true],['Services', false],['Manage', false],['Settings', false]].map(([l, a]) => (
                  <span key={String(l)} style={{ fontSize: '11px', fontWeight: a ? 700 : 400, color: a ? '#4B286D' : '#54595F' }}>{l}</span>
                ))}
              </div>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed px-6 pb-6">
              Never replace icons with text-only items. HIG and M3 both require icons in
              bottom navigation. Text-only items fail recognition speed tests and break the
              48 × 48 pt touch target minimum on small labels.
            </p>
          </div>

        </div>
      </div>

      {/* ── Design tokens ────────────────────────────────────── */}
      <div className="mb-20">
        <h2 className="text-2xl font-semibold mb-2 text-gray-900">Design tokens</h2>
        <p className="text-sm text-gray-500 mb-6 leading-relaxed">
          All dimensions, colours, and typography values are listed below. Tokens adapt automatically to the active brand theme.
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
            {A11Y_ROWS.map((item, i, arr) => (
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

export default AppNavPage;