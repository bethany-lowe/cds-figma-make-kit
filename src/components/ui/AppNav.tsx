/**
 * AppNav — CDS Component
 *
 * Bottom navigation bar for TELUS SmartHome+ mobile apps.
 * Two variants: standard (4 tabs) and ai (2+AI+2 tabs).
 * Two platform renders: ios (HIG) and android (Material 3).
 *
 * Icons sourced from /src/imports/icon-manifest.json.
 * Line style = inactive, Solid style = active.
 *
 * iOS HIG:
 *  - Frosted glass translucent bar (backdrop-blur 25 px + rgba bg)
 *  - 49 px content area + 34 px safe-area padding-bottom = 83 px total
 *  - SF Pro font, 10 px labels below icons
 *  - Active: solid icon + --text-primary
 *  - Inactive: line icon + --text-neutral
 *  - AI button floats 38 px above bar at center
 *
 * Android Material 3:
 *  - Solid tonal surface, two-layer box-shadow elevation
 *  - 80 px bar height
 *  - Active indicator: 64 × 32 dp pill (--background-primary-subtle)
 *  - 12 px Roboto labels, bold when active
 *  - AI button floats 34 px above bar at center
 */

import iconManifest from '../../../imports/icon-manifest.json';
import { AiAssistantButton } from './AiAssistantButton';

// ── Types ─────────────────────────────────────────────────────
export type AppNavVariant  = 'standard' | 'ai';
export type AppNavPlatform = 'ios' | 'android';

export interface AppNavProps {
  variant?:     AppNavVariant;
  platform?:    AppNavPlatform;
  activeTab?:   'home' | 'services' | 'manage' | 'settings';
  onTabChange?: (tab: string) => void;
  className?:   string;
  /** Bar width in px. Defaults to 390 (iPhone 14 logical pixels). */
  width?:       number;
}

// ── Icon renderer — CDS manifest ──────────────────────────────
// Looks up the Line or Solid variant from the icon manifest and
// renders the inline SVG. `color` is applied as a CSS custom
// property so the `fill="currentColor"` paths pick it up.
function NavIcon({
  iconKey,
  color,
}: {
  iconKey: string;
  color:   string;
}) {
  const entry = (iconManifest as Record<string, { svg: string }>)[iconKey];
  if (!entry) return null;
  return (
    <span
      aria-hidden="true"
      style={{ color, display: 'flex', alignItems: 'center', flexShrink: 0 }}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: entry.svg }}
    />
  );
}

// ── Tab definitions ───────────────────────────────────────────
// Each tab has a Line (inactive) and Solid (active) icon key,
// both sourced from the CDS icon library manifest.
const TABS = [
  {
    id:       'home',
    label:    'Home',
    lineKey:  'homeHouse/Line',
    solidKey: 'homeHouse/Solid',
  },
  {
    id:       'services',
    label:    'Services',
    lineKey:  'abstractActivity/Line',
    solidKey: 'abstractActivity/Solid',
  },
  {
    id:       'manage',
    label:    'Manage',
    lineKey:  'homeDeviceGroup/Line',
    solidKey: 'homeDeviceGroup/Solid',
  },
  {
    id:       'settings',
    label:    'Settings',
    lineKey:  'objectGear/Line',
    solidKey: 'objectGear/Solid',
  },
] as const;

type TabId = typeof TABS[number]['id'];

const LEFT_TABS  = TABS.slice(0, 2);
const RIGHT_TABS = TABS.slice(2);

// ── Platform colour tokens ────────────────────────────────────
const ACTIVE_COLOR   = 'var(--text-primary, #4B286D)';
const INACTIVE_COLOR = 'var(--text-neutral, #54595F)';

// ── iOS Tab Item ──────────────────────────────────────────────
function IosTabItem({
  tab,
  isActive,
  onClick,
}: {
  tab:      typeof TABS[number];
  isActive: boolean;
  onClick:  () => void;
}) {
  const color = isActive ? ACTIVE_COLOR : INACTIVE_COLOR;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={tab.label}
      aria-current={isActive ? 'page' : undefined}
      style={{
        display:       'flex',
        flexDirection: 'column',
        alignItems:    'center',
        gap:           '3px',
        width:         '56px',
        padding:       '6px 0 0',
        background:    'none',
        border:        'none',
        cursor:        'pointer',
        WebkitTapHighlightColor: 'transparent',
      }}
    >
      <NavIcon
        iconKey={isActive ? tab.solidKey : tab.lineKey}
        color={color}
      />
      <span
        style={{
          fontFamily: '-apple-system, "SF Pro Text", sans-serif',
          fontSize:   '10px',
          fontWeight: isActive ? 600 : 400,
          color,
          lineHeight: 1,
          whiteSpace: 'nowrap',
        }}
      >
        {tab.label}
      </span>
    </button>
  );
}

