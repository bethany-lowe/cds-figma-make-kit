import React from 'react';
import styles from './Tag.module.css';

// ── Types ─────────────────────────────────────────────────────
export type TagVariant = 'solid' | 'subtle' | 'outline';
export type TagColor   = 'primary' | 'secondary' | 'neutral' | 'alert' | 'error' | 'success' | 'info';
export type TagSize    = 'large' | 'small';

export interface TagProps {
  /** Visual style: filled, tinted, or bordered */
  variant?: TagVariant;
  /** Semantic colour role mapped to a CDS token — primary | secondary | neutral | alert | error | success | info */
  color?: TagColor;
  /** Size scale. large = 14 px label · small = 11 px label */
  size?: TagSize;
  /**
   * Icon rendered before the label.
   * Defaults to actionHeart/Solid from the CDS icon library.
   * Pass `null` to render no icon.
   */
  icon?: React.ReactNode;
  /** Tag label text */
  children: React.ReactNode;
  /** Extra class names forwarded to the wrapper element */
  className?: string;
}

// ── Default icon — actionHeart/Solid from the CDS icon library ─
// Source: /src/imports/icon-manifest.json › actionHeart/Solid
// viewBox is 24×24; the .iconSlot sizes it to --cds-icon-size-small (16 px).
function PlaceholderIcon() {
  return (
    <span className={styles.iconSlot} aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#tag-heart-clip)">
          <path
            d="M20.485 5.52002C19.505 4.54002 18.205 4.00049 16.825 4.00049C15.445 4.00049 14.145 4.54002 13.165 5.52002L11.995 6.69043L10.825 5.52002C8.805 3.50002 5.525 3.50002 3.515 5.52002C1.495 7.54002 1.495 10.8201 3.515 12.8301L10.015 19.3301C10.545 19.8601 11.255 20.1504 12.005 20.1504C12.755 20.1504 13.465 19.8601 13.995 19.3301L20.495 12.8301C22.515 10.8101 22.515 7.53002 20.495 5.52002H20.485Z"
            fill="currentColor"
          />
        </g>
        <defs>
          <clipPath id="tag-heart-clip">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </span>
  );
}

// ── Tag ───────────────────────────────────────────────────────
export function Tag({
  variant  = 'solid',
  color    = 'primary',
  size     = 'large',
  icon,
  children,
  className = '',
}: TagProps) {
  const resolvedIcon =
    icon === null ? null : icon !== undefined ? icon : <PlaceholderIcon />;

  const cls = [
    styles.tag,
    styles[size],
    styles[variant],
    styles[color],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={cls}>
      {resolvedIcon}
      <span>{children}</span>
    </span>
  );
}

export default Tag;