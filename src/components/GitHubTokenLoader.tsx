/**
 * GitHubTokenLoader — token source indicator
 *
 * The CDS token files (base.css, brand-telus.css, brand-homi.css,
 * platform-web.css, components.css) are imported statically via
 * src/styles/index.css, so no runtime fetch is needed.
 *
 * Brand switching is handled automatically by ThemeContext, which sets
 * data-brand on <html> — the brand CSS files use [data-brand="..."]
 * attribute selectors, so they respond instantly with no JS involvement.
 *
 * This component just renders the status badge so the UI reflects the
 * correct token source.
 */

import { CheckCircle2 } from 'lucide-react';

export function GitHubTokenLoader() {
  return (
    <div
      style={{
        position:        'fixed',
        bottom:          24,
        right:           24,
        zIndex:          200,
        display:         'flex',
        alignItems:      'center',
        gap:             6,
        padding:         '5px 11px',
        borderRadius:    999,
        backgroundColor: '#f0fdf4',
        border:          '1px solid #bbf7d0',
        color:           '#15803d',
        fontSize:        11,
        fontWeight:      600,
        boxShadow:       '0 1px 4px rgba(0,0,0,0.08)',
        pointerEvents:   'none',
        userSelect:      'none',
        fontFamily:      'ui-sans-serif, system-ui, sans-serif',
        whiteSpace:      'nowrap',
      }}
    >
      <CheckCircle2 size={11} />
      <span>cds-tokens · local</span>
    </div>
  );
}
