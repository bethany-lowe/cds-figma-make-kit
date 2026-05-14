import { useState, useMemo, useEffect, useCallback } from 'react';
import { Search, X, Check, Grid3X3, Rows3, Download, Copy } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import iconManifest from '../../imports/icon-manifest.json';

// ── Types ──────────────────────────────────────────────────────────────────
interface IconEntry {
  key: string;
  category: string;
  name: string;
  variant: 'Line' | 'Solid';
  svg: string;
  description: string;
  keywords: string;
}

// ── Parse manifest ─────────────────────────────────────────────────────────
function parseManifest(): IconEntry[] {
  return Object.entries(
    iconManifest as Record<string, { svg: string; description: string; keywords: string }>
  )
    .map(([key, data]) => {
      const slashIdx = key.indexOf('/');
      const nameWithCategory = key.slice(0, slashIdx);
      const variant = key.slice(slashIdx + 1) as 'Line' | 'Solid';
      const firstUpperIdx = nameWithCategory.search(/[A-Z]/);
      const category =
        firstUpperIdx > 0 ? nameWithCategory.slice(0, firstUpperIdx) : nameWithCategory;
      const name =
        firstUpperIdx > 0 ? nameWithCategory.slice(firstUpperIdx) : nameWithCategory;
      return {
        key,
        category,
        name,
        variant,
        svg: data.svg,
        description: data.description,
        keywords: data.keywords,
      };
    })
    .sort(
      (a, b) =>
        a.category.localeCompare(b.category) || a.name.localeCompare(b.name)
    );
}

const allIcons = parseManifest();

// ── CDS size options ───────────────────────────────────────────────────────
const SIZES = [
  { token: 'icon.size.small',   px: 16, label: 'Small'   },
  { token: 'icon.size.medium',  px: 24, label: 'Medium'  },
  { token: 'icon.size.large',   px: 48, label: 'Large'   },
  { token: 'icon.size.xlarge',  px: 64, label: 'xLarge'  },
  { token: 'icon.size.xxlarge', px: 88, label: 'xxLarge' },
];

