/**
 * CDS ToggleButton
 *
 * SDUI action control for immediate binary device-state actions.
 * Distinct from Toggle (persistent switch): supports loading, error,
 * and irresponsive device states a plain switch cannot express.
 *
 * Spec: Figma → ToggleButton-READY / components
 *
 * Anatomy:
 *   Circle button (48×48 default | 84×84 large) · icon centred
 *   Optional leading label (above/before) and bottom label (below/after)
 *
 * States:
 *   off          → neutral resting; appearance varies by style
 *   on           → always brand-filled (--background-primary) regardless of style
 *   loading      → on-state + pulse animation; non-interactive
 *   error        → error-subtle surface + error border + danger icon
 *   irresponsive → disabled-like; dashed border; non-interactive
 *
 * Styles (off-state treatment):
 *   high         → neutral-subtle fill, no border
 *   medOutline   → transparent + primary-bold border
 *   medBorderless→ primary-subtle fill, no border
 *   lowGhost     → fully transparent, no border
 */

import React, { useState } from 'react';
import iconManifest from '../../../imports/icon-manifest.json';

// ── Types ──────────────────────────────────────────────────────
export type ToggleButtonState = 'on' | 'off' | 'loading' | 'error' | 'irresponsive';
export type ToggleButtonStyle = 'high' | 'medOutline' | 'medBorderless' | 'lowGhost';
export type ToggleButtonSize  = 'default' | 'large';
export type ToggleButtonLayout = 'vertical' | 'horizontal';

export interface ToggleButtonProps {
  /** CDS icon manifest key, e.g. "technologyWifi/Line". Required unless state === "error". */
  icon: string;
  /** Visual + interaction state. Defaults to "off". */
  state?: ToggleButtonState;
  /** Off-state visual treatment. On-state is always brand-filled. Defaults to "high". */
  style?: ToggleButtonStyle;
  /** Geometry scale. default = 48×48px / icon 20px; large = 84×84px / icon 36px. */
  size?: ToggleButtonSize;
  /** Arrangement of button relative to its labels. */
  layout?: ToggleButtonLayout;
  /** Label above the button (vertical) or to its left (horizontal). */
  leadingLabel?: string;
  /** Label below the button (vertical) or inline-stacked after it (horizontal). */
  bottomLabel?: string;
  /** Horizontal layout only: secondary label stacked after the button. */
  trailingLabel?: string;
  /** Called with the next state when the button is pressed. */
  onToggle?: (next: 'on' | 'off') => void;
  /** Accessible label for the button element. */
  ariaLabel?: string;
  /** Force the focus ring visible (used in spec/demo pages). */
  forceFocus?: boolean;
}

// ── Dimensions ─────────────────────────────────────────────────
const DIM = {
  default: { btn: 48, icon: 20, gap: 8  },
  large:   { btn: 84, icon: 36, gap: 10 },
} as const;

// ── Style × state colour matrix ────────────────────────────────
interface ColourSet {
  bg:           string;
  fg:           string;
  border:       string;
  borderWidth:  string;
  dashed?:      boolean;
  glow:         string;
  captionColor: string;
  interactive:  boolean;
  loading?:     boolean;
}

