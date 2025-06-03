'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Wallpaper } from '../lib/wallpapers-data';
import { PartyPopper } from "lucide-react"

// 直接在客户端构建图片 URL
const getThumbnailUrl = (filename: string) => {
  return `https://img.labubu.city/${filename}`;
};

interface SimpleClientGridProps {
  wallpapers: Wallpaper[];
  itemsPerPage?: number;
}

export default function SimpleClientGrid({ wallpapers, itemsPerPage = 20 }: SimpleClientGridProps) {
  const [isClient, setIsClient] = useState(false);
  const [visibleItems, setVisibleItems] = useState<Wallpaper[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  
  // 用于无限滚动的 ref
  const observerRef = useRef<HTMLDivElement>(null);

  // 确保只在客户端运行
  useEffect(() => {
    setIsClient(true);
    setVisibleItems(wallpapers.slice(0, itemsPerPage));
  }, [wallpapers, itemsPerPage]);

  // 加载更多的函数
  const loadMore = useCallback(() => {
    if (isLoading) return;
    
    const nextPage = currentPage + 1;
    const startIndex = (nextPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const nextItems = wallpapers.slice(startIndex, endIndex);
    
    if (nextItems.length > 0) {
      setIsLoading(true);
      
      // 模拟加载延迟，让用户看到加载效果
      setTimeout(() => {
        setVisibleItems(prev => [...prev, ...nextItems]);
        setCurrentPage(nextPage);
        setIsLoading(false);
      }, 500);
    }
  }, [currentPage, itemsPerPage, wallpapers, isLoading]);

  // 无限滚动的 Intersection Observer
  useEffect(() => {
    if (!isClient) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !isLoading) {
          loadMore();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '100px' // 提前100px开始加载
      }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [isClient, loadMore, isLoading]);

  // 服务端或未初始化时显示占位符
  if (!isClient) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {Array.from({ length: 20 }).map((_, index) => (
            <div key={index} className="bg-gray-200 rounded-xl aspect-[3/4] animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  const hasMore = visibleItems.length < wallpapers.length;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* CSS瀑布流布局 */}
      <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4">
        {visibleItems.map((wallpaper, index) => (
          <WallpaperCard 
            key={wallpaper.id} 
            wallpaper={wallpaper} 
            index={index}
          />
        ))}
      </div>

      {/* 无限滚动触发区域和加载状态 */}
      {hasMore && (
        <div 
          ref={observerRef}
          className="flex justify-center py-12"
        >
          {isLoading ? (
            <div className="text-center">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-pink-400 rounded-full animate-bounce"></div>
                <div className="w-8 h-8 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-8 h-8 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
              <p className="text-lg text-gray-600 font-medium">Loading more beautiful wallpapers...</p>
              <p className="text-sm text-gray-500 mt-2">{wallpapers.length - visibleItems.length} more to discover</p>
            </div>
          ) : (
            <div className="text-center text-gray-500">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white font-bold">📸</span>
              </div>
              <p className="text-lg">Scroll to load more...</p>
            </div>
          )}
        </div>
      )}

      {/* 完成提示 */}
      {!hasMore && (
        <div className="text-center py-12">
          <div className="text-center py-8 text-gray-600">
            <PartyPopper className="w-8 h-8 mx-auto mb-2 text-pink-500" />
            All {wallpapers.length} beautiful wallpapers displayed
          </div>
          <p className="text-gray-500 mt-4">Thank you for browsing! More amazing content coming soon!</p>
        </div>
      )}
    </div>
  );
}

// 壁纸卡片组件
function WallpaperCard({ wallpaper, index }: { wallpaper: Wallpaper; index: number }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [imageDimensions, setImageDimensions] = useState<{ width: number; height: number } | null>(null);

  const imageUrl = getThumbnailUrl(wallpaper.filename);

  // 更智能的壁纸类型检测
  const detectWallpaperType = () => {
    const resolution = wallpaper.resolution || '';
    
    // 常见横屏分辨率
    const landscapeResolutions = [
      '1920x1080', '2560x1440', '3840x2160', '1366x768', 
      '1680x1050', '2560x1080', '3440x1440', '5120x1440'
    ];
    
    // 常见竖屏分辨率
    const portraitResolutions = [
      '1080x1920', '1440x2560', '2160x3840', '1080x2340',
      '1125x2436', '1170x2532', '1284x2778', '1440x3200'
    ];
    
    if (landscapeResolutions.some(res => resolution.includes(res))) {
      return 'landscape';
    } else if (portraitResolutions.some(res => resolution.includes(res))) {
      return 'portrait';
    }
    
    return 'unknown';
  };

  const wallpaperType = detectWallpaperType();

  // 计算最佳显示高度
  const getOptimalHeight = () => {
    const baseWidth = 280; // 假设的卡片宽度基准
    
    switch (wallpaperType) {
      case 'landscape':
        // 16:9 横屏壁纸，使用较小高度但完整显示
        return Math.floor(baseWidth * 9 / 16) + 40; // 添加一些padding
      case 'portrait':
        // 竖屏壁纸，使用变化高度
        const portraitHeights = [300, 350, 400, 320, 380, 280, 420, 260, 390, 340];
        return portraitHeights[index % portraitHeights.length];
      default:
        // 未知比例，使用中等高度
        const defaultHeights = [250, 300, 280, 320, 270, 290, 310, 240, 330, 260];
        return defaultHeights[index % defaultHeights.length];
    }
  };

  const cardHeight = getOptimalHeight();

  return (
    <div className="break-inside-avoid mb-4 w-full">
      <Link 
        href={`/labubu-wallpapers/${wallpaper.id}`}
        className="group block"
      >
        <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
          {/* 图片容器 */}
          <div 
            className="relative overflow-hidden bg-gradient-to-br from-pink-100 to-purple-100"
            style={{ 
              height: cardHeight,
              minHeight: wallpaperType === 'landscape' ? '160px' : '220px'
            }}
          >
            {/* 加载状态 */}
            {!imageLoaded && !imageError && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-12 h-12 bg-pink-400 rounded-full animate-pulse mx-auto mb-2 flex items-center justify-center">
                    <span className="text-white font-bold text-xs">Labubu</span>
                  </div>
                  <p className="text-xs text-gray-500">Loading...</p>
                </div>
              </div>
            )}

            {/* 错误状态 */}
            {imageError && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-pink-300 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-white font-bold">😔</span>
                  </div>
                  <p className="text-sm text-gray-600">Failed to load</p>
                </div>
              </div>
            )}

            {/* 图片 */}
            {!imageError && (
              <Image
                src={imageUrl}
                alt={wallpaper.title}
                fill
                className={`transition-opacity duration-300 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                } ${wallpaperType === 'landscape' ? 'object-contain' : 'object-cover'}`}
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                onLoad={(e) => {
                  setImageLoaded(true);
                  const img = e.currentTarget;
                  setImageDimensions({
                    width: img.naturalWidth,
                    height: img.naturalHeight
                  });
                }}
                onError={() => setImageError(true)}
                loading="lazy"
              />
            )}

            {/* 悬停效果 */}
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="bg-white/90 text-gray-900 px-4 py-2 rounded-full text-sm font-semibold">
                View Wallpaper
              </div>
            </div>

            {/* 标签 */}
            <div className="absolute top-2 left-2">
              <span className="bg-white/90 px-2 py-1 rounded text-xs font-bold text-gray-800">
                {wallpaper.category}
              </span>
            </div>
            
            <div className="absolute top-2 right-2">
              <span className="bg-green-500 text-white px-2 py-1 rounded text-xs font-bold">
                FREE
              </span>
            </div>

            {/* 壁纸类型标识 */}
            {wallpaperType === 'landscape' && (
              <div className="absolute bottom-2 left-2">
                <span className="bg-blue-500 text-white px-2 py-1 rounded text-xs font-bold">
                  16:9
                </span>
              </div>
            )}
            {wallpaperType === 'portrait' && (
              <div className="absolute bottom-2 left-2">
                <span className="bg-purple-500 text-white px-2 py-1 rounded text-xs font-bold">
                  Mobile
                </span>
              </div>
            )}
          </div>

          {/* 信息 */}
          <div className="p-3">
            <h3 className="font-bold text-gray-900 text-sm mb-1 line-clamp-2">
              {wallpaper.title}
            </h3>
            <div className="flex justify-between text-xs text-gray-600">
              <span>{wallpaper.resolution}</span>
              <span>HD</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
} 