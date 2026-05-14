/**
 * DocTemplatePage
 *
 * A reference page showing the standard structure for component documentation.
 * Every section is rendered live with placeholder content so you can see exactly
 * what the finished doc page looks like, then copy the full template scaffold
 * from the bottom of the page.
 *
 * Route: utility/doc-template
 */

import { useState } from 'react';
import {
  PageHeader,
  SectionHeader,
  Divider,
  Callout,
  DoCard,
  DontCard,
  TokenTable,
  PropsTable,
  A11yList,
  A11yAudit,
  type A11yAuditItem,
  CompositionsGrid,
  type CompositionItem,
  BehaviorGrid,
  type BehaviorCard,
  type BehaviorStep,
  DoDontGrid,
  type DoDontRule,
  PillSelector,
  CodeBlock,
  useCopy,
  type TokenRow,
  type PropRow,
} from './docs/DocAnnotations';
import { MyComponent } from './ui/MyComponent';

// ── Full template string (shown in the copy block at the bottom) ──────────────

const FULL_TEMPLATE = `/**
 * MyComponentPage.tsx
 *
 * Documentation page for MyComponent.
 * Route: components/my-component
 */

import { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import {
  PageHeader, SectionHeader, Divider, Callout,
  DoCard, DontCard,
  TokenTable, PropsTable, A11yList,
  A11yAudit, type A11yAuditItem,
  CompositionsGrid, type CompositionItem,
  BehaviorGrid, type BehaviorCard, type BehaviorStep,
  DoDontGrid, type DoDontRule,
  PillSelector, CodeBlock,
  useCopy,
  type TokenRow, type PropRow,
} from './docs/DocAnnotations';
import { MyComponent } from './ui/MyComponent';

// ── Static data ───────────────────────────────────────────────

const TOKEN_ROWS: TokenRow[] = [
  { prop: 'Background',    token: '--background-neutral-subtle', note: 'Surface fill'                 },
  { prop: 'Border colour', token: '--border-neutral',            note: 'Stroke on all sides'          },
  { prop: 'Text colour',   token: '--text-primary',              note: 'Label / content text'         },
  { prop: 'Border radius', token: '--radius-full',               note: '9999 px full rounding'        },
  { prop: 'Spacing inner', token: '--space-medium',              note: 'Padding inside the component' },
];

const PROP_ROWS: PropRow[] = [
  { name: 'variant',   type: '"primary" | "secondary"', required: true,  description: 'Controls the visual hierarchy of the component.' },
  { name: 'size',      type: '"small" | "medium" | "large"',             default: '"medium"', description: 'Sets the component size scale.' },
  { name: 'disabled',  type: 'boolean',                                  default: 'false',    description: 'Prevents interaction and applies a muted visual state.' },
  { name: 'label',     type: 'string',                   required: true,  description: 'Visible label text. Also used as the accessible name.' },
  { name: 'className', type: 'string',                                    description: 'Additional class names merged onto the root element.' },
];

// ── Snippet builder ───────────────────────────────────────────

function buildSnippet({
  variant,
  size,
}: {
  variant: 'primary' | 'secondary';
  size: 'small' | 'medium' | 'large';
}) {
  const lines = ['<MyComponent'];
  lines.push(\`  label="Do the thing"\`);
  if (variant !== 'primary') lines.push(\`  variant="\${variant}"\`);
  if (size !== 'medium')     lines.push(\`  size="\${size}"\`);
  lines.push('/>');
  return lines.join('\\n');
}

// ── Page ──────────────────────────────────────────────────────

export function MyComponentPage() {
  const { brandFont, brandName } = useTheme();
  const { copied, copy } = useCopy();

  const [variant, setVariant] = useState<'primary' | 'secondary'>('primary');
  const [size,    setSize]    = useState<'small' | 'medium' | 'large'>('medium');
  const [tab,     setTab]     = useState<'preview' | 'code'>('preview');

  const snippet = buildSnippet({ variant, size });

  return (
    <div className="max-w-5xl">

      {/* ── 1. Page header ────────────────────────────────────── */}
      <PageHeader
        category="Components"
        title="My Component"
        description="One sentence describing what this component is, what problem it solves, and when to reach for it over an alternative."
        badges={['ready']}
      />

      {/* ── 2. Playground ─────────────────────────────────────── */}
      <div className="mb-20">
        <SectionHeader
          title="Playground"
          description="Adjust the controls to explore every combination. Switch to the Code tab to copy a snippet."
        />
        <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100 bg-gray-50 flex flex-wrap gap-6 items-start">
            <PillSelector
              label="Variant"
              options={[{ value: 'primary', label: 'Primary' }, { value: 'secondary', label: 'Secondary' }]}
              value={variant}
              onChange={setVariant}
            />
            <PillSelector
              label="Size"
              options={[{ value: 'small', label: 'Small' }, { value: 'medium', label: 'Medium' }, { value: 'large', label: 'Large' }]}
              value={size}
              onChange={setSize}
            />
          </div>
          <div className="border-b border-gray-100 flex gap-6 px-6">
            {(['preview', 'code'] as const).map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={\`py-3 text-sm font-medium capitalize transition-colors relative \${tab === t ? 'text-gray-900' : 'text-gray-400 hover:text-gray-600'}\`}
              >
                {t}
                {tab === t && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900" />}
              </button>
            ))}
          </div>
          {tab === 'preview' ? (
            <div className="px-12 py-10 flex items-center justify-center min-h-48 bg-gray-50">
              <div className="px-6 py-3 rounded-xl border border-dashed border-gray-300 text-sm text-gray-400">
                &lt;MyComponent variant="{variant}" size="{size}" /&gt;
              </div>
            </div>
          ) : (
            <div className="relative bg-gray-950">
              <pre className="text-sm text-green-400 p-6 overflow-x-auto font-mono leading-relaxed">{snippet}</pre>
              <button onClick={() => copy(snippet)} className="absolute top-4 right-4 px-3 py-1.5 rounded-lg text-xs font-medium bg-white/10 text-white hover:bg-white/20 transition-colors">
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          )}
        </div>
      </div>

      <Divider />

      {/* ── 3. Anatomy ────────────────────────────────────────── */}
      <div className="mb-20">
        <SectionHeader title="Anatomy" description="The key structural parts and their relationship to one another." />
        <div className="bg-white border border-gray-200 rounded-3xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { n: '1', label: 'Container',   note: 'Root element. Carries the border, background, and border-radius tokens.' },
              { n: '2', label: 'Label',        note: 'Visible text. Also serves as the accessible name for screen readers.' },
              { n: '3', label: 'Icon (opt.)',  note: 'Leading or trailing SVG icon. Always 1:1 with the text size scale.' },
              { n: '4', label: 'State layer',  note: 'Hover, focus, pressed, and disabled overlays driven by semantic tokens.' },
            ].map(part => (
              <div key={part.n} className="flex gap-4">
                <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold text-white" style={{ backgroundColor: 'var(--text-primary, #4B286D)' }}>
                  {part.n}
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-800 mb-0.5">{part.label}</div>
                  <div className="text-sm text-gray-500 leading-relaxed">{part.note}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 4. Variants ───────────────────────────────────────── */}
      <div className="mb-20">
        <SectionHeader title="Variants" description="Use the variant prop to communicate visual hierarchy between actions on a surface." />
        <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden">
          {[
            { label: 'Primary',   note: 'The most prominent option. One per surface.' },
            { label: 'Secondary', note: 'Supports the primary action without competing.' },
          ].map((row, i, arr) => (
            <div key={row.label} className={\`flex items-center gap-8 px-6 py-6 \${i < arr.length - 1 ? 'border-b border-gray-100' : ''}\`}>
              <code className="text-xs font-mono text-gray-400 w-24 flex-shrink-0">{row.label.toLowerCase()}</code>
              <div className="flex-1 flex items-center gap-4">
                <div className="px-4 py-2 rounded-xl border border-dashed border-gray-200 text-xs text-gray-400">{row.label} placeholder</div>
                <span className="text-sm text-gray-400">{row.note}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── 5. States ─────────────────────────────────────────── */}
      <div className="mb-20">
        <SectionHeader title="States" description="All interactive states the component can occupy at runtime." />
        <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden">
          {['Default', 'Hover', 'Focus', 'Pressed', 'Disabled', 'Loading'].map((state, i, arr) => (
            <div key={state} className={\`flex items-center gap-8 px-6 py-5 \${i < arr.length - 1 ? 'border-b border-gray-100' : ''}\`}>
              <code className="text-xs font-mono text-gray-400 w-20 flex-shrink-0">{state.toLowerCase()}</code>
              <div className="px-4 py-2 rounded-xl border border-dashed border-gray-200 text-xs text-gray-400">{state} placeholder</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── 6. Behavior ───────────────────────────────────────── */}
      <div className="mb-20">
        <SectionHeader
          title="Behavior"
          description="Rules governing sub-component interactions, state transitions, and edge cases."
        />
        <BehaviorGrid
          cards={[
            {
              title: 'State A → State B transition',
              description: 'Explain when this transition happens and what triggers it. Never skip intermediate states.',
              steps: [
                {
                  label: 'Initial state · description',
                  preview: (
                    <div className="text-xs text-gray-400 border border-dashed border-gray-300 rounded-xl px-6 py-4 w-full text-center">
                      State A placeholder
                    </div>
                  ),
                },
                {
                  label: 'Resulting state · description',
                  preview: (
                    <div className="text-xs text-gray-400 border border-dashed border-gray-300 rounded-xl px-6 py-4 w-full text-center">
                      State B placeholder
                    </div>
                  ),
                },
              ],
            },
            {
              title: 'Sub-component rule',
              description: 'Describe how a sub-component or modifier behaves in relation to the parent. Cover the normal path and the edge case.',
              steps: [
                {
                  label: 'Condition A · normal behaviour',
                  preview: (
                    <div className="text-xs text-gray-400 border border-dashed border-gray-300 rounded-xl px-6 py-4 w-full text-center">
                      Normal state placeholder
                    </div>
                  ),
                },
                {
                  label: 'Condition B · edge case behaviour',
                  preview: (
                    <div className="text-xs text-gray-400 border border-dashed border-gray-300 rounded-xl px-6 py-4 w-full text-center">
                      Edge case placeholder
                    </div>
                  ),
                },
              ],
            },
          ]}
        />
      </div>

      {/* ── 7. Common compositions ────────────────────────────── */}
      <div className="mb-20">
        <SectionHeader
          title="Common compositions"
          description="How this component typically combines with others in real interface contexts."
        />
        <CompositionsGrid
          items={[
            {
              title: 'Composition A',
              description: 'One sentence describing the context and why this arrangement is used.',
              preview: (
                <div className="text-xs text-gray-400 border border-dashed border-gray-300 rounded-xl px-6 py-4">
                  Composition A preview
                </div>
              ),
            },
            {
              title: 'Composition B',
              description: 'One sentence describing the context and why this arrangement is used.',
              preview: (
                <div className="text-xs text-gray-400 border border-dashed border-gray-300 rounded-xl px-6 py-4">
                  Composition B preview
                </div>
              ),
            },
          ]}
        />
      </div>

      <Divider />

      {/* ── 8. Usage ──────────────────────────────────────────── */}
      <div className="mb-20">
        <SectionHeader title="Usage" />

        {/* ── Compact summary style */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <DoCard
            items={[
              'Use the primary variant for the single most important action on a screen.',
              'Write clear, action-oriented labels: "Save changes", "Add item", "Sign in".',
              'Pair primary with secondary for main + supporting action groups.',
              'Use the loading state while async operations are in flight.',
            ]}
          />
          <DontCard
            items={[
              "Don't place two primary variants side by side — creates visual ambiguity.",
              "Don't use generic labels like \\"Click here\\", \\"OK\\", or \\"Submit\\".",
              "Don't rely on colour alone to convey importance — use hierarchy and placement too.",
              "Don't hardcode colours — always reference a brand semantic token.",
            ]}
          />
        </div>

        {/* ── Extended visual style — remove if not needed for this component */}
        <DoDontGrid
          items={[
            {
              type: 'do',
              label: 'Rule A — short title',
              description: 'One sentence explaining the recommended approach and why it matters.',
              preview: (
                <div className="text-xs text-gray-400 border border-dashed border-gray-300 rounded-xl px-4 py-2">
                  Do preview
                </div>
              ),
            },
            {
              type: 'dont',
              label: 'Rule B — what not to do',
              description: 'One sentence explaining the failure mode and its consequence.',
              preview: (
                <div className="text-xs text-gray-400 border border-dashed border-gray-300 rounded-xl px-4 py-2">
                  Don't preview
                </div>
              ),
            },
          ]}
        />
      </div>

      <Divider />

      {/* ── 9. Design tokens ──────────────────────────────────── */}
      <div className="mb-20">
        <SectionHeader
          title="Design tokens"
          description="Every value is resolved through a brand design token. Switching brands in the theme picker updates all values simultaneously."
        />
        <TokenTable rows={TOKEN_ROWS} />
      </div>

      {/* ── 10. Props ─────────────────────────────────────────── */}
      <div className="mb-20">
        <SectionHeader title="Props" description="Full API surface. Required props are marked with an asterisk." />
        <PropsTable rows={PROP_ROWS} />
      </div>

      <Divider />

      {/* ── 11. Accessibility ─────────────────────────────────── */}
      <div className="mb-20">
        <SectionHeader title="Accessibility" />
        <A11yAudit
          items={[
            { criterion: '1.4.3 Contrast (Minimum)',  level: 'AA',  note: 'All text meets 4.5 : 1 ratio against background surfaces.',    status: 'pass' },
            { criterion: '2.1.1 Keyboard',            level: 'A',   note: 'All interactive states reachable via Tab, Enter, and Space.',   status: 'pass' },
            { criterion: '2.4.7 Focus Visible',       level: 'AA',  note: 'Brand-coloured focus ring visible on all interactive elements.', status: 'pass' },
            { criterion: '1.4.11 Non-text Contrast',  level: 'AA',  note: 'Icon-only controls fall below 3 : 1 in disabled state.',        status: 'fail' },
            { criterion: '2.5.5 Target Size',         level: 'AAA', note: 'Touch target meets 44 × 44 px minimum on all size variants.',   status: 'pass' },
          ]}
        />
        <div className="mt-4">
          <A11yList
            items={[
              { label: 'aria-disabled',    description: 'Set on the root element when disabled; keeps the element in the tab order while conveying state to assistive technology.' },
              { label: 'aria-busy',        description: 'Set during loading. Add an aria-label describing the pending action if no visible label remains.' },
              { label: 'role & labelling', description: 'Interactive elements carry an implicit or explicit role. Ensure every control has an accessible name via visible text, aria-label, or aria-labelledby.' },
            ]}
          />
        </div>
        <Callout variant="note" title="Tip">
          Run the audit table first — fill in real pass/fail results against your component's
          implementation. Use the A11yList below it for ARIA and labelling notes that don't
          map cleanly to a single WCAG criterion.
        </Callout>
      </div>

    </div>
  );
}
`;

