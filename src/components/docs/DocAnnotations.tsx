/**
 * DocAnnotations
 *
 * Shared documentation-annotation components used across all component pages.
 * Import from this module instead of copy-pasting local implementations.
 *
 * Named exports:
 *   Hooks       — useCopy
 *   Structure   — PageHeader, SectionHeader, Divider
 *   Labels      — StatusBadge, Callout
 *   Guidelines  — DoCard, DontCard, DoDontGrid
 *   Tables      — TokenTable, PropsTable
 *   Accessibility — A11yList, A11yAudit
 *   Playground  — PillSelector, CodeBlock
 *   Compositions — CompositionsGrid
 *   Behavior    — BehaviorGrid
 */

import { useState } from 'react';
import {
  Info,
  AlertTriangle,
  Lightbulb,
  AlertCircle,
  StickyNote,
  Check,
  Copy,
} from 'lucide-react';

// ─────────────────────────────────────────────────────────────────────────────
// useCopy
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Copy-to-clipboard hook.
 *
 * @example
 * const { copied, copy } = useCopy();
 * copy('some text');
 */
export function useCopy() {
  const [copied, setCopied] = useState(false);

  const copy = (text: string) => {
    const succeed = () => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    };

    // Try the modern Clipboard API first; fall back to execCommand for
    // sandboxed iframes where clipboard-write permission is denied.
    if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
      navigator.clipboard.writeText(text).then(succeed).catch(() => execCopy(text, succeed));
    } else {
      execCopy(text, succeed);
    }
  };

  return { copied, copy };
}

