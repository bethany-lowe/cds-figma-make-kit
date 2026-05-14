/**
 * TabNavPage
 *
 * Component documentation for the Tab Navigation bar.
 * Playground → States → Compositions → Anatomy →
 * Props → Design Tokens → Usage → Do & Don't → Accessibility
 */

import { useState } from 'react';
import { TabNav } from './ui/TabNav';
import type { TabItem } from './ui/TabNav';
import { useTheme } from '../contexts/ThemeContext';
import {
  useCopy,
  PageHeader,
  SectionHeader,
  Divider,
  Callout,
  DoCard,
  DontCard,
  DoDontGrid,
  TokenTable,
  PropsTable,
  A11yList,
  A11yAudit,
  PillSelector,
  CodeBlock,
  type TokenRow,
  type PropRow,
  type A11yAuditItem,
} from './docs/DocAnnotations';

// ── Large Do / Don't rule card ─────────────────────────────────

function RuleCard({
  type,
  label,
  description,
  children,
}: {
  type:        'do' | 'dont';
  label:       string;
  description: string;
  children:    React.ReactNode;
}) {
  const isDo = type === 'do';
  return (
    <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden flex flex-col">
      {/* Colour-coded title strip */}
      <div className="flex items-center gap-2 px-6 py-4 border-b border-gray-100">
        <span className={`w-2 h-2 rounded-full flex-shrink-0 ${isDo ? 'bg-green-500' : 'bg-red-500'}`} />
        <span className={`text-sm font-semibold ${isDo ? 'text-green-700' : 'text-red-700'}`}>
          {isDo ? 'Do' : "Don't"} — {label}
        </span>
      </div>

      {/* Large preview canvas */}
      <div className="bg-gray-50 border-b border-gray-100 flex-1 p-6 flex flex-col justify-center" style={{ minHeight: 220 }}>
        {children}
      </div>

      {/* Description footer */}
      <div className="px-6 py-4">
        <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

// ── Skeleton helpers for preview canvases ──────────────────────

function SkeletonLine({ width = '100%', className = '' }: { width?: string; className?: string }) {
  return (
    <div
      className={`rounded-full bg-gray-200 ${className}`}
      style={{ height: 8, width }}
    />
  );
}

function SkeletonBlock({ height = 56, className = '' }: { height?: number; className?: string }) {
  return (
    <div
      className={`rounded-xl bg-gray-100 ${className}`}
      style={{ height }}
    />
  );
}

function MiniCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm w-full">
      {children}
    </div>
  );
}

// ── Content placeholder — mimics a content area below tabs ─────

