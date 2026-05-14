import { ResourceCards } from './ResourceCards';
import { useTheme } from '../contexts/ThemeContext';

interface PlaceholderPageProps {
  title: string;
  category?: string;
}

export function PlaceholderPage({ title, category }: PlaceholderPageProps) {
  const { brandFont } = useTheme();
  const resources = [
    {
      title: 'Documentation',
      description: 'Read the full documentation for this component.',
      iconKey: 'objectBook/Line',
      iconBgColor: 'bg-blue-100',
      iconColor: '#1e40af',
    },
    {
      title: 'Submit feedback',
      description: 'Help us improve by sharing your thoughts.',
      iconKey: 'actionFeedback/Line',
      iconBgColor: 'bg-green-100',
      iconColor: '#166534',
      isExternal: true,
    },
    {
      title: "What's new",
      description: 'Check out the latest updates and improvements.',
      iconKey: 'objectStars/Line',
      iconBgColor: 'bg-purple-100',
      iconColor: '#6b21a8',
    },
    {
      title: 'Contribute',
      description: 'Help us build better components.',
      iconKey: 'actionPencil/Line',
      iconBgColor: 'bg-gray-100',
      iconColor: '#374151',
      isExternal: true,
    },
  ];

  return (
    <div>
      {category && (
        <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
          {category}
        </div>
      )}
      <h1 className="text-5xl font-bold mb-12 text-gray-900" style={{ fontFamily: brandFont }}>{title}</h1>

      <div className="bg-gray-50 border border-gray-200 rounded-3xl p-10">
        <p className="text-base text-gray-600 leading-relaxed">
          This page is under development. Check back soon for comprehensive documentation and examples.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6">
        <div className="bg-white border border-gray-200 rounded-3xl p-8">
          <div className="h-3 bg-gray-100 rounded w-3/4 mb-4"></div>
          <div className="h-3 bg-gray-100 rounded w-full mb-4"></div>
          <div className="h-3 bg-gray-100 rounded w-5/6"></div>
        </div>
        <div className="bg-white border border-gray-200 rounded-3xl p-8">
          <div className="h-3 bg-gray-100 rounded w-2/3 mb-4"></div>
          <div className="h-3 bg-gray-100 rounded w-full mb-4"></div>
          <div className="h-3 bg-gray-100 rounded w-4/5"></div>
        </div>
      </div>

      <ResourceCards resources={resources} />
    </div>
  );
}