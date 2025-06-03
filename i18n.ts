import {getRequestConfig} from 'next-intl/server';
import {hasLocale} from 'next-intl';
import {routing} from './i18n/routing';

// 支持的语言列表
export const locales = ['us', 'ph', 'my', 'tw'] as const;
export type Locale = typeof locales[number];

export default getRequestConfig(async ({requestLocale}) => {
  // 通常对应于 [locale] 段
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default
  };
}); 