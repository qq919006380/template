"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { useTranslations } from 'next-intl'

interface Stat {
  id: number
  value: number
  labelKey: string
  suffix: string
  color: string
  bgColor: string
  borderColor: string
}

function AnimatedCounter({ 
  value, 
  suffix, 
  duration = 2000 
}: { 
  value: number
  suffix: string
  duration?: number 
}) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return

    let startTime: number
    let animationFrame: number

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const elapsedTime = currentTime - startTime
      const progress = Math.min(elapsedTime / duration, 1)
      
      // 使用 easeOutCubic 缓动函数
      const easeOutCubic = 1 - Math.pow(1 - progress, 3)
      const currentCount = Math.floor(easeOutCubic * value)
      
      setCount(currentCount)

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [value, duration, isInView])

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  )
}

export default function StatsCounter() {
  const t = useTranslations('home');

  const stats: Stat[] = [
    {
      id: 1,
      value: 500,
      labelKey: "hdWallpapers",
      suffix: "+",
      color: "text-pink-600",
      bgColor: "bg-white/60",
      borderColor: "border-pink-100/50"
    },
    {
      id: 2,
      value: 50,
      labelKey: "seriesGuides",
      suffix: "+",
      color: "text-purple-600",
      bgColor: "bg-white/60",
      borderColor: "border-purple-100/50"
    },
    {
      id: 3,
      value: 10,
      labelKey: "collectors",
      suffix: "K+",
      color: "text-indigo-600",
      bgColor: "bg-white/60",
      borderColor: "border-indigo-100/50"
    }
  ];

  return (
    <div className="grid grid-cols-3 gap-4 my-8">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.5, 
            delay: index * 0.1,
            ease: "easeOut"
          }}
          className={`text-center p-4 ${stat.bgColor} backdrop-blur-sm rounded-xl border ${stat.borderColor} shadow-sm hover:shadow-md transition-all hover:scale-105 cursor-default`}
        >
          <div className={`text-2xl font-bold ${stat.color} mb-1`}>
            <AnimatedCounter value={stat.value} suffix={stat.suffix} />
          </div>
          <div className="text-sm text-gray-600">{t(`stats.${stat.labelKey}`) || stat.labelKey}</div>
        </motion.div>
      ))}
    </div>
  )
} 