function ContentPlaceholder() {
  return (
    <div style={{ padding: '20px 0 8px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
        <div style={{
          width: '28px', height: '28px', borderRadius: '6px',
          backgroundColor: 'var(--background-primary-subtle, #EDE1F5)',
          flexShrink: 0,
        }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
          <div style={{ height: '10px', borderRadius: '4px', backgroundColor: 'var(--background-neutral-subtle, rgba(0,0,0,0.07))', width: '55%' }} />
          <div style={{ height: '8px',  borderRadius: '4px', backgroundColor: 'var(--background-neutral-subtle, rgba(0,0,0,0.05))', width: '35%' }} />
        </div>
      </div>
      {[80, 60, 90, 50].map((w, i) => (
        <div key={i} style={{ height: '9px', borderRadius: '4px', backgroundColor: 'var(--background-neutral-subtle, rgba(0,0,0,0.06))', width: `${w}%` }} />
      ))}
      <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
        {[1, 2].map(i => (
          <div key={i} style={{ flex: 1, height: '56px', borderRadius: '10px', backgroundColor: 'var(--background-neutral-subtle, rgba(0,0,0,0.05))' }} />
        ))}
      </div>
      <div style={{ height: '9px', borderRadius: '4px', backgroundColor: 'var(--background-neutral-subtle, rgba(0,0,0,0.04))', width: '40%' }} />
    </div>
  );
}

// ── Composition preview card ────────────────────────────────────

function CompositionCard({ label, description, tabs, defaultActive }: {
  label:         string;
  description:   string;
  tabs:          TabItem[];
  defaultActive: string;
}) {
  const [active, setActive] = useState(defaultActive);
  return (
    <div style={{ backgroundColor: '#ffffff', borderRadius: '24px', border: '1px solid rgba(0,0,0,0.06)', overflow: 'hidden' }}>
      <div style={{ padding: '20px 24px 0' }}>
        <TabNav tabs={tabs} activeTab={active} onTabChange={setActive} />
        <ContentPlaceholder />
      </div>
      <div style={{ padding: '14px 20px', borderTop: '1px solid rgba(0,0,0,0.05)', backgroundColor: '#FAFAFA' }}>
        <p style={{ fontSize: '13px', fontWeight: 600, color: '#111', marginBottom: '2px' }}>{label}</p>
        <p style={{ fontSize: '12px', color: '#54595F' }}>{description}</p>
      </div>
    </div>
  );
}

// ── Static data ────────────────────────────────────────────────

const TAB_PRESETS: Record<number, TabItem[]> = {
  2: [
    { id: 'overview', label: 'Overview' },
    { id: 'details',  label: 'Details'  },
  ],
  3: [
    { id: 'home',     label: 'Home'     },
    { id: 'messages', label: 'Messages' },
    { id: 'settings', label: 'Settings' },
  ],
  4: [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'analytics', label: 'Analytics' },
    { id: 'reports',   label: 'Reports'   },
    { id: 'settings',  label: 'Settings'  },
  ],
  5: [
    { id: 'feed',     label: 'Feed'     },
    { id: 'explore',  label: 'Explore'  },
    { id: 'messages', label: 'Messages' },
    { id: 'activity', label: 'Activity' },
    { id: 'profile',  label: 'Profile'  },
  ],
};

const TOKEN_ROWS: TokenRow[] = [
  { prop: 'Active tab text',           token: '--text-primary',              note: '#4B286D — label + underline indicator'    },
  { prop: 'Inactive tab text',         token: '--text-neutral',              note: '#54595F — resting label colour'           },
  { prop: 'Underline indicator fill',  token: '--text-primary',              note: '18 × 2 px pill, left-anchored'            },
  { prop: 'Active badge background',   token: '--text-primary',              note: 'Filled pill; count in white text'         },
  { prop: 'Active badge text',         token: '--background-primary-inverse',note: 'White text on primary fill'               },
  { prop: 'Inactive badge background', token: '--background-neutral-subtle', note: 'Subtle tint; count in neutral text'       },
  { prop: 'Inactive badge text',       token: '--text-neutral',              note: 'Matches inactive label colour'            },
  { prop: 'Tab height',                token: '46px',                        note: 'Content-driven width; fixed height'       },
  { prop: 'Gap between tabs',          token: '24px',                        note: 'Inline gap on the flex container'         },
  { prop: 'Label font size',           token: '15px',                        note: 'Semibold (600) / −0.4 px letter-spacing' },
  { prop: 'Underline animation',       token: '180ms ease-out',             note: 'Motion layoutId slide between tabs'       },
];

const TABNAV_PROP_ROWS: PropRow[] = [
  { name: 'tabs',        type: 'TabItem[]',      required: true,  description: 'Array of tab objects. Each item must have a unique id and a label string. An optional badge number may be provided.' },
  { name: 'activeTab',   type: 'string',          default: '—',    description: 'The id of the currently active tab. Controls which tab shows the underline indicator and aria-selected="true".'     },
  { name: 'onTabChange', type: '(id: string) => void', default: '—', description: 'Callback invoked when the user clicks a tab or presses an arrow key. Receives the tab id.'                   },
  { name: 'className',   type: 'string',          default: "''",   description: 'Additional CSS class applied to the tab group container.'                                                         },
];

const TABITEM_PROP_ROWS: PropRow[] = [
  { name: 'id',    type: 'string', required: true, description: 'Unique identifier for the tab. Used as the value passed to activeTab and onTabChange.'         },
  { name: 'label', type: 'string', required: true, description: 'Visible text label for the tab item.'                                                          },
  { name: 'badge', type: 'number', default: '—',   description: 'Optional count shown as a small pill after the label (e.g. unread messages). Pass 0 to hide.' },
];

const A11Y_AUDIT_ITEMS: A11yAuditItem[] = [
  { criterion: '1.4.3 Contrast (Minimum)',   level: 'AA',  note: '--text-primary (#4B286D) and --text-neutral (#54595F) both exceed 4.5:1 on white.',         status: 'pass' },
  { criterion: '2.1.1 Keyboard',             level: 'A',   note: 'Arrow keys navigate between tabs; Enter/Space activate the focused tab.',                   status: 'pass' },
  { criterion: '2.4.7 Focus Visible',        level: 'AA',  note: 'Focus ring rendered on :focus-visible for all tab buttons.',                               status: 'pass' },
  { criterion: '4.1.2 Name, Role, Value',    level: 'A',   note: 'role=tablist on container; role=tab + aria-selected on each button.',                      status: 'pass' },
  { criterion: '2.5.5 Target Size',          level: 'AAA', note: '46 px tab height exceeds the 44 × 44 px recommended touch target minimum.',               status: 'pass' },
  { criterion: '1.4.11 Non-text Contrast',   level: 'AA',  note: 'Underline indicator (#4B286D) against white background achieves > 3:1 contrast ratio.',    status: 'pass' },
];

// ── Page ──────────────────────────────────────────────────────

export function TabNavPage() {
  const { } = useTheme();
  const { copied, copy } = useCopy();

  const [tabCount,    setTabCount]    = useState<2 | 3 | 4 | 5>(3);
  const [playActive,  setPlayActive]  = useState('home');
  const [previewTab,  setPreviewTab]  = useState<'preview' | 'code'>('preview');

  const playTabs   = TAB_PRESETS[tabCount];
  const safeActive = playTabs.find(t => t.id === playActive) ? playActive : playTabs[0].id;

  const handleTabCount = (n: '2' | '3' | '4' | '5') => {
    const count = Number(n) as 2 | 3 | 4 | 5;
    setTabCount(count);
    setPlayActive(TAB_PRESETS[count][0].id);
  };

  const codeSnippet = `import { TabNav } from '@cds/components';

const tabs = [
${playTabs.map(t => `  { id: '${t.id}', label: '${t.label}' },`).join('\n')}
];

export function MyScreen() {
  const [activeTab, setActiveTab] = useState('${playTabs[0].id}');

  return (
    <TabNav
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
    />
  );
}`;

  return (
    <div className="max-w-4xl">

      {/* ── Page header ───────────────────────────────────────── */}
      <PageHeader
        category="Navigation"
        title="Tab Navigation"
        description="Horizontal navigation between peer content sections within a single screen. Displays a row of labeled tabs with an animated underline indicator on the active tab. Used as a building block for Primary Navigation within the app."
        badges={['beta']}
      />

      {/* ── Playground ────────────────────────────────────────── */}
      <div className="mb-4">
        <SectionHeader
          title="Playground"
          description="Interact with the component and adjust its properties to explore behaviour."
        />
      </div>

      <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden mb-20">
        {/* Preview / Code tab strip */}
        <div className="flex border-b border-gray-100">
          {(['preview', 'code'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setPreviewTab(tab)}
              className={`py-3 px-5 text-sm font-medium capitalize transition-colors relative ${
                previewTab === tab ? 'text-gray-900' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
              {previewTab === tab && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900" />
              )}
            </button>
          ))}
        </div>

        {/* Controls */}
        <div className="px-6 py-5 border-b border-gray-100 bg-gray-50 flex flex-wrap gap-6 items-start">
          <PillSelector
            label="Number of tabs"
            value={String(tabCount) as '2' | '3' | '4' | '5'}
            onChange={handleTabCount}
            options={[
              { value: '2', label: '2 tabs' },
              { value: '3', label: '3 tabs' },
              { value: '4', label: '4 tabs' },
              { value: '5', label: '5 tabs' },
            ]}
          />
          <div>
            <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Active tab
            </div>
            <div className="flex flex-wrap gap-1.5">
              {playTabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setPlayActive(tab.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    safeActive === tab.id
                      ? 'bg-gray-900 text-white'
                      : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Preview / Code body */}
        {previewTab === 'preview' ? (
          <div className="px-10 py-10 flex items-start justify-center bg-gray-50" style={{ minHeight: '200px' }}>
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              padding: '24px 28px 20px',
              boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
              width: '100%',
              maxWidth: '420px',
            }}>
              <TabNav
                tabs={playTabs}
                activeTab={safeActive}
                onTabChange={setPlayActive}
              />
              <ContentPlaceholder />
            </div>
          </div>
        ) : (
          <CodeBlock code={codeSnippet} language="tsx" />
        )}
      </div>

      {/* ── States ────────────────────────────────────────────── */}
      <Divider />
      <SectionHeader
        title="States"
        description="Tab items have two visual states. Only one tab is active at a time."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-16">
        <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden">
          <div style={{ padding: '28px 24px 24px' }}>
            <TabNav
              tabs={[{ id: 'tab', label: 'Overview' }]}
              activeTab="tab"
              onTabChange={() => {}}
            />
          </div>
          <div style={{ padding: '14px 20px', borderTop: '1px solid rgba(0,0,0,0.05)', backgroundColor: '#FAFAFA' }}>
            <p style={{ fontSize: '13px', fontWeight: 600, color: '#111', marginBottom: '2px' }}>Active</p>
            <p style={{ fontSize: '12px', color: '#54595F' }}>
              Primary brand text at full opacity with 18 px underline indicator.
            </p>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden">
          <div style={{ padding: '28px 24px 24px' }}>
            <TabNav
              tabs={[{ id: 'tab', label: 'Details' }]}
              activeTab="other"
              onTabChange={() => {}}
            />
          </div>
          <div style={{ padding: '14px 20px', borderTop: '1px solid rgba(0,0,0,0.05)', backgroundColor: '#FAFAFA' }}>
            <p style={{ fontSize: '13px', fontWeight: 600, color: '#111', marginBottom: '2px' }}>Inactive</p>
            <p style={{ fontSize: '12px', color: '#54595F' }}>
              Neutral text colour, no underline. Tappable to become active.
            </p>
          </div>
        </div>
      </div>

      {/* ── Compositions ──────────────────────────────────────── */}
      <Divider />
      <SectionHeader
        title="Compositions"
        description="Common tab group configurations. All are interactive — tap any tab to see the underline animate."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-16">
        <CompositionCard
          label="Two tabs"
          description="Quick switching between two main views."
          tabs={[{ id: 'overview', label: 'Overview' }, { id: 'details', label: 'Details' }]}
          defaultActive="overview"
        />
        <CompositionCard
          label="Three tabs"
          description="Balanced layout for three peer content sections."
          tabs={[{ id: 'home', label: 'Home' }, { id: 'messages', label: 'Messages' }, { id: 'settings', label: 'Settings' }]}
          defaultActive="home"
        />
        <CompositionCard
          label="Four tabs"
          description="Extended set; consider scrolling on narrow viewports."
          tabs={[
            { id: 'dashboard', label: 'Dashboard' },
            { id: 'analytics', label: 'Analytics' },
            { id: 'reports',   label: 'Reports'   },
            { id: 'settings',  label: 'Settings'  },
          ]}
          defaultActive="dashboard"
        />
        <CompositionCard
          label="With badge"
          description="Tab label paired with a trailing count indicator."
          tabs={[{ id: 'inbox', label: 'Inbox', badge: 4 }, { id: 'sent', label: 'Sent' }, { id: 'archive', label: 'Archive' }]}
          defaultActive="inbox"
        />
      </div>

      {/* ── Anatomy ───────────────────────────────────────────── */}
      <Divider />
      <SectionHeader title="Anatomy" description="The labelled parts that make up a Tab Navigation." />
      <div className="bg-white border border-gray-200 rounded-3xl p-10 mb-16">
        <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-end', marginBottom: '36px', paddingBottom: '24px', borderBottom: '1px solid #f0f0f0' }}>
          <TabNav
            tabs={[
              { id: 'a', label: 'Home' },
              { id: 'b', label: 'Messages', badge: 3 },
              { id: 'c', label: 'Settings' },
            ]}
            activeTab="a"
            onTabChange={() => {}}
          />
        </div>
        <div className="grid grid-cols-[auto_1fr] gap-x-8 gap-y-3">
          {[
            ['Tab group',           'Container holding all tabs in a horizontal flex row with a 24 px gap between items. role="tablist".'],
            ['Tab',                 'Individual selectable item. 46 px tall, content-driven width. role="tab" with aria-selected.'],
            ['Tab label',           'Text content identifying the section. 15 px Semibold, −0.4 px letter-spacing.'],
            ['Underline indicator', '2 px × 18 px pill anchored to the leading edge of the active tab label. Slides between tabs with a 180 ms ease-out Motion animation.'],
            ['Badge (optional)',    'Trailing count indicator after the label for surfacing numeric state (e.g. unread messages). Count included in aria-label.'],
          ].map(([part, desc]) => (
            <div key={part} className="contents">
              <span className="text-sm font-semibold text-gray-800 whitespace-nowrap self-start pt-0.5">{part}</span>
              <span className="text-sm text-gray-500 leading-relaxed">{desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Props ─────────────────────────────────────────────── */}
      <Divider />
      <SectionHeader title="Props" description="Public API for the TabNav component." />
      <div className="mb-6">
        <PropsTable rows={TABNAV_PROP_ROWS} />
      </div>

      <div className="mb-16">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">TabItem type</p>
        <PropsTable rows={TABITEM_PROP_ROWS} />
      </div>

      {/* ── Design tokens ─────────────────────────────────────── */}
      <Divider />
      <SectionHeader
        title="Design Tokens"
        description="Every visual value resolves through a brand token and updates automatically when the active theme changes."
      />
      <div className="mb-16">
        <TokenTable rows={TOKEN_ROWS} />
      </div>

      {/* ── Usage ─────────────────────────────────────────────── */}
      <Divider />
      <SectionHeader title="Usage" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <DoCard
          items={[
            'Switching between multiple peer content sections within a single screen.',
            'Flat, non-hierarchical navigation with no sub-levels.',
            '2 – 5 related content categories that benefit from persistent, always-visible navigation.',
            'Sections that are always accessible — not sequential or gated steps.',
          ]}
        />
        <DontCard
          items={[
            'Hierarchical navigation with sub-levels — use a navigation drawer instead.',
            'Navigating to different screens outside the current flow — use App Nav.',
            'Time-based or step-based progression — use a stepper or progress indicator.',
            'Six or more categories — consider a segmented picker or navigation drawer.',
          ]}
        />
      </div>
      <div className="mb-16">
        <Callout variant="tip" title="One tab always active">
          There should always be a selected tab when TabNav is visible. Never render the component with no active
          tab — initialise <code className="text-xs bg-white/50 px-1 py-0.5 rounded">activeTab</code> to the
          first tab's id by default.
        </Callout>
      </div>

      {/* ── Do & Don't ────────────────────────────────────────── */}
      <Divider />
      <SectionHeader title="Do & Don't" />

      {/* Rule 1 — Tab count */}
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Tab count</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <RuleCard
          type="do"
          label="2 – 5 tabs"
          description="Keep the count to 5 or fewer. The underline and labels stay legible, spacing stays comfortable, and every tab remains an easy tap target."
        >
          <MiniCard>
            <TabNav
              tabs={[
                { id: 'overview',  label: 'Overview'  },
                { id: 'details',   label: 'Details'   },
                { id: 'activity',  label: 'Activity'  },
              ]}
              activeTab="overview"
              onTabChange={() => {}}
            />
            <div className="mt-5 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl flex-shrink-0" style={{ backgroundColor: 'var(--background-primary-subtle, #EDE1F5)' }} />
                <div className="flex-1 space-y-2">
                  <SkeletonLine width="65%" />
                  <SkeletonLine width="40%" />
                </div>
              </div>
              <SkeletonLine width="90%" />
              <SkeletonLine width="75%" />
              <SkeletonLine width="82%" />
              <div className="flex gap-2 pt-1">
                <SkeletonBlock height={44} className="flex-1" />
                <SkeletonBlock height={44} className="flex-1" />
              </div>
            </div>
          </MiniCard>
        </RuleCard>

        <RuleCard
          type="dont"
          label="More than 5 tabs"
          description="Six or more tabs crowd the bar, shrink tap targets, and risk label truncation. Use a navigation drawer or segmented picker instead."
        >
          <MiniCard>
            <div className="overflow-hidden">
              <TabNav
                tabs={[
                  { id: 'a', label: 'Home'     },
                  { id: 'b', label: 'Feed'     },
                  { id: 'c', label: 'Explore'  },
                  { id: 'd', label: 'Activity' },
                  { id: 'e', label: 'Messages' },
                  { id: 'f', label: 'Profile'  },
                ]}
                activeTab="a"
                onTabChange={() => {}}
              />
            </div>
            <div className="mt-3 flex items-center gap-2 px-3 py-2 rounded-xl bg-red-50 border border-red-100">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="7" cy="7" r="6.5" stroke="#DC2626" />
                <path d="M7 4v3.5M7 9.5v.5" stroke="#DC2626" strokeWidth="1.25" strokeLinecap="round" />
              </svg>
              <span className="text-xs text-red-600">6 tabs — bar overflows on most devices</span>
            </div>
            <div className="mt-3 space-y-2">
              <SkeletonLine width="80%" />
              <SkeletonLine width="60%" />
            </div>
          </MiniCard>
        </RuleCard>
      </div>

      {/* Rule 2 — Label length */}
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Label length</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <RuleCard
          type="do"
          label="Short, concise labels"
          description="Single words or short phrases keep labels legible and spacing even. The bar works equally well on narrow and wide viewports."
        >
          <MiniCard>
            <TabNav
              tabs={[
                { id: 'a', label: 'Overview' },
                { id: 'b', label: 'Reviews'  },
                { id: 'c', label: 'FAQs'     },
              ]}
              activeTab="b"
              onTabChange={() => {}}
            />
            <div className="mt-5 space-y-3">
              <div className="flex items-center gap-2 mb-1">
                {['★','★','★','★','☆'].map((s, i) => (
                  <span key={i} className="text-sm" style={{ color: i < 4 ? '#F59E0B' : '#D1D5DB' }}>{s}</span>
                ))}
                <span className="text-xs text-gray-400 ml-1">4.0 · 248 reviews</span>
              </div>
              <SkeletonLine width="90%" />
              <SkeletonLine width="78%" />
              <SkeletonLine width="65%" />
              <SkeletonLine width="55%" />
            </div>
          </MiniCard>
        </RuleCard>

        <RuleCard
          type="dont"
          label="Long multi-word labels"
          description="Verbose labels expand each tab's width, reducing the space available for other tabs and increasing the risk of truncation or wrapping."
        >
          <MiniCard>
            <TabNav
              tabs={[
                { id: 'a', label: 'Product Overview'           },
                { id: 'b', label: 'Customer Reviews & Ratings' },
                { id: 'c', label: 'Technical Specifications'   },
              ]}
              activeTab="a"
              onTabChange={() => {}}
            />
            <div className="mt-3 flex items-center gap-2 px-3 py-2 rounded-xl bg-red-50 border border-red-100">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="7" cy="7" r="6.5" stroke="#DC2626" />
                <path d="M7 4v3.5M7 9.5v.5" stroke="#DC2626" strokeWidth="1.25" strokeLinecap="round" />
              </svg>
              <span className="text-xs text-red-600">Labels overflow the bar on small screens</span>
            </div>
            <div className="mt-3 space-y-2">
              <SkeletonLine width="85%" />
              <SkeletonLine width="70%" />
            </div>
          </MiniCard>
        </RuleCard>
      </div>

      {/* Rule 3 — Content hierarchy */}
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Content hierarchy</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-16">
        <RuleCard
          type="do"
          label="Peer, non-sequential sections"
          description="Tabs work best when any section can be visited at any time in any order. Each tab is equally reachable and no section gates access to another."
        >
          <MiniCard>
            <TabNav
              tabs={[
                { id: 'overview', label: 'Overview' },
                { id: 'details',  label: 'Details'  },
                { id: 'reviews',  label: 'Reviews', badge: 12 },
              ]}
              activeTab="overview"
              onTabChange={() => {}}
            />
            <div className="mt-4 flex gap-2">
              {['Overview', 'Details', 'Reviews'].map((t, i) => (
                <div key={t} className="flex-1 flex flex-col items-center gap-1.5">
                  <div
                    className="w-full rounded-lg flex items-center justify-center"
                    style={{
                      height: 40,
                      backgroundColor: i === 0 ? 'var(--background-primary-subtle, #EDE1F5)' : '#F3F4F6',
                      border: i === 0 ? '1px solid var(--border-primary-subtle, #DDD)' : '1px solid #E5E7EB',
                    }}
                  >
                    <span className="text-xs text-gray-500">{t}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <circle cx="5" cy="5" r="4.5" stroke="#16A34A" />
                      <path d="M2.5 5l1.8 1.8 3.2-3.2" stroke="#16A34A" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="text-[10px] text-green-600">Always accessible</span>
                  </div>
                </div>
              ))}
            </div>
          </MiniCard>
        </RuleCard>

        <RuleCard
          type="dont"
          label="Sequential step navigation"
          description="Tabs carry no concept of order or completion. For multi-step flows use a Stepper component — it communicates progress and can gate forward navigation."
        >
          <div className="space-y-3">
            <MiniCard>
              <p className="text-[10px] font-semibold text-red-500 uppercase tracking-wider mb-2">
                ✕ Misuse — tabs as steps
              </p>
              <TabNav
                tabs={[
                  { id: 'step1', label: 'Step 1' },
                  { id: 'step2', label: 'Step 2' },
                  { id: 'step3', label: 'Step 3' },
                ]}
                activeTab="step1"
                onTabChange={() => {}}
              />
            </MiniCard>
            {/* Correct alternative: mini stepper illustration */}
            <MiniCard>
              <p className="text-[10px] font-semibold text-green-600 uppercase tracking-wider mb-3">
                ✓ Use a Stepper instead
              </p>
              <div className="flex items-center gap-0">
                {[
                  { n: '1', label: 'Account',  done: true,   active: false },
                  { n: '2', label: 'Plan',     done: false,  active: true  },
                  { n: '3', label: 'Confirm',  done: false,  active: false },
                ].map((step, i, arr) => (
                  <div key={step.n} className="flex items-center flex-1 last:flex-none">
                    <div className="flex flex-col items-center gap-1">
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                        style={{
                          backgroundColor: step.done
                            ? 'var(--background-primary, #4B286D)'
                            : step.active
                            ? 'var(--background-primary, #4B286D)'
                            : '#E5E7EB',
                          color: step.done || step.active ? '#fff' : '#9CA3AF',
                        }}
                      >
                        {step.done ? (
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        ) : step.n}
                      </div>
                      <span className="text-[10px] text-gray-500">{step.label}</span>
                    </div>
                    {i < arr.length - 1 && (
                      <div className="flex-1 h-px mb-4 mx-1" style={{ backgroundColor: step.done ? 'var(--background-primary, #4B286D)' : '#E5E7EB' }} />
                    )}
                  </div>
                ))}
              </div>
            </MiniCard>
          </div>
        </RuleCard>
      </div>

      {/* ── Accessibility ──────────────────────────────────────── */}
      <Divider />
      <SectionHeader
        title="Accessibility"
        description="WCAG audit results and implementation notes for keyboard and assistive technology users."
      />
      <div className="mb-6">
        <A11yAudit items={A11Y_AUDIT_ITEMS} />
      </div>
      <div className="mb-16">
        <A11yList
          items={[
            {
              label: 'role="tablist" / role="tab"',
              description: 'The container uses role="tablist" and each button uses role="tab" so screen readers announce the control group correctly.',
            },
            {
              label: 'aria-selected',
              description: 'Each tab carries aria-selected="true" when active and aria-selected="false" when inactive — communicating selection state without relying on visual colour alone.',
            },
            {
              label: 'Roving tabindex',
              description: 'Only the active tab is in the tab order (tabIndex=0). Inactive tabs use tabIndex=-1 so the group is a single tab stop for keyboard users.',
            },
            {
              label: 'Arrow key navigation',
              description: 'Left and right arrow keys cycle through tabs and invoke onTabChange, moving focus to the newly selected tab automatically.',
            },
            {
              label: 'Badge aria-label',
              description: 'When a badge is present the aria-label includes the count — e.g. "Messages, 4 items" — so the value is announced to screen reader users.',
            },
          ]}
        />
      </div>

    </div>
  );
}