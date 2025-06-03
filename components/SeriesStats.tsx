import { Package, Sparkles, Award, TrendingUp } from "lucide-react";

interface SeriesStatsProps {
  totalSeries: string;
  totalVariants: string;
  limitedEditions: string;
  collectionRate: string;
  t: (key: string) => string; // Type for the translation function
}

export default function SeriesStats({
  totalSeries,
  totalVariants,
  limitedEditions,
  collectionRate,
  t
}: SeriesStatsProps) {
  const statsItems = [
    {
      icon: <Package className="w-8 h-8" />,
      value: totalSeries, // Placeholder, actual value might come from data or props
      label: t('totalSeries'),
      color: "text-pink-600",
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      value: totalVariants, // Placeholder
      label: t('totalVariants'),
      color: "text-purple-600",
    },
    {
      icon: <Award className="w-8 h-8" />,
      value: limitedEditions, // Placeholder
      label: t('limitedEditions'),
      color: "text-indigo-600",
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      value: collectionRate, // Placeholder
      label: t('collectionRate'),
      color: "text-green-600",
    },
  ];

  return (
    <section className="pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsItems.map((item, index) => (
            <div key={index} className="bg-white rounded-lg p-6 text-center shadow-md">
              <div className={`text-3xl font-bold ${item.color} mb-2 flex items-center justify-center gap-2`}>
                {item.icon}
                {item.value}
              </div>
              <p className="text-gray-600">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 