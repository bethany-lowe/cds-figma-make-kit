import React, { type ReactNode } from "react";
import styles from "./Pill.module.css";
import iconManifest from "../../../imports/icon-manifest.json";

// ── Types ─────────────────────────────────────────────────────
export type PillState    = "unselected" | "selected" | "selected-high";
export type PillEmphasis = "default" | "high";

export interface PillProps {
  /** Text label displayed inside the pill. */
  label: string;
  /**
   * Visual state.
   * - `"unselected"`    → neutral subtle surface, no border
   * - `"selected"`      → primary subtle surface, primary border
   * - `"selected-high"` → primary filled surface, inverse text
   * Defaults to `"unselected"`.
   */
  state?: PillState;
  /** Optional leading icon (use `<PillIcon>` or any 24×24 ReactNode). */
  leadingIcon?: ReactNode;
  /** Optional trailing icon (use `<PillIcon>` or any 24×24 ReactNode). */
  trailingIcon?: ReactNode;
  /** Called when the pill is pressed (no-op when disabled). */
  onClick?: () => void;
  /** Renders the pill in its disabled visual state. Defaults to `false`. */
  disabled?: boolean;
  /** Extra class applied to the root button. */
  className?: string;
}

export interface PillGroupOption {
  /** Unique option identifier. */
  value: string;
  /** Display label. */
  label: string;
  /** Optional leading icon node. */
  leadingIcon?: ReactNode;
  /** Optional trailing icon node. */
  trailingIcon?: ReactNode;
  /** Marks this option as non-interactive. */
  disabled?: boolean;
}

export interface PillGroupProps {
  /** Ordered list of selectable options. */
  options: PillGroupOption[];
  /**
   * Currently selected value(s).
   * Pass a `string` for single-select, `string[]` for multi-select.
   */
  value?: string | string[] | null;
  /** Called with the new value (or `null` if deselected in single-select mode). */
  onChange?: (v: string | string[] | null) => void;
  /** Allows multiple pills to be selected simultaneously. Defaults to `false`. */
  multiSelect?: boolean;
  /**
   * Selection emphasis level.
   * - `"default"` → selected pills use `selected` state (subtle primary)
   * - `"high"`    → selected pills use `selected-high` state (bold primary fill)
   */
  emphasis?: PillEmphasis;
  /** Extra class applied to the group wrapper. */
  className?: string;
}

// ── Icon helper ───────────────────────────────────────────────

/**
 * Renders a 24×24 icon from the CDS icon manifest at `currentColor`.
 * Pass any key from `/src/imports/icon-manifest.json`, e.g.
 * `<PillIcon name="abstractLocation/Line" />`.
 */
export function PillIcon({ name }: { name: string }) {
  const manifest = iconManifest as Record<string, { svg: string }>;
  const raw = manifest[name]?.svg ?? "";
  if (!raw) return null;
  return (
    <span
      className={styles.iconSlot}
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: raw }}
    />
  );
}

// ── State class map ───────────────────────────────────────────

const STATE_CLS: Record<PillState, string> = {
  "unselected":    styles.unselected,
  "selected":      styles.selected,
  "selected-high": styles.selectedHigh,
};

// ── Pill ──────────────────────────────────────────────────────

export const Pill: React.FC<PillProps> = ({
  label,
  state    = "unselected",
  leadingIcon,
  trailingIcon,
  onClick,
  disabled  = false,
  className,
}) => {
  const rootCls = [
    styles.pill,
    STATE_CLS[state],
    disabled ? styles.disabled : undefined,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      className={rootCls}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      aria-pressed={state !== "unselected"}
    >
      {leadingIcon}
      <span>{label}</span>
      {trailingIcon}
    </button>
  );
};

// ── PillGroup ─────────────────────────────────────────────────

export const PillGroup: React.FC<PillGroupProps> = ({
  options,
  value,
  onChange,
  multiSelect = false,
  emphasis    = "default",
  className,
}) => {
  function getState(optValue: string): PillState {
    const isSelected = multiSelect
      ? Array.isArray(value) && value.includes(optValue)
      : value === optValue;
    if (!isSelected) return "unselected";
    return emphasis === "high" ? "selected-high" : "selected";
  }

  function handleClick(optValue: string) {
    if (!onChange) return;
    if (multiSelect) {
      const current = Array.isArray(value) ? value : [];
      if (current.includes(optValue)) {
        onChange(current.filter(v => v !== optValue));
      } else {
        onChange([...current, optValue]);
      }
    } else {
      onChange(value === optValue ? null : optValue);
    }
  }

  return (
    <div
      className={[styles.group, className].filter(Boolean).join(" ")}
      role="group"
    >
      {options.map(opt => (
        <Pill
          key={opt.value}
          label={opt.label}
          state={getState(opt.value)}
          leadingIcon={opt.leadingIcon}
          trailingIcon={opt.trailingIcon}
          disabled={opt.disabled}
          onClick={() => handleClick(opt.value)}
        />
      ))}
    </div>
  );
};

export default Pill;
