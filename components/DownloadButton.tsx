"use client"

import React from 'react'
import { Download } from "lucide-react"
import { useState } from 'react'

// 直接在客户端构建图片 URL
const getImageUrl = (filename: string) => {
  return `https://img.labubu.city/${filename}`;
};

interface DownloadButtonProps {
  filename: string
  title: string
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export default function DownloadButton({ 
  filename, 
  title, 
  variant = 'primary', 
  size = 'md',
  className = '' 
}: DownloadButtonProps) {
  const [isDownloading, setIsDownloading] = useState(false)

  const handleDownload = async () => {
    setIsDownloading(true)
    
    try {
      const imageUrl = getImageUrl(filename)
      
      // Create a temporary link element to trigger download
      const link = document.createElement('a')
      link.href = imageUrl
      link.download = filename
      link.target = '_blank'
      
      // Append to body, click, and remove
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      // Track download analytics (optional)
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'download', {
          event_category: 'wallpaper',
          event_label: title,
          value: 1
        })
      }
      
    } catch (error) {
      console.error('Download failed:', error)
      alert('Download failed. Please try again.')
    } finally {
      setIsDownloading(false)
    }
  }

  const baseClasses = "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
  
  const variantClasses = {
    primary: "bg-pink-600 hover:bg-pink-700 text-white shadow-lg hover:shadow-xl",
    secondary: "bg-gray-100 hover:bg-gray-200 text-gray-900 border border-gray-300",
    outline: "border-2 border-pink-600 text-pink-600 hover:bg-pink-600 hover:text-white"
  }
  
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base", 
    lg: "px-8 py-4 text-lg"
  }

  return (
    <button
      onClick={handleDownload}
      disabled={isDownloading}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {isDownloading ? (
        <>
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Downloading...
        </>
      ) : (
        <>
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Download HD
        </>
      )}
    </button>
  )
} 