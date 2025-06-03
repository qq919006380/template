import type { Metadata } from "next"
import { Calendar, DollarSign, Star, TrendingUp, Award, Heart, Package, Sparkles, Target } from "lucide-react"
import { labubuSeries, rarityColors } from "../../../lib/series-data";
import {getTranslations, setRequestLocale} from 'next-intl/server';
import {Link} from '../../../i18n/navigation';
import {routing} from '../../../i18n/routing';
import Image from 'next/image';

// 生成静态参数，确保所有语言页面都能正确生成
export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

// 动态生成元数据 - 完整SEO优化
export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'meta'});
  
  const canonicalUrl = locale === routing.defaultLocale 
    ? 'https://labubu.city/series' 
    : `https://labubu.city/${locale}/series`;

  // 生成hreflang标签
  const languages = Object.fromEntries(
    routing.locales.map(loc => [
      loc === 'en' ? 'en-US' : loc === 'zh' ? 'zh-CN' : loc,
      loc === routing.defaultLocale ? 'https://labubu.city/series' : `https://labubu.city/${loc}/series`
    ])
  );

  return {
    title: t('seriesTitle'),
    description: t('seriesDescription'),
    keywords: ["Labubu series", "Labubu versions", "Labubu pricing", "collectible toys", "limited edition", "rare variants", "POP MART", "designer toys"],
    alternates: {
      canonical: canonicalUrl,
      languages: languages,
    },
    openGraph: {
      title: t('seriesTitle'),
      description: t('seriesDescription'),
      url: canonicalUrl,
      images: [
        {
          url: 'https://labubu.city/og-series.jpg',
          width: 1200,
          height: 630,
          alt: t('seriesTitle')
        }
      ],
      locale: locale === 'en' ? 'en_US' : 'zh_CN',
      alternateLocale: routing.locales.filter(l => l !== locale).map(loc => 
        loc === 'en' ? 'en_US' : 'zh_CN'
      ),
      type: 'website',
      siteName: 'Labubu.city'
    },
    twitter: {
      card: 'summary_large_image',
      title: t('seriesTitle'),
      description: t('seriesDescription'),
      images: ['https://labubu.city/twitter-series.jpg'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    }
  };
}

// 服务端渲染页面组件
export default async function SeriesPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  
  // 启用静态渲染优化
  setRequestLocale(locale);
  
  // 服务端获取翻译
  const t = await getTranslations('series');
  const tCommon = await getTranslations('common');

  // 模拟服务端数据获取 - 这些数据会在构建时预渲染
  const statsData = {
    totalSeries: "12+",
    totalVariants: "60+", 
    limitedEditions: "8",
    collectionRate: "92%",
  };

  // JSON-LD 结构化数据
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: t('title'),
    description: t('subtitle', {labubu: tCommon('labubu')}),
    url: locale === routing.defaultLocale 
      ? 'https://labubu.city/series' 
      : `https://labubu.city/${locale}/series`,
    inLanguage: locale === 'en' ? 'en-US' : 'zh-CN',
    isPartOf: {
      '@type': 'WebSite',
      name: 'Labubu.city',
      url: 'https://labubu.city'
    },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: labubuSeries.length,
      itemListElement: labubuSeries.map((series, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Product',
          name: series.name,
          description: series.description,
          category: 'Collectible Toys',
          brand: {
            '@type': 'Brand',
            name: 'POP MART'
          }
        }
      }))
    }
  };

  return (
    <>
      {/* 结构化数据 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
        {/* Header */}
        <section className="pt-12 pb-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
              {tCommon('labubu')} <span className="text-indigo-600">{t('title')}</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              {t('subtitle', {labubu: tCommon('labubu')})}
            </p>
          </div>
        </section>

        {/* 统计数据 */}
        <section className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              <div className="bg-white rounded-lg p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-indigo-100 rounded-lg">
                  <Package className="w-6 h-6 text-indigo-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{statsData.totalSeries}</div>
                <div className="text-sm text-gray-600">{t('totalSeries')}</div>
              </div>
              
              <div className="bg-white rounded-lg p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-purple-100 rounded-lg">
                  <Sparkles className="w-6 h-6 text-purple-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{statsData.totalVariants}</div>
                <div className="text-sm text-gray-600">{t('totalVariants')}</div>
              </div>
              
              <div className="bg-white rounded-lg p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-yellow-100 rounded-lg">
                  <Award className="w-6 h-6 text-yellow-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{statsData.limitedEditions}</div>
                <div className="text-sm text-gray-600">{t('limitedEditions')}</div>
              </div>
              
              <div className="bg-white rounded-lg p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-green-100 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{statsData.collectionRate}</div>
                <div className="text-sm text-gray-600">{t('collectionRate')}</div>
              </div>
            </div>
          </div>
        </section>

        {/* 系列网格 */}
        <section className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {labubuSeries.map((series) => (
                <div key={series.slug} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group">
                  {series.imageUrl && (
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={series.imageUrl}
                        alt={`${series.name} - ${t('seriesDetails.imageAlt')}`}
                        fill
                        style={{ objectFit: 'cover' }}
                        className="group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  )}
                  
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                        {series.name}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${rarityColors[series.rarity as keyof typeof rarityColors]}`}>
                        {t(`rarity.${series.rarity.toLowerCase().replace(/[\s']/g, '')}`)}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {series.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {series.releaseDate}
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="w-4 h-4 mr-1" />
                        {series.price}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-500">
                        <div className="flex space-x-1 mr-2">
                          {series.colorVariants.slice(0, 3).map((color, index) => (
                            <div
                              key={index}
                              className="w-4 h-4 rounded-full border-2 border-gray-200"
                              style={{ backgroundColor: color.toLowerCase() }}
                            />
                          ))}
                          {series.colorVariants.length > 3 && (
                            <div className="w-4 h-4 rounded-full bg-gray-200 flex items-center justify-center text-xs">
                              +{series.colorVariants.length - 3}
                            </div>
                          )}
                        </div>
                        <span>{t('colorVariants')}</span>
                      </div>
                      
                      <Link
                        href={`/series/${series.slug}`}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        {tCommon('viewMore')}
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 收藏技巧 */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
                {t('collectionTipsTitle')}
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {(['tip1', 'tip2', 'tip3'] as const).map((tipKey, index) => (
                <div key={tipKey} className="text-center p-6 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 bg-indigo-100 rounded-full">
                    {index === 0 && <Target className="w-8 h-8 text-indigo-600" />}
                    {index === 1 && <Star className="w-8 h-8 text-indigo-600" />}
                    {index === 2 && <Heart className="w-8 h-8 text-indigo-600" />}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {t(`collectionTips.${tipKey}.title`)}
                  </h3>
                  <p className="text-gray-600">
                    {t(`collectionTips.${tipKey}.description`)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  )
} 