import { Link } from "../i18n/navigation"; // Corrected import path
import { LabubuSeries, rarityColors } from "../lib/series-data"; // Corrected import path
import { Calendar, DollarSign, Star, Heart } from "lucide-react";
import Image from 'next/image'; // 使用 Next/Image 组件

interface SeriesCardProps {
  series: LabubuSeries;
  t: (key: string, params?: Record<string, string | number>) => string;
  locale: string; // 需要 locale 来构建正确的链接
}

// 辅助函数，用于生成稀有度翻译键
const getRarityTranslationKey = (rarity: string): string => {
  return `rarity.${rarity.toLowerCase().replace(/[\s']/g, '')}`;
};

// 辅助函数，用于生成状态翻译键
const getStatusTranslationKey = (status: string): string => {
  return `statusLabel.${status.toLowerCase().replace(' ', '')}`;
};

export default function SeriesCard({ series, t, locale }: SeriesCardProps) {
  const seriesLink = `/series/${series.slug}`; // Link component will handle locale
  
  const imageUrl = series.imageUrl?.startsWith('http') 
    ? series.imageUrl 
    : series.imageUrl 
    ? `${series.imageUrl}` // 如果已经是 /series/image.jpg 这样的，就不需要再加斜杠
    : '/images/placeholder.png'; // 提供一个备用图片

  return (
    <Link 
      href={seriesLink} 
      locale={locale} // Explicitly pass locale to ensure correct routing
      className="block bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 ease-in-out group"
    >
      {/* Series Header & Image Container */}
      <div className="bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-100 p-6">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-2xl font-bold text-gray-900 mb-1 group-hover:text-indigo-600 transition-colors duration-300">{series.name}</h3>
          <span 
            className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${rarityColors[series.rarity as keyof typeof rarityColors] || 'bg-gray-100 text-gray-800'}`}
          >
            {t(getRarityTranslationKey(series.rarity))}
          </span>
        </div>
        
        <div className="w-full h-56 bg-white/50 rounded-lg flex items-center justify-center mb-4 overflow-hidden relative aspect-video">
          {series.imageUrl ? (
            <Image 
              src={imageUrl} 
              alt={t('seriesDetails.imageAlt', { seriesName: series.name })} 
              fill 
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // 示例sizes
              className="object-contain transition-transform duration-500 ease-in-out group-hover:scale-105"
            />
          ) : (
            <div className="w-20 h-20 bg-pink-200 rounded-full flex items-center justify-center">
              <Heart className="w-10 h-10 text-pink-500" />
            </div>
          )}
        </div>
      </div>

      {/* Series Details */}
      <div className="p-6">
        <p className="text-gray-700 mb-5 text-sm leading-relaxed line-clamp-3">{series.description}</p>
        
        <div className="space-y-3 mb-5">
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="w-4 h-4 mr-2.5 text-indigo-500 flex-shrink-0" />
            <span>{t('seriesDetails.releaseDate')}: {series.releaseDate}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <DollarSign className="w-4 h-4 mr-2.5 text-green-500 flex-shrink-0" />
            <span>{t('seriesDetails.referencePrice')}: {series.price}</span>
          </div>
          <div className="flex items-center text-sm">
            <Star className="w-4 h-4 mr-2.5 text-yellow-500 flex-shrink-0" />
            <span className="font-medium text-gray-700">{series.rarity}</span>
          </div>
        </div>

        <div className="mb-5">
          <h4 className="text-xs text-gray-500 mb-2 font-medium tracking-wide uppercase">{t('colorVariants')}</h4>
          <div className="flex flex-wrap gap-2">
            {series.colorVariants.map((color, index) => (
              <span 
                key={index}
                className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all duration-300 ease-in-out group-hover:shadow-md ${color.toLowerCase() === "chase" || color.toLowerCase() === "secret" 
                    ? "bg-gradient-to-r from-yellow-400 to-amber-500 text-white border border-yellow-600 shadow-sm hover:shadow-lg"
                    : "bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200"}`}
              >
                {color}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div>
            <h4 className="text-xs text-gray-500 mb-1 font-medium tracking-wide uppercase">{t('status')}</h4>
            <span 
              className={`px-3 py-1.5 rounded-full text-xs font-semibold ${series.status.toLowerCase() === "sold out" 
                  ? "bg-red-100 text-red-700 ring-1 ring-red-200"
                  : series.status.toLowerCase() === "limited" 
                  ? "bg-amber-100 text-amber-700 ring-1 ring-amber-200"
                  : "bg-green-100 text-green-700 ring-1 ring-green-200"}`}
            >
              {t(getStatusTranslationKey(series.status))}
            </span>
          </div>
          <div className="text-indigo-600 group-hover:text-indigo-700 font-semibold text-sm transition-colors duration-300">
            {t('common.viewDetails', {defaultValue: 'View Details'})} →
          </div>
        </div>
      </div>
    </Link>
  );
} 