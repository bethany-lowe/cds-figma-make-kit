import { useTheme } from '../contexts/ThemeContext';

export function ThemeSwitcher() {
  const { brand, setBrand, brandName } = useTheme();

  return (
    <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl p-1">
      <button
        onClick={() => setBrand('telus')}
        className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
          brand === 'telus'
            ? 'bg-gray-900 text-white'
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        TELUS
      </button>
      <button
        onClick={() => setBrand('homi')}
        className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
          brand === 'homi'
            ? 'bg-gray-900 text-white'
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        HOMI
      </button>
    </div>
  );
}
