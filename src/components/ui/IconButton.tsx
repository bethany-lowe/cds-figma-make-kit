import React from 'react';
import { Button, ButtonVariant, ButtonSize } from './Button';

/**
 * **IconButton** — CDS square icon-only button.
 *
 * A wrapper around the canonical Button component that enforces:
 * - `iconOnly` layout (square, centred icon, no label)
 * - `small`  → 48 × 48 px (--cds-size-8)
 * - `medium` → 56 × 56 px (--cds-size-9)
 * - Required `aria-label` (no visible text, so always mandatory)
 *
 * All four emphasis variants, loading, and disabled states are
 * identical to the standard Button — the only difference is geometry.
 *
 * @example
 * <IconButton variant="high" size="small" aria-label="Search" icon={<SearchIcon />} />
 * <IconButton variant="mediumOutline" loading aria-label="Saving" icon={<SaveIcon />} />
 */
export interface IconButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /** The icon to display. Pass an SVG React element sized to 24 px. */
  icon: React.ReactNode;
  /** Emphasis level. @default "high" */
  variant?: ButtonVariant;
  /**
   * Size of the button.
   * - `small`  — 48 × 48 px. Default. Meets WCAG 2.5.5 touch target.
   * - `medium` — 56 × 56 px. Use for increased visual prominence.
   * @default "small"
   */
  size?: ButtonSize;
  /** Show a loading spinner and suppress interaction. @default false */
  loading?: boolean;
  /**
   * Accessible label — **required** because there is no visible text.
   * Describe the action, not the icon: "Search" not "Magnifying glass".
   */
  'aria-label': string;
}

export function IconButton({
  icon,
  variant = 'high',
  size = 'small',
  loading = false,
  disabled,
  'aria-label': ariaLabel,
  className,
  ...rest
}: IconButtonProps) {
  return (
    <Button
      variant={variant}
      size={size}
      loading={loading}
      disabled={disabled}
      iconOnly
      iconLeft={icon}
      aria-label={ariaLabel}
      className={className}
      {...rest}
    />
  );
}

export default IconButton;
