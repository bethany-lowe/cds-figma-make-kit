import React from 'react';
import styles from './FeedbackCaption.module.css';

// ── Types ──────────────────────────────────────────────────────
export type FeedbackCaptionVariant = 'info' | 'success' | 'error';

export interface FeedbackCaptionProps {
  /**
   * Semantic variant — drives icon and text colour tokens.
   * info    → actionInfo/Solid    · --icon-primary       · --text-neutral-bold
   * success → abstractSuccess/Solid · --icon-success · --text-success-bold
   * error   → abstractWarning/Solid · --icon-error   · --text-error
   */
  variant?: FeedbackCaptionVariant;
  /** Caption message */
  children: React.ReactNode;
  /** Extra class names forwarded to the wrapper */
  className?: string;
}

// ── CDS icon library — sourced from /src/imports/icon-manifest.json ──
// All icons use viewBox="0 0 24 24" and fill="currentColor" so they
// inherit their colour from the CSS `color` property on their container.

/** actionInfo/Solid — filled circle with "i" */
function InfoIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <g clipPath="url(#cds-fc-info-clip)">
        <path
          d="M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM13 17.05C13 17.35 12.76 17.59 12.46 17.59H11.53C11.23 17.59 10.99 17.35 10.99 17.05V10.6C10.99 10.3 11.23 10.06 11.53 10.06H12.46C12.76 10.06 13 10.3 13 10.6V17.05ZM12 8.59C11.45 8.59 11 8.14 11 7.59C11 7.04 11.45 6.59 12 6.59C12.55 6.59 13 7.04 13 7.59C13 8.14 12.55 8.59 12 8.59Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="cds-fc-info-clip">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

/** abstractSuccess/Solid — filled circle with checkmark */
function SuccessIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <g clipPath="url(#cds-fc-success-clip)">
        <path
          d="M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM10.96 15.46C10.69 15.46 10.44 15.35 10.25 15.17L7.75 12.67C7.52 12.44 7.52 12.06 7.75 11.82L8.32 11.25C8.55 11.02 8.93 11.02 9.17 11.25L10.96 13.04L15.02 8.98C15.25 8.75 15.63 8.75 15.87 8.98L16.44 9.55C16.67 9.78 16.67 10.16 16.44 10.4L11.67 15.17C11.48 15.36 11.23 15.46 10.96 15.46Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="cds-fc-success-clip">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

/** abstractWarning/Solid — filled circle with "!" */
function ErrorIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <g clipPath="url(#cds-fc-error-clip)">
        <path
          d="M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM12 17.39C11.45 17.39 11 16.94 11 16.39C11 15.84 11.45 15.39 12 15.39C12.55 15.39 13 15.84 13 16.39C13 16.94 12.55 17.39 12 17.39ZM13 13.38C13 13.68 12.76 13.92 12.46 13.92H11.53C11.23 13.92 10.99 13.68 10.99 13.38V6.93C10.99 6.63 11.23 6.39 11.53 6.39H12.46C12.76 6.39 13 6.63 13 6.93V13.38Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="cds-fc-error-clip">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

const ICONS: Record<FeedbackCaptionVariant, React.ReactNode> = {
  info:    <InfoIcon />,
  success: <SuccessIcon />,
  error:   <ErrorIcon />,
};

// ── FeedbackCaption ────────────────────────────────────────────
export function FeedbackCaption({
  variant = 'info',
  children,
  className = '',
}: FeedbackCaptionProps) {
  const rootCls = [styles.root, styles[variant], className].filter(Boolean).join(' ');

  return (
    <span className={rootCls}>
      <span className={styles.icon} aria-hidden="true">
        {ICONS[variant]}
      </span>
      <span className={styles.text}>{children}</span>
    </span>
  );
}

export default FeedbackCaption;