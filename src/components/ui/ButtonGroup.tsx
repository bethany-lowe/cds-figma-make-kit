import React from 'react';
import styles from './ButtonGroup.module.css';

// ── Types ────────────────────────────────────────────────────

/**
 * Layout variant for the button group.
 *
 * - `stacked`    — vertical stack with 12px gap. Use for primary/secondary action pairs.
 * - `horizontal` — horizontal row with 24px gap. Side-by-side actions.
 * - `iconGrid`   — horizontal grid of icon buttons with labels. Toolbar-style.
 */
export type ButtonGroupVariant = 'stacked' | 'horizontal' | 'iconGrid';

export interface ButtonGroupProps {
  /** Layout variant. @default "horizontal" */
  variant?: ButtonGroupVariant;
  /** Button elements to group. Pass Button or IconButton components. */
  children: React.ReactNode;
  /** Additional CSS class. */
  className?: string;
}

export interface IconGridItemProps {
  /** Icon button element (IconButton component). */
  button: React.ReactNode;
  /** Label text displayed below the icon button. */
  label: string;
  /** Additional CSS class. */
  className?: string;
}

// ── Components ───────────────────────────────────────────────

/**
 * **IconGridItem** — wrapper for icon buttons in grid layout.
 *
 * Renders an icon button with a label below. Used within ButtonGroup
 * when variant="iconGrid".
 *
 * @example
 * <IconGridItem
 *   button={<IconButton icon={<SearchIcon />} aria-label="Search" />}
 *   label="Search"
 * />
 */
export function IconGridItem({
  button,
  label,
  className,
}: IconGridItemProps) {
  const classNames = [styles.iconGridItem, className].filter(Boolean).join(' ');

  return (
    <div className={classNames}>
      <div className={styles.iconGridButton}>{button}</div>
      <div className={styles.iconGridLabel}>{label}</div>
    </div>
  );
}

/**
 * **ButtonGroup** — groups multiple buttons into a cohesive layout.
 *
 * Three layout variants map to common CDS patterns:
 * - **Stacked**: Primary + secondary action pairs, 12px vertical gap
 * - **Horizontal**: Side-by-side actions, 24px horizontal gap
 * - **Icon grid**: Toolbar-style icon buttons with labels, 4px gap
 *
 * Uses existing Button and IconButton components — no custom button rendering.
 *
 * @example
 * // Stacked
 * <ButtonGroup variant="stacked">
 *   <Button variant="high">Primary action</Button>
 *   <Button variant="mediumOutline">Secondary action</Button>
 * </ButtonGroup>
 *
 * // Horizontal
 * <ButtonGroup variant="horizontal">
 *   <Button variant="high">Primary action</Button>
 *   <Button variant="mediumOutline">Secondary action</Button>
 * </ButtonGroup>
 *
 * // Icon grid
 * <ButtonGroup variant="iconGrid">
 *   <IconGridItem button={<IconButton icon={<Icon />} aria-label="Action 1" />} label="Label 1" />
 *   <IconGridItem button={<IconButton icon={<Icon />} aria-label="Action 2" />} label="Label 2" />
 * </ButtonGroup>
 */
export function ButtonGroup({
  variant = 'horizontal',
  children,
  className,
}: ButtonGroupProps) {
  const classNames = [
    styles.buttonGroup,
    styles[variant],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return <div className={classNames}>{children}</div>;
}

export default ButtonGroup;