function cap(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

// ── Icon Detail Modal ──────────────────────────────────────────────────────
function IconDetailModal({
  icon,
  renderSize,
  sizeToken,
  primaryColor,
  onClose,
}: {
  icon: IconEntry;
  renderSize: number;
  sizeToken: string;
  primaryColor: string;
  onClose: () => void;
}) {
  const [tokenCopied, setTokenCopied] = useState(false);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const handleCopyToken = () => {
    navigator.clipboard.writeText(icon.key).catch(() => {});
    setTokenCopied(true);
    setTimeout(() => setTokenCopied(false), 1800);
  };

  const handleDownload = () => {
    const sized = icon.svg
      .replace(/width="24"/, `width="${renderSize}"`)
      .replace(/height="24"/, `height="${renderSize}"`);
    const blob = new Blob([sized], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${icon.key.replace('/', '-')}-${renderSize}px.svg`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Preview size: clamp for modal so it never overflows, but shows the chosen size
  const previewSize = Math.min(renderSize, 80);

  const keywords = icon.keywords
    ? icon.keywords.split(',').map((k) => k.trim()).filter(Boolean)
    : [];

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.45)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="relative bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden"
        style={{ maxHeight: '90vh', overflowY: 'auto' }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors z-10"
        >
          <X className="w-4 h-4 text-gray-500" />
        </button>

        <div className="px-7 pt-8 pb-7 flex flex-col gap-5">
          {/* Icon preview */}
          <div className="flex justify-center">
            <div
              className="w-32 h-32 rounded-2xl flex items-center justify-center"
              style={{ backgroundColor: '#f3f4f6' }}
            >
              <span
                style={{ color: '#1a1a1a', width: previewSize, height: previewSize, display: 'block' }}
                dangerouslySetInnerHTML={{
                  __html: icon.svg
                    .replace(/width="24"/, `width="${previewSize}"`)
                    .replace(/height="24"/, `height="${previewSize}"`),
                }}
              />
            </div>
          </div>

          {/* Name */}
          <div className="text-center">
            <h2
              className="text-xl"
              style={{ color: primaryColor, fontWeight: 700 }}
            >
              {icon.name}{icon.variant}
            </h2>
          </div>

          {/* Token pill */}
          <div className="w-full rounded-2xl bg-gray-50 border border-gray-100 px-5 py-3.5 text-center">
            <span className="font-mono text-sm text-gray-600">{icon.key}</span>
          </div>

          {/* Description */}
          {icon.description && (
            <div
              className="rounded-xl bg-gray-50 px-4 py-3.5"
            >
              <p className="text-sm text-gray-700 leading-relaxed">{icon.description}</p>
            </div>
          )}

          {/* Keywords */}
          {keywords.length > 0 && (
            <p className="text-xs text-gray-400 leading-relaxed text-center">
              <span className="text-gray-500">Keywords: </span>
              {keywords.join(', ')}
            </p>
          )}

          {/* Size metadata */}
          <p className="text-xs text-gray-400 text-center">
            <span className="font-mono">{sizeToken}</span>
            {' · '}
            {renderSize}×{renderSize}px
            {' · '}
            {icon.variant}
          </p>

          {/* Actions */}
          <div className="flex gap-3 mt-1">
            <button
              onClick={handleDownload}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl text-sm text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: primaryColor, fontWeight: 600 }}
            >
              <Download className="w-4 h-4" />
              Download SVG
            </button>
            <button
              onClick={handleCopyToken}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl text-sm border border-gray-200 bg-white hover:bg-gray-50 transition-colors"
              style={{ color: tokenCopied ? '#15803d' : '#374151', fontWeight: 600 }}
            >
              {tokenCopied ? (
                <><Check className="w-4 h-4 text-green-600" />Copied!</>
              ) : (
                <><Copy className="w-4 h-4" />Copy token name</>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Icon Card ─────────────────────────────────────────────────────────────
function IconCard({
  icon,
  renderSize,
  compact,
  primaryColor,
  onClick,
}: {
  icon: IconEntry;
  renderSize: number;
  compact: boolean;
  primaryColor: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      title={`${icon.name} ${icon.variant} — click for details`}
      className={`group relative flex flex-col items-center bg-white border border-gray-100 rounded-2xl
        hover:border-gray-300 hover:shadow-sm transition-all duration-150 text-left w-full
        ${compact ? 'p-3 gap-1.5' : 'p-5 gap-3'}`}
    >
      {/* SVG icon */}
      <span
        className="flex-shrink-0"
        style={{ color: primaryColor, width: renderSize, height: renderSize }}
        dangerouslySetInnerHTML={{
          __html: icon.svg
            .replace(/width="24"/, `width="${renderSize}"`)
            .replace(/height="24"/, `height="${renderSize}"`),
        }}
      />

      {/* Label */}
      <span className="text-center leading-tight w-full">
        <span
          className={`block text-gray-800 w-full break-words ${
            compact ? 'text-[10px]' : 'text-xs'
          }`}
          style={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {icon.name}
        </span>
        <span className={`block text-gray-400 ${compact ? 'text-[9px]' : 'text-[10px]'}`}>
          {icon.variant}
        </span>
      </span>
    </button>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────
export function IconLibraryPage() {
  const { brandFont, primaryColor } = useTheme();

  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeVariant, setActiveVariant] = useState<'all' | 'Line' | 'Solid'>('all');
  const [activeSizeIdx, setActiveSizeIdx] = useState(1); // medium default
  const [compact, setCompact] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState<IconEntry | null>(null);

  const activeSize = SIZES[activeSizeIdx];
  const renderSize = activeSize.px;

  const handleClose = useCallback(() => setSelectedIcon(null), []);

  // Derive category list
  const categories = useMemo(
    () => Array.from(new Set(allIcons.map((i) => i.category))).sort(),
    []
  );

  // Filter
  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return allIcons.filter((icon) => {
      if (activeCategory !== 'all' && icon.category !== activeCategory) return false;
      if (activeVariant !== 'all' && icon.variant !== activeVariant) return false;
      if (q) {
        const hay =
          `${icon.name} ${icon.category} ${icon.description} ${icon.keywords}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [search, activeCategory, activeVariant]);

  // Group by category for display
  const grouped = useMemo(() => {
    const map: Record<string, IconEntry[]> = {};
    for (const icon of filtered) {
      if (!map[icon.category]) map[icon.category] = [];
      map[icon.category].push(icon);
    }
    return map;
  }, [filtered]);

  const totalUnique = useMemo(
    () => new Set(allIcons.map((i) => `${i.category}${i.name}`)).size,
    []
  );

  return (
    <div>
      {/* ── Modal ──────────────────────────────────────────────────────── */}
      {selectedIcon && (
        <IconDetailModal
          icon={selectedIcon}
          renderSize={renderSize}
          sizeToken={activeSize.token}
          primaryColor={primaryColor}
          onClose={handleClose}
        />
      )}

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <div
        className="w-full rounded-3xl overflow-hidden mb-10"
        style={{ backgroundColor: '#1a1a2e' }}
      >
        <div className="relative px-10 py-12 overflow-hidden">
          {/* Background floating icons */}
          <div
            className="absolute inset-0 overflow-hidden pointer-events-none select-none"
            aria-hidden="true"
          >
            {[
              { key: 'abstractBolt/Solid',    x: '72%', y: '12%', r: 32, o: 0.12 },
              { key: 'abstractLocation/Line', x: '85%', y: '55%', r: 24, o: 0.08 },
              { key: 'abstractGroup/Solid',   x: '60%', y: '70%', r: 48, o: 0.07 },
              { key: 'abstractDanger/Line',   x: '78%', y: '-8%', r: 64, o: 0.06 },
              { key: 'abstractInfinity/Line', x: '90%', y: '30%', r: 40, o: 0.09 },
            ].map(({ key, x, y, r, o }) => {
              const iconData = (iconManifest as Record<string, { svg: string }>)[key];
              if (!iconData) return null;
              return (
                <span
                  key={key}
                  className="absolute"
                  style={{ left: x, top: y, color: 'white', opacity: o, width: r, height: r }}
                  dangerouslySetInnerHTML={{
                    __html: iconData.svg
                      .replace(/width="24"/, `width="${r}"`)
                      .replace(/height="24"/, `height="${r}"`),
                  }}
                />
              );
            })}
          </div>

          <div className="relative z-10">
            <div
              className="text-xs font-medium uppercase tracking-widest mb-3"
              style={{ color: '#FFFFFF', opacity: 0.85 }}
            >
              Iconography
            </div>
            <h1
              className="text-5xl font-bold text-white mb-4"
              style={{ fontFamily: brandFont }}
            >
              Icon Library
            </h1>
            <p className="text-base text-white/60 max-w-xl leading-relaxed mb-8">
              {totalUnique} icons in Line and Solid variants. All icons use{' '}
              <span className="text-white/80 font-mono">currentColor</span> — drop any icon into
              your layout and it inherits the surrounding text colour automatically.
            </p>

            {/* Stats pills */}
            <div className="flex flex-wrap gap-3">
              {[
                { label: 'Total icons',   value: allIcons.length.toString() },
                { label: 'Unique names',  value: totalUnique.toString() },
                { label: 'Categories',    value: categories.length.toString() },
                { label: 'Variants',      value: 'Line · Solid' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-center gap-2 bg-white/10 rounded-xl px-4 py-2"
                >
                  <span className="text-white/50 text-xs">{stat.label}</span>
                  <span className="text-white text-xs font-medium">{stat.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Browse header ───────────────────────────────────────────── */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900">Browse icons</h2>
        <span className="text-sm text-gray-400">
          {filtered.length} result{filtered.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* ── Filters bar ─────────────────────────────────────────────── */}
      <div className="flex flex-wrap gap-3 mb-4">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by name or keyword…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm
              text-gray-800 placeholder-gray-400 focus:outline-none focus:border-gray-400 transition-colors"
          />
        </div>

        {/* Variant toggle */}
        <div className="flex items-center bg-white border border-gray-200 rounded-xl overflow-hidden text-sm">
          {(['all', 'Line', 'Solid'] as const).map((v) => (
            <button
              key={v}
              onClick={() => setActiveVariant(v)}
              className="px-4 py-2.5 transition-colors"
              style={
                activeVariant === v
                  ? { backgroundColor: primaryColor, color: 'white' }
                  : { color: '#6b7280' }
              }
            >
              {v === 'all' ? 'All' : v}
            </button>
          ))}
        </div>

        {/* Size picker */}
        <div className="flex items-center bg-white border border-gray-200 rounded-xl overflow-hidden text-sm">
          {SIZES.map((s, idx) => (
            <button
              key={s.token}
              onClick={() => setActiveSizeIdx(idx)}
              className="px-3 py-2.5 transition-colors"
              title={`${s.px}×${s.px}px`}
              style={
                activeSizeIdx === idx
                  ? { backgroundColor: primaryColor, color: 'white' }
                  : { color: '#6b7280' }
              }
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Grid density toggle */}
        <div className="flex items-center bg-white border border-gray-200 rounded-xl overflow-hidden">
          <button
            onClick={() => setCompact(false)}
            className="p-2.5 transition-colors"
            style={!compact ? { color: primaryColor } : { color: '#9ca3af' }}
            title="Comfortable"
          >
            <Grid3X3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => setCompact(true)}
            className="p-2.5 transition-colors"
            style={compact ? { color: primaryColor } : { color: '#9ca3af' }}
            title="Compact"
          >
            <Rows3 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ── Category chips ───────────────────────────────────────────── */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setActiveCategory('all')}
          className="px-3 py-1.5 rounded-xl text-xs font-medium transition-colors border"
          style={
            activeCategory === 'all'
              ? { backgroundColor: primaryColor, borderColor: primaryColor, color: 'white' }
              : { borderColor: '#e5e7eb', color: '#6b7280', backgroundColor: 'white' }
          }
        >
          All categories
        </button>
        {categories.map((cat) => {
          const count = allIcons.filter((i) => i.category === cat).length;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-3 py-1.5 rounded-xl text-xs font-medium transition-colors border flex items-center gap-1.5"
              style={
                activeCategory === cat
                  ? { backgroundColor: primaryColor, borderColor: primaryColor, color: 'white' }
                  : { borderColor: '#e5e7eb', color: '#6b7280', backgroundColor: 'white' }
              }
            >
              {cap(cat)}
              <span className="opacity-60">{count}</span>
            </button>
          );
        })}
      </div>

      {/* ── Icon grid ────────────────────────────────────────────────── */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="text-4xl mb-4">🔍</div>
          <p className="text-gray-500 text-base">
            No icons match <strong>"{search}"</strong>
          </p>
          <button
            onClick={() => {
              setSearch('');
              setActiveCategory('all');
              setActiveVariant('all');
            }}
            className="mt-4 text-sm underline text-gray-400 hover:text-gray-600"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="space-y-10">
          {Object.entries(grouped).map(([cat, icons]) => (
            <div key={cat}>
              <div className="flex items-center gap-3 mb-4">
                <h3 className="text-sm font-semibold text-gray-800">{cap(cat)}</h3>
                <span className="text-xs text-gray-400">
                  {icons.length} icon{icons.length !== 1 ? 's' : ''}
                </span>
                <div className="flex-1 h-px bg-gray-100" />
              </div>
              <div
                className={`grid gap-3 ${
                  compact
                    ? 'grid-cols-[repeat(auto-fill,minmax(96px,1fr))]'
                    : 'grid-cols-[repeat(auto-fill,minmax(136px,1fr))]'
                }`}
              >
                {icons.map((icon) => (
                  <IconCard
                    key={icon.key}
                    icon={icon}
                    renderSize={renderSize}
                    compact={compact}
                    primaryColor={primaryColor}
                    onClick={() => setSelectedIcon(icon)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}