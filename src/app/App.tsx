import { TabNavPage } from './components/TabNavPage';
import { DocAnnotationsPage } from './components/DocAnnotationsPage';
import { DocTemplatePage } from './components/DocTemplatePage';
import { AppNavPage } from './components/AppNavPage';
import { useState } from 'react';
import { Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ThemeProvider } from './contexts/ThemeContext';
import { ThemeSwitcher } from './components/ThemeSwitcher';
import { Sidebar } from './components/Sidebar';
import { OverviewPage } from './components/OverviewPage';
import { DesignTokensPage } from './components/DesignTokensPage';
import { ButtonPage } from './components/ButtonPage';
import { KitPage } from './components/KitPage';
import { ColorsPage } from './components/ColorsPage';
import { BrandColorPage } from './components/BrandColorPage';
import { ThemePage } from './components/ThemePage';
import { TypographyPage } from './components/TypographyPage';
import { PlaceholderPage } from './components/PlaceholderPage';
import { SpacingPage } from './components/SpacingPage';
import { BorderWidthPage } from './components/BorderWidthPage';
import { BorderRadiusPage } from './components/BorderRadiusPage';
import { IconLibraryPage } from './components/IconLibraryPage';
import { IconSizePage } from './components/IconSizePage';
import { IconUsagePage } from './components/IconUsagePage';
import { ElevationPage } from './components/ElevationPage';
import { DimensionPage } from './components/DimensionPage';
import { SemanticColorPage } from './components/SemanticColorPage';
import { LayoutPage } from './components/LayoutPage';
import { TogglePage } from './components/TogglePage';
import { TagPage } from './components/TagPage';
import { RadioPage } from './components/RadioPage';
import { CheckboxPage } from './components/CheckboxPage';
import { FeedbackCaptionPage } from './components/FeedbackCaptionPage';
import { SliderPage } from './components/SliderPage';
import { ProgressBarPage } from './components/ProgressBarPage';
import { BannerPage } from './components/BannerPage';
import { SnackbarPage } from './components/SnackbarPage';
import { DividerPage } from './components/DividerPage';
import { PillPage } from './components/PillPage';
import { InputFieldPage } from './components/InputFieldPage';
import { AiAssistantPage } from './components/AiAssistantPage';
import { ButtonGroupPage } from './components/ButtonGroupPage';
import { GitHubTokenLoader } from './components/GitHubTokenLoader';

export default function App() {
  const [currentPath, setCurrentPath] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderPage = () => {
    switch (currentPath) {
      case 'overview':
        return <OverviewPage onNavigate={setCurrentPath} />;
      case 'overview/design-tokens':
        return <DesignTokensPage />;
      case 'components/button':
        return <ButtonPage />;
      case 'components/button-group':
        return <ButtonGroupPage />;
      case 'components/toggle':
        return <TogglePage />;
      case 'components/tag':
        return <TagPage />;
      case 'components/radio':
        return <RadioPage />;
      case 'components/checkbox':
        return <CheckboxPage />;
      case 'components/feedback-caption':
        return <FeedbackCaptionPage />;
      case 'components/slider':
        return <SliderPage />;
      case 'components/progress-bar':
        return <ProgressBarPage />;
      case 'components/banner':
        return <BannerPage />;
      case 'components/snackbar':
        return <SnackbarPage />;
      case 'components/divider':
        return <DividerPage />;
      case 'components/pill':
        return <PillPage />;
      case 'components/input-field':
        return <InputFieldPage />;
      case 'components/ai-assistant':
        return <AiAssistantPage />;
      case 'components/app-nav':
        return <AppNavPage />;
      case 'components/tab-nav':
        return <TabNavPage />;
      case 'utility/doc-annotations':
        return <DocAnnotationsPage />;
      case 'utility/doc-template':
        return <DocTemplatePage />;
      case 'components/kit':
        return <KitPage onNavigate={setCurrentPath} />;
      case 'foundations/global-color':
        return <ColorsPage />;
      case 'foundations/brand-color':
        return <BrandColorPage />;
      case 'foundations/semantic-color':
        return <SemanticColorPage />;
      case 'foundations/layout':
        return <LayoutPage />;
      case 'brand-expression/brand-palette':
        return <ThemePage />;
      case 'foundations/typography':
        return <TypographyPage />;
      case 'foundations/spacing':
        return <SpacingPage />;
      case 'foundations/border-width':
        return <BorderWidthPage />;
      case 'foundations/border-radius':
        return <BorderRadiusPage />;
      case 'foundations/elevation':
        return <ElevationPage />;
      case 'foundations/dimension':
        return <DimensionPage />;
      case 'iconography/icon-library':
        return <IconLibraryPage />;
      case 'iconography/icon-size':
        return <IconSizePage />;
      case 'iconography/icon-usage':
        return <IconUsagePage />;
      case 'components/card':
        return <PlaceholderPage title="Card" category="Components" />;
      case 'patterns/navigation':
        return <PlaceholderPage title="Navigation" category="Patterns" />;
      case 'patterns/forms':
        return <PlaceholderPage title="Forms" category="Patterns" />;
      case 'education/best-practices':
        return <PlaceholderPage title="Best Practices" category="Education" />;
      case 'education/accessibility':
        return <PlaceholderPage title="Accessibility" category="Education" />;
      case 'utility/resources':
        return <PlaceholderPage title="Resources" category="Utility" />;
      case 'utility/changelog':
        return <PlaceholderPage title="Changelog" category="Utility" />;
      default:
        return <OverviewPage onNavigate={setCurrentPath} />;
    }
  };

  return (
    <ThemeProvider>
      <GitHubTokenLoader />
      <div className="min-h-screen" style={{ backgroundColor: '#FAFAFA' }}>
        {/* Fixed floating theme switcher — top right */}
        <div className="fixed top-6 right-6 z-[100]">
          <ThemeSwitcher />
        </div>

        <div className="max-w-[1600px] mx-auto min-h-screen flex px-4 lg:px-10 xl:px-20 pt-6 lg:pt-12 xl:pt-16" style={{ backgroundColor: '#FAFAFA' }}>
          <Sidebar
            onNavigate={setCurrentPath}
            currentPath={currentPath}
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />
          <main className="flex-1 overflow-hidden">
            <div className="lg:hidden sticky top-0 border-b border-gray-200 z-30 px-6 py-4" style={{ backgroundColor: '#FAFAFA' }}>
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-2 hover:bg-gray-100 rounded transition-colors"
              >
                <Menu className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            <div className="pt-6 px-6 lg:px-20 xl:px-28 pb-16">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPath}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.18, ease: 'easeOut' }}
                >
                  {renderPage()}
                </motion.div>
              </AnimatePresence>
            </div>
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
}