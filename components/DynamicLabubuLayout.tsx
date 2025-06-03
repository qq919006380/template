"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
 

interface Frame {
  id: number
  title: string
  video: string
  gradient: string // 作为fallback背景
}

const BASE_URL = "https://img.labubu.city/mp4/"

// 使用Labubu动态壁纸
const allFrames: Frame[] = [
  {
    id: 1,
    title: "Pink Cutie",
    video: `${BASE_URL}1459_1748774620.mp4`,
    gradient: "from-pink-400 to-pink-600"
  },
  {
    id: 2,
    title: "Purple Dream", 
    video: `${BASE_URL}1460_1748774622.mp4`,
    gradient: "from-purple-400 to-purple-600"
  },
  {
    id: 3,
    title: "Magic World",
    video: `${BASE_URL}1461_1748774623.mp4`,
    gradient: "from-indigo-400 to-indigo-600"
  },
  {
    id: 4,
    title: "Sweet Moment",
    video: `${BASE_URL}1462_1748774625.mp4`,
    gradient: "from-emerald-400 to-emerald-600"
  },
  {
    id: 5,
    title: "Dreamy Vibes",
    video: `${BASE_URL}1463_1748774759.mp4`,
    gradient: "from-blue-400 to-blue-600"
  },
  {
    id: 6,
    title: "Fantasy Land",
    video: `${BASE_URL}1464_1748774761.mp4`,
    gradient: "from-teal-400 to-teal-600"
  },
  {
    id: 7,
    title: "Magical Time",
    video: `${BASE_URL}1465_1748774762.mp4`,
    gradient: "from-cyan-400 to-cyan-600"
  },
  {
    id: 8,
    title: "Wonder World",
    video: `${BASE_URL}1466_1748774764.mp4`,
    gradient: "from-orange-400 to-orange-600"
  },
  {
    id: 9,
    title: "Cute Universe",
    video: `${BASE_URL}1467_1748774767.mp4`,
    gradient: "from-rose-400 to-rose-600"
  }
]

export default function DynamicLabubuLayout() {
  const [hovered, setHovered] = useState<{ row: number; col: number } | null>(null)
  
  // 两个核心比例参数
  const defaultAspectRatio = 4 / 3  // 默认比例 4:3
  const hoverAspectRatio = 16 / 9   // hover比例 16:9
  const gapSize = 6

  // 计算grid的行分配
  const getGridRows = () => {
    if (hovered === null) {
      // 默认状态：为了配合4:3比例，调整行比例
      // 让每行有足够空间显示4:3的内容
      return "1fr 1fr 1fr"
    }
    
    const { row } = hovered
    // hover时：被选中的行需要更多空间来容纳16:9
    const heightRatio = hoverAspectRatio / defaultAspectRatio // 16/9 ÷ 4/3 = 1.33
    const expandedRowSize = heightRatio * 1.5 // 给hover行更多空间
    const compressedRowSize = (3 - expandedRowSize) / 2
    
    return [0, 1, 2]
      .map(r => r === row ? `${expandedRowSize}fr` : `${compressedRowSize}fr`)
      .join(" ")
  }

  // 计算grid的列分配  
  const getGridCols = () => {
    if (hovered === null) {
      // 默认状态：保持等宽分配
      return "1fr 1fr 1fr"
    }
    
    const { col } = hovered
    // hover时：被选中的列需要更多空间来容纳16:9
    const widthRatio = hoverAspectRatio / defaultAspectRatio // 1.33
    const expandedColSize = widthRatio * 1.2 // 给hover列更多空间
    const compressedColSize = (3 - expandedColSize) / 2
    
    return [0, 1, 2]
      .map(c => c === col ? `${expandedColSize}fr` : `${compressedColSize}fr`)
      .join(" ")
  }

  return (
    <div className="w-full h-full p-2">
      <div
        className="relative w-full h-full"
        style={{
          display: "grid",
          gridTemplateRows: getGridRows(),
          gridTemplateColumns: getGridCols(),
          gap: `${gapSize}px`,
          transition: "grid-template-rows 0.4s ease, grid-template-columns 0.4s ease",
          minHeight: "600px",
          isolation: "isolate"
        }}
      >
        {allFrames.map((frame, index) => {
          const row = Math.floor(index / 3)
          const col = index % 3
          const isCurrentHovered = hovered?.row === row && hovered?.col === col

          return (
            <VideoFrame
              key={frame.id}
              frame={frame}
              isHovered={isCurrentHovered}
              aspectRatio={isCurrentHovered ? hoverAspectRatio : defaultAspectRatio}
              onHover={() => setHovered({ row, col })}
              onLeave={() => setHovered(null)}
            />
          )
        })}
      </div>
    </div>
  )
}

