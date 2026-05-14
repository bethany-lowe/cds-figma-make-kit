import type { ReactNode } from "react";
import styles from "./Banner.module.css";
import iconManifest from "../../../imports/icon-manifest.json";

// ── Types ──────────────────────────────────────────────────────────────────────

export type BannerSentiment = "info" | "success" | "warning" | "error" | "neutral";

export interface BannerProps {
  /** Colour palette and default icon reflecting the nature of the message (default: "info") */
  sentiment?: BannerSentiment;
  /** Optional bold heading above the message */
  title?: string;
  /** Main body text of the banner */
  message?: string;
  /** Label for the inline action link — requires `onAction` */
  actionLabel?: string;
  /** Called when the action link is clicked */
  onAction?: () => void;
  /** Called when the dismiss button is clicked — renders the button when provided */
  onDismiss?: () => void;
  /** Custom icon overriding the default sentiment icon */
  icon?: ReactNode;
  /** Whether to show the leading sentiment icon (default: true) */
  showIcon?: boolean;
  /** Whether to show the small placeholder icon inline with the title (default: true) */
  titleIcon?: boolean;
}

// ── Inline SVG icons — sourced from /src/imports/icon-manifest.json ──────────

/** actionInfo/Solid — filled circle with "i" */
const InfoSolidIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM13 17.05C13 17.35 12.76 17.59 12.46 17.59H11.53C11.23 17.59 10.99 17.35 10.99 17.05V10.6C10.99 10.3 11.23 10.06 11.53 10.06H12.46C12.76 10.06 13 10.3 13 10.6V17.05ZM12 8.59C11.45 8.59 11 8.14 11 7.59C11 7.04 11.45 6.59 12 6.59C12.55 6.59 13 7.04 13 7.59C13 8.14 12.55 8.59 12 8.59Z" fill="currentColor" />
  </svg>
);

/** actionInfo/Line — outline circle with "i" */
const InfoLineIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M12 22C6.49 22 2 17.51 2 12C2 6.49 6.49 2 12 2C17.51 2 22 6.49 22 12C22 17.51 17.51 22 12 22ZM12 4C7.59 4 4 7.59 4 12C4 16.41 7.59 20 12 20C16.41 20 20 16.41 20 12C20 7.59 16.41 4 12 4Z" fill="currentColor" />
    <path d="M12.46 10.0699H11.54C11.2418 10.0699 11 10.3117 11 10.6099V17.0499C11 17.3482 11.2418 17.5899 11.54 17.5899H12.46C12.7582 17.5899 13 17.3482 13 17.0499V10.6099C13 10.3117 12.7582 10.0699 12.46 10.0699Z" fill="currentColor" />
    <path d="M12 8.58997C12.5523 8.58997 13 8.14225 13 7.58997C13 7.03768 12.5523 6.58997 12 6.58997C11.4477 6.58997 11 7.03768 11 7.58997C11 8.14225 11.4477 8.58997 12 8.58997Z" fill="currentColor" />
  </svg>
);

/** abstractSuccess/Solid — filled circle with checkmark */
const SuccessSolidIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM10.96 15.46C10.69 15.46 10.44 15.35 10.25 15.17L7.75 12.67C7.52 12.44 7.52 12.06 7.75 11.82L8.32 11.25C8.55 11.02 8.93 11.02 9.17 11.25L10.96 13.04L15.02 8.98C15.25 8.75 15.63 8.75 15.87 8.98L16.44 9.55C16.67 9.78 16.67 10.16 16.44 10.4L11.67 15.17C11.48 15.36 11.23 15.46 10.96 15.46Z" fill="currentColor" />
  </svg>
);

/** abstractDanger/Solid — filled triangle with exclamation */
const DangerSolidIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M9.36771 4.01971C10.5374 1.99309 13.4617 1.99312 14.6314 4.01971L22.0884 16.9396C23.258 18.9662 21.7957 21.4999 19.4566 21.5002H4.54349C2.20416 21.5002 0.741989 18.9663 1.91165 16.9396L9.36771 4.01971ZM11.9995 16.4904C11.4473 16.4904 10.9995 16.9381 10.9995 17.4904C10.9997 18.0425 11.4474 18.4904 11.9995 18.4904C12.5517 18.4904 12.9994 18.0425 12.9995 17.4904C12.9995 16.9381 12.5518 16.4904 11.9995 16.4904ZM11.5396 7.50018C11.2414 7.50019 10.9995 7.74199 10.9995 8.04022V14.4797C10.9995 14.7779 11.2414 15.0197 11.5396 15.0197H12.4595C12.7577 15.0197 12.9995 14.7779 12.9995 14.4797V8.04022C12.9995 7.74198 12.7577 7.50018 12.4595 7.50018H11.5396Z" fill="currentColor" />
  </svg>
);

/** actionClose/Line — X for the dismiss button */
const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M16.9496 5.63604L11.9999 10.5858L7.05013 5.63604C6.66122 5.24713 6.02483 5.24713 5.63592 5.63604C5.24701 6.02495 5.24701 6.66135 5.63592 7.05026L10.5857 12L5.63592 16.9497C5.24701 17.3387 5.24701 17.9751 5.63592 18.364C6.02483 18.7529 6.66122 18.7529 7.05013 18.364L11.9999 13.4142L16.9496 18.364C17.3385 18.7529 17.9749 18.7529 18.3638 18.364C18.7528 17.9751 18.7528 17.3387 18.3638 16.9497L13.4141 12L18.3638 7.05026C18.7528 6.66135 18.7528 6.02495 18.3638 5.63604C17.9749 5.24713 17.3385 5.24713 16.9496 5.63604Z" fill="currentColor" />
  </svg>
);

const DEFAULT_ICONS: Record<BannerSentiment, ReactNode> = {
  neutral: <InfoLineIcon />,
  info:    <InfoSolidIcon />,
  success: <SuccessSolidIcon />,
  warning: <DangerSolidIcon />,
  error:   <DangerSolidIcon />,
};

// ── Title placeholder icon ─────────────────────────────────────────────────────

/** actionHeart/Solid at 16×16 — placeholder from the CDS icon library */
function TitlePlaceholderIcon() {
  const manifest = iconManifest as Record<string, { svg: string }>;
  const raw = manifest["actionHeart/Solid"]?.svg ?? "";
  if (!raw) return null;
  const sized = raw
    .replace(/width="24"/, 'width="16"')
    .replace(/height="24"/, 'height="16"');
  return (
    <span
      className={styles.titleIcon}
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: sized }}
    />
  );
}

// ── Component ──────────────────────────────────────────────────────────────────

export function Banner({
  sentiment = "info",
  title,
  message = "",
  actionLabel,
  onAction,
  onDismiss,
  icon,
  showIcon = true,
  titleIcon = true,
}: BannerProps) {
  const rootCls = [styles.banner, styles[sentiment]].join(" ");

  return (
    <div className={rootCls} role="alert" aria-live="polite">
      {/* Leading icon */}
      {showIcon && (
        <span className={styles.icon} aria-hidden="true">
          {icon ?? DEFAULT_ICONS[sentiment]}
        </span>
      )}

      {/* Content */}
      <div className={styles.content}>
        {title && (
          <div className={styles.titleRow}>
            {titleIcon && <TitlePlaceholderIcon />}
            <p className={styles.title}>{title}</p>
          </div>
        )}
        <p className={styles.message}>{message}</p>
        {actionLabel && onAction && (
          <button className={styles.action} onClick={onAction}>
            {actionLabel}
          </button>
        )}
      </div>

      {/* Dismiss */}
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

export default Banner;