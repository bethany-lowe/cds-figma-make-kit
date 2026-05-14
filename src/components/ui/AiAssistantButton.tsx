/**
 * AiAssistantButton — CDS Component
 *
 * Visual layers (bottom → top, inside a 58 × 58 circle):
 *  1. Radial gradient  #FFD4F7 (top-right pink) → #ADEDFF (bottom-left blue)
 *  2. Three wave paths masked to the circle, rendered × 2 for depth
 *       Wave A  #7A0BD2  fillOpacity 0.61
 *       Wave B  #6E0BD2  fillOpacity 0.61
 *       Wave C  #3F0BD2  fillOpacity 0.62
 *  3. Soft violet drop-shadow glow (CSS filter)
 *
 * Paths are from /src/imports/ai-assistant-graphic/svg-91ll55qm7.ts
 * They are already in the 58 × 58 coordinate space — no scale/rotate needed.
 *
 * States:  default · listening · disabled
 * Sizes:   default (60px) · large (84px)
 */

import { useId } from 'react';
import svgPaths from '../../../imports/ai-assistant-graphic/svg-91ll55qm7';
import styles from './AiAssistantButton.module.css';

// ── Types ─────────────────────────────────────────────────────
export type AiAssistantState = 'default' | 'listening' | 'disabled';
export type AiAssistantSize  = 'default' | 'large';

export interface AiAssistantButtonProps {
  state?:        AiAssistantState;
  size?:         AiAssistantSize;
  onClick?:      () => void;
  'aria-label'?: string;
  className?:    string;
}

// ── Gradient + wave SVG ───────────────────────────────────────
//
// Reproduces the Figma "AiAssistant-1" component exactly:
//   • clipPath clips all content to the rounded-29 rect
//   • Radial gradient: translate(51.18 5.69) rotate(133.5°) scale(57.64)
//       stop 0  #FFD4F7  (pale rose/pink, top-right)
//       stop 1  #ADEDFF  (pale sky blue,  bottom-left)
//   • Luminance mask clips the wave group to a perfect circle
//   • 6 path draws (3 unique paths × 2) build up layered opacity

function AiGradientCircle({ uid, size, isListening }: { uid: string; size: number; isListening: boolean }) {
  const gradId = `${uid}-gr`;
  const clipId = `${uid}-cl`;
  const maskId = `${uid}-mk`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 58 58"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ display: 'block' }}
    >
      <defs>
        {/* ── Gradient ─────────────────────────────────────── */}
        <radialGradient
          id={gradId}
          cx="0" cy="0" r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(51.1765 5.68628) rotate(133.497) scale(57.6423)"
        >
          <stop stopColor="#FFD4F7" />
          <stop offset="1" stopColor="#ADEDFF" />
        </radialGradient>

        {/* ── Clip: rounded rect matching the circle ────────── */}
        <clipPath id={clipId}>
          <rect width="58" height="58" rx="29" fill="white" />
        </clipPath>

        {/* ── Luminance mask: pure circle for wave group ─────── */}
        <mask
          id={maskId}
          maskUnits="userSpaceOnUse"
          x="0" y="0" width="58" height="58"
          style={{ maskType: 'luminance' } as React.CSSProperties}
        >
          <circle cx="29" cy="29" r="29" fill="white" />
        </mask>
      </defs>

      {/* All content clipped to the rounded rect */}
      <g clipPath={`url(#${clipId})`}>

        {/* 1 — Gradient background */}
        <rect width="58" height="58" rx="29" fill={`url(#${gradId})`} />

        {/* 2 — Wave bands */}
        <g mask={`url(#${maskId})`}>

          {/* Wave A — lightest, highest crest */}
          <g className={isListening ? styles.waveA : ''}>
            <path d={svgPaths.p2bb7e700} fill="#7A0BD2" fillOpacity="0.61" />
            <path d={svgPaths.p2bb7e700} fill="#7A0BD2" fillOpacity="0.61" />
          </g>

          {/* Wave B — middle layer */}
          <g className={isListening ? styles.waveB : ''}>
            <path d={svgPaths.p3d3f0e00} fill="#6E0BD2" fillOpacity="0.61" />
            <path d={svgPaths.p3d3f0e00} fill="#6E0BD2" fillOpacity="0.61" />
          </g>

          {/* Wave C — darkest, base layer */}
          <g className={isListening ? styles.waveC : ''}>
            <path d={svgPaths.p113b5300} fill="#3F0BD2" fillOpacity="0.62" />
            <path d={svgPaths.p113b5300} fill="#3F0BD2" fillOpacity="0.62" />
          </g>

        </g>
      </g>

      {/* Border ring — outside the clip so it renders over the gradient.
          Tokens: --cds-base-white (colour) · --cds-border-width-thin (1px width)
          Rect is inset by 0.5px so the 1px stroke sits exactly on the circle edge. */}
      <rect
        x="0.5" y="0.5"
        width="57" height="57"
        rx="28.5"
        fill="none"
        style={{
          stroke:      'var(--cds-base-white)',
          strokeWidth: 'var(--cds-border-width-thin, 1)',
        }}
      />
    </svg>
  );
}

// ── Component ─────────────────────────────────────────────────
export function AiAssistantButton({
  state      = 'default',
  size       = 'default',
  onClick,
  'aria-label': ariaLabel = 'AI Assistant',
  className  = '',
}: AiAssistantButtonProps) {
  const uid         = useId().replace(/:/g, '');
  const isDisabled  = state === 'disabled';
  const isListening = state === 'listening';
  const isLarge     = size === 'large';
  const circleSize  = isLarge ? 84 : 60;

  const buttonClasses = [
    styles.button,
    isLarge     ? styles.sizeLarge      : styles.sizeDefault,
    isDisabled  ? styles.stateDisabled  : '',
    isListening ? styles.stateListening : '',
    className,
  ].filter(Boolean).join(' ');

  const liveLabel = isListening
    ? `${ariaLabel}, listening`
    : isDisabled
    ? `${ariaLabel}, unavailable`
    : ariaLabel;

  return (
    <button
      type="button"
      className={buttonClasses}
      onClick={isDisabled ? undefined : onClick}
      disabled={isDisabled}
      aria-label={liveLabel}
      aria-pressed={isListening}
      aria-disabled={isDisabled}
    >
      {/* Pulse ring — listening state only */}
      {isListening && (
        <span className={styles.pulseRing} aria-hidden="true" />
      )}

      {/* Wave gradient visual */}
      <span className={styles.bg} aria-hidden="true">
        <AiGradientCircle uid={uid} size={circleSize} isListening={isListening} />
      </span>
    </button>
  );
}

export default AiAssistantButton;