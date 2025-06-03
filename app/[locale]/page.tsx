import React from 'react';
import {setRequestLocale, getTranslations} from 'next-intl/server';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{locale: string}>;
}

// 生成元数据
export async function generateMetadata({params}: PageProps): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'meta'});
  const tHome = await getTranslations({locale, namespace: 'home'});
  
  return {
    title: tHome('title'),
    description: tHome('description'),
    openGraph: {
      title: tHome('title'),
      description: tHome('description'),
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: tHome('title'),
      description: tHome('description'),
    },
  };
}

export default async function HomePage({params}: PageProps) {
  const {locale} = await params;
  
  // 启用静态渲染
  setRequestLocale(locale);
  
  // 获取翻译
  const t = await getTranslations('home');
  const tCommon = await getTranslations('common');

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 to-purple-700 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {t('hero.title')}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              {t('hero.subtitle')}
            </p>
            <button className="bg-white text-blue-600 font-semibold px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors duration-200">
              {t('hero.cta')}
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('features.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t('features.subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((num) => (
              <div key={num} className="text-center p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow duration-200">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl font-bold">{num}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {t(`features.feature${num}.title`)}
                </h3>
                <p className="text-gray-600">
                  {t(`features.feature${num}.description`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
          <button className="bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200">
            {tCommon('getStarted')}
          </button>
        </div>
      </section>
    </div>
  );
}