// ── Placeholder token / prop data used in the live preview ──────────────────

const PREVIEW_TOKEN_ROWS: TokenRow[] = [
  { prop: 'Background',    token: '--background-neutral-subtle', note: 'Surface fill'             },
  { prop: 'Border colour', token: '--border-neutral',            note: 'Stroke on all sides'      },
  { prop: 'Text colour',   token: '--text-primary',              note: 'Label / content text'     },
  { prop: 'Border radius', token: '--radius-full',               note: '9999 px full rounding'    },
  { prop: 'Spacing inner', token: '--space-medium',              note: 'Padding inside component' },
];

const PREVIEW_PROP_ROWS: PropRow[] = [
  { name: 'variant',   type: '"primary" | "secondary"',      required: true,  description: 'Controls the visual hierarchy of the component.' },
  { name: 'size',      type: '"small" | "medium" | "large"', default: '"medium"',             description: 'Sets the component size scale.' },
  { name: 'disabled',  type: 'boolean',                      default: 'false',                description: 'Prevents interaction and applies a muted visual state.' },
  { name: 'label',     type: 'string',                       required: true,  description: 'Visible label. Also used as the accessible name.' },
  { name: 'className', type: 'string',                                        description: 'Extra class names merged onto the root element.' },
];

// ── Section label strip ──────────────────────────────────────────────────────

