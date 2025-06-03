import React from "react"
import "../globals.css"
import { nunito } from "../fonts"
import type { Metadata } from "next"
import JsonLd from "../../components/JsonLd"
import Navigation from "../../components/Navigation"
import Footer from "../../components/Footer"
import GoogleAnalytics from "../../components/GoogleAnalytics"
import {NextIntlClientProvider} from 'next-intl';
import {getMessages, setRequestLocale, getTranslations} from 'next-intl/server';
import {hasLocale} from 'next-intl';
import {notFound} from 'next/navigation';
import {routing} from '../../i18n/routing';
import { 
  BASE_URL, 
  mapLocale, 
  generateAlternateLanguageLinks, 
  generateCanonicalUrl 
} from '../../lib/metadata-utils';

// 动态生成元数据
export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'meta'});

  // For the root layout, the current path is typically the root or language root.
  const currentPagePath = "/"; // Path relative to the locale

  const canonicalUrl = generateCanonicalUrl(locale, currentPagePath);
  // For root layout, alternate links usually point to the root of each locale.
  const alternateLinks = generateAlternateLanguageLinks(currentPagePath); 

  return {
    title: {
      default: t('siteTitle'),
      template: `%s | ${t('siteName')}`
    },
    description: t('siteDescription'),
    keywords: t('keywords').split(',').map((k: string) => k.trim()),
    authors: [{ name: t('authorName'), url: BASE_URL }],
    creator: t('creator'),
    publisher: t('publisher'),
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: canonicalUrl,
      languages: alternateLinks,
    },
    openGraph: {
      type: 'website',
      locale: mapLocale(locale, 'og'),
      // Provide alternate locales for OpenGraph based on the general alternate links
      alternateLocale: routing.locales.filter(l => l !== locale).map(loc => mapLocale(loc, 'og')),
      url: canonicalUrl,
      title: t('siteTitle'),
      description: t('siteDescription'),
      siteName: t('siteName'),
      images: [
        {
          url: '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: t('siteTitle')
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: t('twitterHandle'),
      creator: t('twitterHandle'),
      title: t('siteTitle'),
      description: t('siteDescription'),
      images: ['/twitter-image.jpg'],
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
    },
    category: t('category'),
  };
}

// 生成静态参数
export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{locale: string}>
}) {
  const {locale} = await params;
  
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  // For the root layout, hreflang links point to the root of each locale.
  const hreflangBasePath = "/";

  return (
    <html lang={mapLocale(locale, 'html')} className={nunito.variable}>
      <head>
        <JsonLd />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#3b82f6" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="dns-prefetch" href={BASE_URL} />
        <link rel="manifest" href="/manifest.json" />
        
        {routing.locales.map((loc) => (
          <link
            key={loc}
            rel="alternate"
            hrefLang={mapLocale(loc, 'hreflang')}
            href={generateCanonicalUrl(loc, hreflangBasePath)} 
          />
        ))}
        <link 
          rel="alternate" 
          hrefLang="x-default" 
          href={generateCanonicalUrl(routing.defaultLocale, hreflangBasePath)}
        />
        
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || ''} />
      </head>
      <body className={`${nunito.className} antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50">
            <Navigation />
            <main>
              {children}
            </main>
            <Footer />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