function resolveColours(style: ToggleButtonStyle, state: ToggleButtonState): ColourSet {
  // ── On (always brand-filled) ────────────────────────────────
  const ON: ColourSet = {
    bg:          'var(--background-primary)',
    fg:          'var(--text-primary-inverse)',
    border:      'transparent',
    borderWidth: 'var(--border-width-none)',
    glow:        '0 6px 18px -6px var(--background-primary)',
    captionColor:'var(--text-neutral-bold)',
    interactive: true,
  };

  // ── Loading (on-style, pulsing, non-interactive) ────────────
  if (state === 'loading') return { ...ON, glow: 'none', interactive: false, loading: true };

  // ── Error ───────────────────────────────────────────────────
  if (state === 'error') return {
    bg:          'var(--background-error-subtle)',
    fg:          'var(--text-error)',
    border:      'var(--border-error)',
    borderWidth: 'var(--border-width-thick)',
    glow:        'none',
    captionColor:'var(--text-error)',
    interactive: true,
  };

  // ── Irresponsive (device unreachable) ───────────────────────
  if (state === 'irresponsive') return {
    bg:          'var(--background-disabled)',
    fg:          'var(--text-disabled)',
    border:      'var(--border-neutral-bold)',
    borderWidth: 'var(--border-width-thin)',
    dashed:      true,
    glow:        'none',
    captionColor:'var(--text-disabled)',
    interactive: false,
  };

  // ── On ──────────────────────────────────────────────────────
  if (state === 'on') return ON;

  // ── Off — varies per style ──────────────────────────────────
  switch (style) {
    case 'medOutline':
      return {
        bg:          'transparent',
        fg:          'var(--text-primary)',
        border:      'var(--border-primary-bold)',
        borderWidth: 'var(--border-width-thick)',
        glow:        'none',
        captionColor:'var(--text-neutral)',
        interactive: true,
      };
    case 'medBorderless':
      return {
        bg:          'var(--background-primary-subtle)',
        fg:          'var(--text-primary)',
        border:      'transparent',
        borderWidth: 'var(--border-width-none)',
        glow:        'none',
        captionColor:'var(--text-neutral)',
        interactive: true,
      };
    case 'lowGhost':
      return {
        bg:          'transparent',
        fg:          'var(--text-primary)',
        border:      'transparent',
        borderWidth: 'var(--border-width-none)',
        glow:        'none',
        captionColor:'var(--text-neutral)',
        interactive: true,
      };
    case 'high':
    default:
      return {
        bg:          'var(--background-neutral-subtle)',
        fg:          'var(--text-neutral-bold)',
        border:      'transparent',
        borderWidth: 'var(--border-width-none)',
        glow:        'none',
        captionColor:'var(--text-neutral)',
        interactive: true,
      };
  }
}

// ── Icon helper ────────────────────────────────────────────────
function ManifestIcon({ name, size }: { name: string; size: number }) {
  const manifest = iconManifest as Record<string, { svg: string }>;
  const raw = manifest[name]?.svg ?? '';
  if (!raw) return null;
  const sized = raw
    .replace(/width="24"/, `width="${size}"`)
    .replace(/height="24"/, `height="${size}"`);
  return (
    <span
      aria-hidden="true"
      style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}
      dangerouslySetInnerHTML={{ __html: sized }}
    />
  );
}

// ── Spinner ────────────────────────────────────────────────────
function Spinner({ size, colour }: { size: number; colour: string }) {
  return (
    <span
      role="status"
      aria-label="Loading"
      style={{
        display:     'inline-block',
        width:       size,
        height:      size,
        border:      `${Math.max(2, Math.round(size / 10))}px solid ${colour}`,
        borderTopColor: 'transparent',
        borderRadius:'50%',
        animation:   'cds-tb-spin 0.7s linear infinite',
        flexShrink:  0,
      }}
    />
  );
}

// Inject keyframes once
if (typeof document !== 'undefined' && !document.getElementById('cds-tb-keyframes')) {
  const st = document.createElement('style');
  st.id = 'cds-tb-keyframes';
  st.textContent = `
    @keyframes cds-tb-spin    { to { transform: rotate(360deg); } }
    @keyframes cds-tb-pulse   { 0%,100% { opacity:0.85; } 50% { opacity:1; } }
    .cds-tb-root:focus { outline: none; }
    .cds-tb-root:focus-visible,
    .cds-tb-force-focus {
      box-shadow:
        0 0 0 2px #fff,
        0 0 0 calc(2px + var(--border-width-heavy, 4px)) var(--border-info, #0780ff) !important;
    }
  `;
  document.head.appendChild(st);
}

