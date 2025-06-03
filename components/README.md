# Navigation & Layout Components

这个文档说明了如何使用新的导航和页面布局系统来保持代码的 DRY（Don't Repeat Yourself）原则，同时维持 SEO 和 SSR 的优化。

## 架构概览

我们采用了 Next.js 13+ App Router 的最佳实践，将 Navigation 和 Footer 直接放在根布局 (`app/layout.tsx`) 中，这样所有页面都会自动包含导航和页脚，无需在每个页面中重复代码。

### 核心组件

#### Navigation 组件
- **位置**: `components/Navigation.tsx`
- **类型**: Client Component（使用 'use client'）
- **功能**: 提供统一的导航栏，自动高亮当前页面

**特性**:
- 自动检测当前路径并高亮相应菜单项
- 响应式设计（在移动设备上隐藏菜单）
- 支持自定义 className
- 包含 Logo 图片

#### Footer 组件
- **位置**: `components/Footer.tsx`
- **类型**: Server Component
- **功能**: 提供统一的页脚

**变体**:
- `full` (默认): 完整的页脚，包含链接和描述
- `simple`: 简化版页脚，只显示版权信息

## 实现方式

### 根布局 (app/layout.tsx)
```tsx
import Navigation from "../components/Navigation"
import Footer from "../components/Footer"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
          <Navigation />
          <main>
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
```

### 页面结构
每个页面现在只需要关注自己的内容，无需包含导航和页脚：

```tsx
export default function MyPage() {
  return (
    <>
      <section>
        <h1>我的页面标题</h1>
        {/* 页面内容 */}
      </section>
    </>
  )
}
```

## 已更新的页面

✅ `app/layout.tsx` - 根布局（包含 Navigation + Footer）
✅ `app/page.tsx` - 主页
✅ `app/blog/page.tsx` - 博客主页  
✅ `app/blog/pink-labubu-name/page.tsx` - 粉色 Labubu 文章
✅ `app/labubu-wallpapers/page.tsx` - 壁纸页面

### 待更新的页面

如果需要更新其他页面，只需：
1. 移除任何导航和页脚相关的代码
2. 移除 `PageLayout` 组件的使用（如果有）
3. 确保页面内容用 `<>` 包装

示例更新：
```tsx
// 之前
<div className="min-h-screen bg-gradient-to-br...">
  <nav>...</nav>
  <main>页面内容</main>
  <footer>...</footer>
</div>

// 之后
<>
  <section>页面内容</section>
</>
```

## SEO 和 SSR 优化

### 保持的优化特性

1. **元数据完全保留**: 每个页面的 `metadata` 对象不受影响
2. **静态生成优化**: 页面仍然预渲染为静态 HTML
3. **服务端渲染**: Navigation 在服务端渲染，只有路径检测是客户端的
4. **结构化数据**: JSON-LD 和其他 SEO 元素保持不变

### 性能优势

- **减少包大小**: 每个页面的 JS 包更小
- **更好的缓存**: Navigation 和 Footer 在所有页面之间共享
- **更快的导航**: 页面切换时只需要加载内容部分

## 优势对比

### 使用 layout.tsx 方案的优势：

1. **符合 Next.js 最佳实践**: 使用官方推荐的布局模式
2. **代码更简洁**: 页面文件更专注于内容本身
3. **更好的性能**: 布局在页面间切换时不会重新渲染
4. **维护更容易**: 导航变更只需在一个地方修改
5. **SEO 友好**: 完全保持 SSR 和静态生成的优势

### 与之前 PageLayout 组件的对比：

| 特性 | layout.tsx | PageLayout 组件 |
|------|------------|-----------------|
| 代码复用 | ✅ | ✅ |
| 维护性 | ✅ 更好 | ✅ |
| 页面切换性能 | ✅ 更快 | ❌ 每次重新渲染 |
| Next.js 集成 | ✅ 原生支持 | ❌ 自定义方案 |
| 代码简洁性 | ✅ 更简洁 | ❌ 需要包装每个页面 |

## 定制选项

### Navigation 定制
在 `layout.tsx` 中可以自定义 Navigation：
```tsx
<Navigation className="shadow-lg" />
```

### Footer 定制
可以根据页面类型使用不同的 Footer 变体：
```tsx
<Footer variant="simple" className="bg-gray-800" />
```

### 条件渲染
如果某些页面需要特殊布局，可以在 layout.tsx 中使用条件渲染：
```tsx
// 根据路径条件渲染不同的布局
{pathname === '/special' ? <SpecialLayout /> : <Navigation />}
```

## 总结

这种基于 `layout.tsx` 的方案是 Next.js App Router 的标准做法，提供了最佳的性能、维护性和开发体验。它完全保持了 SEO 和 SSR 的优势，同时让页面代码更加简洁和专注。 