// ── Android Tab Item ──────────────────────────────────────────
function AndroidTabItem({
  tab,
  isActive,
  onClick,
}: {
  tab:      typeof TABS[number];
  isActive: boolean;
  onClick:  () => void;
}) {
  const color = isActive ? ACTIVE_COLOR : INACTIVE_COLOR;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={tab.label}
      aria-current={isActive ? 'page' : undefined}
      style={{
        display:       'flex',
        flexDirection: 'column',
        alignItems:    'center',
        gap:           '4px',
        flex:          1,
        padding:       '12px 0 0',
        background:    'none',
        border:        'none',
        cursor:        'pointer',
        WebkitTapHighlightColor: 'transparent',
      }}
    >
      {/* Active indicator pill — M3 NavigationBar spec */}
      <div
        style={{
          display:         'flex',
          alignItems:      'center',
          justifyContent:  'center',
          width:           '64px',
          height:          '32px',
          borderRadius:    'var(--radius-full, 9999px)',
          backgroundColor: isActive
            ? 'var(--background-primary-subtle, #EDE1F5)'
            : 'transparent',
          transition: 'background-color 180ms ease-out',
        }}
      >
        <NavIcon
          iconKey={isActive ? tab.solidKey : tab.lineKey}
          color={color}
        />
      </div>
      <span
        style={{
          fontFamily: '"Roboto", "Google Sans", sans-serif',
          fontSize:   '12px',
          fontWeight: isActive ? 700 : 400,
          color,
          lineHeight: 1,
          whiteSpace: 'nowrap',
        }}
      >
        {tab.label}
      </span>
    </button>
  );
}

// ── iOS Standard Bar ──────────────────────────────────────────
function IosStandardBar({
  activeTab,
  onTabChange,
  width,
}: {
  activeTab:   string;
  onTabChange: (id: string) => void;
  width:       number;
}) {
  return (
    <div
      style={{
        position:             'relative',
        width:                `${width}px`,
        height:               '83px',
        backgroundColor:      'rgba(244, 244, 247, 0.85)',
        backdropFilter:       'blur(25px)',
        WebkitBackdropFilter: 'blur(25px)',
        boxShadow:            '0px -1px 0px rgba(0,0,0,0.08)',
        display:              'flex',
        alignItems:           'flex-start',
        justifyContent:       'space-around',
        paddingTop:           '7px',
        paddingBottom:        '34px',
        boxSizing:            'border-box',
      }}
    >
      {TABS.map(tab => (
        <IosTabItem
          key={tab.id}
          tab={tab}
          isActive={activeTab === tab.id}
          onClick={() => onTabChange(tab.id)}
        />
      ))}
    </div>
  );
}

// ── iOS AI Bar ────────────────────────────────────────────────
function IosAiBar({
  activeTab,
  onTabChange,
  onAiClick,
  width,
}: {
  activeTab:   string;
  onTabChange: (id: string) => void;
  onAiClick:   () => void;
  width:       number;
}) {
  return (
    <div
      style={{
        position:             'relative',
        width:                `${width}px`,
        height:               '83px',
        backgroundColor:      'rgba(244, 244, 247, 0.85)',
        backdropFilter:       'blur(25px)',
        WebkitBackdropFilter: 'blur(25px)',
        boxShadow:            '0px -1px 0px rgba(0,0,0,0.08)',
        display:              'flex',
        alignItems:           'flex-start',
        paddingTop:           '7px',
        paddingBottom:        '34px',
        paddingLeft:          '16px',
        paddingRight:         '16px',
        boxSizing:            'border-box',
      }}
    >
      {/* Left pair — flex: 1 so it shares the space equally with the right pair */}
      <div style={{ display: 'flex', flex: 1, justifyContent: 'space-around' }}>
        {LEFT_TABS.map(tab => (
          <IosTabItem
            key={tab.id}
            tab={tab}
            isActive={activeTab === tab.id}
            onClick={() => onTabChange(tab.id)}
          />
        ))}
      </div>

      {/* Centre dead-zone — reserves space for the AI button + breathing room.
          The button itself is position:absolute so it doesn't push the tabs,
          but this spacer prevents them from overlapping it. */}
      <div style={{ width: '100px', flexShrink: 0 }} />

      {/* AI button — floats above bar */}
      <div
        style={{
          position:       'absolute',
          left:           '50%',
          transform:      'translateX(-50%)',
          top:            '-38px',
          display:        'flex',
          alignItems:     'flex-end',
          justifyContent: 'center',
          width:          '90px',
          height:         '88px',
          paddingBottom:  '8px',
          overflow:       'visible',
        }}
      >
        <AiAssistantButton
          state="default"
          size="default"
          onClick={onAiClick}
          aria-label="AI Assistant"
        />
      </div>

      {/* Right pair */}
      <div style={{ display: 'flex', flex: 1, justifyContent: 'space-around' }}>
        {RIGHT_TABS.map(tab => (
          <IosTabItem
            key={tab.id}
            tab={tab}
            isActive={activeTab === tab.id}
            onClick={() => onTabChange(tab.id)}
          />
        ))}
      </div>
    </div>
  );
}

