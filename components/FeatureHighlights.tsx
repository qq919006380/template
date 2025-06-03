"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Palette, Gem } from "lucide-react"

interface Feature {
  id: number
  icon: React.ReactNode
  title: string
  description: string
  color: string
}

const features: Feature[] = [
  {
    id: 1,
    icon: <Palette className="w-6 h-6" />,
    title: "Interactive Gallery",
    description: "Immersive 3D gallery experience with smooth animations",
    color: "from-pink-500 to-purple-600"
  },
  {
    id: 2,
    icon: <Gem className="w-6 h-6" />,
    title: "Rare Collection",
    description: "Discover the most valuable and limited edition variants",
    color: "from-purple-500 to-indigo-600"
  },
  {
    id: 3,
    icon: "🔄",
    title: "Daily Updates",
    description: "Latest releases & series info",
    color: "bg-indigo-500"
  }
]

export default function FeatureHighlights() {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null)

  return (
    <div className="pt-6">
      <motion.h3 
        className="text-lg font-semibold text-gray-900 mb-4"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        ✨ What makes us special
      </motion.h3>
      
      <div className="space-y-3">
        {features.map((feature, index) => (
          <motion.div
            key={feature.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onMouseEnter={() => setHoveredFeature(feature.id)}
            onMouseLeave={() => setHoveredFeature(null)}
            className="flex items-center text-gray-700 p-3 rounded-lg transition-all cursor-pointer group hover:bg-white/50"
          >
            <motion.div 
              className={`w-3 h-3 rounded-full mr-3 ${feature.color}`}
              animate={{ 
                scale: hoveredFeature === feature.id ? 1.2 : 1,
                rotate: hoveredFeature === feature.id ? 360 : 0
              }}
              transition={{ duration: 0.3 }}
            />
            
            <div className="flex-1">
              <div className="flex items-center">
                <span className="text-lg mr-2">{feature.icon}</span>
                <span className="text-sm font-medium group-hover:text-gray-900 transition-colors">
                  {feature.title}
                </span>
              </div>
              
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ 
                  height: hoveredFeature === feature.id ? "auto" : 0,
                  opacity: hoveredFeature === feature.id ? 1 : 0
                }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <p className="text-xs text-gray-500 mt-1 pl-8">
                  {feature.description}
                </p>
              </motion.div>
            </div>
            
            <motion.div
              animate={{ 
                x: hoveredFeature === feature.id ? 5 : 0,
                opacity: hoveredFeature === feature.id ? 1 : 0.5
              }}
              transition={{ duration: 0.2 }}
              className="text-gray-400"
            >
              →
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  )
} 