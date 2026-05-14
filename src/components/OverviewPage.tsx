/**
 * OverviewPage — Getting Started
 *
 * Hero + four illustrated category banners (Foundations, Components,
 * Patterns, Education) + resource links.
 */

import { ArrowRight } from 'lucide-react';
import { ResourceCards } from './ResourceCards';
import { useTheme } from '../contexts/ThemeContext';
import iconManifest from '../../imports/icon-manifest.json';
import React from 'react';

// ── Types ──────────────────────────────────────────────────────

interface OverviewPageProps {
  onNavigate?: (path: string) => void;
}

// ── Manifest icon helper ───────────────────────────────────────

function ManifestIcon({
  iconKey,
  color = 'currentColor',
  size = 24,
}: {
  iconKey: string;
  color?: string;
  size?: number;
}) {
  const entry = (iconManifest as Record<string, { svg: string }>)[iconKey];
  if (!entry) return null;
  return (
    <span
      style={{ color, width: size, height: size, display: 'block', flexShrink: 0 }}
      dangerouslySetInnerHTML={{ __html: entry.svg }}
    />
  );
}

// ── Category data ──────────────────────────────────────────────

interface CategoryConfig {
  name:          string;
  iconKey:       string;
  gradientStart: string;
  gradientEnd:   string;
  accentLight:   string;
  description:   string;
  items:         string[];
  path:          string;
  count:         number;
  unit:          string;
  chips:         string[];
}

const FOUNDATIONS_ITEMS = [
  'Global Color', 'Brand Color', 'Semantic Color', 'Typography',
  'Spacing', 'Border Width', 'Border Radius', 'Elevation',
  'Dimension', 'Layout',
];
const COMPONENT_ITEMS = [
  'Button', 'Input Field', 'Toggle', 'Tag', 'Radio', 'Checkbox',
  'Slider', 'Progress Bar', 'Banner', 'Snackbar', 'Divider',
  'Pill', 'AI Assistant', 'App Navigation', 'Tab Navigation',
  'Feedback Caption', 'Component Kit',
];

const BASE_CATEGORIES: Omit<CategoryConfig, 'gradientStart' | 'gradientEnd'>[] = [
  {
    name:        'Foundations',
    iconKey:     'objectPalette/Line',
    accentLight: 'rgba(255,255,255,0.16)',
    description: 'The core visual language: design tokens for color, typography, spacing, shape, and elevation that every component is built on.',
    items:       FOUNDATIONS_ITEMS,
    path:        'foundations/global-color',
    count:       FOUNDATIONS_ITEMS.length,
    unit:        'foundations',
    chips:       ['Color', 'Typography', 'Spacing'],
  },
  {
    name:        'Components',
    iconKey:     'objectToolbox/Line',
    accentLight: 'rgba(255,255,255,0.15)',
    description: 'Production-ready UI building blocks, each with an interactive playground, anatomy diagram, design tokens, and full accessibility guidance.',
    items:       COMPONENT_ITEMS,
    path:        'components/button',
    count:       COMPONENT_ITEMS.length,
    unit:        'components',
    chips:       ['Button', 'Input', 'Toggle'],
  },
  {
    name:        'Patterns',
    iconKey:     'abstractMotion/Line',
    accentLight: 'rgba(255,255,255,0.15)',
    description: 'Recurring UI solutions and structural templates that solve common design challenges consistently across all TELUS products.',
    items:       ['Navigation', 'Forms'],
    path:        'patterns/navigation',
    count:       2,
    unit:        'patterns',
    chips:       ['Navigation', 'Forms'],
  },
  {
    name:        'Education',
    iconKey:     'objectBook/Line',
    accentLight: 'rgba(255,255,255,0.15)',
    description: 'Best practices, accessibility standards, and practical guidance for designers and developers using the design system.',
    items:       ['Best Practices', 'Accessibility'],
    path:        'education/best-practices',
    count:       2,
    unit:        'guides',
    chips:       ['Best Practices', 'Accessibility'],
  },
];

const FIXED_GRADIENTS: [string, string][] = [
  ['', ''],               // Foundations — filled at runtime with primaryColor
  ['#0B2040', '#1A4F9E'], // Components  — cobalt blue
  ['#092D1A', '#137A46'], // Patterns    — forest green
  ['#3D1500', '#8B3A0A'], // Education   — warm amber
];

// ── Per-category background patterns ──────────────────────────

