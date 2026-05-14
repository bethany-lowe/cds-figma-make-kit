/**
 * DocAnnotationsPage
 *
 * Reference guide for the shared documentation-annotation component library.
 * All components shown here live in /src/app/components/docs/DocAnnotations.tsx
 * and are intended to replace inline copy-pastes across every component page.
 *
 * Sections:
 *   Import guide → Structure → Labels & Status → Callouts →
 *   Guidelines (Do / Don't) → Reference Tables → Accessibility → Playground Tools
 */

import { useState } from 'react';
import {
  useCopy,
  PageHeader,
  SectionHeader,
  Divider,
  StatusBadge,
  Callout,
  DoCard,
  DontCard,
  TokenTable,
  PropsTable,
  A11yList,
  A11yAudit,
  type A11yAuditItem,
  PillSelector,
  CodeBlock,
  type BadgeVariant,
  type CalloutVariant,
  type TokenRow,
  type PropRow,
} from './docs/DocAnnotations';

// ── Tiny helpers local to this page ───────────────────────────

/** Wrapper card for a live component preview. */
function PreviewCard({ children, padded = true }: { children: React.ReactNode; padded?: boolean }) {
  return (
    <div
      className="bg-white border border-gray-200 rounded-3xl overflow-hidden"
      style={{ padding: padded ? '28px 32px' : 0 }}
    >
      {children}
    </div>
  );
}

