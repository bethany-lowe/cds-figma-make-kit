/**
 * InputFieldPage
 *
 * Component documentation page for TextInputField.
 * Tab bar: "Single Input" | "Area Input"
 * Each tab is an isolated component to avoid Rules-of-Hooks violations.
 */

import { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { SingleInputTab } from './SingleInputTab';
import { AreaInputTab } from './AreaInputTab';

type PageTab = 'single' | 'area';

const PAGE_TABS: { id: PageTab; label: string }[] = [
  { id: 'single', label: 'Single Input' },
  { id: 'area',   label: 'Area Input'   },
];

export function InputFieldPage() {
  const { brandFont, brandName } = useTheme();
  const [activeTab, setActiveTab] = useState<PageTab>('single');

  return (
    <div>
      {/* ── Header ───────────────────────────────────────────── */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
            Components
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4" style={{ fontFamily: brandFont }}>
            Input Field
          </h1>
          <p className="text-base text-gray-600 leading-relaxed max-w-2xl">
            Input fields allow users to enter free-form text. The CDS Input Field comes in two
            variants — <strong>Single</strong> for short values (names, emails, phone numbers)
            and <strong>Area</strong> for multi-line content (notes, descriptions, messages). Both
            use <code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded">--*</code> design
            tokens and share the same four states and FeedbackCaption sub-component for inline
            validation.
          </p>
        </div>
        <div className="bg-green-50 text-green-700 border border-green-200 px-4 py-1.5 rounded-full text-xs font-semibold flex-shrink-0">
          Ready
        </div>
      </div>

      {/* ── Tab bar ───────────────────────────────────────────── */}
      <div className="border-b border-gray-200 mb-12">
        <div className="flex gap-8">
          {PAGE_TABS.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`pb-3 text-base font-medium transition-colors relative ${
                activeTab === id
                  ? 'text-gray-900'
                  : 'text-gray-500 hover:text-gray-700'
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

      {/* ── Tab content ───────────────────────────────────────── */}
      {activeTab === 'single' && <SingleInputTab />}
      {activeTab === 'area'   && <AreaInputTab />}
    </div>
  );
}

export default InputFieldPage;