// ── Android Standard Bar ──────────────────────────────────────
function AndroidStandardBar({
  activeTab,
  onTabChange,
  width,
}: {
  activeTab:   string;
  onTabChange: (id: string) => void;
  width:       number;
}) {
  return (
    <div
      style={{
        position:        'relative',
        width:           `${width}px`,
        height:          '80px',
        backgroundColor: 'var(--background-app, #ffffff)',
        boxShadow:       '0px -1px 3px rgba(0,0,0,0.08), 0px -4px 8px rgba(0,0,0,0.04)',
        display:         'flex',
        alignItems:      'flex-start',
        justifyContent:  'space-around',
        boxSizing:       'border-box',
      }}
    >
      {TABS.map(tab => (
        <AndroidTabItem
          key={tab.id}
          tab={tab}
          isActive={activeTab === tab.id}
          onClick={() => onTabChange(tab.id)}
        />
      ))}
    </div>
  );
}

// ── Android AI Bar ────────────────────────────────────────────
function AndroidAiBar({
  activeTab,
  onTabChange,
  onAiClick,
  width,
}: {
  activeTab:   string;
  onTabChange: (id: string) => void;
  onAiClick:   () => void;
  width:       number;
}) {
  return (
    <div
      style={{
        position:        'relative',
        width:           `${width}px`,
        height:          '80px',
        backgroundColor: 'var(--background-app, #ffffff)',
        boxShadow:       '0px -1px 3px rgba(0,0,0,0.08), 0px -4px 8px rgba(0,0,0,0.04)',
        display:         'flex',
        alignItems:      'flex-start',
        boxSizing:       'border-box',
        paddingLeft:     '16px',
        paddingRight:    '16px',
      }}
    >
      {/* Left pair */}
      <div style={{ display: 'flex', flex: 1, justifyContent: 'space-around' }}>
        {LEFT_TABS.map(tab => (
          <AndroidTabItem
            key={tab.id}
            tab={tab}
            isActive={activeTab === tab.id}
            onClick={() => onTabChange(tab.id)}
          />
        ))}
      </div>

      {/* AI button — floats above center */}
      <div
        style={{
          position:       'absolute',
          left:           '50%',
          transform:      'translateX(-50%)',
          top:            '-34px',
          display:        'flex',
          flexDirection:  'column',
          alignItems:     'center',
          gap:            '4px',
          overflow:       'visible',
        }}
      >
        <AiAssistantButton
          state="default"
          size="default"
          onClick={onAiClick}
          aria-label="AI Assistant"
        />
      </div>

      {/* Center spacer */}
      <div style={{ width: '80px', flexShrink: 0 }} />

      {/* Right pair */}
      <div style={{ display: 'flex', flex: 1, justifyContent: 'space-around' }}>
        {RIGHT_TABS.map(tab => (
          <AndroidTabItem
            key={tab.id}
            tab={tab}
            isActive={activeTab === tab.id}
            onClick={() => onTabChange(tab.id)}
          />
        ))}
      </div>
    </div>
  );
}

// ── Public component ──────────────────────────────────────────
export function AppNav({
  variant    = 'standard',
  platform   = 'ios',
  activeTab  = 'home',
  onTabChange,
  className  = '',
  width      = 390,
}: AppNavProps) {
  const handleTabChange = (id: string) => onTabChange?.(id);
  const handleAiClick   = () => { /* consumer controls AI panel open/close */ };

  return (
    <div
      className={className}
      style={{
        display:       'inline-flex',
        flexDirection: 'column',
        position:      'relative',
        width:         `${width}px`,
        overflow:      variant === 'ai' ? 'visible' : 'hidden',
      }}
    >
      {platform === 'ios' ? (
        variant === 'ai' ? (
          <IosAiBar
            activeTab={activeTab}
            onTabChange={handleTabChange}
            onAiClick={handleAiClick}
            width={width}
          />
        ) : (
          <IosStandardBar
            activeTab={activeTab}
            onTabChange={handleTabChange}
            width={width}
          />
        )
      ) : (
        variant === 'ai' ? (
          <AndroidAiBar
            activeTab={activeTab}
            onTabChange={handleTabChange}
            onAiClick={handleAiClick}
            width={width}
          />
        ) : (
          <AndroidStandardBar
            activeTab={activeTab}
            onTabChange={handleTabChange}
            width={width}
          />
        )
      )}
    </div>
  );
}

export default AppNav;