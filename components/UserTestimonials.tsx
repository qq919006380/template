"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTranslations } from 'next-intl'

interface Testimonial {
  name: string
  role: string
  avatar: string
  content: string
}

export default function UserTestimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const t = useTranslations('testimonials')
  const tCommon = useTranslations('common')

  // 获取翻译的评价数组
  const testimonials: Testimonial[] = t.raw('testimonials').map((testimonial: any, index: number) => ({
    name: testimonial.name,
    role: testimonial.role,
    avatar: testimonial.avatar,
    content: testimonial.content.replace('{labubu}', tCommon('labubu')).replace('{zimomo}', tCommon('zimomo'))
  }))

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 4000) // 每4秒切换一次

    return () => clearInterval(timer)
  }, [testimonials.length])

  const currentTestimonial = testimonials[currentIndex]

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-pink-100/50 shadow-sm hover:shadow-md transition-shadow">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center mb-4">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                </svg>
              ))}
            </div>
            <span className="ml-2 text-sm text-gray-600">
              5.0 ({t('reviewsCount', { count: 2847 + currentIndex * 127 })})
            </span>
          </div>
          
          <blockquote className="text-gray-700 italic mb-4">
            "{currentTestimonial.content}"
          </blockquote>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                {currentTestimonial.avatar}
              </div>
              <div className="ml-3 text-sm">
                <div className="font-medium text-gray-900">{currentTestimonial.name}</div>
                <div className="text-gray-500">{currentTestimonial.role}</div>
              </div>
            </div>
            
            {/* 轮播指示器 */}
            <div className="flex space-x-1">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentIndex ? 'bg-pink-500' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
} 