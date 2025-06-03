import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
  // 支持的语言列表：英语和中文
  locales: ['en', 'zh'],
  
  // 默认语言
  defaultLocale: 'en',
  
  // 只有非默认语言才在URL中显示语言前缀
  localePrefix: 'as-needed'
}); 