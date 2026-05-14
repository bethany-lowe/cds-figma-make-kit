import { useState } from 'react';
import { Button } from './ui/Button';
import { useTheme } from '../contexts/ThemeContext';
import {
  ChevronRightIcon,
  ChevronLeftIcon,
  MenuIcon,
  SearchIcon,
  InfoIcon,
  SuccessCircleIcon,
  HomeIcon,
  BellIcon,
  PersonIcon,
} from './ui/KitIcons';

/* ─── types ─────────────────────────────────────────────────── */

type Status = 'ready' | 'beta' | 'draft' | 'deprecated';
type Category = 'All' | 'Actions' | 'Forms' | 'Feedback' | 'Navigation' | 'Layout' | 'Display';

interface ComponentEntry {
  name: string;
  description: string;
  category: Omit<Category, 'All'>;
  status: Status;
  tokens: number;
  pagePath: string;
  preview: React.ReactNode;
}

/* ─── status config ─────────────────────────────────────────── */

const STATUS_CONFIG: Record<Status, { label: string; bg: string; text: string; border: string }> = {
  ready:      { label: 'Ready',      bg: '#f0fdf4', text: '#15803d', border: '#bbf7d0' },
  beta:       { label: 'Beta',       bg: '#eff6ff', text: '#1d4ed8', border: '#bfdbfe' },
  draft:      { label: 'Draft',      bg: '#fffbeb', text: '#b45309', border: '#fde68a' },
  deprecated: { label: 'Deprecated', bg: '#fef2f2', text: '#b91c1c', border: '#fecaca' },
};

/* ─── stat card ─────────────────────────────────────────────── */

function StatCard({ label, value, sub }: { label: string; value: number; sub: string }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl px-6 py-5 flex flex-col gap-1">
      <div className="text-3xl font-bold text-gray-900">{value}</div>
      <div className="text-sm font-medium text-gray-800">{label}</div>
      <div className="text-xs text-gray-400">{sub}</div>
    </div>
  );
}

/* ─── component card ─────────────────────────────────────────── */

