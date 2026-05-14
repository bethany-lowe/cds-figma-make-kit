import { useState, useEffect } from 'react';
import { LogoFull } from './LogoFull';
import iconManifest from '../../imports/icon-manifest.json';

interface NavItem {
  label: string;
  path: string;
}

interface NavCategory {
  label: string;
  items: NavItem[];
}

interface SidebarProps {
  onNavigate: (path: string) => void;
  currentPath: string;
  isOpen: boolean;
  onClose: () => void;
}

// Static — defined outside so useEffect can reference it without stale closure issues
const CATEGORIES: NavCategory[] = [
  {
    label: 'Overview',
    items: [
      { label: 'Getting Started', path: 'overview' },
      { label: 'Design Tokens',   path: 'overview/design-tokens' },
    ],
  },
  {
    label: 'Foundations',
    items: [
      { label: 'Global Color',   path: 'foundations/global-color'   },
      { label: 'Brand Color',    path: 'foundations/brand-color'    },
      { label: 'Semantic Color', path: 'foundations/semantic-color' },
      { label: 'Typography',     path: 'foundations/typography'     },
      { label: 'Spacing',        path: 'foundations/spacing'        },
      { label: 'Border Width',   path: 'foundations/border-width'   },
      { label: 'Border Radius',  path: 'foundations/border-radius'  },
      { label: 'Elevation',      path: 'foundations/elevation'      },
      { label: 'Dimension',      path: 'foundations/dimension'      },
      { label: 'Layout',         path: 'foundations/layout'         },
    ],
  },
  {
    label: 'Iconography',
    items: [
      { label: 'Icon Library', path: 'iconography/icon-library' },
      { label: 'Icon Size',    path: 'iconography/icon-size'    },
      { label: 'Icon Usage',   path: 'iconography/icon-usage'   },
    ],
  },
  {
    label: 'Components',
    items: [
      { label: 'Button',           path: 'components/button'           },
      { label: 'Button Group',     path: 'components/button-group'     },
      { label: 'Toggle',           path: 'components/toggle'           },
      { label: 'Tag',              path: 'components/tag'              },
      { label: 'Radio',            path: 'components/radio'            },
      { label: 'Checkbox',         path: 'components/checkbox'         },
      { label: 'Feedback Caption', path: 'components/feedback-caption' },
      { label: 'Slider',           path: 'components/slider'           },
      { label: 'Progress Bar',     path: 'components/progress-bar'     },
      { label: 'Banner',           path: 'components/banner'           },
      { label: 'Snackbar',         path: 'components/snackbar'         },
      { label: 'Divider',          path: 'components/divider'          },
      { label: 'Pill',             path: 'components/pill'             },
      { label: 'Input Field',      path: 'components/input-field'      },
      { label: 'AI Assistant',     path: 'components/ai-assistant'     },
      { label: 'App Navigation',   path: 'components/app-nav'          },
      { label: 'Tab Navigation',   path: 'components/tab-nav'          },
      { label: 'Component Kit',    path: 'components/kit'              },
    ],
  },
  {
    label: 'Patterns',
    items: [
      { label: 'Navigation', path: 'patterns/navigation' },
      { label: 'Forms',      path: 'patterns/forms'      },
    ],
  },
  {
    label: 'Education',
    items: [
      { label: 'Best Practices', path: 'education/best-practices' },
      { label: 'Accessibility',  path: 'education/accessibility'  },
    ],
  },
  {
    label: 'Utility',
    items: [
      { label: 'Doc Annotations', path: 'utility/doc-annotations' },
      { label: 'Doc Template',    path: 'utility/doc-template'    },
      { label: 'Resources',       path: 'utility/resources'       },
      { label: 'Changelog',       path: 'utility/changelog'       },
    ],
  },
  {
    label: 'Brand Expression',
    items: [
      { label: 'Brand Palette', path: 'brand-expression/brand-palette' },
    ],
  },
];

function activeCategory(path: string): string | null {
  const match = CATEGORIES.find(cat => cat.items.some(item => item.path === path));
  return match?.label ?? null;
}

export function Sidebar({ onNavigate, currentPath, isOpen, onClose }: SidebarProps) {
  // Start collapsed; open only the section that owns the current route
  const [expandedCategories, setExpandedCategories] = useState<string[]>(() => {
    const initial = activeCategory(currentPath);
    return initial ? [initial] : [];
  });

  // Expand (but don't collapse) the section when navigation changes it
  useEffect(() => {
    const cat = activeCategory(currentPath);
    if (cat) {
      setExpandedCategories(prev =>
        prev.includes(cat) ? prev : [...prev, cat],
      );
    }
  }, [currentPath]);

  const toggleCategory = (label: string) => {
    setExpandedCategories(prev =>
      prev.includes(label)
        ? prev.filter(cat => cat !== label)
        : [...prev, label],
    );
  };

  const handleNavigate = (path: string) => {
    onNavigate(path);
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={`
          w-64 h-screen flex flex-col overflow-y-auto
          fixed lg:sticky top-0 z-50 transition-transform duration-300
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
        style={{ backgroundColor: '#FAFAFA' }}
      >
        <div className="px-6 py-6 flex items-center justify-between">
          <LogoFull />
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 hover:bg-gray-100 rounded transition-colors"
          >
            <span className="sr-only">Close menu</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
            </svg>
          </button>
        </div>

        <nav className="flex-1 px-3 py-4">
          {CATEGORIES.map((category) => {
            const isExpanded = expandedCategories.includes(category.label);
            const chevronSvg = (iconManifest as Record<string, { svg: string }>)['arrowChevronDown/Line']?.svg
              ?.replace(/width="24"/, 'width="16"')
              .replace(/height="24"/, 'height="16"');

            return (
              <div key={category.label} className="mb-1">
                <button
                  onClick={() => toggleCategory(category.label)}
                  className="flex items-center justify-between w-full text-left px-3 py-2 hover:bg-gray-50 rounded-xl transition-colors group"
                >
                  <span className="text-sm text-gray-900">{category.label}</span>
                  {chevronSvg && (
                    <span
                      className="text-gray-400 group-hover:text-gray-600 flex-shrink-0"
                      style={{
                        display: 'block',
                        width: 16,
                        height: 16,
                        transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 200ms ease, color 150ms ease',
                      }}
                      dangerouslySetInnerHTML={{ __html: chevronSvg }}
                    />
                  )}
                </button>

                {isExpanded && (
                  <ul className="mt-1 mb-2">
                    {category.items.map((item) => (
                      <li key={item.path}>
                        <button
                          onClick={() => handleNavigate(item.path)}
                          className={`w-full text-left px-3 py-2 pl-6 text-sm rounded-xl transition-colors ${
                            currentPath === item.path
                              ? 'text-gray-900 bg-gray-100'
                              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                          }`}
                        >
                          {item.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </nav>
      </aside>
    </>
  );
}