import { labubuSeries, rarityColors } from "../../../../lib/series-data";
import type { Metadata, ResolvingMetadata } from 'next';
import {Link} from '../../../../i18n/navigation';
import { Calendar, DollarSign, Star, Tag, Palette, Layers, Info, Image as ImageIcon, ChevronLeft } from 'lucide-react';
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

  return {
    title,
    description,
    keywords: ["Labubu", series.name, series.rarity, "collectible toys", "designer toys"],
    alternates: {
      canonical: locale === routing.defaultLocale ? `https://labubu.city/series/${series.slug}` : `https://labubu.city/${locale}/series/${series.slug}`,
      languages: Object.fromEntries(
        routing.locales.map(loc => [
          loc === 'en' ? 'en-US' : 
          loc === 'zh' ? 'zh-CN' : 'en',
          loc === routing.defaultLocale ? `https://labubu.city/series/${series.slug}` : `https://labubu.city/${loc}/series/${series.slug}`
        ])
      )
    },
    openGraph: {
      title,
      description,
      url: locale === routing.defaultLocale ? `https://labubu.city/series/${series.slug}` : `https://labubu.city/${locale}/series/${series.slug}`,
      images: [
        {
          url: series.imageUrl || '/og-image.jpg',
          width: series.imageUrl ? 1200 : 1200,
          height: series.imageUrl ? 1200 : 630,
          alt: `${series.name} - ${t('seriesDetails.imageAlt')}`
        }
      ],
      type: 'article',
      tags: [series.rarity, ...series.colorVariants],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [series.imageUrl || '/twitter-labubu-series.jpg'],
    }
  };
}

export default async function SeriesDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  
  // 启用静态渲染
  setRequestLocale(locale);
  
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

  return (
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
                <Palette className="w-5 h-5 mr-2 text-pink-500" /> {t('colorVariants')}
              </h3>
              <div className="flex flex-wrap gap-3">
                {series.colorVariants.map((color, index) => (
                  <span 
                    key={index}
                    className={`px-3 py-1.5 rounded-full text-sm ${color === "Chase" ? "bg-yellow-200 text-yellow-900 font-bold border-2 border-yellow-400" : "bg-gray-100 text-gray-700 border border-gray-300"}`}
                  >
                    {color}
                  </span>
                ))}
              </div>
            </div>

            {/* Additional Information (if any) */}
            <div className="bg-indigo-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-indigo-800 mb-3 flex items-center">
                <Info className="w-5 h-5 mr-2" /> {t('seriesDetails.specialFeatures')}
              </h3>
              <ul className="list-disc list-inside text-indigo-700 space-y-1">
                <li>{t('seriesDetails.features.largeFormat')}</li>
                <li>{t('seriesDetails.features.movableEyes')}</li>
                <li>{t('seriesDetails.features.materials')}</li>
                <li>{t('seriesDetails.features.ageRestriction')}</li>
              </ul>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
} 