import React, { useId } from 'react';
import styles from './Radio.module.css';

// ── Types ──────────────────────────────────────────────────────
export type RadioSize = 'medium' | 'small';

export interface RadioProps {
  /** Label shown beside the radio control */
  label?: string;
  /** Controlled checked state */
  checked?: boolean;
  /** Uncontrolled initial checked state */
  defaultChecked?: boolean;
  /** Disables interaction and applies muted token styles */
  disabled?: boolean;
  /** Size scale — medium (28 px control) or small (20 px control) */
  size?: RadioSize;
  /** HTML radio group name */
  name?: string;
  /** HTML radio value */
  value?: string;
  /** Change handler (controlled usage) */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /** Extra class names on the wrapper element */
  className?: string;
}

// ── Radio ──────────────────────────────────────────────────────
export function Radio({
  label,
  checked,
  defaultChecked,
  disabled = false,
  size = 'medium',
  name,
  value,
  onChange,
  className = '',
}: RadioProps) {
  const id = useId();

  const rootCls = [
    styles.root,
    styles[size],
    disabled ? styles.disabled : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <label htmlFor={id} className={rootCls}>
      {/* Hidden native input — drives :checked / :disabled CSS selectors */}
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        checked={checked}
        defaultChecked={defaultChecked}
        disabled={disabled}
        onChange={onChange}
        className={styles.input}
      />

      {/* Custom visual control — styled via adjacent-sibling selectors */}
      <span className={styles.control} aria-hidden="true" />

      {/* Label text */}
      {label && (
        <span className={styles.textWrap}>
          <span className={styles.label}>{label}</span>
        </span>
      )}
    </label>
  );
}

export default Radio;