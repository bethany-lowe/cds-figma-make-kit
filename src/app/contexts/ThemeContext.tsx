import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Import token files
import primitiveDesignTokens from '../../imports/primitive-design-tokens.json';
import primitiveBrandTelusTokens from '../../imports/primitive-brand-telus-tokens.json';
import primitiveBrandHomiTokens from '../../imports/primitive-brand-homi-tokens.json';
import aliasThemeTelusTokens from '../../imports/alias-theme-telus-tokens.json';
import aliasThemeHomiTokens from '../../imports/alias-theme-homi-tokens.json';

type Brand = 'telus' | 'homi';

interface ThemeContextType {
  brand: Brand;
  setBrand: (brand: Brand) => void;
  tokens: {
    primitives: any;
    brandPrimitives: any;
    themeAlias: any;
  };
  brandName: string;
  brandFont: string;
  primaryColor: string;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Safely resolve a "{a.b.c}" token reference against a primitives object
function resolveTokenRef(ref: string, prims: any): string {
  try {
    const path = ref.replace(/^\{|\}$/g, '').split('.');
    let node: any = prims;
    for (let i = 0; i < path.length; i++) {
      node = node[path[i]];
      if (node === undefined || node === null) return '';
    }
    return typeof node.$value === 'string' ? node.$value : '';
  } catch {
    return '';
  }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [brand, setBrand] = useState<Brand>('telus');

  // Sync data-brand attribute on <html> so CSS custom properties switch
  useEffect(() => {
    document.documentElement.setAttribute('data-brand', brand);
  }, [brand]);

  const brandPrimitives: any = brand === 'telus' ? primitiveBrandTelusTokens : primitiveBrandHomiTokens;
  const themeAlias: any = brand === 'telus' ? aliasThemeTelusTokens : aliasThemeHomiTokens;
  const brandName = brand === 'telus' ? 'TELUS' : 'HOMI';

  const brandFont: string = brand === 'telus'
    ? (primitiveBrandTelusTokens as any)?.brand?.telus?.font?.sans?.serif?.$value ?? 'Noto Sans'
    : (primitiveBrandHomiTokens as any)?.brand?.homi?.font?.serif?.$value ?? 'Merriweather';

  // Resolve color.primary.pure through alias → brand primitives
  const fallbackPrimary = brand === 'telus' ? '#4b286d' : '#258471';
  const primaryAliasRef: string = themeAlias?.color?.primary?.pure?.$value ?? '';
  const primaryColor: string = primaryAliasRef.startsWith('{')
    ? resolveTokenRef(primaryAliasRef, brandPrimitives) || fallbackPrimary
    : primaryAliasRef || fallbackPrimary;

  const value: ThemeContextType = {
    brand,
    setBrand,
    tokens: {
      primitives: primitiveDesignTokens,
      brandPrimitives,
      themeAlias,
    },
    brandName,
    brandFont,
    primaryColor,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}