function ComponentCard({
  entry,
  onNavigate,
  primaryColor,
}: {
  entry: ComponentEntry;
  onNavigate: (path: string) => void;
  primaryColor: string;
}) {
  const sc = STATUS_CONFIG[entry.status];

  return (
    <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden flex flex-col hover:border-gray-300 transition-colors group">
      {/* Preview area */}
      <div
        className="flex items-center justify-center p-8 min-h-32 border-b border-gray-100"
        style={{ backgroundColor: '#f9fafb' }}
      >
        {entry.preview}
      </div>

      {/* Info */}
      <div className="p-5 flex flex-col gap-3 flex-1">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-base font-semibold text-gray-900">{entry.name}</h3>
            <div className="text-xs text-gray-400 mt-0.5">{String(entry.category)}</div>
          </div>
          <span
            className="text-[11px] font-semibold px-2.5 py-1 rounded-full flex-shrink-0"
            style={{ backgroundColor: sc.bg, color: sc.text, border: `1px solid ${sc.border}` }}
          >
            {sc.label}
          </span>
        </div>

        <p className="text-sm text-gray-500 leading-relaxed flex-1">{entry.description}</p>

        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-400">{entry.tokens} tokens</span>
          <button
            onClick={() => onNavigate(entry.pagePath)}
            className="text-xs font-semibold flex items-center gap-1 transition-colors"
            style={{ color: primaryColor }}
          >
            View docs
            <ChevronRightIcon size={14} color={primaryColor} />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── main page ─────────────────────────────────────────────── */

interface KitPageProps {
  onNavigate: (path: string) => void;
}

export function KitPage({ onNavigate }: KitPageProps) {
  const { brandFont, brandName, primaryColor } = useTheme();
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [search, setSearch] = useState('');

  /* ── component registry ── */
  const COMPONENTS: ComponentEntry[] = [
    {
      name: 'Button',
      category: 'Actions',
      status: 'ready',
      tokens: 15,
      pagePath: 'components/button',
      description: 'Triggers actions or navigates users through the interface. Supports 4 emphasis levels, 2 sizes, loading state, and icon slots.',
      preview: (
        <div className="flex flex-wrap gap-2 justify-center">
          <Button variant="high"          size="small">High</Button>
          <Button variant="mediumOutline" size="small">Outline</Button>
          <Button variant="lowGhost"      size="small">Ghost</Button>
        </div>
      ),
    },
    {
      name: 'Input',
      category: 'Forms',
      status: 'draft',
      tokens: 12,
      pagePath: 'components/input',
      description: 'Text input field with label, helper text, error state, and icon support. Fully token-driven border and background colours.',
      preview: (
        <div className="w-full max-w-48 flex flex-col gap-1">
          <div className="text-xs font-medium text-gray-600 px-0.5">Label</div>
          <div
            className="w-full h-10 rounded-xl px-3 border text-sm text-gray-400 flex items-center"
            style={{ borderColor: 'var(--border-neutral)', backgroundColor: 'white' }}
          >
            Placeholder…
          </div>
        </div>
      ),
    },
    {
      name: 'Card',
      category: 'Display',
      status: 'draft',
      tokens: 8,
      pagePath: 'components/card',
      description: 'Container for grouped content. Uses the border-radius.xlarge token and elevation-1 shadow. Supports header, body, and footer slots.',
      preview: (
        <div
          className="w-full max-w-52 rounded-2xl border p-4 flex flex-col gap-2"
          style={{ borderColor: 'var(--border-neutral)', backgroundColor: 'white', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}
        >
          <div className="h-2.5 w-3/4 rounded-full bg-gray-200" />
          <div className="h-2 w-full rounded-full bg-gray-100" />
          <div className="h-2 w-5/6 rounded-full bg-gray-100" />
        </div>
      ),
    },
    {
      name: 'Badge',
      category: 'Display',
      status: 'beta',
      tokens: 6,
      pagePath: 'components/badge',
      description: 'Small visual indicator for status, counts, or labels. Uses semantic feedback colour tokens for contextual colouring.',
      preview: (
        <div className="flex flex-wrap gap-2 justify-center">
          {[
            { label: 'Ready',   bg: '#f0fdf4', text: '#15803d', border: '#bbf7d0' },
            { label: 'Beta',    bg: '#eff6ff', text: '#1d4ed8', border: '#bfdbfe' },
            { label: 'Draft',   bg: '#fffbeb', text: '#b45309', border: '#fde68a' },
          ].map(b => (
            <span
              key={b.label}
              className="text-[11px] font-semibold px-2.5 py-1 rounded-full"
              style={{ backgroundColor: b.bg, color: b.text, border: `1px solid ${b.border}` }}
            >
              {b.label}
            </span>
          ))}
        </div>
      ),
    },
    {
      name: 'Toast / Notification',
      category: 'Feedback',
      status: 'draft',
      tokens: 10,
      pagePath: 'patterns/forms',
      description: 'Transient message overlay for success, error, alert, and info states. Maps to semantic background and text colour tokens.',
      preview: (
        <div
          className="w-full max-w-56 rounded-xl px-4 py-3 flex items-start gap-2 border text-sm"
          style={{ backgroundColor: 'var(--background-success-subtle)', borderColor: 'var(--border-success)', color: 'var(--text-success)' }}
        >
          <SuccessCircleIcon size={16} color="var(--text-success)" />
          <span className="text-xs font-medium">Changes saved successfully.</span>
        </div>
      ),
    },
    {
      name: 'Navigation bar',
      category: 'Navigation',
      status: 'draft',
      tokens: 7,
      pagePath: 'patterns/navigation',
      description: 'Top-level navigation bar. Height governed by size.9 (56px). Supports leading back action, title, and trailing utility actions.',
      preview: (
        <div
          className="w-full max-w-64 rounded-xl flex items-center justify-between px-4"
          style={{ height: 44, backgroundColor: 'var(--background-primary)', color: 'white' }}
        >
          <ChevronLeftIcon size={20} color="white" />
          <span className="text-sm font-semibold">Screen title</span>
          <MenuIcon size={20} color="white" />
        </div>
      ),
    },
    {
      name: 'Tab bar',
      category: 'Navigation',
      status: 'draft',
      tokens: 5,
      pagePath: 'patterns/navigation',
      description: 'Mobile bottom navigation. Fixed height of 49px (iOS) or 56px (Android). Active tab uses primary colour; inactive uses neutral.',
      preview: (
        <div
          className="w-full max-w-64 rounded-xl flex items-center justify-around px-2"
          style={{ height: 44, backgroundColor: 'var(--background-neutral-subtle)', border: '1px solid var(--border-neutral)' }}
        >
          {[
            { icon: <HomeIcon   size={20} />, active: true  },
            { icon: <SearchIcon size={20} />, active: false },
            { icon: <BellIcon   size={20} />, active: false },
            { icon: <PersonIcon size={20} />, active: false },
          ].map((tab, i) => (
            <div key={i} className="flex flex-col items-center gap-0.5 py-1 px-2"
              style={{ color: tab.active ? primaryColor : 'var(--text-neutral-subtle)' }}
            >
              {tab.icon}
            </div>
          ))}
        </div>
      ),
    },
    {
      name: 'Divider',
      category: 'Layout',
      status: 'beta',
      tokens: 3,
      pagePath: 'foundations/border-width',
      description: 'Horizontal or vertical rule. Uses border.width tokens and border semantic colour tokens. Supports label variants.',
      preview: (
        <div className="w-full max-w-56 flex flex-col gap-3">
          <div className="h-px w-full" style={{ backgroundColor: 'var(--border-neutral)' }} />
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px" style={{ backgroundColor: 'var(--border-neutral)' }} />
            <span className="text-xs text-gray-400">or</span>
            <div className="flex-1 h-px" style={{ backgroundColor: 'var(--border-neutral)' }} />
          </div>
          <div className="h-0.5 w-full" style={{ backgroundColor: 'var(--border-neutral-bold)' }} />
        </div>
      ),
    },
  ];

  const categories: Category[] = ['All', 'Actions', 'Forms', 'Feedback', 'Navigation', 'Layout', 'Display'];

  const filtered = COMPONENTS.filter(c => {
    const matchCat = activeCategory === 'All' || c.category === activeCategory;
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
                        c.description.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const readyCount      = COMPONENTS.filter(c => c.status === 'ready').length;
  const betaCount       = COMPONENTS.filter(c => c.status === 'beta').length;
  const draftCount      = COMPONENTS.filter(c => c.status === 'draft').length;
  const totalTokenCount = COMPONENTS.reduce((sum, c) => sum + c.tokens, 0);

  return (
    <div>
      {/* ── Header ─────────────────────────────────────────── */}
      <div className="mb-12">
        <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
          Components
        </div>
        <h1 className="text-5xl font-bold text-gray-900 mb-4" style={{ fontFamily: brandFont }}>
          Component Kit
        </h1>
        <p className="text-base text-gray-600 leading-relaxed max-w-2xl">
          All CDS components in one place. Every component is built on the CDS token system and automatically
          inherits the active brand ({brandName}) via CSS custom properties. Browse by category, check status,
          and jump to full documentation.
        </p>
      </div>

      {/* ── Stats ──────────────────────────────────────────── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        <StatCard label="Components"   value={COMPONENTS.length} sub="in this release" />
        <StatCard label="Ready"        value={readyCount}        sub="production-ready" />
        <StatCard label="Beta / Draft" value={betaCount + draftCount} sub="in progress" />
        <StatCard label="Tokens used"  value={totalTokenCount}   sub="across all components" />
      </div>

      {/* ── How tokens work banner ─────────────────────────── */}
      <div className="mb-10 rounded-2xl px-6 py-5 flex items-start gap-4 border"
        style={{ backgroundColor: 'var(--background-primary-subtle)', borderColor: 'var(--border-primary-subtle)' }}>
        <InfoIcon size={20} color={primaryColor} />
        <div>
          <div className="text-sm font-semibold mb-1" style={{ color: primaryColor }}>
            How the token system powers this kit
          </div>
          <p className="text-sm leading-relaxed" style={{ color: primaryColor, opacity: 0.85 }}>
            Every component references CSS custom properties from <code className="font-mono text-xs bg-white/50 rounded px-1 py-0.5">/src/styles/tokens.css</code>.
            When you switch brands using the theme switcher, the <code className="font-mono text-xs bg-white/50 rounded px-1 py-0.5">data-brand</code> attribute
            on <code className="font-mono text-xs bg-white/50 rounded px-1 py-0.5">&lt;html&gt;</code> changes, and all
            colour overrides cascade automatically — no JavaScript re-render required.
          </p>
        </div>
      </div>

      {/* ── Filter bar ─────────────────────────────────────── */}
      <div className="flex flex-wrap items-center gap-4 mb-8">
        {/* Category pills */}
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={String(cat)}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === cat
                  ? 'bg-gray-900 text-white'
                  : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-300'
              }`}
            >
              {String(cat)}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="flex-1 min-w-48">
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <SearchIcon size={16} />
            </div>
            <input
              type="text"
              placeholder="Search components…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-full border border-gray-200 text-sm bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:border-gray-400 transition-colors"
            />
          </div>
        </div>
      </div>

      {/* ── Grid ───────────────────────────────────────────── */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-12">
          {filtered.map(entry => (
            <ComponentCard
              key={entry.name}
              entry={entry}
              onNavigate={onNavigate}
              primaryColor={primaryColor}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 text-gray-400">
          <SearchIcon size={32} />
          <p className="mt-3 text-sm">No components match "{search}"</p>
          <button
            onClick={() => { setSearch(''); setActiveCategory('All'); }}
            className="mt-2 text-sm underline text-gray-500 hover:text-gray-700"
          >
            Clear filters
          </button>
        </div>
      )}

      {/* ── Contribution guide ─────────────────────────────── */}
      <div className="bg-white border border-gray-200 rounded-3xl p-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Adding a component to the kit</h2>
        <p className="text-sm text-gray-500 mb-6 leading-relaxed">
          New components follow a four-step process before they appear as "Ready" in this kit.
        </p>
        <ol className="space-y-4">
          {[
            {
              step: '1',
              title: 'Design in Figma',
              desc: 'Build the component using only CDS tokens. Every colour, spacing, radius, and elevation value must reference a token — no hardcoded values.',
            },
            {
              step: '2',
              title: 'Create the component file',
              desc: 'Add a new .tsx file under /src/app/components/ui/. Build the component using CSS custom properties for all token-driven values.',
            },
            {
              step: '3',
              title: 'Add a documentation page',
              desc: 'Create a page in /src/app/components/ that includes a playground, variant gallery, token reference table, usage guidelines, and accessibility notes.',
            },
            {
              step: '4',
              title: 'Register in this kit',
              desc: 'Add the component entry to the COMPONENTS array in KitPage.tsx with name, category, status, token count, page path, and a live preview node.',
            },
          ].map((item) => (
            <li key={item.step} className="flex items-start gap-4">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-semibold text-white"
                style={{ backgroundColor: primaryColor }}
              >
                {item.step}
              </div>
              <div>
                <div className="text-sm font-semibold text-gray-800">{item.title}</div>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}