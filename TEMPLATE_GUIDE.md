# Next.js SSR i18n Template - 使用指南

## 🎯 模板概述

这是一个生产就绪的 Next.js 多语言模板，专注于 SSR、SEO 优化和极简设计。模板提供了完整的多语言支持、最佳 SEO 配置和现代化的组件系统。

## 🚀 快速开始

### 1. 项目初始化
```bash
# 复制模板
git clone <your-template-repo>
cd your-project-name

# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev
```

### 2. 基础配置

#### 更新项目信息
1. **package.json** - 修改项目名称、版本、作者信息
2. **next.config.js** - 添加你的域名到 `domains` 和 `remotePatterns`
3. **环境变量** - 创建 `.env.local` 文件

```env
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_GA_ID=your-google-analytics-id
```

#### 多语言配置
1. **i18n/routing.ts** - 修改支持的语言区域
```typescript
locales: ['us', 'zh',]
```

2. **messages/*.json** - 更新翻译内容
   - 复制 `us.json` 创建新语言文件
   - 翻译所有文本内容
   - 保持 JSON 结构一致

3. **app/[locale]/layout.tsx** - 更新语言映射函数

### 3. 内容定制

#### 网站信息
更新所有语言的 `messages/*.json` 文件中的 `meta` 部分：
```json
{
  "meta": {
    "siteTitle": "你的网站标题",
    "siteName": "你的网站名称",
    "siteDescription": "你的网站描述...",
    "authorName": "你的公司名称",
    "keywords": "关键词1, 关键词2, 关键词3"
  }
}
```

#### 导航菜单
在翻译文件的 `navigation` 部分修改菜单项：
```json
{
  "navigation": {
    "home": "首页",
    "about": "关于",
    "services": "服务",
    "products": "产品",
    "blog": "博客",
    "contact": "联系"
  }
}
```

## 📁 项目结构

```
├── app/
│   ├── [locale]/              # 多语言页面
│   │   ├── layout.tsx         # 语言布局
│   │   ├── page.tsx           # 首页
│   │   ├── about/             # 关于页面
│   │   ├── blog/              # 博客页面
│   │   └── contact/           # 联系页面
│   ├── layout.tsx             # 根布局
│   ├── globals.css            # 全局样式
│   ├── fonts.ts               # 字体配置
│   ├── robots.ts              # SEO robots
│   └── sitemap.ts             # 动态站点地图
├── components/                # 可重用组件
│   ├── Navigation.tsx         # 导航组件
│   ├── Footer.tsx             # 页脚组件
│   ├── LanguageSwitcher.tsx   # 语言切换器
│   ├── GoogleAnalytics.tsx    # GA 集成
│   └── JsonLd.tsx             # 结构化数据
├── i18n/                      # 国际化配置
│   ├── routing.ts             # 路由配置
│   └── navigation.ts          # 导航配置
├── messages/                  # 翻译文件
│   ├── us.json                # 英语
│   ├── ph.json                # 菲律宾英语
│   ├── my.json                # 马来语
│   └── tw.json                # 繁体中文
└── lib/                       # 工具函数
```

## 🎨 样式定制

### Tailwind CSS 配置
修改 `tailwind.config.js` 来自定义主题：
```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#your-primary-color',
        secondary: '#your-secondary-color',
      },
      fontFamily: {
        sans: ['Your Font', 'sans-serif'],
      },
    },
  },
}
```

### 全局样式
在 `app/globals.css` 中添加自定义样式：
```css
:root {
  --primary-color: #3b82f6;
  --secondary-color: #8b5cf6;
}
```

## 📄 页面创建

### 创建新页面
1. 在 `app/[locale]/` 下创建新目录
2. 添加 `page.tsx` 文件
3. 实现页面组件

```typescript
// app/[locale]/new-page/page.tsx
import {setRequestLocale, getTranslations} from 'next-intl/server';

interface PageProps {
  params: Promise<{locale: string}>;
}

export default async function NewPage({params}: PageProps) {
  const {locale} = await params;
  setRequestLocale(locale);
  
  const t = await getTranslations('newPage');

  return (
    <div className="min-h-screen py-16">
      <h1>{t('title')}</h1>
      {/* 页面内容 */}
    </div>
  );
}
```

4. 在翻译文件中添加相应内容
5. 更新导航菜单（如需要）

### 博客文章
1. 在 `app/[locale]/blog/[slug]/` 创建动态路由
2. 实现文章页面组件
3. 添加 `generateStaticParams` 和 `generateMetadata`

## 🔧 SEO 配置

### 元数据优化
每个页面应包含：
```typescript
export async function generateMetadata({params}: PageProps): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'meta'});
  
  return {
    title: t('pageTitle'),
    description: t('pageDescription'),
    openGraph: {
      title: t('pageTitle'),
      description: t('pageDescription'),
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('pageTitle'),
      description: t('pageDescription'),
    },
  };
}
```

### 结构化数据
在 `components/JsonLd.tsx` 中自定义结构化数据：
```typescript
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Your Company Name',
  url: 'https://your-domain.com',
  // ... 更多数据
};
```

## 🚀 部署

### Cloudflare Pages
```bash
# 构建
pnpm pages:build

# 部署
pnpm deploy
```

### Vercel
```bash
# 构建
pnpm vercel-build

# 通过 Vercel CLI 或 GitHub 集成部署
```

### 环境变量配置
确保在部署平台设置以下环境变量：
- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_GA_ID`

## 📊 分析集成

### Google Analytics
1. 获取 GA4 测量 ID
2. 设置环境变量 `NEXT_PUBLIC_GA_ID`
3. GA 代码已自动集成在 `components/GoogleAnalytics.tsx`

### 其他分析工具
在 `components/` 目录下创建相应组件，然后在布局中引入。

## 🔒 安全配置

模板已配置基础安全头部：
- X-Frame-Options
- X-Content-Type-Options
- Referrer-Policy
- Strict-Transport-Security
- Permissions-Policy

### CSP 配置
在 `next.config.js` 中添加 Content Security Policy：
```javascript
{
  key: 'Content-Security-Policy',
  value: 'your-csp-directives'
}
```

## 🛠️ 开发工具

### 类型检查
```bash
pnpm type-check
```

### 代码检查
```bash
pnpm lint
```

### 预览构建
```bash
pnpm preview
```

## 📱 响应式设计

模板使用 Tailwind CSS 的响应式工具类：
- `sm:` - 640px+
- `md:` - 768px+
- `lg:` - 1024px+
- `xl:` - 1280px+

## 🎯 性能优化

已内置的优化：
- 图片优化 (WebP/AVIF)
- 字体优化
- 代码分割
- 静态资源缓存
- Bundle 优化

### 图片优化
使用 Next.js Image 组件：
```typescript
<Image
  src="/your-image.jpg"
  alt="描述文字"
  width={800}
  height={600}
  sizes="(max-width: 768px) 100vw, 800px"
/>
```

## 🐛 常见问题

### 1. 语言切换不工作
检查 `i18n/routing.ts` 配置和翻译文件是否正确。

### 2. 构建错误
确保所有翻译文件的 JSON 格式正确且包含所需的键。

### 3. SEO 数据不显示
检查环境变量 `NEXT_PUBLIC_SITE_URL` 是否设置正确。

### 4. 样式不加载
确保 Tailwind CSS 配置正确且已包含相应的 CSS 类。

## 📞 技术支持

如有问题，请：
1. 检查文档和常见问题
2. 查看项目的 Issues 页面
3. 创建新的 Issue 描述问题

---

**快乐编码！🚀** 