/** Labelled two-pane (preview | code) showcase for a single component. */
function ComponentShowcase({
  name,
  description,
  preview,
  code,
  paddedPreview = true,
}: {
  name:           string;
  description:    string;
  preview:        React.ReactNode;
  code:           string;
  paddedPreview?: boolean;
}) {
  return (
    <div className="mb-12">
      {/* Component identity */}
      <div className="flex items-start gap-3 mb-4">
        <code
          style={{
            fontSize:        '13px',
            fontWeight:      600,
            color:           'var(--text-primary, #4B286D)',
            backgroundColor: 'var(--background-primary-subtle, #EDE1F5)',
            padding:         '3px 10px',
            borderRadius:    '6px',
            whiteSpace:      'nowrap',
          }}
        >
          {name}
        </code>
        <p className="text-sm text-gray-500 leading-relaxed pt-0.5">{description}</p>
      </div>

      {/* Preview + code */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <PreviewCard padded={paddedPreview}>{preview}</PreviewCard>
        <CodeBlock code={code} language="tsx" />
      </div>
    </div>
  );
}

// ── Mini import block ──────────────────────────────────────────

const IMPORT_CODE = `import {
  useCopy,
  PageHeader,
  SectionHeader,
  Divider,
  StatusBadge,
  Callout,
  DoCard,
  DontCard,
  TokenTable,
  PropsTable,
  A11yList,
  A11yAudit,
  type A11yAuditItem,
  PillSelector,
  CodeBlock,
} from '../docs/DocAnnotations';`;

// ── Sample data used in table previews ────────────────────────

const SAMPLE_TOKEN_ROWS: TokenRow[] = [
  { prop: 'Active text colour', token: '--text-primary',              note: '#4B286D' },
  { prop: 'Surface background', token: '--background-neutral-subtle', note: 'rgba(0,0,0,0.05)' },
  { prop: 'Border radius',      token: '--radius-full',               note: '9999px' },
];

const SAMPLE_PROP_ROWS: PropRow[] = [
  { name: 'variant',   type: 'string',              default: '—',         required: true,  description: 'Controls the visual style and default label of the badge.' },
  { name: 'label',     type: 'string',              default: 'undefined',                  description: 'Overrides the default label text for this variant.'         },
];

// ── Page ──────────────────────────────────────────────────────

export function DocAnnotationsPage() {
  const { copied, copy } = useCopy();

  // Local state for interactive previews
  const [badgeVariant, setBadgeVariant]       = useState<BadgeVariant>('beta');
  const [calloutVariant, setCalloutVariant]   = useState<CalloutVariant>('info');
  const [pillValue, setPillValue]             = useState<'small' | 'medium' | 'large'>('medium');

  const BADGE_OPTIONS: { value: BadgeVariant; label: string }[] = [
    { value: 'beta',        label: 'Beta'        },
    { value: 'ready',       label: 'Ready'       },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'deprecated',  label: 'Deprecated'  },
    { value: 'backlog',     label: 'Backlog'     },
  ];

  const CALLOUT_OPTIONS: { value: CalloutVariant; label: string }[] = [
    { value: 'info',    label: 'Info'    },
    { value: 'warning', label: 'Warning' },
    { value: 'tip',     label: 'Tip'     },
    { value: 'caution', label: 'Caution' },
    { value: 'note',    label: 'Note'    },
  ];

  return (
    <div className="max-w-5xl">

      {/* ── Page header ── */}
      <PageHeader
        category="Utility"
        title="Doc Annotations"
        description="Shared components for building component documentation pages. Import from this module instead of copy-pasting local implementations. Every component shown here is design-token aware and brand-theme responsive."
        badges={['ready']}
      />

      {/* ── Import guide ── */}
      <div className="mb-12">
        <SectionHeader
          title="Import"
          description="All annotation components live in one file. Import what you need."
        />
        <CodeBlock code={IMPORT_CODE} language="tsx" />
      </div>

      <Divider />

      {/* ══════════════════════════════════════════════════════════
          STRUCTURE
      ══════════════════════════════════════════════════════════ */}
      <SectionHeader
        title="Structure"
        description="Building blocks for laying out a documentation page."
      />

      {/* PageHeader */}
      <ComponentShowcase
        name="<PageHeader />"
        description="Top-of-page block with category label, status badges, title, description, and taxonomy tags. Replaces the hand-rolled header in every component page."
        preview={
          <PageHeader
            category="Components"
            title="My Component"
            description="A short description of what this component does and when to reach for it."
            badges={['beta']}
          />
        }
        code={`<PageHeader
  category="Components"
  title="My Component"
  description="A short description of what this component does."
  badges={['beta']}
/>`}
      />

      {/* SectionHeader */}
      <ComponentShowcase
        name="<SectionHeader />"
        description="h2-level section heading with an optional subtitle. Use to open every major documentation section."
        preview={
          <>
            <SectionHeader title="States" description="Visual states the component can be in at any given time." />
            <SectionHeader title="Accessibility" />
          </>
        }
        code={`<SectionHeader
  title="States"
  description="Visual states the component can be in."
/>

<SectionHeader title="Accessibility" />`}
      />

      {/* Divider */}
      <ComponentShowcase
        name="<Divider />"
        description="Full-width horizontal rule (my-12) used to separate major sections on a page."
        preview={
          <div>
            <p className="text-sm text-gray-500 mb-4">Section above the divider</p>
            <Divider />
            <p className="text-sm text-gray-500 mt-4">Section below the divider</p>
          </div>
        }
        code={`<SectionHeader title="States" />
{/* ... content ... */}

<Divider />

<SectionHeader title="Accessibility" />
{/* ... content ... */}`}
      />

      <Divider />

      {/* ══════════════════════════════════════════════════════════
          LABELS & STATUS
      ══════════════════════════════════════════════════════════ */}
      <SectionHeader
        title="Labels & Status"
        description="Chips and callout blocks that communicate component status and contextual information."
      />

      {/* StatusBadge */}
      <div className="mb-12">
        <div className="flex items-start gap-3 mb-4">
          <code
            style={{
              fontSize: '13px', fontWeight: 600,
              color: 'var(--text-primary, #4B286D)',
              backgroundColor: 'var(--background-primary-subtle, #EDE1F5)',
              padding: '3px 10px', borderRadius: '6px', whiteSpace: 'nowrap',
            }}
          >
            {'<StatusBadge />'}
          </code>
          <p className="text-sm text-gray-500 leading-relaxed pt-0.5">
            Small status chip used in page headers and component listings. Six built-in variants; label can be overridden.
          </p>
        </div>

        {/* Interactive selector */}
        <div className="bg-white border border-gray-200 rounded-3xl p-6 mb-4">
          <div className="mb-5">
            <PillSelector
              label="Variant"
              options={BADGE_OPTIONS}
              value={badgeVariant}
              onChange={setBadgeVariant}
            />
          </div>
          <div className="flex items-center gap-3">
            <StatusBadge variant={badgeVariant} />
            <span className="text-sm text-gray-400">with default label</span>
            <StatusBadge variant={badgeVariant} label="Custom label" />
            <span className="text-sm text-gray-400">with custom label</span>
          </div>
        </div>

        {/* All variants at a glance */}
        <div className="bg-white border border-gray-200 rounded-3xl p-6 mb-4">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">All variants</p>
          <div className="flex flex-wrap gap-2">
            {BADGE_OPTIONS.map(o => (
              <StatusBadge key={o.value} variant={o.value} />
            ))}
          </div>
        </div>

        <CodeBlock
          code={`<StatusBadge variant="beta" />
<StatusBadge variant="ready" />
<StatusBadge variant="in-progress" />
<StatusBadge variant="deprecated" />
<StatusBadge variant="backlog" />

{/* Override the label */}
<StatusBadge variant="beta" label="Preview" />`}
        />
      </div>

      {/* Callout */}
      <div className="mb-12">
        <div className="flex items-start gap-3 mb-4">
          <code
            style={{
              fontSize: '13px', fontWeight: 600,
              color: 'var(--text-primary, #4B286D)',
              backgroundColor: 'var(--background-primary-subtle, #EDE1F5)',
              padding: '3px 10px', borderRadius: '6px', whiteSpace: 'nowrap',
            }}
          >
            {'<Callout />'}
          </code>
          <p className="text-sm text-gray-500 leading-relaxed pt-0.5">
            Highlighted information block for surfacing tips, caveats, or important notices within documentation prose.
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-3xl p-6 mb-4">
          <div className="mb-5">
            <PillSelector
              label="Variant"
              options={CALLOUT_OPTIONS}
              value={calloutVariant}
              onChange={setCalloutVariant}
            />
          </div>
          <Callout variant={calloutVariant}>
            This is a <strong>{calloutVariant}</strong> callout. Use it to draw attention to
            something that doesn't fit naturally in surrounding prose.
          </Callout>
        </div>

        {/* All variants at a glance */}
        <div className="bg-white border border-gray-200 rounded-3xl p-6 mb-4">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">All variants</p>
          <div className="flex flex-col gap-3">
            <Callout variant="info">Use for supplementary context that helps but isn't critical.</Callout>
            <Callout variant="tip">Use for best-practice guidance or actionable recommendations.</Callout>
            <Callout variant="warning">Use for behaviours that might surprise or trip up an implementer.</Callout>
            <Callout variant="caution">Use when an incorrect implementation can break accessibility or cause bugs.</Callout>
            <Callout variant="note">Use for editorial asides or references to related documentation.</Callout>
          </div>
        </div>

        <CodeBlock
          code={`<Callout variant="info">
  This prop is required when the component is used without a visible label.
</Callout>

<Callout variant="warning" title="Platform difference">
  On Android, the minimum touch target is 48 dp, not 44 pt as on iOS.
</Callout>

<Callout variant="tip">
  Pair this component with <strong>FeedbackCaption</strong> for inline error messaging.
</Callout>`}
        />
      </div>

      <Divider />

      {/* ══════════════════════════════════════════════════════════
          GUIDELINES
      ══════════════════════════════════════════════════════════ */}
      <SectionHeader
        title="Guidelines"
        description="Annotated usage cards that mark a pattern as recommended or to avoid."
      />

      <div className="mb-4">
        <div className="flex items-start gap-3 mb-4">
          <code
            style={{
              fontSize: '13px', fontWeight: 600,
              color: 'var(--text-primary, #4B286D)',
              backgroundColor: 'var(--background-primary-subtle, #EDE1F5)',
              padding: '3px 10px', borderRadius: '6px', whiteSpace: 'nowrap',
            }}
          >
            {'<DoCard /> / <DontCard />'}
          </code>
          <p className="text-sm text-gray-500 leading-relaxed pt-0.5">
            Paired cards for usage guidelines. Always place them side by side in a two-column grid. Each accepts an <code className="text-xs bg-gray-100 px-1 py-0.5 rounded">items</code> array of plain strings.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <DoCard
            items={[
              'Use short labels — single words or brief phrases scan quickly.',
              'Pair primary actions with a secondary outline button.',
              'Use the loading state while async operations are in flight.',
            ]}
          />
          <DontCard
            items={[
              "Don't use two primary buttons side by side — creates visual ambiguity.",
              "Don't use generic labels like \u201cClick here\u201d or \u201cSubmit\u201d.",
              "Don't rely on colour alone to convey importance.",
            ]}
          />
        </div>

        <CodeBlock
          code={`<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
  <DoCard
    items={[
      'Use short labels — single words or brief phrases scan quickly.',
      'Pair primary actions with a secondary outline button.',
    ]}
  />
  <DontCard
    items={[
      "Don't use two primary buttons side by side.",
      "Don't use generic labels like 'Click here'.",
    ]}
  />
</div>`}
        />
      </div>

      <Divider />

      {/* ══════════════════════════════════════════════════════════
          REFERENCE TABLES
      ══════════════════════════════════════════════════════════ */}
      <SectionHeader
        title="Reference Tables"
        description="Standardised tables for design tokens and component props."
      />

      {/* TokenTable */}
      <ComponentShowcase
        name="<TokenTable />"
        description="Design-token reference table. Uses the standard Property / Token / Value / Note column layout and replaces all inline token tables across component pages."
        paddedPreview={false}
        preview={
          <div className="p-6">
            <TokenTable rows={SAMPLE_TOKEN_ROWS} />
          </div>
        }
        code={`const TOKEN_ROWS: TokenRow[] = [
  { prop: 'Active text colour', token: '--text-primary',              note: '#4B286D' },
  { prop: 'Surface background', token: '--background-neutral-subtle', note: 'rgba(0,0,0,0.05)' },
  { prop: 'Border radius',      token: '--radius-full',               note: '9999px' },
];

<TokenTable
  rows={TOKEN_ROWS}
  description="Design tokens adapt to the active brand theme."
/>`}
      />

      {/* PropsTable */}
      <ComponentShowcase
        name="<PropsTable />"
        description="Component props reference table. Renders Prop / Type / Default / Description columns with colour-coded code chips and required (*) markers."
        paddedPreview={false}
        preview={
          <div className="p-6">
            <PropsTable rows={SAMPLE_PROP_ROWS} />
          </div>
        }
        code={`const PROP_ROWS: PropRow[] = [
  {
    name: 'variant',
    type: 'BadgeVariant',
    required: true,
    description: 'Controls the visual style and default label.',
  },
  {
    name: 'label',
    type: 'string',
    default: 'undefined',
    description: 'Overrides the default label text for this variant.',
  },
];

<PropsTable rows={PROP_ROWS} />`}
      />

      <Divider />

      {/* ══════════════════════════════════════════════════════════
          ACCESSIBILITY
      ══════════════════════════════════════════════════════════ */}
      <SectionHeader
        title="Accessibility"
        description="Checklist component used at the bottom of every component documentation page."
      />

      <ComponentShowcase
        name="<A11yList />"
        description="Styled accessibility checklist. Each item has a label and a description. The purple dot marker is token-driven and responds to brand switches."
        paddedPreview={false}
        preview={
          <A11yList
            items={[
              { label: 'Keyboard navigation', description: 'All interactive elements are reachable via Tab and activated with Enter or Space.' },
              { label: 'Touch target',         description: 'Minimum 44 × 44 px tap area on mobile — exceeds WCAG 2.5.5 minimum.' },
              { label: 'Color contrast',       description: 'Active text uses --text-primary on white — passes WCAG AA (4.5:1).' },
            ]}
          />
        }
        code={`<A11yList
  items={[
    {
      label: 'Keyboard navigation',
      description: 'All interactive elements are reachable via Tab.',
    },
    {
      label: 'Touch target',
      description: 'Minimum 44 × 44 px tap area.',
    },
    {
      label: 'Color contrast',
      description: 'Passes WCAG AA (4.5:1).',
    },
  ]}
/>`}
      />

      <ComponentShowcase
        name="<A11yAudit />"
        description="Accessibility audit table. Each row maps a WCAG criterion to a Pass or Fail result, with an optional level badge (A / AA / AAA) and a short implementation note."
        paddedPreview={false}
        preview={
          <A11yAudit
            items={[
              { criterion: '1.4.3 Contrast (Minimum)',    level: 'AA',  note: 'All text meets 4.5:1 ratio against background.',       status: 'pass' },
              { criterion: '2.1.1 Keyboard',              level: 'A',   note: 'All actions reachable via Tab, Enter, and Space.',      status: 'pass' },
              { criterion: '2.4.7 Focus Visible',         level: 'AA',  note: 'Focus ring visible on all interactive elements.',      status: 'pass' },
              { criterion: '1.4.11 Non-text Contrast',    level: 'AA',  note: 'Icon-only controls fall below 3:1 in disabled state.', status: 'fail' },
              { criterion: '2.5.5 Target Size',           level: 'AAA', note: 'Touch target meets 44 × 44 px minimum.',              status: 'pass' },
            ]}
          />
        }
        code={`const auditItems: A11yAuditItem[] = [
  {
    criterion: '1.4.3 Contrast (Minimum)',
    level: 'AA',
    note: 'All text meets 4.5:1 ratio against background.',
    status: 'pass',
  },
  {
    criterion: '1.4.11 Non-text Contrast',
    level: 'AA',
    note: 'Icon-only controls fall below 3:1 in disabled state.',
    status: 'fail',
  },
];

<A11yAudit items={auditItems} />`}
      />

      <Divider />

      {/* ══════════════════════════════════════════════════════════
          PLAYGROUND TOOLS
      ══════════════════════════════════════════════════════════ */}
      <SectionHeader
        title="Playground Tools"
        description="Controls and display utilities used inside interactive component playgrounds."
      />

      {/* PillSelector */}
      <div className="mb-12">
        <div className="flex items-start gap-3 mb-4">
          <code
            style={{
              fontSize: '13px', fontWeight: 600,
              color: 'var(--text-primary, #4B286D)',
              backgroundColor: 'var(--background-primary-subtle, #EDE1F5)',
              padding: '3px 10px', borderRadius: '6px', whiteSpace: 'nowrap',
            }}
          >
            {'<PillSelector />'}
          </code>
          <p className="text-sm text-gray-500 leading-relaxed pt-0.5">
            Labelled row of toggleable pill buttons for playground controls. The active pill is filled dark; inactive pills are outlined.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          <PreviewCard>
            <div className="flex flex-col gap-5">
              <PillSelector
                label="Size"
                options={[
                  { value: 'small',  label: 'Small'  },
                  { value: 'medium', label: 'Medium' },
                  { value: 'large',  label: 'Large'  },
                ]}
                value={pillValue}
                onChange={setPillValue}
              />
              <p className="text-sm text-gray-400">
                Selected: <strong className="text-gray-700">{pillValue}</strong>
              </p>
            </div>
          </PreviewCard>
          <CodeBlock
            code={`const [size, setSize] = useState<'small'|'medium'|'large'>('medium');

<PillSelector
  label="Size"
  options={[
    { value: 'small',  label: 'Small'  },
    { value: 'medium', label: 'Medium' },
    { value: 'large',  label: 'Large'  },
  ]}
  value={size}
  onChange={setSize}
/>`}
          />
        </div>
      </div>

      {/* CodeBlock */}
      <div className="mb-12">
        <div className="flex items-start gap-3 mb-4">
          <code
            style={{
              fontSize: '13px', fontWeight: 600,
              color: 'var(--text-primary, #4B286D)',
              backgroundColor: 'var(--background-primary-subtle, #EDE1F5)',
              padding: '3px 10px', borderRadius: '6px', whiteSpace: 'nowrap',
            }}
          >
            {'<CodeBlock />'}
          </code>
          <p className="text-sm text-gray-500 leading-relaxed pt-0.5">
            Dark-background code snippet with a header bar showing the language label and a copy-to-clipboard button. The button transitions from "Copy" to "Copied" for 2 seconds on click.
          </p>
        </div>
        <CodeBlock
          code={`<CodeBlock
  code={\`import { Button } from '@cds/components';

<Button variant="high" size="medium">
  Get started
</Button>\`}
  language="tsx"
/>`}
          language="tsx"
        />
      </div>

      {/* useCopy */}
      <div className="mb-12">
        <div className="flex items-start gap-3 mb-4">
          <code
            style={{
              fontSize: '13px', fontWeight: 600,
              color: 'var(--text-primary, #4B286D)',
              backgroundColor: 'var(--background-primary-subtle, #EDE1F5)',
              padding: '3px 10px', borderRadius: '6px', whiteSpace: 'nowrap',
            }}
          >
            useCopy()
          </code>
          <p className="text-sm text-gray-500 leading-relaxed pt-0.5">
            Copy-to-clipboard hook. Returns <code className="text-xs bg-gray-100 px-1 py-0.5 rounded">copied</code> (boolean, resets after 2 s) and <code className="text-xs bg-gray-100 px-1 py-0.5 rounded">copy(text)</code>. Used by <code className="text-xs bg-gray-100 px-1 py-0.5 rounded">CodeBlock</code> internally; expose it when you need custom copy targets.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <PreviewCard>
            <div className="flex items-center gap-3">
              <button
                onClick={() => copy('Hello from useCopy!')}
                className="px-4 py-2 rounded-xl text-sm font-medium transition-colors"
                style={{
                  backgroundColor: copied ? 'var(--background-success-subtle, #DCFCE7)' : 'var(--background-primary-subtle, #EDE1F5)',
                  color:           copied ? 'var(--text-success-bold, #2B8000)' : 'var(--text-primary, #4B286D)',
                }}
              >
                {copied ? '✓ Copied!' : 'Click to copy'}
              </button>
              {copied && (
                <span className="text-sm text-gray-400">Clipboard contains: "Hello from useCopy!"</span>
              )}
            </div>
          </PreviewCard>
          <CodeBlock
            code={`const { copied, copy } = useCopy();

<button onClick={() => copy('Hello!')}>
  {copied ? '✓ Copied!' : 'Copy'}
</button>`}
          />
        </div>
      </div>

      <Divider />

      {/* ══════════════════════════════════════════════════════════
          MIGRATION GUIDE
      ══════════════════════════════════════════════════════════ */}
      <SectionHeader
        title="Migration"
        description="How to replace existing inline patterns with imports from DocAnnotations."
      />

      <div className="grid grid-cols-1 gap-4 mb-8">
        {[
          {
            from: '// ── Copy hook (copy-pasted in every file) ──\nfunction useCopy() {\n  const [copied, setCopied] = useState(false);\n  const copy = (text: string) => {\n    navigator.clipboard.writeText(text).then(() => {\n      setCopied(true);\n      setTimeout(() => setCopied(false), 2000);\n    });\n  };\n  return { copied, copy };\n}',
            to:   "import { useCopy } from './docs/DocAnnotations';",
            label: 'useCopy hook',
          },
          {
            from: '// ── PillSelector (copy-pasted in ~10 files) ──\nfunction PillSelector<T extends string>({ label, options, value, onChange }) {\n  return (\n    <div> ... </div>\n  );\n}',
            to:   "import { PillSelector } from './docs/DocAnnotations';",
            label: 'PillSelector component',
          },
          {
            from: '// ── Token table (inline in every component page) ──\n<div className="bg-white border border-gray-200 rounded-3xl overflow-hidden">\n  <div className="grid grid-cols-[1fr_280px_1fr] ...">\n    ...\n  </div>\n  {TOKEN_ROWS.map(...) => <div>...</div>}\n</div>',
            to:   `import { TokenTable } from './docs/DocAnnotations';\n\n<TokenTable rows={TOKEN_ROWS} />`,
            label: 'TokenTable',
          },
        ].map(({ from, to, label }) => (
          <div key={label}>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">{label}</p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              <div>
                <p className="text-xs text-red-500 font-semibold mb-1.5">Before (inline copy-paste)</p>
                <CodeBlock code={from} language="tsx" />
              </div>
              <div>
                <p className="text-xs font-semibold mb-1.5" style={{ color: 'var(--text-success-bold, #2B8000)' }}>After (shared import)</p>
                <CodeBlock code={to} language="tsx" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <Callout variant="tip" title="Gradual migration">
        You don't need to refactor every page at once. Start by using DocAnnotations for all
        new component pages you create, then update existing pages when you're already editing them.
      </Callout>

    </div>
  );
}