import { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import semanticColorTokens from '../../imports/semantic-color-tokens.json';
import primitiveDesignTokens from '../../imports/primitive-design-tokens.json';
import { FoundationHero } from './FoundationHero';

// ─── Types ────────────────────────────────────────────────────────────────────

type TabId = 'overview' | 'background' | 'text' | 'border' | 'icon';

interface TokenEntry {
  key: string;
  description: string;
  example: string;
  alertNote?: boolean;
  isInverse?: boolean;
}

interface TokenGroup {
  label: string;
  description?: string;
  tokens: TokenEntry[];
}

// ─── Accessibility warnings ────────────────────────────────────────────────────

const WARNINGS: Record<string, string> = {
  'background.tertiary':       'Dark backgrounds only — fails contrast on light or white backgrounds.',
  'background.tertiarySubtle': 'Dark backgrounds only.',
  'background.tertiaryBold':   'TELUS: fails 3:1 on dark backgrounds — verify contrast before use.',
  'background.successSubtle':  'Verify contrast before use on light backgrounds.',
  'text.primarySubtle':        'Dark backgrounds only — does not meet contrast on light.',
  'text.secondarySubtle':      'Dark backgrounds only.',
  'text.tertiary':             'Dark backgrounds only.',
  'text.tertiarySubtle':       'Dark backgrounds only. TELUS: fails contrast on light.',
  'text.tertiaryBold':         'TELUS: fails 3:1 on dark backgrounds — verify contrast.',
  'text.successSubtle':        'Dark backgrounds only.',
  'text.alertSubtle':          'Dark backgrounds only.',
  'text.errorSubtle':          'Dark backgrounds only.',
  'text.infoSubtle':           'Dark backgrounds only.',
  'border.primary':            'TELUS: resolves to 2.86:1 on white — below the 3:1 minimum threshold.',
  'border.tertiary':           'Dark backgrounds only.',
  'border.tertiarySubtle':     'TELUS: does not meet contrast on light backgrounds.',
  'border.tertiaryBold':       'TELUS: fails 3:1 on dark — verify contrast.',
  'border.successSubtle':      'Verify contrast on light backgrounds.',
  'icon.primarySubtle':        'Dark backgrounds only.',
  'icon.secondarySubtle':      'Dark backgrounds only.',
  'icon.tertiary':             'Dark backgrounds only.',
  'icon.tertiarySubtle':       'Dark backgrounds only. TELUS: fails contrast on light.',
  'icon.tertiaryBold':         'TELUS: fails 3:1 on dark — verify contrast.',
  'icon.successSubtle':        'Dark backgrounds only.',
  'icon.alertSubtle':          'Dark backgrounds only.',
  'icon.errorSubtle':          'Dark backgrounds only.',
  'icon.infoSubtle':           'Dark backgrounds only.',
};

// ─── Token group data ──────────────────────────────────────────────────────────

const backgroundGroups: TokenGroup[] = [
  {
    label: 'Primary',
    description: 'The dominant expressive brand color. TELUS: purple. Drives high-emphasis interactive moments.',
    tokens: [
      { key: 'primarySubtle',  description: 'Low-emphasis primary background. Brand color present but not dominant.', example: 'Selected list row, active filter chip, primary banner fill, primary tag' },
      { key: 'primary',        description: 'Standard filled primary background. Use for high-emphasis interactive elements where the brand color carries the action.', example: 'Primary button fill' },
      { key: 'primaryBold',    description: 'High-emphasis primary, darker than default. Pressed states or heavier fills.', example: 'Primary button pressed state' },
      { key: 'primaryInverse', description: 'White background for content on primary-colored backgrounds.', example: 'Icon container on background.primaryBold', isInverse: true },
    ],
  },
  {
    label: 'Secondary',
    description: 'The secondary expressive brand color. TELUS: green. Used alongside primary for brand-rich moments.',
    tokens: [
      { key: 'secondarySubtle',  description: 'Low-emphasis secondary background. Tinted areas where the secondary color should be present but not dominant.', example: 'Secondary selection tint, secondary banner fill, secondary tag' },
      { key: 'secondary',        description: 'Standard secondary brand background. Second expressive color leads the moment.', example: 'Promotional banner fill, brand accent background' },
      { key: 'secondaryBold',    description: 'High-emphasis secondary. Pressed states or strong secondary brand expression.', example: 'Secondary action pressed state, bold brand accent block' },
      { key: 'secondaryInverse', description: 'White background for content on secondary-colored backgrounds.', example: 'Label on background.secondary', isInverse: true },
    ],
  },
  {
    label: 'Tertiary',
    description: 'A third expressive brand color. TELUS: bright green. Use only on dark backgrounds — fails contrast on light.',
    tokens: [
      { key: 'tertiarySubtle',  description: 'Low-emphasis tertiary background. Dark backgrounds only.', example: 'Subtle highlight tint on dark background, tertiary banner fill, tertiary tag' },
      { key: 'tertiary',        description: 'Standard tertiary brand background. Only where contrast requirements are met — primarily on dark backgrounds.', example: 'Accent badge on dark background' },
      { key: 'tertiaryBold',    description: 'High-emphasis tertiary. Pressed/active states. TELUS: fails 3:1 on dark backgrounds.', example: 'Tertiary chip pressed state on dark background' },
      { key: 'tertiaryInverse', description: 'White background for content on tertiary-colored backgrounds.', example: 'Label on background.tertiary', isInverse: true },
    ],
  },
  {
    label: 'Neutral',
    description: 'The structural color role. TELUS: TELUS grey. Supports content without competing with brand color.',
    tokens: [
      { key: 'neutralSubtle',  description: 'Primary neutral background for UI chrome. The most frequently used neutral token in SmartHome+.', example: 'Card background, input field fill, neutral banner fill, neutral tag' },
      { key: 'neutral',        description: 'Mid-weight neutral. Rarely used directly — prefer subtle or app-level tokens.', example: 'Divider background, placeholder fill' },
      { key: 'neutralBold',    description: 'Dark neutral background for high-contrast neutral fills.', example: 'Dark sheet header, bottom bar fill' },
      { key: 'neutralInverse', description: 'White background for content on dark neutral backgrounds.', example: 'Content area inside background.neutralBold', isInverse: true },
    ],
  },
  {
    label: 'App-level',
    description: 'Purpose-named backgrounds for specific structural app surfaces. Do not follow the role-based pattern.',
    tokens: [
      { key: 'app',            description: "The default screen background. Every screen's root background.", example: 'Screen root view background' },
      { key: 'appNeutral',     description: 'Neutral variant of the app background for grouped or inset content areas, one level below main.', example: 'Settings grouped table, inset content section' },
      { key: 'modal',          description: 'Background for modal presentations.', example: 'Bottom sheet, dialog background' },
      { key: 'disabled',       description: 'Standard disabled state background for interactive elements.', example: 'Disabled button fill, disabled input field' },
      { key: 'disabledBold',   description: 'Stronger disabled background when more visual presence is needed.', example: 'Disabled toggle track' },
      { key: 'disabledSubtle', description: 'Lightest disabled background for minimal disabled indication.', example: 'Disabled chip background' },
      { key: 'video',          description: 'Black background for video and media playback. Always resolves to black — never brand-switched.', example: 'Video player background, media placeholder' },
      { key: 'overlay',        description: 'Semi-transparent black scrim for modal overlays and dimming layers behind presented content.', example: 'Modal scrim, bottom sheet overlay' },
      { key: 'tabbar',         description: 'Tab bar background. Independent token to allow isolated control of tab bar treatment.', example: 'Tab bar background' },
    ],
  },
  {
    label: 'Success',
    description: 'Communicates successful system states.',
    tokens: [
      { key: 'successSubtle',  description: 'Low-emphasis success background. Verify contrast on light backgrounds.', example: 'Success banner fill, success tag, success input state' },
      { key: 'success',        description: 'Standard success background.', example: 'Success banner fill, success toast background' },
      { key: 'successBold',    description: 'High-emphasis success background.', example: 'Success confirmation screen fill' },
      { key: 'successInverse', description: 'White background on success-colored elements.', example: 'Label on background.successBold', isInverse: true },
    ],
  },
  {
    label: 'Alert',
    description: 'Communicates warning states. Alert tokens intentionally resolve from different stops — background uses color.alert.light, text/border use color.alert.pure. This is by design.',
    tokens: [
      { key: 'alertSubtle',  description: 'Low-emphasis alert background.', example: 'Warning banner fill, warning tag, warning input state', alertNote: true },
      { key: 'alert',        description: 'Standard alert background. Resolves to color.alert.light — intentional, not the pure stop.', example: 'Warning banner fill', alertNote: true },
      { key: 'alertBold',    description: 'Full-saturation alert background. Use sparingly.', example: 'Strong warning background' },
      { key: 'alertInverse', description: 'White background on alert-colored elements.', example: 'Label on background.alertBold', isInverse: true },
    ],
  },
  {
    label: 'Error',
    description: 'Communicates error and destructive states.',
    tokens: [
      { key: 'errorSubtle',  description: 'Low-emphasis error background.', example: 'Error banner fill, error tag, error input state' },
      { key: 'error',        description: 'Standard error background.', example: 'Error banner fill, destructive action confirmation' },
      { key: 'errorBold',    description: 'High-emphasis error background.', example: 'Critical error screen fill' },
      { key: 'errorInverse', description: 'White background on error-colored elements.', example: 'Label on background.errorBold', isInverse: true },
    ],
  },
  {
    label: 'Info',
    description: 'Communicates informational content.',
    tokens: [
      { key: 'infoSubtle',  description: 'Low-emphasis info background.', example: 'Info banner fill, info tag, inline info callout' },
      { key: 'info',        description: 'Standard informational background.', example: 'Info banner fill, tooltip background' },
      { key: 'infoBold',    description: 'High-emphasis info background.', example: 'Strong informational callout fill' },
      { key: 'infoInverse', description: 'White background on info-colored elements.', example: 'Label on background.infoBold', isInverse: true },
    ],
  },
];

const textGroups: TokenGroup[] = [
  {
    label: 'Primary',
    description: 'Brand-expressive text. TELUS: purple.',
    tokens: [
      { key: 'primarySubtle',  description: 'Low-emphasis primary text. Dark backgrounds only — fails contrast on light.', example: 'Supporting label on dark background' },
      { key: 'primary',        description: 'Standard primary brand text.', example: 'Primary button label, text link, active tab label' },
      { key: 'primaryBold',    description: 'High-emphasis primary text.', example: 'Primary heading on light background, bold interactive label' },
      { key: 'primaryInverse', description: 'White text on primary-colored backgrounds.', example: 'Label on background.primary', isInverse: true },
    ],
  },
  {
    label: 'Secondary',
    description: 'Secondary brand-expressive text. TELUS: green.',
    tokens: [
      { key: 'secondarySubtle',  description: 'Low-emphasis secondary text. Dark backgrounds only.', example: 'Supporting label on dark background' },
      { key: 'secondary',        description: 'Standard secondary brand text.', example: 'Secondary action label, secondary banner heading' },
      { key: 'secondaryBold',    description: 'High-emphasis secondary text.', example: 'Bold secondary label' },
      { key: 'secondaryInverse', description: 'White text on secondary-colored backgrounds.', example: 'Label on background.secondary', isInverse: true },
    ],
  },
  {
    label: 'Tertiary',
    description: 'Tertiary brand-expressive text. TELUS: bright green. Dark backgrounds only.',
    tokens: [
      { key: 'tertiarySubtle',  description: 'Low-emphasis tertiary text. Dark backgrounds only. TELUS: fails contrast on light.', example: 'Supporting tertiary label on dark background' },
      { key: 'tertiary',        description: 'Standard tertiary text. Dark backgrounds only.', example: 'Tertiary tag label on dark background' },
      { key: 'tertiaryBold',    description: 'High-emphasis tertiary text. Dark backgrounds only. TELUS: fails 3:1 on dark.', example: 'Bold tertiary label on dark background' },
      { key: 'tertiaryInverse', description: 'White text on tertiary-colored backgrounds.', example: 'Label on background.tertiary', isInverse: true },
    ],
  },
  {
    label: 'Neutral',
    description: 'Structural text color. The default for body copy and UI labels.',
    tokens: [
      { key: 'neutralSubtle',  description: 'Low-emphasis neutral text.', example: 'Captions, placeholder text, metadata, secondary descriptions' },
      { key: 'neutral',        description: 'Standard neutral text. The default for body copy and UI labels.', example: 'Body copy, form labels, navigation labels, list row titles' },
      { key: 'neutralBold',    description: 'High-emphasis neutral text.', example: 'Section headings, emphasized UI labels' },
      { key: 'neutralBolder',  description: 'Maximum contrast neutral text. Resolves to black.', example: 'High-contrast headings, accessibility-critical text' },
      { key: 'neutralInverse', description: 'White text on dark neutral backgrounds.', example: 'Label on background.neutralBold', isInverse: true },
    ],
  },
  {
    label: 'Success',
    tokens: [
      { key: 'successSubtle',  description: 'Low-emphasis success text. Dark backgrounds only.', example: 'Success label on dark background' },
      { key: 'success',        description: 'Standard success text.', example: 'Success banner heading, success input message' },
      { key: 'successBold',    description: 'High-emphasis success text.', example: 'Success confirmation heading' },
      { key: 'successInverse', description: 'White text on success-colored backgrounds.', example: 'Label on background.successBold', isInverse: true },
    ],
  },
  {
    label: 'Alert',
    description: 'text.alert resolves to color.alert.pure — higher stop than alert backgrounds. By design for contrast.',
    tokens: [
      { key: 'alertSubtle',  description: 'Low-emphasis alert text. Dark backgrounds only.', example: 'Warning label on dark background', alertNote: true },
      { key: 'alert',        description: 'Standard alert text. Resolves to color.alert.pure — intentional for contrast.', example: 'Warning banner heading, warning input message', alertNote: true },
      { key: 'alertBold',    description: 'High-emphasis alert text.', example: 'Strong warning label, critical warning heading' },
      { key: 'alertInverse', description: 'White text on alert-colored backgrounds.', example: 'Label on background.alertBold', isInverse: true },
    ],
  },
  {
    label: 'Error',
    tokens: [
      { key: 'errorSubtle',  description: 'Low-emphasis error text. Dark backgrounds only.', example: 'Error label on dark background' },
      { key: 'error',        description: 'Standard error text.', example: 'Error banner heading, error input message, destructive action label' },
      { key: 'errorBold',    description: 'High-emphasis error text.', example: 'Critical error heading, strong destructive label' },
      { key: 'errorInverse', description: 'White text on error-colored backgrounds.', example: 'Label on background.errorBold', isInverse: true },
    ],
  },
  {
    label: 'Info',
    tokens: [
      { key: 'infoSubtle',  description: 'Low-emphasis info text. Dark backgrounds only.', example: 'Info label on dark background' },
      { key: 'info',        description: 'Standard informational text.', example: 'Info banner heading, tooltip text' },
      { key: 'infoBold',    description: 'High-emphasis info text.', example: 'Strong informational heading' },
      { key: 'infoInverse', description: 'White text on info-colored backgrounds.', example: 'Label on background.infoBold', isInverse: true },
    ],
  },
];

const borderGroups: TokenGroup[] = [
  {
    label: 'Primary',
    description: 'TELUS: border.primary resolves from color.primary.light (purple.300, #b287d8) — below 3:1 on white. Needs re-evaluation.',
    tokens: [
      { key: 'primarySubtle',  description: 'Decorative only. Primary-tinted dividers and separators.', example: 'Primary banner divider, primary tag border' },
      { key: 'primary',        description: 'Standard primary brand border. TELUS: 2.86:1 on white — below 3:1 threshold.', example: 'Selected input border, active focus ring, outlined primary button border' },
      { key: 'primaryBold',    description: 'High-emphasis primary border.', example: 'Strong focus ring, emphasized selected state border' },
      { key: 'primaryInverse', description: 'White border for dark backgrounds and dark mode.', example: 'Border on primary element on dark background', isInverse: true },
    ],
  },
  {
    label: 'Secondary',
    tokens: [
      { key: 'secondarySubtle',  description: 'Decorative only. Secondary-tinted dividers.', example: 'Secondary banner divider, secondary tag border' },
      { key: 'secondary',        description: 'Standard secondary brand border.', example: 'Secondary outlined button border, secondary selection border' },
      { key: 'secondaryBold',    description: 'High-emphasis secondary border.', example: 'Strong secondary selection border' },
      { key: 'secondaryInverse', description: 'White border for dark backgrounds.', example: 'Border on secondary element on dark background', isInverse: true },
    ],
  },
  {
    label: 'Tertiary',
    description: 'Dark backgrounds only. TELUS: does not meet contrast on light.',
    tokens: [
      { key: 'tertiarySubtle',  description: 'Decorative only. Dark backgrounds only. TELUS: fails contrast on light.', example: 'Supporting tertiary divider on dark background' },
      { key: 'tertiary',        description: 'Standard tertiary border. Dark backgrounds only.', example: 'Tertiary tag border on dark background' },
      { key: 'tertiaryBold',    description: 'High-emphasis tertiary border. Dark backgrounds only. TELUS: fails 3:1 on dark.', example: 'Strong tertiary border on dark background' },
      { key: 'tertiaryInverse', description: 'White border for dark backgrounds.', example: 'Border on tertiary element on dark background', isInverse: true },
    ],
  },
  {
    label: 'Neutral',
    tokens: [
      { key: 'neutralSubtle',  description: 'Decorative only. De-emphasized dividers and separators.', example: 'Section divider, neutral banner divider' },
      { key: 'neutral',        description: 'Standard neutral border.', example: 'Input border, card border, list row divider' },
      { key: 'neutralBold',    description: 'High-emphasis neutral border.', example: 'Strong divider, emphasized container border' },
      { key: 'neutralInverse', description: 'White border for dark backgrounds.', example: 'Border on dark neutral background', isInverse: true },
    ],
  },
  {
    label: 'Success',
    tokens: [
      { key: 'successSubtle',  description: 'Decorative only. Verify contrast on light backgrounds.', example: 'Success section divider' },
      { key: 'success',        description: 'Standard success border.', example: 'Success input border, success banner border' },
      { key: 'successBold',    description: 'High-emphasis success border.', example: 'Strong success state border' },
      { key: 'successInverse', description: 'White border for dark backgrounds.', example: 'Border on success element on dark', isInverse: true },
    ],
  },
  {
    label: 'Alert',
    description: 'border.alert resolves to color.alert.light; border.alertBold to color.alert.pure. Intentional — see accessibility notes.',
    tokens: [
      { key: 'alertSubtle',  description: 'Decorative only. Alert-tinted dividers.', example: 'Warning section divider', alertNote: true },
      { key: 'alert',        description: 'Standard alert border. Resolves to color.alert.light — intentional.', example: 'Warning input border, warning banner border', alertNote: true },
      { key: 'alertBold',    description: 'High-emphasis alert border. Resolves to color.alert.pure.', example: 'Strong warning container border' },
      { key: 'alertInverse', description: 'White border for dark backgrounds.', example: 'Border on alert element on dark', isInverse: true },
    ],
  },
  {
    label: 'Error',
    tokens: [
      { key: 'errorSubtle',  description: 'Decorative only. Error-tinted dividers.', example: 'Error section divider' },
      { key: 'error',        description: 'Standard error border.', example: 'Error input border, error banner border' },
      { key: 'errorBold',    description: 'High-emphasis error border.', example: 'Strong error state border' },
      { key: 'errorInverse', description: 'White border for dark backgrounds.', example: 'Border on error element on dark', isInverse: true },
    ],
  },
  {
    label: 'Info',
    tokens: [
      { key: 'infoSubtle',  description: 'Decorative only. Info-tinted dividers.', example: 'Info section divider' },
      { key: 'info',        description: 'Standard informational border.', example: 'Info input border, info banner border' },
      { key: 'infoBold',    description: 'High-emphasis info border.', example: 'Strong informational container border' },
      { key: 'infoInverse', description: 'White border for dark backgrounds.', example: 'Border on info element on dark', isInverse: true },
    ],
  },
];

const iconGroups: TokenGroup[] = [
  {
    label: 'Primary',
    tokens: [
      { key: 'primarySubtle',  description: 'Low-emphasis primary icon. Dark backgrounds only.', example: 'Supporting icon on dark background' },
      { key: 'primary',        description: 'Standard primary brand icon.', example: 'Primary action icon, active tab bar icon, primary button icon' },
      { key: 'primaryBold',    description: 'High-emphasis primary icon.', example: 'Emphasized primary action icon' },
      { key: 'primaryInverse', description: 'White icon for dark or primary-colored backgrounds.', example: 'Icon on background.primary, icon on primary button', isInverse: true },
    ],
  },
  {
    label: 'Secondary',
    tokens: [
      { key: 'secondarySubtle',  description: 'Low-emphasis secondary icon. Dark backgrounds only.', example: 'Supporting icon on dark background' },
      { key: 'secondary',        description: 'Standard secondary brand icon.', example: 'Secondary action icon, secondary banner icon' },
      { key: 'secondaryBold',    description: 'High-emphasis secondary icon.', example: 'Bold secondary brand icon' },
      { key: 'secondaryInverse', description: 'White icon for secondary-colored backgrounds.', example: 'Icon on background.secondary', isInverse: true },
    ],
  },
  {
    label: 'Tertiary',
    description: 'Dark backgrounds only. TELUS: does not meet contrast on light.',
    tokens: [
      { key: 'tertiarySubtle',  description: 'Low-emphasis tertiary icon. Dark backgrounds only. TELUS: fails contrast on light.', example: 'Supporting tertiary icon on dark background' },
      { key: 'tertiary',        description: 'Standard tertiary icon. Dark backgrounds only.', example: 'Tertiary icon on dark background' },
      { key: 'tertiaryBold',    description: 'High-emphasis tertiary icon. Dark backgrounds only. TELUS: fails 3:1 on dark.', example: 'Bold tertiary icon on dark background' },
      { key: 'tertiaryInverse', description: 'White icon for tertiary-colored backgrounds.', example: 'Icon on tertiary element on dark', isInverse: true },
    ],
  },
  {
    label: 'Neutral',
    tokens: [
      { key: 'neutralSubtle',  description: 'Low-emphasis neutral icon.', example: 'Secondary navigation icon, inactive icon, metadata icon' },
      { key: 'neutral',        description: 'Standard neutral icon.', example: 'Navigation icon, list row icon, toolbar icon' },
      { key: 'neutralBold',    description: 'High-emphasis neutral icon.', example: 'Emphasized UI icon, high-contrast supporting icon' },
      { key: 'neutralInverse', description: 'White icon for dark neutral backgrounds.', example: 'Icon on background.neutralBold', isInverse: true },
    ],
  },
  {
    label: 'Success',
    tokens: [
      { key: 'successSubtle',  description: 'Low-emphasis success icon. Dark backgrounds only.', example: 'Success icon on dark background' },
      { key: 'success',        description: 'Standard success icon.', example: 'Success banner icon, success input icon' },
      { key: 'successBold',    description: 'High-emphasis success icon.', example: 'Success confirmation icon' },
      { key: 'successInverse', description: 'White icon on success-colored backgrounds.', example: 'Icon on background.successBold', isInverse: true },
    ],
  },
  {
    label: 'Alert',
    tokens: [
      { key: 'alertSubtle',  description: 'Low-emphasis alert icon. Dark backgrounds only.', example: 'Warning icon on dark background' },
      { key: 'alert',        description: 'Standard alert icon.', example: 'Warning banner icon, warning input icon' },
      { key: 'alertBold',    description: 'High-emphasis alert icon.', example: 'Strong warning icon, critical alert icon' },
      { key: 'alertInverse', description: 'White icon on alert-colored backgrounds.', example: 'Icon on background.alertBold', isInverse: true },
    ],
  },
  {
    label: 'Error',
    tokens: [
      { key: 'errorSubtle',  description: 'Low-emphasis error icon. Dark backgrounds only.', example: 'Error icon on dark background' },
      { key: 'error',        description: 'Standard error icon.', example: 'Error banner icon, error input icon, destructive action icon' },
      { key: 'errorBold',    description: 'High-emphasis error icon.', example: 'Critical error icon, strong destructive state icon' },
      { key: 'errorInverse', description: 'White icon on error-colored backgrounds.', example: 'Icon on background.errorBold', isInverse: true },
    ],
  },
  {
    label: 'Info',
    tokens: [
      { key: 'infoSubtle',  description: 'Low-emphasis info icon. Dark backgrounds only.', example: 'Info icon on dark background' },
      { key: 'info',        description: 'Standard informational icon.', example: 'Info banner icon, tooltip icon' },
      { key: 'infoBold',    description: 'High-emphasis info icon.', example: 'Strong informational icon' },
      { key: 'infoInverse', description: 'White icon on info-colored backgrounds.', example: 'Icon on background.infoBold', isInverse: true },
    ],
  },
];

// ─── Tab list ─────────────────────────────────────────────────────────────────

const TABS: { id: TabId; label: string }[] = [
  { id: 'overview',    label: 'Overview' },
  { id: 'background',  label: 'Background' },
  { id: 'text',        label: 'Text' },
  { id: 'border',      label: 'Border' },
  { id: 'icon',        label: 'Icon' },
];

// ─── Component ────────────────────────────────────────────────────────────────

export function SemanticColorPage() {
  const { brandFont, brand, tokens } = useTheme();
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const { themeAlias, brandPrimitives } = tokens;

  // Resolve a {ref} string to a hex color through the full alias → primitive chain
  function resolveColor(ref: string): string {
    if (!ref || typeof ref !== 'string') return '#e5e7eb';
    if (!ref.startsWith('{')) return ref; // literal hex e.g. #00000099

    const clean = ref.replace(/[{}]/g, '');
    if (clean === 'base.white') return '#ffffff';
    if (clean === 'base.black') return '#000000';

    // Step 1: look up in alias theme tokens (color.primary.pure → {brand.X.color.Y.N})
    let aliasNode: any = themeAlias;
    for (const p of clean.split('.')) {
      aliasNode = aliasNode?.[p];
      if (!aliasNode) return '#e5e7eb';
    }
    const aliasVal: string = aliasNode?.$value ?? '';
    if (!aliasVal) return '#e5e7eb';
    if (!aliasVal.startsWith('{')) return aliasVal;

    // Step 2: resolve through brand primitives or global primitives
    const aliasClean = aliasVal.replace(/[{}]/g, '');
    const aliasParts = aliasClean.split('.');
    let primNode: any = aliasParts[0] === 'brand' ? brandPrimitives : primitiveDesignTokens;
    for (const p of aliasParts) {
      primNode = primNode?.[p];
      if (!primNode) return '#e5e7eb';
    }
    const result = primNode?.$value;
    return typeof result === 'string' ? result : '#e5e7eb';
  }

  // Get the intermediate alias ref string for display
  function getAliasRef(ref: string): string {
    if (!ref.startsWith('{')) return '';
    const clean = ref.replace(/[{}]/g, '');
    if (clean === 'base.white' || clean === 'base.black') return clean;
    let node: any = themeAlias;
    for (const p of clean.split('.')) {
      node = node?.[p];
      if (!node) return '';
    }
    return node?.$value?.replace(/[{}]/g, '') ?? '';
  }

  function resolveTokenColor(category: string, key: string): string {
    const val = (semanticColorTokens as any)[category]?.[key]?.$value ?? '';
    return resolveColor(val);
  }

  function getTokenRef(category: string, key: string): string {
    return (semanticColorTokens as any)[category]?.[key]?.$value ?? '';
  }

  // Convert category + camelCase key → CSS custom property name
  // e.g. ('background', 'primarySubtle') → '--background-primary-subtle'
  function toCssVar(category: string, key: string): string {
    const toKebab = (s: string) => s.replace(/([A-Z])/g, (m) => `-${m.toLowerCase()}`);
    return `--${toKebab(category)}-${toKebab(key)}`;
  }

  function isDark(hex: string): boolean {
    const m = /^#([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})/i.exec(hex);
    if (!m) return false;
    const [r, g, b] = [m[1], m[2], m[3]].map(x => parseInt(x, 16));
    return (0.299 * r + 0.587 * g + 0.114 * b) < 140;
  }

  // ── Overview swatch grid data ──────────────────────────────────────────────

  const brandRoleRows = [
    {
      label: 'Primary',
      keys: ['primarySubtle', 'primary', 'primaryBold', 'primaryInverse'],
    },
    {
      label: 'Secondary',
      keys: ['secondarySubtle', 'secondary', 'secondaryBold', 'secondaryInverse'],
    },
    {
      label: 'Tertiary',
      keys: ['tertiarySubtle', 'tertiary', 'tertiaryBold', 'tertiaryInverse'],
    },
    {
      label: 'Neutral',
      keys: ['neutralSubtle', 'neutral', 'neutralBold', 'neutralInverse'],
    },
  ];

  const statusRows = [
    { label: 'Success', keys: ['successSubtle', 'success', 'successBold', 'successInverse'] },
    { label: 'Alert',   keys: ['alertSubtle',   'alert',   'alertBold',   'alertInverse']   },
    { label: 'Error',   keys: ['errorSubtle',   'error',   'errorBold',   'errorInverse']   },
    { label: 'Info',    keys: ['infoSubtle',    'info',    'infoBold',    'infoInverse']     },
  ];

  const emphasisLabels = ['Subtle', 'Default', 'Bold', 'Inverse'];

  // ── Token row renderer ─────────────────────────────────────────────────────

  function renderTokenRows(category: 'background' | 'text' | 'border' | 'icon', groups: TokenGroup[]) {
    return groups.map((group) => (
      <div key={group.label} className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <h3 className="text-base font-semibold text-gray-800">{group.label}</h3>
        </div>
        {group.description && (
          <p className="text-sm text-gray-500 mb-4 leading-relaxed">{group.description}</p>
        )}
        <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-[44px_300px_1fr_200px] border-b border-gray-100 px-6 py-3 bg-gray-50">
            <div />
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Token</div>
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Description</div>
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">UI example</div>
          </div>
          {/* Rows */}
          {group.tokens.map((entry, i, arr) => {
            const fullToken = `${category}.${entry.key}`;
            const ref = getTokenRef(category, entry.key);
            const hex = resolveColor(ref);
            const aliasRef = getAliasRef(ref);
            const warning = WARNINGS[fullToken];
            const isLast = i === arr.length - 1;

            // Swatch display: inverse tokens shown on dark bg
            const swatchBg = entry.isInverse ? '#374151' : hex;
            const swatchColor = entry.isInverse ? hex : 'transparent';
            const needsBorder = !entry.isInverse && (hex === '#ffffff' || hex === '#fafafa' || hex.toLowerCase() === '#f4f4f7');

            return (
              <div
                key={entry.key}
                className={`grid grid-cols-[44px_300px_1fr_200px] px-6 py-4 items-start hover:bg-gray-50/60 transition-colors ${!isLast ? 'border-b border-gray-100' : ''}`}
              >
                {/* Swatch */}
                <div className="self-start pt-0.5">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{
                      backgroundColor: swatchBg,
                      border: needsBorder ? '1px solid #e5e7eb' : entry.isInverse ? 'none' : 'none',
                    }}
                  >
                    {entry.isInverse && (
                      <div className="w-4 h-4 rounded" style={{ backgroundColor: swatchColor }} />
                    )}
                  </div>
                </div>

                {/* Token name + hex + alias ref */}
                <div className="flex flex-col gap-1.5 self-start pr-4">
                  <div className="flex items-start gap-2 flex-wrap">
                    <span className="inline-block px-2.5 py-1 bg-gray-50 border border-gray-200 rounded-full text-xs font-mono text-gray-600 w-fit">
                      {toCssVar(category, entry.key)}
                    </span>
                    {warning && (
                      <span className="inline-flex items-center px-1.5 py-0.5 bg-amber-50 border border-amber-200 rounded text-[10px] font-semibold text-amber-700 flex-shrink-0">
                        ⚠
                      </span>
                    )}
                    {entry.alertNote && (
                      <span className="inline-flex items-center px-1.5 py-0.5 bg-blue-50 border border-blue-100 rounded text-[10px] font-semibold text-blue-600 flex-shrink-0">
                        note
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-xs font-mono text-gray-400">{hex}</span>
                    {aliasRef && (
                      <span className="text-[10px] font-mono text-gray-300 leading-none">{aliasRef}</span>
                    )}
                  </div>
                </div>

                {/* Description */}
                <div className="self-start pr-6">
                  <p className="text-sm text-gray-600 leading-relaxed">{entry.description}</p>
                  {warning && (
                    <p className="text-xs text-amber-700 mt-1.5 leading-snug">{warning}</p>
                  )}
                </div>

                {/* Example */}
                <p className="text-sm text-gray-400 leading-relaxed self-start">{entry.example}</p>
              </div>
            );
          })}
        </div>
      </div>
    ));
  }

  // ── Live chain example (for Overview) ──────────────────────────────────────

  const chainRef = getTokenRef('background', 'primary');
  const chainAlias = getAliasRef(chainRef);
  const chainHex = resolveColor(chainRef);
  const chainBrandLabel = brand === 'telus' ? 'TELUS' : 'HOMI';

  return (
    <div>
      {/* ── Page header ─────────────────────────────────────────────────── */}
      <div className="mb-10">
        <FoundationHero type="semantic-color" />
      </div>
      <div className="mb-12">
        <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
          Foundations
        </div>
        <h1 className="text-5xl font-bold text-gray-900 mb-6" style={{ fontFamily: brandFont }}>
          Semantic Color
        </h1>
        <p className="text-base text-gray-600 leading-relaxed">
          Semantic color tokens abstract color away from its raw value. Instead of referencing a hex, you reference intent — <code className="font-mono text-sm bg-gray-100 border border-gray-200 rounded px-1.5 py-0.5 text-gray-700">--background-primary</code>, <code className="font-mono text-sm bg-gray-100 border border-gray-200 rounded px-1.5 py-0.5 text-gray-700">--text-neutral</code>, <code className="font-mono text-sm bg-gray-100 border border-gray-200 rounded px-1.5 py-0.5 text-gray-700">--border-error</code>. The resolved color changes per brand; the semantic meaning stays constant.
        </p>
      </div>

      {/* ── Tab navigation ──────────────────────────────────────────────── */}
      <div className="mb-12 border-b border-gray-200">
        <div className="flex gap-8">
          {TABS.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`pb-3 text-base font-medium transition-colors relative ${
                activeTab === id ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {label}
              {activeTab === id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          OVERVIEW TAB
      ══════════════════════════════════════════════════════════════════════ */}
      {activeTab === 'overview' && (
        <div>

          {/* Usage rule callout */}
          <div className="mb-10 bg-blue-50 border border-blue-100 rounded-2xl px-6 py-4 flex items-start gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
            <p className="text-sm text-blue-700 leading-relaxed">
              <span className="font-semibold">Always use semantic tokens in component and design specs. </span>
              Primitive color tokens (<code className="font-mono text-xs bg-white border border-blue-200 rounded px-1 py-0.5">color.*</code>, <code className="font-mono text-xs bg-white border border-blue-200 rounded px-1 py-0.5">global.color.*</code>) are internal resolution values — never reference them directly. Always reach for the semantic layer: <code className="font-mono text-xs bg-white border border-blue-200 rounded px-1 py-0.5">--background-*</code>, <code className="font-mono text-xs bg-white border border-blue-200 rounded px-1 py-0.5">--text-*</code>, <code className="font-mono text-xs bg-white border border-blue-200 rounded px-1 py-0.5">--border-*</code>, <code className="font-mono text-xs bg-white border border-blue-200 rounded px-1 py-0.5">--icon-*</code>.
            </p>
          </div>

          {/* Live token chain */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-2 text-gray-900">Token resolution chain</h2>
            <p className="text-sm text-gray-500 mb-6 leading-relaxed">
              Every semantic token resolves through two hops: the alias theme layer maps the semantic intent to a brand-specific primitive, which carries the final hex value. The intermediate step is what changes between brands.
            </p>
            <div className="bg-white border border-gray-200 rounded-3xl p-8">
              <div className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-5">
                Live example — {chainBrandLabel} brand
              </div>
              <div className="flex items-center gap-3 flex-wrap">
                {/* Step 1: semantic */}
                <div className="flex flex-col items-start gap-1.5">
                  <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Semantic</span>
                  <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl">
                    <span className="text-sm font-mono text-gray-700">--background-primary</span>
                  </div>
                  <span className="text-[10px] text-gray-400 font-mono">{chainRef}</span>
                </div>
                <div className="text-gray-300 text-lg">→</div>
                {/* Step 2: alias */}
                <div className="flex flex-col items-start gap-1.5">
                  <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Alias ({chainBrandLabel})</span>
                  <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl">
                    <span className="text-sm font-mono text-gray-700">{chainAlias}</span>
                  </div>
                  <span className="text-[10px] text-gray-400">brand primitive reference</span>
                </div>
                <div className="text-gray-300 text-lg">→</div>
                {/* Step 3: resolved hex */}
                <div className="flex flex-col items-start gap-1.5">
                  <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Resolved</span>
                  <div className="flex items-center gap-2.5 px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl">
                    <div
                      className="w-5 h-5 rounded-md flex-shrink-0"
                      style={{ backgroundColor: chainHex }}
                    />
                    <span className="text-sm font-mono text-gray-700">{chainHex}</span>
                  </div>
                  <span className="text-[10px] text-gray-400">final hex value</span>
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-6 leading-relaxed">
                Switch the brand theme in the top-right corner to see how the same semantic token resolves to a different value.
              </p>
            </div>
          </div>

          {/* Color roles grid */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-2 text-gray-900">Color roles</h2>
            <p className="text-sm text-gray-500 mb-2 leading-relaxed">
              <span className="text-gray-700 font-medium">Color roles are brand expression, not priority levels.</span> Primary, secondary, and tertiary describe a brand's expressive color palette. For TELUS: primary is purple, secondary is green, tertiary is bright green.
            </p>
            <p className="text-sm text-gray-500 mb-6 leading-relaxed">
              Swatches below show <code className="font-mono text-xs bg-gray-100 border border-gray-200 rounded px-1">--background-*</code> tokens for the active brand. Inverse tokens are shown on a dark swatch to illustrate their intended use context.
            </p>

            {/* Brand roles */}
            <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden mb-4">
              {/* Column headers */}
              <div className="grid grid-cols-[120px_1fr_1fr_1fr_1fr] px-6 py-3 border-b border-gray-100 bg-gray-50">
                <div />
                {emphasisLabels.map(label => (
                  <div key={label} className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{label}</div>
                ))}
              </div>
              {brandRoleRows.map((row, ri) => (
                <div
                  key={row.label}
                  className={`grid grid-cols-[120px_1fr_1fr_1fr_1fr] px-6 py-5 items-center ${ri < brandRoleRows.length - 1 ? 'border-b border-gray-100' : ''}`}
                >
                  <div className="text-sm font-medium text-gray-700">{row.label}</div>
                  {row.keys.map((key, ki) => {
                    const hex = resolveTokenColor('background', key);
                    const isInv = key.endsWith('Inverse');
                    return (
                      <div key={key} className="flex flex-col gap-1.5">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center"
                          style={{
                            backgroundColor: isInv ? '#1f2937' : hex,
                            border: (!isInv && (hex === '#ffffff' || hex === '#f4f4f7' || hex === '#fafafa')) ? '1px solid #e5e7eb' : 'none',
                          }}
                        >
                          {isInv && (
                            <div className="w-6 h-6 rounded-md" style={{ backgroundColor: hex }} />
                          )}
                        </div>
                        <span className="text-[10px] font-mono text-gray-400">{hex}</span>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>

            {/* Status roles */}
            <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden">
              <div className="grid grid-cols-[120px_1fr_1fr_1fr_1fr] px-6 py-3 border-b border-gray-100 bg-gray-50">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</div>
                {emphasisLabels.map(label => (
                  <div key={label} className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{label}</div>
                ))}
              </div>
              {statusRows.map((row, ri) => (
                <div
                  key={row.label}
                  className={`grid grid-cols-[120px_1fr_1fr_1fr_1fr] px-6 py-5 items-center ${ri < statusRows.length - 1 ? 'border-b border-gray-100' : ''}`}
                >
                  <div className="text-sm font-medium text-gray-700">{row.label}</div>
                  {row.keys.map((key) => {
                    const hex = resolveTokenColor('background', key);
                    const isInv = key.endsWith('Inverse');
                    return (
                      <div key={key} className="flex flex-col gap-1.5">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center"
                          style={{
                            backgroundColor: isInv ? '#1f2937' : hex,
                            border: (!isInv && (hex === '#ffffff' || hex === '#f4f4f7')) ? '1px solid #e5e7eb' : 'none',
                          }}
                        >
                          {isInv && (
                            <div className="w-6 h-6 rounded-md" style={{ backgroundColor: hex }} />
                          )}
                        </div>
                        <span className="text-[10px] font-mono text-gray-400">{hex}</span>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* Emphasis variants */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-2 text-gray-900">Emphasis variants</h2>
            <p className="text-sm text-gray-500 mb-6 leading-relaxed">
              Every color role carries four emphasis variants as camelCase suffixes. The same pattern applies across all four categories — background, text, border, and icon.
            </p>
            <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden">
              {[
                { variant: 'Subtle', suffix: '--{category}-{role}-subtle', desc: 'Low visual weight. Sits quietly in the composition. Use for tinted surfaces, de-emphasized states, and decorative-only borders.' },
                { variant: 'Default', suffix: '--{category}-{role}', desc: 'The standard application. No suffix. Use for the primary expression of the role in most contexts.' },
                { variant: 'Bold', suffix: '--{category}-{role}-bold', desc: 'Higher visual weight and stronger contrast. Use for pressed states, high-emphasis elements, and confirmed states.' },
                { variant: 'Inverse', suffix: '--{category}-{role}-inverse', desc: 'For use on dark backgrounds. Resolves to white for all roles. The designated tokens for dark mode usage.' },
              ].map((row, i, arr) => (
                <div key={row.variant} className={`grid grid-cols-[120px_240px_1fr] px-6 py-5 items-start ${i < arr.length - 1 ? 'border-b border-gray-100' : ''}`}>
                  <div className="text-sm font-semibold text-gray-800">{row.variant}</div>
                  <code className="text-xs font-mono text-gray-500 self-center">{row.suffix}</code>
                  <p className="text-sm text-gray-600 leading-relaxed">{row.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Accessibility */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-2 text-gray-900">Accessibility notes</h2>
            <p className="text-sm text-gray-500 mb-6 leading-relaxed">
              CDS follows WCAG 2.1 AA contrast standards. The token system supports these requirements through curated scale positions and emphasis levels.
            </p>
            <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden mb-4">
              {[
                { threshold: '3:1', rule: 'Any UI essential to understanding the experience, and text 24px or larger', standard: 'WCAG 1.4.11 Non-text Contrast' },
                { threshold: '4.5:1', rule: 'Text smaller than 24px', standard: 'WCAG 1.4.3 Contrast Minimum' },
              ].map((row, i) => (
                <div key={row.threshold} className={`grid grid-cols-[100px_1fr_220px] px-6 py-4 items-start ${i === 0 ? 'border-b border-gray-100' : ''}`}>
                  <div className="text-sm font-semibold text-gray-800 font-mono">{row.threshold}</div>
                  <p className="text-sm text-gray-600 leading-relaxed">{row.rule}</p>
                  <p className="text-sm text-gray-400">{row.standard}</p>
                </div>
              ))}
            </div>
            <div className="space-y-2">
              {[
                'Tertiary tokens (TELUS): bright green does not meet contrast on light or white backgrounds. Use only on dark backgrounds.',
                'tertiaryBold tokens (TELUS): fails 3:1 on dark backgrounds — always verify contrast before use.',
                'border.primary (TELUS): resolves to purple.300 at 2.86:1 on white — below the 3:1 threshold. Needs re-evaluation.',
                'Subtle tokens: Subtle stops for success, alert, error, and info do not reliably meet contrast on light backgrounds. Always verify.',
                'Alert tokens: background and border.alert use color.alert.light (lighter stop); text.alert and border.alertBold use color.alert.pure (higher contrast). This intentional split is not an inconsistency.',
              ].map((note, i) => (
                <div key={i} className="bg-amber-50 border border-amber-200 rounded-2xl px-5 py-3 flex items-start gap-2">
                  <div className="w-1 h-1 rounded-full bg-amber-400 mt-2 flex-shrink-0" />
                  <p className="text-sm text-amber-800 leading-relaxed">{note}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Base tokens note */}
          <div className="bg-gray-50 border border-gray-200 rounded-2xl px-6 py-4 flex items-start gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2 flex-shrink-0" />
            <p className="text-sm text-gray-500 leading-relaxed">
              <span className="font-semibold text-gray-700">Base tokens — </span>
              <code className="font-mono text-xs bg-white border border-gray-200 rounded px-1.5 py-0.5">base.white</code> (<code className="font-mono text-xs">#ffffff</code>) and <code className="font-mono text-xs bg-white border border-gray-200 rounded px-1.5 py-0.5">base.black</code> (<code className="font-mono text-xs">#000000</code>) are absolute anchors — they do not participate in brand switching. Every <code className="font-mono text-xs bg-white border border-gray-200 rounded px-1.5 py-0.5">*Inverse</code> token across all categories resolves to <code className="font-mono text-xs bg-white border border-gray-200 rounded px-1.5 py-0.5">base.white</code>.
            </p>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════
          BACKGROUND TAB
      ══════════════════════════════════════════════════════════════════════ */}
      {activeTab === 'background' && (
        <div>
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-2 text-gray-900">Background tokens</h2>
            <p className="text-sm text-gray-500 leading-relaxed">
              Background tokens are for fills — anything that creates a filled area behind content. Buttons, cards, banners, screen backgrounds, overlays, status surfaces. Token path: <code className="font-mono text-xs bg-gray-100 border border-gray-200 rounded px-1.5 py-0.5">--background-*</code>
            </p>
          </div>
          {renderTokenRows('background', backgroundGroups)}
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════
          TEXT TAB
      ══════════════════════════════════════════════════════════════════════ */}
      {activeTab === 'text' && (
        <div>
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-2 text-gray-900">Text tokens</h2>
            <p className="text-sm text-gray-500 leading-relaxed">
              Text tokens define foreground color for all rendered text. Token path: <code className="font-mono text-xs bg-gray-100 border border-gray-200 rounded px-1.5 py-0.5">--text-*</code>. <span className="font-medium text-gray-700"><code className="font-mono text-xs bg-gray-100 border border-gray-200 rounded px-1.5 py-0.5">--text-neutral</code> is the default for body copy and UI labels throughout the app.</span>
            </p>
          </div>
          {renderTokenRows('text', textGroups)}
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════
          BORDER TAB
      ══════════════════════════════════════════════════════════════════════ */}
      {activeTab === 'border' && (
        <div>
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-2 text-gray-900">Border tokens</h2>
            <p className="text-sm text-gray-500 leading-relaxed">
              Border tokens define the color of strokes, outlines, dividers, and separators. <span className="font-medium text-gray-700">Subtle variants are decorative only</span> — they do not need to meet non-text contrast requirements. Token path: <code className="font-mono text-xs bg-gray-100 border border-gray-200 rounded px-1.5 py-0.5">--border-*</code>
            </p>
          </div>
          {renderTokenRows('border', borderGroups)}
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════
          ICON TAB
      ══════════════════════════════════════════════════════════════════════ */}
      {activeTab === 'icon' && (
        <div>
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-2 text-gray-900">Icon tokens</h2>
            <p className="text-sm text-gray-500 leading-relaxed">
              Icon tokens define the fill or stroke color for icons and other vector UI elements. Icon colors follow the same role and emphasis structure as text — they carry the same contrast requirements for any icon that conveys essential meaning. Token path: <code className="font-mono text-xs bg-gray-100 border border-gray-200 rounded px-1.5 py-0.5">--icon-*</code>
            </p>
          </div>
          {renderTokenRows('icon', iconGroups)}
        </div>
      )}
    </div>
  );
}
