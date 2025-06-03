import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: 'Your Site Title',
    template: '%s | Your Site Title'
  },
  description: 'Your site description for SEO optimization',
  keywords: ['keyword1', 'keyword2', 'keyword3'],
  authors: [{ name: 'Your Name', url: 'https://your-website.com' }],
  creator: 'Your Company',
  publisher: 'Your Publisher',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 