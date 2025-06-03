# Next.js SSR i18n Template

A production-ready, SEO-optimized Next.js template with internationalization (i18n), Server-Side Rendering (SSR), and modern web standards.

## ✨ Features

- **🌍 Internationalization (i18n)**: Multi-language support with next-intl
- **🚀 SSR & SSG**: Optimized for Server-Side Rendering and Static Site Generation
- **📱 SEO Optimized**: Complete SEO setup with meta tags, Open Graph, Twitter Cards
- **⚡ Performance**: Optimized bundle size, image optimization, and caching
- **🎨 Modern UI**: Clean, minimalist design with Tailwind CSS
- **🔒 Security**: Built-in security headers and best practices
- **📊 Analytics**: Google Analytics integration ready
- **☁️ Cloudflare Ready**: Configured for Cloudflare Pages deployment

## 🏗️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS 4
- **Internationalization**: next-intl
- **Language**: TypeScript
- **Deployment**: Cloudflare Pages / Vercel

## 🚀 Quick Start

1. **Clone and Install**
   ```bash
   git clone <your-repo>
   cd your-project
   pnpm install
   ```

2. **Configure Your Project**
   - Update `package.json` name and version
   - Modify `next.config.js` domains and remote patterns
   - Update language settings in `i18n/routing.ts`
   - Add your content to `messages/` directory

3. **Development**
   ```bash
   pnpm dev
   ```
   Open [http://localhost:3000](http://localhost:3000)

4. **Production Build**
   ```bash
   pnpm build
   ```

## 📁 Project Structure

```
├── app/
│   ├── [locale]/          # Internationalized pages
│   ├── robots.ts          # SEO robots.txt
│   ├── sitemap.ts         # Dynamic sitemap
│   └── globals.css        # Global styles
├── components/            # Reusable UI components
├── i18n/                 # Internationalization config
├── messages/             # Translation files
├── lib/                  # Utility functions
└── public/               # Static assets
```

## 🌐 Internationalization

### Supported Locales
- `en` - English (Default)
- `zh` - Chinese (Simplified)

### Adding New Languages

1. Add locale to `i18n/routing.ts`:
   ```typescript
   locales: ['en', 'zh', 'new-locale']
   ```

2. Create translation file:
   ```bash
   cp messages/en.json messages/new-locale.json
   ```

3. Update `app/[locale]/layout.tsx` locale mappings

### Translation Usage

**Client Components:**
```typescript
import {useTranslations} from 'next-intl';
const t = useTranslations('namespace');
```

**Server Components:**
```typescript
import {getTranslations} from 'next-intl/server';
const t = await getTranslations('namespace');
```

## 🔧 SEO Configuration

### Meta Tags
- Automatic title templates
- Dynamic descriptions
- Open Graph optimization
- Twitter Card support
- Canonical URLs
- Hreflang tags

### Sitemap & Robots
- Dynamic sitemap generation
- Multi-language URL variants
- SEO-friendly robots.txt

## 🚀 Deployment

### Cloudflare Pages
```bash
pnpm pages:build
pnpm deploy
```

### Vercel
```bash
pnpm vercel-build
```

## 📊 Performance Optimizations

- Image optimization with WebP/AVIF
- Bundle splitting and lazy loading
- Optimized font loading
- Security headers
- Caching strategies
- Core Web Vitals optimization

## 🎨 Customization

### Styling
- Modify `app/globals.css` for global styles
- Update Tailwind config in `tailwind.config.js`
- Add custom fonts in `app/fonts.ts`

### Components
- All components in `components/` directory
- Follow consistent naming conventions
- Include proper TypeScript types

### SEO
- Update metadata in `app/[locale]/layout.tsx`
- Modify JSON-LD structured data
- Customize Open Graph images

## 📝 Content Management

### Adding Pages
1. Create page in `app/[locale]/your-page/page.tsx`
2. Add translations to `messages/*.json`
3. Update navigation if needed

### Blog Posts
1. Add content to translation files
2. Create dynamic routes as needed
3. Include proper meta tags

## 🔒 Security

- Content Security Policy ready
- Security headers configured
- XSS protection enabled
- HTTPS enforcement

## 📈 Analytics

Update `components/GoogleAnalytics.tsx` with your tracking ID:
```typescript
gaId={process.env.NEXT_PUBLIC_GA_ID}
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit pull request

## 📄 License

This template is available under the MIT License.

---

**Built with ❤️ for modern web development**
# template