function PatternOverlay({ index }: { index: number }) {
  const patterns: React.CSSProperties[] = [
    // 0 · Foundations — graph-paper grid (fine perpendicular lines)
    {
      backgroundImage:
        'linear-gradient(rgba(255,255,255,0.09) 1px, transparent 1px), ' +
        'linear-gradient(90deg, rgba(255,255,255,0.09) 1px, transparent 1px)',
      backgroundSize: '20px 20px',
    },
    // 1 · Components — dots on a wide grid (modular blocks)
    {
      backgroundImage:
        'radial-gradient(circle, rgba(255,255,255,0.14) 3px, transparent 3px)',
      backgroundSize: '32px 32px',
    },
    // 2 · Patterns — 45° diagonal stripes (repeating motif)
    {
      backgroundImage:
        'repeating-linear-gradient(' +
          '45deg,' +
          'rgba(255,255,255,0.07) 0px,' +
          'rgba(255,255,255,0.07) 1px,' +
          'transparent 1px,' +
          'transparent 14px' +
        ')',
    },
    // 3 · Education — horizontal ruled lines (notebook / reading)
    {
      backgroundImage:
        'repeating-linear-gradient(' +
          '0deg,' +
          'transparent,' +
          'transparent 22px,' +
          'rgba(255,255,255,0.09) 22px,' +
          'rgba(255,255,255,0.09) 23px' +
        ')',
    },
  ];

  return (
    <div className="absolute inset-0" style={patterns[index] ?? patterns[0]} />
  );
}

// ── Category banner card ───────────────────────────────────────

function CategoryCard({
  category,
  gradientStart,
  gradientEnd,
  patternIndex,
  onNavigate,
}: {
  category:      Omit<CategoryConfig, 'gradientStart' | 'gradientEnd'>;
  gradientStart: string;
  gradientEnd:   string;
  patternIndex:  number;
  onNavigate?:   (path: string) => void;
}) {
  const previewItems = category.items.slice(0, 4);
  const overflow     = category.items.length - previewItems.length;

  return (
    <button
      onClick={() => onNavigate?.(category.path)}
      className="group text-left w-full bg-white border border-gray-200 rounded-3xl overflow-hidden
                 hover:border-gray-300 hover:shadow-lg transition-all duration-200 flex flex-col"
      style={{ minHeight: 340 }}
    >
      {/* ── Illustrated header zone ─────────────────────────── */}
      <div
        className="relative overflow-hidden flex-shrink-0"
        style={{
          height: 190,
          background: `linear-gradient(145deg, ${gradientStart} 0%, ${gradientEnd} 100%)`,
        }}
      >
        {/* Per-category pattern */}
        <PatternOverlay index={patternIndex} />

        {/* Category icon */}
        <div
          className="absolute"
          style={{ top: 28, left: 28, zIndex: 1 }}
        >
          <div
            className="rounded-2xl flex items-center justify-center"
            style={{
              width: 52, height: 52,
              backgroundColor: 'rgba(255,255,255,0.15)',
              backdropFilter: 'blur(4px)',
            }}
          >
            <ManifestIcon iconKey={category.iconKey} color="white" size={28} />
          </div>
        </div>

        {/* Floating item chips — bottom area */}
        <div className="absolute bottom-5 left-5 right-5 flex gap-2 flex-wrap" style={{ zIndex: 1 }}>
          {category.chips.map((chip, i) => (
            <span
              key={chip}
              className="inline-flex items-center text-white"
              style={{
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: '0.2px',
                backgroundColor: 'rgba(255,255,255,0.15)',
                backdropFilter: 'blur(6px)',
                padding: '4px 10px',
                borderRadius: 999,
                border: '1px solid rgba(255,255,255,0.20)',
                opacity: 1 - i * 0.06,
              }}
            >
              {chip}
            </span>
          ))}
        </div>

        {/* Count badge — top-right */}
        <div
          className="absolute top-5 right-5 flex items-center gap-1.5"
          style={{
            backgroundColor: 'rgba(255,255,255,0.15)',
            backdropFilter: 'blur(6px)',
            padding: '4px 10px',
            borderRadius: 999,
            border: '1px solid rgba(255,255,255,0.20)',
            zIndex: 1,
          }}
        >
          <span style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.9)', letterSpacing: '0.3px' }}>
            {category.count}
          </span>
          <span style={{ fontSize: 11, fontWeight: 500, color: 'rgba(255,255,255,0.65)' }}>
            {category.unit}
          </span>
        </div>
      </div>

      {/* ── Content zone ────────────────────────────────────── */}
      <div className="flex flex-col flex-1 p-6 gap-4">
        <div>
          <p className="text-gray-900 mb-2" style={{ fontSize: 18, fontWeight: 700 }}>
            {category.name}
          </p>
          <p className="text-gray-500 leading-relaxed" style={{ fontSize: 13, lineHeight: 1.6 }}>
            {category.description}
          </p>
        </div>

        {/* Item preview tags */}
        <div className="flex flex-wrap gap-1.5 mt-auto">
          {previewItems.map(item => (
            <span
              key={item}
              className="text-gray-500"
              style={{ fontSize: 12, backgroundColor: '#F3F4F6', padding: '3px 10px', borderRadius: 999 }}
            >
              {item}
            </span>
          ))}
          {overflow > 0 && (
            <span
              className="text-gray-400"
              style={{ fontSize: 12, backgroundColor: '#F9FAFB', padding: '3px 10px', borderRadius: 999 }}
            >
              +{overflow} more
            </span>
          )}
        </div>

        {/* CTA */}
        <div
          className="flex items-center gap-1.5 mt-1 transition-transform group-hover:translate-x-1 duration-200"
          style={{ color: 'var(--text-primary, #4B286D)', fontSize: 13, fontWeight: 600 }}
        >
          Explore {category.name}
          <ArrowRight size={14} />
        </div>
      </div>
    </button>
  );
}