// 单独的视频框架组件
function VideoFrame({ 
  frame, 
  isHovered,
  aspectRatio,
  onHover, 
  onLeave 
}: { 
  frame: Frame
  isHovered: boolean
  aspectRatio: number
  onHover: () => void
  onLeave: () => void
}) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoLoaded, setVideoLoaded] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (video) {
      video.play().catch(() => {
        // 静默处理autoplay限制
      })
    }
  }, [frame.video])

  return (
    <motion.div
      className="relative overflow-hidden cursor-pointer flex items-center justify-center"
      style={{ 
        zIndex: isHovered ? 10 : 1,
        width: "100%",
        height: "100%",
        background: `linear-gradient(to bottom right, var(--tw-gradient-from), var(--tw-gradient-to))`,
        '--tw-gradient-from': frame.gradient.includes('pink') ? '#f472b6' : 
                              frame.gradient.includes('purple') ? '#a855f7' :
                              frame.gradient.includes('indigo') ? '#6366f1' :
                              frame.gradient.includes('emerald') ? '#10b981' :
                              frame.gradient.includes('blue') ? '#3b82f6' :
                              frame.gradient.includes('teal') ? '#14b8a6' :
                              frame.gradient.includes('cyan') ? '#06b6d4' :
                              frame.gradient.includes('orange') ? '#f97316' :
                              '#f43f5e',
        '--tw-gradient-to': frame.gradient.includes('pink') ? '#db2777' : 
                           frame.gradient.includes('purple') ? '#7c3aed' :
                           frame.gradient.includes('indigo') ? '#4f46e5' :
                           frame.gradient.includes('emerald') ? '#059669' :
                           frame.gradient.includes('blue') ? '#2563eb' :
                           frame.gradient.includes('teal') ? '#0891b2' :
                           frame.gradient.includes('cyan') ? '#0284c7' :
                           frame.gradient.includes('orange') ? '#ea580c' :
                           '#e11d48'
      } as React.CSSProperties}
      transition={{ 
        duration: 0.4,
        ease: "easeInOut"
      }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      {/* 视频容器 - 使用计算的尺寸来保证aspectRatio */}
      <div
        className="relative overflow-hidden"
        style={{ 
          width: "100%",
          height: "100%",
          aspectRatio: aspectRatio,
          maxWidth: "100%",
          maxHeight: "100%"
        }}
      >
        {/* 视频背景 */}
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover rounded-md"
          loop
          muted
          playsInline
          autoPlay
          onLoadedData={() => setVideoLoaded(true)}
          onError={() => setVideoLoaded(false)}
        >
          <source src={frame.video} type="video/mp4" />
        </video>

        {/* 标题信息覆盖层 - 仅在hover时显示 */}
        {isHovered && (
          <motion.div 
            className="absolute inset-0 bg-black/20 flex items-center justify-center rounded-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-center">
              <h3 className="text-white font-bold text-lg mb-1 drop-shadow-lg">{frame.title}</h3>
              <p className="text-white/90 text-sm drop-shadow-lg">Labubu Dynamic Wallpaper</p>
            </div>
          </motion.div>
        )}

        {/* 视频加载状态指示器 */}
        {!videoLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white/50"></div>
          </div>
        )}
      </div>
    </motion.div>
  )
} 