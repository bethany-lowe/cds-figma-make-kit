import styles from "./ProgressBar.module.css";

// ── Types ──────────────────────────────────────────────────────────────────────

export type ProgressBarSentiment =
  | "primary"
  | "success"
  | "warning"
  | "error"
  | "neutral";

export type ProgressBarSize = "small" | "medium" | "large";

export interface ProgressBarProps {
  /** Current progress percentage (0–100). Ignored when `indeterminate` is true. */
  value?: number;
  /** Fill colour conveying the nature or outcome of the process (default: "primary") */
  sentiment?: ProgressBarSentiment;
  /** Track height — small (4px), medium (8px), large (12px) (default: "medium") */
  size?: ProgressBarSize;
  /** Optional label shown above the bar */
  label?: string;
  /** Display the numeric percentage alongside the label */
  showValue?: boolean;
  /** Animated state for processes with an unknown duration */
  indeterminate?: boolean;
  /** Optional helper or status message shown below the bar */
  helperText?: string;
}

// ── Component ──────────────────────────────────────────────────────────────────

export function ProgressBar({
  value = 0,
  sentiment = "primary",
  size = "medium",
  label,
  showValue = false,
  indeterminate = false,
  helperText,
}: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value));
  const displayValue = indeterminate ? undefined : clamped;

  const rootCls = [
    styles.progressBar,
    styles[sentiment],
    styles[size],
    indeterminate && styles.indeterminate,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={rootCls}>
      {(label || showValue) && (
        <div className={styles.header}>
          {label && <p className={styles.label}>{label}</p>}
          {showValue && !indeterminate && (
            <span className={styles.value}>{clamped}%</span>
          )}
        </div>
      )}

      <div
        className={styles.track}
        role="progressbar"
        aria-valuenow={displayValue}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label ?? "Progress"}
        aria-valuetext={indeterminate ? "Loading…" : `${clamped}%`}
      >
        <div
          className={styles.fill}
          style={indeterminate ? undefined : { width: `${clamped}%` }}
        />
      </div>

      {helperText && <p className={styles.helper}>{helperText}</p>}
    </div>
  );
}

export default ProgressBar;
