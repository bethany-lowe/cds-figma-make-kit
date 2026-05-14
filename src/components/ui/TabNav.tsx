/**
 * TabNav — CDS Component
 *
 * Horizontal navigation between multiple peer content sections
 * within a single screen. Displays a row of labeled tabs with a
 * 2 px underline indicator that smoothly slides to the active tab.
 *
 * Spec:
 *  - 46 px tab height
 *  - 24 px gap between tab items
 *  - Content-driven tab widths
 *  - 18 px wide, 2 px tall underline indicator (left-aligned, rounded)
 *  - Active: --text-primary text + underline
 *  - Inactive: --text-neutral text, no underline
 *  - Underline animates via Motion layoutId (180 ms ease-out)
 *  - Keyboard: left / right arrow keys navigate within the group
 *  - ARIA: role="tablist" / role="tab" / aria-selected
 */

import { useId } from 'react';
import { motion, LayoutGroup } from 'motion/react';

// ── Types ──────────────────────────────────────────────────────

export interface TabItem {
  id:     string;
  label:  string;
  /** Optional badge count shown after the label (e.g. unread messages). */
  badge?: number;
}

export interface TabNavProps {
  tabs:         TabItem[];
  activeTab?:   string;
  onTabChange?: (id: string) => void;
  className?:   string;
}

// ── Component ──────────────────────────────────────────────────

export function TabNav({
  tabs,
  activeTab,
  onTabChange,
  className = '',
}: TabNavProps) {
  // Unique id so multiple TabNav instances on one page don't share
  // the same layoutId and animate into each other.
  const uid = useId();

  const handleKeyDown = (e: React.KeyboardEvent, idx: number) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      const next = (idx + 1) % tabs.length;
      onTabChange?.(tabs[next].id);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const prev = (idx - 1 + tabs.length) % tabs.length;
      onTabChange?.(tabs[prev].id);
    }
  };

  return (
    <LayoutGroup id={uid}>
      <div
        role="tablist"
        className={className}
        style={{
          display:    'flex',
          gap:        '24px',
          alignItems: 'flex-end',
        }}
      >
        {tabs.map((tab, idx) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              aria-label={`${tab.label}${tab.badge != null ? `, ${tab.badge} items` : ''}`}
              // Roving tabindex: active tab is the tab stop for the group
              tabIndex={isActive ? 0 : -1}
              onClick={() => onTabChange?.(tab.id)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              style={{
                display:       'flex',
                flexDirection: 'column',
                height:        '46px',
                alignItems:    'flex-start',
                justifyContent:'space-between',
                paddingTop:    '8px',
                paddingBottom: '0',
                background:    'none',
                border:        'none',
                cursor:        'pointer',
                outline:       'none',
                position:      'relative',
                WebkitTapHighlightColor: 'transparent',
              }}
            >
              {/* Label row */}
              <div
                style={{
                  display:    'flex',
                  alignItems: 'center',
                  gap:        '6px',
                  paddingBottom: '2px',
                }}
              >
                <span
                  style={{
                    color:          isActive
                      ? 'var(--text-primary, #4B286D)'
                      : 'var(--text-neutral, #54595F)',
                    fontSize:       '15px',
                    fontWeight:     600,
                    letterSpacing:  '-0.4px',
                    lineHeight:     '20px',
                    whiteSpace:     'nowrap',
                    transition:     'color 180ms ease-out',
                  }}
                >
                  {tab.label}
                </span>

                {/* Badge — trailing count indicator */}
                {tab.badge != null && tab.badge > 0 && (
                  <span
                    style={{
                      display:         'inline-flex',
                      alignItems:      'center',
                      justifyContent:  'center',
                      minWidth:        '18px',
                      height:          '18px',
                      borderRadius:    '999px',
                      padding:         '0 5px',
                      fontSize:        '11px',
                      fontWeight:      700,
                      lineHeight:      1,
                      backgroundColor: isActive
                        ? 'var(--text-primary, #4B286D)'
                        : 'var(--background-neutral-subtle, rgba(0,0,0,0.07))',
                      color: isActive
                        ? '#ffffff'
                        : 'var(--text-neutral, #54595F)',
                      transition: 'background-color 180ms ease-out, color 180ms ease-out',
                    }}
                  >
                    {tab.badge}
                  </span>
                )}
              </div>

              {/* Underline indicator — 18 px wide, 2 px tall, left-anchored.
                  motion layoutId makes it slide smoothly between active tabs. */}
              <div style={{ width: '100%', height: '3px', display: 'flex', alignItems: 'flex-end', marginBottom: '-1px' }}>
                {isActive && (
                  <motion.div
                    layoutId={`${uid}-underline`}
                    style={{
                      height:          '2px',
                      width:           '18px',
                      backgroundColor: 'var(--text-primary, #4B286D)',
                      borderRadius:    '40px',
                    }}
                    transition={{ duration: 0.18, ease: 'easeOut' }}
                  />
                )}
              </div>
            </button>
          );
        })}
      </div>
    </LayoutGroup>
  );
}

export default TabNav;