function execCopy(text: string, onSuccess: () => void) {
  try {
    const el = document.createElement('textarea');
    el.value = text;
    el.setAttribute('readonly', '');
    el.style.cssText = 'position:fixed;top:-9999px;left:-9999px;opacity:0';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    onSuccess();
  } catch {
    // Copy silently unavailable — do nothing
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// StatusBadge
// ─────────────────────────────────────────────────────────────────────────────

export type BadgeVariant =
  | 'beta'
  | 'ready'
  | 'in-progress'
  | 'deprecated'
  | 'backlog';

const BADGE_STYLES: Record<BadgeVariant, { color: string; bg: string; dot: string; label: string }> = {
  'beta':        { color: '#6D28D9', bg: '#EDE9FE', dot: '#7C3AED', label: 'Beta'        },
  'ready':       { color: '#15803D', bg: '#DCFCE7', dot: '#16A34A', label: 'Ready'       },
  'in-progress': { color: '#1D4ED8', bg: '#DBEAFE', dot: '#2563EB', label: 'In Progress' },
  'deprecated':  { color: '#B91C1C', bg: '#FEE2E2', dot: '#DC2626', label: 'Deprecated'  },
  'backlog':     { color: '#4B5563', bg: '#F3F4F6', dot: '#9CA3AF', label: 'Backlog'     },
};

export interface StatusBadgeProps {
  /** Controls the colour scheme and default label text. */
  variant: BadgeVariant;
  /** Override the default label text. */
  label?: string;
}

/** Small status chip used in page headers and component listings. */
export function StatusBadge({ variant, label }: StatusBadgeProps) {
  const { color, bg, dot, label: defaultLabel } = BADGE_STYLES[variant];
  return (
    <span
      style={{
        display:         'inline-flex',
        alignItems:      'center',
        gap:             '6px',
        fontSize:        '13px',
        fontWeight:      600,
        color,
        backgroundColor: bg,
        padding:         '5px 12px',
        borderRadius:    '999px',
        whiteSpace:      'nowrap',
      }}
    >
      <span
        style={{
          width:           '7px',
          height:          '7px',
          borderRadius:    '50%',
          backgroundColor: dot,
          flexShrink:      0,
          display:         'inline-block',
        }}
      />
      {label ?? defaultLabel}
    </span>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PageHeader
// ─────────────────────────────────────────────────────────────────────────────

export interface PageHeaderProps {
  /** Section label shown above the title (e.g. "Components"). */
  category: string;
  /** Primary page title. */
  title: string;
  /** One-paragraph description shown below the title. */
  description: string;
  /** Optional status badges rendered next to the category label. */
  badges?: BadgeVariant[];
}

/** Top-of-page header block used on every component documentation page. */
export function PageHeader({
  category,
  title,
  description,
  badges = [],
}: PageHeaderProps) {
  return (
    <div className="mb-10">
      <div className="flex items-center gap-2 mb-3 flex-wrap">
        {badges.map(v => (
          <StatusBadge key={v} variant={v} />
        ))}
      </div>

      <h1
        className="text-gray-900 mb-3"
        style={{ fontSize: '32px', fontWeight: 700 }}
      >
        {title}
      </h1>

      <p
        className="text-gray-500 max-w-2xl"
        style={{ fontSize: '16px', lineHeight: '1.6' }}
      >
        {description}
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SectionHeader
// ─────────────────────────────────────────────────────────────────────────────

export interface SectionHeaderProps {
  /** Section title rendered as an h2. */
  title: string;
  /** Optional subtitle rendered beneath the title. */
  description?: string;
}

/** h2-level section heading with optional description. */
export function SectionHeader({ title, description }: SectionHeaderProps) {
  return (
    <div className="mb-6">
      <h2
        className="text-gray-900 mb-2"
        style={{ fontSize: '18px', fontWeight: 600 }}
      >
        {title}
      </h2>
      {description && (
        <p className="text-gray-500" style={{ fontSize: '14px', lineHeight: '1.55' }}>
          {description}
        </p>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Divider
// ─────────────────────────────────────────────────────────────────────────────

/** Full-width horizontal rule used to separate major page sections. */
export function Divider() {
  return <div className="border-t border-gray-100 my-12" />;
}

// ─────────────────────────────────────────────────────────────────────────────
// Callout
// ─────────────────────────────────────────────────────────────────────────────

export type CalloutVariant = 'info' | 'warning' | 'tip' | 'caution' | 'note';

const CALLOUT_CONFIG: Record<
  CalloutVariant,
  { icon: React.ComponentType<{ size: number }>; color: string; bg: string; border: string; label: string }
> = {
  info:    { icon: Info,          color: 'var(--text-info-bold, #003F81)',         bg: 'var(--background-info-subtle, #EFF6FF)',     border: 'var(--border-info, #006CDE)',          label: 'Info'    },
  warning: { icon: AlertTriangle, color: '#92400E',                                bg: '#FFFBEB',                                    border: '#F59E0B',                              label: 'Warning' },
  tip:     { icon: Lightbulb,     color: 'var(--text-success-bold, #15803D)',      bg: 'var(--background-success-subtle, #F0FDF4)',  border: 'var(--border-success, #22C55E)',       label: 'Tip'     },
  caution: { icon: AlertCircle,   color: 'var(--text-error, #D80B25)',             bg: 'var(--background-error-subtle, #FEF2F2)',    border: 'var(--border-error, #D80B25)',         label: 'Caution' },
  note:    { icon: StickyNote,    color: '#374151',                                bg: '#F9FAFB',                                    border: '#D1D5DB',                              label: 'Note'    },
};

export interface CalloutProps {
  /** Controls the icon, colour scheme, and default heading. */
  variant: CalloutVariant;
  /** Override the default heading text (e.g. "Heads up"). */
  title?: string;
  children: React.ReactNode;
}

/** Highlighted information block. Use to surface tips, caveats, or important notes. */
export function Callout({ variant, title, children }: CalloutProps) {
  const { icon: Icon, color, bg, border, label } = CALLOUT_CONFIG[variant];
  return (
    <div
      style={{
        display:      'flex',
        gap:          '12px',
        padding:      '14px 16px',
        borderRadius: '12px',
        border:       `1px solid ${border}`,
        backgroundColor: bg,
      }}
    >
      <Icon size={16} style={{ color, flexShrink: 0, marginTop: '2px' }} />
      <div style={{ minWidth: 0 }}>
        {title !== undefined ? (
          <p style={{ fontSize: '13px', fontWeight: 600, color, marginBottom: '4px' }}>
            {title}
          </p>
        ) : (
          <p style={{ fontSize: '13px', fontWeight: 600, color, marginBottom: '4px' }}>
            {label}
          </p>
        )}
        <div style={{ fontSize: '13px', lineHeight: '1.55', color: '#374151' }}>
          {children}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DoCard / DontCard
// ─────────────────────────────────────────────────────────────────────────────

export interface DoCardProps {
  /** List of recommended-practice statements. */
  items: string[];
}

export interface DontCardProps {
  /** List of anti-pattern statements. */
  items: string[];
}

/** Annotates a list of recommended usage patterns. */
export function DoCard({ items }: DoCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-3xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
          <svg className="w-3 h-3 text-green-600" fill="none" viewBox="0 0 12 12">
            <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <span className="text-sm font-semibold text-green-700 uppercase tracking-wider">Do</span>
      </div>
      <ul className="space-y-3">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
            <div className="w-1 h-1 rounded-full bg-green-400 mt-2 flex-shrink-0" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Annotates a list of anti-patterns to avoid. */
export function DontCard({ items }: DontCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-3xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
          <svg className="w-3 h-3 text-red-600" fill="none" viewBox="0 0 12 12">
            <path d="M3 3l6 6M9 3l-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
        <span className="text-sm font-semibold text-red-700 uppercase tracking-wider">Don't</span>
      </div>
      <ul className="space-y-3">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
            <div className="w-1 h-1 rounded-full bg-red-400 mt-2 flex-shrink-0" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DoDontGrid — visual paired rules
// ─────────────────────────────────────────────────────────────────────────────

export interface DoDontRule {
  /** "do" renders a green header strip; "dont" renders a red one. */
  type: 'do' | 'dont';
  /**
   * Short label that follows "Do —" or "Don't —" in the header strip.
   * e.g. "Provide haptic feedback on tap"
   */
  label: string;
  /** Explanatory text shown to the right of the preview canvas. */
  description: string;
  /**
   * Optional visual element shown in the 80×80 px preview canvas on the left.
   * Render a live component, annotated screenshot, or representative illustration.
   */
  preview?: React.ReactNode;
}

export interface DoDontGridProps {
  items: DoDontRule[];
  /** Number of columns. Defaults to 2 (Do left, Don't right). */
  columns?: 2 | 3;
}

/**
 * Visual Do / Don't grid. Each card pairs a colour-coded rule header with
 * an optional preview canvas (left) and an explanatory note (right).
 *
 * Arrange items as alternating do/dont pairs to create visually matched
 * rule sets — the same layout used on the AI Assistant component page.
 *
 * @example
 * <DoDontGrid
 *   items={[
 *     {
 *       type: 'do',
 *       label: 'Provide haptic feedback on tap',
 *       description: 'Trigger a haptic pulse on press to confirm the interaction began.',
 *       preview: <MyComponent state="active" />,
 *     },
 *     {
 *       type: 'dont',
 *       label: 'Add text labels to the button',
 *       description: 'Text labels crowd the design. Use aria-label instead.',
 *       preview: <BadExample />,
 *     },
 *   ]}
 * />
 */
export function DoDontGrid({ items, columns = 2 }: DoDontGridProps) {
  return (
    <div
      className={`grid grid-cols-1 gap-4 ${
        columns === 3 ? 'sm:grid-cols-3' : 'sm:grid-cols-2'
      }`}
    >
      {items.map((item, i) => {
        const isDo = item.type === 'do';
        return (
          <div
            key={i}
            className="bg-white border border-gray-200 rounded-3xl overflow-hidden"
          >
            {/* Colour-coded title strip */}
            <div className="flex items-center gap-2 px-6 py-4 border-b border-gray-100">
              <span
                className={`w-2 h-2 rounded-full flex-shrink-0 ${
                  isDo ? 'bg-green-500' : 'bg-red-500'
                }`}
              />
              <span
                className={`text-sm font-semibold ${
                  isDo ? 'text-green-700' : 'text-red-700'
                }`}
              >
                {isDo ? 'Do' : "Don't"} — {item.label}
              </span>
            </div>

            {/* Body: preview canvas + description */}
            <div className="px-6 py-6 flex items-center gap-5">
              {item.preview && (
                <div className="w-20 h-20 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center flex-shrink-0 overflow-hidden">
                  {item.preview}
                </div>
              )}
              <p className="text-xs text-gray-500 leading-relaxed flex-1">
                {item.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TokenTable
// ────────────────────────────────────────────────────────────────────────────

export interface TokenRow {
  /** Human-readable property name, e.g. "Active tab text". */
  prop: string;
  /** The CSS custom property or literal value, e.g. "--cds-color-primary-pure". */
  token: string;
  /** Resolved value or additional context, e.g. "#4B286D". */
  note?: string;
  /**
   * Explicit swatch color override. When omitted the component auto-detects
   * hex / rgb values and color-semantic CSS custom properties.
   */
  swatch?: string;
}

export interface TokenTableProps {
  rows: TokenRow[];
  /** Optional description rendered above the table. */
  description?: string;
}

// ── Swatch helpers ────────────────────────────────────────────────────────────

/** Returns true when the token string is recognisably a color value. */
function isColorValue(token: string): boolean {
  const t = token.trim().toLowerCase();
  if (t.startsWith('#'))                            return true;
  if (t.startsWith('rgb') || t.startsWith('hsl'))  return true;
  if (['white', 'black', 'transparent'].includes(t)) return true;
  // CSS custom properties whose name implies a color role
  if (
    t.startsWith('--') &&
    /color|bg|background|text|border|icon|fill|stroke|surface|overlay|tint|shade|primary|secondary|brand|accent|success|error|warning|info|neutral|white|black/i.test(t)
  ) return true;
  return false;
}

/**
 * Resolves the CSS background value to use for the swatch cell.
 * Returns `null` when no swatch should be shown.
 */
function resolveSwatchColor(token: string, swatch?: string): string | null {
  if (swatch) return swatch;
  if (!isColorValue(token)) return null;
  const t = token.trim();
  return t.startsWith('--') ? `var(${t})` : t;
}

// ─────────────────────────────────────────────────────────────────────────────

/** Standardised design-token reference table. */
export function TokenTable({ rows, description }: TokenTableProps) {
  return (
    <>
      {description && (
        <p className="text-sm text-gray-500 mb-6 leading-relaxed">{description}</p>
      )}
      <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden">
        {/* Header — Property | Swatch | Token / Value | Note */}
        <div className="grid grid-cols-[1fr_36px_260px_1fr] border-b border-gray-100 px-6 py-3 bg-gray-50">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Property</div>
          <div />
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Token / Value</div>
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Note</div>
        </div>
        {rows.map((row, i) => {
          const swatchColor = resolveSwatchColor(row.token, row.swatch);
          return (
            <div
              key={row.prop}
              className={`grid grid-cols-[1fr_36px_260px_1fr] items-center px-6 py-3 hover:bg-gray-50 transition-colors ${
                i < rows.length - 1 ? 'border-b border-gray-100' : ''
              }`}
            >
              <span className="text-sm text-gray-600">{row.prop}</span>
              {/* Swatch cell */}
              <span className="flex items-center justify-start">
                {swatchColor ? (
                  <span
                    className="w-5 h-5 rounded-md border border-black/10 flex-shrink-0 shadow-sm"
                    style={{ background: swatchColor }}
                    title={row.token}
                  />
                ) : null}
              </span>
              <code className="text-sm font-mono text-gray-700">{row.token}</code>
              <span className="text-sm text-gray-400">{row.note ?? ''}</span>
            </div>
          );
        })}
      </div>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PropsTable
// ─────────────────────────────────────────────────────────────────────────────

export interface PropRow {
  /** Prop name (no leading `--`). */
  name: string;
  /** TypeScript type string. */
  type: string;
  /** Default value. Use `'—'` when no default applies. */
  default?: string;
  /** Whether the prop is required. */
  required?: boolean;
  /** What the prop controls. */
  description: string;
}

export interface PropsTableProps {
  rows: PropRow[];
}

/** Component props reference table. */
export function PropsTable({ rows }: PropsTableProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden">
      <div className="grid grid-cols-[150px_160px_100px_1fr] border-b border-gray-100 px-6 py-3 bg-gray-50">
        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Prop</div>
        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Type</div>
        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Default</div>
        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Description</div>
      </div>
      {rows.map((row, i) => (
        <div
          key={row.name}
          className={`grid grid-cols-[150px_160px_100px_1fr] items-start px-6 py-3 hover:bg-gray-50 transition-colors ${
            i < rows.length - 1 ? 'border-b border-gray-100' : ''
          }`}
        >
          <div className="flex items-center gap-1 pt-0.5">
            <code
              style={{
                fontSize: '12px',
                color: 'var(--text-primary, #4B286D)',
                backgroundColor: 'var(--background-primary-subtle, #F3EEF8)',
                padding: '2px 6px',
                borderRadius: '4px',
              }}
            >
              {row.name}
            </code>
            {row.required && (
              <span style={{ fontSize: '10px', color: '#D80B25', fontWeight: 700, lineHeight: 1 }}>*</span>
            )}
          </div>
          <code
            style={{
              fontSize: '12px',
              color: '#54595F',
              backgroundColor: '#F4F4F4',
              padding: '2px 6px',
              borderRadius: '4px',
            }}
          >
            {row.type}
          </code>
          <code style={{ fontSize: '12px', color: '#9CA3AF' }}>
            {row.default ?? '—'}
          </code>
          <span className="text-sm text-gray-500 leading-relaxed">{row.description}</span>
        </div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// A11yList
// ─────────────────────────────────────────────────────────────────────────────

export interface A11yItem {
  /** Short label for the accessibility criterion. */
  label: string;
  /** Full explanation. */
  description: string;
}

export interface A11yListProps {
  items: A11yItem[];
}

/** Accessibility checklist used at the bottom of every component page. */
export function A11yList({ items }: A11yListProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-3xl p-8">
      <ul className="space-y-5">
        {items.map((item, i) => (
          <li
            key={item.label}
            className={`flex gap-4 pb-5 ${i < items.length - 1 ? 'border-b border-gray-100' : ''}`}
          >
            <span
              className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
              style={{ background: 'var(--background-primary, #4B286D)' }}
            />
            <div>
              <p className="text-sm font-semibold text-gray-900 mb-1">{item.label}</p>
              <p className="text-sm text-gray-500 leading-relaxed">{item.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// A11yAudit
// ─────────────────────────────────────────────────────────────────────────────

export type AuditStatus = 'pass' | 'fail';

export interface A11yAuditItem {
  /** WCAG criterion or short audit check label (e.g. "1.4.3 Contrast (Minimum)"). */
  criterion: string;
  /** Optional WCAG level badge: "A", "AA", "AAA". */
  level?: 'A' | 'AA' | 'AAA';
  /** Short note — implementation detail or failure reason. */
  note?: string;
  /** Whether this check passes or fails. */
  status: AuditStatus;
}

export interface A11yAuditProps {
  items: A11yAuditItem[];
}

const AUDIT_TAG: Record<AuditStatus, { label: string; color: string; bg: string; dot: string }> = {
  pass: { label: 'Pass', color: '#15803D', bg: '#DCFCE7', dot: '#16A34A' },
  fail: { label: 'Fail', color: '#B91C1C', bg: '#FEE2E2', dot: '#DC2626' },
};

/** Accessibility audit table — annotates each criterion with a Pass or Fail tag. */
export function A11yAudit({ items }: A11yAuditProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden">
      {/* Column headers */}
      <div className="grid grid-cols-[auto_220px_1fr_100px] items-center px-6 py-3 bg-gray-50 border-b border-gray-100 gap-4">
        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider w-14">Level</div>
        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Criterion</div>
        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider text-left">Note</div>
        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Result</div>
      </div>

      {items.map((item, i) => {
        const tag = AUDIT_TAG[item.status];
        return (
          <div
            key={item.criterion}
            className={`grid grid-cols-[auto_220px_1fr_100px] items-center px-6 py-4 gap-4 hover:bg-gray-50 transition-colors ${
              i < items.length - 1 ? 'border-b border-gray-100' : ''
            }`}
          >
            {/* Level badge */}
            <div className="w-14">
              {item.level ? (
                <span
                  style={{
                    display:         'inline-block',
                    fontSize:        '11px',
                    fontWeight:      700,
                    color:           'var(--text-primary, #4B286D)',
                    backgroundColor: 'var(--background-primary-subtle, #EDE9FE)',
                    padding:         '2px 8px',
                    borderRadius:    '999px',
                  }}
                >
                  {item.level}
                </span>
              ) : (
                <span className="text-xs text-gray-300">—</span>
              )}
            </div>

            {/* Criterion */}
            <span className="text-sm font-medium text-gray-800">{item.criterion}</span>

            {/* Note */}
            <span className="text-sm text-gray-400 leading-snug">{item.note ?? ''}</span>

            {/* Pass / Fail tag */}
            <div className="flex justify-end">
              <span
                style={{
                  display:         'inline-flex',
                  alignItems:      'center',
                  gap:             '5px',
                  fontSize:        '12px',
                  fontWeight:      600,
                  color:           tag.color,
                  backgroundColor: tag.bg,
                  padding:         '4px 10px',
                  borderRadius:    '999px',
                  whiteSpace:      'nowrap',
                }}
              >
                <span
                  style={{
                    width:           '6px',
                    height:          '6px',
                    borderRadius:    '50%',
                    backgroundColor: tag.dot,
                    display:         'inline-block',
                    flexShrink:      0,
                  }}
                />
                {tag.label}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CompositionsGrid
// ─────────────────────────────────────────────────────────────────────────────

export interface CompositionItem {
  /** Short label shown below the preview canvas. */
  title: string;
  /** One or two sentences describing the composition context. */
  description: string;
  /** Preview content rendered inside the canvas area. */
  preview: React.ReactNode;
}

export interface CompositionsGridProps {
  items: CompositionItem[];
  /** Number of columns in the grid. Defaults to 2. */
  columns?: 2 | 3;
}

/**
 * Grid of composition cards — each shows a live preview canvas above a
 * labelled description. Use to show how a component sits inside real UI
 * contexts (e.g. floating action button, header control, inline form).
 *
 * @example
 * <CompositionsGrid
 *   items={[
 *     { title: 'Floating action button', description: '…', preview: <MyPreview /> },
 *     { title: 'Persistent header control', description: '…', preview: <MyPreview2 /> },
 *   ]}
 * />
 */
export function CompositionsGrid({ items, columns = 2 }: CompositionsGridProps) {
  return (
    <div
      className={`grid grid-cols-1 gap-4 ${
        columns === 3 ? 'sm:grid-cols-3' : 'sm:grid-cols-2'
      }`}
    >
      {items.map(item => (
        <div
          key={item.title}
          className="bg-white border border-gray-200 rounded-3xl overflow-hidden"
        >
          {/* Preview canvas */}
          <div className="h-48 bg-gray-50 border-b border-gray-100 flex items-center justify-center overflow-hidden">
            {item.preview}
          </div>
          {/* Label */}
          <div className="px-6 py-5">
            <p className="text-sm font-semibold text-gray-900 mb-1">{item.title}</p>
            <p className="text-xs text-gray-500 leading-relaxed">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// BehaviorGrid
// ─────────────────────────────────────────────────────────────────────────────

export interface BehaviorStep {
  /**
   * Small uppercase label shown above the preview (e.g. "Before input · hint shown").
   * Use "·" (middle dot) to separate the phase name from a short qualifier.
   */
  label: string;
  /** Live preview content rendered below the step label. */
  preview: React.ReactNode;
}

export interface BehaviorCard {
  /** Card heading — the name of the rule or mechanism (e.g. "Hint  Caption transition"). */
  title: string;
  /** One or two sentences explaining when/why this behaviour applies. */
  description: string;
  /**
   * Ordered steps that illustrate the behaviour. Typically two steps — a
   * "before" state and an "after" state — but more are supported.
   */
  steps: BehaviorStep[];
}

export interface BehaviorGridProps {
  cards: BehaviorCard[];
  /** Number of columns. Defaults to 2. */
  columns?: 2 | 3;
}

/**
 * Grid of behaviour-documentation cards. Each card explains one rule or
 * mechanism with a bold header (title + description) and a stacked sequence
 * of annotated steps (small uppercase label + live preview).
 *
 * Mirrors the Input Field's Behavior section layout.
 *
 * @example
 * <BehaviorGrid
 *   cards={[
 *     {
 *       title: 'Hint → Caption transition',
 *       description: 'Show the hint before the user types. On blur, replace it with a FeedbackCaption. Never show both simultaneously.',
 *       steps: [
 *         { label: 'Before input · hint shown',           preview: <MyField hint="We'll only use this for alerts." /> },
 *         { label: 'After blur — invalid · caption shown', preview: <MyField caption={{ status: 'error', text: 'Enter a valid email.' }} /> },
 *       ],
 *     },
 *   ]}
 * />
 */
export function BehaviorGrid({ cards, columns = 2 }: BehaviorGridProps) {
  return (
    <div
      className={`grid grid-cols-1 gap-4 ${
        columns === 3 ? 'sm:grid-cols-3' : 'sm:grid-cols-2'
      }`}
    >
      {cards.map((card, i) => (
        <div
          key={i}
          className="bg-white border border-gray-200 rounded-3xl overflow-hidden"
        >
          {/* Header: title + description */}
          <div className="px-6 py-5 border-b border-gray-100">
            <p className="text-sm font-semibold text-gray-900 mb-1">{card.title}</p>
            <p className="text-xs text-gray-500 leading-relaxed">{card.description}</p>
          </div>

          {/* Annotated steps */}
          <div className="px-6 py-5 flex flex-col gap-5">
            {card.steps.map((step, j) => (
              <div key={j}>
                <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-3">
                  {step.label}
                </div>
                {step.preview}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PillSelector
// ─────────────────────────────────────────────────────────────────────────────

export interface PillSelectorOption<T extends string> {
  value: T;
  label: string;
}

export interface PillSelectorProps<T extends string> {
  /** Label rendered above the pill row. */
  label: string;
  options: PillSelectorOption<T>[];
  value: T;
  onChange: (v: T) => void;
}

/**
 * Playground control that renders a labelled row of toggleable pills.
 *
 * @example
 * <PillSelector
 *   label="Size"
 *   options={[{ value: 'sm', label: 'Small' }, { value: 'md', label: 'Medium' }]}
 *   value={size}
 *   onChange={setSize}
 * />
 */
export function PillSelector<T extends string>({
  label,
  options,
  value,
  onChange,
}: PillSelectorProps<T>) {
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

// ─────────────────────────────────────────────────────────────────────────────
// CodeBlock
// ─────────────────────────────────────────────────────────────────────────────

export interface CodeBlockProps {
  /** Source code string to display. */
  code: string;
  /** File type hint shown in the header bar (e.g. "tsx", "css"). */
  language?: string;
}

/** Dark-background code block with a copy-to-clipboard button. */
export function CodeBlock({ code, language = 'tsx' }: CodeBlockProps) {
  const { copied, copy } = useCopy();
  return (
    <div style={{ position: 'relative', borderRadius: '20px', overflow: 'hidden', backgroundColor: '#1a1a1a' }}>
      {/* Header bar */}
      <div
        style={{
          display:         'flex',
          alignItems:      'center',
          justifyContent:  'space-between',
          padding:         '8px 16px',
          borderBottom:    '1px solid rgba(255,255,255,0.08)',
          backgroundColor: '#111',
        }}
      >
        <span style={{ fontSize: '11px', fontWeight: 600, color: '#888', textTransform: 'uppercase', letterSpacing: '0.6px' }}>
          {language}
        </span>
        <button
          onClick={() => copy(code)}
          style={{
            display:         'inline-flex',
            alignItems:      'center',
            gap:             '5px',
            padding:         '4px 10px',
            borderRadius:    '6px',
            fontSize:        '11px',
            fontWeight:      500,
            backgroundColor: copied ? 'rgba(43,128,0,0.25)' : 'rgba(255,255,255,0.10)',
            color:           copied ? '#86EFAC' : '#9CA3AF',
            border:          'none',
            cursor:          'pointer',
            transition:      'background-color 200ms, color 200ms',
          }}
        >
          {copied ? <Check size={11} /> : <Copy size={11} />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      {/* Code */}
      <pre
        style={{
          margin:     0,
          padding:    '20px 24px',
          overflowX:  'auto',
          color:      '#E2E8F0',
          fontSize:   '13px',
          lineHeight: '1.7',
          fontFamily: 'ui-monospace, "Cascadia Code", "Source Code Pro", Menlo, monospace',
        }}
      >
        <code>{code}</code>
      </pre>
    </div>
  );
}