export interface Wallpaper {
  id: string;
  title: string;
  category: string;
  tags: string[];
  resolution: string;
  filename: string;
  downloadUrl: string;
  thumbnailUrl: string;
  description: string;
}

// 示例壁纸数据
export const wallpapers: Wallpaper[] = [
  {
    id: '1',
    title: 'Labubu Angel in Clouds',
    category: 'angel-in-clouds',
    tags: ['angel', 'clouds', 'cute', 'fantasy'],
    resolution: '1920x1080',
    filename: 'labubu-angel-clouds-01.jpg',
    downloadUrl: '/wallpapers/labubu-angel-clouds-01.jpg',
    thumbnailUrl: '/wallpapers/thumbs/labubu-angel-clouds-01-thumb.jpg',
    description: 'Beautiful Labubu angel floating in dreamy clouds'
  },
  {
    id: '2',
    title: 'Labubu Monsters Series',
    category: 'monsters',
    tags: ['monster', 'cute', 'colorful'],
    resolution: '2560x1440',
    filename: 'labubu-monsters-01.jpg',
    downloadUrl: '/wallpapers/labubu-monsters-01.jpg',
    thumbnailUrl: '/wallpapers/thumbs/labubu-monsters-01-thumb.jpg',
    description: 'Adorable Labubu monster variants collection'
  },
  {
    id: '3',
    title: 'Labubu Classic Collection',
    category: 'classic',
    tags: ['classic', 'original', 'collection'],
    resolution: '3840x2160',
    filename: 'labubu-classic-01.jpg',
    downloadUrl: '/wallpapers/labubu-classic-01.jpg',
    thumbnailUrl: '/wallpapers/thumbs/labubu-classic-01-thumb.jpg',
    description: 'Classic Labubu design in high resolution'
  }
];

// 获取所有分类
export const categories = [...new Set(wallpapers.map(w => w.category))];

// 根据分类获取壁纸
export function getWallpapersByCategory(category: string): Wallpaper[] {
  if (category === 'All') return wallpapers;
  return wallpapers.filter(w => w.category === category);
}

// 获取相关壁纸
export function getRelatedWallpapers(currentWallpaper: Wallpaper, limit: number = 6): Wallpaper[] {
  return wallpapers
    .filter(w => w.id !== currentWallpaper.id && w.category === currentWallpaper.category)
    .slice(0, limit);
}

// 获取随机壁纸
export function getRandomWallpapers(limit: number = 12): Wallpaper[] {
  const shuffled = [...wallpapers].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, limit);
} 