import { routing } from '../i18n/routing';

export const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://labubu.city';

export type LocaleMappingType = 'og' | 'html' | 'hreflang';

/**
 * Maps a locale to a specific format for OpenGraph, HTML lang, or Hreflang.
 * @param locale The input locale (e.g., 'en', 'zh').
 * @param type The type of mapping required.
 * @returns The mapped locale string.
 */
export const mapLocale = (locale: string, type: LocaleMappingType): string => {
  const ogMapping: Record<string, string> = { 'en': 'en_US', 'zh': 'zh_CN' };
  const htmlLangMapping: Record<string, string> = { 'en': 'en', 'zh': 'zh-CN' };
  const hreflangMapping: Record<string, string> = { 'en': 'en-US', 'zh': 'zh-CN' };

  switch (type) {
    case 'og':
      return ogMapping[locale] || 'en_US'; // Default for OpenGraph
    case 'html':
      return htmlLangMapping[locale] || 'en'; // Default for HTML lang
    case 'hreflang':
      return hreflangMapping[locale] || 'en-US'; // Default for Hreflang
    default:
      // Exhaustive check (should not happen with TypeScript)
      // const _exhaustiveCheck: never = type;
      return locale; // Fallback
  }
};

/**
 * Generates an object containing alternate language links for a given path.
 * @param currentPath The current page path (e.g., '/series', '/blog/my-post'). Should not include locale prefix.
 * @returns An object mapping hreflang locale codes to full URLs.
 */
export const generateAlternateLanguageLinks = (currentPath: string): Record<string, string> => {
  const alternates: Record<string, string> = {};
  const basePath = currentPath === '/' ? '' : currentPath; // Avoid double slash for root

  routing.locales.forEach((loc) => {
    const fullUrl = routing.defaultLocale === loc 
      ? `${BASE_URL}${basePath}` 
      : `${BASE_URL}/${loc}${basePath}`;
    alternates[mapLocale(loc, 'hreflang')] = fullUrl;
  });
  return alternates;
};

/**
 * Generates the canonical URL for a given locale and path.
 * @param locale The current locale.
 * @param currentPath The current page path (e.g., '/series'). Should not include locale prefix.
 * @returns The full canonical URL.
 */
export const generateCanonicalUrl = (locale: string, currentPath: string): string => {
  const basePath = currentPath === '/' ? '' : currentPath;
  if (locale === routing.defaultLocale) {
    return `${BASE_URL}${basePath}`;
  }
  return `${BASE_URL}/${locale}${basePath}`;
}; 