function SectionLabel({ number, title, note }: { number: number; title: string; note: string }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <div
        className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
        style={{ backgroundColor: 'var(--text-primary, #4B286D)' }}
      >
        {number}
      </div>
      <div>
        <span className="text-sm font-semibold text-gray-900 mr-2">{title}</span>
        <span className="text-sm text-gray-400">{note}</span>
      </div>
    </div>
  );
}

// ── Mini playground ──────────────────────────────────────────────────────────

function MiniPlayground() {
  const { copied, copy } = useCopy();
  const [variant, setVariant] = useState<'primary' | 'secondary'>('primary');
  const [size,    setSize]    = useState<'small' | 'medium' | 'large'>('medium');
  const [tab,     setTab]     = useState<'preview' | 'code'>('preview');

  const snippet = [
    '<MyComponent',
    '  label="Do the thing"',
    variant !== 'primary' ? `  variant="${variant}"` : null,
    size !== 'medium' ? `  size="${size}"` : null,
    '/>',
  ].filter(Boolean).join('\n');

  return (
    <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden">
      <div className="px-6 py-5 border-b border-gray-100 bg-gray-50 flex flex-wrap gap-6 items-start">
        <PillSelector label="Variant" options={[{ value: 'primary', label: 'Primary' }, { value: 'secondary', label: 'Secondary' }]} value={variant} onChange={setVariant} />
        <PillSelector label="Size"    options={[{ value: 'small', label: 'Small' }, { value: 'medium', label: 'Medium' }, { value: 'large', label: 'Large' }]} value={size} onChange={setSize} />
      </div>
      <div className="border-b border-gray-100 flex gap-6 px-6">
        {(['preview', 'code'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)} className={`py-3 text-sm font-medium capitalize transition-colors relative ${tab === t ? 'text-gray-900' : 'text-gray-400 hover:text-gray-600'}`}>
            {t}
            {tab === t && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900" />}
          </button>
        ))}
      </div>
      {tab === 'preview' ? (
        <div className="px-12 py-10 flex items-center justify-center min-h-40 bg-gray-50">
          <div className="px-6 py-3 rounded-xl border border-dashed border-gray-300 text-sm text-gray-400">
            &lt;MyComponent variant="{variant}" size="{size}" /&gt;
          </div>
        </div>
      ) : (
        <div className="relative bg-gray-950">
          <pre className="text-sm text-green-400 p-6 overflow-x-auto font-mono leading-relaxed">{snippet}</pre>
          <button onClick={() => copy(snippet)} className="absolute top-4 right-4 px-3 py-1.5 rounded-lg text-xs font-medium bg-white/10 text-white hover:bg-white/20 transition-colors">
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      )}
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export function DocTemplatePage() {
  return (
    <div className="max-w-5xl">

      {/* ── Page header ─────────────────────────────────────────── */}
      <PageHeader
        category="Utility"
        title="Doc Template"
        description="The standard structure every component documentation page follows. Each numbered section below is rendered live with placeholder content so you can see the finished shape, then copy the full .tsx scaffold from the bottom."
        badges={['ready']}
      />

      <Callout variant="tip" title="How to use this page">
        Read through each numbered section to understand what goes where. When you're ready to
        start a new component doc, copy the full template at the bottom, rename every instance
        of <code className="text-xs bg-white/50 px-1 py-0.5 rounded">MyComponent</code> to
        your component name, and fill in the blanks.
      </Callout>

      {/* ════════════════════════════════════════════════════════════
          SECTION MAP
      ════════════════════════════════════════════════════════════ */}

      <div className="mt-12 mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-1">Page structure</h2>
        <p className="text-sm text-gray-500">Eleven sections in order. Every component page uses all of them.</p>
      </div>

      {/* Overview strip */}
      <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden mb-16">
        {[
          { n: 1,  label: 'Page Header',          note: 'Category, title, description, status badge, and taxonomy tags.' },
          { n: 2,  label: 'Playground',            note: 'Interactive controls, preview canvas, and copyable code snippet.' },
          { n: 3,  label: 'Anatomy',               note: 'Named parts diagram with numbered callouts.' },
          { n: 4,  label: 'Variants',              note: 'All prop-driven visual permutations with short notes.' },
          { n: 5,  label: 'States',                note: 'Default, hover, focus, pressed, disabled, loading.' },
          { n: 6,  label: 'Behavior',              note: 'State transitions, sub-component rules, and edge-case handling.' },
          { n: 7,  label: 'Common Compositions',   note: 'How this component typically combines with others in real interface contexts.' },
          { n: 8,  label: 'Usage',                 note: 'Do / Don\'t cards — compact bullet lists and/or visual paired rules.' },
          { n: 9,  label: 'Design Tokens',         note: 'Token table mapping every visual property to a brand design token.' },
          { n: 10, label: 'Props',                 note: 'Full prop table with types, defaults, and descriptions.' },
          { n: 11, label: 'Accessibility',         note: 'WCAG audit table with pass/fail results per criterion, plus supporting checklist.' },
        ].map((row, i, arr) => (
          <div
            key={row.n}
            className={`flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition-colors ${i < arr.length - 1 ? 'border-b border-gray-100' : ''}`}
          >
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
              style={{ backgroundColor: 'var(--cds-color-primary-pure, #4B286D)' }}
            >
              {row.n}
            </div>
            <span className="text-sm font-semibold text-gray-800 w-44 flex-shrink-0">{row.label}</span>
            <span className="text-sm text-gray-400">{row.note}</span>
          </div>
        ))}
      </div>

      <Divider />

      {/* ════════════════════════════════════════════════════════════
          LIVE SECTION PREVIEWS
      ════════════════════════════════════════════════════════════ */}

      <div className="mt-12 mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-1">Live preview</h2>
        <p className="text-sm text-gray-500">Each section rendered with placeholder content, exactly as it will look on a finished page.</p>
      </div>

      {/* ── 1. Page Header ──────────────────────────────────────── */}
      <div className="mb-16">
        <SectionLabel number={1} title="Page Header" note="Top of every doc page." />
        <div className="bg-white border border-gray-200 rounded-3xl p-8">
          <PageHeader
            category="Components"
            title="My Component"
            description="One sentence describing what this component is, what problem it solves, and when to reach for it over an alternative."
            badges={['ready']}
          />
        </div>
        <Callout variant="note" title="Props">
          <code className="text-xs">category</code> — section label (e.g. "Components").{' '}
          <code className="text-xs">title</code> — component name.{' '}
          <code className="text-xs">description</code> — one clear sentence.{' '}
          <code className="text-xs">badges</code> — one of: beta, ready, in-progress, deprecated, backlog.
        </Callout>
      </div>

      {/* ── 2. Playground ───────────────────────────────────────── */}
      <div className="mb-16">
        <SectionLabel number={2} title="Playground" note="Interactive prop explorer." />
        <MiniPlayground />
        <Callout variant="note" title="Structure">
          Controls strip (PillSelectors) → Preview / Code tab bar → canvas or dark code block.
          The snippet builder should only emit non-default props to keep generated code clean.
        </Callout>
      </div>

      {/* ── 3. Anatomy ──────────────────────────────────────────── */}
      <div className="mb-16">
        <SectionLabel number={3} title="Anatomy" note="Named parts diagram." />
        <div className="bg-white border border-gray-200 rounded-3xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { n: '1', label: 'Container',   note: 'Root element. Carries border, background, and border-radius tokens.' },
              { n: '2', label: 'Label',        note: 'Visible text. Also serves as the accessible name for screen readers.' },
              { n: '3', label: 'Icon (opt.)',  note: 'Leading or trailing SVG icon. Always scaled to match the text size.' },
              { n: '4', label: 'State layer',  note: 'Hover, focus, pressed, and disabled overlays driven by semantic tokens.' },
            ].map(part => (
              <div key={part.n} className="flex gap-4">
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0" style={{ backgroundColor: 'var(--text-primary, #4B286D)' }}>
                  {part.n}
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-800 mb-0.5">{part.label}</div>
                  <div className="text-sm text-gray-500 leading-relaxed">{part.note}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Callout variant="note" title="Tip">
          Replace the four cards with an annotated screenshot of your component. Overlay
          numbered callouts in Figma, export as PNG, and import it here.
        </Callout>
      </div>

      {/* ── 4. Variants ─────────────────────────────────────────── */}
      <div className="mb-16">
        <SectionLabel number={4} title="Variants" note="All visual permutations of the variant prop." />
        <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden">
          {[
            { label: 'Primary',   note: 'The most prominent option. One per surface.' },
            { label: 'Secondary', note: 'Supports the primary action without competing for attention.' },
          ].map((row, i, arr) => (
            <div key={row.label} className={`flex items-center gap-8 px-6 py-6 ${i < arr.length - 1 ? 'border-b border-gray-100' : ''}`}>
              <code className="text-xs font-mono text-gray-400 w-24 flex-shrink-0">{row.label.toLowerCase()}</code>
              <div className="flex-1 flex items-center gap-4">
                <div className="px-4 py-2 rounded-xl border border-dashed border-gray-200 text-xs text-gray-400">{row.label} placeholder</div>
                <span className="text-sm text-gray-400">{row.note}</span>
              </div>
            </div>
          ))}
        </div>
        <Callout variant="note" title="Pattern">
          One row per variant value. Left column: monospace prop value. Right: live component + short note.
        </Callout>
      </div>

      {/* ── 5. States ───────────────────────────────────────────── */}
      <div className="mb-16">
        <SectionLabel number={5} title="States" note="Every interactive runtime state." />
        <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden">
          {['Default', 'Hover', 'Focus', 'Pressed', 'Disabled', 'Loading'].map((state, i, arr) => (
            <div key={state} className={`flex items-center gap-8 px-6 py-5 ${i < arr.length - 1 ? 'border-b border-gray-100' : ''}`}>
              <code className="text-xs font-mono text-gray-400 w-20 flex-shrink-0">{state.toLowerCase()}</code>
              <div className="px-4 py-2 rounded-xl border border-dashed border-gray-200 text-xs text-gray-400">{state} placeholder</div>
            </div>
          ))}
        </div>
        <Callout variant="note" title="Pattern">
          Same layout as Variants. Remove states that don't apply (e.g. a Pill has no Loading state).
        </Callout>
      </div>

      {/* ── 6. Behavior ─────────────────────────────────────────── */}
      <div className="mb-16">
        <SectionLabel number={6} title="Behavior" note="State transitions, sub-component rules, and edge-case handling." />
        <BehaviorGrid
          cards={[
            {
              title: 'Idle → Focus transition',
              description: 'The component shifts from its resting appearance to the active state when it receives keyboard focus or a pointer tap.',
              steps: [
                {
                  label: 'Idle · default appearance',
                  preview: (
                    <div className="w-full h-11 rounded-2xl border border-gray-200 bg-white flex items-center px-4">
                      <span className="text-sm text-gray-300">Placeholder text</span>
                    </div>
                  ),
                },
                {
                  label: 'Focused · active border',
                  preview: (
                    <div className="w-full h-11 rounded-2xl bg-white flex items-center px-4" style={{ border: '2px solid var(--text-primary, #4B286D)' }}>
                      <span className="text-sm text-gray-500">Placeholder text</span>
                    </div>
                  ),
                },
              ],
            },
            {
              title: 'Feedback states',
              description: 'Validation feedback surfaces below the component via a caption. The error caption replaces any hint text — never show both simultaneously.',
              steps: [
                {
                  label: 'Valid · success caption shown',
                  preview: (
                    <div className="flex flex-col gap-1.5 w-full">
                      <div className="w-full h-11 rounded-2xl border border-gray-200 bg-white flex items-center px-4">
                        <span className="text-sm text-gray-600">alex_home</span>
                      </div>
                      <span className="text-xs text-green-600 flex items-center gap-1.5">
                        <svg className="w-3 h-3 flex-shrink-0" fill="none" viewBox="0 0 12 12"><path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        Value is available.
                      </span>
                    </div>
                  ),
                },
                {
                  label: 'Invalid · error caption replaces hint',
                  preview: (
                    <div className="flex flex-col gap-1.5 w-full">
                      <div className="w-full h-11 rounded-2xl border border-gray-200 bg-white flex items-center px-4">
                        <span className="text-sm text-gray-600">abc</span>
                      </div>
                      <span className="text-xs text-red-500 flex items-center gap-1.5">
                        <svg className="w-3 h-3 flex-shrink-0" fill="none" viewBox="0 0 12 12"><circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.25"/><path d="M6 3.5v3M6 8h.01" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"/></svg>
                        Enter a valid value.
                      </span>
                    </div>
                  ),
                },
              ],
            },
            {
              title: 'Required vs Optional marker',
              description: '"(Required)" appears inline to the right of the label. Use sparingly — if most fields are required, mark only the optional ones instead.',
              steps: [
                {
                  label: 'Required · marker visible',
                  preview: (
                    <div className="flex flex-col gap-2 w-full">
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-medium text-gray-700">Account name</span>
                        <span className="text-xs text-gray-400">(Required)</span>
                      </div>
                      <div className="w-full h-11 rounded-2xl border border-gray-200 bg-white" />
                    </div>
                  ),
                },
                {
                  label: 'Optional · no marker',
                  preview: (
                    <div className="flex flex-col gap-2 w-full">
                      <span className="text-sm font-medium text-gray-700">Nickname</span>
                      <div className="w-full h-11 rounded-2xl border border-gray-200 bg-white" />
                    </div>
                  ),
                },
              ],
            },
            {
              title: 'Loading → Settled',
              description: 'Async operations lock the component into a loading state. Restore full interaction only after the operation resolves — success or error.',
              steps: [
                {
                  label: 'Loading · async in flight',
                  preview: (
                    <div className="w-full h-11 rounded-2xl border border-gray-100 bg-gray-50 flex items-center gap-3 px-4 opacity-70">
                      <div className="w-4 h-4 rounded-full border-2 border-gray-200 border-t-gray-500 animate-spin flex-shrink-0" />
                      <span className="text-sm text-gray-400">Processing…</span>
                    </div>
                  ),
                },
                {
                  label: 'Settled · result applied',
                  preview: (
                    <div className="w-full h-11 rounded-2xl border border-gray-200 bg-white flex items-center gap-3 px-4">
                      <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 16 16"><path d="M3 8l3 3 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      <span className="text-sm text-gray-600">Changes saved</span>
                    </div>
                  ),
                },
              ],
            },
          ]}
        />
        <Callout variant="note" title="Pattern">
          Two steps per card is the standard — a "before" state and an "after" state. Add a third
          step only when the transition passes through a meaningful intermediate state (e.g. loading).
          Remove cards for rules that don't apply to your component.
        </Callout>
      </div>

      {/* ── 7. Common Compositions ──────────────────────────────── */}
      <div className="mb-16">
        <SectionLabel number={7} title="Common Compositions" note="How the component sits inside real interface contexts." />
        <CompositionsGrid
          items={[
            {
              title: 'Composition A',
              description: 'One sentence describing the context and why this arrangement is used.',
              preview: (
                <div className="text-xs text-gray-400 border border-dashed border-gray-300 rounded-xl px-6 py-4">
                  Composition A preview
                </div>
              ),
            },
            {
              title: 'Composition B',
              description: 'One sentence describing the context and why this arrangement is used.',
              preview: (
                <div className="text-xs text-gray-400 border border-dashed border-gray-300 rounded-xl px-6 py-4">
                  Composition B preview
                </div>
              ),
            },
          ]}
        />
        <Callout variant="note" title="Tip">
          Replace placeholder previews with real UI context — a live component in a card, a sidebar,
          or a modal header. Label each with a short name and a single-sentence rationale.
        </Callout>
      </div>

      <Divider />

      {/* ── 8. Usage ────────────────────────────────────────────── */}
      <div className="mb-16">
        <SectionLabel number={8} title="Usage" note="Compact bullet-list cards and extended visual paired rules — use one or both." />

        {/* Compact style */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <DoCard
            items={[
              'Use the primary variant for the single most important action on a screen.',
              'Write clear, action-oriented labels: "Save changes", "Add item", "Sign in".',
              'Pair primary with secondary for main + supporting action groups.',
              'Use the loading state while async operations are in flight.',
            ]}
          />
          <DontCard
            items={[
              "Don't place two primary variants side by side — creates visual ambiguity.",
              "Don't use generic labels like \"Click here\", \"OK\", or \"Submit\".",
              "Don't rely on colour alone to convey importance — use hierarchy and placement too.",
              "Don't hardcode colours — always reference a brand semantic token.",
            ]}
          />
        </div>

        {/* Extended visual style */}
        <DoDontGrid
          items={[
            {
              type: 'do',
              label: 'Use consistent visual weight',
              description: 'Primary actions carry more visual weight through fill and prominence. Reserve this for the most important interaction on the surface.',
              preview: (
                <div className="flex flex-col items-center gap-1.5">
                  <div className="px-4 py-1.5 rounded-lg text-xs text-white" style={{ background: 'var(--text-primary, #4B286D)' }}>Primary</div>
                  <div className="px-4 py-1.5 rounded-lg border border-gray-300 text-gray-500 text-xs">Secondary</div>
                </div>
              ),
            },
            {
              type: 'dont',
              label: 'Stack identical variants together',
              description: 'When two primary variants share a surface, neither reads as the main action. Use hierarchy — one primary, one secondary — to guide attention.',
              preview: (
                <div className="flex flex-col items-center gap-1.5">
                  <div className="px-4 py-1.5 rounded-lg text-xs text-white" style={{ background: 'var(--text-primary, #4B286D)' }}>Primary</div>
                  <div className="px-4 py-1.5 rounded-lg text-xs text-white opacity-50" style={{ background: 'var(--text-primary, #4B286D)' }}>Primary</div>
                </div>
              ),
            },
            {
              type: 'do',
              label: 'Write action-oriented labels',
              description: 'Labels like "Save changes" or "Add item" tell users exactly what will happen. Pair the verb with the object to remove ambiguity.',
              preview: (
                <div className="px-4 py-1.5 rounded-lg text-xs text-white" style={{ background: 'var(--text-primary, #4B286D)' }}>Save changes</div>
              ),
            },
            {
              type: 'dont',
              label: 'Use vague single-word labels',
              description: '"OK", "Submit", or "Click here" give no context about the outcome. Vague labels increase hesitation and accessibility failures.',
              preview: (
                <div className="px-4 py-1.5 rounded-lg text-xs text-white opacity-50" style={{ background: 'var(--text-primary, #4B286D)' }}>Submit</div>
              ),
            },
          ]}
        />

        <Callout variant="note" title="Choosing a style">
          Use <code className="text-xs">DoCard</code> + <code className="text-xs">DontCard</code> for four-to-six concise bullet points.
          Switch to <code className="text-xs">DoDontGrid</code> when each rule benefits from a visual preview — especially for layout, spacing, or state rules.
        </Callout>
      </div>

      <Divider />

      {/* ── 9. Design Tokens ────────────────────────────────────── */}
      <div className="mb-16">
        <SectionLabel number={9} title="Design Tokens" note="One row per visual property." />
        <TokenTable
          rows={PREVIEW_TOKEN_ROWS}
          description="Every colour, border, spacing, and typography value is resolved through a brand design token and updates automatically when the brand theme changes."
        />
        <Callout variant="note" title="Coverage">
          List every token the component consumes — colour, border-width, border-radius, spacing,
          typography. Cross-check against the component's CSS module to avoid gaps.
        </Callout>
      </div>

      {/* ── 10. Props ───────────────────────────────────────────── */}
      <div className="mb-16">
        <SectionLabel number={10} title="Props" note="Full API surface. Required props marked with *." />
        <PropsTable rows={PREVIEW_PROP_ROWS} />
        <Callout variant="note" title="Tip">
          Keep descriptions short — one sentence. Link to related tokens where the prop directly
          maps to a CSS custom property.
        </Callout>
      </div>

      <Divider />

      {/* ── 11. Accessibility ───────────────────────────────────── */}
      <div className="mb-16">
        <SectionLabel number={11} title="Accessibility" note="WCAG audit table with pass/fail results, plus narrative checklist." />
        <A11yAudit
          items={[
            { criterion: '1.4.3 Contrast (Minimum)',  level: 'AA',  note: 'All text meets 4.5 : 1 ratio against background surfaces.',    status: 'pass' },
            { criterion: '2.1.1 Keyboard',            level: 'A',   note: 'All interactive states reachable via Tab, Enter, and Space.',   status: 'pass' },
            { criterion: '2.4.7 Focus Visible',       level: 'AA',  note: 'Brand-coloured focus ring visible on all interactive elements.', status: 'pass' },
            { criterion: '1.4.11 Non-text Contrast',  level: 'AA',  note: 'Icon-only controls fall below 3 : 1 in disabled state.',        status: 'fail' },
            { criterion: '2.5.5 Target Size',         level: 'AAA', note: 'Touch target meets 44 × 44 px minimum on all size variants.',   status: 'pass' },
          ]}
        />
        <div className="mt-4">
          <A11yList
            items={[
              { label: 'aria-disabled',    description: 'Set on the root element when disabled; keeps the element in the tab order while conveying state to assistive technology.' },
              { label: 'aria-busy',        description: 'Set during loading. Add an aria-label describing the pending action if no visible label remains.' },
              { label: 'role & labelling', description: 'Interactive elements carry an implicit or explicit role. Ensure every control has an accessible name via visible text, aria-label, or aria-labelledby.' },
            ]}
          />
        </div>
        <Callout variant="note" title="Tip">
          Run the audit table first — fill in real pass/fail results against your component's
          implementation. Use the <code className="text-xs">A11yList</code> below it for
          ARIA and labelling notes that don't map cleanly to a single WCAG criterion.
        </Callout>
      </div>

      <Divider />

      {/* ════════════════════════════════════════════════════════════
          FULL COPYABLE TEMPLATE
      ════════════════════════════════════════════════════════════ */}

      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-1">Copy template</h2>
        <p className="text-sm text-gray-500">
          Complete <code className="font-mono text-xs">.tsx</code> scaffold. Copy, rename every{' '}
          <code className="font-mono text-xs">MyComponent</code> reference to your component name,
          then fill in the blanks.
        </p>
      </div>

      <CodeBlock code={FULL_TEMPLATE} language="tsx" />

      {/* Checklist */}
      <div className="mt-8 bg-white border border-gray-200 rounded-3xl p-6">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Before publishing a new doc page</p>
        <ul className="space-y-3">
          {[
            'Add the route to App.tsx renderPage() switch statement.',
            'Add the nav item to Sidebar.tsx CATEGORIES array under the correct section.',
            'Replace all MyComponent placeholders with real component usage.',
            'Fill in TOKEN_ROWS — cross-check against the component\'s CSS module.',
            'Fill in PROP_ROWS — cross-check against the component\'s TypeScript interface.',
            'Remove any Anatomy / States / Behavior cards that don\'t apply to this component.',
            'Replace BehaviorGrid placeholder steps with real component previews.',
            'Replace CompositionsGrid placeholder previews with real UI context screenshots or live components.',
            'Replace DoDontGrid placeholder previews with real component screenshots.',
            'Write real DoCard / DontCard bullets (4–6 per card, paired where possible).',
            'Fill in the A11yAudit table with real pass/fail results. Add A11yList items for ARIA notes that don\'t map to a single WCAG criterion.',
            'Set the correct status badge: beta, in-progress, deprecated, or ready.',
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <div
                className="w-4 h-4 rounded border-2 flex-shrink-0 mt-0.5"
                style={{ borderColor: 'var(--cds-color-primary-pure, #4B286D)' }}
              />
              <span className="text-sm text-gray-600">{item}</span>
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
}