"use client"

import dynamic from "next/dynamic"

// 在客户端组件中使用dynamic import
const DynamicLabubuLayout = dynamic(() => import("./DynamicLabubuLayout"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
    </div>
  )
})

export default function ClientDynamicLayout() {
  return <DynamicLabubuLayout />
} 