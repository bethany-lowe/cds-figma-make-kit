import { useTheme } from '../contexts/ThemeContext';
import iconManifest from '../../imports/icon-manifest.json';

// ── Token helper ───────────────────────────────────────────────────────────
const toCssVar = (token: string) => '--' + token.replace(/\./g, '-');

// ── Sample icons for illustrations ────────────────────────────────────────
type ManifestEntry = { svg: string; description: string; keywords: string };
const manifest = iconManifest as Record<string, ManifestEntry>;

function getIcon(key: string, size = 24): string {
  const entry = manifest[key];
  if (!entry) return '';
  return entry.svg
    .replace(/width="24"/, `width="${size}"`)
    .replace(/height="24"/, `height="${size}"`);
}

// ── Inline SVG helper ──────────────────────────────────────────────────────
function Icon({ iconKey, size = 24, color = '#1a1a1a' }: { iconKey: string; size?: number; color?: string }) {
  return (
    <span
      style={{ color, display: 'inline-flex', width: size, height: size, flexShrink: 0 }}
      dangerouslySetInnerHTML={{ __html: getIcon(iconKey, size) }}
    />
  );
}

// ── Do / Don't shared component ───────────────────────────────────────────
function DoDont({
  dos,
  donts,
}: {
  dos: string[];
  donts: string[];
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
          {dos.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
              <div className="w-1 h-1 rounded-full bg-green-400 mt-2 flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>

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
          {donts.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
              <div className="w-1 h-1 rounded-full bg-red-400 mt-2 flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// ── Variant comparison card ────────────────────────────────────────────────
function VariantCard({
  iconBase,
  label,
  description,
  useCases,
  accent,
}: {
  iconBase: string;
  label: string;
  description: string;
  useCases: string[];
  accent: string;
}) {
  const variant = label === 'Line' ? `${iconBase}/Line` : `${iconBase}/Solid`;
  return (
    <div className="bg-white border border-gray-200 rounded-3xl p-6 flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: `${accent}18` }}
        >
          <Icon iconKey={variant} size={28} color={accent} />
        </div>
        <div>
          <div className="text-xs font-medium uppercase tracking-wider mb-0.5" style={{ color: accent }}>
            {label} variant
          </div>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </div>
      <ul className="space-y-2 border-t border-gray-100 pt-4">
        {useCases.map((uc, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
            <div className="w-1 h-1 rounded-full bg-gray-400 mt-2 flex-shrink-0" />
            {uc}
          </li>
        ))}
      </ul>
    </div>
  );
}

// ── Colour usage swatch ────────────────────────────────────────────────────
function ColorRow({
  swatch,
  token,
  usage,
  iconKey,
}: {
  swatch: string;
  token: string;
  usage: string;
  iconKey: string;
}) {
  return (
    <div className="flex items-center gap-4 py-4 border-b border-gray-100 last:border-0">
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ring-1 ring-black/8"
        style={{ backgroundColor: swatch }}
      >
        <Icon iconKey={iconKey} size={20} color="white" />
      </div>
      <div className="flex-1">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-mono text-gray-600">{toCssVar(token)}</span>
        <p className="text-sm text-gray-500 mt-1">{usage}</p>
      </div>
      <div
        className="w-5 h-5 rounded-md flex-shrink-0"
        style={{ backgroundColor: swatch }}
        title={swatch}
      />
    </div>
  );
}

// ── Context illustration — mock UI snippets ────────────────────────────────
function ContextMock({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
      <div className="bg-gray-50 border-b border-gray-100 px-4 py-2">
        <span className="text-xs text-gray-500 font-medium">{title}</span>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────
export function IconUsagePage() {
  const { brandFont, primaryColor } = useTheme();

  return (
    <div>
      {/* ── Header ──────────────────────────────────────────────────── */}
      <div className="mb-12">
        <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
          Iconography
        </div>
        <h1
          className="text-5xl font-bold text-gray-900 mb-6"
          style={{ fontFamily: brandFont }}
        >
          Icon Usage
        </h1>
        <p className="text-base text-gray-600 leading-relaxed">
          Icons communicate meaning at a glance. Used correctly, they reduce cognitive load and
          support navigation. Used incorrectly, they create confusion. This page covers variant
          selection, colour, placement, labelling, and accessibility.
        </p>
        <p className="text-sm text-gray-400 mt-3">
          Also known as: Icon guidelines, icon behaviour, icon context.
        </p>
      </div>

      {/* ── Scope notice ────────────────────────────────────────────── */}
      <div className="mb-12 bg-blue-50 border border-blue-100 rounded-2xl px-6 py-4 flex items-start gap-3">
        <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
        <p className="text-sm text-blue-700 leading-relaxed">
          This page covers icon usage guidelines. For icon dimensions and the size token scale,
          see <strong>Icon Size</strong>. To browse and copy icon assets, see{' '}
          <strong>Icon Library</strong>.
        </p>
      </div>

      {/* ── Variants ────────────────────────────────────────────────── */}
      <div className="mb-16">
        <h2 className="text-2xl font-semibold mb-2 text-gray-900">Variants</h2>
        <p className="text-sm text-gray-500 mb-6 leading-relaxed">
          Every CDS icon ships in two variants: <strong className="text-gray-700">Line</strong>{' '}
          (outline strokes) and <strong className="text-gray-700">Solid</strong> (filled). Each
          variant carries a distinct visual weight and communicates state.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <VariantCard
            iconBase="abstractLocation"
            label="Line"
            description="Outline strokes. Lighter visual weight, suitable for default and inactive states."
            useCases={[
              'Default and resting states in navigation, lists, and menus.',
              'Supporting icons alongside body text or labels.',
              'Secondary actions where emphasis should remain on the label.',
              'Contexts where multiple icons appear together and visual parity matters.',
            ]}
            accent="#4b5563"
          />
          <VariantCard
            iconBase="abstractLocation"
            label="Solid"
            description="Filled forms. Higher visual weight, suitable for active, selected, and emphasis states."
            useCases={[
              'Active and selected states in navigation tabs, toggles, and radio-style controls.',
              'Primary actions where the icon carries the primary communicative load.',
              'States that require a clear change in visual weight to signal activation.',
              'Hero icon moments at large sizes (--icon-size-xlarge, --icon-size-xxlarge).',
            ]}
            accent={primaryColor}
          />
        </div>

        <DoDont
          dos={[
            'Use Line for default states and Solid for active or selected states within the same component.',
            'Pair the same icon name across Line and Solid to communicate state change (e.g. abstractLocation/Line → abstractLocation/Solid when selected).',
            'Use Solid for the primary action icon when a component contains one primary and multiple secondary icons.',
          ]}
          donts={[
            'Mix Line and Solid variants arbitrarily within a single component — variant change should always signal a meaningful state change.',
            'Use Solid icons exclusively throughout a dense list or menu — this eliminates the contrast needed to communicate active state.',
            'Use different icon names across Line and Solid states for the same control.',
          ]}
        />
      </div>

      {/* ── Colour ──────────────────────────────────────────────────── */}
      <div className="mb-16">
        <h2 className="text-2xl font-semibold mb-2 text-gray-900">Colour</h2>
        <p className="text-sm text-gray-500 mb-6 leading-relaxed">
          All CDS icons use{' '}
          <span className="font-mono text-gray-700 bg-gray-100 px-1.5 py-0.5 rounded">
            fill="currentColor"
          </span>
          . This means icons inherit the CSS{' '}
          <span className="font-mono text-gray-700 bg-gray-100 px-1.5 py-0.5 rounded">color</span>{' '}
          property of their parent — never use inline fill or stroke overrides.
        </p>

        <div className="bg-white border border-gray-200 rounded-3xl px-6 py-2 mb-8">
          <ColorRow
            swatch="#1a1a1a"
            token="color.icon.default"
            usage="Standard icons in default state — navigation, controls, and body-level indicators."
            iconKey="abstractBolt/Line"
          />
          <ColorRow
            swatch={primaryColor}
            token="color.icon.brand"
            usage="Brand-coloured icons for primary actions, active navigation items, and branded moments."
            iconKey="abstractBolt/Solid"
          />
          <ColorRow
            swatch="#6b7280"
            token="color.icon.subtle"
            usage="Secondary and supporting icons — placeholder states, disabled labels, and decorative uses."
            iconKey="abstractGroup/Line"
          />
          <ColorRow
            swatch="#dc2626"
            token="color.icon.danger"
            usage="Error, destructive action, and critical alert icons."
            iconKey="abstractDanger/Solid"
          />
          <ColorRow
            swatch="#d97706"
            token="color.icon.warning"
            usage="Warning and caution icons — non-critical alerts and advisory states."
            iconKey="abstractDanger/Line"
          />
          <ColorRow
            swatch="#16a34a"
            token="color.icon.success"
            usage="Confirmation, completion, and positive feedback icons."
            iconKey="abstractActivity/Solid"
          />
          <ColorRow
            swatch="#ffffff"
            token="color.icon.inverse"
            usage="Icons placed on dark or brand-coloured backgrounds — buttons, toasts, and dark surfaces."
            iconKey="abstractMotion/Solid"
          />
        </div>

        <DoDont
          dos={[
            'Set icon colour using the CSS color property on the icon element or a parent container.',
            'Use semantic colour tokens (color.icon.*) — not primitive colour values.',
            'Ensure icon colour meets a minimum 3:1 contrast ratio against its background for non-decorative icons.',
            'Use color.icon.inverse on dark surfaces so icons remain legible.',
          ]}
          donts={[
            'Override the SVG fill or stroke attributes directly on icon elements.',
            'Use colour alone to communicate meaning — always pair colour with a label or shape.',
            'Recolour icons with arbitrary hex values outside the token system.',
            'Use brand colour for every icon in a layout — reserve it for primary and active states only.',
          ]}
        />
      </div>

      {/* ── Placement & context ─────────────────────────────────────── */}
      <div className="mb-16">
        <h2 className="text-2xl font-semibold mb-2 text-gray-900">Placement & context</h2>
        <p className="text-sm text-gray-500 mb-6 leading-relaxed">
          Icons should enhance meaning, not replace it. In most cases they are paired with a
          visible text label. Standalone icons are acceptable only when the icon's meaning is
          universally understood in that context and an accessible label is still provided.
        </p>

        {/* Context mocks */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <ContextMock title="Icon + label — navigation bar">
            <div className="flex justify-around">
              {[
                { key: 'abstractLocation/Line', label: 'Home' },
                { key: 'abstractActivity/Solid', label: 'Activity' },
                { key: 'abstractGroup/Line', label: 'Devices' },
                { key: 'abstractBolt/Line', label: 'Energy' },
              ].map(({ key, label }) => (
                <div key={key} className="flex flex-col items-center gap-1">
                  <Icon iconKey={key} size={24} color={label === 'Activity' ? primaryColor : '#6b7280'} />
                  <span
                    className="text-[10px]"
                    style={{ color: label === 'Activity' ? primaryColor : '#9ca3af' }}
                  >
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </ContextMock>

          <ContextMock title="Leading icon — list item">
            <div className="space-y-3">
              {[
                { key: 'abstractLocation/Line', text: 'Living room', sub: 'Main floor' },
                { key: 'abstractBolt/Line', text: 'Energy usage', sub: '3.2 kWh today' },
                { key: 'abstractMotion/Line', text: 'Motion detected', sub: '2 minutes ago' },
              ].map(({ key, text, sub }) => (
                <div key={key} className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: '#f3f4f6' }}
                  >
                    <Icon iconKey={key} size={18} color="#374151" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-800">{text}</div>
                    <div className="text-xs text-gray-400">{sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </ContextMock>

          <ContextMock title="Trailing icon — action indicator">
            <div className="space-y-2">
              {[
                { key: 'abstractCurrencyDollar/Line', label: 'Billing & payments' },
                { key: 'abstractInfinity/Line', label: 'Unlimited plan' },
                { key: 'abstractCommute/Line', label: 'Service address' },
              ].map(({ key, label }) => (
                <div
                  key={key}
                  className="flex items-center justify-between px-4 py-3 bg-gray-50 rounded-xl"
                >
                  <span className="text-sm text-gray-700">{label}</span>
                  <Icon iconKey={key} size={18} color="#9ca3af" />
                </div>
              ))}
            </div>
          </ContextMock>

          <ContextMock title="Inline icon — body text">
            <div className="space-y-3 text-sm text-gray-700">
              <p className="flex items-center gap-1.5">
                <Icon iconKey="abstractDanger/Line" size={16} color="#d97706" />
                <span>Your device is offline. Check your connection.</span>
              </p>
              <p className="flex items-center gap-1.5">
                <Icon iconKey="abstractActivity/Solid" size={16} color="#16a34a" />
                <span>System is running normally.</span>
              </p>
              <p className="flex items-center gap-1.5">
                <Icon iconKey="abstractLocation/Line" size={16} color="#6b7280" />
                <span>123 Main Street, Floor 2</span>
              </p>
            </div>
          </ContextMock>
        </div>

        <DoDont
          dos={[
            'Pair icons with visible text labels in navigation, menus, and primary actions wherever space allows.',
            'Align icons optically with accompanying text — use --icon-size-small (16px) for inline text pairing.',
            'Use consistent icon placement within a component family — always leading or always trailing.',
            'Use a container (background tile or circle) to anchor standalone icons in dense layouts.',
          ]}
          donts={[
            'Use an icon as the sole indicator of meaning in navigation without an accessible fallback label.',
            'Mix leading and trailing icon positions within the same list component.',
            'Use icons purely as decoration in contexts where they could be misread as interactive.',
            'Place icons at different vertical alignments alongside text in the same row.',
          ]}
        />
      </div>

      {/* ── Standalone icons ────────────────────────────────────────── */}
      <div className="mb-16">
        <h2 className="text-2xl font-semibold mb-2 text-gray-900">Standalone icons</h2>
        <p className="text-sm text-gray-500 mb-6 leading-relaxed">
          Some contexts — toolbar actions, icon buttons, and status indicators — present an icon
          without an adjacent text label. These are acceptable only when the icon's meaning is
          unambiguous in context. An accessible text alternative must always be provided.
        </p>
        <div className="bg-white border border-gray-200 rounded-3xl p-8">
          <ul className="space-y-4">
            {[
              {
                bold: 'Always provide an accessible text alternative',
                rest: ' — use aria-label on the interactive element or a visually hidden span. Screen readers must be able to announce the icon\'s purpose.',
              },
              {
                bold: 'Only use standalone icons for universally understood actions',
                rest: ' — such as close (×), search (🔍), settings (⚙), or play/pause. Avoid novel or ambiguous icons without labels.',
              },
              {
                bold: 'Use tooltips to surface the label on hover or long-press',
                rest: ' — this provides a visible fallback for sighted users unfamiliar with the icon.',
              },
              {
                bold: 'Ensure the hit area meets the 48×48px minimum',
                rest: ' even when the visual icon is small. Expand via padding, not by increasing icon size.',
              },
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                <div className="w-1.5 h-1.5 bg-gray-900 rounded-full mt-2 flex-shrink-0" />
                <span>
                  <strong className="font-medium text-gray-900">{item.bold}</strong>
                  {item.rest}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── Accessibility ───────────────────────────────────────────── */}
      <div className="mb-16">
        <h2 className="text-2xl font-semibold mb-6 text-gray-900">Accessibility</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border border-gray-200 rounded-3xl p-6">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center mb-4"
              style={{ backgroundColor: `${primaryColor}18` }}
            >
              <Icon iconKey="abstractGroup/Solid" size={18} color={primaryColor} />
            </div>
            <h3 className="text-sm font-semibold text-gray-900 mb-2">Decorative icons</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              When an icon is purely decorative and provides no additional meaning beyond an
              adjacent label, mark it as hidden from assistive technology using{' '}
              <code className="font-mono text-xs bg-gray-100 px-1.5 py-0.5 rounded">
                aria-hidden="true"
              </code>
              . This prevents redundant announcements.
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-3xl p-6">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center mb-4"
              style={{ backgroundColor: `${primaryColor}18` }}
            >
              <Icon iconKey="abstractDanger/Solid" size={18} color={primaryColor} />
            </div>
            <h3 className="text-sm font-semibold text-gray-900 mb-2">Informative icons</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              When an icon conveys meaning not expressed in adjacent text — such as a status
              indicator or standalone action — provide a text alternative via{' '}
              <code className="font-mono text-xs bg-gray-100 px-1.5 py-0.5 rounded">aria-label</code>,{' '}
              <code className="font-mono text-xs bg-gray-100 px-1.5 py-0.5 rounded">title</code>,
              or a visually hidden element.
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-3xl p-6">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center mb-4"
              style={{ backgroundColor: `${primaryColor}18` }}
            >
              <Icon iconKey="abstractActivity/Solid" size={18} color={primaryColor} />
            </div>
            <h3 className="text-sm font-semibold text-gray-900 mb-2">Colour contrast</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Non-decorative icons must meet a minimum{' '}
              <strong className="text-gray-800">3:1 contrast ratio</strong> against their
              background (WCAG 1.4.11 Non-text Contrast). Use semantic colour tokens
              — never choose icon colour by aesthetic alone.
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-3xl p-6">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center mb-4"
              style={{ backgroundColor: `${primaryColor}18` }}
            >
              <Icon iconKey="abstractMotion/Solid" size={18} color={primaryColor} />
            </div>
            <h3 className="text-sm font-semibold text-gray-900 mb-2">Animated icons</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              If an icon is animated (e.g. a loading spinner or motion indicator), respect the
              user's{' '}
              <code className="font-mono text-xs bg-gray-100 px-1.5 py-0.5 rounded">
                prefers-reduced-motion
              </code>{' '}
              media query and stop or significantly reduce motion when it is set.
            </p>
          </div>
        </div>
      </div>

      {/* ── Global do / don't ───────────────────────────────────────── */}
      <div className="mb-16">
        <h2 className="text-2xl font-semibold mb-6 text-gray-900">Do / Don't</h2>
        <DoDont
          dos={[
            'Use icons to support and reinforce text labels — not to replace them in ambiguous contexts.',
            'Apply the Line variant for default states and Solid for active or selected states.',
            'Use currentColor to inherit icon colour from context — never hardcode fill or stroke.',
            'Ensure a minimum 48×48px touch target for all interactive icons regardless of visual size.',
            'Provide accessible text alternatives for all non-decorative and standalone icons.',
            'Maintain consistent icon placement within a component — always leading or always trailing.',
            'Use semantic --color-icon-* tokens to communicate state (default, brand, danger, warning, success).',
          ]}
          donts={[
            "Use a novel or ambiguous icon without a visible label — even in space-constrained layouts.",
            "Mix Line and Solid variants within the same component without a meaningful state change.",
            "Override SVG fill or stroke attributes directly — use the CSS color property only.",
            "Reduce the touch target to match the visual icon size for small icons.",
            "Use colour alone to communicate meaning — always pair with a label, shape, or pattern.",
            "Reuse the same icon for different meanings in different parts of the same product.",
            "Use icons from outside the CDS library without design review and approval.",
          ]}
        />
      </div>

      {/* ── Platform note ───────────────────────────────────────────── */}
      <div className="mb-16">
        <h2 className="text-2xl font-semibold mb-6 text-gray-900">Platform note</h2>
        <div className="bg-white border border-gray-200 rounded-3xl p-8">
          <ul className="space-y-4">
            {[
              {
                bold: 'iOS',
                rest: ' — Icons render as PDF or SVG assets in Xcode. Use template rendering mode to ensure currentColor behaviour is respected. Apply tintColor to inherit semantic colour tokens.',
              },
              {
                bold: 'Android',
                rest: " — Icons are delivered as Vector Drawable XML. Set fillColor to @color/cds_icon_* to reference semantic colour tokens. Ensure the icon's viewBox matches the target --icon-size-* value.",
              },
              {
                bold: 'Web',
                rest: ' — Icons are inline SVG. Set fill="currentColor" and control colour via CSS. Wrap interactive icons in a focusable element (button or anchor) with an aria-label.',
              },
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                <div className="w-1.5 h-1.5 bg-gray-900 rounded-full mt-2 flex-shrink-0" />
                <span>
                  <strong className="font-medium text-gray-900">{item.bold}</strong>
                  {item.rest}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}