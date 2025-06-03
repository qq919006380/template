import { MetadataRoute } from 'next'
import { wallpapers } from '../lib/wallpapers-data'
import { labubuSeries } from '../lib/series-data'
import { routing } from '../i18n/routing'

export const runtime = 'edge';

// 生成URL，默认语言不包含前缀
function generateUrl(baseUrl: string, locale: string, path: string): string {
  if (locale === routing.defaultLocale) {
    return `${baseUrl}${path}`
  }
  return `${baseUrl}/${locale}${path}`
}

// 生成多语言替代链接
function generateAlternates(baseUrl: string, path: string) {
  return {
    languages: Object.fromEntries(
      routing.locales.map((loc: string) => [
        loc === 'en' ? 'en-US' : 
        loc === 'zh' ? 'zh-CN' : 'en',
        generateUrl(baseUrl, loc, path)
      ])
    )
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://labubu.city'
  
  // 基础页面路径
  const basePaths = [
    '',
    '/labubu-wallpapers',
    '/series',
    '/blog',
    '/series/angel-in-clouds',
    '/series/the-monsters',
    '/series/zimomo',
    '/blog/labubu-vs-zimomo-difference',
    '/blog/rare-labubu-variants-guide',
    '/blog/labubu-collection-tips'
  ]

  const sitemap: MetadataRoute.Sitemap = []

  // 为每个语言生成页面
  routing.locales.forEach((locale: string) => {
    basePaths.forEach(path => {
      sitemap.push({
        url: generateUrl(baseUrl, locale, path),
        lastModified: new Date(),
        changeFrequency: path === '' ? 'daily' : 
                       path.includes('/blog/') ? 'weekly' :
                       path.includes('/series/') ? 'monthly' : 'weekly',
        priority: path === '' ? 1 : 
                 path === '/labubu-wallpapers' ? 0.9 :
                 path.includes('/blog/') ? 0.7 :
                 path.includes('/series/') ? 0.8 : 0.6,
        // 添加多语言替代链接
        alternates: generateAlternates(baseUrl, path)
      })
    })
  })

  // 博客页面
  const blogPages = [
    'labubu-vs-zimomo-difference',
    'rare-labubu-variants-guide', 
    'labubu-collection-tips',
    'complete-labubu-series-guide',
    'angel-in-clouds-series-review'
  ].flatMap(slug => 
    routing.locales.map((locale: string) => ({
      url: generateUrl(baseUrl, locale, `/blog/${slug}`),
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
      alternates: generateAlternates(baseUrl, `/blog/${slug}`)
    }))
  )

  // 系列页面
  const seriesPages = labubuSeries.flatMap((series) => 
    routing.locales.map((locale: string) => ({
      url: generateUrl(baseUrl, locale, `/series/${series.slug}`),
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
      alternates: generateAlternates(baseUrl, `/series/${series.slug}`)
    }))
  )

  // 壁纸页面 (每个category)
  const uniqueCategories = [...new Set(wallpapers.map((wallpaper: any) => wallpaper.category))]
  const wallpaperPages = uniqueCategories.flatMap((category: string) => 
    routing.locales.map((locale: string) => ({
      url: generateUrl(baseUrl, locale, `/labubu-wallpapers/${category}`),
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.6,
      alternates: generateAlternates(baseUrl, `/labubu-wallpapers/${category}`)
    }))
  )

  return [...sitemap, ...blogPages, ...seriesPages, ...wallpaperPages]
} 