// ── ToggleButton ───────────────────────────────────────────────
export const ToggleButton: React.FC<ToggleButtonProps> = ({
  icon,
  state      = 'off',
  style      = 'high',
  size       = 'default',
  layout     = 'vertical',
  leadingLabel,
  bottomLabel,
  trailingLabel,
  onToggle,
  ariaLabel  = 'Toggle',
  forceFocus = false,
}) => {
  const [hover,  setHover]  = useState(false);
  const [active, setActive] = useState(false);

  const dim = DIM[size] ?? DIM.default;
  const c   = resolveColours(style, state);

  const scale   = c.interactive && active ? 0.94 : 1;
  const opacity = c.interactive && hover  ? 0.88 : 1;

  // Border composition
  const borderValue = c.dashed
    ? `var(--border-width-thin) dashed ${c.border}`
    : c.border === 'transparent'
      ? 'none'
      : `${c.borderWidth} solid ${c.border}`;

  // Icon node
  const iconNode = c.loading
    ? <Spinner size={dim.icon} colour={c.fg} />
    : state === 'error'
      ? <ManifestIcon name="abstractDanger/Solid" size={dim.icon} />
      : icon
        ? <ManifestIcon name={icon} size={dim.icon} />
        : null;

  // Label typography
  const captionStyle: React.CSSProperties = {
    fontFamily:    'var(--typo-body-small-regular-family, -apple-system, "Noto Sans", sans-serif)',
    fontSize:      'var(--typo-body-small-regular-size, 12px)',
    fontWeight:    '600',
    lineHeight:    'var(--typo-body-small-regular-line-height, 16px)',
    color:          c.captionColor,
    whiteSpace:    'nowrap',
  };
  const mutedCaptionStyle: React.CSSProperties = {
    ...captionStyle,
    opacity: 0.75,
  };

  const buttonEl = (
    <button
      type="button"
      className={`cds-tb-root${forceFocus ? ' cds-tb-force-focus' : ''}${c.loading ? ' cds-tb-loading' : ''}`}
      aria-label={ariaLabel}
      aria-pressed={state === 'on'}
      aria-disabled={!c.interactive || undefined}
      disabled={!c.interactive}
      onClick={c.interactive ? () => onToggle?.(state === 'on' ? 'off' : 'on') : undefined}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setActive(false); }}
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
      style={{
        width:          dim.btn,
        height:         dim.btn,
        borderRadius:   'var(--radius-full)',
        background:     c.bg,
        color:          c.fg,
        border:         borderValue,
        display:        'inline-flex',
        alignItems:     'center',
        justifyContent: 'center',
        cursor:         c.interactive ? 'pointer' : 'not-allowed',
        transform:      `scale(${scale})`,
        opacity,
        boxShadow:      c.glow,
        padding:        0,
        outline:        'none',
        flexShrink:     0,
        transition:     'transform 120ms ease, background 160ms ease, color 160ms ease, box-shadow 240ms ease, border-color 160ms ease, opacity 120ms ease',
        animation:      c.loading ? 'cds-tb-pulse 1.4s ease-in-out infinite' : undefined,
        WebkitAppearance: 'none',
        appearance:     'none',
      }}
    >
      {iconNode}
    </button>
  );

  if (layout === 'horizontal') {
    return (
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: dim.gap + 4 }}>
        {leadingLabel && (
          <div style={{ ...captionStyle, textAlign: 'right', maxWidth: 140 }}>{leadingLabel}</div>
        )}
        {buttonEl}
        {(bottomLabel || trailingLabel) && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 180 }}>
            {bottomLabel   && <div style={captionStyle}>{bottomLabel}</div>}
            {trailingLabel && <div style={mutedCaptionStyle}>{trailingLabel}</div>}
          </div>
        )}
      </div>
    );
  }

  // Vertical (default)
  return (
    <div style={{
      display:       'inline-flex',
      flexDirection: 'column',
      alignItems:    'center',
      gap:           dim.gap,
      width:         'max-content',
    }}>
      {leadingLabel && (
        <div style={{ ...captionStyle, textAlign: 'center' }}>{leadingLabel}</div>
      )}
      {buttonEl}
      {bottomLabel && (
        <div style={{ ...captionStyle, textAlign: 'center', maxWidth: 120 }}>{bottomLabel}</div>
      )}
    </div>
  );
};

export default ToggleButton;