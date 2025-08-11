'use client'

import dynamic from 'next/dynamic'

// 动态导入主应用组件以避免 SSR 问题
const App = dynamic(() => import('../App'), { ssr: false })

export default function HomePage() {
  return <App />
}
