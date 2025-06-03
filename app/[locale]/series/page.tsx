import type { Metadata } from "next"
import { Calendar, DollarSign, Star, TrendingUp, Award, Heart, Package, Sparkles, Target } from "lucide-react"
import { labubuSeries, rarityColors } from "../../../lib/series-data";
import {getTranslations, setRequestLocale} from 'next-intl/server';
import {Link} from '../../../i18n/navigation';
import {routing} from '../../../i18n/routing';
import { 
  BASE_URL, 
  mapLocale, 
  generateAlternateLanguageLinks, 
  generateCanonicalUrl 
} from '../../../lib/metadata-utils'; // 确保路径正确

// 导入新组件
import SeriesStats from "../../../components/SeriesStats";
import SeriesCard from "../../../components/SeriesCard";
import CollectionTipsSection from "../../../components/CollectionTipsSection";

// 生成静态参数，确保所有语言页面都能正确生成
export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

// 动态生成元数据
export async function generateMetadata({params}: {params: {locale: string}}): Promise<Metadata> {
  const {locale} = params;
  const t = await getTranslations({locale, namespace: 'meta'}); // 使用 {locale, namespace: ...} 标准方式
  
  const seriesPagePath = "/series"; // 此页面的基础路径 (不含区域设置)

  const canonical = generateCanonicalUrl(locale, seriesPagePath);
  const languages = generateAlternateLanguageLinks(seriesPagePath);

  return {
    title: t('seriesTitle'),
    description: t('seriesDescription'),
    keywords: ["Labubu series", "Labubu versions", "Labubu pricing", "collectible toys", "limited edition", "rare variants"],
    alternates: {
      canonical: canonical,
      languages: languages,
    },
    openGraph: {
      title: t('seriesTitle'),
      description: t('seriesDescription'),
      url: canonical, // 使用生成的 canonical URL
      images: [
        {
          url: `${BASE_URL}/og-image.jpg`, // 确保 OG 图片使用绝对路径
          width: 1200,
          height: 630,
          alt: t('seriesTitle')
        }
      ],
      locale: mapLocale(locale, 'og'),
      alternateLocale: routing.locales.filter(l => l !== locale).map(loc => mapLocale(loc, 'og'))
    },
    twitter: {
      card: 'summary_large_image',
      title: t('seriesTitle'),
      description: t('seriesDescription'),
      images: [`${BASE_URL}/twitter-labubu-series.jpg`], // 确保 Twitter 图片使用绝对路径
    }
  };
}

export default async function SeriesPage({params: {locale}}: {params: {locale: string}}) {
  
  setRequestLocale(locale);
  
  const t = await getTranslations('series');
  const tCommon = await getTranslations('common');

  // 这些值可以从API获取或作为常量定义，这里作为示例
  const statsData = {
    totalSeries: "12+",
    totalVariants: "60+",
    limitedEditions: "8",
    collectionRate: "92%",
  };

  return (
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

      {/* Stats Section - 使用新组件 */}
      <SeriesStats 
        totalSeries={statsData.totalSeries}
        totalVariants={statsData.totalVariants}
        limitedEditions={statsData.limitedEditions}
        collectionRate={statsData.collectionRate}
        t={t} 
      />

      {/* Series Grid - 使用新组件 */}
      <section className="pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {labubuSeries.map((series) => (
              <SeriesCard key={series.id} series={series} t={t} locale={locale} />
            ))}
          </div>
        </div>
      </section>

      {/* Collection Tips - 使用新组件 */}
      <CollectionTipsSection t={t} />
    </div>
  )
} 