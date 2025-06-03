import { labubuSeries, rarityColors } from "../../../../lib/series-data";
import type { Metadata, ResolvingMetadata } from 'next';
import {Link} from '../../../../i18n/navigation';
import { Calendar, DollarSign, Star, Tag, Palette, Layers, Info, Image as ImageIcon, ChevronLeft, Sparkles, Heart } from 'lucide-react';
import Image from 'next/image';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import {routing} from '../../../../i18n/routing';

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

// 生成静态参数，确保所有语言和系列页面都能正确生成
export function generateStaticParams() {
  const params: {locale: string; slug: string}[] = [];
  
  for (const locale of routing.locales) {
    for (const series of labubuSeries) {
      params.push({
        locale: locale,
        slug: series.slug
      });
    }
  }
  
  return params;
}

// 动态生成元数据 - 完整SEO优化
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { locale, slug } = await params;
  const series = labubuSeries.find((s) => s.slug === slug);

  if (!series) {
    return {
      title: "Series Not Found",
      description: "The Labubu series you are looking for could not be found.",
    };
  }

  const t = await getTranslations({locale, namespace: 'series'});
  const title = `${series.name} | ${t('seriesDetails.metaTitle')}`;
  const description = t('seriesDetails.metaDescription', {
    seriesName: series.name,
    releaseDate: series.releaseDate,
    price: series.price,
    rarity: series.rarity,
    description: series.description
  });

  const canonicalUrl = locale === routing.defaultLocale 
    ? `https://labubu.city/series/${series.slug}` 
    : `https://labubu.city/${locale}/series/${series.slug}`;

  // 生成hreflang标签
  const languages = Object.fromEntries(
    routing.locales.map(loc => [
      loc === 'en' ? 'en-US' : loc === 'zh' ? 'zh-CN' : loc,
      loc === routing.defaultLocale ? `https://labubu.city/series/${series.slug}` : `https://labubu.city/${loc}/series/${series.slug}`
    ])
  );

  return {
    title,
    description,
    keywords: ["Labubu", series.name, series.rarity, "collectible toys", "designer toys", "POP MART", "blind box"],
    alternates: {
      canonical: canonicalUrl,
      languages: languages,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      images: [
        {
          url: series.imageUrl || 'https://labubu.city/og-series.jpg',
          width: series.imageUrl ? 1200 : 1200,
          height: series.imageUrl ? 1200 : 630,
          alt: `${series.name} - ${t('seriesDetails.imageAlt')}`
        }
      ],
      type: 'article',
      locale: locale === 'en' ? 'en_US' : 'zh_CN',
      siteName: 'Labubu.city',
      tags: [series.rarity, ...series.colorVariants],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [series.imageUrl || 'https://labubu.city/twitter-series.jpg'],
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
export default async function SeriesDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  
  // 启用静态渲染优化
  setRequestLocale(locale);
  
  // 服务端获取翻译
  const t = await getTranslations('series');
  const tCommon = await getTranslations('common');
  
  const series = labubuSeries.find((s) => s.slug === slug);

  if (!series) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-purple-50 flex flex-col items-center justify-center text-center p-4">
        <h1 className="text-4xl font-bold text-red-600 mb-4">{t('seriesDetails.notFound.title')}</h1>
        <p className="text-xl text-gray-700 mb-8">
          {t('seriesDetails.notFound.description')}
        </p>
        <Link 
          href="/series"
          className="inline-flex items-center px-6 py-3 border border-transparent text-lg font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 mr-2" />
          {t('seriesDetails.backToSeries')}
        </Link>
      </div>
    );
  }

  // JSON-LD 结构化数据
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: series.name,
    description: series.description,
    image: series.imageUrl,
    url: locale === routing.defaultLocale 
      ? `https://labubu.city/series/${series.slug}` 
      : `https://labubu.city/${locale}/series/${series.slug}`,
    brand: {
      '@type': 'Brand',
      name: 'POP MART'
    },
    category: 'Collectible Toys',
    offers: {
      '@type': 'Offer',
      price: series.price.replace('$', ''),
      priceCurrency: 'USD',
      availability: series.status === 'Available' ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock'
    },
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'Rarity',
        value: series.rarity
      },
      {
        '@type': 'PropertyValue',
        name: 'Release Date',
        value: series.releaseDate
      }
    ]
  };

  return (
    <>
      {/* 结构化数据 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Back to series link */}
          <div className="mb-8">
            <Link 
              href="/series"
              className="inline-flex items-center text-indigo-600 hover:text-indigo-800 transition-colors group"
            >
              <ChevronLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
              {t('seriesDetails.backToSeries')}
            </Link>
          </div>

          <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
            {series.imageUrl && (
              <div className="w-full h-96 relative">
                <Image 
                  src={series.imageUrl} 
                  alt={`${series.name} - ${t('seriesDetails.mainImageAlt')}`} 
                  fill
                  style={{ objectFit: 'contain' }}
                  className="bg-gray-100"
                  priority
                  sizes="(max-width: 768px) 100vw, 896px"
                />
              </div>
            )}
            <div className="p-8 md:p-12">
              {/* Header */}
              <div className="mb-6">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2">
                  <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-2 sm:mb-0">
                    {series.name}
                  </h1>
                  <span className={`mt-1 sm:mt-0 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap ${rarityColors[series.rarity as keyof typeof rarityColors]}`}>
                    {t(`rarity.${series.rarity.toLowerCase().replace(/[\s']/g, '')}`)}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-700 text-lg mb-8 leading-relaxed">
                {series.description}
              </p>

              {/* Key Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-8 border-t border-b border-gray-200 py-8">
                <div className="flex items-start">
                  <Calendar className="w-6 h-6 mr-3 text-indigo-500 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500">{t('seriesDetails.releaseDate')}</p>
                    <p className="text-lg font-semibold text-gray-800">{series.releaseDate}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <DollarSign className="w-6 h-6 mr-3 text-green-500 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500">{t('seriesDetails.referencePrice')}</p>
                    <p className="text-lg font-semibold text-gray-800">{series.price}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Star className="w-6 h-6 mr-3 text-yellow-500 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500">{t('seriesDetails.collectorValue')}</p>
                    <p className="text-lg font-semibold text-yellow-600">{series.rarity}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Tag className="w-6 h-6 mr-3 text-purple-500 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500">{t('status')}</p>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${series.status === "Sold Out" ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"}`}>
                      {t(`statusLabel.${series.status.toLowerCase().replace(/\s/g, '')}`)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Color Variants */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <Palette className="w-5 h-5 mr-2 text-indigo-500" />
                  {t('colorVariants')}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {series.colorVariants.map((color, index) => (
                    <div
                      key={index}
                      className="flex items-center px-4 py-2 bg-gray-50 rounded-lg border hover:shadow-md transition-shadow"
                    >
                      <div
                        className="w-4 h-4 rounded-full border-2 border-gray-300 mr-3"
                        style={{ backgroundColor: color.toLowerCase() }}
                      />
                      <span className="text-sm font-medium text-gray-700">{color}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Special Features */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <Sparkles className="w-5 h-5 mr-2 text-indigo-500" />
                  {t('seriesDetails.specialFeatures')}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(['largeFormat', 'movableEyes', 'materials', 'ageRestriction'] as const).map((feature) => (
                    <div key={feature} className="flex items-start p-4 bg-gray-50 rounded-lg">
                      <Info className="w-5 h-5 mr-3 text-indigo-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">{t(`seriesDetails.features.${feature}`)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/series"
                  className="flex-1 inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5 mr-2" />
                  {t('seriesDetails.backToSeries')}
                </Link>
                <button
                  className="flex-1 inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <Heart className="w-5 h-5 mr-2" />
                  {tCommon('learnMore')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 