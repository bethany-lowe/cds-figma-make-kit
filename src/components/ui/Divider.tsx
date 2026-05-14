import React from "react";
import styles from "./Divider.module.css";

// ── Types ────────────────────────────────────────────────────
export type DividerOrientation = "horizontal" | "vertical";
export type DividerWeight      = "hairline" | "thin" | "thick";
export type DividerSpacing     = "none" | "small" | "medium" | "large";
export type DividerEmphasis    = "low" | "default" | "high";

export interface DividerProps {
  /** Horizontal (default) or vertical layout. */
  orientation?: DividerOrientation;
  /** Line thickness. Defaults to `"thin"`. */
  weight?: DividerWeight;
  /** Whitespace on either side of the divider. Defaults to `"medium"`. */
  spacing?: DividerSpacing;
  /**
   * Line colour emphasis.
   * - `"low"`     → `--cds-border-neutral-subtle`
   * - `"default"` → `--cds-border-neutral`
   * - `"high"`    → `--cds-border-neutral-bold`
   */
  emphasis?: DividerEmphasis;
  /** Optional label centred between two line segments. */
  label?: string;
  /** Extra class applied to the root element. */
  className?: string;
}

// ── Class-name maps ──────────────────────────────────────────
const SPACING_CLS: Record<DividerSpacing, string> = {
  none:   styles.spacingNone,
  small:  styles.spacingSmall,
  medium: styles.spacingMedium,
  large:  styles.spacingLarge,
};

const EMPHASIS_CLS: Record<DividerEmphasis, string | undefined> = {
  low:     styles.emphasisLow,
  default: undefined,
  high:    styles.emphasisHigh,
};

// ── Component ────────────────────────────────────────────────
export const Divider: React.FC<DividerProps> = ({
  orientation = "horizontal",
  weight      = "thin",
  spacing     = "medium",
  emphasis    = "default",
  label,
  className,
}) => {
  const isVertical = orientation === "vertical";

  const rootCls = [
    styles.divider,
    isVertical ? styles.vertical : undefined,
    weight !== "thin" ? styles[weight] : undefined,
    SPACING_CLS[spacing],
    EMPHASIS_CLS[emphasis],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      role="separator"
      aria-orientation={orientation}
      className={rootCls}
    >
      <span className={styles.line} aria-hidden="true" />
      {label && (
        <>
          <span className={styles.label}>{label}</span>
          <span className={styles.line} aria-hidden="true" />
        </>
      )}
    </div>
  );
};