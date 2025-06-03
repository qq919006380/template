import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/*',
          '/admin/*',
          '/*.json$',
          '/private/*'
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/api/*',
          '/admin/*'
        ],
      }
    ],
    sitemap: [
      'https://labubu.city/us/sitemap.xml',
      'https://labubu.city/ph/sitemap.xml', 
      'https://labubu.city/my/sitemap.xml',
      'https://labubu.city/tw/sitemap.xml'
    ],
    host: 'https://labubu.city'
  }
} 