/**
 * SingleInputField — CDS Component
 *
 * Single-line text input following the CDS TextInputField spec.
 * Sub-components: FeedbackCaption (inline validation)
 * Icons: actionClose/Line from icon-manifest (clear button)
 *
 * States: enabled · active · disabled · read-only
 * Slots:  label · (Required) · counter · container · placeholder/value · caption
 *
 * Focus state (active border) is handled entirely by CSS :focus-within on the container.
 */

import { useId, useRef } from 'react';
import { FeedbackCaption } from './FeedbackCaption';
import iconManifest from '../../../imports/icon-manifest.json';
import styles from './SingleInputField.module.css';

// ── Icon helper — pulls SVG string from manifest ──────────────
function ManifestIcon({ name, size = 18 }: { name: string; size?: number }) {
  const manifest = iconManifest as Record<string, { svg: string }>;
  const raw = manifest[name]?.svg ?? '';
  if (!raw) return null;
  const sized = raw
    .replace(/width="24"/, `width="${size}"`)
    .replace(/height="24"/, `height="${size}"`);
  return (
    <span
      dangerouslySetInnerHTML={{ __html: sized }}
      style={{ display: 'flex', alignItems: 'center' }}
      aria-hidden="true"
    />
  );
}

// ── Types ─────────────────────────────────────────────────────
export type InputFieldState = 'enabled' | 'active' | 'disabled' | 'read-only';

export interface SingleInputFieldProps {
  /** Input id — auto-generated if omitted */
  id?: string;
  /** Visible label — always shown */
  label: string;
  /** Appends "(Required)" to the label row */
  required?: boolean;
  /** Show the character counter string in the label row */
  showCounter?: boolean;
  /** Counter string e.g. "14/50". Component parses x/y to detect the limit. */
  counter?: string;
  /** Input placeholder text */
  placeholder?: string;
  /** Controlled value */
  value: string;
  /** Change handler */
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** Optional callback when the clear button is pressed */
  onClear?: () => void;
  /** Field state */
  state?: InputFieldState;
  /** Hint text shown below the field (before interaction) */
  hint?: string;
  /** Show the hint text */
  showHint?: boolean;
  /** Dynamic validation caption. Pass null/undefined to hide. */
  caption?: { status: 'info' | 'success' | 'error'; text: string } | null;
  /** Extra class names */
  className?: string;
}

// ── Helpers ───────────────────────────────────────────────────
function parseCounterAtLimit(counter?: string): boolean {
  if (!counter) return false;
  const parts = counter.split('/');
  if (parts.length !== 2) return false;
  const cur = parseInt(parts[0], 10);
  const max = parseInt(parts[1], 10);
  if (isNaN(cur) || isNaN(max) || max === 0) return false;
  return cur >= max;
}

// ── Component ─────────────────────────────────────────────────
export function SingleInputField({
  id: idProp,
  label,
  required = false,
  showCounter = false,
  counter,
  placeholder,
  value,
  onChange,
  onClear,
  state = 'enabled',
  hint,
  showHint = false,
  caption,
  className = '',
}: SingleInputFieldProps) {
  const autoId    = useId();
  const inputId   = idProp ?? `sif-${autoId}`;
  const captionId = `${inputId}-caption`;
  const hintId    = `${inputId}-hint`;

  const inputRef = useRef<HTMLInputElement>(null);

  const isDisabled = state === 'disabled';
  const isReadOnly = state === 'read-only';
  const atLimit    = parseCounterAtLimit(counter);

  const containerClasses = [
    styles.container,
    isDisabled         ? styles.disabled    : '',
    isReadOnly         ? styles.readOnly    : '',
    state === 'active' ? styles.activeState : '',
  ].filter(Boolean).join(' ');

  // aria-describedby — hint XOR caption (never both per spec)
  const describedBy = caption ? captionId : (showHint && hint) ? hintId : undefined;

  return (
    <div className={[styles.root, className].filter(Boolean).join(' ')}>

      {/* ── Label row ──────────────────────────────────────── */}
      <div className={styles.labelRow}>
        <label className={styles.label} htmlFor={inputId}>
          {label}
        </label>
        {required && (
          <span className={styles.required} aria-hidden="true">
            (Required)
          </span>
        )}
        {showCounter && counter && (
          <span
            className={[styles.counter, atLimit ? styles.atLimit : ''].filter(Boolean).join(' ')}
            aria-live="polite"
          >
            {counter}
          </span>
        )}
      </div>

      {/* ── Input container ─────────────────────────────────── */}
      <div className={containerClasses}>
        <input
          ref={inputRef}
          id={inputId}
          type="text"
          className={styles.input}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={isDisabled}
          readOnly={isReadOnly}
          required={required}
          aria-required={required}
          aria-invalid={caption?.status === 'error' ? true : undefined}
          aria-describedby={describedBy}
        />

        {/* Clear button — shown only when enabled/active with a value */}
        {!isDisabled && !isReadOnly && value.length > 0 && (
          <button
            type="button"
            className={styles.clearBtn}
            aria-label="Clear input"
            tabIndex={-1}
            onMouseDown={e => {
              e.preventDefault(); // keep focus on input
              if (onClear) {
                onClear();
              } else {
                // Synthesise native input event so React state updates
                const el = inputRef.current;
                if (el) {
                  const setter = Object.getOwnPropertyDescriptor(
                    window.HTMLInputElement.prototype, 'value'
                  )?.set;
                  setter?.call(el, '');
                  el.dispatchEvent(new Event('input', { bubbles: true }));
                }
              }
            }}
          >
            <ManifestIcon name="actionClose/Line" size={16} />
          </button>
        )}
      </div>

      {/* ── Hint (pre-interaction) ───────────────────────────── */}
      {showHint && hint && !caption && (
        <span id={hintId} className={styles.hint}>
          {hint}
        </span>
      )}

      {/* ── Caption (dynamic validation) ─────────────────────── */}
      {caption && (
        <span id={captionId}>
          <FeedbackCaption variant={caption.status}>
            {caption.text}
          </FeedbackCaption>
        </span>
      )}

    </div>
  );
}

export default SingleInputField;
