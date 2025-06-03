import React from 'react';
import { Target, Award, Heart } from "lucide-react";

interface CollectionTipsSectionProps {
  t: (key: string) => string;
}

interface TipItem {
  icon: React.ReactNode;
  titleKey: string;
  descriptionKey: string;
  bgColor: string;
}

export default function CollectionTipsSection({ t }: CollectionTipsSectionProps) {
  const tips: TipItem[] = [
    {
      icon: <Target className="w-8 h-8 text-white" />,
      titleKey: "collectionTips.tip1.title",
      descriptionKey: "collectionTips.tip1.description",
      bgColor: "bg-pink-500",
    },
    {
      icon: <Award className="w-8 h-8 text-white" />,
      titleKey: "collectionTips.tip2.title",
      descriptionKey: "collectionTips.tip2.description",
      bgColor: "bg-purple-500",
    },
    {
      icon: <Heart className="w-8 h-8 text-white" />,
      titleKey: "collectionTips.tip3.title",
      descriptionKey: "collectionTips.tip3.description",
      bgColor: "bg-indigo-500",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-12">{t('collectionTipsTitle')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tips.map((tip, index) => (
            <div key={index} className="text-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
              <div className={`w-20 h-20 ${tip.bgColor} rounded-full flex items-center justify-center mx-auto mb-6 shadow-md`}>
                {tip.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{t(tip.titleKey)}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{t(tip.descriptionKey)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 