// ── Stats strip ────────────────────────────────────────────────

function StatPill({ value, label }: { value: string | number; label: string }) {
  return (
    <div className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-2xl">
      <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary, #4B286D)' }}>
        {value}
      </span>
      <span className="text-gray-400" style={{ fontSize: 13 }}>{label}</span>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────

export function OverviewPage({ onNavigate }: OverviewPageProps) {
  const { brandFont, brandName, primaryColor } = useTheme();

  const categories = BASE_CATEGORIES.map((cat, i) => ({
    ...cat,
    gradientStart: i === 0 ? darkenColor(primaryColor) : FIXED_GRADIENTS[i][0],
    gradientEnd:   i === 0 ? primaryColor              : FIXED_GRADIENTS[i][1],
  }));

  const resources = [
    {
      title:       'Getting started guide',
      description: 'Learn the basics of using the design system.',
      iconKey:     'objectBook/Line',
      iconBgColor: 'bg-yellow-100',
      iconColor:   '#854d0e',
    },
    {
      title:       'Join our community',
      description: 'Connect with other designers and developers.',
      iconKey:     'abstractGroup/Line',
      iconBgColor: 'bg-green-100',
      iconColor:   '#166534',
      isExternal:  true,
    },
    {
      title:       'Request a feature',
      description: 'Have an idea? Share your feedback with us.',
      iconKey:     'actionFeedback/Line',
      iconBgColor: 'bg-blue-100',
      iconColor:   '#1e40af',
      isExternal:  true,
    },
    {
      title:       'View on GitHub',
      description: 'Explore the source code and contribute.',
      iconKey:     'actionLinkExternal/Line',
      iconBgColor: 'bg-purple-100',
      iconColor:   '#6b21a8',
      isExternal:  true,
    },
  ];

  return (
    <div className="max-w-4xl">

      {/* ── Hero ────────────────────────────────────────────── */}
      <div className="mb-16">
        <div className="flex items-center gap-2 mb-5 flex-wrap">
          <span
            style={{
              fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.8px',
              color: 'var(--text-primary, #4B286D)',
              backgroundColor: 'var(--background-primary-subtle, #EDE1F5)',
              padding: '3px 10px', borderRadius: 999,
            }}
          >
            {brandName}
          </span>
          <span
            style={{
              fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.8px',
              color: '#6B7280', backgroundColor: '#F3F4F6',
              padding: '3px 10px', borderRadius: 999,
            }}
          >
            Design System · v2.0
          </span>
        </div>

        <h1
          className="text-gray-900 mb-5"
          style={{ fontSize: 44, fontWeight: 800, lineHeight: 1.1, fontFamily: brandFont, letterSpacing: '-0.5px' }}
        >
          Getting Started
        </h1>

        <p
          className="text-gray-500 max-w-2xl mb-8"
          style={{ fontSize: 17, lineHeight: 1.7 }}
        >
          A comprehensive design language for building consistent, accessible, and beautiful
          user experiences across all {brandName} products. Explore foundations, production-ready
          components, patterns, and education resources.
        </p>

        <div className="flex flex-wrap gap-3 mb-10">
          <button
            onClick={() => onNavigate?.('components/button')}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl transition-opacity hover:opacity-90"
            style={{
              backgroundColor: 'var(--text-primary, #4B286D)',
              color: '#fff',
              fontSize: 14,
              fontWeight: 600,
            }}
          >
            Browse Components
            <ArrowRight size={15} />
          </button>
          <button
            onClick={() => onNavigate?.('foundations/global-color')}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl transition-colors
                       bg-white border border-gray-200 hover:border-gray-300 text-gray-700"
            style={{ fontSize: 14, fontWeight: 600 }}
          >
            Design Foundations
            <ArrowRight size={15} />
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          <StatPill value={FOUNDATIONS_ITEMS.length} label="foundations" />
          <StatPill value={COMPONENT_ITEMS.length}   label="components"  />
          <StatPill value={2} label="patterns"  />
          <StatPill value={2} label="guides"    />
          <StatPill value={3} label="icon pages" />
        </div>
      </div>

      {/* ── Section heading ─────────────────────────────────── */}
      <div className="mb-6">
        <h2 className="text-gray-900 mb-1" style={{ fontSize: 22, fontWeight: 700 }}>
          Explore the System
        </h2>
        <p className="text-gray-400" style={{ fontSize: 14 }}>
          Select a category to start exploring documentation.
        </p>
      </div>

      {/* ── Category banners ────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-20">
        {categories.map((cat, i) => (
          <CategoryCard
            key={cat.name}
            category={cat}
            gradientStart={cat.gradientStart}
            gradientEnd={cat.gradientEnd}
            patternIndex={i}
            onNavigate={onNavigate}
          />
        ))}
      </div>

      {/* ── Recently updated ────────────────────────────────── */}
      <div className="mb-4">
        <h2 className="text-gray-900 mb-1" style={{ fontSize: 22, fontWeight: 700 }}>
          Recently Updated
        </h2>
        <p className="text-gray-400" style={{ fontSize: 14 }}>
          Latest additions and documentation improvements.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-20">
        {[
          {
            label: 'Components',
            title: 'Tab Navigation',
            description: 'Horizontal peer-section nav with animated underline, badge support, and full keyboard handling.',
            path: 'components/tab-nav',
            tag: 'Beta',
            tagColor: '#6D28D9',
            tagBg: '#EDE9FE',
          },
          {
            label: 'Components',
            title: 'App Navigation',
            description: 'Bottom-bar navigation for primary app destinations with icon + label layout.',
            path: 'components/app-nav',
            tag: 'Ready',
            tagColor: '#15803D',
            tagBg: '#DCFCE7',
          },
          {
            label: 'Utility',
            title: 'Doc Annotations',
            description: 'Shared annotation components — PropsTable, TokenTable, A11yAudit, DoDontGrid, and more.',
            path: 'utility/doc-annotations',
            tag: 'Ready',
            tagColor: '#15803D',
            tagBg: '#DCFCE7',
          },
        ].map(item => (
          <button
            key={item.path}
            onClick={() => onNavigate?.(item.path)}
            className="group text-left bg-white border border-gray-200 rounded-3xl p-5
                       hover:border-gray-300 hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-center justify-between mb-3">
              <span
                style={{
                  fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.6px',
                  color: 'var(--text-primary, #4B286D)',
                  backgroundColor: 'var(--background-primary-subtle, #EDE1F5)',
                  padding: '2px 8px', borderRadius: 999,
                }}
              >
                {item.label}
              </span>
              <span
                style={{
                  fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.4px',
                  color: item.tagColor, backgroundColor: item.tagBg,
                  padding: '2px 8px', borderRadius: 999,
                }}
              >
                {item.tag}
              </span>
            </div>
            <p className="text-gray-900 mb-2" style={{ fontSize: 15, fontWeight: 700 }}>{item.title}</p>
            <p className="text-gray-500 mb-4" style={{ fontSize: 12, lineHeight: 1.55 }}>{item.description}</p>
            <div
              className="flex items-center gap-1 transition-transform group-hover:translate-x-1 duration-200"
              style={{ color: 'var(--text-primary, #4B286D)', fontSize: 12, fontWeight: 600 }}
            >
              View documentation <ArrowRight size={12} />
            </div>
          </button>
        ))}
      </div>

      {/* ── Resources ───────────────────────────────────────── */}
      <ResourceCards resources={resources} />
    </div>
  );
}

// ── Utility: darken a hex colour for gradient start ────────────

function darkenColor(hex: string): string {
  try {
    const h = hex.replace('#', '');
    const num = parseInt(h.length === 3
      ? h.split('').map(c => c + c).join('')
      : h, 16);
    const r = Math.max(0, ((num >> 16) & 0xff) - 60);
    const g = Math.max(0, ((num >> 8)  & 0xff) - 60);
    const b = Math.max(0, ((num)       & 0xff) - 60);
    return `#${[r, g, b].map(v => v.toString(16).padStart(2, '0')).join('')}`;
  } catch {
    return '#1A0832';
  }
}
