import { ArrowRight, ExternalLink } from 'lucide-react';
import iconManifest from '../../imports/icon-manifest.json';

// Renders an icon from the uploaded manifest by key (e.g. "objectBook/Line")
function ManifestIcon({ iconKey, color }: { iconKey: string; color: string }) {
  const entry = (iconManifest as Record<string, { svg: string }>)[iconKey];
  if (!entry) return null;
  return (
    <span
      style={{ color, width: 24, height: 24, display: 'block', flexShrink: 0 }}
      dangerouslySetInnerHTML={{ __html: entry.svg }}
    />
  );
}

export interface Resource {
  title: string;
  description: string;
  /** Key from the uploaded icon manifest, e.g. "objectBook/Line" */
  iconKey: string;
  /** Tailwind bg class for the icon tile, e.g. "bg-yellow-100" */
  iconBgColor: string;
  /** Icon colour – defaults to a dark shade that matches iconBgColor */
  iconColor?: string;
  link?: string;
  isExternal?: boolean;
}

interface ResourceCardsProps {
  resources: Resource[];
}

export function ResourceCards({ resources }: ResourceCardsProps) {
  return (
    <div className="mt-24 pt-12 border-t border-gray-200">
      <h2 className="text-2xl font-semibold mb-6 text-gray-900">Resources</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {resources.map((resource, index) => (
          <button
            key={index}
            className="flex items-center gap-4 p-5 bg-white border border-gray-200 rounded-3xl hover:border-gray-300 hover:shadow-sm transition-all text-left group"
          >
            <div
              className={`w-14 h-14 ${resource.iconBgColor} rounded-xl flex items-center justify-center flex-shrink-0`}
            >
              <ManifestIcon
                iconKey={resource.iconKey}
                color={resource.iconColor ?? '#374151'}
              />
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="text-base font-semibold text-gray-900 mb-1">
                {resource.title}
              </h3>
              <p className="text-sm text-gray-600">{resource.description}</p>
            </div>

            {resource.isExternal ? (
              <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-gray-600 flex-shrink-0 transition-colors" />
            ) : (
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 flex-shrink-0 transition-colors" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
