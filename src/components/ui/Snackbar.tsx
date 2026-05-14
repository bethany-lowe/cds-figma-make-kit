import type { ReactNode } from "react";
import styles from "./Snackbar.module.css";
import iconManifest from "../../../imports/icon-manifest.json";

// ── Types ──────────────────────────────────────────────────────────────────────

export type SnackbarSentiment = "neutral" | "info" | "success" | "warning" | "error";
export type SnackbarPosition  = "bottom-center" | "bottom-left" | "bottom-right" | "top-center";

export interface SnackbarProps {
  /** Colour palette and default icon. Defaults to `"neutral"`. */
  sentiment?: SnackbarSentiment;
  /** Main notification text. */
  message?: string;
  /** Label for the inline action button. Requires `onAction`. */
  actionLabel?: string;
  /** Called when the action button is clicked. */
  onAction?: () => void;
  /** Called when the dismiss button is clicked. Renders the dismiss button when provided. */
  onDismiss?: () => void;
  /** Custom icon overriding the default sentiment icon. */
  icon?: ReactNode;
  /** Whether to show the leading icon. Defaults to `true`. */
  showIcon?: boolean;
}

export interface SnackbarRegionProps {
  /** Screen position of the snackbar stack. Defaults to `"bottom-center"`. */
  position?: SnackbarPosition;
  children?: ReactNode;
}

// ── Icon helpers ───────────────────────────────────────────────────────────────

/** Renders a 16×16 icon from the CDS icon manifest using currentColor. */
function ManifestIcon({ name }: { name: string }) {
  const manifest = iconManifest as Record<string, { svg: string }>;
  const raw = manifest[name]?.svg ?? "";
  if (!raw) return null;
  const sized = raw
    .replace(/width="24"/, 'width="16"')
    .replace(/height="24"/, 'height="16"');
  return (
    <span
      className={styles.iconInner}
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: sized }}
    />
  );
}

/** Close / X icon — actionClose/Line from the CDS icon manifest. */
function CloseIcon() {
  const manifest = iconManifest as Record<string, { svg: string }>;
  const raw = manifest["actionClose/Line"]?.svg ?? "";
  if (!raw) {
    // Fallback inline SVG
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M16.9496 5.636L12 10.586 7.05 5.636a1 1 0 0 0-1.414 1.414L10.586 12l-4.95 4.95a1 1 0 0 0 1.414 1.414L12 13.414l4.95 4.95a1 1 0 0 0 1.414-1.414L13.414 12l4.95-4.95a1 1 0 0 0-1.414-1.414Z" />
      </svg>
    );
  }
  const sized = raw
    .replace(/width="24"/, 'width="16"')
    .replace(/height="24"/, 'height="16"');
  return (
    <span
      aria-hidden="true"
      style={{ display: "flex", alignItems: "center" }}
      dangerouslySetInnerHTML={{ __html: sized }}
    />
  );
}

// ── Default icons per sentiment ───────────────────────────────────────────────

const SENTIMENT_ICONS: Record<SnackbarSentiment, string> = {
  neutral: "actionInfo/Line",
  info:    "actionInfo/Solid",
  success: "abstractSuccess/Solid",
  warning: "abstractDanger/Solid",
  error:   "abstractDanger/Solid",
};

// ── Position class map ────────────────────────────────────────────────────────

const POSITION_CLS: Record<SnackbarPosition, string> = {
  "bottom-center": styles.bottomCenter,
  "bottom-left":   styles.bottomLeft,
  "bottom-right":  styles.bottomRight,
  "top-center":    styles.topCenter,
};

// ── Snackbar ──────────────────────────────────────────────────────────────────

export function Snackbar({
  sentiment  = "neutral",
  message    = "",
  actionLabel,
  onAction,
  onDismiss,
  icon,
  showIcon   = true,
}: SnackbarProps) {
  const rootCls = [styles.snackbar, styles[sentiment]].join(" ");

  return (
    <div
      className={rootCls}
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      {showIcon && (
        <span className={styles.icon}>
          {icon ?? <ManifestIcon name={SENTIMENT_ICONS[sentiment]} />}
        </span>
      )}

      <p className={styles.message}>{message}</p>

      {actionLabel && onAction && (
        <>
          <span className={styles.sep} aria-hidden="true" />
          <button className={styles.action} onClick={onAction}>
            {actionLabel}
          </button>
        </>
      )}

      {onDismiss && (
        <button
          className={styles.dismiss}
          onClick={onDismiss}
          aria-label="Dismiss"
        >
          <CloseIcon />
        </button>
      )}
    </div>
  );
}

// ── SnackbarRegion ────────────────────────────────────────────────────────────

export function SnackbarRegion({
  position = "bottom-center",
  children,
}: SnackbarRegionProps) {
  const cls = [styles.region, POSITION_CLS[position]].join(" ");
  return <div className={cls}>{children}</div>;
}

export default Snackbar;
