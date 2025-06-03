import React from 'react';
import {setRequestLocale, getTranslations} from 'next-intl/server';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{locale: string}>;
}

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'about'});
  
  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
    },
  };
}

export default async function AboutPage({params}: PageProps) {
  const {locale} = await params;
  setRequestLocale(locale);
  
  const t = await getTranslations('about');

  return (
    <div className="min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t('title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 leading-relaxed">
            {t('description')}
          </p>
          
          {/* Add your about content here */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-600">
                Add your mission statement here. Describe what drives your company and what you aim to achieve.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-600">
                Add your vision statement here. Describe where you see your company in the future.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 