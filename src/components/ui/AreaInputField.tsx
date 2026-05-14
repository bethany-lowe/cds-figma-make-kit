/**
 * AreaInputField — CDS Component
 *
 * Multi-line textarea input following the CDS TextInputField spec (area variant).
 * Sub-components: FeedbackCaption (inline validation)
 * Icons: icon-manifest (currentColor fill)
 *
 * States: enabled · active · disabled · read-only
 * Slots:  label · (Required) · counter · container · placeholder/value · caption
 *
 * Focus state (active border) is handled by CSS :focus-within on the container.
 */

import { useId } from 'react';
import { FeedbackCaption } from './FeedbackCaption';
import styles from './AreaInputField.module.css';

// ── Types ─────────────────────────────────────────────────────
export type AreaInputState = 'enabled' | 'active' | 'disabled' | 'read-only';

export interface AreaInputFieldProps {
  id?: string;
  label: string;
  required?: boolean;
  showCounter?: boolean;
  /** Counter string e.g. "0/200" */
  counter?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  state?: AreaInputState;
  hint?: string;
  showHint?: boolean;
  caption?: { status: 'info' | 'success' | 'error'; text: string } | null;
  /** Number of visible rows (min) */
  rows?: number;
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
export function AreaInputField({
  id: idProp,
  label,
  required = false,
  showCounter = false,
  counter,
  placeholder,
  value,
  onChange,
  state = 'enabled',
  hint,
  showHint = false,
  caption,
  rows = 3,
  className = '',
}: AreaInputFieldProps) {
  const autoId    = useId();
  const inputId   = idProp ?? `aif-${autoId}`;
  const captionId = `${inputId}-caption`;
  const hintId    = `${inputId}-hint`;

  const isDisabled = state === 'disabled';
  const isReadOnly = state === 'read-only';
  const atLimit    = parseCounterAtLimit(counter);

  const containerClasses = [
    styles.container,
    isDisabled         ? styles.disabled    : '',
    isReadOnly         ? styles.readOnly    : '',
    state === 'active' ? styles.activeState : '',
  ].filter(Boolean).join(' ');

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

      {/* ── Textarea container ──────────────────────────────── */}
      <div className={containerClasses}>
        <textarea
          id={inputId}
          className={styles.textarea}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={isDisabled}
          readOnly={isReadOnly}
          required={required}
          rows={rows}
          aria-required={required}
          aria-invalid={caption?.status === 'error' ? true : undefined}
          aria-describedby={describedBy}
        />
      </div>

      {/* ── Hint ────────────────────────────────────────────── */}
      {showHint && hint && !caption && (
        <span id={hintId} className={styles.hint}>
          {hint}
        </span>
      )}

      {/* ── Caption ─────────────────────────────────────────── */}
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

export default AreaInputField;
